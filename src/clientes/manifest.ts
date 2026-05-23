export interface ClienteMeta {
  slug: string;
  nombre: string;
  descripcion?: string;
}

export const clientesManifest: ClienteMeta[] = [
  {
    slug: "lalanuda",
    nombre: "La Lanuda",
    descripcion: "Agendamiento de citas veterinarias",
  },
];

export const slugsValidos = new Set(clientesManifest.map((c) => c.slug));
