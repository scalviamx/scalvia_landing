import Footer from "@/app/nutricionpamcastro/_components/Footer";
import Navbar from "@/app/nutricionpamcastro/_components/Navbar";

const products = [
  {
    title: "Cita individual",
    price: "$1,700.00",
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/12/CONSULTA-INICIAL-10.png?resize=600%2C600&ssl=1",
    href: "https://nutriologapamcastro.com/tienda/?add-to-cart=775",
    detailHref: "https://nutriologapamcastro.com/product/cita-inicial-o-reingreso/",
    description: "Primera cita o reingreso para revisar historial, objetivos y siguiente plan de trabajo.",
  },
  {
    title: "Consulta de seguimiento individual",
    price: "$1,200.00",
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-9.png?resize=600%2C600&ssl=1",
    href: "https://nutriologapamcastro.com/tienda/?add-to-cart=125",
    detailHref: "https://nutriologapamcastro.com/product/consulta-inicial-online/",
    description: "Sesión de seguimiento para ajustar tu plan de alimentación según avances y síntomas.",
  },
  {
    title: "Paquete 3 consultas de seguimiento Online",
    price: "$3,600.00",
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-7.png?resize=600%2C600&ssl=1",
    href: "https://nutriologapamcastro.com/tienda/?add-to-cart=141",
    detailHref: "https://nutriologapamcastro.com/product/paquete-3-consultas-seguimiento-online/",
    description: "Tres consultas de seguimiento para mantener continuidad y hacer ajustes periódicos.",
  },
  {
    title: "Paquete 5 consultas de seguimiento Online",
    price: "$6,000.00",
    image:
      "https://i0.wp.com/nutriologapamcastro.com/wp-content/uploads/2020/03/CONSULTA-INICIAL-8.png?resize=600%2C600&ssl=1",
    href: "https://nutriologapamcastro.com/tienda/?add-to-cart=144",
    detailHref: "https://nutriologapamcastro.com/product/paquete-5-consultas-seguimiento-online/",
    description: "Cinco consultas de seguimiento para acompañamiento más completo durante el proceso.",
  },
];

const notes = [
  "Las consultas son en línea por videollamada de WhatsApp.",
  "El pago se completa en la tienda original de Nutrición Pam Castro.",
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
                    {product.price}
                  </p>
                  <p
                    className="text-sm leading-relaxed text-[#6B6B60] mb-5"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {product.description}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#3D6B4F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#527A5F] transition-colors"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      Comprar
                    </a>
                    <a
                      href={product.detailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border border-[#E4DED4] px-4 py-3 text-sm font-semibold text-[#1C1C1A] hover:border-[#3D6B4F] hover:text-[#3D6B4F] transition-colors"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      Ver detalle
                    </a>
                  </div>
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
