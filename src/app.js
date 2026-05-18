// src/app.js — Layers of Gdańsk interactive application

'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  activeLayers: new Set(ALMANAC.layers.map(l => l.id)),
  searchQuery: "",
  masterMap: null,
  miniMaps: {},        // layerId → Leaflet map
  markers: {},         // locationId → { marker, layer }
  clusterGroup: null,
  activeLayerInView: null
};

// ── Theme ──────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('almanac-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').textContent = saved === 'dark' ? '☀' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('almanac-theme', next);
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀' : '🌙';
});

// ── Sidebar toggle (mobile) ────────────────────────────────────────────────
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('main-content').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
});

// ── Render: Sidebar navigation ────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  let html = '';
  for (const part of ALMANAC.parts) {
    html += `<div class="sidebar-part-heading">Part ${toRoman(part.id)} — ${part.title}</div>`;
    for (const layerId of part.layers) {
      const layer = ALMANAC.getLayer(layerId);
      html += `
        <a class="sidebar-layer-item" data-layer-id="${layer.id}" href="#layer-${layer.id}" onclick="scrollToLayer('${layer.id}',event)">
          <span class="layer-dot" style="background:${layer.colour}"></span>
          <span class="sidebar-layer-num">${layer.id}</span>
          <span class="sidebar-layer-name">${layer.titlePL}</span>
        </a>`;
    }
  }
  nav.innerHTML = html;
}

