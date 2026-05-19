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
          <span class="sidebar-layer-name">${layer.titleEN}</span>
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
        <td class="contents-en">${layer.titleEN}</td>
        <td class="contents-pl">${layer.titlePL}</td>
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
        <div class="layer-title-en">${layer.titleEN}</div>
        <div class="layer-title-pl">${layer.titlePL}</div>
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

function almanacMapsUrl(loc) {
  const name = encodeURIComponent((loc.nameEN || loc.namePL) + ' Gdańsk');
  return loc.lat && loc.lng
    ? `https://www.google.com/maps/search/${name}/@${loc.lat},${loc.lng},17z`
    : `https://www.google.com/maps/search/${name}`;
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
        <div class="location-name-en">${loc.nameEN}</div>
        <div class="location-name-pl">${loc.namePL}</div>
        ${loc.subheading ? `<div class="location-subheading">${loc.subheading}</div>` : ''}
      </div>
      ${factsHTML ? `<div class="fact-pills">${factsHTML}</div>` : ''}
      <div class="location-narrative">${narrativeHTML}</div>
      <div class="card-actions">
        ${crossRefsHTML}
        ${renderAddToPlanBtn(loc, layer)}
        <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
        <a class="gmaps-card-link" href="${almanacMapsUrl(loc)}" target="_blank" rel="noopener">↗ Google Maps</a>
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
          <div class="location-name-en">${loc.nameEN}</div>
          <div class="location-name-pl">${loc.namePL}</div>
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
          <a class="gmaps-card-link" href="${almanacMapsUrl(loc)}" target="_blank" rel="noopener">↗ Google Maps</a>
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
        <div class="location-name-en">${loc.nameEN || loc.namePL}</div>
        <div class="location-name-pl">${loc.namePL !== (loc.nameEN || loc.namePL) ? loc.namePL : ''}</div>
        <div class="figure-dates">${loc.dates}</div>
        <div class="figure-birth-note">${loc.birthNote}</div>
        <div class="location-narrative">${narrativeHTML}</div>
        <div class="figure-location-note">📍 ${loc.locationNote}</div>
        <div class="card-actions">
          ${renderAddToPlanBtn(loc, layer)}
          <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
          <a class="gmaps-card-link" href="${almanacMapsUrl(loc)}" target="_blank" rel="noopener">↗ Google Maps</a>
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
        <div class="location-name-en">${loc.nameEN || loc.namePL}</div>
        <div class="location-name-pl">${loc.namePL !== (loc.nameEN || loc.namePL) ? loc.namePL : ''}</div>
        ${factsHTML ? `<div class="fact-pills" style="justify-content:center">${factsHTML}</div>` : ''}
        <div class="location-narrative" style="text-align:left;margin-top:14px">${narrativeHTML}</div>
        <div class="card-actions">
          ${renderAddToPlanBtn(loc, layer)}
          <button class="show-on-map-btn" onclick="showOnMap('${loc.id}')">⊙ Map</button>
          <a class="gmaps-card-link" href="${almanacMapsUrl(loc)}" target="_blank" rel="noopener">↗ Google Maps</a>
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
      <div class="popup-name">${loc.nameEN || loc.namePL}</div>
      ${loc.nameEN && loc.nameEN !== loc.namePL ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;font-style:italic">${loc.namePL}</div>` : ''}
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

      m.bindTooltip(loc.nameEN || loc.namePL, { sticky: true });
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
      // Decode and load a shared plan if present
      if (hash.startsWith('#planner?')) {
        const params = new URLSearchParams(hash.slice('#planner?'.length));
        const encoded = params.get('plan');
        if (encoded) {
          const shared = planDecodeFromUrl(encoded);
          if (shared) {
            planLoadShared(shared);
            // Clean URL so refreshing doesn't re-import the same plan
            history.replaceState(null, '', '#planner');
          }
        }
      }
      showPlannerView();
    } else {
      showAlmanacView();
    }
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

function copyShareLink() {
  const encoded = planEncodeToUrl();
  if (!encoded) {
    showPlanToast('Plan too large for a URL — use PDF export to share', 'warn');
    return;
  }
  const url = window.location.origin + window.location.pathname + '#planner?plan=' + encoded;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showPlanToast('Link copied to clipboard'))
      .catch(() => fallbackCopyLink(url));
  } else {
    fallbackCopyLink(url);
  }
}

