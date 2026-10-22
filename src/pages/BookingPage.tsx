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
  // Calendar month state
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<BookingSubmissionResponse | null>(null);

  // Load availability whenever month/year changes
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getAvailabilityForMonth(year, month);
    setAvailability(days);

    // If no date is selected yet in this month, auto-pick the first available upcoming date
    if (!selectedDate) {
      const firstAvailable = days.find(d => !d.isBlocked && d.status !== 'CONFIRMED' && d.status !== 'BLOCKED');
      if (firstAvailable) {
        setSelectedDate(firstAvailable.date);
      }
    }
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
    const todayPad = today.getDate().toString().padStart(2, '0');
    const monthPad = (today.getMonth() + 1).toString().padStart(2, '0');
    setSelectedDate(`${today.getFullYear()}-${monthPad}-${todayPad}`);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    const formEl = document.getElementById('booking-enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitEnquiry = async (payload: BookingEnquiryPayload) => {
    setIsSubmitting(true);
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
      alert(err.message || 'Unable to submit enquiry. Please check slot availability.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeAnotherEnquiry = () => {
    setSubmissionResult(null);
  };

  const currentSelectedDayData = availability.find(a => a.date === selectedDate) || null;

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
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
          /* Section 2, 3, & 4: Full Screen Calendar & Form Underneath */
          <div className="space-y-8 sm:space-y-12">
            {/* Full Screen / Full Width Calendar */}
            <div className="w-full">
              <AvailabilityCalendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
                availability={availability}
              />
            </div>

            {/* Under: Fill the Form */}
            <div id="booking-enquiry-form" className="w-full scroll-mt-24">
              <BookingEnquiryForm
                selectedDate={selectedDate}
                dayData={currentSelectedDayData}
                onDateChange={(d) => setSelectedDate(d)}
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
