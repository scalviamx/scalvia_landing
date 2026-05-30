import Footer from "@/app/nutricionpamcastro/_components/Footer";
import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import AddToCartButton from "@/app/nutricionpamcastro/_components/AddToCartButton";
import { formatMoney, products } from "@/app/nutricionpamcastro/_lib/shop";

const notes = [
  "Las consultas son en línea por videollamada de WhatsApp.",
  "Puedes agregar varios productos y revisar el total estimado antes de pagar.",
  "Después de comprar, se agenda la cita según disponibilidad.",
];

export default function Tienda() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
            <div>
              <p
                className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Tienda
              </p>
              <h1
                className="text-4xl md:text-5xl font-semibold leading-[1.1] text-[#1C1C1A] mb-6"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Elige tu consulta y continúa tu proceso.
              </h1>
              <p
                className="text-[#6B6B60] text-base leading-relaxed max-w-2xl"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Compra tu cita inicial o paquete de seguimiento. El pago se realiza en la tienda
                original para mantener el proceso de cobro y confirmación existente.
              </p>
            </div>

            <div className="bg-[#F4F1EA] border border-[#E4DED4] rounded-2xl p-6">
              <h2
                className="text-lg font-semibold text-[#1C1C1A] mb-5"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Antes de comprar
              </h2>
              <ul className="flex flex-col gap-4">
                {notes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 text-sm text-[#6B6B60] leading-relaxed"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    <svg
                      className="mt-0.5 shrink-0 text-[#3D6B4F]"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <article
                key={product.title}
                className="bg-white border border-[#E4DED4] rounded-2xl overflow-hidden flex flex-col"
              >
                <a
                  href={product.detailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#F4F1EA]"
                  aria-label={`Ver detalle de ${product.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="p-5 flex flex-1 flex-col">
                  <h2
                    className="text-base font-semibold leading-snug text-[#1C1C1A] mb-2"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {product.title}
                  </h2>
                  <p
                    className="text-2xl font-semibold text-[#3D6B4F] mb-3"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {formatMoney(product.priceCents)}
                  </p>
                  <p
                    className="text-sm leading-relaxed text-[#6B6B60] mb-5"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {product.description}
                  </p>
                  <AddToCartButton productId={product.productId} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
