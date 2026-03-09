// ── LOGIN + PROFILE PROTECTION ──

// get stored login + profile
const userId = localStorage.getItem("userId");
const profile = localStorage.getItem("profile");

const page = window.location.pathname;

// not logged in → login page
if (!userId && !page.includes("login")) {
  window.location = "login.html";
}

// logged in but profile missing → profile page
if (userId && !profile && !page.includes("profile")) {
  window.location = "profile.html";
}

const profileData = JSON.parse(localStorage.getItem("profile") || "{}");

// ── DATA ──────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "supps", icon: "💊", label: "Supps" },
  { key: "gym", icon: "🏋️", label: "Gym" },
  { key: "sleep", icon: "😴", label: "Sleep" },
  { key: "water", icon: "💧", label: "Water" },
  { key: "food", icon: "🍱", label: "Food" },
  { key: "study", icon: "💻", label: "Study" },
  { key: "sched", icon: "📋", label: "Plan" },
  { key: "notes", icon: "📝", label: "Notes" },
  { key: "data", icon: "⚙️", label: "Data" },
];

const SUPPS = [
  {
    key: "shilajit",
    label: "Shilajit",
    time: "6:10 am",
    color: "#F59E0B",
    warn: null,
  },
  {
    key: "ash_am",
    label: "Ashwagandha AM",
    time: "6:10 am",
    color: "#10B981",
    warn: null,
  },
  {
    key: "whey",
    label: "Whey Protein",
    time: "9:25 am",
    color: "#3B82F6",
    warn: null,
  },
  {
    key: "creatine",
    label: "Creatine 5g",
    time: "9:25 am",
    color: "#06B6D4",
    warn: null,
  },
  {
    key: "omega3",
    label: "Omega 3",
    time: "9:25 am",
    color: "#8B5CF6",
    warn: null,
  },
  {
    key: "collagen",
    label: "Collagen",
    time: "9:25 am",
    color: "#EC4899",
    warn: null,
  },
  {
    key: "vitd",
    label: "Vit D + Calcium",
    time: "1:00 pm",
    color: "#F97316",
    warn: "Not near ZMA",
  },
  {
    key: "ash_pm",
    label: "Ashwagandha PM",
    time: "1:00 pm",
    color: "#10B981",
    warn: null,
  },
  {
    key: "zma",
    label: "ZMA",
    time: "9:45 pm",
    color: "#A855F7",
    warn: "Empty stomach · No dairy",
  },
];

const MEAL_PRESETS = [
  "Protein Oats + Dry Fruits",
  "5 Boiled Eggs + Curd",
  "Black Chana + Salad",
  "Dal + Roti / Rice",
  "Nuts & Munakka",
  "Whey Protein Shake",
  "Warm Milk",
];
const EXERCISES = [
  "Squat",
  "Deadlift",
  "Bench Press",
  "Overhead Press",
  "Barbell Row",
  "Pull-ups",
  "Push-ups",
  "Dumbbell Curl",
  "Tricep Pushdown",
  "Lat Pulldown",
  "Leg Press",
  "Plank",
];

const SCHEDULE = [
  {
    time: "06:00",
    label: "Wake Up",
    detail:
      "500ml warm water immediately. No phone for 15 min. Splash cold water on face.",
    type: "wake",
    color: "#F59E0B",
  },
  {
    time: "06:10",
    label: "AM Supplements",
    detail:
      "Shilajit + Ashwagandha — empty stomach, warm water. DO NOT take ZMA or Omega 3 now.",
    type: "supps",
    color: "#A855F7",
  },
  {
    time: "06:20",
    label: "Pre-Workout Meal",
    detail:
      "Protein Oats (80g) + Anjeer (2) + Kishmish (5) + Kajoor (2). Must eat 60 min before gym for fuel.",
    type: "meal",
    color: "#22C55E",
  },
  {
    time: "07:20",
    label: "🏋️ GYM",
    detail:
      "Warm up 10 min → Compound lifts (Squat, Bench, Row, OHP, Deadlift) → Progressive overload EVERY week → Cool down 5 min.",
    type: "gym",
    color: "#EF4444",
  },
  {
    time: "09:20",
    label: "Leave Gym",
    detail:
      "Head home. You have 30 min until post-workout window closes. Don't delay the shake.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "09:25",
    label: "Post-Workout Stack 🚨",
    detail:
      "Whey + Creatine 5g + Omega 3 + Collagen — mix into one shake. Take BEFORE bath. This 30-min window is critical.",
    type: "supps",
    color: "#3B82F6",
  },
  {
    time: "10:00",
    label: "Rest #1 — 30 min",
    detail:
      "Lie down. No heavy screen time. Let your body start recovery. You just trained hard — respect this window.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "10:30",
    label: "Bath + Breakfast",
    detail:
      "Cold or warm bath (cold reduces inflammation). Then: 5 Boiled Eggs + Curd + Cucumber + Beetroot. ~40g protein.",
    type: "meal",
    color: "#22C55E",
  },
  {
    time: "11:00",
    label: "Rest #2 — 30 min",
    detail:
      "Final rest window. You can watch something light, call family, journal. Brain resets after gym. Don't skip.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "11:30",
    label: "💻 Study Block 1 — Kodex",
    detail:
      "90 min. Hardest concept of the day goes here. Your brain is sharp post-rest. No YouTube — only active building.",
    type: "study",
    color: "#3B82F6",
  },
  {
    time: "13:00",
    label: "Lunch + Supplements",
    detail:
      "Dal + Roti/Rice + Black Chana + Salad. Take Ashwagandha PM + Vit D + Calcium WITH food (fat helps Vit D absorb).",
    type: "meal",
    color: "#22C55E",
  },
  {
    time: "13:45",
    label: "Power Nap — 20 min MAX",
    detail:
      "Set alarm for 20 min. This cuts cortisol, boosts afternoon alertness. Do NOT sleep more than 30 min.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "14:15",
    label: "💻 Study Block 2 — Kodex",
    detail:
      "90 min. Project building — code, build, push to GitHub. Hands on only. Every day = 1 commit minimum.",
    type: "study",
    color: "#6366F1",
  },
  {
    time: "15:45",
    label: "Short Break + Snack",
    detail:
      "5 Akhrot + 10 Almonds + 5 Munakka. Walk around 5 min. Drink a glass of water.",
    type: "meal",
    color: "#22C55E",
  },
  {
    time: "16:00",
    label: "💻 Study Block 3 — Kodex",
    detail:
      "90 min. Backend — Node.js, Express, MongoDB, REST APIs. Build and test with Postman.",
    type: "study",
    color: "#8B5CF6",
  },
  {
    time: "17:30",
    label: "Walk — 20–30 min",
    detail:
      "Outdoor walk for Vitamin D (4–6 PM sun is ideal). Free testosterone booster. Light, not intense.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "18:00",
    label: "💻 Study Block 4 — Revision",
    detail:
      "90 min. Review everything from blocks 1–3. Write notes in your own words (Feynman technique). Plan class questions.",
    type: "study",
    color: "#A855F7",
  },
  {
    time: "19:30",
    label: "Dinner",
    detail:
      "Dal + Sabzi + 1–2 Roti OR 2 Eggs + Sabzi. Light on carbs after 8 PM. Optional: warm milk for casein protein.",
    type: "meal",
    color: "#22C55E",
  },
  {
    time: "20:00",
    label: "🎓 Online Class — 2 Hours",
    detail:
      "Daily class 8–10 PM. Full focus — notes, questions, active participation. This is your structured learning anchor.",
    type: "class",
    color: "#F97316",
  },
  {
    time: "22:00",
    label: "Post-Class Wind Down",
    detail:
      "Class is done. NO more coding or screens. Light stretch: hamstrings, chest, shoulders. Prepare gym bag for tomorrow.",
    type: "rest",
    color: "#64748B",
  },
  {
    time: "22:15",
    label: "ZMA — Pre-Sleep Stack 🚨",
    detail:
      "ZMA EMPTY stomach. NO milk/curd/paneer/calcium for 2h before. This is critical — calcium kills ZMA absorption completely.",
    type: "supps",
    color: "#A855F7",
  },
  {
    time: "22:30",
    label: "😴 SLEEP",
    detail:
      "Target: 8h sleep = wake 6:30 AM. Dark room, cool temp, phone away. Growth hormone ONLY releases in deep sleep. No exceptions.",
    type: "sleep",
    color: "#6366F1",
  },
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentDate = todayStr();
let currentTab = "supps";
let showYear = false;
let dayData = emptyDay();

function emptyDay() {
  return {
    supplements: {
      shilajit: false,
      ash_am: false,
      omega3: false,
      collagen: false,
      whey: false,
      creatine: false,
      vitd: false,
      ash_pm: false,
      zma: false,
    },
    sleep: { hours: "", quality: 0 },
    water: 0,
    workout: { done: false, minutes: "", exercises: [] },
    study: { hours: "", topics: "" },
    meals: [],
    notes: "",
  };
}

// ── DATE HELPERS ──────────────────────────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseDate(s) {
  const [y, m, d] = s.split("-");
  return new Date(+y, +m - 1, +d);
}
function addDaysStr(s, n) {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function dispDate(s) {
  return parseDate(s).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ── STORAGE ───────────────────────────────────────────────────────────────────
function save(data) {
  localStorage.setItem("day:" + currentDate, JSON.stringify(data));
  flashSaved();
}
function load(date) {
  const raw = localStorage.getItem("day:" + date);
  return raw ? JSON.parse(raw) : emptyDay();
}
function allDayScores() {
  const out = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("day:")) {
      try {
        out[k.replace("day:", "")] = scoreDay(
          JSON.parse(localStorage.getItem(k)),
        );
      } catch {}
    }
  }
  return out;
}

