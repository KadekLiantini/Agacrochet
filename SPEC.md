# SPEC — Agacrochet

**Aplikasi:** Agacrochet — website e-commerce toko rajutan handmade
**Jenis dokumen:** Software Requirement Specification (disusun oleh System Analyst & Software Engineer)
**Target:** MVP hackathon, selesai dalam 1 hari kerja
**Versi dokumen:** 1.0
**Tanggal:** 19 November 2026

---

## 1. Tujuan

Membangun website e-commerce statis untuk toko rajutan handmade **Agacrochet** yang memungkinkan calon pembeli melihat katalog, menelusuri detail produk, melakukan pemesanan (checkout + konfirmasi transfer via WhatsApp), mengajukan custom order, dan melacak status pesanan — sekaligus memberi pengelola toko sebuah dashboard demo untuk mengelola produk, pesanan, dan permintaan custom.

**Tujuan yang terukur (1 hari):**

1. Seluruh alur pembeli dapat diselesaikan tanpa backend: pilih produk → keranjang → checkout dengan bukti transfer → halaman sukses → lacak pesanan.
2. Pengelola dapat mengubah status pesanan dan melihat stok berkurang/bertambah secara konsisten di dashboard `/admin`.
3. Semua data bertahan di satu browser (localStorage), dan seluruh akses penyimpanan terisolasi di satu modul sehingga mudah dipindah ke Supabase.
4. Hasil akhir dapat di-deploy statis ke Vercel dan seluruh acceptance criteria dapat diverifikasi manual di browser.

**Non-tujuan:** integrasi pembayaran nyata, autentikasi, backend, sinkronisasi multi-perangkat.

---

## 2. Pengguna & Konteks Pemakaian

| Persona | Kebutuhan utama | Konteks |
|---|---|---|
| **Calon pembeli** (pengunjung) | Melihat produk, memastikan harga/stok, memesan dan membayar transfer, tahu langkah selanjutnya | Mayoritas mobile (lebar 360–430 px), koneksi sedang, tidak sabar menunggu loading |
| **Pengelola toko** (pemilik/admin demo) | Melihat pesanan masuk, memverifikasi bukti transfer, mengubah status, mengelola katalog | Desktop/laptop saat demo, kadang mobile |

**Keputusan penting:** kedua peran memakai **satu perangkat dan satu browser yang sama**. Tidak ada login, tidak ada autentikasi palsu. Dashboard `/admin` terbuka langsung dan **selalu menampilkan label "Mode Demo"** agar jelas bukan area aman.

**Bahasa:** seluruh antarmuka berbahasa Indonesia dengan nada hangat, ramah, dan personal (contoh: "Belum ada pesanan nih, yuk mulai dari katalog kami 🌸" — emoji dipakai hemat).

---

## 3. Daftar Fitur & Prioritas

Legenda: **P0** = wajib untuk demo (tanpa ini demo gagal). **P1** = penting, dikerjakan jika P0 selesai. **P2** = penyempurnaan, boleh dipotong jika waktu mepet.

### 3.1 Fondasi & Brand

| ID | Fitur | Prioritas |
|---|---|---|
| F-01 | Konfigurasi brand terpusat (`src/config.js`): nama, nomor WhatsApp, Instagram, TikTok, email, jam operasional, rekening bank, tarif ongkir | P0 |
| F-02 | Layout global: navbar (logo, menu, ikon keranjang + jumlah item), menu mobile (drawer), footer, tombol WhatsApp melayang, banner promo | P0 |
| F-03 | Sistem desain: palet pastel, font, komponen dasar (tombol, kartu, badge, input, accordion) | P0 |
| F-04 | Placeholder gambar lokal di `public/products` + gambar fallback | P0 |
| F-05 | Halaman 404 ramah | P1 |

### 3.2 Halaman Pembeli

| ID | Fitur | Prioritas |
|---|---|---|
| F-10 | **Beranda**: hero + tagline, kartu kategori (5), produk unggulan, keunggulan brand, testimoni | P0 |
| F-11 | **Katalog**: 15 produk, pencarian nama, filter kategori, sorting (terbaru, harga termurah, termahal), badge status | P0 |
| F-12 | **Detail produk**: galeri foto, harga Rupiah, deskripsi, bahan, ukuran, perawatan, pilihan warna, jumlah, status, stok, tombol tambah ke keranjang, tanya via WhatsApp, produk terkait | P0 |
| F-13 | **Keranjang**: ubah jumlah, hapus item, subtotal, tampilan kosong | P0 |
| F-14 | **Checkout**: form pembeli, pilih rekening, ringkasan biaya (ongkir), upload bukti transfer + kompresi, validasi | P0 |
| F-15 | **Halaman sukses**: kode pesanan, salin kode, kirim konfirmasi ke WhatsApp | P0 |
| F-16 | **Lacak pesanan**: kode + no. HP, status + nomor resi | P0 |
| F-17 | **Custom order**: form permintaan, upload 1 gambar referensi, simpan + buka WhatsApp | P0 |
| F-18 | **Tentang Kami**, **Kontak**, **FAQ (accordion)**, **Cara Pemesanan** | P1 |
| F-19 | Sticky bottom bar di detail produk (harga + tombol keranjang) untuk mobile | P2 |
| F-20 | Animasi halus (fade/slide ringan) & skeleton/loading state | P2 |

### 3.3 Dashboard Demo (`/admin`)

| ID | Fitur | Prioritas |
|---|---|---|
| F-30 | Layout admin + sidebar/tab, label "Mode Demo", tombol kembali ke toko | P0 |
| F-31 | **Ringkasan**: total produk, total stok, jumlah pesanan per status, total pendapatan (diproses + dikirim + selesai) | P0 |
| F-32 | **Pesanan**: daftar + filter status, detail, lihat bukti transfer, ubah status, catatan admin, nomor resi | P0 |
| F-33 | Pengembalian stok otomatis (sekali saja) saat pesanan ditolak/dibatalkan | P0 |
| F-34 | **Produk**: CRUD dengan validasi, upload/ganti foto (dikompresi) atau URL gambar lokal | P0 |
| F-35 | **Custom order**: daftar, detail, ubah status | P0 |
| F-36 | **Reset Data Demo**: mengembalikan seluruh data contoh | P0 |
| F-37 | Pencarian/pagination daftar pesanan & produk | P2 |

### 3.4 Layanan Data

| ID | Fitur | Prioritas |
|---|---|---|
| F-40 | Modul `src/lib/storage.js` sebagai satu-satunya akses `localStorage` | P0 |
| F-41 | Key berawalan `agacrochet_` + field versi data + seed otomatis dari `src/data/seed.js` | P0 |
| F-42 | Penanganan `QuotaExceededError` dengan pesan jelas ke pengguna | P0 |
| F-43 | Normalisasi nomor HP ke format `628xxx` (input, penyimpanan, pencarian) | P0 |
| F-44 | Util format Rupiah, tanggal, dan pembuatan kode pesanan | P0 |

---

## 4. Peta Halaman & Route

Menggunakan React Router (`BrowserRouter`). Semua route di bawah adalah route klien.

| Route | Halaman | Prioritas | Catatan |
|---|---|---|---|
| `/` | Beranda | P0 | Banner promo di atas hero |
| `/katalog` | Katalog produk | P0 | Filter & sort disimpan di query string (`?kategori=tas&sort=murah&q=rajut`) agar bisa di-refresh/di-share |
| `/produk/:slug` | Detail produk | P0 | 404 dalam halaman jika slug tidak ada |
| `/keranjang` | Keranjang | P0 | — |
| `/checkout` | Checkout | P0 | Redirect ke `/keranjang` jika keranjang kosong |
| `/sukses/:kode` | Sukses pemesanan | P0 | Data dibaca dari pesanan tersimpan, bukan state router |
| `/lacak` | Lacak pesanan | P0 | Alternatif: `/lacak?kode=AGA-...` |
| `/custom-order` | Form custom order | P0 | — |
| `/tentang` | Tentang Kami | P1 | — |
| `/kontak` | Kontak | P1 | — |
| `/faq` | FAQ | P1 | Accordion |
| `/cara-pemesanan` | Cara Pemesanan | P1 | Panduan 5 langkah + tautan ke `/faq` dan WA |
| `/admin` | Redirect ke `/admin/ringkasan` | P0 | — |
| `/admin/ringkasan` | Ringkasan dashboard | P0 | — |
| `/admin/pesanan` | Daftar pesanan + filter status | P0 | Filter via query `?status=` |
| `/admin/pesanan/:id` | Detail pesanan | P0 | Ubah status, resi, catatan admin, lihat bukti |
| `/admin/produk` | Daftar produk | P0 | — |
| `/admin/produk/baru` | Form tambah produk | P0 | — |
| `/admin/produk/:id/edit` | Form edit produk | P0 | — |
| `/admin/custom-order` | Daftar custom order | P0 | Detail dalam drawer/modal |
| `*` | 404 | P1 | — |

