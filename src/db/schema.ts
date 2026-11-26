import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  role: text('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const adminCredentials = pgTable('admin_credentials', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  salt: text('salt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookingEnquiries = pgTable('booking_enquiries', {
  id: serial('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  customerName: text('customer_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  email: text('email').default('').notNull(),
  eventDate: text('event_date').notNull(),
  eventDates: text('event_dates').notNull(),
  session: text('session').default('FULL_DAY').notNull(),
  eventType: text('event_type').notNull(),
  expectedGuests: integer('expected_guests').default(500).notNull(),
  cateringPreference: text('catering_preference').default('NEED_ASSISTANCE').notNull(),
  message: text('message').default('').notNull(),
  status: text('status').default('PENDING').notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contactEnquiries = pgTable('contact_enquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  message: text('message').notNull(),
  status: text('status').default('UNREAD').notNull(),
  submissionDate: timestamp('submission_date').defaultNow().notNull(),
});

export const galleryImages = pgTable('gallery_images', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  category: text('category').notNull(),
  caption: text('caption').default('').notNull(),
  uploadedById: integer('uploaded_by_id').references(() => users.id, { onDelete: 'set null' }),
  uploadDate: timestamp('upload_date').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookingEnquiries: many(bookingEnquiries),
  galleryImages: many(galleryImages),
}));

export const bookingEnquiriesRelations = relations(bookingEnquiries, ({ one }) => ({
  user: one(users, {
    fields: [bookingEnquiries.userId],
    references: [users.id],
  }),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [galleryImages.uploadedById],
    references: [users.id],
  }),
}));
