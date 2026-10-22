import { DayAvailability, SessionSlot, StoredBooking } from '../types/booking';

export const VENUE_INFO = {
  name: 'PS Convention Center',
  tagline: 'The Grand Stage for Prestigious Celebrations.',
  location: {
    address: 'Palur Village, Chengalpattu District, Tamil Nadu - 603101',
    landmark: '12 km from Chengalpattu & 10 km from Walajabad',
    landmarks: [
      { name: 'Melachery Bus Stand', distance: '1.2 km', duration: '3 mins' },
      { name: 'Palur Railway Station', distance: '2.5 km', duration: '6 mins' },
      { name: 'Walajabad Junction', distance: '10 km', duration: '15 mins' },
      { name: 'Chengalpattu Junction', distance: '12 km', duration: '18 mins' },
      { name: 'Palur Police Station', distance: '1.5 km', duration: '4 mins' },
      { name: 'Chennai International Airport (MAA)', distance: '48 km', duration: '55 mins' },
    ],
  },
  contact: {
    phone: '+91 94432 18920',
    altPhone: '+91 98401 56789',
    email: 'enquiry@psconventioncenter.com',
    hours: 'Daily: 8:00 AM – 9:00 PM IST',
  },
  stats: [
    { value: '600', label: 'Main Hall Seating', unit: 'Seats' },
    { value: '1,000', label: 'Floating Capacity', unit: 'Guests' },
    { value: '300', label: 'Dining Seating', unit: 'Seats' },
    { value: '500', label: 'Dining Floating', unit: 'Guests' },
    { value: '6', label: 'Guest Suites', unit: 'Suites' },
    { value: '30', label: 'Car Parking', unit: 'Bays' },
  ],
  featureStrip: [
    { title: 'Centralized HVAC', desc: 'Full climate control across both halls' },
    { title: 'LED Display Systems', desc: 'Integrated high-definition display walls' },
    { title: '100% DG Backup', desc: 'Continuous uninterrupted power supply' },
    { title: 'CCTV & Security', desc: '24/7 surveillance and dedicated security' },
  ]
};

export const FACILITIES = [
  {
    id: 'main-hall',
    title: 'Main Convention Hall',
    capacity: '600 Seated • 1,000 Floating',
    description: '600 seated guests, approximately 1,000 floating capacity, centralised HVAC.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    specs: ['600 Seating', '1,000 Floating', 'Centralized HVAC']
  },
  {
    id: 'dining-hall',
    title: 'Dining Hall',
    capacity: '300 Seated • 500 Floating',
    description: '300 seated guests, approximately 500 floating capacity, centralised HVAC.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    specs: ['300 Seating', '500 Floating', 'Centralized HVAC']
  },
  {
    id: 'guest-rooms',
    title: 'Guest Accommodation',
    capacity: '6 Rooms with Lift',
    description: 'Six guest rooms, including first-floor rooms with lift access.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    specs: ['6 Guest Rooms', 'First-Floor Lift', 'Private Baths']
  },
  {
    id: 'open-terrace',
    title: 'Open Terrace',
    capacity: 'First-Floor Terrace',
    description: 'First-floor open terrace.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    specs: ['Open Air', 'First Floor', 'Panoramic View']
  },
  {
    id: 'temple-courtyard',
    title: 'Temple & Courtyard',
    capacity: 'Ganesha Temple & Lawn',
    description: 'Small Ganesha temple and open courtyard between halls.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    specs: ['Ganesha Temple', 'Open Courtyard', 'Sacred Rituals']
  },
  {
    id: 'parking-security',
    title: 'Parking & Security',
    capacity: '30 Cars Parking',
    description: 'Parking for approximately 30 cars, separate entry and exit gates, CCTV and generator backup.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    specs: ['30 Car Parking', 'Dual Gates', 'CCTV & DG Backup']
  }
];

export const EVENTS = [
  {
    id: 'royal-weddings',
    title: 'Grand Weddings',
    desc: 'Grand Weddings',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'receptions',
    title: 'Royal Receptions',
    desc: 'Wedding Receptions',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'corporate-summits',
    title: 'Corporate Summits',
    desc: 'Corporate Summits & Conclaves',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'engagements',
    title: 'Engagement Ceremonies',
    desc: 'Engagement Ceremonies',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'traditional',
    title: 'Traditional Ceremonies',
    desc: 'Traditional Ceremonies & Poojas',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'anniversaries',
    title: 'Anniversary Galas',
    desc: 'Wedding Anniversaries',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'birthdays',
    title: 'Milestone Celebrations',
    desc: 'Birthday Celebrations',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'family-gatherings',
    title: 'Family Gatherings',
    desc: 'Family Gatherings',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  }
];

