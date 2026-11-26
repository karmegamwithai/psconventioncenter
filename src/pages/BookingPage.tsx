import React, { useState, useEffect } from 'react';
import { BookingHero } from '../components/booking/BookingHero';
import { AvailabilityCalendar } from '../components/booking/AvailabilityCalendar';
import { BookingEnquiryForm } from '../components/booking/BookingEnquiryForm';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { BookingSteps } from '../components/booking/BookingSteps';
import { BookingFaq } from '../components/booking/BookingFaq';
import { getAvailabilityForMonth, submitBookingEnquiry } from '../services/bookingService';
import { DayAvailability, BookingEnquiryPayload, BookingSubmissionResponse } from '../types/booking';

interface BookingPageProps {
  onGoHome: () => void;
  preselectedEventType?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onGoHome, preselectedEventType }) => {
  // Calendar month state & multiple selected event dates state
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<BookingSubmissionResponse | null>(null);

  // Load availability whenever month/year changes
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getAvailabilityForMonth(year, month);
    setAvailability(days);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('booking-enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle selection of any event date on the calendar or form
  const handleToggleDate = (dateStr: string) => {
    setSubmitError(null);
    setSelectedDates((prev) => {
      if (prev.includes(dateStr)) {
        return prev.filter((d) => d !== dateStr);
      }
      return [...prev, dateStr].sort();
    });
  };

  const handleAddDate = (dateStr: string) => {
    setSubmitError(null);
    setSelectedDates((prev) => {
      if (prev.includes(dateStr)) return prev;
      return [...prev, dateStr].sort();
    });
  };

  const handleClearDates = () => {
    setSelectedDates([]);
    setSubmitError(null);
  };

  const handleSubmitEnquiry = async (payload: BookingEnquiryPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitBookingEnquiry(payload);
      setSubmissionResult(res);

      // Refresh availability for the calendar
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const updatedDays = getAvailabilityForMonth(year, month);
      setAvailability(updatedDays);

      // Scroll to confirmation
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(err?.message || 'Unable to submit enquiry. Please check slot availability.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeAnotherEnquiry = () => {
    setSubmissionResult(null);
    setSubmitError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] text-[#202823] dark:text-gray-100 transition-colors duration-300">
      {/* Section 1: Booking Page Hero */}
      <BookingHero onGoHome={onGoHome} />

      {/* Main Interactive Booking Arena */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 pb-24 sm:pb-16">
        {submissionResult ? (
          /* Section 5: Booking Submission Confirmation */
          <BookingConfirmation
            data={submissionResult}
            onGoHome={onGoHome}
            onNewEnquiry={handleMakeAnotherEnquiry}
          />
        ) : (
          /* Interactive Multiple-Date Calendar & Synced Enquiry Form */
          <div className="space-y-8 sm:space-y-12">
            <div className="w-full">
              <AvailabilityCalendar
                currentDate={currentDate}
                selectedDates={selectedDates}
                onToggleDate={handleToggleDate}
                onClearDates={handleClearDates}
                onJumpToForm={scrollToForm}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
                availability={availability}
              />
            </div>

            {submitError && (
              <div className="max-w-4xl mx-auto p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">
                {submitError}
              </div>
            )}

            {/* Under: Fill the Form */}
            <div id="booking-enquiry-form" className="w-full scroll-mt-24">
              <BookingEnquiryForm
                selectedDates={selectedDates}
                onToggleDate={handleToggleDate}
                onAddDate={handleAddDate}
                onClearDates={handleClearDates}
                onSubmitEnquiry={handleSubmitEnquiry}
                isSubmitting={isSubmitting}
                preselectedEventType={preselectedEventType}
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 6: Four-Step Booking Process */}
      <BookingSteps />

      {/* Section 7: Booking Information & FAQs */}
      <BookingFaq />
    </div>
  );
};
