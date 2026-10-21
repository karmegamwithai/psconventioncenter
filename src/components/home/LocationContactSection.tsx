import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';
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
    <section id="contact" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACCESSIBILITY & REACH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Conveniently Located. <br />
            <span className="font-serif italic font-semibold">Beautifully Connected.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Situated amidst the serene landscapes of Palur Village, strategically connected via Chengalpattu and Walajabad arterial corridors for hassle-free guest arrivals.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Location Details & Landmarks */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#FAF8F2] p-8 rounded-sm border border-[#e2d8c3]/80 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-[#234D3C] text-[#C5A45D] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#234D3C]">
                    PS Convention Center
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Palur Village, Chengalpattu District, Tamil Nadu &ndash; 603101
                  </p>
                  <p className="text-xs font-semibold text-[#C5A45D] mt-1">
                    ~12 km from Chengalpattu &bull; ~10 km from Walajabad
                  </p>
                </div>
              </div>

              {/* Landmarks Grid */}
              <div className="pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#234D3C] mb-3">
                  Nearby Landmarks & Transit Points
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VENUE_INFO.location.landmarks.map((landmark, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded border border-gray-200/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5 text-[#C5A45D]" />
                        <span className="font-medium text-[#202823]">{landmark.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-500">
                        {landmark.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Interactive Map Placeholder */}
            <div className="relative rounded-sm overflow-hidden border border-gray-200 bg-gray-100 shadow-sm aspect-[16/9] flex items-center justify-center text-center p-6 group">
              <iframe
                title="PS Convention Center Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.484920251833!2d79.9142106!3d12.6841285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f9a2db5976b9%3A0xb308a0df5a5e35fa!2sPalur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-[#234D3C]/95 text-white text-[11px] px-3 py-1.5 rounded shadow pointer-events-none border border-[#C5A45D]/40">
                <span className="font-semibold text-[#C5A45D]">Venue GPS Coordinates:</span> Palur Village, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Right Column: Compact Contact Form */}
          <div className="lg:col-span-5 bg-[#FAF8F2] p-8 sm:p-10 rounded-sm border border-[#e2d8c3]/80 shadow-md">
            <h3 className="text-xl font-bold text-[#234D3C] mb-1">
              General Enquiry & Site Visit
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              Have questions or wish to schedule an in-person venue tour? Send us a quick note below.
            </p>

            {submitted ? (
              <div className="bg-[#E8F2E8] border border-[#234D3C]/20 p-6 rounded text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 bg-[#234D3C] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A45D]" />
                </div>
                <h4 className="text-base font-bold text-[#234D3C]">Message Received!</h4>
                <p className="text-xs text-gray-700">
                  Thank you for reaching out to PS Convention Center. Our front-desk coordinator will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs uppercase font-semibold tracking-wider text-[#234D3C] underline hover:text-[#C5A45D]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
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
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#234D3C] mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us your approximate date, celebration type, or request a venue walk-through..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded focus:border-[#234D3C] focus:ring-1 focus:ring-[#234D3C] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#234D3C] text-white text-xs uppercase font-semibold tracking-widest rounded hover:bg-[#17372a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C5A45D]" />
                      <span>SUBMIT ENQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Direct Line: {VENUE_INFO.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Visit Hours: 8:00 AM &ndash; 9:00 PM IST (Daily)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
