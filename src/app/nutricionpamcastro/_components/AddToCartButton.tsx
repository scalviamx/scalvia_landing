"use client";

import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/app/nutricionpamcastro/_lib/cart-storage";

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-auto flex flex-col gap-2">
      <button
        type="button"
        onClick={() => {
          addToCart(productId);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="inline-flex items-center justify-center bg-[#3D6B4F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#527A5F] transition-colors"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        {added ? "Agregado" : "Agregar al carrito"}
      </button>
      <Link
        href="/nutricionpamcastro/carrito"
        className="inline-flex items-center justify-center border border-[#E4DED4] px-4 py-3 text-sm font-semibold text-[#1C1C1A] hover:border-[#3D6B4F] hover:text-[#3D6B4F] transition-colors"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        Ver carrito
      </Link>
    </div>
  );
}
