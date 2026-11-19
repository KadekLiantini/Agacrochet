// Satu-satunya modul yang boleh menyentuh localStorage (SPEC.md §5.7).
// Semua fungsi sinkron; nanti modul ini yang diganti ke Supabase.

import { seedProducts } from './products.js';

export const STORAGE_PREFIX = 'agacrochet_';
export const DATA_VERSION = 1;

const KEY = {
  products: `${STORAGE_PREFIX}products`,
  cart: `${STORAGE_PREFIX}cart`,
  meta: `${STORAGE_PREFIX}meta`,
};

/** Error khusus saat kuota localStorage habis (SPEC.md §5.7 & risiko R1). */
export class StorageFullError extends Error {
  constructor() {
    super(
      'Penyimpanan browser penuh. Hapus beberapa pesanan lama atau reset data demo, lalu coba lagi.',
    );
    this.name = 'StorageFullError';
  }
}

let listeners = [];

function notify() {
  for (const fn of listeners) fn();
}

export function subscribe(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((fn) => fn !== callback);
  };
}

/** Membaca payload { version, updatedAt, data }; fallback bila kosong atau rusak. */
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const payload = JSON.parse(raw);
    if (!payload || payload.version !== DATA_VERSION || !Array.isArray(payload.data)) {
      return fallback;
    }
    return payload.data;
  } catch {
    // JSON rusak atau localStorage tidak tersedia: jangan sampai layar putih.
    return fallback;
  }
}

function write(key, data) {
  const payload = {
    version: DATA_VERSION,
    updatedAt: new Date().toISOString(),
    data,
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
      throw new StorageFullError();
    }
    throw error;
  }
  notify();
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/* ---------- Produk ---------- */

export function getProducts() {
  const stored = read(KEY.products, []);
  if (stored.length > 0) return stored;

  // Seed saat storage kosong (SPEC.md §5.8).
  write(KEY.products, seedProducts);
  write(KEY.meta, [{ seededAt: new Date().toISOString(), version: DATA_VERSION }]);
  return [...seedProducts];
}

export function getProductBySlug(slug) {
  return getProducts().find((item) => item.slug === slug) ?? null;
}

export function getProductById(id) {
  return getProducts().find((item) => item.id === id) ?? null;
}

export function saveProduct(product) {
  const products = getProducts();
  const now = new Date().toISOString();
  const isEdit = Boolean(product.id);
  const id = product.id || `prd_${Date.now()}`;
  const slug = product.slug ? slugify(product.slug) : slugify(product.nama);

  const bentrok = products.some((item) => item.slug === slug && item.id !== id);
  if (bentrok) throw new Error('Slug sudah dipakai produk lain.');

  const next = {
    ...product,
    id,
    slug,
    harga: Math.max(0, Number(product.harga) || 0),
    stok: Math.max(0, Math.floor(Number(product.stok) || 0)),
    createdAt: product.createdAt || now,
  };

  const index = products.findIndex((item) => item.id === id);
  if (index >= 0) {
    next.createdAt = products[index].createdAt;
    products[index] = next;
  } else {
    products.unshift(next);
  }

  write(KEY.products, products);
  return { ...next, _isNew: !isEdit };
}

export function deleteProduct(id) {
  const products = getProducts().filter((item) => item.id !== id);
  write(KEY.products, products);
  // Produk yang dihapus juga keluar dari keranjang (SPEC.md §6.2).
  const cart = getCart().filter((item) => item.productId !== id);
  write(KEY.cart, cart);
}

/* ---------- Keranjang ---------- */

export function getCart() {
  return read(KEY.cart, []);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.jumlah, 0);
}

export function addToCart(productId, warna, jumlah = 1) {
  const product = getProductById(productId);
  if (!product) throw new Error('Produk tidak ditemukan.');

  const cart = getCart();
  const baris = cart.find(
    (item) => item.productId === productId && item.warna === warna,
  );
  const sekarang = baris ? baris.jumlah : 0;
  const batas = product.status === 'ready' ? product.stok : Math.max(product.stok, 10);

  if (batas === 0) throw new Error('Stok produk ini sedang habis.');
  if (sekarang + jumlah > batas) {
    throw new Error(`Stok ${product.nama} tinggal ${batas}.`);
  }

  if (baris) baris.jumlah += jumlah;
  else cart.push({ productId, warna, jumlah });

  write(KEY.cart, cart);
  return cart;
}

export function updateCartQty(productId, warna, jumlah) {
  const product = getProductById(productId);
  const cart = getCart();
  const baris = cart.find(
    (item) => item.productId === productId && item.warna === warna,
  );
  if (!baris) return cart;

  const batas = product && product.status === 'ready' ? product.stok : 10;
  baris.jumlah = Math.min(Math.max(1, Math.floor(jumlah) || 1), batas);

  write(KEY.cart, cart);
  return cart;
}

export function removeFromCart(productId, warna) {
  const cart = getCart().filter(
    (item) => !(item.productId === productId && item.warna === warna),
  );
  write(KEY.cart, cart);
  return cart;
}

export function clearCart() {
  write(KEY.cart, []);
}

/* ---------- Demo ---------- */

export function resetDemoData() {
  Object.values(KEY).forEach((key) => localStorage.removeItem(key));
  write(KEY.products, seedProducts);
  write(KEY.meta, [{ seededAt: new Date().toISOString(), version: DATA_VERSION }]);
}
