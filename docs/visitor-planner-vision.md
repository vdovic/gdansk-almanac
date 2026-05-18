# Visitor Planner — Product Vision & Implementation Reference

**Project:** Layers of Gdańsk — A Thematic Almanac  
**Feature:** Visitor Itinerary Planner  
**Document version:** 1.0 — May 2026  
**Status:** Vision approved, Phase 1 in progress

---

## 1. Product Vision

The Gdańsk Almanac should evolve from a passive thematic guide into a practical visitor-hosting companion.

The user should be able to prepare a curated 1–7 day visit plan for friends, combining historical depth with realistic daily logistics.

The planner should respect the spirit of the app:

- historical storytelling
- thematic layers of Gdańsk
- emotionally rich but practical exploration
- maps and context
- not just a "tourist checklist"

The Almanac already contains all the raw material: 91 locations across 16 thematic layers, coordinates, narratives, and cross-references. The planner turns that material into a shareable, exportable day-by-day plan.

---

## 2. Core User Story

> As the host of visitors in Gdańsk, I want to select meaningful places and people-linked records from the Almanac, assign them to specific days, organize them into a realistic route, and export a beautiful PDF itinerary, so that I can share a thoughtful visit plan with my friends.

---

## 3. Main Functional Requirements

### 3.1 Remove Part Filter

- Remove only the visible **Part I / Part II / Part III** filter buttons from the UI (sidebar filter bar and map controls).
- Do not remove the underlying `part` field from the data model.
- Preserve search and all other filters.
- The `filterMapByPart()` function and `applyFilters()` remain in code — they are still called by `showOnMap()`.

### 3.2 Trip Duration

- Add a visitor planner supporting **1–7 days**.
- User can change the number of days at any time.
- Reducing days: items assigned to removed days move to a holding area ("Unassigned") rather than being silently deleted.

### 3.3 Adding Items to the Plan

Eligible items for the planner:

