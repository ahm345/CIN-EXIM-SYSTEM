
/* ===================== v10: YAPABİLECEKLER (tasarım ve teknik sözlük) ===================== */
(function () {
const G = [
['Yerleşim (sayfanın iskeleti)', [
 ['Kenar çubuğu (sidebar)', 'Sayfanın yanındaki menü veya panel. Daraltılabilir yapılabilir.', 'Stüdyo sayfasının sağ paneli', '“Sağ paneli daraltılabilir yap, orta alan genişlesin.”'],
 ['Bölme / ayırıcı (splitter)', 'İki alanın arasındaki tutamaç; sürükleyince alanların genişliği değişir.', 'Stüdyo: orta alan ile denetçi arası', '“Bu iki alanın arasına sürüklenebilir ayırıcı koy.”'],
 ['Izgara (grid) ve sütun', 'İçeriği satır ve sütunlara bölen düzen. 2, 3, 4 sütun; telefonda tek sütuna iner.', 'Galeri sayfası kartları', '“Kartlar 3 sütunlu ızgarada dizilsin.”'],
 ['Yapışkan (sticky) başlık', 'Kaydırırken yerinde duran başlık veya tablo başlığı.', '—', '“Tablonun başlık satırı sabit kalsın.”'],
 ['Duyarlı (responsive) düzen', 'Ekran genişliğine göre kendini ayarlayan tasarım (telefon, tablet, bilgisayar).', 'Tüm sayfalar', '“Telefonda bu bölüm alt alta gelsin.”'],
 ['Akordiyon', 'Başlığa basınca altında açılan bölüm. Sayfa değişmez.', 'İlişkili kutusu, aşamalar, firmalar', '“Bunu akordiyon yap, aynı yerde açılsın.”'],
 ['Sekme (tab)', 'Aynı alanda içerik değiştiren düğmeler.', 'Alt menüler (Pano, Tablo…)', '“Bu üç bölümü sekmeye çevir.”']]],
['Bileşenler (parçalar)', [
 ['Kart', 'Bir bilgiyi çerçeveli küçük kutuda gösterir.', 'Pano kartları', '“Her firmayı kart olarak göster.”'],
 ['Rozet / etiket (pill, badge)', 'Küçük renkli durum etiketi.', 'Tamam, Bekliyor rozetleri', '“Durumu renkli rozetle göster.”'],
 ['Çip (chip)', 'Basılabilir küçük etiket; süzmek veya açmak için.', 'İlişkili kayıt çipleri', '“Bunları süzme çipine çevir.”'],
 ['İpucu balonu (tooltip)', 'Üstüne gelince çıkan kısa açıklama.', 'Graf düğümleri', '“Üzerine gelince açıklama çıksın.”'],
 ['Açılır pencere (modal)', 'Sayfanın üstüne binen pencere. Sayfa değiştirmeden form gösterir.', '—', '“Yeni kayıt formu açılır pencerede çıksın.”'],
 ['Açılır liste (dropdown / select)', 'Seçenek listesi.', 'Giriş formları', '“Bu alan açılır liste olsun.”'],
 ['Anahtar / onay kutusu', 'Aç-kapa veya işaretleme.', 'Doğrulandı, Dahil', '“Bunu açma-kapama anahtarı yap.”'],
 ['Gösterge kutucuğu (KPI tile)', 'Tek bir önemli sayıyı büyük gösterir.', 'Gün toplam, bayrak sayısı', '“Üste 4 özet kutucuğu koy.”']]],
['Tablo ve veri', [
 ['Sıralama / süzme / arama', 'Sütuna göre dizme, koşula göre eleme, yazıyla bulma.', 'Süreç “Tablo” sayfası', '“Bu tabloya durum süzgeci ekle.”'],
 ['Satır içi düzenleme', 'Tabloda hücreye yazıp orada değiştirmek.', 'Stüdyo adım tablosu', '“Gün sütunu tabloda düzenlenebilir olsun.”'],
 ['Genişleyen satır', 'Satıra basınca altında ayrıntı açılır.', 'Süreç Tablo sayfası', '“Satıra basınca ayrıntı altta açılsın.”'],
 ['Gruplama', 'Satırları bir özelliğe göre başlıklar altında toplamak.', 'Duruma göre sayfası', '“Adımlar aşamaya göre gruplansın.”'],
 ['Pivot / matris', 'İki özelliği satır ve sütun yapıp kesişimleri saymak.', 'Sorumlu matrisi', '“Sorumlu x aşama matrisi yap.”'],
 ['Formül / canlı hesap', 'Bir sayı değişince bağlı sayıların otomatik yenilenmesi.', 'Teklif sınırı, Gantt', '“Değer değişince toplam anında hesaplansın.”'],
 ['Dışa aktarma', 'Veriyi dosya olarak almak (CSV, takvim .ics, metin).', '.ics takvim, yazma paketi', '“Tabloyu CSV olarak indirt.”']]],
['Görselleştirme', [
 ['Gantt', 'Zaman çizelgesi: adımlar çubuk olarak tarihlere dizilir.', 'Tasarım → Gantt ve Stüdyo', '“Gantt’a bağımlılık okları ekle.”'],
 ['Pano (kanban)', 'Sütunlarda kartlar; sütun genelde aşama veya durum.', 'Süreç → Pano', '“Kartları durum sütunlarına dağıt.”'],
 ['Şerit (swimlane)', 'Satırlar veya sütunlar kişi/departman; kartlar şeritlere dizilir.', 'Tasarım → Şeritler', '“Departman şeritleri olsun.”'],
 ['Ağ grafı (graph)', 'Düğümler ve çizgilerle ilişkiler; Obsidian grafı gibi.', 'Taraflar → Bağlantı grafı', '“Grafta sadece firmalar görünsün.”'],
 ['Isı haritası', 'Renk yoğunluğuyla sayı gösterir.', '—', '“Matris hücrelerini sayıya göre renklendir.”'],
 ['Çizgi / çubuk grafik', 'Zaman içindeki değişimi veya karşılaştırmayı çizer.', 'Finans, Senaryolar', '“Kira ve borç servisini çizgi grafikle göster.”'],
 ['Zaman çizgisi (timeline)', 'Olayları tarih sırasıyla dizer.', '—', '“Olayları tarih çizgisi olarak göster.”']]],
['Etkileşim (kullanım hissi)', [
 ['Sürükle-bırak', 'Bir öğeyi tutup başka yere bırakmak (sıralama, taşıma).', 'Gantt çubukları, graf düğümleri', '“Adımların sırasını sürükleyerek değiştir.”'],
 ['Yeniden boyutlandırma', 'Kenardan çekip genişlik veya süre değiştirmek.', 'Gantt çubuğunun sağ kenarı', '“Panel genişliği çekilerek ayarlansın.”'],
 ['Yakınlaştır / kaydır (zoom, pan)', 'Büyük çizimde yakına gitmek ve gezmek.', 'Bağlantı grafı', '“Gantt’ta zoom olsun.”'],
 ['Üzerine gelince (hover)', 'İmleç üstüne gelince renk, balon veya önizleme çıkması.', 'Bölge seçici', '“Üzerine gelince ilişkili öğeler vurgulansın.”'],
 ['Klavye kısayolu', 'Tuşla işlem: Esc kapat, oklar gez.', 'Bölge seçicide ↑ ↓ Esc', '“Ctrl+Z ile geri al olsun.”'],
 ['Geri al / ileri al (undo/redo)', 'Son değişikliği geri çevirmek.', '— (yok, eklenebilir)', '“Demo düzenlemelerinde geri al olsun.”'],
 ['Canlı önizleme', 'Değer değiştikçe sonucun anında görünmesi.', 'Gantt sürükleme', '“Yazdıkça sonuç yan tarafta güncellensin.”']]],
['Veri ve kayıt', [
 ['Yerel kayıt (localStorage)', 'Tarayıcıda saklanır; başka cihazda görünmez, silinirse gider.', 'Demolar, istekler', '—'],
 ['Baserow okuma', 'Panelden Baserow satırlarını okumak.', 'Satır sayısı tazeleme (izin tanımlı)', '“Sayıları Baserow’dan tazele düğmesi ekle.”'],
 ['Baserow yazma', 'Onaylı formla satır eklemek. Gerçek Baserow’da henüz denenmedi.', 'Giriş sayfası', '“Giriş sonrası Baserow’da ara.”'],
 ['Doğrulama (validation)', 'Girişin kuralını denetlemek (boş olamaz, sayı olmalı).', 'Giriş formları', '“Bu alan zorunlu olsun, tarih geçmişte olamasın.”'],
 ['Paylaşılan veri', 'Birden çok kişinin aynı kaydı görmesi; panel veritabanı yeteneği gerekir.', '— (şu an yok)', '“Notlar herkese ortak kayıtlı olsun.”']]],
['Bu ortamda yapılamayanlar (dürüst sınırlar)', [
 ['Sunucu işi', 'Panel yalnızca tarayıcıda çalışır. Kendi başına e-posta göndermez, Drive’a dosya yazmaz, zamanlı iş çalıştırmaz.', '', 'Bunlar için sohbette yapay zekaya emir verilir.'],
 ['Kullanıcı girişi ve yetki', 'Kim hangi sayfayı görsün ayarı yoktur; erişim paylaşım ayarındadır.', '', ''],
 ['Canlı veri', 'Panel şimdilik 9 Kasım anlık görüntüsüyle çalışır; sürekli tazelenmez.', '', '“Açılışta Baserow’dan otomatik tazele.” (eklenebilir)'],
 ['Hukuki / vergi doğrulama', 'Şablon süreleri ve belge listeleri varsayımdır; uzman onayı gerekir.', '', '']]]
];
window.GLOSS = G;
window.glossHtml = function () {
  return G.map((g, i) => wk('sz' + i, `<span>${esc(g[0])}</span><small>${g[1].length} terim</small>`, `<div class="sct"><table><thead><tr><th>Terim</th><th>Ne demek</th><th>Panelde örnek</th><th>Bana şöyle söyle</th></tr></thead><tbody>${g[1].map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2] || '—')}</td><td>${esc(r[3] || '—')}</td></tr>`).join('')}</tbody></table></div>`, i === 0)).join('') +
    `<section class="panel" style="margin-top:12px"><h2>İstek yazarken ipucu</h2><p style="margin:0 0 6px">İyi bir istek şu dört parçadan oluşur: <b>nerede</b> (Bölge seç ile), <b>ne</b> (kart, tablo, sütun), <b>nasıl davransın</b> (sürüklensin, daralsın, anında hesaplansın), <b>neye göre</b> (süreye, duruma, departmana göre). Büyük işleri kademeli iste: önce iskelet (yerleşim), sonra parçalar, en son davranış.</p></section>`;
};
views.sozluk = function () { return `<div class="demo">Yapabilecekler artık Sayfa tasarımcısı içinde. Bu sayfa eski bağlantılar için duruyor.</div>` + window.glossHtml(); };
})();
