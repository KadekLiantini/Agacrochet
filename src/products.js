// Data contoh Agacrochet — 15 produk, nonpribadi, aman untuk demo.
// Bentuk objek mengikuti model Product di SPEC.md §5.1.

export const KATEGORI = [
  'Amigurumi',
  'Tas & Dompet',
  'Fashion',
  'Aksesoris',
  'Dekorasi Rumah',
];

// Template bahan/ukuran/perawatan per kategori (SPEC.md §5.8).
const PERAWATAN_KATEGORI = {
  Amigurumi: {
    bahan: 'Benang katun milk cotton, isian dakron',
    ukuran: '± 12 cm',
    perawatan: 'Cuci tangan air dingin, keringkan di tempat teduh',
  },
  'Tas & Dompet': {
    bahan: 'Benang polyester cord',
    ukuran: '30 × 25 cm',
    perawatan: 'Lap dengan kain lembap, hindari mesin cuci',
  },
  Fashion: {
    bahan: 'Benang akrilik premium',
    ukuran: 'S/M/L (lihat deskripsi)',
    perawatan: 'Cuci tangan, jangan diperas, keringkan mendatar',
  },
  Aksesoris: {
    bahan: 'Benang katun',
    ukuran: 'One size',
    perawatan: 'Cuci tangan lembut, keringkan mendatar',
  },
  'Dekorasi Rumah': {
    bahan: 'Benang katun tebal',
    ukuran: '25 × 25 cm',
    perawatan: 'Bersihkan debu dengan sikat lembut',
  },
};

function buatProduk(data) {
  return {
    ...data,
    ...PERAWATAN_KATEGORI[data.kategori],
    gambar: [`/products/${data.slug}-1.jpg`],
    unggulan: data.unggulan ?? false,
    bestSeller: data.bestSeller ?? false,
    createdAt: new Date(data.createdAt).toISOString(),
  };
}

