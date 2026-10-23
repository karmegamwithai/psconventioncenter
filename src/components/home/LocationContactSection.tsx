import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, Navigation, CheckCircle2 } from 'lucide-react';
import { VENUE_INFO } from '../../data/venueData';

export const LocationContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', phone: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-[#07150e] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            ACCESSIBILITY & REACH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
            Conveniently Located. <br />
            <span className="italic font-semibold text-[#C5A45D]">Beautifully Connected.</span>
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location Details & Landmarks */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="bg-[#FAF8F2] dark:bg-[#0c2317] p-4 sm:p-8 border border-[#e2d8c3]/80 dark:border-[#C5A45D]/30 space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#234D3C] dark:bg-[#C5A45D] text-[#C5A45D] dark:text-[#07150e] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#234D3C] dark:text-[#f3eedd]">
                    PS Convention Center
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Palur Village, Chengalpattu District, Tamil Nadu &ndash; 603101
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#C5A45D] mt-1">
                    12 km from Chengalpattu &bull; 10 km from Walajabad
                  </p>
                </div>
              </div>

              {/* Landmarks Grid */}
              <div className="pt-2">
                <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#234D3C] mb-2.5 sm:mb-3">
                  Nearby Landmarks & Transit Points
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {VENUE_INFO.location.landmarks.map((landmark, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#07150e] p-2.5 sm:p-3 border border-gray-200/80 dark:border-white/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5 text-[#C5A45D] shrink-0" />
                        <span className="font-medium text-[#202823] dark:text-gray-200 text-[11px] sm:text-xs">{landmark.name}</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        {landmark.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Interactive Map Placeholder */}
            <div className="relative overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 shadow-sm aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center text-center group">
              <iframe
                title="PS Convention Center Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.484920251833!2d79.9142106!3d12.6841285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f9a2db5976b9%3A0xb308a0df5a5e35fa!2sPalur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-[#234D3C]/95 dark:bg-[#0c2317]/95 text-white text-[11px] px-3.5 py-1.5 shadow pointer-events-none border border-[#C5A45D]/40">
                <span className="font-semibold text-[#C5A45D]">Palur Village</span> &bull; Tamil Nadu
              </div>
            </div>
          </div>

          {/* Right Column: Compact Contact Form */}
          <div className="lg:col-span-5 bg-[#FAF8F2] dark:bg-[#0c2317] p-5 sm:p-8 lg:p-10 border border-[#e2d8c3]/80 dark:border-[#C5A45D]/30 shadow-lg">
            <h3 className="text-xl font-bold text-[#234D3C] dark:text-[#f3eedd] mb-1">
              General Enquiry
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-6 font-normal">
              Direct communication for wedding planners, families, and corporate coordinators.
            </p>

            {submitted ? (
              <div className="bg-[#E8F2E8] dark:bg-[#07150e] border border-[#234D3C]/20 dark:border-[#C5A45D]/40 p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A45D] dark:text-[#07150e]" />
                </div>
                <h4 className="text-base font-bold text-[#234D3C] dark:text-[#f3eedd]">Message Received</h4>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Our venue coordinator will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs uppercase font-semibold tracking-wider text-[#234D3C] dark:text-[#C5A45D] underline hover:text-[#C5A45D] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 98401 23456"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Enter celebration details, dates, or venue tour request..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#07150e] border border-gray-300 dark:border-white/20 dark:text-white focus:border-[#234D3C] dark:focus:border-[#C5A45D] focus:ring-1 focus:ring-[#234D3C] dark:focus:ring-[#C5A45D] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#07150e]" />
                      <span>SUBMIT ENQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 dark:border-white/10 space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Direct Line: {VENUE_INFO.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Visit Hours: 8:00 AM &ndash; 9:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
