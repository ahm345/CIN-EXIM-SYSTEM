
/* ===================== v18: EVRAK ARA, KOLON KATEGORİLERİ ===================== */
(function () {
const BEL = __BEL__, CAT = __CAT__;
const LK = 'cin-evrak';
let EV = {}; try { EV = JSON.parse(localStorage.getItem(LK) || '{}') || {}; } catch (e) {}
const svE = () => { try { localStorage.setItem(LK, JSON.stringify(EV)); } catch (e) {} };
const FM = [['pdf', 'PDF'], ['word', 'Word'], ['excel', 'Excel'], ['resim', 'Resim'], ['video', 'Video'], ['diger', 'Diğer']];
const fmOf = u => { const s = (u || '').toLowerCase(); return /\.pdf|\/pdf/.test(s) ? 'pdf' : /\.docx?|document\/d|wordprocessing/.test(s) ? 'word' : /\.xlsx?|spreadsheets|csv/.test(s) ? 'excel' : /\.(png|jpe?g|gif|webp|heic)/.test(s) ? 'resim' : /\.(mp4|mov|avi|mkv)|youtu/.test(s) ? 'video' : s ? 'diger' : ''; };
/* örnek evrak kütüphanesi (şablon/örnek; gerçek dosya yok, Drive linki eklenecek) */
const LIB = [
 ['Proforma fatura (örnek)', 'Proforma Fatura', 'word'], ['Ticari fatura (örnek)', 'Ticari Fatura', 'word'], ['Paketleme listesi (örnek)', 'Paketleme Listesi', 'excel'],
 ['Menşe şahadetnamesi (örnek)', 'Menşe Şahadetnamesi', 'pdf'], ['Demiryolu konşimentosu CIM/SMGS (örnek)', 'Demiryolu Konşimentosu (CIM/SMGS)', 'pdf'],
 ['Deniz konşimentosu B/L (örnek)', 'Deniz Konşimentosu (B/L)', 'pdf'], ['Karayolu CMR (örnek)', 'Karayolu Taşıma Belgesi (CMR)', 'pdf'], ['Hava taşıma senedi AWB (örnek)', 'Hava Taşıma Senedi (AWB)', 'pdf'],
 ['Satış sözleşmesi şablonu', 'Satış Sözleşmesi', 'word'], ['Komisyon sözleşmesi şablonu', 'Komisyon Sözleşmesi', 'word'], ['Akreditif (LC) talimat örneği', 'LC Akreditif Talimatı', 'pdf'],
 ['Sigorta poliçesi örneği', 'Sigorta Poliçesi', 'pdf'], ['Gümrük beyannamesi örneği', 'Gümrük Beyannamesi', 'pdf'], ['Ekspertiz / kalite sertifikası örneği', 'Kalite / Ekspertiz Raporu', 'pdf'],
 ['Fitosaniter sertifikası örneği (tarım ürünü)', 'Fitosaniter Sertifikası', 'pdf'], ['Yükleme fotoğrafı örneği', 'Fotoğraf', 'resim'], ['Teslim tutanağı video örneği', 'Video', 'video'], ['Maliyet hesap tablosu şablonu', 'Maliyet Tablosu', 'excel']
].map((x, i) => ({ id: 'L' + i, ad: x[0], tur: x[1], durum: 'Örnek', tarih: '', proje: [], fmt: x[2], lib: 1, dk: '' }));
const ALL = () => BEL.map(b => ({ id: 'B' + b.id, ad: b.ad, tur: b.tur || '', durum: b.durum || '', tarih: b.tarih || '', proje: b.proje || [], fmt: '', lib: 0, dk: b.dosya ? 'Dosya var' : b.dosya_kontrolu || '', not: b.not || '' })).concat(LIB);
const F = { q: '', tur: '', durum: '', fmt: '', src: '', dosya: '' };
const rec = d => Object.assign({ link: '' }, EV[d.id] || {});
function filt() {
  const q = F.q.trim().toLowerCase();
  return ALL().filter(d => { const r = rec(d), fm = d.fmt || fmOf(r.link);
    return (!q || (d.ad + ' ' + d.tur + ' ' + (d.not || '')).toLowerCase().includes(q)) && (!F.tur || d.tur === F.tur) && (!F.durum || d.durum === F.durum) && (!F.fmt || fm === F.fmt) && (!F.src || (F.src === 'lib' ? d.lib : !d.lib)) && (!F.dosya || (F.dosya === 'var' ? !!r.link : !r.link)); });
}
const sel = (id, lab, opts, v) => `<label class="note">${lab} <select data-evf="${id}" aria-label="${lab}"><option value="">Hepsi</option>${opts.map(o => `<option value="${esc(Array.isArray(o) ? o[0] : o)}"${v === (Array.isArray(o) ? o[0] : o) ? ' selected' : ''}>${esc(Array.isArray(o) ? o[1] : o)}</option>`).join('')}</select></label>`;
function listHtml() {
  const L = filt(), all = ALL(), withL = all.filter(d => rec(d).link).length;
  return `<p class="note" style="margin:0 0 6px">${L.length} / ${all.length} evrak · Drive linki eklenen: ${withL}</p>` + (L.length ? L.map(d => { const r = rec(d), fm = d.fmt || fmOf(r.link), dc = d.dk;
    return `<div class="evc"><div class="evh"><b>${esc(d.ad)}</b>${d.lib ? ' <span class="pill info">örnek/şablon</span>' : ''}${fm ? ` <span class="pill">${(FM.find(x => x[0] === fm) || [0, fm])[1]}</span>` : ''}</div><div class="note">${esc(d.tur)}${d.durum && !d.lib ? ' · ' + esc(d.durum) : ''}${d.tarih ? ' · ' + esc(d.tarih) : ''}${d.proje.length ? ' · ' + esc(d.proje.join(', ').replace(' (DEMO)', '')) : ''}</div>${!d.lib ? `<div class="note">Baserow dosya durumu: <b>${esc(dc || '—')}</b></div>` : ''}${d.not ? `<div class="note">${esc(d.not)}</div>` : ''}<div class="evl">${r.link ? `<a class="btn" href="${esc(r.link)}" target="_blank" rel="noopener noreferrer">Drive’da aç</a> <button type="button" class="btn ghost" data-evx="${d.id}">Linki kaldır</button>` : `<input data-evl="${d.id}" type="url" placeholder="Drive / dosya linki yapıştır" aria-label="Link"> <button type="button" class="btn ghost" data-evs="${d.id}">Kaydet</button>`}</div></div>`; }).join('') : '<p class="note">Bu süzgeçle evrak yok.</p>');
}
views.evrak = function () {
  const all = ALL(), turs = [...new Set(all.map(d => d.tur).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr')), dur = [...new Set(all.map(d => d.durum).filter(Boolean))];
  return `<div class="demo">Evrak ara: Baserow Belgeler tablosunun 52 satırı (2026-11-17 okuması, salt okunur) ve örnek/şablon kütüphanesi. Dosyalar Google Drive’da durur; Baserow’da yalnız link tutulur. Şu an Belgeler’de Drive linki sütunu YOK, bu yüzden linkleri burada denemek için yazabilirsin (yalnız bu tarayıcıda kalır). Kalıcı olması için Baserow’a “Drive Linki”, “Format” ve “Örnek mi” sütunları eklenmeli (onay gerekir).</div>
  <section class="panel"><div class="gtools"><input id="evq" type="search" value="${esc(F.q)}" placeholder="Evrak adı, tür veya not ara…" aria-label="Evrak ara" style="min-width:220px">${sel('tur', 'Tür', turs, F.tur)}${sel('durum', 'Durum', dur, F.durum)}${sel('fmt', 'Format', FM, F.fmt)}${sel('src', 'Kaynak', [['bm', 'Baserow evrakı'], ['lib', 'Örnek / şablon']], F.src)}${sel('dosya', 'Drive linki', [['var', 'Var'], ['yok', 'Yok']], F.dosya)}<button type="button" class="btn ghost" id="evr">Süzgeci temizle</button></div><div id="evlist">${listHtml()}</div></section>`;
};
/* kolon kategorileri */
const CL = { g: ['Giriş', 'ok', 'Elle yazılır/seçilir'], i: ['İlişki', 'info', 'Listeden bağ seçilir, metin yazılmaz'], o: ['Otomatik', 'warn', 'Formül/lookup; asla girilmez'], s: ['Sistem', '', 'Baserow kendi doldurur'], d: ['Dosya', 'info', 'Dosya yüklenir (veya Drive linki)'] };
const KS = { t: '', c: 'is' };
const TC = { is: 'İş tabloları: yalnız Giriş/Dosya kolonlarına girilir', senaryo: 'Senaryo tabloları: kontrollü; hesap motoru kullanır', sistem: 'Sistem (SYS, CHAT): girilmez; yalnız AI protokolüyle ve onayla yazılır', eski: 'Eski / referans: korunur, girilmez' };
const cnt = t => { const o = { g: 0, i: 0, o: 0, s: 0, d: 0 }; t.f.forEach(f => o[f[1]]++); return o; };
views.kolon = function () {
  const T2 = CAT.filter(t => !KS.c || t.c === KS.c), open = KS.t, sum = CAT.reduce((a, t) => { const c = cnt(t); Object.keys(c).forEach(k => a[k] += c[k]); return a; }, { g: 0, i: 0, o: 0, s: 0, d: 0 });
  return `<div class="demo">Kolon kategorileri: Baserow’da bir tablonun bütün kolonlarına girilmez. Her kolon dört sınıftan birine girer. Veri 2026-11-08 şema envanterinden (Git) alındı; canlı şemayla doğrulanmadı. Hiçbir şey değiştirilmez.</div>
  <section class="panel"><p style="margin:0 0 8px">${CAT.length} tablo, ${CAT.reduce((a, t) => a + t.f.length, 0)} kolon: ${Object.keys(CL).map(k => `<span class="pill ${CL[k][1]}">${CL[k][0]} ${sum[k]}</span>`).join(' ')}</p>
  <div class="gtools">${Object.keys(TC).map(k => `<button type="button" class="rc${KS.c === k ? ' on' : ''}" data-kc="${k}">${{ is: 'İş', senaryo: 'Senaryo', sistem: 'Sistem / CHAT', eski: 'Eski' }[k]} (${CAT.filter(t => t.c === k).length})</button>`).join('')}</div><p class="note" style="margin:6px 0">${TC[KS.c]}</p>
  ${T2.map(t => { const c = cnt(t), on = open === t.id; return `<details class="wk" data-kt="${t.id}"${on ? ' open' : ''}><summary><span><b>${esc(t.n)}</b> <span class="note">${esc(t.g.replace(/^\d+ /, ''))}</span></span><small>${t.f.length} kolon</small></summary><div class="wkb"><p style="margin:0 0 6px">${Object.keys(CL).filter(k => c[k]).map(k => `<span class="pill ${CL[k][1]}" title="${esc(CL[k][2])}">${CL[k][0]} ${c[k]}</span>`).join(' ')}</p>${t.c === 'is' || t.c === 'senaryo' ? Object.keys(CL).filter(k => c[k]).map(k => `<div class="pgy"><span class="note"><b>${CL[k][0]}</b>: ${CL[k][2]}</span><div class="pncl">${t.f.filter(f => f[1] === k).map(f => `<span class="rc${f[3] ? ' on' : ''}" title="${esc(f[2])}">${esc(f[0])}</span>`).join('')}</div></div>`).join('') : '<p class="note">Bu tabloda kolon girişi yapılmaz.</p>'}</div></details>`; }).join('')}</section>`;
};
/* Giriş formuna kısa uyarı */
const g0 = views.giris;
views.giris = function () {
  let b = ''; try { const T3 = ftab(), ct = CAT.find(t => t.id === T3.id); if (ct) { const c = cnt(ct); b = `<p class="note" style="margin:0 0 8px">Bu formda yalnız <b>Giriş</b> kolonları var. Gösterilmeyen: ${c.i} ilişki (bağ listeden seçilir), ${c.o} otomatik (formül/lookup), ${c.s} sistem kolonu. Sistem (SYS, CHAT) tablolarına buradan girilmez.</p>`; } } catch (e) {}
  return b + g0();
};
document.addEventListener('input', e => { const t = e.target; if (t.id === 'evq') { F.q = t.value; document.getElementById('evlist').innerHTML = listHtml(); } });
document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.evf) { F[t.dataset.evf] = t.value; document.getElementById('evlist').innerHTML = listHtml(); } });
document.addEventListener('click', e => { const X = e.target; if (!X.closest) return; let b;
  if (X.id === 'evr') { Object.keys(F).forEach(k => F[k] = ''); route(); return; }
  if ((b = X.closest('[data-evs]'))) { const i = b.dataset.evs, v = (document.querySelector(`[data-evl="${i}"]`) || {}).value || ''; if (/^https?:\/\//i.test(v.trim())) { EV[i] = { link: v.trim() }; svE(); document.getElementById('evlist').innerHTML = listHtml(); } else { b.textContent = 'https:// ile başlamalı'; } return; }
  if ((b = X.closest('[data-evx]'))) { delete EV[b.dataset.evx]; svE(); document.getElementById('evlist').innerHTML = listHtml(); return; }
  if ((b = X.closest('[data-kc]'))) { KS.c = b.dataset.kc; route(); return; }
}, true);
window.EVTEST = () => { try { return ALL().length === 52 + LIB.length && CAT.length === 44 ? true : 'veri sayısı tutmuyor'; } catch (x) { return x.message; } };
})();
