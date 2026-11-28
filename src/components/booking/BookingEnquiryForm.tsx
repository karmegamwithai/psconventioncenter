import React, { useState, useEffect, useMemo } from 'react';
import { Send } from 'lucide-react';
import {
  SessionSlot,
  CateringType,
  GuestRoomRequirement,
  BookingEnquiryPayload,
} from '../../types/booking';
import { checkMultipleDatesAvailability } from '../../services/bookingService';

interface BookingEnquiryFormProps {
  selectedDates: string[];
  onToggleDate: (dateStr: string) => void;
  onAddDate: (dateStr: string) => void;
  onClearDates: () => void;
  onSubmitEnquiry: (payload: BookingEnquiryPayload) => Promise<void>;
  isSubmitting: boolean;
  preselectedEventType?: string;
}

export const EVENT_DROPDOWN_OPTIONS = [
  'Low Budget Plan – Hall',
  'High Budget Plan – Hall',
  'Premium Budget Plan – Hall',
  'Lawn',
  'Rooms',
  'Dining & Catering',
] as const;

function normalizePreselectedEvent(raw?: string): string {
  if (!raw) return EVENT_DROPDOWN_OPTIONS[0];
  const lower = raw.toLowerCase();
  if (lower.includes('low budget')) return 'Low Budget Plan – Hall';
  if (lower.includes('high budget')) return 'High Budget Plan – Hall';
  if (lower.includes('premium')) return 'Premium Budget Plan – Hall';
  if (lower.includes('lawn')) return 'Lawn';
  if (lower.includes('room')) return 'Rooms';
  if (lower.includes('dining') || lower.includes('catering')) return 'Dining & Catering';
  if ((EVENT_DROPDOWN_OPTIONS as readonly string[]).includes(raw)) return raw;
  return EVENT_DROPDOWN_OPTIONS[0];
}

export const BookingEnquiryForm: React.FC<BookingEnquiryFormProps> = ({
  selectedDates,
  onSubmitEnquiry,
  isSubmitting,
  preselectedEventType,
}) => {
  const [session, setSession] = useState<SessionSlot>('FULL_DAY');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [eventType, setEventType] = useState<string>(() =>
    normalizePreselectedEvent(preselectedEventType)
  );
  const [expectedGuests, setExpectedGuests] = useState<string>('500');
  const [cateringPreference, setCateringPreference] = useState<CateringType>('VEGETARIAN');
  const [guestRoomRequirement, setGuestRoomRequirement] =
    useState<GuestRoomRequirement>('Decide Later');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityCheck, setAvailabilityCheck] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const sortedDates = useMemo(() => [...selectedDates].sort(), [selectedDates]);

  useEffect(() => {
    if (preselectedEventType) {
      setEventType(normalizePreselectedEvent(preselectedEventType));
    }
  }, [preselectedEventType]);

  useEffect(() => {
    if (sortedDates.length > 0) {
      const res = checkMultipleDatesAvailability(sortedDates, session);
      setAvailabilityCheck(res);
    } else {
      setAvailabilityCheck(null);
    }
  }, [sortedDates, session]);

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      err.fullName = 'Please enter your name.';
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      err.mobileNumber = 'Please enter a valid 10-digit phone number.';
    }

    if (sortedDates.length > 0 && availabilityCheck && !availabilityCheck.available) {
      err.availability = availabilityCheck.message;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const effectiveDates = sortedDates.length > 0 ? sortedDates : [todayStr];

    await onSubmitEnquiry({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      eventDate: effectiveDates[0],
      selectedDates: effectiveDates,
      checkOutDate: effectiveDates[effectiveDates.length - 1],
      session,
      eventType,
      expectedGuests: Number(expectedGuests) || 0,
      cateringPreference,
      guestRoomRequirement,
      additionalRequirements: additionalRequirements.trim() || undefined,
    });
  };

  const sessionOptions: Array<{ id: SessionSlot; label: string }> = [
    { id: 'FULL_DAY', label: 'Full Day' },
    { id: 'MORNING', label: 'Morning' },
    { id: 'EVENING', label: 'Evening' },
  ];

  const guestRoomOptions: GuestRoomRequirement[] = ['Yes', 'No', 'Decide Later'];

  const isSlotUnavailable =
    sortedDates.length > 0 && availabilityCheck !== null && !availabilityCheck.available;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 border-t-4 border-t-[#C5A45D] shadow-xl p-6 sm:p-10 transition-colors duration-300">
      {/* Form Header */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left border-b border-gray-100 dark:border-white/10 pb-5">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A45D] block">
          RESERVATION ENQUIRY
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#234D3C] dark:text-[#f3eedd] tracking-tight mt-0.5">
          Book Event
        </h3>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.availability && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            {errors.availability}
          </p>
        )}

        {/* Mandatory Contact Fields: Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-semibold text-gray-400">
                +91
              </span>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="98401 23456"
                className="w-full pl-12 pr-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.mobileNumber}</p>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-6">
          {/* Session Slot Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-2">
              Session Slot <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {sessionOptions.map((opt) => {
                const isChosen = session === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSession(opt.id)}
                    className={`py-3 px-2 text-center transition-all cursor-pointer border text-xs font-bold uppercase tracking-wider ${
                      isChosen
                        ? 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] border-[#234D3C] dark:border-[#C5A45D] shadow-sm'
                        : 'bg-white dark:bg-[#07150e] text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/20 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className={
                        isChosen
                          ? 'text-[#C5A45D] dark:text-[#07150e]'
                          : 'text-gray-800 dark:text-gray-200'
                      }
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event, Expected Guests, Catering & Guest Room Requirement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Event
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              >
                {EVENT_DROPDOWN_OPTIONS.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Expected Guests{' '}
                <span className="text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="number"
                min={20}
                max={2500}
                step={25}
                value={expectedGuests}
                onChange={(e) => setExpectedGuests(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Catering <span className="text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                value={cateringPreference}
                onChange={(e) => setCateringPreference(e.target.value as CateringType)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              >
                <option
                  value="VEGETARIAN"
                  className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100"
                >
                  Vegetarian (Pure Veg Kitchen)
                </option>
                <option
                  value="NON_VEGETARIAN"
                  className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100"
                >
                  Non-Vegetarian (Dedicated Kitchen)
                </option>
                <option
                  value="DISCUSS_LATER"
                  className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100"
                >
                  Decide Later
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Guest Room Requirement
              </label>
              <select
                value={guestRoomRequirement}
                onChange={(e) =>
                  setGuestRoomRequirement(e.target.value as GuestRoomRequirement)
                }
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              >
                {guestRoomOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100"
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Special Requests{' '}
              <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="Any specific requests or requirements..."
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none resize-none transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isSlotUnavailable}
            className={`w-full py-4 px-8 text-xs sm:text-sm uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer ${
              isSubmitting || isSlotUnavailable
                ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] hover:shadow-xl active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Your Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                <span>SUBMIT BOOKING ENQUIRY</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center mt-3">
            Our team will connect with you to confirm dates and guide you through the venue arrangements.
          </p>
        </div>
      </form>
    </div>
  );
};
