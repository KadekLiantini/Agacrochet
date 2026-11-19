// Rendering UI dengan template string. Semua teks dinamis di-escape.
import { getProducts, getCartCount } from './store.js';

export function formatRupiah(nilai) {
  return `Rp${Number(nilai).toLocaleString('id-ID')}`;
}

function esc(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Badge sesuai prioritas SPEC.md §5.1. */
function badgeProduk(product) {
  if (product.status === 'ready' && product.stok === 0) {
    return { label: 'Stok Habis', kelas: 'badge--neutral' };
  }
  if (product.status === 'preorder') {
    return { label: 'Pre-order', kelas: 'badge--preorder' };
  }
  if (product.bestSeller) {
    return { label: 'Best Seller', kelas: 'badge--primary' };
  }
  const hari = (Date.now() - new Date(product.createdAt).getTime()) / 86_400_000;
  if (hari <= 14) return { label: 'New', kelas: 'badge--secondary' };
  return null;
}

function kartuProduk(product) {
  const badge = badgeProduk(product);
  const stok =
    product.status === 'preorder'
      ? 'Pre-order · dikerjakan 5–14 hari'
      : product.stok > 0
        ? `Ready · sisa ${product.stok}`
        : 'Stok habis';

  return `
    <article class="product-card">
      <div class="product-thumb" role="img" aria-label="Foto ${esc(product.nama)} — menyusul">
        <span>${esc(product.kategori)}</span>
        <small>foto menyusul</small>
      </div>
      <div class="product-body">
        ${badge ? `<span class="badge ${badge.kelas}">${badge.label}</span>` : ''}
        <h3>${esc(product.nama)}</h3>
        <p class="price">${formatRupiah(product.harga)}</p>
        <p class="muted small">${esc(stok)}</p>
      </div>
    </article>`;
}

export function renderApp(root) {
  const products = getProducts();
  const jumlahKeranjang = getCartCount();

  root.innerHTML = `
    <a class="skip-link" href="#katalog">Lewati ke katalog</a>

    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#atas">
          <span class="brand-mark" aria-hidden="true">◎</span>
          Agacrochet
        </a>
        <nav class="nav" aria-label="Navigasi utama">
          <a href="#katalog">Katalog</a>
          <a href="#custom">Custom Order</a>
          <a href="#tentang">Tentang</a>
        </nav>
        <a class="cart-link" href="#katalog">
          Keranjang
          <span class="cart-badge" aria-label="${jumlahKeranjang} item di keranjang">${jumlahKeranjang}</span>
        </a>
      </div>
    </header>

    <main id="atas">
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Rajutan handmade</p>
            <h1>Rajutan handmade, dibuat satu per satu dengan sabar</h1>
            <p class="lead">
              Amigurumi, tas, fashion, sampai dekorasi rumah. Semuanya dirajut dengan tangan,
              bisa dipesan sesuai warna dan ukuran favoritmu.
            </p>
            <div class="actions">
              <a class="btn btn-primary" href="#katalog">Belanja Sekarang</a>
              <a class="btn btn-secondary" href="#custom">Custom Order</a>
            </div>
          </div>
          <aside class="hero-card" aria-label="Ringkasan toko">
            <p class="hero-card-label">Koleksi saat ini</p>
            <p class="hero-card-value">${products.length} produk</p>
            <p class="muted small">5 kategori · 100% handmade</p>
          </aside>
        </div>
      </section>

      <section class="section" id="katalog">
        <div class="container">
          <div class="section-head">
            <h2>Produk Pilihan</h2>
            <p class="muted">Data contoh untuk demo — tersimpan di browser ini saja.</p>
          </div>
          <div class="product-grid">
            ${products.map(kartuProduk).join('')}
          </div>
        </div>
      </section>

      <section class="section section-alt" id="custom">
        <div class="container custom-box">
          <div>
            <h2>Punya bayangan rajutan sendiri?</h2>
            <p class="muted">
              Ceritakan warna, ukuran, dan bentuk yang kamu mau. Kami bantu wujudkan,
              lalu kabari lewat WhatsApp.
            </p>
          </div>
          <a class="btn btn-secondary" href="#custom">Ajukan Custom Order</a>
        </div>
      </section>
    </main>

    <footer class="site-footer" id="tentang">
      <div class="container footer-inner">
        <div>
          <p class="brand"><span class="brand-mark" aria-hidden="true">◎</span> Agacrochet</p>
          <p class="muted small">Rajutan handmade dari rumah, dikirim dengan hangat.</p>
        </div>
        <p class="muted small">Demo hackathon · data hanya tersimpan di browser ini.</p>
      </div>
    </footer>`;
}
