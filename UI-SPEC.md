# UI-SPEC — Agacrochet · Bagian 1: Fondasi Visual

**Bagian 1 dari 3.** Dokumen ini menetapkan fondasi desain (warna, tipografi, layout, gerak).
Bagian 2 (komponen & state) dan Bagian 3 (wireframe ASCII, copywriting, pedoman foto) menyusul terpisah.
Rujukan kebutuhan: `SPEC.md`. Target: Nuansa **ceria, hangat, playful** — seperti toko rajutan di sore hari — tetapi tetap rapi dan mudah dibaca.

## 1. Prinsip Desain

1. **Ceria tapi tenang** — warna pastel sebagai latar, teks selalu gelap. Tidak ada blok warna pekat.
2. **Bulat dan lembut** — sudut membulat besar, bayangan tipis berlapis, tanpa garis tebal.
3. **Mainan kecil, bukan hiruk-pikuk** — animasi mikro 120–280 ms, satu fokus per layar.
4. **Mobile-first** — semua keputusan layout dimulai dari 360 px.
5. **Aksesibilitas bukan tambahan** — kontras, fokus, target 44 px, dan status non-warna melekat pada komponen.

---

## 2. Design Tokens Warna

| Token | Hex | Kegunaan |
|---|---|---|
| `primary` | `#A8C6E7` | Latar tombol utama (CTA), navbar aktif, kartu kategori, aksen blok. **Selalu dengan teks `ink`.** |
| `primary-hover` | `#93B9DF` | Hover tombol primary (lihat catatan §2.3) |
| `primary-active` | `#7FA9D4` | State ditekan tombol primary |
| `primary-dark` | `#2F5D8C` | Link, label berwarna, ikon, border/ring, hover teks link |
| `primary-soft` | `#E4EFFA` | Latar chip terpilih, kartu info, highlight lembut |
| `primary-ink` | `#23486E` | Teks sekunder **di atas** `primary` (pengganti `ink-soft`) |
| `secondary` | `#FFF2B2` | Badge, highlight, banner promo, section selang-seling, tombol sekunder |
| `secondary-hover` | `#FCEA9E` | Hover tombol sekunder |
| `secondary-dark` | `#7A611A` | Border wajib tombol kuning, border badge, teks di atas kuning |
| `secondary-tint` | `#FFFAEB` | Latar section alternatif (pengganti putih) |
| `cream` | `#FFFCF5` | Latar halaman utama |
| `surface` | `#FFFFFF` | Permukaan kartu, modal, input |
| `ink` | `#2D2A3E` | Teks utama, judul, harga |
| `ink-soft` | `#5C5870` | Teks sekunder, caption, metadata |
| `border` | `#E7E2D8` | Garis dekoratif, pemisah kartu (bukan batas input) |
| `border-strong` | `#6B667F` | Border input/komponen interaktif (wajib ≥3:1) |
| `success` / `success-bg` | `#1E6B3A` / `#DCF3E3` | Status selesai, toast sukses |
| `warning` / `warning-bg` | `#7A4B00` / `#FFF0CC` | Menunggu verifikasi, peringatan stok |
| `error` / `error-bg` | `#8C2F2A` / `#FBE0DE` | Error validasi, status ditolak, tombol hapus |
| `info` / `info-bg` | `#1F4F7A` / `#E1EEF9` | Status diproses, catatan informasi |
| `neutral` / `neutral-bg` | `#4A4557` / `#EFEDF3` | Status dibatalkan, badge Stok Habis |
| `accent-pink` / `accent-pink-bg` | `#7A3A57` / `#F3D9E6` | Badge Pre-order, sentuhan hangat dekoratif |

### 2.3 Catatan penyimpangan yang disengaja

- `primary-dark` **tidak** dipakai sebagai latar hover tombol primary: `ink` di atasnya hanya **2,03:1** (gagal). Hover memakai `primary-hover` yang tetap aman untuk teks gelap.
- `primary-dark` di atas `primary` hanya **3,88:1** → boleh untuk ikon, border, dan teks ≥24 px; **tidak** untuk body text.
- Tidak ada teks putih di mana pun. Tidak ada `#FFFFFF` sebagai warna teks.

---

## 3. Kontras (WCAG 2.1 AA — terverifikasi hitungan, bukan perkiraan)

Ambang: **4,5:1** teks normal · **3:1** teks besar (≥24 px / ≥18,66 px bold) dan komponen UI.

