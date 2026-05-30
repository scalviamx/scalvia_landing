"use client";

import { CART_STORAGE_KEY, type CartItem, sanitizeCartItems } from "./shop";

export const CART_CHANGED_EVENT = "pamcastro-cart-changed";

export function readCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sanitizeCartItems(parsed);
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  const safeItems = sanitizeCartItems(items);
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(safeItems));
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
  return safeItems;
}

export function addToCart(productId: number, quantity = 1) {
  const items = readCart();
  const existing = items.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
    return writeCart(items);
  }

  return writeCart([...items, { productId, quantity }]);
}
