export const CART_STORAGE_KEY = "pamcastro_cart_v1";
export const TAX_RATE = 0.07;

export interface Product {
  productId: number;
  title: string;
  priceCents: number;
  image: string;
  detailHref: string;
  description: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export const products: Product[] = [
  {
    productId: 775,
    title: "Cita individual",
    priceCents: 170000,
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/12/CONSULTA-INICIAL-10.png?resize=600%2C600&ssl=1",
    detailHref: "https://nutriologapamcastro.com/product/cita-inicial-o-reingreso/",
    description: "Primera cita o reingreso para revisar historial, objetivos y siguiente plan de trabajo.",
  },
  {
    productId: 125,
    title: "Consulta de seguimiento individual",
    priceCents: 120000,
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-9.png?resize=600%2C600&ssl=1",
    detailHref: "https://nutriologapamcastro.com/product/consulta-inicial-online/",
    description: "Sesión de seguimiento para ajustar tu plan de alimentación según avances y síntomas.",
  },
  {
    productId: 141,
    title: "Paquete 3 consultas de seguimiento Online",
    priceCents: 360000,
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-7.png?resize=600%2C600&ssl=1",
    detailHref: "https://nutriologapamcastro.com/product/paquete-3-consultas-seguimiento-online/",
    description: "Tres consultas de seguimiento para mantener continuidad y hacer ajustes periódicos.",
  },
  {
    productId: 144,
    title: "Paquete 5 consultas de seguimiento Online",
    priceCents: 600000,
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-8.png?resize=600%2C600&ssl=1",
    detailHref: "https://nutriologapamcastro.com/product/paquete-5-consultas-seguimiento-online/",
    description: "Cinco consultas de seguimiento para acompañamiento más completo durante el proceso.",
  },
];

export const productById = new Map(products.map((product) => [product.productId, product]));

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(cents / 100);
}

export function sanitizeCartItems(items: CartItem[]) {
  const merged = new Map<number, number>();

  for (const item of items) {
    if (!productById.has(item.productId)) continue;

    const quantity = Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1)));
    merged.set(item.productId, (merged.get(item.productId) ?? 0) + quantity);
  }

  return Array.from(merged, ([productId, quantity]) => ({
    productId,
    quantity: Math.min(99, quantity),
  }));
}

export function getCartTotals(items: CartItem[]) {
  const subtotalCents = sanitizeCartItems(items).reduce((total, item) => {
    const product = productById.get(item.productId);
    return product ? total + product.priceCents * item.quantity : total;
  }, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);

  return {
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
    itemCount: sanitizeCartItems(items).reduce((total, item) => total + item.quantity, 0),
  };
}

export function buildWooHandoffUrl(items: CartItem[], coupon?: string) {
  const safeItems = sanitizeCartItems(items);
  const params = new URLSearchParams({
    action: "scalvia_cart_handoff",
    items: safeItems.map((item) => `${item.productId}:${item.quantity}`).join(","),
  });

  const trimmedCoupon = coupon?.trim();
  if (trimmedCoupon) {
    params.set("coupon", trimmedCoupon);
  }

  return `https://nutriologapamcastro.com/wp-admin/admin-post.php?${params.toString()}`;
}