**Navigasi utama (navbar):** Beranda · Katalog · Custom Order · Tentang · Kontak · (ikon keranjang dengan badge jumlah item). Menu tambahan masuk menu mobile/footer: FAQ, Cara Pemesanan, Lacak Pesanan, Dashboard (label "Demo").

---

## 5. Data Model

Bentuk objek dalam JavaScript. Semua nominal dalam Rupiah (integer, tanpa desimal). Semua tanggal disimpan sebagai ISO 8601 string.

### 5.1 Product

```js
{
  id: string,              // "prd_001" (unik, tidak diubah saat edit)
  nama: string,            // wajib, 3–80 karakter
  slug: string,            // unik, lowercase, a-z0-9 dan tanda hubung
  kategori: "Amigurumi" | "Tas & Dompet" | "Fashion" | "Aksesoris" | "Dekorasi Rumah",
  harga: number,           // integer >= 0
  stok: number,            // integer >= 0
  status: "ready" | "preorder",
  deskripsi: string,       // wajib, >= 20 karakter
  bahan: string,
  ukuran: string,
  perawatan: string,
  warna: string[],         // minimal 1, mis. ["Cream", "Dusty Pink", "Sage"]
  gambar: string[],        // path lokal ("/products/xxx-1.jpg") atau URL; minimal 1
  unggulan: boolean,       // tampil di "Produk Unggulan" beranda
  bestSeller: boolean,     // badge Best Seller
  createdAt: string        // ISO
}
```

**Aturan turunan badge** (tidak disimpan, dihitung saat render):

- `bestSeller === true` → badge **Best Seller**
- `status === "preorder"` → badge **Pre-order**
- `status === "ready" && stok === 0` → badge **Stok Habis** (dan tombol tambah ke keranjang nonaktif)
- `createdAt` dalam 14 hari terakhir (dan bukan best seller) → badge **New**

Bila lebih dari satu berlaku, hanya satu badge ditampilkan dengan urutan prioritas: Stok Habis → Pre-order → Best Seller → New.

### 5.2 CartItem

```js
{ productId: string, warna: string, jumlah: number } // jumlah integer >= 1
```
Identitas baris = kombinasi `productId + warna`. Menambah produk sama dengan warna sama menambah `jumlah`, bukan baris baru.

### 5.3 Order

```js
{
  id: string,                   // "ord_<timestamp><rand>"
  kode: string,                 // "AGA-YYYYMMDD-XXXX", unik
  nama: string,                 // wajib, 2–60 karakter
  noHp: string,                 // ternormalisasi "628xxxxxxxxx"
  alamat: string,               // wajib, 10–300 karakter
  kota: string,                 // wajib, 2–60 karakter
  catatan: string,              // opsional, <= 300 karakter
  items: [{                     // snapshot saat checkout
    productId: string,
    nama: string,
    warna: string,
    harga: number,              // harga satuan saat transaksi
    jumlah: number
  }],
  subtotal: number,
  ongkir: number,
  total: number,
  rekeningId: string,           // merujuk BankAccount.id di config
  buktiTransfer: string,        // data URL "data:image/jpeg;base64,..." hasil kompresi
  status: "menunggu_verifikasi" | "diproses" | "dikirim" | "selesai" | "ditolak" | "dibatalkan",
  catatanAdmin: string,         // default ""
  noResi: string,               // default ""
  stokDikembalikan: boolean,    // penjaga agar restore stok hanya sekali
  createdAt: string,
  updatedAt: string
}
```

### 5.4 CustomRequest

```js
{
  id: string,                   // "cus_<timestamp><rand>"
  nama: string,                 // wajib, 2–60
  noHp: string,                 // ternormalisasi "628xxxxxxxxx"
  jenisProduk: string,          // wajib, mis. "Amigurumi", "Tas", "Fashion", "Lainnya"
  warna: string,                // wajib
  ukuran: string,               // opsional
  deskripsi: string,            // wajib, 10–500
  budget: number,               // integer >= 0, opsional (0 = "belum tahu")
  gambarReferensi: string,      // data URL atau "" jika tidak diunggah
  status: "baru" | "diproses" | "selesai" | "dibatalkan",
  createdAt: string
}
```

### 5.5 BankAccount (data tetap, bukan di localStorage)

```js
{ id: "bca", bank: "BCA", noRekening: "1234567890", atasNama: "Agacrochet Studio" }
```
Didefinisikan di `src/config.js` (placeholder yang mudah diganti). Minimal 2 rekening: BCA dan Mandiri.

### 5.6 Bentuk payload penyimpanan

Setiap key menyimpan satu objek pembungkus agar versi data eksplisit:

```js
{ version: 1, updatedAt: "2026-11-19T10:00:00.000Z", data: [ /* array */ ] }
```

| Key | Isi |
|---|---|
| `agacrochet_products` | `Product[]` |
| `agacrochet_orders` | `Order[]` |
| `agacrochet_custom_requests` | `CustomRequest[]` |
| `agacrochet_cart` | `CartItem[]` |
| `agacrochet_meta` | `{ seededAt, version }` |

**Migrasi:** bila `version` berbeda dari versi aplikasi, jalankan migrasi ringan; jika tidak tersedia, tampilkan peringatan di console dan fallback ke seed (hanya untuk demo).

### 5.7 Kontrak modul `src/lib/storage.js`

Satu-satunya modul yang boleh menyentuh `localStorage`. Semua fungsi sinkron, mengembalikan data atau melempar error bertipe.

```js
// Produk
getProducts(): Product[]
getProductBySlug(slug): Product | null
getProductById(id): Product | null
saveProduct(product): Product          // upsert; membuat id/slug bila kosong
deleteProduct(id): void                // tolak jika produk ada di keranjang? -> hapus juga dari keranjang
// Keranjang
getCart(): CartItem[]
addToCart(productId, warna, jumlah): CartItem[]
updateCartQty(productId, warna, jumlah): CartItem[]
removeFromCart(productId, warna): CartItem[]
clearCart(): void
// Pesanan
createOrder(payload): Order            // menghitung ulang harga, mengurangi stok, mengosongkan keranjang
getOrders(): Order[]
getOrderByKode(kode): Order | null
updateOrderStatus(id, status, { catatanAdmin, noResi }): Order
trackOrder(kode, noHp): Order | null
// Custom order
createCustomRequest(payload): CustomRequest
getCustomRequests(): CustomRequest[]
updateCustomRequestStatus(id, status): CustomRequest
// Demo & utilitas
resetDemoData(): void
getStorageStatus(): { usedBytes, quotaExceeded: boolean }
```

**Aturan lapisan:** komponen React dan halaman **tidak boleh** memanggil `localStorage` langsung. Untuk reaktivitas, `storage.js` mengekspor `subscribe(callback)` yang dipanggil setiap kali data berubah (pola event emitter sederhana) dan hook `useStorageVersion()` di `src/hooks/useStorage.js` untuk memicu re-render. Ini menjaga komponen tetap bebas dari detail penyimpanan ketika nanti diganti Supabase.

### 5.8 Seed data (15 produk)

`src/data/seed.js` mengekspor `seedProducts` (dan `seedOrders = []`, `seedCustomRequests = []`). Semua data nonpribadi; warna memakai nama netral.

| # | Nama | Kategori | Harga | Stok | Status | Flag |
|---|---|---|---|---|---|---|
| 1 | Boneka Beruang Mini "Mochi" | Amigurumi | 85.000 | 8 | ready | unggulan, bestSeller |
| 2 | Amigurumi Kelinci "Keshi" | Amigurumi | 95.000 | 5 | ready | unggulan |
| 3 | Boneka Kucing Tidur | Amigurumi | 120.000 | 3 | preorder | — |
| 4 | Gantungan Kunci Bunga Rajut | Amigurumi | 35.000 | 20 | ready | bestSeller |
| 5 | Tote Bag Rajut "Sage" | Tas & Dompet | 165.000 | 6 | ready | unggulan, bestSeller |
| 6 | Dompet Koin Rajut Mini | Tas & Dompet | 65.000 | 12 | ready | — (badge New) |
| 7 | Sling Bag Rajut "Dusty" | Tas & Dompet | 185.000 | 4 | preorder | — |
| 8 | Cardigan Rajut Oversize | Fashion | 325.000 | 3 | preorder | unggulan |
| 9 | Topi Bucket Rajut | Fashion | 95.000 | 9 | ready | — |
| 10 | Rompi Rajut Pendek | Fashion | 175.000 | 5 | ready | — (badge New) |
| 11 | Scrunchies Rajut (Set 3) | Aksesoris | 45.000 | 25 | ready | bestSeller |
| 12 | Kalung Bunga Rajut | Aksesoris | 55.000 | 10 | ready | — |
| 13 | Headband Rajut | Aksesoris | 40.000 | 15 | ready | — |
| 14 | Bantal Sofa Rajut Motif | Dekorasi Rumah | 210.000 | 4 | ready | unggulan |
| 15 | Hiasan Dinding Rajut "Daisy" | Dekorasi Rumah | 130.000 | 0 | ready | — (badge **Stok Habis**) |

