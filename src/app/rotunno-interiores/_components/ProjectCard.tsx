"use client";
import Image from "next/image";
import type { Specialty } from "../_data/specialties";
import type { Project } from "../_data/projects";

type ProjectCardProps = { project: Project; compact?: boolean; specialty?: Specialty; onClick: () => void; };

export function ProjectCard({ project, compact = false, specialty, onClick }: ProjectCardProps) {
  const isConceptual = project.category === "Diseno conceptual";
  const Icon = specialty?.icon;
  return (
    <button type="button" className="group overflow-hidden rounded-lg border border-charcoal/10 bg-white text-left shadow-soft transition duration-200 hover:border-walnut/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2" onClick={onClick}>
      <div className={`relative overflow-hidden bg-linen ${compact ? "aspect-[4/3]" : "aspect-[5/4]"}`}>
        <Image src={project.cover} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
        {isConceptual && (
          <span className="absolute left-3 top-3 rounded border border-oak/40 bg-linen/90 px-2 py-0.5 text-xs font-medium text-walnut backdrop-blur-sm">Diseño conceptual</span>
        )}
      </div>
      <div className="p-4">
        {Icon ? (
          <div className="mb-3 flex items-center gap-2">
            <Icon className="text-walnut" size={18} strokeWidth={1.8} />
            <span className="text-sm font-medium text-charcoal">{specialty!.title}</span>
          </div>
        ) : (
          <p className="text-sm text-graphite">{project.category}</p>
        )}
        <h3 className="mt-1 text-lg font-medium text-charcoal">{project.title}</h3>
        {specialty && <p className="mt-2 text-sm leading-5 text-graphite">{specialty.description}</p>}
      </div>
    </button>
  );
}
