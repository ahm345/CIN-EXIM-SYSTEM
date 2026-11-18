
/* ===================== v9: TASARIM SAYFASI VARYANTLARI (tasarim1..tasarim4) ===================== */
(function () {
const T = window.TAS, V = { w: 1, sel: null, open: null };
const DEMO = 'Aynı demo projeyi farklı biçimlerde düzenlersin; hepsi aynı veriyi kullanır, hiçbiri Baserow\'a yazmaz.';
const hdr = (n, t) => `<div class="demo">Tasarım ${n} · ${t} ${DEMO}</div>`;
const rng = (p, A, i) => p.steps[i].x ? 'dışarıda' : T.dt(p.start, A[i].st).slice(5) + ' → ' + T.dt(p.start, A[i].e).slice(5);
const cls = s => s.x ? 'off' : s.v ? 'ok' : 'info';
const tot = A => Math.max(0, ...A.map(x => x.e));
const tplDays = t => tot(T.sched({ steps: T.mk(t) }));
const tplDepts = t => [...new Set(t.s.map(a => a[1]))];
const nameBox = '<label class="note">Demo adı <input id="dn" placeholder="ör. 40 ekskavatör alım-satım"></label>';
const demoBar = p => `<section class="panel" style="margin-bottom:12px"><div class="gtools">${T.PL.dm.map((q, i) => `<button type="button" class="rc t-f${i === T.PL.ds ? ' on' : ''}" data-dsel="${i}">${esc(q.n)}</button>`).join('') || '<span class="note">Henüz demo proje yok.</span>'}${p ? `<label class="note">Başlangıç <input type="date" data-dp="start" value="${esc(p.start)}"></label><button type="button" class="btn ghost" data-ddel="1">Bu demoyu sil</button>` : ''}</div></section>`;
const tiles = (p, A, F) => `<div class="tiles"><div class="tile"><b data-lt="1">${tot(A)}</b><span>gün toplam</span></div><div class="tile"><b data-le="1">${T.dt(p.start, tot(A))}</b><span>bitiş</span></div><div class="tile warn"><b>${p.steps.filter(s => !s.x && !s.v).length}</b><span>varsayım</span></div><div class="tile ${F.length ? 'crit' : 'ok'}"><b>${F.length}</b><span>kırmızı bayrak</span></div></div>`;
const edRow = (p, A, i, full) => { const s = p.steps[i]; return `<div class="ed ${s.x ? 'off' : ''}"><div class="edh"><b class="mono">${i + 1}</b><input class="pli" style="flex:1;min-width:160px" aria-label="Adım adı" data-de="${i}:n" value="${esc(s.n)}"><select aria-label="Departman" data-de="${i}:d">${T.DEPTS.map(d => `<option${d === s.d ? ' selected' : ''}>${d}</option>`).join('')}</select><input type="number" min="0" style="width:60px" aria-label="Gün" data-de="${i}:g" value="${s.g}"><span class="note">gün</span><label class="note"><input type="checkbox" data-de="${i}:x" ${s.x ? '' : 'checked'}> dahil</label><label class="note"><input type="checkbox" data-de="${i}:v" ${s.v ? 'checked' : ''}> doğrulandı</label><button type="button" class="btn ghost" data-mv="${i}:-1" aria-label="Yukarı">↑</button><button type="button" class="btn ghost" data-mv="${i}:1" aria-label="Aşağı">↓</button><button type="button" class="btn ghost" data-sdel="${i}">sil</button></div>${full !== false ? `<div class="edh" style="margin-top:6px"><label class="note">Önceki <input style="width:80px" aria-label="Önceki adımlar" data-de="${i}:pr" value="${s.pr.map(x => x + 1).join(',')}"></label><label class="note" style="flex:1">Belgeler (;) <input class="pli" style="width:100%" aria-label="Belgeler" data-de="${i}:docs" value="${esc(s.docs.join('; '))}"></label><label class="note">Kayma <input type="number" min="0" style="width:60px" aria-label="Kayma (gün)" data-de="${i}:lag" value="${s.lag || 0}"> gün</label><span class="note" data-ls="${i}">${rng(p, A, i)}</span>${s.k ? '<span class="note">paket: ' + esc(s.k) + '</span>' : ''}</div>` : ''}</div>`; };
const addForm = p => `<div class="sf2"><label class="note">Yeni adım<input id="sn"></label><label class="note">Departman<select id="sd">${T.DEPTS.map(d => `<option>${d}</option>`).join('')}</select></label><label class="note">Gün<input id="sg" type="number" value="5"></label><label class="note">Önceki adım no<input id="sp" placeholder="${p.steps.length}"></label><label class="note">Belgeler (;)<input id="sb"></label><button type="button" class="btn" id="dAdd">Yeni adım ekle</button></div><div class="sf2"><label class="note">Hazır paket <select id="pk">${T.PACK.map(x => `<option value="${x.id}">${esc(x.n)}</option>`).join('')}</select></label><button type="button" class="btn" id="pkAdd">Paketi ekle</button></div>`;
const flagsHtml = F => F.length ? '<ul style="margin:0;padding-left:18px">' + F.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : '<p class="note" style="margin:0">Bayrak yok, kapı açık.</p>';
const pkgBox = (p, A, F) => `<p class="note">Kapı: tüm adımlar doğrulanmış ve bayrak yok. Paketi AI sohbetine yapıştırırsın; Baserow'a ancak sen “evet” yazınca yazılır.</p><button type="button" class="btn" id="dReal" ${F.length ? 'disabled' : ''}>Yazma paketini hazırla</button>${p.pk && !F.length ? `<textarea readonly aria-label="Yazma paketi" style="width:100%;height:170px;margin-top:8px;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:6px;font:12px monospace">${esc(T.pkg(p, A))}</textarea>` : ''}<h3 style="margin-top:12px">Takvim (.ics)</h3><textarea readonly aria-label="Takvim metni" style="width:100%;height:90px;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:6px;font:12px monospace">${esc(T.ics(p, A))}</textarea>`;
const gRow = (p, A, i, btn) => { const s = p.steps[i], t = Math.max(...A.map(x => x.e), 1); const inner = `<span>${esc(s.d)} · ${esc(s.n)}</span><span class="gb"><i class="${s.x ? 'lk' : s.v ? 'ok' : 'op'}" style="margin-left:${A[i].st / t * 100}%;width:${Math.max((A[i].e - A[i].st) / t * 100, 1.2)}%"></i></span><span class="code">${T.dt(p.start, A[i].st).slice(5)}→${T.dt(p.start, A[i].e).slice(5)}</span>`; return btn ? `<button type="button" class="gr gbtn${V.sel === i ? ' on' : ''}" data-tsel="${i}">${inner}</button>` : `<div class="gr">${inner}</div>`; };
const tplCard = (t, i) => `<div class="tpc"><b>${esc(t.n)}</b><span class="note">${t.s.length} adım · ${tplDays(t)} gün</span><div class="tpd">${tplDepts(t).map(d => `<span class="pill">${esc(d)}</span>`).join('') || '<span class="note">boş</span>'}</div><div class="tpm">${t.s.map(a => `<i style="flex:${Math.max(a[2], 1)}"></i>`).join('')}</div><button type="button" class="btn" data-nd="${i}">Kopyala → demo aç</button></div>`;
const noDemo = () => `<section class="panel"><h2>Önce bir şablon seç</h2><div class="sf2">${nameBox}</div><div class="tpg">${T.TPL.map(tplCard).join('')}</div></section>`;
const need = n => { const p = T.cur(); return p ? p : null; };


/* sürüklenebilir Gantt: çubuğu kaydır = başlangıç kayması, sağ kenar = süre */
const ganttD = (p, A, selI) => {
  const t = Math.max(tot(A), 1) * 1.08, stp = t > 120 ? 30 : t > 60 ? 10 : 5, tk = []; for (let d = 0; d <= t; d += stp) tk.push(d);
  return `<div class="gantt"><div class="gr gd gax"><span></span><span class="gt">${tk.map(d => `<u style="left:${(d / t * 100).toFixed(2)}%">${d}</u>`).join('')}</span><span class="note">gün ${'\u2192'}</span></div>${p.steps.map((s, i) => `<div class="gr gd${selI === i ? ' sel' : ''}"><button type="button" class="gl" data-tsel="${i}" title="${esc(s.n)}">${i + 1}. ${esc(s.d)} · ${esc(s.n)}</button><span class="gt" data-tot="${t}"><i class="gbar ${cls(s)}" data-gi="${i}" style="left:${(A[i].st / t * 100).toFixed(2)}%;width:${Math.max((A[i].e - A[i].st) / t * 100, 1.2).toFixed(2)}%" title="Kaydır: başlangıç, sağ kenar: süre"><em data-gv="${i}">${s.x ? '—' : s.g + 'g'}</em><b class="gh" data-gh="${i}"></b></i></span><span class="code" data-ls="${i}">${rng(p, A, i)}</span></div>`).join('')}<p class="note" style="margin:6px 0 0">Çubuğu sağa/sola sürükle: başlangıç kayar (önceki adım bitmeden başlayamaz). Sağ kenarından çek: süre değişir. Alttaki tablo ve toplam süre anında güncellenir.</p></div>`;
};
function live(p, t) {
  const A = T.sched(p);
  document.querySelectorAll('[data-gi]').forEach(el => { const i = +el.dataset.gi; if (!p.steps[i]) return; el.style.left = (A[i].st / t * 100).toFixed(2) + '%'; el.style.width = Math.max((A[i].e - A[i].st) / t * 100, 1.2).toFixed(2) + '%'; });
  document.querySelectorAll('[data-gv]').forEach(el => { const s = p.steps[+el.dataset.gv]; if (s) el.textContent = s.x ? '—' : s.g + 'g' + ((s.lag || 0) ? ' · +' + s.lag : ''); });
  document.querySelectorAll('[data-ls]').forEach(el => { el.textContent = rng(p, A, +el.dataset.ls); });
  document.querySelectorAll('input[data-de]').forEach(el => { const [i, f] = el.dataset.de.split(':'); const s = p.steps[+i]; if (!s) return; if (f === 'g') el.value = s.g; if (f === 'lag') el.value = s.lag || 0; });
  document.querySelectorAll('[data-lt]').forEach(el => { el.textContent = tot(A); });
  document.querySelectorAll('[data-le]').forEach(el => { el.textContent = T.dt(p.start, tot(A)); });
}
let D = null;
document.addEventListener('pointerdown', e => {
  const b = e.target.closest && e.target.closest('[data-gi]'); if (!b || document.body.classList.contains('pnpick')) return;
  const p = T.cur(); if (!p) return; const i = +b.dataset.gi, s = p.steps[i]; if (!s || s.x) return;
  const tr = b.parentElement, w = tr.getBoundingClientRect().width || 1, t = +tr.dataset.tot, h = !!e.target.closest('[data-gh]');
  D = { i, mode: h ? 'g' : 'lag', x0: e.clientX, v0: h ? s.g : (s.lag || 0), dp: w / t, t, p, moved: 0 };
  try { b.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); e.stopPropagation();
}, true);
document.addEventListener('pointermove', e => {
  if (!D) return; const dx = e.clientX - D.x0; if (Math.abs(dx) > 3) D.moved = 1; if (!D.moved) return;
  const dd = Math.round(dx / D.dp), s = D.p.steps[D.i];
  if (D.mode === 'g') s.g = Math.max(1, D.v0 + dd); else s.lag = Math.max(0, D.v0 + dd);
  live(D.p, D.t);
});
const endDrag = () => { if (!D) return; const d = D; D = null; if (d.moved) { T.savePL(); d.p.pk = false; } V.sel = d.i; route(); };
document.addEventListener('pointerup', endDrag); document.addEventListener('pointercancel', endDrag);

T.ganttD = ganttD; T.tiles = tiles;
/* 1) SİHİRBAZ */
views.tasarim1 = function () {
  if (V.n !== undefined && T.PL.dm.length > V.n && V.w === 1) V.w = 2; V.n = T.PL.dm.length;
  const p = T.cur(), steps = ['Şablon', 'Adımlar', 'Kontrol', 'Paket'];
  let h = hdr(1, 'Sihirbaz. Dört adımda ilerlersin.') + `<div class="wz">${steps.map((x, i) => `<button type="button" class="wzs${V.w === i + 1 ? ' on' : ''}${i + 1 < V.w ? ' dn' : ''}" data-w="${i + 1}"><b>${i + 1}</b> ${x}</button>`).join('')}</div>`;
  if (V.w === 1 || !p) return h + demoBar(p) + noDemo();
  const A = T.sched(p), F = T.flags(p);
  h += demoBar(p) + tiles(p, A, F);
  if (V.w === 2) h += `<section class="panel"><h2>Adımları düzenle</h2>${p.steps.map((_, i) => edRow(p, A, i)).join('') || '<p class="note">Adım yok.</p>'}${addForm(p)}</section>`;
  if (V.w === 3) h += `<section class="panel"><h2>Kontrol</h2><h3>Kırmızı bayraklar</h3>${flagsHtml(F)}<h3 style="margin-top:12px">Gantt</h3>${p.steps.map((_, i) => gRow(p, A, i)).join('')}<p class="note" style="margin:8px 0 0">Yeşil doğrulandı, mavi varsayım, gri dışarıda. Doğrulamak için “Adımlar”a dön.</p></section>`;
  if (V.w === 4) h += `<section class="panel"><h2>Gerçek projeye çevir</h2>${pkgBox(p, A, F)}</section>`;
  return h + `<p style="margin:10px 0"><button type="button" class="btn ghost" data-w="${Math.max(1, V.w - 1)}">← Geri</button> <button type="button" class="btn" data-w="${Math.min(4, V.w + 1)}">İleri →</button></p>`;
};
/* 2) GALERİ */
views.tasarim2 = function () {
  const p = T.cur();
  let h = hdr(2, 'Galeri. Şablonlar kart, demolar kart; açınca altında düzenlenir.') + `<section class="panel" style="margin-bottom:12px"><h2>Şablonlar</h2><div class="sf2">${nameBox}</div><div class="tpg">${T.TPL.map(tplCard).join('')}</div></section>`;
  h += `<section class="panel"><h2>Demo projelerim</h2>${T.PL.dm.length ? T.PL.dm.map((q, i) => { const A = T.sched(q), F = T.flags(q), on = V.open === i; return `<div class="dmc${on ? ' on' : ''}"><div class="dmh"><b>${esc(q.n)}</b><span class="note">${q.steps.length} adım · ${tot(A)} gün · ${T.dt(q.start, tot(A))}</span><span class="pill ${F.length ? 'crit' : 'ok'}">${F.length} bayrak</span><button type="button" class="btn ${on ? 'ghost' : ''}" data-t2="${i}">${on ? 'Kapat' : 'Aç ve düzenle'}</button></div>${on ? (T.PL.ds = i, `<div class="dmb">${tiles(q, A, F)}${q.steps.map((_, j) => edRow(q, A, j)).join('')}${addForm(q)}<h3 style="margin-top:12px">Kırmızı bayraklar</h3>${flagsHtml(F)}<h3 style="margin-top:12px">Gerçek projeye çevir</h3>${pkgBox(q, A, F)}</div>`) : ''}</div>`; }).join('') : '<p class="note">Henüz demo yok. Bir şablon kartından kopyala.</p>'}</section>`;
  return h;
};
/* 3) GANTT ÖNCELİKLİ */
views.tasarim3 = function () {
  const p = T.cur(); let h = hdr(3, 'Gantt öncelikli. Çubuğu sürükle (başlangıç) veya sağ kenarından çek (süre); çubuğa basınca altında o adımı düzenlersin.');
  if (!p) return h + demoBar(p) + noDemo();
  const A = T.sched(p), F = T.flags(p);
  return h + demoBar(p) + tiles(p, A, F) + `<section class="panel" style="margin-bottom:12px"><h2>Zaman çizelgesi (sürüklenebilir)</h2>${ganttD(p, A, V.sel)}</section><section class="panel" style="margin-bottom:12px"><h2>${V.sel != null && p.steps[V.sel] ? esc((V.sel + 1) + '. ' + p.steps[V.sel].n) : 'Seçili adım'}</h2>${V.sel != null && p.steps[V.sel] ? edRow(p, A, V.sel) : '<p class="note" style="margin:0">Yukarıda bir çubuğa bas.</p>'}</section><section class="panel" style="margin-bottom:12px"><h2>Yeni adım ve paket</h2>${addForm(p)}</section><section class="panel"><h2>Bayraklar ve paket</h2>${flagsHtml(F)}<div style="margin-top:10px">${pkgBox(p, A, F)}</div></section>`;
};
/* 4) DEPARTMAN ŞERİTLERİ */
views.tasarim4 = function () {
  const p = T.cur(); let h = hdr(4, 'Departman şeritleri. Her departman bir sütun; karta bas, altta düzenle.');
  if (!p) return h + demoBar(p) + noDemo();
  const A = T.sched(p), F = T.flags(p);
  return h + demoBar(p) + tiles(p, A, F) + `<div class="kb">${T.DEPTS.map(d => { const l = p.steps.map((s, i) => i).filter(i => p.steps[i].d === d).sort((a, b) => A[a].st - A[b].st); return `<div class="kbc"><div class="kbh"><b>${d}</b><span class="note">${l.length} adım · ${l.reduce((a, i) => a + (p.steps[i].x ? 0 : p.steps[i].g), 0)} gün</span></div>${l.map(i => `<button type="button" class="kbk ${cls(p.steps[i])}${V.sel === i ? ' on' : ''}" data-tsel="${i}"><span class="mono">${i + 1}</span> ${esc(p.steps[i].n)}<small>${p.steps[i].x ? 'dışarıda' : T.dt(p.start, A[i].st).slice(5) + ' → ' + T.dt(p.start, A[i].e).slice(5) + ' · ' + p.steps[i].g + ' gün'}</small></button>`).join('') || '<span class="note">adım yok</span>'}</div>`; }).join('')}</div><section class="panel" style="margin-top:12px"><h2>${V.sel != null && p.steps[V.sel] ? esc((V.sel + 1) + '. ' + p.steps[V.sel].n) : 'Seçili adım'}</h2>${V.sel != null && p.steps[V.sel] ? edRow(p, A, V.sel) : '<p class="note" style="margin:0">Bir karta bas.</p>'}</section><section class="panel" style="margin-top:12px"><h2>Yeni adım, bayraklar, paket</h2>${addForm(p)}<h3>Kırmızı bayraklar</h3>${flagsHtml(F)}<div style="margin-top:10px">${pkgBox(p, A, F)}</div></section>`;
};

/* 5) STÜDYO: orta alan + daralan/genişleyen sağ denetçi paneli */
V.rw = 380; V.rc = false;
views.tasarim5 = function () {
  const p = T.cur(); let h = hdr(5, 'Stüdyo. Sağdaki paneli ▶ ile daralt, ayırıcıdan sürükleyip genişlet; orta alan otomatik büyür. Gantt çubuğunu sürükle: tablo ve sayılar canlı değişir.');
  if (!p) return h + demoBar(p) + noDemo();
  const A = T.sched(p), F = T.flags(p), sel = V.sel != null && p.steps[V.sel] ? V.sel : null;
  const mid = tiles(p, A, F) + `<section class="panel" style="margin-bottom:12px"><h2>Zaman çizelgesi</h2>${ganttD(p, A, sel)}</section><section class="panel"><h2>Adım tablosu</h2><div class="sct"><table><thead><tr><th>#</th><th>Adım</th><th>Departman</th><th>Gün</th><th>Kayma</th><th>Başlangıç → Bitiş</th><th>✓</th></tr></thead><tbody>${p.steps.map((s, i) => `<tr class="${sel === i ? 'k2x' : ''}"><td class="mono">${i + 1}</td><td><button type="button" class="gl" style="max-width:260px" data-tsel="${i}">${esc(s.n)}</button></td><td>${esc(s.d)}</td><td><input type="number" min="0" style="width:58px" aria-label="Gün" data-de="${i}:g" value="${s.g}"></td><td><input type="number" min="0" style="width:58px" aria-label="Kayma" data-de="${i}:lag" value="${s.lag || 0}"></td><td class="mono" data-ls="${i}">${rng(p, A, i)}</td><td><input type="checkbox" aria-label="Doğrulandı" data-de="${i}:v" ${s.v ? 'checked' : ''}></td></tr>`).join('')}</tbody></table></div></section>`;
  const side = wk('ws1', '<span>Seçili adım</span>', sel != null ? edRow(p, A, sel) : '<p class="note" style="margin:0">Gantt çubuğuna veya tablodaki bir adıma bas.</p>', true) + wk('ws2', '<span>Yeni adım ve paket</span>', addForm(p), false) + wk('ws3', `<span>Kırmızı bayraklar</span><span class="pill ${F.length ? 'crit' : 'ok'}">${F.length}</span>`, flagsHtml(F), true) + wk('ws4', '<span>Yazma paketi ve takvim</span>', pkgBox(p, A, F), false);
  return h + demoBar(p) + `<div class="ws${V.rc ? ' rc' : ''}" id="ws" style="--rw:${V.rw}px"><div class="wsm">${mid}</div><div class="wsh" id="wsh" role="separator" aria-orientation="vertical" aria-label="Paneli yeniden boyutlandır" title="Sürükle"></div><aside class="wsr"><button type="button" class="btn ghost wst" id="wstg" aria-expanded="${!V.rc}">${V.rc ? '◀ Denetçi' : '▶ Daralt'}</button><div class="wsb">${side}</div></aside></div>`;
};
let RS = null;
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('#wstg'); if (!b) return; V.rc = !V.rc; const w = document.getElementById('ws'); w.classList.toggle('rc', V.rc); b.textContent = V.rc ? '◀ Denetçi' : '▶ Daralt'; b.setAttribute('aria-expanded', String(!V.rc)); }, true);
document.addEventListener('pointerdown', e => { const h = e.target.closest && e.target.closest('#wsh'); if (!h || V.rc) return; const w = document.getElementById('ws'); RS = { w, r: w.getBoundingClientRect() }; w.classList.add('dragging'); try { h.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); });
document.addEventListener('pointermove', e => { if (!RS) return; V.rw = Math.round(Math.max(260, Math.min(RS.r.width * .65, RS.r.right - e.clientX))); RS.w.style.setProperty('--rw', V.rw + 'px'); });
const endRs = () => { if (RS) { RS.w.classList.remove('dragging'); RS = null; } }; document.addEventListener('pointerup', endRs); document.addEventListener('pointercancel', endRs);

document.addEventListener('click', e => {
  const T2 = e.target; if (!T2.closest) return; let b;
  if ((b = T2.closest('[data-w]'))) { V.w = +b.dataset.w; route(); return; }
  if ((b = T2.closest('[data-tsel]'))) { V.sel = V.sel === +b.dataset.tsel ? null : +b.dataset.tsel; route(); return; }
  if ((b = T2.closest('[data-t2]'))) { V.open = V.open === +b.dataset.t2 ? null : +b.dataset.t2; route(); }
});
})();
