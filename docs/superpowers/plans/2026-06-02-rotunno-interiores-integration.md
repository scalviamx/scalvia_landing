# Rotunno Interiores Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar el landing de Rotunno Interiores como ruta `/rotunno-interiores` en scalvia_landing, reemplazando `/otunno-interiores`.

**Architecture:** Copiar y adaptar los archivos del repo `rotunno_interiores` dentro de `src/app/rotunno-interiores/` con carpetas prefijadas `_`. El layout de la ruta importa un CSS propio (`rotunno.css`) para aislar los estilos de Rotunno sin contaminar el resto de la landing.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, framer-motion, lucide-react, clsx, tailwind-merge

**Source repo (read-only):** `/Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores`

---

## File Map

| Acción | Ruta en scalvia_landing |
|--------|------------------------|
| Crear | `src/app/rotunno-interiores/rotunno.css` |
| Crear | `src/app/rotunno-interiores/layout.tsx` |
| Crear | `src/app/rotunno-interiores/page.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ProjectCard.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ProjectModal.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ui/hero-section-2.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ui/hero-carousel.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ui/button.tsx` |
| Crear | `src/app/rotunno-interiores/_components/ui/animated-hero-section-1.tsx` |
| Crear | `src/app/rotunno-interiores/_data/projects.ts` |
| Crear | `src/app/rotunno-interiores/_data/specialties.ts` |
| Crear | `src/app/rotunno-interiores/_hooks/useInView.ts` |
| Crear | `src/app/rotunno-interiores/_lib/utils.ts` |
| Modificar | `package.json` (agregar `tailwind-merge`) |
| Eliminar | `src/app/otunno-interiores/` (carpeta completa) |

---

## Task 1: Instalar dependencia faltante

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar tailwind-merge**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
pnpm add tailwind-merge
```

Expected: se agrega `tailwind-merge` a `dependencies` en `package.json` y se actualiza `pnpm-lock.yaml`.

- [ ] **Step 2: Verificar instalación**

```bash
node -e "require('tailwind-merge'); console.log('ok')"
```

Expected output: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add tailwind-merge dependency"
```

---

## Task 2: Crear rotunno.css (estilos con scope)

**Files:**
- Create: `src/app/rotunno-interiores/rotunno.css`

- [ ] **Step 1: Crear el archivo CSS**

Crear `src/app/rotunno-interiores/rotunno.css` con el siguiente contenido (sin las directivas `@tailwind` porque la landing ya las aplica):

```css
:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #f8f7f4;
  color: #171513;
  font-family: Satoshi, "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

::selection {
  background: #473424;
  color: #f8f7f4;
}

.image-settle {
  animation: imageSettle 700ms ease-out both;
}

.fade-up {
  animation: fadeUp 520ms ease-out both;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

.stagger-children > *:nth-child(1) { transition-delay: 0ms; }
.stagger-children > *:nth-child(2) { transition-delay: 80ms; }
.stagger-children > *:nth-child(3) { transition-delay: 160ms; }
.stagger-children > *:nth-child(4) { transition-delay: 240ms; }
.stagger-children > *:nth-child(5) { transition-delay: 320ms; }
.stagger-children > *:nth-child(6) { transition-delay: 400ms; }

@keyframes imageSettle {
  from {
    opacity: 0;
    transform: scale(1.015);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up:nth-child(1) { animation-delay: 80ms; }
.fade-up:nth-child(2) { animation-delay: 180ms; }
.fade-up:nth-child(3) { animation-delay: 280ms; }

@media (prefers-reduced-motion: reduce) {
  .image-settle,
  .fade-up,
  .reveal,
  .reveal.in-view {
    animation: none;
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/rotunno-interiores/rotunno.css
git commit -m "feat: add rotunno scoped CSS"
```

---

## Task 3: Crear layout.tsx

**Files:**
- Create: `src/app/rotunno-interiores/layout.tsx`

- [ ] **Step 1: Crear layout**

El layout importa el CSS con scope y exporta metadata. No redeclara `<html>` ni `<body>` porque el App Router solo permite uno por aplicación (está en `src/app/layout.tsx`).

