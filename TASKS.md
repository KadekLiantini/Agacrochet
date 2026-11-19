# TASKS — Agacrochet

Rencana kerja turunan dari `SPEC.md` & `UI-SPEC.md`. Urutan milestone bersifat berurutan; setiap milestone dapat dijalankan dan diuji sendiri di browser sebelum lanjut.
**Legenda:** `[ ]` belum · `[x]` selesai · **Dep** = tugas yang harus selesai lebih dulu · AC = acceptance criteria yang diperiksa manual.

---

## M1 · Scaffold & Design System
*Selesai bila: aplikasi berjalan bertema, navigasi global hidup, dan `npm run build` hijau.*

- [ ] **M1-T1 · Scaffold proyek** — `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx` · Dep: —
  - AC: `npm run dev` menampilkan halaman di localhost tanpa error di console.
  - AC: `npm run build` sukses dan menghasilkan folder `dist/`.
  - AC: Membuka `/katalog` langsung lewat dev server tidak memicu 404 Vite.
- [ ] **M1-T2 · Design tokens & tipografi** — `tailwind.config.js`, `src/index.css` · Dep: M1-T1
  - AC: Kelas `bg-primary`, `text-ink`, `bg-secondary`, `border-secondary-dark`, `rounded-2xl`, `shadow-soft` menghasilkan nilai sesuai UI-SPEC §2/§5.
  - AC: Judul memakai Fredoka dan teks memakai Nunito (terlihat berbeda di halaman contoh).
  - AC: Outline fokus 3 px `#2F5D8C` terlihat saat menekan Tab pada elemen contoh.
- [ ] **M1-T3 · Komponen dasar UI** — `src/components/ui/{Button,Badge,Card,Input,Toast}.jsx` · Dep: M1-T2
  - AC: Button varian primary, secondary (berborder `secondary-dark`), ghost tampil beda dan mendukung `disabled` serta `loading` ("Memproses…") tanpa mengubah lebar.
  - AC: Input menampilkan label, border `border-strong`, pesan error `aria-invalid` saat diberi error.
  - AC: Toast muncul, bisa ditutup, hilang otomatis, dan memakai `role="status"`.
- [ ] **M1-T4 · Layout global** — `src/components/layout/*` · Dep: M1-T3
  - AC: Navbar menampilkan logo, menu, ikon keranjang berbadge, dan hamburger di 375 px.
  - AC: Drawer mobile terbuka/tertutup via tombol, tautan, Esc, dan overlay.
  - AC: Footer memuat tautan sekunder dan tombol WA melayang membuka `wa.me` di tab baru.
  - AC: Banner promo dapat ditutup dan tidak menutupi navbar saat scroll.
- [ ] **M1-T5 · Konfigurasi & deploy statis** — `src/config.js`, `vercel.json`, `public/favicon.svg` · Dep: M1-T4
  - AC: Nomor WA, rekening, sosmed, email, jam operasional, dan tarif ongkir hanya ada di `src/config.js`.
  - AC: `vercel.json` berisi rewrite SPA `/(.*)` → `/index.html`.

## M2 · Lapisan Data localStorage
*Selesai bila: seluruh kontrak fungsi `storage.js` lulus uji dan tidak ada akses localStorage di luar modul itu.*

- [ ] **M2-T1 · Seed 15 produk** — `src/data/seed.js` · Dep: M1-T5
  - AC: `getProducts()` (sementara via console/modul) mengembalikan tepat 15 produk pada 5 kategori.
  - AC: Ada produk stok 0, produk pre-order, `bestSeller`, `unggulan`, dan variasi `createdAt` untuk badge New.
  - AC: Setiap `gambar` menunjuk file yang benar-benar ada di `public/products/`.
- [ ] **M2-T2 · Inti storage: produk & versi data** — `src/lib/storage.js`, `src/hooks/useStorage.js` · Dep: M2-T1
  - AC: Key `agacrochet_products` menyimpan `{ version, updatedAt, data }` dan tampil di DevTools.
  - AC: `saveProduct`, `getProductBySlug`, `getProductById`, `deleteProduct` bekerja; slug duplikat ditolak.
  - AC: Mengosongkan localStorage lalu refresh memicu seed otomatis; JSON korup tidak membuat layar putih.
  - AC: `grep -r localStorage src` hanya menemukan `src/lib/storage.js`.
