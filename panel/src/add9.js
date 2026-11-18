
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
 { id: 'list', n: 'Akordiyon liste', d: 'Basınca altta açılır' }, { id: 'text', n: 'Not / metin', d: 'Serbest yazı' }, { id: 'graph', n: 'Ağ grafı', d: 'Düğüm ve çizgiler' }, { id: 'heat', n: 'Isı haritası', d: 'Renk yoğunluğu' }, { id: 'chart', n: 'Çubuk grafik', d: 'Sayıları çubukla göster' }, { id: 'timeline', n: 'Zaman çizgisi', d: 'Tarih sırasıyla olaylar' }, { id: 'swim', n: 'Şerit (swimlane)', d: 'Departman satırları' }, { id: 'menu', n: 'Menü / sayfa göm', d: 'Başka sayfayı buraya koy' }, { id: 'empty', n: 'Boş yer', d: 'Sonra doldurulur' }
];
const SRC = { tile: [['surec', 'Süreç adımı durumları'], ['demo', 'Seçili demo proje'], ['tablo', 'Bir Baserow tablosu']], table: [['surec', 'Süreç adımları'], ['demo', 'Demo proje adımları'], ['tablo', 'Bir Baserow tablosu (alanlar)']], kanban: [['surec', 'Süreç adımları (aşamaya göre)'], ['demo', 'Demo adımları (departmana göre)']], gantt: [['demo', 'Seçili demo proje']], list: [['firma', 'Firmalar'], ['adim', 'Süreç adımları'], ['tablo', 'Tablolar']], graph: [['hepsi', 'Tüm ilişkiler']], heat: [['demo', 'Departman × süre (demo/örnek)']], chart: [['demo', 'Departmana göre toplam gün (demo/örnek)']], timeline: [['demo', 'Demo/örnek adımlar tarih sırasıyla']], swim: [['demo', 'Departman şeritleri (demo/örnek)']] };
const pageList = () => SECS3.flatMap(sc => sc[2].filter(t => !['sayfa', 'sozluk'].includes(t[0])).map(t => [t[0], sc[1] + ' › ' + t[1]]));

/* davranış, veri gösterimi, biçim: seçilebilir özellikler. ready=panelde hemen çalışır */
const BEH = [['daraltılabilir', 'Başlığa basınca bölüm kapanır/açılır', 1], ['aranabilir', 'Yazdıkça satırlar süzülür (arama kutusu)', 1], ['sıralanabilir', 'Tablo sütun başlığına basınca sıralanır', 1], ['dışa aktarılabilir', 'Tabloyu CSV olarak kopyalar', 1], ['sürüklenebilir', 'Kart/çubuk/satır tutulup taşınır'], ['yeniden boyutlanır', 'Kenardan çekilip genişlik değişir'], ['basınca aynı yerde açılsın', 'Satıra/karta basınca ayrıntı altta açılır'], ['sayfa değiştirmesin', 'Bağlantılar yeni sayfaya götürmez'], ['üzerine gelince önizleme', 'İmleç satırın üstüne gelince küçük özet kutusu çıkar', 1], ['canlı hesap (anında güncellensin)', 'Sayı değişince bağlı sayılar yenilenir'], ['satır içi düzenlenebilir', 'Hücreye basıp yazarsın (bu görünümde kalır, kaydedilmez)', 1], ['geri al / ileri al', 'Son değişiklik geri çevrilir'], ['klavyeyle kullanılabilir', 'Oklar, Enter, Esc ile gezilir'], ['yazdırılabilir', 'Yazdırma düzeni hazırlanır']];
const VER = [['sayı etiketi', 'Çubuk/kart üstünde sayı'], ['yüzde', '% olarak göster'], ['ilerleme çubuğu', 'Dolan çubuk'], ['durum rozeti', 'Renkli durum etiketi'], ['tarih aralığı', 'Başlangıç → bitiş'], ['ikon', 'Simge ekle'], ['ipucu balonu', 'Üstüne gelince açıklama']];
const STG = ['kose', 'kenar', 'golge', 'ic', 'zemin', 'vurgu', 'boyut', 'kalin'];
const sgOf = id => (window.PNSG || []).find(g => g.id === id);
const styOf = sty => { const c = {}; STG.forEach(id => { const g = sgOf(id); if (g && sty && sty[id]) { const o = g.o.find(x => x[0] === sty[id]); if (o && o[2]) Object.assign(c, o[2]); } }); return c; };
const cssStr = c => Object.entries(c).map(([k, v]) => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + v).join(';');
const PWID = [['', 'Tam (varsayılan)'], ['dar', 'Dar (640px)'], ['orta', 'Orta (960px)']];
const PGAP = [['sıkı', 'Sıkı', '6px'], ['normal', 'Normal', '12px'], ['ferah', 'Ferah', '22px']];