// ── SCORE ─────────────────────────────────────────────────────────────────────
function scoreDay(d) {
  if (!d) return 0;
  let s = 0;
  const allS = getAllSupps();
  const totalS = Math.max(allS.length, 1);
  s += Math.round(
    (allS.filter((s2) => d.supplements && d.supplements[s2.key]).length /
      totalS) *
      30,
  );
  s += d.workout?.done ? 20 : 0;
  const sl = parseFloat(d.sleep?.hours || 0);
  s += sl >= 7.5 ? 20 : sl >= 6 ? 10 : 0;
  const tg = Math.ceil(
    3500 / parseInt(localStorage.getItem("glassML") || "250"),
  );
  s += Math.round(Math.min((d.water || 0) / tg, 1) * 15);
  s += Math.round(Math.min(parseFloat(d.study?.hours || 0) / 4, 1) * 15);
  return Math.min(s, 100);
}
function gradeScore(s) {
  return s >= 80 ? "Great" : s >= 55 ? "Good" : s >= 30 ? "Fair" : "Low";
}
function accentScore(s) {
  return s >= 80
    ? "#C9F566"
    : s >= 55
      ? "#FBD155"
      : s >= 30
        ? "#FB923C"
        : "#F87171";
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function flashSaved() {
  const el = document.getElementById("saved-flash");
  if (!el) return;
  el.style.opacity = "1";
  setTimeout(() => (el.style.opacity = "0"), 1200);
}
function upd(newData) {
  dayData = newData;
  save(newData);
  refreshTopBar();
}
function totalProtein() {
  return (dayData.meals || []).reduce(
    (a, m) => a + parseFloat(m.protein || 0),
    0,
  );
}
function getCustomSupps() {
  try {
    return JSON.parse(localStorage.getItem("customSupps") || "[]");
  } catch {
    return [];
  }
}
function getAllSupps() {
  return [...SUPPS, ...getCustomSupps()];
}
function suppDone() {
  const all = getAllSupps();
  return all.filter((s) => dayData.supplements && dayData.supplements[s.key])
    .length;
}
function suppTotal() {
  return getAllSupps().length;
}

// ── ROUTING ───────────────────────────────────────────────────────────────────
function setDate(val) {
  currentDate = val;
  dayData = load(val);
  const dp = document.getElementById("date-picker");
  if (dp) dp.value = val;
  const nb = document.getElementById("today-btn");
  if (nb) nb.style.display = val === todayStr() ? "none" : "flex";
  refreshTopBar();
  renderContent();
}
function shiftDate(n) {
  setDate(addDaysStr(currentDate, n));
}
function gotoToday() {
  setDate(todayStr());
}
function switchTab(key) {
  currentTab = key;
  showYear = false;
  renderNav();
  renderContent();
  window.scrollTo(0, 0);
  document.querySelector(".scroll-area").scrollTop = 0;
}
function toggleYear() {
  showYear = !showYear;
  const btn = document.getElementById("year-sb-btn");
  if (btn) {
    btn.style.background = showYear ? "rgba(201,245,102,.1)" : "transparent";
    btn.style.borderColor = showYear ? "var(--ac)" : "var(--bd)";
    btn.style.color = showYear ? "var(--ac)" : "var(--mu2)";
  }
  renderContent();
}

// ── TOP BAR REFRESH ───────────────────────────────────────────────────────────
function refreshTopBar() {
  const s = scoreDay(dayData);
  const bar = document.getElementById("score-bar");
  const lbl = document.getElementById("score-label");
  const stats = document.getElementById("mini-stats");
  if (bar) {
    bar.style.width = s + "%";
    bar.style.background = accentScore(s);
  }
  if (lbl) {
    lbl.textContent = s + "% " + gradeScore(s);
    lbl.style.color = accentScore(s);
  }
  if (stats) {
    const sd = suppDone(),
      w = dayData.water || 0,
      sl = parseFloat(dayData.sleep?.hours || 0),
      wd = dayData.workout?.done,
      st = parseFloat(dayData.study?.hours || 0);
    const glML = getGlassML(),
      tg = Math.ceil(3500 / glML);
    stats.innerHTML = [
      ["\uD83D\uDC8A " + sd + "/9", sd >= 9],
      ["\uD83D\uDCA7 " + w + "/" + tg, w >= tg],
      ["\uD83D\uDE34 " + (dayData.sleep?.hours || "—") + "h", sl >= 7.5],
      ["\uD83C\uDFCB\uFE0F " + (wd ? "done" : "—"), wd],
      ["\uD83D\uDCBB " + (dayData.study?.hours || "—") + "h", st >= 4],
    ]
      .map(
        ([t, g]) =>
          `<span style="color:${g ? "var(--ac)" : "var(--mu)"}">${t}</span>`,
      )
      .join("");
  }
}

// ── NAV RENDER ────────────────────────────────────────────────────────────────
function renderNav() {
  const bnav = document.getElementById("bnav");
  const sbTabs = document.getElementById("sb-tabs");
  if (!bnav || !sbTabs) return;
  bnav.innerHTML = TABS.map(
    (t) =>
      `<button class="bnav-item${currentTab === t.key && !showYear ? " on" : ""}" onclick="switchTab('${t.key}')">
      <span class="ic">${t.icon}</span>${t.label}
    </button>`,
  ).join("");
  sbTabs.innerHTML = TABS.map(
    (t) =>
      `<button class="sb-item${currentTab === t.key && !showYear ? " on" : ""}" onclick="switchTab('${t.key}')">
      <span class="sb-icon">${t.icon}</span>${t.label}
    </button>`,
  ).join("");
}

// ── CONTENT RENDER ────────────────────────────────────────────────────────────
function renderContent() {
  const el = document.getElementById("content");
  if (!el) return;
  el.className = "content panel";
  void el.offsetWidth; // force reflow for animation
  el.className = "content panel";
  el.innerHTML = showYear ? renderYear() : renderTab();
}

function renderTab() {
  switch (currentTab) {
    case "supps":
      return renderSupps();
    case "gym":
      return renderGym();
    case "sleep":
      return renderSleep();
    case "water":
      return renderWater();
    case "food":
      return renderFood();
    case "study":
      return renderStudy();
    case "sched":
      return renderSched();
    case "notes":
      return renderNotes();
    case "data":
      return renderData();
    default:
      return "";
  }
}

// ── SUPPS ─────────────────────────────────────────────────────────────────────
function renderSupps() {
  const sd = suppDone();
  const allSupps = getAllSupps();
  let html = secHead("Supplements", sd + " of " + suppTotal() + " taken today");
  allSupps.forEach((s) => {
    const done = dayData.supplements && dayData.supplements[s.key];
    const isCustom = !SUPPS.find((x) => x.key === s.key);
    html +=
      `<div class="supp-row${done ? " done" : ""}" style="border-left-color:${done ? s.color : "var(--bd)"};${done ? "border-color:" + s.color + "44;" : ""}" onclick="toggleSupp('${s.key}')">
      <div class="supp-check" style="${done ? "background:" + s.color + ";border-color:" + s.color + ";" : ""}">
        ${done ? "✓" : ""}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:14px;font-weight:${done ? 600 : 400};color:${done ? "var(--fg)" : "var(--mu2)"};">${s.label}</div>
        <div style="font-size:11px;color:var(--mu);margin-top:1px;">${s.time}${s.warn ? ` <span style="color:#FBD155;">· ⚠ ${s.warn}</span>` : ""}` +
      `</div></div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        ${done ? `<div style="width:7px;height:7px;border-radius:50%;background:${s.color};"></div>` : ""}
        ${isCustom ? `<button onclick="event.stopPropagation();deleteCustomSupp('${s.key}')" style="background:rgba(239,68,68,.12);border:none;border-radius:6px;padding:3px 7px;color:#EF4444;font-size:11px;cursor:pointer;">✕</button>` : ""}
      </div>
    </div>`;
  });
  // ── Add new supplement form ──
  html += `<div class="card" style="margin-top:4px;">
    <div class="lbl" style="margin-bottom:10px;">➕ Add Custom Supplement</div>
    <input class="inp" id="cs-name" placeholder="Supplement name (e.g. Magnesium)" style="margin-bottom:8px;"/>
    <div style="display:flex;gap:8px;margin-bottom:8px;">
      <input class="inp" id="cs-time" placeholder="Time (e.g. 9:00 pm)" style="flex:1;"/>
      <input class="inp" id="cs-warn" placeholder="Note (optional)" style="flex:1;"/>
    </div>
    <div style="margin-bottom:10px;">
      <div class="lbl" style="margin-bottom:6px;">Colour</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${[
          "#F59E0B",
          "#10B981",
          "#3B82F6",
          "#06B6D4",
          "#8B5CF6",
          "#EC4899",
          "#F97316",
          "#EF4444",
          "#A855F7",
          "#22C55E",
        ]
          .map(
            (c) =>
              `<button onclick="selectCsColor('${c}')" id="csc-${c.replace("#", "")}" style="width:28px;height:28px;border-radius:50%;background:${c};border:2px solid transparent;cursor:pointer;transition:border .1s;"></button>`,
          )
          .join("")}
      </div>
    </div>
    <button class="big-btn" onclick="addCustomSupp()">+ Add Supplement</button>
  </div>`;
  return html;
}
function toggleSupp(key) {
  const d = {
    ...dayData,
    supplements: { ...dayData.supplements, [key]: !dayData.supplements[key] },
  };
  upd(d);
  renderContent();
}
let csColor = "#8B5CF6";
function selectCsColor(c) {
  csColor = c;
  document
    .querySelectorAll("[id^='csc-']")
    .forEach((b) => (b.style.borderColor = "transparent"));
  const btn = document.getElementById("csc-" + c.replace("#", ""));
  if (btn) btn.style.borderColor = "#fff";
}
function addCustomSupp() {
  const name = document.getElementById("cs-name")?.value.trim();
  const time = document.getElementById("cs-time")?.value.trim() || "–";
  const warn = document.getElementById("cs-warn")?.value.trim() || null;
  if (!name) return;
  const key = "cs_" + Date.now();
  const existing = getCustomSupps();
  existing.push({ key, label: name, time, color: csColor, warn });
  localStorage.setItem("customSupps", JSON.stringify(existing));
  // initialise in today's data
  upd({ ...dayData, supplements: { ...dayData.supplements, [key]: false } });
  csColor = "#8B5CF6";
  renderContent();
}
function deleteCustomSupp(key) {
  if (!confirm("Delete this supplement?")) return;
  const updated = getCustomSupps().filter((s) => s.key !== key);
  localStorage.setItem("customSupps", JSON.stringify(updated));
  const sups = { ...(dayData.supplements || {}) };
  delete sups[key];
  upd({ ...dayData, supplements: sups });
  renderContent();
}

// ── GYM ──────────────────────────────────────────────────────────────────────
function renderGym() {
  const exs = dayData.workout?.exercises || [];
  let html = secHead("Gym Log", "7:20 – 9:20 am · Add weight every week");
  // done toggle
  html += `<div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
    <div><div style="font-size:14px;color:var(--fg);font-weight:500;">Workout done?</div>
    <div style="font-size:11px;color:var(--mu);margin-top:2px;">Progressive overload — non-negotiable</div></div>
    <button onclick="toggleWorkoutDone()" style="background:${dayData.workout?.done ? "var(--ac)" : "var(--inp)"};border:none;border-radius:20px;padding:9px 20px;color:${dayData.workout?.done ? "#000" : "var(--mu2)"};font-size:13px;font-weight:600;flex-shrink:0;white-space:nowrap;">
      ${dayData.workout?.done ? "✓ Done" : "Mark Done"}
    </button></div>`;
  // duration
  html += `<div class="card"><div class="lbl">Duration (minutes)</div>
    <input class="inp" type="number" value="${dayData.workout?.minutes || ""}" placeholder="120" onchange="setWorkoutMins(this.value)"/></div>`;
  // add exercise
  html += `<div class="card"><div class="lbl">Log exercise</div>
    <div style="display:flex;flex-wrap:wrap;margin-bottom:10px;">${EXERCISES.map((e) => `<button class="pill" id="ex-pill-${e.replace(/ /g, "_")}" onclick="selectEx('${e}')">${e}</button>`).join("")}</div>
    <input class="inp" id="ex-name" placeholder="Exercise name" style="margin-bottom:8px;"/>
    <div style="display:flex;gap:8px;margin-bottom:10px;">
      <div style="flex:1;"><div class="lbl">Sets</div><input class="inp" type="number" id="ex-sets"/></div>
      <div style="flex:1;"><div class="lbl">Reps</div><input class="inp" type="number" id="ex-reps"/></div>
      <div style="flex:1;"><div class="lbl">kg</div><input class="inp" type="number" id="ex-kg"/></div>
    </div>
    <button class="big-btn" onclick="addExercise()">+ Add to log</button></div>`;
  // exercise list
  if (exs.length) {
    html += `<div class="card"><div class="lbl">${exs.length} exercises logged</div>`;
    exs.forEach((e) => {
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd);">
        <div style="flex:1;font-size:14px;color:var(--fg);font-weight:500;">${e.name}</div>
        <div style="display:flex;gap:5px;flex-shrink:0;">
          ${e.sets ? `<span class="ex-tag">${e.sets}×${e.reps || "?"}</span>` : ""}
          ${e.weight ? `<span style="font-size:11px;color:var(--mu2);font-family:var(--mono);background:var(--inp);border-radius:6px;padding:3px 7px;">${e.weight}kg</span>` : ""}
        </div>
        <button class="rm-btn" onclick="removeExercise(${e.id})">×</button>
      </div>`;
    });
    html += `</div>`;
  }
  return html;
}
function toggleWorkoutDone() {
  upd({
    ...dayData,
    workout: { ...dayData.workout, done: !dayData.workout?.done },
  });
  renderContent();
}
function setWorkoutMins(v) {
  upd({ ...dayData, workout: { ...dayData.workout, minutes: v } });
}
let selectedEx = "";
function selectEx(name) {
  selectedEx = name;
  document.getElementById("ex-name").value = name;
  document.querySelectorAll(".pill").forEach((p) => p.classList.remove("on"));
  const pill = document.getElementById("ex-pill-" + name.replace(/ /g, "_"));
  if (pill) pill.classList.add("on");
}
function addExercise() {
  const name = document.getElementById("ex-name")?.value.trim();
  const sets = document.getElementById("ex-sets")?.value;
  const reps = document.getElementById("ex-reps")?.value;
  const weight = document.getElementById("ex-kg")?.value;
  if (!name) return;
  const ex = { id: Date.now(), name, sets, reps, weight };
  upd({
    ...dayData,
    workout: {
      ...dayData.workout,
      exercises: [...(dayData.workout?.exercises || []), ex],
    },
  });
  selectedEx = "";
  renderContent();
}
function removeExercise(id) {
  upd({
    ...dayData,
    workout: {
      ...dayData.workout,
      exercises: dayData.workout.exercises.filter((e) => e.id !== id),
    },
  });
  renderContent();
}

