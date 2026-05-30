import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";

const WA_LINK = "https://wa.me/message/I6Z4V2NBJQ7QO1";

const testimonials = [
  {
    name: "Sofía R.",
    condition: "Hashimoto",
    time: "3 meses de seguimiento",
    quote: "Llevaba años sintiéndome cansada y con inflamación constante aunque mis estudios 'salían bien'. Con Pam finalmente entendí que hay mucho más detrás del resultado de laboratorio. Mi calidad de vida cambió completamente.",
  },
  {
    name: "Valeria M.",
    condition: "Artritis SeroPositiva",
    time: "5 meses de seguimiento",
    quote: "Nadie me había explicado la conexión entre lo que como y mis brotes de artritis. El plan de Pam fue la primera vez que vi resultados reales,  menos inflamación, menos dolor, más energía.",
  },
  {
    name: "Carmen L.",
    condition: "Lupus",
    time: "6 meses de seguimiento",
    quote: "Llegué sin esperanza de que la nutrición pudiera hacer algo por mi condición. Hoy soy la que recomiendo a todos en mi grupo de apoyo que vengan con Pam. La diferencia es notoria.",
  },
  {
    name: "Diana T.",
    condition: "Tiroides + resistencia a insulina",
    time: "4 meses de seguimiento",
    quote: "Lo que más valoro es que Pam entiende desde adentro cómo se siente tener una enfermedad autoinmune. No me hizo sentir hipocondriaca. Me escuchó, me creyó y diseñó un plan que realmente funciona para mí.",
  },
  {
    name: "Mariana G.",
    condition: "Síndrome de Sjogren",
    time: "2 meses de seguimiento",
    quote: "La videollamada desde casa es un beneficio enorme cuando los días de brote hacen difícil salir. Pam es muy puntual y siempre preparada con información específica para mi caso.",
  },
  {
    name: "Fernanda P.",
    condition: "Fibromialgia",
    time: "8 meses de seguimiento",
    quote: "En ocho meses bajé 14kg pero más importante, dejé de tener los dolores crónicos que tenía. El plan siempre se adapta a cómo estoy y nunca siento que estoy a dieta.",
  },
];

export default function Testimonios() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-[#F4F1EA]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
            Resultados
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] text-[#1C1C1A] mb-6" style={{ fontFamily: "var(--font-lora)" }}>
            Lo que dicen quienes ya dieron el paso
          </h1>
          <p className="text-[#6B6B60] text-base leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "var(--font-raleway)" }}>
            Pacientes con condiciones autoinmunes que encontraron en la nutrición personalizada
            una respuesta que el sistema médico convencional no pudo darles.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-24 px-6 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <div key={t.name} className="break-inside-avoid bg-white border border-[#E4DED4] rounded-2xl p-7 hover:shadow-sm transition-shadow duration-200">
              <p className="text-[#1C1C1A] text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-lora)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EBF2ED] flex items-center justify-center shrink-0">
                  <span className="text-[#3D6B4F] text-sm font-semibold" style={{ fontFamily: "var(--font-lora)" }}>
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[#1C1C1A] text-sm font-semibold" style={{ fontFamily: "var(--font-raleway)" }}>{t.name}</p>
                  <p className="text-[#6B6B60] text-xs" style={{ fontFamily: "var(--font-raleway)" }}>{t.condition} · {t.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 px-6 bg-[#F4F1EA]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#6B6B60] text-xs text-center leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
            Los resultados varían según cada persona. Estos testimonios reflejan experiencias individuales y no garantizan resultados idénticos.
            El trabajo nutricional complementa, no reemplaza, el tratamiento médico prescrito por tu especialista.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#3D6B4F] text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-lora)" }}>
            Tú puedes ser el siguiente caso de éxito.
          </h2>
          <p className="text-[#C8DDD0] text-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
            El primer paso es una consulta. Sin compromisos largos, sin dietas imposibles.
            Solo un plan pensado para ti.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#3D6B4F] font-semibold px-8 py-4 rounded-full hover:bg-[#F4F1EA] transition-colors duration-200 text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-raleway)" }}>
            Agendar mi consulta
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
