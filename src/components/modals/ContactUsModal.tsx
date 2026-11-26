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
      newErrors.name = 'Please enter your full name.';
    }

    const cleanedPhone = phoneNumber.trim();
    const digitsOnly = cleanedPhone.replace(/\D/g, '');
    const validPhonePattern = /^[+]?[0-9\s\-()]{10,15}$/;
    if (!cleanedPhone || digitsOnly.length < 10 || digitsOnly.length > 13 || !validPhonePattern.test(cleanedPhone)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message.';
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
    }, 450);
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-us-modal-title"
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0c1f17] text-[#202823] dark:text-[#f4f1ea] w-full max-w-lg rounded-sm shadow-2xl border border-[#C5A45D]/50 border-t-4 border-t-[#C5A45D] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto font-['Urbanist','Outfit',sans-serif]"
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
              <h3
                id="contact-us-modal-title"
                className="text-lg sm:text-2xl font-bold font-['Cormorant_Garamond',serif]"
              >
                Contact Us
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="text-gray-200 hover:text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer text-xl leading-none"
            aria-label="Close modal"
            title="Close (×)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 bg-[#FAF8F2] dark:bg-[#08150f]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7 text-[#C5A45D] dark:text-[#07150e]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-bold text-[#234D3C] dark:text-[#f3eedd] font-['Cormorant_Garamond',serif]">
                  Thank You! Your Enquiry Has Been Sent.
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                  We have received your message. Our venue team at Padmasena Convention Center will contact you shortly.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setPhoneNumber('');
                    setMessage('');
                    setErrors({});
                    setIsSubmitted(false);
                  }}
                  className="px-5 py-2.5 border border-[#234D3C] dark:border-[#C5A45D]/50 text-[#234D3C] dark:text-[#C5A45D] text-xs uppercase font-bold tracking-[0.16em] hover:bg-[#E8F2E8] dark:hover:bg-[#122e22] transition-all cursor-pointer"
                >
                  Send Another
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-7 py-2.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.18em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* 1. Name Field (Mandatory) */}
              <div>
                <label
                  htmlFor="contact-modal-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-modal-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* 2. Phone Number Field (Mandatory & Validated) */}
              <div>
                <label
                  htmlFor="contact-modal-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5"
                >
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-modal-phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                  }}
                  placeholder="Enter your 10-digit phone number"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none transition-all"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* 3. Message Field (Mandatory) */}
              <div>
                <label
                  htmlFor="contact-modal-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-modal-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Write your message or enquiry details..."
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 text-[#202823] dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none resize-none transition-all"
                />
                {errors.message && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                    {errors.message}
                  </p>
                )}
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
