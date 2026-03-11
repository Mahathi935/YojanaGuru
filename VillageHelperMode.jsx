/**
 * ============================================================
 *  VILLAGE HELPER MODE — SchemePath
 *  A complete self-contained module for assisted beneficiary
 *  management by NGO workers, volunteers, CSC operators, etc.
 *
 *  DROP-IN USAGE:
 *    import { ModeSelector, VillageHelperMode } from './VillageHelperMode'
 *
 *    // In your root App:
 *    const [appMode, setAppMode] = useState(null) // null | 'self' | 'helper'
 *    if (!appMode)   return <ModeSelector onSelect={setAppMode} />
 *    if (appMode === 'helper') return <VillageHelperMode onExit={() => setAppMode(null)} schemes={SCHEMES} />
 *    // else render your normal app
 *
 *  PROPS:
 *    VillageHelperMode:
 *      onExit   () => void          — back to normal mode
 *      schemes  Array<SchemeObj>    — your existing schemes array
 *      lang     'en'|'hi'|'ta'|'te' — optional, defaults 'en'
 *
 *    ModeSelector:
 *      onSelect (mode: 'self'|'helper') => void
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ── fonts ── */
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
    rel="stylesheet"
  />
);

/* ─────────────────────────────────────────────
   SCHEME DATA  (self-contained fallback — replace
   with your real SCHEMES array via props)
───────────────────────────────────────────── */
const FALLBACK_SCHEMES = [
  {
    id: "CN_001", name: "PM-KISAN Samman Nidhi", emoji: "🚜",
    category: "farmer", color: "#c4885a", state: "Central", isCentral: true,
    tagline: "₹6,000 every year for all farmers",
    benefit: "₹6,000 per year in 3 instalments directly to bank",
    benefit_simple: "Every farmer gets ₹2,000 three times a year — total ₹6,000. Money goes straight to bank.",
    eligibility: { occupation: "farmer" },
    requiredDocs: ["Aadhaar Card", "Land Records", "Bank Passbook"],
    apply_at: "Village Agriculture Officer or CSC Centre",
  },
  {
    id: "CN_002", name: "Ayushman Bharat — PMJAY", emoji: "💊",
    category: "health", color: "#e07055", state: "Central", isCentral: true,
    tagline: "Free hospital treatment up to ₹5 lakh",
    benefit: "Cashless treatment up to ₹5 lakh/year at empanelled hospitals",
    benefit_simple: "Big surgeries and illness treated free. Works at many private hospitals too.",
    eligibility: { income_annual_max: 200000 },
    requiredDocs: ["Aadhaar Card", "Ration Card"],
    apply_at: "Empanelled Hospital or CSC Centre",
  },
  {
    id: "CN_003", name: "PMAY-G — Rural Housing", emoji: "🏠",
    category: "housing", color: "#a07850", state: "Central", isCentral: true,
    tagline: "₹1.2 lakh to build your own house",
    benefit: "₹1,20,000 grant to construct a pucca house in rural areas",
    benefit_simple: "Government gives ₹1.2 lakh to build a proper brick house. You don't repay this.",
    eligibility: { residence: "rural", income_annual_max: 200000 },
    requiredDocs: ["Aadhaar Card", "Ration Card", "Land Document", "Bank Passbook"],
    apply_at: "Gram Panchayat or Block Development Office",
  },
  {
    id: "CN_006", name: "MGNREGS — 100 Days Work", emoji: "⛏️",
    category: "employment", color: "#7a9860", state: "Central", isCentral: true,
    tagline: "100 days of guaranteed work near your village",
    benefit: "100 days of guaranteed work per year at minimum wages",
    benefit_simple: "Government must give you work near your village for 100 days every year.",
    eligibility: { residence: "rural", age_min: 18 },
    requiredDocs: ["Aadhaar Card", "Job Card", "Bank Passbook"],
    apply_at: "Gram Panchayat Office",
  },
  {
    id: "CN_007", name: "PM Matru Vandana Yojana", emoji: "🤱",
    category: "women", color: "#d07090", state: "Central", isCentral: true,
    tagline: "₹5,000 for first-time pregnant women",
    benefit: "₹5,000 cash for first pregnancy — for nutrition",
    benefit_simple: "Pregnant for first time? Government gives ₹5,000 for food and nutrition.",
    eligibility: { gender: "female", pregnant_or_new_mother: true, age_min: 19 },
    requiredDocs: ["Aadhaar Card", "MCP Card", "Bank Passbook"],
    apply_at: "ASHA Worker / Anganwadi / PHC",
  },
  {
    id: "CN_008", name: "Old Age Pension — NSAP", emoji: "👴",
    category: "elderly", color: "#9090a0", state: "Central", isCentral: true,
    tagline: "Monthly pension for poor senior citizens",
    benefit: "₹200–500/month pension for senior citizens 60+ from BPL families",
    benefit_simple: "If you are 60+ from a poor family, you get ₹200-500 every month as pension.",
    eligibility: { age_min: 60, income_annual_max: 100000 },
    requiredDocs: ["Aadhaar Card", "Age Proof", "Ration Card", "Bank Passbook"],
    apply_at: "Gram Panchayat or Block Office",
  },
  {
    id: "TN_001", name: "Kalaignar Magalir Urimai Thogai", emoji: "👩",
    category: "women", color: "#e07b6a", state: "Tamil Nadu", isCentral: false,
    tagline: "₹1,000/month for every woman in Tamil Nadu",
    benefit: "₹1,000 every month straight to bank account",
    benefit_simple: "Every adult woman in Tamil Nadu gets ₹1,000 every month. Direct bank transfer.",
    eligibility: { gender: "female", state: "tamil_nadu", income_annual_max: 250000, age_min: 21 },
    requiredDocs: ["Aadhaar Card", "Bank Passbook", "Ration Card"],
    apply_at: "Nearest Ration Shop or e-Sevai Centre",
  },
  {
    id: "AP_001", name: "YSR Rythu Bharosa", emoji: "🚜",
    category: "farmer", color: "#c47a3a", state: "Andhra Pradesh", isCentral: false,
    tagline: "₹13,500/year for every AP farmer",
    benefit: "₹13,500 per year directly to farmers' bank accounts",
    benefit_simple: "Every AP farmer gets ₹13,500 every year. Goes directly to your bank.",
    eligibility: { occupation: "farmer", state: "andhra_pradesh" },
    requiredDocs: ["Aadhaar Card", "Land Records", "Bank Passbook", "Ration Card"],
    apply_at: "Village Secretariat or MeeSeva Centre",
  },
  {
    id: "TS_001", name: "Rythu Bandhu", emoji: "🌾",
    category: "farmer", color: "#8db87a", state: "Telangana", isCentral: false,
    tagline: "₹10,000 per acre per year for Telangana farmers",
    benefit: "₹5,000 per acre per season (₹10,000/year) for all farmers",
    benefit_simple: "Telangana farmers get ₹5,000 per acre before each crop season.",
    eligibility: { occupation: "farmer", state: "telangana" },
    requiredDocs: ["Aadhaar Card", "Land Records", "Bank Passbook"],
    apply_at: "Local Agriculture Office or Mee Seva Centre",
  },
  {
    id: "CN_004", name: "Ujjwala 2.0 — Free LPG", emoji: "🔥",
    category: "women", color: "#e08840", state: "Central", isCentral: true,
    tagline: "Free cooking gas connection for poor women",
    benefit: "Free LPG connection + first cylinder free",
    benefit_simple: "Women from poor families get a gas connection for free. No more firewood smoke.",
    eligibility: { gender: "female", income_annual_max: 200000 },
    requiredDocs: ["Aadhaar Card", "Ration Card", "Bank Passbook"],
    apply_at: "Nearest Gas Agency or CSC Centre",
  },
  {
    id: "CN_005", name: "PM Vishwakarma Yojana", emoji: "🔨",
    category: "artisan", color: "#b06840", state: "Central", isCentral: true,
    tagline: "Loan + tools + training for craftspeople",
    benefit: "₹3 lakh loan + free training + ₹15,000 for tools",
    benefit_simple: "Carpenters, potters, weavers get free training, ₹15,000 for tools, and ₹3L loan.",
    eligibility: { occupation: "artisan" },
    requiredDocs: ["Aadhaar Card", "Bank Passbook", "Trade Proof"],
    apply_at: "CSC Centre or PM Vishwakarma Portal",
  },
  {
    id: "AP_002", name: "YSR Cheyutha", emoji: "👩",
    category: "women", color: "#d4607a", state: "Andhra Pradesh", isCentral: false,
    tagline: "₹18,750/year for BC/SC/ST women in AP",
    benefit: "₹18,750 per year for women from BC, SC, ST communities",
    benefit_simple: "Women from backward and scheduled communities in AP get ₹18,750 every year.",
    eligibility: { gender: "female", state: "andhra_pradesh", age_min: 45, age_max: 60 },
    requiredDocs: ["Aadhaar Card", "Community Certificate", "Bank Passbook", "Age Proof"],
    apply_at: "Village Secretariat or MeeSeva Centre",
  },
];

