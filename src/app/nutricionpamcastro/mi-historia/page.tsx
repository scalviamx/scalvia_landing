import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";
import Link from "next/link";

const WA_LINK = "https://wa.me/message/I6Z4V2NBJQ7QO1";

const milestones = [
  { year: "Hace 20+ años", title: "El diagnóstico equivocado", body: "Fui mal diagnosticada con hipotiroidismo. Se utilizó hormona tiroidea para promover pérdida de peso. Las consecuencias fueron graves." },
  { year: "10 años", title: "Entrando y saliendo del hospital", body: "Mi sistema inmune reaccionó al tratamiento. Desarrollé Hashimoto, una condición en que el sistema inmune ataca la tiroides. Ahora sí necesitaba el medicamento de por vida." },
  { year: "Decisión", title: "Estudié nutrición para entenderme a mí misma", body: "Ya tenía carrera como Chef profesional. Pero decidí estudiar nutrición para encontrar respuestas. Me di cuenta de que la nutrición tradicional se enfocaba en el peso, no en la raíz." },
  { year: "Especialización", title: "España + Harvard", body: "Me especialicé en Nutrición Clínica y Endocrinología en España. Luego fui aceptada en Harvard Medical School para certificaciones en Endocrinología Clínica." },
  { year: "Tercer diagnóstico", title: "Artritis SeroPositiva y Síndrome de Sjogren", body: "Años de dolor sin explicación. Médicos que desestimaron mis síntomas. Hasta que finalmente llegaron dos diagnósticos más. Mi enemigo tenía nombre." },
  { year: "Hoy", title: "Ayudando a miles como yo", body: "Todo ese camino me dio algo que ningún libro puede enseñar: entender lo que se siente por dentro. Ahora acompaño a pacientes autoinmunes a recuperar su salud a través de la alimentación." },
];

export default function MiHistoria() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-[#F4F1EA]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
            Mi historia
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-[#1C1C1A] mb-8" style={{ fontFamily: "var(--font-lora)" }}>
            No aprendí sobre enfermedades autoinmunes solo en la escuela.{" "}
            <em className="text-[#3D6B4F] not-italic">Las viví.</em>
          </h1>
          <p className="text-[#6B6B60] text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-raleway)" }}>
            Soy Pamela Castro, nutrióloga clínica con tres diagnósticos autoinmunes y más de 20 años
            de camino personal que se convirtió en mi mayor herramienta profesional.
          </p>
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section className="py-10 px-6 bg-[#3D6B4F]">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
          {[
            "Nutrióloga Clínica",
            "Especialización en España",
            "Harvard Medical School",
            "Endocrinología Clínica",
            "Chef Profesional",
          ].map((c) => (
            <span key={c} className="text-white/80 text-sm" style={{ fontFamily: "var(--font-raleway)" }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#1C1C1A] text-xl leading-relaxed mb-6" style={{ fontFamily: "var(--font-lora)" }}>
            &ldquo;Durante años fui a médicos que demeritaban mis síntomas. Llegaron a decirme que era hipocondría.
            Pero no me dejé caer. Sabía que había algo más, y seguí investigando.&rdquo;
          </p>
          <p className="text-[#6B6B60] text-base leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
            Tengo Hashimoto, Artritis SeroPositiva y Síndrome de Sjogren. Tres enfermedades autoinmunes que
            antes de entenderlas me tuvieron hospitalizada, con dolor constante y sin respuestas. Esa misma
            experiencia es la que me permite entender a mis pacientes de una manera que va más allá de los libros.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 bg-[#F4F1EA]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center" style={{ fontFamily: "var(--font-raleway)" }}>
            El camino
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1C1A] mb-16 text-center" style={{ fontFamily: "var(--font-lora)" }}>
            Cada diagnóstico fue un paso hacia aquí
          </h2>

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#3D6B4F] mt-2 shrink-0 group-hover:bg-[#C4856A] transition-colors duration-200" />
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-[#E4DED4] my-2" />}
                </div>
                <div className="pb-12">
                  <p className="text-[#C4856A] text-xs font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-raleway)" }}>
                    {m.year}
                  </p>
                  <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2" style={{ fontFamily: "var(--font-lora)" }}>
                    {m.title}
                  </h3>
                  <p className="text-[#6B6B60] text-sm leading-relaxed" style={{ fontFamily: "var(--font-raleway)" }}>
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-24 px-6 bg-[#1C1C1A] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-6" style={{ fontFamily: "var(--font-raleway)" }}>
            Por qué importa
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-8" style={{ fontFamily: "var(--font-lora)" }}>
            Cuando tu nutrióloga vive lo mismo que tú, la consulta cambia completamente.
          </h2>
          <p className="text-[#9C9C8E] text-base leading-relaxed mb-10" style={{ fontFamily: "var(--font-raleway)" }}>
            No te voy a decir que un diagnóstico autoinmune es fácil. Pero sí puedo decirte que con el enfoque
            nutricional correcto, es posible recuperar calidad de vida, sin dolor crónico, sin inflamación constante,
            y sin abandonar los alimentos que amas.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3D6B4F] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#527A5F] transition-colors duration-200 text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-raleway)" }}>
            Agendar mi primera consulta
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
