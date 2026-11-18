
/* ===================== v4: TARAFLAR, SÜREÇ, TEKLİF SINIRI, FORM GİRİŞİ, GRUPLU TABLOLAR ===================== */
const IS2 = __IS2__;
let WS = {}; try { WS = JSON.parse(sessionStorage.getItem('cin-ws') || '{}'); } catch (e) {}
document.addEventListener('toggle', e => {
  const d = e.target;
  if (d && d.classList && d.classList.contains('wk') && d.id) { WS[d.id] = d.open; try { sessionStorage.setItem('cin-ws', JSON.stringify(WS)); } catch (x) {} }
}, true);
const wk = (id, sum, body, def) => `<details class="wk" id="${id}"${(id in WS ? WS[id] : def) ? ' open' : ''}><summary>${sum}</summary><div class="wkb">${body}</div></details>`;
function openWk(id) {
  const d = document.getElementById(id); if (!d) return;
  let p = d; while (p) { if (p.tagName === 'DETAILS') { p.open = true; if (p.id) WS[p.id] = true; } p = p.parentElement; }
  try { sessionStorage.setItem('cin-ws', JSON.stringify(WS)); } catch (x) {}
  try { d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (x) {}
}
const goTo = k => { CUR = k; try { history.replaceState(null, '', '#' + k); } catch (x) {} route(); };
const FM = {}; IS2.firms.forEach(f => FM[f.id] = f);
const GCOL = { 'Biz (SPC)': 0, 'Operatörler (TOO)': 1, 'Gelir kaynağı': 2, 'Tedarik (Çin)': 3, 'Finansman ve teminat': 4, 'Lojistik ve gümrük': 6, 'Sigorta': 7, 'Servis': 5 };

/* ---------- TARAFLAR ---------- */
const NW = 118, NH = 36;
const NODES = {
  6: { x: 250, y: 60, l: 'Sinosure' }, 5: { x: 430, y: 60, l: 'China Eximbank' }, 7: { x: 620, y: 60, l: 'Köprü Finansörü' },
  2: { x: 80, y: 170, l: 'SINOMACH' }, 8: { x: 80, y: 240, l: 'İmalatçı A' }, 9: { x: 80, y: 310, l: 'İmalatçı B' },
  11: { x: 230, y: 240, l: 'Demiryolu lojistik' }, 10: { x: 230, y: 335, l: 'Gümrük müşaviri' },
  3: { x: 410, y: 240, l: 'AIFC SPC (biz)' }, 4: { x: 600, y: 240, l: 'TOO-1' }, 1: { x: 780, y: 240, l: 'ÖMG / KMG' },
  13: { x: 600, y: 335, l: 'TOO-2' }, 14: { x: 410, y: 335, l: 'KZ Sigorta' }, 12: { x: 780, y: 335, l: 'Servis firması' }
};
/* [id, kimden, kime, tür, eğrilik, kısa etiket, neden bağlı, kaynak tablo] */
const EDG = [
  ['p1', 7, 3, 'para', 0, 'Köprü kredi 598.500', 'Peşinatı (%15) karşılar. Yıllık %6,5, 6 ay, anapara vade sonunda tek seferde.', 'Krediler'],
  ['p2', 5, 3, 'para', -18, "Seller's credit 3,39 M", "%85 kısmı Eximbank destekli satıcı kredisiyle kullandırılır (60 ay, yıllık %4,5). Kreditör olarak Eximbank yazılı.", 'Krediler'],
  ['p3', 2, 3, 'para', 0, "Seller's credit (satıcı)", "SINOMACH aynı kredide ikinci kreditör olarak yazılı: kredi satıcı tarafından açılıyor, bankayla birlikte.", 'Krediler'],
  ['p4', 3, 5, 'para', 18, 'Anapara ve faiz', 'SPC borçlu: anapara ve faiz geri ödemeleri Eximbank\'a gider. Dönem planı Geri Ödeme Planı\'nda.', 'Krediler, Geri Ödeme Planı'],
  ['p5', 4, 3, 'para', 14, 'Aylık kira', 'TOO, SPC\'ye aylık kira öder (SPC payı 63.240 USD/ay). Kiracı alanı TOO\'ya bağlı.', 'Kira ve Tahsilat Planı'],
  ['p6', 1, 4, 'para', 0, 'Hizmet geliri 95.000/ay', 'ÖMG saha hizmeti için ödemeyi doğrudan TOO hesabına yapar; kirayı karşılayan para kaynağı budur.', 'Firmalar (not), Hizmet Kayıtları, Projeler (not)'],
  ['p7', 3, 6, 'para', 0, 'Sinosure primi 85.000', 'Prim gideri Sinosure\'a bağlı. Ödeyen alanı yok; alıcı ve borçlu SPC olduğu için yön SPC → Sinosure alındı.', 'Giderler ve Vergiler'],
  ['p8', 3, 11, 'para', 12, 'Navlun', 'Demiryolu navlun giderleri taşıyıcıya bağlı. Ödeyen alanı yok; alıcı SPC olduğu için yön SPC → taşıyıcı alındı.', 'Giderler ve Vergiler'],
  ['m1', 8, 11, 'mal', 0, 'Lot-1, Lot-2 (45 otobüs)', 'İmalatçı A, Lot-1 ve Lot-2\'nin tedarikçisi; sevkiyatın çıkış yeri imalat tesisi.', 'Ekipman Lotları, İmalat ve Tedarik, Sevkiyatlar'],
  ['m2', 9, 11, 'mal', 0, 'Lot-3 (12 otobüs)', 'İmalatçı B, Lot-3\'ün tedarikçisi. Üretimde, FAT henüz geçmedi.', 'Ekipman Lotları, İmalat ve Tedarik'],
  ['m3', 11, 3, 'mal', 0, 'Demiryolu, Khorgos teslim', 'Taşıyıcı üç sevkiyatı Khorgos\'a götürür; mülkiyet SPC\'ye teslimde geçer (DAP).', 'Sevkiyatlar'],
  ['m4', 10, 3, 'mal', 14, 'Beyanname (6 adet)', 'Gümrük müşaviri Çin ihracat ve Khorgos ithalat beyannamelerini hazırlar. İthalatçı ve beyan sahibi SPC.', 'Gümrük İşlemleri, Makineler'],
  ['m5', 3, 4, 'mal', -14, 'Finance lease: 25 makine', 'SPC makineleri TOO\'ya kiralar. 25 makine TOO\'ya tahsisli ve sahada.', 'Tahsisler, Makineler'],
  ['m6', 4, 13, 'mal', 0, 'Alt kiralama (Lot-3)', 'TOO-1, Lot-3\'ü TOO-2\'ye alt kiralamak istiyor; sözleşme taslak.', 'Sözleşmeler, Tahsisler'],
  ['h1', 3, 4, 'hukuk', 0, 'Finance lease sözleşmesi', 'SPC kiraya veren, TOO kiracı. 5 yıllık finance lease; makine tahsislerinin dayanağı.', 'Sözleşmeler'],
  ['h2', 4, 1, 'hukuk', -14, 'Hizmet alım sözleşmesi', 'TOO, ÖMG\'ye hizmet verir; ÖMG\'nin ödemesi bu sözleşmeden doğar.', 'Sözleşmeler'],
  ['h3', 4, 13, 'hukuk', 14, 'Alt kiralama sözleşmesi', 'Taslak. Ana sözleşmede alt kiralama izni yok uyarısı var.', 'Sözleşmeler'],
  ['h4', 7, 5, 'hukuk', 0, 'Nakit rehni 10 M USD', 'Köprü finansörü, 120 gün boyunca Eximbank lehine 10 milyon USD nakit rehni verir.', 'Teminatlar'],
  ['h5', 3, 5, 'hukuk', 22, 'İpotek ve kira temliki', 'SPC, 57 otobüs üzerinde 1. derece ipotek verir ve kira alacağını Eximbank\'a temlik eder.', 'Teminatlar'],
  ['h6', 4, 5, 'hukuk', 0, 'Tahsilat hesabı rehni', 'TOO, tahsilat hesabını rehneder (lehtar SPC ve Eximbank) ve alacağını temlik eder.', 'Teminatlar'],
  ['h7', 6, 5, 'hukuk', 0, 'Kredi sigortası', 'Sinosure, Eximbank lehine kredi sigortası poliçesi verir.', 'Teminatlar'],
  ['h8', 14, 3, 'hukuk', 0, 'Poliçeler (51)', 'Kazakistan sigorta şirketi makinelerin kasko ve zorunlu trafik poliçelerini verir. 1 poliçenin süresi dolmuş.', 'Sigortalar'],
  ['h9', 2, 3, 'hukuk', 22, 'Satış sözleşmesi (DAP)', 'SINOMACH 57 otobüsü DAP Khorgos olarak SPC\'ye satar.', 'Belgeler (satış sözleşmesi), Projeler (not)'],
  ['h10', 2, 5, 'hukuk', 0, 'Başvuru yazışması', 'SINOMACH Eximbank/Sinosure başvuru paketini gönderir; yanıt bekleniyor.', 'Yazışmalar']
];
const ETL = { mal: 'Mal', para: 'Para', hukuk: 'Hukuk' };
const ECSS = { mal: 'var(--info)', para: 'var(--ok)', hukuk: 'var(--warn)' };
let TF = 'hepsi', TSEL = null, TGROUP = 'rol';
function clipPt(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const t = Math.min(Math.abs(dx) > 0 ? (NW / 2 + 3) / Math.abs(dx) : 1e9, Math.abs(dy) > 0 ? (NH / 2 + 3) / Math.abs(dy) : 1e9);
  return { x: a.x + dx * t, y: a.y + dy * t };
}
function edgeGeo(e) {
  const a = NODES[e[1]], b = NODES[e[2]], p = clipPt(a, b), q = clipPt(b, a);
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy) || 1, off = e[4] || 0;
  const cx = mx - dy / L * off, cy = my + dx / L * off;
  return { d: `M${p.x.toFixed(1)},${p.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${q.x.toFixed(1)},${q.y.toFixed(1)}`, mx: (p.x + 2 * cx + q.x) / 4, my: (p.y + 2 * cy + q.y) / 4 };
}
function mapSvg() {
  const vis = EDG.filter(e => TF === 'hepsi' || e[3] === TF);
  let s = `<svg viewBox="0 0 860 392" style="width:100%;min-width:660px;display:block" role="img" aria-label="Taraf haritası">
  <defs>${Object.keys(ECSS).map(k => `<marker id="mk-${k}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:${ECSS[k]}"/></marker>`).join('')}</defs>
  <rect x="150" y="14" width="560" height="92" rx="10" style="fill:var(--surface2)"/><text x="162" y="32" class="mu">FİNANSMAN VE TEMİNAT</text>
  <rect x="14" y="124" width="310" height="262" rx="10" style="fill:var(--surface2)"/><text x="26" y="142" class="mu">TEDARİK, TAŞIMA, GÜMRÜK</text>
  <rect x="340" y="124" width="506" height="262" rx="10" style="fill:var(--surface2)"/><text x="352" y="142" class="mu">BİZ VE KAZAKİSTAN</text>`;
  vis.forEach(e => {
    const g = edgeGeo(e), on = TSEL == null || e[1] === TSEL || e[2] === TSEL;
    s += `<path d="${g.d}" fill="none" style="stroke:${ECSS[e[3]]};stroke-width:${on && TSEL != null ? 2.4 : 1.6};opacity:${on ? 0.95 : 0.12};${e[3] === 'hukuk' ? 'stroke-dasharray:5 4;' : ''}" marker-end="url(#mk-${e[3]})"><title>${esc(NODES[e[1]].l)} → ${esc(NODES[e[2]].l)}: ${esc(e[5])}</title></path>`;
  });
  if (TSEL != null) vis.filter(e => e[1] === TSEL || e[2] === TSEL).forEach(e => {
    const g = edgeGeo(e);
    s += `<text x="${g.mx.toFixed(1)}" y="${(g.my - 4).toFixed(1)}" text-anchor="middle" style="fill:var(--fg);font-size:10.5px;paint-order:stroke;stroke:var(--surface2);stroke-width:4px;stroke-linejoin:round">${esc(e[5])}</text>`;
  });
  Object.keys(NODES).forEach(id => {
    const n = NODES[id], f = FM[id], c = GC[GCOL[f.g] ?? 5], sel = +id === TSEL;
    const iso = IS2.firms && f.b.length === 0;
    s += `<g data-nid="${id}" tabindex="0" style="cursor:pointer"><rect x="${n.x - NW / 2}" y="${n.y - NH / 2}" width="${NW}" height="${NH}" rx="8" style="fill:var(--surface);stroke:${c};stroke-width:${sel ? 3.2 : 1.6};${iso ? 'stroke-dasharray:4 3;' : ''}"/>
    <text x="${n.x}" y="${n.y - 2}" text-anchor="middle" style="fill:var(--fg);font-size:11.5px;font-weight:600">${esc(n.l)}</text>
    <text x="${n.x}" y="${n.y + 11}" text-anchor="middle" style="fill:var(--muted);font-size:9.5px">${esc(f.ulke.replace(/ \(.*\)/, ''))}</text></g>`;
  });
  return s + '</svg>';
}
function firmWk(f) {
  const edges = EDG.filter(e => e[1] === f.id || e[2] === f.id);
  const bl = f.b.length ? `<div class="sct"><table><thead><tr><th>Bağlı olduğu kayıtlar</th><th class="n">Adet</th><th>Örnekler</th></tr></thead><tbody>${f.b.map(b => `<tr><td>${esc(b[0])}</td><td class="n">${b[1]}</td><td class="cl">${esc(b[2].join(', '))}${b[1] > 3 ? ' …' : ''}</td></tr>`).join('')}</tbody></table></div>` : `<p class="note" style="margin:6px 0">Bu firma hiçbir kayda bağlı değil. ${f.id === 12 ? 'Bakım ve Yedek Parça tablosunda firma alanı yok; servis firmasını bağlamak için o tabloya “Servis Firması” alanı gerekir.' : ''}</p>`;
  const el = edges.length ? `<h3 style="margin:10px 0 4px">Haritadaki bağlar (${edges.length})</h3>${edges.map(e => `<div class="why"><span class="pill" style="border-color:${ECSS[e[3]]};color:${ECSS[e[3]]}">${ETL[e[3]]}</span> ${esc(NODES[e[1]].l)} → ${esc(NODES[e[2]].l)}: ${esc(e[5])}</div>`).join('')}` : '';
  return wk('fw' + f.id, `<span>${esc(f.ad)}</span><span class="pill">${esc(f.roller.join(', '))}</span><small>${esc(f.ulke)}</small>`,
    `${f.not ? `<p style="margin:4px 0 8px">${esc(f.not)}</p>` : ''}${bl}${el}${window.relBox?window.relBox('f:'+f.id):''}<p style="margin:10px 0 0"><button type="button" class="btn" data-newrec="1299125">Bu tabloya yeni firma ekle</button></p>${rq('f:' + f.id, f.ad)}`);
}
views.taraflar = function () {
  const by = {};
  IS2.firms.forEach(f => { const k = TGROUP === 'rol' ? f.g : f.ulke.replace(/ \(.*\)/, ''); (by[k] = by[k] || []).push(f); });
  const keys = TGROUP === 'rol' ? Object.keys(GCOL).filter(k => by[k]) : Object.keys(by).sort();
  const ctry = new Set(IS2.firms.map(f => f.ulke.replace(/ \(.*\)/, '').split(' / ')[0]));
  const edgeList = ['mal', 'para', 'hukuk'].map(t => {
    const es = EDG.filter(e => e[3] === t);
    return wk('ee' + t, `<span class="pill" style="border-color:${ECSS[t]};color:${ECSS[t]}">${ETL[t]}</span><span>${t === 'mal' ? 'Mal ve varlık akışı' : t === 'para' ? 'Para akışı' : 'Sözleşme ve teminat'}</span><small>${es.length} bağ</small>`,
      es.map(e => wk('eg' + e[0], `<span>${esc(NODES[e[1]].l)} → ${esc(NODES[e[2]].l)}</span><small>${esc(e[5])}</small>`, `<p style="margin:2px 0 6px">${esc(e[6])}</p><p class="note" style="margin:0">Kaynak: ${esc(e[7])}</p>`)).join(''));
  }).join('');
  return `<div class="demo">Firmalar DEMO kayıtlar (${IS2.firms.length} firma, ${ctry.size} ülke). Bağlar Baserow'daki ilişki alanlarından ve proje notlarından çıkarıldı. Veri: ${esc(IS.tarih)}, canlı değil.</div>
  <section class="panel" style="margin-bottom:14px"><h2>Taraf haritası</h2>
  <p class="note" style="margin:0 0 8px">Bir firmaya bas: bağları öne çıkar ve altında açılır. Mavi mal, yeşil para, sarı kesikli sözleşme ve teminat.</p>
  <div class="seg">${[['hepsi', 'Hepsi'], ['mal', 'Mal'], ['para', 'Para'], ['hukuk', 'Hukuk']].map(a => `<a href="#taraflar" data-tf="${a[0]}" ${TF === a[0] ? 'aria-current="page"' : ''}>${a[1]}</a>`).join('')}</div>
  <div class="sct">${mapSvg()}</div></section>
  <section class="panel" style="margin-bottom:14px"><h2>Firmalar</h2>
  <p style="margin:0 0 8px"><label class="note">Grupla: <select id="tg"><option value="rol"${TGROUP === 'rol' ? ' selected' : ''}>Role göre</option><option value="ulke"${TGROUP === 'ulke' ? ' selected' : ''}>Ülkeye göre</option></select></label></p>
  ${keys.map(k => `<h3 style="margin:10px 0 6px">${esc(k)} <small class="note">${by[k].length}</small></h3>${by[k].map(firmWk).join('')}`).join('')}</section>
  <section class="panel"><h2>Bağlar (${EDG.length})</h2><p class="note" style="margin:0 0 8px">Her bağın nedeni ve hangi tablodan çıkarıldığı açılınca görünür.</p>${edgeList}</section>`;
};
document.addEventListener('click', e => {
  let b = e.target.closest('[data-nid]');
  if (b) { const id = +b.dataset.nid; TSEL = TSEL === id ? null : id; route(); if (TSEL != null) openWk('fw' + id); return; }
  b = e.target.closest('[data-tf]');
  if (b) { e.preventDefault(); e.stopPropagation(); TF = b.dataset.tf; route(); return; }
  b = e.target.closest('[data-newrec]');
  if (b) { FT = +b.dataset.newrec; goTo('giris'); return; }
}, true);
document.addEventListener('change', e => { if (e.target.id === 'tg') { TGROUP = e.target.value; route(); } });