**Catatan seed:**
- `createdAt` dibedakan: ~5 produk ≤ 14 hari (memicu badge New), sisanya lebih lama, agar sorting "Terbaru" terlihat berbeda.
- Produk #15 wajib ada untuk menguji tombol tambah ke keranjang yang nonaktif.
- Produk pre-order diberi `stok` kecil sebagai indikasi kapasitas (tidak dikurangi saat checkout).
- `bahan/ukuran/perawatan` memakai template per kategori agar penulisan seed ringkas:

| Kategori | Bahan | Ukuran | Perawatan |
|---|---|---|---|
| Amigurumi | Benang katun *milk cotton*, isian dakron | ± 12 cm | Cuci tangan air dingin, keringkan di tempat teduh |
| Tas & Dompet | Benang *polyester cord* | 30 × 25 cm | Lap dengan kain lembap, hindari mesin cuci |
| Fashion | Benang akrilik premium | S/M/L (lihat deskripsi) | Cuci tangan, jangan diperas, keringkan mendatar |
| Aksesoris | Benang katun | *one size* | Cuci tangan lembut, keringkan mendatar |
| Dekorasi Rumah | Benang katun tebal | 25 × 25 cm | Bersihkan debu dengan sikat lembut |

- Setiap produk punya `warna` minimal 2 pilihan dari palet: Cream, Dusty Pink, Sage, Mocca, Lilac.
- Gambar: minimal 1 file per produk di `public/products/<slug>-1.jpg`, produk unggulan 2–3 gambar untuk menguji galeri. Total ~20 file + `public/products/placeholder.jpg` sebagai fallback `onError`.

---

## 6. Aturan Bisnis

### 6.1 Harga & Ongkir

- Semua harga diambil dari `Product` di storage, **tidak pernah** dipercaya dari state keranjang saat checkout.
- `subtotal = Σ(harga produk × jumlah)` menggunakan harga terkini.
- `ongkir = 0` jika `subtotal >= 150000`, selain itu `15000` (flat).
- `total = subtotal + ongkir`.

### 6.2 Stok

- Saat checkout berhasil, untuk setiap item dengan `product.status === "ready"`, `stok` dikurangi sebesar `jumlah` (dibatasi tidak kurang dari 0).
- Produk `preorder` tidak mengurangi stok.
- Bila stok terkini lebih kecil dari `jumlah` di keranjang, checkout **gagal** dengan pesan jelas: "Stok *<nama>* tinggal <n>. Silakan sesuaikan jumlah di keranjang." Tidak ada pesanan yang tersimpan setengah jadi.
- Restore stok hanya saat status berubah ke `ditolak` atau `dibatalkan` dan `stokDikembalikan === false`; setelah restore set flag `true`.
- `deleteProduct` juga menghapus item terkait dari keranjang; pesanan lama tetap menyimpan snapshot.

### 6.3 Kode Pesanan

- Format `AGA-YYYYMMDD-XXXX`; `YYYYMMDD` = tanggal lokal perangkat; `XXXX` = 4 digit acak `1000–9999`.
- Coba ulang maksimal 10 kali bila kode sudah ada; bila tetap bentrok, gunakan 4 karakter alfanumerik uppercase.
- Kode ditampilkan monospace dan mudah disalin.

### 6.4 Transisi Status Pesanan

| Dari | Boleh ke |
|---|---|
| `menunggu_verifikasi` | `diproses`, `ditolak`, `dibatalkan` |
| `diproses` | `dikirim`, `dibatalkan` |
| `dikirim` | `selesai` |
| `selesai` / `ditolak` / `dibatalkan` | — (final) |

Status final tidak dapat diubah lagi (tombol dinonaktifkan dengan penjelasan). Nomor resi wajib diisi saat status diubah ke `dikirim` (validasi minimal 6 karakter). `updatedAt` diperbarui setiap perubahan.

### 6.5 Normalisasi Nomor HP

`normalizePhone(input)`:
1. Buang semua karakter non-digit.
2. `08xxx` → `628xxx`; `628xxx` tetap; `+628xxx` → `628xxx`; `8xxx` → `628xxx`.
3. Valid bila 10–15 digit dan diawali `62`.
4. Simpan versi ternormalisasi; tampilkan versi ramah (`+62 812-3456-7890`) hanya untuk display.

`trackOrder(kode, noHp)` mencocokkan `kode` (uppercase, trim) **dan** nomor HP ternormalisasi. Jika tidak cocok: pesan generik "Pesanan tidak ditemukan. Periksa kembali kode pesanan dan nomor WhatsApp yang dipakai saat memesan."

### 6.6 Kompresi Gambar

Satu util `compressImage(file, { maxWidth = 800, quality = 0.7 })` di `src/lib/image.js`:
1. Validasi tipe: `image/jpeg`, `image/png`, `image/webp`. Lainnya ditolak.
2. Validasi ukuran file ≤ 2 MB (2 × 1024 × 1024 byte).
3. Muat ke `Image`, hitung skala: `min(1, 800 / naturalWidth)`; tinggi mengikuti rasio.
4. Gambar ke `<canvas>`, ekspor `canvas.toDataURL("image/jpeg", 0.7)`.
5. Kembalikan data URL beserta perkiraan ukuran byte hasil.
6. Jika hasil masih > 400 KB, ulangi sekali dengan `quality = 0.55`; jika masih besar, tolak dengan pesan.

Dipakai untuk **bukti transfer** dan **gambar referensi custom order**, serta **foto produk** di admin. Preview ditampilkan sebelum disimpan.

---

## 7. Detail Halaman Pembeli

### 7.1 Layout Global
- **Banner promo** di paling atas: teks "Gratis ongkir untuk pembelian mulai Rp150.000 ✨" dengan latar dusty pink; dapat ditutup (disimpan di state sesi, bukan storage).
- **Navbar:** logo teks "Agacrochet" (huruf hangat), menu desktop, ikon keranjang dengan badge jumlah item (jumlah total `jumlah`, bukan jumlah baris), tombol menu hamburger di mobile.
- **Menu mobile:** drawer dari kanan, berisi semua tautan navigasi + tautan sekunder + tombol WhatsApp; menutup saat tautan diklik atau tombol Esc.
- **Footer:** deskripsi singkat brand, tautan cepat, kontak, sosial media, jam operasional, copyright.
- **Tombol WhatsApp melayang:** fixed kanan bawah, tidak menutupi tombol utama di mobile (beri jarak bawah aman), `aria-label` jelas.

### 7.2 Beranda
1. Hero: judul + tagline ("Rajutan handmade, dibuat satu per satu dengan sabar"), subteks, CTA "Belanja Sekarang" (`/katalog`) dan "Custom Order" (`/custom-order`), ilustrasi/gambar produk.
2. Kartu kategori (5): nama, jumlah produk, ikon/gambar; klik → `/katalog?kategori=<slug>`.
3. Produk unggulan: 4 produk `unggulan === true`, kartu produk → detail.
4. Keunggulan brand: 3 kartu — 100% handmade, bisa custom, dikerjakan dengan teliti.
5. Testimoni: 3 kutipan statis (nama depan + inisial kota, tanpa data pribadi).

**Kartu produk** (dipakai beranda & katalog): gambar (rasio 1:1, `object-cover`), badge, nama, kategori, harga Rupiah, indikator stok/pre-order. Seluruh kartu dapat diklik ke detail.

### 7.3 Katalog
- Grid 2 kolom mobile, 3–4 kolom desktop.
- **Pencarian:** input nama (debounce 200 ms), case-insensitive, cocokkan `nama` (dan `kategori` sebagai bonus).
- **Filter kategori:** chip "Semua" + 5 kategori; bisa dikombinasikan dengan pencarian.
- **Sorting:** `Terbaru` (default, `createdAt` desc), `Harga Termurah`, `Harga Termahal`.
- **Hasil kosong:** ilustrasi/teks + tombol "Reset filter".
- Menampilkan "Menampilkan N produk".
- State filter tersinkron ke URL query string.