// ── JSON Export / Import ───────────────────────────────────────────────────
function exportPlanJSON() {
  const plan = planGet();
  if (planGetTotalItemCount() === 0) {
    showPlanToast('Nothing to export — plan is empty', 'warn');
    return;
  }
  const json = JSON.stringify(plan, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href     = url;
  a.download = `gdansk-plan-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showPlanToast('Plan exported as JSON file');
}

function importPlanJSON() {
  const input = document.createElement('input');
  input.type  = 'file';
  input.accept = '.json,application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed || !Array.isArray(parsed.days)) {
          showPlanToast('Invalid plan file', 'warn');
          return;
        }
        const currentCount = planGetTotalItemCount();
        if (currentCount > 0 && !confirm(`Replace your current plan (${currentCount} place${currentCount !== 1 ? 's' : ''}) with the imported plan?`)) return;
        planLoadShared(parsed);
        updatePlanBadge();
        renderPlannerView();
        showPlanToast(`Plan imported: ${parsed.numberOfDays} day${parsed.numberOfDays !== 1 ? 's' : ''}`);
      } catch (_) {
        showPlanToast('Could not read file — is it a valid plan JSON?', 'warn');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── PDF Export ─────────────────────────────────────────────────────────────
function exportToPDF() {
  if (planGetTotalItemCount() === 0) {
    showPlanToast('Add places to your plan first', 'warn');
    return;
  }
  if (typeof window.jspdf === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = generatePDF;
    script.onerror = () => showPlanToast('Could not load PDF library', 'warn');
    document.head.appendChild(script);
    showPlanToast('Preparing PDF…');
    return;
  }
  generatePDF();
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const plan = planGet();
  const ML = 20, MR = 20, MT = 22;
  const PW = 210, PH = 297, CW = PW - ML - MR;
  const FOOTER_Y = PH - 11;
  let y = MT;

  function addFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(175, 155, 135);
    doc.text('Layers of Gdansk  ·  gdansk-almanac.vercel.app', PW / 2, FOOTER_Y, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  }

  function checkY(needed) {
    if (y + needed > FOOTER_Y - 6) { addFooter(); doc.addPage(); y = MT; }
  }

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(50, 35, 18);
  doc.text('Gdansk Visit Plan', ML, y);
  y += 9;

  const totalItems = planGetTotalItemCount();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(130, 100, 68);
  doc.text(`${plan.numberOfDays} day${plan.numberOfDays !== 1 ? 's' : ''}  ·  ${totalItems} place${totalItems !== 1 ? 's' : ''}`, ML, y);
  y += 7;

  doc.setDrawColor(190, 165, 138);
  doc.setLineWidth(0.4);
  doc.line(ML, y, PW - MR, y);
  y += 9;

  // Days
  const days = plan.days.filter(d => d.dayNumber > 0).sort((a, b) => a.dayNumber - b.dayNumber);

  for (let di = 0; di < days.length; di++) {
    const day = days[di];
    const sortedItems = [...day.items].sort((a, b) => (a.order || 0) - (b.order || 0));
    const minutes = planGetDayMinutes(day.dayNumber);
    const status  = planGetLoadStatus(minutes);

    checkY(26);

    // Day heading
    const headLabel = day.title
      ? `Day ${day.dayNumber}  —  ${depolish(day.title)}`
      : `Day ${day.dayNumber}`;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(55, 40, 18);
    doc.text(headLabel, ML, y);
    y += 6;

    if (minutes > 0) {
      const warn = status === 'overloaded' ? '  [⚠] Overloaded' : status === 'full' ? '  [·] Full day' : '';
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(160, 110, 50);
      doc.text(planFormatMinutes(minutes) + warn, ML, y);
      y += 5;
    }

    doc.setDrawColor(215, 195, 170);
    doc.setLineWidth(0.2);
    doc.line(ML, y, PW - MR, y);
    y += 5;

    if (sortedItems.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(170, 150, 130);
      doc.text('(no places planned for this day)', ML + 4, y);
      y += 6;
    }

    for (let ii = 0; ii < sortedItems.length; ii++) {
      const item = sortedItems[ii];
      checkY(22);

      // Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(25, 18, 12);
      doc.text(`${ii + 1}.  ${depolish(item.title)}`, ML + 2, y);
      y += 5;

      // Time + Maps link
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(155, 95, 30);
      const timeText = planFormatMinutes(item.estimatedMinutes);
      doc.text(timeText, ML + 6, y);
      const pdfMapsUrl = plannerMapsUrl(item);
      if (pdfMapsUrl) {
        const sep = '  ·  ';
        const tx = ML + 6 + doc.getTextWidth(timeText);
        doc.setTextColor(155, 95, 30);
        doc.text(sep, tx, y);
        doc.setTextColor(45, 95, 185);
        doc.textWithLink('Open in Google Maps', tx + doc.getTextWidth(sep), y, { url: pdfMapsUrl });
      }
      y += 5;

      // Address (for custom items)
      if (item.address) {
        checkY(5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(130, 105, 80);
        doc.text(depolish(item.address), ML + 6, y);
        y += 5;
      }

      // Short description (max 2 lines)
      if (item.shortDescription) {
        const lines = doc.splitTextToSize(depolish(item.shortDescription), CW - 8).slice(0, 2);
        checkY(lines.length * 4.5 + 2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 88, 76);
        doc.text(lines, ML + 6, y);
        y += lines.length * 4.5;
      }

      // Item notes
      if (item.notes && item.notes.trim()) {
        const lines = doc.splitTextToSize('Note: ' + depolish(item.notes), CW - 8);
        checkY(lines.length * 4.5 + 2);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(118, 98, 78);
        doc.text(lines, ML + 6, y);
        y += lines.length * 4.5;
      }

      y += 4;
    }

    // Day notes
    if (day.notes && day.notes.trim()) {
      const lines = doc.splitTextToSize('Day notes: ' + depolish(day.notes), CW);
      checkY(lines.length * 4.5 + 4);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(110, 90, 70);
      doc.text(lines, ML, y);
      y += lines.length * 4.5;
    }

    // Day separator
    if (di < days.length - 1) {
      y += 5;
      checkY(14);
      doc.setDrawColor(205, 182, 158);
      doc.setLineWidth(0.3);
      doc.line(ML, y, PW - MR, y);
      y += 8;
    }
  }

  // Unassigned bucket
  const unassigned = plan.days.find(d => d.dayNumber === 0);
  if (unassigned && unassigned.items.length > 0) {
    y += 6;
    checkY(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(100, 84, 68);
    doc.text('Unassigned Places', ML, y);
    y += 7;
    for (const item of unassigned.items) {
      checkY(8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 68, 56);
      doc.text('•  ' + depolish(item.title), ML + 4, y);
      y += 5;
    }
  }

  addFooter();
  doc.save('gdansk-visit-plan.pdf');
  showPlanToast('PDF downloaded');
}

function depolish(str) {
  return (str || '')
    .replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z');
}

function fallbackCopyLink(url) {
  const input = document.createElement('input');
  input.value = url;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showPlanToast('Link copied to clipboard');
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

  const libClass = _libraryOpen ? ' active' : '';

  view.innerHTML = `
    <div class="planner-page-header">
      <div class="planner-title-group">
        <h1 class="planner-title">Your Gdańsk Visit</h1>
        <p class="planner-subtitle">${subtitleText}</p>
      </div>
      <div class="planner-controls">
        <span class="planner-days-label">Days:</span>
        <div class="planner-day-btns">${dayBtnsHTML}</div>
        <button class="planner-recommend-btn" onclick="loadStarterPlan(${plan.numberOfDays})" title="Load curated ${plan.numberOfDays}-day route">★ Route</button>
        <button id="planner-library-btn" class="planner-library-btn${libClass}" onclick="togglePlannerLibrary()">Plans</button>
        <button class="planner-export-btn" onclick="exportToPDF()">Export PDF</button>
        <button class="planner-json-export-btn" onclick="exportPlanJSON()">↓ Export</button>
        <button class="planner-json-import-btn" onclick="importPlanJSON()">↑ Import</button>
        <button class="planner-share-btn" onclick="copyShareLink()">Share link</button>
        <button class="planner-back-btn" onclick="location.hash=''">← Almanac</button>
      </div>
    </div>

    <div id="planner-library-panel" class="planner-library-panel" style="${_libraryOpen ? '' : 'display:none'}"></div>

    <div class="planner-search-row">
      <div class="planner-search-wrap">
        <span class="psearch-icon">⌕</span>
        <input type="search" id="planner-search-input" class="planner-search-input"
               placeholder="Search places to add to your plan…" autocomplete="off">
        <div id="planner-search-results" class="planner-search-results" style="display:none"></div>
      </div>
    </div>

    <div class="planner-days-wrapper">
      <div class="planner-days-grid" style="grid-template-columns:${colTemplate}">${daysHTML}</div>
    </div>
    ${unassignedHTML}
    ${emptyStateHTML}

    <div id="custom-item-modal" class="custom-item-modal" style="display:none" onclick="cancelCustomItemIfBg(event)">
      <div class="custom-item-box">
        <div class="custom-item-title">Add Custom Place</div>
        <div class="custom-item-fields">
          <label class="ci-label">Name <span class="ci-required">*</span></label>
          <input id="ci-name" class="ci-input" type="text" placeholder="e.g. Kartuzy Heritage Tour" maxlength="80">

          <label class="ci-label">Duration (minutes)</label>
          <input id="ci-minutes" class="ci-input ci-short" type="number" value="60" min="5" max="600" step="5">

          <label class="ci-label">Address</label>
          <input id="ci-address" class="ci-input" type="text" placeholder="e.g. Kartuzy, Pomerania, Poland" maxlength="120">

          <label class="ci-label">Google Maps URL or lat,lng</label>
          <input id="ci-maps" class="ci-input" type="text" placeholder="Paste a Maps link, or e.g. 54.33,18.20" maxlength="300">

          <label class="ci-label">Short description (optional)</label>
          <input id="ci-desc" class="ci-input" type="text" placeholder="Brief context for the PDF…" maxlength="200">

          <label class="ci-label">Add to day</label>
          <select id="ci-day" class="ci-input ci-short"></select>
        </div>
        <div class="custom-item-actions">
          <button class="ci-cancel-btn" onclick="cancelCustomItem()">Cancel</button>
          <button class="ci-confirm-btn" onclick="confirmCustomItem()">Add to plan</button>
        </div>
      </div>
    </div>`;

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

  if (_libraryOpen) renderLibraryPanel();
  initPlannerSearch();
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
        <button class="planner-add-custom-btn" onclick="openCustomItemModal(${day.dayNumber})">＋ Custom place</button>
        <textarea class="planner-day-notes" data-day-number="${day.dayNumber}"
                  rows="2" placeholder="Day notes…">${escapeText(day.notes)}</textarea>
      </div>
    </div>`;
}

function plannerMapsUrl(item) {
  if (item.type === 'custom') return item.googleMapsUrl || '';
  if (item.coordinates) {
    const q = encodeURIComponent(item.title + ' Gdańsk');
    return `https://www.google.com/maps/search/${q}/@${item.coordinates.lat},${item.coordinates.lng},17z`;
  }
  return item.googleMapsUrl || '';
}

function renderPlannerItem(item, num) {
  const numBadge = num != null ? `<span class="planner-item-num">${num}</span>` : '';
  const mapsUrl  = plannerMapsUrl(item);
  const mapsLink = mapsUrl
    ? `<a class="planner-item-map-link" href="${mapsUrl}" target="_blank" rel="noopener">↗ Maps</a>`
    : '';

  const isCustom = item.type === 'custom';
  const customBadge = isCustom ? '<span class="planner-item-custom-badge">custom</span>' : '';
  // Custom items use user-entered text (must escape); Almanac items are trusted data (already safe)
  const titleHTML   = isCustom ? escapeText(item.title)           : item.title;
  const descHTML    = isCustom ? escapeText(item.shortDescription) : item.shortDescription;
  const addressHTML = isCustom ? escapeText(item.address)          : (item.address || '');

  return `
    <div class="planner-item${isCustom ? ' planner-item-custom' : ''}" data-item-id="${item.id}">
      <div class="planner-item-main">
        <div class="planner-item-drag-handle" title="Drag to reorder">⠿</div>
        ${numBadge}
        <div class="planner-item-body">
          <div class="planner-item-name">${titleHTML}${customBadge}</div>
          ${descHTML ? `<div class="planner-item-desc">${descHTML}</div>` : ''}
          ${addressHTML ? `<div class="planner-item-address">${addressHTML}</div>` : ''}
          <div class="planner-item-meta">
            <input class="planner-item-time-input" type="number" min="5" max="1440" step="5"
                   value="${item.estimatedMinutes}" data-item-id="${item.id}"
                   onchange="updateItemDuration(this)" title="Edit duration in minutes">
            <span class="planner-item-time-unit">min</span>
            ${mapsLink}
          </div>
        </div>
        ${isCustom ? `<button class="planner-item-edit-custom" onclick="openCustomItemEditModal('${item.id}')" title="Edit this place">✎</button>` : ''}
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

function updateItemDuration(inputEl) {
  const itemId = inputEl.dataset.itemId;
  const saved = planUpdateItemMinutes(itemId, inputEl.value);
  if (saved == null) return;
  inputEl.value = saved; // normalise (clamp) displayed value

  // Find which day this item belongs to and refresh the day load indicator
  const plan = planGet();
  for (const day of plan.days) {
    if (!day.items.some(i => i.id === itemId)) continue;
    const minutes = planGetDayMinutes(day.dayNumber);
    const status  = planGetLoadStatus(minutes);
    const dayEl   = document.querySelector(`.planner-day[data-day="${day.dayNumber}"]`);
    if (!dayEl) break;
    const loadEl = dayEl.querySelector('.planner-day-load');
    if (loadEl) {
      loadEl.className = `planner-day-load load-${status}`;
      loadEl.querySelector('.load-time').textContent = minutes > 0 ? planFormatMinutes(minutes) : 'Empty';
      const labelEl = loadEl.querySelector('.load-label');
      if (labelEl) labelEl.textContent = status;
    }
    break;
  }
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

// ── Curated starter routes ────────────────────────────────────────────────
// Each entry: array of days, each day is an array of sourceIds in visit order.
// Designed to stay within 300–390 min (5–6.5 h) per day.
const STARTER_PLANS = {
  1: [
    // Essential Gdańsk in one day
    ['02-1', '01-2', '01-5', '11-1', '09-3', '13-1']
  ],
  2: [
    // Day 1: Old Town & waterfront
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    // Day 2: Solidarity, WWII & dinner
    ['08-1', '08-2', '08-3', '05-1', '14-1']
  ],
  3: [
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    ['08-1', '08-2', '08-3', '05-1', '14-1'],
    // Day 3: Maritime, Oliwa & figures
    ['04-5', '04-1', '02-2', '10-1', '15-3', '15-2', '13-2']
  ],
  4: [
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    ['08-1', '08-2', '08-3', '05-1', '14-1'],
    ['04-5', '04-1', '02-2', '10-1', '15-3', '15-2', '13-2'],
    // Day 4: Amber, Arsenal & the Invisible City
    ['09-1', '09-2', '06-1', '12-1', '12-2', '12-3', '16-3', '14-2']
  ],
  5: [
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    ['08-1', '08-2', '08-3', '05-1', '14-1'],
    ['04-5', '04-1', '02-2', '10-1', '15-3', '15-2', '13-2'],
    ['09-1', '09-2', '06-1', '12-1', '12-2', '12-3', '16-3', '14-2'],
    // Day 5: WWII Museum, literature & canals
    ['05-3', '15-6', '07-5', '07-2', '11-2', '13-4']
  ],
  6: [
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    ['08-1', '08-2', '08-3', '05-1', '14-1'],
    ['04-5', '04-1', '02-2', '10-1', '15-3', '15-2', '13-2'],
    ['09-1', '09-2', '06-1', '12-1', '12-2', '12-3', '16-3', '14-2'],
    ['05-3', '15-6', '07-5', '07-2', '11-2', '13-4'],
    // Day 6: Fortress, pier, valley & Schopenhauer
    ['05-2', '04-4', '10-2', '15-1', '03-2', '03-4', '14-3']
  ],
  7: [
    ['02-1', '01-2', '03-3', '01-5', '09-3', '13-1'],
    ['08-1', '08-2', '08-3', '05-1', '14-1'],
    ['04-5', '04-1', '02-2', '10-1', '15-3', '15-2', '13-2'],
    ['09-1', '09-2', '06-1', '12-1', '12-2', '12-3', '16-3', '14-2'],
    ['05-3', '15-6', '07-5', '07-2', '11-2', '13-4'],
    ['05-2', '04-4', '10-2', '15-1', '03-2', '03-4', '14-3'],
    // Day 7: Hidden gems — post office, Road to Freedom, carillon, shipyard
    ['06-5', '08-5', '07-3', '16-1', '03-5', '04-3', '15-7']
  ]
};

function loadStarterPlan(n) {
  const dayLists = STARTER_PLANS[n];
  if (!dayLists) return;
  if (planGetTotalItemCount() > 0) {
    if (!confirm(`Replace your current plan with the recommended ${n}-day Gdańsk route?`)) return;
  }
  // Reset to empty then grow/shrink to n days
  planReset();
  planSetDayCount(n);
  for (let d = 0; d < dayLists.length; d++) {
    for (const sourceId of dayLists[d]) {
      const layerId = sourceId.slice(0, 2);
      const layer = ALMANAC.getLayer(layerId);
      if (!layer) continue;
      const loc = layer.locations.find(l => l.id === sourceId);
      if (!loc) continue;
      planAddItem(loc, layer, d + 1);
    }
  }
  updatePlanBadge();
  renderPlannerView();
  showPlanToast(`${n}-day recommended route loaded`);
}

// ── Plan Library UI ───────────────────────────────────────────────────────
let _libraryOpen        = false;
let _editingPlanId      = null;
let _editingCustomItemId = null;

function togglePlannerLibrary() {
  _libraryOpen = !_libraryOpen;
  const panel = document.getElementById('planner-library-panel');
  const btn   = document.getElementById('planner-library-btn');
  if (!panel) return;
  panel.style.display = _libraryOpen ? '' : 'none';
  if (btn) btn.classList.toggle('active', _libraryOpen);
  if (_libraryOpen) renderLibraryPanel();
}

function renderLibraryPanel() {
  const panel = document.getElementById('planner-library-panel');
  if (!panel) return;
  const saved = planGetSaved();
  const count = saved.length;

  const editingEntry = _editingPlanId ? planGetSaved().find(s => s.id === _editingPlanId) : null;

  const listHTML = count === 0
    ? '<p class="library-empty">No saved plans yet. Save your current plan above.</p>'
    : saved.map(entry => {
        const date = entry.savedAt
          ? new Date(entry.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          : '';
        const days  = entry.numberOfDays || '?';
        const items = entry.itemCount || 0;
        const isEditing = _editingPlanId === entry.id;
        return `
          <div class="library-item${isEditing ? ' library-item-editing' : ''}" data-id="${entry.id}">
            <div class="library-item-info">
              <span class="library-item-name" contenteditable="${isEditing ? 'false' : 'true'}" data-id="${entry.id}"
                    onblur="renameLibraryPlan('${entry.id}', this)">${escapeText(entry.name)}</span>
              <span class="library-item-meta">${days}d · ${items} places · ${date}</span>
            </div>
            <div class="library-item-actions">
              ${isEditing
                ? ''
                : `<button class="library-btn library-edit" onclick="editLibraryPlan('${entry.id}')">Edit</button>
                   <button class="library-btn library-load" onclick="loadLibraryPlan('${entry.id}')">Load</button>`}
              <button class="library-btn library-delete" onclick="deleteLibraryPlan('${entry.id}')">×</button>
            </div>
          </div>`;
      }).join('');

  const capacityNote = count >= 30
    ? '<p class="library-full-note">Library full (30/30). Delete a plan to save a new one.</p>'
    : `<p class="library-capacity">${count}/30 plans saved</p>`;

  const saveRow = _editingPlanId && editingEntry
    ? `<div class="library-save-row library-editing-row" id="library-editing-row">
         <div class="library-editing-label">
           <span class="library-editing-icon">✎</span>
           <span>Editing <strong>${escapeText(editingEntry.name)}</strong> — make changes below, then save.</span>
         </div>
         <div class="library-editing-actions">
           <button class="library-update-btn" onclick="updateCurrentPlan()">Save changes</button>
           <button class="library-cancel-btn" onclick="clearEditMode()">Done</button>
         </div>
       </div>`
    : `<div class="library-save-row">
         <input type="text" id="library-name-input" class="library-name-input"
                placeholder="Name this plan…" maxlength="60">
         <button class="library-save-btn" onclick="saveCurrentPlan()">Save</button>
       </div>`;

  panel.innerHTML = `
    ${saveRow}
    <div class="library-list">${listHTML}</div>
    ${capacityNote}`;
}

function saveCurrentPlan() {
  if (planGetTotalItemCount() === 0) {
    showPlanToast('Add places to your plan before saving', 'warn');
    return;
  }
  const input = document.getElementById('library-name-input');
  const name = (input ? input.value.trim() : '') || 'My Gdańsk Visit';
  const result = planSaveToLibrary(name);
  if (result === 'full') {
    showPlanToast('Library full (30 plans) — delete one to save', 'warn');
  } else if (result) {
    if (input) input.value = '';
    showPlanToast(`Saved: "${name}"`);
    renderLibraryPanel();
  } else {
    showPlanToast('Could not save plan', 'warn');
  }
}

function loadLibraryPlan(id) {
  const saved = planGetSaved();
  const entry = saved.find(s => s.id === id);
  if (!entry) return;
  if (planGetTotalItemCount() > 0) {
    if (!confirm(`Load "${entry.name}"? This will replace your current plan.`)) return;
  }
  planLoadFromLibrary(id);
  updatePlanBadge();
  _libraryOpen = false;
  renderPlannerView();
  showPlanToast(`Loaded: "${entry.name}"`);
}

function editLibraryPlan(id) {
  const saved = planGetSaved();
  const entry = saved.find(s => s.id === id);
  if (!entry) return;
  if (planGetTotalItemCount() > 0 && _editingPlanId !== id) {
    if (!confirm(`Load "${entry.name}" for editing? Unsaved changes to your current plan will be lost.`)) return;
  }
  planLoadFromLibrary(id);
  updatePlanBadge();
  _editingPlanId = id;
  renderPlannerView();
  showPlanToast(`Editing: "${entry.name}"`);
}

function updateCurrentPlan() {
  if (!_editingPlanId) return;
  const saved = planGetSaved();
  const entry = saved.find(s => s.id === _editingPlanId);
  if (!entry) { clearEditMode(); return; }
  if (!planUpdateLibraryEntry(_editingPlanId)) {
    showPlanToast('Could not save changes', 'warn');
    return;
  }
  // Flash the banner to confirm save
  const row = document.getElementById('library-editing-row');
  if (row) {
    row.classList.add('library-editing-row-saved');
    const label = row.querySelector('.library-editing-label span:last-child');
    if (label) label.textContent = '✓ Changes saved!';
    setTimeout(() => {
      row.classList.remove('library-editing-row-saved');
      renderLibraryPanel(); // re-render with updated metadata (new item count / date)
    }, 1800);
  } else {
    renderLibraryPanel();
  }
}

function clearEditMode() {
  _editingPlanId = null;
  renderLibraryPanel();
}

function deleteLibraryPlan(id) {
  const saved = planGetSaved();
  const entry = saved.find(s => s.id === id);
  if (!entry) return;
  if (!confirm(`Delete "${entry.name}"?`)) return;
  planDeleteFromLibrary(id);
  renderLibraryPanel();
  showPlanToast('Plan deleted');
}

function renameLibraryPlan(id, el) {
  const newName = (el.textContent || '').trim();
  if (newName) {
    planRenameInLibrary(id, newName);
  } else {
    // Restore old name if blank
    const entry = planGetSaved().find(s => s.id === id);
    if (entry) el.textContent = entry.name;
  }
}

// ── Planner quick search ───────────────────────────────────────────────────
let _searchAllLocs = null;

function getPlannerSearchIndex() {
  if (_searchAllLocs) return _searchAllLocs;
  _searchAllLocs = [];
  for (const layer of ALMANAC.layers) {
    for (const loc of layer.locations) {
      if (!isPlanEligible(loc, layer)) continue;
      _searchAllLocs.push({ loc, layer });
    }
  }
  return _searchAllLocs;
}

function initPlannerSearch() {
  const input = document.getElementById('planner-search-input');
  const results = document.getElementById('planner-search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; results.style.display = 'none'; return; }

    const matches = getPlannerSearchIndex().filter(({ loc, layer }) => {
      const text = [
        loc.namePL, loc.nameEN, loc.subheading, loc.role,
        layer.titlePL, layer.titleEN,
        getLocNarrative(loc)
      ].filter(Boolean).join(' ').toLowerCase();
      return text.includes(q);
    }).slice(0, 12);

    if (matches.length === 0) {
      results.innerHTML = '<div class="psearch-empty">No matching places</div>';
      results.style.display = '';
      return;
    }

    results.innerHTML = matches.map(({ loc, layer }) => {
      const mins = loc.estimatedMinutes || PLAN_MINUTES_BY_LAYER[layer.id] || 30;
      return `
        <div class="psearch-item" onclick="plannerSearchSelect('${loc.id}','${layer.id}',event)">
          <span class="psearch-dot" style="background:${layer.colour}"></span>
          <span class="psearch-name">${escapeText(loc.nameEN || loc.namePL)}</span>
          <span class="psearch-layer">${escapeText(layer.titleEN)}</span>
          <span class="psearch-time">${planFormatMinutes(mins)}</span>
        </div>`;
    }).join('');
    results.style.display = '';
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      results.innerHTML = ''; results.style.display = 'none'; input.value = '';
    }
  });

  // Close on outside click
  document.addEventListener('mousedown', e => {
    if (!results.contains(e.target) && e.target !== input) {
      results.style.display = 'none';
    }
  });
}

function plannerSearchSelect(locId, layerId, event) {
  const layer = ALMANAC.getLayer(layerId);
  const loc = layer.locations.find(l => l.id === locId);
  if (!loc) return;
  const results = document.getElementById('planner-search-results');
  if (results) { results.style.display = 'none'; }
  const input = document.getElementById('planner-search-input');
  if (input) input.value = '';
  const alreadyIn = planIsInPlan(locId);
  // Anchor the day picker to the search input
  openDayPicker(loc, layer, alreadyIn, document.getElementById('planner-search-input') || event.currentTarget);
}

// ── Custom item modal ─────────────────────────────────────────────────────
function openCustomItemModal(defaultDay) {
  const plan = planGet();
  const modal = document.getElementById('custom-item-modal');
  if (!modal) return;

  // Populate day selector
  const daySelect = document.getElementById('ci-day');
  daySelect.innerHTML = plan.days
    .filter(d => d.dayNumber > 0)
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map(d => {
      const label = d.title ? `Day ${d.dayNumber} — ${d.title}` : `Day ${d.dayNumber}`;
      const sel = d.dayNumber === defaultDay ? ' selected' : '';
      return `<option value="${d.dayNumber}"${sel}>${label}</option>`;
    }).join('');

  // Clear fields
  ['ci-name', 'ci-address', 'ci-maps', 'ci-desc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const mins = document.getElementById('ci-minutes');
  if (mins) mins.value = '60';

  modal.style.display = '';
  setTimeout(() => document.getElementById('ci-name').focus(), 50);
}

function openCustomItemEditModal(itemId) {
  const plan = planGet();
  let found = null;
  for (const day of plan.days) {
    found = day.items.find(i => i.id === itemId);
    if (found) break;
  }
  if (!found || found.type !== 'custom') return;

  _editingCustomItemId = itemId;
  openCustomItemModal(found.day); // populates day selector and clears fields

  // Pre-fill with existing values
  document.getElementById('ci-name').value    = found.title || '';
  document.getElementById('ci-minutes').value = found.estimatedMinutes || 60;
  document.getElementById('ci-address').value = found.address || '';
  document.getElementById('ci-desc').value    = found.shortDescription || '';

  // Show stored Maps URL in the maps field
  const mapsField = document.getElementById('ci-maps');
  if (mapsField) mapsField.value = found.googleMapsUrl || '';

  // Update modal title and button
  const titleEl = document.querySelector('.custom-item-title');
  if (titleEl) titleEl.textContent = 'Edit Custom Place';
  const confirmBtn = document.querySelector('.ci-confirm-btn');
  if (confirmBtn) confirmBtn.textContent = 'Save changes';
}

function cancelCustomItem() {
  _editingCustomItemId = null;
  const modal = document.getElementById('custom-item-modal');
  if (modal) modal.style.display = 'none';
}

function cancelCustomItemIfBg(e) {
  if (e.target === document.getElementById('custom-item-modal')) cancelCustomItem();
}

function parseCustomMapsInput(raw) {
  raw = (raw || '').trim();
  if (!raw) return { url: '', coordinates: null };

  // Plain lat,lng like "54.33,18.20"
  const ll = raw.match(/^(-?\d{1,3}\.?\d*),\s*(-?\d{1,3}\.?\d*)$/);
  if (ll) {
    const lat = parseFloat(ll[1]), lng = parseFloat(ll[2]);
    return { url: `https://www.google.com/maps?q=${lat},${lng}`, coordinates: { lat, lng } };
  }

  // GMaps URL — try to extract coords from @lat,lng or ?q=lat,lng
  if (raw.startsWith('http')) {
    const atMatch = raw.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) {
      return { url: raw, coordinates: { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) } };
    }
    try {
      const u = new URL(raw);
      const q = u.searchParams.get('q');
      if (q) {
        const ql = q.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/);
        if (ql) return { url: raw, coordinates: { lat: parseFloat(ql[1]), lng: parseFloat(ql[2]) } };
      }
    } catch (_) {}
    return { url: raw, coordinates: null };
  }

  // Plain address text — wrap in a Maps search URL
  return { url: `https://www.google.com/maps/search/${encodeURIComponent(raw)}`, coordinates: null };
}