/* ---------- SÜREÇ HARİTASI ---------- */
const STG_TABLES = { 1: ['Sözleşmeler', 'Belgeler'], 2: ['Krediler', 'Teminatlar', 'Belgeler', 'Yazışmalar'], 3: ['Teminatlar', 'Krediler'], 4: ['İmalat ve Tedarik', 'Ekipman Lotları'], 5: ['Sevkiyatlar', 'Belgeler', 'Sigortalar'], 6: ['Gümrük İşlemleri', 'Makineler'], 7: ['Teminatlar', 'Belgeler'], 8: ['Tahsisler', 'Hizmet Kayıtları', 'Bakım ve Yedek Parça', 'Sigortalar'] };
function stages() {
  const m = {};
  IS2.steps.forEach(s => { const n = parseInt(s.a, 10); (m[n] = m[n] || { n, name: s.a.replace(/^\d+\s*/, ''), steps: [] }).steps.push(s); });
  return Object.values(m).sort((a, b) => a.n - b.n).map(g => {
    const v = g.steps.filter(s => s.ok);
    g.valid = v.length; g.done = v.filter(s => s.d === 'Tamam').length; g.run = v.filter(s => s.d === 'Devam Ediyor').length; g.off = g.steps.length - v.length;
    g.cls = g.valid && g.done === g.valid ? 'ok' : (g.done || g.run) ? 'info' : 'mut';
    return g;
  });
}
function stageSvg(ST) {
  const W = 860, h = 92, n = ST.length, w = 120, step = (W - w) / (n - 1), tip = 14;
  const col = { ok: 'var(--ok)', info: 'var(--info)', mut: 'var(--line)' };
  let s = `<svg viewBox="0 0 ${W} ${h}" style="width:100%;min-width:700px;display:block" role="img" aria-label="Süreç aşamaları">`;
  ST.forEach((g, i) => {
    const x = i * step;
    s += `<g data-stg="${g.n}" tabindex="0" style="cursor:pointer"><polygon points="${x},4 ${x + w - tip},4 ${x + w},${h / 2} ${x + w - tip},${h - 4} ${x},${h - 4} ${i ? x + tip : x},${h / 2}" style="fill:var(--surface);stroke:${col[g.cls]};stroke-width:2"/>
    <text x="${x + w / 2 - 2}" y="28" text-anchor="middle" style="fill:var(--muted);font-size:10px">AŞAMA ${g.n}</text>
    <text x="${x + w / 2 - 2}" y="46" text-anchor="middle" style="fill:var(--fg);font-size:11px;font-weight:600">${esc(g.name.length > 19 ? g.name.slice(0, 18) + '…' : g.name)}</text>
    <text x="${x + w / 2 - 2}" y="64" text-anchor="middle" style="fill:var(--muted);font-size:10.5px;font-variant-numeric:tabular-nums">${g.done}/${g.valid} tamam</text></g>`;
  });
  return s + '</svg>';
}
function stepWk(s) {
  const flags = [!s.ok ? 'Seçili proje modeline uygun değil (sayılmıyor)' : '', /DEMO SENARYO/.test(s.ad) ? 'Test senaryosu, gerçek temerrüt değil' : ''].filter(Boolean);
  return wk('sp' + s.n, `<span>${s.n}. ${esc(s.ad)}</span>${pill(s.d)}`,
    `<div class="why"><b>Sorumlu</b> ${esc(s.r || '—')}${s.f.length ? ' · ' + esc(s.f.join(', ')) : ''}</div>
    <div class="why"><b>Vade</b> ${esc(s.v || 'girilmemiş')}</div>
    <div class="why"><b>Kontrol</b> ${esc(s.k || '—')}</div>
    ${s.o ? `<div class="why"><b>Varlık olayı</b> ${esc(s.o)} · ${esc(s.ok2)}</div>` : ''}
    ${s.m.length ? `<div class="why"><b>Makine</b> ${esc(s.m.join(', '))}</div>` : ''}
    ${s.not ? `<div class="why"><b>Not</b> ${esc(s.not)}</div>` : ''}
    ${flags.map(x => `<div class="why" style="color:var(--warn)">${esc(x)}</div>`).join('')}${window.relBox&&window.relBox('s:'+s.n)!==undefined&&s.ok?window.relBox('s:'+s.n):''}${rq('s:' + s.n, s.n + '. ' + s.ad)}`);
}
views.surec = function () {
  const ST = stages(), tot = ST.reduce((a, g) => a + g.valid, 0), dn = ST.reduce((a, g) => a + g.done, 0);
  return `<div class="demo">Süreç adımları Baserow'daki Süreç Adımları tablosundan (${IS2.steps.length} adım). Veri: ${esc(IS.tarih)}, canlı değil.</div>
  <section class="panel" style="margin-bottom:14px"><h2>Projenin yolu: aşamalar</h2>
  <p class="note" style="margin:0 0 8px">Soldan sağa proje akışı. Çerçeve rengi: yeşil hepsi tamam, mavi başladı, gri bekliyor. Bir aşamaya bas, altında açılır. Toplam ${dn}/${tot} geçerli adım tamam.</p>
  <div class="sct">${stageSvg(ST)}</div></section>
  ${ST.map(g => wk('st' + g.n, `<span>${g.n}. ${esc(g.name)}</span><span class="pill ${g.cls === 'ok' ? 'ok' : g.cls === 'info' ? 'info' : ''}">${g.done}/${g.valid} tamam</span><small>${g.steps.length} adım${g.off ? ', ' + g.off + ' sayılmıyor' : ''}</small>`,
    `<div class="hbar ${g.cls === 'ok' ? 'ok' : 'info'}"><span>İlerleme</span><span class="tr"><i style="width:${g.valid ? (g.done / g.valid * 100).toFixed(0) : 0}%"></i></span><span class="mono" style="text-align:right">${g.valid ? Math.round(g.done / g.valid * 100) : 0}%</span></div>
    <div class="note" style="margin:6px 0">İlgili tablolar (basınca altında açılır, sayfa değişmez):${window.relTables ? window.relTables('a:' + g.n, STG_TABLES[g.n]) : ''}</div>
    ${g.steps.map(stepWk).join('')}`, g.n === 1)).join('')}`;
};
document.addEventListener('click', e => {
  let b = e.target.closest('[data-stg]');
  if (b) { openWk('st' + b.dataset.stg); return; }
  b = e.target.closest('[data-newtab]');
  if (b) { const f = IS2.forms.find(x => x.ad === b.dataset.newtab); if (f) { FT = f.id; goTo('giris'); } }
}, true);