- [ ] **M2-T3 · Keranjang, pesanan, custom order, pelacakan** — `src/lib/storage.js`, `src/lib/pricing.js`, `src/lib/format.js` · Dep: M2-T2
  - AC: `createOrder` menghitung ulang harga dari produk, membuat kode `AGA-YYYYMMDD-XXXX`, mengurangi stok hanya produk `ready`, menyimpan status `menunggu_verifikasi`, dan mengosongkan keranjang.
  - AC: `trackOrder` cocok untuk `0812…`, `+62812…`, dan `62812…`; nomor berbeda menghasilkan `null`.
  - AC: `updateOrderStatus` menolak transisi di luar tabel status dan mengisi `updatedAt`.
  - AC: `createCustomRequest` dan `updateCustomRequestStatus` tersimpan dengan status awal `baru`.
- [ ] **M2-T4 · Penanganan kuota penuh** — `src/lib/storage.js`, `src/components/ui/Toast.jsx` · Dep: M2-T3
  - AC: Simulasi `QuotaExceededError` memunculkan pesan "Penyimpanan browser penuh…" dan aplikasi tidak crash.
  - AC: Saat penyimpanan gagal, stok tidak berkurang dan keranjang tetap utuh.
- [ ] **M2-T5 · Reset data demo** — `src/lib/storage.js` · Dep: M2-T3
  - AC: `resetDemoData()` mengembalikan 15 produk, menghapus pesanan/custom order, dan mengosongkan keranjang.
  - AC: Halaman yang sedang terbuka ikut ter-refresh datanya tanpa reload manual.

## M3 · Katalog: Beranda, Katalog, Detail Produk
*Selesai bila: pembeli dapat menjelajah dari beranda sampai detail produk memakai data asli dari storage.*

- [ ] **M3-T1 · Beranda** — `src/pages/Home.jsx`, `components/product/CategoryCard.jsx` · Dep: M2-T2
  - AC: Hero, 5 kartu kategori, produk unggulan, keunggulan brand, dan testimoni tampil di beranda.
  - AC: Klik kartu kategori membuka `/katalog?kategori=…` dengan chip aktif.
  - AC: Section unggulan hanya memuat produk `unggulan === true`.
- [ ] **M3-T2 · Katalog: grid, kartu, badge** — `src/pages/Catalog.jsx`, `components/product/{ProductCard,ProductGrid}.jsx` · Dep: M3-T1
  - AC: 15 produk tampil 2 kolom di mobile dan 4 kolom di desktop.
  - AC: Badge tampil sesuai prioritas Stok Habis → Pre-order → Best Seller → New.
  - AC: Klik kartu membuka detail produk yang benar.
- [ ] **M3-T3 · Detail produk** — `src/pages/ProductDetail.jsx`, `components/product/{ProductGallery,ColorPicker,QtyStepper}.jsx` · Dep: M3-T2
  - AC: Galeri, harga `Rp…`, deskripsi, bahan, ukuran, perawatan, warna, dan jumlah tampil lengkap.
  - AC: Klik thumbnail mengganti gambar utama; gambar gagal muat memakai `placeholder.jpg`.
  - AC: Produk stok 0 menampilkan tombol nonaktif "Stok Habis"; produk pre-order menampilkan "Pre-order Sekarang".
  - AC: Produk terkait maksimal 4 dari kategori sama dan tidak memuat produk aktif; slug salah menampilkan state tidak ditemukan.

## M4 · Pencarian, Filter, Sorting
*Selesai bila: kombinasi pencarian + kategori + sorting selalu konsisten dan tahan refresh.*

- [ ] **M4-T1 · Pencarian nama** — `src/pages/Catalog.jsx` · Dep: M3-T2
  - AC: Mengetik "rajut" memfilter produk secara case-insensitive dan menampilkan jumlah hasil.
  - AC: Input kosong mengembalikan seluruh produk.
- [ ] **M4-T2 · Filter kategori** — `src/pages/Catalog.jsx`, `components/ui/Chip.jsx` · Dep: M4-T1
  - AC: Chip "Semua" + 5 kategori bekerja dan dapat digulir horizontal di mobile.
  - AC: Kombinasi chip + pencarian menghasilkan irisan yang benar; "Reset filter" memulihkan 15 produk.
- [ ] **M4-T3 · Sorting + sinkronisasi URL** — `src/pages/Catalog.jsx` · Dep: M4-T2
  - AC: Terbaru, Harga Termurah, dan Harga Termahal menghasilkan urutan yang benar.
  - AC: `?q=&kategori=&sort=` tercermin di URL dan tetap sama setelah refresh.
  - AC: Hasil kosong menampilkan empty state dengan CTA reset.

## M5 · Keranjang
*Selesai bila: isi keranjang konsisten di detail, halaman keranjang, dan badge navbar.*