// ── SLEEP ─────────────────────────────────────────────────────────────────────
function renderSleep() {
  const sl = parseFloat(dayData.sleep?.hours || 0);
  const q = dayData.sleep?.quality || 0;
  const barCol = sl >= 7.5 ? "var(--ac)" : sl >= 6 ? "#FBD155" : "#F87171";
  const msg =
    sl >= 7.5
      ? "✓ Optimal recovery — muscles will repair"
      : sl >= 6
        ? "⚠ Acceptable — aim for 8h"
        : "⛔ Too low — muscles cannot repair";
  let html = secHead("Sleep", "Target: 8 hours minimum");
  html += `<div class="card">
    <div class="lbl">Hours slept</div>
    <input class="inp" type="number" step="0.5" min="0" max="12" value="${dayData.sleep?.hours || ""}" placeholder="7.5" style="margin-bottom:10px;" onchange="setSleepHours(this.value)"/>
    ${
      sl > 0
        ? `<div class="bar-track"><div class="bar-fill" style="width:${Math.min((sl / 8) * 100, 100)}%;background:${barCol};"></div></div>
    <div style="font-size:12px;color:${barCol};margin-bottom:4px;">${msg}</div>`
        : ""
    }
  </div>`;
  html += `<div class="card"><div class="lbl">Sleep quality</div>
    <div class="stars">
      ${[1, 2, 3, 4, 5].map((n) => `<button class="star-btn${q >= n ? " on" : ""}" onclick="setSleepQuality(${n})">★</button>`).join("")}
    </div>
    <div style="text-align:center;margin-top:8px;font-size:12px;color:var(--mu);">${["", "Poor", "Fair", "Good", "Very Good", "Excellent"][q]}</div>
  </div>`;
  html += `<div class="info-box">💡 ZMA must be on empty stomach — no dairy 2h before. Dark room. Phone away. Sleep by 10 pm. This is when 90% of muscle repair happens via growth hormone.</div>`;
  return html;
}
function setSleepHours(v) {
  upd({ ...dayData, sleep: { ...dayData.sleep, hours: v } });
  renderContent();
}
function setSleepQuality(n) {
  upd({ ...dayData, sleep: { ...dayData.sleep, quality: n } });
  renderContent();
}

