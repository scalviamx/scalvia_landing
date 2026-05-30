import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";

const WA_LINK = "https://wa.me/message/I6Z4V2NBJQ7QO1";

const includes = [
  "Evaluación inicial completa de historial clínico",
  "Plan de alimentación 100% personalizado",
  "Ajuste de plan en cada sesión de seguimiento",
  "Guías de sustitución y preparación",
  "Orientación en interpretación de estudios de laboratorio",
  "Sin uso de medicamentos ni suplementos innecesarios",
  "Seguimiento cada 15 días",
];

const faqs = [
  { q: "¿Cómo se hace la consulta?", a: "Por videollamada de WhatsApp. Desde donde estés, sin traslados." },
  { q: "¿Qué necesito para la primera cita?", a: "El día de tu cita toma tu peso y medidas de cintura, cadera, brazo y cuello. En la primera sesión te enseño cómo tomarlas correctamente para sesiones futuras." },
  { q: "¿Cada cuánto son las consultas de seguimiento?", a: "Cada 15 días. En cada sesión se ajusta tu plan de alimentación según tus avances." },
  { q: "¿Se usan medicamentos o suplementos?", a: "No se usa ningún medicamento. Los suplementos solo se recomiendan si tu condición de salud lo requiere específicamente." },
  { q: "¿Cuál es el horario disponible?", a: "Lunes a Viernes, de 11am a 5pm." },
  { q: "¿Qué condiciones tratas?", a: "Me especializo en condiciones autoinmunes: Hashimoto, Artritis, Lupus, Sjogren, Crohn, Colitis, Psoriasis, Fibromialgia, y otras condiciones relacionadas con disregulación inmune o metabólica." },
];

export default function Consultas() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
              Consultas online
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] text-[#1C1C1A] mb-6" style={{ fontFamily: "var(--font-lora)" }}>
              Tu plan de nutrición autoinmune, desde casa.
            </h1>
            <p className="text-[#6B6B60] text-base leading-relaxed mb-8" style={{ fontFamily: "var(--font-raleway)" }}>
              Las consultas son 100% en línea por videollamada de WhatsApp. Mi objetivo es ayudarte a alcanzar
              un estado de salud ideal con excelente funcionamiento digestivo, regulación hormonal y metabólica,
              sin dietas que dañen tu salud y sin matarte de hambre.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3D6B4F] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#527A5F] transition-colors duration-200 text-sm cursor-pointer"
              style={{ fontFamily: "var(--font-raleway)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.842L.057 23.43a.5.5 0 0 0 .514.57l5.783-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-4.98-1.36l-.357-.212-3.435.9.916-3.347-.232-.374A9.785 9.785 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Agendar consulta por WhatsApp
            </a>
          </div>

          {/* Details card */}
          <div className="bg-[#F4F1EA] rounded-3xl p-8">
            <p className="text-[#C4856A] text-xs uppercase tracking-widest font-semibold mb-6" style={{ fontFamily: "var(--font-raleway)" }}>Detalles</p>
            <ul className="flex flex-col gap-3">
              {[
                { icon: "📹", label: "Videollamada de WhatsApp" },
                { icon: "🗓️", label: "Lunes a Viernes · 11am–5pm" },
                { icon: "🔄", label: "Seguimiento cada 15 días" },
                { icon: "💊", label: "Sin medicamentos" },
                { icon: "🌿", label: "Suplementos solo si son necesarios" },
                { icon: "📋", label: "Plan cambia en cada consulta" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-[#1C1C1A]" style={{ fontFamily: "var(--font-raleway)" }}>
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-[#E4DED4]">
              <p className="text-xs text-[#6B6B60] leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
                Se programa la cita una vez realizado el pago. Para reembolsos, solicitar dentro del mismo día de la compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT&apos;S INCLUDED */}
      <section className="py-24 px-6 bg-[#3D6B4F] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A8C9B0] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>Qué incluye</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight" style={{ fontFamily: "var(--font-lora)" }}>
              Cada consulta está diseñada para tu caso específico.
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8C9B0" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm text-[#C8DDD0]" style={{ fontFamily: "var(--font-raleway)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center" style={{ fontFamily: "var(--font-raleway)" }}>
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl font-semibold text-[#1C1C1A] mb-12 text-center" style={{ fontFamily: "var(--font-lora)" }}>
            Todo lo que necesitas saber
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-[#E4DED4] pb-6">
                <h3 className="text-base font-semibold text-[#1C1C1A] mb-2" style={{ fontFamily: "var(--font-lora)" }}>
                  {faq.q}
                </h3>
                <p className="text-[#6B6B60] text-sm leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-[#F4F1EA]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1C1C1A] mb-4" style={{ fontFamily: "var(--font-lora)" }}>
            ¿Lista para empezar?
          </h2>
          <p className="text-[#6B6B60] text-sm mb-8" style={{ fontFamily: "var(--font-raleway)" }}>
            Manda un mensaje por WhatsApp y agendamos tu primera consulta.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3D6B4F] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#527A5F] transition-colors duration-200 text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-raleway)" }}>
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