/* ─────────────────────────────────────────────
   ELIGIBILITY ENGINE
───────────────────────────────────────────── */
function scoreScheme(scheme, profile) {
  const e = scheme.eligibility;
  const reasons = [];
  const misses = [];
  let score = 0;
  const maxScore = Object.keys(e).length || 1;

  const stateMap = {
    tamil_nadu: "Tamil Nadu",
    andhra_pradesh: "Andhra Pradesh",
    telangana: "Telangana",
  };

  if (e.gender) {
    if (e.gender === profile.gender) { score++; reasons.push("Gender matches eligibility"); }
    else misses.push(`Scheme is for ${e.gender === "female" ? "women" : "men"} only`);
  }
  if (e.state) {
    const stateLabel = stateMap[e.state] || e.state;
    if (profile.state === e.state || profile.state === stateLabel.toLowerCase().replace(/ /g,"_")) {
      score++; reasons.push(`Scheme is available in ${stateLabel}`);
    } else {
      misses.push(`Only for ${stateLabel} residents`);
    }
  }
  if (e.income_annual_max) {
    if (profile.income <= e.income_annual_max) { score++; reasons.push("Income is within the limit"); }
    else misses.push(`Income limit is ₹${(e.income_annual_max/100000).toFixed(1)}L`);
  }
  if (e.age_min) {
    if (profile.age >= e.age_min) { score++; reasons.push(`Age meets minimum requirement (${e.age_min}+)`); }
    else misses.push(`Minimum age required: ${e.age_min}`);
  }
  if (e.age_max) {
    if (profile.age <= e.age_max) { score++; }
    else misses.push(`Maximum age limit: ${e.age_max}`);
  }
  if (e.occupation) {
    if (profile.occupation === e.occupation) {
      score++;
      const labels = { farmer:"Farmer persona matches","agricultural_labourer":"Farm worker persona matches", artisan:"Artisan/craftsperson persona matches" };
      reasons.push(labels[e.occupation] || "Occupation matches scheme requirement");
    } else {
      misses.push(`Scheme is for ${e.occupation.replace(/_/g," ")}s only`);
    }
  }
  if (e.residence) {
    if (profile.residence === e.residence) { score++; reasons.push(`Scheme is for ${e.residence} area residents`); }
    else misses.push(`Scheme is for ${e.residence} residents`);
  }
  if (e.pregnant_or_new_mother) {
    if (profile.pregnant) { score++; reasons.push("Maternity status matches"); }
    else misses.push("Only for pregnant/new mothers");
  }

  const pct = misses.length === 0 ? 1 : score / (score + misses.length);
  const confidence = misses.length === 0 ? "High" : pct >= 0.6 ? "Possible" : "Low";
  const eligible = misses.length === 0;

  return { score: Math.round(pct * 100), confidence, eligible, reasons, misses };
}

function matchSchemes(profile, allSchemes) {
  return allSchemes
    .map((s) => ({ scheme: s, ...scoreScheme(s, profile) }))
    .filter((r) => r.score >= 40)
    .sort((a, b) => b.score - a.score);
}

/* ─────────────────────────────────────────────
   READINESS SCORE  (how many docs ready × matched)
───────────────────────────────────────────── */
function readinessScore(matches, uploadedDocIds = []) {
  if (!matches.length) return 0;
  const totalDocs = matches.reduce((acc, m) => acc + (m.scheme.requiredDocs?.length || 0), 0);
  if (!totalDocs) return 85;
  const coveredDocs = matches.reduce(
    (acc, m) =>
      acc + (m.scheme.requiredDocs?.filter((d) => uploadedDocIds.includes(d)).length || 0),
    0
  );
  return Math.min(95, Math.round(40 + (coveredDocs / totalDocs) * 55));
}

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const OCCUPATIONS = [
  { value: "farmer", label: "🌾 Farmer" },
  { value: "agricultural_labourer", label: "👐 Farm Worker / Labourer" },
  { value: "artisan", label: "🔨 Craftsperson / Artisan" },
  { value: "student", label: "🎓 Student" },
  { value: "homemaker", label: "🏠 Homemaker" },
  { value: "daily_wage", label: "⚒️ Daily Wage Worker" },
  { value: "other", label: "👤 Other" },
];

const STATES = [
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "telangana", label: "Telangana" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "other", label: "Other State" },
];

const PERSONA_ICONS = {
  farmer: "🌾", agricultural_labourer: "👐", artisan: "🔨",
  student: "🎓", homemaker: "🏠", daily_wage: "⚒️", other: "👤",
};

