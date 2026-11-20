/* v24: LOI + Teklif adımları tüm şablonlarda, canlı Evrak, güncel Drive sayfası */
(function () {
  const TPL = TAS.TPL;
  const LOI = 'Niyet mektubu (LOI)', TEK = 'Teklif';
  const shift = a => [a[0], a[1], a[2], a[3], (a[4] && a[4].length) ? a[4].map(x => x + 2) : [1]];
  TPL.forEach(t => {
    if (t.id === 'bos' || !t.s.length || t.s[0][0] === LOI) return;
    t.s = [[LOI, 'Hukuk', 5, 'LOI', []], [TEK, 'Finans', 5, 'Teklif', [0]]].concat(t.s.map(shift));
  });
  [['Hukuk', LOI, 5, 'LOI'], ['Finans', TEK, 5, 'Teklif']].forEach(c => { if (!AKCAT.some(x => x[1] === c[1])) AKCAT.push(c); });
  /* mevcut (kayıtlı) projeleri bir kez dönüştür: adım adına bakılır, tekrar çalışsa zarar vermez */
  const PLs = TAS.PL; let ch = false;
  (PLs.dm || []).forEach(p => {
    const tp = TPL[p.t]; if (!tp || tp.id === 'bos' || !p.steps || !p.steps.length || p.steps.some(s => s.n === LOI)) return;
    const sh = p.steps.map(s => Object.assign({}, s, { pr: (s.pr && s.pr.length) ? s.pr.map(x => x + 2) : [1] }));
    const mkS = (n, d, g, docs, pr) => ({ n, d, g, docs: [docs], pr, v: false, x: false, k: '', lag: 0 });
    p.steps = [mkS(LOI, 'Hukuk', 5, 'LOI', []), mkS(TEK, 'Finans', 5, 'Teklif', [0])].concat(sh); ch = true;
  });
  if (ch) TAS.savePL();
  /* Drive sayfası: güncel kalıp listesi */
  const KL2 = [['Niyet_Mektubu_LOI', 'docx', '01_Sozlesme'], ['Teklif', 'docx', '02_Ticari'], ['Satis_Sozlesmesi', 'docx', '01_Sozlesme'], ['Proforma_Fatura', 'docx', '02_Ticari'], ['Ticari_Fatura', 'docx', '02_Ticari'], ['Paketleme_Listesi', 'docx', '03_Lojistik'], ['Deniz_Konsimentosu', 'docx', '03_Lojistik'], ['Mense_Sahadetnamesi', 'docx', '04_Gumruk'], ['Ihracat_Beyannamesi', 'docx', '04_Gumruk'], ['Tasima_Sigortasi_Policesi', 'docx', '05_Sigorta'], ['LC_Akreditif_Talimati', 'docx', '06_Finans'], ['Kalite_Kontrol_Raporu', 'docx', '08_Analiz'], ['Maliyet_Hesabi', 'xlsx', '06_Finans'], ['Gumruk_Kontrol_Listesi', 'md', '04_Gumruk'], ['Sigorta_Talebi', 'md', '05_Sigorta'], ['Yazisma_Kaydi', 'md', '07_Yazisma'], ['Proje_Ozeti', 'md', '09_Rapor']];
  const d0 = views.drive;
  views.drive = function () {
    let h = d0();
    const rows = KL2.map(k => `<tr><td>${k[0]}</td><td>${k[1]}</td><td>${k[2]}</td></tr>`).join('');
    h = h.replace(/(<h3>Kalıplar → klasör<\/h3><div class="tw"><table><thead>.*?<\/thead><tbody>).*?(<\/tbody>)/, (m, a, b) => a + rows + b);
    return h + `<section class="panel"><h3>Dolu örnek (P08 demo)</h3><p class="note">02_PROJELER/P08-FAS-BUGDAY/ altında LOI (01_Sozlesme) ve Teklif (02_Ticari) dahil demo belgeleri durur; hepsi “DEMO / kurgusal” işaretlidir. LOI varsayılan olarak bağlayıcı olmayan türdedir.</p></section>`;
  };
  /* Evrak: eski “52 satır / Drive sütunu yok” metni düzeltildi; canlı okuma varsa Drive Linki listesi eklenir */
  const e0 = views.evrak;
  views.evrak = function () {
    let h = e0().replace(/<div class="demo">Evrak ara:.*?<\/div>/s, '<div class="demo">Evrak ara: örnek/şablon kütüphanesi ve son Baserow anlık görüntüsü. Canlı Belgeler (Drive Linki, Format, Örnek dahil) için “Baserow’dan oku” kullanılır; dosyalar Drive’da, Baserow’da yalnız link durur.</div>');
    const B = (window.LV && LV.d && LV.d.belge) || null;
    if (B) {
      const v = x => x == null ? '' : (typeof x === 'object' ? (x.value != null ? x.value : '') : x);
      const L = B.filter(r => v(r['Drive Linki']));
      h += `<section class="panel"><h3>Canlı Belgeler · Drive linki olanlar (${L.length} / ${B.length})</h3>${L.length ? '<ul>' + L.map(r => `<li>${esc(String(v(r['Belge Adı'] || r['Ad'] || r['Name'] || 'Belge')))} · <a href="${esc(String(v(r['Drive Linki'])))}" target="_blank" rel="noopener noreferrer">Drive’da aç</a></li>`).join('') + '</ul>' : '<p class="note">Henüz link yok.</p>'}</section>`;
    }
    return h;
  };
  window.V24TEST = () => {
    const f = [];
    TPL.forEach(t => { if (t.id === 'bos') return; if (t.s[0][0] !== LOI || t.s[1][0] !== TEK) f.push('başta yok:' + t.id); t.s.forEach((s, i) => s[4].forEach(x => { if (x >= i) f.push('öncül hatası:' + t.id + i); })); });
    try { if (!/Niyet_Mektubu_LOI/.test(views.drive())) f.push('drive'); if (/52 satır/.test(views.evrak())) f.push('evrak eski'); } catch (x) { f.push(x.message); }
    return f.length ? f.join('; ') : true;
  };
})();
