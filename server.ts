import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import { eq, desc, ilike, or, and, sql } from 'drizzle-orm';
import { db } from './src/db/index.ts';
import {
  users,
  adminCredentials,
  bookingEnquiries,
  contactEnquiries,
  galleryImages,
} from './src/db/schema.ts';
import {
  requireAuth,
  hashPassword,
  verifyPassword,
  verifyPlainSecretTimingSafe,
  createAdminSessionToken,
} from './src/middleware/auth.ts';
import type { AuthRequest } from './src/middleware/auth.ts';

dotenv.config();

const PORT = 3000;
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads', 'gallery');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function sanitizeText(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  const pattern = /^[+]?[0-9\s\-()]{10,16}$/;
  return digits.length >= 10 && digits.length <= 14 && pattern.test(phone);
}

function isValidSafeImageUrl(urlStr: string): boolean {
  if (!urlStr || typeof urlStr !== 'string') return false;
  const trimmed = urlStr.trim();
  if (trimmed.startsWith('/assets/') || trimmed.startsWith('/uploads/')) {
    return !trimmed.includes('..');
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '12mb' }));
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'public', 'uploads')));

  // ============================================================================
  // 1. AUTHENTICATION & ADMIN CREDENTIAL SETUP ROUTES
  // ============================================================================

  // Sync Firebase Auth user to PostgreSQL `users` table
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const { uid, email } = req.user!;
      if (!uid) {
        return res.status(400).json({ error: 'Invalid user token payload' });
      }

      const existing = await db.select().from(users).where(eq(users.uid, uid));
      if (existing.length === 0) {
        await db
          .insert(users)
          .values({
            uid,
            email: email || 'admin@psconventioncenter.com',
            role: 'admin',
          })
          .onConflictDoNothing();
      }
      const userRecord = await db.select().from(users).where(eq(users.uid, uid));
      return res.json({ user: userRecord[0] });
    } catch (error) {
      console.error('Error syncing user:', error);
      return res.status(500).json({ error: 'Failed to sync user' });
    }
  });

  // Check if admin username/password is configured via env or PostgreSQL
  app.get('/api/admin/auth-status', async (_req, res) => {
    try {
      const envConfigured = Boolean(
        process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0
      );
      const existingAdmins = await db
        .select({ id: adminCredentials.id, username: adminCredentials.username })
        .from(adminCredentials)
        .limit(1);
      const dbConfigured = existingAdmins.length > 0;

      return res.json({
        configured: envConfigured || dbConfigured,
        envConfigured,
        defaultUsername:
          process.env.ADMIN_USERNAME ||
          (existingAdmins[0] ? existingAdmins[0].username : 'admin'),
      });
    } catch (error) {
      console.error('Error checking admin auth status:', error);
      return res.status(500).json({ error: 'Unable to check authentication configuration' });
    }
  });

  // First-run atomic bootstrap for setting up admin username & scrypt-hashed password in PostgreSQL
  app.post('/api/admin/setup', async (req, res) => {
    try {
      const envConfigured = Boolean(
        process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0
      );
      if (envConfigured) {
        return res.status(403).json({
          error: 'Admin credentials are already configured via environment secrets.',
        });
      }

      const existingAdmins = await db
        .select({ id: adminCredentials.id })
        .from(adminCredentials)
        .limit(1);
      if (existingAdmins.length > 0) {
        return res.status(403).json({
          error: 'Admin account has already been initialized. Please sign in.',
        });
      }

      const username = sanitizeText(req.body?.username, 60);
      const password = typeof req.body?.password === 'string' ? req.body.password : '';

      if (!username || username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters.' });
      }
      if (!password || password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' });
      }

      const { hash, salt } = hashPassword(password);
      await db.insert(adminCredentials).values({
        username,
        passwordHash: hash,
        salt,
      });

      const token = createAdminSessionToken(username);
      return res.status(201).json({
        token,
        user: { username, authType: 'admin_credentials' },
      });
    } catch (error) {
      console.error('Error setting up admin credentials:', error);
      return res.status(500).json({ error: 'Failed to initialize admin credentials' });
    }
  });

  // Admin username & password login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const username = sanitizeText(req.body?.username, 60);
      const password = typeof req.body?.password === 'string' ? req.body.password : '';

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }

      const envPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : '';
      const envUsername = process.env.ADMIN_USERNAME ? process.env.ADMIN_USERNAME.trim() : 'admin';

      if (envPassword.length > 0) {
        const userMatch = verifyPlainSecretTimingSafe(username, envUsername);
        const passMatch = verifyPlainSecretTimingSafe(password, envPassword);
        if (!userMatch || !passMatch) {
          return res.status(401).json({ error: 'Invalid admin username or password.' });
        }
        const token = createAdminSessionToken(envUsername);
        return res.json({
          token,
          user: { username: envUsername, authType: 'admin_credentials' },
        });
      }

      const rows = await db
        .select()
        .from(adminCredentials)
        .where(eq(adminCredentials.username, username))
        .limit(1);

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid admin username or password.' });
      }

      const adminRow = rows[0];
      const valid = verifyPassword(password, adminRow.passwordHash, adminRow.salt);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid admin username or password.' });
      }

      const token = createAdminSessionToken(adminRow.username);
      return res.json({
        token,
        user: { username: adminRow.username, authType: 'admin_credentials' },
      });
    } catch (error) {
      console.error('Admin login error:', error);
      return res.status(500).json({ error: 'Authentication service error' });
    }
  });

  // Change admin password (protected)
  app.post('/api/admin/change-password', requireAuth, async (req: AuthRequest, res) => {
    try {
      const newUsername = sanitizeText(req.body?.username, 60);
      const newPassword = typeof req.body?.password === 'string' ? req.body.password : '';

      if (!newUsername || newUsername.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters.' });
      }
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters.' });
      }

      const { hash, salt } = hashPassword(newPassword);
      const existing = await db.select().from(adminCredentials).limit(1);

      if (existing.length > 0) {
        await db
          .update(adminCredentials)
          .set({
            username: newUsername,
            passwordHash: hash,
            salt,
            updatedAt: new Date(),
          })
          .where(eq(adminCredentials.id, existing[0].id));
      } else {
        await db.insert(adminCredentials).values({
          username: newUsername,
          passwordHash: hash,
          salt,
        });
      }

      const token = createAdminSessionToken(newUsername);
      return res.json({
        message: 'Admin credentials updated successfully.',
        token,
        user: { username: newUsername, authType: 'admin_credentials' },
      });
    } catch (error) {
      console.error('Error updating admin password:', error);
      return res.status(500).json({ error: 'Failed to update admin credentials' });
    }
  });

  // ============================================================================
  // 2. PUBLIC WEBSITE API ROUTES (GALLERY, BOOKINGS, CONTACT)
  // ============================================================================

  // Fetch all gallery images for public website GallerySection
  app.get('/api/gallery', async (_req, res) => {
    try {
      const items = await db
        .select()
        .from(galleryImages)
        .orderBy(desc(galleryImages.uploadDate), desc(galleryImages.id));
      return res.json({ items });
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return res.status(500).json({ error: 'Failed to fetch gallery images' });
    }
  });

  // Fetch bookings availability data from PostgreSQL for public calendar
  app.get('/api/bookings/availability', async (_req, res) => {
    try {
      const allBookings = await db
        .select({
          id: bookingEnquiries.id,
          referenceCode: bookingEnquiries.referenceCode,
          eventDate: bookingEnquiries.eventDate,
          eventDates: bookingEnquiries.eventDates,
          session: bookingEnquiries.session,
          eventType: bookingEnquiries.eventType,
          status: bookingEnquiries.status,
        })
        .from(bookingEnquiries);

      return res.json({ bookings: allBookings });
    } catch (error) {
      console.error('Error fetching booking availability:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  // Submit a new Booking Enquiry to PostgreSQL
  app.post('/api/bookings', async (req, res) => {
    try {
      const customerName = sanitizeText(req.body?.fullName || req.body?.customerName, 120);
      const phoneNumber = sanitizeText(req.body?.mobileNumber || req.body?.phoneNumber, 30);
      const email = sanitizeText(req.body?.email || '', 120);
      const eventType = sanitizeText(req.body?.eventType || 'Grand Weddings', 100);
      const session = sanitizeText(req.body?.session || 'FULL_DAY', 40);
      const cateringPreference = sanitizeText(
        req.body?.cateringPreference || 'NEED_ASSISTANCE',
        60
      );
      const message = sanitizeText(
        req.body?.additionalRequirements || req.body?.message || '',
        1500
      );
      const expectedGuests = Math.max(
        1,
        Math.min(5000, Number(req.body?.expectedGuests) || 500)
      );

      let selectedDates: string[] = [];
      if (Array.isArray(req.body?.selectedDates) && req.body.selectedDates.length > 0) {
        selectedDates = req.body.selectedDates
          .map((d: unknown) => sanitizeText(d, 20))
          .filter((d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d))
          .sort();
      } else if (typeof req.body?.eventDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(req.body.eventDate)) {
        selectedDates = [req.body.eventDate];
      }

      if (!customerName || customerName.length < 2) {
        return res.status(400).json({ error: 'Please provide a valid customer name.' });
      }
      if (!isValidPhone(phoneNumber)) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit phone number.' });
      }
      if (selectedDates.length === 0) {
        return res.status(400).json({ error: 'Please select at least one valid event date.' });
      }

      const primaryDate = selectedDates[0];
      const randomRefNum = Math.floor(100000 + Math.random() * 900000);
      const referenceCode = `PSC-2026-${randomRefNum}`;

      const inserted = await db
        .insert(bookingEnquiries)
        .values({
          referenceCode,
          customerName,
          phoneNumber,
          email,
          eventDate: primaryDate,
          eventDates: JSON.stringify(selectedDates),
          session,
          eventType,
          expectedGuests,
          cateringPreference,
          message,
          status: 'PENDING',
        })
        .returning();

      const record = inserted[0];

      return res.status(201).json({
        success: true,
        reference: record.referenceCode,
        eventDate: record.eventDate,
        selectedDates,
        checkOutDate: selectedDates[selectedDates.length - 1] || record.eventDate,
        eventType: record.eventType,
        session: record.session,
        status: 'PENDING',
        message:
          'Your booking enquiry has been received and saved by Padmasena Convention Center. Our reservation manager will review availability and call you within 24 hours.',
        customerName: record.customerName,
        mobileNumber: record.phoneNumber,
        email: record.email || undefined,
        expectedGuests: record.expectedGuests,
        cateringPreference: record.cateringPreference,
        submittedAt: record.createdAt.toISOString(),
      });
    } catch (error) {
      console.error('Error saving booking enquiry:', error);
      return res.status(500).json({ error: 'Failed to save booking enquiry' });
    }
  });

  // Submit a new Contact Enquiry to PostgreSQL
  app.post('/api/contact', async (req, res) => {
    try {
      const name = sanitizeText(req.body?.name, 120);
      const phoneNumber = sanitizeText(req.body?.phoneNumber || req.body?.phone, 30);
      const rawMessage = sanitizeText(req.body?.message, 1500);
      const availabilityDate = sanitizeText(req.body?.availability, 30);

      const message = availabilityDate
        ? `[Preferred Date: ${availabilityDate}] ${rawMessage || 'Enquiry for venue availability'}`
        : rawMessage;

      if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Please enter your full name.' });
      }
      if (!isValidPhone(phoneNumber)) {
        return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
      }
      if (!message || message.length < 2) {
        return res.status(400).json({ error: 'Please enter your message.' });
      }

      const inserted = await db
        .insert(contactEnquiries)
        .values({
          name,
          phoneNumber,
          message,
          status: 'UNREAD',
        })
        .returning();

      return res.status(201).json({
        success: true,
        enquiry: inserted[0],
      });
    } catch (error) {
      console.error('Error saving contact enquiry:', error);
      return res.status(500).json({ error: 'Failed to submit contact enquiry' });
    }
  });

  // ============================================================================
  // 3. PROTECTED ADMIN DASHBOARD API ROUTES
  // ============================================================================

  // Dashboard Overview statistics
  app.get('/api/admin/overview', requireAuth, async (_req: AuthRequest, res) => {
    try {
      const [allBookings, allContacts, allGallery] = await Promise.all([
        db.select().from(bookingEnquiries).orderBy(desc(bookingEnquiries.createdAt)),
        db.select().from(contactEnquiries).orderBy(desc(contactEnquiries.submissionDate)),
        db.select().from(galleryImages).orderBy(desc(galleryImages.uploadDate)),
      ]);

      const pendingBookings = allBookings.filter((b) => b.status === 'PENDING').length;
      const confirmedBookings = allBookings.filter((b) => b.status === 'CONFIRMED').length;
      const cancelledBookings = allBookings.filter((b) => b.status === 'CANCELLED').length;
      const unreadContacts = allContacts.filter((c) => c.status === 'UNREAD').length;

      return res.json({
        stats: {
          totalBookings: allBookings.length,
          pendingBookings,
          confirmedBookings,
          cancelledBookings,
          totalContacts: allContacts.length,
          unreadContacts,
          totalGalleryImages: allGallery.length,
        },
        recentBookings: allBookings.slice(0, 5),
        recentContacts: allContacts.slice(0, 5),
      });
    } catch (error) {
      console.error('Error loading admin overview:', error);
      return res.status(500).json({ error: 'Failed to load dashboard overview' });
    }
  });

  // Get Booking Enquiries with search and status filter
  app.get('/api/admin/bookings', requireAuth, async (req: AuthRequest, res) => {
    try {
      const search = sanitizeText(req.query.search, 100);
      const status = sanitizeText(req.query.status, 30);

      const conditions = [];
      if (status && status !== 'ALL') {
        conditions.push(eq(bookingEnquiries.status, status));
      }
      if (search) {
        const pattern = `%${search}%`;
        conditions.push(
          or(
            ilike(bookingEnquiries.customerName, pattern),
            ilike(bookingEnquiries.phoneNumber, pattern),
            ilike(bookingEnquiries.referenceCode, pattern),
            ilike(bookingEnquiries.eventType, pattern),
            ilike(bookingEnquiries.eventDate, pattern)
          )
        );
      }

      const bookings =
        conditions.length > 0
          ? await db
              .select()
              .from(bookingEnquiries)
              .where(and(...conditions))
              .orderBy(desc(bookingEnquiries.createdAt))
          : await db
              .select()
              .from(bookingEnquiries)
              .orderBy(desc(bookingEnquiries.createdAt));

      return res.json({ bookings });
    } catch (error) {
      console.error('Error fetching admin bookings:', error);
      return res.status(500).json({ error: 'Failed to load booking enquiries' });
    }
  });

  // Update Booking Enquiry Status
  app.patch('/api/admin/bookings/:id/status', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      const status = sanitizeText(req.body?.status, 30);
      const allowedStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid booking ID' });
      }
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      const updated = await db
        .update(bookingEnquiries)
        .set({ status })
        .where(eq(bookingEnquiries.id, id))
        .returning();

      if (updated.length === 0) {
        return res.status(404).json({ error: 'Booking enquiry not found' });
      }

      return res.json({ booking: updated[0] });
    } catch (error) {
      console.error('Error updating booking status:', error);
      return res.status(500).json({ error: 'Failed to update booking status' });
    }
  });

  // Delete Booking Enquiry
  app.delete('/api/admin/bookings/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid booking ID' });
      }

      await db.delete(bookingEnquiries).where(eq(bookingEnquiries.id, id));
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting booking enquiry:', error);
      return res.status(500).json({ error: 'Failed to delete booking enquiry' });
    }
  });

  // Get Contact Enquiries with search
  app.get('/api/admin/contacts', requireAuth, async (req: AuthRequest, res) => {
    try {
      const search = sanitizeText(req.query.search, 100);
      const status = sanitizeText(req.query.status, 30);

      const conditions = [];
      if (status && status !== 'ALL') {
        conditions.push(eq(contactEnquiries.status, status));
      }
      if (search) {
        const pattern = `%${search}%`;
        conditions.push(
          or(
            ilike(contactEnquiries.name, pattern),
            ilike(contactEnquiries.phoneNumber, pattern),
            ilike(contactEnquiries.message, pattern)
          )
        );
      }

      const contacts =
        conditions.length > 0
          ? await db
              .select()
              .from(contactEnquiries)
              .where(and(...conditions))
              .orderBy(desc(contactEnquiries.submissionDate))
          : await db
              .select()
              .from(contactEnquiries)
              .orderBy(desc(contactEnquiries.submissionDate));

      return res.json({ contacts });
    } catch (error) {
      console.error('Error fetching contact enquiries:', error);
      return res.status(500).json({ error: 'Failed to load contact enquiries' });
    }
  });

  // Update Contact Enquiry Status (UNREAD / READ / RESOLVED)
  app.patch('/api/admin/contacts/:id/status', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      const status = sanitizeText(req.body?.status, 30);
      const allowedStatuses = ['UNREAD', 'READ', 'RESOLVED'];

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid contact ID' });
      }
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      const updated = await db
        .update(contactEnquiries)
        .set({ status })
        .where(eq(contactEnquiries.id, id))
        .returning();

      if (updated.length === 0) {
        return res.status(404).json({ error: 'Contact enquiry not found' });
      }

      return res.json({ contact: updated[0] });
    } catch (error) {
      console.error('Error updating contact enquiry:', error);
      return res.status(500).json({ error: 'Failed to update contact enquiry' });
    }
  });

  // Delete Contact Enquiry
  app.delete('/api/admin/contacts/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid contact ID' });
      }

      await db.delete(contactEnquiries).where(eq(contactEnquiries.id, id));
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting contact enquiry:', error);
      return res.status(500).json({ error: 'Failed to delete contact enquiry' });
    }
  });

  // Cloud Image Hosting Upload endpoint (accepts base64 image file, uploads to Cloud Image Host or Cloud Run asset storage, returns URL)
  app.post('/api/admin/gallery/upload', requireAuth, async (req: AuthRequest, res) => {
    try {
      const dataUrl = typeof req.body?.imageData === 'string' ? req.body.imageData : '';
      const match = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);

      if (!match) {
        return res.status(400).json({
          error: 'Invalid image format. Only JPEG, PNG, and WebP images are allowed.',
        });
      }

      const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      const base64Data = match[2];
      const buffer = Buffer.from(base64Data, 'base64');

      if (buffer.length > 8 * 1024 * 1024) {
        return res.status(400).json({ error: 'Image file size must be under 8 MB.' });
      }

      // 1. If IMGBB_API_KEY is configured in environment variables, upload to ImgBB Cloud Image Hosting
      if (process.env.IMGBB_API_KEY && process.env.IMGBB_API_KEY.trim()) {
        try {
          const formData = new URLSearchParams();
          formData.append('key', process.env.IMGBB_API_KEY.trim());
          formData.append('image', base64Data);

          const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(),
          });

          if (imgbbRes.ok) {
            const imgbbJson = (await imgbbRes.json()) as any;
            if (imgbbJson?.data?.url) {
              return res.json({
                imageUrl: imgbbJson.data.url,
                provider: 'imgbb-cloud',
              });
            }
          }
        } catch (cloudErr) {
          console.warn('External cloud image upload fallback triggered:', cloudErr);
        }
      }

      // 2. Store file in server cloud container storage with strict path confinement and return clean URL
      const safeFileName = `psc_${Date.now()}_${crypto.randomBytes(6).toString('hex')}.${ext}`;
      const resolvedPath = path.resolve(UPLOADS_DIR, safeFileName);
      if (!resolvedPath.startsWith(UPLOADS_DIR + path.sep)) {
        return res.status(400).json({ error: 'Invalid file destination' });
      }

      fs.writeFileSync(resolvedPath, buffer);
      const imageUrl = `/uploads/gallery/${safeFileName}`;

      return res.json({
        imageUrl,
        provider: 'cloud-storage-url',
      });
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      return res.status(500).json({ error: 'Failed to process image upload' });
    }
  });

  // Create Gallery Image record in PostgreSQL (stores only URL and metadata)
  app.post('/api/admin/gallery', requireAuth, async (req: AuthRequest, res) => {
    try {
      const title = sanitizeText(req.body?.title, 140);
      const category = sanitizeText(req.body?.category, 60);
      const caption = sanitizeText(req.body?.caption || '', 300);
      const imageUrl = typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim() : '';

      if (!title) {
        return res.status(400).json({ error: 'Image title is required.' });
      }
      if (!category) {
        return res.status(400).json({ error: 'Category is required.' });
      }
      if (!isValidSafeImageUrl(imageUrl)) {
        return res.status(400).json({
          error: 'Please provide a valid HTTP/HTTPS or hosted image URL.',
        });
      }

      const inserted = await db
        .insert(galleryImages)
        .values({
          title,
          category,
          caption,
          imageUrl,
        })
        .returning();

      return res.status(201).json({ item: inserted[0] });
    } catch (error) {
      console.error('Error creating gallery image:', error);
      return res.status(500).json({ error: 'Failed to save gallery image' });
    }
  });

  // Edit Gallery Image record in PostgreSQL
  app.put('/api/admin/gallery/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid gallery image ID' });
      }

      const title = sanitizeText(req.body?.title, 140);
      const category = sanitizeText(req.body?.category, 60);
      const caption = sanitizeText(req.body?.caption || '', 300);
      const imageUrl = typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim() : '';

      if (!title) {
        return res.status(400).json({ error: 'Image title is required.' });
      }
      if (!category) {
        return res.status(400).json({ error: 'Category is required.' });
      }
      if (!isValidSafeImageUrl(imageUrl)) {
        return res.status(400).json({
          error: 'Please provide a valid HTTP/HTTPS or hosted image URL.',
        });
      }

      const updated = await db
        .update(galleryImages)
        .set({
          title,
          category,
          caption,
          imageUrl,
        })
        .where(eq(galleryImages.id, id))
        .returning();

      if (updated.length === 0) {
        return res.status(404).json({ error: 'Gallery image not found' });
      }

      return res.json({ item: updated[0] });
    } catch (error) {
      console.error('Error updating gallery image:', error);
      return res.status(500).json({ error: 'Failed to update gallery image' });
    }
  });

  // Delete Gallery Image record from PostgreSQL
  app.delete('/api/admin/gallery/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid gallery image ID' });
      }

      await db.delete(galleryImages).where(eq(galleryImages.id, id));
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      return res.status(500).json({ error: 'Failed to delete gallery image' });
    }
  });

  // ============================================================================
  // 4. VITE DEV MIDDLEWARE / PRODUCTION STATIC ASSETS
  // ============================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Padmasena Convention Center server running on http://localhost:${PORT}`);
  });
}

startServer();
