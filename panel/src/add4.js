
/* ===================== v6: İLİŞKİLİ BAĞLANTILAR (geri bağlantı) + OBSIDIAN TARZI GRAF ===================== */
(function () {
/* ---- düğüm ve bağ dizini: mevcut verilerden (firma, tablo, aşama, adım) kurulur ---- */
const NIDX = {}, ADJ = {}, EDGES = [];
const addN = (k, type, label, sub) => { NIDX[k] = { k, type, label, sub: sub || '' }; ADJ[k] = ADJ[k] || []; };
const addE = (a, b, l, c) => {
  if (!NIDX[a] || !NIDX[b] || a === b) return;
  if (ADJ[a].some(x => x.k === b)) { const x = ADJ[a].find(y => y.k === b); if (l && x.l.indexOf(l) < 0) { x.l += (x.l ? ' · ' : '') + l; ADJ[b].find(y => y.k === a).l = x.l; } return; }
  ADJ[a].push({ k: b, l: l || '', c }); ADJ[b].push({ k: a, l: l || '', c }); EDGES.push([a, b, c]);
};
const tdByName = n => TD.findIndex(t => t.n === n);
function buildIdx() {
  IS2.firms.forEach(f => addN('f:' + f.id, 'f', f.ad.replace(/\s*\((Demo|DEMO)\)/, ''), f.g));
  const inTbl = new Set(); IGR.forEach(g => g[1].forEach(n => { const i = tdByName(n); if (i >= 0) inTbl.add(i); }));
  inTbl.forEach(i => addN('t:' + i, 't', TD[i].n, TD[i].r + ' satır'));
  const st = stages(); st.forEach(g => addN('a:' + g.n, 'a', g.n + ' ' + g.name, g.valid + ' geçerli adım'));
  IS2.steps.filter(s => s.ok).forEach(s => addN('s:' + s.n, 's', s.n + '. ' + s.ad, s.d));
  EDG.forEach(e => addE('f:' + e[1], 'f:' + e[2], e[5], ECSS[e[3]]));
  IS2.firms.forEach(f => f.b.forEach(b => { const i = tdByName(b[0].split(' - ')[0]); if (i >= 0) addE('f:' + f.id, 't:' + i, b[1] + ' kayıt'); }));
  TD.forEach((t, i) => t.o.forEach(p => { if (p[0] !== i) addE('t:' + i, 't:' + p[0], p[1] + ' bağlantı'); }));
  const sti = tdByName('Süreç Adımları'), mk = tdByName('Makineler');
  st.forEach(g => { if (sti >= 0) addE('a:' + g.n, 't:' + sti, ''); g.steps.filter(s => s.ok).forEach(s => { addE('s:' + s.n, 'a:' + g.n, ''); s.f.forEach(n => { const f = IS2.firms.find(x => x.ad === n); if (f) addE('s:' + s.n, 'f:' + f.id, 'sorumlu firma'); }); if (s.m.length && mk >= 0) addE('s:' + s.n, 't:' + mk, s.m.length + ' makine'); }); });
}
buildIdx();
const TYP = { f: 'Firma', t: 'Tablo', a: 'Aşama', s: 'Adım' };
const nm = k => NIDX[k] ? NIDX[k].label : k;

/* ---- bir düğümün gövdesi (aynı alanda açılır) ---- */
function itemBody(k) {
  const [ty, id] = [k[0], k.slice(2)];
  if (ty === 'f') { const f = FM[id]; if (!f) return ''; const ed = EDG.filter(e => e[1] === f.id || e[2] === f.id);
    return `<div class="why"><b>Rol</b> ${esc(f.roller.join(', '))} · ${esc(f.ulke)}</div>${f.not ? `<div class="why"><b>Not</b> ${esc(f.not)}</div>` : ''}${f.b.length ? `<div class="why"><b>Bağlı kayıtlar</b> ${f.b.map(b => esc(b[0]) + ' (' + b[1] + ')').join(', ')}</div>` : '<div class="why" style="color:var(--warn)">Hiçbir kayda bağlı değil.</div>'}${ed.map(e => `<div class="why"><span class="pill" style="border-color:${ECSS[e[3]]};color:${ECSS[e[3]]}">${ETL[e[3]]}</span> ${esc(NODES[e[1]].l)} → ${esc(NODES[e[2]].l)}: ${esc(e[5])}. ${esc(e[6])}</div>`).join('')}`; }
  if (ty === 't') { const t = TD[+id]; return `<p style="margin:2px 0 6px">${esc(t.p)}</p><div class="why"><b>Boyut</b> ${live[t.i] ?? t.r} satır · ${t.f} alan · ${t.l} ilişki${t.m ? ' · ' + t.m + ' formül' : ''}</div>${(() => { const fo = IS2.forms.find(x => x.ad === t.n); return fo ? `<p style="margin:6px 0 0"><button type="button" class="btn ghost" data-newrec="${fo.id}">Bu tabloya yeni kayıt (form)</button></p>` : '<p class="note" style="margin:6px 0 0">Bu tablo için giriş formu tanımlı değil.</p>'; })()}`; }
  if (ty === 'a') { const g = stages().find(x => String(x.n) === id); return g ? `<div class="why"><b>Durum</b> ${g.done} tamam, ${g.run} devam, ${g.valid - g.done - g.run} bekliyor (${g.valid} geçerli adım)${g.off ? ', ' + g.off + ' modele uygun değil' : ''}</div>` : ''; }
  if (ty === 's') { const s = IS2.steps.find(x => String(x.n) === id); return s ? `<div class="why"><b>Durum</b> ${pill(s.d)} · <b>Sorumlu</b> ${esc(s.r || '—')} · <b>Vade</b> ${esc(s.v || 'girilmemiş')}</div><div class="why"><b>Kontrol</b> ${esc(s.k || '—')}</div>${s.not ? `<div class="why"><b>Not</b> ${esc(s.not)}</div>` : ''}` : ''; }
  return '';
}
function goPage(k) {
  const ty = k[0], id = k.slice(2);
  if (ty === 'f') { goTo('taraflar'); openWk('fw' + id); }
  else if (ty === 't') { goTo('istablo'); const gi = tdGrp(+id); openWk('tg' + (gi >= 0 ? gi : 99)); openWk('tb' + id); }
  else if (ty === 'a') { goTo('surec'); openWk('st' + id); }
  else if (ty === 's') { goTo('surec'); const s = IS2.steps.find(x => String(x.n) === id); if (s) { openWk('st' + parseInt(s.a, 10)); openWk('sp' + id); } }
}

/* ---- İlişkili kutusu: chip'e basınca aynı yerde açılır, içinde yine ilişkili kutusu var ---- */
function relBox(k, path) {
  path = path || [k];
  const nb = (ADJ[k] || []).filter(x => !path.includes(x.k));
  if (!nb.length) return path.length > 1 ? '<p class="note" style="margin:6px 0 0">Başka ilişkili kayıt yok (döngüyü önlemek için üst kayıtlar gizlendi).</p>' : '<p class="note" style="margin:6px 0 0">İlişkili kayıt bulunamadı.</p>';
  const by = {}; nb.forEach(x => (by[NIDX[x.k].type] = by[NIDX[x.k].type] || []).push(x));
  return `<div class="rel" data-path="${esc(path.join('|'))}"><div class="rlh">İlişkili <b>${nb.length}</b> <span class="note">(basınca altta açılır, geri bağlantılar dahil)</span></div>` +
    ['f', 't', 'a', 's'].filter(t => by[t]).map(t => `<div class="rlg"><span class="rlt">${TYP[t]}</span>${by[t].map(x => `<button type="button" class="rc t-${t}" data-rel="${esc(x.k)}" title="${esc(x.l)}">${esc(nm(x.k))}</button>`).join('')}</div>`).join('') + '<div class="relx"></div></div>';
}
window.relBox = k => relBox(k, [k]);
window.relTables = (path, names) => {
  const ks = names.map(n => { const i = tdByName(n); if (i < 0) return null; if (!NIDX['t:' + i]) addN('t:' + i, 't', TD[i].n, TD[i].r + ' satır'); return 't:' + i; }).filter(Boolean);
  if (!ks.length) return '';
  return `<div class="rel" style="border:0;margin:4px 0;padding:0" data-path="${esc(path)}"><div class="rlg">${ks.map(k => `<button type="button" class="rc t-t" data-rel="${k}">${esc(nm(k))}</button>`).join('')}</div><div class="relx"></div></div>`;
};
document.addEventListener('click', e => {
  const c = e.target.closest && e.target.closest('[data-rel]'); if (c) {
    e.preventDefault(); e.stopPropagation();
    const box = c.closest('.rel'), k = c.dataset.rel, x = box.querySelector(':scope > .relx'), ex = [...x.children].find(d => d.dataset.k === k);
    if (ex) { ex.remove(); c.classList.remove('on'); return; }
    const path = box.dataset.path.split('|').concat(k), edge = (ADJ[path[path.length - 2]] || []).find(z => z.k === k);
    const d = document.createElement('div'); d.className = 'relo t-' + NIDX[k].type; d.dataset.k = k;
    d.innerHTML = `<div class="rloh"><b>${esc(NIDX[k].label)}</b> <span class="note">${TYP[NIDX[k].type]}${edge && edge.l ? ' · ' + esc(edge.l) : ''}</span><span style="flex:1"></span><button type="button" class="btn ghost" data-rgo="${esc(k)}">Sayfasında aç</button><button type="button" class="btn ghost" data-rx="1">Kapat</button></div>${itemBody(k)}${path.length < 6 ? relBox(k, path) : '<p class="note">Derinlik sınırı. “Sayfasında aç” ile devam et.</p>'}`;
    x.appendChild(d); c.classList.add('on'); return;
  }
  const g = e.target.closest && e.target.closest('[data-rgo]'); if (g) { e.preventDefault(); e.stopPropagation(); goPage(g.dataset.rgo); return; }
  const r = e.target.closest && e.target.closest('[data-rx]'); if (r) { const d = r.closest('.relo'), box = d.closest('.rel'); box.querySelectorAll(':scope > .rlg .rc').forEach(b => { if (b.dataset.rel === d.dataset.k) b.classList.remove('on'); }); d.remove(); }
}, true);

/* ---- OBSIDIAN TARZI GRAF ---- */
const W = 900, H = 600;
const GS = { pos: null, hid: { f: 0, t: 0, a: 0, s: 0 }, sel: null, depth: 0, q: '', z: { x: 0, y: 0, k: 1 }, run: 0, init: false };
const keys = Object.keys(NIDX);
function seed() {
  let r = 7; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
  const ang = { f: 0, t: 1, a: 2, s: 3 }; GS.pos = {};
  keys.forEach(k => { const t = NIDX[k].type, a = rnd() * 6.283, d = 60 + rnd() * 220 + (t === 's' ? 80 : 0); GS.pos[k] = { x: W / 2 + Math.cos(a) * d, y: H / 2 + Math.sin(a) * d * .7, vx: 0, vy: 0, pin: false }; });
}
function tick(alpha) {
  const P = GS.pos, K = keys.length;
  for (let i = 0; i < K; i++) { const a = P[keys[i]]; for (let j = i + 1; j < K; j++) { const b = P[keys[j]]; let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 30; if (d2 > 250000) continue; const f = 7000 / d2, d = Math.sqrt(d2); dx = dx / d * f; dy = dy / d * f; a.vx += dx * alpha; a.vy += dy * alpha; b.vx -= dx * alpha; b.vy -= dy * alpha; } }
  EDGES.forEach(e => { const a = P[e[0]], b = P[e[1]], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) + .01, L = NIDX[e[0]].type === 's' || NIDX[e[1]].type === 's' ? 48 : 105, f = (d - L) * .03; a.vx += dx / d * f * alpha; a.vy += dy / d * f * alpha; b.vx -= dx / d * f * alpha; b.vy -= dy / d * f * alpha; });
  keys.forEach(k => { const p = P[k]; if (p.pin) { p.vx = p.vy = 0; return; } p.vx += (W / 2 - p.x) * .0025 * alpha; p.vy += (H / 2 - p.y) * .0045 * alpha; p.vx *= .82; p.vy *= .82; p.x += p.vx * 4; p.y += p.vy * 4; p.x = Math.max(20, Math.min(W - 20, p.x)); p.y = Math.max(20, Math.min(H - 20, p.y)); });
}
const deg = k => (ADJ[k] || []).length;
const rad = k => 3.5 + Math.sqrt(deg(k)) * 1.9;
function visibleSet() {
  const v = new Set(keys.filter(k => !GS.hid[NIDX[k].type]));
  if (GS.sel && GS.depth > 0) { let cur = new Set([GS.sel]); const all = new Set(cur); for (let i = 0; i < GS.depth; i++) { const nx = new Set(); cur.forEach(k => ADJ[k].forEach(x => { if (!all.has(x.k)) { all.add(x.k); nx.add(x.k); } })); cur = nx; } [...v].forEach(k => { if (!all.has(k)) v.delete(k); }); }
  return v;
}
function paint() {
  const svg = document.getElementById('gsvg'); if (!svg) return;
  const V = visibleSet(), q = GS.q.trim().toLowerCase(), P = GS.pos;
  svg.querySelectorAll('.gn').forEach(n => { const k = n.dataset.k, p = P[k]; n.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`); n.classList.toggle('hid', !V.has(k)); n.classList.toggle('sel', k === GS.sel); n.classList.toggle('mt', !!q && nm(k).toLowerCase().indexOf(q) >= 0); });
  svg.querySelectorAll('.ln').forEach((l, i) => { const e = EDGES[i], a = P[e[0]], b = P[e[1]]; l.setAttribute('x1', a.x.toFixed(1)); l.setAttribute('y1', a.y.toFixed(1)); l.setAttribute('x2', b.x.toFixed(1)); l.setAttribute('y2', b.y.toFixed(1)); l.classList.toggle('hid', !(V.has(e[0]) && V.has(e[1]))); });
  const z = GS.z, g = document.getElementById('gz'); if (g) g.setAttribute('transform', `translate(${z.x.toFixed(1)},${z.y.toFixed(1)}) scale(${z.k.toFixed(3)})`);
  const c = document.getElementById('gcount'); if (c) c.textContent = V.size + ' düğüm';
}
function hl(k) {
  const svg = document.getElementById('gsvg'); if (!svg) return;
  svg.classList.toggle('dim', !!k);
  const nb = new Set(k ? [k, ...ADJ[k].map(x => x.k)] : []);
  svg.querySelectorAll('.gn').forEach(n => n.classList.toggle('hl', nb.has(n.dataset.k)));
  svg.querySelectorAll('.ln').forEach((l, i) => l.classList.toggle('hl', !!k && (EDGES[i][0] === k || EDGES[i][1] === k)));
}
function detail() {
  const d = document.getElementById('gdet'); if (!d) return;
  const k = GS.sel; if (!k) { d.innerHTML = '<p class="note" style="margin:0">Bir düğüme bas: bilgisi ve ilişkili kayıtları burada açılır. İlişkili bir kayda basınca altında açılır, içindeki ilişkililere de basabilirsin. Düğümü sürükleyerek yerini değiştirebilirsin. Bilgisayarda boşluğu sürükleyip kaydırır, Ctrl + tekerlekle yakınlaştırırsın; telefonda + ve − düğmelerini kullan. Normal tekerlek ve parmak kaydırma sayfayı kaydırır.</p>'; return; }
  d.innerHTML = `<div class="rloh"><b>${esc(nm(k))}</b> <span class="note">${TYP[NIDX[k].type]}${NIDX[k].sub ? ' · ' + esc(NIDX[k].sub) : ''}</span><span style="flex:1"></span><button type="button" class="btn ghost" data-rgo="${esc(k)}">Sayfasında aç</button></div>${itemBody(k)}${relBox(k, [k])}`;
}
function frame() { if (GS.run > 0) { tick(Math.min(1, GS.run / 60)); GS.run--; paint(); requestAnimationFrame(frame); } }
function wake(n) { const was = GS.run > 0; GS.run = Math.max(GS.run, n); if (!was && typeof requestAnimationFrame === 'function') requestAnimationFrame(frame); }
function setup() {
  const svg = document.getElementById('gsvg'); if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
  if (!GS.pos) { seed(); for (let i = 0; i < 420; i++) tick(1 - i / 440); }
  paint(); detail();
  let drag = null, pan = null, moved = 0;
  const pt = ev => { const r = svg.getBoundingClientRect(), s = W / (r.width || W); return { x: (ev.clientX - r.left) * s, y: (ev.clientY - r.top) * s, s }; };
  svg.addEventListener('pointerdown', ev => { const n = ev.target.closest('.gn'); moved = 0; const p = pt(ev); try { svg.setPointerCapture(ev.pointerId); } catch (x) {}
    if (n) { drag = n.dataset.k; GS.pos[drag].pin = true; } else if (ev.pointerType === 'touch') { /* dokunmatikte boşluk sayfayı kaydırır */ } else pan = { x: p.x, y: p.y, zx: GS.z.x, zy: GS.z.y }; });
  svg.addEventListener('pointermove', ev => { const p = pt(ev);
    if (drag) { moved++; const z = GS.z, q = GS.pos[drag]; q.x = (p.x - z.x) / z.k; q.y = (p.y - z.y) / z.k; wake(50); paint(); }
    else if (pan) { moved++; GS.z.x = pan.zx + (p.x - pan.x); GS.z.y = pan.zy + (p.y - pan.y); paint(); }
    else { const n = ev.target.closest && ev.target.closest('.gn'); hl(n ? n.dataset.k : null); } });
  const up = () => { if (drag) { const k = drag; GS.pos[k].pin = false; drag = null; if (moved < 4) { GS.sel = k; detail(); paint(); } } pan = null; };
  svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
  svg.addEventListener('click', ev => { const n = ev.target.closest('.gn'); if (n && !drag && moved < 4) { GS.sel = n.dataset.k; detail(); paint(); } });
  svg.addEventListener('pointerleave', () => hl(null));
  svg.addEventListener('wheel', ev => { if (!(ev.ctrlKey || ev.metaKey)) return; ev.preventDefault(); const p = pt(ev), z = GS.z, k2 = Math.max(.4, Math.min(3.5, z.k * (ev.deltaY < 0 ? 1.15 : .87))); z.x = p.x - (p.x - z.x) * (k2 / z.k); z.y = p.y - (p.y - z.y) * (k2 / z.k); z.k = k2; paint(); }, { passive: false });
}
views.graf = function () {
  setTimeout(setup, 0);
  const ct = {}; keys.forEach(k => ct[NIDX[k].type] = (ct[NIDX[k].type] || 0) + 1);
  const lines = EDGES.map((e, i) => `<line class="ln" ${e[2] ? `style="--lc:${e[2]}"` : ''}/>`).join('');
  const nodes = keys.map(k => `<g class="gn t-${NIDX[k].type}" data-k="${esc(k)}"><circle r="${rad(k).toFixed(1)}"/><text y="${(rad(k) + 10).toFixed(1)}" ${deg(k) >= 5 ? 'class="big"' : ''}>${esc(nm(k).length > 26 ? nm(k).slice(0, 25) + '…' : nm(k))}</text><title>${esc(nm(k))}</title></g>`).join('');
  return `<div class="demo">Bağlantı grafı: firmalar, tablolar, süreç aşamaları ve adımlar. Veri, panelin anlık görüntüsüdür (${esc(IS.tarih)}); hiçbir şey Baserow'a yazılmaz. Çizgi = kayıtlar arasında gerçek bir bağ (firma ↔ firma haritadan, firma ↔ tablo bağlantı alanından, tablo ↔ tablo ilişki alanından).</div>
  <section class="panel" style="margin-bottom:14px"><div class="gtools">
    ${['f', 't', 'a', 's'].map(t => `<button type="button" class="rc t-${t} on" data-gt="${t}">${TYP[t]} <small>${ct[t] || 0}</small></button>`).join('')}
    <label class="note">Ara <input id="gq" type="search" placeholder="firma, tablo, adım…" aria-label="Graf içinde ara"></label>
    <label class="note">Görünüm <select id="gd" aria-label="Yerel graf"><option value="0">Tümü</option><option value="1">Seçili + 1 adım</option><option value="2">Seçili + 2 adım</option></select></label>
    <button type="button" class="btn ghost" id="gzi" aria-label="Yakınlaştır">+</button><button type="button" class="btn ghost" id="gzo" aria-label="Uzaklaştır">−</button><button type="button" class="btn ghost" id="gz0">Sıfırla</button><button type="button" class="btn ghost" id="gre">Yeniden dağıt</button><span class="note" id="gcount"></span></div>
  <svg id="gsvg" class="gsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bağlantı grafı"><g id="gz"><g>${lines}</g><g>${nodes}</g></g></svg></section>
  <section class="panel"><h2>Seçili kayıt</h2><div id="gdet"></div></section>`;
};
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-gt]'); if (t) { const k = t.dataset.gt; GS.hid[k] = GS.hid[k] ? 0 : 1; t.classList.toggle('on', !GS.hid[k]); paint(); return; }
  const zb = { gzi: 1.25, gzo: 0.8 }[e.target.id]; if (zb) { const z = GS.z, k2 = Math.max(.4, Math.min(3.5, z.k * zb)); z.x = W / 2 - (W / 2 - z.x) * (k2 / z.k); z.y = H / 2 - (H / 2 - z.y) * (k2 / z.k); z.k = k2; paint(); return; }
  if (e.target.id === 'gz0') { GS.z = { x: 0, y: 0, k: 1 }; paint(); return; }
  if (e.target.id === 'gre') { seed(); for (let i = 0; i < 420; i++) tick(1 - i / 440); paint(); wake(40); }
}, true);
document.addEventListener('input', e => { if (e.target.id === 'gq') { GS.q = e.target.value; paint(); } });
document.addEventListener('change', e => { if (e.target.id === 'gd') { GS.depth = +e.target.value; paint(); } });

window.GRAPH_TEST = () => {
  const bad = EDGES.filter(e => !NIDX[e[0]] || !NIDX[e[1]]);
  if (bad.length) return bad.length + ' bağ geçersiz uç';
  const iso = keys.filter(k => !deg(k)).map(nm);
  const asym = keys.filter(k => ADJ[k].some(x => !ADJ[x.k].some(y => y.k === k)));
  if (asym.length) return 'tek yönlü bağ: ' + asym.length;
  return iso.length ? 'bağsız düğüm (hata değil): ' + iso.join(', ') : true;
};
})();