| Teks | Latar | Rasio | Status |
|---|---|---|---|
| `ink` #2D2A3E | `cream` #FFFCF5 | **13,55:1** | AAA |
| `ink` | `surface` #FFFFFF | **13,89:1** | AAA |
| `ink` | `primary` #A8C6E7 | **7,87:1** | AAA |
| `ink` | `primary-hover` #93B9DF | **6,77:1** | AAA |
| `ink` | `primary-active` #7FA9D4 | **5,64:1** | AA |
| `ink` | `secondary` #FFF2B2 | **12,30:1** | AAA |
| `ink` | `secondary-hover` #FCEA9E | **11,51:1** | AAA |
| `ink` | `primary-soft` #E4EFFA | **11,92:1** | AAA |
| `ink` | `secondary-tint` #FFFAEB | **13,31:1** | AAA |
| `primary-ink` #23486E | `primary` | **5,35:1** | AA (teks sekunder di kartu kategori) |
| `ink-soft` #5C5870 | `cream` | **6,64:1** | AA |
| `ink-soft` | `surface` | **6,81:1** | AA |
| `primary-dark` #2F5D8C | `cream` / `surface` | **6,69:1** / **6,85:1** | AA (link) |
| `primary-dark` | `primary-soft` | **5,88:1** | AA |
| `primary-dark` | `primary` | **3,88:1** | Hanya ikon/border/teks besar |
| `secondary-dark` #7A611A | `cream` / `surface` | **5,77:1** / **5,91:1** | AA |
| `secondary-dark` | `secondary` (border & label) | **5,23:1** | AA |
| `success` #1E6B3A | `success-bg` #DCF3E3 | **5,58:1** | AA |
| `warning` #7A4B00 | `warning-bg` #FFF0CC | **6,56:1** | AA |
| `error` #8C2F2A | `error-bg` #FBE0DE | **6,58:1** | AA |
| `info` #1F4F7A | `info-bg` #E1EEF9 | **7,24:1** | AAA |
| `neutral` #4A4557 | `neutral-bg` #EFEDF3 | **7,93:1** | AAA |
| `accent-pink` #7A3A57 | `accent-pink-bg` #F3D9E6 | **6,18:1** | AA |
| `border-strong` #6B667F | `cream` / `surface` | **5,35:1** / **5,48:1** | AA komponen UI |
| **Putih #FFFFFF** | `primary` / `secondary` | **1,77:1** / **1,13:1** | **DILARANG** |
| `border` #E7E2D8 | `cream` | 1,26:1 | Dekoratif saja — jangan untuk batas input |

Aturan turunan: batas input, border tombol sekunder, dan indikator fokus **wajib** memakai `border-strong`, `secondary-dark`, atau `primary-dark`; jangan memakai `border`.

---

## 4. Tipografi

**Fredoka** (500/600/700) untuk judul, harga, angka statistik. **Nunito** (400/600/700) untuk teks. Muat via Google Fonts dengan `display=swap`, fallback `ui-rounded, "Segoe UI", system-ui, sans-serif`.
Bobot judul **tidak** italic; tracking judul `-0.01em`; body `0`; line-height longgar agar terasa ramah.

| Token | Mobile (px/lh) | Desktop ≥1024 (px/lh) | Font / bobot | Pemakaian |
|---|---|---|---|---|
| `display` | 34 / 40 | 56 / 62 | Fredoka 700 | Judul hero |
| `h1` | 28 / 34 | 44 / 50 | Fredoka 700 | Judul halaman |
| `h2` | 24 / 30 | 34 / 42 | Fredoka 600 | Judul section |
| `h3` | 20 / 26 | 26 / 34 | Fredoka 600 | Judul kartu besar, modal |
| `h4` | 17 / 24 | 20 / 28 | Fredoka 500 | Subjudul, nama produk di keranjang |
| `body-lg` | 16 / 26 | 18 / 30 | Nunito 400 | Paragraf pembuka, deskripsi produk |
| `body` | 16 / 26 | 17 / 28 | Nunito 400 | Teks umum |
| `body-sm` | 14 / 22 | 15 / 24 | Nunito 400 | Metadata, catatan form |
| `label` | 14 / 20 | 14 / 20 | Nunito 700 | Label input, tombol |
| `caption` | 13 / 18 | 14 / 20 | Nunito 500 | Caption, badge, breadcrumb |
| `price` | 20 / 26 | 26 / 32 | Fredoka 600 + `tabular-nums` | Harga produk, total |
| `price-sm` | 15 / 20 | 16 / 22 | Fredoka 600 + `tabular-nums` | Harga di kartu produk |

Batas panjang baris teks: **68ch**. Judul maksimal 2 baris di kartu (clamp). Hindari teks di bawah 13 px.

---

## 5. Radius, Bayangan, Spacing, Layout

| Radius | Nilai | Dipakai untuk |
|---|---|---|
| `sm` | 8 px | Badge kecil, checkbox |
| `md` | 12 px | Input, chip, thumbnail |
| `lg` | 16 px | Gambar produk, kartu kecil |
| `xl` | 24 px | Kartu produk/kategori, panel |
| `2xl` | 32 px | Hero, modal, banner promo |
| `full` | 9999 px | Semua tombol, badge, avatar, stepper |

| Bayangan | Nilai | Dipakai |
|---|---|---|
| `soft` | `0 1px 2px rgba(45,42,62,.06), 0 8px 24px -12px rgba(45,42,62,.14)` | Kartu default |
| `lift` | `0 2px 4px rgba(45,42,62,.07), 0 18px 36px -16px rgba(45,42,62,.22)` | Kartu hover |
| `pop` | `0 12px 32px -8px rgba(45,42,62,.28)` | Dropdown, toast, modal |
| `inset-focus` | `0 0 0 3px rgba(168,198,231,.55)` | Cincin fokus tambahan |

**Spacing scale (kelipatan 4):** 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96 px.
Jarak dalam kartu 16–20 px; antar kartu grid 16 px (mobile) / 24 px (desktop); padding section 48 px mobile / 96 px desktop.

| Breakpoint | Lebar | Perilaku kunci |
|---|---|---|
| base | 0–639 | 1 kolom, nav hamburger, grid produk 2 kolom, section 48 px |
| `sm` | 640–767 | Grid kategori 3 kolom, form 2 kolom untuk nama+HP |
| `md` | 768–1023 | Nav horizontal muncul, grid produk 3 kolom, footer 2 kolom |
| `lg` | 1024–1279 | Grid produk 4 kolom, galeri produk 2 kolom, section 96 px |
| `xl` | ≥1280 | Container maksimum, sidebar admin tetap |

Container konten **1200 px** (toko) / **1440 px** (admin), padding 16 / 24 / 32 px. Grid produk: 2 / 3 / 4 kolom. Grid kategori: 2 / 3 / 5. Footer: 1 / 2 / 4.

