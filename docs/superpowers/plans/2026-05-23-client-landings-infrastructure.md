# Client Landings Infrastructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve autocontained HTML landing pages per client at `scalvia.mx/[slug]` (e.g. `scalvia.mx/lalanuda`), stored as files inside the repo under `src/clientes/[slug]/`.

**Architecture:** A Next.js dynamic route `src/app/[cliente]/page.tsx` reads the client's `index.html` from the filesystem at build time and renders it via `dangerouslySetInnerHTML`. A whitelist manifest (`src/clientes/manifest.ts`) controls which slugs are valid — unknown slugs return 404. Existing static routes (`/contacto`, `/marketing`, etc.) take priority over the dynamic route automatically in Next.js App Router.

**Tech Stack:** Next.js 14+ App Router, TypeScript, `fs` (Node.js built-in), `path`, Tailwind (not used inside client pages — they are self-contained HTML).

> **Note on `X-Frame-Options: DENY` in vercel.json:** The global header applies to all routes including `/[cliente]`. Since we render HTML inline (not via iframe), this is fine. The client's HTML is injected directly into the page DOM.

> **Scope:** This plan covers the infrastructure only. The admin panel for uploading/managing pages is a separate plan.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/clientes/manifest.ts` | Create | Whitelist of valid slugs → display metadata |
| `src/clientes/lalanuda/index.html` | Create | LaLanuda's autocontained HTML (pasted in Task 3) |
| `src/app/[cliente]/page.tsx` | Create | Dynamic route — reads HTML, renders it |
| `src/app/[cliente]/not-found.tsx` | Create | 404 for invalid slugs |

---

### Task 1: Crear la branch demo y el manifiesto de clientes

**Files:**
- Create: `src/clientes/manifest.ts`

- [ ] **Step 1: Hacer checkout de la branch Demo**

```bash
git checkout Demo
git pull origin Demo
```

- [ ] **Step 2: Crear el manifiesto**

Crear el archivo `src/clientes/manifest.ts`:

```typescript
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
```

- [ ] **Step 3: Verificar que TypeScript no tenga errores**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/clientes/manifest.ts
git commit -m "feat(clientes): add client manifest whitelist"
```

---

### Task 2: Crear la ruta dinámica `[cliente]`

**Files:**
- Create: `src/app/[cliente]/page.tsx`
- Create: `src/app/[cliente]/not-found.tsx`

- [ ] **Step 1: Crear el directorio**

```bash
mkdir -p src/app/\[cliente\]
```

- [ ] **Step 2: Crear `src/app/[cliente]/page.tsx`**

```typescript
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import { slugsValidos, clientesManifest } from "@/clientes/manifest";

interface Props {
  params: { cliente: string };
}

export function generateStaticParams() {
  return clientesManifest.map((c) => ({ cliente: c.slug }));
}

export default function ClientePage({ params }: Props) {
  const { cliente } = params;

  if (!slugsValidos.has(cliente)) {
    notFound();
  }

  const htmlPath = join(process.cwd(), "src", "clientes", cliente, "index.html");

  let html: string;
  try {
    html = readFileSync(htmlPath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ all: "unset", display: "block" }}
    />
  );
}
```

- [ ] **Step 3: Crear `src/app/[cliente]/not-found.tsx`**

```typescript
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-500">Esta página no existe.</p>
        <a href="/" className="mt-4 inline-block text-blue-600 underline">
          Volver a Scalvia
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/app/\[cliente\]/page.tsx src/app/\[cliente\]/not-found.tsx
git commit -m "feat(clientes): add dynamic [cliente] route with 404 fallback"
```

---

### Task 3: Agregar el HTML de LaLanuda

**Files:**
- Create: `src/clientes/lalanuda/index.html`

- [ ] **Step 1: Crear el directorio**

```bash
mkdir -p src/clientes/lalanuda
```

- [ ] **Step 2: Pegar el HTML**

Crear `src/clientes/lalanuda/index.html` y pegar el HTML autocontenido que Roberto proporcionó.

> **Nota:** El HTML debe ser autocontenido — imágenes como URLs externas o base64, estilos inline o en `<style>` tags, scripts inline o desde CDN. Si depende de archivos locales (CSS/JS separados), moverlos a `src/clientes/lalanuda/` y ajustar las rutas a `/lalanuda/[archivo]` — pero esto requiere copiarlos a `public/clientes/lalanuda/` también.

- [ ] **Step 3: Levantar dev server y verificar**

```bash
npm run dev
```

Abrir `http://localhost:3000/lalanuda` en el browser.

Expected: La página de LaLanuda se renderiza correctamente, sin errores en consola.

- [ ] **Step 4: Verificar que rutas existentes siguen funcionando**

Navegar a:
- `http://localhost:3000/` — landing de Scalvia ✓
- `http://localhost:3000/contacto` — página de contacto ✓
- `http://localhost:3000/lalanuda` — LaLanuda ✓
- `http://localhost:3000/slug-inventado` — debe mostrar 404 ✓

- [ ] **Step 5: Commit**

```bash
git add src/clientes/lalanuda/index.html
git commit -m "feat(clientes): add LaLanuda landing page"
```

---

### Task 4: Build de producción y push a Demo

- [ ] **Step 1: Correr build**

```bash
npm run build
```

Expected: Build exitoso, sin errores. La ruta `/lalanuda` debe aparecer en el output de static pages.

- [ ] **Step 2: Push a branch Demo**

```bash
git push origin Demo
```

Vercel creará automáticamente un preview deployment para la branch `Demo`.

- [ ] **Step 3: Verificar el preview URL de Vercel**

En el output del push o en el dashboard de Vercel, obtener la URL del preview (ej. `scalvia-landing-demo.vercel.app`).

Verificar:
- `[preview-url]/lalanuda` — LaLanuda renderiza ✓
- `[preview-url]/` — Scalvia landing intacta ✓
- `[preview-url]/cualquier-cosa` — 404 ✓

---

## Siguiente plan: Admin Panel

Una vez que este plan está completo y LaLanuda está en producción, el siguiente plan cubre:
- Dashboard en `/admin` con auth básica (middleware + env var `ADMIN_PASSWORD`)
- Upload de nuevos archivos HTML desde el browser (sin tocar el repo directamente)
- Lista de clientes activos con links a sus páginas
- Toggle para activar/desactivar slugs sin hacer deploy

Ese plan se escribe cuando confirmes que la infraestructura base funciona.
