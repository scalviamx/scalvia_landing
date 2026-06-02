# Integración Rotunno Interiores — Design Spec

**Fecha:** 2026-06-02  
**Ruta destino:** `scalvia.mx/rotunno-interiores`  
**Fuente:** `/Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores`

---

## Objetivo

Integrar la nueva versión del landing de Rotunno Interiores (repo independiente) dentro de `scalvia_landing` como una ruta del App Router de Next.js, reemplazando completamente la carpeta `otunno-interiores` que existía anteriormente.

---

## Enfoque

Copiar y adaptar los archivos del repo `rotunno_interiores` dentro de `src/app/rotunno-interiores/`, siguiendo el patrón de prefijo `_` que usa la landing para carpetas internas (igual que `otunno-interiores`).

---

## Estructura resultante

```
src/app/
├── rotunno-interiores/
│   ├── _components/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   └── ui/
│   ├── _data/
│   │   ├── projects.ts
│   │   └── specialties.ts
│   ├── _hooks/
│   │   └── useInView.ts
│   ├── _lib/
│   │   └── utils.ts
│   ├── rotunno.css
│   ├── layout.tsx
│   └── page.tsx
└── otunno-interiores/   ← ELIMINADA
```

---

## Cambios por archivo

### `layout.tsx`
- Eliminar `<html>` y `<body>` — el App Router anidado no puede redeclararlos.
- Conservar `export const metadata` con title y description de Rotunno.
- Importar `./rotunno.css` para aplicar estilos con scope a esta ruta.
- Retornar solo `<>{children}</>` o un wrapper `<div>` si se requiere.

### `rotunno.css`
- Copiar `app/globals.css` del repo fuente.
- Eliminar las directivas `@tailwind base`, `@tailwind components`, `@tailwind utilities` (ya las provee la landing).
- Conservar: variables CSS (`:root`), `body` overrides, `::selection`, animaciones custom, `@font-face` de Satoshi si existe — o `@import` de la fuente.
- La fuente Satoshi queda con scope a `/rotunno-interiores` porque solo se importa en este layout.

### `page.tsx`
- Actualizar imports: `@/components/` → `./_components/`, `@/data/` → `./_data/`, `@/hooks/` → `./_hooks/`, `@/lib/` → `./_lib/`.

### `_components/*.tsx`
- Misma actualización de imports relativos donde sea necesario.

### `next.config.ts` (landing)
- Verificar que `images.unsplash.com` ya esté en `remotePatterns`. Está presente — no requiere cambio.

---

## Eliminación

- Borrar `src/app/otunno-interiores/` completo (carpeta y todo su contenido).
- No se agrega redirect — el cliente no usa la ruta anterior.

---

## Fuente de Satoshi

El repo `rotunno_interiores` no tiene carpeta `public/` con la fuente en local. Se asume que la fuente se carga via CDN o está definida en el CSS con `@import`. Verificar en `globals.css` del repo fuente durante la implementación y resolver según lo que esté definido.

---

## Criterio de éxito

- `scalvia.mx/rotunno-interiores` renderiza el nuevo landing de Rotunno sin errores.
- La fuente Satoshi aplica solo en esa ruta, sin afectar el resto de la landing.
- `/otunno-interiores` ya no existe (404).
- El build de Next.js pasa sin errores de TypeScript ni de imágenes.
