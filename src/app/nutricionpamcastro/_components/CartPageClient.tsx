"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CART_CHANGED_EVENT,
  readCart,
  writeCart,
} from "@/app/nutricionpamcastro/_lib/cart-storage";
import {
  type CartItem,
  buildWooHandoffUrl,
  formatMoney,
  getCartTotals,
  productById,
} from "@/app/nutricionpamcastro/_lib/shop";

function loadCart() {
  if (typeof window === "undefined") return [];
  return readCart();
}

export default function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);

    const refresh = () => setItems(loadCart());
    window.addEventListener(CART_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const cartRows = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById.get(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [items]
  );

  const totals = getCartTotals(items);
  const checkoutHref = buildWooHandoffUrl(items, coupon);

  function updateQuantity(productId: number, quantity: number) {
    const nextItems = items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setItems(writeCart(nextItems));
  }

  function removeItem(productId: number) {
    setItems(writeCart(items.filter((item) => item.productId !== productId)));
  }

  function clearCart() {
    setItems(writeCart([]));
  }

  return (
    <main className="min-h-dvh bg-[#FAFAF7] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Carrito
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold leading-[1.1] text-[#1C1C1A]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Revisa tu compra.
            </h1>
          </div>
          <Link
            href="/nutricionpamcastro/tienda"
            className="inline-flex items-center justify-center border border-[#E4DED4] px-5 py-3 text-sm font-semibold text-[#1C1C1A] hover:border-[#3D6B4F] hover:text-[#3D6B4F] transition-colors"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Seguir comprando
          </Link>
        </div>

        {!loaded ? null : cartRows.length === 0 ? (
          <div className="border border-[#E4DED4] bg-white p-8 text-center">
            <h2
              className="text-2xl font-semibold text-[#1C1C1A] mb-3"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Tu carrito está vacío.
            </h2>
            <p
              className="text-sm text-[#6B6B60] mb-6"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Agrega una consulta o paquete desde la tienda para continuar.
            </p>
            <Link
              href="/nutricionpamcastro/tienda"
              className="inline-flex items-center justify-center bg-[#3D6B4F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#527A5F] transition-colors"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Ir a tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <section className="border border-[#E4DED4] bg-white">
              <div className="hidden md:grid grid-cols-[1fr_120px_150px_120px_44px] gap-4 border-b border-[#E4DED4] px-5 py-4 text-sm font-semibold text-[#1C1C1A]">
                <div>Producto</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
                <div />
              </div>

              {cartRows.map(({ product, quantity }) => (
                <div
                  key={product.productId}
                  className="grid grid-cols-1 gap-4 border-b border-[#E4DED4] px-5 py-5 last:border-b-0 md:grid-cols-[1fr_120px_150px_120px_44px] md:items-center"
                >
                  <div className="flex gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-20 w-20 shrink-0 object-cover bg-[#F4F1EA]"
                    />
                    <div>
                      <h2
                        className="text-base font-semibold text-[#1C1C1A]"
                        style={{ fontFamily: "var(--font-lora)" }}
                      >
                        {product.title}
                      </h2>
                      <a
                        href={product.detailHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-[#6B6B60] hover:text-[#3D6B4F] transition-colors"
                        style={{ fontFamily: "var(--font-raleway)" }}
                      >
                        Ver detalle
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-[#1C1C1A]" style={{ fontFamily: "var(--font-raleway)" }}>
                    {formatMoney(product.priceCents)}
                  </p>

                  <label className="flex items-center gap-3 md:block">
                    <span
                      className="text-sm text-[#6B6B60] md:hidden"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      Cantidad
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(event) => updateQuantity(product.productId, Number(event.target.value))}
                      className="w-24 border border-[#E4DED4] bg-[#FAFAF7] px-3 py-2 text-sm text-[#1C1C1A] outline-none focus:border-[#3D6B4F]"
                    />
                  </label>

                  <p className="text-sm font-semibold text-[#1C1C1A]" style={{ fontFamily: "var(--font-raleway)" }}>
                    {formatMoney(product.priceCents * quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(product.productId)}
                    className="text-left text-sm font-semibold text-[#9B2F25] hover:text-[#6F211A] transition-colors md:text-center"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    Quitar
                  </button>
                </div>
              ))}

              <div className="flex justify-end border-t border-[#E4DED4] px-5 py-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-semibold text-[#6B6B60] hover:text-[#1C1C1A] transition-colors"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  Vaciar carrito
                </button>
              </div>
            </section>

            <aside className="border border-[#E4DED4] bg-[#F4F1EA] p-6">
              <h2
                className="text-2xl font-semibold text-[#1C1C1A] mb-6"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Total estimado
              </h2>

              <dl className="mb-6 divide-y divide-[#E4DED4] border-y border-[#E4DED4]">
                <div className="flex justify-between py-3 text-sm">
                  <dt className="font-semibold text-[#1C1C1A]">Subtotal</dt>
                  <dd className="text-[#6B6B60]">{formatMoney(totals.subtotalCents)}</dd>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <dt className="font-semibold text-[#1C1C1A]">TAX 7%</dt>
                  <dd className="text-[#6B6B60]">{formatMoney(totals.taxCents)}</dd>
                </div>
                <div className="flex justify-between py-3 text-base">
                  <dt className="font-semibold text-[#1C1C1A]">Total</dt>
                  <dd className="font-semibold text-[#1C1C1A]">{formatMoney(totals.totalCents)}</dd>
                </div>
              </dl>

              <label className="mb-5 block">
                <span
                  className="mb-2 block text-sm font-semibold text-[#1C1C1A]"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  Cupón
                </span>
                <input
                  type="text"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Código de cupón"
                  className="w-full border border-[#E4DED4] bg-white px-3 py-3 text-sm text-[#1C1C1A] outline-none focus:border-[#3D6B4F]"
                  style={{ fontFamily: "var(--font-raleway)" }}
                />
              </label>

              <a
                href={checkoutHref}
                className="mb-4 inline-flex w-full items-center justify-center bg-[#1C1C1A] px-5 py-4 text-sm font-semibold text-white hover:bg-[#3D6B4F] transition-colors"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Finalizar compra
              </a>

              <p
                className="text-xs leading-relaxed text-[#6B6B60]"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                El total final, cupones y métodos de pago se confirman en WooCommerce antes de pagar.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
