export type SessionSlot = 'FULL_DAY' | 'MORNING' | 'EVENING';

export type CateringType = 'VEGETARIAN' | 'NON_VEGETARIAN' | 'DISCUSS_LATER';

export type DayStatus = 'AVAILABLE' | 'PENDING_ENQUIRY' | 'CONFIRMED' | 'BLOCKED' | 'PARTIALLY_BOOKED';

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  status: DayStatus;
  availableSessions: SessionSlot[];
  bookedSessions: SessionSlot[];
  enquiryCount: number;
  isBlocked: boolean;
  notes?: string;
}

export interface BookingEnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  eventDate: string;
  alternativeDate?: string;
  session: SessionSlot;
  eventType: string;
  expectedGuests: number;
  cateringPreference: CateringType;
  additionalRequirements?: string;
}

export interface StoredBooking {
  id: string;
  reference: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  eventDate: string; // YYYY-MM-DD
  session: SessionSlot;
  eventType: string;
  guestCount: number;
  cateringPreference: CateringType;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED';
  createdAt: string;
}

export interface BookingSubmissionResponse {
  success: boolean;
  reference: string;
  eventDate: string;
  eventType: string;
  session: SessionSlot;
  status: 'PENDING';
  message: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  expectedGuests: number;
  cateringPreference: CateringType;
  submittedAt: string;
}