const CONFIDENCE_CONFIG = {
  High:     { bg: "#f0f4ea", text: "#606c38", border: "#c9d8a5", label: "High Match" },
  Possible: { bg: "#fff7df", text: "#bc6c25", border: "#f3d3a3", label: "Possible Match" },
  Low:      { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", label: "Partial Match" },
};

/* ─────────────────────────────────────────────
   LOCALSTORAGE HOOK
───────────────────────────────────────────── */
function useBeneficiaries() {
  const KEY = "schemepath_beneficiaries";

  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };

  const [list, setList] = useState(load);

  const save = useCallback((updated) => {
    setList(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }, []);

  const add = useCallback((profile) => {
    const entry = { ...profile, id: Date.now().toString(), createdAt: new Date().toISOString() };
    save([...list, entry]);
    return entry;
  }, [list, save]);

  const remove = useCallback((id) => {
    save(list.filter((b) => b.id !== id));
  }, [list, save]);

  const update = useCallback((id, patch) => {
    save(list.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }, [list, save]);

  return { list, add, remove, update };
}

/* ─────────────────────────────────────────────
   STYLES  (inline — no Tailwind dependency)
   We define a shared token set so the whole
   feature is visually consistent.
───────────────────────────────────────────── */
const T = {
  /* colours – align with YojanaGuru palette */
  saffron:   "#dda15e",   // primary accent
  saffronDk: "#bc6c25",   // deep accent
  saffronLt: "#fefae0",   // soft cream highlight
  green:     "#606c38",   // success/secondary
  greenLt:   "#f0f4ea",   // light green wash based on 606c38
  slate:     "#283618",   // primary text
  slateM:    "#3b4a29",   // medium text
  slateL:    "#8a9a6a",   // subtle text
  bg:        "#fefae0",   // page background
  card:      "#ffffff",
  border:    "#e8d0b0",
  /* radii */
  r12: "12px", r16: "16px", r20: "20px", r8: "8px", r6: "6px",
  /* shadows */
  shadow:    "0 4px 24px rgba(0,0,0,0.12)",
  shadowLg:  "0 8px 40px rgba(0,0,0,0.18)",
  /* fonts – reuse main app fonts */
  display: "'Baloo 2', sans-serif",
  body:    "'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
};

const globalCSS = `
  @keyframes sp-fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes sp-fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes sp-pop      { 0%{transform:scale(.92);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes sp-spin     { to { transform:rotate(360deg); } }
  @keyframes sp-pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes sp-slidein  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  .sp-fadeUp   { animation: sp-fadeUp  .4s ease both; }
  .sp-fadeIn   { animation: sp-fadeIn  .25s ease both; }
  .sp-pop      { animation: sp-pop     .35s cubic-bezier(.34,1.56,.64,1) both; }
  .sp-slidein  { animation: sp-slidein .35s cubic-bezier(.22,1,.36,1) both; }
  .sp-card:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(0,0,0,0.12) !important; }
  .sp-btn-ghost:hover  { background: ${T.saffronLt} !important; }
  .sp-btn-solid:hover  { filter: brightness(1.08); }
  .sp-input:focus { border-color: ${T.saffron} !important; box-shadow: 0 0 0 3px rgba(221,161,94,0.25) !important; }
  .sp-radio:checked + .sp-radio-label { background:${T.saffronLt}; border-color:${T.saffron}; }
  .sp-bcard:hover { border-color:${T.saffron} !important; }
  * { box-sizing: border-box; }
`;

/* ─────────────────────────────────────────────
   SMALL UI PRIMITIVES
───────────────────────────────────────────── */
function Badge({ text, type = "neutral" }) {
  const map = {
    neutral: { bg:"#f1f5f9", color:"#475569" },
    green:   { bg:T.greenLt, color:T.green },
    orange:  { bg:T.saffronLt, color:T.saffronDk },
    red:     { bg:"#fee2e2", color:"#991b1b" },
    blue:    { bg:"#dbeafe", color:"#1d4ed8" },
  };
  const s = map[type] || map.neutral;
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:11, fontWeight:600,
      padding:"3px 8px", borderRadius:20, whiteSpace:"nowrap", fontFamily:T.body }}>
      {text}
    </span>
  );
}

function ProgressRing({ pct, size = 52, stroke = 5, color = T.saffron }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round" style={{ transition:"stroke-dasharray .6s ease" }}/>
    </svg>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ padding:"6px 14px", borderRadius:30, fontSize:12, fontWeight:600, cursor:"pointer",
        border:`1.5px solid ${active ? T.saffron : T.border}`,
        background: active ? T.saffronLt : "#fff",
        color: active ? T.saffronDk : T.slateM,
        fontFamily: T.body, transition:"all .18s" }}>
      {children}
    </button>
  );
}

function IconBtn({ icon, label, onClick, variant = "ghost", style: extra }) {
  const base = {
    display:"flex", alignItems:"center", gap:6, padding:"8px 14px",
    borderRadius:T.r8, border:"none", cursor:"pointer", fontSize:13,
    fontWeight:600, fontFamily:T.body, transition:"all .18s", ...extra,
  };
  const variants = {
    ghost:  { background:"transparent", color:T.slateM },
    solid:  { background:T.saffron, color:"#fff" },
    danger: { background:"#fee2e2", color:"#991b1b" },
    green:  { background:T.green,   color:"#fff" },
    outline:{ background:"#fff", color:T.saffronDk, border:`2px solid ${T.saffron}` },
  };
  return (
    <button className={`sp-btn-${variant}`} style={{ ...base, ...variants[variant] }} onClick={onClick}>
      <span style={{ fontSize:15 }}>{icon}</span>{label}
    </button>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontFamily:T.display, fontSize:20, fontWeight:800, color:T.slate, margin:0 }}>{title}</h2>
      {sub && <p style={{ fontFamily:T.body, fontSize:13, color:T.slateM, margin:"4px 0 0" }}>{sub}</p>}
    </div>
  );
}

function Divider() {
  return <hr style={{ border:"none", borderTop:`1px solid ${T.border}`, margin:"20px 0" }}/>;
}

/* ─────────────────────────────────────────────
   SCORE RING + LABEL CARD
───────────────────────────────────────────── */
function ReadinessCard({ pct }) {
  const color = pct >= 70 ? T.green : pct >= 40 ? T.saffron : "#e05050";
  const label = pct >= 70 ? "Ready to Apply" : pct >= 40 ? "Needs More Docs" : "Early Stage";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ position:"relative", flexShrink:0 }}>
        <ProgressRing pct={pct} size={56} stroke={5} color={color}/>
        <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:12, fontWeight:800, color, fontFamily:T.display }}>
          {pct}%
        </span>
      </div>
      <div>
        <div style={{ fontSize:12, fontWeight:700, color, fontFamily:T.body }}>{label}</div>
        <div style={{ fontSize:11, color:T.slateL, fontFamily:T.body }}>Application Readiness</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BENEFICIARY CARD  (dashboard tile)
