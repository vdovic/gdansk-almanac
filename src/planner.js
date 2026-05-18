// src/planner.js — Visitor Planner: state management, schema, and localStorage

'use strict';

// ── Constants ──────────────────────────────────────────────────────────────
const PLAN_VERSION = 1;
const PLAN_STORAGE_KEY = 'almanac-visitor-plan';
const PLAN_MAX_DAYS = 7;
const PLAN_MIN_DAYS = 1;

const PLAN_LOAD_THRESHOLDS = {
  comfortable: 360,  // ≤ 6 h → green
  full:        480   // 6–8 h → amber; > 8 h → red
};

// Default visit duration (minutes) per layer, used when loc.estimatedMinutes is absent
const PLAN_MINUTES_BY_LAYER = {
  "01": 60,   // Commercial — museums / historic interiors
  "02": 45,   // Maritime — waterfront mix
  "03": 30,   // Royal Power — monuments, streets
  "04": 45,   // Gothic / Religious — churches
  "05": 25,   // Defences — fortifications, gates
  "06": 30,   // Scientific — sites, monuments
  "07": 45,   // WWII — memorials
  "08": 75,   // Solidarity — museum + memorial sites
  "09": 45,   // Amber — shops, small museums
  "10": 45,   // Water / Motława — waterfront walks
  "11": 90,   // Natural — parks, forests
  "12": 15,   // Invisible — nothing visible; historical interest only
  "13": 60,   // Food & Coffee — café / restaurant stops
  "14": 60,   // Cultural spaces — theatres, galleries
  "15": 20,   // Figures — monuments, birthplaces
  "16": 45    // Records — major landmark sites
};

// ── Plan schema helpers ────────────────────────────────────────────────────
function planCreateEmpty(numberOfDays) {
  numberOfDays = Math.max(PLAN_MIN_DAYS, Math.min(PLAN_MAX_DAYS, numberOfDays || 3));
  return {
    version: PLAN_VERSION,
    title: "My Gdańsk Visit",
    numberOfDays,
    days: Array.from({ length: numberOfDays }, (_, i) => planCreateDay(i + 1))
  };
}

function planCreateDay(dayNumber) {
  return { dayNumber, title: "", notes: "", items: [] };
}

function planCreateItem(loc, layer) {
  const estimatedMinutes = loc.estimatedMinutes || PLAN_MINUTES_BY_LAYER[layer.id] || 30;
  const coords = (loc.lat && loc.lng) ? { lat: loc.lat, lng: loc.lng } : null;

  return {
    id: planGenerateId(),
    sourceId: loc.id,
    title: loc.nameEN || loc.namePL,
    type: layer.id === "15" ? "person-location" : "place",
    estimatedMinutes,
    address: loc.address || "",
    coordinates: coords,
    googleMapsUrl: coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : "",
    shortDescription: planFirstSentence(loc.narrative || loc.whatWasHere || ""),
    notes: ""
  };
}

function planGenerateId() {
  return "pi-" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function planFirstSentence(text) {
  const clean = (text || '').replace(/<[^>]+>/g, '');
  const m = clean.match(/^[^.!?]+[.!?]/);
  return m ? m[0] : clean.slice(0, 120) + (clean.length > 120 ? '…' : '');
}

// ── Storage ────────────────────────────────────────────────────────────────
let _plan = null;

function planLoad() {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === PLAN_VERSION && Array.isArray(parsed.days)) {
        _plan = parsed;
        return _plan;
      }
    }
  } catch (_) {}
  _plan = planCreateEmpty();
  return _plan;
}

function planSave() {
  if (!_plan) return;
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(_plan));
  } catch (_) {}
}

function planGet() {
  if (!_plan) planLoad();
  return _plan;
}

function planReset() {
  _plan = planCreateEmpty();
  planSave();
  return _plan;
}