```tsx
import type { Metadata } from "next";
import "./rotunno.css";

export const metadata: Metadata = {
  title: "Rotunno Interiores | Carpinteria y mobiliario a medida",
  description:
    "Cocinas, closets, TV centers y carpinteria personalizada en Monterrey con madera, luz LED y mobiliario a medida.",
  openGraph: {
    title: "Rotunno Interiores",
    description:
      "Portafolio de cocinas, closets, TV centers y carpinteria personalizada en Monterrey.",
    type: "website",
    locale: "es_MX",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RotunnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/rotunno-interiores/layout.tsx
git commit -m "feat: add rotunno layout with scoped metadata"
```

---

## Task 4: Copiar archivos de datos

**Files:**
- Create: `src/app/rotunno-interiores/_data/projects.ts`
- Create: `src/app/rotunno-interiores/_data/specialties.ts`

- [ ] **Step 1: Copiar projects.ts**

```bash
cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/data/projects.ts \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_data/projects.ts
```

No requiere cambios de imports — este archivo no importa nada externo.

- [ ] **Step 2: Copiar specialties.ts**

```bash
cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/data/specialties.ts \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_data/specialties.ts
```

No requiere cambios de imports.

- [ ] **Step 3: Commit**

```bash
git add src/app/rotunno-interiores/_data/
git commit -m "feat: add rotunno data files"
```

---

## Task 5: Copiar hooks y lib

**Files:**
- Create: `src/app/rotunno-interiores/_hooks/useInView.ts`
- Create: `src/app/rotunno-interiores/_lib/utils.ts`

- [ ] **Step 1: Copiar useInView.ts**

```bash
cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/hooks/useInView.ts \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_hooks/useInView.ts
```

No requiere cambios de imports.

- [ ] **Step 2: Copiar utils.ts**

```bash
cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/lib/utils.ts \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_lib/utils.ts
```

No requiere cambios de imports (`clsx` y `tailwind-merge` ya están instalados).

- [ ] **Step 3: Commit**

```bash
git add src/app/rotunno-interiores/_hooks/ src/app/rotunno-interiores/_lib/
git commit -m "feat: add rotunno hooks and lib utilities"
```

---

## Task 6: Copiar componentes UI

**Files:**
- Create: `src/app/rotunno-interiores/_components/ui/button.tsx`
- Create: `src/app/rotunno-interiores/_components/ui/hero-carousel.tsx`
- Create: `src/app/rotunno-interiores/_components/ui/hero-section-2.tsx`
- Create: `src/app/rotunno-interiores/_components/ui/animated-hero-section-1.tsx`

- [ ] **Step 1: Copiar archivos UI**

```bash
mkdir -p /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_components/ui

for f in button.tsx hero-carousel.tsx hero-section-2.tsx animated-hero-section-1.tsx; do
  cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/components/ui/$f \
     /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_components/ui/$f
done
```

- [ ] **Step 2: Actualizar imports en cada archivo UI**

En cada archivo copiado, reemplazar:
- `@/lib/utils` → `../_lib/utils` (o `../../_lib/utils` dependiendo de profundidad)

Abrir cada archivo y verificar qué imports usan `@/`. La regla es:
- Desde `_components/ui/*.tsx` hacia `_lib/utils.ts`: `../../_lib/utils`
- Desde `_components/ui/*.tsx` hacia otro archivo en `_components/ui/`: `./filename`

Editar `hero-section-2.tsx`:
```tsx
// Cambiar:
import { cn } from "@/lib/utils";
// Por:
import { cn } from "../../_lib/utils";
```

Editar `hero-carousel.tsx` (si importa cn):
```tsx
// Cambiar:
import { cn } from "@/lib/utils";
// Por:
import { cn } from "../../_lib/utils";
```

Editar `animated-hero-section-1.tsx` (si importa cn):
```tsx
// Cambiar:
import { cn } from "@/lib/utils";
// Por:
import { cn } from "../../_lib/utils";
```

Editar `button.tsx` (si importa cn):
```tsx
// Cambiar:
import { cn } from "@/lib/utils";
// Por:
import { cn } from "../../_lib/utils";
```