export const seedProducts = [
  buatProduk({
    id: 'prd_001',
    nama: 'Boneka Beruang Mini "Mochi"',
    slug: 'boneka-beruang-mochi',
    kategori: 'Amigurumi',
    harga: 85000,
    stok: 8,
    status: 'ready',
    deskripsi:
      'Beruang kecil bertelinga bulat dengan jahitan rapi, dirajut satu per satu. Teman tidur yang hangat untuk meja kerja atau kamar anak.',
    warna: ['Cream', 'Dusty Pink', 'Mocca'],
    unggulan: true,
    bestSeller: true,
    createdAt: '2026-10-02',
  }),
  buatProduk({
    id: 'prd_002',
    nama: 'Amigurumi Kelinci "Keshi"',
    slug: 'amigurumi-kelinci-keshi',
    kategori: 'Amigurumi',
    harga: 95000,
    stok: 5,
    status: 'ready',
    deskripsi:
      'Kelinci berpipi tembam dengan syal mini yang bisa dilepas. Ukurannya pas digenggam, cocok sebagai hadiah ulang tahun.',
    warna: ['Cream', 'Lilac', 'Sage'],
    unggulan: true,
    createdAt: '2026-09-18',
  }),
  buatProduk({
    id: 'prd_003',
    nama: 'Boneka Kucing Tidur',
    slug: 'boneka-kucing-tidur',
    kategori: 'Amigurumi',
    harga: 120000,
    stok: 3,
    status: 'preorder',
    deskripsi:
      'Kucing meringkuk dengan mata terpejam, dirajut dari benang katun lembut. Dikerjakan sesuai pesanan dalam 5–7 hari kerja.',
    warna: ['Mocca', 'Dusty Pink'],
    createdAt: '2026-11-10',
  }),
  buatProduk({
    id: 'prd_004',
    nama: 'Gantungan Kunci Bunga Rajut',
    slug: 'gantungan-kunci-bunga-rajut',
    kategori: 'Amigurumi',
    harga: 35000,
    stok: 20,
    status: 'ready',
    deskripsi:
      'Bunga mungil berkelopak lima dengan ring logam. Cocok untuk tas, kunci rumah, atau oleh-oleh kecil.',
    warna: ['Cream', 'Dusty Pink', 'Sage', 'Lilac'],
    bestSeller: true,
    createdAt: '2026-08-21',
  }),
  buatProduk({
    id: 'prd_005',
    nama: 'Tote Bag Rajut "Sage"',
    slug: 'tote-bag-rajut-sage',
    kategori: 'Tas & Dompet',
    harga: 165000,
    stok: 6,
    status: 'ready',
    deskripsi:
      'Tote bag bertekstur kokoh dengan gagang anyaman yang nyaman di bahu. Muat buku, botol minum, dan dompet sekaligus.',
    warna: ['Sage', 'Cream', 'Mocca'],
    unggulan: true,
    bestSeller: true,
    createdAt: '2026-10-12',
  }),
  buatProduk({
    id: 'prd_006',
    nama: 'Dompet Koin Rajut Mini',
    slug: 'dompet-koin-rajut-mini',
    kategori: 'Tas & Dompet',
    harga: 65000,
    stok: 12,
    status: 'ready',
    deskripsi:
      'Dompet kecil dengan kancing kayu, pas untuk koin dan kartu. Dirajut rapat agar isi tidak mudah tercecer.',
    warna: ['Dusty Pink', 'Cream', 'Sage'],
    createdAt: '2026-11-16',
  }),
  buatProduk({
    id: 'prd_007',
    nama: 'Sling Bag Rajut "Dusty"',
    slug: 'sling-bag-rajut-dusty',
    kategori: 'Tas & Dompet',
    harga: 185000,
    stok: 4,
    status: 'preorder',
    deskripsi:
      'Tas selempang berukuran mungil dengan tali yang bisa disetel. Dikerjakan sesuai pesanan, termasuk pilihan warna tali.',
    warna: ['Dusty Pink', 'Mocca'],
    createdAt: '2026-09-30',
  }),
  buatProduk({
    id: 'prd_008',
    nama: 'Cardigan Rajut Oversize',
    slug: 'cardigan-rajut-oversize',
    kategori: 'Fashion',
    harga: 325000,
    stok: 3,
    status: 'preorder',
    deskripsi:
      'Cardigan longgar dengan jatuh kain lembut, cocok untuk cuaca sejuk. Tersedia ukuran S, M, dan L, dikerjakan 10–14 hari.',
    warna: ['Cream', 'Sage', 'Mocca'],
    unggulan: true,
    createdAt: '2026-10-25',
  }),
  buatProduk({
    id: 'prd_009',
    nama: 'Topi Bucket Rajut',
    slug: 'topi-bucket-rajut',
    kategori: 'Fashion',
    harga: 95000,
    stok: 9,
    status: 'ready',
    deskripsi:
      'Topi bucket dengan pinggiran lebar dan rajutan rapat. Ringan dibawa, pas untuk jalan pagi atau ke pantai.',
    warna: ['Cream', 'Sage', 'Dusty Pink'],
    createdAt: '2026-07-19',
  }),
  buatProduk({
    id: 'prd_010',
    nama: 'Rompi Rajut Pendek',
    slug: 'rompi-rajut-pendek',
    kategori: 'Fashion',
    harga: 175000,
    stok: 5,
    status: 'ready',
    deskripsi:
      'Rompi pendek berpotongan sederhana dengan kancing kayu. Mudah dipadukan dengan kemeja atau kaos favoritmu.',
    warna: ['Cream', 'Mocca'],
    createdAt: '2026-11-14',
  }),
  buatProduk({
    id: 'prd_011',
    nama: 'Scrunchies Rajut (Set 3)',
    slug: 'scrunchies-rajut-set-3',
    kategori: 'Aksesoris',
    harga: 45000,
    stok: 25,
    status: 'ready',
    deskripsi:
      'Tiga ikat rambut dengan karet lembut, tidak mudah melar. Satu paket berisi tiga warna yang sudah dipadukan.',
    warna: ['Cream', 'Dusty Pink', 'Sage'],
    bestSeller: true,
    createdAt: '2026-08-08',
  }),
  buatProduk({
    id: 'prd_012',
    nama: 'Kalung Bunga Rajut',
    slug: 'kalung-bunga-rajut',
    kategori: 'Aksesoris',
    harga: 55000,
    stok: 10,
    status: 'ready',
    deskripsi:
      'Kalung dengan tiga bunga kecil di tali rajutan halus. Ringan dipakai seharian dan manis untuk foto.',
    warna: ['Cream', 'Lilac', 'Dusty Pink'],
    createdAt: '2026-10-05',
  }),
  buatProduk({
    id: 'prd_013',
    nama: 'Headband Rajut',
    slug: 'headband-rajut',
    kategori: 'Aksesoris',
    harga: 40000,
    stok: 15,
    status: 'ready',
    deskripsi:
      'Headband lebar dengan tekstur rajutan lembut, nyaman untuk rambut tebal maupun tipis.',
    warna: ['Sage', 'Cream', 'Mocca'],
    createdAt: '2026-11-09',
  }),
  buatProduk({
    id: 'prd_014',
    nama: 'Bantal Sofa Rajut Motif',
    slug: 'bantal-sofa-rajut-motif',
    kategori: 'Dekorasi Rumah',
    harga: 210000,
    stok: 4,
    status: 'ready',
    deskripsi:
      'Sarung bantal bermotif geometris dengan tekstur tebal. Membuat sudut ruang tamu terasa lebih hangat.',
    warna: ['Cream', 'Sage', 'Mocca'],
    unggulan: true,
    createdAt: '2026-09-12',
  }),
  buatProduk({
    id: 'prd_015',
    nama: 'Hiasan Dinding Rajut "Daisy"',
    slug: 'hiasan-dinding-daisy',
    kategori: 'Dekorasi Rumah',
    harga: 130000,
    stok: 0,
    status: 'ready',
    deskripsi:
      'Panel dinding berbentuk daisy besar, dipasang dengan kayu ringan. Sedang habis — kabari kami lewat WhatsApp untuk pesanan berikutnya.',
    warna: ['Cream', 'Dusty Pink'],
    createdAt: '2026-06-28',
  }),
];
