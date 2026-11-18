
/* ===================== v8: SÜREÇ TASARIM VARYANTLARI (surec1..surec4) ===================== */
(function () {
const V = { k1: null, f2: { st: '', stage: '', q: '', open: {} }, s3: 'Devam Ediyor', c4: null };
const stCls = s => !s.ok ? 'off' : s.d === 'Tamam' ? 'ok' : s.d === 'Devam Ediyor' ? 'info' : 'mut';
const byN = n => IS2.steps.find(s => s.n === +n);
const who = s => (s.r || '—').split(' / ')[0].replace(/\s*\(DEMO\)/, '').trim() || '—';
const body = s => `<div class="why"><b>Aşama</b> ${esc(s.a)} · <b>Sorumlu</b> ${esc(s.r || '—')}${s.f.length ? ' · ' + esc(s.f.join(', ')) : ''}</div><div class="why"><b>Vade</b> ${esc(s.v || 'girilmemiş')} · <b>Kontrol</b> ${esc(s.k || '—')}</div>${s.o ? `<div class="why"><b>Varlık olayı</b> ${esc(s.o)} · ${esc(s.ok2)}</div>` : ''}${s.m.length ? `<div class="why"><b>Makine</b> ${esc(s.m.join(', '))}</div>` : ''}${s.not ? `<div class="why"><b>Not</b> ${esc(s.not)}</div>` : ''}${!s.ok ? '<div class="why" style="color:var(--warn)">Seçili proje modeline uygun değil (sayılmıyor)</div>' : ''}${window.relBox && s.ok ? window.relBox('s:' + s.n) : ''}`;
const hdr = (t, d) => `<div class="demo">${d}</div>`;
const legend = '<p class="note" style="margin:0 0 8px"><span class="pill ok">Tamam</span> <span class="pill info">Devam ediyor</span> <span class="pill">Bekliyor</span> <span class="pill" style="opacity:.55">Sayılmıyor</span></p>';

/* 1) PANO: aşama sütunları, adım kartları */
views.surec1 = function () {
  const ST = stages(), sel = V.k1 ? byN(V.k1) : null;
  return hdr('', 'Tasarım 1 · Pano. Her aşama bir sütun, her adım bir kart. Karta bas, altta açılır. Sütunları yana kaydır.') + legend +
    `<div class="kb">${ST.map(g => `<div class="kbc"><div class="kbh"><b>${g.n}. ${esc(g.name)}</b><span class="note">${g.done}/${g.valid} tamam</span><span class="hbar ${g.cls === 'ok' ? 'ok' : 'info'}"><span class="tr" style="grid-column:1/-1"><i style="width:${g.valid ? g.done / g.valid * 100 : 0}%"></i></span></span></div>${g.steps.map(s => `<button type="button" class="kbk ${stCls(s)}${V.k1 === s.n ? ' on' : ''}" data-k1="${s.n}"><span class="mono">${s.n}</span> ${esc(s.ad.length > 70 ? s.ad.slice(0, 69) + '…' : s.ad)}${s.v ? `<small>vade ${esc(s.v)}</small>` : ''}</button>`).join('')}</div>`).join('')}</div>` +
    `<section class="panel" style="margin-top:12px"><h2>${sel ? esc(sel.n + '. ' + sel.ad) : 'Seçili adım'}</h2>${sel ? `<p style="margin:0 0 6px">${pill(sel.d)}</p>${body(sel)}${rq('s:' + sel.n, sel.n + '. ' + sel.ad)}` : '<p class="note" style="margin:0">Bir karta bas.</p>'}</section>`;
};
/* 2) TABLO: filtreli, satıra basınca altında açılır */
function t2rows() {
  const f = V.f2, q = f.q.trim().toLowerCase();
  const L = IS2.steps.filter(s => (!f.st || (f.st === 'sayilmiyor' ? !s.ok : s.ok && s.d === f.st)) && (!f.stage || String(parseInt(s.a, 10)) === f.stage) && (!q || (s.ad + ' ' + (s.r || '')).toLowerCase().includes(q)));
  return `<table><thead><tr><th>#</th><th>Adım</th><th>Aşama</th><th>Durum</th><th>Sorumlu</th><th>Vade</th></tr></thead><tbody>${L.map(s => `<tr class="k2r ${stCls(s)}" data-k2="${s.n}" tabindex="0"><td class="mono">${s.n}</td><td>${f.open[s.n] ? '▾ ' : '▸ '}${esc(s.ad)}</td><td>${esc(s.a.replace(/^\d+\s*/, ''))}</td><td>${s.ok ? pill(s.d) : '<span class="pill" style="opacity:.55">Sayılmıyor</span>'}</td><td>${esc(who(s))}</td><td>${esc(s.v || '—')}</td></tr>${f.open[s.n] ? `<tr class="k2x"><td colspan="6">${body(s)}${rq('s:' + s.n, s.n + '. ' + s.ad)}</td></tr>` : ''}`).join('') || '<tr><td colspan="6" class="note">Eşleşen adım yok.</td></tr>'}</tbody></table><p class="note" style="margin:6px 0 0">${L.length} / ${IS2.steps.length} adım</p>`;
}
views.surec2 = function () {
  const f = V.f2, ST = stages();
  return hdr('', 'Tasarım 2 · Tablo. Tüm adımlar tek listede; süz, ara, satıra basınca altında açılır.') +
    `<div class="gtools"><label class="note">Durum <select id="k2st" aria-label="Durum"><option value="">Hepsi</option>${['Devam Ediyor', 'Bekliyor', 'Tamam'].map(x => `<option${f.st === x ? ' selected' : ''}>${x}</option>`).join('')}<option value="sayilmiyor"${f.st === 'sayilmiyor' ? ' selected' : ''}>Sayılmıyor</option></select></label>
    <label class="note">Aşama <select id="k2sg" aria-label="Aşama"><option value="">Hepsi</option>${ST.map(g => `<option value="${g.n}"${f.stage === String(g.n) ? ' selected' : ''}>${g.n}. ${esc(g.name)}</option>`).join('')}</select></label>
    <label class="note">Ara <input id="k2q" type="search" value="${esc(f.q)}" placeholder="adım veya sorumlu" aria-label="Adım ara"></label><button type="button" class="btn ghost" id="k2all">Hepsini kapat</button></div><section class="panel"><div class="sct" id="k2tbl">${t2rows()}</div></section>`;
};
/* 3) DURUMA GÖRE: devam eden / bekleyen / tamam / sayılmıyor, aşamaya göre gruplu */
views.surec3 = function () {
  const gs = [['Devam Ediyor', s => s.ok && s.d === 'Devam Ediyor'], ['Bekliyor', s => s.ok && s.d === 'Bekliyor'], ['Tamam', s => s.ok && s.d === 'Tamam'], ['Sayılmıyor', s => !s.ok]];
  const cur = gs.find(g => g[0] === V.s3) || gs[0], L = IS2.steps.filter(cur[1]);
  const ST = stages();
  return hdr('', 'Tasarım 3 · Duruma göre. Önce “şimdi ne var” sorusu: bir durum seç, o durumdaki adımlar aşamalarına göre gruplanır ve her biri altında açılır.') +
    `<div class="gtools">${gs.map(g => `<button type="button" class="rc ${g[0] === cur[0] ? 'on' : ''}" data-s3="${g[0]}">${g[0]} <small>${IS2.steps.filter(g[1]).length}</small></button>`).join('')}</div>` +
    (L.length ? ST.map(g => { const l = L.filter(s => parseInt(s.a, 10) === g.n); return l.length ? `<section class="panel" style="margin-bottom:10px"><h2>${g.n}. ${esc(g.name)} <small class="note">${l.length} adım</small></h2>${l.map(stepWk).join('')}</section>` : ''; }).join('') : '<p class="note">Bu durumda adım yok.</p>');
};
/* 4) SORUMLU MATRİSİ: satır = sorumlu, sütun = aşama */
views.surec4 = function () {
  const ST = stages(), rows = [...new Set(IS2.steps.map(who))].sort((a, b) => IS2.steps.filter(s => who(s) === b).length - IS2.steps.filter(s => who(s) === a).length);
  const sel = V.c4 ? V.c4.split('|') : null, L = sel ? IS2.steps.filter(s => who(s) === sel[0] && String(parseInt(s.a, 10)) === sel[1]) : [];
  return hdr('', 'Tasarım 4 · Sorumlu matrisi. Kim hangi aşamada kaç adımdan sorumlu. Bir hücreye bas, altında adımlar açılır. Sorumlu, alanın ilk adı alınarak birleştirildi.') +
    `<section class="panel"><div class="sct"><table class="mx"><thead><tr><th>Sorumlu</th>${ST.map(g => `<th title="${esc(g.name)}">${g.n}</th>`).join('')}<th>Σ</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r)}</td>${ST.map(g => { const l = IS2.steps.filter(s => who(s) === r && parseInt(s.a, 10) === g.n); const open = l.filter(s => s.ok && s.d !== 'Tamam').length; return `<td>${l.length ? `<button type="button" class="mxc ${open ? 'info' : 'ok'}${V.c4 === r + '|' + g.n ? ' on' : ''}" data-c4="${esc(r)}|${g.n}">${l.length}</button>` : '<span class="note">·</span>'}</td>`; }).join('')}<td class="mono">${IS2.steps.filter(s => who(s) === r).length}</td></tr>`).join('')}</tbody></table></div><p class="note" style="margin:6px 0 0">Aşamalar: ${ST.map(g => g.n + ' ' + esc(g.name)).join(' · ')}</p></section>` +
    `<section class="panel" style="margin-top:12px"><h2>${sel ? esc(sel[0]) + ' · aşama ' + esc(sel[1]) : 'Seçili hücre'}</h2>${sel ? L.map(stepWk).join('') : '<p class="note" style="margin:0">Bir hücreye bas.</p>'}</section>`;
};
document.addEventListener('click', e => {
  const T = e.target; if (!T.closest) return; let b;
  if ((b = T.closest('[data-k1]'))) { V.k1 = V.k1 === +b.dataset.k1 ? null : +b.dataset.k1; route(); return; }
  if ((b = T.closest('[data-k2]'))) { if (T.closest('.k2x')) return; V.f2.open[b.dataset.k2] = !V.f2.open[b.dataset.k2]; const t = document.getElementById('k2tbl'); if (t) t.innerHTML = t2rows(); return; }
  if (T.id === 'k2all') { V.f2.open = {}; const t = document.getElementById('k2tbl'); if (t) t.innerHTML = t2rows(); return; }
  if ((b = T.closest('[data-s3]'))) { V.s3 = b.dataset.s3; route(); return; }
  if ((b = T.closest('[data-c4]'))) { V.c4 = V.c4 === b.dataset.c4 ? null : b.dataset.c4; route(); }
});
document.addEventListener('input', e => { if (e.target.id === 'k2q') { V.f2.q = e.target.value; const t = document.getElementById('k2tbl'); if (t) t.innerHTML = t2rows(); } });
document.addEventListener('change', e => { const i = e.target.id; if (i === 'k2st' || i === 'k2sg') { V.f2[i === 'k2st' ? 'st' : 'stage'] = e.target.value; const t = document.getElementById('k2tbl'); if (t) t.innerHTML = t2rows(); } });
})();
