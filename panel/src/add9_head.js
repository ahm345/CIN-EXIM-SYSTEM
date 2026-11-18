
/* ===================== v11: SAYFA TASARIMCISI (yeni menü + sayfa, şekillerle yerleşim) ===================== */
(function () {
const T = window.TAS;
const KEY = 'cin-pg';
let PG = (() => { try { return JSON.parse(localStorage.getItem(KEY) || '') || { menus: [], pages: [] }; } catch (e) { return { menus: [], pages: [] }; } })();
PG.menus = PG.menus || []; PG.pages = PG.pages || [];
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(PG)); } catch (e) {} };
/* yerleşimler: 12 sütunluk ızgarada [id, x, y, w, h] */
const LAY = [
 { id: 'tek', n: 'Tek bölüm', d: 'Tam genişlik', R: 1, a: [['a', 0, 0, 12, 1]] },
 { id: 'iki', n: 'İki eşit sütun', d: 'Yan yana', R: 1, a: [['a', 0, 0, 6, 1], ['b', 6, 0, 6, 1]] },
 { id: 'iki-yan', n: 'Geniş + sağ yan', d: 'Ana alan ve dar yan panel', R: 1, a: [['a', 0, 0, 8, 1], ['b', 8, 0, 4, 1]] },
 { id: 'yan-iki', n: 'Sol yan + geniş', d: 'Dar sol panel, ana alan', R: 1, a: [['a', 0, 0, 4, 1], ['b', 4, 0, 8, 1]] },
 { id: 'uc', n: 'Üç sütun', d: 'Yan yana üç alan', R: 1, a: [['a', 0, 0, 4, 1], ['b', 4, 0, 4, 1], ['c', 8, 0, 4, 1]] },
 { id: 'dort', n: 'Dört sütun', d: 'Pano gibi', R: 1, a: [['a', 0, 0, 3, 1], ['b', 3, 0, 3, 1], ['c', 6, 0, 3, 1], ['d', 9, 0, 3, 1]] },
 { id: 'ust-alt', n: 'Üst + alt', d: 'İki satır', R: 2, a: [['a', 0, 0, 12, 1], ['b', 0, 1, 12, 1]] },
 { id: 'ust-iki', n: 'Üst bant + iki sütun', d: 'Özet üstte, altta iki alan', R: 2, a: [['a', 0, 0, 12, 1], ['b', 0, 1, 6, 1], ['c', 6, 1, 6, 1]] },
 { id: 'ust-uc', n: 'Üst bant + üç sütun', d: 'Özet üstte, altta üç alan', R: 2, a: [['a', 0, 0, 12, 1], ['b', 0, 1, 4, 1], ['c', 4, 1, 4, 1], ['d', 8, 1, 4, 1]] },
 { id: 'ust-yan', n: 'Üst bant + geniş + yan', d: 'Stüdyo düzeni', R: 2, a: [['a', 0, 0, 12, 1], ['b', 0, 1, 8, 1], ['c', 8, 1, 4, 1]] },
 { id: 'izgara', n: '2 × 2 ızgara', d: 'Dört eşit kutu', R: 2, a: [['a', 0, 0, 6, 1], ['b', 6, 0, 6, 1], ['c', 0, 1, 6, 1], ['d', 6, 1, 6, 1]] },
 { id: 'ust-orta-alt', n: 'Üst + iki orta + alt', d: 'Üç katlı', R: 3, a: [['a', 0, 0, 12, 1], ['b', 0, 1, 6, 1], ['c', 6, 1, 6, 1], ['d', 0, 2, 12, 1]] }
];
const TY = [
 { id: 'tile', n: 'Özet kutucukları', d: 'Büyük sayılar' }, { id: 'table', n: 'Tablo', d: 'Satır ve sütun' }, { id: 'kanban', n: 'Pano', d: 'Sütunlarda kartlar' }, { id: 'gantt', n: 'Gantt', d: 'Tarih çubukları' },
 { id: 'list', n: 'Akordiyon liste', d: 'Basınca altta açılır' }, { id: 'text', n: 'Not / metin', d: 'Serbest yazı' }, { id: 'graph', n: 'Ağ grafı', d: 'Düğüm ve çizgiler' }, { id: 'menu', n: 'Menü / sayfa göm', d: 'Başka sayfayı buraya koy' }, { id: 'empty', n: 'Boş yer', d: 'Sonra doldurulur' }
];
const SRC = { tile: [['surec', 'Süreç adımı durumları'], ['demo', 'Seçili demo proje'], ['tablo', 'Bir Baserow tablosu']], table: [['surec', 'Süreç adımları'], ['demo', 'Demo proje adımları'], ['tablo', 'Bir Baserow tablosu (alanlar)']], kanban: [['surec', 'Süreç adımları (aşamaya göre)'], ['demo', 'Demo adımları (departmana göre)']], gantt: [['demo', 'Seçili demo proje']], list: [['firma', 'Firmalar'], ['adim', 'Süreç adımları'], ['tablo', 'Tablolar']], graph: [['hepsi', 'Tüm ilişkiler']] };