- [ ] **M5-T1 · Tambah ke keranjang** — `src/pages/ProductDetail.jsx`, `src/lib/storage.js` · Dep: M3-T3
  - AC: Menambah dengan warna & jumlah terpilih memunculkan toast dan menambah baris yang benar.
  - AC: Warna sama menambah `jumlah`; warna beda membuat baris baru.
  - AC: Jumlah melebihi stok ready ditolak dengan pesan sisa stok.
- [ ] **M5-T2 · Halaman keranjang** — `src/pages/Cart.jsx` · Dep: M5-T1
  - AC: Ubah jumlah memperbarui subtotal seketika; batas atas mengikuti stok.
  - AC: Hapus item meminta konfirmasi inline lalu menghapus baris dan menyesuaikan subtotal.
  - AC: Keranjang kosong menampilkan empty state + tombol "Lihat Katalog".
- [ ] **M5-T3 · Badge navbar real-time** — `src/components/layout/Navbar.jsx` · Dep: M5-T2
  - AC: Badge menampilkan total kuantitas (bukan jumlah baris) dan beranimasi goyang saat item ditambahkan.
  - AC: Badge langsung berubah dari halaman detail tanpa reload.

## M6 · Checkout & Pesanan Sukses
*Selesai bila: satu pesanan lengkap dapat dibuat dari keranjang sampai halaman sukses dengan stok dan kode yang benar.*

- [ ] **M6-T1 · Form checkout & validasi** — `src/pages/Checkout.jsx`, `src/lib/validate.js` · Dep: M5-T2
  - AC: Submit kosong menandai semua field wajib dan memfokuskan field pertama yang salah.
  - AC: Nomor HP dinormalisasi saat blur; format tidak valid ditolak dengan pesan contoh.
  - AC: Redirect ke `/keranjang` bila checkout dibuka dengan keranjang kosong.
- [ ] **M6-T2 · Rekening tujuan & ringkasan biaya** — `src/pages/Checkout.jsx`, `src/lib/pricing.js` · Dep: M6-T1
  - AC: Dua rekening dari config tampil sebagai pilihan radio dan nomornya dapat disalin.
  - AC: Subtotal < Rp150.000 menampilkan ongkir Rp15.000; ≥ Rp150.000 menampilkan "Gratis".
- [ ] **M6-T3 · Upload bukti transfer + kompresi** — `src/lib/image.js`, `src/components/ui/ImageUploader.jsx` · Dep: M6-T2
  - AC: PDF ditolak (tipe) dan file > 2 MB ditolak (ukuran) dengan pesan spesifik.
  - AC: JPG 2 MB menghasilkan data URL JPEG lebar ≤ 800 px dengan ukuran < 400 KB dan pratinjau tampil.
  - AC: Submit tanpa bukti transfer ditolak; tombol menunggu proses kompresi selesai.
- [ ] **M6-T4 · Pembuatan pesanan end-to-end** — `src/lib/storage.js`, `src/pages/Checkout.jsx` · Dep: M6-T3
  - AC: Pesanan tersimpan dengan kode `AGA-YYYYMMDD-XXXX`, status `menunggu_verifikasi`, snapshot item, dan total benar.
  - AC: Stok produk ready berkurang; stok pre-order tidak berubah; keranjang kosong setelah sukses.
  - AC: Harga pesanan tetap walau harga produk diubah setelahnya.
- [ ] **M6-T5 · Halaman pesanan sukses** — `src/pages/OrderSuccess.jsx` · Dep: M6-T4
  - AC: Kode, total, rekening, dan status tampil; tombol "Salin" menyalin kode dan berubah menjadi "Tersalin!".
  - AC: Refresh halaman tetap menampilkan data; kode tidak dikenal menampilkan tampilan ramah tanpa crash.

## M7 · WhatsApp
*Selesai bila: tiga jenis pesan WA terbuka dengan format benar dan nomor dari config.*

- [ ] **M7-T1 · Util WhatsApp + tanya produk** — `src/lib/whatsapp.js` · Dep: M6-T4
  - AC: Tombol "Tanya via WhatsApp" di detail membuka `wa.me` dengan nama produk dan URL halaman.
  - AC: Nomor tujuan diambil dari `CONFIG.waNumber` dan teks ter-encode dengan benar (baris baru tetap utuh).
- [ ] **M7-T2 · Konfirmasi pesanan** — `src/pages/OrderSuccess.jsx` · Dep: M7-T1
  - AC: Pesan memuat kode, nama, total, dan daftar item (nama, warna, jumlah, subtotal baris).
  - AC: Tautan memakai `target="_blank"` + `rel="noopener noreferrer"`.