───────────────────────────────────────────── */
function BeneficiaryCard({ b, matches, readiness, onOpen, onDelete }) {
  const icon = PERSONA_ICONS[b.occupation] || "👤";
  const high = matches.filter((m) => m.confidence === "High").length;

  return (
    <div className="sp-card sp-pop" onClick={() => onOpen(b)}
      style={{ background:T.card, borderRadius:T.r16, border:`1.5px solid ${T.border}`,
        padding:"18px 16px", cursor:"pointer", transition:"all .22s",
        boxShadow:T.shadow, position:"relative" }}>

      {/* delete */}
      <button onClick={(e) => { e.stopPropagation(); onDelete(b.id); }}
        style={{ position:"absolute", top:10, right:10, background:"#fee2e2", border:"none",
          borderRadius:T.r6, width:26, height:26, fontSize:13, color:"#c03030",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        ×
      </button>

      {/* avatar row */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:46, height:46, borderRadius:"50%",
          background:`linear-gradient(135deg,${T.saffronLt},#ffe0c8)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
          flexShrink:0, border:`2px solid ${T.saffron}30` }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily:T.display, fontSize:16, fontWeight:800, color:T.slate,
            maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {b.name}
          </div>
          <div style={{ fontFamily:T.body, fontSize:12, color:T.slateM }}>
            Age {b.age} • {OCCUPATIONS.find(o=>o.value===b.occupation)?.label.replace(/^.* /,"") || b.occupation}
          </div>
        </div>
      </div>

      {/* stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
        <div style={{ background:T.saffronLt, borderRadius:T.r8, padding:"8px 10px",
          textAlign:"center" }}>
          <div style={{ fontFamily:T.display, fontSize:20, fontWeight:800, color:T.saffronDk }}>
            {matches.length}
          </div>
          <div style={{ fontFamily:T.body, fontSize:10, color:T.saffronDk, fontWeight:600 }}>
            Schemes Found
          </div>
        </div>
        <div style={{ background:T.greenLt, borderRadius:T.r8, padding:"8px 10px",
          textAlign:"center" }}>
          <div style={{ fontFamily:T.display, fontSize:20, fontWeight:800, color:T.green }}>
            {high}
          </div>
          <div style={{ fontFamily:T.body, fontSize:10, color:T.green, fontWeight:600 }}>
            High Matches
          </div>
        </div>
      </div>

      {/* readiness */}
      <ReadinessCard pct={readiness}/>

      {/* state badge */}
      <div style={{ marginTop:12 }}>
        <Badge text={STATES.find(s=>s.value===b.state)?.label || b.state} type="blue"/>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADD BENEFICIARY FORM
───────────────────────────────────────────── */
function AddBeneficiaryForm({ onAdd, onCancel }) {
  const empty = {
    name:"", age:"", gender:"", occupation:"", income:"", state:"",
    residence:"rural", disability:false, caste:"", education:"",
  };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.age || form.age < 1 || form.age > 120) e.age = "Enter a valid age";
    if (!form.gender) e.gender = "Select gender";
    if (!form.occupation) e.occupation = "Select occupation";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate2 = () => {
    const e = {};
    if (!form.income) e.income = "Select income range";
    if (!form.state) e.state = "Select state";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = () => { if (validate1()) setStep(2); };
  const handleSubmit = () => {
    if (!validate2()) return;
    onAdd({
      ...form,
      age: parseInt(form.age),
      income: parseInt(form.income),
    });
  };

  const inputStyle = {
    width:"100%", padding:"10px 12px", borderRadius:T.r8, fontFamily:T.body,
    fontSize:14, color:T.slate, background:"#fff",
    border:`1.5px solid ${T.border}`, outline:"none", transition:"all .18s",
  };
  const labelStyle = {
    display:"block", fontFamily:T.body, fontSize:13, fontWeight:600,
    color:T.slateM, marginBottom:5,
  };
  const errStyle = { fontFamily:T.body, fontSize:11, color:"#ef4444", marginTop:3 };

  return (
    <div style={{ background:T.bg, minHeight:"100vh", padding:"0 0 80px" }}>
      <style>{globalCSS}</style>
      <FontLink/>

      {/* top bar */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${T.border}`,
        padding:"14px 20px", display:"flex", alignItems:"center", gap:12,
        position:"sticky", top:0, zIndex:50 }}>
        <button onClick={onCancel}
          style={{ background:"none", border:"none", fontSize:20, cursor:"pointer",
            color:T.slateM, display:"flex", alignItems:"center" }}>
          ←
        </button>
        <div>
          <div style={{ fontFamily:T.display, fontSize:17, fontWeight:800, color:T.slate }}>
            Add Beneficiary
          </div>
          <div style={{ fontFamily:T.body, fontSize:12, color:T.slateM }}>
            Step {step} of 2
          </div>
        </div>
      </div>

      {/* step indicator */}
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ display:"flex", gap:6, marginBottom:20 }}>
          {[1,2].map(s=>(
            <div key={s} style={{ flex:1, height:4, borderRadius:4,
              background: step >= s ? T.saffron : T.border,
              transition:"background .3s" }}/>
          ))}
        </div>

        {step === 1 && (
          <div className="sp-fadeUp">
            <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
              borderRadius:T.r16, padding:"18px 20px", marginBottom:22, color:"#fff" }}>
              <div style={{ fontFamily:T.display, fontSize:17, fontWeight:800 }}>Personal Details</div>
              <div style={{ fontFamily:T.body, fontSize:13, opacity:.85, marginTop:2 }}>
                Basic information about the beneficiary
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Full Name *</label>
              <input className="sp-input" style={inputStyle} value={form.name}
                onChange={e=>set("name",e.target.value)}
                placeholder="e.g. Lakshmi Devi"/>
              {errors.name && <div style={errStyle}>{errors.name}</div>}
            </div>

            {/* Age */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Age *</label>
              <input className="sp-input" style={inputStyle} type="number" value={form.age}
                onChange={e=>set("age",e.target.value)} min={1} max={120}
                placeholder="e.g. 45"/>
              {errors.age && <div style={errStyle}>{errors.age}</div>}
            </div>

            {/* Gender */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Gender *</label>
              <div style={{ display:"flex", gap:10 }}>
                {[["female","👩 Female"],["male","👨 Male"]].map(([v,l])=>(
                  <label key={v} style={{ flex:1, display:"block", cursor:"pointer" }}>
                    <input type="radio" className="sp-radio" name="gender" value={v}
                      checked={form.gender===v} onChange={()=>set("gender",v)}
                      style={{ display:"none" }}/>
                    <div className="sp-radio-label" style={{
                      padding:"10px 12px", borderRadius:T.r8, textAlign:"center",
                      border:`1.5px solid ${form.gender===v ? T.saffron : T.border}`,
                      background: form.gender===v ? T.saffronLt : "#fff",
                      fontFamily:T.body, fontSize:14, fontWeight:600,
                      color: form.gender===v ? T.saffronDk : T.slateM,
                      transition:"all .18s",
                    }}>{l}</div>
                  </label>
                ))}
              </div>
              {errors.gender && <div style={errStyle}>{errors.gender}</div>}
            </div>

            {/* Occupation */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Occupation / Persona *</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {OCCUPATIONS.map(o=>(
                  <label key={o.value} style={{ cursor:"pointer" }}>
                    <input type="radio" name="occ" value={o.value}
                      checked={form.occupation===o.value} onChange={()=>set("occupation",o.value)}
                      style={{ display:"none" }}/>
                    <div style={{
                      padding:"9px 10px", borderRadius:T.r8, textAlign:"center",
                      border:`1.5px solid ${form.occupation===o.value ? T.saffron : T.border}`,
                      background: form.occupation===o.value ? T.saffronLt : "#fff",
                      fontFamily:T.body, fontSize:12, fontWeight:600,
                      color: form.occupation===o.value ? T.saffronDk : T.slateM,
                      transition:"all .18s",
                    }}>{o.label}</div>
                  </label>
                ))}
              </div>
              {errors.occupation && <div style={errStyle}>{errors.occupation}</div>}
            </div>

            <button className="sp-btn-solid" onClick={handleNext}
              style={{ width:"100%", padding:"14px", borderRadius:T.r12,
                background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
                color:"#fff", border:"none", fontFamily:T.display,
                fontSize:16, fontWeight:800, cursor:"pointer", marginTop:8 }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="sp-fadeUp">
            <div style={{ background:`linear-gradient(135deg,${T.green},#1a5c37)`,
              borderRadius:T.r16, padding:"18px 20px", marginBottom:22, color:"#fff" }}>
              <div style={{ fontFamily:T.display, fontSize:17, fontWeight:800 }}>Eligibility Details</div>
              <div style={{ fontFamily:T.body, fontSize:13, opacity:.85, marginTop:2 }}>
                Income, location & special categories
              </div>
            </div>

            {/* Income */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Annual Household Income *</label>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {[
                  [80000,  "Below ₹1 Lakh (BPL)"],
                  [150000, "₹1 – ₹2 Lakh"],
                  [350000, "₹2 – ₹5 Lakh"],
                  [600000, "Above ₹5 Lakh"],
                ].map(([v,l])=>(
                  <label key={v} style={{ cursor:"pointer", display:"flex",
                    alignItems:"center", gap:10, padding:"10px 12px", borderRadius:T.r8,
                    border:`1.5px solid ${form.income==v ? T.saffron : T.border}`,
                    background: form.income==v ? T.saffronLt : "#fff",
                    transition:"all .18s" }}>
                    <input type="radio" name="income" value={v}
                      checked={form.income==v} onChange={()=>set("income",v)}
                      style={{ accentColor:T.saffron }}/>
                    <span style={{ fontFamily:T.body, fontSize:13, fontWeight:600,
                      color: form.income==v ? T.saffronDk : T.slateM }}>{l}</span>
                  </label>
                ))}
              </div>
              {errors.income && <div style={errStyle}>{errors.income}</div>}
            </div>

            {/* State */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>State *</label>
              <select className="sp-input" style={inputStyle} value={form.state}
                onChange={e=>set("state",e.target.value)}>
                <option value="">Select state…</option>
                {STATES.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.state && <div style={errStyle}>{errors.state}</div>}
            </div>

            {/* Residence */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Area of Residence</label>
              <div style={{ display:"flex", gap:10 }}>
                {[["rural","🌾 Village / Rural"],["urban","🏙️ Town / City"]].map(([v,l])=>(
                  <label key={v} style={{ flex:1, cursor:"pointer" }}>
                    <input type="radio" name="res" value={v} checked={form.residence===v}
                      onChange={()=>set("residence",v)} style={{ display:"none" }}/>
                    <div style={{
                      padding:"9px 10px", borderRadius:T.r8, textAlign:"center",
                      border:`1.5px solid ${form.residence===v ? T.green : T.border}`,
                      background: form.residence===v ? T.greenLt : "#fff",
                      fontFamily:T.body, fontSize:12, fontWeight:600,
                      color: form.residence===v ? T.green : T.slateM,
                      transition:"all .18s",
                    }}>{l}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Caste */}
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Caste Category <span style={{color:T.slateL}}>(optional)</span></label>
              <select className="sp-input" style={inputStyle} value={form.caste}
                onChange={e=>set("caste",e.target.value)}>
                <option value="">Select…</option>
                {[["sc","SC (Scheduled Caste)"],["st","ST (Scheduled Tribe)"],
                  ["bc","BC / OBC"],["minority","Minority"],["general","General"]].map(([v,l])=>(
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            {/* Disability */}
            <div style={{ marginBottom:16 }}>
              <label style={{ ...labelStyle, display:"flex", alignItems:"center", gap:10,
                cursor:"pointer" }}>
                <input type="checkbox" checked={form.disability}
                  onChange={e=>set("disability",e.target.checked)}
                  style={{ width:18, height:18, accentColor:T.saffron }}/>
                <span>Has a disability / differently abled</span>
              </label>
            </div>

            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <button onClick={()=>setStep(1)}
                style={{ flex:1, padding:"13px", borderRadius:T.r12,
                  background:"#fff", color:T.slateM, border:`1.5px solid ${T.border}`,
                  fontFamily:T.display, fontSize:15, fontWeight:700, cursor:"pointer" }}>
                ← Back
              </button>
              <button className="sp-btn-solid" onClick={handleSubmit}
                style={{ flex:2, padding:"13px", borderRadius:T.r12,
                  background:`linear-gradient(135deg,${T.green},#1a5c37)`,
                  color:"#fff", border:"none", fontFamily:T.display,
                  fontSize:15, fontWeight:800, cursor:"pointer" }}>
                ✓ Save Beneficiary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BENEFICIARY DETAIL VIEW
───────────────────────────────────────────── */
function BeneficiaryDetail({ b, allSchemes, onBack, onDelete }) {
  const matches = matchSchemes(b, allSchemes);
  const readiness = readinessScore(matches);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedScheme, setExpandedScheme] = useState(null);

  const filters = ["All", "High", "Possible", "Low"];
  const filtered = activeFilter === "All"
    ? matches
    : matches.filter(m => m.confidence === activeFilter);

  const allDocs = [...new Set(matches.flatMap(m => m.scheme.requiredDocs || []))];
  const icon = PERSONA_ICONS[b.occupation] || "👤";

  return (
    <div style={{ background:T.bg, minHeight:"100vh", paddingBottom:80 }}>
      <style>{globalCSS}</style>
      <FontLink/>

      {/* sticky header */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${T.border}`,
        padding:"12px 20px", position:"sticky", top:0, zIndex:50,
        display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack}
          style={{ background:"none", border:"none", fontSize:20, cursor:"pointer",
            color:T.slateM, display:"flex", alignItems:"center" }}>
          ←
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:T.display, fontSize:17, fontWeight:800, color:T.slate }}>
            {b.name}
          </div>
          <div style={{ fontFamily:T.body, fontSize:12, color:T.slateM }}>
            Beneficiary Profile
          </div>
        </div>
        <button onClick={()=>{ if(window.confirm(`Remove ${b.name}?`)){ onDelete(b.id); onBack(); }}}
          style={{ background:"#fee2e2", border:"none", borderRadius:T.r8,
            padding:"7px 12px", color:"#991b1b", fontFamily:T.body,
            fontSize:12, fontWeight:600, cursor:"pointer" }}>
          🗑 Remove
        </button>
      </div>

      <div style={{ padding:"20px" }}>

        {/* ── Profile Summary ── */}
        <div className="sp-pop" style={{ background:`linear-gradient(135deg,${T.slate},#334155)`,
          borderRadius:T.r20, padding:"22px 20px", marginBottom:20, color:"#fff" }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:18 }}>
            <div style={{ width:56, height:56, borderRadius:"50%",
              background:"rgba(255,255,255,0.15)", backdropFilter:"blur(4px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:26, flexShrink:0, border:"2px solid rgba(255,255,255,.25)" }}>
              {icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:T.display, fontSize:22, fontWeight:800 }}>{b.name}</div>
              <div style={{ fontFamily:T.body, fontSize:13, opacity:.75, marginTop:2 }}>
                {OCCUPATIONS.find(o=>o.value===b.occupation)?.label} •{" "}
                {STATES.find(s=>s.value===b.state)?.label}
              </div>
            </div>
          </div>

          {/* stats pills */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {[
              ["🎂", "Age", b.age],
              ["💰", "Income", b.income <= 100000 ? "< ₹1L" : b.income <= 200000 ? "< ₹2L" : b.income <= 350000 ? "< ₹3.5L" : "> ₹5L"],
              ["🏘️", "Area", b.residence === "rural" ? "Rural" : "Urban"],
            ].map(([ico,lbl,val])=>(
              <div key={lbl} style={{ background:"rgba(255,255,255,0.12)", borderRadius:T.r12,
                padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{ico}</div>
                <div style={{ fontFamily:T.body, fontSize:10, opacity:.65, marginBottom:2 }}>{lbl}</div>
                <div style={{ fontFamily:T.display, fontSize:14, fontWeight:800 }}>{val}</div>
              </div>
            ))}
          </div>

          {b.disability && (
            <div style={{ marginTop:12, background:"rgba(255,255,255,.1)", borderRadius:T.r8,
              padding:"8px 12px", fontFamily:T.body, fontSize:12, display:"flex", gap:6 }}>
              ♿ <span>Differently abled — disability schemes included</span>
            </div>
          )}
        </div>

        {/* ── Readiness Summary ── */}
        <div className="sp-pop" style={{ background:T.card, borderRadius:T.r16,
          border:`1.5px solid ${T.border}`, padding:"16px 18px", marginBottom:20,
          display:"flex", alignItems:"center", gap:16 }}>
          <ReadinessCard pct={readiness}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.display, fontSize:16, fontWeight:800, color:T.slate }}>
              {matches.length} Schemes Found
            </div>
            <div style={{ fontFamily:T.body, fontSize:12, color:T.slateM, marginTop:2 }}>
              {matches.filter(m=>m.confidence==="High").length} high •{" "}
              {matches.filter(m=>m.confidence==="Possible").length} possible •{" "}
              {matches.filter(m=>m.confidence==="Low").length} partial
            </div>
          </div>
        </div>

        {/* ── Matched Schemes ── */}
        <SectionHeader
          title="Matched Schemes"
          sub="Schemes this beneficiary may qualify for"/>

        {/* filter chips */}
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
          {filters.map(f=>(
            <Chip key={f} active={activeFilter===f} onClick={()=>setActiveFilter(f)}>
              {f}
              {f==="All" ? ` (${matches.length})` :
               f==="High" ? ` (${matches.filter(m=>m.confidence==="High").length})` :
               f==="Possible" ? ` (${matches.filter(m=>m.confidence==="Possible").length})` :
               ` (${matches.filter(m=>m.confidence==="Low").length})`}
            </Chip>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ background:T.card, borderRadius:T.r16, padding:"40px 20px",
            textAlign:"center", color:T.slateM, fontFamily:T.body }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
            No schemes in this category.
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {filtered.map((m) => {
            const cfg = CONFIDENCE_CONFIG[m.confidence];
            const isExpanded = expandedScheme === m.scheme.id;
            return (
              <div key={m.scheme.id} className="sp-pop"
                style={{ background:T.card, borderRadius:T.r16,
                  border:`1.5px solid ${isExpanded ? T.saffron : T.border}`,
                  overflow:"hidden", transition:"border-color .2s" }}>

                {/* scheme header — always visible */}
                <div style={{ padding:"16px 16px 14px", cursor:"pointer" }}
                  onClick={()=>setExpandedScheme(isExpanded ? null : m.scheme.id)}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
                      background:`${m.scheme.color}18`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:22, border:`1.5px solid ${m.scheme.color}30` }}>
                      {m.scheme.emoji}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:T.display, fontSize:15, fontWeight:800,
                        color:T.slate, lineHeight:1.3 }}>
                        {m.scheme.name}
                      </div>
                      <div style={{ fontFamily:T.body, fontSize:12, color:T.slateM, marginTop:2 }}>
                        {m.scheme.tagline}
                      </div>
                    </div>
                  </div>

                  {/* score + confidence bar */}
                  <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ flex:1, height:6, background:"#f1f5f9",
                      borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:4, width:`${m.score}%`,
                        background: m.confidence==="High" ? T.green :
                                    m.confidence==="Possible" ? T.saffron : "#ef4444",
                        transition:"width .5s ease" }}/>
                    </div>
                    <div style={{ background:cfg.bg, color:cfg.text,
                      border:`1px solid ${cfg.border}`, borderRadius:20,
                      padding:"3px 10px", fontSize:11, fontWeight:700,
                      fontFamily:T.body, whiteSpace:"nowrap" }}>
                      {cfg.label} • {m.score}%
                    </div>
                  </div>

                  <div style={{ marginTop:8, fontFamily:T.body, fontSize:11,
                    color:T.slateL, textAlign:"right" }}>
                    {isExpanded ? "▲ Collapse" : "▼ See details"}
                  </div>
                </div>

                {/* expanded detail */}
                {isExpanded && (
                  <div className="sp-fadeIn" style={{ borderTop:`1px solid ${T.border}` }}>

                    {/* benefit */}
                    <div style={{ padding:"14px 16px",
                      background:`linear-gradient(135deg,${m.scheme.color}10,${m.scheme.color}05)` }}>
                      <div style={{ fontFamily:T.body, fontSize:11, fontWeight:700,
                        color:T.slateM, textTransform:"uppercase", letterSpacing:.5, marginBottom:6 }}>
                        🎁 What They Get
                      </div>
                      <div style={{ fontFamily:T.body, fontSize:14, color:T.slate,
                        lineHeight:1.6, fontWeight:500 }}>
                        {m.scheme.benefit_simple}
                      </div>
                    </div>

                    <Divider/>

                    {/* why this scheme */}
                    <div style={{ padding:"0 16px 14px" }}>
                      <div style={{ fontFamily:T.body, fontSize:11, fontWeight:700,
                        color:T.slateM, textTransform:"uppercase", letterSpacing:.5, marginBottom:10 }}>
                        💡 Why Am I Seeing This?
                      </div>
                      {m.reasons.map((r, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8,
                          marginBottom:6, padding:"7px 10px", background:T.greenLt,
                          borderRadius:T.r8, borderLeft:`3px solid ${T.green}` }}>
                          <span style={{ color:T.green, flexShrink:0, marginTop:1 }}>✓</span>
                          <span style={{ fontFamily:T.body, fontSize:13, color:T.green }}>
                            {r}
                          </span>
                        </div>
                      ))}
                      {m.misses.map((r, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8,
                          marginBottom:6, padding:"7px 10px", background:"#fff5f5",
                          borderRadius:T.r8, borderLeft:"3px solid #fca5a5" }}>
                          <span style={{ color:"#ef4444", flexShrink:0, marginTop:1 }}>✗</span>
                          <span style={{ fontFamily:T.body, fontSize:13, color:"#991b1b" }}>
                            {r}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Divider/>

                    {/* documents */}
                    <div style={{ padding:"0 16px 16px" }}>
                      <div style={{ fontFamily:T.body, fontSize:11, fontWeight:700,
                        color:T.slateM, textTransform:"uppercase", letterSpacing:.5, marginBottom:10 }}>
                        📋 Documents Required
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                        {(m.scheme.requiredDocs || []).map((d, i) => (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:7,
                            background:"#f8f5f0", borderRadius:T.r8, padding:"7px 9px" }}>
                            <span style={{ fontSize:14 }}>📄</span>
                            <span style={{ fontFamily:T.body, fontSize:12,
                              color:T.slateM, fontWeight:500 }}>{d}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:12, background:"#edf4ff", borderRadius:T.r8,
                        padding:"10px 12px", fontFamily:T.body, fontSize:12, color:"#1d4ed8" }}>
                        📍 Apply at: {m.scheme.apply_at}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Master Document Checklist ── */}
        {allDocs.length > 0 && (
          <>
            <div style={{ marginTop:28 }}>
              <SectionHeader
                title="Documents Checklist"
                sub="All documents needed across all matched schemes"/>
              <div style={{ background:T.card, borderRadius:T.r16, border:`1.5px solid ${T.border}`,
                padding:"16px", display:"flex", flexDirection:"column", gap:9 }}>
                {allDocs.map((d, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
                    padding:"10px 12px", background:"#f8f5f0", borderRadius:T.r8 }}>
                    <div style={{ width:28, height:28, background:T.saffronLt,
                      borderRadius:T.r6, display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:14, flexShrink:0 }}>
                      📄
                    </div>
                    <span style={{ fontFamily:T.body, fontSize:14,
                      color:T.slate, fontWeight:500 }}>{d}</span>
                    <span style={{ marginLeft:"auto", fontFamily:T.body,
                      fontSize:11, color:T.slateL }}>Required</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action strip */}
            <div style={{ marginTop:16, background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
              borderRadius:T.r16, padding:"18px 20px", color:"#fff",
              display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ fontSize:36 }}>📤</div>
              <div>
                <div style={{ fontFamily:T.display, fontSize:15, fontWeight:800 }}>
                  Ready to Submit?
                </div>
                <div style={{ fontFamily:T.body, fontSize:12, opacity:.85, marginTop:2 }}>
                  Help {b.name} collect the {allDocs.length} documents above,
                  then visit the nearest help centre to apply.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HELPER DASHBOARD
───────────────────────────────────────────── */
function HelperDashboard({ beneficiaries, onAdd, onOpen, onDelete, onExit, allSchemes }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | schemes | readiness

  const enriched = beneficiaries.map(b => {
    const matches = matchSchemes(b, allSchemes);
    const readiness = readinessScore(matches);
    return { b, matches, readiness };
  });

  const filtered = enriched
    .filter(({ b }) => b.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, z) => {
      if (sortBy === "schemes")   return z.matches.length - a.matches.length;
      if (sortBy === "readiness") return z.readiness - a.readiness;
      return new Date(z.b.createdAt) - new Date(a.b.createdAt);
    });

  const totalSchemes = enriched.reduce((acc, { matches }) => acc + matches.length, 0);
  const avgReadiness = enriched.length
    ? Math.round(enriched.reduce((acc, { readiness }) => acc + readiness, 0) / enriched.length)
    : 0;

  return (
    <div style={{ background:T.bg, minHeight:"100vh", paddingBottom:80 }}>
      <style>{globalCSS}</style>
      <FontLink/>

      {/* ── Top Bar ── */}
      <div style={{ background:`linear-gradient(135deg,${T.green},#1a5c37)`,
        padding:"18px 20px 22px", position:"relative", overflow:"hidden" }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", right:-40, top:-40, width:160, height:160,
          borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"absolute", right:40, bottom:-60, width:120, height:120,
          borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>

        <div style={{ display:"flex", alignItems:"flex-start",
          justifyContent:"space-between", marginBottom:14, position:"relative" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:T.r8,
                padding:"4px 10px", fontFamily:T.body, fontSize:11, fontWeight:700, color:"#fff" }}>
                🤝 VILLAGE HELPER MODE
              </div>
            </div>
            <div style={{ fontFamily:T.display, fontSize:22, fontWeight:800, color:"#fff",
              lineHeight:1.2 }}>
              Helper Dashboard
            </div>
            <div style={{ fontFamily:T.body, fontSize:13, color:"rgba(255,255,255,.75)",
              marginTop:3 }}>
              Helping others discover government benefits
            </div>
          </div>
          <button onClick={onExit}
            style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,.3)",
              borderRadius:T.r8, padding:"8px 12px", color:"#fff", fontFamily:T.body,
              fontSize:12, fontWeight:600, cursor:"pointer", flexShrink:0 }}>
            Exit Mode
          </button>
        </div>

        {/* summary stats */}
        {beneficiaries.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10,
            background:"rgba(255,255,255,0.1)", borderRadius:T.r12, padding:"12px 14px" }}>
            {[
              ["👥", beneficiaries.length, "Beneficiaries"],
              ["📋", totalSchemes, "Total Schemes"],
              ["📊", `${avgReadiness}%`, "Avg Readiness"],
            ].map(([ico,val,lbl])=>(
              <div key={lbl} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:3 }}>{ico}</div>
                <div style={{ fontFamily:T.display, fontSize:20, fontWeight:800, color:"#fff" }}>
                  {val}
                </div>
                <div style={{ fontFamily:T.body, fontSize:10, color:"rgba(255,255,255,.65)" }}>
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding:"20px" }}>

        {/* ── Search + Sort + Add ── */}
        <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"center" }}>
          <div style={{ flex:1, position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%",
              transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search beneficiaries…"
              style={{ width:"100%", padding:"10px 12px 10px 36px",
                borderRadius:T.r8, border:`1.5px solid ${T.border}`,
                fontFamily:T.body, fontSize:14, color:T.slate,
                background:"#fff", outline:"none" }}/>
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            style={{ padding:"10px 10px", borderRadius:T.r8, border:`1.5px solid ${T.border}`,
              fontFamily:T.body, fontSize:12, color:T.slateM, background:"#fff",
              outline:"none", flexShrink:0 }}>
            <option value="newest">Newest</option>
            <option value="schemes">Schemes ↓</option>
            <option value="readiness">Readiness ↓</option>
          </select>
        </div>

        {/* ── Add CTA ── */}
        <button className="sp-btn-solid" onClick={onAdd}
          style={{ width:"100%", padding:"14px", borderRadius:T.r12, marginBottom:20,
            background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
            color:"#fff", border:"none", fontFamily:T.display, fontSize:16,
            fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center",
            justifyContent:"center", gap:8, boxShadow:`0 4px 20px ${T.saffron}50` }}>
          <span style={{ fontSize:20 }}>+</span> Add New Beneficiary
        </button>

        {/* ── Empty State ── */}
        {beneficiaries.length === 0 && (
          <div style={{ textAlign:"center", padding:"50px 20px",
            background:T.card, borderRadius:T.r20, border:`1.5px dashed ${T.border}` }}>
            <div style={{ fontSize:56, marginBottom:14 }}>🤝</div>
            <div style={{ fontFamily:T.display, fontSize:20, fontWeight:800,
              color:T.slate, marginBottom:8 }}>
              No beneficiaries yet
            </div>
            <div style={{ fontFamily:T.body, fontSize:14, color:T.slateM,
              lineHeight:1.6, maxWidth:280, margin:"0 auto 20px" }}>
              Add your first beneficiary to start checking their scheme eligibility
            </div>
            <button className="sp-btn-solid" onClick={onAdd}
              style={{ padding:"12px 24px", borderRadius:T.r12,
                background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
                color:"#fff", border:"none", fontFamily:T.display,
                fontSize:15, fontWeight:800, cursor:"pointer" }}>
              + Add First Beneficiary
            </button>
          </div>
        )}

        {/* ── Beneficiary Grid ── */}
        <div style={{ display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
          {filtered.map(({ b, matches, readiness }) => (
            <BeneficiaryCard
              key={b.id} b={b} matches={matches} readiness={readiness}
              onOpen={onOpen} onDelete={onDelete}/>
          ))}
        </div>

        {/* helper tips */}
        {beneficiaries.length > 0 && (
          <div style={{ marginTop:24, background:T.card, borderRadius:T.r16,
            border:`1.5px solid ${T.border}`, padding:"16px 18px" }}>
            <div style={{ fontFamily:T.display, fontSize:14, fontWeight:800,
              color:T.slate, marginBottom:10 }}>
              💡 Helper Tips
            </div>
            {[
              "Tap any card to view matched schemes and document checklist",
              "Sort by 'Readiness' to prioritize who is most ready to apply",
              "All profiles are saved locally — no internet needed after load",
              "Share this session by bookmarking on any device",
            ].map((tip, i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:7,
                fontFamily:T.body, fontSize:13, color:T.slateM }}>
                <span style={{ color:T.saffron, flexShrink:0 }}>→</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MODE SELECTOR  (landing page overlay)
───────────────────────────────────────────── */
export function ModeSelector({ onSelect }) {
  const modes = [
    {
      id: "self",
      icon: "👤",
      title: "Check for Myself",
      desc: "I want to find schemes that I personally qualify for",
      color: T.saffron,
      bg: T.saffronLt,
      border: `${T.saffron}60`,
    },
    {
      id: "helper",
      icon: "🤝",
      title: "Help Someone Else",
      subtitle: "Village Helper Mode",
      desc: "I'm an NGO worker, volunteer, teacher or CSC operator helping multiple people",
      color: T.green,
      bg: T.greenLt,
      border: `${T.green}60`,
      badge: "HELPER MODE",
    },
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex",
      flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"24px 20px", fontFamily:T.body }}>
      <style>{globalCSS}</style>
      <FontLink/>

      {/* logo – match YojanaGuru login branding */}
      <div className="sp-fadeUp" style={{ textAlign:"center", marginBottom:32 }}>
      <div style={{ width:70, height:70, borderRadius:"50%", margin:"0 auto 16px",
          background:`linear-gradient(135deg,${T.saffron},${T.saffronDk})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:34, boxShadow:`0 8px 30px ${T.saffron}40` }}>
          🏛️
        </div>
        <div style={{ fontFamily:T.display, fontSize:26, fontWeight:800, color:T.slate }}>
          YojanaGuru
        </div>
        <div style={{ fontFamily:T.body, fontSize:14, color:T.slateM, marginTop:4 }}>
          Village Helper Mode for government schemes
        </div>
      </div>

      <div className="sp-fadeUp" style={{ width:"100%", maxWidth:440 }}>
        <div style={{ fontFamily:T.display, fontSize:20, fontWeight:800, color:T.slate,
          textAlign:"center", marginBottom:6 }}>
          How do you want to use YojanaGuru today?
        </div>
        <div style={{ fontFamily:T.body, fontSize:14, color:T.slateM,
          textAlign:"center", marginBottom:24 }}>
          Choose the mode that best describes you
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {modes.map((m) => (
            <button key={m.id} onClick={() => onSelect(m.id)}
              style={{ width:"100%", textAlign:"left", cursor:"pointer",
                background:"#fff", borderRadius:T.r20, padding:"20px 20px",
                border:`2px solid ${m.border}`,
                boxShadow:`0 4px 20px rgba(0,0,0,0.07)`,
                transition:"all .22s", outline:"none" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 30px rgba(0,0,0,0.12)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,0.07)`; }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:14, flexShrink:0,
                  background:m.bg, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:26, border:`2px solid ${m.border}` }}>
                  {m.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                    <span style={{ fontFamily:T.display, fontSize:17, fontWeight:800,
                      color:T.slate }}>
                      {m.title}
                    </span>
                    {m.badge && (
                      <span style={{ background:T.greenLt, color:T.green, fontSize:10,
                        fontWeight:700, padding:"2px 8px", borderRadius:20,
                        border:`1px solid ${T.green}40` }}>
                        {m.badge}
                      </span>
                    )}
                  </div>
                  {m.subtitle && (
                    <div style={{ fontFamily:T.body, fontSize:12, color:m.color,
                      fontWeight:600, marginBottom:3 }}>
                      {m.subtitle}
                    </div>
                  )}
                  <div style={{ fontFamily:T.body, fontSize:13, color:T.slateM,
                    lineHeight:1.5 }}>
                    {m.desc}
                  </div>
                </div>
                <div style={{ fontSize:20, color:m.color, flexShrink:0, marginTop:4 }}>→</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:20,
          fontFamily:T.body, fontSize:12, color:T.slateL }}>
          🔒 All data stays on your device • No account required
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT — VillageHelperMode
───────────────────────────────────────────── */
export function VillageHelperMode({ onExit, schemes }) {
  const allSchemes = schemes?.length ? schemes : FALLBACK_SCHEMES;
  const { list, add, remove } = useBeneficiaries();

  // view: 'dashboard' | 'add' | 'detail'
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(null);

  // #region agent log
  useEffect(() => {
    try {
      fetch('http://127.0.0.1:7427/ingest/87bdb28e-6c37-43c7-a4d7-6fff7ddf12aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '81b0af',
        },
        body: JSON.stringify({
          sessionId: '81b0af',
          runId: 'palette-check',
          hypothesisId: 'H1',
          location: 'VillageHelperMode.jsx:1444',
          message: 'VillageHelperMode palette tokens at mount',
          data: {
            saffron: T.saffron,
            saffronDk: T.saffronDk,
            green: T.green,
            slate: T.slate,
            bg: T.bg,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    } catch {}
  }, []);
  // #endregion agent log

  const handleAdd = (profile) => {
    add(profile);
    setView("dashboard");
  };

  const handleOpen = (b) => {
    setSelected(b);
    setView("detail");
    window.scrollTo(0, 0);
  };

  if (view === "add") {
    return (
      <AddBeneficiaryForm
        onAdd={handleAdd}
        onCancel={() => setView("dashboard")}/>
    );
  }

  if (view === "detail" && selected) {
    // refresh selected from list (in case updated)
    const fresh = list.find(b => b.id === selected.id) || selected;
    return (
      <BeneficiaryDetail
        b={fresh}
        allSchemes={allSchemes}
        onBack={() => { setView("dashboard"); setSelected(null); }}
        onDelete={(id) => { remove(id); setView("dashboard"); setSelected(null); }}/>
    );
  }

  return (
    <HelperDashboard
      beneficiaries={list}
      allSchemes={allSchemes}
      onAdd={() => setView("add")}
      onOpen={handleOpen}
      onDelete={remove}
      onExit={onExit}/>
  );
}

/* ─────────────────────────────────────────────
   STANDALONE DEMO  (default export)
   Run this file directly as a standalone app
   to demo Village Helper Mode without the
   rest of SchemePath.
───────────────────────────────────────────── */
export default function VillageHelperDemo() {
  const [mode, setMode] = useState(null); // null | 'self' | 'helper'

  if (!mode) {
    return <ModeSelector onSelect={setMode}/>;
  }

  if (mode === "helper") {
    return <VillageHelperMode onExit={() => setMode(null)} schemes={FALLBACK_SCHEMES}/>;
  }

  // 'self' mode — placeholder (in real app, this renders your existing app)
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", background:"#f8f5f0", padding:20, fontFamily:"sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🏛️</div>
        <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:22, marginBottom:8 }}>
          Personal Mode
        </h2>
        <p style={{ color:"#64748b", marginBottom:20 }}>
          This is where your existing SchemePath app renders.
          <br/>Village Helper Mode is a separate flow layered on top.
        </p>
        <button onClick={() => setMode(null)}
          style={{ padding:"10px 24px", borderRadius:12, background:"#e07b30",
            color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer" }}>
          ← Back to Mode Selection
        </button>
      </div>
    </div>
  );
}
