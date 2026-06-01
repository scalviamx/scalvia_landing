"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronRight,
  Hammer,
  LampDesk,
  Menu,
  MessageCircle,
  PanelTop,
  Ruler,
  Shirt,
  X
} from "lucide-react";
import { ProjectModal } from "./_components/ProjectModal";
import { categories, projects, type Project } from "./_data/projects";

const whatsappHref =
  "https://wa.me/528112345678?text=Hola%20Rotunno%20Interiores%2C%20me%20gustaria%20cotizar%20un%20proyecto%20a%20medida.";

const specialties = [
  {
    title: "Cocinas Personalizadas",
    text: "Blanco mate, madera, cubiertas claras, acentos negros y herrajes elegidos para el flujo diario.",
    icon: PanelTop
  },
  {
    title: "TV Centers",
    text: "Paneles, repisas, cajoneras y nichos iluminados para recamaras y salas con presencia limpia.",
    icon: LampDesk
  },
  {
    title: "Vestidores y Closets",
    text: "Repisas LED, zapateras, cajones y modulos interiores que ordenan sin perder calidez.",
    icon: Shirt
  },
  {
    title: "Banos y Vanities",
    text: "Muebles flotantes, cubiertas continuas y guardado discreto para espacios de rutina diaria.",
    icon: Ruler
  },
  {
    title: "Comercial e Institucional",
    text: "Mobiliario para escuelas, oficinas y espacios de servicio con medidas y uso especifico.",
    icon: BriefcaseBusiness
  },
  {
    title: "Carpinteria Especializada",
    text: "Puertas, paneles, repisas, detalles tecnicos e iluminacion integrada en piezas a medida.",
    icon: Hammer
  }
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

  const featuredProjects = useMemo(() => projects.slice(0, 6), []);

  return (
    <main className="min-h-screen bg-marble text-charcoal">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/15 bg-charcoal/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="text-lg font-medium tracking-[0.02em] text-white">
            Rotunno Interiores
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/82 md:flex">
            <a className="transition hover:text-white" href="#sobre">
              Sobre
            </a>
            <a className="transition hover:text-white" href="#especialidades">
              Especialidades
            </a>
            <a className="transition hover:text-white" href="#proyectos">
              Proyectos
            </a>
            <a className="transition hover:text-white" href="#catalogo">
              Catalogo
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
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen ? (
          <nav className="grid gap-1 border-t border-white/10 bg-charcoal px-4 py-4 text-white md:hidden">
            {["sobre", "especialidades", "proyectos", "catalogo"].map((item) => (
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

      <section id="inicio" className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88"
          alt="Interior con madera natural, mobiliario a medida e iluminacion calida"
          fill
          priority
          sizes="100vw"
          className="image-settle object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/86 via-charcoal/48 to-charcoal/16" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20">
          <div className="max-w-3xl text-white">
            <h1 className="fade-up text-5xl font-medium leading-[1.03] sm:text-6xl lg:text-7xl">
              Mobiliario a medida para espacios con calidez y proposito.
            </h1>
            <p className="fade-up mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
              Cocinas, closets, TV centers y carpinteria personalizada en Monterrey,
              con madera como protagonista e iluminacion LED integrada.
            </p>
            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-charcoal transition hover:bg-linen"
              >
                Cotizar por WhatsApp
                <MessageCircle size={18} />
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ver proyectos
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="border-b border-charcoal/10 bg-marble py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
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

      <section id="especialidades" className="bg-bone py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-walnut">Especialidades</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Carpinteria residencial e institucional con detalles que si se usan.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;
              return (
                <article
                  key={specialty.title}
                  className="rounded-lg border border-charcoal/10 bg-white p-5 shadow-soft"
                >
                  <Icon className="text-walnut" size={24} strokeWidth={1.8} />
                  <h3 className="mt-5 text-lg font-medium">{specialty.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite">{specialty.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="proyectos" className="bg-marble py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-walnut">Proyectos destacados</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Trabajos recientes inspirados en cocinas, vestidores y centros de TV reales.
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
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-bone py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-walnut">Catalogo por categorias</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Elige el tipo de proyecto que se parece a lo que quieres resolver.
            </h2>
          </div>

          <div className="mt-12 grid gap-12">
            {categories.map((category) => {
              const categoryProjects = projects.filter((project) => project.category === category);
              return (
                <section key={category} aria-labelledby={`category-${category}`}>
                  <div className="mb-5 flex items-center justify-between border-b border-charcoal/10 pb-3">
                    <h3 id={`category-${category}`} className="text-xl font-medium">
                      {category}
                    </h3>
                    <span className="text-sm text-graphite">
                      {categoryProjects.length}{" "}
                      {categoryProjects.length === 1 ? "proyecto" : "proyectos"}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        compact
                        onClick={() => setActiveProject(project)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-marble py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
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
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#1f7a4d] text-white shadow-soft transition hover:bg-[#17643f]"
      >
        <MessageCircle size={24} />
      </a>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}

function ProjectCard({
  project,
  compact = false,
  onClick
}: {
  project: Project;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="group overflow-hidden rounded-lg border border-charcoal/10 bg-white text-left shadow-soft transition duration-200 hover:border-walnut/30"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden bg-linen ${compact ? "aspect-[4/3]" : "aspect-[5/4]"}`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-graphite">{project.category}</p>
        <h3 className="mt-1 text-lg font-medium text-charcoal">{project.title}</h3>
      </div>
    </button>
  );
}
