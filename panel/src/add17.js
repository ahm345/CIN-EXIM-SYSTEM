/* v25: Dosya arama sayfası (Drive'daki tüm dosyalar, süz, seç, kopyala) */
(function () {
  const DRV = __DRV__;
  const DS = { q: '', proje: '', konu: '', fmt: '', tur: '', kaynak: '', bm: '', sel: {}, out: '' };
  const SIZ = { Kalıp: 0 };
  const konu = d => { const m = d.yol.split('/').filter(x => /^\d\d_/.test(x) && x !== '00_KALIPLAR' && x !== '01_ANA_VERILER' && x !== '02_PROJELER'); return m.length ? m[m.length - 1] : (d.yol.split('/')[0] || ''); };
  const turOf = d => d.ad.replace(/^KALIP_/, '').replace(/^P\d+-[A-Z]+-[A-Z]+_/, '').replace(/_v\d+(?=\.)/, '').replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' ');
  DRV.forEach(d => { d.k = konu(d); d.t = turOf(d); d.pr = d.proje || (d.kalip ? 'Kalıp' : ''); d.src = d.kalip ? 'Kalıp' : d.yol.startsWith('99_DEMO') ? 'Demo proje' : 'Diğer'; });
  const uniq = f => [...new Set(DRV.map(f).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr'));
  const bmHas = d => { const B = window.LV && LV.d && LV.d.belge; if (!B) return null; return B.some(r => { const v = r['Drive Linki']; return v && String(v).indexOf(d.id) >= 0; }); };
  const filt = () => { const q = DS.q.trim().toLocaleLowerCase('tr'); return DRV.filter(d => (!q || (d.ad + ' ' + d.yol + ' ' + d.t).toLocaleLowerCase('tr').includes(q)) && (!DS.proje || d.pr === DS.proje) && (!DS.konu || d.k === DS.konu) && (!DS.fmt || d.fmt === DS.fmt) && (!DS.tur || d.t === DS.tur) && (!DS.kaynak || d.src === DS.kaynak) && (!DS.bm || (DS.bm === 'var' ? bmHas(d) === true : DS.bm === 'yok' ? bmHas(d) === false : true))); };
  const sel = (k, label, opts) => `<label class="note">${label} <select data-dsf="${k}"><option value="">hepsi</option>${opts.map(o => `<option value="${esc(o)}"${DS[k] === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`;
  const kb = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
  const list = () => {
    const L = filt(), chosen = Object.keys(DS.sel).length, allOn = L.length && L.every(d => DS.sel[d.id]);
    const live = !!(window.LV && LV.d && LV.d.belge);
    return `<p class="note" style="margin:0 0 6px">${L.length} / ${DRV.length} dosya listeleniyor · seçili: <b>${chosen}</b>${live ? '' : ' · “Baserow kaydı” süzgeci için önce Yapı › Baserow canlı sayfasında “Baserow’dan oku” yap'}</p>
    <div class="tw"><table><thead><tr><th><input type="checkbox" data-dsall="1" aria-label="Listelenenlerin hepsini seç"${allOn ? ' checked' : ''}></th><th>Dosya</th><th>Proje</th><th>Konu klasörü</th><th>Tür</th><th>Biçim</th><th>Boyut</th><th>Tarih</th><th>Baserow</th><th></th></tr></thead><tbody>${L.map(d => { const b = bmHas(d); return `<tr><td><input type="checkbox" data-dss="${d.id}" aria-label="Seç"${DS.sel[d.id] ? ' checked' : ''}></td><td>${esc(d.ad)}</td><td>${esc(d.pr)}</td><td>${esc(d.k)}</td><td>${esc(d.t)}</td><td>${esc(d.fmt)}</td><td>${kb(d.boyut)}</td><td>${esc(d.tarih)}</td><td>${b === null ? '–' : b ? '<span class="pill ok">kayıtlı</span>' : '<span class="pill warn">kaydı yok</span>'}</td><td><a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener noreferrer">Aç</a></td></tr>`; }).join('')}</tbody></table></div>${L.length ? '' : '<p class="note">Bu süzgeçle dosya yok.</p>'}`;
  };
  views.dosya = function () {
    return `<div class="demo">Dosya ara: Google Drive’daki SURECYONETIM klasörünün dosya listesi (${DRV.length} dosya, ${DRV.length ? 'anlık görüntü' : ''}). Arayabilir, süzebilir, istediklerini seçip linklerini kopyalayabilir veya CSV alabilirsin. Dosyalar Drive’da durur; Baserow’da yalnız link tutulur.</div>
    <section class="panel"><div class="gtools"><input id="dsq" type="search" value="${esc(DS.q)}" placeholder="Dosya adı, proje, klasör veya tür ara…" aria-label="Dosya ara" style="min-width:240px">${sel('proje', 'Proje', uniq(d => d.pr))}${sel('konu', 'Konu', uniq(d => d.k))}${sel('tur', 'Tür', uniq(d => d.t))}${sel('fmt', 'Biçim', uniq(d => d.fmt))}${sel('kaynak', 'Kaynak', uniq(d => d.src))}<label class="note">Baserow kaydı <select data-dsf="bm"><option value="">hepsi</option><option value="var"${DS.bm === 'var' ? ' selected' : ''}>kayıtlı</option><option value="yok"${DS.bm === 'yok' ? ' selected' : ''}>kaydı yok</option></select></label><button type="button" class="btn ghost" data-dsx="reset">Süzgeci temizle</button></div>
    <div class="gtools"><button type="button" class="btn" data-dsx="links">Seçilenlerin linkleri</button><button type="button" class="btn" data-dsx="csv">Seçilenleri CSV yap</button><button type="button" class="btn ghost" data-dsx="clear">Seçimi temizle</button></div>
    <div id="dsout">${DS.out ? `<textarea id="dstext" rows="6" style="width:100%" readonly>${esc(DS.out)}</textarea> <button type="button" class="btn" data-dsx="copy">Panoya kopyala</button>` : ''}</div>
    <div id="dslist">${list()}</div></section>`;
  };
  const chosenRows = () => { const L = DRV.filter(d => DS.sel[d.id]); return L.length ? L : filt(); };
  const csvCell = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';
  const refresh = () => { const el = document.getElementById('dslist'); if (el) el.innerHTML = list(); const o = document.getElementById('dsout'); if (o) o.innerHTML = DS.out ? `<textarea id="dstext" rows="6" style="width:100%" readonly>${esc(DS.out)}</textarea> <button type="button" class="btn" data-dsx="copy">Panoya kopyala</button>` : ''; };
  document.addEventListener('input', e => { if (e.target && e.target.id === 'dsq') { DS.q = e.target.value; const el = document.getElementById('dslist'); if (el) el.innerHTML = list(); } });
  document.addEventListener('change', e => {
    const t = e.target; if (!t || !t.closest) return;
    if (t.dataset && t.dataset.dsf) { DS[t.dataset.dsf] = t.value; refresh(); }
    else if (t.dataset && t.dataset.dsall) { filt().forEach(d => { if (t.checked) DS.sel[d.id] = 1; else delete DS.sel[d.id]; }); refresh(); }
    else if (t.dataset && t.dataset.dss) { if (t.checked) DS.sel[t.dataset.dss] = 1; else delete DS.sel[t.dataset.dss]; refresh(); }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-dsx]'); if (!b) return; const a = b.dataset.dsx;
    if (a === 'reset') { Object.assign(DS, { q: '', proje: '', konu: '', fmt: '', tur: '', kaynak: '', bm: '' }); route(); }
    else if (a === 'clear') { DS.sel = {}; DS.out = ''; refresh(); }
    else if (a === 'links') { DS.out = chosenRows().map(d => d.ad + '\t' + d.url).join('\n'); refresh(); }
    else if (a === 'csv') { DS.out = ['Dosya;Proje;Konu klasörü;Tür;Biçim;Tarih;Link'].concat(chosenRows().map(d => [d.ad, d.pr, d.k, d.t, d.fmt, d.tarih, d.url].map(csvCell).join(';'))).join('\n'); refresh(); }
    else if (a === 'copy') { const t = document.getElementById('dstext'); if (!t) return; t.select(); try { navigator.clipboard.writeText(t.value).catch(() => document.execCommand('copy')); } catch (x) { try { document.execCommand('copy'); } catch (y) {} } b.textContent = 'Kopyalandı'; }
  });
  /* menü: ③ Drive altına */
  const dr = SECS3.find(s => s[0] === 'drive'); if (dr && !dr[2].some(t => t[0] === 'dosya')) dr[2].unshift(['dosya', 'Dosya ara']);
  const cs = SECS3.find(s => s[0] === 'is'); if (cs && !cs[2].some(t => t[0] === 'dosya')) cs[2].splice(4, 0, ['dosya', 'Dosya ara (tüm Drive)']);
  window.V25TEST = () => {
    const f = [];
    if (DRV.length < 50) f.push('liste kısa');
    try { const h = views.dosya(); if (!/Dosya ara/.test(h) || !/<table>/.test(h)) f.push('görünüm'); } catch (x) { f.push(x.message); }
    DS.q = 'LOI'; const n1 = filt().length; DS.q = ''; DS.proje = 'P08-FAS-BUGDAY'; const n2 = filt().length; DS.proje = '';
    if (!(n1 > 0 && n1 < DRV.length)) f.push('arama çalışmadı'); if (!(n2 > 0 && n2 < DRV.length)) f.push('proje süzgeci çalışmadı');
    return f.length ? f.join('; ') : true;
  };
})();
