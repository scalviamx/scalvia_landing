"use client";

import { useMemo, useState } from "react";
import {
  Menu,
  MessageCircle,
  Ruler,
  X
} from "lucide-react";
import { HeroSection } from "./_components/ui/hero-section-2";
import { ProjectModal } from "./_components/ProjectModal";
import { ProjectCard } from "./_components/ProjectCard";
import { projects, type Project } from "./_data/projects";
import { specialties, specialtyOrder } from "./_data/specialties";
import type { RefObject } from "react";
import { useInView } from "./_hooks/useInView";

const whatsappHref =
  "https://wa.me/528112345678?text=Hola%20Rotunno%20Interiores%2C%20me%20gustaria%20cotizar%20un%20proyecto%20a%20medida.";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", alt: "Cocina con madera clara e iluminacion natural" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Centro de TV en nogal con iluminacion LED calida" },
  { src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85", alt: "Vestidor con repisas iluminadas y madera calida" },
  { src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=85", alt: "Mueble de bano flotante con cubierta continua" },
  { src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85", alt: "Cocina de alto contraste con gabinetes oscuros y madera" }
];

const process = [
  {
    title: "Levantamiento",
    text: "Medimos, revisamos necesidades y entendemos como se va a vivir el espacio."
  },
  {
    title: "Diseno y propuesta",
    text: "Definimos distribucion, materiales, acabados y alcance antes de producir."
  },
  {
    title: "Fabricacion",
    text: "Construimos cada modulo con precision, herrajes adecuados y control de calidad."
  },
  {
    title: "Instalacion",
    text: "Montaje limpio, ajustes finales y entrega lista para uso."
  }
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProjects = useMemo(
    () =>
      specialtyOrder
        .map((category) => projects.find((p) => p.category === category))
        .filter((p): p is NonNullable<typeof p> => p !== undefined),
    []
  );

  const sobre = useInView();
  const proyectos = useInView();
  const proceso = useInView();
  const cta = useInView();

  return (
    <main className="min-h-screen bg-marble text-charcoal">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-charcoal">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex flex-col leading-tight">
            <span className="text-base font-medium tracking-[0.02em] text-white">Rotunno Interiores</span>
            <span className="text-[11px] tracking-wider text-white/60">Cocinas, Closets y Carpintería — Monterrey, N.L.</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white md:flex">
            <a className="transition hover:text-white/70" href="#sobre">
              Sobre
            </a>
            <a className="transition hover:text-white/70" href="#proyectos">
              Proyectos
            </a>
            <a
              className="rounded-md bg-white px-4 py-2 text-charcoal transition hover:bg-linen"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Cotizar
            </a>
          </nav>
          <button
            className="rounded-md border border-white/20 p-2 text-white md:hidden"
            type="button"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen ? (
          <nav className="grid gap-1 border-t border-white/10 bg-charcoal px-4 py-4 text-white md:hidden">
            {["sobre", "proyectos"].map((item) => (
              <a
                key={item}
                className="rounded-md px-2 py-3 capitalize transition hover:bg-white/10"
                href={`#${item}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <HeroSection
        id="inicio"
        title="Mobiliario a medida para espacios con calidez y propósito."
        subtitle="Cocinas, closets, TV centers y carpintería personalizada en Monterrey, con madera como protagonista e iluminación LED integrada."
        callToAction={{
          text: "COTIZAR POR WHATSAPP →",
          href: whatsappHref
        }}
        carouselImages={heroImages}
      />

      <section
        id="sobre"
        ref={sobre.ref as RefObject<HTMLElement>}
        className="border-b border-charcoal/10 bg-marble py-20 sm:py-24"
      >
        <div className={`mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 reveal${sobre.inView ? " in-view" : ""}`}>
          <div>
            <p className="text-sm font-medium text-walnut">Sobre Rotunno</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Carpinteria pensada para transformar espacios a traves del diseno personalizado.
            </h2>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-graphite">
            <p>
              Rotunno Interiores disena y fabrica cocinas, closets y carpinteria a
              medida en Monterrey. Cada proyecto busca resolver una necesidad real con
              materiales calidos, lineas limpias y detalles bien ejecutados.
            </p>
            <p>
              La madera clara, el nogal, los acabados blancos, el negro mate y la luz
              LED se combinan segun el espacio: desde una cocina de uso diario hasta un
              vestidor, un centro de TV o mobiliario para un proyecto institucional.
            </p>
          </div>
        </div>
      </section>

      <section
        id="proyectos"
        ref={proyectos.ref as RefObject<HTMLElement>}
        className="bg-marble py-20 sm:py-24"
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal${proyectos.inView ? " in-view" : ""}`}>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-walnut">Especialidades y proyectos</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Lo que fabricamos y cómo se ve en proyectos reales.
              </h2>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-charcoal/15 px-4 py-2 text-sm font-medium transition hover:bg-charcoal hover:text-white"
            >
              Iniciar cotizacion
              <Ruler size={17} />
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                specialty={specialties[project.category]}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={proceso.ref as RefObject<HTMLElement>}
        className="bg-marble py-20 sm:py-24"
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal${proceso.inView ? " in-view" : ""}`}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-walnut">Proceso de trabajo</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Un proceso claro para pasar de idea a fabricacion.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {process.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-lg border border-charcoal/10 bg-white p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-walnut text-sm font-medium text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={cta.ref as RefObject<HTMLElement>}
        className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8"
      >
        <div className={`mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-center reveal${cta.inView ? " in-view" : ""}`}>
          <div>
            <h2 className="text-3xl font-medium leading-tight sm:text-4xl">
              Cotiza tu proyecto con fotos, medidas o una idea inicial.
            </h2>
            <p className="mt-4 max-w-2xl text-white/72">
              Comparte el espacio que quieres transformar. Podemos ayudarte a definir
              distribucion, materiales, iluminacion y alcance antes de fabricar.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-medium text-charcoal transition hover:bg-linen"
          >
            Contactar por WhatsApp
            <MessageCircle size={18} />
          </a>
        </div>
      </section>

      <footer className="border-t border-charcoal/10 bg-marble py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-graphite sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Rotunno Interiores</p>
          <p>Cocinas, closets y carpinteria personalizada en Monterrey.</p>
        </div>
      </footer>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition hover:bg-[#20b858] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <MessageCircle size={24} />
      </a>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