/* özellik kataloğu: [id, ad, grup, geçerli türler, ne demek, bana nasıl söylenir, animasyon, panelde hazır mı] */
const AL = '*', FE = [
 ['ara', 'aranabilir', 'b', 'table list kanban timeline', 'Kutuya yazdıkça satırlar süzülür.', 'Bu listeye arama kutusu ekle.', 'search', 1],
 ['sirala', 'sıralanabilir', 'b', 'table', 'Sütun başlığına basınca A→Z / küçük→büyük dizilir.', 'Tablo sütunlarına göre sıralansın.', 'sort', 1],
 ['disa', 'dışa aktarılabilir', 'b', 'table', 'Tabloyu CSV olarak panoya kopyalar (Excel’e yapıştırılır).', 'Tabloyu CSV olarak dışa aktar.', 'copy', 1],
 ['daralt', 'daraltılabilir', 'b', AL, 'Başlığa basınca parça kapanır, tekrar basınca açılır.', 'Bu parça daraltılabilir olsun.', 'collapse', 1],
 ['onizle', 'üzerine gelince önizleme', 'b', 'table', 'İmleç satırın üstüne gelince küçük özet kutusu çıkar.', 'Satırın üstüne gelince özet göster.', 'hover', 1],
 ['duzenle', 'satır içi düzenleme', 'b', 'table', 'Hücreye basıp doğrudan yazarsın (bu görünümde kalır, kaydedilmez).', 'Hücreler yerinde düzenlensin.', 'edit', 1],
 ['yapis', 'yapışkan başlık', 'b', 'table', 'Aşağı kaydırırken tablo başlığı yukarıda sabit kalır.', 'Tablo başlık satırı sabit kalsın.', 'sticky', 1],
 ['surukle', 'sürükle-bırak', 'b', 'table list kanban gantt swim timeline', 'Kart/çubuk/satır tutulup başka yere bırakılır.', 'Öğeler sürükle-bırak ile taşınsın.', 'drag', 0],
 ['boyut', 'yeniden boyutlandırma', 'b', 'table kanban gantt chart heat swim', 'Kenardan tutup çekince genişlik/süre değişir.', 'Kenardan çekilince boyutu değişsin.', 'resize', 0],
 ['bolme', 'bölme çubuğu (splitter)', 'b', AL, 'İki alanın arasındaki tutamaç; çekince alanların oranı değişir.', 'Bu iki alan arasına sürüklenebilir ayırıcı koy.', 'resize', 0],
 ['yan', 'yan panel (sidebar)', 'b', AL, 'Kenardan açılıp kapanan ayrıntı paneli.', 'Basınca sağdan ayrıntı paneli açılsın.', 'side', 0],
 ['ayni', 'aynı yerde açılsın', 'b', 'list kanban graph table', 'Basınca başka sayfaya gitmez, altında açılır.', 'Basınca sayfa değiştirmesin, aynı yerde açılsın.', 'collapse', 0],
 ['genis', 'genişleyen satır', 'b', 'table', 'Satıra basınca altında ayrıntı satırı açılır.', 'Satıra basınca altında ayrıntı açılsın.', 'collapse', 0],
 ['canli', 'canlı hesap', 'b', 'tile table gantt chart heat', 'Bir sayı değişince bağlı toplamlar anında yenilenir.', 'Değişince toplamlar anında hesaplansın.', 'count', 0],
 ['zoom', 'yakınlaştır / kaydır', 'b', 'graph gantt timeline chart', 'Fare/parmakla büyütüp küçültür, sürükleyip kaydırır.', 'Yakınlaştırma ve kaydırma ekle.', 'zoom', 0],
 ['geri', 'geri al / ileri al', 'b', 'table kanban gantt swim', 'Yaptığın son değişikliği geri çevirir.', 'Geri al / ileri al düğmeleri ekle.', 'undo', 0],
 ['klavye', 'klavye kısayolu', 'b', AL, 'Oklar, Enter, Esc ile gezilir; kısayol tuşları çalışır.', 'Klavyeyle kullanılabilsin.', 'pulse', 0],
 ['sekme', 'sekmeye çevir', 'b', 'list kanban menu', 'Bölümler sekme düğmeleriyle aynı alanda değişir.', 'Bunları sekmeye çevir.', 'tab', 0],
 ['yazdir', 'yazdırma düzeni', 'b', AL, 'Yazdırınca temiz, sayfaya sığan düzen verir.', 'Yazdırma düzenini hazırla.', 'copy', 0],
 ['say', 'sayı etiketi', 'v', 'tile gantt kanban chart swim heat', 'Çubuğun/kartın üstünde sayı yazar.', 'Çubuk ve kartlarda sayı etiketi göster.', 'count', 0],
 ['yuz', 'yüzde', 'v', 'tile gantt chart kanban', 'Değeri % olarak gösterir.', 'Değerleri yüzde olarak göster.', 'count', 0],
 ['ilerle', 'ilerleme çubuğu', 'v', 'tile gantt table list kanban', 'Ne kadarı tamam olduğunu dolan çubukla gösterir.', 'İlerleme çubuğu ekle.', 'count', 0],
 ['rozet', 'durum rozeti', 'v', 'table list kanban timeline swim', 'Durum renkli küçük etiketle görünür (Tamam, Bekliyor…).', 'Durumlar renkli rozetle gösterilsin.', 'pulse', 0],
 ['tarih', 'tarih aralığı', 'v', 'gantt table timeline swim', 'Başlangıç → bitiş tarihi yazılır.', 'Başlangıç-bitiş tarihini göster.', 'pulse', 0],
 ['ikon', 'ikon', 'v', AL, 'Başlığa/öğeye küçük simge ekler.', 'Bölüm başlıklarına ikon ekle.', 'pulse', 0],
 ['ipucu', 'ipucu balonu (tooltip)', 'v', AL, 'Üstüne gelince kısa açıklama balonu çıkar.', 'Üstüne gelince açıklama balonu çıksın.', 'hover', 0],
 ['cip', 'çip (etiket)', 'v', 'list kanban swim timeline', 'Departman/paket gibi etiketler küçük hap şeklinde dizilir.', 'Etiketleri çip olarak göster.', 'pulse', 0],
 ['kartg', 'kart görünümü', 'v', 'list table timeline', 'Satırlar yerine gölgeli kartlar.', 'Satırları kart olarak göster.', 'tab', 0],
 ['grup', 'gruplama', 'v', 'table list', 'Satırlar bir alana göre başlıklar altında toplanır.', 'Departmana göre grupla.', 'side', 0],
 ['pivot', 'pivot / matris', 'v', 'table heat', 'Satır × sütun kesişiminde sayı/özet gösterir.', 'Pivot (matris) göster.', 'sort', 0],
 ['isi', 'ısı renklendirmesi', 'v', 'table heat chart gantt', 'Büyük değer koyu, küçük değer açık renkle boyanır.', 'Değerleri ısı renkleriyle boya.', 'count', 0],
 ['modal', 'ayrıntı penceresi (modal)', 'v', 'table list kanban gantt', 'Basınca ortada açılan pencere; kapatana kadar arkası kilitli.', 'Basınca ayrıntı penceresi açılsın.', 'hover', 0],
 ['acilir', 'açılır liste (dropdown)', 'v', 'table kanban', 'Hücrede ok ile açılan seçenek listesi.', 'Bu alan açılır listeden seçilsin.', 'tab', 0],
 ['anahtar', 'anahtar / onay kutusu', 'v', 'table list kanban', 'Aç/kapa anahtarı veya işaret kutusu.', 'Satıra onay kutusu ekle.', 'tab', 0],
 ['sabit', 'sabit çizgi (bugün/hedef)', 'v', 'gantt chart timeline', 'Bugünü veya hedefi gösteren dikey/yatay çizgi.', 'Bugünü gösteren çizgi ekle.', 'sticky', 0],
 ['yerel', 'yerel kayıt (tarayıcı)', 'd', AL, 'Seçimler bu tarayıcıda hatırlanır (başka cihazda yok).', 'Ayarlarımı tarayıcıda hatırla.', 'pulse', 0],
 ['bread', 'Baserow okuma', 'd', 'table list kanban gantt tile chart heat timeline swim graph', 'Gerçek Baserow satırlarını canlı çeker.', 'Bu parça gerçek Baserow verisini göstersin.', 'copy', 0],
 ['bwrite', 'Baserow yazma (onaylı)', 'd', 'table list kanban', 'Panelden Baserow’a satır yazar; her seferinde onay sorar.', 'Buradan Baserow’a onaylı kayıt yazılsın.', 'copy', 0],
 ['dogr', 'doğrulama (validation)', 'd', 'table kanban', 'Hatalı/eksik girişi kaydetmeden uyarır.', 'Girişleri doğrula, eksikse uyar.', 'pulse', 0],
 ['paylas', 'paylaşılan veri', 'd', AL, 'Birden fazla kişi aynı veriyi görür (sunucu gerektirir).', 'Veri herkesle paylaşılsın.', 'side', 0]
];
const feOf = id => FE.find(f => f[0] === id), feFor = ty => FE.filter(f => f[3] === AL || f[3].split(' ').includes(ty));
const hasF = (it, id) => (it.f || []).includes(id);
const anim = k => `<span class="an an-${k}" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i></span>`;