### 7.4 Detail Produk
- Galeri: gambar utama + thumbnail; klik thumbnail mengganti gambar utama; gambar error → `placeholder.jpg`.
- Info: nama, badge, harga (`Rp85.000`), status (`Ready stock` / `Pre-order`), sisa stok (jika ready), deskripsi, bahan, ukuran, perawatan (bisa accordion di mobile).
- **Pilihan warna:** tombol chip, wajib dipilih (default warna pertama).
- **Jumlah:** stepper − / input / +, minimal 1, maksimal `stok` untuk produk ready (atau 10 untuk pre-order). Nilai di luar batas dikoreksi otomatis.
- **Tombol Tambah ke Keranjang:**
  - Produk ready dengan `stok > 0`: aktif → toast "Ditambahkan ke keranjang" + badge navbar bertambah.
  - Produk ready dengan `stok === 0`: **nonaktif**, label "Stok Habis".
  - Produk pre-order: aktif, label "Pre-order Sekarang".
- **Tanya via WhatsApp:** membuka `wa.me` dengan pesan berisi nama produk + URL halaman.
- **Produk terkait:** maksimal 4 dari kategori sama (kecuali produk ini), fallback ke produk unggulan lain.

### 7.5 Keranjang
- Daftar item: gambar, nama (tautan ke detail), warna, harga satuan, stepper jumlah (maks stok untuk ready), tombol hapus (dengan konfirmasi inline).
- Bila `jumlah` melebihi stok terkini, tampilkan peringatan kuning dan batasi saat checkout.
- Ringkasan: subtotal, info ongkir ("Gratis" atau "Rp15.000"), total, tombol "Lanjut ke Checkout".
- Tampilan kosong: pesan hangat + tombol "Lihat Katalog".
- Bila produk dihapus admin, item otomatis dibuang dari tampilan dengan notifikasi.

### 7.6 Checkout
1. Ringkasan item (read-only) + subtotal, ongkir, total yang dihitung ulang dari data produk saat halaman dibuka.
2. Form: Nama lengkap, No. WhatsApp, Alamat lengkap (textarea), Kota, Catatan (opsional).
3. Pilih rekening tujuan: kartu radio berisi bank, nomor rekening, atas nama, tombol salin nomor.
4. Instruksi transfer: nominal **total** harus sama; sertakan kode pesanan? (belum ada saat form dibuka) → instruksi menyebut "nominal tepat sesuai total".
5. Upload bukti transfer: tombol pilih file, preview, status kompresi ("Mengompres... 320 KB"), pesan error tipe/ukuran.
6. Validasi saat submit dan saat blur; pesan error di bawah field, `aria-invalid`.
7. Tombol "Buat Pesanan" → proses → redirect `/sukses/:kode`.

### 7.7 Halaman Sukses
- Ikon centang, "Terima kasih, <nama>!" dan kode pesanan besar (monospace) + tombol **Salin** (berubah jadi "Tersalin!" 2 detik).
- Ringkasan: total, rekening tujuan, status "Menunggu verifikasi".
- Tombol **Kirim Konfirmasi ke WhatsApp** (pesan terformat, lihat §7.8).
- Tautan "Lacak pesanan" (`/lacak?kode=...`, no HP perlu diisi) dan "Kembali belanja".
- Bila kode tidak ditemukan → tampilan ramah + tombol ke katalog.

### 7.8 Format Pesan WhatsApp

**Konfirmasi pesanan** (dibuka setelah checkout):
```
Halo Agacrochet! Saya sudah transfer untuk pesanan:

Kode: AGA-20261119-4821
Nama: <nama>
Total: Rp<total>

Item:
1. <nama> (<warna>) x<jumlah> — Rp<harga*jumlah>
2. ...

Bukti transfer sudah saya unggah di website. Mohon diverifikasi ya. Terima kasih!
```
**Tanya produk:**
```
Halo Agacrochet! Saya mau tanya tentang produk "<nama>" (Rp<harga>).
<url halaman produk>
```
**Custom order:**
```
Halo Agacrochet! Saya mau custom order.
Nama: <nama>
Jenis: <jenisProduk>
Warna: <warna> | Ukuran: <ukuran>
Budget: Rp<budget>
Deskripsi: <deskripsi>
(Saya juga melampirkan referensi di website.)
```
Semua nomor diambil dari `CONFIG.waNumber`; URL dibangun dengan `https://wa.me/<nomor>?text=<encodeURIComponent(pesan)>`, dibuka `target="_blank" rel="noopener noreferrer"`.

### 7.9 Lacak Pesanan
- Form: kode pesanan + nomor WhatsApp. 
- Hasil: kode, tanggal, nama produk (ringkas), total, **status** dengan badge berwarna + stepper visual (Menunggu verifikasi → Diproses → Dikirim → Selesai), **nomor resi** (jika ada), catatan admin bila diisi, tombol hubungi WA.
- Status `ditolak`/`dibatalkan` ditampilkan dengan penjelasan dan catatan admin.
- Kode dinormalisasi (uppercase, trim).

### 7.10 Custom Order
- Form: jenis produk (select: Amigurumi, Tas & Dompet, Fashion, Aksesoris, Dekorasi Rumah, Lainnya), warna, ukuran, deskripsi (textarea), budget (opsional), satu gambar referensi (opsional, kompresi sama seperti §6.6), nama, no. WhatsApp.
- Validasi sama dengan checkout untuk nama/HP.
- Aksi "Kirim Permintaan": simpan ke storage (`status: "baru"`), tampilkan konfirmasi + tombol "Lanjutkan ke WhatsApp" (pesan §7.8). Keduanya terjadi dalam satu klik alur: simpan lalu buka WA (bila popup diblokir, tampilkan tautan manual).

### 7.11 Tentang / Kontak / FAQ / Cara Pemesanan
- **Tentang:** cerita brand (3 paragraf), nilai (handmade, teliti, ramah lingkungan), proses pembuatan (4 langkah: pilih benang → rajut → finishing → packing), CTA ke katalog.
- **Kontak:** kartu WA, Instagram, TikTok, email, jam operasional (dari `CONFIG`), tautan ke `/custom-order`.
- **FAQ:** minimal 8 pertanyaan (bahan, waktu pengerjaan, custom, ongkir, pembayaran, pengembalian, perawatan, pre-order) dalam accordion (satu terbuka, `aria-expanded`, bisa ditutup).
- **Cara Pemesanan:** 5 langkah bernomor + catatan pembayaran manual & verifikasi oleh admin.

---

## 8. Dashboard Demo (`/admin`)

### 8.1 Kerangka
- Sidebar (desktop) / tab horizontal scroll (mobile): Ringkasan, Pesanan, Produk, Custom Order.
- Header: judul halaman, **badge "Mode Demo"** yang selalu terlihat, tombol "Lihat Toko" (→ `/`), tombol "Reset Data Demo".
- Banner kecil penjelasan: "Data disimpan di browser ini saja. Tidak ada login — ini mode demo."
- Tanpa login/route guard, tetapi **tidak** ada tautan dari halaman pembeli selain menu footer "Dashboard (Demo)".

### 8.2 Ringkasan
Kartu statistik: Total Produk, Total Stok, Pesanan Menunggu Verifikasi, Pesanan Diproses, Pesanan Dikirim, Pesanan Selesai, Pesanan Ditolak/Dibatalkan, **Total Pendapatan** = Σ`total` untuk pesanan berstatus `diproses`, `dikirim`, `selesai`. Tambahan: 5 pesanan terbaru (tautan ke detail), produk dengan stok ≤ 3 (peringatan stok rendah).

### 8.3 Pesanan
- Tabel/kartu daftar: kode, tanggal, nama, total, status badge, aksi "Detail". Urut terbaru dulu.
- Filter status (Semua + 6 status) via query string; hitung jumlah per status pada chip.
- Detail:
  - Data pembeli (nama, no. HP yang bisa diklik ke WA, alamat, kota, catatan).
  - Item + harga snapshot, subtotal, ongkir, total.
  - Rekening tujuan + bukti transfer (thumbnail → modal/lightbox ukuran penuh, tombol "Buka di tab baru").
  - Form ubah status (select mematuhi tabel transisi §6.4), input nomor resi (wajib jika `dikirim`), textarea catatan admin, tombol "Simpan Perubahan" dengan toast sukses.
  - Konfirmasi aksi untuk `ditolak`/`dibatalkan` yang menyebutkan "Stok akan dikembalikan".
  - Riwayat singkat: `createdAt`, `updatedAt`.

