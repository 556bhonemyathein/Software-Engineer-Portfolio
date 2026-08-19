import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check, Mail } from "lucide-react";

// ─── Theme ───────────────────────────────────────────────────────────────────
const T = "#0D9488";   // deep teal primary
const T2 = "#134E4A";  // dark teal
const T3 = "#CCFBF1";  // teal tint

// ─── Animation helpers ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── Phone frame mockup ───────────────────────────────────────────────────────
function PhoneFrame({ screen, rotate = 0, scale = 1, shadow = true }: {
  screen: React.ReactNode; rotate?: number; scale?: number; shadow?: boolean;
}) {
  return (
    <div style={{ transform: `rotate(${rotate}deg) scale(${scale})`, transformOrigin: "center bottom", flexShrink: 0 }}>
      <div className="relative" style={{ width: 200, height: 400 }}>
        {/* shadow */}
        {shadow && (
          <div className="absolute inset-4 bottom-0 rounded-[36px]"
            style={{ background: "rgba(0,0,0,0.18)", filter: "blur(20px)", transform: "translateY(12px)" }} />
        )}
        {/* phone body */}
        <div className="relative rounded-[36px] overflow-hidden border-[6px] border-slate-800 bg-slate-900"
          style={{ width: 200, height: 400, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}>
          {/* notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-900 rounded-b-2xl z-10" />
          {/* screen */}
          <div className="absolute inset-0 overflow-hidden bg-white">
            {screen}
          </div>
          {/* screen glare */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
        </div>
        {/* side button */}
        <div className="absolute right-[-8px] top-24 w-[4px] h-12 rounded-r bg-slate-700" />
        <div className="absolute left-[-8px] top-20 w-[4px] h-8 rounded-l bg-slate-700" />
        <div className="absolute left-[-8px] top-32 w-[4px] h-8 rounded-l bg-slate-700" />
      </div>
    </div>
  );
}

// ─── POS Screen UIs ──────────────────────────────────────────────────────────

function CartScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      {/* status bar */}
      <div className="h-6 bg-slate-900" />
      {/* header */}
      <div className="px-3 py-2 flex items-center justify-between" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">ZayMate POS</span>
        <span className="text-white/70 text-[9px]">Cashier</span>
      </div>
      {/* items */}
      <div className="flex-1 px-3 py-2 overflow-hidden">
        <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Cart Items</p>
        {[
          { name: "Thanakha Soap", qty: 2, price: "1,800" },
          { name: "Jasmine Oil", qty: 1, price: "2,500" },
          { name: "Green Tea Pack", qty: 3, price: "4,200" },
          { name: "Longyi Fabric", qty: 1, price: "8,000" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <div>
              <p className="text-[8px] font-medium text-slate-700">{item.name}</p>
              <p className="text-[7px] text-slate-400">x{item.qty}</p>
            </div>
            <p className="text-[8px] font-bold" style={{ color: T2 }}>{item.price} Ks</p>
          </div>
        ))}
      </div>
      {/* total */}
      <div className="px-3 py-2 border-t border-slate-200 bg-white">
        <div className="flex justify-between mb-1">
          <span className="text-[8px] text-slate-400">Subtotal</span>
          <span className="text-[8px] text-slate-600">16,500 Ks</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[8px] text-slate-400">Tax (5%)</span>
          <span className="text-[8px] text-slate-600">825 Ks</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[8px] font-bold text-slate-800">Total</span>
          <span className="text-[9px] font-bold" style={{ color: T }}>17,325 Ks</span>
        </div>
        <div className="rounded-lg py-1.5 text-center text-[9px] font-bold text-white" style={{ background: T }}>
          PAY NOW
        </div>
      </div>
    </div>
  );
}

function ProductListScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div className="h-6 bg-slate-900" />
      <div className="px-3 py-2" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">Products</span>
      </div>
      {/* search */}
      <div className="px-3 py-2">
        <div className="rounded-lg bg-white border border-slate-200 px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border border-slate-300" />
          <span className="text-[8px] text-slate-300">Search or scan barcode…</span>
        </div>
      </div>
      {/* grid */}
      <div className="flex-1 px-3 grid grid-cols-2 gap-2 overflow-hidden pb-3">
        {[
          { name: "Thanakha Soap", stock: 45, price: "900" },
          { name: "Jasmine Oil", stock: 12, price: "2,500" },
          { name: "Green Tea", stock: 80, price: "1,400" },
          { name: "Rice Bran Oil", stock: 6, price: "3,200" },
          { name: "Longyi", stock: 23, price: "8,000" },
          { name: "Htamein", stock: 17, price: "6,500" },
        ].map((p, i) => (
          <div key={i} className="bg-white rounded-xl p-2 border border-slate-100 shadow-sm">
            <div className="w-full aspect-square rounded-lg mb-1.5" style={{ background: `hsl(${i * 47 + 160}, 40%, 92%)` }} />
            <p className="text-[7px] font-semibold text-slate-700 leading-tight">{p.name}</p>
            <p className="text-[7px] font-bold mt-0.5" style={{ color: T }}>{p.price} Ks</p>
            <p className="text-[6px] text-slate-400">Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsScreen() {
  const bars = [65, 80, 45, 90, 70, 55, 88];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div className="h-6 bg-slate-900" />
      <div className="px-3 py-2" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">Reports</span>
      </div>
      {/* stat cards */}
      <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
        {[
          { label: "Today Sales", value: "248K Ks", up: true },
          { label: "Transactions", value: "34", up: true },
          { label: "Top Product", value: "Longyi", up: null },
          { label: "Avg. Ticket", value: "7.3K Ks", up: false },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-2 border border-slate-100">
            <p className="text-[6px] text-slate-400 mb-0.5">{s.label}</p>
            <p className="text-[9px] font-bold text-slate-800">{s.value}</p>
            {s.up !== null && (
              <p className="text-[6px]" style={{ color: s.up ? "#10B981" : "#EF4444" }}>
                {s.up ? "▲" : "▼"} vs yesterday
              </p>
            )}
          </div>
        ))}
      </div>
      {/* chart */}
      <div className="mx-3 mt-2 bg-white rounded-xl p-2 border border-slate-100">
        <p className="text-[7px] font-semibold text-slate-500 mb-2">Weekly Sales</p>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
              <div className="w-full rounded-t" style={{ height: `${h}%`, background: i === 3 ? T : `${T}50` }} />
              <span className="text-[6px] text-slate-400">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReceiptScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div className="h-6 bg-slate-900" />
      <div className="px-3 py-2 flex items-center justify-between" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">Print Receipt</span>
      </div>
      <div className="flex-1 px-3 py-2 overflow-hidden">
        {/* receipt paper */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* zig-zag top */}
          <div className="h-2 w-full" style={{
            background: "linear-gradient(-45deg, #F8FAFC 25%, transparent 25%) 0 0, linear-gradient(45deg, #F8FAFC 25%, transparent 25%) 0 0, white",
            backgroundSize: "8px 8px",
          }} />
          <div className="px-3 py-2">
            <div className="text-center mb-2">
              <p className="text-[9px] font-bold text-slate-800">ZayMate POS</p>
              <p className="text-[7px] text-slate-400">Receipt #0047</p>
              <p className="text-[7px] text-slate-400">2025-03-14  14:22</p>
            </div>
            <div className="border-t border-dashed border-slate-200 my-1.5" />
            {["Thanakha Soap x2", "Jasmine Oil x1", "Green Tea x3"].map((item, i) => (
              <div key={i} className="flex justify-between">
                <p className="text-[7px] text-slate-600">{item}</p>
                <p className="text-[7px] text-slate-700">{["1,800", "2,500", "4,200"][i]} Ks</p>
              </div>
            ))}
            <div className="border-t border-dashed border-slate-200 my-1.5" />
            <div className="flex justify-between">
              <p className="text-[8px] font-bold text-slate-800">Total</p>
              <p className="text-[8px] font-bold" style={{ color: T }}>17,325 Ks</p>
            </div>
            <div className="border-t border-dashed border-slate-200 my-1.5" />
            <p className="text-center text-[6px] text-slate-400">Thank you for shopping!</p>
          </div>
          {/* zig-zag bottom */}
          <div className="h-2 w-full" style={{
            background: "linear-gradient(-45deg, transparent 25%, white 25%) 0 0, linear-gradient(45deg, transparent 25%, white 25%) 0 0, #F8FAFC",
            backgroundSize: "8px 8px",
          }} />
        </div>
        {/* print button */}
        <div className="mt-3 rounded-xl py-2 text-center text-[9px] font-bold text-white" style={{ background: T }}>
          🖨 Print via Bluetooth
        </div>
        <div className="mt-2 rounded-xl py-1.5 text-center text-[9px] font-medium border" style={{ borderColor: T, color: T }}>
          Share Receipt
        </div>
      </div>
    </div>
  );
}

function InventoryScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div className="h-6 bg-slate-900" />
      <div className="px-3 py-2" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">Inventory</span>
      </div>
      <div className="px-3 pt-2">
        <div className="grid grid-cols-3 gap-1 mb-2">
          {[{ l: "Total SKUs", v: "312" }, { l: "Low Stock", v: "8" }, { l: "Out", v: "2" }].map((s) => (
            <div key={s.l} className="bg-white rounded-lg p-1.5 border border-slate-100 text-center">
              <p className="text-[9px] font-bold text-slate-800">{s.v}</p>
              <p className="text-[6px] text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 px-3 overflow-hidden">
        <p className="text-[7px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Low Stock Alert</p>
        {[
          { name: "Rice Bran Oil", sku: "SKU-042", qty: 6, min: 10 },
          { name: "Jasmine Oil", sku: "SKU-018", qty: 12, min: 15 },
          { name: "Htamein Blue", sku: "SKU-089", qty: 4, min: 8 },
          { name: "Sandalwood Soap", sku: "SKU-011", qty: 2, min: 10 },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <div>
              <p className="text-[8px] font-medium text-slate-700">{item.name}</p>
              <p className="text-[6px] text-slate-400">{item.sku}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-bold" style={{ color: item.qty < 5 ? "#EF4444" : "#F59E0B" }}>{item.qty}</p>
              <p className="text-[6px] text-slate-400">min {item.min}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LicenseScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div className="h-6 bg-slate-900" />
      <div className="px-3 py-2" style={{ background: T }}>
        <span className="text-white text-[10px] font-bold">License</span>
      </div>
      <div className="flex-1 px-3 py-4 flex flex-col items-center justify-center gap-3">
        {/* badge */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: T3 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-bold text-slate-800">License Activation</p>
          <p className="text-[7px] text-slate-400 mt-0.5">Enter your license key to unlock</p>
        </div>
        {/* key input */}
        <div className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2">
          <p className="text-[8px] font-mono text-slate-400 tracking-wider">XXXX-XXXX-XXXX-XXXX</p>
        </div>
        {/* plan cards */}
        {["Basic Plan · 1 Device", "Pro Plan · 3 Devices"].map((p, i) => (
          <div key={p} className="w-full border rounded-xl px-3 py-2 flex items-center gap-2"
            style={{ borderColor: i === 1 ? T : "#E2E8F0", background: i === 1 ? T3 : "white" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: i === 1 ? T : "#CBD5E1" }} />
            <p className="text-[8px] font-medium" style={{ color: i === 1 ? T2 : "#64748B" }}>{p}</p>
          </div>
        ))}
        <div className="w-full rounded-xl py-2 text-center text-[9px] font-bold text-white" style={{ background: T }}>
          Activate
        </div>
      </div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, accent = T }: { icon: React.ReactNode; title: string; desc: string; accent?: string }) {
  return (
    <motion.div whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(13,148,136,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Tech pill ────────────────────────────────────────────────────────────────
function TechPill({ label, sub, color = T }: { label: string; sub?: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Architecture block ───────────────────────────────────────────────────────
function ArchLayer({ label, sublabel, color, items }: { label: string; sublabel: string; color: string; items?: string[] }) {
  return (
    <div className="rounded-2xl border px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
      style={{ borderColor: `${color}25`, background: `${color}06` }}>
      <div className="sm:w-48 shrink-0">
        <p className="text-sm font-bold" style={{ color }}>{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>
      </div>
      {items && (
        <div className="flex flex-wrap gap-2 flex-1">
          {items.map((item) => (
            <span key={item} className="text-xs px-3 py-1 rounded-full font-mono"
              style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nav bar ─────────────────────────────────────────────────────────────────
function CaseNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-[60px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to portfolio
        </a>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: T }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M8 10h8M8 14h5" />
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-800">ZayMate</span>
        </div>
        <a href="mailto:556bonemyathein@example.com"
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:brightness-105"
          style={{ background: T }}>
          <Mail size={12} /> Contact
        </a>
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ZayMatePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <CaseNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-[60px] overflow-hidden">
        {/* background */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(160deg, ${T}08 0%, ${T}04 40%, transparent 70%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-20 pb-0">
          <motion.div initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>

            {/* tag */}
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: T3, color: T2 }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: T }} />
                Mobile App · Flutter · POS System
              </span>
            </motion.div>

            {/* title */}
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              className="font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(4rem, 11vw, 8rem)", lineHeight: 0.9, color: T2 }}>
              ZayMate
            </motion.h1>

            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-xl md:text-2xl text-slate-500 font-light mb-6 max-w-xl">
              Offline-first POS for modern retail
            </motion.p>

            <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-sm text-slate-400 max-w-lg leading-relaxed mb-12">
              A fully-featured Point of Sale system built in Flutter for retail shops across Myanmar — supporting barcode sales, inventory management, thermal printing, reporting, and multi-language UI.
            </motion.p>
          </motion.div>

          {/* phone mockups */}
          <div className="flex items-end justify-center gap-0 md:gap-4 pb-0 overflow-hidden" style={{ height: 380 }}>
            <motion.div initial={{ opacity: 0, x: -40, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <PhoneFrame screen={<InventoryScreen />} rotate={-9} scale={0.82} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 10, position: "relative" }}>
              <PhoneFrame screen={<CartScreen />} rotate={0} scale={0.98} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <PhoneFrame screen={<ReportsScreen />} rotate={9} scale={0.82} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. PROJECT OVERVIEW ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: T }}>Project Overview</p>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-10">
              ZayMate is a cross-platform POS application designed for retail shops in Myanmar,
              with offline-first SQLite storage for reliability in low-connectivity environments.
              It integrates Firebase for cloud sync and license management, and supports
              Bluetooth thermal printing with full bilingual (Myanmar / English) UI.
            </p>
          </FadeUp>
          {/* stat chips */}
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "195+ Dart Files", icon: "📁" },
                { label: "Android · iOS · Tablet", icon: "📱" },
                { label: "2 Languages", icon: "🌐" },
                { label: "Offline-First SQLite", icon: "💾" },
                { label: "Bluetooth Printing", icon: "🖨" },
                { label: "Firebase Cloud Sync", icon: "☁️" },
              ].map((s) => (
                <div key={s.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                  <span>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. TECH STACK ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: T }}>Tech Stack</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10">Built with the right tools</h2>
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Flutter", sub: "Cross-platform UI", color: "#54C5F8" },
              { label: "Dart", sub: "Primary language", color: "#00BCD4" },
              { label: "Riverpod", sub: "State management", color: "#7C5CFC" },
              { label: "Firebase", sub: "Cloud & auth", color: "#F59E0B" },
              { label: "SQLite", sub: "Local database", color: "#10B981" },
              { label: "Dio", sub: "HTTP client", color: "#F472B6" },
              { label: "fl_chart", sub: "Charts & graphs", color: T },
              { label: "BT Printer", sub: "Thermal printing", color: "#64748B" },
            ].map((tech) => (
              <FadeUp key={tech.label} delay={0.05}>
                <TechPill label={tech.label} sub={tech.sub} color={tech.color} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KEY FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: T }}>Key Features</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10">Everything a retail shop needs</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 4v16M17 4v16M2 12h4M18 12h4" /></svg>,
                title: "Barcode Sales",
                desc: "Scan or manually enter barcodes. Auto-fills product details and updates cart instantly.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
                title: "Inventory Management",
                desc: "Track stock levels, low-stock alerts, and product categories with real-time sync.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-4" /></svg>,
                title: "Reporting Dashboard",
                desc: "Daily, weekly, and monthly sales charts built with fl_chart. Export-ready summaries.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M12 18v-6M9 15h6" /></svg>,
                title: "Excel Import/Export",
                desc: "Bulk import products from Excel sheets. Export transaction records for accounting.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
                title: "Thermal Printing",
                desc: "Bluetooth receipt printing to standard 58mm/80mm thermal printers. Offline-capable.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
                title: "License Activation",
                desc: "Device-based license keys with plan tiers. Firebase-validated, tamper-resistant.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" /></svg>,
                title: "Multi-language UI",
                desc: "Full Myanmar (Unicode) and English support. Language switchable at runtime.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                title: "Customer Management",
                desc: "Store customer profiles, purchase history, and apply loyalty discounts at checkout.",
              },
            ].map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <FeatureCard {...f} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SCREEN SHOWCASE ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: T }}>Screen Showcase</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-12">A closer look at the UI</h2>
          </FadeUp>

          {/* horizontal scroll row */}
          <div className="flex gap-8 overflow-x-auto pb-6 -mx-5 px-5 md:-mx-10 md:px-10"
            style={{ scrollbarWidth: "none" }}>
            {[
              { label: "POS Cart", screen: <CartScreen /> },
              { label: "Product List", screen: <ProductListScreen /> },
              { label: "Reports", screen: <ReportsScreen /> },
              { label: "Print Receipt", screen: <ReceiptScreen /> },
              { label: "Inventory", screen: <InventoryScreen /> },
              { label: "License", screen: <LicenseScreen /> },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.07} className="flex flex-col items-center gap-4 shrink-0">
                <PhoneFrame screen={item.screen} shadow />
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MY ROLE ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: T }}>My Role</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">What I built</h2>
              <p className="text-slate-500 leading-relaxed text-sm">
                I was the primary Flutter developer on ZayMate, responsible for the full mobile
                application from architecture to deployment. I designed the Riverpod state layer,
                implemented all offline-first SQLite flows, integrated Firebase for license validation
                and cloud sync, and built the Bluetooth thermal printing module end-to-end.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="space-y-3">
                {[
                  "Designed and implemented the full Riverpod state architecture",
                  "Built offline-first SQLite database layer with sync logic",
                  "Integrated Firebase Auth, Firestore, and license validation",
                  "Implemented Bluetooth thermal printer module (58mm/80mm)",
                  "Developed POS cart flow with barcode scanner integration",
                  "Built reporting dashboard using fl_chart",
                  "Implemented Excel import/export for product catalog",
                  "Handled Myanmar Unicode text rendering and i18n switching",
                  "Wrote feature-first clean architecture structure (195+ Dart files)",
                  "Tested on Android, iOS, and tablet form factors",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: T3 }}>
                      <Check size={11} style={{ color: T }} />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 7. ARCHITECTURE ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: T }}>Architecture</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Layered clean architecture</h2>
            <p className="text-sm text-slate-500 mb-10 max-w-xl">
              Feature-first folder structure with a clear separation of concerns across four layers.
              Each layer communicates only with the layer directly below it.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="space-y-2">
              <ArchLayer label="Presentation" sublabel="Flutter Widgets / Screens"
                color="#7C5CFC"
                items={["POS Cart Screen", "Product List", "Reports Screen", "Settings"]} />
              <div className="flex items-center justify-center py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-slate-300" />
                  <svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 6L0 0h8z" fill="#CBD5E1" /></svg>
                </div>
              </div>
              <ArchLayer label="State / Providers" sublabel="Riverpod Notifiers"
                color={T}
                items={["CartProvider", "ProductProvider", "ReportProvider", "AuthProvider"]} />
              <div className="flex items-center justify-center py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-slate-300" />
                  <svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 6L0 0h8z" fill="#CBD5E1" /></svg>
                </div>
              </div>
              <ArchLayer label="Services" sublabel="Business Logic"
                color="#F59E0B"
                items={["SaleService", "InventoryService", "PrintService", "LicenseService"]} />
              <div className="flex items-center justify-center py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-slate-300" />
                  <svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 6L0 0h8z" fill="#CBD5E1" /></svg>
                </div>
              </div>
              {/* data layer split */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <ArchLayer label="SQLite" sublabel="Local / Offline DB" color="#10B981" />
                <ArchLayer label="Firebase" sublabel="Cloud Sync & Auth" color="#F59E0B" />
                <ArchLayer label="REST API" sublabel="Dio HTTP Client" color="#F472B6" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. CLOSING CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <FadeUp>
            <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${T2} 0%, ${T} 100%)` }}>
              {/* decorative dots */}
              <div className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative">
                <p className="text-sm font-semibold text-white/60 mb-3 tracking-widest uppercase">What's next?</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Want to work together?
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  I&apos;m open to Flutter roles, freelance projects, and interesting collaborations. Let&apos;s build something great.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white transition-all hover:bg-white/90"
                    style={{ color: T2 }}>
                    <ArrowLeft size={14} /> View more projects
                  </a>
                  <a href="mailto:556bonemyathein@example.com"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all">
                    <Mail size={14} /> Get in touch <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-7">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between">
          <p className="text-xs text-slate-400">ZayMate Case Study · Bhone Myat Hein</p>
          <p className="text-xs text-slate-300">{new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