function scrollToLayer(id, e) {
  if (e) e.preventDefault();
  const el = document.getElementById('layer-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('sidebar').classList.remove('open');
}

// ── Render: Front matter ──────────────────────────────────────────────────
function renderHero() {
  const container = document.getElementById('fm-hero-container');
  if (!container || !ALMANAC.meta.heroImage) return;
  const { url, credit } = ALMANAC.meta.heroImage;
  container.innerHTML = `
    <div class="fm-hero">
      <img class="fm-hero-image" src="${url}" alt="Gdańsk panorama" loading="lazy">
      <div class="fm-hero-overlay"></div>
      ${credit ? `<span class="fm-hero-credit">${credit}</span>` : ''}
    </div>`;
}

function renderForeword() {
  const el = document.getElementById('foreword-text');
  el.innerHTML = ALMANAC.meta.foreword.split('\n\n').map(p => `<p>${p}</p>`).join('');
}

function renderChronology() {
  const el = document.getElementById('chronology-timeline');
  el.innerHTML = ALMANAC.meta.chronology.map(entry => `
    <div class="timeline-entry">
      <div class="timeline-year">${entry.year}</div>
      <div class="timeline-event">${entry.event}</div>
      <div class="timeline-desc">${entry.desc}</div>
    </div>`).join('');
}

function renderContents() {
  const table = document.getElementById('contents-table');
  let html = '';
  let currentPart = 0;
  for (const layer of ALMANAC.layers) {
    if (layer.part !== currentPart) {
      currentPart = layer.part;
      const part = ALMANAC.parts.find(p => p.id === currentPart);
      html += `<tr class="contents-part-row"><td colspan="4">Part ${toRoman(currentPart)} — ${part.title}</td></tr>`;
    }
    html += `
      <tr onclick="scrollToLayer('${layer.id}',event)" style="cursor:pointer">
        <td class="contents-num">${layer.id}</td>
        <td class="contents-dot"><span class="contents-dot-inner" style="background:${layer.colour}"></span></td>
        <td class="contents-pl">${layer.titlePL}</td>
        <td class="contents-en">${layer.titleEN}</td>
      </tr>`;
  }
  table.innerHTML = html;
}

// ── Render: Layer sections ────────────────────────────────────────────────
function renderLayers() {
  const container = document.getElementById('layers-container');
  let html = '';

  for (const layer of ALMANAC.layers) {
    // Check for interlude before this layer
    const interlude = ALMANAC.interludes.find(i => i.afterLayer === getPrevLayerId(layer.id));
    if (interlude) {
      html += renderInterlude(interlude);
    }

    html += renderLayerSection(layer);
  }

  container.innerHTML = html;
}

function getPrevLayerId(id) {
  const idx = ALMANAC.layers.findIndex(l => l.id === id);
  if (idx <= 0) return null;
  return ALMANAC.layers[idx - 1].id;
}

function renderInterlude(interlude) {
  return `
    <div class="interlude-quote">
      <p class="interlude-text">${interlude.quote}</p>
      <div class="interlude-attribution">— ${interlude.author} · ${interlude.source}</div>
    </div>`;
}

function renderLayerSection(layer) {
  const narrativeHTML = layer.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('');

  let locationsHTML = '';
  if (layer.id === '12') {
    locationsHTML = renderInvisibleCards(layer);
  } else if (layer.id === '15') {
    locationsHTML = renderFigureCards(layer);
  } else if (layer.id === '16') {
    locationsHTML = renderRecordCards(layer);
  } else {
    locationsHTML = renderStandardCards(layer);
  }

  const churchMapBadge = layer.churchMapRef ? `
    <a href="https://claude-code-gdansk-experiment.vercel.app" target="_blank" rel="noopener" class="church-map-badge">
      ⛪ Explore on the interactive church map →
    </a>` : '';

  return `
    <section class="layer-section" id="layer-${layer.id}" data-layer="${layer.id}"
             style="--layer-colour:${layer.colour}">
      <div class="layer-header">
        <div class="layer-roman">— ${layer.romanNumeral} —</div>
        <div class="layer-title-pl">${layer.titlePL}</div>
        <div class="layer-title-en">${layer.titleEN}</div>
        <div class="layer-tagline">${layer.tagline}</div>
      </div>

      <div class="layer-narrative">${narrativeHTML}</div>
      ${churchMapBadge}

      <div class="plate-caption${layer.image ? ' has-image' : ''}">
        ${layer.image ? `<img class="plate-image" src="${layer.image}" alt="${layer.plateCaption}" loading="lazy">` : ''}
        <div class="plate-caption-text">${layer.plateCaption}</div>
        ${layer.imageCredit ? `<span class="plate-credit">${layer.imageCredit}</span>` : ''}
      </div>

      <div class="layer-mini-map" id="mini-map-${layer.id}"></div>

      ${locationsHTML}
    </section>`;
}

function renderStandardCards(layer) {
  return `<div class="location-grid">${layer.locations.map(loc => renderStandardCard(loc, layer)).join('')}</div>`;
}

function renderStandardCard(loc, layer) {
  const narrativeHTML = loc.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('');
  const factsHTML = (loc.facts || []).map(f => `<span class="fact-pill">${f}</span>`).join('');
  const crossRefsHTML = (loc.crossRefs || []).map(cr =>
    `<a class="crossref-link" onclick="scrollToLayer('${cr.layerId}',event)" href="#layer-${cr.layerId}">→ ${cr.label}</a>`
  ).join('');

  return `
    <div class="location-card" id="loc-${loc.id}" data-loc-id="${loc.id}" data-layer-id="${layer.id}"
         style="--layer-colour:${layer.colour}">
      ${loc.image ? `<div class="location-thumb-wrap"><img class="location-thumb" src="${loc.image}" alt="${loc.nameEN}" loading="lazy"></div>` : ''}
      <div class="location-card-header">
        <div class="location-name-pl">${loc.namePL}</div>
        <div class="location-name-en">${loc.nameEN}</div>
        ${loc.subheading ? `<div class="location-subheading">${loc.subheading}</div>` : ''}
      </div>
      ${factsHTML ? `<div class="fact-pills">${factsHTML}</div>` : ''}
      <div class="location-narrative">${narrativeHTML}</div>
      <div class="card-actions">
        ${crossRefsHTML}
        ${renderAddToPlanBtn(loc, layer)}
        <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
      </div>
    </div>`;
}

function renderInvisibleCards(layer) {
  return `<div class="location-grid">${layer.locations.map(loc => {
    return `
      <div class="location-card" id="loc-${loc.id}" data-loc-id="${loc.id}" data-layer-id="${layer.id}"
           style="--layer-colour:${layer.colour}">
        ${loc.image ? `<div class="location-thumb-wrap"><img class="location-thumb" src="${loc.image}" alt="${loc.namePL}" loading="lazy"></div>` : ''}
        <span class="lost-badge">LOST</span>
        <div class="location-card-header">
          <div class="location-name-pl">${loc.namePL}</div>
          <div class="location-name-en">${loc.nameEN}</div>
        </div>
        <div class="invisible-section">
          <div>
            <div class="invisible-label">What Was Here</div>
            <div class="invisible-value">${loc.whatWasHere}</div>
          </div>
          <div>
            <div class="invisible-label">When Built</div>
            <div class="invisible-value">${loc.whenBuilt}</div>
          </div>
          <div>
            <div class="invisible-label">What Happened</div>
            <div class="invisible-value">${loc.whatHappened}</div>
          </div>
          <div>
            <div class="invisible-label">Why It Mattered</div>
            <div class="invisible-value">${loc.whyItMattered}</div>
          </div>
        </div>
        <div class="card-actions">
          ${renderAddToPlanBtn(loc, layer)}
          <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
        </div>
      </div>`;
  }).join('')}</div>`;
}

function renderFigureCards(layer) {
  return `<div class="location-grid">${layer.locations.map(loc => {
    const narrativeHTML = loc.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('');
    return `
      <div class="location-card figure-card" id="loc-${loc.id}" data-loc-id="${loc.id}" data-layer-id="${layer.id}"
           style="--layer-colour:${layer.colour}">
        ${loc.image ? `<div class="location-thumb-wrap"><img class="location-thumb" src="${loc.image}" alt="${loc.namePL}" loading="lazy"></div>` : ''}
        <div class="figure-role" style="color:${layer.colour}">${loc.role}</div>
        <div class="location-name-pl">${loc.namePL}</div>
        <div class="figure-dates">${loc.dates}</div>
        <div class="figure-birth-note">${loc.birthNote}</div>
        <div class="location-narrative">${narrativeHTML}</div>
        <div class="figure-location-note">📍 ${loc.locationNote}</div>
        <div class="card-actions">
          ${renderAddToPlanBtn(loc, layer)}
          <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
        </div>
      </div>`;
  }).join('')}</div>`;
}

function renderRecordCards(layer) {
  return `<div class="location-grid">${layer.locations.map(loc => {
    const narrativeHTML = loc.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('');
    const factsHTML = (loc.facts || []).map(f => `<span class="fact-pill">${f}</span>`).join('');
    return `
      <div class="location-card record-card" id="loc-${loc.id}" data-loc-id="${loc.id}" data-layer-id="${layer.id}"
           style="--layer-colour:${layer.colour}">
        ${loc.image ? `<div class="location-thumb-wrap"><img class="location-thumb" src="${loc.image}" alt="${loc.namePL}" loading="lazy"></div>` : ''}
        <div class="record-numeral" style="color:${layer.colour}">${loc.record}</div>
        <div class="record-unit">${loc.recordUnit}</div>
        <div class="record-label">${loc.recordLabel}</div>
        <div class="location-name-pl">${loc.namePL}</div>
        ${factsHTML ? `<div class="fact-pills" style="justify-content:center">${factsHTML}</div>` : ''}
        <div class="location-narrative" style="text-align:left;margin-top:14px">${narrativeHTML}</div>
        <div class="card-actions">
          ${renderAddToPlanBtn(loc, layer)}
          <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
        </div>
      </div>`;
  }).join('')}</div>`;
}

// ── Render: Closing sections ──────────────────────────────────────────────
function renderClosing() {
  const container = document.getElementById('closing-container');
  const cl = ALMANAC.closing;

  // Itineraries
  const threeDaysHTML = cl.itineraries.threeDays.map(day => `
    <div class="itinerary-day">
      <div class="itinerary-day-label">${day.day}</div>
      <div class="itinerary-day-content">
        <div class="itinerary-day-title">${day.title}</div>
        <div class="itinerary-day-desc">${day.desc}</div>
      </div>
    </div>`).join('');

  const fiveDaysHTML = cl.itineraries.fiveDays.map(day => `
    <div class="itinerary-day">
      <div class="itinerary-day-label">${day.day}</div>
      <div class="itinerary-day-content">
        <div class="itinerary-day-title">${day.title}</div>
        <div class="itinerary-day-desc">${day.desc}</div>
      </div>
    </div>`).join('');

  const byInterestHTML = `<div class="interest-grid">${cl.itineraries.byInterest.map(item => `
    <div class="interest-card">
      <div class="interest-theme">${item.theme}</div>
      <div class="interest-layers">${item.layers.map(lid => {
        const layer = ALMANAC.getLayer(lid);
        return layer ? `<span class="interest-layer-chip" onclick="scrollToLayer('${lid}',event)"
                             style="background:${layer.colour}22;border-color:${layer.colour}44;color:${layer.colour}">
          ${lid} ${layer.titleEN}
        </span>` : '';
      }).join('')}</div>
    </div>`).join('')}</div>`;

  // Resources
  const museumsHTML = cl.resources.museums.map(r => `
    <div class="resource-item">
      <span class="resource-name"><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></span>
      <span class="resource-desc">${r.url.replace('https://', '')}</span>
    </div>`).join('');

  const readingHTML = cl.resources.reading.map(r => `
    <div class="resource-item">
      <span class="resource-name">${r.title}${r.author ? ' — ' + r.author : ''}</span>
      ${r.desc ? `<span class="resource-desc">${r.desc}</span>` : ''}
    </div>`).join('');

  const practicalHTML = cl.resources.practical.map(r => `
    <div class="resource-item">
      <span class="resource-name">${r.url ? `<a href="${r.url}" target="_blank" rel="noopener">${r.name}</a>` : r.name}</span>
      ${r.desc ? `<span class="resource-desc">${r.desc}</span>` : ''}
    </div>`).join('');

  container.innerHTML = `
    <section class="closing-section" id="itineraries">
      <div class="section-header">Suggested Itineraries</div>
      <div class="itinerary-tabs">
        <button class="itinerary-tab active" data-tab="3days">3 Days</button>
        <button class="itinerary-tab" data-tab="5days">5 Days</button>
        <button class="itinerary-tab" data-tab="interest">By Interest</button>
      </div>
      <div class="itinerary-content active" id="tab-3days">${threeDaysHTML}</div>
      <div class="itinerary-content" id="tab-5days">${fiveDaysHTML}</div>
      <div class="itinerary-content" id="tab-interest">${byInterestHTML}</div>
    </section>

    <section class="closing-section" id="resources" style="margin-top:48px">
      <div class="section-header">For Further Exploration</div>
      <div class="resources-group">
        <div class="resources-group-title">Museums & Institutions</div>
        ${museumsHTML}
      </div>
      <div class="resources-group">
        <div class="resources-group-title">Selected Reading</div>
        ${readingHTML}
      </div>
      <div class="resources-group">
        <div class="resources-group-title">Practical</div>
        ${practicalHTML}
      </div>
    </section>`;

  // Reflection
  document.getElementById('reflection-text').innerHTML =
    ALMANAC.closing.reflection.split('\n\n').map(p => `<p>${p}</p>`).join('');

  // Itinerary tabs
  document.querySelectorAll('.itinerary-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.itinerary-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.itinerary-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });
}

// ── Master Map ────────────────────────────────────────────────────────────
function initMasterMap() {
  const map = L.map('master-map', {
    center: [54.3520, 18.6466],
    zoom: 13,
    zoomControl: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  state.masterMap = map;
  state.clusterGroup = L.markerClusterGroup({
    maxClusterRadius: 40,
    spiderfyOnMaxZoom: true
  });
  map.addLayer(state.clusterGroup);

  // Add all markers
  for (const layer of ALMANAC.layers) {
    for (const loc of layer.locations) {
      if (!loc.lat || !loc.lng) continue;
      addMarker(loc, layer);
    }
  }

  // Map filter buttons
  document.querySelectorAll('[data-map-part]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-map-part]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMapByPart(btn.dataset.mapPart);
    });
  });
}

function addMarker(loc, layer) {
  const circleMarker = L.circleMarker([loc.lat, loc.lng], {
    radius: 7,
    fillColor: layer.colour,
    color: '#fff',
    weight: 1.5,
    opacity: 1,
    fillOpacity: 0.85
  });

  const firstSentence = getFirstSentence(getLocNarrative(loc));

  circleMarker.bindTooltip(`<strong>${loc.nameEN || loc.namePL}</strong><br><span style="font-size:11px;color:#888">${layer.titleEN}</span>`, {
    sticky: true,
    className: 'almanac-tooltip'
  });

  circleMarker.bindPopup(`
    <div style="min-width:200px;max-width:260px">
      <span class="popup-layer-badge" style="background:${layer.colour}">${layer.titleEN}</span>
      <div class="popup-name">${loc.namePL}</div>
      ${loc.nameEN !== loc.namePL ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;font-style:italic">${loc.nameEN}</div>` : ''}
      <div class="popup-excerpt">${firstSentence}</div>
      <a class="popup-link" onclick="scrollToCard('${loc.id}')" href="#loc-${loc.id}">→ Read more</a>
    </div>`, { maxWidth: 280 });

  state.markers[loc.id] = { marker: circleMarker, layerId: layer.id, part: layer.part };
  state.clusterGroup.addLayer(circleMarker);
}

function getLocNarrative(loc) {
  return loc.narrative || loc.whatWasHere || '';
}

function getFirstSentence(text) {
  const clean = text.replace(/<[^>]+>/g, '');
  const m = clean.match(/^[^.!?]+[.!?]/);
  return m ? m[0] : clean.slice(0, 120) + '…';
}

function filterMapByPart(part) {
  state.clusterGroup.clearLayers();
  for (const [locId, info] of Object.entries(state.markers)) {
    if (part === 'all' || String(info.part) === String(part)) {
      if (state.activeLayers.has(info.layerId)) {
        state.clusterGroup.addLayer(info.marker);
      }
    }
  }
}

// ── Mini Maps ─────────────────────────────────────────────────────────────
function initMiniMaps() {
  for (const layer of ALMANAC.layers) {
    const el = document.getElementById('mini-map-' + layer.id);
    if (!el) continue;

    const locs = layer.locations.filter(l => l.lat && l.lng);
    if (locs.length === 0) { el.style.display = 'none'; continue; }

    const bounds = L.latLngBounds(locs.map(l => [l.lat, l.lng]));
    const center = bounds.getCenter();

    const map = L.map(el, {
      center: [center.lat, center.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    for (const loc of locs) {
      const m = L.circleMarker([loc.lat, loc.lng], {
        radius: 8,
        fillColor: layer.colour,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map);

      m.bindTooltip(loc.namePL, { sticky: true });
      m.on('click', () => scrollToCard(loc.id));
    }

    if (locs.length > 1) {
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
    }

    state.miniMaps[layer.id] = map;
  }
}

// ── Map ↔ Content sync ────────────────────────────────────────────────────
function showOnMap(locId) {
  const info = state.markers[locId];
  if (!info) return;

  // Scroll to master map
  document.getElementById('master-map-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  setTimeout(() => {
    // Reset to all parts filter
    document.querySelectorAll('[data-map-part]').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-map-part="all"]').classList.add('active');
    filterMapByPart('all');

    const map = state.masterMap;
    const marker = info.marker;
    state.clusterGroup.zoomToShowLayer(marker, () => {
      marker.openPopup();
      // Pulse the marker
      const el = marker.getElement && marker.getElement();
      if (el) {
        el.style.animation = 'markerPulse 0.8s ease';
        setTimeout(() => { el.style.animation = ''; }, 900);
      }
    });
  }, 400);
}

function scrollToCard(locId) {
  const card = document.getElementById('loc-' + locId);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('flash');
  setTimeout(() => card.classList.remove('flash'), 800);
  if (state.masterMap) state.masterMap.closePopup();
}

// ── Filter system ─────────────────────────────────────────────────────────
function applyFilters() {
  const { activeLayers } = state;

  // Sidebar items
  document.querySelectorAll('.sidebar-layer-item').forEach(item => {
    const id = item.dataset.layerId;
    item.classList.toggle('inactive', !activeLayers.has(id));
  });

  // Layer sections dimming
  document.querySelectorAll('.layer-section').forEach(section => {
    const id = section.dataset.layer;
    section.classList.toggle('dimmed', !activeLayers.has(id));
  });

  // Map markers
  const activeMapPart = document.querySelector('[data-map-part].active')?.dataset.mapPart || 'all';
  filterMapByPart(activeMapPart);
}

// (Part filter buttons removed — see docs/visitor-planner-vision.md Phase 1)

// ── Search ────────────────────────────────────────────────────────────────
let searchTimeout = null;

document.getElementById('search-input').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    applySearch();
  }, 200);
});

function applySearch() {
  const q = state.searchQuery;

  if (!q) {
    // Reset all
    document.querySelectorAll('.location-card').forEach(card => {
      card.style.opacity = '';
      card.style.display = '';
    });
    document.querySelectorAll('.sidebar-layer-item').forEach(item => {
      item.style.fontWeight = '';
    });
    // Show all markers
    filterMapByPart(document.querySelector('[data-map-part].active')?.dataset.mapPart || 'all');
    return;
  }

  const matchingLocIds = new Set();
  const matchingLayerIds = new Set();

  for (const layer of ALMANAC.layers) {
    const layerText = [layer.titlePL, layer.titleEN, layer.tagline, layer.narrative].join(' ').toLowerCase();
    const layerMatch = layerText.includes(q);

    for (const loc of layer.locations) {
      const locText = [
        loc.namePL, loc.nameEN, loc.subheading,
        getLocNarrative(loc),
        loc.role, loc.whatWasHere, loc.whatHappened,
        ...(loc.facts || [])
      ].filter(Boolean).join(' ').toLowerCase();

      if (locText.includes(q) || layerMatch) {
        matchingLocIds.add(loc.id);
        matchingLayerIds.add(layer.id);
      }
    }
  }

  // Fade non-matching cards
  document.querySelectorAll('.location-card').forEach(card => {
    const id = card.dataset.locId;
    card.style.opacity = matchingLocIds.has(id) ? '' : '0.25';
  });

  // Highlight matching layers in sidebar
  document.querySelectorAll('.sidebar-layer-item').forEach(item => {
    item.style.fontWeight = matchingLayerIds.has(item.dataset.layerId) ? '700' : '';
  });

  // Pulse matching markers on map
  state.clusterGroup.clearLayers();
  for (const [locId, info] of Object.entries(state.markers)) {
    if (matchingLocIds.has(locId)) {
      state.clusterGroup.addLayer(info.marker);
    }
  }
}

// ── IntersectionObserver: active layer in sidebar ─────────────────────────
function initScrollObserver() {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const layerId = entry.target.dataset.layer;
        if (!layerId) continue;
        document.querySelectorAll('.sidebar-layer-item').forEach(item => {
          item.classList.toggle('active', item.dataset.layerId === layerId);
        });
      }
    }
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  document.querySelectorAll('.layer-section').forEach(section => {
    observer.observe(section);
  });
}

// ── Routing ───────────────────────────────────────────────────────────────
function initRouting() {
  function handleHash() {
    const hash = window.location.hash;
    if (hash === '#planner' || hash.startsWith('#planner?')) {
      showPlannerView();
    } else {
      showAlmanacView();
    }
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

function showPlannerView() {
  document.getElementById('app').classList.add('planner-active');
  document.getElementById('planner-view').style.display = '';
  closeDayPicker();
  renderPlannerView();
}

function showAlmanacView() {
  document.getElementById('app').classList.remove('planner-active');
  document.getElementById('planner-view').style.display = 'none';
  updatePlanBadge();
}

// ── Planner page render ────────────────────────────────────────────────────
function renderPlannerView() {
  const plan = planGet();
  const view = document.getElementById('planner-view');
  const totalItems = planGetTotalItemCount();

  const dayBtnsHTML = Array.from({ length: 7 }, (_, i) => {
    const n = i + 1;
    const active = n === plan.numberOfDays ? ' active' : '';
    return `<button class="planner-day-btn${active}" onclick="changeDayCount(${n})">${n}</button>`;
  }).join('');

  const itemWord = totalItems === 1 ? 'place' : 'places';
  const dayWord  = plan.numberOfDays === 1 ? 'day' : 'days';
  const subtitleText = totalItems === 0
    ? 'Browse the Almanac and tap + Plan on any card to start.'
    : `${totalItems} ${itemWord} planned across ${plan.numberOfDays} ${dayWord}`;

  const sortedDays = plan.days
    .filter(d => d.dayNumber > 0)
    .sort((a, b) => a.dayNumber - b.dayNumber);

  const daysHTML = sortedDays.map(day => renderPlannerDay(day)).join('');

  const unassignedDay = plan.days.find(d => d.dayNumber === 0);
  const unassignedHTML = (unassignedDay && unassignedDay.items.length > 0)
    ? `<div class="planner-unassigned">
        <div class="planner-unassigned-label">Unassigned (days were reduced)</div>
        <div class="planner-day-items">${unassignedDay.items.map(i => renderPlannerItem(i)).join('')}</div>
       </div>`
    : '';

  const emptyStateHTML = totalItems === 0 ? `
    <div class="planner-empty-state">
      <div class="planner-empty-icon">○</div>
      <p>Your plan is empty.</p>
      <p>Browse the <a class="planner-almanac-link" href="#" onclick="location.hash=''">Almanac</a>
         and tap <strong>+ Plan</strong> on any location card to build your itinerary.</p>
    </div>` : '';

  const colTemplate = `repeat(${plan.numberOfDays}, minmax(0, 1fr))`;

  view.innerHTML = `
    <div class="planner-page-header">
      <div class="planner-title-group">
        <h1 class="planner-title">Your Gdańsk Visit</h1>
        <p class="planner-subtitle">${subtitleText}</p>
      </div>
      <div class="planner-controls">
        <span class="planner-days-label">Days:</span>
        <div class="planner-day-btns">${dayBtnsHTML}</div>
        <button class="planner-back-btn" onclick="location.hash=''">← Almanac</button>
      </div>
    </div>
    <div class="planner-days-wrapper">
      <div class="planner-days-grid" style="grid-template-columns:${colTemplate}">${daysHTML}</div>
    </div>
    ${unassignedHTML}
    ${emptyStateHTML}`;

  // Wire up notes and title inputs after DOM is ready
  view.querySelectorAll('.planner-item-notes').forEach(ta => {
    ta.addEventListener('blur', () => planUpdateItemNotes(ta.dataset.itemId, ta.value));
  });
  view.querySelectorAll('.planner-day-notes').forEach(ta => {
    ta.addEventListener('blur', () => planUpdateDay(+ta.dataset.dayNumber, { notes: ta.value }));
  });
  view.querySelectorAll('.planner-day-title-input').forEach(inp => {
    inp.addEventListener('blur', () => planUpdateDay(+inp.dataset.dayNumber, { title: inp.value }));
  });

  initPlannerSortable();
}

function renderPlannerDay(day) {
  const minutes = planGetDayMinutes(day.dayNumber);
  const status  = planGetLoadStatus(minutes);

  const loadHTML = minutes > 0
    ? `<div class="planner-day-load load-${status}">
        <span class="load-time">${planFormatMinutes(minutes)}</span>
        <span class="load-label">${status}</span>
       </div>`
    : `<div class="planner-day-load load-comfortable"><span class="load-time">Empty</span></div>`;

  const sortedItems = [...day.items].sort((a, b) => (a.order || 0) - (b.order || 0));
  const isEmpty = sortedItems.length === 0;
  const itemsHTML = sortedItems.map((item, idx) => renderPlannerItem(item, idx + 1)).join('');

  return `
    <div class="planner-day" data-day="${day.dayNumber}">
      <div class="planner-day-head">
        <div class="planner-day-num">Day ${day.dayNumber}</div>
        <input class="planner-day-title-input" data-day-number="${day.dayNumber}"
               value="${escapeAttr(day.title)}" placeholder="Add a title…">
        ${loadHTML}
      </div>
      <div class="planner-day-items">${itemsHTML}</div>
      <div class="planner-day-empty"${isEmpty ? '' : ' style="display:none"'}>
        <div class="planner-day-empty-icon">○</div>
        <div>No places yet.<br>Tap <strong>+ Plan</strong> on any card.</div>
      </div>
      <div class="planner-day-footer">
        <textarea class="planner-day-notes" data-day-number="${day.dayNumber}"
                  rows="2" placeholder="Day notes…">${escapeText(day.notes)}</textarea>
      </div>
    </div>`;
}

function renderPlannerItem(item, num) {
  const numBadge = num != null ? `<span class="planner-item-num">${num}</span>` : '';
  const mapsLink = item.googleMapsUrl
    ? `<a class="planner-item-map-link" href="${item.googleMapsUrl}" target="_blank" rel="noopener">↗ Maps</a>`
    : '';

  return `
    <div class="planner-item" data-item-id="${item.id}">
      <div class="planner-item-main">
        <div class="planner-item-drag-handle" title="Drag to reorder">⠿</div>
        ${numBadge}
        <div class="planner-item-body">
          <div class="planner-item-name">${item.title}</div>
          ${item.shortDescription ? `<div class="planner-item-desc">${item.shortDescription}</div>` : ''}
          <div class="planner-item-meta">
            <span class="planner-item-time">${planFormatMinutes(item.estimatedMinutes)}</span>
            ${mapsLink}
          </div>
        </div>
        <button class="planner-item-remove" onclick="removePlannerItem('${item.id}')" title="Remove">×</button>
      </div>
      <textarea class="planner-item-notes" data-item-id="${item.id}"
                rows="2" placeholder="Notes for this stop…">${escapeText(item.notes)}</textarea>
    </div>`;
}

// ── Planner interactions ───────────────────────────────────────────────────
function changeDayCount(n) {
  planSetDayCount(n);
  updatePlanBadge();
  renderPlannerView();
}

function removePlannerItem(itemId) {
  planRemoveItem(itemId);
  updatePlanBadge();
  renderPlannerView();
}

// ── Drag-and-drop (SortableJS) ────────────────────────────────────────────
function initPlannerSortable() {
  if (typeof Sortable === 'undefined') return;

  document.querySelectorAll('.planner-day-items').forEach(container => {
    Sortable.create(container, {
      group: 'planner-items',
      handle: '.planner-item-drag-handle',
      animation: 150,
      ghostClass: 'planner-item-ghost',
      dragClass: 'planner-item-dragging',
      onEnd: syncPlanFromDOM
    });
  });
}

function syncPlanFromDOM() {
  const plan = planGet();

  // Build a flat lookup of all items by id
  const allItems = {};
  for (const day of plan.days) {
    for (const item of day.items) allItems[item.id] = item;
  }

  // Clear items from all days, reassign from DOM order
  for (const day of plan.days) day.items = [];

  document.querySelectorAll('.planner-day').forEach(dayEl => {
    const dayNumber = parseInt(dayEl.dataset.day);
    const day = plan.days.find(d => d.dayNumber === dayNumber);
    if (!day) return;

    dayEl.querySelectorAll('.planner-item').forEach((itemEl, idx) => {
      const item = allItems[itemEl.dataset.itemId];
      if (!item) return;
      item.day   = dayNumber;
      item.order = idx;
      day.items.push(item);
    });
  });

  planSave();
  updateAfterDrag();
}

function updateAfterDrag() {
  document.querySelectorAll('.planner-day').forEach(dayEl => {
    const dayNumber = parseInt(dayEl.dataset.day);

    // Update item numbers
    dayEl.querySelectorAll('.planner-item').forEach((itemEl, idx) => {
      const numEl = itemEl.querySelector('.planner-item-num');
      if (numEl) numEl.textContent = idx + 1;
    });

    // Show/hide empty state
    const hasItems = dayEl.querySelectorAll('.planner-item').length > 0;
    const emptyEl  = dayEl.querySelector('.planner-day-empty');
    if (emptyEl) emptyEl.style.display = hasItems ? 'none' : '';

    // Update load indicator
    const minutes = planGetDayMinutes(dayNumber);
    const status  = planGetLoadStatus(minutes);
    const loadEl  = dayEl.querySelector('.planner-day-load');
    if (loadEl) {
      loadEl.className = `planner-day-load load-${status}`;
      const timeEl  = loadEl.querySelector('.load-time');
      const labelEl = loadEl.querySelector('.load-label');
      if (timeEl)  timeEl.textContent  = minutes > 0 ? planFormatMinutes(minutes) : 'Empty';
      if (labelEl) labelEl.textContent = status;
    }
  });

  // Update page subtitle
  const plan = planGet();
  const total = planGetTotalItemCount();
  const sub = document.querySelector('.planner-subtitle');
  if (sub) {
    const itemWord = total === 1 ? 'place' : 'places';
    const dayWord  = plan.numberOfDays === 1 ? 'day' : 'days';
    sub.textContent = total === 0
      ? 'Browse the Almanac and tap + Plan on any card to start.'
      : `${total} ${itemWord} planned across ${plan.numberOfDays} ${dayWord}`;
  }
}

function escapeAttr(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function escapeText(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// ── Planner: card button helpers ──────────────────────────────────────────
function isPlanEligible(loc, layer) {
  // All layers eligible; for figures (15) require coordinates
  if (layer.id === '15') return !!(loc.lat && loc.lng);
  return true;
}

function renderAddToPlanBtn(loc, layer) {
  if (!isPlanEligible(loc, layer)) return '';
  const invisible = layer.id === '12';
  const cls = invisible ? 'add-to-plan-btn atp-invisible' : 'add-to-plan-btn';
  const title = invisible
    ? 'Add to plan (historical interest — nothing visible on site)'
    : 'Add to visit plan';
  return `<button class="${cls}" onclick="addToPlan('${loc.id}','${layer.id}',event)" title="${title}">+ Plan</button>`;
}

// ── Planner: day picker interaction ───────────────────────────────────────
function addToPlan(locId, layerId, event) {
  event.stopPropagation();
  closeDayPicker();

  const layer = ALMANAC.getLayer(layerId);
  const loc = layer.locations.find(l => l.id === locId);
  const alreadyIn = planIsInPlan(locId);

  openDayPicker(loc, layer, alreadyIn, event.currentTarget);
}

function openDayPicker(loc, layer, alreadyIn, anchorEl) {
  const plan = planGet();
  const popup = document.getElementById('day-picker-popup');

  const warnHTML = alreadyIn
    ? `<span class="day-picker-warn">Already in plan — add again?</span>`
    : 'Add to day';

  let daysHTML = '';
  for (let d = 1; d <= plan.numberOfDays; d++) {
    daysHTML += `<button class="day-picker-day" onclick="confirmAddToDay('${loc.id}','${layer.id}',${d})">Day ${d}</button>`;
  }

  popup.innerHTML = `<div class="day-picker-header">${warnHTML}</div>${daysHTML}`;

  const rect = anchorEl.getBoundingClientRect();
  let left = rect.left;
  const popupWidth = 140;
  if (left + popupWidth > window.innerWidth - 8) {
    left = window.innerWidth - popupWidth - 8;
  }
  popup.style.top = (rect.bottom + 6) + 'px';
  popup.style.left = left + 'px';
  popup.classList.add('visible');

  setTimeout(() => document.addEventListener('click', closeDayPicker, { once: true }), 0);
}

function confirmAddToDay(locId, layerId, dayNumber) {
  const layer = ALMANAC.getLayer(layerId);
  const loc = layer.locations.find(l => l.id === locId);
  planAddItem(loc, layer, dayNumber);
  updatePlanBadge();
  closeDayPicker();
  showPlanToast(`Added to Day ${dayNumber}`);
}

function closeDayPicker() {
  document.getElementById('day-picker-popup').classList.remove('visible');
}

// ── Planner: toast ────────────────────────────────────────────────────────
function showPlanToast(message, type) {
  const toast = document.getElementById('plan-toast');
  toast.textContent = message;
  toast.className = 'plan-toast visible' + (type ? ' ' + type : '');
  clearTimeout(toast._tid);
  toast._tid = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ── Planner: header badge ─────────────────────────────────────────────────
function updatePlanBadge() {
  const count = planGetTotalItemCount();
  document.getElementById('plan-count').textContent = count;
}

// ── Utilities ─────────────────────────────────────────────────────────────
function toRoman(n) {
  const map = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
  return map[n] || String(n);
}

// ── Init ──────────────────────────────────────────────────────────────────
function init() {
  initTheme();
  renderSidebar();
  renderHero();
  renderForeword();
  renderChronology();
  renderContents();
  renderLayers();
  renderClosing();

  updatePlanBadge();

  // Init maps after DOM is painted
  requestAnimationFrame(() => {
    initMasterMap();
    // Delay mini maps to avoid layout thrash
    setTimeout(initMiniMaps, 200);
    initScrollObserver();
    initRouting();
  });
}

// Make scrollToLayer and scrollToCard globally accessible (used in onclick attrs)
window.scrollToLayer = scrollToLayer;
window.scrollToCard = scrollToCard;
window.showOnMap = showOnMap;
window.addToPlan = addToPlan;
window.confirmAddToDay = confirmAddToDay;
window.changeDayCount = changeDayCount;
window.removePlannerItem = removePlannerItem;

document.addEventListener('DOMContentLoaded', init);