/* şekiller */
const ic = t => { const f = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"'; const m = { tile: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>', table: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14h18M9 4v16"/>', kanban: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="16" rx="1"/><rect x="16" y="4" width="5" height="16" rx="1"/><path d="M4.5 8h2M11 8h2M17.5 8h2M4.5 12h2M11 12h2"/>', gantt: '<path d="M3 6h8M7 11h10M12 16h8M3 3v18"/>', list: '<path d="M4 6h16M4 12h16M4 18h16"/><path d="M6 4l-2 2 2 2" />', text: '<path d="M4 6h16M4 11h16M4 16h10"/>', graph: '<circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M8 8l8-1.5M7 9l4 6M17 8l-4 7"/>', heat: '<rect x="3" y="3" width="5" height="5"/><rect x="10" y="3" width="5" height="5" fill="currentColor"/><rect x="17" y="3" width="4" height="5"/><rect x="3" y="10" width="5" height="5" fill="currentColor"/><rect x="10" y="10" width="5" height="5"/><rect x="17" y="10" width="4" height="5" fill="currentColor"/>', chart: '<path d="M4 20V4M4 20h16"/><rect x="7" y="11" width="3" height="9"/><rect x="12" y="6" width="3" height="14"/><rect x="17" y="13" width="3" height="7"/>', timeline: '<path d="M6 3v18"/><circle cx="6" cy="7" r="2"/><circle cx="6" cy="17" r="2"/><path d="M11 7h9M11 17h7"/>', swim: '<path d="M3 7h18M3 12h18M3 17h18"/><rect x="6" y="5" width="6" height="4"/><rect x="11" y="10" width="7" height="4"/><rect x="8" y="15" width="5" height="4"/>', menu: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>', empty: '<rect x="3" y="4" width="18" height="16" rx="2" stroke-dasharray="3 3"/>' }; return `<svg viewBox="0 0 24 24" width="30" height="30" ${f} aria-hidden="true">${m[t] || ''}</svg>`; };
const lsvg = (L, hi, big, slots) => { const W = 132, H = 22 + L.R * 26, cw = W / 12; return `<svg viewBox="0 0 ${W} ${H}" class="lsv${big ? ' big' : ''}" role="img" aria-label="${esc(L.n)}">${L.a.map(([id, x, y, w, h]) => { const on = hi === id, tp = slots && slots[id] ? (TY.find(t => t.id === slots[id].type) || {}).n : ''; return `<g><rect x="${x * cw + 2}" y="${y * 26 + 3}" width="${w * cw - 4}" height="${h * 26 - 4}" rx="4" class="lr${on ? ' on' : ''}"/><text x="${(x + w / 2) * cw}" y="${y * 26 + 3 + (h * 26 - 4) / 2 + 4}" text-anchor="middle" class="lt${on ? ' on' : ''}">${id.toUpperCase()}${big && tp ? ' · ' + esc(tp) : ''}</text></g>`; }).join('')}</svg>`; };
/* sayfa çizimi (gerçek bileşenlerle) */
const tilesHtml = a => `<div class="tiles">${a.map(([v, l, c]) => `<div class="tile ${c || ''}"><b>${esc(String(v))}</b><span>${esc(l)}</span></div>`).join('')}</div>`;
const dp = () => T.cur() || { n: 'Örnek: ' + T.TPL[0].n, t: 0, start: new Date().toISOString().slice(0, 10), steps: T.mk(T.TPL[0]), ornek: 1 };
let EMB = 0;
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
  if (t === 'gantt') { const p = dp(); return (p.ornek ? '<p class="note" style="margin:0 0 6px">Örnek veri: seçili demo proje yok. Tasarla → Tasarım’dan demo açarsan onun verisi görünür.</p>' : '') + T.ganttD(p, T.sched(p), null); }
  if (t === 'list') {
    if (sr === 'adim') return IS2.steps.slice(0, 40).map(stepWk).join('');
    if (sr === 'tablo') return TD.filter((x, i) => IGR.some(g => g[1].includes(x.n))).slice(0, 40).map((x, i) => wk('pgt' + x.i, `<span>${esc(x.n)}</span><small>${live[x.i] ?? x.r} satır</small>`, `<p style="margin:2px 0">${esc(x.p)}</p><div class="why">${x.f} alan · ${x.l} ilişki · ${x.m} formül</div>`, false)).join('');
    return IS2.firms.map(f => wk('pgf' + f.id, `<span>${esc(f.ad)}</span><small>${esc(f.g)}</small>`, `${window.relBox ? window.relBox('f:' + f.id) : ''}`, false)).join('');
  }
  if (t === 'heat' || t === 'chart' || t === 'timeline' || t === 'swim') {
    const p = dp(), A = T.sched(p), on = p.steps.map((q, i) => ({ ...q, i })).filter(q => !q.x), pre = p.ornek ? '<p class="note" style="margin:0 0 6px">Örnek veri: seçili demo proje yok.</p>' : '';
    const dep = T.DEPTS.filter(d => on.some(q => q.d === d));
    if (t === 'heat') { const B = [[1, 3, '1–3 gün'], [4, 7, '4–7 gün'], [8, 14, '8–14 gün'], [15, 999, '15+ gün']], mx = Math.max(1, ...dep.flatMap(d => B.map(b => on.filter(q => q.d === d && q.g >= b[0] && q.g <= b[1]).length))); return pre + `<div class="sct"><table class="heat"><thead><tr><th>Departman</th>${B.map(b => `<th>${b[2]}</th>`).join('')}</tr></thead><tbody>${dep.map(d => `<tr><td>${esc(d)}</td>${B.map(b => { const n = on.filter(q => q.d === d && q.g >= b[0] && q.g <= b[1]).length; return `<td style="background:color-mix(in srgb,var(--accent) ${Math.round(n / mx * 85)}%,transparent)">${n || ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div><p class="note" style="margin:6px 0 0">Hücre = o departmandaki adım sayısı; koyu = çok.</p>`; }
    if (t === 'chart') { const v = dep.map(d => [d, on.filter(q => q.d === d).reduce((a, q) => a + q.g, 0)]), mx = Math.max(1, ...v.map(x => x[1])); return pre + `<svg viewBox="0 0 320 ${v.length * 24 + 8}" class="bch" role="img" aria-label="Departmana göre toplam gün">${v.map((x, i) => `<text x="0" y="${i * 24 + 16}" class="bt">${esc(x[0])}</text><rect x="110" y="${i * 24 + 4}" width="${Math.max(2, x[1] / mx * 170)}" height="16" rx="3" class="bb"/><text x="${116 + x[1] / mx * 170}" y="${i * 24 + 16}" class="bt">${x[1]} g</text>`).join('')}</svg>`; }
    if (t === 'timeline') return pre + `<ol class="tl">${on.slice(0, 14).map(q => `<li><b>${T.dt(p.start, A[q.i].st).slice(5)}</b> <span>${esc(q.n)}</span> <small class="note">${esc(q.d)} · ${q.g} gün</small></li>`).join('')}</ol>${on.length > 14 ? `<p class="note">İlk 14 adım (toplam ${on.length}).</p>` : ''}`;
    return pre + `<div class="swim">${dep.map(d => `<div class="swr"><b>${esc(d)}</b><div>${on.filter(q => q.d === d).map(q => `<span class="swc">${esc(q.n.length > 28 ? q.n.slice(0, 27) + '…' : q.n)}</span>`).join('')}</div></div>`).join('')}</div>`;
  }
  if (t === 'menu') { const v = views[sr]; if (!sr || !v) return '<p class="note">Gömülecek menü/sayfa seçilmedi.</p>'; if (EMB > 2) return '<p class="note">İç içe çok derin; gömme durduruldu.</p>'; EMB++; try { return `<div class="emb">${v()}</div>`; } catch (x) { return '<p class="note">Bu sayfa gömülemedi: ' + esc(x.message) + '</p>'; } finally { EMB--; } }
  if (t === 'text') return `<p style="margin:0;white-space:pre-wrap">${esc(s.text || 'Metin boş. Tasarımcıda yazabilirsin.')}</p>`;
  if (t === 'graph') return `<p class="note" style="margin:0 0 6px">Bu bölüme ağ grafı yerleşecek. Gerçek graf Taraflar → Bağlantı grafı sayfasında; buraya taşınmasını istediğinde emir olarak yaz.</p><p style="margin:0"><button type="button" class="btn" data-goto="graf">Bağlantı grafını aç</button></p>`;
  return '<div class="pgempty">Boş yer</div>';
}

/* parça (item) çizimi: bir bölümde birden fazla parça alt alta durur */
const newItem = ty => ({ type: ty || 'empty', src: (SRC[ty] || [])[0] ? SRC[ty][0][0] : '', tbl: '', title: '', text: '', col: false, f: [], sty: {} });
const normSlot = r => { r = r || {}; if (!Array.isArray(r.items)) { const it = r.type && r.type !== 'empty' ? [Object.assign(newItem(r.type), r)] : []; r = { items: it }; } r.items.forEach(x => { x.sty = x.sty || {}; if (!x.f) { x.f = []; (x.beh || []).concat(x.veri || []).forEach(nm => { const f = FE.find(q => q[1] === nm || nm.startsWith(q[1])); if (f && !x.f.includes(f[0])) x.f.push(f[0]); }); if (x.col && !x.f.includes('daralt')) x.f.push('daralt'); } }); return r; };
const itemHtml = s => {
  const ttl = s.title || (TY.find(t => t.id === s.type) || {}).n || '', css = cssStr(styOf(s.sty)), st = css ? ` style="${esc(css)}"` : '';
  const tools = [];
  if (hasF(s, 'ara') && ['table', 'list', 'kanban', 'timeline'].includes(s.type)) tools.push(`<input type="search" class="pgf" data-pgf="1" placeholder="Bu parçada ara…" aria-label="Parçada ara">`);
  if (hasF(s, 'disa') && s.type === 'table') tools.push(`<button type="button" class="btn ghost" data-pgcsv="1">CSV kopyala</button>`);
  const cls = [['sirala', 'pgsort'], ['onizle', 'pgprev'], ['duzenle', 'pgedit'], ['yapis', 'pgstick']].filter(c => hasF(s, c[0])).map(c => c[1]).join(' ');
  const body = (tools.length ? `<div class="gtools">${tools.join('')}</div>` : '') + `<div class="${cls}">${slotBody(s)}</div>`;
  const wait = (s.f || []).map(feOf).filter(f => f && !f[7]).map(f => f[1]);
  const note = wait.length ? `<p class="note pgw">Emirle gelecek: ${esc(wait.join(', '))}</p>` : '';
  return hasF(s, 'daralt') ? `<details class="panel pgs" open${st}><summary class="pgsum"><b>${esc(ttl)}</b></summary>${body}${note}</details>` : `<section class="panel pgs"${st}>${ttl ? `<h2>${esc(ttl)}</h2>` : ''}${body}${note}</section>`;
};
const slotHtml = (r, nm) => { r = normSlot(r); return r.items.length ? `<div class="pgstack">${r.items.map(itemHtml).join('')}</div>` : '<div class="pgempty">Boş yer</div>'; };
function pageHtml(pg) {
  const L = LAY.find(l => l.id === pg.layout) || LAY[0];
  const gap = (PGAP.find(x => x[0] === pg.gap) || PGAP[1])[2], mw = pg.pw === 'dar' ? '640px' : pg.pw === 'orta' ? '960px' : 'none';
  return `<div class="pgrid" style="gap:${gap};max-width:${mw};--pgap:${gap}">${L.a.map(([id, x, y, w, h]) => `<div style="grid-column:${x + 1}/span ${w};grid-row:${y + 1}/span ${h}">${slotHtml((pg.slots || {})[id], id.toUpperCase())}</div>`).join('')}</div>`;
}
function applyPages() {
  for (let i = SECS3.length - 1; i >= 0; i--) { const s = SECS3[i]; if (s.u) { SECS3.splice(i, 1); continue; } s[2] = s[2].filter(t => !/^pg_/.test(t[0])); }
  const hi = SECS3.findIndex(s => s[0] === 'hatirla');
  PG.menus.forEach(m => { const sec = Object.assign([m.id, m.name, []], { u: true }); SECS3.splice(hi >= 0 ? hi : SECS3.length, 0, sec); });
  PG.pages.forEach(pg => { views[pg.id] = () => pageHtml(pg); const sec = SECS3.find(s => s[0] === pg.menu); if (sec) sec[2].push([pg.id, pg.name]); else { const o = SECS3.find(s => s[0] === 'is'); if (o) o[2].push([pg.id, pg.name]); } });
}
applyPages();
/* tasarımcı durumu */
const STEPS = ['Menü', 'Sayfa adı', 'Yerleşim', 'Parçalar', 'Özellikler', 'Sayfa geneli', 'Önizleme ve kaydet'];
const blank = () => ({ step: 1, menu: 'is', newMenu: '', name: '', layout: 'iki-yan', slots: {}, extra: '', editing: null, real: false, pw: '', gap: 'normal' });
let DS = blank();
const slot = id => DS.slots[id] = normSlot(DS.slots[id]);
const menuName = id => { const s = SECS3.find(x => x[0] === id); return s ? s[1] : id; };
const itName = it => { const ty = TY.find(t => t.id === it.type), so = (SRC[it.type] || []).find(z => z[0] === it.src); let sn = so ? so[1] : ''; if (it.type === 'menu') { const p = pageList().find(z => z[0] === it.src); sn = p ? p[1] : ''; } return ty.n + (sn ? ' · ' + sn : '') + (it.src === 'tablo' && it.tbl ? ' “' + it.tbl + '”' : ''); };
function specText() {
  const L = LAY.find(l => l.id === DS.layout), mn = DS.menu === 'new' ? 'YENİ MENÜ “' + (DS.newMenu || '?') + '”' : 'mevcut menü “' + menuName(DS.menu) + '”';
  return `YENİ SAYFA EMRİ · ${mn} · sayfa adı: “${DS.name || '?'}” · yerleşim: ${L.n} (alanlar: ${L.a.map(a => a[0].toUpperCase()).join(', ')})\n` + L.a.map(([id, x, y, w, h]) => { const r = slot(id); return `  ${id.toUpperCase()} (satır ${y + 1}, sütun ${x + 1}–${x + w}): ` + (r.items.length ? r.items.length + ' parça, yukarıdan aşağıya:' : 'boş') + r.items.map((s, k) => `\n    ${k + 1}) ${itName(s)}${s.title ? ' · başlık: ' + s.title : ''}${s.type === 'text' && s.text ? ' · metin: ' + s.text.slice(0, 80) : ''}${s.f.length ? '\n        istenen özellikler: ' + s.f.map(feOf).filter(Boolean).map(f => f[1] + (f[7] ? ' (panelde hazır)' : ' (kodlanacak: “' + f[5] + '”)')).join('; ') : ''}${Object.keys(s.sty).filter(q => s.sty[q]).length ? '\n        biçim: ' + Object.keys(s.sty).filter(q => s.sty[q]).map(q => ((sgOf(q) || {}).t || q) + '=' + s.sty[q]).join(', ') : ''}`).join(''); }).join('\n') + '\nSayfa geneli: genişlik=' + (DS.pw || 'tam') + ', parça boşluğu=' + DS.gap + (DS.extra ? '\nEk istekler: ' + DS.extra : '') + '\nNot: Panel bu sayfayı şimdi örnek/anlık veriyle çiziyor. Süzme, sürükleme, canlı Baserow bağlantısı gibi davranışları yukarıya yazarsan ben kodlarım.';
}
const chipBtn = (on, data, label, tip, ready) => `<button type="button" class="rc${on ? ' on' : ''}" ${data} title="${esc(tip || '')}">${ready ? '✓ ' : ''}${esc(label)}</button>`;
const stepBody = {
  1: () => `<h2>1. Menü</h2><p class="note" style="margin:0 0 6px">Sayfa hangi menünün altında görünsün?</p><div class="gtools">${SECS3.map(s => [s[0], s[1]]).map(m => chipBtn(DS.menu === m[0], `data-pgm="${m[0]}"`, m[1])).join('')}${chipBtn(DS.menu === 'new', 'data-pgm="new"', '＋ Yeni menü')}</div>${DS.menu === 'new' ? `<label class="note">Yeni menünün adı <input id="pgnm" value="${esc(DS.newMenu)}" placeholder="ör. Buğday projesi" aria-label="Yeni menü adı"></label>` : `<p class="note" style="margin:4px 0 0">Sayfa “${esc(menuName(DS.menu))}” menüsüne eklenecek.</p>`}`,
  2: () => `<h2>2. Sayfa adı</h2><label class="note"><input id="pgn" value="${esc(DS.name)}" placeholder="ör. Satış sözleşmeleri" aria-label="Sayfa adı" style="min-width:260px"></label>`,
  3: () => `<h2>3. Yerleşim</h2><p class="note" style="margin:0 0 8px">Şekle bak, harfler bölümlerdir (A, B, C…). Her bölüme sonraki adımda birden fazla parça koyabilirsin. Telefonda bölümler alt alta dizilir.</p><div class="lyg">${LAY.map(l => `<button type="button" class="lyc${DS.layout === l.id ? ' on' : ''}" data-pgl="${l.id}">${lsvg(l)}<b>${esc(l.n)}</b><span class="note">${esc(l.d)}</span></button>`).join('')}</div>`,
  4: () => { const L = LAY.find(l => l.id === DS.layout); return `<h2>4. Parçalar</h2><p class="note" style="margin:0 0 6px">Her bölüme istediğin kadar parça ekle (Gantt, liste, tablo, başka bir menü…). Parçalar bölümde yukarıdan aşağıya dizilir; ↑ ↓ ile sırasını değiştir, “Taşı” ile başka bölüme gönder.</p>${L.a.map(([id]) => { const r = slot(id); return `<div class="slc"><div class="slh">${lsvg(L, id)}<div><b>Bölüm ${id.toUpperCase()}</b><span class="note"> · ${r.items.length} parça</span></div></div>${r.items.map((it, k) => `<div class="pgit"><div class="pgih">${ic(it.type)}<b>${k + 1}. ${esc(itName(it))}</b><span class="pgacts"><button type="button" class="btn ghost" data-pga="up:${id}:${k}" aria-label="Yukarı"${k === 0 ? ' disabled' : ''}>↑</button><button type="button" class="btn ghost" data-pga="dn:${id}:${k}" aria-label="Aşağı"${k === r.items.length - 1 ? ' disabled' : ''}>↓</button><select data-pgmv="${id}:${k}" aria-label="Başka bölüme taşı"><option value="">Taşı…</option>${L.a.filter(z => z[0] !== id).map(z => `<option value="${z[0]}">${z[0].toUpperCase()} bölümüne</option>`).join('')}</select><button type="button" class="btn ghost" data-pga="del:${id}:${k}">Sil</button></span></div><div class="sf2">${SRC[it.type] ? `<label class="note">Veri kaynağı <select data-pgs="${id}:${k}:src" aria-label="Veri kaynağı"><option value="">Seç…</option>${SRC[it.type].map(o => `<option value="${o[0]}"${it.src === o[0] ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>` : ''}${it.type === 'menu' ? `<label class="note">Gömülecek sayfa <select data-pgs="${id}:${k}:src" aria-label="Gömülecek sayfa"><option value="">Seç…</option>${pageList().map(o => `<option value="${o[0]}"${it.src === o[0] ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>` : ''}${it.src === 'tablo' ? `<label class="note">Tablo <select data-pgs="${id}:${k}:tbl" aria-label="Tablo"><option value="">Seç…</option>${TD.map(x => `<option${it.tbl === x.n ? ' selected' : ''}>${esc(x.n)}</option>`).join('')}</select></label>` : ''}<label class="note">Başlık <input data-pgi="${id}:${k}:title" value="${esc(it.title)}" placeholder="parça başlığı" aria-label="Parça başlığı"></label></div>${it.type === 'text' ? `<textarea data-pgi="${id}:${k}:text" aria-label="Metin" class="pgta">${esc(it.text)}</textarea>` : ''}</div>`).join('')}<details class="wk"${r.items.length ? '' : ' open'}><summary><span>＋ ${id.toUpperCase()} bölümüne parça ekle</span></summary><div class="tyg">${TY.filter(t => t.id !== 'empty').map(t => `<button type="button" class="tyc" data-pga="add:${id}:${t.id}">${ic(t.id)}<b>${esc(t.n)}</b><span class="note">${esc(t.d)}</span></button>`).join('')}</div></details></div>`; }).join('')}`; },
  5: () => {
    const L = LAY.find(l => l.id === DS.layout), all = L.a.flatMap(([id]) => slot(id).items.map((it, k) => [id, k, it]));
    if (!all.length) return '<h2>5. Özellikler</h2><p class="note">Önce 4. adımda parça ekle.</p>';
    if (!all.some(x => x[0] + ':' + x[1] === DS.pi)) DS.pi = all[0][0] + ':' + all[0][1];
    const [id, k, it] = all.find(x => x[0] + ':' + x[1] === DS.pi), G3 = [['b', 'Nasıl davransın?'], ['v', 'Ne ve nasıl göstersin?'], ['d', 'Veri ve kayıt']], fl = feFor(it.type);
    return `<h2>5. Özellikler</h2><p class="note" style="margin:0 0 8px">Önce ayarlayacağın parçayı seç. Altında yalnız bu parçaya uyan özellikler çıkar; her birinin hareketli örneği var: kutuya bak, ne olacağını gör, beğendiysen bas. <b>Hemen</b> yazılılar panelde şimdi çalışır; diğerleri emire yazılır, ben kodlarım.</p>
    <div class="gtools">${all.map(([i2, k2, x]) => `<button type="button" class="rc${i2 + ':' + k2 === DS.pi ? ' on' : ''}" data-pgp="${i2}:${k2}">${i2.toUpperCase()}${k2 + 1}. ${esc((TY.find(t => t.id === x.type) || {}).n)}${x.f.length ? ` (${x.f.length})` : ''}</button>`).join('')}</div>
    <div class="slc"><b>${id.toUpperCase()}${k + 1}. ${esc(itName(it))}</b>${G3.map(([g, t]) => { const l = fl.filter(f => f[2] === g); return l.length ? `<h3 class="pgh">${t}</h3><div class="fcg">${l.map(f => `<button type="button" class="fc${it.f.includes(f[0]) ? ' on' : ''}" data-pgk="${id}|${k}|${f[0]}" title="Söyleniş: ${esc(f[5])}">${anim(f[6])}<b>${esc(f[1])}</b><span class="note">${esc(f[4])}</span><em class="${f[7] ? 'rd' : 'wt'}">${f[7] ? 'hemen çalışır' : 'emirle'}</em></button>`).join('')}</div>` : ''; }).join('')}
    <h3 class="pgh">Nasıl görünsün?</h3>${['kose', 'kenar', 'golge', 'ic', 'zemin', 'vurgu', 'boyut', 'kalin'].map(gid => { const g = sgOf(gid); return g ? `<div class="pgy"><span class="note">${esc(g.t)}</span><div class="pncl">${g.o.map(o => `<button type="button" class="rc${it.sty[gid] === o[0] ? ' on' : ''}" data-pgy="${id}|${k}|${gid}|${esc(o[0])}">${o[3] ? `<i class="sws" style="background:${o[3]}"></i>` : ''}${esc(o[1] || o[0])}</button>`).join('')}</div></div>` : ''; }).join('')}
    <p class="note" style="margin:8px 0 0">${it.f.length ? 'Seçtiklerin: ' + esc(it.f.map(x => (feOf(x) || [])[1]).join(', ')) : 'Henüz özellik seçmedin.'}</p></div>
    <p class="note">Bu ortamda yapılamayanlar: sunucu işleri (e-posta, zamanlama), kullanıcı girişi/yetki, canlı kesintisiz veri akışı, hukuki/vergi doğrulaması. Bunlar emirle de gelmez; ayrı karar gerekir.</p>`; },
  6: () => `<h2>6. Sayfa geneli</h2><div class="sf2"><label class="note">Sayfa genişliği <select id="pgw" aria-label="Sayfa genişliği">${PWID.map(o => `<option value="${o[0]}"${DS.pw === o[0] ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label><label class="note">Parçalar arası boşluk <select id="pgg" aria-label="Parça boşluğu">${PGAP.map(o => `<option value="${o[0]}"${DS.gap === o[0] ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label></div>`,
  7: () => { const L = LAY.find(l => l.id === DS.layout); return `<h2>7. Önizleme ve kaydet</h2><div class="pvw">${lsvg(L, '', true, Object.fromEntries(L.a.map(([id]) => [id, { type: (slot(id).items[0] || { type: 'empty' }).type }])))}</div><p style="margin:8px 0"><button type="button" class="btn ghost" id="pgreal">${DS.real ? 'Gerçek önizlemeyi gizle' : 'Gerçek önizlemeyi göster'}</button></p>${DS.real ? `<div style="margin:8px 0">${pageHtml({ layout: DS.layout, slots: DS.slots, pw: DS.pw, gap: DS.gap })}</div>` : ''}<label class="note" style="display:block;margin-bottom:8px">Ek istekler (davranışlar, süzgeçler, canlı veri…) <textarea id="pgx" aria-label="Ek istekler" class="pgta">${esc(DS.extra)}</textarea></label><p style="margin:0;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button type="button" class="btn" id="pgsave">${DS.editing ? 'Değişiklikleri kaydet' : 'Sayfayı oluştur ve menüye ekle'}</button><button type="button" class="btn ghost" id="pgspec">Emri kopyala (bana ver)</button><button type="button" class="btn ghost" id="pgrst">Formu sıfırla</button><span class="note" id="pgmsg"></span></p><textarea id="pgout" readonly hidden aria-label="Emir metni" class="pgta" style="min-height:150px;font:12px ui-monospace,Menlo,monospace"></textarea>`; }
};
views.sayfa = function () {
  const created = PG.pages.length ? `<section class="panel" style="margin-top:12px"><h2>Oluşturulan sayfalar (${PG.pages.length})</h2>${PG.pages.map(p => `<div class="why"><b>${esc(p.name)}</b> <span class="note">menü: ${esc(menuName(p.menu))} · ${esc((LAY.find(l => l.id === p.layout) || {}).n || '')}</span> <button type="button" class="btn ghost" data-goto="${p.id}">Aç</button><button type="button" class="btn ghost" data-pged="${p.id}">Düzenle</button><button type="button" class="btn ghost" data-pgdel="${p.id}">Sil</button></div>`).join('')}</section>` : '';
  const n = STEPS.length;
  return `<div class="demo">Sayfa tasarımcısı: adım adım ilerle. Önce menü ve ad, sonra yerleşim şekli, sonra her bölüme parçalar, sonra her parçanın özellikleri. Kayıt bu tarayıcıdadır; kalıcı ve gerçek veriyle bağlanması için üretilen emri bana verirsin.</div>
  <nav class="pgsteps" aria-label="Adımlar">${STEPS.map((t, i) => `<button type="button" class="pgst${DS.step === i + 1 ? ' on' : ''}" data-pgst="${i + 1}"><span>${i + 1}</span>${esc(t)}</button>`).join('')}</nav>
  <section class="panel" style="margin-bottom:12px">${stepBody[DS.step]()}<p class="pgnav"><button type="button" class="btn ghost" data-pgst="${DS.step - 1}"${DS.step === 1 ? ' disabled' : ''}>← Geri</button><button type="button" class="btn" data-pgst="${DS.step + 1}"${DS.step === n ? ' disabled' : ''}>İleri →</button></p></section>${created}`;
};
const pm = t => { const m = document.getElementById('pgmsg'); if (m) m.textContent = t; };
const A4 = (s, n) => { const a = s.split('|'); return a.slice(0, n - 1).concat(a.slice(n - 1).join('|')); };
document.addEventListener('input', e => { const t = e.target; if (t.dataset && t.dataset.pgf) { const q = t.value.trim().toLowerCase(), box = t.closest('.pgs'); box.querySelectorAll('tbody tr, details.wk, .kbk').forEach(r => { r.style.display = !q || r.textContent.toLowerCase().includes(q) ? '' : 'none'; }); return; } if (t.id === 'pgnm') DS.newMenu = t.value; else if (t.id === 'pgn') DS.name = t.value; else if (t.id === 'pgx') DS.extra = t.value; else if (t.dataset && t.dataset.pgi) { const [id, k, f] = t.dataset.pgi.split(':'); slot(id).items[+k][f] = t.value; } });
document.addEventListener('change', e => { const t = e.target; if (t.id === 'pgw') { DS.pw = t.value; route(); return; } if (t.id === 'pgg') { DS.gap = t.value; route(); return; } if (t.dataset && t.dataset.pgs) { const [id, k, f] = t.dataset.pgs.split(':'); slot(id).items[+k][f] = t.value; route(); } else if (t.dataset && t.dataset.pgmv) { const [id, k] = t.dataset.pgmv.split(':'); if (t.value) { const it = slot(id).items.splice(+k, 1)[0]; slot(t.value).items.push(it); route(); } } else if (t.dataset && t.dataset.pgc) { const [id, k] = t.dataset.pgc.split('|'); slot(id).items[+k].col = t.checked; } });
/* hover önizleme + satır içi düzenleme */
let pop = null;
document.addEventListener('mouseover', e => { const tr = e.target.closest && e.target.closest('.pgprev tbody tr'); if (!pop) { pop = document.createElement('div'); pop.className = 'pgpop'; pop.hidden = true; document.body.appendChild(pop); } if (!tr) { pop.hidden = true; return; } const hs = [...tr.closest('table').tHead.rows[0].cells].map(c => c.textContent.trim()); pop.innerHTML = [...tr.cells].map((c, i) => `<div><b>${esc(hs[i] || '')}</b> ${esc(c.textContent.trim())}</div>`).join(''); pop.hidden = false; const r = tr.getBoundingClientRect(); pop.style.left = Math.max(8, Math.min(innerWidth - 270, r.left + 20)) + 'px'; pop.style.top = (r.bottom + 4 + pop.offsetHeight > innerHeight ? r.top - pop.offsetHeight - 4 : r.bottom + 4) + 'px'; });
document.addEventListener('click', e => { const X = e.target; if (!X.closest) return; const td = X.closest('.pgedit tbody td'); if (td && !td.isContentEditable) { td.contentEditable = 'true'; td.classList.add('pged'); td.focus(); } }, true);
document.addEventListener('focusout', e => { const td = e.target; if (td && td.classList && td.classList.contains('pged')) { td.contentEditable = 'false'; td.classList.remove('pged'); } });
document.addEventListener('click', e => {
  const X = e.target; if (!X.closest) return; let b;
  if ((b = X.closest('[data-pgst]'))) { if (b.disabled) return; DS.step = +b.dataset.pgst; route(); window.scrollTo && window.scrollTo(0, 0); return; }
  if ((b = X.closest('[data-pgm]'))) { DS.menu = b.dataset.pgm; route(); return; }
  if ((b = X.closest('[data-pgl]'))) { DS.layout = b.dataset.pgl; route(); return; }
  if ((b = X.closest('[data-pga]'))) { const [a, id, k] = b.dataset.pga.split(':'), r = slot(id), i = +k; if (a === 'add') r.items.push(newItem(k)); else if (a === 'del') r.items.splice(i, 1); else if (a === 'up' && i > 0) [r.items[i - 1], r.items[i]] = [r.items[i], r.items[i - 1]]; else if (a === 'dn' && i < r.items.length - 1) [r.items[i + 1], r.items[i]] = [r.items[i], r.items[i + 1]]; route(); return; }
  if ((b = X.closest('[data-pgp]'))) { DS.pi = b.dataset.pgp; route(); return; }
  if ((b = X.closest('[data-pgk]'))) { const [id, k, f] = b.dataset.pgk.split('|'), A = slot(id).items[+k].f, i = A.indexOf(f); i >= 0 ? A.splice(i, 1) : A.push(f); route(); return; }
  if ((b = X.closest('[data-pgb]'))) { const [id, k, f, v] = A4(b.dataset.pgb, 4), A = slot(id).items[+k][f], i = A.indexOf(v); i >= 0 ? A.splice(i, 1) : A.push(v); route(); return; }
  if ((b = X.closest('[data-pgy]'))) { const [id, k, g, v] = A4(b.dataset.pgy, 4), it = slot(id).items[+k]; it.sty[g] = it.sty[g] === v ? '' : v; route(); return; }
  if ((b = X.closest('[data-pgcsv]'))) { const t = b.closest('.pgs').querySelector('table'); if (!t) return; const csv = [...t.rows].map(r => [...r.cells].map(c => '"' + c.textContent.replace(/\s+/g, ' ').trim().replace(/"/g, '""') + '"').join(';')).join('\n'); (navigator.clipboard ? navigator.clipboard.writeText(csv) : Promise.reject()).then(() => { b.textContent = 'Kopyalandı ✓'; }, () => { b.textContent = 'Kopyalanamadı'; }); return; }
  if ((b = X.closest('.pgsort th'))) { const t = b.closest('table'), i = b.cellIndex, tb = t.tBodies[0]; if (!tb) return; const dir = b.dataset.dir === 'a' ? 'd' : 'a'; t.querySelectorAll('th').forEach(h => { h.dataset.dir = ''; }); b.dataset.dir = dir; const n = x => { const v = parseFloat(x.replace(/[^\d.,-]/g, '').replace(',', '.')); return isNaN(v) ? null : v; }; const rows = [...tb.rows]; rows.sort((r1, r2) => { const a1 = r1.cells[i] ? r1.cells[i].textContent.trim() : '', a2 = r2.cells[i] ? r2.cells[i].textContent.trim() : '', x1 = n(a1), x2 = n(a2); const c = x1 !== null && x2 !== null ? x1 - x2 : a1.localeCompare(a2, 'tr'); return dir === 'a' ? c : -c; }); rows.forEach(r => tb.appendChild(r)); return; }
  if (X.id === 'pgreal') { DS.real = !DS.real; route(); return; }
  if ((b = X.closest('[data-goto]'))) { e.preventDefault(); goTo(b.dataset.goto); return; }
  if ((b = X.closest('[data-pgdel]'))) { const id = b.dataset.pgdel, pg = PG.pages.find(p => p.id === id); PG.pages = PG.pages.filter(p => p.id !== id); if (pg && !PG.pages.some(p => p.menu === pg.menu)) PG.menus = PG.menus.filter(m => m.id !== pg.menu); delete views[id]; save(); applyPages(); route(); return; }
  if ((b = X.closest('[data-pged]'))) { const pg = PG.pages.find(p => p.id === b.dataset.pged); if (pg) { DS = { step: 4, menu: pg.menu, newMenu: '', name: pg.name, layout: pg.layout, slots: JSON.parse(JSON.stringify(pg.slots)), extra: pg.extra || '', editing: pg.id, real: false, pw: pg.pw || '', gap: pg.gap || 'normal' }; Object.keys(DS.slots).forEach(k => slot(k)); route(); } return; }
  if (X.id === 'pgrst') { DS = blank(); route(); return; }
  if (X.id === 'pgspec') { const o = document.getElementById('pgout'); o.hidden = false; o.value = specText(); o.select(); (navigator.clipboard ? navigator.clipboard.writeText(o.value) : Promise.reject()).then(() => pm('Kopyalandı. Sohbete yapıştır.'), () => { try { document.execCommand('copy'); pm('Kopyalandı.'); } catch (x) { pm('Metni seçip elle kopyala'); } }); return; }
  if (X.id === 'pgsave') {
    if (!DS.name.trim()) { pm('Önce sayfa adını yaz (2. adım)'); return; }
    if (DS.menu === 'new' && !DS.newMenu.trim()) { pm('Yeni menünün adını yaz (1. adım)'); return; }
    let menu = DS.menu; const old = DS.editing && PG.pages.find(p => p.id === DS.editing);
    if (menu === 'new') { menu = 'um_' + Date.now().toString(36); PG.menus.push({ id: menu, name: DS.newMenu.trim() }); }
    const rec = { id: DS.editing || 'pg_' + Date.now().toString(36), menu, name: DS.name.trim(), layout: DS.layout, slots: JSON.parse(JSON.stringify(DS.slots)), extra: DS.extra, pw: DS.pw, gap: DS.gap };
    if (old) Object.assign(old, rec); else PG.pages.push(rec);
    PG.menus = PG.menus.filter(m => PG.pages.some(p => p.menu === m.id)); save(); applyPages(); const id = rec.id; DS = blank(); goTo(id);
  }
});
window.PGTEST = () => { const bad = PG.pages.filter(p => !views[p.id] || !SECS3.some(s => s[2].some(t => t[0] === p.id))); return bad.length ? bad.length + ' sayfa menüde yok' : true; };
})();
