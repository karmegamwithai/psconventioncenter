import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your name.';
    }
    const digits = phoneNumber.replace(/\D/g, '');
    if (!digits || digits.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleResetAndClose = () => {
    setName('');
    setPhoneNumber('');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={handleResetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0c1f17] text-[#202823] dark:text-[#f4f1ea] w-full max-w-lg rounded-sm shadow-2xl border border-[#C5A45D]/50 border-t-4 border-t-[#C5A45D] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#234D3C] dark:bg-[#081710] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#C5A45D]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FAF8F2] dark:bg-[#122e22] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center border border-[#C5A45D]/40 shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#234D3C] dark:text-[#C5A45D]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#C5A45D] block">
                PADMASENA CONVENTION CENTER
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-['Cormorant_Garamond',serif]">
                Contact Us
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="text-gray-300 hover:text-white p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 bg-[#FAF8F2] dark:bg-[#08150f]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#C5A45D] dark:text-[#07150e]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-bold text-[#234D3C] dark:text-[#f3eedd] font-['Cormorant_Garamond',serif]">
                  Enquiry Submitted Successfully
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                  Thank you for contacting Padmasena Convention Center. Our team will reach out to you shortly.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-8 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* 2. Phone Number Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder="+91 98401 23456"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* 3. Message Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message or enquiry..."
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs sm:text-sm uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
