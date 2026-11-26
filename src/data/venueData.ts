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

export type HallPackageId =
  | 'low-budget-plan'
  | 'high-budget-plan'
  | 'premium-budget-plan';

export interface HallTierItem {
  id: string;
  packageSlug: HallPackageId;
  name: string;
  planTitle: string;
  tierLabel: string;
  capacity: string;
  description: string;
  image: string;
  features: string[];
  idealFor: string;
}

export interface HallPackageDetail {
  id: HallPackageId;
  title: string;
  hallName: string;
  tierLabel: string;
  tagline: string;
  capacity: string;
  description: string;
  packageOverview: string;
  image: string;
  secondaryImages: Array<{ src: string; caption: string }>;
  facilities: string[];
  includedServices: Array<{ title: string; description: string }>;
  benefits: Array<{ title: string; description: string }>;
  specifications: Array<{ label: string; value: string }>;
  idealFor: string[];
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

export const HALL_PACKAGES: HallPackageDetail[] = [
  {
    id: 'low-budget-plan',
    title: 'Low Budget Plan',
    hallName: 'Low Budget Hall',
    tierLabel: 'Economical & Intimate',
    tagline: 'Thoughtfully Designed Air-Conditioned Hall Package for Intimate Family Milestones & Traditional Ceremonies',
    capacity: '150 Seated • 250 Floating',
    description:
      'A bright, well-maintained air-conditioned hall crafted for tasteful, budget-friendly family milestones, poojas, and intimate gatherings without compromising on cleanliness or hospitality.',
    packageOverview:
      'The Low Budget Plan at PS Convention Center provides families and event organizers with a dedicated, well-maintained air-conditioned convention hall designed for intimate gatherings of 150 seated and up to 250 floating guests. Event pricing is tailored according to your selected package requirements and session timing, ensuring dependable comfort, spotless hygiene, and seamless venue support.',
    image: lowBudgetHallImg,
    secondaryImages: [
      {
        src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        caption: 'Access to Centralized AC Dining Hall for vegetarian and non-vegetarian feasts'
      },
      {
        src: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional Ganesha Temple within the courtyard for auspicious rituals'
      }
    ],
    facilities: [
      'Air-conditioned convention hall accommodating 150 seated and 250 floating guests',
      'Warm recessed interior lighting and pillarless visibility',
      'Dedicated compact floral stage and ceremonial podium',
      'Basic PA sound system for announcements, music, and rituals',
      'Access to the air-conditioned dining hall (300 seated / 500 floating capacity)',
      'Dedicated indoor pure-vegetarian kitchen and separate outdoor non-vegetarian cooking area',
      'On-premise car parking for approximately 30 cars with separate entry and exit gates',
      '100% uninterrupted diesel generator power backup and 24/7 CCTV surveillance'
    ],
    includedServices: [
      {
        title: 'Catering Arrangements',
        description: 'Vegetarian indoor cooking and non-vegetarian outdoor cooking arrangements supported with clean dining facilities.'
      },
      {
        title: 'Stage Decorations',
        description: 'Stage decoration through appointed companies, with other event arrangements coordinated according to client preferences.'
      },
      {
        title: 'Flexible Packages',
        description: 'Event pricing based on selected packages, session slot (Full Day, Morning, or Evening), and specific event requirements.'
      },
      {
        title: 'Security & Backup',
        description: '24/7 CCTV surveillance, on-site security facilities, and 100% generator backup for uninterrupted air conditioning and lighting.'
      }
    ],
    benefits: [
      {
        title: 'Right-Sized for Intimate Gatherings',
        description: 'Comfortably hosts 150 seated and 250 floating guests in a warm, welcoming setting without feeling oversized.'
      },
      {
        title: 'Full Climate Control & Power Continuity',
        description: 'Guests enjoy full air-conditioning and warm recessed lighting backed by 100% generator support throughout the ceremony.'
      },
      {
        title: 'Traditional Culinary Flexibility',
        description: 'Supports both pure vegetarian indoor dining traditions and separate outdoor non-vegetarian cooking arrangements.'
      },
      {
        title: 'Smooth Guest Arrival & Accessibility',
        description: 'Conveniently located in Palur Village with dedicated car parking and separate entry and exit gates.'
      }
    ],
    specifications: [
      { label: 'Package Tier', value: 'Low Budget Plan (Economical & Intimate)' },
      { label: 'Hall Capacity', value: '150 Seated • 250 Floating Guests' },
      { label: 'Climate Control', value: 'Full Air-Conditioning & Warm Recessed Lighting' },
      { label: 'Stage & Audio', value: 'Compact Floral Stage, Podium & Basic PA Sound System' },
      { label: 'Catering Access', value: 'Indoor Vegetarian & Outdoor Non-Vegetarian Cooking' },
      { label: 'Power & Security', value: '100% DG Power Backup & 24/7 CCTV Surveillance' }
    ],
    idealFor: ['Engagements', 'Birthday Celebrations', 'Naming Ceremonies', 'Family Poojas & Traditional Ceremonies', 'Intimate Family Gatherings']
  },
  {
    id: 'high-budget-plan',
    title: 'High Budget Plan',
    hallName: 'High Budget Hall',
    tierLabel: 'Grand & Celebratory',
    tagline: 'Expansive Architectural Banquet Hall Package for Traditional Weddings, Grand Receptions & Corporate Seminars',
    capacity: '400 Seated • 650 Floating',
    description:
      'An expansive architectural banquet hall featuring sculpted chandeliers, marble flooring, and a stately mandap stage designed for traditional weddings, grand receptions, and executive meetings.',
    packageOverview:
      'The High Budget Plan is tailored for grand family celebrations, traditional weddings, receptions, and corporate conclaves hosting 400 seated and up to 650 floating guests. Featuring centralized HVAC climate control, chandelier illumination, a grand floral mandap stage, and bridal green rooms, this package connects directly to our air-conditioned dining hall and manicured courtyard lawn.',
    image: highBudgetHallImg,
    secondaryImages: [
      {
        src: eventLawnImg,
        caption: 'Direct connectivity to the manicured courtyard lawn and Ganesha shrine'
      },
      {
        src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        caption: 'Air-conditioned bridal green rooms and guest suites with lift access'
      }
    ],
    facilities: [
      'Architectural banquet hall accommodating 400 seated and 650 floating guests',
      'Centralized HVAC climate control and sculpted chandelier illumination',
      'Polished marble flooring with unobstructed pillarless sightlines',
      'Grand floral mandap stage ready for traditional wedding rituals and receptions',
      'Dedicated air-conditioned bridal green rooms and guest room access with passenger elevator',
      'Direct connectivity to the centralized AC dining hall (300 seated / 500 floating) and courtyard lawn',
      'Indoor pure-vegetarian kitchen and separate outdoor non-vegetarian cooking zones',
      'Dedicated parking for approximately 30 cars, dual entry/exit gates, 24/7 CCTV & 100% DG backup'
    ],
    includedServices: [
      {
        title: 'Catering Arrangements',
        description: 'Seamless access to vegetarian indoor cooking and non-vegetarian outdoor cooking arrangements with 300-seat AC dining hall support.'
      },
      {
        title: 'Stage Decorations',
        description: 'Grand mandap and stage decoration through appointed companies, with additional arrangements coordinated by clients.'
      },
      {
        title: 'Flexible Packages',
        description: 'Event pricing tailored to your selected package, session requirements, and celebration schedule.'
      },
      {
        title: 'Security & Backup',
        description: '24/7 multi-angle CCTV surveillance, dedicated security staff, and 100% diesel generator backup.'
      }
    ],
    benefits: [
      {
        title: 'Stately Wedding & Reception Ambience',
        description: 'Sculpted chandeliers, marble flooring, and an elevated mandap stage provide a regal setting for photography and ceremonies.'
      },
      {
        title: 'Seamless Hall-to-Dining & Lawn Flow',
        description: 'Direct connectivity between the banquet hall, dining wing, and courtyard lawn ensures effortless crowd movement for up to 650 guests.'
      },
      {
        title: 'Bridal & Family Comfort',
        description: 'Includes bridal green rooms and access to air-conditioned guest rooms with first-floor passenger lift connectivity.'
      },
      {
        title: 'Reliable Infrastructure',
        description: 'Centralized HVAC cooling and automatic 100% generator backup keep every ceremony comfortable in any season.'
      }
    ],
    specifications: [
      { label: 'Package Tier', value: 'High Budget Plan (Grand & Celebratory)' },
      { label: 'Hall Capacity', value: '400 Seated • 650 Floating Guests' },
      { label: 'Climate & Lighting', value: 'Centralized HVAC & Sculpted Chandelier Illumination' },
      { label: 'Stage & Suites', value: 'Grand Floral Mandap Stage & Bridal Green Rooms' },
      { label: 'Venue Connectivity', value: 'Direct Access to AC Dining Hall & Courtyard Lawn' },
      { label: 'Power & Security', value: '100% DG Power Backup, Dual Gates & 24/7 CCTV' }
    ],
    idealFor: ['Traditional Weddings', 'Grand Receptions', 'Corporate Seminars & Conclaves', 'Engagement Ceremonies', 'Anniversary Galas']
  },
  {
    id: 'premium-budget-plan',
    title: 'Premium Budget Plan',
    hallName: 'Premium Hall',
    tierLabel: 'Flagship Royal Ballroom',
    tagline: 'Our Flagship Palatial Ballroom Package for Royal Weddings, Major Expos, Corporate Summits & Gala Receptions',
    capacity: '600 Seated • 1,000 Floating',
    description:
      'Our flagship palatial ballroom featuring soaring coffered ceilings, dramatic crystal chandeliers, HD LED stage backdrop, and VIP suite access for prestigious weddings and major corporate expos.',
    packageOverview:
      'The Premium Budget Plan represents the pinnacle of scale and grandeur at PS Convention Center. Accommodating 600 seated and up to 1,000 floating guests, the flagship Premium Hall features soaring coffered ceilings, luminous crystal chandeliers, a wide elevated royal stage with an integrated HD LED display wall, and priority VIP elevator access to our 6 air-conditioned guest suites.',
    image: premiumHallImg,
    secondaryImages: [
      {
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Wide elevated royal stage with HD LED display wall and floral mandap setup'
      },
      {
        src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        caption: 'Connected venue amenities including first-floor open terrace, suites, and dining hall'
      }
    ],
    facilities: [
      'Flagship royal convention ballroom seating 600 guests with 1,000 floating guest capacity',
      'Flagship centralized HVAC climate control and acoustic coffered ceiling design',
      'Wide elevated royal stage equipped with an integrated high-definition LED display wall',
      'Luminous crystal chandeliers and pillarless sightlines across the entire auditorium',
      'Priority VIP passenger elevator access and 6 air-conditioned guest rooms / bridal suites',
      'Full access to centralized AC dining hall (300 seated / 500 floating), indoor veg & outdoor non-veg kitchens',
      'Access to manicured courtyard lawn with Ganesha temple and first-floor open terrace',
      'Dedicated parking for approximately 30 cars with separate entry/exit gates, 24/7 CCTV & 100% DG backup'
    ],
    includedServices: [
      {
        title: 'Catering Arrangements',
        description: 'Full-capacity dining support for 300 seated and 500 floating guests per batch with separate indoor vegetarian and outdoor non-vegetarian cooking facilities.'
      },
      {
        title: 'Stage Decorations',
        description: 'Bespoke royal mandap and stage decoration through appointed companies, enhanced by the integrated HD LED display backdrop.'
      },
      {
        title: 'Flexible Packages',
        description: 'Comprehensive event pricing based on your selected package, multi-session or full-day requirements, and venue configurations.'
      },
      {
        title: 'Security & Backup',
        description: '24/7 CCTV camera coverage, dedicated security personnel, separate VIP arrival/departure gates, and 100% heavy-duty generator backup.'
      }
    ],
    benefits: [
      {
        title: 'Maximum Grandeur & 1,000+ Floating Capacity',
        description: 'Designed to host flagship royal weddings, large-scale receptions, and major corporate expos with complete comfort.'
      },
      {
        title: 'Integrated HD LED Display & Acoustic Excellence',
        description: 'Built-in high-definition LED backdrop wall and acoustic ceiling engineering elevate live ceremonies, wedding visuals, and keynote presentations.'
      },
      {
        title: 'VIP Suite & Elevator Convenience',
        description: 'Priority passenger lift access connects the ballroom with first-floor air-conditioned bridal suites, guest rooms, and open terrace.'
      },
      {
        title: 'Complete Venue Ecosystem',
        description: 'Seamless coordination across the main ballroom, 300-seat AC dining hall, Ganesha temple courtyard, and dual-gate parking concourse.'
      }
    ],
    specifications: [
      { label: 'Package Tier', value: 'Premium Budget Plan (Flagship Royal Ballroom)' },
      { label: 'Hall Capacity', value: '600 Seated • 1,000 Floating Guests' },
      { label: 'Climate & Acoustics', value: 'Flagship Centralized HVAC & Coffered Acoustic Ceiling' },
      { label: 'Stage & Visuals', value: 'Wide Elevated Royal Stage with HD LED Display Wall' },
      { label: 'Suites & Access', value: '6 AC Guest Suites, Priority VIP Lift & Valet Bay' },
      { label: 'Dining & Power', value: '300 Seated / 500 Floating AC Dining & 100% DG Backup' }
    ],
    idealFor: ['Grand Royal Weddings', 'Major Expos & Exhibitions', 'Corporate Summits & Conclaves', 'Gala Wedding Receptions', 'Large-Scale Cultural Celebrations']
  }
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'hall-3',
    title: 'Hall',
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
        packageSlug: 'low-budget-plan',
        name: 'Low Budget Hall',
        planTitle: 'Low Budget Plan',
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
        packageSlug: 'high-budget-plan',
        name: 'High Budget Hall',
        planTitle: 'High Budget Plan',
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
        packageSlug: 'premium-budget-plan',
        name: 'Premium Hall',
        planTitle: 'Premium Budget Plan',
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
