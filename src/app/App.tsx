import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "./useTheme";
import {
  Github,
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
  role: "Flutter Developer",
  tagline:
    "Building mobile apps with clean architecture, real-time Firebase & robust auth flows.",
  location: "Yangon, Myanmar",
  email: "556bhonemyathein@gmail.com",
  viber: "+959775386728",
  github: "https://github.com/556bhonemyathein",
  gitlab: "https://gitlab.com/556bhonemyathein",
  linkedin:
    "https://www.linkedin.com/in/556bhonemyathein/",
  photo:
    "https://th.bing.com/th/id/R.97f2dcaf4201ecc11142b46b6514f47f?rik=9yUB20NfvHAarw&riu=http%3a%2f%2fwww.hdwallpapers.in%2fwalls%2frango-HD.jpg&ehk=RcOrMq3rIATUp1h%2fURORrOcc50ab26dEbpTQ5c6zQDE%3d&risl=&pid=ImgRaw&r=0",
  available: true,
};

const ABOUT_POINTS = [
  "Started Flutter in 2024 — building and shipping consistently since.",
  "Knows all major state management patterns; picks the right one for each project.",
  "Uses code generation (quicktype, build_runner) when it helps — writes manually when it's cleaner.",
  "Experience across REST APIs, Firebase, full auth flows, image upload, and responsive UI.",
  "Worked alongside backend teams on PHP, Firebase, and Odoo — integrating their APIs into Flutter.",
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
    icon: <Database size={15} />,
    title: "Networking & Data",
    color: "#06B6D4",
    items: [
      { name: "HTTP package" },
      { name: "Dio", note: "Interceptors" },
      { name: "Retrofit", note: "Type-safe client" },
      { name: "REST API integration" },
      { name: "Image upload" },
      { name: "Postman / Scalar" },
    ],
  },
  {
    icon: <Shield size={15} />,
    title: "Authentication",
    color: "#10B981",
    items: [
      { name: "Username & Password" },
      { name: "Google Sign-In" },
      { name: "Phone OTP" },
      { name: "Activation Key" },
      { name: "Firebase Auth" },
      { name: "JWT Access Token" },
      { name: "Refresh & Revoke", note: "Manual" },
    ],
  },
  {
    icon: <Code2 size={15} />,
    title: "Firebase",
    color: "#F59E0B",
    items: [
      { name: "Firestore real-time" },
      { name: "Firebase Auth" },
      { name: "Cloud Storage" },
      { name: "Admin panel", note: "Role-based" },
      { name: "User view", note: "Live sync" },
    ],
  },
  {
    icon: <Server size={15} />,
    title: "Backend Collaboration",
    color: "#38BDF8",
    items: [
      { name: "PHP backend team", note: "REST endpoints" },
      { name: "Firebase backend", note: "Firestore + Auth" },
      { name: "Odoo", note: "ERP modules" },
      { name: "API contract alignment" },
      { name: "Cross-team debugging" },
    ],
  },
  {
    icon: <GitBranch size={15} />,
    title: "Architecture",
    color: "#F472B6",
    items: [
      { name: "MVC" },
      { name: "MVP" },
      { name: "MVVM" },
      { name: "Clean Architecture" },
      { name: "Feature-first" },
      { name: "Layer-first" },
    ],
  },
  {
    icon: <Smartphone size={15} />,
    title: "Flutter & Dart",
    color: A2,
    items: [
      { name: "Flutter (primary)" },
      { name: "Responsive UI" },
      { name: "Custom animations" },
      { name: "Git / GitHub" },
      { name: "json_serialization + build_runner" },
      { name: "quicktype.io / jsontodart" },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Self Learning",
    role: "Independent Study",
    period: "2024 – Present",
    type: "Ongoing",
    accent: "#10B981",
    description: "Continuously exploring the Flutter ecosystem — architecture patterns, state management, and real-world app building.",
    highlights: [
      {
        app: "Architecture & Patterns",
        detail: "Deep-diving Clean Architecture, feature-first structure, and various state management approaches (BLoC, Riverpod, GetX).",
        tags: ["Clean Architecture", "BLoC", "Riverpod", "GetX"],
      },
      {
        app: "Backend & Auth",
        detail: "Self-studied JWT auth flows, token refresh/revoke, Firebase suite, and REST API design with Postman and Scalar.",
        tags: ["Firebase", "JWT", "REST API", "Dio"],
      },
      {
        app: "Backend Team Collaboration",
        detail: "Worked with backend developers on PHP, Firebase, and Odoo services — aligning request/response contracts, integrating endpoints into Flutter, and debugging issues across both sides.",
        tags: ["PHP", "Firebase", "Odoo", "REST API"],
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
};

const PROJECTS: Project[] = [
  {
    featured: true,
    tag: "Flutter · Offline-First",
    accent: "#3B82F6",
    title: "PocketPilot — Finance Tracker",
    description:
      "Offline-first personal finance tracker. Every write lands in Isar first and reconciles with the server later, so accounts, transactions, categories and reports all work with no backend at all. Clean architecture, feature-first, with a local token issuer powering the dev flavour.",
    highlights: [
      "Isar offline-first + sync",
      "Riverpod 3 + GoRouter",
      "fl_chart reports + PDF export",
      "Dio auth/retry interceptors",
      "Multi-language (easy_localization)",
    ],
    tech: [
      "Flutter",
      "Riverpod",
      "Isar",
      "Dio",
      "Freezed",
      "GoRouter",
    ],
    year: "2026",
    status: "In progress",
  },
  {
    featured: true,
    tag: "Flutter · Offline-First",
    accent: "#8B5CF6",
    title: "Offline Inventory Logger",
    description:
      "Offline-first inventory manager that stores items locally in SQLite while fetching suppliers from a REST API. Full CRUD with swipe actions, form validation, and loading/network error handling.",
    highlights: [
      "SQLite offline storage",
      "REST supplier sync",
      "Full CRUD + swipe actions",
      "Clean architecture",
    ],
    tech: ["Flutter", "Riverpod", "Dio", "Sqflite"],
    year: "2026",
    status: "Completed",
    repo: "https://github.com/556bhonemyathein/offline_inventory_logger",
  },
  {
    featured: true,
    tag: "Flutter · Firebase",
    accent: "#F59E0B",
    title: "Guitar Chord App",
    description:
      "Admin panel where admins add chord diagrams and lesson content. Users browse lessons in real time via Firestore with role-based navigation and Firebase Auth access control.",
    highlights: [
      "Admin + User roles",
      "Firestore real-time",
      "Firebase Auth",
      "Chord diagram UI",
    ],
    tech: ["Flutter", "Firebase", "Firestore", "Provider"],
    year: "2025",
    status: "Completed",
    repo: "https://github.com/556bhonemyathein/guitercord",
  },
  {
    featured: true,
    tag: "Flutter · Auth",
    accent: "#10B981",
    title: "Full Auth System",
    description:
      "Complete auth covering username/password, Google Sign-In, phone OTP, activation key, and Firebase Auth. Manual JWT access token, refresh rotation, and revoke endpoint with Dio interceptors.",
    highlights: [
      "5 auth methods",
      "Activation key login",
      "JWT + Refresh + Revoke",
      "Dio interceptors",
      "Token storage",
    ],
    tech: [
      "Flutter",
      "Dio",
      "Retrofit",
      "BLoC",
      "Firebase Auth",
    ],
    year: "2025",
    status: "Completed",
  },
  {
    featured: false,
    tag: "Flutter · REST API",
    accent: "#06B6D4",
    title: "Data Explorer",
    description:
      "Paginated REST API client with search and filter. Riverpod for state, models from quicktype.io, image upload with progress indicator and error handling.",
    highlights: [
      "Riverpod state",
      "Paginated fetch",
      "Image upload",
      "quicktype models",
    ],
    tech: ["Flutter", "Riverpod", "Dio", "REST API"],
    year: "2024",
    status: "Completed",
  },
  {
    featured: false,
    tag: "Flutter · Architecture",
    accent: "#F472B6",
    title: "Clean Arch Starter",
    description:
      "Reference project with clean architecture, feature-first folders, MVVM + GetX for navigation and state, dark/light theming, and responsive layout.",
    highlights: [
      "Feature-first",
      "Clean Architecture",
      "MVVM + GetX",
      "Responsive",
    ],
    tech: ["Flutter", "GetX", "Clean Architecture", "MVVM"],
    year: "2024",
    status: "Learning project",
  },
];

const EDUCATION = [
  {
    degree: "B.C.Sc — Bachelor of Computer Science",
    school: "Meikhtila University of Computer Science",
    period: "2017 – 2025",
    graduated: "Jan 2026",
    gpa: "3.65 / 4.0",
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

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth" });
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

function Nav() {
  const y = useScrollY();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const past = y > 80;
  const links = [
    "About",
    "Experience",
    "Skills",
    "Projects",
    "Credentials",
    "Contact",
  ];

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
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="px-3.5 py-1.5 text-xs font-mono text-ink-dim hover:text-ink-soft rounded-lg hover:bg-elevate transition-all duration-150"
            >
              {l}
            </button>
          ))}
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
            className="text-ink-dim hover:text-ink-soft p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
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
        style={{ background: "var(--nav-solid)" }}
      >
        <div className="px-5 pt-2 pb-5 border-t border-hair flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => {
                scrollTo(l.toLowerCase());
                setOpen(false);
              }}
              className="text-left py-2.5 px-3 text-xs font-mono text-ink-dim hover:text-ink-soft rounded-lg hover:bg-elevate transition-all"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => {
              scrollTo("contact");
              setOpen(false);
            }}
            className="mt-2 py-2.5 px-3 text-xs font-semibold text-white rounded-lg"
            style={{ background: A }}
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
                suffix="+"
                label="sm tools"
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
                "Flutter",
                "Firebase",
                "BLoC",
                "Riverpod",
                "REST",
              ].map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* decorative rings */}
      <div
        className="absolute -bottom-4 -left-4 -z-10 w-full h-full rounded-2xl border"
        style={{ borderColor: tintLineSoft(A) }}
      />
      <div
        className="absolute -bottom-8 -left-8 -z-20 w-full h-full rounded-2xl border"
        style={{ borderColor: tintLineSoft(A) }}
      />
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
          sub="A Flutter developer building real, functional apps — not just UI samples."
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
                  Code generation tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "quicktype.io",
                    "javiercbk jsontodart",
                    "Paste JSON as Code",
                    "json_serialization",
                    "build_runner",
                  ].map((t) => (
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

function ProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  return (
    <section id="projects" className="py-24 md:py-32">
      <HR />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28">
        <SectionLabel
          index="04 — Projects"
          title="What I've built"
          sub="Real projects with real functionality — still building."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <ProjectCardLarge project={p} />
            </FadeUp>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {others.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <ProjectCardSmall project={p} />
            </FadeUp>
          ))}
        </div>

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
    </section>
  );
}