---

## 6. Gaya Visual Ceria

**Motif benang & jahitan (SVG inline sederhana, selalu `aria-hidden="true"`):**

- *Gulungan benang*: lingkaran 40 px dengan 3 garis lengkung di dalam + ekor benang melengkung keluar. Warna `primary-dark` opasitas 18–25% atau `secondary-dark` 20%. Ditempatkan di sudut hero, header section, dan empty state.
- *Garis jahitan putus-putus*: `stroke-dasharray="2 8"`, `stroke-linecap="round"`, tebal 2 px, `primary-dark` 30%. Dipakai sebagai pemisah antar blok di dalam kartu dan di bawah judul section.
- *Pembatas gelombang*: SVG lebar penuh, tinggi 32 px (mobile) / 56 px (desktop), `<path d="M0,32 C120,0 240,64 360,32 S600,0 720,32 V64 H0 Z">`, warna sama dengan latar section berikutnya sehingga terlihat menyambung.
- Motif **tidak boleh** berada langsung di belakang teks paragraf; hanya di area kosong atau di belakang judul besar dengan opasitas ≤ 20%.

**Animasi mikro:**

| Interaksi | Efek | Durasi / easing |
|---|---|---|
| Hover kartu produk | `translateY(-4px)` + bayangan `lift` + gambar `scale(1.03)` | 180 ms `cubic-bezier(.22,.61,.36,1)` |
| Hover tombol | `scale(1.02)` + warna naik satu tingkat | 120 ms |
| Tekan tombol | `scale(.98)` | 90 ms |
| Item masuk keranjang | ikon keranjang bergoyang `rotate(-8deg → 8deg → 0)` + badge `scale(1 → 1.25 → 1)` | 400 ms `cubic-bezier(.34,1.56,.64,1)` |
| Badge jumlah berubah | angka `fade + slide-y 4px` + pop | 200 ms |
| Section muncul saat scroll | `opacity 0→1`, `translateY(12px→0)`, sekali saja | 280 ms |
| Drawer/menu mobile | slide dari kanan + overlay `fade` | 240 ms |
| Toast | slide-up 12 px + fade | 200 ms |
| Akordeon FAQ | tinggi + rotasi chevron 180° | 200 ms |

**`prefers-reduced-motion: reduce`:** semua durasi menjadi `1ms`, transform/scale/goyangan dimatikan, animasi scroll dihapus (konten langsung tampil), efek hover diganti perubahan warna/bayangan saja. Tidak ada elemen yang berkedip atau bergerak otomatis lebih dari 5 detik.

**Fokus keyboard:** outline `3px solid #2F5D8C` dengan `outline-offset: 2px` (kontras 6,69:1 terhadap latar) pada semua elemen interaktif; jangan pernah `outline: none` tanpa pengganti. Target sentuh minimum **44×44 px**, jarak antar target ≥ 8 px.

---

## 7. Daftar Komponen (Bagian 2)

Gaya penulisan: **tampilan** · *varian* · state penting. Semua tombol memakai radius `full`, target ≥44 px, dan cincin fokus `primary-dark`.

### 7.1 Global

**Navbar** — Tinggi 56 px mobile / 72 px desktop, latar `surface` dengan border bawah `border`, logo teks Fredoka + motif benang 24 px. *Sticky (default) / transparan di atas hero (hanya beranda).* State: tautan aktif berlatar `primary` + teks `ink`; hover tautan `primary-soft`.

**Menu mobile** — Drawer dari kanan, lebar 88% maks 360 px, radius kiri `2xl`, overlay `ink` 40%. Berisi tautan utama, tautan sekunder, dan tombol WA lebar penuh. State: tombol hamburger `aria-expanded`, fokus terperangkap, tutup via tombol ×, Esc, atau klik overlay.

**Badge keranjang** — Lingkaran 20 px (`primary` dengan teks `ink`, border 2 px `surface`) menempel di sudut kanan atas ikon 24 px. *Kosong (tersembunyi) / 1–9 / 9+ (tampil "9+").* State: pop-scale saat jumlah berubah, ikon bergoyang saat item ditambahkan; `aria-label="Keranjang, 3 item"`.

**Banner promo** — Bar 36/40 px, latar `secondary`, teks `ink` 13–14 px + ikon percikan, tombol tutup 44 px. *Dapat ditutup (disimpan per sesi).* State: hover tombol tutup `secondary-hover`; hilang tanpa menggeser navbar sticky.

**Hero** — Latar `primary-soft` dengan gelombang bawah, grid 2 kolom desktop (teks kiri, gambar kanan), padding 32/80 px. *Beranda saja.* State: dua CTA (primary + secondary), motif benang opasitas 20% di sudut, gambar `loading="eager"`.

**Footer** — Latar `secondary-tint`, 1/2/4 kolom, pemisah jahitan putus-putus di atas, teks `ink-soft` 14 px. Berisi brand, tautan cepat, kontak, sosial, jam operasional, dan tautan "Dashboard (Demo)". State: hover tautan `primary-dark` + underline.

### 7.2 Katalog & Produk

**Kartu kategori** — Kartu radius `xl`, latar `primary` (varian `secondary` untuk 2 kartu selang-seling), ikon garis 32 px, nama Fredoka 600, jumlah produk `primary-ink` 13 px. *Ukuran: 2 kolom mobile → 5 kolom desktop.* State: hover terangkat 4 px + ikon bergeser 2 px; fokus outline 3 px.