function confirmCustomItem() {
  const name = (document.getElementById('ci-name').value || '').trim();
  if (!name) {
    document.getElementById('ci-name').focus();
    showPlanToast('Please enter a name', 'warn');
    return;
  }

  const minutes     = parseInt(document.getElementById('ci-minutes').value, 10) || 60;
  const address     = (document.getElementById('ci-address').value || '').trim();
  const mapsRaw     = (document.getElementById('ci-maps').value || '').trim();
  const description = (document.getElementById('ci-desc').value || '').trim();
  const dayNumber   = parseInt(document.getElementById('ci-day').value, 10);

  const { url: googleMapsUrl, coordinates } = parseCustomMapsInput(mapsRaw);

  if (_editingCustomItemId) {
    const editId = _editingCustomItemId;
    planUpdateCustomItem(editId, { title: name, estimatedMinutes: minutes, address, googleMapsUrl, coordinates, shortDescription: description }, dayNumber);
    cancelCustomItem();
    updatePlanBadge();
    renderPlannerView();
    showPlanToast(`Updated "${name}"`);
  } else {
    planAddCustomItem({ title: name, estimatedMinutes: minutes, address, googleMapsUrl, coordinates, shortDescription: description }, dayNumber);
    cancelCustomItem();
    updatePlanBadge();
    renderPlannerView();
    showPlanToast(`Added "${name}" to Day ${dayNumber}`);
  }
}