## M8 · Lacak Pesanan & Custom Order
*Selesai bila: pembeli dapat memeriksa status pesanan dan mengirim permintaan custom.*

- [ ] **M8-T1 · Halaman lacak pesanan** — `src/pages/TrackOrder.jsx` · Dep: M7-T2
  - AC: Kode valid + no. HP yang dipakai menampilkan status, stepper, total, dan nomor resi.
  - AC: Kode valid + no. HP berbeda menampilkan pesan generik "Pesanan tidak ditemukan".
  - AC: Status ditolak/dibatalkan menampilkan catatan admin.
- [ ] **M8-T2 · Form custom order** — `src/pages/CustomOrder.jsx` · Dep: M8-T1
  - AC: Semua field wajib tervalidasi; budget opsional tersimpan 0 bila kosong.
  - AC: Gambar referensi opsional, dikompresi dengan aturan yang sama seperti bukti transfer.
  - AC: Setelah simpan, permintaan tampil di data dan tautan WhatsApp terformatted ditawarkan.

## M9 · Dashboard Demo
*Selesai bila: pengelola dapat menyelesaikan siklus pesanan penuh tanpa menyentuh DevTools.*

- [ ] **M9-T1 · Kerangka admin + ringkasan** — `src/pages/admin/Dashboard.jsx`, `src/components/layout/AdminLayout.jsx` · Dep: M8-T2
  - AC: `/admin` mengarah ke `/admin/ringkasan` dan label "Mode Demo" selalu terlihat.
  - AC: Kartu total produk, total stok, jumlah per status benar; pendapatan hanya menjumlah diproses+dikirim+selesai.
- [ ] **M9-T2 · Daftar & detail pesanan** — `src/pages/admin/Orders.jsx`, `src/pages/admin/OrderDetail.jsx` · Dep: M9-T1
  - AC: Filter status bekerja dan chip menampilkan jumlah per status.
  - AC: Detail menampilkan data pembeli, item, total, dan bukti transfer dalam modal yang bisa diperbesar.
- [ ] **M9-T3 · Ubah status, resi, catatan, pengembalian stok** — `src/lib/storage.js`, `src/pages/admin/OrderDetail.jsx` · Dep: M9-T2
  - AC: `dikirim` tanpa nomor resi ditolak; resi tersimpan dan terlihat di halaman lacak.
  - AC: `ditolak`/`dibatalkan` mengembalikan stok tepat satu kali (`stokDikembalikan`) meski tombol ditekan ulang.
  - AC: Status final tidak dapat diubah lagi dan kontrolnya dinonaktifkan.
- [ ] **M9-T4 · CRUD produk + foto** — `src/pages/admin/{Products,ProductForm}.jsx` · Dep: M9-T3
  - AC: Tambah/edit/hapus produk memengaruhi katalog dan keranjang sesuai aturan.
  - AC: Validasi menolak nama < 3 karakter, harga negatif, stok desimal, tanpa warna, dan tanpa gambar.
  - AC: Upload foto terkompresi tampil; alternatif path lokal (mis. `/products/tote-sage-1.jpg`) juga diterima.
- [ ] **M9-T5 · Custom order admin + reset demo** — `src/pages/admin/CustomRequests.jsx` · Dep: M9-T4
  - AC: Daftar & detail custom order tampil termasuk gambar referensi; status dapat diubah.
  - AC: "Reset Data Demo" meminta konfirmasi lalu memulihkan seed dan mengosongkan keranjang.

## M10 · Halaman Pemasaran & SEO Dasar
*Selesai bila: seluruh halaman statis selesai, tanpa tautan mati, dan metadata terbaca.*

- [ ] **M10-T1 · Tentang Kami** — `src/pages/About.jsx` · Dep: M9-T1
  - AC: Cerita brand, 3 nilai, dan 4 langkah proses tampil; CTA menuju katalog.
- [ ] **M10-T2 · Kontak & FAQ** — `src/pages/{Contact,FAQ}.jsx`, `src/components/ui/Accordion.jsx` · Dep: M10-T1
  - AC: Semua kontak identik dengan `config.js` dan terbuka di tab baru.
  - AC: FAQ ≥ 8 item, hanya satu terbuka, dapat dioperasikan dengan keyboard (`aria-expanded`).
- [ ] **M10-T3 · Cara Pemesanan & 404** — `src/pages/{HowToOrder,NotFound}.jsx` · Dep: M10-T2
  - AC: 5 langkah pemesanan tampil dan menyebut pembayaran transfer manual + verifikasi admin.
  - AC: Route tidak dikenal menampilkan 404 dengan tautan ke beranda dan katalog.
