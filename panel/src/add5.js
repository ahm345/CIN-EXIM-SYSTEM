
/* ===================== v7/v10: HER SAYFADA DEĞİŞİKLİK EMRİ + BÖLGE SEÇİCİ + BÖLGE KATALOĞU ===================== */
(function () {
const SKIP = ['toplam', 'test'];
const dk = k => 'cin-pnd-' + k;
const rd = k => { try { return sessionStorage.getItem(dk(k)) || ''; } catch (e) { return ''; } };
const wr = (k, v) => { try { sessionStorage.setItem(dk(k), v); } catch (e) {} };
const notes = k => Object.entries(REQ).filter(([a]) => a.startsWith('pn:' + k + ':'));
const clean = s => (s || '').replace(/\s+/g, ' ').trim();
const touch = () => { try { return matchMedia('(hover: none)').matches; } catch (e) { return false; } };
let PK = null, CH = [], LV = 0, TGT = null, REG = [], LAST = null;
/* seçilebilir bölge türleri: [seçici, Türkçe tür adı] (önce eşleşen kazanır) */
const KINDS = [
  ['#nav a', 'Üst menü düğmesi'], ['#nav2 a', 'Menü düğmesi'], ['.seg a', 'Alt sekme'],
  ['.gn', 'Graf düğümü'], ['.gbar,.gbtn,.gr', 'Gantt satırı / çubuğu'], ['.kbk,.tpc,.dmc,.ed,.tcard,.relo', 'Kart'], ['.kbc', 'Sütun'],
  ['.tile', 'Özet kutucuğu'], ['.pill', 'Rozet'], ['.rc,.chip', 'Çip'], ['.btn,button', 'Düğme'], ['input,select,textarea', 'Giriş alanı'], ['label', 'Etiketli alan'],
  ['summary', 'Açılır bölüm başlığı'], ['details', 'Açılır bölüm (akordiyon)'], ['th', 'Tablo sütun başlığı'], ['tr', 'Tablo satırı'], ['td', 'Tablo hücresi'], ['table', 'Tablo'],
  ['h2,h3', 'Başlık'], ['.demo', 'Bilgi şeridi'], ['.why', 'Bilgi satırı'], ['svg', 'Çizim'], ['section.panel', 'Bölüm (kutu)'], ['#pnbox', 'İstek kutusu']
];
const kindOf = el => { for (const [s, n] of KINDS) { try { if (el.matches(s)) return n; } catch (e) {} } return 'Alan'; };
const CAND = KINDS.map(k => k[0]).join(',');
const titleOf = h => clean((h.querySelector && (h.querySelector('summary') || h.querySelector('h2') || h.querySelector('h3') || h.querySelector('b')) || {}).textContent || (h.getAttribute && (h.getAttribute('aria-label') || h.getAttribute('title'))) || '').slice(0, 70);
const nameOf = el => { const own = clean(el.textContent).slice(0, 48); const t = /^(SECTION|DETAILS|TABLE|DIV|MAIN|SVG)$/.test(el.tagName) ? (titleOf(el) || own) : (own || titleOf(el)); return t || '—'; };
const idOf = el => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; const c = (el.getAttribute && el.getAttribute('class') || '').split(/\s+/).filter(x => x && !/^(on|hid|sel|hl|mt|pnhov|pntgt|open)$/.test(x)).slice(0, 3); if (c.length) s += '.' + c.join('.'); ['data-k', 'data-rel', 'data-nd', 'data-de', 'data-ff', 'data-stg', 'data-nid', 'data-tj', 'data-pk', 'data-tsel', 'data-k1', 'data-k2', 'data-c4', 'data-gi'].forEach(a => { if (el.getAttribute && el.getAttribute(a)) s += '[' + a + '=' + el.getAttribute(a) + ']'; }); return s; };
const ancestors = el => { const L = []; let n = el; while (n && n.id !== 'view' && n.parentElement && L.length < 40) { if (n.matches && n.matches('section.panel,details,.kbc,.kbk,.tpc,.dmc,.ed,.tile,table,.relo,.demo,.ws,.wsm,.wsr,.sct')) L.push(n); n = n.parentElement; } return L.reverse(); };
const pathOf = el => ancestors(el).slice(-4).map(a => kindOf(a).replace(/ \(.*\)/, '') + ' “' + nameOf(a).slice(0, 28) + '”').join(' ▸ ');
const chain = el => { const L = []; let n = el; while (n && n.id !== 'view' && n.parentElement && L.length < 12) { if (n.matches && n.matches(CAND) && !n.closest('#pnbox,#pnbar,#pnlab')) L.push(n); n = n.parentElement; } return L; };
const orderText = key => {
  const L = notes(key).map(([, r]) => r.n.trim()), d = rd(key).trim(); if (d && /İstek:\s*\S/.test(d)) L.push(d);
  if (!L.length) return '';
  return `SAYFA DEĞİŞİKLİK EMRİ · sayfa: ${key} · kaynak: views.${key} (CIN_EXIM_Kontrol_Paneli)\nKural: yalnızca aşağıdaki bölgeleri değiştir, başka yeri bozma. Önce ne yapacağını bir cümleyle yaz, sonra uygula ve test et.\n\n` + L.map((x, i) => (i + 1) + ') ' + x).join('\n\n');
};
window.pageNote = function (key) {
  if (SKIP.includes(key)) return '';
  const L = notes(key), d = rd(key);
  return `<section class="panel" id="pnbox" style="margin-top:18px;border:1px dashed var(--accent)">
    <h2>Bu sayfada değişiklik isteği</h2>
    <p class="note" style="margin:0 0 8px">İki yolla bölge seçersin: <b>(1) 🎯 Bölge seç</b>: üzerine gelince çerçeve ve tür etiketi çıkar (Kart, Sütun, Tablo satırı…). <b>▲ ▼</b> tuşlarıyla (klavyede ok tuşları) seçimi büyütüp küçültürsün, tıklayınca seçilir. <b>(2) 📋 Bölge kataloğu</b>: bu sayfadaki bütün bölümlerin, sütunların, kartların, tabloların ve düğmelerin listesi; birine basınca sayfada yanıp söner ve isteğe eklenir. Sonra “İstek:” satırına ne istediğini yaz.</p>
    <textarea id="pnta" data-pnk="${esc(key)}" aria-label="Değişiklik isteği" placeholder="Bölge: …&#10;Tür: …&#10;Yol: …&#10;Öğe: …&#10;İçerik: …&#10;İstek: (ne değişsin yaz)" style="width:100%;min-height:120px;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:8px;font:13px var(--sans);resize:vertical">${esc(d)}</textarea>
    <p style="margin:8px 0 0;display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button type="button" class="btn ghost" id="pnpick">🎯 Bölge seç</button><button type="button" class="btn ghost" id="pncat">📋 Bölge kataloğu</button><button type="button" class="btn ghost" id="pnsty">🎨 Biçim kataloğu</button><button type="button" class="btn" id="pnadd">Talebe ekle</button><button type="button" class="btn ghost" id="pncopy">Emri kopyala</button><button type="button" class="btn ghost" id="pnclr">Kutuyu temizle</button><span class="note" id="pnmsg"></span></p>
    <div id="pncatbox"></div><div id="pnstybox"></div>
    ${L.length ? `<h3 style="margin:12px 0 4px">Bu sayfa için kaydedilen ${L.length} istek</h3>${L.map(([k, r]) => `<div class="why" style="white-space:pre-wrap">${esc(r.n)} <button type="button" class="btn ghost" data-pndel="${esc(k)}">sil</button></div>`).join('')}` : ''}
  </section>`;
};
const msg = t => { const m = document.getElementById('pnmsg'); if (m) m.textContent = t; };
const mark = el => { document.querySelectorAll('.pnhov').forEach(x => x.classList.remove('pnhov')); if (el) el.classList.add('pnhov'); };
function bar() {
  let b = document.getElementById('pnbar'); if (!PK) { if (b) b.remove(); const l = document.getElementById('pnlab'); if (l) l.remove(); return; }
  if (!b) { b = document.createElement('div'); b.id = 'pnbar'; document.body.appendChild(b); }
  const el = TGT, k = el ? kindOf(el) : '—';
  b.innerHTML = `<span class="pnt"><b>Seçim modu</b> ${el ? esc(k) + ' · “' + esc(nameOf(el)) + '”' : 'bir yere gel veya dokun'}</span><span class="pnb"><button type="button" data-pnl="1" title="Üst bölge (↑)">▲ Büyüt</button><button type="button" data-pnl="-1" title="Alt bölge (↓)">▼ Küçült</button><button type="button" data-pnok="1"${el ? '' : ' disabled'}>Seç</button><button type="button" data-pnx="1">İptal</button></span>`;
  let l = document.getElementById('pnlab'); if (!el) { if (l) l.remove(); return; }
  if (!l) { l = document.createElement('div'); l.id = 'pnlab'; document.body.appendChild(l); }
  const r = el.getBoundingClientRect(); l.textContent = k + ' · ' + nameOf(el).slice(0, 34); l.style.left = Math.max(4, Math.min(innerWidth - 220, r.left)) + 'px'; l.style.top = Math.max(4, r.top - 24) + 'px';
}
function target(el) { CH = el ? chain(el) : []; LV = 0; TGT = CH[0] || null; mark(TGT); bar(); }
function level(d) { if (!CH.length) return; LV = Math.max(0, Math.min(CH.length - 1, LV + d)); TGT = CH[LV]; mark(TGT); bar(); }
function stopPick() { PK = null; CH = []; TGT = null; LV = 0; document.body.classList.remove('pnpick'); mark(null); bar(); const b = document.getElementById('pnpick'); if (b) b.textContent = '🎯 Bölge seç'; }
function addBlock(el) {
  const box = document.getElementById('pnta'); if (!box || !el) return; LAST = el; if (window.pnStyInfo) window.pnStyInfo();
  const blk = 'Bölge: ' + (nameOf(el) || '—') + '\nTür: ' + kindOf(el) + '\nYol: ' + (pathOf(el) || 'sayfa') + '\nÖğe: ' + idOf(el) + '\nİçerik: ' + clean(el.textContent).slice(0, 110) + '\n';
  const v = box.value, i = v.lastIndexOf('İstek:'), head = i >= 0 ? v.slice(0, i) : v, tail = i >= 0 ? v.slice(i) : 'İstek: ';
  box.value = head + (head && !/\n$/.test(head) ? '\n' : '') + blk + '\n' + tail; wr(box.dataset.pnk, box.value);
}
function choose() { const el = TGT; stopPick(); if (el) { addBlock(el); msg('Bölge eklendi: ' + kindOf(el) + '. İstediğini yaz, başka bölge de seçebilirsin.'); } }
function buildCat() {
  const root = document.getElementById('view'); REG = [];
  const groups = [['Bölümler (kutular)', 'section.panel:not(#pnbox)'], ['Sütunlar', '.kbc,.wsr,.wsm'], ['Özet kutucukları', '.tile'], ['Kartlar', '.kbk,.tpc,.dmc,.ed,.tcard'], ['Açılır bölümler', 'details.wk,details.acc'], ['Tablolar', 'table'], ['Çizimler / grafikler', 'svg:not(.gsvg),.gsvg,.gtools,.gantt,.gr:first-of-type'], ['Düğmeler', '.btn:not([data-pnx])'], ['Sekmeler', '.seg a,.wzs']];
  let h = '';
  groups.forEach(([n, sel]) => { const els = [...root.querySelectorAll(sel)].filter(e => !e.closest('#pnbox') && e.getBoundingClientRect().width > 0).slice(0, 40); if (!els.length) return; h += `<details class="wk"><summary><span>${n}</span><small>${els.length}</small></summary><div class="wkb pncl">${els.map(e => { REG.push(e); return `<button type="button" class="rc" data-pnr="${REG.length - 1}" title="${esc(idOf(e))}">${esc(nameOf(e).slice(0, 34))}</button>`; }).join('')}</div></details>`; });
  return h ? `<div class="pncat"><p class="note" style="margin:8px 0 4px">Birine basınca sayfada yanıp söner ve isteğe eklenir. İsimler sayfadaki yazılardan alındı.</p>${h}</div>` : '<p class="note">Bu sayfada listelenecek bölge bulunamadı.</p>';
}

/* ---- BİÇİM KATALOĞU: CSS/Tailwind özelliklerini seç, sayfada dene, isteğe ekle ---- */
const SG = [
 { id: 'gorunum', t: 'Görünüm biçimi', m: 0, o: [['Kart'], ['Tablo'], ['Pano (kanban)'], ['Şerit (swimlane)'], ['Gantt'], ['Ağ grafı'], ['Liste'], ['Akordiyon'], ['Sekme'], ['Izgara'], ['Zaman çizgisi'], ['Matris'], ['Isı haritası'], ['Çizgi grafik'], ['Çubuk grafik']] },
 { id: 'sutun', t: 'Sütun sayısı', m: 0, o: [['1', '1 sütun', { display: 'grid', gridTemplateColumns: 'repeat(1,minmax(0,1fr))' }], ['2', '2 sütun', { display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }], ['3', '3 sütun', { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }], ['4', '4 sütun', { display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))' }]] },
 { id: 'genislik', t: 'Genişlik', m: 0, o: [['dar', 'Dar (420px)', { maxWidth: '420px' }], ['orta', 'Orta (720px)', { maxWidth: '720px' }], ['tam', 'Tam genişlik', { maxWidth: 'none', width: '100%' }]] },
 { id: 'yan', t: 'Yan panel', m: 0, o: [['sağda'], ['solda'], ['sağda, daraltılabilir'], ['sürüklenerek boyutlanır'], ['alta insin (telefonda)']] },
 { id: 'ic', t: 'İç boşluk (padding)', m: 0, o: [['sıkı', 'Sıkı', { padding: '4px' }], ['normal', 'Normal', { padding: '10px' }], ['ferah', 'Ferah', { padding: '18px' }]] },
 { id: 'ara', t: 'Öğeler arası boşluk (gap)', m: 0, o: [['sıkı', 'Sıkı', { gap: '4px' }], ['normal', 'Normal', { gap: '10px' }], ['ferah', 'Ferah', { gap: '18px' }]] },
 { id: 'boyut', t: 'Yazı boyutu', m: 0, o: [['küçük', 'Küçük (11px)', { fontSize: '11px' }], ['normal', 'Normal (13px)', { fontSize: '13px' }], ['büyük', 'Büyük (16px)', { fontSize: '16px' }], ['çok büyük', 'Çok büyük (20px)', { fontSize: '20px' }]] },
 { id: 'kalin', t: 'Yazı kalınlığı', m: 0, o: [['ince', 'İnce', { fontWeight: '400' }], ['orta', 'Orta', { fontWeight: '600' }], ['kalın', 'Kalın', { fontWeight: '800' }]] },
 { id: 'hiza', t: 'Yazı hizası', m: 0, o: [['sol', 'Sola', { textAlign: 'left' }], ['orta', 'Ortaya', { textAlign: 'center' }], ['sağ', 'Sağa', { textAlign: 'right' }]] },
 { id: 'zemin', t: 'Zemin rengi', m: 0, o: [['açık', 'Açık', { background: 'var(--surface)', color: 'var(--fg)' }, 'var(--surface)'], ['gri', 'Gri', { background: 'var(--surface2)', color: 'var(--fg)' }, 'var(--surface2)'], ['yumuşak vurgu', 'Yumuşak vurgu', { background: 'var(--accent-soft)', color: 'var(--fg)' }, 'var(--accent-soft)'], ['mavi', 'Bilgi mavisi', { background: 'var(--info-bg)', color: 'var(--fg)' }, 'var(--info-bg)'], ['yeşil', 'Başarı yeşili', { background: 'var(--ok-bg)', color: 'var(--fg)' }, 'var(--ok-bg)'], ['turuncu', 'Uyarı turuncusu', { background: 'var(--warn-bg)', color: 'var(--fg)' }, 'var(--warn-bg)'], ['kırmızı', 'Kritik kırmızı', { background: 'var(--crit-bg)', color: 'var(--fg)' }, 'var(--crit-bg)'], ['koyu', 'Koyu', { background: 'var(--fg)', color: 'var(--surface)' }, 'var(--fg)']] },
 { id: 'vurgu', t: 'Vurgu rengi (sol çizgi)', m: 0, o: [['ana', 'Ana', { borderLeft: '4px solid var(--accent)' }, 'var(--accent)'], ['mavi', 'Mavi', { borderLeft: '4px solid var(--info)' }, 'var(--info)'], ['yeşil', 'Yeşil', { borderLeft: '4px solid var(--ok)' }, 'var(--ok)'], ['turuncu', 'Turuncu', { borderLeft: '4px solid var(--warn)' }, 'var(--warn)'], ['kırmızı', 'Kırmızı', { borderLeft: '4px solid var(--crit)' }, 'var(--crit)'], ['gri', 'Gri', { borderLeft: '4px solid var(--muted)' }, 'var(--muted)']] },
 { id: 'kose', t: 'Köşe', m: 0, o: [['keskin', 'Keskin', { borderRadius: '0' }], ['yuvarlak', 'Yuvarlak (10px)', { borderRadius: '10px' }], ['hap', 'Hap (tam yuvarlak)', { borderRadius: '999px' }]] },
 { id: 'kenar', t: 'Kenarlık', m: 0, o: [['yok', 'Yok', { border: '0' }], ['ince', 'İnce', { border: '1px solid var(--line)' }], ['kalın', 'Kalın vurgulu', { border: '2px solid var(--accent)' }], ['kesikli', 'Kesikli', { border: '1px dashed var(--accent)' }]] },
 { id: 'golge', t: 'Gölge', m: 0, o: [['yok', 'Yok', { boxShadow: 'none' }], ['hafif', 'Hafif', { boxShadow: '0 1px 3px rgba(0,0,0,.18)' }], ['belirgin', 'Belirgin', { boxShadow: '0 8px 24px rgba(0,0,0,.28)' }]] },
 { id: 'sabit', t: 'Sabitleme', m: 0, o: [['üstte yapışkan', 'Kaydırırken üstte kalsın', { position: 'sticky', top: '0', zIndex: '5', background: 'var(--surface)' }], ['normal', 'Normal akış', { position: 'static' }]] },
 { id: 'hareket', t: 'Hareket (animasyon)', m: 0, o: [['yok', 'Yok', { transition: 'none' }], ['hafif', 'Hafif (0.15 sn)', { transition: 'all .15s' }], ['akıcı', 'Akıcı (0.3 sn)', { transition: 'all .3s' }]] },
 { id: 'davranis', t: 'Davranış (çoklu seçim)', m: 1, o: [['sürüklenebilir'], ['yeniden boyutlanır'], ['daraltılabilir'], ['basınca aynı yerde açılsın'], ['sayfa değiştirmesin'], ['üzerine gelince önizleme'], ['canlı hesap (anında güncellensin)'], ['aranabilir'], ['süzülebilir'], ['sıralanabilir'], ['geri al / ileri al'], ['klavyeyle kullanılabilir'], ['dışa aktarılabilir (CSV/takvim)'], ['yazdırılabilir']] },
 { id: 'veri', t: 'Veri gösterimi (çoklu seçim)', m: 1, o: [['sayı etiketi'], ['yüzde'], ['ilerleme çubuğu'], ['durum rozeti'], ['tarih aralığı'], ['ikon'], ['ipucu balonu']] }
];
window.PNSG = SG;
const SP = [
 ['Kompakt veri tablosu', { gorunum: 'Tablo', ic: 'sıkı', boyut: 'küçük', kenar: 'ince', kose: 'keskin', davranis: ['aranabilir', 'süzülebilir', 'sıralanabilir', 'basınca aynı yerde açılsın'] }],
 ['Ferah kart ızgarası', { gorunum: 'Kart', sutun: '3', ara: 'ferah', ic: 'ferah', kose: 'yuvarlak', golge: 'hafif', kenar: 'ince', davranis: ['basınca aynı yerde açılsın'] }],
 ['Operasyon panosu (kanban)', { gorunum: 'Pano (kanban)', ara: 'normal', kose: 'yuvarlak', vurgu: 'mavi', davranis: ['sürüklenebilir', 'basınca aynı yerde açılsın', 'canlı hesap (anında güncellensin)'], veri: ['sayı etiketi', 'durum rozeti'] }],
 ['Yan panelli çalışma alanı', { yan: 'sağda, daraltılabilir', davranis: ['yeniden boyutlanır', 'daraltılabilir', 'canlı hesap (anında güncellensin)'], hareket: 'hafif' }],
 ['Sunum modu (büyük, sade)', { boyut: 'büyük', ic: 'ferah', kenar: 'yok', golge: 'hafif', kose: 'yuvarlak', zemin: 'açık' }]
];
const STY = { s: {}, m: {}, prev: true, c: new Set() };
const ORIG = new WeakMap();
const gOpt = (g, v) => g.o.find(o => o[0] === v);
const styCss = () => { const c = {}; SG.forEach(g => { if (!g.m && STY.s[g.id]) { const o = gOpt(g, STY.s[g.id]); if (o && o[2]) Object.assign(c, o[2]); } }); return c; };
const cssText = c => Object.entries(c).map(([k, v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join('; ');
function styApply() {
  const el = LAST; if (!el || !document.contains(el)) return;
  if (!ORIG.has(el)) ORIG.set(el, el.getAttribute('style'));
  el.setAttribute('style', ORIG.get(el) || ''); if (!STY.prev) return;
  const c = styCss(); Object.entries(c).forEach(([k, v]) => { el.style[k] = v; });
}
function styReset() { const el = LAST; if (el && ORIG.has(el)) { const o = ORIG.get(el); if (o === null) el.removeAttribute('style'); else el.setAttribute('style', o); } STY.s = {}; STY.m = {}; styRender(); }
function styLines() {
  const P = []; SG.forEach(g => { if (g.m) { const a = STY.m[g.id] ? [...STY.m[g.id]] : []; if (a.length) P.push(g.t.replace(' (çoklu seçim)', '') + ' = ' + a.join(', ')); } else if (STY.s[g.id]) P.push(g.t + ' = ' + STY.s[g.id]); });
  const c = styCss(); return { fmt: P.join('\n   '), css: cssText(c) };
}
window.pnStyInfo = () => { const e = document.getElementById('pnsti'); if (e) e.textContent = LAST ? kindOf(LAST) + ' · “' + nameOf(LAST) + '”' : 'henüz bölge seçilmedi (🎯 Bölge seç veya 📋 Katalog)'; };
function styRender() {
  const b = document.getElementById('pnstybox'); if (!b || !b.dataset.open) return;
  const chip = (g, o) => { const on = g.m ? (STY.m[g.id] && STY.m[g.id].has(o[0])) : STY.s[g.id] === o[0]; const sw = o[3] ? `<i class="sws" style="background:${o[3]}"></i>` : (g.id === 'kose' ? `<i class="sws" style="background:var(--accent);border-radius:${o[2].borderRadius}"></i>` : ''); return `<button type="button" class="rc${on ? ' on' : ''}" data-sg="${g.id}" data-sv="${esc(o[0])}">${sw}${esc(o[1] || o[0])}</button>`; };
  const L = styLines();
  b.innerHTML = `<div class="pnsty"><p class="note" style="margin:8px 0 4px">Biçim kataloğu: önce sayfada bir bölge seç, sonra aşağıdan özelliklerini seç. Renk, köşe, boşluk, yazı, sütun gibi görsel seçimler sayfada hemen denenir (geçicidir). Davranışlar önizlenmez, isteğe yazılır. Bitince “İsteğe ekle”ye bas.</p>
  <div class="pnstr">Seçili bölge: <b id="pnsti"></b> <label class="note"><input type="checkbox" id="pnprev" ${STY.prev ? 'checked' : ''}> sayfada canlı dene</label></div>
  <div class="pnpre"><span class="note">Hazır paketler:</span>${SP.map((p, i) => `<button type="button" class="rc" data-spre="${i}">${esc(p[0])}</button>`).join('')}</div>
  ${SG.map(g => `<details class="wk" data-gid="${g.id}" ${STY.c.has(g.id) ? '' : 'open'}><summary><span>${esc(g.t)}</span><small>${g.m ? (STY.m[g.id] ? STY.m[g.id].size : 0) : (STY.s[g.id] ? 1 : 0)}</small></summary><div class="wkb pncl">${g.o.map(o => chip(g, o)).join('')}</div></details>`).join('')}
  <pre class="pnout" id="pnsto">${esc(L.fmt ? 'Biçim:\n   ' + L.fmt + (L.css ? '\nCSS önizleme: ' + L.css : '') : 'Henüz seçim yok.')}</pre>
  <p style="margin:6px 0 0;display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn" id="pnstadd">İsteğe ekle</button><button type="button" class="btn ghost" id="pnstrst">Sıfırla (sayfayı eski haline getir)</button></p></div>`;
  window.pnStyInfo();
}
function styToggle(gid, v) { const g = SG.find(x => x.id === gid); if (!g) return; if (g.m) { const S = STY.m[gid] = STY.m[gid] || new Set(); S.has(v) ? S.delete(v) : S.add(v); } else STY.s[gid] = STY.s[gid] === v ? undefined : v; styApply(); styRender(); }

document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.gid) { d.open ? STY.c.delete(d.dataset.gid) : STY.c.add(d.dataset.gid); } }, true);
document.addEventListener('input', e => { const t = e.target; if (t && t.id === 'pnta') wr(t.dataset.pnk, t.value); });
document.addEventListener('mouseover', e => { if (!PK || touch()) return; const el = e.target.closest && e.target.closest(CAND); if (!el || el.closest('#pnbox,#pnbar,#pnlab')) return; if (CH[0] !== el && !(LV > 0 && CH.includes(el))) target(el); });
document.addEventListener('keydown', e => { if (!PK) return; if (e.key === 'Escape') { stopPick(); msg('Seçim iptal'); } else if (e.key === 'ArrowUp') { e.preventDefault(); level(1); } else if (e.key === 'ArrowDown') { e.preventDefault(); level(-1); } else if (e.key === 'Enter') { e.preventDefault(); choose(); } });
window.addEventListener('scroll', () => { if (PK && TGT) bar(); }, { passive: true });
document.addEventListener('click', e => {
  const T = e.target; if (!T || !T.closest) return;
  if (T.closest('#pnbar')) { e.preventDefault(); e.stopPropagation(); const l = T.closest('[data-pnl]'); if (l) level(+l.dataset.pnl); else if (T.closest('[data-pnok]')) choose(); else if (T.closest('[data-pnx]')) { stopPick(); msg('Seçim iptal'); } return; }
  if (T.closest('#pnpick')) { e.preventDefault(); e.stopPropagation(); if (PK) { stopPick(); msg('Seçim iptal'); return; } PK = curKey(); document.body.classList.add('pnpick'); T.closest('#pnpick').textContent = '🎯 Seçim modu (Esc iptal)'; bar(); msg(touch() ? 'Bir yere dokun, ▲ ▼ ile büyüt/küçült, Seç’e bas.' : 'Üzerine gel; ↑ ↓ ile büyüt/küçült; tıkla.'); return; }
  if (PK) {
    if (T.closest('#pnbox')) return;
    e.preventDefault(); e.stopPropagation();
    const el = T.closest(CAND); if (!el) return;
    if (touch()) { target(el); return; }
    if (!TGT || CH[0] !== el) target(el); choose(); return;
  }
  const rg = T.closest('[data-pnr]'); if (rg) { const el = REG[+rg.dataset.pnr]; if (el && document.contains(el)) { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('pnflash'); setTimeout(() => el.classList.remove('pnflash'), 1600); addBlock(el); msg('Bölge eklendi: ' + kindOf(el)); } return; }
  const sg = T.closest('[data-sg]'); if (sg) { styToggle(sg.dataset.sg, sg.dataset.sv); return; }
  const sp = T.closest('[data-spre]'); if (sp) { const P = SP[+sp.dataset.spre][1]; STY.s = {}; STY.m = {}; Object.entries(P).forEach(([k, v]) => { const g = SG.find(x => x.id === k); if (g.m) STY.m[k] = new Set(v); else STY.s[k] = v; }); styApply(); styRender(); return; }
  if (T.id === 'pnprev') { STY.prev = T.checked; styApply(); return; }
  if (T.closest('#pnstrst')) { styReset(); msg('Sayfa eski haline getirildi'); return; }
  if (T.closest('#pnstadd')) { const L = styLines(); if (!L.fmt) { msg('Önce bir biçim seç'); return; } const box = document.getElementById('pnta'), v = box.value, i = v.lastIndexOf('İstek:'), head = i >= 0 ? v.slice(0, i) : v, tail = i >= 0 ? v.slice(i) : 'İstek: '; box.value = head + (head && !/\n$/.test(head) ? '\n' : '') + 'Biçim' + (LAST ? ' (' + kindOf(LAST) + ': ' + nameOf(LAST) + ')' : '') + ':\n   ' + L.fmt + (L.css ? '\nCSS önizleme: ' + L.css : '') + '\n\n' + tail; wr(box.dataset.pnk, box.value); msg('Biçim isteğe eklendi. İstek satırına açıklama yazabilirsin.'); return; }
  if (T.closest('#pnsty')) { const c = document.getElementById('pnstybox'); if (c.dataset.open) { c.dataset.open = ''; c.innerHTML = ''; } else { c.dataset.open = '1'; styRender(); } return; }
  if (T.closest('#pncat')) { const c = document.getElementById('pncatbox'); c.innerHTML = c.innerHTML ? '' : buildCat(); return; }
  if (T.closest('#pnadd')) {
    const box = document.getElementById('pnta'), key = box.dataset.pnk, v = box.value.trim(), m = v.match(/İstek:\s*([\s\S]*)$/), req = m ? m[1].trim() : v;
    if (!req) { msg('Önce “İstek:” satırına ne istediğini yaz'); return; }
    REQ['pn:' + key + ':' + Date.now()] = { t: 'SAYFA NOTU (' + key + ')', s: 'guncelle', l: 'Güncelle', n: v }; saveReq(); wr(key, ''); route(); setTimeout(() => msg('Eklendi ✓ Toplam talepler sayfasında da görünür'), 0); return;
  }
  if (T.closest('#pnclr')) { const box = document.getElementById('pnta'); box.value = ''; wr(box.dataset.pnk, ''); msg('Temizlendi'); return; }
  if (T.closest('#pncopy')) {
    const box = document.getElementById('pnta'), key = box.dataset.pnk; wr(key, box.value);
    const txt = orderText(key); if (!txt) { msg('Kopyalanacak istek yok'); return; }
    let out = document.getElementById('pnout'); if (!out) { out = document.createElement('textarea'); out.id = 'pnout'; out.readOnly = true; out.setAttribute('aria-label', 'Emir metni'); out.style.cssText = 'width:100%;min-height:150px;margin-top:8px;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:8px;font:12px ui-monospace,Menlo,monospace'; document.getElementById('pnbox').appendChild(out); }
    out.value = txt; out.select();
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => msg('Kopyalandı. Sohbete yapıştır.'), () => { try { document.execCommand('copy'); msg('Kopyalandı. Sohbete yapıştır.'); } catch (x) { msg('Metni seçip elle kopyala'); } });
    return;
  }
  const dl = T.closest('[data-pndel]'); if (dl) { delete REQ[dl.dataset.pndel]; saveReq(); route(); }
}, true);
})();
