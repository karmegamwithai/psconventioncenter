import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, ShieldAlert, Send, RefreshCw } from 'lucide-react';
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
  const [alternativeDate, setAlternativeDate] = useState('');
  const [expectedGuests, setExpectedGuests] = useState<number>(600);
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
    : 'No Date Selected';

  const validate = (): boolean => {
    const err: Record<string, string> = {};

    if (!selectedDate) {
      err.selectedDate = 'Please select a date on the calendar above.';
    }

    if (!fullName.trim() || fullName.trim().length < 3) {
      err.fullName = 'Please enter your full name.';
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
    'Anniversary Galas',
    'Milestone Celebrations',
    'Family Gatherings',
    'Other'
  ];

  return (
    <div className="w-full bg-[#FAF8F2] border border-[#e2d8c3] shadow-xl p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="border-b border-[#e2d8c3] pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            RESERVATION ENQUIRY
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#234D3C] tracking-tight">
            Event Booking Form
          </h3>
        </div>
      </div>

      {/* Selected Date Banner */}
      <div className="p-3 sm:p-4 bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#234D3C] text-[#C5A45D] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-gray-500 block">
              Selected Date
            </span>
            <span className="text-xs sm:text-base font-bold text-[#234D3C]">
              {formattedSelectedDate}
            </span>
          </div>
        </div>

        {selectedDate ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 bg-[#E8F2E8] text-[#234D3C] border border-[#234D3C]/20 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Selected
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Select Date from Calendar Above
          </span>
        )}
      </div>
      {errors.selectedDate && (
        <p className="text-xs text-red-600 font-semibold">{errors.selectedDate}</p>
      )}

      {/* Session Selection */}
      <div className="space-y-2">
        <label className="block text-xs uppercase font-bold tracking-wider text-[#234D3C]">
          Session Slot *
        </label>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {sessionOptions.map((opt) => {
            const isChosen = session === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSession(opt.id)}
                className={`py-2.5 sm:py-3 px-1 sm:px-2 text-center transition-all cursor-pointer border ${
                  isChosen
                    ? 'bg-[#234D3C] text-white border-[#C5A45D] shadow-md ring-1 ring-[#C5A45D]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#234D3C]/40'
                }`}
              >
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider block ${isChosen ? 'text-[#C5A45D]' : 'text-[#234D3C]'}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot Availability Alert */}
      {selectedDate && availabilityCheck && (
        <div
          className={`p-3.5 text-xs flex items-center justify-between border ${
            availabilityCheck.available
              ? 'bg-[#EBF5ED] text-[#1B4D20] border-emerald-300'
              : 'bg-[#FBEBEB] text-[#842029] border-red-300'
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
            <span>Verify</span>
          </button>
        </div>
      )}

      {/* Booking Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

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
                className="w-full pl-11 pr-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
              />
            </div>
            {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Event Type *
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
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
          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Alternative Date <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              value={alternativeDate}
              onChange={(e) => setAlternativeDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            />
          </div>

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
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-[11px] text-gray-500">Guests</span>
            </div>
            {errors.expectedGuests && <p className="text-[11px] text-red-600 mt-1">{errors.expectedGuests}</p>}
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
              Catering Preference *
            </label>
            <select
              value={cateringPreference}
              onChange={(e) => setCateringPreference(e.target.value as CateringType)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
            >
              <option value="VEGETARIAN">Vegetarian (Indoor Kitchen)</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian (Outdoor Kitchen)</option>
              <option value="DISCUSS_LATER">Discuss Later</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
            Special Notes <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="E.g., Require 4 bridal suites, specific Mandap decorator, generator timeline..."
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleManualCheckAvailability}
            className="px-6 py-3.5 bg-white text-[#234D3C] border border-[#234D3C] text-xs uppercase font-bold tracking-[0.15em] hover:bg-[#E8F2E8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C5A45D]" />
            <span>CHECK AVAILABILITY</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting || (availabilityCheck !== null && !availabilityCheck.available)}
            className={`flex-1 py-3.5 px-6 text-xs uppercase font-bold tracking-[0.15em] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isSubmitting || (availabilityCheck !== null && !availabilityCheck.available)
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-[#234D3C] text-white hover:bg-[#163b2c]'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Request...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C5A45D]" />
                <span>SUBMIT ENQUIRY</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-gray-500 text-center">
          Submitting an enquiry does not automatically confirm a booking. Our team will contact you to review arrangements.
        </p>
      </form>
    </div>
  );
};
