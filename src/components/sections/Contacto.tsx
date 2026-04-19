'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlurFade } from '@/components/ui/BlurFade'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function Contacto() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (res.ok && json.success) {
        setState('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setErrorMsg(json.error || 'Error al enviar. Intenta de nuevo.')
        setState('error')
        setTimeout(() => setState('idle'), 5000)
      }
    } catch {
      setErrorMsg('Error de red. Intenta de nuevo.')
      setState('error')
      setTimeout(() => setState('idle'), 5000)
    }
  }

  return (
    <section id="contacto" className="py-24 bg-forest" aria-labelledby="cta-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">

          <BlurFade>
            <p className="text-xs font-bold tracking-widest uppercase text-growth mb-3">Contacto</p>
            <h2 id="cta-title" className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight leading-tight text-white mb-4">
              ¿Listo para que tu empresa trabaje más{' '}
              <span className="text-growth">inteligente</span>?
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-12">
              Agenda un diagnóstico gratuito. Analizamos tu operación y te mostramos exactamente qué se puede automatizar.
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white/4 border border-white/10 rounded-3xl p-8 sm:p-10 text-left flex flex-col gap-5 backdrop-blur-sm"
              aria-label="Formulario de contacto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="nombre">
                    Nombre completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="nombre" name="nombre" type="text" required autoComplete="name"
                    placeholder="Tu nombre"
                    className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all placeholder:text-white/30"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="empresa">
                    Empresa <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="empresa" name="empresa" type="text" required autoComplete="organization"
                    placeholder="Nombre de tu empresa"
                    className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="email">
                    Correo electrónico <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required autoComplete="email"
                    placeholder="tu@empresa.com"
                    className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all placeholder:text-white/30"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="whatsapp">
                    WhatsApp <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="whatsapp" name="whatsapp" type="tel" required autoComplete="tel"
                    placeholder="+52 81 1234 5678"
                    className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="sector">
                  Sector
                </label>
                <select
                  id="sector" name="sector"
                  className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px',
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona tu sector</option>
                  <option value="industrial" className="bg-forest text-white">Industrial / Manufactura</option>
                  <option value="bienes_raices" className="bg-forest text-white">Bienes Raíces</option>
                  <option value="despacho" className="bg-forest text-white">Despacho / Servicios Profesionales</option>
                  <option value="otro" className="bg-forest text-white">Otro</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8125rem] font-semibold text-white/70" htmlFor="reto">
                  ¿Cuál es tu mayor reto operativo hoy?
                </label>
                <textarea
                  id="reto" name="reto" rows={3}
                  placeholder="Ej. Tardamos demasiado en responder leads, el equipo de RH está saturado..."
                  className="text-white bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[0.9375rem] outline-none focus:border-growth focus:bg-white/9 transition-all placeholder:text-white/30 resize-none leading-relaxed"
                />
              </div>

              {/* Honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" />
              </div>

              <motion.button
                type="submit"
                disabled={state === 'loading' || state === 'success'}
                whileHover={state === 'idle' ? { y: -1 } : {}}
                whileTap={state === 'idle' ? { y: 0 } : {}}
                className={`w-full font-bold text-base py-4 rounded-xl transition-all duration-200 ${
                  state === 'success'
                    ? 'bg-green text-white cursor-default'
                    : state === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-growth text-ink hover:bg-[#2ea865] hover:shadow-[0_8px_28px_rgba(61,187,122,0.35)]'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {state === 'loading' && 'Enviando...'}
                {state === 'success' && '¡Diagnóstico agendado! Te contactamos pronto ✓'}
                {state === 'error' && (errorMsg || 'Error — intenta de nuevo')}
                {state === 'idle' && 'Solicitar diagnóstico gratuito →'}
              </motion.button>
            </form>
          </BlurFade>

          <BlurFade delay={0.3} className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-sm text-white/40">o si prefieres</span>
              <a
                href="https://wa.me/528131119893?text=Hola%20Scalvia%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratuito."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-growth hover:opacity-80 transition-opacity"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.103 1.523 5.824L.057 23.428a.75.75 0 0 0 .915.915l5.604-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.722-.51-5.27-1.402l-.372-.217-3.863 1.012 1.013-3.729-.232-.384A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Escribirnos por WhatsApp
              </a>
            </div>
            <p className="text-xs text-white/30">Sin compromiso. Te contactamos en menos de 24 horas.</p>
          </BlurFade>

        </div>
      </div>
    </section>
  )
}
