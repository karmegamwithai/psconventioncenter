import { DayAvailability, SessionSlot, StoredBooking } from '../types/booking';

export const VENUE_INFO = {
  name: 'PS Convention Center',
  tagline: 'Where Beautiful Celebrations Become Timeless Memories.',
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
    hours: 'Mon – Sun: 8:00 AM – 9:00 PM IST',
  },
  stats: [
    { value: '600', label: 'Main Hall Seating', unit: 'Seats' },
    { value: '1,000', label: 'Approx. Floating Capacity', unit: 'Guests' },
    { value: '300', label: 'Dining Hall Seating', unit: 'Seats' },
    { value: '500', label: 'Approx. Dining Floating Capacity', unit: 'Guests' },
    { value: '6', label: 'Guest Rooms', unit: 'Suites' },
    { value: '30', label: 'Car Parking Spaces', unit: 'Vehicles' },
  ],
  featureStrip: [
    { title: 'Centralised Air Conditioning', desc: 'State-of-the-art climate control throughout main & dining halls' },
    { title: 'LED Display Systems', desc: 'Integrated high-definition video walls & crystal clear acoustics' },
    { title: 'Generator Backup', desc: '100% uninterrupted power supply with silent heavy-duty DG set' },
    { title: 'CCTV & Security', desc: '24/7 high-definition surveillance & dedicated security personnel' },
  ]
};

export const FACILITIES = [
  {
    id: 'main-hall',
    title: 'Main Convention Hall',
    capacity: '600 Seated • ~1,000 Floating',
    description: 'A grand pillar-free auditorium featuring opulent crystal chandeliers, soaring ceilings, acoustic treatment, and centralized HVAC for royal weddings and milestone receptions.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    badge: 'Flagship Space',
    specs: ['Centralized HVAC', 'Pillar-Free Sightlines', 'Integrated AV Stage', 'Acoustic Wall Panels']
  },
  {
    id: 'dining-hall',
    title: 'Dining Hall',
    capacity: '300 Seated • ~500 Floating',
    description: 'Spacious, hygienic, fully air-conditioned dining facility configured for both traditional banana-leaf feasts and contemporary buffet layouts with dedicated handwash stations.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    badge: 'Climate Controlled',
    specs: ['300 Seated Capacity', 'Separate Handwash Counters', 'HVAC Air Conditioned', 'Direct Kitchen Access']
  },
  {
    id: 'guest-rooms',
    title: 'Guest Accommodation',
    capacity: '6 Furnished Suites with Lift Access',
    description: 'Six luxuriously appointed guest suites including bride & groom dressing chambers on the first floor with private washrooms, dressing mirrors, and lift accessibility.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    badge: 'VIP Suites',
    specs: ['Attached Bathrooms', 'High-Speed Lift Access', 'Wardrobes & Vanity', '24/7 Hot Water']
  },
  {
    id: 'open-terrace',
    title: 'Open Terrace',
    capacity: 'First-Floor Breezy Gathering Area',
    description: 'An open-air terrace venue perfect for evening sangeet, cocktail receptions, mehendi ceremonies, or starlit family chats overlooking the serene Palur countryside.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    badge: 'Open-Air',
    specs: ['Panoramic Views', 'Evening Ambient Lighting', 'Breezy Elevated Setting', 'Open Skies']
  },
  {
    id: 'temple-courtyard',
    title: 'Temple & Courtyard',
    capacity: 'Sanctified Ganesha Shrine & Open Lawn',
    description: 'A charming Ganesha temple and central courtyard nestled between the main hall and dining area for auspicious pre-wedding poojas and traditional welcoming ceremonies.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Traditional Heritage',
    specs: ['Ganesha Sannidhi', 'Auspicious Rituals', 'Open Courtyard Walkway', 'Floral Mandap Area']
  },
  {
    id: 'parking-security',
    title: 'Parking & Security',
    capacity: '30+ Dedicated Cars & Valet Lane',
    description: 'Gated venue grounds with separate entry and exit checkpoints, dedicated two-wheeler bays, CCTV security perimeter, and 100% diesel generator power backup.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Seamless Logistics',
    specs: ['30+ Car Bays', 'Dual Entry/Exit Gates', 'CCTV 24/7 Surveillance', '100% DG Power Backup']
  }
];

