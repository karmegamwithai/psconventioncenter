import { DayAvailability, SessionSlot, StoredBooking } from '../types/booking';
import lowBudgetHallImg from '../assets/images/low_budget_hall_1795401387682.jpg';
import highBudgetHallImg from '../assets/images/high_budget_hall_1795401387033.jpg';
import premiumHallImg from '../assets/images/premium_hall_1795401387554.jpg';
import eventLawnImg from '../assets/images/event_lawn_1795401389503.jpg';

export type FacilityId =
  | 'hall-3'
  | 'lawn'
  | 'rooms'
  | 'dining-catering'
  | 'open-terrace'
  | 'parking-security';

export interface HallTierItem {
  id: string;
  name: string;
  tierLabel: string;
  capacity: string;
  description: string;
  image: string;
  features: string[];
  idealFor: string;
}

export interface FacilityItem {
  id: FacilityId;
  title: string;
  tagline: string;
  capacity: string;
  description: string;
  overview: string;
  image: string;
  specs: string[];
  details: Array<{ label: string; value: string }>;
  highlights: string[];
  idealFor: string[];
  hallTiers?: HallTierItem[];
}

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

export const FACILITIES: FacilityItem[] = [
  {
    id: 'hall-3',
    title: 'Hall - 3',
    tagline: 'Three Distinct Air-Conditioned Convention Halls for Every Scale & Budget',
    capacity: 'Low Budget • High Budget • Premium Hall',
    description: 'Three versatile convention halls — Low Budget, High Budget, and Premium — with centralized HVAC and tailored seating.',
    overview:
      'PS Convention Center offers three thoughtfully tiered convention halls to match the exact scale, style, and budget of your celebration or corporate gathering. From intimate family ceremonies to opulent royal weddings and large-scale expos, every hall delivers climate-controlled comfort, refined acoustics, and uninterrupted power backup.',
    image: premiumHallImg,
    specs: ['3 Dedicated Hall Tiers', 'Up to 1,000 Floating', 'Centralized HVAC'],
    details: [
      { label: 'Available Tiers', value: 'Low Budget, High Budget & Premium' },
      { label: 'Max Capacity', value: '600 Seated • 1,000 Floating' },
      { label: 'Climate Control', value: 'Full Centralized HVAC' },
      { label: 'Power Backup', value: '100% Uninterrupted DG Support' }
    ],
    highlights: [
      'Three distinct venue tiers tailored to intimate, grand, and flagship celebrations',
      'Pillarless sightlines with elevated ceremonial stages and floral mandap readiness',
      'High-definition LED backdrop support and integrated acoustic sound distribution',
      'Direct access to the air-conditioned dining hall, guest rooms, and elevator'
    ],
    idealFor: ['Grand Weddings', 'Royal Receptions', 'Corporate Summits & Expos', 'Engagements & Family Functions'],
    hallTiers: [
      {
        id: 'low-budget-hall',
        name: 'Low Budget Hall',
        tierLabel: 'Economical & Intimate',
        capacity: '150 Seated • 250 Floating',
        description:
          'A bright, well-maintained air-conditioned hall crafted for tasteful, budget-friendly family milestones, poojas, and intimate gatherings without compromising on cleanliness or hospitality.',
        image: lowBudgetHallImg,
        features: [
          '150 Seated / 250 Floating capacity',
          'Full air-conditioning & warm recessed lighting',
          'Dedicated compact floral stage & podium',
          'Basic PA sound system & 100% generator backup'
        ],
        idealFor: 'Engagements, Birthdays, Naming Ceremonies & Family Poojas'
      },
      {
        id: 'high-budget-hall',
        name: 'High Budget Hall',
        tierLabel: 'Grand & Celebratory',
        capacity: '400 Seated • 650 Floating',
        description:
          'An expansive architectural banquet hall featuring sculpted chandeliers, marble flooring, and a stately mandap stage designed for traditional weddings, grand receptions, and executive meetings.',
        image: highBudgetHallImg,
        features: [
          '400 Seated / 650 Floating capacity',
          'Centralized HVAC & chandelier illumination',
          'Grand floral mandap stage & bridal green rooms',
          'Direct connectivity to dining hall & courtyard lawn'
        ],
        idealFor: 'Traditional Weddings, Grand Receptions & Corporate Seminars'
      },
      {
        id: 'premium-hall',
        name: 'Premium Hall',
        tierLabel: 'Flagship Royal Ballroom',
        capacity: '600 Seated • 1,000 Floating',
        description:
          'Our flagship palatial ballroom featuring soaring coffered ceilings, dramatic crystal chandeliers, HD LED stage backdrop, and VIP suite access for prestigious weddings and major corporate expos.',
        image: premiumHallImg,
        features: [
          '600 Seated / 1,000 Floating capacity',
          'Flagship centralized HVAC & acoustic ceiling design',
          'Wide elevated royal stage with HD LED display wall',
          'Priority VIP elevator access, bridal suites & valet bay'
        ],
        idealFor: 'Royal Weddings, Major Expos, Corporate Summits & Gala Receptions'
      }
    ]
  },
  {
    id: 'lawn',
    title: 'Lawn',
    tagline: 'Manicured Open-Air Courtyard Lawn & Auspicious Ganesha Shrine',
    capacity: 'Open-Air Courtyard • Ganesha Temple',
    description: 'Lush landscaped open-air lawn and courtyard anchored by the traditional Ganesha temple for outdoor celebrations.',
    overview:
      'Nestled gracefully between the main convention spaces, our manicured open-air lawn blends serene greenery with traditional South Indian warmth. Anchored by a sanctified Ganesha shrine and illuminated with warm evening string lights, the lawn creates an unforgettable setting for twilight receptions, outdoor stalls, and auspicious pre-wedding rituals.',
    image: eventLawnImg,
    specs: ['Manicured Event Lawn', 'Ganesha Temple Shrine', 'Evening Lighting'],
    details: [
      { label: 'Setting', value: 'Landscaped Open-Air Courtyard' },
      { label: 'Sacred Feature', value: 'Traditional Ganesha Temple' },
      { label: 'Outdoor Setup', value: 'Reception Seating & Live Food Stalls' },
      { label: 'Lighting', value: 'Warm Overhead Festoon & Architectural Uplights' }
    ],
    highlights: [
      'Auspicious Ganesha temple on-site for traditional wedding rituals and blessings',
      'Expansive manicured turf suitable for outdoor receptions, sangeet nights, and expos',
      'Stone-paved walkways connecting effortlessly to the main hall and dining wing',
      'Dedicated power points and lighting rigs for live music, decor canopies, and food counters'
    ],
    idealFor: ['Evening Receptions', 'Outdoor Wedding Rituals', 'Sangeet & Cultural Nights', 'Open-Air Exhibitions']
  },
  {
    id: 'rooms',
    title: 'Rooms',
    tagline: 'Comfortable Air-Conditioned Guest Rooms & Bridal Suites with Lift Access',
    capacity: '6 Guest Rooms • Elevator Access',
    description: 'Six well-appointed air-conditioned guest rooms and bridal suites, including first-floor rooms with dedicated lift access.',
    overview:
      'Designed to give the bride, groom, elders, and out-of-town family members restful privacy throughout multi-day celebrations, our six air-conditioned guest rooms combine serene interiors with practical convenience. First-floor suites are seamlessly connected via an internal passenger elevator for effortless accessibility.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    specs: ['6 AC Guest Rooms', 'First-Floor Lift', 'Attached Modern Baths'],
    details: [
      { label: 'Total Rooms', value: '6 Air-Conditioned Suites & Rooms' },
      { label: 'Accessibility', value: 'First-Floor Rooms with Passenger Elevator' },
      { label: 'Bridal Readiness', value: 'Full-Length Mirrors & Dressing Area' },
      { label: 'Utilities', value: '24/7 Hot Water & 100% Power Backup' }
    ],
    highlights: [
      'Dedicated VIP bridal and groom preparation suites with ample dressing space',
      'Elevator connectivity ensuring comfortable access for senior citizens and guests',
      'Quiet acoustic insulation away from the main celebration floor for undisturbed rest',
      'Clean linens, attached hygienic restrooms, and round-the-clock housekeeping support'
    ],
    idealFor: ['Bridal & Groom Preparation', 'Overnight Family Stay', 'VIP Speaker Green Rooms', 'Multi-Day Wedding Guests']
  },
  {
    id: 'dining-catering',
    title: 'Dining & Catering',
    tagline: 'Centralized AC Dining Hall with Vegetarian & Non-Vegetarian Kitchens',
    capacity: '300 Seated • 500 Floating',
    description: '300 seated guests, approximately 500 floating capacity, centralized HVAC dining hall with indoor veg & outdoor non-veg catering.',
    overview:
      'Hospitality is at the heart of every memorable South Indian celebration. Our fully air-conditioned dining hall seats 300 guests simultaneously and smoothly serves up to 500 floating diners per batch. Thoughtfully separated vegetarian indoor kitchens and outdoor non-vegetarian cooking zones uphold culinary traditions and strict hygiene standards.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    specs: ['300 Seated • 500 Floating', 'Centralized HVAC', 'Veg & Non-Veg Kitchens'],
    details: [
      { label: 'Dining Seating', value: '300 Seated Guests per Batch' },
      { label: 'Floating Capacity', value: 'Approx. 500 Floating Diners' },
      { label: 'Climate Control', value: 'Centralized Air-Conditioned Hall' },
      { label: 'Kitchen Setup', value: 'Pure Veg Indoor & Non-Veg Outdoor Cooking' }
    ],
    highlights: [
      'Spacious traditional banana-leaf seating layout or modern buffet counter configuration',
      'Dedicated indoor pure-vegetarian kitchen with commercial-grade ventilation and water supply',
      'Separate outdoor cooking zone specifically designed for non-vegetarian catering teams',
      'Hygienic handwash stations, smooth entry/exit crowd flow, and dedicated service passages'
    ],
    idealFor: ['Traditional Banana-Leaf Feasts', 'Grand Wedding Buffets', 'Corporate Luncheons', 'Live Counter Banquets']
  },
  {
    id: 'open-terrace',
    title: 'Open Terrace',
    tagline: 'Breezy First-Floor Open Terrace for Twilight Celebrations & Lounges',
    capacity: 'First-Floor Open-Air Terrace',
    description: 'Spacious first-floor open terrace offering breezy panoramic views for evening gatherings, lounges, and photo sessions.',
    overview:
      'Elevated above the grounds on the first floor, our open terrace captures Palur’s peaceful evening breeze and scenic surroundings. Accessible via stairs and passenger lift, this versatile open-sky venue is a favorite for intimate twilight mixers, golden-hour portrait photography, cocktail lounges, and relaxed family conversations.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    specs: ['Open-Sky First Floor', 'Lift Accessible', 'Scenic Evening Views'],
    details: [
      { label: 'Location', value: 'First-Floor Elevated Terrace' },
      { label: 'Access', value: 'Grand Staircase & Passenger Lift' },
      { label: 'Ambiance', value: 'Open-Air Breeze & Sunset Views' },
      { label: 'Setup Options', value: 'Lounge Seating, Live Counters & Photo Booths' }
    ],
    highlights: [
      'Generous open-air floor plan ideal for starlit evening receptions and sunset mixers',
      'Secure architectural parapet railing and ambient perimeter lighting throughout',
      'Direct proximity to the first-floor guest rooms and elevator lobby',
      'Flexible layout for acoustic music setups, coffee/chaat counters, and bridal portraits'
    ],
    idealFor: ['Sunset Mixers', 'Bridal & Couple Photoshoots', 'Intimate Evening Dinners', 'VIP Networking Lounges']
  },
  {
    id: 'parking-security',
    title: 'Parking & Security',
    tagline: 'Structured Parking, Dual Gates, 24/7 CCTV & 100% Generator Backup',
    capacity: '30 Cars Parking • Dual Entry/Exit',
    description: 'Dedicated parking for approximately 30 cars, separate entry and exit gates, 24/7 CCTV surveillance, and 100% DG backup.',
    overview:
      'Every smooth event begins with stress-free arrival and complete peace of mind. PS Convention Center features organized on-premise parking for approximately 30 cars with separate entry and exit gates to eliminate traffic bottlenecks, supported by round-the-clock CCTV monitoring, trained security staff, and 100% diesel generator power backup.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    specs: ['30 Car Parking Bays', 'Separate Entry & Exit', '24/7 CCTV & DG Backup'],
    details: [
      { label: 'On-Site Parking', value: 'Approx. 30 Dedicated Car Bays' },
      { label: 'Traffic Flow', value: 'Separate Entry & Exit Gates' },
      { label: 'Surveillance', value: '24/7 Multi-Angle CCTV Coverage' },
      { label: 'Power Continuity', value: '100% Heavy-Duty DG Backup' }
    ],
    highlights: [
      'Separate entry and exit gates designed for smooth VIP drop-offs and congestion-free departures',
      'Well-lit, demarcated parking bays close to the main portico and lift entrance',
      'Comprehensive CCTV camera network across entrances, hallways, dining areas, and parking',
      'Automatic changeover diesel generator ensuring uninterrupted AC, lighting, and audio'
    ],
    idealFor: ['Stress-Free Guest Arrivals', 'VIP & Bridal Car Drop-Offs', 'Corporate Delegations', 'Uninterrupted Full-Day Events']
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
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
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