**Kartu produk** — Gambar 1:1 radius `lg`, badge di kiri atas, nama 15 px (clamp 2 baris), kategori caption, harga `price-sm`, indikator stok. *Varian: default, unggulan (border 2 px `secondary`), stok habis (gambar `opacity .6`).* State: hover naik + `lift` + gambar zoom 1.03; seluruh kartu satu tautan, fokus menampilkan cincin.

**Badge produk** — Pil 12 px/16 px, padding 6×12, ikon 12 px + teks (bukan warna saja). *Best Seller* (`primary`/`ink`), *New* (`secondary`/`ink` + border `secondary-dark`), *Pre-order* (`accent-pink-bg`/`accent-pink`), *Stok Habis* (`neutral-bg`/`neutral` + ikon coret).

**Pencarian** — Input radius `full` 44 px, ikon kaca 20 px di kiri, tombol hapus di kanan bila terisi, latar `surface`. *Varian katalog (penuh) dan navbar (ikon → melebar, desktop).* State: fokus border `primary-dark` 2 px; kosong menampilkan saran "Coba: tas, boneka, bunga"; tanpa hasil → empty state.

**Chip filter kategori** — Pil 36 px, padding 12×16, border 1,5 px `border`. *Terpilih: latar `primary`, border `primary-dark`, teks `ink`, ikon centang.* State: hover `primary-soft`; dapat digulir horizontal di mobile dengan `scroll-snap`.

**Sorting** — Select native yang diberi gaya (radius `md`, border `border-strong`, chevron kustom) + label `sr-only`. *Terbaru / Harga Termurah / Harga Termahal.* State: fokus border `primary-dark`, nilai aktif tetap terlihat saat di-refresh (query string).

**Galeri produk** — Gambar utama 1:1 radius `lg`, thumbnail 72 px (4–5 baris horizontal, dapat digulir) dengan border 2 px `primary-dark` pada yang aktif. *Varian mobile (swipe + dot indikator) dan desktop (utama + kolom thumbnail).* State: gambar gagal dimuat → `placeholder.jpg` + alt tetap.

**Pemilih warna** — Deretan tombol pil 40 px berisi nama warna (bukan hanya swatch) + titik warna 12 px. *Terpilih: border 2 px `primary-dark`, latar `primary-soft`.* State: fokus cincin; wajib dipilih, default warna pertama.

**Pemilih jumlah** — Grup pil 44 px: tombol −, nilai tengah `tabular-nums`, tombol +; label "Jumlah" di atas. *Varian kompak (keranjang) dan besar (detail produk).* State: − nonaktif saat 1, + nonaktif saat mencapai stok (dengan teks "Maks. stok"); input manual dikoreksi ke batas.

### 7.3 Tombol & Transaksi

**Tombol primary** — Latar `primary`, teks `ink` `label` 700, radius `full`, tinggi 48 px (44 px versi kecil), padding 20/24 px. *Varian: solid, dengan ikon, lebar penuh (mobile).* State: hover `primary-hover` + scale 1.02; active `primary-active`; focus cincin 3 px `primary-dark`; disabled `primary-soft` + teks `ink-soft` 60% + `not-allowed`; loading spinner 16 px + teks "Memproses…", lebar tidak berubah.

**Tombol secondary** — Latar `secondary`, teks `ink`, **border 2 px `secondary-dark` wajib**, tinggi 48 px. *Varian solid dan outline.* State: hover `secondary-hover` + border `secondary-dark`; disabled latar `secondary-tint` + border `border` + teks `ink-soft`; loading sama seperti primary.

**Tombol ghost** — Latar transparan, teks `primary-dark`, tanpa border. *Varian: teks + ikon, ikon saja (44×44), danger (teks `error`).* State: hover latar `primary-soft`; active `primary` 40%; fokus outline; disabled teks `ink-soft` 50%.

**Tombol WhatsApp melayang** — Lingkaran 56 px, latar `#128C7E` (hijau WhatsApp versi tua) dengan **ikon putih** — pengecualian ikon, bukan teks; kontras ikon **4,14:1** (lolos 3:1). Hijau resmi `#25D366` ditolak karena hanya 1,98:1. Bayangan `pop`, fixed kanan-bawah 16 px, `bottom` 80 px bila ada sticky bar. State: hover scale 1.06; label tooltip "Chat kami" muncul di desktop; `aria-label` eksplisit.

**Item keranjang** — Baris kartu `surface`: gambar 80 px radius `md`, nama `h4`, warna + harga satuan `ink-soft`, stepper kompak, subtotal baris `price-sm`, tombol hapus ikon 44 px. *Varian normal dan peringatan stok.* State: hover baris bayangan `soft`; hapus menampilkan konfirmasi inline ("Hapus? Ya / Batal"); stok kurang → latar `warning-bg` + teks peringatan.

**Input upload bukti transfer** — Dropzone bergaris putus-putus 2 px `border-strong`, radius `lg`, tinggi 160 px, ikon unggah + teks "JPG, PNG, atau WebP · maks 2 MB". Setelah dipilih: pratinjau 4:5 radius `md` + nama file + ukuran hasil kompresi ("320 KB") + tombol ganti/hapus. State: drag-over `primary-soft`; error border `error` + pesan ikon; loading "Mengompres…" dengan progress bar kecil; sukses ikon centang `success`.

**Ringkasan pesanan** — Panel `surface` radius `xl`, baris label–nilai dengan `tabular-nums`, pemisah jahitan putus-putus, total `price` 700. *Varian sticky sidebar (desktop ≥1024) dan kartu penutup (mobile).* State: ongkir gratis ditampilkan `success` + teks "Gratis"; loading skeleton 3 baris; error perhitungan → pesan `error` + tombol coba lagi.

