import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { SectionTextCta } from '@/components/ui/SectionTextCta'

const CASOS = [
  {
    industry: 'Industrial · Manufactura',
    result: '35% más cierres. Cotizaciones en 2 hrs.',
    problema: 'Cotizaciones tardaban 3 días y llegaban tarde al cliente.',
    solucion: 'Agente de automatización que genera cotizaciones automáticas con datos del CRM y las envía en minutos.',
  },
  {
    industry: 'Bienes Raíces',
    result: '40% más cierres en los primeros 60 días.',
    problema: '120 leads al mes sin seguimiento estructurado.',
    solucion: 'Agente de ventas IA + WhatsApp automatizado con secuencias de seguimiento a 24, 48 y 72 hrs.',
  },
  {
    industry: 'Despachos · Servicios Profesionales',
    result: 'Ciclo de contratación de semanas a 5 días.',
    problema: 'RH invertía 3 semanas por proceso de contratación.',
    solucion: 'Reclutamiento IA con filtrado de CVs, entrevistas automáticas y ranking de candidatos.',
  },
]

export function Resultados() {
  return (
    <section id="resultados" className="py-24 bg-forest" aria-labelledby="resultados-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <BlurFade className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-growth mb-3">
            Casos de uso
          </p>
          <h2 id="resultados-title" className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-white mb-4">
            Resultados por industria
          </h2>
          <p className="text-base text-white/85">
            Así se ve la IA aplicada al negocio real en los sectores que más atendemos.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASOS.map((caso, i) => (
            <BlurFade key={caso.industry} delay={0.1 * (i + 1)}>
              <MagicCard className="bg-white/4 border border-white/10 rounded-3xl p-8 flex flex-col gap-4 h-full">
                <p className="text-xs font-bold tracking-widest uppercase text-growth">
                  {caso.industry}
                </p>
                <p className="text-[clamp(1.375rem,3vw,1.75rem)] font-extrabold text-white leading-tight tracking-tight">
                  {caso.result}
                </p>
                <div className="h-px bg-white/8" />
                <p className="text-[0.8125rem] text-white/85 leading-relaxed">
                  <strong className="text-white/85 font-semibold">Problema: </strong>
                  {caso.problema}
                </p>
                <p className="text-sm text-white/85 leading-relaxed">
                  <strong className="text-white/85 font-semibold">Solución: </strong>
                  {caso.solucion}
                </p>
                <p className="text-xs text-white/70 mt-auto pt-2">
                  Proyección basada en implementaciones similares en el sector.
                </p>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <SectionTextCta
          href="/resultados"
          label="Ver resultados completos →"
          theme="dark"
        />

      </div>
    </section>
  )
}
