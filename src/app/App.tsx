import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useTheme } from "./useTheme";
import {
  Github,
  Gitlab,
  Mail,
  Linkedin,
  ArrowUpRight,
  ChevronDown,
  Download,
  MapPin,
  ExternalLink,
  Code2,
  Layers,
  Database,
  Shield,
  Smartphone,
  GitBranch,
  Check,
  ArrowRight,
  Star,
  Server,
  Phone,
  Sun,
  Moon,
  Copy,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Cpu,
  CheckCircle2,
  HardDrive,
  Package,
} from "lucide-react";

// ─── Theme accent ─────────────────────────────────────────────────────────────
const A = "var(--accent)"; // primary accent — violet, warmer in light mode
const A2 = "var(--accent-2)"; // secondary accent
const BG = "var(--canvas)";

// ─── Tints ───────────────────────────────────────────────────────────────────
// A colour at 8% alpha reads as a soft chip over a near-black canvas and as
// nothing at all over a near-white one. These mix each accent against a
// theme-driven percentage (see the --tint-* tokens in theme.css) so every
// chip, hairline and label keeps the same visual weight in both themes.
const mix = (c: string, pct: string, into = "transparent") =>
  `color-mix(in srgb, ${c} var(${pct}), ${into})`;

const tintBg = (c: string) => mix(c, "--tint-bg");
const tintLine = (c: string) => mix(c, "--tint-line");
const tintLineSoft = (c: string) => mix(c, "--tint-line-soft");
const tintFill = (c: string) => mix(c, "--tint-fill");
const tintText = (c: string) => mix(c, "--tint-text", "var(--tint-text-into)");
const tintTextSoft = (c: string) =>
  mix(c, "--tint-text-soft", "var(--tint-text-into)");

// ─── Constants ────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Bhone Myat Hein",
  role: "Flutter Specialist",
  tagline:
    "I build production-grade Flutter apps — scalable clean architecture, predictable state management, and secure, real-time backends that ship.",
  location: "Yangon, Myanmar",
  email: "556bhonemyathein@gmail.com",
  viber: "+959775386728",
  github: "https://github.com/556bhonemyathein",
  gitlab: "https://gitlab.com/556bhonemyathein",
  linkedin:
    "https://www.linkedin.com/in/556bhonemyathein/",
  photo: "/profile.jpg?v=2",
  available: true,
};

const ABOUT_POINTS = [
  "Started Flutter in 2024 — building and shipping consistently since.",
  "Published Pocket Pilot on APKPure (v1.0.0, Partner Developer) with offline-first architecture.",
  "Knows all major state management patterns; picks the right one for each project.",
  "Uses AI tools (Copilot, Claude, Gemini, Codex) to move faster — reviews and understands every line before it ships.",
  "Experience across REST APIs, Firebase, full auth flows, image upload, and responsive UI.",
  "Worked alongside backend teams on PHP, Firebase, and Odoo — integrating their APIs into Flutter.",
  "Engineered 600-level multi-game engine (Quick Puz) with solvable parity algorithms & 38 passing automated widget tests.",
  "Built real-world IoT telemetry solutions connecting ESP32 hardware, MQTT protocols, MJPEG video streaming, and hardware printing.",
];

const AI_TOOLS = [
  "Copilot",
  "Claude",
  "Gemini",
  "Codex",
];

const SKILLS: {
  icon: React.ReactNode;
  title: string;
  color: string;
  items: { name: string; note?: string }[];
}[] = [
    {
      icon: <Layers size={15} />,
      title: "State Management",
      color: A,
      items: [
        { name: "setState", note: "Local state" },
        { name: "Provider", note: "DI + ChangeNotifier" },
        { name: "Riverpod", note: "Compile-safe" },
        { name: "BLoC / Cubit", note: "Event-driven" },
        { name: "GetX", note: "Lightweight reactive" },
      ],
    },
    {
      icon: <HardDrive size={15} />,
      title: "Local DB & Offline-First",
      color: "#10B981",
      items: [
        { name: "Isar Database", note: "High-perf NoSQL" },
        { name: "Hive", note: "Fast key-value cache" },
        { name: "SQLite / Sqflite", note: "Relational storage" },
        { name: "SharedPreferences", note: "Key-value prefs" },
        { name: "Offline-first sync", note: "Reconciliation" },
        { name: "Secure Storage", note: "Encrypted keystore" },
      ],
    },
    {
      icon: <Database size={15} />,
      title: "Networking & APIs",
      color: "#06B6D4",
      items: [
        { name: "HTTP package" },
        { name: "Dio", note: "Interceptors & retry" },
        { name: "Retrofit", note: "Type-safe client" },
        { name: "REST API integration" },
        { name: "JWT Access & Refresh", note: "Token rotation" },
        { name: "Image & file upload", note: "Multipart" },
        { name: "Postman / Scalar", note: "Contract testing" },
      ],
    },
    {
      icon: <Cpu size={15} />,
      title: "IoT & Hardware Integration",
      color: "#F97316",
      items: [
        { name: "MQTT Protocol", note: "Adafruit IO broker" },
        { name: "ESP32 telemetry", note: "Sensor monitoring" },
        { name: "MJPEG live video", note: "ESP32-CAM stream" },
        { name: "Blynk Cloud API", note: "Pump & actuator" },
        { name: "Hardware Printing", note: "Thermal / Laser PDF" },
        { name: "Barcode / QR Scanner", note: "mobile_scanner" },
      ],
    },
    {
      icon: <Code2 size={15} />,
      title: "Firebase & Cloud",
      color: "#F59E0B",
      items: [
        { name: "Firestore real-time", note: "Live data sync" },
        { name: "Firebase Auth", note: "Google, Phone, Email" },
        { name: "Cloud Storage", note: "Media & files" },
        { name: "Firebase Hosting", note: "PWA live hosting" },
        { name: "Admin panel", note: "Role-based CMS" },
        { name: "User view", note: "Live explorer" },
      ],
    },
    {
      icon: <CheckCircle2 size={15} />,
      title: "Testing & Code Quality",
      color: "#8B5CF6",
      items: [
        { name: "Widget Testing", note: "flutter_test" },
        { name: "Unit Testing", note: "Dart logic & math" },
        { name: "38 Automated Tests", note: "Quick Puz suite" },
        { name: "Flutter Lints", note: "Static code analysis" },
        { name: "Talker logger", note: "Diagnostics & errors" },
        { name: "Mocking & State test", note: "Deterministic flow" },
      ],
    },
    {
      icon: <GitBranch size={15} />,
      title: "Architecture & Patterns",
      color: "#EC4899",
      items: [
        { name: "Clean Architecture", note: "Layer separation" },
        { name: "Feature-first & Layer-first" },
        { name: "Polymorphic Game Engine" },
        { name: "Inversion Parity math", note: "Solvable shuffle" },
        { name: "Dependency Injection", note: "Inversion of control" },
        { name: "Repository & Service Pattern" },
      ],
    },
    {
      icon: <Package size={15} />,
      title: "Store Ops & Distribution",
      color: "#3B82F6",
      items: [
        { name: "APKPure Partner Release", note: "v1.0.0 live" },
        { name: "Keystore release signing", note: "Production AAB" },
        { name: "ProGuard / R8", note: "Code minification" },
        { name: "Android 12+ Splash API", note: "Zero blank frame" },
        { name: "Cross-Platform Adaptive Icons" },
        { name: "Web PWA Deployment", note: "Firebase Hosting" },
      ],
    },
    {
      icon: <Smartphone size={15} />,
      title: "Flutter & Modern Dart",
      color: A2,
      items: [
        { name: "Flutter (primary)", note: "Cross-platform" },
        { name: "Dart 3 records & patterns" },
        { name: "Async / Futures & Streams" },
        { name: "Custom animations", note: "Spring & physics" },
        { name: "Responsive UI", note: "Mobile & Web" },
        { name: "Material 3 & Cupertino", note: "Bilingual UI" },
        { name: "Build flavours", note: "dev / prod configs" },
      ],
    },
  ];

const EXPERIENCE = [
  {
    company: "San Dev",
    role: "Flutter Developer Intern",
    period: "2025",
    type: "Internship",
    accent: "#3B82F6",
    description:
      "Collaborated on production-style mobile development workflows — translating Figma designs into responsive Flutter interfaces, integrating RESTful APIs, managing reactive state, and adhering to team code review standards.",
    highlights: [
      {
        app: "Clean UI & Figma Implementation",
        detail:
          "Implemented modular, pixel-perfect Flutter UI components from Figma design specs, utilizing responsive layouts and custom theme configurations.",
        tags: ["Flutter", "Dart", "Figma", "Responsive Design"],
      },
      {
        app: "API & State Management",
        detail:
          "Connected client screens with backend REST services using Dio, handled asynchronous data streams, and managed application state cleanly.",
        tags: ["REST API", "Dio", "State Management", "Git"],
      },
    ],
  },
  {
    company: "Self Learning",
    role: "Independent Study",
    period: "2024 – Present",
    type: "Ongoing",
    accent: "#10B981",
    description: "Continuously exploring the Flutter ecosystem — architecture patterns, state management, and shipping production-grade mobile apps.",
    highlights: [
      {
        app: "Store Distribution & Publishing",
        detail: "Shipped Pocket Pilot (v1.0.0) to APKPure as an official Partner Developer — configured release bundling, ProGuard/R8, APK signing, and Android 7.0+ compatibility.",
        tags: ["APKPure", "Release Signing", "Android 7.0+", "Distribution"],
      },
      {
        app: "Architecture & Patterns",
        detail: "Deep-diving Clean Architecture, feature-first structure, and various state management approaches (BLoC, Riverpod, GetX).",
        tags: ["Clean Architecture", "BLoC", "Riverpod", "GetX"],
      },
      {
        app: "Backend & Auth",
        detail: "Auth against Firebase, Odoo and PHP backends — username/password, Google Sign-In, phone OTP, activation key, and JWT access tokens with refresh and revoke.",
        tags: ["Firebase", "Odoo", "PHP", "JWT", "OTP"],
      },
      {
        app: "Backend Team Collaboration",
        detail: "Worked with backend developers on PHP, Firebase, and Odoo services — aligning request/response contracts, integrating endpoints into Flutter, and debugging issues across both sides.",
        tags: ["PHP", "Firebase", "Odoo", "REST API"],
      },
      {
        app: "IoT, Telemetry & Hardware",
        detail: "Bridged Flutter with ESP32 microcontrollers over MQTT (Adafruit IO) and Blynk Cloud APIs — handled live MJPEG camera streams, sensor telemetry, and hardware PDF ticket printing.",
        tags: ["ESP32", "MQTT", "MJPEG", "Hardware Printing"],
      },
      {
        app: "Game Engines & Automated Testing",
        detail: "Designed a 6-puzzle logic game suite with 600 levels, mathematical solvable inversion parity shuffle, fluid staggered animations, and 38 passing automated widget tests.",
        tags: ["Widget Testing", "Algorithms", "Animations", "GitLab"],
      },
    ],
  },
];