**Badge status pesanan** — Pil 12 px dengan **titik/ikon + teks**. *Menunggu verifikasi* (`warning`), *Diproses* (`info`), *Dikirim* (`primary-soft`/`primary-dark` + ikon truk), *Selesai* (`success`), *Ditolak* (`error`), *Dibatalkan* (`neutral`). State: ukuran `sm` (tabel) dan `md` (detail/lacak); tidak pernah mengandalkan warna saja.

**Toast** — Kartu radius `lg`, lebar maks 360 px, latar `surface` + border kiri 4 px sesuai jenis, ikon + judul + pesan + tombol tutup. *Sukses / info / peringatan / error.* State: masuk 200 ms slide-up; auto-dismiss 4 detik (error 8 detik), pause saat hover; `role="status"` + `aria-live="polite"`; maksimal 3 bertumpuk di atas tombol WA.

### 7.4 Konten

**Testimoni** — Kartu `surface` radius `xl`, tanda kutip dekoratif `primary` 40% di sudut, teks 15 px `ink`, footer berisi avatar inisial 40 px + nama depan + kota. *Varian 3 kolom desktop, carousel snap di mobile.* State: statis (tanpa hover berlebihan), indikator dot pada carousel.

**Accordion FAQ** — Baris `surface` radius `lg` dengan border bawah `border`, judul 16 px 700, chevron 20 px. State: tertutup / terbuka (chevron berputar 180°, isi `ink-soft` 15 px, padding bawah 16 px); hanya satu terbuka; `aria-expanded` + `aria-controls`; fokus outline pada tombol header.

**Empty state** — Ilustrasi benang 96 px, judul `h3`, satu kalimat hangat `ink-soft`, satu CTA primary. *Varian: keranjang kosong (CTA "Lihat Katalog"), hasil pencarian kosong (CTA "Reset filter"), pesanan tidak ditemukan, daftar admin kosong.* State: CTA selalu fokusabel; ilustrasi `aria-hidden`.

### 7.5 Dashboard Demo

**Label "Mode Demo"** — Pil `secondary` dengan border 1,5 px `secondary-dark`, ikon informasi + teks 12 px 700, selalu terlihat di header admin (bukan di dalam menu). Varian: pil di header + banner tipis di atas konten yang menjelaskan data hanya tersimpan di browser ini.

**Kartu statistik** — Kartu `surface` radius `xl` padding 20 px: label caption `ink-soft`, angka `h2` Fredoka 700 `tabular-nums`, ikon bulat 40 px berlatar `primary-soft`/`secondary-tint`. *Varian 7 kartu status + pendapatan (aksen `primary`).* State: hover naik 2 px; klik menuju daftar terfilter; skeleton saat memuat.

**Tabel/daftar pesanan** — Desktop: tabel dengan header `ink-soft` 13 px, baris 56 px, zebra `cream`, kolom kode (monospace 13 px), tanggal, nama, total, badge status, aksi. Mobile: kartu bertumpuk. State: hover baris `primary-soft`; filter status berupa chip dengan jumlah; baris kosong → empty state.

**Modal bukti transfer** — Overlay `ink` 50%, panel `surface` radius `2xl` maks 560 px, gambar 4:5 `object-contain`, tombol "Buka di tab baru" (ghost) + tutup. State: fokus terperangkap, Esc menutup, klik overlay menutup; loading spinner saat gambar dimuat; `role="dialog"` + `aria-modal`.

**Form produk** — Panel `surface` radius `xl`, field 2 kolom desktop / 1 kolom mobile, upload gambar dengan pratinjau 1:1 dan tombol hapus per gambar, chip warna yang dapat ditambah/hapus, dua checkbox (`unggulan`, `bestSeller`) bergaya kartu. State: error per field (`aria-invalid` + teks `error`), tombol simpan loading, perubahan belum disimpan → peringatan saat meninggalkan halaman.

**Dialog Reset Data Demo** — Modal maks 440 px, ikon peringatan `warning`, teks konsekuensi + checkbox konfirmasi, tombol danger ("Ya, reset") dan ghost ("Batal"). State: tombol aktif hanya setelah konfirmasi dicentang; proses menampilkan loading lalu toast sukses.

---

## 8. Wireframe ASCII (Bagian 3)

Bingkai digambar terbuka ke kanan agar tetap rapi; `[ ]` = komponen, `( )` = catatan. Skala: desktop 1200 px, mobile 360 px.

### 8.1 Beranda — Desktop
```
┌─ PROMO BANNER (secondary) ─────────────────────────────
│ Gratis ongkir untuk pembelian mulai Rp150.000     [×]
├─ NAVBAR sticky 72px ────────────────────────────────
│ ◌ Agacrochet   Beranda  Katalog  Custom  Tentang  ␣ [cari] [🛒2]
├─ HERO (primary-soft + gelombang bawah) ───────────────
│  Rajutan handmade, dibuat         ┌───────────────┐
│  satu per satu dengan sabar.      │  foto produk  │
│  [Belanja Sekarang] [Custom Order]│  1:1          │
├─ KATEGORI (5 kolom, primary) ─────────────────────────
│ [Amigurumi 4] [Tas 3] [Fashion 3] [Aksesoris 3] [Dekorasi 2]
├─ PRODUK UNGGULAN (4 kolom) ───────────────────────────
│ [img badge][img][img][img]
├─ KEUNGGULAN (3 kolom, secondary-tint) ────────────────
│ [100% handmade] [Bisa custom] [Dikemas rapi]
├─ TESTIMONI (3 kartu) ─────────────────────────────────
│ [kutipan][kutipan][kutipan]
├─ FOOTER (4 kolom) ────────────────────────────────────
└───────────────────────────────────────── [WA float ↘]
```

