import { DayAvailability, SessionSlot, BookingEnquiryPayload, BookingSubmissionResponse, StoredBooking } from '../types/booking';
import { INITIAL_SAMPLE_BOOKINGS, INITIAL_BLOCKED_DATES, INITIAL_SAMPLE_ENQUIRIES } from '../data/venueData';

const STORAGE_KEYS = {
  BOOKINGS: 'ps_cc_confirmed_bookings',
  ENQUIRIES: 'ps_cc_user_enquiries',
  BLOCKED: 'ps_cc_blocked_dates'
};

function getStoredBookings(): StoredBooking[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_SAMPLE_BOOKINGS));
      return INITIAL_SAMPLE_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAMPLE_BOOKINGS;
  }
}

function getStoredEnquiries(): any[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_ENQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_SAMPLE_ENQUIRIES));
      return INITIAL_SAMPLE_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAMPLE_ENQUIRIES;
  }
}

function getStoredBlockedDates(): { date: string; reason: string }[] {
  if (typeof window === 'undefined') return INITIAL_BLOCKED_DATES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOCKED);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BLOCKED, JSON.stringify(INITIAL_BLOCKED_DATES));
      return INITIAL_BLOCKED_DATES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BLOCKED_DATES;
  }
}

export function getAvailabilityForMonth(year: number, monthZeroIndexed: number): DayAvailability[] {
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  const bookings = getStoredBookings();
  const enquiries = getStoredEnquiries();
  const blockedDates = getStoredBlockedDates();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const results: DayAvailability[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const monthPad = (monthZeroIndexed + 1).toString().padStart(2, '0');
    const dayPad = day.toString().padStart(2, '0');
    const dateStr = `${year}-${monthPad}-${dayPad}`;
    const dateObj = new Date(year, monthZeroIndexed, day);

    const isPast = dateObj < today;
    const isBlocked = blockedDates.some(b => b.date === dateStr);
    const dayBookings = bookings.filter(b => b.eventDate === dateStr && b.status === 'CONFIRMED');
    const dayEnquiries = enquiries.filter(e => e.date === dateStr || e.eventDate === dateStr);

    const bookedSessions = dayBookings.map(b => b.session);
    const hasFullDay = bookedSessions.includes('FULL_DAY');
    const hasMorning = bookedSessions.includes('MORNING');
    const hasEvening = bookedSessions.includes('EVENING');

    let availableSessions: SessionSlot[] = [];
    if (!isBlocked && !isPast && !hasFullDay) {
      if (!hasMorning && !hasEvening) {
        availableSessions = ['FULL_DAY', 'MORNING', 'EVENING'];
      } else if (hasMorning && !hasEvening) {
        availableSessions = ['EVENING'];
      } else if (!hasMorning && hasEvening) {
        availableSessions = ['MORNING'];
      }
    }

    let status: DayAvailability['status'] = 'AVAILABLE';
    if (isBlocked || isPast) {
      status = 'BLOCKED';
    } else if (hasFullDay || (hasMorning && hasEvening)) {
      status = 'CONFIRMED';
    } else if (hasMorning || hasEvening) {
      status = 'PARTIALLY_BOOKED';
    } else if (dayEnquiries.length > 0) {
      status = 'PENDING_ENQUIRY';
    }

    results.push({
      date: dateStr,
      status,
      availableSessions,
      bookedSessions,
      enquiryCount: dayEnquiries.length,
      isBlocked: isBlocked || isPast,
      notes: isBlocked ? 'Date blocked for venue maintenance' : undefined
    });
  }

  return results;
}

export function checkSessionAvailability(dateStr: string, session: SessionSlot): {
  available: boolean;
  message: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr + 'T00:00:00');
  if (isNaN(targetDate.getTime()) || targetDate < today) {
    return { available: false, message: 'Dates in the past cannot be booked.' };
  }

  const blockedDates = getStoredBlockedDates();
  if (blockedDates.some(b => b.date === dateStr)) {
    return { available: false, message: 'This date is blocked for maintenance or private VIP reservations.' };
  }

  const bookings = getStoredBookings().filter(b => b.eventDate === dateStr && b.status === 'CONFIRMED');
  const bookedSessions = bookings.map(b => b.session);

  if (bookedSessions.includes('FULL_DAY')) {
    return { available: false, message: 'Full Day is already confirmed for another wedding ceremony.' };
  }

  if (session === 'FULL_DAY' && (bookedSessions.includes('MORNING') || bookedSessions.includes('EVENING'))) {
    return { available: false, message: 'Full Day unavailable because one session slot is already booked.' };
  }

  if (bookedSessions.includes(session)) {
    return { available: false, message: `The ${session.toLowerCase().replace('_', ' ')} slot is already reserved.` };
  }

  return { available: true, message: 'This date and session slot are available for reservation enquiry!' };
}