- All standard location cards (layers 01–11, 13–14)
- Figure cards (layer 15) **only** if they have a concrete associated location: birthplace, monument, museum, grave, church, or street
- Invisible layer (layer 12): eligible for historical interest but marked as "site only — nothing to see"
- Record cards (layer 16): eligible as visit targets (e.g. St. Mary's, Great Mill)

Each eligible card gets an **"Add to Plan"** button that opens a small day-picker (Day 1 … Day N).  
Drag-and-drop is reordering aid, not the primary way to add items.

Duplicates: warn the user if an item is already in the plan, but allow adding it again (e.g., passing the same church on two different days).

### 3.4 Planner Page

Route: `/planner` (implemented as a hash route `#planner` since the app is a pure static SPA with no server routing).

The planner page shows:

- Selected number of days (editable)
- Each day as a section (column on desktop, stacked on mobile)
- List of planned items per day, with estimated time
- Total estimated time per day
- Visual load indicator: comfortable / full / overloaded
- Ability to reorder items within a day via drag-and-drop
- Ability to move items between days
- Ability to remove items
- Per-item notes
- Per-day notes and optional custom day title

### 3.5 Estimated Visit Time

Defaults (no field currently in the data model — will be added to `data/almanac.js` per-location):

| Type | Default |
|------|---------|
| Quick stop / monument | 15–25 min |
| Exterior architectural stop | 20–30 min |
| Church / historic interior | 30–60 min |
| Museum (standard) | 90–150 min |
| Major museum / deep visit | 120–180 min |
| Park / forest / seaside walk | 60–180 min |
| Food / coffee stop | 45–90 min |

Day load thresholds:

| Total minutes | Status | Visual |
|---|---|---|
| 0–360 (0–6 h) | Comfortable | green |
| 361–480 (6–8 h) | Full but realistic | amber |
| 481+ (8+ h) | Overloaded | red warning |

Users are never blocked from exceeding 8 hours — just warned clearly.

### 3.6 Maps and Links

Each planned item includes, where available:

- Coordinates (already present in `data/almanac.js` as `lat`/`lng`)
- Google Maps link — generated from coords if no explicit link: `https://www.google.com/maps?q=LAT,LNG`
- Address (to be added to data model in a future phase)
- "Open in Google Maps" action button

### 3.7 Local Save

Planner state persists in `localStorage` under key `almanac-visitor-plan`.  
The user does not lose the plan on page refresh.

### 3.8 Shareable Link

MVP approach: encode plan into URL hash using `#planner?plan=BASE64_JSON`.

- On load, detect `plan=` in the URL hash and reconstruct the plan
- If the encoded string would exceed ~2000 characters, show a graceful message: "Plan is too large for a URL — use PDF export to share"
- No database, no server, no accounts

### 3.9 PDF Export

Client-side PDF, no backend.

Preferred library: **jsPDF** (lightweight, MIT, CDN-compatible, no build tools needed).

PDF contents:

- Title: *Gdańsk Visit Plan*
- Subtitle: date range (if provided), number of days
- Each day as a section with ordered list of places
- Per-item: name, estimated time, address/coords if available, Google Maps link, short description (first sentence of narrative)
- Per-day: total time, overload warning if applicable, notes
- Footer: *Layers of Gdańsk · gdansk-almanac.vercel.app*

PDF does not need to be pixel-perfect in v1 — it must be readable and useful.

---

## 4. Data Model

### 4.1 Additions to `data/almanac.js`

Each location object will gain two optional fields:

```js
{
  // existing fields...
  estimatedMinutes: 45,   // default visit duration in minutes
  address: "Długi Targ 1, 80-828 Gdańsk",  // optional, added per-location
}
```

These will be added incrementally. If `estimatedMinutes` is absent, the planner uses a type-based default.

### 4.2 Planner State (in localStorage and URL encoding)

```js
const VisitorPlan = {
  version: 1,
  title: "My Gdańsk Visit",
  numberOfDays: 3,
  days: [
    {
      dayNumber: 1,
      title: "",       // optional custom title, e.g. "Old Town & Waterfront"
      notes: "",
      items: [
        {
          id: "plan-item-uuid",
          sourceId: "01-2",            // ALMANAC location id
          title: "Artus Court",
          type: "place",               // 'place' | 'person-location' | 'custom'
          day: 1,
          order: 0,
          estimatedMinutes: 45,
          address: "",
          coordinates: { lat: 54.3487, lng: 18.6535 },
          googleMapsUrl: "https://www.google.com/maps?q=54.3487,18.6535",
          shortDescription: "Named after King Arthur and his Round Table...",
          notes: ""
        }
      ]
    }
  ]
};
```

### 4.3 Figure Cards Eligibility

Layer 15 figures with concrete visitable locations:

| Figure | Eligible | Location |
|--------|----------|----------|
| Schopenhauer | ✓ | Birthplace: Św. Ducha 47 |
| Fahrenheit | ✓ | Monument on Długi Targ |
| Hevelius | ✓ | Observatory site: Korzenna St. + burial: St. Catherine's |
| Rilke | ✗ | Indirect connection only |
| Lou Andreas-Salomé | ✗ | No concrete Gdańsk location |
| Günter Grass | ✓ | Childhood neighbourhood: Wrzeszcz |
| Jan III Sobieski | ✓ | Monument: Targ Drzewny + Royal Chapel |
| Lech Wałęsa | ✓ | Gate #2 + Monument to Fallen Workers |

---

## 5. UX Principles

- **Simple first** — the planner should feel natural, not like a separate product
- **Mobile-friendly** — columns collapse to stacked sections on small screens
- **Non-destructive** — no silent deletions; always confirm or undo
- **Thematically consistent** — typography, colours, and tone match the Almanac
- **Day overload is visible, not blocking** — warn clearly, trust the user
- **Empty states are welcoming** — guide the user to start adding places
- **Add-to-plan is one tap** — button on card → pick day → done
- **PDF is readable offline** — the exported document should stand alone

---

## 6. Phased Implementation Plan

### Phase 1 — Documentation and Cleanup ✅ DONE
- [x] Create `docs/visitor-planner-vision.md`
- [x] Remove visible Part I / Part II / Part III filter from sidebar and map controls
- [x] Verify remaining filters (search, map) still work
- [x] No other layout changes

### Phase 2 — Planner Data Model and Local Storage ✅ DONE
- [x] Create `src/planner.js` with state management utilities
- [x] Add `localStorage` read/write for `almanac-visitor-plan`
- [x] Define plan schema and validation helpers
- [x] Add `estimatedMinutes` defaults per location type (by layer)

### Phase 3 — Add-to-Day Buttons
- [ ] Add "Add to Plan" button on each eligible location card
- [ ] Day-picker UI (dropdown or mini-modal)
- [ ] Duplicate detection with warning toast
- [ ] Small confirmation feedback after adding
- [ ] Update planner badge in header (item count)

### Phase 4 — Planner Page (`#planner`)
- [ ] Hash-based routing: detect `#planner` and render planner view
- [ ] Day columns/sections with item list
- [ ] Per-day time total and load indicator
- [ ] Item removal
- [ ] Per-item and per-day notes
- [ ] "Open in Google Maps" links
- [ ] Empty-state guidance

### Phase 5 — Drag and Drop Reordering
- [ ] Drag-and-drop within a day (reorder)
- [ ] Drag-and-drop between days (move)
- [ ] Touch-friendly (pointer events or a lightweight lib like SortableJS via CDN)
- [ ] localStorage syncs on every drag end

### Phase 6 — Shareable Link ✅ DONE
- [x] Encode plan to `#planner?plan=BASE64` (URL-safe base64url)
- [x] Decode on load and restore plan (`planLoadShared`, URL cleaned with replaceState)
- [x] "Share link" button in planner header
- [x] Handle oversized plans gracefully (toast: "Plan too large for a URL — use PDF export")

### Phase 7 — PDF Export
- [ ] Add jsPDF via CDN
- [ ] "Export PDF" button on planner page
- [ ] Structured output: title, days, items, times, notes, links
- [ ] Footer with app URL
- [ ] Test with 1-day and 7-day plans

### Phase 8 — Refinement
- [ ] Visual polish: empty states, loading, transitions
- [ ] Mobile UX improvements
- [ ] Custom item entry (free-text location not in Almanac)
- [ ] Accessibility review

---

## 7. Out of Scope for v1

- Automatic route optimization
- Real-time walking time between stops
- Email sending from the app
- Backend database or user accounts
- Collaborative/multi-user editing
- Calendar integration (Google Calendar export)
- AI-generated full itinerary
- Live traffic or opening hours data

These are future enhancements and should not drive v1 architecture decisions.

---

## 8. Technical Constraints

- **No build tools** — plain HTML + CSS + vanilla JS, deployed as static site on Vercel
- **No npm** — all dependencies via CDN `<script>` tags
- **No framework** — extend the existing `state` object and render pattern
- **No server** — everything client-side; localStorage for persistence
- **Existing patterns** — new code should look and feel like `src/app.js`
- **Leaflet already loaded** — map features in the planner can reuse it
- **Vercel deployment** — `vercel --prod` after every change; GitHub push first

---

*Document maintained alongside the codebase. Update phase checkboxes as work progresses.*