function ProjectCardLarge({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl border border-hair bg-surface overflow-hidden h-full transition-colors duration-200 hover:border-hair-2"
    >
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="text-[10px] font-mono mb-2"
              style={{ color: tintText(project.accent) }}
            >
              {project.tag}
            </p>
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
          <div className="flex gap-2">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href={project.repo ?? PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-faint hover:text-ink-mute transition-colors"
            >
              <Github size={14} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="#"
              className="text-ink-faint transition-colors"
              style={{}}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = project.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "var(--ink-faint)")
              }
            >
              <ExternalLink size={14} />
            </motion.a>
          </div>
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

function ProjectCardSmall({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-xl border border-hair bg-surface p-5 hover:border-hair-2 transition-colors duration-200"
    >
      <div className="flex items-start justify-between mb-3">
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
        <div className="flex gap-2">
          <motion.a
            whileHover={{ scale: 1.15 }}
            href={project.repo ?? PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-faint hover:text-ink-mute transition-colors"
          >
            <Github size={13} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.15 }}
            href="#"
            className="text-ink-faint hover:text-[#54C5F8] transition-colors"
          >
            <ExternalLink size={13} />
          </motion.a>
        </div>
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
              {EDUCATION.map((e) => (
                <div key={e.degree}>
                  <p className="text-sm font-semibold text-ink-soft leading-snug mb-1">
                    {e.degree}
                  </p>
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
                    ].map((row) => (
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
                        <span className="text-[10px] font-mono text-ink-dim">
                          {l.level}
                        </span>
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
                        Native
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
        background: `linear-gradient(90deg, ${color}90, ${color})`,
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
      className="min-h-screen antialiased overflow-x-hidden"
      style={{
        background: BG,
        color: "var(--foreground)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CredentialsSection />
      <ContactSection />
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
              {PROFILE.name} · Flutter Developer
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