export function checkDateRangeAvailability(
  checkInDate: string,
  checkOutDate: string | null,
  session: SessionSlot
): {
  available: boolean;
  message: string;
} {
  const end = checkOutDate || checkInDate;
  const startDt = new Date(checkInDate + 'T00:00:00');
  const endDt = new Date(end + 'T00:00:00');

  if (isNaN(startDt.getTime()) || isNaN(endDt.getTime())) {
    return { available: false, message: 'Please select valid check-in and check-out dates.' };
  }

  if (endDt < startDt) {
    return { available: false, message: 'Check-out date cannot be earlier than check-in date.' };
  }

  const cursor = new Date(startDt);
  let daysChecked = 0;
  while (cursor <= endDt && daysChecked < 60) {
    const y = cursor.getFullYear();
    const m = (cursor.getMonth() + 1).toString().padStart(2, '0');
    const d = cursor.getDate().toString().padStart(2, '0');
    const ds = `${y}-${m}-${d}`;
    const single = checkSessionAvailability(ds, session);
    if (!single.available) {
      return {
        available: false,
        message: `${ds}: ${single.message}`
      };
    }
    cursor.setDate(cursor.getDate() + 1);
    daysChecked++;
  }

  return {
    available: true,
    message:
      checkOutDate && checkOutDate !== checkInDate
        ? 'Selected date range is available for reservation enquiry!'
        : 'This date and session slot are available for reservation enquiry!'
  };
}

export function checkMultipleDatesAvailability(
  selectedDates: string[],
  session: SessionSlot
): {
  available: boolean;
  message: string;
} {
  if (!selectedDates || selectedDates.length === 0) {
    return { available: false, message: 'Please select at least one event date.' };
  }

  const sorted = [...selectedDates].sort();
  for (const ds of sorted) {
    const single = checkSessionAvailability(ds, session);
    if (!single.available) {
      return {
        available: false,
        message: `${ds}: ${single.message}`
      };
    }
  }

  return {
    available: true,
    message:
      sorted.length > 1
        ? `All ${sorted.length} selected dates are available for reservation enquiry!`
        : 'This date and session slot are available for reservation enquiry!'
  };
}

export async function submitBookingEnquiry(payload: BookingEnquiryPayload): Promise<BookingSubmissionResponse> {
  const effectiveDates =
    payload.selectedDates && payload.selectedDates.length > 0
      ? [...payload.selectedDates].sort()
      : [payload.eventDate];

  const check = checkMultipleDatesAvailability(effectiveDates, payload.session);
  if (!check.available) {
    throw new Error(check.message);
  }

  const randomRefNum = Math.floor(100000 + Math.random() * 900000);
  const reference = `PSC-2026-${randomRefNum}`;
  const now = new Date().toISOString();
  const primaryDate = effectiveDates[0];
  const effectiveCheckOut =
    payload.checkOutDate || effectiveDates[effectiveDates.length - 1] || primaryDate;

  const newEnquiry = {
    id: `enq-${Date.now()}`,
    reference,
    fullName: payload.fullName,
    mobileNumber: payload.mobileNumber,
    email: payload.email || undefined,
    eventDate: primaryDate,
    selectedDates: effectiveDates,
    checkOutDate: effectiveCheckOut,
    alternativeDate: payload.alternativeDate || undefined,
    session: payload.session,
    eventType: payload.eventType,
    expectedGuests: Number(payload.expectedGuests || 0),
    cateringPreference: payload.cateringPreference,
    additionalRequirements: payload.additionalRequirements || '',
    status: 'PENDING',
    date: primaryDate,
    submittedAt: now
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredEnquiries();
      existing.push(newEnquiry);
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(existing));
    } catch (e) {
      console.error('Storage error', e);
    }
  }

  // Artificial short delay to give genuine network review experience
  await new Promise(r => setTimeout(r, 650));

  return {
    success: true,
    reference,
    eventDate: primaryDate,
    selectedDates: effectiveDates,
    checkOutDate: effectiveCheckOut,
    eventType: payload.eventType,
    session: payload.session,
    status: 'PENDING',
    message: 'Your booking enquiry has been received by PS Convention Center. Our reservation manager will review availability and call you within 24 hours.',
    customerName: payload.fullName,
    mobileNumber: payload.mobileNumber,
    email: payload.email || undefined,
    expectedGuests: Number(payload.expectedGuests || 0),
    cateringPreference: payload.cateringPreference,
    submittedAt: now
  };
}