### 8.2 Beranda — Mobile
```
┌─ BANNER ─────────────────
│ Gratis ongkir ≥Rp150.000 [×]
├─ NAVBAR 56px ─────────────
│ ◌ Agacrochet      [🛒2] [☰]
├─ HERO ────────────────────
│  Rajutan handmade,
│  dibuat dengan sabar.
│  [Belanja Sekarang]
│  [Custom Order]
│  ┌─────────────────┐
│  │   foto 1:1      │
│  └─────────────────┘
├─ KATEGORI (2 kolom) ──────
│ [Amigurumi] [Tas]
│ [Fashion]   [Aksesoris]
│ [Dekorasi ]
├─ PRODUK UNGGULAN ─────────
│ [kartu][kartu]
│ [kartu][kartu]
├─ KEUNGGULAN (tumpuk) ─────
│ [100% handmade]
│ [Bisa custom]
├─ TESTIMONI (carousel) ────
│ [kutipan]  ● ○ ○
├─ FOOTER ──────────────────
└────────────── [WA float]
```

### 8.3 Katalog — Desktop
```
┌─ NAVBAR ───────────────────────────────────────────────
├─ JUDUL: Katalog Rajutan ───────────────────────────────
│ [🔍 Cari nama produk........................]  [Sort ⌄]
│ [Semua] [Amigurumi] [Tas & Dompet] [Fashion] [Aksesoris] [Dekorasi]
│ Menampilkan 15 produk
├─ GRID 4 KOLOM ─────────────────────────────────────────
│ [kartu][kartu][kartu][kartu]
│ [kartu][kartu][kartu][kartu]
│ [kartu][kartu][kartu][kartu]   (15 produk)
├─ FOOTER ───────────────────────────────────────────────
```

### 8.4 Katalog — Mobile
```
┌─ NAVBAR ─────────────────
├─ Katalog Rajutan ─────────
│ [🔍 Cari produk.....] [⌄]
│ (chip scroll →)
│ [Semua][Amigurumi][Tas]
│ 15 produk
├─ GRID 2 KOLOM ────────────
│ [kartu]  [kartu]
│ [kartu]  [kartu]
│ [kartu]  [kartu]
├─ (scroll) ────────────────
└────────────── [WA float]
```

### 8.5 Detail Produk — Desktop
```
┌─ NAVBAR ───────────────────────────────────────────────
│ Beranda / Katalog / Boneka Beruang Mini "Mochi"
├─ 2 KOLOM (55% / 45%) ──────────────────────────────────
│ ┌────────────┐  Boneka Beruang Mini "Mochi"
│ │ gambar     │  [Best Seller]  Ready stock · sisa 8
│ │ utama 1:1  │  Rp85.000
│ └────────────┘  Pilih warna: (Cream) (Dusty Pink) (Sage)
│ [tn][tn][tn][tn]  Jumlah: [−] 2 [+]
│                   [Tambah ke Keranjang]  (primary)
│                   [Tanya via WhatsApp]   (secondary)
├─ DETAIL (accordion) ───────────────────────────────────
│ Deskripsi ⌄   Bahan ⌄   Ukuran ⌄   Perawatan ⌄
├─ PRODUK TERKAIT (4 kolom) ─────────────────────────────
│ [kartu][kartu][kartu][kartu]
└────────────────────────────────────────────────────────
```

### 8.6 Detail Produk — Mobile
```
┌─ NAVBAR ─────────────────
│ ‹ Kembali        [🛒2]
├─ GALERI (swipe) ──────────
│ ┌───────────────────────┐
│ │      gambar 1:1       │
│ └───────────────────────┘
│            ● ○ ○
├─ INFO ────────────────────
│ Boneka Beruang "Mochi"
│ [Best Seller]
│ Rp85.000   sisa 8
│ Warna: (Cream)(Pink)(Sage)
│ Jumlah: [−] 1 [+]
│ [Tanya via WhatsApp]
├─ DETAIL accordion ────────
│ Deskripsi ⌄  Bahan ⌄
├─ TERKAIT ─────────────────
│ [kartu][kartu]
├─ STICKY BAR ──────────────
│ Rp85.000      [Ke Keranjang]
└───────────────────────────
```

### 8.7 Checkout — Desktop
```
┌─ NAVBAR (disederhanakan) ─────────────────────────────
├─ 2 KOLOM: FORM (60%) | RINGKASAN sticky (40%) ────────
│ Data Pembeli              │ Ringkasan Pesanan
│ [Nama lengkap        ]    │ 2 item
│ [No. WhatsApp        ]    │ Boneka Mochi ×2  170.000
│ [Alamat lengkap      ]    │ Tote Bag ×1      165.000
│ [Kota                ]    │ ─────────jahitan──
│ [Catatan (opsional)  ]    │ Subtotal  335.000
│                           │ Ongkir     Gratis
│ Rekening Tujuan           │ Total     335.000
│ (•) BCA 1234567890        │
│ ( ) Mandiri 9876543210    │ [Buat Pesanan]
│                           │ (primary, lebar penuh)
│ Bukti Transfer            │
│ ┌─ unggah ──────────────┐ │
│ │ JPG/PNG/WebP · 2 MB   │ │
│ └───────────────────────┘ │
└───────────────────────────────────────────────────────
```