/* davranış, veri gösterimi, biçim: seçilebilir özellikler. ready=panelde hemen çalışır */
const BEH = [['daraltılabilir', 'Başlığa basınca bölüm kapanır/açılır', 1], ['aranabilir', 'Yazdıkça satırlar süzülür (arama kutusu)', 1], ['sıralanabilir', 'Tablo sütun başlığına basınca sıralanır', 1], ['dışa aktarılabilir', 'Tabloyu CSV olarak kopyalar', 1], ['sürüklenebilir', 'Kart/çubuk/satır tutulup taşınır'], ['yeniden boyutlanır', 'Kenardan çekilip genişlik değişir'], ['basınca aynı yerde açılsın', 'Satıra/karta basınca ayrıntı altta açılır'], ['sayfa değiştirmesin', 'Bağlantılar yeni sayfaya götürmez'], ['üzerine gelince önizleme', 'İmleç satırın üstüne gelince küçük özet kutusu çıkar', 1], ['canlı hesap (anında güncellensin)', 'Sayı değişince bağlı sayılar yenilenir'], ['satır içi düzenlenebilir', 'Hücreye basıp yazarsın (bu görünümde kalır, kaydedilmez)', 1], ['geri al / ileri al', 'Son değişiklik geri çevrilir'], ['klavyeyle kullanılabilir', 'Oklar, Enter, Esc ile gezilir'], ['yazdırılabilir', 'Yazdırma düzeni hazırlanır']];
const VER = [['sayı etiketi', 'Çubuk/kart üstünde sayı'], ['yüzde', '% olarak göster'], ['ilerleme çubuğu', 'Dolan çubuk'], ['durum rozeti', 'Renkli durum etiketi'], ['tarih aralığı', 'Başlangıç → bitiş'], ['ikon', 'Simge ekle'], ['ipucu balonu', 'Üstüne gelince açıklama']];
const STG = ['kose', 'kenar', 'golge', 'ic', 'zemin', 'vurgu', 'boyut', 'kalin'];
const sgOf = id => (window.PNSG || []).find(g => g.id === id);
const styOf = sty => { const c = {}; STG.forEach(id => { const g = sgOf(id); if (g && sty && sty[id]) { const o = g.o.find(x => x[0] === sty[id]); if (o && o[2]) Object.assign(c, o[2]); } }); return c; };
const cssStr = c => Object.entries(c).map(([k, v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join(';');
const PWID = [['', 'Tam (varsayılan)'], ['dar', 'Dar (640px)'], ['orta', 'Orta (960px)']];
const PGAP = [['sıkı', 'Sıkı', '6px'], ['normal', 'Normal', '12px'], ['ferah', 'Ferah', '22px']];

/* şekiller */
const ic = t => { const f = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"'; const m = { tile: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>', table: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14h18M9 4v16"/>', kanban: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="16" rx="1"/><rect x="16" y="4" width="5" height="16" rx="1"/><path d="M4.5 8h2M11 8h2M17.5 8h2M4.5 12h2M11 12h2"/>', gantt: '<path d="M3 6h8M7 11h10M12 16h8M3 3v18"/>', list: '<path d="M4 6h16M4 12h16M4 18h16"/><path d="M6 4l-2 2 2 2" />', text: '<path d="M4 6h16M4 11h16M4 16h10"/>', graph: '<circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M8 8l8-1.5M7 9l4 6M17 8l-4 7"/>', empty: '<rect x="3" y="4" width="18" height="16" rx="2" stroke-dasharray="3 3"/>' }; return `<svg viewBox="0 0 24 24" width="30" height="30" ${f} aria-hidden="true">${m[t] || ''}</svg>`; };
const lsvg = (L, hi, big, slots) => { const W = 132, H = 22 + L.R * 26, cw = W / 12; return `<svg viewBox="0 0 ${W} ${H}" class="lsv${big ? ' big' : ''}" role="img" aria-label="${esc(L.n)}">${L.a.map(([id, x, y, w, h]) => { const on = hi === id, tp = slots && slots[id] ? (TY.find(t => t.id === slots[id].type) || {}).n : ''; return `<g><rect x="${x * cw + 2}" y="${y * 26 + 3}" width="${w * cw - 4}" height="${h * 26 - 4}" rx="4" class="lr${on ? ' on' : ''}"/><text x="${(x + w / 2) * cw}" y="${y * 26 + 3 + (h * 26 - 4) / 2 + 4}" text-anchor="middle" class="lt${on ? ' on' : ''}">${id.toUpperCase()}${big && tp ? ' · ' + esc(tp) : ''}</text></g>`; }).join('')}</svg>`; };
/* sayfa çizimi (gerçek bileşenlerle) */
const tilesHtml = a => `<div class="tiles">${a.map(([v, l, c]) => `<div class="tile ${c || ''}"><b>${esc(String(v))}</b><span>${esc(l)}</span></div>`).join('')}</div>`;
const dp = () => T.cur() || { n: 'Örnek: ' + T.TPL[0].n, t: 0, start: new Date().toISOString().slice(0, 10), steps: T.mk(T.TPL[0]), ornek: 1 };
const tdN = n => TD.findIndex(t => t.n === n);
function slotBody(s) {
  const t = s.type, sr = s.src;
  if (t === 'tile') {
    if (sr === 'demo') { const p = dp(); const A = T.sched(p), F = T.flags(p); return T.tiles(p, A, F); }
    if (sr === 'tablo') { const i = tdN(s.tbl); if (i < 0) return '<p class="note">Tablo seçilmedi.</p>'; const d = TD[i]; return tilesHtml([[live[d.i] ?? d.r, 'satır'], [d.f, 'alan'], [d.l, 'ilişki'], [d.m, 'formül']]); }
    const st = IS2.steps, ok = st.filter(x => x.ok); return tilesHtml([[ok.filter(x => x.d === 'Tamam').length, 'tamam', 'ok'], [ok.filter(x => x.d === 'Devam Ediyor').length, 'devam ediyor'], [ok.filter(x => x.d === 'Bekliyor').length, 'bekliyor', 'warn'], [st.length - ok.length, 'sayılmıyor']]);
  }
  if (t === 'table') {
    if (sr === 'demo') { const p = dp(); const A = T.sched(p); return table([{ h: '#', f: r => r.i + 1 }, { h: 'Adım', f: r => esc(r.n) }, { h: 'Departman', f: r => esc(r.d) }, { h: 'Gün', n: 1, f: r => r.g }, { h: 'Tarih', f: r => T.dt(p.start, A[r.i].st).slice(5) + ' → ' + T.dt(p.start, A[r.i].e).slice(5) }], p.steps.map((q, i) => ({ ...q, i }))); }
    if (sr === 'tablo') { const f = IS2.forms.find(x => x.ad === s.tbl), i = tdN(s.tbl); if (i < 0) return '<p class="note">Tablo seçilmedi.</p>'; return `<p class="note" style="margin:0 0 6px">${esc(TD[i].p)} Satırlar canlı değil; alan listesi şemadan.</p>` + (f ? table([{ h: 'Alan', f: r => esc(r.n) }, { h: 'Tür', f: r => esc(r.t) }, { h: 'Seçenekler', f: r => esc((r.o || []).slice(0, 4).join(', ')) }], f.f) : `<p class="note">Bu tablo için alan listesi yok (${TD[i].f} alan).</p>`); }
    return table([{ h: '#', f: r => r.n }, { h: 'Adım', f: r => esc(r.ad) }, { h: 'Durum', f: r => pill(r.d) }, { h: 'Sorumlu', f: r => esc(r.r || '—') }, { h: 'Vade', f: r => esc(r.v || '—') }], IS2.steps.slice(0, 12)) + `<p class="note" style="margin:6px 0 0">İlk 12 adım gösteriliyor (toplam ${IS2.steps.length}). Tamamını göstermek, süzmek veya sayfalamak için emirde yaz.</p>`;
  }
  if (t === 'kanban') {
    if (sr === 'demo') { const p = dp(); return `<div class="kb">${T.DEPTS.map(d => { const l = p.steps.filter(q => q.d === d); return l.length ? `<div class="kbc"><div class="kbh"><b>${d}</b><span class="note">${l.length} adım</span></div>${l.map(q => `<div class="kbk ${q.x ? 'off' : q.v ? 'ok' : 'info'}">${esc(q.n)}</div>`).join('')}</div>` : ''; }).join('')}</div>`; }
    return `<div class="kb">${stages().map(g => `<div class="kbc"><div class="kbh"><b>${g.n}. ${esc(g.name)}</b><span class="note">${g.done}/${g.valid}</span></div>${g.steps.map(q => `<div class="kbk ${!q.ok ? 'off' : q.d === 'Tamam' ? 'ok' : q.d === 'Devam Ediyor' ? 'info' : ''}"><span class="mono">${q.n}</span> ${esc(q.ad.length > 60 ? q.ad.slice(0, 59) + '…' : q.ad)}</div>`).join('')}</div>`).join('')}</div>`;
  }
  if (t === 'gantt') { const p = dp(); return T.ganttD(p, T.sched(p), null); }
  if (t === 'list') {
    if (sr === 'adim') return IS2.steps.slice(0, 40).map(stepWk).join('');
    if (sr === 'tablo') return TD.filter((x, i) => IGR.some(g => g[1].includes(x.n))).slice(0, 40).map((x, i) => wk('pgt' + x.i, `<span>${esc(x.n)}</span><small>${live[x.i] ?? x.r} satır</small>`, `<p style="margin:2px 0">${esc(x.p)}</p><div class="why">${x.f} alan · ${x.l} ilişki · ${x.m} formül</div>`, false)).join('');
    return IS2.firms.map(f => wk('pgf' + f.id, `<span>${esc(f.ad)}</span><small>${esc(f.g)}</small>`, `${window.relBox ? window.relBox('f:' + f.id) : ''}`, false)).join('');
  }
  if (t === 'text') return `<p style="margin:0;white-space:pre-wrap">${esc(s.text || 'Metin boş. Tasarımcıda yazabilirsin.')}</p>`;
  if (t === 'graph') return `<p class="note" style="margin:0 0 6px">Bu bölüme ağ grafı yerleşecek. Gerçek graf Taraflar → Bağlantı grafı sayfasında; buraya taşınmasını istediğinde emir olarak yaz.</p><p style="margin:0"><button type="button" class="btn" data-goto="graf">Bağlantı grafını aç</button></p>`;
  return '<div class="pgempty">Boş yer</div>';
}
