export interface ClienteMeta {
  slug: string;
  nombre: string;
  descripcion?: string;
}

export const clientesManifest: ClienteMeta[] = [
  // lalanuda tiene ruta dedicada en /app/lalanuda — no va aquí
];

export const slugsValidos = new Set(clientesManifest.map((c) => c.slug));