type Project = {
  featured: boolean;
  tag: string;
  accent: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  year: string;
  status: string;
  repo?: string;
  apkPure?: string;
  live?: string;
  /** App icon under /public/projects/<slug>/ — falls back to an accent tile. */
  icon?: string;
  /** Screenshots under /public/projects/<slug>/ shown in the details gallery. */
  images?: string[];
};

const PROJECTS: Project[] = [
  {
    featured: true,
    tag: "Flutter · IoT & AI",
    accent: "#10B981",
    title: "Plant Monitoring — Rice Paddy Monitor",
    description:
      "Intelligent rice-paddy monitoring assistant turning an ESP32 + ESP32-CAM field station into an automated crop health system. Real-time telemetry (temperature, humidity, soil moisture), live MJPEG camera stream, and Gemini AI diagnosis (disease, spray advice, care plan) with bilingual English / မြန်မာ support and Blynk pump automation.",
    highlights: [
      "ESP32 + ESP32-CAM live stream (MJPEG)",
      "Gemini AI plant & disease diagnosis",
      "Threshold-first agronomy rules engine",
      "Bilingual Cupertino iOS UI (English / မြန်မာ)",
      "Blynk Cloud HTTP API pump control",
      "Offline-first sensor grading fallback",
    ],
    tech: [
      "Flutter",
      "ESP32 / IoT",
      "Gemini AI",
      "Blynk API",
      "MJPEG Stream",
      "Cupertino",
      "Firebase",
    ],
    year: "2026",
    status: "Completed",
    repo: "https://github.com/556bhonemyathein/plant_monitoring",
    icon: "/projects/plant_monitoring/icon.png",
    images: [
      "/projects/plant_monitoring/hardware-prototype-1.png",
      "/projects/plant_monitoring/hardware-prototype-2.png",
    ],
  },
  {
    featured: true,
    tag: "Flutter · Offline-First · Store Release",
    accent: "#3B82F6",
    title: "PocketPilot — Finance Tracker",
    description:
      "Production offline-first personal finance tracker published on APKPure. Every write lands in Isar first and reconciles with the server later, so accounts, transactions, categories and reports all work seamlessly with no backend at all. Features feature-first Clean Architecture, Riverpod 3 compile-safe state, sealed error handling, and dual dev/prod flavours.",
    highlights: [
      "Published on APKPure (v1.0.0 · Partner Developer)",
      "Universal Android 7.0+ release (65.9 MB APK)",
      "Isar offline-first local database + sync",
      "Riverpod 3 compile-safe state + GoRouter",
      "fl_chart analytics + PDF report export",
      "Dio auth/retry interceptors & sealed failures",
      "Multi-language (easy_localization)",
    ],
    tech: [
      "Flutter",
      "Riverpod",
      "Isar",
      "Dio",
      "Freezed",
      "GoRouter",
      "APKPure",
    ],
    year: "2026",
    status: "Published on APKPure",
    apkPure: "https://apkpure.com/p/app.pocketpilot",
    repo: "https://github.com/556bhonemyathein/pocket_pilot",
    icon: "/projects/pocket_pilot/icon.png",
    images: [
      "/projects/pocket_pilot/apkpure-app-card.png",
      "/projects/pocket_pilot/apkpure-store.png",
    ],
  },
  {
    featured: true,
    tag: "Flutter · Offline-First",
    accent: "#8B5CF6",
    title: "Offline Inventory Logger",
    description:
      "Offline-first mobile inventory management system that stores and manages stock locally in SQLite while fetching suppliers from a remote REST API. Features full CRUD with swipe actions, strict form validation, robust network error handling, and a clean layered architecture powered by Riverpod.",
    highlights: [
      "SQLite offline-first local storage",
      "REST supplier sync with Dio",
      "Full CRUD with Slidable swipe actions",
      "Layered Clean Architecture (UI → Provider → Repo → Service)",
      "Form validation & network error handling",
    ],
    tech: [
      "Flutter",
      "Riverpod",
      "Sqflite",
      "Dio",
      "Slidable",
      "Clean Architecture",
    ],
    year: "2026",
    status: "Completed",
    repo: "https://github.com/556bhonemyathein/offline_inventory_logger",
    icon: "/projects/offline_inventory_logger/icon.png",
    images: [
      "/projects/offline_inventory_logger/screenshot-1.png",
      "/projects/offline_inventory_logger/screenshot-2.png",
      "/projects/offline_inventory_logger/screenshot-3.png",
      "/projects/offline_inventory_logger/screenshot-4.png",
      "/projects/offline_inventory_logger/screenshot-5.png",
    ],
  },
  {
    featured: true,
    tag: "Flutter · Full-Stack",
    accent: "#2563EB",
    title: "Airline Ticket System",
    description:
      "Full-stack airline flight booking and ticketing platform developed as the B.C.Sc graduation thesis project for University of Computer Studies (Meiktila). Features flight search across domestic routes, interactive seat selection, trip review, multi-wallet payment (KPay, WavePay, AYA Pay, CB Pay), PDF e-ticket generation with physical printing, and a comprehensive Laravel web administration portal for airline and flight scheduling.",
    highlights: [
      "Flutter client + Laravel REST backend",
      "Interactive real-time seat selection grid",
      "Multi-wallet payments (KPay, WavePay, AYA)",
      "PDF ticket generation & physical printing",
      "Laravel Admin Dashboard & route management",
      "Final Year University B.C.Sc Thesis project",
    ],
    tech: [
      "Flutter",
      "Laravel",
      "PHP / MySQL",
      "REST API",
      "PDF / Printing",
      "Payment Integration",
    ],
    year: "2025",
    status: "Graduation project",
    repo: "https://github.com/556bhonemyathein/ticket_system_full_version",
    icon: "/projects/ticket_system/icon.svg",
    images: [
      "/projects/ticket_system/screenshot-1.png",
      "/projects/ticket_system/screenshot-2.png",
      "/projects/ticket_system/screenshot-3.png",
      "/projects/ticket_system/screenshot-4.png",
      "/projects/ticket_system/screenshot-5.png",
      "/projects/ticket_system/screenshot-6.png",
      "/projects/ticket_system/screenshot-7.png",
      "/projects/ticket_system/screenshot-8.png",
    ],
  },
  {
    featured: true,
    tag: "Flutter · Firebase · Web & Mobile",
    accent: "#7C3AED",
    title: "Guitar Chords — Library & Admin",
    description:
      "Cross-platform guitar chord library and lyrics viewer with real-time Firebase backend. Features role-based access control (Admin CMS for publishing songs, artists, chord sheets & lyrics vs. User explorer), Google Sign-In & Firebase Auth, offline favorites via SharedPreferences, Android 12+ Splash Screen API, animated in-app splash, adaptive launcher icons, and live PWA deployment on Firebase Hosting.",
    highlights: [
      "Role-based auth (Admin CMS vs User)",
      "Real-time Firestore song & artist catalog",
      "Android 12+ Splash API & in-app splash",
      "Adaptive launcher icons (cross-platform)",
      "Offline favorites & dark / light theming",
      "Live web PWA on Firebase Hosting",
    ],
    tech: [
      "Flutter",
      "Firebase Auth",
      "Firestore",
      "Provider",
      "Web / PWA",
      "Firebase Hosting",
    ],
    year: "2026",
    status: "Live Web & Mobile",
    repo: "https://github.com/556bhonemyathein/guitercord",
    live: "https://cord-library.web.app",
    icon: "/projects/guitercord/icon.png",
    images: [
      "/projects/guitercord/splash-preview.png",
      "/projects/guitercord/splash-dark-preview.png",
    ],
  },
  {
    featured: true,
    tag: "Flutter · Game Engine · Logic Puzzles",
    accent: "#4F46E5",
    title: "Quick Puz — 6-in-1 Puzzle Games",
    description:
      "Cross-platform puzzle game suite built in Flutter and Dart featuring 6 distinct puzzle engines and 100 levels each (600 levels total). Features Sliding Tiles (solvable parity shuffle algorithm), Lights Out, Memory Match, Flood It, Picross / Nonogram, and Pipe Rotate. Engineered with polymorphic puzzle architecture, move counters, par targets, star ratings, fluid staggered entrance animations, and pixel-matched native-to-Flutter splash handover.",
    highlights: [
      "6 puzzle game engines (600 levels total, 100 per game)",
      "Sliding tiles solvable inversion parity shuffle algorithm",
      "Polymorphic game state architecture (moves, par, stars)",
      "Fluid staggered entrance & spring physics animations",
      "Seamless native splash handover (zero blank frame)",
      "Adaptive cross-platform app icons (Android, iOS, Web, Desktop)",
    ],
    tech: [
      "Flutter",
      "Dart",
      "Material 3",
      "Custom Animations",
      "OOP Game Engine",
      "Cross-Platform",
    ],
    year: "2026",
    status: "Completed",
    repo: "https://gitlab.com/556bhonemyathein/quick_puz",
    icon: "/projects/quick_puz/icon.png",
    images: [
      "/projects/quick_puz/screenshot-1.png",
      "/projects/quick_puz/screenshot-2.png",
      "/projects/quick_puz/screenshot-3.png",
      "/projects/quick_puz/screenshot-4.png",
      "/projects/quick_puz/screenshot-5.png",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.C.Sc — Bachelor of Computer Science",
    school: "University of Computer Studies (Loikaw)",
    period: "2017 – 2020",
  },
  {
    degree: "B.C.Sc — Bachelor of Computer Science",
    school: "University of Computer Studies (Meiktila)",
    period: "2022 – 2025",
    graduated: "Jan 2026",
    gpa: "2.63 / 4.0",
  },
];

const TRAINING = [
  {
    title: "Flutter Basic Course",
    org: "San Dev Training Center",
    period: "2024 – 2025",
    type: "Certificate",
  },
  {
    title: "Flutter Internship",
    org: "San Dev",
    period: "2025",
    type: "Internship",
  },
  {
    title: "Mobile Studio 1",
    org: "Mobile Studio",
    period: "2025",
    type: "Program",
  },
];

const LANGUAGES = [
  {
    lang: "Burmese",
    level: "Native / Mother Tongue",
    pct: 100,
  },
  {
    lang: "English",
    level: "B2 — Upper Intermediate",
    pct: 60,
  },
  {
    lang: "Chinese",
    level: "GESC Level 2 (In Progress)",
    pct: 35,
  },
  {
    lang: "Japanese",
    level: "JLPT N5 — Beginner",
    pct: 20,
  },
];

const CODE_LINES = [
  { t: "comment", s: "// BLoC: event → state pattern" },
  {
    t: "kw",
    s: "class AuthBloc extends Bloc<AuthEvent, AuthState> {",
  },
  {
    t: "normal",
    s: "  AuthBloc(this._repo) : super(AuthInitial()) {",
  },
  {
    t: "normal",
    s: "    on<LoginRequested>(_onLoginRequested);",
  },
  { t: "normal", s: "  }" },
  { t: "blank", s: "" },
  { t: "kw", s: "  Future<void> _onLoginRequested(" },
  { t: "normal", s: "    LoginRequested event," },
  { t: "normal", s: "    Emitter<AuthState> emit) async {" },
  { t: "normal", s: "    emit(AuthLoading());" },
  {
    t: "normal",
    s: "    final result = await _repo.login(...);",
  },
  { t: "normal", s: "    result.fold(" },
  {
    t: "err",
    s: "      (err) => emit(AuthFailure(err.message)),",
  },
  { t: "ok", s: "      (user) => emit(AuthSuccess(user))," },
  { t: "normal", s: "    );" },
  { t: "normal", s: "  }" },
  { t: "kw", s: "}" },
];

const LINE_COLOR: Record<string, string> = {
  comment: "var(--ink-faint)",
  kw: "var(--code-kw)",
  normal: "var(--ink-mute)",
  blank: "transparent",
  err: "var(--code-err)",
  ok: "var(--code-ok)",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function GitLabIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.49a.42.42 0 0 1 .11-.18.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
    </svg>
  );
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useCount(
  target: number,
  trigger: boolean,
  duration = 1200,
) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

/** Height of the fixed header — sections must clear it. */
const NAV_H = 60;

/*
 * scrollIntoView() scrolls the nearest *scroll container*, and any ancestor
 * with a non-visible overflow on either axis counts as one. Driving the
 * viewport directly keeps this working no matter what the tree above does.
 */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_H;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

// ─── Animation presets ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Atoms ────────────────────────────────────────────────────────────────────

function Pill({
  color = A,
  children,
  className = "",
}: {
  color?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono px-2 py-[3px] rounded-full border ${className}`}
      style={{
        borderColor: tintLine(color),
        color: tintText(color),
        background: tintBg(color),
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <FadeUp className="mb-12">
      <p
        className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3"
        style={{ color: "var(--accent-soft)" }}
      >
        {index}
      </p>
      <h2
        className="font-bold leading-tight mb-3 text-ink"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-sm text-ink-dim max-w-xl leading-relaxed">
          {sub}
        </p>
      )}
    </FadeUp>
  );
}

function HR() {
  return <div className="border-t border-hair" />;
}

// ─── Theme toggle ────────────────────────────────────────────────────────────

function ThemeToggle({
  theme,
  onToggle,
  className = "",
}: {
  theme: "light" | "dark";
  onToggle: (origin: { x: number; y: number }) => void;
  className?: string;
}) {
  const dark = theme === "dark";
  const spring = { type: "spring" as const, stiffness: 520, damping: 34 };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onToggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className={`relative h-[26px] w-[48px] shrink-0 rounded-full border border-hair bg-elevate p-[3px] transition-colors duration-200 hover:border-hair-2 active:scale-95 ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* track icons — the one behind the knob fades out */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-[7px]">
        <Sun
          size={11}
          className="transition-opacity duration-300"
          style={{ color: "var(--ink-dim)", opacity: dark ? 1 : 0 }}
        />
        <Moon
          size={11}
          className="transition-opacity duration-300"
          style={{ color: "var(--ink-dim)", opacity: dark ? 0 : 1 }}
        />
      </span>

      {/* knob */}
      <motion.span
        layout
        transition={spring}
        className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full"
        style={{
          marginLeft: dark ? 22 : 0,
          background: dark ? "var(--surface-3)" : A,
          boxShadow: dark
            ? "0 1px 6px rgba(0,0,0,0.45)"
            : `0 2px 10px ${mix(A, "--tint-fill")}`,
        }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {dark ? (
            <Moon size={11} style={{ color: A2 }} />
          ) : (
            <Sun size={11} style={{ color: "#fff" }} />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}

// ─── Local time ──────────────────────────────────────────────────────────────

const TZ = "Asia/Yangon";

// h23 rather than hour12:false — some engines render midnight as "24:00:00".
const clockFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** "UTC+6:30", read off the zone itself so it can never drift out of date. */
function offsetLabel(d: Date) {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    timeZoneName: "shortOffset",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName");
  return part ? part.value.replace("GMT", "UTC") : "UTC+6:30";
}

/** Wall-clock time in Yangon, whatever timezone the visitor is reading from. */
function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Line the first tick up with the wall clock, then run on the second.
    let interval = 0;
    const align = window.setTimeout(
      () => {
        setNow(new Date());
        interval = window.setInterval(() => setNow(new Date()), 1000);
      },
      1000 - (Date.now() % 1000),
    );
    return () => {
      window.clearTimeout(align);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-1 h-1 rounded-full animate-pulse"
        style={{ background: A }}
        aria-hidden
      />
      <time
        dateTime={now.toISOString()}
        className="tabular-nums text-ink-dim"
        title={`Current local time in ${PROFILE.location}`}
      >
        {clockFmt.format(now)}
      </time>
      <span>{offsetLabel(now)}</span>
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

// ─── Scroll chrome ────────────────────────────────────────────────────────────

/**
 * Reading progress across the whole document. `scaleX` on a
 * transform-origin-left bar stays on the compositor, so this never costs a
 * layout pass on scroll the way animating `width` would.
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 inset-x-0 h-[2px] origin-left z-[60]"
      style={{
        scaleX: x,
        background: `linear-gradient(90deg, ${A}, ${A2})`,
      }}
    />
  );
}

/**
 * Which section owns the viewport right now. rootMargin pins the trigger line
 * just under the fixed header, so a section counts as active from the moment
 * its heading clears the nav rather than when it happens to be centred.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          seen.set(e.target.id, e.intersectionRatio);
        }
        let best = "";
        let ratio = 0;
        for (const [id, r] of seen) {
          if (r > ratio) {
            ratio = r;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: `-${NAV_H + 8}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids.join(",")]);

  return active;
}

/** Jump back to the top once the hero is well out of sight. */
function BackToTop() {
  const y = useScrollY();
  const reduce = useReducedMotion();
  const show = y > 700;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduce ? "auto" : "smooth",
            })
          }
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{
            background: "var(--nav-bg)",
            border: `1px solid ${tintLine(A)}`,
            color: tintText(A),
          }}
        >
          <ChevronDown size={15} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  const y = useScrollY();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const past = y > 80;

  // Collapse the sheet first, then scroll on the next frame so the height
  // animation and the smooth scroll never contend for the same tick.
  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollTo(id));
  };

  const links = [
    "About",
    "Experience",
    "Skills",
    "Projects",
    "Credentials",
    "Contact",
  ];

  const active = useActiveSection(links.map((l) => l.toLowerCase()));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: past ? "var(--nav-bg)" : "transparent",
        backdropFilter: past ? "blur(20px)" : "none",
        borderBottom: past
          ? "1px solid var(--nav-line)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-[60px] flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
            style={{
              background: tintBg(A),
              border: `1px solid ${tintLine(A)}`,
            }}
          >
            <Smartphone size={13} style={{ color: A }} />
          </div>
          <span className="font-mono text-xs text-ink-dim group-hover:text-ink-soft transition-colors">
            {PROFILE.name.split(" ")[0].toLowerCase()}
            <span style={{ color: A }}>.</span>dev
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const on = active === l.toLowerCase();
            return (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                aria-current={on ? "true" : undefined}
                className="relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-colors duration-150"
                style={{
                  color: on ? tintText(A) : "var(--ink-dim)",
                }}
              >
                {/* one shared element slides between tabs instead of six
                    independent fades */}
                {on && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{
                      background: tintBg(A),
                      border: `1px solid ${tintLine(A)}`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
                {l}
              </button>
            );
          })}
          <div className="w-px h-4 bg-hair mx-2" />
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-ink-dim hover:text-ink-mute rounded-lg hover:bg-elevate transition-all"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href={PROFILE.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-ink-dim hover:text-[#FC6D26] rounded-lg hover:bg-elevate transition-all"
            aria-label="GitLab"
          >
            <GitLabIcon size={14} />
          </a>
          <ThemeToggle theme={theme} onToggle={toggle} className="ml-2" />
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{ background: A }}
        >
          Hire me <ArrowUpRight size={11} />
        </button>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type="button"
            className="text-ink-dim hover:text-ink-soft p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="space-y-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-px w-5 bg-current transition-all duration-200
                  ${i === 0 && open ? "rotate-45 translate-y-[6px]" : ""}
                  ${i === 1 && open ? "opacity-0 scale-x-0" : ""}
                  ${i === 2 && open ? "-rotate-45 -translate-y-[6px]" : ""}`}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden"
        style={{
          background: "var(--nav-solid)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="px-5 pt-2 pb-5 border-t border-hair flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => go(l.toLowerCase())}
              className="text-left py-2.5 px-3 text-xs font-mono text-ink-dim hover:text-ink-soft rounded-lg hover:bg-elevate transition-all"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("contact")}
            className="mt-2 py-2.5 px-3 text-xs font-semibold text-white rounded-lg"
            style={{ background: A, WebkitTapHighlightColor: "transparent" }}
          >
            Hire me
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function AnimatedCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="inline-block w-[2px] h-[0.85em] align-middle ml-0.5 translate-y-[-1px] transition-opacity duration-75"
      style={{ background: A, opacity: on ? 1 : 0 }}
    />
  );
}

function StatCounter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useCount(target, inView);
  return (
    <div
      ref={ref}
      className="text-center bg-elevate rounded-xl py-3 border border-hair"
    >
      <p
        className="font-bold text-ink-strong"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "1.5rem",
          lineHeight: 1,
        }}
      >
        {val}
        {suffix}
      </p>
      <p className="text-[9px] font-mono text-ink-dim mt-1">
        {label}
      </p>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-[60px] overflow-hidden"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 20% 40%, var(--hero-glow-1) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 60%, var(--hero-glow-2) 0%, transparent 60%)",
        }}
      />

      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: "var(--grid-opacity)",
          backgroundImage:
            "radial-gradient(circle, var(--dot) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-10 w-full py-16 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.1)}
            >
              {/* badge */}
              <motion.div variants={fadeUp} className="mb-7">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: tintLine("#10B981"),
                    background: tintBg("#10B981"),
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-mono text-[11px] text-[#10B981]/80">
                    Available for work
                  </span>
                </div>
              </motion.div>

              {/* name */}
              <motion.h1
                variants={fadeUp}
                className="leading-[0.86] tracking-tight mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(3.8rem, 10vw, 7.5rem)",
                  fontWeight: 800,
                }}
              >
                <span className="block text-ink-strong">
                  {PROFILE.name
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
                    .toUpperCase()}
                </span>
                <span
                  className="block"
                  style={{ color: "var(--accent-dim)" }}
                >
                  {PROFILE.name
                    .split(" ")
                    .slice(2)
                    .join(" ")
                    .toUpperCase()}
                </span>
              </motion.h1>

              {/* role */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 mb-5"
              >
                <div
                  className="w-5 h-px"
                  style={{ background: A }}
                />
                <p
                  className="font-mono text-sm"
                  style={{ color: A }}
                >
                  {PROFILE.role}
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-sm text-ink-mute leading-relaxed mb-6 max-w-md"
              >
                {PROFILE.tagline}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-1.5 mb-8 font-mono text-[11px] text-ink-dim"
              >
                <MapPin size={11} /> {PROFILE.location}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 mb-10"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: A }}
                >
                  View projects <ArrowUpRight size={14} />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/556_resume.pdf"
                  download="556_resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-ink-mute text-sm hover:text-ink-soft transition-all"
                  style={{
                    borderColor: "var(--hair-2)",
                  }}
                >
                  <Download size={14} /> Resume
                </motion.a>
              </motion.div>

              {/* social */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-5"
              >
                {[
                  {
                    href: PROFILE.github,
                    icon: <Github size={14} />,
                    label: "GitHub",
                  },
                  {
                    href: PROFILE.gitlab,
                    icon: <GitLabIcon size={14} />,
                    label: "GitLab",
                  },
                  {
                    href: PROFILE.linkedin,
                    icon: <Linkedin size={14} />,
                    label: "LinkedIn",
                  },
                  {
                    href: `mailto:${PROFILE.email}`,
                    icon: <Mail size={14} />,
                    label: "Email",
                  },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    whileHover={{ y: -2 }}
                    href={s.href}
                    target={
                      s.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-ink-dim hover:text-ink-mute transition-colors"
                  >
                    {s.icon} {s.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — profile card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <ProfileCard />
          </div>
        </div>

        {/* scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => scrollTo("about")}
          className="mt-14 flex items-center gap-2 text-xs text-ink-faint hover:text-ink-mute transition-colors font-mono group"
        >
          <ChevronDown
            size={13}
            className="group-hover:translate-y-0.5 transition-transform"
          />
          scroll to explore
        </motion.button>
      </div>
    </section>
  );
}

function ProfileCard() {
  const [tick, setTick] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setTick((b) => !b), 540);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full max-w-[310px]"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="rounded-2xl border overflow-hidden shadow-2xl"
          style={{
            borderColor: tintLine(A),
            background: "var(--surface)",
          }}
        >
          {/* photo */}
          <div className="relative w-full aspect-[4/5] bg-surface-3 overflow-hidden">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="w-full h-full object-cover object-top transition-all duration-500 hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--surface) 0%, transparent 50%)",
              }}
            />
            {/* online dot */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{
                background: "var(--scrim)",
                border: "1px solid var(--hair)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#10B981",
                  opacity: tick ? 1 : 0.3,
                  transition: "opacity 0.15s",
                }}
              />
              <span className="text-[10px] font-mono text-ink-mute">
                online
              </span>
            </div>
          </div>

          {/* info */}
          <div className="px-5 pb-5 -mt-1">
            <h3
              className="text-ink-strong font-bold mb-0.5"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.3rem",
              }}
            >
              {PROFILE.name}
            </h3>
            <p
              className="text-xs font-mono mb-4"
              style={{ color: "var(--accent-soft)" }}
            >
              {PROFILE.role}
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <StatCounter
                target={2024}
                suffix=""
                label="started"
              />
              <StatCounter
                target={5}
                suffix=""
                label="state tools"
              />
              <StatCounter
                target={10}
                suffix="+"
                label="projects"
              />
            </div>

            {/* pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                "Architecture",
                "State Management",
                "Offline-First",
                "IoT & APIs",
                "Testing",
                "Git",
              ].map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="01 — About"
          title="Who I am"
          sub="A Flutter specialist building real, functional apps — not just UI samples."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-3">
            {ABOUT_POINTS.map((pt, i) => (
              <SlideIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-hair bg-elevate hover:border-hair-2 hover:bg-elevate transition-all duration-200">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: tintBg(A),
                      border: `1px solid ${tintLine(A)}`,
                    }}
                  >
                    <Check size={11} style={{ color: A }} />
                  </div>
                  <p className="text-sm text-ink-mute leading-relaxed">
                    {pt}
                  </p>
                </div>
              </SlideIn>
            ))}

            <FadeUp delay={0.35}>
              <div
                className="p-4 rounded-xl border bg-surface"
                style={{ borderColor: tintLine(A) }}
              >
                <p
                  className="text-[10px] font-mono tracking-widest uppercase mb-3"
                  style={{ color: "var(--accent-dim)" }}
                >
                  AI-assisted development
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {AI_TOOLS.map((t) => (
                    <Pill key={t} color={A2}>
                      {t}
                    </Pill>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.42}>
              <motion.a
                whileHover={{ x: 3 }}
                href={`viber://chat?number=${encodeURIComponent(PROFILE.viber)}`}
                className="flex items-center gap-4 p-4 rounded-xl border bg-surface hover:border-[#7360F2]/40 transition-colors group"
                style={{ borderColor: tintLine("#7360F2") }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: tintBg("#7360F2"),
                    border: `1px solid ${tintLine("#7360F2")}`,
                  }}
                >
                  <Phone size={14} style={{ color: "#7360F2" }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-ink-faint">
                    Viber
                  </p>
                  <p className="text-xs text-ink-mute group-hover:text-ink-mute transition-colors">
                    +95 9 775 386 728
                  </p>
                </div>
                <ArrowUpRight
                  size={13}
                  className="ml-auto text-ink-faint group-hover:text-ink-dim transition-colors"
                />
              </motion.a>
            </FadeUp>
          </div>

          <FadeUp className="lg:col-span-2" delay={0.15}>
            <div className="rounded-xl border border-hair bg-surface-2 overflow-hidden h-full">
              {/* editor bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-hair"
                style={{ background: "var(--surface)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[11px] font-mono text-ink-faint">
                  auth_bloc.dart
                </span>
                <Pill color={A} className="ml-auto">
                  BLoC
                </Pill>
              </div>
              <div className="p-4 overflow-x-auto">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.04,
                      duration: 0.3,
                    }}
                    className="flex gap-3 leading-[1.6]"
                  >
                    <span className="font-mono text-[10px] text-ink-faint w-4 text-right shrink-0 select-none">
                      {i + 1}
                    </span>
                    <span
                      className="font-mono text-[11px] whitespace-pre"
                      style={{
                        color:
                          LINE_COLOR[line.t] ??
                          LINE_COLOR.normal,
                      }}
                    >
                      {line.s || " "}
                    </span>
                  </motion.div>
                ))}
              </div>
              {/* cursor blink at end */}
              <div className="px-4 pb-4 flex items-center gap-3">
                <span className="font-mono text-[10px] text-ink-faint w-4 text-right">
                  {CODE_LINES.length + 1}
                </span>
                <AnimatedCursor />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="02 — Experience"
          title="Where I've worked"
          sub="Professional experience and ongoing self-directed learning."
        />

        <div className="space-y-5">
          {EXPERIENCE.map((exp, ei) => (
            <FadeUp key={exp.company} delay={ei * 0.1}>
              <div className="rounded-xl border border-hair bg-surface overflow-hidden">
                {/* header bar */}
                <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hair">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: tintBg(exp.accent), border: `1px solid ${tintLine(exp.accent)}` }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={exp.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{exp.company}</p>
                      <p className="text-xs font-mono" style={{ color: tintText(exp.accent) }}>{exp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <span className="text-xs font-mono text-ink-dim">{exp.period}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: tintBg(exp.accent), color: tintTextSoft(exp.accent), border: `1px solid ${tintLine(exp.accent)}` }}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* body */}
                <div className="px-6 py-5">
                  <p className="text-xs text-ink-dim leading-relaxed mb-5">{exp.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.highlights.map((h, hi) => (
                      <SlideIn key={h.app} delay={hi * 0.08}>
                        <div className="rounded-lg border border-hair bg-elevate p-4 hover:border-hair-2 hover:bg-elevate transition-all duration-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.accent }} />
                            <p className="text-xs font-semibold text-ink-soft">{h.app}</p>
                          </div>
                          <p className="text-xs text-ink-dim leading-relaxed mb-3">{h.detail}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {h.tags.map((t) => <Pill key={t} color={exp.accent}>{t}</Pill>)}
                          </div>
                        </div>
                      </SlideIn>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Neon board ─────────────────────────────────────────────────────────────

/** Brand colours — a neon tube reads as the language it names. */
const OTHER_TECH: { name: string; neon: string }[] = [
  { name: "Java", neon: "#F89820" },
  { name: "Kotlin", neon: "#A97BFF" },
  { name: "Swift", neon: "#F05138" },
  { name: "Objective-C", neon: "#438EFF" },
  { name: "C++", neon: "#00A3E0" },
  { name: "HTML5", neon: "#E34F26" },
  { name: "CSS3", neon: "#33A9DC" },
  { name: "JavaScript", neon: "#F7DF1E" },
  { name: "TypeScript", neon: "#3178C6" },
  { name: "PHP / Laravel", neon: "#FF2D20" },
  { name: "Odoo", neon: "#C77DB4" },
  { name: "React", neon: "#61DAFB" },
  { name: "Python", neon: "#4B8BBE" },
  { name: ".NET", neon: "#8B5CF6" },
];

function NeonBoard() {
  return (
    <FadeUp delay={0.35}>
      <div className="mt-4 rounded-xl overflow-hidden neon-board">
        <div className="px-5 pt-5 pb-1 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#4ADE80",
              boxShadow: "0 0 8px #4ADE80",
            }}
          />
          <p className="neon-label text-[10px] font-mono tracking-widest uppercase text-white/45">
            Also worked with
          </p>
        </div>

        {/* Full-bleed marquee: the row spans the whole card edge to edge and
            scrolls continuously. The list is rendered twice; the second copy
            is what the first scrolls into and is hidden from screen readers. */}
        <div className="neon-mask">
          <div className="neon-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex items-center gap-3 pr-3"
                aria-hidden={copy === 1 || undefined}
              >
                {OTHER_TECH.map((t) => (
                  <span
                    key={t.name}
                    className="neon-item shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-mono tracking-wide"
                    style={{ "--neon": t.neon } as React.CSSProperties}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="03 — Skills"
          title="What I know"
          sub="I pick the right tool for each project — not just the familiar one."
        />

        {/* SM strip */}
        <FadeUp delay={0.05}>
          <div
            className="mb-8 p-5 rounded-xl border bg-surface"
            style={{ borderColor: tintLine(A) }}
          >
            <p
              className="text-[10px] font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--accent-dim)" }}
            >
              State management — all of these
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "setState",
                "Provider",
                "Riverpod",
                "BLoC",
                "Cubit",
                "GetX",
              ].map((sm) => (
                <motion.button
                  key={sm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHovered(sm)}
                  onHoverEnd={() => setHovered(null)}
                  className="px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-150"
                  style={{
                    borderColor:
                      hovered === sm
                        ? "var(--accent-dim)"
                        : "var(--hair)",
                    color:
                      hovered === sm
                        ? A
                        : "var(--ink-dim)",
                    background:
                      hovered === sm ? tintBg(A) : "transparent",
                  }}
                >
                  {sm}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group, i) => (
            <FadeUp key={group.title} delay={i * 0.07}>
              <SkillCard group={group} />
            </FadeUp>
          ))}
        </div>

        {/* arch strip */}
        <FadeUp delay={0.3}>
          <div className="mt-4 p-5 rounded-xl bg-surface border border-hair">
            <p className="text-[10px] font-mono tracking-widest uppercase mb-4 text-ink-faint">
              Architecture patterns
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "MVC",
                "MVP",
                "MVVM",
                "Clean Architecture",
                "Feature-first",
                "Layer-first",
              ].map((a) => (
                <motion.div
                  key={a}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hair text-xs text-ink-dim font-mono bg-elevate cursor-default"
                >
                  <Star
                    size={9}
                    style={{ color: "var(--accent-dim)" }}
                    className="shrink-0"
                  />{" "}
                  {a}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        <NeonBoard />
      </div>
    </section>
  );
}

function SkillCard({
  group,
}: {
  group: (typeof SKILLS)[number];
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-xl border border-hair hover:border-hair-2 bg-surface p-5 h-full transition-colors duration-200"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: tintBg(group.color),
            border: `1px solid ${tintLine(group.color)}`,
          }}
        >
          <span style={{ color: tintTextSoft(group.color) }}>
            {group.icon}
          </span>
        </div>
        <p className="text-xs font-semibold text-ink-mute">
          {group.title}
        </p>
      </div>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li
            key={item.name}
            className="flex items-start justify-between gap-2"
          >
            <div className="flex items-center gap-2 text-xs text-ink-dim">
              <span
                className="w-1 h-1 rounded-full shrink-0 mt-[5px]"
                style={{ background: tintFill(group.color) }}
              />
              {item.name}
            </div>
            {item.note && (
              <span className="text-[9px] font-mono text-ink-faint shrink-0 text-right">
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

/*
 * Filter groups rather than raw tech strings: a chip per library would give
 * fifteen chips, several matching a single project. Each group collects the
 * tech names that answer the same question a visitor is actually asking —
 * "has he done offline storage?", "has he touched Firebase?".
 */
const PROJECT_FILTERS: { label: string; tech: string[] }[] = [
  { label: "Published & Live", tech: ["APKPure", "Firebase Hosting", "Web / PWA"] },
  { label: "IoT & AI", tech: ["ESP32 / IoT", "Gemini AI", "Blynk API"] },
  { label: "Games & Logic", tech: ["OOP Game Engine", "Custom Animations"] },
  { label: "Full-Stack", tech: ["Laravel", "PHP / MySQL", "Web / PWA"] },
  { label: "Riverpod", tech: ["Riverpod"] },
  {
    label: "Firebase",
    tech: ["Firebase", "Firestore", "Firebase Auth", "Firebase Hosting"],
  },
  { label: "Offline-first", tech: ["Isar", "Sqflite"] },
  { label: "REST API", tech: ["Dio", "Retrofit", "REST API", "Laravel"] },
  {
    label: "Architecture",
    tech: ["Clean Architecture", "OOP Game Engine", "MVVM", "GetX", "BLoC"],
  },
];

const ALL = "All";

function ProjectsSection() {
  const [active, setActive] = useState(ALL);
  const [open, setOpen] = useState<Project | null>(null);

  // Count once per filter so a chip can show its tally and a group that
  // matches nothing never renders.
  const chips = PROJECT_FILTERS.map((f) => ({
    ...f,
    count: PROJECTS.filter((p) =>
      p.tech.some((t) => f.tech.includes(t)),
    ).length,
  })).filter((f) => f.count > 0);

  const shown =
    active === ALL
      ? PROJECTS
      : PROJECTS.filter((p) =>
        p.tech.some((t) =>
          PROJECT_FILTERS.find(
            (f) => f.label === active,
          )!.tech.includes(t),
        ),
      );

  const featured = shown.filter((p) => p.featured);
  const others = shown.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="04 — Projects"
          title="What I've built"
          sub="Real projects with real functionality — still building."
        />

        {/* filter chips */}
        <FadeUp className="mb-6">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter projects by technology"
          >
            <FilterChip
              label={ALL}
              count={PROJECTS.length}
              active={active === ALL}
              onClick={() => setActive(ALL)}
            />
            {chips.map((f) => (
              <FilterChip
                key={f.label}
                label={f.label}
                count={f.count}
                active={active === f.label}
                onClick={() => setActive(f.label)}
              />
            ))}
          </div>
        </FadeUp>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          <AnimatePresence mode="popLayout">
            {featured.map((p) => (
              <CardShell key={p.title}>
                <ProjectCardLarge project={p} onOpen={() => setOpen(p)} />
              </CardShell>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <AnimatePresence mode="popLayout">
            {others.map((p) => (
              <CardShell key={p.title}>
                <ProjectCardSmall project={p} onOpen={() => setOpen(p)} />
              </CardShell>
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeUp>
          <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-hair">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-ink-faint">
                <Github size={14} />
                <GitLabIcon size={14} />
              </div>
              <p className="text-sm text-ink-dim">
                More repos and experiments on GitHub &amp; GitLab
              </p>
            </div>
            <motion.a
              whileHover={{ x: 3 }}
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono transition-colors"
              style={{ color: "var(--accent-soft)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = A)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--accent-soft)")
              }
            >
              View all <ArrowRight size={11} />
            </motion.a>
          </div>
        </FadeUp>
      </div>

      <AnimatePresence>
        {open && (
          <ProjectDetails project={open} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/** One card's entry/exit wrapper — `layout` keeps the re-flow continuous. */
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-full border transition-colors duration-200"
      style={{
        borderColor: active ? tintLine(A) : "var(--hair)",
        background: active ? tintBg(A) : "transparent",
        color: active ? tintText(A) : "var(--ink-dim)",
      }}
    >
      {label}
      <span
        className="text-[9px]"
        style={{ color: active ? tintText(A) : "var(--ink-faint)" }}
      >
        {count}
      </span>
    </button>
  );
}

type CardProps = { project: Project; onOpen: () => void };

/** Two-letter monogram for projects that ship no icon ("Data Explorer" → DE). */
const monogram = (title: string) =>
  title
    .replace(/[—–-].*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/**
 * A project's app icon. Missing files (or projects without one) render an
 * accent-tinted monogram tile so every card has an image of its own.
 */
function ProjectIcon({
  project,
  size,
  className = "",
}: {
  project: Project;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [project.icon]);
  const radius = Math.round(size * 0.22);
  if (!project.icon || failed) {
    return (
      <div
        className={`flex items-center justify-center font-bold shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: size * 0.4,
          letterSpacing: "0.02em",
          color: "#fff",
          background: `linear-gradient(135deg, ${project.accent}, color-mix(in srgb, ${project.accent} 60%, #000))`,
          boxShadow: `0 8px 24px -8px ${project.accent}`,
        }}
        aria-hidden
      >
        {monogram(project.title)}
      </div>
    );
  }
  return (
    <img
      src={project.icon}
      alt={`${project.title} app icon`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 object-cover ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        boxShadow: `0 8px 24px -8px ${project.accent}`,
      }}
    />
  );
}

/** A gallery screenshot; a missing file collapses to a soft placeholder. */
function Screenshot({
  src,
  alt,
  accent,
  className = "",
}: {
  src: string;
  alt: string;
  accent: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center text-[10px] font-mono ${className}`}
        style={{
          background: `linear-gradient(135deg, ${tintBg(accent)}, var(--surface))`,
          color: tintTextSoft(accent),
        }}
      >
        screenshot missing
      </div>
    );
  }
  const fitClass = className.includes("object-")
    ? ""
    : "object-cover object-top";
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${fitClass} ${className}`}
    />
  );
}

function CardActions({
  project,
  onOpen,
  size,
}: CardProps & { size: number }) {
  return (
    <div className="flex items-center gap-2">
      {project.apkPure && (
        <motion.a
          whileHover={{ scale: 1.15 }}
          href={project.apkPure}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on APKPure`}
          onClick={(e) => e.stopPropagation()}
          className="text-emerald-500 hover:text-emerald-400 transition-colors"
          title="Download on APKPure"
        >
          <Smartphone size={size} />
        </motion.a>
      )}
      {project.live && (
        <motion.a
          whileHover={{ scale: 1.15 }}
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} Live Demo`}
          onClick={(e) => e.stopPropagation()}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
          title="Live Web Demo"
        >
          <Globe size={size} />
        </motion.a>
      )}
      <motion.a
        whileHover={{ scale: 1.15 }}
        href={project.repo ?? PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} on ${project.repo?.includes("gitlab") ? "GitLab" : "GitHub"}`}
        onClick={(e) => e.stopPropagation()}
        className="text-ink-faint hover:text-ink-mute transition-colors"
        title={project.repo?.includes("gitlab") ? "GitLab Repository" : "GitHub Repository"}
      >
        {project.repo?.includes("gitlab") ? (
          <Gitlab size={size} />
        ) : (
          <Github size={size} />
        )}
      </motion.a>
      <motion.button
        type="button"
        whileHover={{ scale: 1.15 }}
        aria-label={`View ${project.title} details`}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="text-ink-faint transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--ink-faint)")
        }
      >
        <ExternalLink size={size} />
      </motion.button>
    </div>
  );
}

/** Keyboard affordance shared by both clickable cards. */
const openOnKey =
  (onOpen: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

function ProjectCardLarge({ project, onOpen }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={openOnKey(onOpen)}
      className="rounded-xl border border-hair bg-surface overflow-hidden h-full transition-colors duration-200 hover:border-hair-2 cursor-pointer"
    >
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <ProjectIcon project={project} size={56} />
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p
                  className="text-[10px] font-mono"
                  style={{ color: tintText(project.accent) }}
                >
                  {project.tag}
                </p>
                {project.apkPure && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                    style={{
                      borderColor: "rgba(16, 185, 129, 0.4)",
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "#10B981",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live on APKPure
                  </span>
                )}
                {project.live && !project.apkPure && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                    style={{
                      borderColor: "rgba(124, 58, 237, 0.4)",
                      background: "rgba(124, 58, 237, 0.12)",
                      color: "#A78BFA",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Live Web App
                  </span>
                )}
              </div>
              <h3
                className="font-bold text-ink"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "1.35rem",
                }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <CardActions project={project} onOpen={onOpen} size={14} />
        </div>
        <p className="text-xs text-ink-dim leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {project.highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-1.5 text-[11px] text-ink-dim font-mono"
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: tintFill(project.accent) }}
              />{" "}
              {h}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-hair mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Pill key={t} color={project.accent}>
                {t}
              </Pill>
            ))}
          </div>
          <span className="text-[10px] font-mono text-ink-faint">
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCardSmall({ project, onOpen }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={openOnKey(onOpen)}
      className="rounded-xl border border-hair bg-surface p-5 hover:border-hair-2 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <ProjectIcon project={project} size={44} />
          <div>
            <p
              className="text-[10px] font-mono mb-1.5"
              style={{ color: tintTextSoft(project.accent) }}
            >
              {project.tag}
            </p>
            <h3
              className="font-bold text-ink-soft"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.2rem",
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>
        <CardActions project={project} onOpen={onOpen} size={13} />
      </div>
      <p className="text-xs text-ink-dim leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <Pill key={t} color={project.accent}>
              {t}
            </Pill>
          ))}
        </div>
        <span className="text-[10px] font-mono text-ink-faint">
          {project.status}
        </span>
      </div>
    </motion.div>
  );
}

/** Full details in a modal: icon + screenshot gallery on the left, write-up on the right. */
function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const total = images.length;
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  // Escape / arrows drive the modal; page scroll is locked while it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (total > 1 && e.key === "ArrowLeft") prev();
      if (total > 1 && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: "color-mix(in srgb, var(--canvas) 75%, black)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-hair bg-surface"
      >
        <div
          className="h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-hair bg-surface flex items-center justify-center text-ink-faint hover:text-ink transition-colors"
        >
          <X size={14} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* media */}
          <div className="p-5 md:p-6 md:border-r border-hair flex flex-col items-center">
            <div
              className="w-full rounded-xl border border-hair flex flex-col items-center justify-center gap-4 py-8 px-5"
              style={{
                background: `radial-gradient(120% 90% at 50% 0%, ${tintBg(project.accent)}, var(--canvas))`,
              }}
            >
              <ProjectIcon project={project} size={112} />
              <div className="text-center">
                <p
                  className="font-bold text-ink"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.1rem",
                  }}
                >
                  {project.title.replace(/\s*[—–-].*$/, "")}
                </p>
                <p className="text-[10px] font-mono text-ink-faint mt-1">
                  {project.tag}
                </p>
              </div>
            </div>

            {total > 0 && (
              <div className="w-full mt-4">
                <div className="relative rounded-xl overflow-hidden border border-hair aspect-[9/16] max-h-[52vh] mx-auto bg-canvas flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={images[idx]}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Screenshot
                        src={images[idx]}
                        alt={`${project.title} screenshot ${idx + 1} of ${total}`}
                        accent={project.accent}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous screenshot"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-hair bg-surface flex items-center justify-center text-ink-dim hover:text-ink transition-colors"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next screenshot"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-hair bg-surface flex items-center justify-center text-ink-dim hover:text-ink transition-colors"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </>
                  )}
                </div>
                {total > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-label={`Screenshot ${i + 1}`}
                        aria-current={i === idx}
                        className="w-12 aspect-[9/16] rounded-md overflow-hidden border transition-all flex items-center justify-center bg-canvas"
                        style={{
                          borderColor:
                            i === idx ? project.accent : "var(--hair)",
                          opacity: i === idx ? 1 : 0.55,
                        }}
                      >
                        <Screenshot
                          src={src}
                          alt=""
                          accent={project.accent}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* details */}
          <div className="p-5 md:p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p
                className="text-[10px] font-mono"
                style={{ color: tintText(project.accent) }}
              >
                {project.tag}
              </p>
              {project.apkPure && (
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                  style={{
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live on APKPure
                </span>
              )}
              {project.live && !project.apkPure && (
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                  style={{
                    borderColor: "rgba(124, 58, 237, 0.4)",
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "#A78BFA",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Live Web App
                </span>
              )}
            </div>
            <h3
              className="font-bold text-ink mb-3 pr-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.8rem",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <div className="flex items-center gap-3 text-[10px] font-mono text-ink-faint mb-5 flex-wrap">
              <span>{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{project.status}</span>
              {project.apkPure && (
                <>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="text-emerald-500 font-medium">
                    v1.0.0 · Android 7.0+ · 65.9 MB
                  </span>
                </>
              )}
              {project.live && (
                <>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="text-violet-400 font-medium">
                    Live on Firebase Hosting
                  </span>
                </>
              )}
            </div>

            {project.apkPure && (
              <div
                className="mb-5 p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{
                  borderColor: "rgba(16, 185, 129, 0.35)",
                  background: "rgba(16, 185, 129, 0.08)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">Official APKPure Release</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Partner Developer
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-ink-dim">
                      Package: <span className="text-ink font-medium">app.pocketpilot</span> · v1.0.0 · 65.9 MB
                    </p>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={project.apkPure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm shrink-0"
                >
                  <Download size={12} />
                  Download APK
                  <ArrowUpRight size={10} />
                </motion.a>
              </div>
            )}

            <p className="text-sm text-ink-dim leading-relaxed mb-6">
              {project.description}
            </p>

            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-faint mb-3">
              Highlights
            </p>
            <ul className="space-y-2 mb-6">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-xs text-ink-dim font-mono"
                >
                  <span
                    className="mt-[6px] w-1 h-1 rounded-full shrink-0"
                    style={{ background: tintFill(project.accent) }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-faint mb-3">
              Tech stack
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <Pill key={t} color={project.accent}>
                  {t}
                </Pill>
              ))}
            </div>

            <div className="mt-auto pt-5 border-t border-hair flex flex-wrap gap-3">
              {project.apkPure && (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={project.apkPure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border transition-colors font-semibold"
                  style={{
                    borderColor: "rgba(16, 185, 129, 0.5)",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10B981",
                  }}
                >
                  <Download size={13} /> Download APK
                  <ArrowUpRight size={11} />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border transition-colors font-semibold"
                  style={{
                    borderColor: "rgba(124, 58, 237, 0.5)",
                    background: "rgba(124, 58, 237, 0.15)",
                    color: "#A78BFA",
                  }}
                >
                  <Globe size={13} /> Live Demo
                  <ArrowUpRight size={11} />
                </motion.a>
              )}
              {project.repo && (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border transition-colors"
                  style={{
                    borderColor: tintLine(project.accent),
                    background: tintBg(project.accent),
                    color: tintText(project.accent),
                  }}
                >
                  {project.repo.includes("gitlab") ? (
                    <Gitlab size={13} />
                  ) : (
                    <Github size={13} />
                  )}{" "}
                  {project.repo.includes("gitlab") ? "View on GitLab" : "View source"}
                  <ArrowUpRight size={11} />
                </motion.a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center text-xs font-mono px-4 py-2 rounded-full border border-hair text-ink-dim hover:text-ink transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

// ─── Credentials ──────────────────────────────────────────────────────────────

function CredentialsSection() {
  return (
    <section id="credentials" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="05 — Credentials"
          title="Education & Training"
          sub="Academic background, certifications, and languages."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Education */}
          <FadeUp className="lg:col-span-1">
            <div className="rounded-xl border border-hair bg-surface p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: tintBg(A),
                    border: `1px solid ${tintLine(A)}`,
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={A}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-ink-mute">
                  Education
                </p>
              </div>
              {EDUCATION.map((e, i) => (
                <div key={e.school} className={i > 0 ? "mt-5" : ""}>
                  {e.degree && (
                    <p className="text-sm font-semibold text-ink-soft leading-snug mb-1">
                      {e.degree}
                    </p>
                  )}
                  <p className="text-xs text-ink-dim mb-3">
                    {e.school}
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Period", value: e.period },
                      {
                        label: "Graduated",
                        value: e.graduated,
                      },
                      { label: "GPA", value: e.gpa },
                    ]
                      .filter((row) => row.value)
                      .map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[10px] font-mono text-ink-dim uppercase tracking-wider">
                            {row.label}
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--accent-soft)" }}
                          >
                            {row.value}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Training & Certs */}
          <FadeUp delay={0.1} className="lg:col-span-1">
            <div className="rounded-xl border border-hair bg-surface p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: tintBg("#10B981"),
                    border: `1px solid ${tintLine("#10B981")}`,
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                    />
                    <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-ink-mute">
                  Training & Certification
                </p>
              </div>
              <div className="space-y-4">
                {TRAINING.map((t, i) => (
                  <SlideIn key={t.title} delay={i * 0.07}>
                    <div
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: tintLine(A) }}
                    >
                      <div
                        className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                        style={{ background: A }}
                      />
                      <p className="text-sm text-ink-soft font-medium leading-snug">
                        {t.title}
                      </p>
                      <p className="text-xs text-ink-dim mt-0.5">
                        {t.org}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-mono text-ink-dim">
                          {t.period}
                        </span>
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            background: tintBg(A),
                            color: "var(--accent-soft)",
                          }}
                        >
                          {t.type}
                        </span>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Languages */}
          <FadeUp delay={0.2} className="lg:col-span-1">
            <div className="rounded-xl border border-hair bg-surface p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: tintBg("#06B6D4"),
                    border: `1px solid ${tintLine("#06B6D4")}`,
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-ink-mute">
                  Languages
                </p>
              </div>
              <div className="space-y-6">
                {LANGUAGES.map((l, i) => (
                  <FadeUp key={l.lang} delay={0.15 + i * 0.1}>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm text-ink-soft font-medium">
                          {l.lang}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-ink-dim">
                            {l.level}
                          </span>
                          <span
                            className="text-[10px] font-mono font-semibold"
                            style={{ color: i === 0 ? A : "#06B6D4" }}
                          >
                            {l.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-elevate overflow-hidden">
                        <ProgressBar
                          pct={l.pct}
                          color={i === 0 ? A : "#06B6D4"}
                        />
                      </div>
                    </div>
                  </FadeUp>
                ))}

                {/* Burmese — native, always 100% */}
                <FadeUp delay={0.35}>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm text-ink-soft font-medium">
                        Burmese
                      </p>
                      <span className="text-[10px] font-mono text-ink-dim">
                        <span>Native</span>
                        <span className="ml-2 font-semibold text-[#10B981]">
                          100%
                        </span>
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-elevate overflow-hidden">
                      <ProgressBar pct={100} color="#10B981" />
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({
  pct,
  color,
}: {
  pct: number;
  color: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={inView ? { width: `${pct}%` } : {}}
      transition={{
        duration: 0.9,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full rounded-full"
      style={{
        background: `linear-gradient(90deg, color-mix(in srgb, ${color} 56%, transparent), ${color})`,
      }}
    />
  );
}

// ─── Contact brief ───────────────────────────────────────────────────────────

const BRIEF_INTENTS = [
  "Full-time role",
  "Contract work",
  "App build",
  "Code review",
  "Just saying hi",
];

const BRIEF_TIMELINES = [
  "Right now",
  "This month",
  "Next quarter",
  "Just exploring",
];

type Brief = {
  intent: string;
  timeline: string;
  name: string;
  email: string;
  message: string;
};

const EMPTY_BRIEF: Brief = {
  intent: BRIEF_INTENTS[0],
  timeline: BRIEF_TIMELINES[1],
  name: "",
  email: "",
  message: "",
};

const briefSubject = (b: Brief) =>
  `${b.intent}${b.name ? ` — ${b.name}` : ""}`;

const briefBody = (b: Brief) =>
  `Hi Bhone,

${b.message.trim()}

———
Looking for: ${b.intent}
Timeline:    ${b.timeline}
From:        ${b.name || "—"}
Reply to:    ${b.email}`;

const briefMailto = (b: Brief) =>
  `mailto:${PROFILE.email}` +
  `?subject=${encodeURIComponent(briefSubject(b))}` +
  `&body=${encodeURIComponent(briefBody(b))}`;

// ─── Delivery channels ───────────────────────────────────────────────────────

const CHANNELS = ["Viber", "WhatsApp", "Email"] as const;
type Channel = (typeof CHANNELS)[number];

const PHONE_DIGITS = PROFILE.viber.replace(/\D/g, "");

/**
 * The three channels differ in what they can carry, and the UI has to be
 * honest about it:
 *   WhatsApp — wa.me takes the full message as a query param. One tap, done.
 *   Viber    — its scheme opens a chat but cannot carry text, so the brief
 *              goes to the clipboard first and the visitor pastes it.
 *   Email    — mailto: carries subject and body.
 */
function channelHref(ch: Channel, b: Brief) {
  switch (ch) {
    case "WhatsApp":
      return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(briefBody(b))}`;
    case "Viber":
      return `viber://chat?number=${encodeURIComponent(`+${PHONE_DIGITS}`)}`;
    default:
      return briefMailto(b);
  }
}

/** Whether the channel can carry the message itself. */
const channelPrefills = (ch: Channel) => ch !== "Viber";

const CHANNEL_HINT: Record<Channel, string> = {
  Viber:
    "Opens the Viber chat and copies the brief — paste it in, nothing is sent until you do.",
  WhatsApp:
    "Opens WhatsApp with the brief already typed — nothing is sent until you press send.",
  Email:
    "Opens your mail app with the brief filled in — nothing is sent until you press send there.",
};

const CHANNEL_DONE: Record<Channel, string> = {
  Viber: "Viber should be open",
  WhatsApp: "WhatsApp should be open",
  Email: "Your mail app should be open",
};

/** Single-choice chips. Cheaper to answer than a free-text subject line, and
 *  it means the message arrives already sorted. */
function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-faint">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((o) => {
          const on = o === value;
          return (
            <motion.button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o)}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-mono transition-colors duration-150"
              style={{
                borderColor: on ? "var(--accent-dim)" : "var(--hair)",
                background: on ? tintBg(A) : "transparent",
                color: on ? "var(--accent-soft)" : "var(--ink-dim)",
              }}
            >
              <motion.span
                initial={false}
                animate={{
                  width: on ? 12 : 0,
                  opacity: on ? 1 : 0,
                }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden flex items-center"
              >
                <Check size={11} />
              </motion.span>
              {o}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ContactSection() {
  const [brief, setBrief] = useState<Brief>(EMPTY_BRIEF);
  const [channel, setChannel] = useState<Channel>("Viber");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k: keyof Brief) => (v: string) =>
    setBrief((s) => ({ ...s, [k]: v }));

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefBody(brief));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false; // clipboard blocked — the handoff panel says so
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Viber's scheme can't carry the text, so put it on the clipboard before
    // the app steals focus. The fields stay filled either way, so the handoff
    // panel can offer the link and the copy again.
    if (!channelPrefills(channel)) await copyBrief();
    window.location.href = channelHref(channel, brief);
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="06 — Contact"
          title="Get in touch"
          sub="Open to Flutter roles, collaborations, and interesting projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                icon: <Mail size={14} />,
                label: "Email",
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
                color: A,
              },
              {
                icon: <Phone size={14} />,
                label: "Viber",
                value: "+95 9 775 386 728",
                href: `viber://chat?number=${encodeURIComponent(PROFILE.viber)}`,
                color: "#7360F2",
              },
              {
                icon: <Github size={14} />,
                label: "GitHub",
                value: "github.com/556bhonemyathein",
                href: PROFILE.github,
                color: A2,
              },
              {
                icon: <GitLabIcon size={14} />,
                label: "GitLab",
                value: "gitlab.com/556bhonemyathein",
                href: PROFILE.gitlab,
                color: "#FC6D26",
              },
              {
                icon: <Linkedin size={14} />,
                label: "LinkedIn",
                value: "linkedin.com/in/556bhonemyathein",
                href: PROFILE.linkedin,
                color: "#06B6D4",
              },
            ].map((c) => (
              <FadeUp key={c.label}>
                <motion.a
                  whileHover={{ x: 3 }}
                  href={c.href}
                  target={
                    c.href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-hair bg-surface hover:border-hair-2 transition-colors group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: tintBg(c.color),
                      border: `1px solid ${tintLine(c.color)}`,
                    }}
                  >
                    <span style={{ color: tintTextSoft(c.color) }}>
                      {c.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-ink-faint">
                      {c.label}
                    </p>
                    <p className="text-xs text-ink-mute group-hover:text-ink-mute transition-colors">
                      {c.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={12}
                    className="ml-auto text-ink-faint group-hover:text-ink-dim transition-colors"
                  />
                </motion.a>
              </FadeUp>
            ))}

            {/* Resume download card */}
            <FadeUp delay={0.15}>
              <motion.a
                whileHover={{ x: 3 }}
                href="/556_resume.pdf"
                download="BhoneMyatHein_Resume.pdf"
                className="flex items-center gap-4 p-4 rounded-xl border border-hair bg-surface hover:border-hair-2 transition-colors group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: tintBg(A),
                    border: `1px solid ${tintLine(A)}`,
                  }}
                >
                  <Download
                    size={14}
                    style={{ color: "var(--accent-soft)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-ink-faint">
                    Resume
                  </p>
                  <p className="text-xs text-ink-mute group-hover:text-ink-mute transition-colors">
                    BhoneMyatHein_Resume.pdf
                  </p>
                </div>
                <ArrowUpRight
                  size={12}
                  className="ml-auto text-ink-faint group-hover:text-ink-dim transition-colors"
                />
              </motion.a>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div
                className="p-4 rounded-xl border bg-surface"
                style={{
                  borderColor: tintLine("#10B981"),
                  background: tintBg("#10B981"),
                }}
              >
                <p className="text-[10px] font-mono tracking-widest uppercase mb-3 text-[#10B981]/50">
                  Auth I&apos;ve built
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Username/Password",
                    "Google Sign-In",
                    "Phone OTP",
                    "Activation Key",
                    "Firebase Auth",
                    "Access Token",
                    "Refresh",
                    "Revoke",
                  ].map((a) => (
                    <Pill key={a} color="#10B981">
                      {a}
                    </Pill>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="flex items-center gap-1.5 text-[11px] font-mono text-ink-faint px-1">
                <MapPin size={10} /> {PROFILE.location} ·
                <LocalTime />
              </p>
            </FadeUp>
          </div>

          {/* right — brief */}
          <FadeUp className="lg:col-span-3" delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-xl border text-center px-8 py-10"
                style={{
                  borderColor: tintLine(A),
                  background: tintBg(A),
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.1,
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    border: `1px solid ${tintLine(A)}`,
                    background: tintBg(A),
                  }}
                >
                  {channel === "Email" ? (
                    <Mail size={20} style={{ color: "var(--accent-soft)" }} />
                  ) : (
                    <MessageCircle
                      size={20}
                      style={{ color: "var(--accent-soft)" }}
                    />
                  )}
                </motion.div>
                <p className="text-ink-soft font-semibold mb-1">
                  {CHANNEL_DONE[channel]}
                </p>
                <p className="text-xs font-mono text-ink-dim mb-1">
                  {briefSubject(brief)}
                </p>
                <p className="text-sm text-ink-dim mb-7 max-w-xs">
                  {channelPrefills(channel)
                    ? "It hasn't reached me yet — press send there to finish."
                    : copied
                      ? "Your brief is on the clipboard — paste it into the chat and send."
                      : "Copy your brief below, then paste it into the chat."}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={channelHref(channel, brief)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-hair hover:border-hair-2 text-xs font-mono text-ink-dim hover:text-ink-mute transition-colors"
                  >
                    {channel === "Email" ? (
                      <Mail size={12} />
                    ) : (
                      <MessageCircle size={12} />
                    )}{" "}
                    Open {channel} again
                  </a>
                  <button
                    type="button"
                    onClick={copyBrief}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-hair hover:border-hair-2 text-xs font-mono text-ink-dim hover:text-ink-mute transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={12} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy the message
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBrief(EMPTY_BRIEF);
                    setSent(false);
                  }}
                  className="mt-6 text-xs font-mono text-ink-faint hover:text-ink-dim underline underline-offset-4 transition-colors"
                >
                  Start over
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-6">
                <ChipGroup
                  label="What do you need?"
                  options={BRIEF_INTENTS}
                  value={brief.intent}
                  onChange={set("intent")}
                />
                <ChipGroup
                  label="Timeline"
                  options={BRIEF_TIMELINES}
                  value={brief.timeline}
                  onChange={set("timeline")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CField
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    value={brief.name}
                    onChange={set("name")}
                    required
                  />
                  <CField
                    label="Email — optional"
                    type="email"
                    placeholder="you@company.com"
                    value={brief.email}
                    onChange={set("email")}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-faint">
                    A few lines
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What are you building, and what do you need from me?"
                    value={brief.message}
                    onChange={(e) => set("message")(e.target.value)}
                    required
                    className="rounded-xl bg-surface border border-hair text-ink-mute text-sm px-4 py-3 focus:outline-none placeholder:text-ink-faint resize-none transition-colors duration-150"
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent-soft)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--hair)")
                    }
                  />
                </div>

                <ChipGroup
                  label="Send it via"
                  options={[...CHANNELS]}
                  value={channel}
                  onChange={(v) => setChannel(v as Channel)}
                />

                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: A }}
                  >
                    {channel === "Email"
                      ? "Compose email"
                      : `Send on ${channel}`}{" "}
                    <ArrowUpRight size={14} />
                  </motion.button>
                  <p className="text-[10px] font-mono text-ink-faint text-center leading-relaxed">
                    {CHANNEL_HINT[channel]}
                  </p>
                </div>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function CField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-faint">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-xl bg-surface border border-hair text-ink-mute text-sm px-4 py-2.5 focus:outline-none placeholder:text-ink-faint transition-colors duration-150"
        onFocus={(e) => (e.target.style.borderColor = "var(--accent-soft)")}
        onBlur={(e) =>
        (e.target.style.borderColor =
          "var(--hair)")
        }
      />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: BG,
        color: "var(--foreground)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <ScrollProgress />
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CredentialsSection />
      <ContactSection />
      <BackToTop />
      <footer className="border-t border-hair py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{
                background: tintBg(A),
                border: `1px solid ${tintLine(A)}`,
              }}
            >
              <Smartphone size={10} style={{ color: A }} />
            </div>
            <p className="text-[11px] font-mono text-ink-faint">
              {PROFILE.name} · Flutter Specialist
            </p>
          </div>
          <p
            className="text-[11px] font-mono"
            style={{ color: "var(--hair-2)" }}
          >
            Yangon, Myanmar · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
