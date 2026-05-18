# Layers of Gdańsk — A Thematic Almanac

## Project Overview
Standalone website presenting Gdańsk through 16 thematic layers. Independent from the church map at `claude-code-gdansk-experiment.vercel.app` (linked in header).

## Tech Stack
- Pure HTML + CSS + Vanilla JS (no build tools, no npm, no frameworks)
- Leaflet 1.9.4 + Leaflet.markercluster 1.5.3 (CDN)
- Google Fonts: Cinzel, Source Serif 4, Inter
- Deploys to Vercel as static site with zero configuration

## File Structure
```
/
├── index.html              ← single-page app shell
├── data/almanac.js         ← ALL content (source of truth — extracted from PPTX)
├── src/
│   ├── styles.css          ← all styles (global + component)
│   └── app.js              ← all interactivity
└── assets/                 ← images to be added later
```

## Content Source
All content extracted from `Gdansk_Almanac_Embelishment.pptx` (111 slides).
Do NOT paraphrase or invent content — only edit `data/almanac.js` from the PPTX.

## Key Design Decisions
- Layer colours are fixed (see ALMANAC.layers[*].colour in almanac.js)
- Layer 12 (Invisible) uses ghost/dashed card styling + LOST badge
- Layer 15 (Figures) uses figure card layout (role, dates, birthNote)
- Layer 16 (Records) uses large numeral callout as dominant visual
- Interlude (Hugo Grotius quote) renders between layers 02 and 03
- Map tile: CartoDB Voyager (same as church map app)

## Coordinates
All locations are real places in Gdańsk (~54.35°N, 18.65°E).
Layer 12 sites use approximate location of original buildings.

## Session Progress
- Session 1: ✅ PPTX → almanac.js, index.html, styles.css, app.js complete
  - All 16 layers, 90+ locations
  - Master map with clustering
  - Mini-maps per layer
  - Filter system (sidebar + map in sync)
  - Search across all content
  - Dark/light theme toggle
  - Interlude quote, front matter, closing sections
- Session 2+: Add images to /assets/, deploy to Vercel

## Deployment
Vercel → connect GitHub repo → auto-deploys (no vercel.json needed).
Project name: `gdansk-almanac`