// ── WATER ─────────────────────────────────────────────────────────────────────
const GLASS_PRESETS = [150, 200, 250, 300, 350, 400, 500];

function getGlassML() {
  return parseInt(localStorage.getItem("glassML") || "250");
}
function setGlassML(ml) {
  localStorage.setItem("glassML", ml);
  renderContent();
}
function setCustomGlassML() {
  const val = parseInt(
    document.getElementById("custom-glass-inp")?.value || "0",
  );
  if (val >= 50 && val <= 1000) {
    setGlassML(val);
  }
}

function renderWater() {
  const w = dayData.water || 0;
  const glassML = getGlassML();
  const TARGET_L = 3.5;
  const targetGlasses = Math.ceil((TARGET_L * 1000) / glassML);
  const totalML = w * glassML;
  const totalL = (totalML / 1000).toFixed(2);
  const pct = Math.min((w / targetGlasses) * 100, 100);
  const remaining = Math.max(0, targetGlasses - w);
  const barCol =
    w >= targetGlasses
      ? "var(--ac)"
      : w >= targetGlasses * 0.6
        ? "#38BDF8"
        : "#38BDF8";

  // status message
  let statusMsg = "",
    statusCol = "var(--mu)";
  if (w >= targetGlasses) {
    statusMsg = "✓ Target hit! Great hydration.";
    statusCol = "var(--ac)";
  } else if (w >= targetGlasses * 0.75) {
    statusMsg =
      remaining + " more glass" + (remaining > 1 ? "es" : "") + " to go!";
    statusCol = "#38BDF8";
  } else if (w >= targetGlasses * 0.4) {
    statusMsg = "Keep going — " + remaining + " glasses left.";
    statusCol = "#FBD155";
  } else if (w > 0) {
    statusMsg = "Just started — " + remaining + " glasses to reach 3.5L.";
    statusCol = "#FB923C";
  } else {
    statusMsg = "Start drinking — " + targetGlasses + " glasses needed today.";
    statusCol = "var(--mu)";
  }

  let html = secHead(
    "Water",
    `${w} of ${targetGlasses} glasses · ${totalL}L of 3.5L`,
  );

  // ── Glass size picker ──
  html += `<div class="card" style="margin-bottom:10px;">
    <div class="lbl" style="margin-bottom:10px;">Your glass size</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
      ${GLASS_PRESETS.map(
        (ml) => `
        <button onclick="setGlassML(${ml})" style="
          flex:1;min-width:52px;padding:10px 6px;border-radius:10px;border:1.5px solid ${glassML === ml ? "#38BDF8" : "var(--bd)"};
          background:${glassML === ml ? "rgba(56,189,248,.15)" : "var(--inp)"};
          color:${glassML === ml ? "#38BDF8" : "var(--mu2)"};
          font-size:12px;font-family:var(--mono);font-weight:${glassML === ml ? 700 : 400};
          transition:all .15s;line-height:1.4;text-align:center;">
          ${ml}<br><span style="font-size:9px;opacity:.7;">ml</span>
        </button>`,
      ).join("")}
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <input class="inp" type="number" id="custom-glass-inp" placeholder="Custom ml (e.g. 350)" min="50" max="1000"
        style="flex:1;" onkeydown="if(event.key==='Enter')setCustomGlassML()"/>
      <button onclick="setCustomGlassML()" style="background:var(--ac);border:none;border-radius:10px;padding:11px 16px;color:#000;font-weight:700;font-size:13px;flex-shrink:0;">Set</button>
    </div>
    <div style="margin-top:10px;padding:10px 12px;background:var(--inp);border-radius:10px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      ${[
        ["Glass size", glassML + "ml"],
        ["Target", targetGlasses + " glasses"],
        ["= Total", "3.5L / day"],
        ["Per glass", (glassML / 1000).toFixed(3) + "L"],
      ]
        .map(
          ([l, v]) => `<div style="text-align:center;flex:1;min-width:60px;">
        <div style="font-size:16px;font-weight:700;color:#38BDF8;font-family:var(--mono);">${v}</div>
        <div style="font-size:10px;color:var(--mu);margin-top:1px;">${l}</div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;

  // ── Big counter ──
  html += `<div class="card" style="text-align:center;">
    <div style="font-size:72px;font-weight:800;font-family:var(--mono);line-height:1;margin-bottom:4px;">
      <span style="color:#38BDF8;">${w}</span><span style="font-size:28px;color:var(--mu);">/${targetGlasses}</span>
    </div>
    <div style="font-size:13px;font-weight:600;color:${statusCol};margin-bottom:4px;">${statusMsg}</div>
    <div style="font-size:11px;color:var(--mu);margin-bottom:14px;">${totalL}L consumed · ${glassML}ml per glass</div>
    <div class="bar-track" style="height:8px;margin-bottom:16px;">
      <div class="bar-fill" style="width:${pct}%;background:linear-gradient(90deg,#38BDF8,${w >= targetGlasses ? "var(--ac)" : "#38BDF8"});"></div>
    </div>
    <div class="water-grid" style="grid-template-columns:repeat(${Math.min(targetGlasses, 7)},1fr);">
      ${Array.from({ length: targetGlasses })
        .map(
          (_, i) =>
            `<button class="glass-btn${w > i ? " filled" : ""}" onclick="setWater(${w === i + 1 ? i : i + 1})" title="${(i + 1) * glassML}ml">💧</button>`,
        )
        .join("")}
    </div>
    <div style="display:flex;gap:8px;margin-top:4px;">
      <button onclick="setWater(Math.max(0,${w}-1))" style="flex:1;background:var(--inp);border:none;border-radius:10px;padding:12px;color:var(--mu2);font-size:20px;">−</button>
      <button onclick="setWater(Math.min(30,${w}+1))" style="flex:2;background:${w >= targetGlasses ? "rgba(201,245,102,.2)" : "#38BDF8"};border:none;border-radius:10px;padding:12px;color:${w >= targetGlasses ? "var(--ac)" : "#000"};font-size:14px;font-weight:700;">
        ${w >= targetGlasses ? "✓ Target done!" : "+ Glass (" + glassML + "ml)"}
      </button>
    </div>
  </div>`;

  html += `<div class="info-box">⚠️ You take Creatine — drink an EXTRA 500ml daily on top of 3L base. 3.5L minimum. Select your actual glass size above so the target is accurate for you.</div>`;
  return html;
}
function setWater(n) {
  upd({ ...dayData, water: n });
  renderContent();
}

