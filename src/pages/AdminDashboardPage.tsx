import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Upload,
  Lock,
  UserCheck,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  X,
  Phone,
  Mail,
  Users,
  Calendar,
  KeyRound,
} from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AdminDashboardPageProps {
  onGoHome: () => void;
}

interface BookingEnquiryRow {
  id: number;
  referenceCode: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  eventDate: string;
  eventDates: string;
  session: string;
  eventType: string;
  expectedGuests: number;
  cateringPreference: string;
  message: string;
  status: string;
  createdAt: string;
}

interface ContactEnquiryRow {
  id: number;
  name: string;
  phoneNumber: string;
  message: string;
  status: string;
  submissionDate: string;
}

interface GalleryImageRow {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  uploadDate: string;
}

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalContacts: number;
  unreadContacts: number;
  totalGalleryImages: number;
}

type AdminTab = 'overview' | 'bookings' | 'contacts' | 'gallery';

const GALLERY_CATEGORIES = [
  'Main Hall',
  'Wedding Stage',
  'Dining Hall',
  'Exterior',
  'Guest Rooms',
  'Open Terrace',
  'Temple',
];

function parseDatesList(eventDatesRaw: string, fallbackDate: string): string[] {
  try {
    const parsed = JSON.parse(eventDatesRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback
  }
  return fallbackDate ? [fallbackDate] : [];
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onGoHome }) => {
  // Auth state kept strictly in memory (never localStorage)
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<string>('');
  const [authConfigured, setAuthConfigured] = useState<boolean | null>(null);
  const [loginUsername, setLoginUsername] = useState<string>('admin');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [confirmSetupPassword, setConfirmSetupPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Overview state
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalGalleryImages: 0,
  });
  const [recentBookings, setRecentBookings] = useState<BookingEnquiryRow[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactEnquiryRow[]>([]);

  // Bookings management state
  const [bookings, setBookings] = useState<BookingEnquiryRow[]>([]);
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('ALL');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<BookingEnquiryRow | null>(null);

  // Contact enquiries state
  const [contacts, setContacts] = useState<ContactEnquiryRow[]>([]);
  const [contactSearch, setContactSearch] = useState<string>('');
  const [contactStatusFilter, setContactStatusFilter] = useState<string>('ALL');
  const [selectedContactDetail, setSelectedContactDetail] = useState<ContactEnquiryRow | null>(null);

  // Gallery management state
  const [galleryItems, setGalleryItems] = useState<GalleryImageRow[]>([]);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<string>('Main Hall');
  const [uploadCaption, setUploadCaption] = useState<string>('');
  const [uploadImageUrl, setUploadImageUrl] = useState<string>('');
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [isSavingGallery, setIsSavingGallery] = useState<boolean>(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryImageRow | null>(null);

  // Password change modal
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [newAdminUsername, setNewAdminUsername] = useState<string>('admin');
  const [newAdminPassword, setNewAdminPassword] = useState<string>('');

  const showNotice = (type: 'success' | 'error', text: string) => {
    setFeedbackBanner({ type, text });
    setTimeout(() => {
      setFeedbackBanner((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  };

  // Check if admin credentials are set up
  useEffect(() => {
    let active = true;
    fetch('/api/admin/auth-status')
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setAuthConfigured(Boolean(data?.configured));
        if (data?.defaultUsername) {
          setLoginUsername(data.defaultUsername);
          setNewAdminUsername(data.defaultUsername);
        }
      })
      .catch(() => {
        if (active) setAuthConfigured(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const authHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
    };
  }, [authToken]);

  const fetchOverview = useCallback(async () => {
    if (!authToken) return;
    const res = await fetch('/api/admin/overview', { headers: authHeaders() });
    if (res.status === 401) {
      setAuthToken(null);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      if (data.stats) setStats(data.stats);
      if (Array.isArray(data.recentBookings)) setRecentBookings(data.recentBookings);
      if (Array.isArray(data.recentContacts)) setRecentContacts(data.recentContacts);
    }
  }, [authToken, authHeaders]);

  const fetchBookings = useCallback(async () => {
    if (!authToken) return;
    const params = new URLSearchParams();
    if (bookingSearch.trim()) params.set('search', bookingSearch.trim());
    if (bookingStatusFilter !== 'ALL') params.set('status', bookingStatusFilter);
    const res = await fetch(`/api/admin/bookings?${params.toString()}`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.bookings)) setBookings(data.bookings);
    }
  }, [authToken, authHeaders, bookingSearch, bookingStatusFilter]);

  const fetchContacts = useCallback(async () => {
    if (!authToken) return;
    const params = new URLSearchParams();
    if (contactSearch.trim()) params.set('search', contactSearch.trim());
    if (contactStatusFilter !== 'ALL') params.set('status', contactStatusFilter);
    const res = await fetch(`/api/admin/contacts?${params.toString()}`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.contacts)) setContacts(data.contacts);
    }
  }, [authToken, authHeaders, contactSearch, contactStatusFilter]);

  const fetchGallery = useCallback(async () => {
    const res = await fetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.items)) setGalleryItems(data.items);
    }
  }, []);

  const refreshAllData = useCallback(async () => {
    if (!authToken) return;
    setIsRefreshing(true);
    try {
      await Promise.all([fetchOverview(), fetchBookings(), fetchContacts(), fetchGallery()]);
    } finally {
      setIsRefreshing(false);
    }
  }, [authToken, fetchOverview, fetchBookings, fetchContacts, fetchGallery]);

  useEffect(() => {
    if (authToken) {
      refreshAllData();
    }
  }, [authToken, refreshAllData]);

  useEffect(() => {
    if (authToken) {
      fetchBookings();
    }
  }, [authToken, bookingSearch, bookingStatusFilter, fetchBookings]);

  useEffect(() => {
    if (authToken) {
      fetchContacts();
    }
  }, [authToken, contactSearch, contactStatusFilter, fetchContacts]);

  // First-run setup handler
  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (loginUsername.trim().length < 3) {
      setAuthError('Username must be at least 3 characters.');
      return;
    }
    if (loginPassword.length < 8) {
      setAuthError('Password must be at least 8 characters.');
      return;
    }
    if (loginPassword !== confirmSetupPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to setup admin credentials.');
      }
      setAuthConfigured(true);
      setAuthToken(data.token);
      setAdminUser(data.user?.username || loginUsername.trim());
      setLoginPassword('');
      setConfirmSetupPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Setup failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Username & password login handler
  const handleUsernameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid username or password.');
      }
      setAuthToken(data.token);
      setAdminUser(data.user?.username || loginUsername.trim());
      setLoginPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Google Sign-In via Firebase Auth
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const idToken = await cred.user.getIdToken();
      const syncRes = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!syncRes.ok) {
        throw new Error('Failed to verify Google administrator account.');
      }
      setAuthToken(idToken);
      setAdminUser(cred.user.email || cred.user.displayName || 'Admin');
    } catch (err: any) {
      setAuthError(err.message || 'Google Sign-In failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setAdminUser('');
    try {
      await signOut(auth);
    } catch {
      // Ignore if not signed into Firebase
    }
  };

  // Booking status update
  const handleUpdateBookingStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      showNotice('success', `Booking enquiry status updated to ${status}.`);
      await Promise.all([fetchBookings(), fetchOverview()]);
      if (selectedBookingDetail && selectedBookingDetail.id === id) {
        setSelectedBookingDetail({ ...selectedBookingDetail, status });
      }
    } catch {
      showNotice('error', 'Could not update booking status.');
    }
  };

  const handleDeleteBooking = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete booking');
      showNotice('success', 'Booking enquiry deleted from PostgreSQL.');
      setSelectedBookingDetail(null);
      await Promise.all([fetchBookings(), fetchOverview()]);
    } catch {
      showNotice('error', 'Failed to delete booking enquiry.');
    }
  };

  // Contact status update
  const handleUpdateContactStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update contact status');
      showNotice('success', `Contact enquiry marked as ${status}.`);
      await Promise.all([fetchContacts(), fetchOverview()]);
      if (selectedContactDetail && selectedContactDetail.id === id) {
        setSelectedContactDetail({ ...selectedContactDetail, status });
      }
    } catch {
      showNotice('error', 'Could not update contact status.');
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete contact');
      showNotice('success', 'Contact enquiry removed.');
      setSelectedContactDetail(null);
      await Promise.all([fetchContacts(), fetchOverview()]);
    } catch {
      showNotice('error', 'Failed to delete contact enquiry.');
    }
  };

  // Cloud Image Upload file picker handler
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      showNotice('error', 'Please select a valid JPEG, PNG, or WebP image file.');
      return;
    }

    setIsUploadingFile(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('File read failed'));
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ imageData: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Image upload failed');
      }

      if (isEdit && editingGalleryItem) {
        setEditingGalleryItem({ ...editingGalleryItem, imageUrl: data.imageUrl });
      } else {
        setUploadImageUrl(data.imageUrl);
        if (!uploadTitle.trim()) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setUploadTitle(cleanName);
        }
      }
      showNotice('success', 'Image uploaded to cloud hosting. Save to publish to the gallery.');
    } catch (err: any) {
      showNotice('error', err.message || 'Image upload failed.');
    } finally {
      setIsUploadingFile(false);
      e.target.value = '';
    }
  };

  // Create new Gallery Image in PostgreSQL
  const handleCreateGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadImageUrl.trim()) {
      showNotice('error', 'Please provide an image title and upload or paste an image URL.');
      return;
    }

    setIsSavingGallery(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          title: uploadTitle.trim(),
          category: uploadCategory,
          caption: uploadCaption.trim(),
          imageUrl: uploadImageUrl.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save gallery image.');
      }

      setUploadTitle('');
      setUploadCaption('');
      setUploadImageUrl('');
      showNotice('success', 'Gallery image saved to PostgreSQL and published live.');
      await Promise.all([fetchGallery(), fetchOverview()]);
    } catch (err: any) {
      showNotice('error', err.message || 'Could not save gallery image.');
    } finally {
      setIsSavingGallery(false);
    }
  };

  // Update existing Gallery Image in PostgreSQL
  const handleUpdateGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem) return;

    setIsSavingGallery(true);
    try {
      const res = await fetch(`/api/admin/gallery/${editingGalleryItem.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          title: editingGalleryItem.title,
          category: editingGalleryItem.category,
          caption: editingGalleryItem.caption,
          imageUrl: editingGalleryItem.imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update gallery image.');
      }
      setEditingGalleryItem(null);
      showNotice('success', 'Gallery image details updated in PostgreSQL.');
      await fetchGallery();
    } catch (err: any) {
      showNotice('error', err.message || 'Could not update gallery image.');
    } finally {
      setIsSavingGallery(false);
    }
  };

  // Delete Gallery Image
  const handleDeleteGalleryImage = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error('Delete failed');
      showNotice('success', 'Gallery image deleted from PostgreSQL.');
      await Promise.all([fetchGallery(), fetchOverview()]);
    } catch {
      showNotice('error', 'Failed to delete gallery image.');
    }
  };

  // Update Admin Credentials
  const handleUpdateAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          username: newAdminUsername.trim(),
          password: newAdminPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update credentials');
      if (data.token) setAuthToken(data.token);
      if (data.user?.username) setAdminUser(data.user.username);
      setNewAdminPassword('');
      setPasswordModalOpen(false);
      showNotice('success', 'Admin username and password hash updated.');
    } catch (err: any) {
      showNotice('error', err.message || 'Could not update credentials.');
    }
  };

  // ============================================================================
  // RENDER 1: LOGIN / FIRST-RUN ADMIN SETUP SCREEN
  // ============================================================================
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] flex flex-col justify-center items-center px-4 py-12 font-['Urbanist','Outfit',sans-serif]">
        <div className="w-full max-w-md bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/40 border-t-4 border-t-[#C5A45D] shadow-2xl overflow-hidden">
          <div className="bg-[#234D3C] dark:bg-[#081710] p-6 text-white border-b border-[#C5A45D]/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A45D] font-bold">
                PADMASENA CONVENTION CENTER
              </span>
              <ShieldCheck className="w-5 h-5 text-[#C5A45D]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1 font-['Cormorant_Garamond',serif]">
              {authConfigured === false ? 'Initialize Admin Account' : 'Admin Portal Sign In'}
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              {authConfigured === false
                ? 'Set your administrator username and password to secure the Padmasena Convention Center dashboard.'
                : 'Sign in with your administrator credentials to manage bookings, enquiries, and gallery images.'}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {authError && (
              <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-700 text-xs text-red-700 dark:text-red-300 font-medium">
                {authError}
              </div>
            )}

            {authConfigured === false ? (
              <form onSubmit={handleSetupAdmin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Admin Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Choose Admin Password (min 8 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter strong password"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Confirm Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmSetupPassword}
                    onChange={(e) => setConfirmSetupPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Lock className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                  <span>{authLoading ? 'Securing Account...' : 'Create Admin Account & Enter'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleUsernameLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Lock className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                  <span>{authLoading ? 'Signing In...' : 'Sign In to Dashboard'}</span>
                </button>
              </form>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-widest text-gray-400">
                Or
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={authLoading}
              className="w-full py-3 px-4 border border-[#234D3C]/30 dark:border-[#C5A45D]/40 bg-[#FAF8F2] dark:bg-[#07150e] text-[#234D3C] dark:text-[#f3eedd] text-xs uppercase font-bold tracking-wider hover:bg-[#E8F2E8] dark:hover:bg-[#122e22] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#C5A45D]" />
              <span>Continue with Google Admin Sign-In</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#234D3C] dark:hover:text-[#C5A45D] font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filtered gallery list for gallery tab
  const filteredGallery =
    galleryFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);

  // ============================================================================
  // RENDER 2: AUTHENTICATED ADMIN DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] text-[#202823] dark:text-gray-100 font-['Urbanist','Outfit',sans-serif]">
      {/* Top Admin Header Bar */}
      <div className="bg-[#234D3C] dark:bg-[#081710] text-white border-b border-[#C5A45D]/30 pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A45D] font-bold">
                PADMASENA CONVENTION CENTER
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-[#C5A45D]/20 text-[#C5A45D] border border-[#C5A45D]/40">
                Admin Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond',serif] mt-1">
              Venue Operations & Management Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs text-gray-300 bg-white/10 px-3 py-2 border border-white/10">
              Signed in as <strong className="text-[#C5A45D]">{adminUser}</strong>
            </span>
            <button
              type="button"
              onClick={refreshAllData}
              disabled={isRefreshing}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span className="hidden sm:inline">Credentials</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-[#C5A45D] text-[#07150e] hover:bg-[#d8bc7a] text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#C5A45D] text-[#07150e] shadow-md'
                : 'bg-white/5 text-gray-200 hover:bg-white/15'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#C5A45D] text-[#07150e] shadow-md'
                : 'bg-white/5 text-gray-200 hover:bg-white/15'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Booking Enquiries ({stats.totalBookings})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-[#C5A45D] text-[#07150e] shadow-md'
                : 'bg-white/5 text-gray-200 hover:bg-white/15'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Enquiries ({stats.totalContacts})</span>
            {stats.unreadContacts > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-red-600 text-white rounded-full">
                {stats.unreadContacts}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#C5A45D] text-[#07150e] shadow-md'
                : 'bg-white/5 text-gray-200 hover:bg-white/15'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Management ({stats.totalGalleryImages})</span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {feedbackBanner && (
          <div
            className={`mb-6 p-4 border flex items-center justify-between text-xs sm:text-sm font-medium ${
              feedbackBanner.type === 'success'
                ? 'bg-[#E8F2E8] dark:bg-[#0c2317] border-[#234D3C] dark:border-[#C5A45D] text-[#234D3C] dark:text-[#f3eedd]'
                : 'bg-red-50 dark:bg-red-950/50 border-red-400 text-red-700 dark:text-red-300'
            }`}
          >
            <span>{feedbackBanner.text}</span>
            <button
              type="button"
              onClick={() => setFeedbackBanner(null)}
              className="text-current hover:opacity-75 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ====================================================================
            TAB 1: DASHBOARD OVERVIEW
        ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab('bookings')}
                className="bg-white dark:bg-[#0c2317] p-6 border border-[#e2d8c3] dark:border-[#C5A45D]/30 border-l-4 border-l-[#234D3C] dark:border-l-[#C5A45D] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    Total Bookings & Enquiries
                  </span>
                  <div className="w-10 h-10 bg-[#FAF8F2] dark:bg-[#07150e] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center border border-[#C5A45D]/30">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#234D3C] dark:text-[#f3eedd] mt-3">
                  {stats.totalBookings}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {stats.confirmedBookings} Confirmed
                  </span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    {stats.pendingBookings} Pending
                  </span>
                  <span className="text-gray-500">{stats.cancelledBookings} Cancelled</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('contacts')}
                className="bg-white dark:bg-[#0c2317] p-6 border border-[#e2d8c3] dark:border-[#C5A45D]/30 border-l-4 border-l-[#C5A45D] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    Contact Enquiries
                  </span>
                  <div className="w-10 h-10 bg-[#FAF8F2] dark:bg-[#07150e] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center border border-[#C5A45D]/30">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#234D3C] dark:text-[#f3eedd] mt-3">
                  {stats.totalContacts}
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                  <strong className="text-[#C5A45D]">{stats.unreadContacts}</strong> unread messages awaiting response
                </div>
              </div>

              <div
                onClick={() => setActiveTab('gallery')}
                className="bg-white dark:bg-[#0c2317] p-6 border border-[#e2d8c3] dark:border-[#C5A45D]/30 border-l-4 border-l-[#234D3C] dark:border-l-[#C5A45D] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    Gallery Images
                  </span>
                  <div className="w-10 h-10 bg-[#FAF8F2] dark:bg-[#07150e] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center border border-[#C5A45D]/30">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#234D3C] dark:text-[#f3eedd] mt-3">
                  {stats.totalGalleryImages}
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                  Dynamically displayed on the live website gallery
                </div>
              </div>
            </div>

            {/* Recent Bookings & Contacts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Booking Enquiries */}
              <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
                  <h2 className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd]">
                    Recent Booking Enquiries
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold uppercase tracking-wider text-[#C5A45D] hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentBookings.map((b) => {
                    const dates = parseDatesList(b.eventDates, b.eventDate);
                    return (
                      <div
                        key={b.id}
                        className="p-3.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#234D3C] dark:text-white">
                              {b.customerName}
                            </span>
                            <span className="text-[11px] text-gray-500 font-mono">
                              {b.referenceCode}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                            {b.eventType} &bull; {dates.join(', ')} ({b.session})
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider self-start sm:self-center ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : b.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    );
                  })}
                  {recentBookings.length === 0 && (
                    <p className="text-xs text-gray-500 py-4 text-center">
                      No booking enquiries recorded yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Contact Enquiries */}
              <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
                  <h2 className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd]">
                    Recent Contact Enquiries
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('contacts')}
                    className="text-xs font-bold uppercase tracking-wider text-[#C5A45D] hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentContacts.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200/80 dark:border-white/10 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#234D3C] dark:text-white">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {new Date(c.submissionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#C5A45D] font-semibold">{c.phoneNumber}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5">
                        {c.message}
                      </p>
                    </div>
                  ))}
                  {recentContacts.length === 0 && (
                    <p className="text-xs text-gray-500 py-4 text-center">
                      No contact enquiries submitted yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: BOOKING ENQUIRY MANAGEMENT
        ==================================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-[#0c2317] p-4 sm:p-6 border border-[#e2d8c3] dark:border-[#C5A45D]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search by customer name, phone, reference, event type, or date..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C5A45D]" />
                {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setBookingStatusFilter(st)}
                    className={`px-3 py-2 text-[11px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      bookingStatusFilter === st
                        ? 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]'
                        : 'bg-[#FAF8F2] dark:bg-[#07150e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#234D3C] dark:bg-[#081710] text-white text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4">Reference & Date</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Event Date(s)</th>
                    <th className="py-3.5 px-4">Event Type & Guests</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-xs sm:text-sm">
                  {bookings.map((b) => {
                    const dates = parseDatesList(b.eventDates, b.eventDate);
                    return (
                      <tr
                        key={b.id}
                        className="hover:bg-[#FAF8F2] dark:hover:bg-[#07150e]/60 transition-colors"
                      >
                        <td className="py-4 px-4 align-top">
                          <div className="font-mono font-bold text-xs text-[#234D3C] dark:text-[#C5A45D]">
                            {b.referenceCode}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            Submitted {new Date(b.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-[#202823] dark:text-white">
                            {b.customerName}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                            {b.phoneNumber}
                          </div>
                          {b.email && (
                            <div className="text-[11px] text-gray-500">{b.email}</div>
                          )}
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {dates.map((d) => (
                              <span
                                key={d}
                                className="px-2 py-0.5 text-[11px] font-semibold bg-[#FAF8F2] dark:bg-[#07150e] border border-[#C5A45D]/40 text-[#234D3C] dark:text-[#f3eedd]"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1 uppercase">
                            Session: {b.session.replace('_', ' ')}
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-[#234D3C] dark:text-[#f3eedd]">
                            {b.eventType}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {b.expectedGuests} Guests &bull; {b.cateringPreference.replace(/_/g, ' ')}
                          </div>
                          {b.message && (
                            <div className="text-xs text-gray-500 line-clamp-1 mt-1 italic">
                              "{b.message}"
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 align-top">
                          <select
                            aria-label={`Update status for ${b.customerName}`}
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider border outline-none cursor-pointer ${
                              b.status === 'CONFIRMED'
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : b.status === 'CANCELLED'
                                ? 'bg-red-50 border-red-400 text-red-800 dark:bg-red-950 dark:text-red-300'
                                : 'bg-amber-50 border-amber-400 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 align-top text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedBookingDetail(b)}
                              className="p-2 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-[#234D3C] hover:text-white text-[#234D3C] dark:text-[#C5A45D] border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(b.id)}
                              className="p-2 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-red-600 hover:text-white text-red-600 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500 text-sm">
                        No booking enquiries match your current search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: CONTACT ENQUIRY MANAGEMENT
        ==================================================================== */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="bg-white dark:bg-[#0c2317] p-4 sm:p-6 border border-[#e2d8c3] dark:border-[#C5A45D]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search contact enquiries by name, phone number, or message..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                {['ALL', 'UNREAD', 'READ', 'RESOLVED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setContactStatusFilter(st)}
                    className={`px-3 py-2 text-[11px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      contactStatusFilter === st
                        ? 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]'
                        : 'bg-[#FAF8F2] dark:bg-[#07150e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#234D3C] dark:bg-[#081710] text-white text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4">Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4">Submission Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-xs sm:text-sm">
                  {contacts.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-[#FAF8F2] dark:hover:bg-[#07150e]/60 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-[#234D3C] dark:text-white align-top">
                        {c.name}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#C5A45D] align-top">
                        {c.phoneNumber}
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300 max-w-md align-top">
                        <p className="line-clamp-2">{c.message}</p>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-500 align-top">
                        {new Date(c.submissionDate).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 align-top">
                        <select
                          aria-label={`Update status for ${c.name}`}
                          value={c.status}
                          onChange={(e) => handleUpdateContactStatus(c.id, e.target.value)}
                          className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border outline-none cursor-pointer ${
                            c.status === 'RESOLVED'
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : c.status === 'READ'
                              ? 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-50 border-amber-400 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          <option value="UNREAD">UNREAD</option>
                          <option value="READ">READ</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 align-top text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedContactDetail(c);
                              if (c.status === 'UNREAD') {
                                handleUpdateContactStatus(c.id, 'READ');
                              }
                            }}
                            className="p-2 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-[#234D3C] hover:text-white text-[#234D3C] dark:text-[#C5A45D] border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
                            title="View Enquiry Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-2 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-red-600 hover:text-white text-red-600 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500 text-sm">
                        No contact enquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: GALLERY IMAGE MANAGEMENT
        ==================================================================== */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Upload New Gallery Image Form */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 border-t-4 border-t-[#C5A45D] p-6 shadow-md">
              <h2 className="text-xl font-bold text-[#234D3C] dark:text-[#f3eedd] font-['Cormorant_Garamond',serif]">
                Upload Gallery Image
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-5">
                Upload an image to cloud hosting or provide a hosted image URL. Only the image URL and details are stored in PostgreSQL.
              </p>

              <form onSubmit={handleCreateGalleryImage} className="space-y-4">
                {/* File Dropzone / Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    1. Upload Image File to Cloud Host
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#C5A45D]/50 bg-[#FAF8F2] dark:bg-[#07150e] p-4 text-center cursor-pointer hover:border-[#234D3C] dark:hover:border-[#C5A45D] transition-colors">
                    <Upload className="w-6 h-6 text-[#C5A45D] mb-1.5" />
                    <span className="text-xs font-semibold text-[#234D3C] dark:text-gray-200">
                      {isUploadingFile ? 'Uploading to Cloud Host...' : 'Click to Select Image File'}
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5">
                      JPEG, PNG, or WebP (max 8 MB)
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileSelect(e, false)}
                      disabled={isUploadingFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Or direct hosted Image URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Image URL (Auto-filled on Upload or Paste URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadImageUrl}
                    onChange={(e) => setUploadImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>

                {/* Image Preview */}
                {uploadImageUrl && (
                  <div className="border border-[#C5A45D]/40 bg-[#FAF8F2] dark:bg-[#07150e] p-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#C5A45D] block mb-1">
                      Live Image Preview
                    </span>
                    <img
                      src={uploadImageUrl}
                      alt="Upload preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Image Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Royal Mandap Stage"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-gray-200 mb-1.5">
                    Caption / Description
                  </label>
                  <textarea
                    rows={2}
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Short description displayed in gallery lightbox..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingGallery || isUploadingFile}
                  className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSavingGallery ? 'Saving to PostgreSQL...' : 'Publish to Gallery'}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Gallery Items Grid with Filter, Edit & Delete */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-[#0c2317] p-4 border border-[#e2d8c3] dark:border-[#C5A45D]/30 flex flex-wrap items-center gap-2">
                {['All', ...GALLERY_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3 py-1.5 text-[11px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      galleryFilter === cat
                        ? 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]'
                        : 'bg-[#FAF8F2] dark:bg-[#07150e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="relative h-48 bg-gray-100 dark:bg-[#07150e]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#234D3C]/90 text-[#C5A45D] text-[10px] uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-base text-[#234D3C] dark:text-[#f3eedd]">
                          {item.title}
                        </h3>
                        {item.caption && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                            {item.caption}
                          </p>
                        )}
                        <p className="text-[11px] text-gray-400 mt-2">
                          Uploaded {new Date(item.uploadDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-white/10 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingGalleryItem(item)}
                          className="px-3 py-1.5 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-[#234D3C] hover:text-white text-[#234D3C] dark:text-[#C5A45D] text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryImage(item.id)}
                          className="px-3 py-1.5 bg-[#FAF8F2] dark:bg-[#07150e] hover:bg-red-600 hover:text-white text-red-600 text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================
          MODAL 1: BOOKING ENQUIRY DETAIL VIEW
      ====================================================================== */}
      {selectedBookingDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedBookingDetail(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#0c2317] w-full max-w-lg border border-[#C5A45D] border-t-4 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#234D3C] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A45D] font-bold">
                  BOOKING ENQUIRY DETAILS
                </span>
                <h3 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                  {selectedBookingDetail.referenceCode}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookingDetail(null)}
                className="text-gray-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Customer Name
                  </span>
                  <span className="font-bold text-[#234D3C] dark:text-white">
                    {selectedBookingDetail.customerName}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Phone Number
                  </span>
                  <span className="font-semibold text-[#C5A45D]">
                    {selectedBookingDetail.phoneNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Event Type
                  </span>
                  <span className="font-semibold">{selectedBookingDetail.eventType}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Session & Guests
                  </span>
                  <span>
                    {selectedBookingDetail.session} &bull; {selectedBookingDetail.expectedGuests} Guests
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                  Selected Event Date(s)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {parseDatesList(
                    selectedBookingDetail.eventDates,
                    selectedBookingDetail.eventDate
                  ).map((d) => (
                    <span
                      key={d}
                      className="px-2.5 py-1 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#C5A45D]/50 text-xs font-bold text-[#234D3C] dark:text-[#C5A45D]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                  Customer Message / Requirements
                </span>
                <div className="p-3 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                  {selectedBookingDetail.message || 'No additional notes provided.'}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateBookingStatus(selectedBookingDetail.id, 'CONFIRMED')}
                    className="px-3 py-2 bg-emerald-700 text-white text-xs uppercase font-bold tracking-wider hover:bg-emerald-800 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateBookingStatus(selectedBookingDetail.id, 'CANCELLED')}
                    className="px-3 py-2 bg-red-600 text-white text-xs uppercase font-bold tracking-wider hover:bg-red-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBookingDetail(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-white/20 text-xs uppercase font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 2: CONTACT ENQUIRY DETAIL VIEW
      ====================================================================== */}
      {selectedContactDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedContactDetail(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#0c2317] w-full max-w-lg border border-[#C5A45D] border-t-4 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#234D3C] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A45D] font-bold">
                  CONTACT ENQUIRY
                </span>
                <h3 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                  {selectedContactDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContactDetail(null)}
                className="text-gray-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Phone Number
                  </span>
                  <span className="font-bold text-[#234D3C] dark:text-[#C5A45D] text-base">
                    {selectedContactDetail.phoneNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase font-bold text-gray-400 block">
                    Submitted On
                  </span>
                  <span>{new Date(selectedContactDetail.submissionDate).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                  Enquiry Message
                </span>
                <div className="p-4 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {selectedContactDetail.message}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleUpdateContactStatus(selectedContactDetail.id, 'RESOLVED')}
                  className="px-4 py-2 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Mark as Resolved
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedContactDetail(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-white/20 text-xs uppercase font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 3: EDIT GALLERY IMAGE
      ====================================================================== */}
      {editingGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingGalleryItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#0c2317] w-full max-w-lg border border-[#C5A45D] border-t-4 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#234D3C] text-white p-5 flex items-center justify-between">
              <h3 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                Edit Gallery Image
              </h3>
              <button
                type="button"
                onClick={() => setEditingGalleryItem(null)}
                className="text-gray-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateGalleryImage} className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4">
                <img
                  src={editingGalleryItem.imageUrl}
                  alt={editingGalleryItem.title}
                  className="w-24 h-24 object-cover border border-[#C5A45D]/40 shrink-0"
                />
                <label className="flex-1 border border-dashed border-[#C5A45D] p-3 text-center cursor-pointer hover:bg-[#FAF8F2] dark:hover:bg-[#07150e]">
                  <span className="text-xs font-bold text-[#234D3C] dark:text-[#C5A45D] block">
                    {isUploadingFile ? 'Uploading...' : 'Replace Image File'}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFileSelect(e, true)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingGalleryItem.imageUrl}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingGalleryItem.title}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                <select
                  value={editingGalleryItem.category}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={editingGalleryItem.caption}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, caption: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGalleryItem(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-white/20 text-xs uppercase font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingGallery}
                  className="px-6 py-2 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  {isSavingGallery ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 4: UPDATE ADMIN CREDENTIALS
      ====================================================================== */}
      {passwordModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPasswordModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#0c2317] w-full max-w-md border border-[#C5A45D] border-t-4 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#234D3C] text-white p-5 flex items-center justify-between">
              <h3 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                Update Admin Credentials
              </h3>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="text-gray-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateAdminCredentials} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Admin Username *</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  New Password (min 8 chars) *
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Enter new admin password"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-300 dark:border-white/20 outline-none"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-white/20 text-xs uppercase font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