/* ---------- TEKLİF SINIRI ---------- */
const TKD = { target: 1.2, metric: 'avg', margin: 10, units: 57, V: 3990000, dp: 15, bOwn: 0, bR: 6.5, bM: 6, lR: 4.5, T: 60, G: 0, inc: 1, rent: 63240, RM: 60, w: 15, opex: 0, resid: 0, inc0: 95000 };
let TK = Object.assign({}, TKD);
try { const s = JSON.parse(localStorage.getItem('cin-tk') || 'null'); if (s) TK = Object.assign({}, TKD, s); } catch (e) {}
const tkMet = s => TK.metric === 'avg' ? s.avg : (s.minEx === null ? 99 : s.minEx);
function solveMax(key, lo, hi, base) {
  const f = v => tkMet(sim(Object.assign({}, base, { [key]: v })));
  if (f(lo) < TK.target) return null;
  if (f(hi) >= TK.target) return { v: hi, cap: true };
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(m) >= TK.target) lo = m; else hi = m; }
  return { v: lo };
}
function solveMin(key, lo, hi, base) {
  const f = v => tkMet(sim(Object.assign({}, base, { [key]: v })));
  if (f(hi) < TK.target) return null;
  if (f(lo) >= TK.target) return { v: lo };
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(m) >= TK.target) hi = m; else lo = m; }
  return { v: hi };
}
function tkCalc() {
  const base = Object.assign({}, TK), rentMax = TK.inc0 * (1 - TK.margin / 100), u = Math.max(TK.units, 1);
  const col = rent => {
    const b = Object.assign({}, base, { rent });
    const V = solveMax('V', Math.max(TK.V * 0.02, 1000), TK.V * 4, b);
    const R = solveMax('lR', 0, 40, b);
    const O = solveMax('opex', 0, Math.max(rent * (1 - TK.w / 100), 1), b);
    const cur = sim(b);
    return { rent, V, R, O, cur, too: TK.inc0 - rent };
  };
  const minRent = solveMin('rent', 0, TK.inc0 * 3, base);
  return { a: col(TK.rent), b: col(rentMax), rentMax, minRent, u };
}
function tkResult() {
  const c = tkCalc(), u = c.u;
  const cell = (x, f, why) => x === null ? `<td class="n bad">ulaşılamaz <small class="note">${why || ''}</small></td>` : `<td class="n">${f(x.v)}${x.cap ? ' <small class="note">(üst sınır)</small>' : ''}</td>`;
  const rows = [
    ['Aylık kira (SPC payı)', k => `<td class="n">${fu(k.rent)}</td>`],
    ['Mevcut girdilerle ortalama / en düşük DSCR', k => `<td class="n ${k.cur.avg < TK.target ? 'bad' : 'good'}">${f2(k.cur.avg)} / ${k.cur.minEx === null ? '—' : f2(k.cur.minEx)}</td>`],
    ['En yüksek varlık bedeli (toplam)', k => cell(k.V, v => fu(v), '(kira çok düşük)')],
    ['… otobüs başına (' + u + ' adet)', k => cell(k.V, v => fu(v / u))],
    ['… girdideki bedele göre', k => cell(k.V, v => pc(v / TK.V * 100))],
    ['En yüksek kredi faizi (yıllık)', k => cell(k.R, v => pc(v), '(faiz 0 olsa bile yetmez)')],
    ['En yüksek aylık işletme / işçilik gideri (SPC)', k => cell(k.O, v => fu(v), '(gider 0 olsa bile yetmez)')],
    ['… otobüs başına', k => cell(k.O, v => fu(v / u))],
    ['TOO\'ya kalan pay (ÖMG geliri − kira), aylık', k => `<td class="n ${k.too < 0 ? 'bad' : ''}">${fu(k.too)}</td>`],
    ['… otobüs başına (TOO işçilik ve işletme payı)', k => `<td class="n ${k.too < 0 ? 'bad' : ''}">${fu(k.too / u)}</td>`]
  ];
  let verdict;
  if (c.minRent === null) verdict = `<div class="demo" style="background:var(--crit-bg);color:var(--crit)">Hedef DSCR ${f2(TK.target)}, kira ne olursa olsun bu kredi yapısıyla sağlanamıyor. Fiyat, faiz veya vadeyi değiştir.</div>`;
  else if (c.minRent.v <= c.rentMax) verdict = `<div class="demo" style="background:var(--ok-bg);color:var(--ok)">Kira penceresi açık: hedef DSCR için en az ${fu(c.minRent.v)}/ay gerekiyor, TOO marjı korunarak en çok ${fu(c.rentMax)}/ay alınabilir.</div>`;
  else verdict = `<div class="demo" style="background:var(--crit-bg);color:var(--crit)">Kira penceresi kapalı: hedef DSCR için en az ${fu(c.minRent.v)}/ay gerekiyor, ama ÖMG gelirinden %${TK.margin} TOO marjı düşünce tavan ${fu(c.rentMax)}/ay. Fiyat, faiz veya vade düşmeli; ya da hedef gevşemeli. Sağ sütundaki sınırlar tavan kirada çıkan en yüksek değerlerdir.</div>`;
  const sens = [0.7, 0.8, 0.9, 1, 1.1].map(m => {
    const a = tkMet(sim(Object.assign({}, TK, { V: TK.V * m }))), b = tkMet(sim(Object.assign({}, TK, { V: TK.V * m, rent: c.rentMax })));
    return `<tr><td class="lbl">${pc(m * 100)} · ${fu(TK.V * m)}</td><td class="n ${a >= TK.target ? 'good' : 'bad'}">${f2(a)}</td><td class="n ${b >= TK.target ? 'good' : 'bad'}">${f2(b)}</td></tr>`;
  }).join('');
  return `${verdict}<div class="sct"><table><thead><tr><th>Sınır</th><th>Mevcut kirayla</th><th>Tavan kirayla (${fu(c.rentMax)})</th></tr></thead><tbody>
  ${rows.map(r => `<tr><td class="lbl">${esc(r[0])}</td>${r[1](c.a)}${r[1](c.b)}</tr>`).join('')}
  <tr><td class="lbl">Hedef DSCR için en düşük kira (kırılma)</td><td class="n" colspan="2">${c.minRent ? fu(c.minRent.v) + ' / ay' : 'ulaşılamaz'}</td></tr></tbody></table></div>
  <h3 style="margin:14px 0 6px">Fiyat değişince DSCR (${TK.metric === 'avg' ? 'ortalama' : 'en düşük ay'})</h3>
  <div class="sct"><table><thead><tr><th>Varlık bedeli</th><th>Mevcut kirayla</th><th>Tavan kirayla</th></tr></thead><tbody>${sens}</tbody></table></div>`;
}
const TKF = [['target', 'Hedef DSCR'], ['metric', 'Ölçüt', [['avg', 'Ortalama DSCR'], ['min', 'En düşük ay (balon hariç)']]], ['margin', 'TOO\'ya bırakılacak pay %'], ['units', 'Otobüs adedi'],
  ['V', 'Varlık bedeli (USD)'], ['dp', 'Peşinat %'], ['bOwn', 'Peşinat kaynağı', [[0, 'Köprü kredi'], [1, 'Öz kaynak']]], ['bR', 'Köprü faizi % (yıllık)'], ['bM', 'Köprü vadesi (ay)'],
  ['lR', 'Kredi faizi % (yıllık)'], ['T', 'Kredi vadesi (ay)'], ['G', 'Anapara erteleme (ay)'], ['inc', 'Erteleme vadeye', [[1, 'Dahil'], [0, 'Ek']]],
  ['rent', 'SPC kirası / ay (USD)'], ['RM', 'Kira süresi (ay)'], ['w', 'Stopaj %'], ['opex', 'İşletme / işçilik gideri / ay'], ['resid', 'Dönem sonu devir bedeli'], ['inc0', 'ÖMG hizmet geliri / ay']];