// ── FOOD ──────────────────────────────────────────────────────────────────────
function totalCals() {
  return Math.round(
    (dayData.meals || []).reduce((a, m) => a + parseFloat(m.calories || 0), 0),
  );
}
function totalCarbs() {
  return Math.round(
    (dayData.meals || []).reduce((a, m) => a + parseFloat(m.carbs || 0), 0),
  );
}
function totalFat() {
  return Math.round(
    (dayData.meals || []).reduce((a, m) => a + parseFloat(m.fat || 0), 0),
  );
}

function renderFood() {
  const tp = totalProtein();
  const tc = totalCals();
  const tcarb = totalCarbs();
  const tf = totalFat();
  const meals = dayData.meals || [];
  let html = secHead("Food Log", "Target: 130g protein · 2200–2400 kcal");
  html += `<div class="card">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:12px;">
      ${[
        ["🍗", "Protein", tp + "g", "#22C55E"],
        ["🔥", "Calories", tc, "#FBD155"],
        ["🍚", "Carbs", tcarb + "g", "#F97316"],
        ["🥑", "Fat", tf + "g", "#8B5CF6"],
      ]
        .map(
          ([ic, lb, val, c]) => `
        <div style="background:var(--inp);border-radius:10px;padding:10px 8px;text-align:center;">
          <div style="font-size:18px;">${ic}</div>
          <div style="font-size:15px;font-weight:800;font-family:var(--mono);color:${c};">${val}</div>
          <div style="font-size:9px;color:var(--mu);margin-top:1px;">${lb}</div>
        </div>`,
        )
        .join("")}
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:${Math.min((tp / 130) * 100, 100)}%;background:linear-gradient(90deg,#22C55E,var(--ac));"></div></div>
    <div style="font-size:11px;color:var(--mu);margin-top:4px;">${tp >= 130 ? "✓ Protein target hit!" : "Need " + Math.max(0, 130 - tp) + "g more protein"}</div>
  </div>`;
  html += `<div class="card" style="border:1px solid rgba(201,245,102,.2);">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
      <span style="font-size:20px;">🤖</span>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--fg);">AI Nutrition Analyzer</div>
        <div style="font-size:11px;color:var(--mu);">Type any food — AI fills nutrients automatically</div>
      </div>
    </div>
    <input class="inp" type="time" id="ai-meal-time" style="margin-bottom:8px;"/>
    <input class="inp" id="ai-food-inp" placeholder='e.g. "100g rice" or "2 boiled eggs + 1 roti"' style="margin-bottom:8px;"/>
    <button onclick="analyzeFood()" id="ai-analyze-btn" style="width:100%;background:var(--ac);border:none;border-radius:10px;padding:12px;color:#000;font-size:14px;font-weight:700;cursor:pointer;">
      🤖 Analyze &amp; Add
    </button>
    <div id="ai-status" style="font-size:12px;color:var(--mu);margin-top:8px;text-align:center;min-height:16px;"></div>
    <div id="ai-preview" style="display:none;margin-top:10px;padding:10px;background:var(--inp);border-radius:10px;"></div>
  </div>`;
  html += `<div class="card">
    <div class="lbl" style="margin-bottom:8px;">Manual Add</div>
    <div style="display:flex;flex-wrap:wrap;margin-bottom:10px;">${MEAL_PRESETS.map((p) => `<button class="pill" id="mp-${p.replace(/ /g, "_")}" onclick="selectMealPreset('${p.replace(/'/g, "\'")}')">${p}</button>`).join("")}</div>
    <input class="inp" type="time" id="meal-time" style="margin-bottom:8px;"/>
    <input class="inp" id="meal-food" placeholder="What did you eat?" style="margin-bottom:8px;"/>
    <div style="display:flex;gap:8px;margin-bottom:8px;">
      <input class="inp" type="number" id="meal-protein" placeholder="Protein (g)" style="flex:1;"/>
      <input class="inp" type="number" id="meal-calories" placeholder="Calories" style="flex:1;"/>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:10px;">
      <input class="inp" type="number" id="meal-carbs" placeholder="Carbs (g)" style="flex:1;"/>
      <input class="inp" type="number" id="meal-fat" placeholder="Fat (g)" style="flex:1;"/>
    </div>
    <button class="big-btn" onclick="addMeal()">+ Log meal</button>
  </div>`;
  meals.forEach((m) => {
    const nutrients = [
      m.calories ? m.calories + "kcal" : null,
      m.protein ? m.protein + "g protein" : null,
      m.carbs ? m.carbs + "g carbs" : null,
      m.fat ? m.fat + "g fat" : null,
    ]
      .filter(Boolean)
      .join(" · ");
    html += `<div class="card list-row">
      <div style="flex:1;min-width:0;">
        <div style="font-size:14px;color:var(--fg);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.food}${m.aiAnalyzed ? " 🤖" : ""}</div>
        <div style="font-size:11px;color:var(--mu);margin-top:2px;">${m.time ? m.time + " · " : ""}${nutrients || "No nutrients logged"}</div>
      </div>
      <button class="rm-btn" onclick="removeMeal(${m.id})">×</button>
    </div>`;
  });
  if (!meals.length)
    html += `<div style="text-align:center;color:var(--mu);padding:28px 0;font-size:13px;">No meals logged yet.<br>Use AI Analyzer above!</div>`;
  return html;
}
async function analyzeFood() {
  const inp = document.getElementById("ai-food-inp");
  const statusEl = document.getElementById("ai-status");
  const previewEl = document.getElementById("ai-preview");
  const btn = document.getElementById("ai-analyze-btn");
  const food = inp ? inp.value.trim() : "";
  if (!food) {
    if (statusEl) statusEl.textContent = "Please enter a food item first.";
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Analyzing...";
  }
  if (statusEl) {
    statusEl.style.color = "var(--mu)";
    statusEl.textContent = "🤖 AI is calculating nutrients...";
  }
  if (previewEl) previewEl.style.display = "none";
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system:
          "You are a precise nutrition expert. Return ONLY valid JSON with no markdown or explanation. Use Indian food knowledge where relevant.",
        messages: [
          {
            role: "user",
            content:
              "Give approximate nutrition for: " +
              food +
              ". Return JSON only, exactly this format: {food_name:string, calories:number, protein_g:number, carbs_g:number, fat_g:number, fiber_g:number, notes:string}",
          },
        ],
      }),
    });
    const data = await resp.json();
    const text = (data.content || [])
      .map((c) => c.text || "")
      .join("")
      .trim()
      .replace(/```json|```/g, "")
      .trim();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e2) {
      throw new Error("AI returned unexpected format");
    }
    window._aiParsed = parsed;
    if (previewEl) {
      previewEl.innerHTML = `
        <div style="font-size:13px;font-weight:600;color:var(--fg);margin-bottom:8px;">📋 ${parsed.food_name || food}</div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:10px;">
          ${[
            ["🔥", parsed.calories || 0, "kcal"],
            ["🍗", (parsed.protein_g || 0) + "g", "protein"],
            ["🍚", (parsed.carbs_g || 0) + "g", "carbs"],
            ["🥑", (parsed.fat_g || 0) + "g", "fat"],
            ["🌿", (parsed.fiber_g || 0) + "g", "fiber"],
          ]
            .map(
              ([ic, v, l]) =>
                `<div style="background:var(--card);border-radius:8px;padding:7px 4px;text-align:center;">
              <div>${ic}</div>
              <div style="font-size:12px;font-weight:700;font-family:var(--mono);color:var(--fg);">${v}</div>
              <div style="font-size:8px;color:var(--mu);">${l}</div>
            </div>`,
            )
            .join("")}
        </div>
        ${parsed.notes ? `<div style="font-size:11px;color:var(--mu);margin-bottom:10px;line-height:1.5;">${parsed.notes}</div>` : ""}
        <button onclick="confirmAiMeal()" style="width:100%;background:var(--ac);border:none;border-radius:8px;padding:10px;color:#000;font-size:13px;font-weight:700;cursor:pointer;">✓ Add to Food Log</button>`;
      previewEl.style.display = "block";
    }
    if (statusEl) statusEl.textContent = "";
  } catch (err) {
    if (statusEl) {
      statusEl.style.color = "#EF4444";
      statusEl.textContent =
        "Error: " + err.message + ". Use manual add below.";
    }
  }
  if (btn) {
    btn.disabled = false;
    btn.textContent = "🤖 Analyze & Add";
  }
}
function confirmAiMeal() {
  const parsed = window._aiParsed || {};
  const time = document.getElementById("ai-meal-time")?.value || "";
  const foodInp = document.getElementById("ai-food-inp");
  const origFood = foodInp ? foodInp.value.trim() : "";
  const meal = {
    id: Date.now(),
    food: parsed.food_name || origFood,
    time,
    protein: parsed.protein_g || 0,
    calories: parsed.calories || 0,
    carbs: parsed.carbs_g || 0,
    fat: parsed.fat_g || 0,
    fiber: parsed.fiber_g || 0,
    aiAnalyzed: true,
  };
  upd({ ...dayData, meals: [...(dayData.meals || []), meal] });
  if (foodInp) foodInp.value = "";
  const prev = document.getElementById("ai-preview");
  if (prev) prev.style.display = "none";
  renderContent();
}
let mealPresetVal = "";
function selectMealPreset(name) {
  mealPresetVal = name;
  document
    .querySelectorAll("[id^='mp-']")
    .forEach((p) => p.classList.remove("on"));
  const pid = document.getElementById(
    "mp-" + name.replace(/ /g, "_").replace(/'/g, "_"),
  );
  if (pid) pid.classList.add("on");
  const fi = document.getElementById("meal-food");
  if (fi) fi.value = name;
}
function addMeal() {
  const food = document.getElementById("meal-food")?.value.trim();
  const time = document.getElementById("meal-time")?.value;
  const protein = document.getElementById("meal-protein")?.value;
  const calories = document.getElementById("meal-calories")?.value;
  const carbs = document.getElementById("meal-carbs")?.value;
  const fat = document.getElementById("meal-fat")?.value;
  if (!food) return;
  upd({
    ...dayData,
    meals: [
      ...(dayData.meals || []),
      {
        id: Date.now(),
        food,
        time,
        protein: protein || 0,
        calories: calories || 0,
        carbs: carbs || 0,
        fat: fat || 0,
      },
    ],
  });
  mealPresetVal = "";
  renderContent();
}
function removeMeal(id) {
  upd({ ...dayData, meals: dayData.meals.filter((m) => m.id !== id) });
  renderContent();
}

// ── STUDY ─────────────────────────────────────────────────────────────────────
function renderStudy() {
  const sh = parseFloat(dayData.study?.hours || 0);
  const barCol = sh >= 4 ? "var(--ac)" : "#FB923C";
  const msg =
    sh >= 6
      ? "🔥 Full session complete!"
      : sh >= 4
        ? "✓ Minimum target hit"
        : "Keep going — 4h minimum";
  let html = secHead(
    "Kodex Study",
    "Sheryians Full Stack · Target 4–6 hours daily",
  );
  html += `<div class="card">
    <div class="lbl">Hours studied today</div>
    <input class="inp" type="number" step="0.5" min="0" max="16" value="${dayData.study?.hours || ""}" placeholder="4.5" style="margin-bottom:10px;" onchange="setStudyHours(this.value)"/>
    ${
      sh > 0
        ? `<div class="bar-track"><div class="bar-fill" style="width:${Math.min((sh / 6) * 100, 100)}%;background:${barCol};"></div></div>
    <div style="font-size:12px;color:${barCol};">${msg}</div>`
        : ""
    }
  </div>`;
  html += `<div class="card">
    <div class="lbl">Topics covered today</div>
    <textarea class="inp" rows="4" placeholder="e.g. JS Promises, React useEffect, Node.js REST API..." style="padding-top:10px;line-height:1.7;resize:vertical;" onchange="setStudyTopics(this.value)">${dayData.study?.topics || ""}</textarea>
  </div>`;
  html += `<div class="card"><div class="lbl">Your daily study blocks</div>
    ${[
      ["11:30 am", "Block 1 — Hardest concept (90 min)", "#3B82F6"],
      ["1:00 pm", "Lunch break", "var(--mu)"],
      ["2:15 pm", "Block 2 — Project building (90 min)", "#6366F1"],
      ["4:00 pm", "Block 3 — Backend / APIs (90 min)", "#8B5CF6"],
      ["6:00 pm", "Block 4 — Revision + plan tomorrow (90 min)", "#A855F7"],
      ["8:00 pm", "🎓 Online Class (2 hrs)", "#F97316"],
    ]
      .map(
        ([t, l, c]) =>
          `<div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd);">
        <div style="width:3px;height:32px;background:${c};border-radius:2px;flex-shrink:0;"></div>
        <div><div style="font-size:11px;color:${c};font-family:var(--mono);">${t}</div><div style="font-size:13px;color:var(--fg);margin-top:1px;">${l}</div></div>
      </div>`,
      )
      .join("")}
  </div>`;
  return html;
}
function setStudyHours(v) {
  upd({ ...dayData, study: { ...dayData.study, hours: v } });
  renderContent();
}
function setStudyTopics(v) {
  upd({ ...dayData, study: { ...dayData.study, topics: v } });
}

// ── SCHEDULE ──────────────────────────────────────────────────────────────────
function renderSched() {
  const allBlocks = [...SCHEDULE];

  let html = secHead("Daily Plan", dispDate(currentDate));

  // Trainer note card at top
  html += `<div style="background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:14px;padding:14px 16px;margin-bottom:12px;">
    <div style="font-size:11px;color:#EF4444;letter-spacing:1px;font-family:var(--mono);margin-bottom:6px;">TRAINER NOTE — YOUR REAL SCHEDULE</div>
    <div style="font-size:12px;color:var(--mu2);line-height:1.8;">
      🏋️ Gym: <strong style="color:var(--fg);">7:20 AM – back ~10:00 AM</strong><br>
      😮‍💨 Rest: <strong style="color:var(--fg);">10:00–10:30 AM</strong><br>
      🚿 Bath + Breakfast: <strong style="color:var(--fg);">10:30–11:00 AM</strong><br>
      😮‍💨 Rest: <strong style="color:var(--fg);">11:00–11:30 AM</strong><br>
      💻 Study starts: <strong style="color:var(--fg);">11:30 AM</strong><br>
      🎓 Class: <strong style="color:#F97316;">8:00 PM – 10:00 PM</strong><br>
      😴 Sleep by: <strong style="color:#6366F1;">10:30 PM → wake 6:30 AM</strong>
    </div>
  </div>`;

  html += `<div class="card" style="padding:0;overflow:hidden;">`;
  allBlocks.forEach((item, i) => {
    const [h, m] = item.time.split(":");
    const hr = parseInt(h),
      mn = parseInt(m);
    const ampm = hr >= 12 ? "pm" : "am";
    const hr12 = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr;
    const timeStr = `${hr12}:${String(mn).padStart(2, "0")} ${ampm}`;
    const isClass = item.type === "class";
    const isGym = item.type === "gym";
    const isSleep = item.type === "sleep";
    html += `<div style="display:flex;gap:0;padding:14px 16px;${i < allBlocks.length - 1 ? "border-bottom:1px solid var(--bd);" : ""}${isClass ? "background:rgba(249,115,22,.05);" : isGym ? "background:rgba(239,68,68,.04);" : isSleep ? "background:rgba(99,102,241,.04);" : ""}">
      <div style="width:3px;background:${item.color};border-radius:2px;flex-shrink:0;margin-right:14px;align-self:stretch;"></div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
          <span style="font-size:11px;color:var(--mu);font-family:var(--mono);min-width:56px;">${timeStr}</span>
          <span style="font-size:9px;padding:2px 7px;border-radius:10px;background:${item.color}22;color:${item.color};font-family:var(--mono);letter-spacing:.5px;text-transform:uppercase;">${item.type}</span>
        </div>
        <div style="font-size:14px;font-weight:600;color:var(--fg);margin-bottom:3px;">${item.label}</div>
        <div style="font-size:12px;color:var(--mu);line-height:1.6;">${item.detail}</div>
      </div>
    </div>`;
  });
  html += `</div>`;
  html += `<div class="info-box">💡 You have 4 solid study blocks (11:30 AM → 7:30 PM) before class. That's 4–6 hours of Kodex + revision. Class at 8 PM reinforces your self-study. Perfect structure — just execute it daily.</div>`;
  return html;
}

