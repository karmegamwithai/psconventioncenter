import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Send, X, ArrowRight } from 'lucide-react';
import { SessionSlot, CateringType, BookingEnquiryPayload } from '../../types/booking';
import { checkDateRangeAvailability } from '../../services/bookingService';

interface BookingEnquiryFormProps {
  checkInDate: string | null;
  checkOutDate: string | null;
  onCheckInChange: (dateStr: string | null) => void;
  onCheckOutChange: (dateStr: string | null) => void;
  onClearDates: () => void;
  onSubmitEnquiry: (payload: BookingEnquiryPayload) => Promise<void>;
  isSubmitting: boolean;
  preselectedEventType?: string;
}

export const BookingEnquiryForm: React.FC<BookingEnquiryFormProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  onClearDates,
  onSubmitEnquiry,
  isSubmitting,
  preselectedEventType
}) => {
  const [session, setSession] = useState<SessionSlot>('FULL_DAY');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [eventType, setEventType] = useState(preselectedEventType || 'Grand Weddings');
  const [expectedGuests, setExpectedGuests] = useState<string>('500');
  const [cateringPreference, setCateringPreference] = useState<CateringType>('VEGETARIAN');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityCheck, setAvailabilityCheck] = useState<{ available: boolean; message: string } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedEventType) {
      setEventType(preselectedEventType);
    }
  }, [preselectedEventType]);

  useEffect(() => {
    if (checkInDate) {
      const res = checkDateRangeAvailability(checkInDate, checkOutDate || checkInDate, session);
      setAvailabilityCheck(res);
    } else {
      setAvailabilityCheck(null);
    }
  }, [checkInDate, checkOutDate, session]);

  const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalDays = useMemo(() => {
    if (!checkInDate) return 0;
    const end = checkOutDate || checkInDate;
    const s = new Date(checkInDate + 'T00:00:00').getTime();
    const e = new Date(end + 'T00:00:00').getTime();
    return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
  }, [checkInDate, checkOutDate]);

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      err.fullName = 'Please enter your name.';
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      err.mobileNumber = 'Please enter a valid 10-digit phone number.';
    }

    if (!checkInDate) {
      err.availability = 'Please select your check-in date from the calendar or below.';
    } else if (!checkOutDate) {
      err.availability = 'Please select your check-out date to complete the date range.';
    } else if (checkOutDate < checkInDate) {
      err.availability = 'Check-out date cannot be earlier than check-in date.';
    } else if (availabilityCheck && !availabilityCheck.available) {
      err.availability = availabilityCheck.message;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!checkInDate) return;

    await onSubmitEnquiry({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      eventDate: checkInDate,
      checkOutDate: checkOutDate || checkInDate,
      session,
      eventType,
      expectedGuests: Number(expectedGuests) || 0,
      cateringPreference,
      additionalRequirements: additionalRequirements.trim() || undefined
    });
  };

  const sessionOptions: Array<{ id: SessionSlot; label: string }> = [
    { id: 'FULL_DAY', label: 'Full Day' },
    { id: 'MORNING', label: 'Morning' },
    { id: 'EVENING', label: 'Evening' }
  ];

  const eventTypesList = [
    'Grand Weddings',
    'Royal Receptions',
    'Corporate Summits',
    'Engagement Ceremonies',
    'Traditional Ceremonies',
    'Anniversary Celebrations',
    'Low Budget Hall',
    'High Budget Hall',
    'Premium Hall',
    'Hall - 3',
    'Lawn',
    'Rooms',
    'Dining & Catering',
    'Open Terrace',
    'Parking & Security',
    'Other Private Event'
  ];

  const isSlotUnavailable = checkInDate !== null && availabilityCheck !== null && !availabilityCheck.available;
  const checkInLabel = formatDisplayDate(checkInDate);
  const checkOutLabel = formatDisplayDate(checkOutDate);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 border-t-4 border-t-[#C5A45D] shadow-xl p-6 sm:p-10 transition-colors duration-300">
      {/* Form Header */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left border-b border-gray-100 dark:border-white/10 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A45D] block">
            RESERVATION ENQUIRY
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#234D3C] dark:text-[#f3eedd] tracking-tight mt-0.5">
            Book Your Event
          </h3>
        </div>

        {/* Selected Date Range Summary Badge */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/40">
          <Calendar className="w-4 h-4 text-[#C5A45D] shrink-0" />
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              Selected Availability Range
            </span>
            {checkInLabel ? (
              <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-bold text-[#234D3C] dark:text-gray-100">
                <span>{checkInLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>{checkOutLabel || 'Pick Check-Out'}</span>
                {checkInDate && checkOutDate && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] uppercase bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]">
                    {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
                  </span>
                )}
              </div>
            ) : (
              <span className="block text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
                Select dates on calendar or below
              </span>
            )}
          </div>
          {(checkInDate || checkOutDate) && (
            <button
              type="button"
              onClick={onClearDates}
              title="Clear selected dates"
              className="ml-1 p-1.5 border border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-300 hover:text-red-600 hover:border-red-400 transition-colors cursor-pointer"
              aria-label="Clear selected dates"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
            {errors.fullName && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-semibold text-gray-400">+91</span>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="98401 23456"
                className="w-full pl-12 pr-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              />
            </div>
            {errors.mobileNumber && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        {/* Mandatory Availability Date Range (Synced with Calendar, Editable & Clearable) */}
        <div className="p-4 sm:p-5 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/30 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
              Availability (Check-In &amp; Check-Out Dates) *
            </span>
            {(checkInDate || checkOutDate) && (
              <button
                type="button"
                onClick={onClearDates}
                className="text-[11px] uppercase font-semibold tracking-wider text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Dates</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
                Check-In Date *
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={checkInDate || ''}
                onChange={(e) => onCheckInChange(e.target.value || null)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#0c2317] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
                Check-Out Date *
              </label>
              <input
                type="date"
                required
                min={checkInDate || todayStr}
                value={checkOutDate || ''}
                onChange={(e) => onCheckOutChange(e.target.value || null)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#0c2317] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              />
            </div>
          </div>

          {errors.availability && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.availability}</p>
          )}

          {/* Range Availability Status */}
          {checkInDate && availabilityCheck && (
            <div className="text-xs flex items-center gap-1.5 pt-1">
              {availabilityCheck.available ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {availabilityCheck.message}
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {availabilityCheck.message}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Optional Preferences Divider */}
        <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-6">
          {/* Session Slot Selection (Optional) */}
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
                    <span className={isChosen ? 'text-[#C5A45D] dark:text-[#07150e]' : 'text-gray-800 dark:text-gray-200'}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Type & Expected Guests & Catering (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Event / Facility <span className="text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
              >
                {eventTypesList.map((type) => (
                  <option key={type} value={type} className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Expected Guests <span className="text-gray-400 font-normal lowercase">(optional)</span>
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
                <option value="VEGETARIAN" className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100">
                  Vegetarian (Pure Veg Kitchen)
                </option>
                <option value="NON_VEGETARIAN" className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100">
                  Non-Vegetarian (Dedicated Kitchen)
                </option>
                <option value="DISCUSS_LATER" className="bg-white dark:bg-[#07150e] text-gray-800 dark:text-gray-100">
                  Decide Later
                </option>
              </select>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Special Requests <span className="text-gray-400 font-normal lowercase">(optional)</span>
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