export const SERVICES = [
  {
    icon: 'UtensilsCrossed',
    title: 'Catering Arrangements',
    description: 'Vegetarian indoor cooking and non-vegetarian outdoor cooking arrangements.',
  },
  {
    icon: 'Sparkles',
    title: 'Stage Decorations',
    description: 'Stage decoration through appointed companies, with other arrangements coordinated by clients.',
  },
  {
    icon: 'PackageCheck',
    title: 'Flexible Packages',
    description: 'Event pricing based on selected packages and requirements.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Security & Backup',
    description: 'CCTV surveillance, security facilities, and generator backup.',
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Grand Main Convention Hall',
    category: 'Main Hall',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Air-conditioned main auditorium seating 600 guests.'
  },
  {
    id: 2,
    title: 'Royal Mandap Stage',
    category: 'Wedding Stage',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Floral wedding stage crafted for grand ceremonies.'
  },
  {
    id: 3,
    title: 'Centralized AC Dining Hall',
    category: 'Dining Hall',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: '300-seat dining hall accommodating 500 floating guests.'
  },
  {
    id: 4,
    title: 'Exterior Architecture',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1200&q=80',
    caption: 'Contemporary architectural entrance in Palur Village.'
  },
  {
    id: 5,
    title: 'VIP Bridal Suite',
    category: 'Guest Rooms',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    caption: 'Air-conditioned bridal suite with elevator access.'
  },
  {
    id: 6,
    title: 'Open Sunset Terrace',
    category: 'Open Terrace',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    caption: 'First-floor open terrace for evening celebrations.'
  },
  {
    id: 7,
    title: 'Evening Illumination',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Night ambiance across the venue grounds.'
  },
  {
    id: 8,
    title: 'Sanctified Ganesha Temple',
    category: 'Temple',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Traditional Ganesha shrine within the open courtyard.'
  }
];

export const FAQS = [
  {
    q: 'How do I check available dates?',
    a: 'View the monthly calendar on this page. Available dates are highlighted in light green.'
  },
  {
    q: 'Does submitting an enquiry confirm my booking?',
    a: 'No. Submitting an enquiry does not confirm a booking. Our team reviews availability and requirements before confirming.'
  },
  {
    q: 'Can I request an alternative date?',
    a: 'Yes. An optional alternative date field is available in the booking enquiry form.'
  },
  {
    q: 'Are catering arrangements available?',
    a: 'Yes. Vegetarian indoor cooking and non-vegetarian outdoor cooking arrangements are available.'
  },
  {
    q: 'How are event packages priced?',
    a: 'Event pricing is based on selected packages, session timing, and requirements.'
  }
];

export const INITIAL_SAMPLE_BOOKINGS: StoredBooking[] = [
  {
    id: 'b-1',
    reference: 'PSC-CONF-2026-001',
    customerName: 'Senthil Nathan & Kavitha',
    phoneNumber: '+91 98401 23456',
    email: 'senthil.n@example.com',
    eventDate: '2026-11-12',
    session: 'FULL_DAY',
    eventType: 'Wedding',
    guestCount: 850,
    cateringPreference: 'VEGETARIAN',
    notes: 'Grand wedding reception and muhurtham ceremony',
    status: 'CONFIRMED',
    createdAt: '2026-10-15T10:00:00.000Z'
  },
  {
    id: 'b-2',
    reference: 'PSC-CONF-2026-002',
    customerName: 'Dr. Anand Kumar',
    phoneNumber: '+91 94440 98765',
    email: 'anand.k@example.com',
    eventDate: '2026-11-18',
    session: 'MORNING',
    eventType: 'Traditional Ceremony',
    guestCount: 400,
    cateringPreference: 'VEGETARIAN',
    notes: 'Sashtiabdhapoorthi pooja',
    status: 'CONFIRMED',
    createdAt: '2026-10-18T14:30:00.000Z'
  },
  {
    id: 'b-3',
    reference: 'PSC-CONF-2026-003',
    customerName: 'Vigneshwaran R',
    phoneNumber: '+91 97910 11223',
    email: 'vignesh.r@example.com',
    eventDate: '2026-11-26',
    session: 'FULL_DAY',
    eventType: 'Wedding',
    guestCount: 950,
    cateringPreference: 'NON_VEGETARIAN',
    notes: 'Wedding & evening reception',
    status: 'CONFIRMED',
    createdAt: '2026-10-19T09:15:00.000Z'
  },
  {
    id: 'b-4',
    reference: 'PSC-CONF-2026-004',
    customerName: 'Deepak & Harini',
    phoneNumber: '+91 91760 33445',
    email: 'deepak.h@example.com',
    eventDate: '2026-12-06',
    session: 'FULL_DAY',
    eventType: 'Wedding',
    guestCount: 800,
    cateringPreference: 'VEGETARIAN',
    notes: 'Muhurtham date wedding',
    status: 'CONFIRMED',
    createdAt: '2026-10-20T11:00:00.000Z'
  },
  {
    id: 'b-5',
    reference: 'PSC-CONF-2026-005',
    customerName: 'Chengalpattu Leadership Forum',
    phoneNumber: '+91 98840 55667',
    email: 'forum.cpt@example.com',
    eventDate: '2026-12-14',
    session: 'EVENING',
    eventType: 'Corporate Event',
    guestCount: 350,
    cateringPreference: 'DISCUSS_LATER',
    notes: 'Annual Corporate Leadership Conclave',
    status: 'CONFIRMED',
    createdAt: '2026-10-20T16:20:00.000Z'
  }
];

export const INITIAL_BLOCKED_DATES = [
  { date: '2026-11-05', reason: 'Annual Hall Deep Cleaning & HVAC Servicing' },
  { date: '2026-12-25', reason: 'Scheduled Maintenance' }
];

export const INITIAL_SAMPLE_ENQUIRIES = [
  { date: '2026-11-22', session: 'FULL_DAY', customerName: 'Rajesh Sharma', eventType: 'Engagement' },
  { date: '2026-12-10', session: 'EVENING', customerName: 'Priya Sundaram', eventType: 'Birthday' }
];
