import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Send, X, Plus } from 'lucide-react';
import { SessionSlot, CateringType, BookingEnquiryPayload } from '../../types/booking';
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

export const BookingEnquiryForm: React.FC<BookingEnquiryFormProps> = ({
  selectedDates,
  onToggleDate,
  onAddDate,
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
  const [manualDateInput, setManualDateInput] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityCheck, setAvailabilityCheck] = useState<{ available: boolean; message: string } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const sortedDates = useMemo(() => [...selectedDates].sort(), [selectedDates]);

  useEffect(() => {
    if (preselectedEventType) {
      setEventType(preselectedEventType);
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

  const formatDisplayDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleManualAddDate = () => {
    if (!manualDateInput || manualDateInput < todayStr) return;
    onAddDate(manualDateInput);
    setManualDateInput('');
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      err.fullName = 'Please enter your name.';
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      err.mobileNumber = 'Please enter a valid 10-digit phone number.';
    }

    if (sortedDates.length === 0) {
      err.availability = 'Please select at least one event date from the calendar above or add a date below.';
    } else if (availabilityCheck && !availabilityCheck.available) {
      err.availability = availabilityCheck.message;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (sortedDates.length === 0) return;

    await onSubmitEnquiry({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      eventDate: sortedDates[0],
      selectedDates: sortedDates,
      checkOutDate: sortedDates[sortedDates.length - 1],
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
    'Low Budget Plan',
    'High Budget Plan',
    'Premium Budget Plan',
    'Low Budget Hall',
    'High Budget Hall',
    'Premium Hall',
    'Hall',
    'Lawn',
    'Rooms',
    'Dining & Catering',
    'Open Terrace',
    'Parking & Security',
    'Other Private Event'
  ];

  const isSlotUnavailable = sortedDates.length > 0 && availabilityCheck !== null && !availabilityCheck.available;

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

        {/* Selected Dates Count Summary Badge */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/40">
          <Calendar className="w-4 h-4 text-[#C5A45D] shrink-0" />
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              Selected Event Dates
            </span>
            {sortedDates.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-bold text-[#234D3C] dark:text-gray-100">
                <span>
                  {sortedDates.length} {sortedDates.length === 1 ? 'Date Selected' : 'Dates Selected'}
                </span>
              </div>
            ) : (
              <span className="block text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
                Select dates on calendar above
              </span>
            )}
          </div>
          {sortedDates.length > 0 && (
            <button
              type="button"
              onClick={onClearDates}
              title="Clear all selected dates"
              className="ml-1 p-1.5 border border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-300 hover:text-red-600 hover:border-red-400 transition-colors cursor-pointer"
              aria-label="Clear all selected dates"
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

        {/* Automatically Populated Selected Calendar Dates Section */}
        <div className="p-4 sm:p-5 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/30 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
                Selected Event Dates (Auto-Populated from Calendar) *
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]">
                {sortedDates.length} {sortedDates.length === 1 ? 'Date' : 'Dates'}
              </span>
            </div>
            {sortedDates.length > 0 && (
              <button
                type="button"
                onClick={onClearDates}
                className="text-[11px] uppercase font-semibold tracking-wider text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All Dates</span>
              </button>
            )}
          </div>

          {/* Populated Selected Dates Review List */}
          {sortedDates.length > 0 ? (
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                {sortedDates.map((dateStr) => (
                  <div
                    key={dateStr}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-[#0c2317] border border-[#C5A45D] text-[#234D3C] dark:text-[#f3eedd] shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C5A45D] shrink-0" />
                    <span>{formatDisplayDate(dateStr)}</span>
                    <button
                      type="button"
                      onClick={() => onToggleDate(dateStr)}
                      title={`Remove ${formatDisplayDate(dateStr)}`}
                      aria-label={`Remove ${formatDisplayDate(dateStr)}`}
                      className="p-0.5 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                readOnly
                value={sortedDates.map((d) => formatDisplayDate(d)).join(' • ')}
                aria-label="Selected event dates summary"
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-white/90 dark:bg-[#0c2317] border border-gray-200 dark:border-white/15 text-[#234D3C] dark:text-[#f3eedd] outline-none"
              />
            </div>
          ) : (
            <div className="p-3 bg-white dark:bg-[#0c2317] border border-dashed border-gray-300 dark:border-white/20 text-xs text-gray-600 dark:text-gray-300">
              No dates selected yet. Click one or more dates on the interactive calendar above, or add a date below.
            </div>
          )}

          {/* Optional Manual Date Picker to Add More Dates */}
          <div className="pt-2 border-t border-gray-200/70 dark:border-white/10 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 shrink-0">
              Add Another Date:
            </label>
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <input
                type="date"
                min={todayStr}
                value={manualDateInput}
                onChange={(e) => setManualDateInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#0c2317] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] outline-none"
              />
              <button
                type="button"
                onClick={handleManualAddDate}
                disabled={!manualDateInput}
                className="px-3.5 py-2 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs font-bold uppercase tracking-wider hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {errors.availability && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">{errors.availability}</p>
          )}

          {/* Multiple Dates Availability Status */}
          {sortedDates.length > 0 && availabilityCheck && (
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
                Event / Facility / Package <span className="text-gray-400 font-normal lowercase">(optional)</span>
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