### 8.4 Produk
- Daftar: thumbnail, nama, kategori, harga, stok, status, flag unggulan/best seller, aksi Edit/Hapus.
- Form tambah/edit: semua field Product, input `gambar` berupa daftar (tambah via upload terkompresi **atau** isi path lokal seperti `/products/tote-sage-1.jpg`), pilihan warna (chip + input tambah/hapus), checkbox unggulan & best seller.
- Validasi: nama ≥ 3, harga integer ≥ 0, stok integer ≥ 0, minimal 1 warna, minimal 1 gambar, slug unik (otomatis dari nama, bisa diubah), kategori wajib.
- Hapus produk: dialog konfirmasi yang menyebut produk akan dihapus dari keranjang.
- Perubahan langsung terlihat di toko (karena satu sumber data).

### 8.5 Custom Order
- Daftar: tanggal, nama, jenis, budget, status badge. Klik → drawer/modal detail (termasuk gambar referensi).
- Ubah status: `baru` → `diproses` → `selesai`, atau `dibatalkan`; tersimpan dengan toast.

### 8.6 Reset Data Demo
- Tombol dengan dialog konfirmasi ketik/centang ("Semua pesanan, produk, dan custom order akan diganti data contoh").
- Aksi: hapus key `agacrochet_*`, tulis seed, kosongkan keranjang, tampilkan toast "Data demo telah direset". Halaman tetap berjalan tanpa reload (broadcast perubahan via `subscribe`).

---

## 9. Alur Checkout Langkah demi Langkah

1. **Tambah ke keranjang** — di detail produk pembeli memilih warna & jumlah, klik "Tambah ke Keranjang". `addToCart` menulis `agacrochet_cart`; badge navbar bertambah; toast tampil. Bila jumlah melebihi stok ready, ditolak dengan pesan.
2. **Buka keranjang** (`/keranjang`) — `getCart` digabung dengan `getProducts` untuk menampilkan nama/harga/stok terkini. Pembeli dapat mengubah jumlah atau menghapus item. Subtotal dihitung ulang setiap perubahan.
3. **Lanjut ke checkout** (`/checkout`) — jika keranjang kosong, redirect ke `/keranjang`. Sistem membaca produk dari storage dan menghitung ulang `subtotal`, `ongkir` (0 jika subtotal ≥ 150000, selain itu 15000), `total`. Jika ada item ready dengan stok < jumlah, tampilkan peringatan dan nonaktifkan tombol sampai jumlah disesuaikan.
4. **Isi form** — nama, no. WhatsApp, alamat, kota, catatan. Nomor HP dinormalisasi saat blur; error ditampilkan per field.
5. **Pilih rekening tujuan** — satu kartu terpilih (default rekening pertama). Nomor rekening dapat disalin.
6. **Transfer manual** (di luar aplikasi) — pembeli mentransfer `total` tepat ke rekening terpilih.
7. **Upload bukti transfer** — file divalidasi (JPG/PNG/WebP, ≤ 2 MB), dikompresi ke lebar maks 800 px, kualitas JPEG 0.7, preview ditampilkan. Tombol submit menunggu kompresi selesai.
8. **Klik "Buat Pesanan"** — validasi seluruh form (termasuk bukti wajib). Bila gagal, scroll ke field pertama yang error.
9. **Pembuatan pesanan (atomik di dalam `createOrder`)**:
   a. Baca ulang produk dari storage (harga otoritatif).
   b. Verifikasi ulang stok & validitas item (produk masih ada, jumlah ≥ 1).
   c. Hitung `subtotal`, `ongkir`, `total`; susun snapshot item.
   d. Buat `kode` unik `AGA-YYYYMMDD-XXXX`.
   e. Kurangi stok produk ready.
   f. Simpan `Order` dengan `status: "menunggu_verifikasi"`, `stokDikembalikan: false`, `createdAt`/`updatedAt` = sekarang.
   g. Kosongkan keranjang (`agacrochet_cart = []`).
   h. Jika salah satu penulisan gagal karena `QuotaExceededError`, kembalikan perubahan stok yang sudah dilakukan, jangan kosongkan keranjang, dan tampilkan pesan: "Penyimpanan browser penuh. Hapus beberapa pesanan lama atau reset data demo, lalu coba lagi."
10. **Redirect** ke `/sukses/:kode`. Halaman membaca pesanan dari storage; menampilkan kode, total, rekening, tombol salin, dan tombol kirim konfirmasi WhatsApp.
11. **Konfirmasi WA** — pesan terformat (§7.8) dibuka di tab baru; pembeli mengirimnya beserta screenshot bukti transfer.
12. **Verifikasi oleh pengelola** — di `/admin/pesanan/:id` admin melihat bukti transfer, lalu memilih status `diproses` (atau `ditolak` bila tidak valid; stok kembali otomatis). Saat `dikirim`, nomor resi wajib diisi.
13. **Pelacakan** — pembeli membuka `/lacak`, memasukkan kode + no. HP, melihat status terbaru dan nomor resi.

---

## 10. Struktur Folder

```
agacrochet/
├─ public/
│  ├─ products/                 # placeholder lokal: <slug>-1.jpg, -2.jpg, placeholder.jpg
│  ├─ favicon.svg
│  └─ _headers                   # opsional
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx                   # definisi route
│  ├─ index.css                 # Tailwind + token desain (@layer base/components)
│  ├─ config.js                 # SATU-SATUNYA sumber: brand, waNumber, sosmed, jam, rekening, ongkir
│  ├─ data/
│  │  └─ seed.js                # seedProducts (15), seedOrders, seedCustomRequests, kategori
│  ├─ lib/
│  │  ├─ storage.js             # satu-satunya akses localStorage + subscribe()
│  │  ├─ format.js              # rupiah(), tanggal(), normalizePhone(), formatPhoneDisplay()
│  │  ├─ image.js               # compressImage(), validasi file
│  │  ├─ whatsapp.js            # buildWaUrl(), pesan konfirmasi/produk/custom
│  │  ├─ pricing.js             # hitungSubtotal(), hitungOngkir(), hitungTotal()
│  │  └─ validate.js            # validasi checkout, produk, custom order
│  ├─ hooks/
│  │  ├─ useStorage.js          # useStorageVersion()
│  │  ├─ useCart.js             # ringkasan keranjang
│  │  └─ useToast.js
│  ├─ components/
│  │  ├─ layout/  Navbar.jsx, MobileMenu.jsx, Footer.jsx, PromoBanner.jsx,
│  │  │           FloatingWhatsApp.jsx, Layout.jsx, AdminLayout.jsx
│  │  ├─ ui/      Button.jsx, Badge.jsx, Input.jsx, Textarea.jsx, Select.jsx,
│  │  │           Accordion.jsx, Modal.jsx, Toast.jsx, EmptyState.jsx,
│  │  │           ImageUploader.jsx, CopyButton.jsx, StatusBadge.jsx
│  │  └─ product/ ProductCard.jsx, ProductGrid.jsx, ProductGallery.jsx,
│  │              ColorPicker.jsx, QtyStepper.jsx, CategoryCard.jsx
│  ├─ pages/
│  │  ├─ Home.jsx, Catalog.jsx, ProductDetail.jsx, Cart.jsx, Checkout.jsx,
│  │  │  OrderSuccess.jsx, TrackOrder.jsx, CustomOrder.jsx, About.jsx,
│  │  │  Contact.jsx, FAQ.jsx, HowToOrder.jsx, NotFound.jsx
│  │  └─ admin/
│  │     Dashboard.jsx, Orders.jsx, OrderDetail.jsx,
│  │     Products.jsx, ProductForm.jsx, CustomRequests.jsx
│  └─ styles/ (opsional bila token dipisah)
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ vercel.json
├─ package.json
└─ SPEC.md
```

**`vercel.json`** (rewrite SPA):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Konvensi kode:** JavaScript (bukan TypeScript), functional component + hooks, satu komponen per file, nama file PascalCase untuk komponen, camelCase untuk util, tidak ada `any`-style `default export` ganda, tidak ada `console.log` yang tertinggal di build produksi.

**Token desain (Tailwind):**
- `cream` `#FAF6F0` (latar), `cream-dark` `#F2EBE1`
- `pink` `#D9A8A0`, `pink-dark` `#B97F76`, `pink-soft` `#F6E7E4`
- `sage` `#A8B5A0`, `sage-dark` `#7E8C77`, `sage-soft` `#EBF0E7`
- `ink` `#3F3A36` (teks), `ink-soft` `#7A716A`
- Font: **Quicksand** (judul) + **Nunito** (body) via Google Fonts, fallback `system-ui, sans-serif`
- Radius: `rounded-2xl` untuk kartu, `rounded-full` untuk tombol pil
- Shadow lembut, tanpa border tebal; fokus terlihat (ring sage)

