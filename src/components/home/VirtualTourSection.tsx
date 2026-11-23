import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Maximize2,
  Minimize2,
  RotateCw,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Compass,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  Eye,
  Layers,
  MapPin
} from 'lucide-react';

interface VirtualTourSectionProps {
  onBookVenue?: (spaceName: string) => void;
}

type LightingMode = 'day' | 'sunset' | 'night';

interface TourSpace {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  capacity: string;
  area: string;
  highlight: string;
  description: string;
  cameraInit: { x: number; y: number; z: number };
  targetInit: { x: number; y: number; z: number };
  hotspots: {
    id: string;
    label: string;
    position: [number, number, number];
    detail: string;
    specs: string;
  }[];
}

const TOUR_SPACES: TourSpace[] = [
  {
    id: 'grand-hall',
    name: 'Main Grand Convention Hall',
    shortName: 'Main Mandapam Hall',
    subtitle: 'Royal Stage & Centralized HVAC Auditorium',
    capacity: '600 Seated • 1,000 Floating',
    area: '10,000+ sq.ft pillar-free span',
    highlight: 'Centralized HVAC, 40-ft Grand Mandapam Stage, HD LED Video Wall',
    description:
      'The jewel of Padmasena Convention Center. Features an expansive high-ceiling ballroom, luxury crystal chandeliers, acoustic dampening, and unobstructed stage views from every row.',
    cameraInit: { x: 0, y: 7, z: 22 },
    targetInit: { x: 0, y: 3, z: 0 },
    hotspots: [
      {
        id: 'stage',
        label: 'Royal Mandap Stage',
        position: [0, 4.2, -12],
        detail: 'Raised 40-foot ceremonial dais equipped with gold archways, LED screen wall, and flower arrangement trusses.',
        specs: 'Width: 40ft • Depth: 24ft • Height clearance: 18ft'
      },
      {
        id: 'chandelier',
        label: 'Crystal Chandelier Array',
        position: [0, 9, 0],
        detail: 'Tiered warm-white crystal chandeliers designed for regal wedding photography and ambient dimming.',
        specs: 'Dynamic DMX Dimming • 3200K Warm Gala Glow'
      },
      {
        id: 'seating',
        label: 'Aisle & Seating Layout',
        position: [4, 1.2, 5],
        detail: 'Wide cushioned banquet seating with broad royal runner aisles for ceremonial processionals.',
        specs: '600 Theatre Seats • 1,000 Floating Capacity'
      },
      {
        id: 'hvac',
        label: 'Centralized HVAC Vents',
        position: [-9, 8, -4],
        detail: 'Industrial-grade silent chillers maintaining an optimal 22°C even during peak summer gatherings.',
        specs: 'Continuous fresh air exchange • Dual redundant compressors'
      }
    ]
  },
  {
    id: 'dining-hall',
    name: 'Royal Banquet Dining Hall',
    shortName: 'Dining Hall',
    subtitle: 'Traditional Feast & Modern Buffet Setup',
    capacity: '300 Seated • 500 Floating',
    area: '6,500 sq.ft with dedicated wash bays',
    highlight: 'Quick batch turnaround, clean stainless counters, polished marble flooring',
    description:
      'Fully air-conditioned dining facility configured for both traditional South Indian banana leaf seated feasts and contemporary live banquet counters.',
    cameraInit: { x: 0, y: 6, z: 20 },
    targetInit: { x: 0, y: 2, z: 0 },
    hotspots: [
      {
        id: 'dining-tables',
        label: 'Feast Dining Benches',
        position: [0, 1.2, -2],
        detail: 'Polished granite dining tables configured for rapid catering turnover and spotless cleanliness.',
        specs: '300 Guests per dining batch'
      },
      {
        id: 'buffet-counter',
        label: 'Live Food Station Counter',
        position: [-10, 1.8, -8],
        detail: 'Hygienic stainless service counter with warming wells and separate chef prep corridor.',
        specs: 'Dedicated hot-line with direct kitchen access'
      },
      {
        id: 'service-lane',
        label: 'Ergonomic Service Corridor',
        position: [7, 1.2, 4],
        detail: 'Spacious transit aisles allowing waitstaff to serve piping hot delicacies effortlessly.',
        specs: '6-foot wide clear aisle passages'
      }
    ]
  },
  {
    id: 'temple-courtyard',
    name: 'Ganesha Temple & Courtyard',
    shortName: 'Temple Courtyard',
    subtitle: 'Sacred Sanctum & Lush Open Lawn',
    capacity: 'Open Courtyard Gathering',
    area: '4,000 sq.ft open-air courtyard',
    highlight: 'Consecrated Ganesha shrine, manicured lawn, sacred wedding rituals',
    description:
      'A serene open courtyard between the main convention hall and dining block, anchored by an authentic stone Ganesha shrine for auspicious beginnings.',
    cameraInit: { x: 0, y: 7, z: 21 },
    targetInit: { x: 0, y: 2.5, z: 0 },
    hotspots: [
      {
        id: 'shrine',
        label: 'Sri Ganesha Shrine',
        position: [0, 3.5, -9],
        detail: 'Traditional granite temple sanctum where auspicious wedding poojas, homams, and blessings begin.',
        specs: 'Carved stone sanctum with bronze bell & brass vilakku lamps'
      },
      {
        id: 'courtyard-lawn',
        label: 'Manicured Lawn & Pathway',
        position: [5, 0.8, 1],
        detail: 'Lush natural carpet grass and paved stone walkways connecting the halls with breezy seating.',
        specs: 'Floral borders • Stone lantern accents'
      }
    ]
  },
  {
    id: 'open-terrace',
    name: 'First-Floor Open Sky Terrace',
    shortName: 'Sky Terrace',
    subtitle: 'Elevated Cocktail & Sangeet Deck',
    capacity: '200 Guests Open-Air',
    area: '3,500 sq.ft scenic elevation',
    highlight: 'Open sky view, starry string lighting, panoramic Palur countryside breezes',
    description:
      'Perched on the first floor with lift access, the open terrace offers an enchanting setting for twilight mehendi, sangeet cocktails, and stargazing conversations.',
    cameraInit: { x: 0, y: 7, z: 20 },
    targetInit: { x: 0, y: 2, z: 0 },
    hotspots: [
      {
        id: 'pergola',
        label: 'Timber Pergola & Lounge',
        position: [0, 3, -6],
        detail: 'Architectural teak pergola canopy draped with glowing fairy lights and luxury cocktail lounge furniture.',
        specs: 'Weatherproof canopy with festoon light rig'
      },
      {
        id: 'terrace-view',
        label: 'Panoramic Horizon Railing',
        position: [9, 1.8, 2],
        detail: 'Tempered glass railing showcasing views of the peaceful green coconut groves of Palur Village.',
        specs: 'Unobstructed 180° sunset vistas'
      }
    ]
  },
  {
    id: 'entrance-facade',
    name: 'Grand Entrance & Portico',
    shortName: 'Grand Facade',
    subtitle: 'Imperial Arrival Concourse & Driveway',
    capacity: '30 Car Parking & VIP Drop-off',
    area: 'Wide dual-gate carriage concourse',
    highlight: 'Towering colonnade portico, ceremonial red carpet drop-off, illuminated signage',
    description:
      'The breathtaking first impression of Padmasena Convention Center. Imposing pillars, wide drop-off lanes, manicured palms, and warm golden architectural wash lighting.',
    cameraInit: { x: 0, y: 8, z: 26 },
    targetInit: { x: 0, y: 3.5, z: 0 },
    hotspots: [
      {
        id: 'portico',
        label: 'Imperial Colonnade Portico',
        position: [0, 4.5, -4],
        detail: 'Sheltered double-height portico for sheltered VIP and bride/groom car arrivals during all weather.',
        specs: 'Clearance height: 18ft • High-end pavers'
      },
      {
        id: 'signage',
        label: 'Padmasena Golden Crest',
        position: [0, 8.2, -10],
        detail: 'Illuminated 3D architectural brass emblem and convention center lettering.',
        specs: 'Backlit warm-gold lotus insignia'
      }
    ]
  }
];

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ onBookVenue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSpaceId, setActiveSpaceId] = useState<string>('grand-hall');
  const [lightingMode, setLightingMode] = useState<LightingMode>('night');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<TourSpace['hotspots'][0] | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});

  const activeSpace = TOUR_SPACES.find((s) => s.id === activeSpaceId) || TOUR_SPACES[0];

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const spaceGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(activeSpace.cameraInit.x, activeSpace.cameraInit.y, activeSpace.cameraInit.z));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(activeSpace.targetInit.x, activeSpace.targetInit.y, activeSpace.targetInit.z));
  const isTransitioning = useRef<boolean>(false);

  // Web Audio ambient sound synthesizer (100% self-contained, no external MP3 dependencies)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtxClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Create warm sacred harmonic pad (chords: F# major / meditative temple bell harmony)
        const freqs = [185.0, 277.18, 369.99, 554.37];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO vibrato
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(gainNode);
          osc.start();
        });

        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Audio could not be initialized:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Procedural Builder for 3D Spaces
  const buildSpaceGeometry = useCallback((spaceId: string, group: THREE.Group) => {
    // Clear previous models
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else {
          mat.dispose();
        }
      }
    }

    // Common Architectural Materials
    const marbleFloorMat = new THREE.MeshStandardMaterial({
      color: 0xede8dc,
      roughness: 0.18,
      metalness: 0.1
    });

    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a45d,
      roughness: 0.25,
      metalness: 0.85
    });

    const emeraldVelvetMat = new THREE.MeshStandardMaterial({
      color: 0x11614f,
      roughness: 0.7,
      metalness: 0.1
    });

    const royalRedCarpetMat = new THREE.MeshStandardMaterial({
      color: 0x8a182b,
      roughness: 0.85,
      metalness: 0.05
    });

    const warmWallMat = new THREE.MeshStandardMaterial({
      color: 0xf4ede2,
      roughness: 0.6,
      metalness: 0.05
    });

    const darkCeilingMat = new THREE.MeshStandardMaterial({
      color: 0x18241d,
      roughness: 0.5,
      metalness: 0.2
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5
    });

    if (spaceId === 'grand-hall') {
      // 1. FLOOR with ornamental border
      const floorGeo = new THREE.PlaneGeometry(36, 44);
      const floorMesh = new THREE.Mesh(floorGeo, marbleFloorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.receiveShadow = true;
      group.add(floorMesh);

      // Central Royal Aisle Runner
      const aisleGeo = new THREE.PlaneGeometry(5, 34);
      const aisleMesh = new THREE.Mesh(aisleGeo, royalRedCarpetMat);
      aisleMesh.rotation.x = -Math.PI / 2;
      aisleMesh.position.set(0, 0.02, 3);
      group.add(aisleMesh);

      // Gold Trim Borders on Aisle
      const goldTrimGeo = new THREE.PlaneGeometry(0.2, 34);
      const leftTrim = new THREE.Mesh(goldTrimGeo, polishedGoldMat);
      leftTrim.rotation.x = -Math.PI / 2;
      leftTrim.position.set(-2.5, 0.03, 3);
      const rightTrim = leftTrim.clone();
      rightTrim.position.x = 2.5;
      group.add(leftTrim, rightTrim);

      // 2. WALLS
      const wallMat = warmWallMat;
      // Back wall behind stage
      const backWallGeo = new THREE.BoxGeometry(36, 14, 0.5);
      const backWall = new THREE.Mesh(backWallGeo, wallMat);
      backWall.position.set(0, 7, -22);
      backWall.receiveShadow = true;
      group.add(backWall);

      // Side Walls with architectural pilasters
      const sideWallGeo = new THREE.BoxGeometry(0.5, 14, 44);
      const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
      leftWall.position.set(-18, 7, 0);
      const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
      rightWall.position.set(18, 7, 0);
      group.add(leftWall, rightWall);

      // Ceiling with recessed coffered lighting
      const ceilingGeo = new THREE.BoxGeometry(36, 0.4, 44);
      const ceiling = new THREE.Mesh(ceilingGeo, darkCeilingMat);
      ceiling.position.set(0, 14, 0);
      group.add(ceiling);

      // 3. GRAND MANDAPAM STAGE (Raised Dais)
      const stageBaseGeo = new THREE.BoxGeometry(22, 1.4, 12);
      const stageBase = new THREE.Mesh(stageBaseGeo, marbleFloorMat);
      stageBase.position.set(0, 0.7, -14);
      stageBase.receiveShadow = true;
      group.add(stageBase);

      // Stage Gold Rim Fascia
      const stageFasciaGeo = new THREE.BoxGeometry(22.2, 0.25, 12.2);
      const stageFascia = new THREE.Mesh(stageFasciaGeo, polishedGoldMat);
      stageFascia.position.set(0, 1.4, -14);
      group.add(stageFascia);

      // Royal Stage Carpet
      const stageCarpetGeo = new THREE.PlaneGeometry(21.8, 11.8);
      const stageCarpet = new THREE.Mesh(stageCarpetGeo, royalRedCarpetMat);
      stageCarpet.rotation.x = -Math.PI / 2;
      stageCarpet.position.set(0, 1.42, -14);
      group.add(stageCarpet);

      // Stage Mandap Arch Pillars (Gold Fluted Columns)
      const colGeo = new THREE.CylinderGeometry(0.35, 0.42, 6.5, 24);
      [-6, -2, 2, 6].forEach((x) => {
        const col = new THREE.Mesh(colGeo, polishedGoldMat);
        col.position.set(x, 4.65, -14);
        col.castShadow = true;
        group.add(col);
      });

      // Stage Arch Top Beam (Lotus Crested arch)
      const archTopGeo = new THREE.BoxGeometry(14, 0.6, 0.8);
      const archTop = new THREE.Mesh(archTopGeo, polishedGoldMat);
      archTop.position.set(0, 8, -14);
      group.add(archTop);

      // Traditional Temple Gopuram / Mandap Finial on Stage
      const finialGeo = new THREE.ConeGeometry(0.8, 1.8, 16);
      const finial = new THREE.Mesh(finialGeo, polishedGoldMat);
      finial.position.set(0, 9.1, -14);
      group.add(finial);

      // Giant High-Definition LED Backdrop Screen
      const ledScreenGeo = new THREE.BoxGeometry(18, 5.5, 0.2);
      const ledScreenMat = new THREE.MeshStandardMaterial({
        color: 0x24140b,
        emissive: 0x221307,
        emissiveIntensity: 0.8,
        roughness: 0.3
      });
      const ledScreen = new THREE.Mesh(ledScreenGeo, ledScreenMat);
      ledScreen.position.set(0, 4.8, -19.5);
      group.add(ledScreen);

      // 4. ELEGANT GRAND CHANDELIERS
      [-6, 0, 6].forEach((z) => {
        const chandelierGroup = new THREE.Group();
        chandelierGroup.position.set(0, 11, z);

        // Hanging gold rod
        const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.5);
        const rod = new THREE.Mesh(rodGeo, polishedGoldMat);
        rod.position.y = 1.25;
        chandelierGroup.add(rod);

        // Tier 1 Ring
        const ring1Geo = new THREE.TorusGeometry(1.6, 0.06, 12, 36);
        const ring1 = new THREE.Mesh(ring1Geo, polishedGoldMat);
        ring1.rotation.x = Math.PI / 2;
        chandelierGroup.add(ring1);

        // Tier 2 Ring
        const ring2Geo = new THREE.TorusGeometry(0.9, 0.05, 12, 28);
        const ring2 = new THREE.Mesh(ring2Geo, polishedGoldMat);
        ring2.rotation.x = Math.PI / 2;
        ring2.position.y = -0.5;
        chandelierGroup.add(ring2);

        // Glass crystal droplets
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2;
          const dropGeo = new THREE.OctahedronGeometry(0.12, 1);
          const drop = new THREE.Mesh(dropGeo, glassMat);
          drop.position.set(Math.cos(angle) * 1.55, -0.2, Math.sin(angle) * 1.55);
          chandelierGroup.add(drop);
        }

        // Chandelier Warm Pointlight
        const chanLight = new THREE.PointLight(0xffeedd, 1.2, 18, 1.5);
        chanLight.position.set(0, -0.3, 0);
        chandelierGroup.add(chanLight);

        group.add(chandelierGroup);
      });

      // 5. SEATING ROWS (Emerald Cushioned Banquet Chairs)
      const seatGroup = new THREE.Group();
      const chairBackGeo = new THREE.BoxGeometry(0.7, 0.8, 0.08);
      const chairBaseGeo = new THREE.BoxGeometry(0.7, 0.1, 0.7);

      const rows = 5;
      const cols = 5;
      for (let r = 0; r < rows; r++) {
        const zPos = -3 + r * 3.2;
        // Left Block
        for (let c = 0; c < cols; c++) {
          const xPos = -4.5 - c * 1.6;
          const chair = new THREE.Group();
          chair.position.set(xPos, 0.45, zPos);

          const base = new THREE.Mesh(chairBaseGeo, emeraldVelvetMat);
          base.position.y = 0;
          const back = new THREE.Mesh(chairBackGeo, emeraldVelvetMat);
          back.position.set(0, 0.45, -0.32);

          chair.add(base, back);
          seatGroup.add(chair);
        }
        // Right Block
        for (let c = 0; c < cols; c++) {
          const xPos = 4.5 + c * 1.6;
          const chair = new THREE.Group();
          chair.position.set(xPos, 0.45, zPos);

          const base = new THREE.Mesh(chairBaseGeo, emeraldVelvetMat);
          base.position.y = 0;
          const back = new THREE.Mesh(chairBackGeo, emeraldVelvetMat);
          back.position.set(0, 0.45, -0.32);

          chair.add(base, back);
          seatGroup.add(chair);
        }
      }
      group.add(seatGroup);

      // Side Architectural Classical Columns
      const sideColGeo = new THREE.CylinderGeometry(0.5, 0.6, 13, 20);
      for (let z = -18; z <= 18; z += 9) {
        const cLeft = new THREE.Mesh(sideColGeo, marbleFloorMat);
        cLeft.position.set(-16.8, 6.5, z);
        const cRight = new THREE.Mesh(sideColGeo, marbleFloorMat);
        cRight.position.set(16.8, 6.5, z);
        group.add(cLeft, cRight);
      }
    } else if (spaceId === 'dining-hall') {
      // DINING HALL SETUP
      const floorGeo = new THREE.PlaneGeometry(32, 40);
      const floorMesh = new THREE.Mesh(floorGeo, marbleFloorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      group.add(floorMesh);

      // Side Walls
      const wallMat = warmWallMat;
      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10, 40), wallMat);
      leftWall.position.set(-16, 5, 0);
      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10, 40), wallMat);
      rightWall.position.set(16, 5, 0);
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(32, 10, 0.4), wallMat);
      backWall.position.set(0, 5, -20);
      group.add(leftWall, rightWall, backWall);

      // Banquet Dining Tables arranged in traditional parallel lines
      const tableGeo = new THREE.BoxGeometry(3.6, 0.8, 1.2);
      const tableMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const bananaLeafMat = new THREE.MeshStandardMaterial({ color: 0x3b8526, roughness: 0.6 });
      const tumblerMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });

      for (let row = -2; row <= 2; row++) {
        for (let col = -2; col <= 2; col++) {
          const tableX = col * 5.5;
          const tableZ = row * 6;
          const table = new THREE.Mesh(tableGeo, tableMat);
          table.position.set(tableX, 0.4, tableZ);
          group.add(table);

          // Banana leaf place settings on each side
          [-1, 1].forEach((offset) => {
            const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), bananaLeafMat);
            leaf.rotation.x = -Math.PI / 2;
            leaf.position.set(tableX + offset * 0.9, 0.82, tableZ);
            group.add(leaf);

            // Brass Tumbler
            const tumbler = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.15, 12), tumblerMat);
            tumbler.position.set(tableX + offset * 0.9 + 0.3, 0.9, tableZ - 0.2);
            group.add(tumbler);
          });
        }
      }

      // Buffet Counter along Left Wall
      const buffetCounterGeo = new THREE.BoxGeometry(2, 1.1, 28);
      const buffetMat = new THREE.MeshStandardMaterial({ color: 0x11614f, roughness: 0.4 });
      const buffetCounter = new THREE.Mesh(buffetCounterGeo, buffetMat);
      buffetCounter.position.set(-13, 0.55, 0);
      group.add(buffetCounter);

      // Counter Top in White Quartz
      const counterTop = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 28.2), marbleFloorMat);
      counterTop.position.set(-13, 1.15, 0);
      group.add(counterTop);

      // Chafing Dish Food Warmers
      const chaferGeo = new THREE.BoxGeometry(0.8, 0.35, 1.2);
      const silverMat = new THREE.MeshStandardMaterial({ color: 0xd0d5dd, metalness: 0.8, roughness: 0.2 });
      for (let z = -10; z <= 10; z += 3.5) {
        const dish = new THREE.Mesh(chaferGeo, silverMat);
        dish.position.set(-13, 1.35, z);
        group.add(dish);
      }
    } else if (spaceId === 'temple-courtyard') {
      // GANESHA TEMPLE & OPEN COURTYARD
      // Ground Cobblestone and Lawn
      const lawnGeo = new THREE.PlaneGeometry(36, 36);
      const lawnMat = new THREE.MeshStandardMaterial({ color: 0x2e6f40, roughness: 0.9 });
      const lawn = new THREE.Mesh(lawnGeo, lawnMat);
      lawn.rotation.x = -Math.PI / 2;
      group.add(lawn);

      // Stone Courtyard Pathway
      const pathGeo = new THREE.PlaneGeometry(6, 36);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd3ccbe, roughness: 0.7 });
      const path = new THREE.Mesh(pathGeo, stoneMat);
      path.rotation.x = -Math.PI / 2;
      path.position.set(0, 0.02, 0);
      group.add(path);

      // Traditional Stone Mandapam Shrine for Sri Ganesha
      const shrineBaseGeo = new THREE.BoxGeometry(6, 0.6, 6);
      const graniteMat = new THREE.MeshStandardMaterial({ color: 0x47494a, roughness: 0.6 });
      const shrineBase = new THREE.Mesh(shrineBaseGeo, graniteMat);
      shrineBase.position.set(0, 0.3, -8);
      group.add(shrineBase);

      // 4 Granite Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.2, 0.25, 3.8, 12);
      [-2.2, 2.2].forEach((px) => {
        [-10.2, -5.8].forEach((pz) => {
          const p = new THREE.Mesh(pillarGeo, graniteMat);
          p.position.set(px, 2.4, pz);
          group.add(p);
        });
      });

      // Vimana / Gopuram Roof (Stepped Pyramid)
      for (let tier = 0; tier < 3; tier++) {
        const stepGeo = new THREE.BoxGeometry(5.2 - tier * 1.2, 0.7, 5.2 - tier * 1.2);
        const step = new THREE.Mesh(stepGeo, graniteMat);
        step.position.set(0, 4.4 + tier * 0.7, -8);
        group.add(step);
      }

      // Golden Kalasam Spire
      const kalasamGeo = new THREE.ConeGeometry(0.35, 1.2, 16);
      const kalasam = new THREE.Mesh(kalasamGeo, polishedGoldMat);
      kalasam.position.set(0, 7.1, -8);
      group.add(kalasam);

      // Ganesha Idol Silhouette (Golden Brass)
      const idolGeo = new THREE.CylinderGeometry(0.35, 0.5, 1.2, 16);
      const idol = new THREE.Mesh(idolGeo, polishedGoldMat);
      idol.position.set(0, 1.4, -8);
      group.add(idol);

      // Traditional Brass Diya Lamp with Warm Flame Light
      const diyaGeo = new THREE.CylinderGeometry(0.15, 0.25, 0.9, 12);
      const diya = new THREE.Mesh(diyaGeo, polishedGoldMat);
      diya.position.set(0, 1.0, -5.2);
      group.add(diya);

      const diyaLight = new THREE.PointLight(0xffa500, 1.4, 10, 1.5);
      diyaLight.position.set(0, 1.6, -5.2);
      group.add(diyaLight);

      // Courtyard Palm & Frangipani Trees
      [-10, 10].forEach((tx) => {
        [-10, 2, 12].forEach((tz) => {
          const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 4, 12);
          const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
          const trunk = new THREE.Mesh(trunkGeo, trunkMat);
          trunk.position.set(tx, 2, tz);

          const foliageGeo = new THREE.SphereGeometry(1.6, 12, 12);
          const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f5c2b, roughness: 0.8 });
          const foliage = new THREE.Mesh(foliageGeo, foliageMat);
          foliage.position.set(tx, 4.8, tz);

          group.add(trunk, foliage);
        });
      });
    } else if (spaceId === 'open-terrace') {
      // OPEN TERRACE SKY DECK
      // Deck Tiles
      const deckGeo = new THREE.PlaneGeometry(30, 30);
      const deckMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.4 });
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.rotation.x = -Math.PI / 2;
      group.add(deck);

      // Perimeter Glass Railing
      const railingGeo = new THREE.BoxGeometry(30, 1.3, 0.15);
      const backRailing = new THREE.Mesh(railingGeo, glassMat);
      backRailing.position.set(0, 0.65, -15);
      const frontRailing = backRailing.clone();
      frontRailing.position.z = 15;

      const sideRailingGeo = new THREE.BoxGeometry(0.15, 1.3, 30);
      const leftRailing = new THREE.Mesh(sideRailingGeo, glassMat);
      leftRailing.position.set(-15, 0.65, 0);
      const rightRailing = leftRailing.clone();
      rightRailing.position.x = 15;

      group.add(backRailing, frontRailing, leftRailing, rightRailing);

      // Pergola Structure
      const timberMat = new THREE.MeshStandardMaterial({ color: 0x2e1d11, roughness: 0.7 });
      // 4 Pergola Posts
      [-5, 5].forEach((px) => {
        [-8, 0].forEach((pz) => {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.2, 0.35), timberMat);
          post.position.set(px, 2.1, pz);
          group.add(post);
        });
      });

      // Pergola Roof Slats
      for (let i = 0; i < 9; i++) {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(11, 0.15, 0.3), timberMat);
        slat.position.set(0, 4.2, -8 + i * 1.0);
        group.add(slat);
      }

      // String fairy lights along slats
      for (let s = -4; s <= 4; s += 2) {
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshStandardMaterial({ emissive: 0xffe899, emissiveIntensity: 1 })
        );
        bulb.position.set(s, 4.0, -4);
        group.add(bulb);
      }

      // Cocktail High-Top Tables with Amber Glow
      [-5, 0, 5].forEach((tx) => {
        const highTable = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.4, 16), polishedGoldMat);
        highTable.position.set(tx, 0.7, 6);
        group.add(highTable);
      });
    } else if (spaceId === 'entrance-facade') {
      // GRAND ENTRANCE & FAÇADE
      // Concourse Driveway
      const driveGeo = new THREE.PlaneGeometry(38, 40);
      const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x232729, roughness: 0.8 });
      const driveway = new THREE.Mesh(driveGeo, asphaltMat);
      driveway.rotation.x = -Math.PI / 2;
      group.add(driveway);

      // Main Entrance Building Facade
      const facadeGeo = new THREE.BoxGeometry(34, 12, 4);
      const facadeMat = warmWallMat;
      const facade = new THREE.Mesh(facadeGeo, facadeMat);
      facade.position.set(0, 6, -12);
      group.add(facade);

      // Portico Canopy
      const canopyGeo = new THREE.BoxGeometry(16, 0.8, 12);
      const canopy = new THREE.Mesh(canopyGeo, marbleFloorMat);
      canopy.position.set(0, 6, -4);
      group.add(canopy);

      // Twin Colonnade Portico Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.55, 0.65, 5.8, 24);
      const p1 = new THREE.Mesh(pillarGeo, marbleFloorMat);
      p1.position.set(-6.5, 2.9, 0.5);
      const p2 = p1.clone();
      p2.position.x = 6.5;
      group.add(p1, p2);

      // Grand Entrance Glass Doors
      const doorGeo = new THREE.BoxGeometry(7, 3.8, 0.2);
      const doors = new THREE.Mesh(doorGeo, glassMat);
      doors.position.set(0, 1.9, -9.8);
      group.add(doors);

      // Red Carpet leading to Entrance
      const redCarpet = new THREE.Mesh(new THREE.PlaneGeometry(4, 14), royalRedCarpetMat);
      redCarpet.rotation.x = -Math.PI / 2;
      redCarpet.position.set(0, 0.02, -2);
      group.add(redCarpet);

      // Central Decorative Water Fountain
      const fountainRimGeo = new THREE.TorusGeometry(2.5, 0.25, 12, 32);
      const fountainRim = new THREE.Mesh(fountainRimGeo, marbleFloorMat);
      fountainRim.rotation.x = Math.PI / 2;
      fountainRim.position.set(0, 0.2, 10);
      group.add(fountainRim);

      const waterGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.1, 24);
      const waterMat = new THREE.MeshStandardMaterial({ color: 0x196784, roughness: 0.1, metalness: 0.2 });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.set(0, 0.18, 10);
      group.add(water);

      // Illuminated PADMASENA Gold Signage on Facade
      const signBackGeo = new THREE.BoxGeometry(14, 1.4, 0.1);
      const signBack = new THREE.Mesh(signBackGeo, emeraldVelvetMat);
      signBack.position.set(0, 8.8, -9.8);
      group.add(signBack);

      const crestGeo = new THREE.TorusGeometry(0.45, 0.06, 12, 24);
      const crest = new THREE.Mesh(crestGeo, polishedGoldMat);
      crest.position.set(0, 8.8, -9.7);
      group.add(crest);
    }
  }, []);

  // Lighting Manager
  const updateLighting = useCallback((mode: LightingMode, group: THREE.Group) => {
    // Clear old lights
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as THREE.Light).dispose) {
        (child as THREE.Light).dispose();
      }
    }

    if (mode === 'day') {
      // Crisp daylight
      const hemi = new THREE.HemisphereLight(0xffffff, 0xcce0d0, 1.1);
      group.add(hemi);

      const sun = new THREE.DirectionalLight(0xfffaf0, 1.8);
      sun.position.set(15, 25, 15);
      sun.castShadow = true;
      group.add(sun);

      const fill = new THREE.DirectionalLight(0xdceeff, 0.6);
      fill.position.set(-15, 12, -10);
      group.add(fill);
    } else if (mode === 'sunset') {
      // Warm golden hour
      const hemi = new THREE.HemisphereLight(0xffcaa0, 0x4d3320, 0.8);
      group.add(hemi);

      const sun = new THREE.DirectionalLight(0xff8c42, 2.2);
      sun.position.set(-20, 12, 10);
      sun.castShadow = true;
      group.add(sun);

      const fill = new THREE.PointLight(0xffaa55, 1.0, 30);
      fill.position.set(0, 6, 0);
      group.add(fill);
    } else {
      // Night / Royal Gala (Default)
      const ambient = new THREE.AmbientLight(0x0a1a12, 0.9);
      group.add(ambient);

      // Royal Stage Spotlights
      const stageSpot1 = new THREE.SpotLight(0xffeedd, 3.2, 35, Math.PI / 4, 0.35);
      stageSpot1.position.set(-8, 12, 4);
      stageSpot1.target.position.set(0, 3, -12);
      stageSpot1.castShadow = true;
      group.add(stageSpot1);
      group.add(stageSpot1.target);

      const stageSpot2 = new THREE.SpotLight(0xc5a45d, 2.8, 35, Math.PI / 4, 0.35);
      stageSpot2.position.set(8, 12, 4);
      stageSpot2.target.position.set(0, 3, -12);
      stageSpot2.castShadow = true;
      group.add(stageSpot2);
      group.add(stageSpot2.target);

      // Warm uplight wash
      const uplight = new THREE.PointLight(0xffd782, 1.8, 25);
      uplight.position.set(0, 5, 2);
      group.add(uplight);
    }
  }, []);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background Color
    scene.background = new THREE.Color(lightingMode === 'night' ? 0x05100b : lightingMode === 'sunset' ? 0x1d1217 : 0xe8ecf0);
    scene.fog = new THREE.FogExp2(
      lightingMode === 'night' ? 0x05100b : lightingMode === 'sunset' ? 0x1d1217 : 0xe8ecf0,
      0.015
    );

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(activeSpace.cameraInit.x, activeSpace.cameraInit.y, activeSpace.cameraInit.z);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
    controls.minDistance = 3;
    controls.maxDistance = 45;
    controls.target.set(activeSpace.targetInit.x, activeSpace.targetInit.y, activeSpace.targetInit.z);
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // 5. Lights Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;
    updateLighting(lightingMode, lightsGroup);

    // 6. Space Group
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);
    spaceGroupRef.current = spaceGroup;
    buildSpaceGeometry(activeSpaceId, spaceGroup);

    // 7. Hotspot Screen Projections Loop
    const tempVec = new THREE.Vector3();
    const updateHotspotCoords = () => {
      if (!cameraRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {};

      activeSpace.hotspots.forEach((hs) => {
        tempVec.set(hs.position[0], hs.position[1], hs.position[2]);
        tempVec.project(cameraRef.current!);

        // Visible if in front of camera
        const isVisible = tempVec.z < 1;
        const x = (tempVec.x * 0.5 + 0.5) * rect.width;
        const y = (-(tempVec.y * 0.5) + 0.5) * rect.height;

        newCoords[hs.id] = { x, y, visible: isVisible };
      });
      setScreenCoords(newCoords);
    };

    // 8. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Smooth camera interpolation if transitioning
      if (isTransitioning.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
        controlsRef.current.target.lerp(targetLookAt.current, 0.06);

        if (cameraRef.current.position.distanceTo(targetCameraPos.current) < 0.1) {
          isTransitioning.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      updateHotspotCoords();
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update space when activeSpaceId changes
  useEffect(() => {
    if (!spaceGroupRef.current || !cameraRef.current || !controlsRef.current) return;
    buildSpaceGeometry(activeSpaceId, spaceGroupRef.current);

    targetCameraPos.current.set(activeSpace.cameraInit.x, activeSpace.cameraInit.y, activeSpace.cameraInit.z);
    targetLookAt.current.set(activeSpace.targetInit.x, activeSpace.targetInit.y, activeSpace.targetInit.z);
    isTransitioning.current = true;
    setActiveHotspot(null);
  }, [activeSpaceId, activeSpace, buildSpaceGeometry]);

  // Update lighting when lightingMode changes
  useEffect(() => {
    if (!lightsGroupRef.current || !sceneRef.current) return;
    updateLighting(lightingMode, lightsGroupRef.current);
    sceneRef.current.background = new THREE.Color(
      lightingMode === 'night' ? 0x05100b : lightingMode === 'sunset' ? 0x1d1217 : 0xe8ecf0
    );
    sceneRef.current.fog = new THREE.FogExp2(
      lightingMode === 'night' ? 0x05100b : lightingMode === 'sunset' ? 0x1d1217 : 0xe8ecf0,
      0.015
    );
  }, [lightingMode, updateLighting]);

  // Sync auto rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  const handleHotspotClick = (hs: TourSpace['hotspots'][0]) => {
    setActiveHotspot(hs);
    setIsAutoRotate(false);
    // Smoothly focus camera on hotspot
    targetLookAt.current.set(hs.position[0], hs.position[1], hs.position[2]);
    const offset = new THREE.Vector3(0, 2, 7);
    targetCameraPos.current.set(hs.position[0] + offset.x, hs.position[1] + offset.y, hs.position[2] + offset.z);
    isTransitioning.current = true;
  };

  const resetCameraView = () => {
    targetCameraPos.current.set(activeSpace.cameraInit.x, activeSpace.cameraInit.y, activeSpace.cameraInit.z);
    targetLookAt.current.set(activeSpace.targetInit.x, activeSpace.targetInit.y, activeSpace.targetInit.z);
    isTransitioning.current = true;
    setActiveHotspot(null);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <section id="virtual-tour" className="py-20 sm:py-28 bg-[#FAF8F2] dark:bg-[#06140e] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background embellishments */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A45D]/40 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A45D]/5 dark:bg-[#C5A45D]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11614F]/10 dark:bg-[#C5A45D]/15 border border-[#C5A45D]/40 text-[#11614F] dark:text-[#C5A45D] text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span>INTERACTIVE 3D VIRTUAL TOUR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1b3a2f] dark:text-[#f2eee1] tracking-tight">
              Walk Through <span className="font-semibold italic text-[#C5A45D]">Padmasena</span> in 3D
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl font-light leading-relaxed">
              Experience the royal architectural grandeur in real-time 3D. Inspect the 40-ft ceremonial stage, centralized air-conditioned banquet halls, and sacred courtyard from every angle before your visit.
            </p>
          </div>

          {/* Quick Stat Capsule */}
          <div className="flex items-center gap-4 border border-[#C5A45D]/30 bg-white/70 dark:bg-[#0c2317]/80 backdrop-blur-md px-5 py-3.5 shadow-sm shrink-0">
            <Compass className="w-8 h-8 text-[#C5A45D] shrink-0 animate-spin-slow" />
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">360° Realtime Engine</div>
              <div className="text-sm font-semibold text-[#11614F] dark:text-[#f3eedd]">Drag to Rotate • Scroll to Zoom</div>
            </div>
          </div>
        </div>

        {/* Space Navigation Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {TOUR_SPACES.map((space) => {
            const isActive = space.id === activeSpaceId;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#11614F] dark:bg-[#C5A45D] text-white dark:text-[#07150e] border-[#11614F] dark:border-[#C5A45D] shadow-md scale-[1.02]'
                    : 'bg-white/80 dark:bg-[#0c2317] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#C5A45D] hover:text-[#11614F]'
                }`}
              >
                <Eye className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A45D] dark:text-[#07150e]' : 'text-gray-400'}`} />
                <span>{space.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Viewport Box Container */}
        <div
          ref={containerRef}
          className={`relative w-full rounded-none border-2 border-[#C5A45D]/50 shadow-2xl overflow-hidden bg-[#07150e] transition-all ${
            isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[500px] sm:h-[620px] lg:h-[680px]'
          }`}
        >
          {/* WebGL Canvas */}
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Top Bar Floating Controls */}
          <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none z-20">
            {/* Active Space Banner Badge */}
            <div className="bg-[#07150e]/90 backdrop-blur-md border border-[#C5A45D]/40 px-3.5 py-2 shadow-lg pointer-events-auto flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#C5A45D]">VIRTUAL TOUR VIEWPOINT</div>
                <div className="text-xs sm:text-sm font-semibold text-white">{activeSpace.name}</div>
              </div>
            </div>

            {/* Quick Utility Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto bg-[#07150e]/85 backdrop-blur-md border border-[#C5A45D]/40 p-1.5 shadow-lg">
              {/* Lighting Mood Switcher */}
              <div className="flex items-center border-r border-white/15 pr-1.5 mr-1 gap-1">
                <button
                  onClick={() => setLightingMode('night')}
                  title="Gala Night Atmosphere"
                  className={`p-1.5 transition-colors cursor-pointer ${
                    lightingMode === 'night' ? 'bg-[#C5A45D] text-[#07150e]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightingMode('sunset')}
                  title="Golden Hour Sunset Atmosphere"
                  className={`p-1.5 transition-colors cursor-pointer ${
                    lightingMode === 'sunset' ? 'bg-[#C5A45D] text-[#07150e]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Sunset className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightingMode('day')}
                  title="Bright Daylight Atmosphere"
                  className={`p-1.5 transition-colors cursor-pointer ${
                    lightingMode === 'day' ? 'bg-[#C5A45D] text-[#07150e]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
              </div>

              {/* Auto Rotate Toggle */}
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                title={isAutoRotate ? 'Pause 360° Auto Orbit' : 'Enable 360° Auto Orbit'}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isAutoRotate ? 'bg-[#11614F] text-[#C5A45D] border border-[#C5A45D]/50' : 'text-gray-300 hover:text-white'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin-slow' : ''}`} />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">{isAutoRotate ? 'Orbit On' : 'Orbit'}</span>
              </button>

              {/* Ambient Sound Toggle */}
              <button
                onClick={toggleAudio}
                title={isAudioPlaying ? 'Mute Sacred Hall Ambience' : 'Play Sacred Hall Ambience'}
                className={`p-1.5 transition-colors cursor-pointer ${
                  isAudioPlaying ? 'text-[#C5A45D]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                className="p-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Floating 3D Hotspot Pins Projected on Screen */}
          {activeSpace.hotspots.map((hs) => {
            const coord = screenCoords[hs.id];
            if (!coord || !coord.visible) return null;

            const isSelected = activeHotspot?.id === hs.id;

            return (
              <div
                key={hs.id}
                style={{
                  position: 'absolute',
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 25
                }}
                className="transition-transform duration-150 pointer-events-auto"
              >
                <button
                  onClick={() => handleHotspotClick(hs)}
                  className="group flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  aria-label={`Explore ${hs.label}`}
                >
                  <div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#C5A45D] text-[#07150e] scale-125 shadow-[0_0_20px_#C5A45D]'
                        : 'bg-[#07150e]/90 text-[#C5A45D] border border-[#C5A45D] group-hover:scale-110 shadow-lg'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    {/* Pulsing halo */}
                    <span className="absolute inset-0 rounded-full border border-[#C5A45D] animate-ping opacity-75" />
                  </div>

                  {/* Hotspot Title Pill on Hover or Selection */}
                  <div
                    className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all ${
                      isSelected
                        ? 'bg-[#C5A45D] text-[#07150e] shadow-md'
                        : 'bg-black/80 text-white border border-[#C5A45D]/40 hidden group-hover:block'
                    }`}
                  >
                    {hs.label}
                  </div>
                </button>
              </div>
            );
          })}

          {/* Hotspot Specification Flyout Card (When Pin Clicked) */}
          {activeHotspot && (
            <div className="absolute bottom-20 sm:bottom-6 left-3 sm:left-6 max-w-sm sm:max-w-md bg-[#07150e]/95 backdrop-blur-xl border border-[#C5A45D] p-5 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-[#C5A45D] text-[#07150e]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    {activeHotspot.label}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-gray-400 hover:text-white text-xs uppercase px-1.5 py-0.5 border border-white/20 hover:border-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-300 font-light leading-relaxed mb-3">
                {activeHotspot.detail}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-[#C5A45D] font-medium">{activeHotspot.specs}</span>
                <button
                  onClick={resetCameraView}
                  className="text-gray-300 hover:text-[#C5A45D] underline underline-offset-4 cursor-pointer"
                >
                  Reset View
                </button>
              </div>
            </div>
          )}

          {/* Bottom Floating Information Overlay & Direct Booking CTA */}
          <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none z-20">
            {/* Space Highlight Pills */}
            <div className="bg-[#07150e]/85 backdrop-blur-md border border-white/15 px-3 py-2 text-white text-xs flex items-center gap-3 pointer-events-auto">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Layers className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span className="font-semibold text-white">{activeSpace.capacity}</span>
              </span>
              <span className="hidden md:inline w-px h-3 bg-white/20" />
              <span className="hidden md:flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>{activeSpace.area}</span>
              </span>
            </div>

            {/* Direct Booking CTA from Tour */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={resetCameraView}
                className="px-3.5 py-2.5 bg-black/60 hover:bg-black/90 text-white text-xs uppercase font-medium tracking-wider border border-white/30 hover:border-[#C5A45D] transition-colors cursor-pointer"
              >
                Reset Angle
              </button>
              <button
                onClick={() => {
                  if (onBookVenue) {
                    onBookVenue(activeSpace.name);
                  }
                }}
                className="px-5 py-2.5 bg-[#C5A45D] hover:bg-[#d8bc7a] text-[#07150e] text-xs uppercase font-bold tracking-[0.18em] shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book This Space</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Space Technical Capabilities Grid Below 3D Viewport */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] transition-colors">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A45D] mb-2">ARCHITECTURAL METRICS</div>
            <div className="text-xl font-light text-[#1b3a2f] dark:text-[#f3eedd] mb-2">{activeSpace.name}</div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {activeSpace.description}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] transition-colors">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A45D] mb-2">CAPACITY & LOGISTICS</div>
            <div className="text-xl font-semibold text-[#11614F] dark:text-[#C5A45D] mb-2">{activeSpace.capacity}</div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Equipped with independent entry/exit circulation corridors, VIP green room direct access, and dedicated catering service pathways.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] transition-colors">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A45D] mb-2">VIRTUAL TOUR TIPS</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">How to Navigate</div>
            <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 font-light">
              <li>• Click and drag anywhere to orbit 360°</li>
              <li>• Click the circular gold pins to inspect stage, chandelier, and HVAC specs</li>
              <li>• Toggle between Gala Night, Sunset, and Day lighting modes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
