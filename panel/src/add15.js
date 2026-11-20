/* ===================== v23: YENİ MENÜ, CANLI BASEROW OKUMA, KONTROLLER, RAPOR, DRIVE ===================== */
(function () {
  /* ---- 1. Menü yeniden düzeni: ÇALIŞMA (iş, sıralı) / YAPI / DRIVE / SİSTEM ---- */
  const keep = id => SECS3.find(s => s[0] === id);
  const sys = keep('sistem'), tas = keep('tasarla'), hat = keep('hatirla');
  const NEW = [
    ['bugun', 'Bugün', [['bugun', 'Bugün'], ['toplam', 'Toplam talepler'], ['genel', 'Genel özet']]],
    ['is', '① Çalışma', [['pkart', '1 Proje kartı'], ['taraflar', '2 Taraflar'], ['surec', '3 İş akışı'], ['evrak', '4 Evrak'], ['finans', '5 Maliyet ve finans'], ['kontrol', '6 Kontroller'], ['rapor', '7 Rapor']]],
    ['yapi', '② Yapı', [['projeler', 'Portföy ve kalıplar'], ['canli', 'Baserow canlı'], ['cikarim', 'Çıkarımlar'], ['giris', 'Giriş'], ['kolon', 'Kolon kategorileri'], ['istab', 'İş tabloları'], ['ortak', 'Ortak yapı']]],
    ['drive', '③ Drive', [['drive', 'Klasörler ve kalıplar']]],
    sys, tas, hat
  ].filter(Boolean);
  const pgSecs = SECS3.filter(s => s.u);
  SECS3.length = 0; NEW.forEach(s => SECS3.push(s));
  if (sys) sys[2] = sys[2].filter(t => t[0] !== 'cikarim');
  if (tas && !tas[2].some(t => t[0] === 'isdemo')) tas[2].unshift(['isdemo', 'Tasarım (eski)']);
  pgSecs.forEach(s => { if (!SECS3.includes(s)) SECS3.splice(SECS3.indexOf(hat), 0, s); });
  ALIAS.kontrol = 'kontrol';
  ['isdemo'].forEach(k => { if (!ALIAS[k]) ALIAS[k] = 'isdemo'; });

  /* ---- 2. Canlı okuma katmanı (yalnız okur) ---- */
  const TB = { proje: 1299126, gider: 1299135, kredi: 1299129, gumruk: 1299132, sigorta: 1301366, belge: 1299133, adim: 1299137, sevk: 1299131, makine: 1299813, tedarik: 1299128, yazisma: 1299811, teminat: 1299130 };
  const TBN = { proje: 'Projeler', gider: 'Giderler ve Vergiler', kredi: 'Krediler', gumruk: 'Gümrük İşlemleri', sigorta: 'Sigortalar', belge: 'Belgeler', adim: 'Süreç Adımları', sevk: 'Sevkiyatlar', makine: 'Makineler', tedarik: 'İmalat ve Tedarik', yazisma: 'Yazışmalar', teminat: 'Teminatlar' };
  const LV = { at: null, msg: '', busy: false, d: {}, sel: null, cnt: {} };
  window.LV = LV;
  const val = v => { if (v == null) return ''; if (Array.isArray(v)) return v.map(val).filter(Boolean).join(', '); if (typeof v === 'object') return v.value != null ? String(v.value) : (v.name != null ? String(v.name) : JSON.stringify(v)); return String(v); };
  const num = v => { const n = parseFloat(String(val(v)).replace(/[^\d.\-]/g, '')); return isNaN(n) ? null : n; };
  const fmt = v => { const n = num(v); return n == null ? '–' : n.toLocaleString('tr-TR', { maximumFractionDigits: 0 }); };
  const links = (r, f) => Array.isArray(r[f]) ? r[f].map(x => x && (x.id != null ? x.id : x)) : [];
  async function readTable(mcp, id) {
    const out = []; let page = 1;
    for (; page <= 10; page++) {
      const res = await mcp.callTool(SERVER, 'list_table_rows', { table_id: id, size: 200, page }, { cache: false });
      let p = res.payload; if (typeof p === 'string') p = JSON.parse(p);
      const rows = (p && (p.results || p.rows)) || []; out.push(...rows);
      if (rows.length < 200) break;
    }
    return out;
  }
  async function liveAll() {
    if (LV.busy) return; LV.busy = true; LV.msg = 'Okunuyor…'; route();
    try {
      const mcp = await getMcp(); if (!mcp) throw { code: 'capability_disabled' };
      const keys = Object.keys(TB); let n = 0;
      for (const k of keys) { LV.d[k] = await readTable(mcp, TB[k]); LV.cnt[k] = LV.d[k].length; n++; LV.msg = 'Okunuyor… ' + n + '/' + keys.length; }
      LV.at = new Date(); LV.msg = '';
      if (LV.sel == null && LV.d.proje.length) LV.sel = LV.d.proje[0].id;
    } catch (e) { LV.msg = 'Canlı okuma yapılamadı (' + ((e && e.code) || (e && e.message) || 'bilinmeyen') + '). ' + (MSG && MSG[e && e.code] ? MSG[e.code] : ''); }
    LV.busy = false; route();
  }
  const stamp = () => LV.at ? `<span class="pill ok">Canlı okuma ${LV.at.toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</span>` : '<span class="pill warn">Henüz okunmadı</span>';
  const readBar = () => `<div class="gtools"><button type="button" class="btn" data-lv="read"${LV.busy ? ' disabled' : ''}>Baserow’dan oku</button>${stamp()}<span class="note">${esc(LV.msg)}</span><span class="note">Yalnız okur; Baserow’a yazmaz.</span></div>`;
  const projRows = () => LV.d.proje || [];
  const projSel = () => projRows().find(r => r.id === LV.sel) || projRows()[0];
  const projPick = () => `<label class="note">Baserow projesi <select data-lv="sel" aria-label="Baserow projesi">${projRows().map(r => `<option value="${r.id}"${(projSel() || {}).id === r.id ? ' selected' : ''}>${esc(val(r['Proje Adı']))}${r['Aktif'] === false ? ' (pasif)' : ''}</option>`).join('')}</select></label>`;
  const kv = (label, v) => `<div><span class="note">${esc(label)}</span><b>${esc(v)}</b></div>`;
  /* Bir tablodaki, seçili projeye bağlı satırlar (Proje alanı üzerinden) */
  const relRows = (k, pr) => (LV.d[k] || []).filter(r => links(r, 'Proje').includes(pr.id) || (Array.isArray(r['Proje']) ? false : String(val(r['Proje'])) === String(val(pr['Proje Adı']))));
  const CTRL = /kontrol|mutabak|net |net$|eksik|uyar|fark|durum/i;
  function ctrlCols(k, rows) {
    if (!rows.length) return '<p class="note">Bu projeye bağlı satır yok.</p>';
    const keys = Object.keys(rows[0]).filter(f => /Kontrol|Mutabak|Net |Net$|Eksik|Uyar|Fark/i.test(f));
    const pri = Object.keys(rows[0])[2] || 'id';
    const head = Object.keys(rows[0]).find(f => !['id', 'order'].includes(f));
    if (!keys.length) return `<p class="note">${rows.length} satır; kontrol/net sütunu bulunamadı.</p>`;
    return `<div class="tw"><table><thead><tr><th>${esc(head)}</th>${keys.map(f => `<th>${esc(f)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr><td>${esc(val(r[head]))}</td>${keys.map(f => { const v = val(r[f]); const bad = /HATA|EKS|UYAR|FARK|BEKLEN/i.test(v); return `<td${bad ? ' style="color:var(--crit);font-weight:600"' : ''}>${esc(v === '' ? '–' : v)}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  views.canli = function () {
    const rs = projRows();
    let h = `<div class="demo">Baserow’dan canlı okunan veri. Aşağıdaki sayılar panelde yeniden hesaplanmaz, Baserow’un kendi formül sütunlarıdır.</div>${readBar()}`;
    if (!rs.length) return h + '<p class="note">“Baserow’dan oku”ya bas. Okuma yalnızca bu oturumda tutulur.</p>';
    h += `<div class="tw"><table><thead><tr><th>Proje</th><th>Incoterm</th><th>Aşama</th><th>Toplam değer USD</th><th>Toplam maliyet USD</th><th>Eksik belge</th><th>Süreç</th><th>Aktif</th></tr></thead><tbody>${rs.map(r => `<tr data-lvrow="${r.id}"><td><button type="button" class="lnk" data-lv="pick" data-id="${r.id}">${esc(val(r['Proje Adı']))}</button></td><td>${esc(val(r['Incoterm']))}</td><td>${esc(val(r['Aşama']))}</td><td class="mono">${fmt(r['Toplam Değer USD'])}</td><td class="mono">${fmt(r['Toplam Maliyet USD (vergi dahil)'])}</td><td>${esc(val(r['Eksik Belge Sayısı']))}</td><td>${esc(val(r['Süreç İlerleme']))}</td><td>${r['Aktif'] ? '✔' : '–'}</td></tr>`).join('')}</tbody></table></div>`;
    h += `<p class="note">Okunan satır sayıları: ${Object.keys(LV.cnt).map(k => TBN[k] + ' ' + LV.cnt[k]).join(' · ')}</p>`;
    return h;
  };
  views.kontrol = function () {
    let h = `<div class="demo">Kontroller: Baserow’un kendi kontrol, mutabakat ve net maliyet sütunları. Panel kural yazmaz, sonucu gösterir. Boş ya da eksik görünen, o sütunun Baserow’da olmadığı veya dolu olmadığı anlamına gelir.</div>${readBar()}`;
    const pr = projSel(); if (!pr) return h + '<p class="note">Önce “Baserow’dan oku”ya bas.</p>';
    h += `<div class="gtools">${projPick()}</div><div class="pkpi">${kv('Incoterm', val(pr['Incoterm']))}${kv('Aşama', val(pr['Aşama']))}${kv('Toplam değer', fmt(pr['Toplam Değer USD']) + ' USD')}${kv('Gider (vergisiz)', fmt(pr['Toplam Gider USD (vergisiz)']) + ' USD')}${kv('Vergi (gümrük)', fmt(pr['Toplam Vergi USD (Gümrük)']) + ' USD')}${kv('Toplam maliyet', fmt(pr['Toplam Maliyet USD (vergi dahil)']) + ' USD')}${kv('Eksik belge', val(pr['Eksik Belge Sayısı']))}</div>`;
    h += '<p class="note">Net maliyet (indirilebilir KDV düşülmüş): Baserow’da bu projede ayrı bir net maliyet sütunu yoksa gösterilmez; panel tahmin etmez. Gümrük tablosunda “Net” içeren sütun varsa aşağıda çıkar.</p>';
    ['kredi', 'tedarik', 'sigorta', 'sevk', 'gumruk', 'belge'].forEach(k => {
      const rows = relRows(k, pr);
      h += `<details open class="akd"><summary><b>${esc(TBN[k])}</b> <span class="note">${rows.length} satır</span></summary>${ctrlCols(k, rows)}</details>`;
    });
    return h;
  };
  views.pkart = function () {
    const p = scoped();
    return (scopeOne() ? scopedPortfoy() : '<div class="demo">Tüm projeler. Tek projeye geçmek için üstteki seçiciyi kullan.</div>' + (views.projeler ? views.projeler() : ''));
  };
  /* ---- 3. Rapor (yazdırılabilir) ---- */
  views.rapor = function () {
    const p = scopeSel(); if (!p) return '<p class="note">Açık proje yok.</p>';
    PRJ.ens(p); const P = p, c = PRJ.calc(p), A = TAS.sched(p), done = p.steps.filter(s => s.done).length;
    const em = p.em || {}, fr = p.fr || {};
    const steps = p.steps.map((s, i) => `<tr><td>${i + 1}</td><td>${esc(s.n)}</td><td>${esc(s.d || '')}</td><td>${s.done ? '✔' : '–'}</td><td>${esc((s.docs || []).join('; '))}</td></tr>`).join('');
    const docs = []; p.steps.forEach(s => (s.docs || []).forEach(d => { const l = ((s.lk || {})[d] || {}).u; docs.push(`<li>${esc(d)}${l ? ' — ' + esc(l) : ''}</li>`); }));
    return `<div class="rapor"><p class="noprint"><button type="button" class="btn" data-lv="print">Yazdır / PDF olarak kaydet</button> <span class="note">Tarayıcının yazdır penceresinde “PDF olarak kaydet”i seç.</span></p>
    <h2>${esc(p.n)}</h2><p class="note">Rapor tarihi: ${new Date().toLocaleDateString('tr-TR')} · Durum: ${esc(p.st || '')}${p.ornek ? ' · ÖRNEK/DEMO' : ''}</p>
    <h3>Kimlik</h3><table><tbody><tr><th>Mal</th><td>${esc(em.ad || '-')}</td><th>Miktar</th><td>${esc(String(em.mik || '-'))} ${esc(em.bir || '')}</td></tr><tr><th>Incoterm</th><td>${esc(p.inc || '-')}</td><th>Mal bedeli</th><td>${PRJ.f0(c.V)} USD</td></tr></tbody></table>
    <h3>Taraflar</h3><table><tbody>${Object.keys(fr).length ? Object.keys(fr).map(k => `<tr><th>${esc(k)}</th><td>${esc(fr[k])}</td></tr>`).join('') : '<tr><td>Tanımlı taraf yok</td></tr>'}</tbody></table>
    <h3>Süreç (${done}/${p.steps.length} adım tamam)</h3><table><thead><tr><th>#</th><th>Adım</th><th>Sorumlu</th><th>Tamam</th><th>Belgeler</th></tr></thead><tbody>${steps}</tbody></table>
    <h3>Maliyet (panel hesabı, oranlar geçici)</h3>${PRJ.calcHtml(p)}
    <h3>Belgeler</h3><ul>${docs.join('') || '<li>Yok</li>'}</ul></div>`;
  };
  /* ---- 4. Drive ---- */
  const DR = 'https://drive.google.com/drive/folders/';
  const DF = [['SURECYONETIM (ana)', '1QKDO1b9d1pPZhAwe3ImkN0LXTYFxwG1b'], ['00_KALIPLAR', '1SxoCxxh_2TdunI15WkQ62bVar-IozUGR'], ['01_ANA_VERILER', '1Isp5KMIcRLHXSp3LH45U2kbiPfJWgnqF'], ['02_PROJELER', '1kaJbe6DUipo4DTEs_jXHHrdkSKDKxAQL'], ['99_DEMO', '1s8CfACGm86IHXZgL-R3q6x0-8CCOelN2'], ['_PROJE_SABLONU', '1VEWWhwGUFbyaEEB-FK39zrIBGgNagH-M']];
  const KL = [['KALIP_Satis_Sozlesmesi', 'docx', '01_Sozlesme'], ['KALIP_Maliyet_Hesabi', 'xlsx', '06_Finans'], ['KALIP_Gumruk_Kontrol_Listesi', 'md', '04_Gumruk'], ['KALIP_Sigorta_Talebi', 'md', '05_Sigorta'], ['KALIP_Proje_Ozeti', 'md', '09_Rapor'], ['KALIP_Yazisma_Kaydi', 'md', '07_Yazisma']];
  views.drive = function () {
    const withLink = (LV.d.belge || []).filter(r => val(r['Drive Linki'])).length;
    return `<div class="demo">Dosyalar Drive’daki SURECYONETIM klasöründedir; linkleri Baserow Belgeler tablosunun “Drive Linki” sütununa yazılır.</div>
    <section class="panel"><h3>Klasörler</h3><ul>${DF.map(f => `<li><a href="${DR}${f[1]}" target="_blank" rel="noopener">${esc(f[0])}</a></li>`).join('')}</ul>
    <h3>Proje klasör ağacı</h3><p class="note">02_PROJELER/&lt;PRJ-KODU&gt;/ altında: 01_Sozlesme · 02_Ticari · 03_Lojistik · 04_Gumruk · 05_Sigorta · 06_Finans · 07_Yazisma · 08_Analiz · 09_Rapor</p>
    <h3>Kalıplar → klasör</h3><div class="tw"><table><thead><tr><th>Kalıp</th><th>Biçim</th><th>Konu klasörü</th></tr></thead><tbody>${KL.map(k => `<tr><td>${k[0]}</td><td>${k[1]}</td><td>${k[2]}</td></tr>`).join('')}</tbody></table></div>
    <h3>Baserow bağı</h3><p class="note">Belgeler tablosunda yeni sütunlar: Drive Linki, Format, Örnek. ${LV.at ? 'Şu an dolu Drive linki: ' + withLink + ' / ' + (LV.d.belge || []).length : 'Dolu link sayısı için Baserow canlı okumasını yap.'}</p></section>`;
  };
  /* ---- 5. Olaylar ---- */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-lv]'); if (!b) return;
    const a = b.dataset.lv;
    if (a === 'read') liveAll();
    else if (a === 'pick') { LV.sel = +b.dataset.id; location.hash = '#kontrol'; route(); }
    else if (a === 'print') window.print();
  });
  document.addEventListener('change', e => { const s = e.target.closest && e.target.closest('select[data-lv="sel"]'); if (s) { LV.sel = +s.value; route(); } });
  window.V23TEST = () => {
    const f = [];
    SECS3.forEach(s => s[2].forEach(t => { if (!views[t[0]]) f.push('eksik:' + t[0]); }));
    ['pkart', 'kontrol', 'rapor', 'drive', 'canli'].forEach(k => { try { const h = views[k](); if (typeof h !== 'string' || (h.length < 40 && !/Açık proje yok/.test(h))) f.push('boş:' + k); } catch (x) { f.push(k + ':' + x.message); } });
    LV.d = { proje: [{ id: 1, 'Proje Adı': 'T', 'Incoterm': { value: 'FOB' }, 'Aktif': true }], kredi: [{ id: 5, 'Kredi': 'K', 'Proje': [{ id: 1, value: 'T' }], 'Kredi Mutabakatı': 'FARK 10' }] }; LV.sel = 1;
    try { const h = views.kontrol(); if (!/FARK 10/.test(h)) f.push('kontrol sütunu görünmedi'); } catch (x) { f.push('kontrol:' + x.message); }
    LV.d = {}; LV.sel = null;
    return f.length ? f.join('; ') : true;
  };
})();
