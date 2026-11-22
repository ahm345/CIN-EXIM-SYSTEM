(function () {
  const SRV = 'Baserow', TB = { proje: 1299126, lot: 1299127, sevk: 1299131, bel: 1299133, adim: 1299137, kredi: 1299129, gider: 1299135 };
  const F = { q: '', inc: '', ulke: '', mal: '', firma: '', kaynak: '', durum: '' };
  let BSEL = null, D = {}, LV = null, ERRM = '';
  try { const v = localStorage.getItem('cin-psel'); if (v && v[0] === 'B') BSEL = +v.slice(1); } catch (e) {}
  const E = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const V = (r, k) => { const v = r[k]; if (v == null) return ''; if (Array.isArray(v)) return v.map(x => x && x.value != null ? x.value : x).join(', '); return typeof v === 'object' ? (v.value != null ? v.value : '') : String(v); };
  const N = (r, p) => { const k = Object.keys(r).find(x => x.indexOf(p) === 0), n = k ? parseFloat(r[k]) : 0; return isNaN(n) ? 0 : n; };
  const fm = n => Math.round(n).toLocaleString('tr-TR');
  const ids = (r, k) => Array.isArray(r[k]) ? r[k].map(x => x.id) : [];
  const ULKE = [['Kazakistan', 'Kazakistan'], ['Almatı', 'Kazakistan'], ['Khorgos', 'Kazakistan'], ['Özbekistan', 'Özbekistan'], ['Navoi', 'Özbekistan'], ['Bakü', 'Azerbaycan'], ['Mısır', 'Mısır'], ['Aqaba', 'Ürdün'], ['Almanya', 'Almanya'], ['Çin', 'Çin'], ['Urumçi', 'Çin'], ['Ningbo', 'Çin'], ['Mersin', 'Türkiye'], ['Samsun', 'Türkiye'], ['Bursa', 'Türkiye'], ['Türkiye', 'Türkiye'], ['İstanbul', 'Türkiye']];
  const MAL = ['Otobüs', 'Giyim', 'Mobilya', 'Kablo', 'CNC', 'Konveyör', 'Beyaz Eşya', 'Buğday', 'Güneş Paneli', 'Çelik', 'Klinker', 'Ekskavatör'];
  const mk = (t, raw) => { const m = ml(t); return m[0] === 'Diğer' && raw ? [raw] : m; };
  const ul = t => [...new Set(ULKE.filter(u => t.indexOf(u[0]) > -1).map(u => u[1]))];
  const ml = t => { const m = MAL.filter(x => t.toLowerCase().indexOf(x.toLowerCase()) > -1); return m.length ? m : ['Diğer']; };
  const pr = (k, id) => (D[k] || []).filter(r => ids(r, 'Proje').indexOf(id) > -1);
  const firms = id => { const s = new Set(); [['lot', 'Tedarikçi'], ['sevk', 'Taşıyıcı'], ['kredi', 'Kreditör'], ['kredi', 'Borçlu']].forEach(a => pr(a[0], id).forEach(r => V(r, a[1]).split(', ').forEach(x => x && s.add(x)))); return [...s]; };
  const BP = () => D.proje ? D.proje.map(r => ({ id: r.id, ad: V(r, 'Proje Adı'), inc: V(r, 'Incoterm'), tp: V(r, 'Teslim Noktası'), aktif: r['Aktif'] === true, row: r })) : BSR.proje.map(b => ({ id: b.id, ad: b.ad, inc: b.inc, tp: '', aktif: b.aktif !== false, row: null }));
  const bp = id => BP().filter(b => b.id === id)[0];
  function cat() {
    const o = [];
    TAS.PL.dm.forEach((p, i) => o.push({ k: 'L' + i, src: 'Örnek', ad: p.n, inc: p.inc || '', mal: mk(p.n + ' ' + ((p.em || {}).ad || ''), (p.em || {}).ad), ulke: ul(p.n), fr: Object.values(p.fr || {}).filter(Boolean), pasif: !!p.pasif }));
    BP().forEach(b => { const lp = pr('lot', b.id).map(r => (/-Lot-\d+\s+(.*?)\s*[(]/.exec(V(r, 'Lot Adı')) || [])[1]).filter(Boolean); o.push({ k: 'B' + b.id, src: 'Baserow', ad: b.ad, inc: b.inc, mal: mk(lp.join(' ') + ' ' + b.ad, lp[0]), ulke: ul(b.ad + ' ' + b.tp), fr: firms(b.id), pasif: !b.aktif }); });
    return o;
  }
  const match = c => { const t = [c.ad, c.inc, c.mal.join(' '), c.ulke.join(' '), c.fr.join(' ')].join(' ').toLowerCase();
    return (!F.q || t.indexOf(F.q.toLowerCase()) > -1) && (!F.inc || c.inc === F.inc) && (!F.ulke || c.ulke.indexOf(F.ulke) > -1) && (!F.mal || c.mal.indexOf(F.mal) > -1) && (!F.firma || c.fr.indexOf(F.firma) > -1) && (!F.kaynak || c.src === F.kaynak) && (!F.durum || (F.durum === 'Pasif') === c.pasif); };
  const curKey = () => BSEL ? 'B' + BSEL : 'L' + scopeSelIdx();
  const scopeSelIdx = () => { const p = scopeSel(); return Math.max(0, TAS.PL.dm.indexOf(p)); };
  function resOpts(R, cur, C) {
    let h = R.map(c => `<option value="${c.k}"${c.k === cur ? ' selected' : ''}>${E((c.src === 'Baserow' ? '[Baserow] ' : '[Örnek] ') + c.ad.slice(0, 72))}${c.pasif ? ' (pasif)' : ''}</option>`).join('');
    if (!R.some(c => c.k === cur)) { const c = C.filter(x => x.k === cur)[0]; if (c) h = `<option value="${c.k}" selected>• seçili: ${E(c.ad.slice(0, 60))} (süzgeç dışı)</option>` + h; }
    return h || '<option value="">Eşleşen proje yok</option>';
  }
  const FK = { inc: c => [c.inc], ulke: c => c.ulke, mal: c => c.mal, firma: c => c.fr, kaynak: c => [c.src], durum: c => [c.pasif ? 'Pasif' : 'Aktif'] };
  const mtc = (c, skip) => { const t = [c.ad, c.inc, c.mal.join(' '), c.ulke.join(' '), c.fr.join(' ')].join(' ').toLowerCase();
    if (F.q && t.indexOf(F.q.toLowerCase()) < 0) return false;
    return Object.keys(FK).every(f => f === skip || !F[f] || FK[f](c).indexOf(F[f]) > -1); };
  const facet = (C, f) => { const v = [...new Set(C.filter(c => mtc(c, f)).flatMap(FK[f]))].filter(Boolean).sort(); if (F[f] && v.indexOf(F[f]) < 0) v.unshift(F[f]); return v; };
  const LAB = { inc: 'Incoterm', ulke: 'Ülke', mal: 'Ürün', firma: 'Firma', kaynak: 'Kaynak', durum: 'Durum' };
  const optHtml = (C, f) => `<option value="">${LAB[f]}: tümü</option>` + facet(C, f).map(v => `<option${F[f] === v ? ' selected' : ''}>${E(v)}</option>`).join('');
  const sel = (C, f) => `<select data-v26="${f}" aria-label="${LAB[f]}">${optHtml(C, f)}</select>`;
  pbarHtml = function () {
    const C = cat(), R = C.filter(match);
    return `<div class="pbar v26" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><b>Çalışılan proje</b><input id="v26q" type="search" placeholder="Ad, ürün, yer, firma" value="${E(F.q)}" aria-label="Proje ara">` + Object.keys(LAB).map(f => sel(C, f)).join('') + `<button type="button" class="btn ghost" data-v26="reset">Temizle</button><select id="v26res" data-v26="pick" aria-label="Proje listesi">${resOpts(R, curKey(), C)}</select><span class="note" id="v26n">${R.length}/${C.length} proje</span><button type="button" class="rc${scopeOne() ? ' on' : ''}" data-pb="one">Yalnız bu proje</button><button type="button" class="rc${scopeOne() ? '' : ' on'}" data-pb="all">Tüm projeler</button></div>`;
  };
  function choose(k) { if (k[0] === 'B') BSEL = +k.slice(1); else { BSEL = null; TAS.PL.ds = +k.slice(1); PS.akN = null; } SCOPE = 'one'; try { localStorage.setItem('cin-psel', k); localStorage.setItem('cin-scope', 'one'); } catch (e) {} TAS.savePL(); route(); }
  function refresh() { const C = cat(), R = C.filter(match);
    Object.keys(LAB).forEach(f => { const el = document.querySelector('select[data-v26="' + f + '"]'); if (el) el.innerHTML = optHtml(C, f); });
    const r = document.getElementById('v26res'); if (r) r.innerHTML = resOpts(R, curKey(), C);
    const n = document.getElementById('v26n'); if (n) n.textContent = R.length + '/' + C.length + ' proje'; }
  document.addEventListener('input', e => { if (e.target.id === 'v26q') { F.q = e.target.value; refresh(); } }, true);
  document.addEventListener('change', e => { const t = e.target, f = t.dataset && t.dataset.v26; if (!f) return; if (f === 'pick') { if (t.value) choose(t.value); } else { F[f] = t.value; refresh(); } }, true);
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-v26]'); if (!b) return; if (b.dataset.v26 === 'reset') { Object.keys(F).forEach(k => F[k] = ''); const q = document.getElementById('v26q'); if (q) q.value = ''; refresh(); } if (b.dataset.v26 === 'live') live(); }, true);
  async function live() {
    let m = null; try { m = await window.claude.use('mcp'); } catch (e) {}
    if (!m) { ERRM = 'Baserow bağlantısı bu görünümde yok (claude.ai içindeki artifact’ta çalışır).'; route(); return; }
    for (const k of Object.keys(TB)) { try { const r = await m.callTool(SRV, 'list_table_rows', { table_id: TB[k], size: 200 }, { cache: false }); let p = r && r.payload; if (typeof p === 'string') { try { p = JSON.parse(p); } catch (x) {} } D[k] = (p && p.results) || []; } catch (e) { ERRM = 'Okuma hatası (' + k + '): ' + ((e && (e.code || e.message)) || 'bilinmiyor'); route(); return; } }
    LV = new Date(); ERRM = ''; route();
  }
  const tb = (h, rows) => rows.length ? `<div style="overflow-x:auto"><table><thead><tr>${h.map(x => `<th>${E(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '<p class="note">Kayıt yok.</p>';
  const pl = t => `<span class="pill${/^(OK|TARİH GEÇERLİ|Tarih geçerli)/i.test(t) ? '' : ' warn'}">${E(t || '—')}</span>`;
  const kp = a => `<div class="pkpi">${a.map(x => `<div><span class="note">${E(x[0])}</span><b>${E(x[1])}</b></div>`).join('')}</div>`;
  const note = t => `<div class="akd" style="border-left:4px solid #2f7fd1"><p>${t}</p><button type="button" class="btn ghost" data-pb="all">Tüm projeleri göster</button></div>`;
  function snap(b) { const s = BSR.proje.filter(x => x.id === b.id)[0]; return s ? kp([['Incoterm', s.inc], ['Mal bedeli USD', fm(s.deger)], ['Lot', s.lot], ['Sevkiyat', s.sev], ['Belge (eksik)', s.belge + ' (' + s.ebelge + ')'], ['Adım (tamam)', s.adim + ' (' + s.tadim + ')']]) + `<p class="note">${E(BSR.tarih)} tarihli anlık görüntü. Güncel veri için Baserow okunmalı.</p>` : ''; }
  const vOz = (b, S) => { const r = b.row || {}, deger = N(r, 'Toplam Değer'), lot = S.lot.reduce((a, x) => a + N(x, 'Adet') * N(x, 'Birim Fiyat'), 0), eb = N(r, 'Eksik Belge'), tam = S.adim.filter(x => /Tamam/.test(V(x, 'Durum'))).length, w = []; ['sevk', 'kredi'].forEach(k => S[k].forEach(x => Object.keys(x).forEach(f => { if (/Kontrol|Mutabakat/.test(f) && typeof x[f] === 'string' && x[f] && !/^OK/i.test(x[f])) w.push(f + ': ' + x[f].slice(0, 70)); })));
    return kp([['Incoterm', b.inc], ['Mal bedeli USD', fm(deger)], ['Lot toplamı USD', fm(lot)], ['Belge dosyası eksik', eb], ['Adım tamam', tam + '/' + S.adim.length], ['Sevkiyat', S.sevk.length]]) + `<div class="akd"><b>Dikkat</b>${Math.abs(deger - lot) > 1 ? '<p>Lot toplamı mal bedeliyle eşleşmiyor.</p>' : ''}${eb > 0 ? `<p>${eb} gerekli belgenin dosyası/linki yok.</p>` : ''}${w.slice(0, 6).map(x => `<p>${E(x)}</p>`).join('') || (eb > 0 ? '' : '<p>Uyarı yok.</p>')}</div>`; };
  const vTar = (b, S) => { const o = []; [['lot', 'Tedarikçi', 'Tedarikçi'], ['sevk', 'Taşıyıcı', 'Taşıyıcı'], ['kredi', 'Kreditör', 'Banka / kreditör'], ['kredi', 'Borçlu', 'Borçlu']].forEach(a => S[a[0]].forEach(r => V(r, a[1]).split(', ').filter(Boolean).forEach(f => { if (!o.some(x => x[0] === f && x[1] === a[2])) o.push([f, a[2]]); }))); return tb(['Firma', 'Rol'], o.map(x => [E(x[0]), E(x[1])])) + '<p class="note">Roller bağlı kayıtlardan çıkarıldı. Projeye göre rol tablosu (TASK-MULTI-002) henüz yok.</p>'; };
  const vAd = (b, S) => tb(['Sıra', 'Adım', 'Durum', 'Sorumlu'], S.adim.slice().sort((x, y) => N(x, 'Sıra') - N(y, 'Sıra')).map(r => [E(V(r, 'Sıra')), E(V(r, 'Adım')), E(V(r, 'Durum')), E(V(r, 'Sorumlu'))]));
  const vBel = (b, S) => tb(['Belge', 'Tür', 'Durum', 'Dosya', 'Link'], S.bel.map(r => { const u = V(r, 'Drive Linki'); return [E(V(r, 'Belge Adı')), E(V(r, 'Tür')), E(V(r, 'Durum')), pl(V(r, 'Dosya Kontrolü')), /^https:\/\//.test(u) ? `<a href="${E(u)}" target="_blank" rel="noopener">Aç</a>` : '—']; })) + '<p class="note">Dosya Kontrolü Baserow formülünden gelir, Drive linkini saymaz (TASK-MULTI-005).</p>';
  const vFin = (b, S) => { const r = b.row || {}, kr = S.kredi.reduce((a, x) => a + N(x, 'Tutar USD'), 0), gd = S.gider.reduce((a, x) => a + N(x, 'USD Karşılığı'), 0); return kp([['Mal bedeli', fm(N(r, 'Toplam Değer'))], ['Kredi (Krediler satırları)', fm(kr)], ['Gider (vergisiz)', fm(gd)], ['Vergi (gümrük + KDV)', fm(N(r, 'Toplam Vergi'))], ['Toplam maliyet', fm(N(r, 'Toplam Maliyet'))]]) + '<p class="note">Proje tablosundaki Kredi Tutarı formülü krediye bakmadığı için kullanılmadı; kredi Krediler satırlarından toplandı.</p>' + tb(['Kredi', 'Tutar USD', 'Faiz %', 'Vade ay', 'Mutabakat'], S.kredi.map(x => [E(V(x, 'Kredi Adı')), fm(N(x, 'Tutar USD')), E(V(x, 'Faiz Oranı')), E(V(x, 'Vade (Ay)')), pl(V(x, 'Anapara Mutabakatı'))])) + tb(['Gider', 'Kategori', 'USD', 'Ödeme'], S.gider.map(x => [E(V(x, 'Gider Adı')), E(V(x, 'Kategori')), fm(N(x, 'USD Karşılığı')), E(V(x, 'Ödeme Durumu'))])); };
  const vKon = (b, S) => { const o = []; [['sevk', 'Sevkiyat'], ['kredi', 'Kredi']].forEach(a => S[a[0]].forEach(x => Object.keys(x).forEach(f => { if (/Kontrol|Mutabakat/.test(f) && typeof x[f] === 'string' && x[f]) o.push([a[1], E(V(x, 'Sevkiyat No') || V(x, 'Kredi Adı')), pl(x[f].slice(0, 90))]); }))); return tb(['Tablo', 'Kayıt', 'Sonuç'], o); };
  const vRap = (b, S) => '<button type="button" class="btn" onclick="window.print()">Yazdır / PDF</button>' + vOz(b, S) + vFin(b, S) + vBel(b, S);
  const RV = { pkart: vOz, taraflar: vTar, surec: vAd, surec1: vAd, surec2: vAd, surec3: vAd, surec4: vAd, evrak: vBel, dosya: vBel, finans: vFin, kontrol: vKon, rapor: vRap };
  function bview(k) {
    const b = bp(BSEL); if (!b) return note('Seçili Baserow projesi bulunamadı. Üstten yeniden seç.');
    const hd = `<div class="akd" style="border-left:4px solid #2f7fd1;margin:0 0 10px"><div class="gtools"><b>${E(b.ad)}</b><span class="note">Baserow projesi · ${E(b.inc)} · yalnız bu proje gösterilir</span></div></div>`;
    if (!LV) return hd + `<div class="akd">${snap(b)}<p>Ayrıntı için Baserow’dan oku.</p><button type="button" class="btn" data-v26="live">Baserow’dan oku</button>${ERRM ? `<p class="note">${E(ERRM)}</p>` : ''}</div>`;
    const S = { lot: pr('lot', b.id), sevk: pr('sevk', b.id), kredi: pr('kredi', b.id), bel: pr('bel', b.id), gider: pr('gider', b.id), adim: pr('adim', b.id) };
    return hd + RV[k](b, S);
  }
  const SCV = ['pkart', 'taraflar', 'surec', 'surec1', 'surec2', 'surec3', 'surec4', 'evrak', 'dosya', 'finans', 'kontrol', 'rapor'];
  const BUSV = ['operasyon', 'teklif'], isBus = () => BSEL ? BSEL === 1 : scopeSelIdx() === 0;
  const PORT = ['sys', 'git', 'akis', 'istablo', 'senaryo', 'giris', 'issoz', 'ortak', 'graf', 'sozluk', 'kolon', 'toplam', 'genel', 'projeler', 'canli', 'cikarim', 'departman', 'isdemo', 'tasarim1', 'tasarim2', 'tasarim3', 'tasarim4', 'tasarim5'];
  SCV.forEach(k => { const o = views[k]; if (o) views[k] = () => scopeOne() && BSEL ? bview(k) : o(); });
  const ob = views.bugun; views.bugun = () => scopeOne() ? (BSEL ? bview('pkart') : (views.pkart ? views.pkart() : ob())) : ob();
  PORT.forEach(k => { const o = views[k]; if (o) views[k] = () => scopeOne() ? note('Bu sayfa tüm projeleri veya sistem yapısını gösterir (proje verisi değildir); “Yalnız bu proje” kapsamında kapalıdır. Seçili projenin verisi için Çalışma menüsünü kullan.') : o(); });
  BUSV.forEach(k => { const o = views[k]; if (o) views[k] = () => scopeOne() && !isBus() ? note('Bu sayfa yalnızca ilk (kiralama) projeye aittir; seçili proje o değil.') : o(); });
  window.V26 = { list: () => cat().filter(match), cat, F, choose, live, sel: () => BSEL };
  window.V26TEST = () => { const f = [], C = cat(); if (C.length < 4) f.push('katalog'); if (!/Çalışılan proje/.test(pbarHtml())) f.push('çubuk'); return f.length ? f.join(', ') : true; };
})();