---

## 11. Nonfunctional Requirements

| Aspek | Target |
|---|---|
| **Performa** | First load < 3 s di 4G; bundle JS awal < 350 KB gzip; LCP beranda < 2,5 s; gambar produk `loading="lazy"` + `width/height` untuk mencegah layout shift |
| **Responsif** | Mobile-first; diuji pada 360 px, 768 px, 1280 px. Tanpa horizontal scroll di semua halaman |
| **Aksesibilitas** | Kontras teks ≥ 4.5:1; semua kontrol dapat dijangkau keyboard; `aria-label` untuk ikon; fokus terlihat; modal/drawer menangkap fokus + Esc; gambar punya `alt` bermakna |
| **Ketahanan data** | Semua mutasi dibungkus try/catch; `QuotaExceededError` → pesan yang dapat ditindaklanjuti; state aplikasi tidak crash saat data korup (JSON invalid → fallback seed + peringatan) |
| **Keamanan** | Tidak ada API key / secret di repo; tidak ada `dangerouslySetInnerHTML`; semua input dari pengguna di-escape secara default oleh React; URL gambar divalidasi hanya `http(s)` atau path relatif |
| **Konsistensi** | Harga selalu `integer`, format `Rp85.000` (tanpa desimal, pemisah titik) |
| **Kualitas kode** | Modul storage satu-satunya yang menyentuh `localStorage` (dapat diverifikasi dengan `grep localStorage src` → hanya `src/lib/storage.js`); tidak ada kode mati; `npm run build` tanpa warning kritis |
| **Deploy** | Build statis `dist/`, deploy ke Vercel, deep-link (`/katalog`) di-refresh tidak 404 berkat `vercel.json` |
| **Browser** | Chrome/Edge/Firefox/Safari versi terbaru (2 rilis terakhir), Chrome Android & Safari iOS |
| **Bahasa** | Seluruh teks UI Bahasa Indonesia; format tanggal `19 November 2026` |

---

## 12. Risiko & Mitigasi

| # | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R1 | **Kapasitas localStorage terbatas** (~5 MB per origin). Base64 menambah ~33% ukuran; 5 MB sulit menampung banyak bukti transfer | Pesanan gagal tersimpan saat demo | Kompresi agresif (max 800 px, q 0.7, fallback q 0.55, target < 400 KB per gambar); tangkap `QuotaExceededError` dengan pesan jelas + saran hapus data/reset; `getStorageStatus()` untuk menampilkan pemakaian; batasi jumlah gambar per produk (maks 3) |
| R2 | **Data hanya ada di satu browser/perangkat**; mode privat/clear site data menghapus semuanya | Pesanan pembeli tidak terlihat admin di perangkat lain; data hilang | Dinyatakan eksplisit di UI (banner admin + halaman Tentang); jalur produksi: ganti `storage.js` ke Supabase tanpa mengubah komponen (kontrak fungsi sinkron → perlu adapter async di iterasi berikutnya) |
| R3 | **Tidak ada verifikasi pembayaran nyata**; status diverifikasi manual oleh admin | Risiko demo terlihat "palsu" | Alur dibuat transparan: status "menunggu verifikasi", bukti transfer ditampilkan ke admin, WhatsApp sebagai jalur konfirmasi |
| R4 | **Bukti transfer base64** bisa membuat daftar pesanan lambat | UI tersendat | Thumbnail kecil di daftar, gambar penuh hanya di modal; gambar disimpan sekali saja (tanpa duplikasi) |
| R5 | **Bentrok kode pesanan** pada hari yang sama | Kode ganda, lacak ambigu | Cek keunikan + retry 10× + fallback 4 karakter alfanumerik |
| R6 | **Restore stok ganda** saat admin menolak/membatalkan berulang | Stok tidak realistis | Flag `stokDikembalikan` + status final tidak dapat diubah |
| R7 | **Kode pesanan tertebak** (4 digit) + no. HP | Orang lain bisa melacak pesanan | Pelacakan mewajibkan kombinasi kode + no. HP; tidak ada endpoint publik; cukup untuk demo, dicatat sebagai batasan |
| R8 | **Seed berubah** setelah data ada di browser penguji | Data lama tidak konsisten dengan skema baru | `version` pada payload + tombol Reset Data Demo; naikkan versi saat skema berubah |
| R9 | **Waktu 1 hari** dengan scope besar | Fitur P0 tidak selesai | Prioritas P0/P1/P2 + iterasi yang masing-masing dapat diuji; P2 dipotong lebih dulu |
| R10 | **Gambar placeholder belum ada** | Kartu produk kosong/rusak | `placeholder.jpg` + `onError` fallback; buat placeholder pastel berlabel kategori lebih awal (iterasi 1) |
| R11 | **Nomor WhatsApp/rekening placeholder** tertukar | Pesan WA salah tujuan | Semua di `src/config.js`, diberi komentar "GANTI SEBELUM DEMO" |
| R12 | **Deep link 404 di Vercel** | Demo gagal saat refresh | `vercel.json` rewrite SPA; uji refresh di `/katalog` dan `/admin/pesanan` |

---

## 13. Out of Scope

- Backend, database, API, dan sinkronisasi multi-perangkat.
- Login/registrasi nyata, peran pengguna, dan proteksi route admin.
- Payment gateway (Midtrans/Xendit), verifikasi transfer otomatis, atau webhook.
- Integrasi ongkir/kurir nyata (RajaOngkir, tracking resi otomatis).
- WhatsApp Business API — hanya tautan `wa.me`.
- Email notifikasi/transaksional.
- Pembuatan akun pembeli, riwayat pesanan per akun, wishlist.
- Ulasan/testimoni yang dikirim pengguna (testimoni beranda statis).
- Varian produk per SKU dengan stok terpisah, kupon/diskon, multi-currency, pajak.
- SEO server-side/SSR, sitemap, i18n multi-bahasa.
- Upload gambar ke storage eksternal (Cloudinary/S3).
- Pembayaran COD, retur/refund otomatis, cetak invoice PDF.

---

## 14. Acceptance Criteria

Dapat diperiksa manual di browser. Format: langkah → hasil yang diharapkan.

### AC-01 Layout Global (F-02)
1. Buka `/` di lebar 375 px → navbar menampilkan logo, ikon hamburger, dan ikon keranjang dengan badge.
2. Klik hamburger → drawer terbuka; klik tautan "Katalog" → drawer tertutup dan halaman katalog tampil.
3. Scroll ke bawah → footer tampil lengkap; tombol WhatsApp melayang tetap terlihat dan tidak menutupi konten penting.
4. Banner promo tampil di atas; klik tutup → banner hilang.
5. Tambah 2 produk ke keranjang → angka pada badge keranjang = total jumlah item (bukan jumlah baris).

### AC-02 Beranda (F-10)
1. Hero menampilkan judul, tagline, dan 2 CTA; CTA "Belanja Sekarang" membuka `/katalog`.
2. Terdapat 5 kartu kategori; klik "Tas & Dompet" → `/katalog?kategori=tas-dompet` dengan chip kategori aktif.
3. Section produk unggulan menampilkan tepat produk dengan `unggulan = true` dari 15 seed.
4. Section keunggulan (minimal 3 poin) dan testimoni (minimal 3 kutipan) tampil.
5. Tidak ada gambar rusak (semua memakai placeholder yang ada).

### AC-03 Katalog (F-11)
1. `/katalog` menampilkan 15 produk dengan default sorting "Terbaru".
2. Ketik "rajut" → hanya produk yang namanya mengandung "rajut" tampil; jumlah hasil tertera.
3. Pilih kategori "Amigurumi" → hanya 4 produk Amigurumi.
4. Kombinasi pencarian + kategori menghasilkan irisan yang benar; "Reset filter" mengembalikan 15 produk.
5. Sorting "Harga Termurah" → urutan naik; "Harga Termahal" → urutan turun; "Terbaru" → berdasarkan `createdAt`.
6. Badge tampil benar: produk #15 "Hiasan Dinding Rajut Daisy" berbadge **Stok Habis**, produk pre-order berbadge **Pre-order**, produk `bestSeller` berbadge **Best Seller**.
7. Refresh halaman dengan filter aktif → filter tetap sama (state di URL).
8. Pencarian tanpa hasil → tampil empty state + tombol reset.

