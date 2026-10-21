import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Utensils, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Send, RefreshCw } from 'lucide-react';
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
  dayData,
  onDateChange,
  onSubmitEnquiry,
  isSubmitting,
  preselectedEventType
}) => {
  const [session, setSession] = useState<SessionSlot>('FULL_DAY');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(preselectedEventType || 'Wedding');
  const [alternativeDate, setAlternativeDate] = useState('');
  const [expectedGuests, setExpectedGuests] = useState<number>(500);
  const [cateringPreference, setCateringPreference] = useState<CateringType>('VEGETARIAN');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityCheck, setAvailabilityCheck] = useState<{ available: boolean; message: string } | null>(null);

  // Sync eventType if preselected changes
  useEffect(() => {
    if (preselectedEventType) {
      setEventType(preselectedEventType);
    }
  }, [preselectedEventType]);

  // When selected date or session changes, evaluate slot availability
  useEffect(() => {
    if (selectedDate) {
      const res = checkSessionAvailability(selectedDate, session);
      setAvailabilityCheck(res);
    } else {
      setAvailabilityCheck(null);
    }
  }, [selectedDate, session]);

  // Formatted date string for human reading
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'No Date Selected';

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!selectedDate) {
      err.selectedDate = 'Please select a date on the calendar above.';
    }

    if (!fullName.trim() || fullName.trim().length < 3) {
      err.fullName = 'Full Name must be at least 3 characters.';
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      err.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      err.email = 'Please provide a valid email address.';
    }

    if (!eventType) {
      err.eventType = 'Please select an event type.';
    }

    if (!expectedGuests || expectedGuests < 20) {
      err.expectedGuests = 'Expected guests must be at least 20.';
    } else if (expectedGuests > 2000) {
      err.expectedGuests = 'Maximum capacity is approx. 1,500-2,000 guests.';
    }

    if (selectedDate && availabilityCheck && !availabilityCheck.available) {
      err.session = availabilityCheck.message;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleManualCheckAvailability = () => {
    if (!selectedDate) {
      setErrors({ selectedDate: 'Please click a date on the calendar first.' });
      return;
    }
    const res = checkSessionAvailability(selectedDate, session);
    setAvailabilityCheck(res);
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
      alternativeDate: alternativeDate || undefined,
      session,
      eventType,
      expectedGuests: Number(expectedGuests),
      cateringPreference,
      additionalRequirements: additionalRequirements.trim() || undefined
    });
  };

  const sessionOptions: Array<{ id: SessionSlot; label: string; time: string; desc: string }> = [
    {
      id: 'FULL_DAY',
      label: 'Full Day',
      time: '6:00 AM – 11:00 PM',
      desc: 'Ideal for complete wedding celebrations with Morning Muhurtham and Grand Evening Reception.'
    },
    {
      id: 'MORNING',
      label: 'Morning Session',
      time: '6:00 AM – 2:00 PM',
      desc: 'Auspicious Muhurtham poojas, Upanayanam, or morning betrothal rituals.'
    },
    {
      id: 'EVENING',
      label: 'Evening Session',
      time: '3:00 PM – 11:00 PM',
      desc: 'Cocktail receptions, birthday galas, corporate banquets, and music sangeet.'
    }
  ];

  const eventTypesList = [
    'Wedding',
    'Wedding Reception',
    'Engagement Ceremony',
    'Birthday Celebration',
    'Wedding Anniversary',
    'Family Gathering',
    'Traditional Ceremony',
    'Corporate Event',
    'Other'
  ];

  return (
    <div className="bg-[#FAF8F2] rounded-sm border border-[#e2d8c3] shadow-md p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#e2d8c3] pb-4">
        <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DATE & SESSION DETAILS</span>
        </div>
        <h3 className="text-2xl font-bold text-[#234D3C] tracking-tight">
          Tell Us About Your Celebration.
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Review your selected date, choose your event timings, and share requirements for an itemized quotation.
        </p>
      </div>

      {/* Selected Date Ribbon */}
      <div className="p-4 rounded bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#234D3C] text-[#C5A45D] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 block">
              Requested Event Date
            </span>
            <span className="text-base font-bold text-[#234D3C]">
              {formattedSelectedDate}
            </span>
          </div>
        </div>

        {selectedDate ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#E8F2E8] text-[#234D3C] border border-[#234D3C]/20 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Date Picked
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Pick Date from Calendar
          </span>
        )}
      </div>
      {errors.selectedDate && (
        <p className="text-xs text-red-600 font-semibold">{errors.selectedDate}</p>
      )}

      {/* Session Selection */}
      <div className="space-y-3">
        <label className="block text-xs uppercase font-bold tracking-wider text-[#234D3C]">
          Select Event Session *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sessionOptions.map((opt) => {
            const isChosen = session === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSession(opt.id)}
                className={`p-3.5 rounded text-left transition-all cursor-pointer border ${
                  isChosen
                    ? 'bg-[#234D3C] text-white border-[#C5A45D] shadow-md ring-1 ring-[#C5A45D]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#234D3C]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isChosen ? 'text-[#C5A45D]' : 'text-[#234D3C]'}`}>
                    {opt.label}
                  </span>
                  <Clock className={`w-3.5 h-3.5 ${isChosen ? 'text-[#C5A45D]' : 'text-gray-400'}`} />
                </div>
                <div className={`text-[11px] font-semibold mt-1 ${isChosen ? 'text-white' : 'text-gray-800'}`}>
                  {opt.time}
                </div>
                <p className={`text-[10px] mt-1.5 leading-snug line-clamp-2 ${isChosen ? 'text-gray-200' : 'text-gray-500'}`}>
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Availability & Conflict Indicator */}
      {selectedDate && availabilityCheck && (
        <div
          className={`p-3.5 rounded text-xs flex items-center justify-between border ${
            availabilityCheck.available
              ? 'bg-[#DDF1DF] text-[#1B4D20] border-emerald-300'
              : 'bg-[#F1D4D4] text-[#842029] border-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {availabilityCheck.available ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
            )}
            <span className="font-semibold">{availabilityCheck.message}</span>
          </div>
          <button
            type="button"
            onClick={handleManualCheckAvailability}
            className="text-[11px] underline hover:no-underline font-semibold flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Re-verify</span>
          </button>
        </div>
      )}

      {/* Booking Enquiry Form */}
      <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Balasubramanian M"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-semibold text-gray-500">+91</span>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="98401 23456"
                className="w-full pl-11 pr-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
              />
            </div>
            {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Address */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="balu@example.com"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Event Type *
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            >
              {eventTypesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Alternative Date */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Alternative Date <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              value={alternativeDate}
              onChange={(e) => setAlternativeDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
          </div>

          {/* Expected Guests */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Expected Guests *
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={20}
                max={2000}
                step={25}
                value={expectedGuests}
                onChange={(e) => setExpectedGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-[11px] text-gray-500">Guests</span>
            </div>
            {errors.expectedGuests && <p className="text-[11px] text-red-600 mt-1">{errors.expectedGuests}</p>}
          </div>

          {/* Catering Preference */}
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Catering Preference *
            </label>
            <select
              value={cateringPreference}
              onChange={(e) => setCateringPreference(e.target.value as CateringType)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            >
              <option value="VEGETARIAN">Vegetarian (Indoor Kitchen)</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian (Outdoor Kitchen)</option>
              <option value="DISCUSS_LATER">Discuss Later with Team</option>
            </select>
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
            Additional Requirements / Special Notes <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="E.g., Require 4 bridal suites, specific Mandap decorator appointed, Vedic pooja arrangements, generator timeline..."
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleManualCheckAvailability}
            className="px-6 py-3.5 bg-white text-[#234D3C] border border-[#234D3C] text-xs uppercase font-bold tracking-wider rounded hover:bg-[#E8F2E8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C5A45D]" />
            <span>CHECK AVAILABILITY</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting || (availabilityCheck !== null && !availabilityCheck.available)}
            className={`flex-1 py-3.5 px-6 rounded text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
              isSubmitting || (availabilityCheck !== null && !availabilityCheck.available)
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-[#234D3C] text-white hover:bg-[#17372a]'
            }`}
          >
            {isSubmitting ? (
              <span>Verifying & Sending Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C5A45D]" />
                <span>SUBMIT BOOKING REQUEST</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-gray-500 text-center italic">
          *Submitting an enquiry does not automatically confirm a booking. Our reservation coordinator will contact you to review arrangements and finalize dates.
        </p>
      </form>
    </div>
  );
};