views.teklif = function () {
  const f = TKF.map(a => { const id = 'tk_' + a[0]; return a[2] ? `<label>${a[1]}<select id="${id}" data-tk="${a[0]}">${a[2].map(o => `<option value="${o[0]}"${String(TK[a[0]]) === String(o[0]) ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label>` : `<label>${a[1]}<input id="${id}" data-tk="${a[0]}" type="number" step="any" value="${TK[a[0]]}"></label>`; }).join('');
  return `<div class="demo">Girdiler DEMO projeden. Bu sayfa soruyu tersine çevirir: hedef DSCR'ı tutturmak için ödeyebileceğin en yüksek mal bedelini, faizi ve işletme veya işçilik giderini bulur. Teklif verirken veya alırken bu sınırı aşma.</div>
  <section class="panel" style="margin-bottom:14px"><h2>Teklif sınırı</h2><div id="tkres">${tkResult()}</div></section>
  <section class="panel"><h2>Girdiler</h2><div class="sf">${f}</div>
  <p style="margin:0"><button type="button" class="btn" id="tkAdd">Talebe ekle</button> <button type="button" class="btn ghost" id="tkReset">Varsayılanlara dön</button> <span class="note" id="tkmsg"></span></p>
  <p class="note" style="margin:10px 0 0">Girdiler nereye kaydolur: yalnızca bu tarayıcıya (localStorage). Baserow'a yazılmaz ve başka cihazda görünmez. Kalıcı saklamak için “Talebe ekle” sonucu Toplam talepler listesine metin olarak koyar. Hedef DSCR 1,20 bir banka şartı değil, kendi ayarın; bankanın yazılı şartını öğrenince değiştir. Hesap: kredi eşit anapara, köprü kredi vade sonunda tek ödeme, CFADS = kira × (1 − stopaj) − işletme gideri.</p></section>`;
};
document.addEventListener('input', e => {
  const t = e.target; if (!t.dataset || !t.dataset.tk) return;
  TK[t.dataset.tk] = t.tagName === 'SELECT' && t.dataset.tk === 'metric' ? t.value : +t.value;
  try { localStorage.setItem('cin-tk', JSON.stringify(TK)); } catch (x) {}
  const r = document.getElementById('tkres'); if (r) r.innerHTML = tkResult();
});
document.addEventListener('click', e => {
  if (e.target.id === 'tkReset') { TK = Object.assign({}, TKD); try { localStorage.removeItem('cin-tk'); } catch (x) {} route(); }
  if (e.target.id === 'tkAdd') {
    const c = tkCalc(), fv = x => x === null ? 'ulaşılamaz' : fm(x.v);
    REQ['tk:' + Date.now()] = { t: 'TEKLİF SINIRI: hedef DSCR ' + f2(TK.target) + ', kira ' + fm(TK.rent) + '/ay', s: 'yap', n: 'Mevcut kirayla en yüksek varlık bedeli ' + fv(c.a.V) + ' USD, faiz ' + (c.a.R ? f2(c.a.R.v) : 'ulaşılamaz') + '%, işletme/işçilik ' + fv(c.a.O) + ' USD/ay. Tavan kirayla (' + fm(c.rentMax) + ') varlık bedeli ' + fv(c.b.V) + ' USD. Gereken en düşük kira ' + (c.minRent ? fm(c.minRent.v) : 'ulaşılamaz') + '. Girdiler: ' + Object.entries(TK).map(([k, v]) => k + '=' + v).join(', ') };
    saveReq(); const m = document.getElementById('tkmsg'); if (m) m.textContent = 'Eklendi. Toplam talepler sayfasında görürsün.';
  }
});

/* ---------- FORM GİRİŞİ (onaylı Baserow yazımı) ---------- */
let FT = IS2.forms[0].id, FV = {}, FQ = [], FCONF = null, FMSG = '';
try { FQ = JSON.parse(localStorage.getItem('cin-q') || '[]'); } catch (e) {}
const saveQ = () => { try { localStorage.setItem('cin-q', JSON.stringify(FQ)); } catch (e) {} };
const ftab = () => IS2.forms.find(x => x.id === FT) || IS2.forms[0];
const QST = { bekliyor: ['Onay bekliyor', 'warn'], yaziliyor: ['Yazılıyor…', 'info'], yazildi: ['Baserow\'a yazıldı', 'ok'], belirsiz: ['Sonuç belirsiz', 'warn'], hata: ['Hata', 'crit'] };
views.giris = function () {
  const T = ftab(), groups = IS2.fg;
  const fld = T.f.map((f, k) => {
    const id = 'ff_' + k, v = FV[T.id + ':' + k] ?? '';
    const lab = `<label for="${id}">${esc(f.n)}${f.n === T.p ? ' <b style="color:var(--crit)">*</b>' : ''}</label>`;
    if (f.t === 'long_text') return `<div class="fg">${lab}<textarea id="${id}" data-ff="${k}" rows="2">${esc(v)}</textarea></div>`;
    if (f.t === 'boolean') return `<div class="fg fgb"><input id="${id}" data-ff="${k}" type="checkbox"${v ? ' checked' : ''}>${lab}</div>`;
    if (f.t === 'single_select') return `<div class="fg">${lab}<select id="${id}" data-ff="${k}"><option value="">—</option>${f.o.map(o => `<option${v === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`;
    if (f.t === 'firma') return `<div class="fg">${lab}<select id="${id}" data-ff="${k}"><option value="">—</option>${IS2.firms.map(x => `<option value="${x.id}"${String(v) === String(x.id) ? ' selected' : ''}>${esc(x.ad)}</option>`).join('')}</select></div>`;
    if (f.t === 'proje') return `<div class="fg">${lab}<select id="${id}" data-ff="${k}"><option value="">—</option><option value="1"${String(v) === '1' ? ' selected' : ''}>Kazakistan 57 Otobüs – ÖMG Projesi (DEMO)</option></select></div>`;
    const ty = f.t === 'number' ? 'number' : f.t === 'date' ? 'date' : f.t === 'email' ? 'email' : f.t === 'url' ? 'url' : 'text';
    return `<div class="fg">${lab}<input id="${id}" data-ff="${k}" type="${ty}"${ty === 'number' ? ' step="any"' : ''} value="${esc(v)}"></div>`;
  }).join('');
  const q = FQ.slice().reverse().map(x => {
    const st = QST[x.st] || QST.hata, pv = x.row[IS2.forms.find(f => f.id === x.t).p] ?? '';
    const conf = FCONF === x.id;
    return wk('q' + x.id, `<span>${esc(x.tn)}: ${esc(String(pv))}</span><span class="pill ${st[1]}">${st[0]}</span><small>${esc(x.at.slice(0, 16).replace('T', ' '))}</small>`,
      `<div class="sct"><table><tbody>${Object.entries(x.row).map(([k, v]) => `<tr><td class="lbl">${esc(k)}</td><td>${esc(Array.isArray(v) ? v.map(i => (FM[i] ? FM[i].ad : '#' + i)).join(', ') : String(v))}</td></tr>`).join('')}</tbody></table></div>
      ${x.msg ? `<p class="note" style="margin:6px 0;color:${x.st === 'yazildi' ? 'var(--ok)' : 'var(--warn)'}">${esc(x.msg)}</p>` : ''}
      <p style="margin:8px 0 0">${x.st === 'yazildi' ? `<button type="button" class="btn" data-qver="${x.id}">Baserow'da doğrula</button>` : conf ? `<span class="note">Bu satır Baserow'a eklenecek. Emin misin?</span> <button type="button" class="btn" data-qyes="${x.id}">Evet, yaz</button> <button type="button" class="btn ghost" data-qno="1">Vazgeç</button>` : x.st === 'yaziliyor' ? '' : `<button type="button" class="btn" data-qask="${x.id}">Onayla ve Baserow'a yaz</button>${x.st === 'belirsiz' ? ` <button type="button" class="btn ghost" data-qver="${x.id}">Önce Baserow'da ara</button>` : ''}`}
      <button type="button" class="btn ghost" data-qcp="${x.id}">Metni kopyala</button> <button type="button" class="btn ghost" data-qdel="${x.id}">Sil</button></p>`, x.st === 'bekliyor');
  }).join('') || '<p class="note" style="margin:0">Henüz taslak yok. Soldaki formu doldurup “Taslağa ekle”ye bas.</p>';
  return `<div class="demo">Burası Baserow'a giriş formu. Doldurduğun satır önce taslak olur; ancak “Onayla ve Baserow'a yaz” ve ardından “Evet, yaz” dersen Baserow'a eklenir. Yalnızca yeni satır eklenir; mevcut kayıt değiştirilmez veya silinmez. Bu yazma yolunu henüz gerçek Baserow'da denemedim, ilk yazmadan sonra “Baserow'da doğrula” ile kontrol et.</div>
  <section class="panel" style="margin-bottom:14px"><h2>Yeni kayıt</h2>
  <p style="margin:0 0 10px"><label class="note">Tablo: <select id="ft">${groups.map(g => `<optgroup label="${esc(g[0])}">${IS2.forms.filter(f => f.g === g[0]).map(f => `<option value="${f.id}"${f.id === T.id ? ' selected' : ''}>${esc(f.ad)}</option>`).join('')}</optgroup>`).join('')}</select></label></p>
  <div class="ffm">${fld}</div>
  <p class="note" style="margin:8px 0">Yıldızlı alan zorunlu. Boş bıraktığın alanlar gönderilmez. Bağlantı alanları yalnızca Firmalar ve proje için var; diğer bağlantıları (lot, makine, sevkiyat gibi) satır eklendikten sonra Baserow'da veya benimle bağlarız.</p>
  <p style="margin:0"><button type="button" class="btn" id="fAdd">Taslağa ekle</button> <button type="button" class="btn ghost" id="fClr">Formu temizle</button> <span class="note" id="fmsg">${esc(FMSG)}</span></p></section>
  <section class="panel"><h2>Taslaklar (${FQ.length})</h2>${q}</section>`;
};
document.addEventListener('input', e => {
  const t = e.target; if (!t.dataset || t.dataset.ff === undefined) return;
  FV[ftab().id + ':' + t.dataset.ff] = t.type === 'checkbox' ? t.checked : t.value;
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'ft') { FT = +t.value; FMSG = ''; route(); return; }
  if (t.dataset && t.dataset.ff !== undefined) FV[ftab().id + ':' + t.dataset.ff] = t.type === 'checkbox' ? t.checked : t.value;
});
function buildRow() {
  const T = ftab(), row = {}; let err = '';
  T.f.forEach((f, k) => {
    const v = FV[T.id + ':' + k];
    if (v === undefined || v === '' || v === false) return;
    if (f.t === 'number') { const n = Number(String(v).replace(',', '.')); if (isNaN(n)) err = f.n + ' sayı olmalı'; else row[f.n] = n; }
    else if (f.t === 'boolean') row[f.n] = true;
    else if (f.t === 'firma' || f.t === 'proje') row[f.n] = [Number(v)];
    else row[f.n] = String(v);
  });
  if (!err && (row[T.p] === undefined || String(row[T.p]).trim() === '')) err = T.p + ' alanı zorunlu';
  return { row, err };
}
const MCPMSG = { server_not_connected: 'Baserow bağlayıcısı bu hesapta bulunamadı. Claude ayarlarında Bağlayıcılar bölümünden ekle.', needs_reauth: 'Baserow bağlantısının süresi dolmuş. Bağlayıcıyı yeniden bağla.', not_in_manifest: 'Bu sayfa için Baserow izni verilmedi.', approval_required: 'Baserow yazması için onay gerekiyor. Düğmeye tekrar bas ve izin ver.', blocked_by_policy: 'Kuruluş politikası bu bağlayıcı çağrısını engelliyor.', selection_required: 'Birden fazla Baserow bağlayıcın var, Claude\'un sorduğu seçimi yap.', capability_disabled: 'Bu görünümde Baserow bağlantısı yok. Sayfayı claude.ai içinde aç; ya da “Metni kopyala” ile AI\'ya ilet.', not_granted: 'Bu görünüme Baserow izni verilmedi. “Metni kopyala” ile AI\'ya ilet.', cancelled: 'İstek iptal edildi.' };
function errText(e) {
  const c = e && e.code;
  if (MCPMSG[c]) return MCPMSG[c];
  if (c === 'tool_error') { let m = String((e && e.message) || ''); return 'Baserow satırı reddetti: ' + m.slice(0, 220); }
  return 'Yazma tamamlanamadı (' + (c || 'bilinmeyen hata') + ').';
}
async function getMcp() { return window.claude && window.claude.use ? await window.claude.use('mcp') : null; }
const WRITE_OK = false; /* ANA KILIT: tasarım bitip kullanıcı onaylayana kadar Baserow'a yazma kapalı */
async function qWrite(id) {
  const q = FQ.find(x => x.id === id); if (!q) return;
  if (!WRITE_OK) { q.msg = 'Yazma kapalı: tasarım bitene kadar Baserow\'a hiçbir şey yazılmaz. Kayıt bu tarayıcıda bekler.'; saveQ(); route(); return; }
  q.st = 'yaziliyor'; q.msg = ''; FCONF = null; saveQ(); route();
  try {
    const mcp = await getMcp(); if (!mcp) throw { code: 'capability_disabled' };
    const r = await mcp.callTool(SERVER, 'create_rows', { table_id: q.t, rows: [q.row] }, { cache: false });
    q.st = 'yazildi'; q.msg = 'Baserow yanıt verdi. Emin olmak için “Baserow\'da doğrula”ya bas.';
    try { let p = r.payload; if (typeof p === 'string') p = JSON.parse(p); const rid = p && ((p.rows && p.rows[0] && p.rows[0].id) || (p.results && p.results[0] && p.results[0].id) || (Array.isArray(p) && p[0] && p[0].id)); if (rid) { q.rid = rid; q.msg = 'Baserow satır no: ' + rid + '. Emin olmak için “Baserow\'da doğrula”ya bas.'; } } catch (x) {}
    try { if (typeof liveRefresh === 'function') { live[q.t] = undefined; } } catch (x) {}
  } catch (e) {
    const amb = ['server_unavailable', 'upstream_error', 'cancelled'].includes(e && e.code);
    q.st = amb ? 'belirsiz' : 'hata';
    q.msg = errText(e) + (amb ? ' Satır yazılmış olabilir; tekrar yazmadan önce “Önce Baserow\'da ara”ya bas.' : '');
  }
  q.at2 = new Date().toISOString(); saveQ(); route();
}
async function qVerify(id) {
  const q = FQ.find(x => x.id === id); if (!q) return;
  const T = IS2.forms.find(f => f.id === q.t), val = String(q.row[T.p]);
  try {
    const mcp = await getMcp(); if (!mcp) throw { code: 'capability_disabled' };
    const r = await mcp.callTool(SERVER, 'list_table_rows', { table_id: q.t, search: val, size: 10 }, { cache: false });
    let p = r.payload; if (typeof p === 'string') { try { p = JSON.parse(p); } catch (x) {} }
    const hit = p && Array.isArray(p.results) ? p.results.filter(x => String(x[T.p]) === val) : [];
    if (hit.length) { q.st = 'yazildi'; q.msg = 'Doğrulandı: Baserow\'da “' + val + '” bulundu (' + hit.length + ' satır, satır no ' + hit.map(x => x.id).join(', ') + ').'; }
    else q.msg = 'Baserow\'da “' + val + '” bulunamadı' + (p && typeof p.count === 'number' ? ' (arama ' + p.count + ' sonuç döndürdü)' : '') + '.';
  } catch (e) { q.msg = errText(e); }
  saveQ(); route();
}
function qText(q) {
  return 'BASEROW GİRİŞ TALEBİ (taslak; onay değildir)\nTablo: ' + q.tn + ' (id ' + q.t + ')\n' + Object.entries(q.row).map(([k, v]) => '- ' + k + ': ' + (Array.isArray(v) ? v.map(i => (FM[i] ? FM[i].ad : '#' + i)).join(', ') : v)).join('\n');
}
document.addEventListener('click', e => {
  const t = e.target, d = t.dataset || {};
  if (t.id === 'fAdd') {
    const r = buildRow();
    if (r.err) { FMSG = r.err; route(); return; }
    const T = ftab(); FQ.push({ id: Date.now(), t: T.id, tn: T.ad, row: r.row, st: 'bekliyor', at: new Date().toISOString(), msg: '' }); saveQ();
    T.f.forEach((f, k) => delete FV[T.id + ':' + k]); FMSG = 'Taslağa eklendi. Aşağıdan onaylayabilirsin.'; route(); return;
  }
  if (t.id === 'fClr') { const T = ftab(); T.f.forEach((f, k) => delete FV[T.id + ':' + k]); FMSG = ''; route(); return; }
  if (d.qask) { FCONF = +d.qask; route(); openWk('q' + d.qask); return; }
  if (d.qno) { FCONF = null; route(); return; }
  if (d.qyes) { qWrite(+d.qyes); return; }
  if (d.qver) { qVerify(+d.qver); return; }
  if (d.qdel) { FQ = FQ.filter(x => x.id !== +d.qdel); saveQ(); route(); return; }
  if (d.qcp) {
    const q = FQ.find(x => x.id === +d.qcp); if (!q) return; const txt = qText(q);
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => { FMSG = 'Kopyalandı'; }, () => { FMSG = 'Metni elle seç ve kopyala'; }).then(() => { const m = document.getElementById('fmsg'); if (m) m.textContent = FMSG; });
  }
}, true);

/* ---------- GRUPLU TABLOLAR ---------- */
const IGR = [['Taraflar', ['Firmalar', 'Sözleşmeler', 'Yazışmalar']], ['Proje ve finansman', ['Projeler', 'Krediler', 'Teminatlar', 'Giderler ve Vergiler', 'Muafiyetler ve Teşvikler', 'Kur Takibi']],
  ['Planlar ve hesaplar', ['Kira ve Tahsilat Planı', 'Geri Ödeme Planı', 'Gelir Gider Dengesi']], ['Tedarik ve üretim', ['Ekipman Lotları', 'İmalat ve Tedarik']], ['Lojistik ve gümrük', ['Sevkiyatlar', 'Gümrük İşlemleri']],
  ['Varlık (makine ve saha)', ['Makineler', 'Tahsisler', 'Sigortalar', 'Bakım ve Yedek Parça', 'Hizmet Kayıtları']], ['Belge ve süreç', ['Belgeler', 'Süreç Adımları']],
  ['Senaryo motoru', ['Senaryolar', 'Senaryo Finansman Dilimleri', 'Senaryo Ödeme Planı', 'Senaryo Varsayımları', 'Senaryo Değerlendirme', 'Senaryo Gelir Gider Akışı']]];
const NIDX_T = i => IGR.some(g => g[1].includes(TD[i].n));
const tdIdx = n => TD.findIndex(t => t.n === n);
const tdGrp = i => IGR.findIndex(g => g[1].includes(TD[i].n));
views.istablo = function () {
  const used = new Set(); IGR.forEach(g => g[1].forEach(n => { const i = tdIdx(n); if (i >= 0) used.add(i); }));
  const rest = TD.map((t, i) => i).filter(i => (SECT.is.includes(TD[i].g) || SECT.sentez.includes(TD[i].g)) && !used.has(i));
  const grp = (name, idx, gi) => {
    const rows = idx.reduce((a, i) => a + (live[TD[i].i] ?? TD[i].r), 0);
    return wk('tg' + gi, `<span>${esc(name)}</span><small>${idx.length} tablo · ${rows} satır</small>`, idx.map(i => {
      const t = TD[i], conn = new Set(); t.o.forEach(p => { if (p[0] !== i) conn.add(p[0]); }); incoming(i).forEach(p => conn.add(p[0]));
      const fo = IS2.forms.find(f => f.ad === t.n), r = live[t.i] ?? t.r;
      return wk('tb' + i, `<span>${esc(t.n)}</span><small>${r} satır · ${t.f} alan · ${t.l} ilişki${t.m ? ' · ' + t.m + ' formül' : ''}</small>`,
        `<p style="margin:2px 0 8px">${esc(t.p)}</p>
        <div class="chips">${[...conn].map(j => `<button type="button" class="tgb" data-tj="${j}">${esc(lab(TD[j].n))}</button>`).join('') || '<span class="note">Bağ yok</span>'}</div>
        ${t.x.length ? `<details class="fxd" style="margin-top:8px"><summary>Formüller (${t.m})</summary>${t.x.map(x => `<div class="fx"><b>${esc(x[0])}</b> <span class="note">${esc(x[1])}</span><code>${esc(x[2])}</code></div>`).join('')}</details>` : ''}
        ${window.relBox&&NIDX_T(i)?window.relBox('t:'+i):''}${fo ? `<p style="margin:10px 0 0"><button type="button" class="btn" data-newrec="${fo.id}">Bu tabloya yeni kayıt</button></p>` : ''}${rq('tb:' + t.i, t.n)}`);
    }).join(''), gi === 0);
  };
  return `<div class="demo">Tablolar işe göre gruplandı. Bir gruba bas, tablolar açılır; bir tabloya bas, ne işe yaradığı, bağlı olduğu tablolar ve formülleri görünür. Satır sayıları ${Object.keys(live).length ? 'canlı okumadan' : 'anlık görüntüden'}.</div>
  ${IGR.map((g, gi) => grp(g[0], g[1].map(tdIdx).filter(i => i >= 0), gi)).join('')}${rest.length ? grp('Diğer', rest, 99) : ''}`;
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-tj]'); if (!b) return;
  const j = +b.dataset.tj, gi = tdGrp(j);
  openWk('tg' + (gi >= 0 ? gi : 99)); openWk('tb' + j);
}, true);

/* ===================== NAV (menü) ===================== */
const ALIAS = { sysmap: 'sysag', akis: 'sysag', gorev: 'sysag', sentez: 'senaryo', toplam: 'toplam', operasyon: 'surec', teklif: 'finans', senaryo: 'finans', isag: 'istab', istablo: 'istab', surec: 'surec', surec1: 'surec', surec2: 'surec', surec3: 'surec', surec4: 'surec', graf: 'taraflar', sozluk: 'sayfa', departman: 'isdemo', tasarim1: 'isdemo', tasarim2: 'isdemo', tasarim3: 'isdemo', tasarim4: 'isdemo', tasarim5: 'isdemo', issoz: 'isdemo' };
const SEGS = {
  sysag: [['sysag', 'İlişki ağı'], ['sysmap', 'SYS haritası'], ['akis', 'SYS akışı'], ['gorev', 'Görev bağı']],
  taraflar: [['taraflar', 'Taraflar haritası'], ['graf', 'Bağlantı grafı']],
  finans: [['finans', 'Finansman'], ['teklif', 'Teklif sınırı'], ['senaryo', 'Senaryolar']],
  surec: [['surec', 'Süreç haritası'], ['surec1', 'Pano'], ['surec2', 'Tablo'], ['surec3', 'Duruma göre'], ['surec4', 'Sorumlu matrisi'], ['operasyon', 'Operasyon durumu']],
  istab: [['istab', 'Tablo listesi'], ['istablo', 'Gruplu (wiki)'], ['isag', 'İş ağı']],
  tasarim: [['isdemo', 'Klasik'], ['tasarim1', 'Sihirbaz'], ['tasarim2', 'Galeri'], ['tasarim3', 'Gantt'], ['tasarim4', 'Şeritler'], ['tasarim5', 'Stüdyo'], ['departman', 'Departman'], ['issoz', 'Sözleşme türleri']]
};
const SECS3 = [
  ['bugun', 'Bugün', [['bugun', 'Bugün'], ['toplam', 'Toplam talepler'], ['genel', 'Genel özet']]],
  ['is', 'İş', [['cikarim', 'Çıkarımlar'], ['taraflar', 'Taraflar'], ['surec', 'Süreç'], ['finans', 'Finans'], ['projeler', 'Projeler'], ['isdemo', 'Tasarım'], ['giris', 'Giriş'], ['evrak', 'Evrak ara'], ['kolon', 'Kolon kategorileri'], ['istab', 'İş tabloları'], ['ortak', 'Ortak yapı']]],
  ['sistem', 'Sistem', [['sys', 'SYS kayıtları'], ['chat', 'CHAT'], ['sysag', 'Haritalar'], ['git', 'Git ve araçlar'], ['saglik', 'Sağlık'], ['paneltest', 'Panel testi'], ['test', 'Test listesi'], ['sistabl', 'Sistem tabloları']]],
  ['tasarla', 'Tasarla', [['sayfa', 'Sayfa tasarımcısı']]],
  ['hatirla', 'Hatırla', [['hatirla', 'Sistemi hatırla'], ['ag', 'Tüm ilişki ağı']]]];
function renderNav(key) {
  const k2 = ALIAS[key] || key;
  const sec = SECS3.find(s => s[2].some(t => t[0] === k2)) || SECS3[0];
  $('#nav').innerHTML = SECS3.map(s => `<a href="#${s[2][0][0]}" ${s === sec ? 'aria-current="page"' : ''}>${s[1]}${s[0] === 'sistem' && pendingTests() ? ` <span class="pill warn">${pendingTests()}</span>` : ''}</a>`).join('');
  let n2 = $('#nav2'); if (!n2) { n2 = document.createElement('nav'); n2.id = 'nav2'; n2.setAttribute('aria-label', 'Alt bölümler'); $('#nav').after(n2); }
  n2.innerHTML = sec[2].map(t => `<a href="#${t[0]}" ${t[0] === k2 ? 'aria-current="page"' : ''}>${t[1]}</a>`).join('');
  n2.hidden = sec[2].length < 2;
}
const _segWrap = k => { const g = Object.values(SEGS).find(s => s.some(a => a[0] === k)); return g ? `<div class="seg">${g.map(m => `<a href="#${m[0]}" ${m[0] === k ? 'aria-current="page"' : ''}>${m[1]}</a>`).join('')}</div>` : ''; };