- [ ] **M10-T4 · SEO dasar** — `index.html`, `src/components/layout/Seo.jsx`, `public/favicon.svg` · Dep: M10-T3
  - AC: Setiap halaman punya `title` dan `meta description` unik; Open Graph memuat judul, deskripsi, gambar.
  - AC: Favicon tampil di tab browser dan tidak ada tautan internal yang mati.

## M11 · Testing Manual
*Selesai bila: checklist toko & admin lulus di 375 px dan 1280 px, termasuk skenario gagal.*

- [ ] **M11-T1 · Checklist toko (mobile + desktop)** — `CATATAN.md` (catatan hasil uji) · Dep: M10-T4
  - AC: Beranda → katalog → detail → keranjang → checkout → sukses berjalan tanpa error console di kedua lebar.
  - AC: Tidak ada horizontal scroll dan tidak ada gambar rusak di semua halaman toko.
- [ ] **M11-T2 · Checklist admin** — `CATATAN.md` · Dep: M11-T1
  - AC: Verifikasi pesanan, ubah status, isi resi, CRUD produk, custom order, dan reset demo berjalan.
  - AC: Angka ringkasan berubah konsisten setelah setiap aksi.
- [ ] **M11-T3 · Skenario batas** — `CATATAN.md` · Dep: M11-T2
  - AC: Stok habis: tombol nonaktif dan checkout menolak jumlah melebihi stok.
  - AC: localStorage penuh: pesan muncul, stok tidak berkurang, keranjang utuh.
  - AC: Form tidak valid: setiap field menampilkan error dan fokus berpindah ke field pertama.
  - AC: Data korup / storage dikosongkan: aplikasi tetap tampil dengan seed.

## M12 · Security & Aksesibilitas
*Selesai bila: audit keamanan dan a11y lulus; ulangi M11-T1 setelah perubahan.*

- [ ] **M12-T1 · Audit rahasia & sanitasi** — seluruh `src/`, `README` · Dep: M11-T3
  - AC: Tidak ada API key/secret; hanya nomor placeholder di `config.js`.
  - AC: Tidak ada `dangerouslySetInnerHTML`; URL gambar hanya `http(s)` atau path relatif.
- [ ] **M12-T2 · Validasi file** — `src/lib/image.js` · Dep: M12-T1
  - AC: Tipe di luar JPG/PNG/WebP dan file > 2 MB selalu ditolak di klien, termasuk saat mengganti foto produk.
- [ ] **M12-T3 · Kontras, fokus, alt, label** — komponen & halaman terkait · Dep: M12-T2
  - AC: Semua pasangan teks/latar memenuhi UI-SPEC §3; tidak ada teks putih di atas primary/secondary.
  - AC: Seluruh alur dapat diselesaikan dengan keyboard dan fokus selalu terlihat.
  - AC: Semua gambar produk punya alt bermakna; setiap input punya label terhubung.
- [ ] **M12-T4 · Status non-warna & ARIA** — `Badge`, `Toast`, `Accordion`, `Modal` · Dep: M12-T3
  - AC: Badge status selalu berisi ikon + teks; toast dan hasil lacak diumumkan lewat `aria-live`.

## M13 · Build & Deployment
*Selesai bila: URL produksi menjalankan seluruh alur dan deep link tidak 404.*

- [ ] **M13-T1 · Build & preview lokal** — `package.json`, `dist/` · Dep: M12-T4
  - AC: `npm run build` tanpa error/warning kritis dan `npm run preview` menjalankan aplikasi penuh.
  - AC: Refresh di `/katalog` dan `/admin/pesanan` pada preview tidak 404.
- [ ] **M13-T2 · Deploy Vercel** — `vercel.json` · Dep: M13-T1
  - AC: Deploy berhasil dan beranda produksi tampil.
  - AC: Deep link produksi (`/produk/…`, `/lacak`, `/admin`) dapat dibuka langsung dan di-refresh.
- [ ] **M13-T3 · Uji ulang produksi** — `CATATAN.md` · Dep: M13-T2
  - AC: Alur demo 3 menit (belanja → checkout → sukses → WA → admin → lacak) lulus di URL produksi.
  - AC: Nomor WhatsApp & rekening placeholder tercatat sebagai hal yang harus diganti sebelum dipakai nyata.
  - AC: Tidak ada error console di produksi pada alur toko maupun admin.

---
*Total: 13 milestone, 47 tugas. Milestone 1–2 adalah fondasi; mulai M3 setiap milestone menghasilkan halaman yang bisa didemokan.*