export const EVENTS = [
  {
    id: 'weddings',
    title: 'Weddings',
    subtitle: 'Grand Muhurtham & Sacred Vows',
    desc: 'Lavish traditional Hindu, Christian, and interfaith nuptials with majestic stage set-ups and royal hospitality.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'receptions',
    title: 'Wedding Receptions',
    subtitle: 'Starlight Evenings & Glamour',
    desc: 'Spectacular evening banquets complete with customized lighting, LED backdrop visuals, and gourmet feasts.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'engagements',
    title: 'Engagement Ceremonies',
    subtitle: 'Nichayathartham & Rings',
    desc: 'Intimate and joyful betrothal celebrations bringing both families together in refined luxury.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'birthdays',
    title: 'Birthday Celebrations',
    subtitle: 'Milestone 1st, 21st, 50th & 60th',
    desc: 'Themed birthday bashes, balloon arches, entertainment stages, and delightful food corners.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'anniversaries',
    title: 'Wedding Anniversaries',
    subtitle: 'Silver, Gold & Diamond Jubilees',
    desc: 'Honor decades of love surrounded by children, grandchildren, and cherished lifetime friends.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'family-gatherings',
    title: 'Family Gatherings',
    subtitle: 'Reunions & Festive Banquets',
    desc: 'Spacious halls and open terraces where extended families reunite for memorable weekends.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'traditional',
    title: 'Traditional Ceremonies',
    subtitle: 'Upanayanam, Seemantham & Shashtiabdhapoorthi',
    desc: 'Authentic South Indian cultural rituals performed with sacred pooja decor and banana-leaf hospitality.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Conferences, AGMs & Gala Dinners',
    desc: 'Professional AV facilities, podium setups, executive dining, and seamless connectivity.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  }
];

export const SERVICES = [
  {
    icon: 'UtensilsCrossed',
    title: 'Catering Arrangements',
    summary: 'Vegetarian & Non-Vegetarian Facilities',
    description: 'Hygienic dedicated indoor kitchen for pure vegetarian cooking and organized outdoor cooking facilities for non-vegetarian banquets with complete dining setup support.',
    tag: 'Flexible Culinary'
  },
  {
    icon: 'Sparkles',
    title: 'Stage Decorations',
    summary: 'Appointed Decorators & Custom Mandaps',
    description: 'Tie-ups with elite decoration partners for bespoke floral mandaps, thematic LED arches, traditional banana-stem entrance designs, and client-coordinated setups.',
    tag: 'Bespoke Ambience'
  },
  {
    icon: 'PackageCheck',
    title: 'Flexible Packages',
    summary: 'Tailored Event Day Configurations',
    description: 'Customized pricing schemes tailored to Full-Day, Morning Muhurtham, or Evening Reception slots with transparent tariff structures and no hidden surcharges.',
    tag: 'Transparent Tariff'
  },
  {
    icon: 'ShieldCheck',
    title: 'Security & Backup',
    summary: 'Uninterrupted Comfort & Protection',
    description: 'High-power generator backup ensuring zero light flickering, continuous HVAC operation, 24/7 CCTV vigilance, and trained venue marshals.',
    tag: 'Guaranteed Peace of Mind'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Grand Main Convention Hall',
    category: 'Main Hall',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Air-conditioned main auditorium with chandelier illumination, seating 600 guests.'
  },
  {
    id: 2,
    title: 'Royal Mandap Stage Decoration',
    category: 'Wedding Stage',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Exquisite floral wedding stage backdrop designed for sacred South Indian vows.'
  },
  {
    id: 3,
    title: 'Centralized AC Dining Hall',
    category: 'Dining Hall',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hygienic 300-seat dining hall accommodating over 500 floating diners comfortably.'
  },
  {
    id: 4,
    title: 'Exterior Architecture & Driveway',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1200&q=80',
    caption: 'Contemporary architectural entrance with grand arrival portico in Palur Village.'
  },
  {
    id: 5,
    title: 'VIP Bride & Groom Suite',
    category: 'Guest Rooms',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    caption: 'Air-conditioned first floor bridal dressing suite equipped with vanity and lift access.'
  },
  {
    id: 6,
    title: 'Open Terrace Sunset Lounge',
    category: 'Open Terrace',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    caption: 'Breezy first-floor open terrace venue for evening sangeet and starlit gatherings.'
  },
  {
    id: 7,
    title: 'Evening Illumination & Lawns',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dusk lighting highlighting the venue grounds, parking bays, and pathways.'
  },
  {
    id: 8,
    title: 'Sanctified Ganesha Temple',
    category: 'Temple',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Traditional Ganesha shrine within the open courtyard for auspicious beginnings.'
  }
];

export const FAQS = [
  {
    q: 'How do I check available dates on the calendar?',
    a: 'Simply open our interactive calendar on the `/booking` page. Available dates are colored in light green (#DDF1DF). Click on any upcoming date to view whether the Full Day, Morning, or Evening slot is open, and proceed with your enquiry in real-time.'
  },
  {
    q: 'Does submitting an enquiry confirm my booking?',
    a: 'No, submitting an enquiry does not automatically confirm a booking. It registers your date request in our system under "Pending Review". Our reservation team will reach out within 24 hours to discuss package requirements, inspect the premises, and formalize the advance deposit.'
  },
  {
    q: 'Can I request an alternative date if my primary date is busy?',
    a: 'Yes! The booking enquiry form includes an "Alternative Date" field. If your preferred Muhurtham date has already been reserved, our coordinator will immediately check and offer your backup date option.'
  },
  {
    q: 'Are catering arrangements and cooking facilities available?',
    a: 'Yes. PS Convention Center provides a modern, fully-equipped indoor kitchen for pure vegetarian cooking. Additionally, we have specialized outdoor cooking zones for non-vegetarian feasts, enabling complete flexibility for your caterers.'
  },
  {
    q: 'How are event packages priced?',
    a: 'Event pricing depends on whether you reserve a Full-Day (Morning + Evening), Morning Muhurtham, or Evening Reception session, as well as selected room requirements and date seasonality. Our team provides an itemized quotation tailored to your exact celebration.'
  },
  {
    q: 'What guest accommodation and room facilities are included?',
    a: 'We feature six furnished guest rooms including dedicated bride and groom dressing suites located on the first floor. The suites include comfortable double beds, mirrors, wardrobes, attached bathrooms, and direct elevator (lift) accessibility.'
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
    notes: 'Sashtiabdhapoorthi (60th Birthday) pooja',
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
    notes: 'Auspicious Muhurtham date wedding',
    status: 'CONFIRMED',
    createdAt: '2026-10-20T11:00:00.000Z'
  },
  {
    id: 'b-5',
    reference: 'PSC-CONF-2026-005',
    customerName: 'Chengalpattu Rotary Club',
    phoneNumber: '+91 98840 55667',
    email: 'rotary.cpt@example.com',
    eventDate: '2026-12-14',
    session: 'EVENING',
    eventType: 'Corporate Event',
    guestCount: 350,
    cateringPreference: 'DISCUSS_LATER',
    notes: 'Annual Excellence Awards & Dinner',
    status: 'CONFIRMED',
    createdAt: '2026-10-20T16:20:00.000Z'
  }
];

export const INITIAL_BLOCKED_DATES = [
  { date: '2026-11-05', reason: 'Annual Hall Deep Cleaning & HVAC Servicing' },
  { date: '2026-12-25', reason: 'Scheduled Electrical Grid Upgradation' }
];

export const INITIAL_SAMPLE_ENQUIRIES = [
  { date: '2026-11-22', session: 'FULL_DAY', customerName: 'Rajesh Sharma', eventType: 'Engagement' },
  { date: '2026-12-10', session: 'EVENING', customerName: 'Priya Sundaram', eventType: 'Birthday' }
];