### AC-04 Detail Produk (F-12)
1. Buka produk "Boneka Beruang Mini Mochi" → galeri, harga `Rp85.000`, deskripsi, bahan, ukuran, perawatan, pilihan warna, stepper jumlah tampil.
2. Klik thumbnail kedua → gambar utama berubah.
3. Stepper tidak dapat turun di bawah 1 dan tidak melebihi stok; mengetik 999 → nilai terkoreksi ke stok.
4. Pilih warna "Sage", jumlah 2, klik "Tambah ke Keranjang" → toast tampil, badge keranjang bertambah 2, dan item di `/keranjang` mencatat warna "Sage" jumlah 2.
5. Buka produk "Hiasan Dinding Rajut Daisy" (stok 0) → tombol tambah **nonaktif** dengan label "Stok Habis".
6. Buka produk pre-order → tombol aktif dengan label "Pre-order Sekarang" dan dapat menambah ke keranjang.
7. Klik "Tanya via WhatsApp" → tab baru `wa.me` terbuka dengan pesan berisi nama produk.
8. Bagian produk terkait menampilkan maksimal 4 produk dari kategori yang sama dan tidak memuat produk saat ini.
9. Buka `/produk/slug-tidak-ada` → tampilan produk tidak ditemukan + tautan katalog.

### AC-05 Keranjang (F-13)
1. Keranjang kosong menampilkan pesan hangat + tombol ke katalog.
2. Tambah 3 item berbeda → daftar menampilkan gambar, nama, warna, harga satuan, jumlah.
3. Naikkan jumlah item → subtotal dan total diperbarui seketika.
4. Hapus satu item → item hilang dan subtotal menyesuaikan.
5. Refresh halaman → isi keranjang tetap ada.
6. Tambah produk yang sama dengan warna berbeda → muncul dua baris terpisah; warna sama → jumlah bertambah pada baris yang ada.
7. Menambah produk hingga melebihi stok ready → ditolak dengan pesan yang menyebut sisa stok.

### AC-06 Checkout (F-14)
1. Dari keranjang, klik "Lanjut ke Checkout" → `/checkout` menampilkan ringkasan item dan form.
2. Subtotal Rp100.000 → ongkir `Rp15.000`, total `Rp115.000`. Subtotal Rp160.000 → ongkir **Gratis**, total = subtotal.
3. Submit form kosong → setiap field wajib menampilkan pesan error dan fokus berpindah ke field pertama yang salah.
4. Isi nomor HP `08123456789` → setelah blur tersimpan sebagai `628123456789`; `abc` ditolak dengan pesan format.
5. Pilih rekening Mandiri → kartu Mandiri aktif dan nomor rekening tampil; tombol salin menyalin nomor.
6. Unggah file PDF → ditolak dengan pesan tipe tidak didukung. Unggah PNG 3 MB → ditolak "maksimal 2 MB".
7. Unggah JPG 2 MB → muncul indikator kompresi, preview tampil, dan ukuran hasil < 400 KB (dapat diperiksa di Network/console atau `getStorageStatus`).
8. Klik "Buat Pesanan" tanpa bukti transfer → error "Bukti transfer wajib diunggah".
9. Isi valid + bukti → diarahkan ke `/sukses/<kode>` dan keranjang menjadi kosong.

### AC-07 Pembuatan Pesanan (F-14, §6.1–6.3)
1. Setelah checkout, buka `/admin/pesanan` → pesanan baru muncul paling atas dengan status **Menunggu verifikasi** dan kode berformat `AGA-YYYYMMDD-XXXX`.
2. Detail pesanan menampilkan snapshot item, subtotal, ongkir, total, dan rekening sesuai pilihan.
3. Stok produk ready berkurang sesuai jumlah yang dibeli (cek di `/admin/produk` dan detail produk); stok produk pre-order **tidak** berubah.
4. Ubah harga produk di admin setelah pesanan dibuat → total pesanan lama **tidak berubah**.
5. Buat pesanan kedua di hari yang sama → kode berbeda dari pesanan pertama.
6. Hapus item keranjang saat proses → tidak ada pesanan yang tersimpan setengah jadi (pesanan hanya tersimpan bila semua langkah berhasil).

### AC-08 Halaman Sukses (F-15)
1. `/sukses/:kode` menampilkan kode pesanan, total, rekening, dan status "Menunggu verifikasi".
2. Klik "Salin" → teks berubah "Tersalin!" dan clipboard berisi kode pesanan.
3. Klik "Kirim Konfirmasi ke WhatsApp" → tab baru `wa.me` dengan pesan berisi kode, daftar item (nama, warna, jumlah, harga), dan total.
4. Refresh halaman → data tetap tampil benar.
5. Buka `/sukses/AGA-00000000-0000` → tampilan ramah + tautan ke katalog, tanpa crash.

### AC-09 Lacak Pesanan (F-16)
1. `/lacak` dengan kode valid + no. HP yang dipakai saat memesan (`0812...` maupun `62812...`) → status dan detail pesanan tampil.
2. Kode valid + no. HP berbeda → pesan "Pesanan tidak ditemukan" (tidak membocorkan data).
3. Setelah admin mengisi nomor resi dan status `dikirim`, lacak menampilkan status **Dikirim** + nomor resi.
4. Status `ditolak` → lacak menampilkan status Ditolak beserta catatan admin.

### AC-10 Custom Order (F-17)
1. `/custom-order` menampilkan form lengkap (jenis, warna, ukuran, deskripsi, budget, gambar, nama, HP).
2. Submit kosong → error validasi per field.
3. Isi valid + unggah gambar referensi → permintaan tersimpan, muncul di `/admin/custom-order` dengan status **Baru**, dan tautan WhatsApp (pesan terformat) ditawarkan.
4. Gambar referensi tersimpan hasil kompresi (lebar ≤ 800 px) — dapat diperiksa di detail admin.
5. Submit tanpa gambar → tetap berhasil (gambar opsional).
6. Budget kosong → tersimpan sebagai 0 dan pesan WA menampilkan "belum ditentukan".

### AC-11 Halaman Statis (F-18)
1. `/tentang` memuat cerita brand, nilai, dan 4 langkah proses.
2. `/kontak` menampilkan WA, Instagram, TikTok, email, jam operasional yang identik dengan `src/config.js`; semua tautan membuka tab baru.
3. `/faq` menampilkan ≥ 8 pertanyaan; klik satu item → jawaban terbuka, item lain tertutup; klik lagi → tertutup; dapat dioperasikan dengan keyboard.
4. `/cara-pemesanan` menampilkan 5 langkah dan menyebut pembayaran transfer manual + verifikasi admin.
5. Route tidak dikenal → halaman 404 dengan tautan kembali ke beranda.

### AC-12 Dashboard Ringkasan (F-30, F-31)
1. `/admin` mengarah ke `/admin/ringkasan`; label **"Mode Demo"** terlihat di header.
2. Total produk = 15 dan total stok = jumlah stok seluruh seed (sebelum transaksi).
3. Jumlah pesanan per status sesuai isi `/admin/pesanan`.
4. Total pendapatan = Σ total pesanan berstatus diproses + dikirim + selesai; pesanan menunggu verifikasi **tidak** dihitung.
5. Ada daftar produk stok rendah (≤ 3) dan 5 pesanan terbaru yang dapat diklik.

### AC-13 Pesanan di Admin (F-32, F-33)
1. Filter status "Menunggu verifikasi" → hanya pesanan dengan status tersebut; chip menampilkan jumlah.
2. Detail pesanan: data pembeli, item, total, rekening, dan **bukti transfer** dapat dilihat (thumbnail + tampilan penuh).
3. Ubah status ke `diproses` → badge berubah, `updatedAt` berubah, toast sukses.
4. Ubah ke `dikirim` tanpa nomor resi → ditolak dengan validasi; isi resi → berhasil dan lacak menampilkan resi.
5. Ubah ke `ditolak` (dengan konfirmasi) → stok produk ready kembali bertambah sesuai jumlah pesanan **tepat satu kali**; klik ulang/ubah status tidak menambah stok lagi.
6. Pesanan berstatus `selesai` tidak dapat diubah lagi (kontrol dinonaktifkan).
7. Catatan admin tersimpan dan tampil di halaman lacak.

### AC-14 Produk di Admin (F-34)
1. Tambah produk baru dengan data valid → muncul di `/katalog` dan dapat dibuka detailnya.
2. Slug duplikat ditolak dengan pesan; nama < 3 karakter, harga negatif, stok desimal, tanpa warna, tanpa gambar → masing-masing ditolak.
3. Upload foto → tersimpan terkompresi dan tampil sebagai gambar produk. Isi path `/products/tote-sage-1.jpg` → gambar tersebut tampil.
4. Edit harga & stok → perubahan langsung terlihat di toko.
5. Hapus produk → dialog konfirmasi; setelah dihapus, produk hilang dari katalog dan dari keranjang, sedangkan pesanan lama tetap menampilkan snapshot item.
6. Checkbox "unggulan" mengubah isi section produk unggulan di beranda.