- [ ] **Step 3: Verificar TypeScript en los UI components**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
npx tsc --noEmit 2>&1 | grep rotunno
```

Expected: sin errores en archivos de rotunno.

- [ ] **Step 4: Commit**

```bash
git add src/app/rotunno-interiores/_components/ui/
git commit -m "feat: add rotunno UI components"
```

---

## Task 7: Copiar ProjectCard y ProjectModal

**Files:**
- Create: `src/app/rotunno-interiores/_components/ProjectCard.tsx`
- Create: `src/app/rotunno-interiores/_components/ProjectModal.tsx`

- [ ] **Step 1: Copiar componentes**

```bash
cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/components/ProjectCard.tsx \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_components/ProjectCard.tsx

cp /Users/robertomagallanes/Downloads/Scalvia/05_Repos/rotunno_interiores/components/ProjectModal.tsx \
   /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/rotunno-interiores/_components/ProjectModal.tsx
```

- [ ] **Step 2: Actualizar imports en ProjectCard.tsx**

Abrir `_components/ProjectCard.tsx` y reemplazar:
- `@/data/projects` → `../_data/projects`
- `@/data/specialties` → `../_data/specialties`
- `@/lib/utils` → `../_lib/utils`

- [ ] **Step 3: Actualizar imports en ProjectModal.tsx**

Abrir `_components/ProjectModal.tsx` y reemplazar:
- `@/data/projects` → `../_data/projects`
- `@/lib/utils` → `../_lib/utils`

- [ ] **Step 4: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep rotunno
```

Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/app/rotunno-interiores/_components/ProjectCard.tsx \
        src/app/rotunno-interiores/_components/ProjectModal.tsx
git commit -m "feat: add rotunno ProjectCard and ProjectModal components"
```

---

## Task 8: Crear page.tsx

**Files:**
- Create: `src/app/rotunno-interiores/page.tsx`

- [ ] **Step 1: Crear page.tsx con imports actualizados**

Copiar el contenido de `rotunno_interiores/app/page.tsx` y reemplazar todos los imports `@/`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { Menu, MessageCircle, Ruler, X } from "lucide-react";
import { HeroSection } from "./_components/ui/hero-section-2";
import { ProjectModal } from "./_components/ProjectModal";
import { ProjectCard } from "./_components/ProjectCard";
import { projects, type Project } from "./_data/projects";
import { specialties, specialtyOrder } from "./_data/specialties";
import type { RefObject } from "react";
import { useInView } from "./_hooks/useInView";
```

El resto del archivo (constantes, componente `Home`) se copia sin cambios desde `rotunno_interiores/app/page.tsx`.

- [ ] **Step 2: Verificar TypeScript completo**

```bash
npx tsc --noEmit 2>&1 | grep rotunno
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/app/rotunno-interiores/page.tsx
git commit -m "feat: add rotunno page with adapted imports"
```

---

## Task 9: Eliminar otunno-interiores

**Files:**
- Delete: `src/app/otunno-interiores/` (carpeta completa)

- [ ] **Step 1: Eliminar la carpeta**

```bash
rm -rf /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src/app/otunno-interiores
```

- [ ] **Step 2: Verificar que no queden referencias**

```bash
grep -r "otunno" /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing/src --include="*.tsx" --include="*.ts" -l
```

Expected: sin resultados (ningún archivo referencia la ruta antigua).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: remove otunno-interiores, replaced by rotunno-interiores"
```

---

## Task 10: Build y verificación final

- [ ] **Step 1: Build de producción**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
pnpm build
```

Expected: build exitoso sin errores. La ruta `/rotunno-interiores` debe aparecer en el output del build de Next.js.

- [ ] **Step 2: Servidor local**

```bash
pnpm dev
```

Abrir en browser: `http://localhost:3000/rotunno-interiores`

Verificar:
- La página carga correctamente
- La fuente Satoshi aplica (o fallback a Avenir Next/Helvetica)
- Las imágenes de Unsplash cargan
- El modal de proyectos abre al hacer click en una card
- El menú mobile funciona
- `http://localhost:3000/otunno-interiores` devuelve 404

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "feat: integrate rotunno-interiores landing into scalvia"
```
