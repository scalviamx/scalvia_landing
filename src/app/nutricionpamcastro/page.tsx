import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";
import Link from "next/link";

const WA_LINK = "https://wa.me/message/I6Z4V2NBJQ7QO1";

const conditions = [
  "Hashimoto", "Tiroides", "Artritis", "Lupus",
  "Sjogren", "Crohn / Colitis", "Psoriasis", "Fibromialgia",
];

const steps = [
  { n: "01", title: "Agenda tu consulta", body: "Envía un mensaje por WhatsApp. Sin formularios complicados." },
  { n: "02", title: "Videollamada personalizada", body: "Evalúo tu historial, síntomas y estilo de vida." },
  { n: "03", title: "Plan 100% a tu medida", body: "Recibes un plan diseñado para tu condición específica." },
  { n: "04", title: "Seguimiento cada 15 días", body: "Revisamos avances y ajustamos. Sin medicamentos." },
];

const credentials = [
  { label: "Nutrición Clínica", sub: "Especialización en España" },
  { label: "Harvard Medical School", sub: "Endocrinología Clínica" },
  { label: "3 condiciones autoinmunes", sub: "Experiencia personal + clínica" },
  { label: "+10 años", sub: "Tratando pacientes autoinmunes" },
];

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.842L.057 23.43a.5.5 0 0 0 .514.57l5.783-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-4.98-1.36l-.357-.212-3.435.9.916-3.347-.232-.374A9.785 9.785 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 bg-[#FAFAF7] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 20%, #EBF2ED 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-2xl">
            <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontFamily: "var(--font-raleway)" }}>
              Nutrición autoinmune personalizada
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-[#1C1C1A] mb-8" style={{ fontFamily: "var(--font-lora)" }}>
              Recupera tu salud,{" "}
              <em className="text-[#3D6B4F] not-italic">no solo tu peso.</em>
            </h1>
            <p className="text-[#6B6B60] text-lg leading-relaxed mb-10 max-w-xl" style={{ fontFamily: "var(--font-raleway)" }}>
              Soy nutrióloga clínica especializada en condiciones autoinmunes. Diseño planes de alimentación 100% personalizados que tratan la raíz de tus síntomas, sin medicamentos, sin dietas de hambre.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3D6B4F] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#527A5F] transition-colors duration-200 text-sm cursor-pointer"
                style={{ fontFamily: "var(--font-raleway)" }}>
                <WhatsAppIcon />Agendar consulta
              </a>
              <Link href="/nutricionpamcastro/mi-historia"
                className="inline-flex items-center gap-2 border border-[#E4DED4] text-[#1C1C1A] font-medium px-8 py-4 rounded-full hover:border-[#3D6B4F] hover:text-[#3D6B4F] transition-all duration-200 text-sm"
                style={{ fontFamily: "var(--font-raleway)" }}>
                Mi historia
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((c) => (
              <div key={c.label} className="bg-white border border-[#E4DED4] rounded-2xl p-5 hover:shadow-sm transition-shadow duration-200">
                <p className="text-[#1C1C1A] font-semibold text-sm leading-tight mb-1" style={{ fontFamily: "var(--font-lora)" }}>{c.label}</p>
                <p className="text-[#6B6B60] text-xs" style={{ fontFamily: "var(--font-raleway)" }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="py-20 px-6 bg-[#F4F1EA]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ fontFamily: "var(--font-raleway)" }}>Especialidades</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1C1A]" style={{ fontFamily: "var(--font-lora)" }}>Condiciones que trato</h2>
            </div>
            <p className="text-[#6B6B60] text-sm max-w-sm leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
              Trabajo con pacientes que tienen diagnósticos autoinmunes y no encuentran respuesta en la nutrición tradicional.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {conditions.map((c) => (
              <span key={c} className="bg-white border border-[#E4DED4] text-[#1C1C1A] text-sm font-medium px-5 py-2.5 rounded-full" style={{ fontFamily: "var(--font-raleway)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ fontFamily: "var(--font-raleway)" }}>Proceso</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1C1A]" style={{ fontFamily: "var(--font-lora)" }}>Así funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="group">
                <p className="text-5xl font-semibold text-[#EBF2ED] group-hover:text-[#3D6B4F] transition-colors duration-300 mb-4" style={{ fontFamily: "var(--font-lora)" }}>{s.n}</p>
                <h3 className="text-base font-semibold text-[#1C1C1A] mb-2" style={{ fontFamily: "var(--font-lora)" }}>{s.title}</h3>
                <p className="text-[#6B6B60] text-sm leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 px-6 bg-[#3D6B4F] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A8C9B0] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>Quién soy</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6" style={{ fontFamily: "var(--font-lora)" }}>
              Yo también tengo Hashimoto. Y dos diagnósticos más.
            </h2>
            <p className="text-[#C8DDD0] text-base leading-relaxed mb-8" style={{ fontFamily: "var(--font-raleway)" }}>
              Mi camino comenzó cuando fui mal diagnosticada hace más de 20 años. Pasé una década entrando y saliendo del hospital. Esa experiencia me llevó a estudiar nutrición, especializarme en España y certificarme en Harvard. No solo entiendo tu condición desde los libros, la vivo todos los días.
            </p>
            <Link href="/nutricionpamcastro/mi-historia"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200 text-sm"
              style={{ fontFamily: "var(--font-raleway)" }}>
              Leer mi historia completa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "20+", label: "Años de camino personal" },
              { stat: "100%", label: "Planes personalizados" },
              { stat: "0", label: "Medicamentos utilizados" },
              { stat: "L–V", label: "11am–5pm disponible" },
            ].map((item) => (
              <div key={item.stat} className="bg-white/10 rounded-2xl p-6">
                <p className="text-3xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-lora)" }}>{item.stat}</p>
                <p className="text-[#A8C9B0] text-sm" style={{ fontFamily: "var(--font-raleway)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#FAFAF7]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>Da el primer paso</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1C1A] mb-6" style={{ fontFamily: "var(--font-lora)" }}>
            Empieza a sentirte bien, de verdad.
          </h2>
          <p className="text-[#6B6B60] text-base leading-relaxed mb-8" style={{ fontFamily: "var(--font-raleway)" }}>
            Las consultas son por videollamada. Sin traslados, sin esperas. Solo tú, tu historia clínica y un plan diseñado específicamente para ti.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3D6B4F] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#527A5F] transition-colors duration-200 text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-raleway)" }}>
            <WhatsAppIcon />Agendar mi consulta ahora
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