### 8.8 Checkout — Mobile
```
┌─ NAVBAR ─────────────────
│ ‹ Checkout          [🛒2]
├─ [Ringkasan 2 item  ⌄] ───
├─ Data Pembeli ────────────
│ Nama lengkap
│ [____________________]
│ No. WhatsApp
│ [____________________]
│ Alamat lengkap
│ [____________________]
│ Kota
│ [____________________]
│ Catatan (opsional)
│ [____________________]
├─ Rekening Tujuan ─────────
│ (•) BCA 1234567890
│ ( ) Mandiri 9876543210
├─ Bukti Transfer ──────────
│ ┌ unggah (2 MB) ───────┐
│ └──────────────────────┘
├─ RINGKASAN ───────────────
│ Subtotal       335.000
│ Ongkir          Gratis
│ Total          335.000
├─ STICKY ──────────────────
│ Total Rp335.000 [Pesan]
└───────────────────────────
```

### 8.9 Keranjang — Mobile
```
┌─ NAVBAR ─────────────────
├─ Keranjang (2 item) ──────
│ ┌──┐ Boneka "Mochi"
│ │img│ Cream · Rp85.000
│ └──┘ [−] 2 [+]      [🗑]
│ ┌──┐ Tote Bag "Sage"
│ │img│ Sage · Rp165.000
│ └──┘ [−] 1 [+]      [🗑]
├─ Ringkasan ───────────────
│ Subtotal       335.000
│ Ongkir          Gratis
│ Total          335.000
├─ STICKY ──────────────────
│ Total Rp335.000 [Checkout]
└───────────────────────────
(empty state: ilustrasi benang + [Lihat Katalog])
```

### 8.10 Pesanan Sukses — Mobile
```
┌─ NAVBAR ─────────────────
│                 ✓ (success)
│ Terima kasih, Sinta!
│ Pesananmu sudah kami terima.
│ ┌───────────────────────┐
│ │ AGA-20261119-4821 [Salin]│
│ └───────────────────────┘
│ Status: [Menunggu verifikasi]
│ Total           Rp335.000
│ Transfer ke     BCA 1234567890
├─ [Kirim Konfirmasi ke WhatsApp] (primary)
├─ [Lacak pesanan] (ghost)
├─ [Kembali belanja] (ghost)
└───────────────────────────
```

### 8.11 Lacak Pesanan — Mobile
```
┌─ NAVBAR ─────────────────
├─ Lacak Pesanan ───────────
│ Kode pesanan
│ [AGA-________________]
│ No. WhatsApp
│ [____________________]
│ [Lacak Pesanan] (primary)
├─ HASIL ───────────────────
│ AGA-20261119-4821
│ [Dikirim]  (badge + ikon)
│ ● Verifikasi ─ ● Diproses ─ ● Dikirim ─ ○ Selesai
│ No. resi: JP1234567890
│ Total: Rp335.000
│ [Hubungi kami via WhatsApp]
└───────────────────────────
(error: "Pesanan tidak ditemukan...")
```

### 8.12 Custom Order — Mobile
```
┌─ NAVBAR ─────────────────
├─ Custom Order ────────────
│ "Ceritakan impian rajutanmu."
│ Jenis produk  [Pilih ⌄]
│ Warna         [__________]
│ Ukuran        [__________]
│ Deskripsi
│ [______________________]
│ Budget (opsional)
│ [Rp __________________]
│ Gambar referensi
│ ┌ unggah (opsional) ────┐
│ └───────────────────────┘
│ Nama          [__________]
│ No. WhatsApp  [__________]
├─ [Kirim Permintaan] (primary)
└───────────────────────────
```

### 8.13 Tentang Kami — Mobile
```
┌─ NAVBAR ─────────────────
├─ HERO (primary-soft) ─────
│ "Dirajut dengan tangan,
│  dikirim dengan hangat."
│ [foto studio 4:5]
├─ CERITA (3 paragraf) ─────
├─ NILAI (3 kartu tumpuk) ──
│ [Handmade][Teliti][Ramah bumi]
├─ PROSES (4 langkah) ──────
│ 1 Pilih benang → 2 Rajut
│ 3 Finishing → 4 Packing
├─ [Lihat Katalog] (primary)
└───────────────────────────
```

### 8.14 Kontak — Mobile
```
┌─ NAVBAR ─────────────────
├─ Kontak ──────────────────
│ [WhatsApp   +62 812…  →]
│ [Instagram  @agacrochet→]
│ [TikTok     @agacrochet→]
│ [Email      halo@…    →]
├─ Jam Operasional ─────────
│ Sen–Sab 09.00–18.00 WIB
│ Minggu   tutup
├─ [Chat via WhatsApp] (primary)
├─ [Ajukan Custom Order] (secondary)
└───────────────────────────
```

### 8.15 FAQ — Mobile
```
┌─ NAVBAR ─────────────────
├─ Pertanyaan Umum ─────────
│ ┌───────────────────────┐
│ │ Apa bahannya?      ⌄ │
│ ├───────────────────────┤
│ │ Berapa lama dibuat?⌄ │
│ ├───────────────────────┤
│ │ Bisa custom?       ⌃ │
│ │ Ya, isi form custom…  │
│ ├───────────────────────┤
│ │ Ongkirnya?         ⌄ │
│ └───────────────────────┘
├─ Masih ada pertanyaan?
├─ [Chat via WhatsApp] (primary)
└───────────────────────────
```

