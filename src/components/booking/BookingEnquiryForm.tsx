import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { SessionSlot, CateringType, BookingEnquiryPayload, DayAvailability } from '../../types/booking';
import { checkSessionAvailability } from '../../services/bookingService';

interface BookingEnquiryFormProps {
  selectedDate: string | null;
  dayData: DayAvailability | null;
  onDateChange: (dateStr: string) => void;
  onSubmitEnquiry: (payload: BookingEnquiryPayload) => Promise<void>;
  isSubmitting: boolean;
  preselectedEventType?: string;
}

export const BookingEnquiryForm: React.FC<BookingEnquiryFormProps> = ({
  selectedDate,
  onSubmitEnquiry,
  isSubmitting,
  preselectedEventType
}) => {
  const [session, setSession] = useState<SessionSlot>('FULL_DAY');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(preselectedEventType || 'Grand Weddings');
  const [expectedGuests, setExpectedGuests] = useState<number>(500);
  const [cateringPreference, setCateringPreference] = useState<CateringType>('VEGETARIAN');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityCheck, setAvailabilityCheck] = useState<{ available: boolean; message: string } | null>(null);

  useEffect(() => {
    if (preselectedEventType) {
      setEventType(preselectedEventType);
    }
  }, [preselectedEventType]);

  useEffect(() => {
    if (selectedDate) {
      const res = checkSessionAvailability(selectedDate, session);
      setAvailabilityCheck(res);
    } else {
      setAvailabilityCheck(null);
    }
  }, [selectedDate, session]);

  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Please select a date from the calendar';

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!selectedDate) {
      err.selectedDate = 'Please select an event date on the calendar above.';
    }

    if (!fullName.trim() || fullName.trim().length < 3) {
      err.fullName = 'Please enter your name.';
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      err.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      err.email = 'Please provide a valid email.';
    }

    if (!expectedGuests || expectedGuests < 20) {
      err.expectedGuests = 'Minimum 20 guests.';
    }

    if (selectedDate && availabilityCheck && !availabilityCheck.available) {
      err.session = availabilityCheck.message;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!selectedDate) return;

    await onSubmitEnquiry({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim(),
      eventDate: selectedDate,
      session,
      eventType,
      expectedGuests: Number(expectedGuests),
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
    'Other Private Event'
  ];

  const isSlotUnavailable = selectedDate !== null && availabilityCheck !== null && !availabilityCheck.available;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 border-t-4 border-t-[#C5A45D] shadow-xl p-6 sm:p-10 transition-all">
      {/* Simple Form Header */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left border-b border-gray-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A45D] block">
            RESERVATION ENQUIRY
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#234D3C] tracking-tight mt-0.5">
            Book Your Event
          </h3>
        </div>

        {/* Selected Date Summary Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#FAF8F2] border border-[#e2d8c3] self-center sm:self-auto">
          <Calendar className="w-4 h-4 text-[#C5A45D] shrink-0" />
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-medium">Selected Date</span>
            <span className="block text-xs sm:text-sm font-bold text-[#234D3C]">
              {formattedSelectedDate}
            </span>
          </div>
        </div>
      </div>

      {errors.selectedDate && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.selectedDate}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Session Slot Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Session Slot *
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
                      ? 'bg-[#234D3C] text-white border-[#234D3C] shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className={isChosen ? 'text-[#C5A45D]' : 'text-gray-800'}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Simple Slot Status Note */}
          {selectedDate && availabilityCheck && (
            <div className="mt-2 text-xs flex items-center gap-1.5">
              {availabilityCheck.available ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Slot Available for booking
                </span>
              ) : (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {availabilityCheck.message}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Contact Information (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
            />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-semibold text-gray-400">+91</span>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="98401 23456"
                className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
              />
            </div>
            {errors.mobileNumber && <p className="text-xs text-red-600 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        {/* Email & Event Type (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Event Type *
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
            >
              {eventTypesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests & Catering (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Expected Guests *
            </label>
            <input
              type="number"
              required
              min={20}
              max={2500}
              step={25}
              value={expectedGuests}
              onChange={(e) => setExpectedGuests(Number(e.target.value))}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
            />
            {errors.expectedGuests && <p className="text-xs text-red-600 mt-1">{errors.expectedGuests}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Catering Preference *
            </label>
            <select
              value={cateringPreference}
              onChange={(e) => setCateringPreference(e.target.value as CateringType)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none transition-all"
            >
              <option value="VEGETARIAN">Vegetarian (Pure Veg Kitchen)</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian (Dedicated Kitchen)</option>
              <option value="DISCUSS_LATER">Decide Later</option>
            </select>
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            Special Requests <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            rows={2}
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="Any specific requests or requirements..."
            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none resize-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isSlotUnavailable}
            className={`w-full py-4 px-8 text-xs sm:text-sm uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer ${
              isSubmitting || isSlotUnavailable
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-[#234D3C] text-white hover:bg-[#163b2c] hover:shadow-xl active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Your Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C5A45D]" />
                <span>SUBMIT BOOKING ENQUIRY</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center mt-3">
            Our team will connect with you to confirm dates and guide you through the venue arrangements.
          </p>
        </div>

      </form>
    </div>
  );
};