### AC-15 Custom Order di Admin (F-35)
1. Daftar menampilkan semua permintaan dengan tanggal, nama, jenis, budget, status.
2. Detail menampilkan seluruh field + gambar referensi.
3. Ubah status ke `diproses` lalu `selesai` → tersimpan, badge berubah, toast tampil.
4. Status tidak valid (misal `baru` → `selesai` jika diatur berurutan) ditolak/dinonaktifkan sesuai aturan.

### AC-16 Reset Data Demo (F-36)
1. Klik "Reset Data Demo" → dialog konfirmasi muncul; batal → data tidak berubah.
2. Konfirmasi → produk kembali 15, pesanan & custom order kosong, keranjang kosong, stok seed pulih.
3. Setelah reset, halaman tetap responsif tanpa reload dan badge keranjang kembali 0.
4. Setelah reset, refresh halaman → data tetap data seed (bukan data lama).

### AC-17 Penyimpanan & Kuota (F-40–F-42)
1. `grep -r "localStorage" src` hanya menemukan `src/lib/storage.js`.
2. DevTools → Application → Local Storage menampilkan key berawalan `agacrochet_` dengan payload `{ version, updatedAt, data }`.
3. Hapus semua key lalu buka `/` → seed otomatis tertulis dan 15 produk tampil.
4. Isi storage mendekati kuota (upload beberapa gambar besar) lalu checkout → pesan kesalahan penyimpanan penuh muncul, aplikasi tidak crash, stok tidak berkurang, keranjang tetap utuh.
5. Ubah manual isi key menjadi JSON tidak valid lalu refresh → aplikasi tetap tampil (fallback seed) tanpa layar putih.

### AC-18 Normalisasi HP & Format (F-43, F-44)
1. Harga selalu tampil `Rp85.000` (tanpa desimal, pemisah ribuan titik).
2. Tanggal tampil `19 November 2026`.
3. Input `0812-3456-7890`, `+62 812 3456 7890`, dan `6281234567890` menghasilkan nilai tersimpan yang sama (`6281234567890`).
4. Nomor `12345` ditolak dengan pesan format yang jelas.

### AC-19 Build & Deploy
1. `npm run build` selesai tanpa error; `npm run preview` menjalankan aplikasi dan seluruh AC di atas dapat diuji.
2. Deploy ke Vercel berhasil; buka `/katalog` dan refresh → halaman tampil (bukan 404) berkat `vercel.json`.
3. Tidak ada API key/secret di repo (`src/config.js` hanya nomor placeholder).
4. Tidak ada error di console browser selama alur pembeli dan admin dijalankan.

---

## 15. Rencana Implementasi per Iterasi

Setiap iterasi menghasilkan aplikasi yang **dapat dijalankan (`npm run dev`) dan diuji sendiri**. Estimasi total ~10–12 jam kerja fokus.

### Iterasi 0 — Fondasi Proyek (≈ 45 menit)
**Kerjakan:** scaffold Vite + React, React Router, Tailwind, konfigurasi palet & font, `src/config.js` (placeholder + komentar GANTI), `vercel.json`, `public/products/placeholder.jpg` + file placeholder per kategori, struktur folder kosong.
**Uji:** `npm run dev` membuka halaman kosong bertema; `npm run build` sukses; route `/` dan 404 dasar tampil.
**Selesai bila:** build hijau, token warna/font dapat dipakai di kelas Tailwind.

### Iterasi 1 — Lapisan Data (≈ 90 menit)
**Kerjakan:** `seed.js` (15 produk lengkap), `format.js`, `pricing.js`, `validate.js`, `storage.js` lengkap dengan `subscribe()`, `useStorageVersion`, penanganan kuota & JSON rusak.
**Uji:** lewat halaman sementara atau console: `getProducts().length === 15`; tambah/ubah/hapus produk; `createOrder` mengurangi stok & mengosongkan keranjang; `trackOrder` cocok dengan HP ternormalisasi; `resetDemoData` memulihkan seed; simulasi `QuotaExceededError` menampilkan pesan.
**Selesai bila:** semua kontrak §5.7 berfungsi dan `localStorage` hanya disentuh di `storage.js`.

### Iterasi 2 — Layout & Beranda (≈ 90 menit)
**Kerjakan:** Navbar (badge keranjang), drawer mobile, footer, banner promo, tombol WA melayang, komponen UI dasar (Button, Badge, Card, EmptyState, Toast), halaman Beranda lengkap dengan data seed.
**Uji:** AC-01 dan AC-02.
**Selesai bila:** beranda terlihat rapi di 375 px & 1280 px dan navigasi berfungsi.

### Iterasi 3 — Katalog & Detail Produk (≈ 100 menit)
**Kerjakan:** Katalog (search, filter, sort, URL state, empty state), ProductCard/Grid, detail produk (galeri, warna, stepper, badge, tombol WA, produk terkait), logika disable stok habis.
**Uji:** AC-03 dan AC-04.
**Selesai bila:** 15 produk tampil benar dan semua kombinasi filter/sort akurat.

### Iterasi 4 — Keranjang (≈ 45 menit)
**Kerjakan:** Halaman keranjang (daftar, stepper, hapus, ringkasan, empty state), `useCart`, toast.
**Uji:** AC-05.
**Selesai bila:** perubahan keranjang persisten setelah refresh dan subtotal selalu akurat.

### Iterasi 5 — Checkout, Upload & Sukses (≈ 120 menit)
**Kerjakan:** `image.js` (kompresi + validasi), `whatsapp.js`, halaman Checkout (form, validasi, rekening, upload+preview, ringkasan biaya), `createOrder` end-to-end, halaman Sukses (salin kode, tombol WA).
**Uji:** AC-06, AC-07, AC-08, AC-17 butir 4.
**Selesai bila:** satu pesanan lengkap dapat dibuat, stok berkurang, keranjang kosong, kode unik tampil, dan WA terbuka dengan pesan benar.

### Iterasi 6 — Lacak Pesanan & Custom Order (≈ 75 menit)
**Kerjakan:** Halaman Lacak (form + stepper status + resi + catatan admin), Custom Order (form + upload + simpan + WA).
**Uji:** AC-09, AC-10.
**Selesai bila:** pesanan baru dapat dilacak dengan kode + HP, dan permintaan custom muncul di data.

### Iterasi 7 — Dashboard Admin (≈ 150 menit)
**Kerjakan:** AdminLayout + Mode Demo, Ringkasan, Pesanan (daftar/filter/detail/ubah status/resi/catatan/bukti), restore stok sekali, Produk (CRUD + upload/URL), Custom Order (daftar/detail/status), Reset Data Demo.
**Uji:** AC-12, AC-13, AC-14, AC-15, AC-16.
**Selesai bila:** seluruh siklus pesanan dapat diselesaikan dari sisi toko tanpa menyentuh DevTools.

### Iterasi 8 — Halaman Statis & Polish (≈ 75 menit)
**Kerjakan:** Tentang, Kontak, FAQ (accordion aksesibel), Cara Pemesanan, 404; penyempurnaan responsif, fokus, `alt`, meta title/description per halaman, optimasi gambar.
**Uji:** AC-11, AC-18, plus penelusuran keyboard.
**Selesai bila:** tidak ada tautan mati, tidak ada gambar rusak, dan navigasi keyboard berjalan.

### Iterasi 9 — Verifikasi & Deploy (≈ 60 menit)
**Kerjakan:** jalankan seluruh AC-01..AC-19, perbaiki temuan, `npm run build`, deploy Vercel, uji deep link.
**Uji:** checklist AC penuh di build produksi (`npm run preview`) + URL Vercel.
**Selesai bila:** semua AC P0 lulus; AC P1 lulus atau tercatat sebagai batasan; P2 opsional.

**Strategi pemotongan bila waktu mepet:** hentikan di Iterasi 7 (semua P0 selesai); P1 (halaman statis) disederhanakan menjadi satu halaman gabungan; P2 dibatalkan.

---

## 16. Definisi Selesai (Definition of Done)

- Semua acceptance criteria P0 lulus di `npm run preview` dan di URL Vercel.
- `npm run build` tanpa error.
- Tidak ada akses `localStorage` di luar `src/lib/storage.js`.
- Tidak ada API key/secret; nomor WhatsApp dan rekening hanya di `src/config.js`.
- Aplikasi dapat dipakai penuh di lebar 360 px dan 1280 px.
- Alur demo 3 menit berjalan lancar: beranda → katalog → detail → keranjang → checkout (upload bukti) → sukses → WA → admin ubah status + resi → lacak.
