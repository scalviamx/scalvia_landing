"use client";

import dynamic from "next/dynamic";

/**
 * Client Component wrapper.
 * ssr: false solo puede usarse en Client Components (Next.js 15).
 * Garantiza que VitelasPageClient (que usa useUser/useClerk)
 * NUNCA se ejecute en el servidor — evita el crash de ClerkProvider.
 */
const VitelasPageClient = dynamic(
  () => import("./_components/VitelasPageClient"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          backgroundColor: "#EDE8FF",
          color: "#7B6BAD",
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem",
        }}
      >
        Cargando Vitelas...
      </div>
    ),
  }
);

export default function VitelasPage() {
  return <VitelasPageClient />;
}
