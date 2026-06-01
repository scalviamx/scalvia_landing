"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { Project } from "../_data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-charcoal/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full overflow-y-auto rounded-lg bg-marble shadow-soft sm:mx-auto sm:max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 p-5 sm:p-6">
          <div>
            <p className="text-sm text-graphite">{project.category}</p>
            <h3
              id="project-modal-title"
              className="mt-1 text-2xl font-medium text-charcoal sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Cerrar proyecto"
            className="rounded-md border border-charcoal/15 p-2 text-charcoal transition hover:bg-charcoal hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-3">
            {project.images.map((image, index) => (
              <div
                key={image}
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen"
              >
                <Image
                  src={image}
                  alt={`${project.title} imagen ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <p className="text-base leading-7 text-graphite">{project.description}</p>
            <dl className="mt-6 grid gap-4 border-t border-charcoal/10 pt-5">
              <div>
                <dt className="text-sm text-graphite">Ubicacion</dt>
                <dd className="mt-1 text-charcoal">{project.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-graphite">Materiales y detalles</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.materials.map((material) => (
                    <span
                      key={material}
                      className="rounded-md border border-charcoal/10 bg-white px-3 py-1 text-sm text-charcoal"
                    >
                      {material}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