// ── NOTES ─────────────────────────────────────────────────────────────────────
function renderNotes() {
  const s = scoreDay(dayData);
  const tp = totalProtein();
  const sd = suppDone();
  let html = secHead("Notes", dispDate(currentDate));
  html += `<div class="card">
    <div class="lbl">Daily reflection</div>
    <textarea class="inp" rows="7" placeholder="How did the workout feel?&#10;Any soreness?&#10;Coding progress today?&#10;Win of the day?&#10;&#10;Be honest with yourself..." style="padding-top:10px;line-height:1.7;resize:vertical;" onchange="setNotes(this.value)">${dayData.notes || ""}</textarea>
  </div>`;
  html += `<div class="card"><div class="lbl">Day summary</div>
    ${[
      [
        "💊",
        "Supplements",
        sd + "/" + suppTotal(),
        sd >= suppTotal()
          ? "var(--ac)"
          : sd >= Math.floor(suppTotal() * 0.5)
            ? "#FBD155"
            : "#F87171",
      ],
      [
        "🏋️",
        "Workout",
        dayData.workout?.done
          ? "✓ " + (dayData.workout?.minutes || "?") + "min"
          : "Not done",
        dayData.workout?.done ? "var(--ac)" : "#F87171",
      ],
      [
        "😴",
        "Sleep",
        dayData.sleep?.hours ? dayData.sleep.hours + "h" : "Not logged",
        parseFloat(dayData.sleep?.hours || 0) >= 7.5 ? "var(--ac)" : "#FBD155",
      ],
      (() => {
        const tg = Math.ceil(
          3500 / parseInt(localStorage.getItem("glassML") || "250"),
        );
        const w = dayData.water || 0;
        return ["💧", "Water", w + "/" + tg, w >= tg ? "var(--ac)" : "#FBD155"];
      })(),
      [
        "🍱",
        "Food",
        (dayData.meals || []).length + " meals · " + tp + "g",
        "var(--ac)",
      ],
      [
        "💻",
        "Study",
        dayData.study?.hours ? dayData.study.hours + "h" : "Not logged",
        parseFloat(dayData.study?.hours || 0) >= 4 ? "var(--ac)" : "#FB923C",
      ],
    ]
      .map(
        ([icon, label, val, color]) =>
          `<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bd);">
        <span style="font-size:13px;color:var(--mu2);">${icon} ${label}</span>
        <span style="font-size:13px;font-weight:600;color:${color};font-family:var(--mono);">${val}</span>
      </div>`,
      )
      .join("")}
    <div style="text-align:center;padding-top:20px;">
      <div style="font-size:44px;font-weight:800;color:${accentScore(s)};font-family:var(--mono);line-height:1;">${s}%</div>
      <div style="font-size:11px;color:var(--mu);margin-top:4px;letter-spacing:2px;">${gradeScore(s).toUpperCase()} DAY</div>
    </div>
  </div>`;
  return html;
}
function setNotes(v) {
  upd({ ...dayData, notes: v });
}