// Make scrollToLayer and scrollToCard globally accessible (used in onclick attrs)
window.scrollToLayer = scrollToLayer;
window.scrollToCard = scrollToCard;
window.showOnMap = showOnMap;
window.addToPlan = addToPlan;
window.confirmAddToDay = confirmAddToDay;
window.changeDayCount = changeDayCount;
window.removePlannerItem = removePlannerItem;
window.copyShareLink = copyShareLink;
window.exportToPDF = exportToPDF;
window.loadStarterPlan = loadStarterPlan;
window.togglePlannerLibrary = togglePlannerLibrary;
window.saveCurrentPlan = saveCurrentPlan;
window.loadLibraryPlan  = loadLibraryPlan;
window.editLibraryPlan  = editLibraryPlan;
window.updateCurrentPlan = updateCurrentPlan;
window.clearEditMode    = clearEditMode;
window.deleteLibraryPlan = deleteLibraryPlan;
window.renameLibraryPlan = renameLibraryPlan;
window.plannerSearchSelect = plannerSearchSelect;
window.openCustomItemModal     = openCustomItemModal;
window.openCustomItemEditModal = openCustomItemEditModal;
window.cancelCustomItem = cancelCustomItem;
window.cancelCustomItemIfBg = cancelCustomItemIfBg;
window.confirmCustomItem = confirmCustomItem;
window.updateItemDuration = updateItemDuration;

document.addEventListener('DOMContentLoaded', init);