### 8.16 Dashboard Demo — Desktop (Ringkasan)
```
┌──────────┬─────────────────────────────────────────────
│ SIDEBAR  │ Header: Ringkasan      [Mode Demo] [Lihat Toko]
│ Ringkasan│ Data hanya di browser ini. [Reset Data Demo]
│ Pesanan  ├─ 4 KARTU STATISTIK ──────────────────────────
│ Produk   │ [Produk 15][Stok 141][Menunggu 3][Pendapatan 1.2jt]
│ Custom   ├─ 3 KARTU STATUS ─────────────────────────────
│          │ [Diproses 2][Dikirim 1][Selesai 4]
│          ├─ 2 KOLOM ───────────────────────────────────
│          │ Pesanan Terbaru        │ Stok Rendah
│          │ AGA-…4821 Rp335.000   │ Kucing Tidur · 3
│          │ AGA-…3310 Rp165.000   │ Sling Bag · 4
└──────────┴─────────────────────────────────────────────
```

### 8.17 Dashboard Demo — Desktop (Daftar Pesanan)
```
┌──────────┬─────────────────────────────────────────────
│ SIDEBAR  │ Pesanan        [Mode Demo]      [Lihat Toko]
│          ├─ FILTER ─────────────────────────────────────
│          │ [Semua 10][Menunggu 3][Diproses 2][Dikirim 1]
│          │ [Selesai 4][Ditolak 0][Dibatalkan 0]
│          ├─ TABEL ──────────────────────────────────────
│          │ Kode        Tanggal  Nama  Total   Status  Aksi
│          │ AGA-…4821   19/11    Sinta 335.000 Menunggu [Detail]
│          │ AGA-…3310   18/11    Budi  165.000 Diproses[Detail]
│          │ …                                            │
└──────────┴─────────────────────────────────────────────
```

---

## 9. Pedoman Copywriting

**Tone:** hangat, ceria, seperti tetangga yang jago merajut. Sapa pembeli dengan **"kamu"**, hindari "Anda" dan jargon. Kalimat pendek (maks 2 baris), satu ide per kalimat. Boleh satu emoji per blok, tidak di judul. Jangan memaksa lucu di momen serius (pembayaran, error).

| Konteks | Contoh teks |
|---|---|
| CTA utama | "Tambah ke Keranjang", "Lanjut ke Checkout", "Buat Pesanan" |
| CTA sekunder | "Lihat Katalog", "Tanya via WhatsApp", "Ajukan Custom Order" |
| Judul hero | "Rajutan handmade, dibuat satu per satu dengan sabar" |
| Stok | "Sisa 3 — yuk dipesan sebelum habis", "Stok habis, tapi bisa pre-order" |
| Sukses | "Terima kasih, Sinta! Pesananmu sudah kami terima." |
| Empty keranjang | "Keranjangmu masih kosong. Yuk cari rajutan yang bikin hati hangat." |
| Empty pencarian | "Belum ada yang cocok dengan \"batik\". Coba kata lain atau lihat semua produk." |
| Empty admin | "Belum ada pesanan masuk. Bagikan link toko ke teman-temanmu, ya." |
| Error | "Nomor WhatsApp belum benar. Contoh: 0812 3456 7890." |
| Error stok | "Stok Boneka Mochi tinggal 2. Sesuaikan jumlahnya dulu, ya." |
| Error kuota | "Penyimpanan browser penuh. Hapus beberapa pesanan lama atau reset data demo, lalu coba lagi." |
| Konfirmasi hapus | "Hapus produk ini? Produk juga akan hilang dari keranjang." |

**Aturan tambahan:** label tombol = kata kerja + objek; status selalu punya teks (bukan warna saja); pesan error menyebut **apa yang salah + cara memperbaikinya**; hindari tanda seru lebih dari satu per halaman; tombol loading memakai "Memproses…" (bukan "Loading").

---

## 10. Format Harga & Tanggal

- Rupiah: **`Rp85.000`** — tanpa spasi setelah `Rp`, titik sebagai pemisah ribuan, tanpa desimal. Total besar tetap penuh (`Rp1.235.000`), angka memakai `tabular-nums`.
- **Gratis ongkir** ditulis `Gratis` (bukan `Rp0`) dan diwarnai `success`; ongkir berbayar tetap `Rp15.000`.
- Input harga di form admin: angka mentah saat fokus (`85000`), otomatis diformat saat blur.
- Tanggal: `19 November 2026` (panjang) dan `19/11/2026` (tabel admin). Kode pesanan ditampilkan monospace `AGA-20261119-4821`.
- Nomor HP ditampilkan ramah: `+62 812-3456-7890`; data tersimpan `6281234567890`.

---

## 11. Pedoman Foto Produk

- **Latar:** polos terang — `#FFFCF5` atau `#F7F3EA`, tanpa pola; bayangan lembut boleh ada.
- **Rasio & ukuran:** katalog **1:1** (1200×1200), hero/detail **4:5** (1200×1500). Objek mengisi 75–85% frame dengan jarak tepi konsisten.
- **Cahaya:** siang tidak langsung dari 45° kiri atas, tanpa flash keras, white balance netral agar warna benang akurat.
- **Gaya:** satu sudut pandang per kategori, props minimal (satu buku atau ranting), tanpa teks atau watermark di gambar, tanpa tangan atau orang di dalam frame.
- **File:** JPEG kualitas 80, < 200 KB, `loading="lazy"` + `width`/`height` agar tidak layout shift.
- **Alt text:** sebut produk + warna + sudut pandang, mis. `"Tote bag rajut warna sage dengan gagang anyaman, tampak depan"`. Alt dekoratif = `""`.
- **Placeholder:** `public/products/placeholder.jpg` untuk semua gambar gagal muat; produk contoh memakai `<slug>-1.jpg`, `-2.jpg`.

---
*UI-SPEC lengkap: Bagian 1 fondasi visual · Bagian 2 komponen · Bagian 3 wireframe, copy, harga, foto.*