// ── YEAR ──────────────────────────────────────────────────────────────────────
function renderYear() {
  const yr = new Date().getFullYear();
  const days = [];
  for (
    let d = new Date(yr, 0, 1);
    d.getFullYear() === yr;
    d.setDate(d.getDate() + 1)
  ) {
    const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push(s);
  }
  const scores = allDayScores();
  const tot = Object.keys(scores).length;
  const perf = Object.values(scores).filter((s) => s >= 80).length;
  const avg = tot
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / tot)
    : 0;
  let streak = 0,
    sd = todayStr();
  while (scores[sd] >= 50) {
    streak++;
    sd = addDaysStr(sd, -1);
  }

  let html = secHead(
    "2026 — Year Overview",
    "Click any square to jump to that day",
  );
  html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:24px;">
    ${[
      ["Days", tot],
      ["Streak", streak + "d"],
      ["Perfect", perf],
      ["Avg", avg + "%"],
    ]
      .map(
        ([l, v]) =>
          `<div class="card" style="text-align:center;padding:14px 10px;">
        <div style="font-size:22px;font-weight:800;color:var(--ac);font-family:var(--mono);">${v}</div>
        <div style="font-size:10px;color:var(--mu);margin-top:2px;letter-spacing:1px;">${l.toUpperCase()}</div>
      </div>`,
      )
      .join("")}
  </div>`;
  html += `<div class="card">
    <div class="lbl">Every day of ${yr}</div>
    <div class="heatmap">
      ${days
        .map((d) => {
          const s = scores[d],
            isT = d === todayStr(),
            isFut = d > todayStr();
          const bg = isFut
            ? "var(--bd)"
            : s == null
              ? "var(--bd)"
              : s >= 80
                ? "#16A34A"
                : s >= 55
                  ? "#CA8A04"
                  : s >= 30
                    ? "#EA580C"
                    : "#DC2626";
          return `<div class="hm-cell" style="background:${bg};border:${isT ? "1.5px solid var(--ac)" : "none"};opacity:${isFut ? 0.2 : 1};" onclick="${isFut ? "" : "gotoDay('" + d + "')"}" title="${d}${s != null ? " · " + s + "%" : ""}"></div>`;
        })
        .join("")}
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap;">
      ${[
        ["#16A34A", "80% Great"],
        ["#CA8A04", "55% Good"],
        ["#EA580C", "30% Fair"],
        ["#DC2626", "Low"],
        ["var(--bd)", "No data"],
      ]
        .map(
          ([c, l]) =>
            `<div style="display:flex;align-items:center;gap:5px;">
          <div style="width:9px;height:9px;border-radius:2px;background:${c};flex-shrink:0;"></div>
          <span style="font-size:10px;color:var(--mu);">${l}</span>
        </div>`,
        )
        .join("")}
    </div>
  </div>`;
  return html;
}
function gotoDay(d) {
  showYear = false;
  setDate(d);
  renderNav();
  renderContent();
  const btn = document.getElementById("year-sb-btn");
  if (btn) {
    btn.style.background = "transparent";
    btn.style.borderColor = "var(--bd)";
    btn.style.color = "var(--mu2)";
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function secHead(title, sub) {
  return `<div style="margin-bottom:20px;">
    <div class="sec-title">${title}</div>
    ${sub ? `<div class="sec-sub">${sub}</div>` : ""}
  </div>`;
}

// ── DATA / SETTINGS ──────────────────────────────────────────────────────────
function renderData() {
  const scores = allDayScores();
  const days = Object.keys(scores);
  const totalDays = days.length;
  const avgScore = totalDays
    ? Math.round(days.reduce((a, d) => a + scores[d], 0) / totalDays)
    : 0;
  const perfect = days.filter((d) => scores[d] >= 80).length;
  // streak
  let streak = 0,
    d = todayStr();
  while (scores[d] > 0) {
    streak++;
    d = addDaysStr(d, -1);
  }

  // all days sorted newest first for the log
  const sortedDays = days.sort((a, b) => b.localeCompare(a)).slice(0, 60);

  let html = secHead("Data & Backup", "All your data lives in this browser");

  // Stats overview
  html += `<div class="card">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      ${[
        ["📅", "Days Logged", totalDays],
        ["🔥", "Current Streak", streak + "d"],
        ["⭐", "Avg Score", avgScore + "%"],
        ["🏆", "Perfect Days", perfect],
      ]
        .map(
          ([ic, l, v]) => `
        <div style="background:var(--inp);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:22px;">${ic}</div>
          <div style="font-size:20px;font-weight:800;font-family:var(--mono);color:var(--ac);">${v}</div>
          <div style="font-size:10px;color:var(--mu);margin-top:2px;">${l}</div>
        </div>`,
        )
        .join("")}
    </div>
  </div>`;

  // Export / Import
  html += `<div class="card">
    <div class="lbl" style="margin-bottom:10px;">💾 Backup & Restore</div>
    <div style="font-size:12px;color:var(--mu);margin-bottom:12px;line-height:1.6;">Your data is stored in <strong style="color:var(--fg);">this browser only</strong>. Export regularly to keep a backup. If you clear browser data or switch devices, you will lose everything unless you export first.</div>
    <button onclick="exportData()" style="width:100%;background:var(--ac);border:none;border-radius:10px;padding:12px;color:#000;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:10px;">⬇ Export All Data (JSON)</button>
    <div style="display:flex;gap:8px;align-items:center;">
      <input type="file" id="import-file" accept=".json" onchange="importData(this)" style="display:none;"/>
      <button onclick="document.getElementById('import-file').click()" style="flex:1;background:var(--inp);border:1px solid var(--bd);border-radius:10px;padding:12px;color:var(--mu2);font-size:13px;font-weight:600;cursor:pointer;">⬆ Import Backup</button>
      <button onclick="clearAllData()" style="flex:1;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:12px;color:#EF4444;font-size:13px;font-weight:600;cursor:pointer;">🗑 Clear All</button>
    </div>
    <div id="import-status" style="font-size:12px;text-align:center;margin-top:8px;color:var(--mu);min-height:16px;"></div>
  </div>`;

  // Day-by-day log (last 60 days)
  html += `<div class="card" style="padding:0;overflow:hidden;">
    <div style="padding:14px 16px 10px;border-bottom:1px solid var(--bd);">
      <div class="lbl">📖 Day Log (last 60 days)</div>
    </div>`;
  if (!sortedDays.length) {
    html += `<div style="padding:24px;text-align:center;color:var(--mu);font-size:13px;">No days logged yet. Start tracking!</div>`;
  } else {
    sortedDays.forEach((date) => {
      const sc = scores[date];
      const col = accentScore(sc);
      const raw = localStorage.getItem("day:" + date);
      let d2;
      try {
        d2 = JSON.parse(raw);
      } catch {
        d2 = null;
      }
      const prot = d2
        ? Math.round(
            (d2.meals || []).reduce(
              (a, m) => a + parseFloat(m.protein || 0),
              0,
            ),
          )
        : 0;
      const wDone = d2?.workout?.done;
      const sl = parseFloat(d2?.sleep?.hours || 0);
      const suppDoneCount = d2
        ? getAllSupps().filter((s) => d2.supplements && d2.supplements[s.key])
            .length
        : 0;
      html += `<div onclick="setDate('${date}')" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--bd);cursor:pointer;transition:background .1s;" onmouseover="this.style.background='var(--card-hi)'" onmouseout="this.style.background='transparent'">
        <div style="width:36px;height:36px;border-radius:50%;background:${col}22;border:2px solid ${col};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${col};font-family:var(--mono);flex-shrink:0;">${sc}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;color:var(--fg);">${dispDate(date)}</div>
          <div style="font-size:11px;color:var(--mu);margin-top:2px;">
            ${wDone ? "✓ Gym" : "— No gym"} · ${suppDoneCount} supps · ${prot}g protein · ${sl}h sleep
          </div>
        </div>
        <div style="font-size:10px;color:var(--mu);flex-shrink:0;">›</div>
      </div>`;
    });
  }
  html += `</div>`;
  return html;
}

function exportData() {
  const out = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k) out[k] = localStorage.getItem(k);
  }
  const blob = new Blob([JSON.stringify(out, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tracker-backup-" + todayStr() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      Object.keys(data).forEach((k) => localStorage.setItem(k, data[k]));
      const statusEl = document.getElementById("import-status");
      if (statusEl) {
        statusEl.style.color = "var(--ac)";
        statusEl.textContent =
          "✓ Imported " + Object.keys(data).length + " records successfully!";
      }
      setTimeout(() => {
        dayData = load(currentDate);
        refreshTopBar();
        renderContent();
      }, 500);
    } catch (err) {
      const statusEl = document.getElementById("import-status");
      if (statusEl) {
        statusEl.style.color = "#EF4444";
        statusEl.textContent = "Error reading file: " + err.message;
      }
    }
  };
  reader.readAsText(file);
}
function clearAllData() {
  if (
    !confirm(
      "This will delete ALL your tracked data permanently. Are you sure?",
    )
  )
    return;
  const keep = ["glassML", "customSupps"];
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
  keys.forEach((k) => {
    if (!keep.includes(k)) localStorage.removeItem(k);
  });
  dayData = emptyDay();
  save(dayData);
  refreshTopBar();
  renderContent();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function spawnDust() {
  const container = document.getElementById("ldr-dust");
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const d = document.createElement("div");
    d.className = "ldr-d";
    const size = 2 + Math.random() * 5;
    const rise = -(40 + Math.random() * 100);
    const rise2 = -(80 + Math.random() * 160);
    d.style.cssText = `
      width:${size}px;height:${size}px;
      left:${20 + Math.random() * 60}%;
      bottom:${5 + Math.random() * 20}%;
      --dur:${2 + Math.random() * 3}s;
      --del:${0.8 + Math.random() * 1.5}s;
      --rise:${rise}px;
      --rise2:${rise2}px;
      opacity:0.6;
    `;
    container.appendChild(d);
  }
}

function dismissLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  // screen shake at peak growth
  setTimeout(() => {
    loader.classList.add("shake");
  }, 1900);
  setTimeout(() => {
    loader.classList.remove("shake");
  }, 2350);
  // fade out loader
  setTimeout(() => {
    loader.classList.add("out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }, 2600);
}

function init() {
  const nameEl = document.getElementById("user-name");

  if (nameEl && profileData.name) {
    nameEl.innerText = "Welcome " + profileData.name + " 💪";
  }
  spawnDust();
  dismissLoader();
  const dp = document.getElementById("date-picker");
  if (dp) dp.value = currentDate;
  dayData = load(currentDate);
  renderNav();
  refreshTopBar();
  renderContent();
}
init();