// ── Day management ─────────────────────────────────────────────────────────
function planSetDayCount(n) {
  const plan = planGet();
  const newCount = Math.max(PLAN_MIN_DAYS, Math.min(PLAN_MAX_DAYS, n));

  if (newCount < plan.numberOfDays) {
    // Move displaced items to the Unassigned bucket (dayNumber = 0)
    for (let d = newCount + 1; d <= plan.numberOfDays; d++) {
      const day = plan.days.find(x => x.dayNumber === d);
      if (!day || day.items.length === 0) continue;
      let unassigned = plan.days.find(x => x.dayNumber === 0);
      if (!unassigned) {
        unassigned = planCreateDay(0);
        unassigned.title = "Unassigned";
        plan.days.unshift(unassigned);
      }
      unassigned.items.push(...day.items.map(i => ({ ...i, day: 0 })));
    }
    plan.days = plan.days.filter(d => d.dayNumber <= newCount || d.dayNumber === 0);
  } else {
    for (let d = plan.numberOfDays + 1; d <= newCount; d++) {
      plan.days.push(planCreateDay(d));
    }
  }

  plan.numberOfDays = newCount;
  planSave();
  return plan;
}

// ── Item management ────────────────────────────────────────────────────────
function planAddItem(loc, layer, dayNumber) {
  const plan = planGet();
  const day = plan.days.find(d => d.dayNumber === dayNumber);
  if (!day) return null;

  const item = planCreateItem(loc, layer);
  item.day = dayNumber;
  item.order = day.items.length;
  day.items.push(item);
  planSave();
  return item;
}

function planRemoveItem(itemId) {
  const plan = planGet();
  for (const day of plan.days) {
    const idx = day.items.findIndex(i => i.id === itemId);
    if (idx !== -1) {
      day.items.splice(idx, 1);
      day.items.forEach((it, i) => (it.order = i));
      planSave();
      return true;
    }
  }
  return false;
}

function planMoveItem(itemId, targetDayNumber) {
  const plan = planGet();
  let found = null;

  for (const day of plan.days) {
    const idx = day.items.findIndex(i => i.id === itemId);
    if (idx !== -1) {
      [found] = day.items.splice(idx, 1);
      day.items.forEach((it, i) => (it.order = i));
      break;
    }
  }

  if (!found) return false;

  const target = plan.days.find(d => d.dayNumber === targetDayNumber);
  if (!target) return false;

  found.day = targetDayNumber;
  found.order = target.items.length;
  target.items.push(found);
  planSave();
  return true;
}

function planReorderItem(itemId, newOrder) {
  const plan = planGet();
  for (const day of plan.days) {
    const idx = day.items.findIndex(i => i.id === itemId);
    if (idx === -1) continue;
    const [item] = day.items.splice(idx, 1);
    const clamped = Math.max(0, Math.min(day.items.length, newOrder));
    day.items.splice(clamped, 0, item);
    day.items.forEach((it, i) => (it.order = i));
    planSave();
    return true;
  }
  return false;
}

function planUpdateItemNotes(itemId, notes) {
  const plan = planGet();
  for (const day of plan.days) {
    const item = day.items.find(i => i.id === itemId);
    if (item) { item.notes = notes; planSave(); return true; }
  }
  return false;
}

function planUpdateDay(dayNumber, fields) {
  const plan = planGet();
  const day = plan.days.find(d => d.dayNumber === dayNumber);
  if (!day) return false;
  if (fields.title  !== undefined) day.title  = fields.title;
  if (fields.notes  !== undefined) day.notes  = fields.notes;
  planSave();
  return true;
}

// ── Queries ────────────────────────────────────────────────────────────────
function planIsInPlan(sourceId) {
  return planGet().days.some(d => d.items.some(i => i.sourceId === sourceId));
}

function planGetDayMinutes(dayNumber) {
  const day = planGet().days.find(d => d.dayNumber === dayNumber);
  return day ? day.items.reduce((s, i) => s + (i.estimatedMinutes || 0), 0) : 0;
}

function planGetLoadStatus(minutes) {
  if (minutes <= PLAN_LOAD_THRESHOLDS.comfortable) return 'comfortable';
  if (minutes <= PLAN_LOAD_THRESHOLDS.full)        return 'full';
  return 'overloaded';
}

function planGetTotalItemCount() {
  return planGet().days.reduce((s, d) => s + d.items.length, 0);
}

// ── Formatting ─────────────────────────────────────────────────────────────
function planFormatMinutes(minutes) {
  if (!minutes) return '0 min';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

// ── URL encode / decode (Phase 6) ──────────────────────────────────────────
function planEncodeToUrl(plan) {
  try {
    const json = JSON.stringify(plan || planGet());
    const encoded = btoa(unescape(encodeURIComponent(json)));
    return encoded.length <= 2000 ? encoded : null;
  } catch (_) { return null; }
}

function planDecodeFromUrl(encoded) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch (_) { return null; }
}
