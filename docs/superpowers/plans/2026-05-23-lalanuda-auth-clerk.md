# La Lanuda — Auth Fase 1: Clerk + Google OAuth

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar la landing de La Lanuda de un HTML estático a un componente Next.js real, e integrar Clerk con Google OAuth para reemplazar el login mock existente.

**Architecture:** La ruta `scalvia.mx/lalanuda` pasa de inyectar un HTML crudo con `dangerouslySetInnerHTML` a ser una ruta Next.js dedicada `/lalanuda/page.tsx`. El JSX del HTML se extrae a componentes `.tsx`. Clerk se instala solo en esta ruta (no en toda la app de Scalvia) usando un layout dedicado. El botón de Instagram permanece en el UI pero no dispara ninguna acción real.

**Tech Stack:** Next.js 15 App Router, React 19, `@clerk/nextjs` v6, Clerk Dashboard (Google OAuth provider), TypeScript, Tailwind CSS (instalado globalmente en el proyecto).

---

## Mapa de archivos

| Acción | Archivo | Responsabilidad |
|--------|---------|----------------|
| Crear | `src/app/lalanuda/layout.tsx` | `ClerkProvider` aislado para la ruta `/lalanuda` |
| Crear | `src/app/lalanuda/page.tsx` | Componente principal — orquesta el estado de auth |
| Crear | `src/app/lalanuda/_components/LoginModal.tsx` | Modal de login con `SignInButton` de Clerk |
| Crear | `src/app/lalanuda/_components/Header.tsx` | Header con botón de login/logout |
| Crear | `src/app/lalanuda/_components/BookingForm.tsx` | Formulario de agendamiento (stub para Fase 2) |
| Crear | `src/app/lalanuda/_components/ReviewsSection.tsx` | Sección de reseñas |
| Crear | `src/app/lalanuda/_components/ServicesSection.tsx` | Servicios y precios |
| Crear | `src/app/lalanuda/_components/HeroSection.tsx` | Hero + CTA |
| Crear | `src/app/lalanuda/_components/icons.tsx` | SVG inline icons (extraídos del HTML) |
| Crear | `src/app/lalanuda/_components/types.ts` | Tipos compartidos (User, Service, etc.) |
| Mantener | `src/app/[cliente]/page.tsx` | Sin cambios — sigue sirviendo otros clientes |
| Modificar | `src/clientes/manifest.ts` | Remover `lalanuda` del manifest (ahora tiene ruta propia) |
| Modificar | `.env.local` | Agregar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY` |

---

## Task 1: Setup de Clerk en el proyecto

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local`
- Create: `src/app/lalanuda/layout.tsx`

- [ ] **Step 1.1: Instalar Clerk**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
npm install @clerk/nextjs
```

Esperado: `@clerk/nextjs` aparece en `dependencies` en `package.json`.

- [ ] **Step 1.2: Crear cuenta y aplicación en Clerk Dashboard**

1. Ir a https://clerk.com → Sign up
2. Crear nueva aplicación: nombre `"La Lanuda"`
3. En **"Sign-in options"** habilitar solo: **Google**
4. Deshabilitar: Email, Phone, Username
5. Copiar `Publishable Key` y `Secret Key` del Dashboard

- [ ] **Step 1.3: Agregar variables de entorno locales**

Abrir `.env.local` y agregar (sin eliminar las variables existentes):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/lalanuda
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/lalanuda
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/lalanuda
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/lalanuda
```

- [ ] **Step 1.4: Crear layout de Clerk aislado para `/lalanuda`**

Crear `src/app/lalanuda/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function LalanudaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}>
      {children}
    </ClerkProvider>
  );
}
```

> Nota: `esES` localiza los textos de Clerk al español automáticamente.

- [ ] **Step 1.5: Verificar que el proyecto compila**

```bash
npm run build
```

Esperado: build exitoso, sin errores de TypeScript. Si hay error de `esES` no encontrado, usar `import { esES } from "@clerk/localizations"` — viene incluido en `@clerk/nextjs` v6.

- [ ] **Step 1.6: Commit**

```bash
git checkout -b feat/lalanuda-auth
git add package.json package-lock.json src/app/lalanuda/layout.tsx
git commit -m "feat(lalanuda): install Clerk and create isolated layout"
```

---

## Task 2: Extraer tipos e iconos del HTML

**Files:**
- Create: `src/app/lalanuda/_components/types.ts`
- Create: `src/app/lalanuda/_components/icons.tsx`

- [ ] **Step 2.1: Crear tipos compartidos**

Crear `src/app/lalanuda/_components/types.ts`:

```ts
export interface LalanudaUser {
  name: string;
  email?: string;
  imageUrl?: string;
  provider: "google" | "guest";
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  pet: string;
  text: string;
}
```

- [ ] **Step 2.2: Crear componente de iconos**

Crear `src/app/lalanuda/_components/icons.tsx`:

```tsx
type SvgProps = {
  className?: string;
  strokeWidth?: number;
};

const Svg = ({ children, className = "w-5 h-5", strokeWidth = 2 }: SvgProps & { children: React.ReactNode }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const MenuIcon = (p: SvgProps) => (
  <Svg {...p}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </Svg>
);

export const XIcon = (p: SvgProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
);

export const UserIcon = (p: SvgProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
);

export const StarIcon = (p: SvgProps) => (
  <Svg {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

export const CalendarIcon = (p: SvgProps) => (
  <Svg {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Svg>
);

export const InstagramIcon = (p: SvgProps) => (
  <Svg {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Svg>
);

export function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}
```

- [ ] **Step 2.3: Commit**

```bash
git add src/app/lalanuda/_components/types.ts src/app/lalanuda/_components/icons.tsx
git commit -m "feat(lalanuda): extract shared types and icon components"
```

---

## Task 3: Componente LoginModal con Clerk real

**Files:**
- Create: `src/app/lalanuda/_components/LoginModal.tsx`

- [ ] **Step 3.1: Crear LoginModal con SignInButton de Clerk**

Crear `src/app/lalanuda/_components/LoginModal.tsx`:

```tsx
"use client";

import { SignInButton } from "@clerk/nextjs";
import { GoogleIcon, InstagramIcon, UserIcon, XIcon } from "./icons";

interface Props {
  onClose: () => void;
  onGuestLogin: (name: string) => void;
}

export default function LoginModal({ onClose, onGuestLogin }: Props) {
  const [view, setView] = React.useState<"main" | "guest">("main");
  const [guestName, setGuestName] = React.useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ink/40 hover:text-ink"
        >
          <XIcon />
        </button>

        {view === "main" ? (
          <>
            <h2 className="font-display text-3xl tracking-tight mb-1">
              Bienvenido
            </h2>
            <p className="text-ink/60 mb-8">Inicia sesión para agendar tu cita.</p>

            <div className="flex flex-col gap-3">
              {/* Google — Clerk real */}
              <SignInButton mode="modal" forceRedirectUrl="/lalanuda">
                <button className="w-full flex items-center justify-center gap-3 bg-ink text-cream py-3.5 rounded-full hover:bg-terracotta transition-colors">
                  <GoogleIcon />
                  Continuar con Google
                </button>
              </SignInButton>

              {/* Instagram — UI solo, sin acción */}
              <button
                disabled
                className="w-full flex items-center justify-center gap-3 bg-white text-ink/40 border border-ink/10 py-3.5 rounded-full cursor-not-allowed"
                title="Próximamente"
              >
                <InstagramIcon className="w-4 h-4" />
                Continuar con Instagram
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-ink/10" />
                </div>
                <div className="relative flex justify-center text-xs text-ink/40">
                  <span className="bg-cream px-3">o</span>
                </div>
              </div>

              <button
                onClick={() => setView("guest")}
                className="w-full flex items-center justify-center gap-2 text-ink/60 py-3 hover:text-ink transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Continuar como invitado
              </button>
            </div>

            <p className="text-[11px] text-ink/40 mt-6 text-center leading-relaxed">
              Al continuar aceptas nuestros términos de servicio y política de privacidad.
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => setView("main")}
              className="text-ink/40 hover:text-ink text-sm mb-6 flex items-center gap-1"
            >
              ← Volver
            </button>
            <h2 className="font-display text-3xl tracking-tight mb-2">
              Como invitado
            </h2>
            <p className="text-ink/60 mb-6">¿Cómo te llamamos?</p>
            <input
              autoFocus
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                onGuestLogin(guestName.trim() || "Invitado")
              }
              placeholder="Tu nombre"
              className="w-full bg-soft border border-ink/10 rounded-2xl px-5 py-4 mb-4 focus:outline-none focus:border-ink"
            />
            <button
              onClick={() => onGuestLogin(guestName.trim() || "Invitado")}
              className="w-full bg-ink text-cream py-3.5 rounded-full hover:bg-terracotta transition-colors"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

> Nota: `SignInButton` de Clerk abre el modal de Google OAuth de Clerk. Después del login exitoso, Clerk redirige a `/lalanuda` donde `useUser()` ya devuelve el usuario autenticado.

> El botón de Instagram tiene `disabled` + `cursor-not-allowed` — visible pero no funcional. Sin texto "próximamente" visible para no confundir; solo un tooltip.

- [ ] **Step 3.2: Commit**

```bash
git add src/app/lalanuda/_components/LoginModal.tsx
git commit -m "feat(lalanuda): add LoginModal with real Clerk Google auth"
```

---

## Task 4: Componente Header con estado de auth

**Files:**
- Create: `src/app/lalanuda/_components/Header.tsx`

- [ ] **Step 4.1: Crear Header que usa `useUser` de Clerk**

Crear `src/app/lalanuda/_components/Header.tsx`:

```tsx
"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { MenuIcon, XIcon, CalendarIcon } from "./icons";
import { useState } from "react";
import type { LalanudaUser } from "./types";

interface Props {
  guestUser: LalanudaUser | null;
  onLoginClick: () => void;
  onBook: () => void;
  onGuestLogout: () => void;
}

export default function Header({ guestUser, onLoginClick, onBook, onGuestLogout }: Props) {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = isSignedIn
    ? user.firstName || user.emailAddresses[0]?.emailAddress || "Usuario"
    : guestUser?.name || null;

  const avatarUrl = isSignedIn ? user.imageUrl : null;
  const isLoggedIn = isSignedIn || !!guestUser;

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-ink/8">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          className="font-display text-lg tracking-tight text-ink"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          La Lanuda
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName || ""}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-warmbrown/20 flex items-center justify-center text-xs font-medium text-warmbrown">
                    {displayName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-sm text-ink/70">{displayName}</span>
              </div>
              <button
                onClick={onBook}
                className="flex items-center gap-1.5 bg-terracotta text-cream text-sm px-4 py-2 rounded-full hover:bg-ink transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                Agendar cita
              </button>
              <button
                onClick={() => isSignedIn ? signOut() : onGuestLogout()}
                className="text-sm text-ink/50 hover:text-ink"
              >
                Salir
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 text-ink/70 hover:text-ink text-sm"
            >
              Iniciar sesión
            </button>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-cream border-t border-ink/8 px-5 py-4 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-ink/60">{displayName}</span>
              <button
                onClick={() => { onBook(); setMenuOpen(false); }}
                className="text-left text-sm text-terracotta font-medium"
              >
                Agendar cita
              </button>
              <button
                onClick={() => { isSignedIn ? signOut() : onGuestLogout(); setMenuOpen(false); }}
                className="text-left text-sm text-ink/50"
              >
                Salir
              </button>
            </>
          ) : (
            <button
              onClick={() => { onLoginClick(); setMenuOpen(false); }}
              className="text-left text-sm text-ink/70"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4.2: Commit**

```bash
git add src/app/lalanuda/_components/Header.tsx
git commit -m "feat(lalanuda): add Header with Clerk useUser integration"
```

---

## Task 5: Página principal `/lalanuda`

**Files:**
- Create: `src/app/lalanuda/page.tsx`

- [ ] **Step 5.1: Crear la página principal**

Crear `src/app/lalanuda/page.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import LoginModal from "./_components/LoginModal";
import type { LalanudaUser } from "./_components/types";

// ─── Datos ───────────────────────────────────────────────────────────────────

const COMPANY = {
  name: "La Lanuda",
  tagline: "Estética Canina & Felina",
  description: "Cuidado profesional para tu mejor amigo en Monterrey.",
  address: "Monterrey, Nuevo León",
  phone: "+52 81 0000 0000",
  instagram: "@lalanuda.estudio",
};

const SERVICES = [
  { id: "s1", name: "Baño y secado", description: "Limpieza completa con productos premium.", duration: "60–90 min", price: "$350–$550" },
  { id: "s2", name: "Corte estilizado", description: "Corte a tu gusto o por raza.", duration: "90–120 min", price: "$500–$900" },
  { id: "s3", name: "Spa completo", description: "Baño + corte + aromaterapia.", duration: "2–3 hrs", price: "$800–$1,400" },
  { id: "s4", name: "Uñas y orejas", description: "Limpieza de oídos + corte de uñas.", duration: "30 min", price: "$180" },
];

const REVIEWS = [
  { id: "r1", author: "María Fernanda", rating: 5, pet: "Lupita, Schnauzer Mini", text: "Llevo a Lupita cada mes y siempre sale impecable. El trato es excepcional, se nota que aman lo que hacen." },
  { id: "r2", author: "Carlos Eduardo", rating: 5, pet: "Coco, Golden Retriever", text: "El mejor lugar al que hemos llevado a Coco. Salió oliendo increíble y feliz. Súper recomendado." },
  { id: "r3", author: "Renata Ortiz", rating: 5, pet: "Mochi, Persa", text: "Mochi es muy nerviosa con extraños y aquí la tratan con tanta calma que sale relajada. Mil gracias." },
  { id: "r4", author: "Andrea Solís", rating: 5, pet: "Pelusa, Maltés", text: "Pelusa quedó como muñequita. El corte estilo cachorrito es perfecto. Definitivamente regresamos." },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LalanudaPage() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [guestUser, setGuestUser] = useState<LalanudaUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  // Limpiar guestUser si el usuario inicia sesión con Clerk
  useEffect(() => {
    if (isSignedIn) setGuestUser(null);
  }, [isSignedIn]);

  const isLoggedIn = isSignedIn || !!guestUser;

  function handleBook() {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    // Fase 2: abrir formulario de agendamiento
    alert("Agendamiento próximamente — Fase 2");
  }

  function handleGuestLogin(name: string) {
    setGuestUser({ name, provider: "guest" });
    setShowLogin(false);
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen font-display text-warmbrown text-xl">
        Cargando La Lanuda...
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');
        body { background-color: #F5EFE6; color: #1C1815; font-family: 'Manrope', system-ui, sans-serif; }
        .font-display { font-family: 'Fraunces', serif; font-variation-settings: 'opsz' 144; letter-spacing: -0.01em; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.55s ease-out both; }
        ::selection { background: #C75D3A; color: #F5EFE6; }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6", color: "#1C1815" }}>
        <Header
          guestUser={guestUser}
          onLoginClick={() => setShowLogin(true)}
          onBook={handleBook}
          onGuestLogout={() => setGuestUser(null)}
        />

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 pt-20 pb-16 animate-fade-up">
          <p className="text-sm font-medium text-terracotta mb-4 tracking-wide uppercase">
            {COMPANY.tagline}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl mb-6 leading-tight">
            Tu mascota merece<br />lo mejor.
          </h1>
          <p className="text-ink/60 text-lg max-w-md mb-10">
            {COMPANY.description}
          </p>
          <button
            onClick={handleBook}
            className="bg-terracotta text-cream px-8 py-4 rounded-full text-lg hover:bg-ink transition-colors"
          >
            {isLoggedIn ? "Agendar cita" : "Agendar cita — Inicia sesión"}
          </button>
        </section>

        {/* Servicios */}
        <section className="max-w-5xl mx-auto px-5 py-16 border-t border-ink/8">
          <h2 className="font-display text-3xl mb-10">Servicios</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-soft rounded-2xl p-6 border border-ink/8">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-ink">{s.name}</h3>
                  <span className="text-terracotta font-medium text-sm">{s.price}</span>
                </div>
                <p className="text-ink/60 text-sm mb-3">{s.description}</p>
                <span className="text-ink/40 text-xs">{s.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reseñas */}
        <section className="max-w-5xl mx-auto px-5 py-16 border-t border-ink/8">
          <h2 className="font-display text-3xl mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.id} className="bg-soft rounded-2xl p-6 border border-ink/8">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-terracotta text-terracotta" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-ink/80 text-sm mb-4">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div className="font-medium text-sm">{r.author}</div>
                  <div className="text-ink/40 text-xs">{r.pet}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-5 py-10 border-t border-ink/8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink/50">
          <span className="font-display">{COMPANY.name}</span>
          <span>{COMPANY.address}</span>
          <span>{COMPANY.instagram}</span>
        </footer>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onGuestLogin={handleGuestLogin}
        />
      )}
    </>
  );
}
```

- [ ] **Step 5.2: Actualizar manifest para remover lalanuda**

La ruta `/lalanuda` ahora tiene su propio `page.tsx` — si el manifiesto sigue incluyendo `lalanuda`, la ruta `[cliente]/lalanuda` entraría en conflicto. Remover del manifiesto.

Abrir `src/clientes/manifest.ts` y eliminar la entrada de `lalanuda`:

```ts
// Eliminar la línea que contiene { slug: "lalanuda", ... }
// El archivo debe quedar solo con los otros clientes activos
```

- [ ] **Step 5.3: Verificar build y dev server**

```bash
npm run dev
```

Abrir http://localhost:3000/lalanuda. Verificar:
- [ ] La página carga con el diseño correcto (cream background, Fraunces font)
- [ ] El botón "Iniciar sesión" abre el modal de Clerk con Google
- [ ] El login con Google funciona y muestra el nombre + avatar del usuario
- [ ] El botón "Continuar con Instagram" está visible pero deshabilitado
- [ ] "Continuar como invitado" funciona y muestra el nombre ingresado
- [ ] El botón "Salir" limpia la sesión correctamente

- [ ] **Step 5.4: Commit**

```bash
git add src/app/lalanuda/page.tsx src/app/lalanuda/_components/ src/clientes/manifest.ts
git commit -m "feat(lalanuda): migrate to Next.js component with Clerk auth"
```

---

## Task 6: Variables de entorno en Vercel + deploy

**Files:**
- Vercel Dashboard (no files)

- [ ] **Step 6.1: Agregar env vars en Vercel**

1. Ir a https://vercel.com → proyecto `scalvia_landing`
2. Settings → Environment Variables
3. Agregar estas variables para **Production** y **Preview**:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_XXXXXXX` (de Clerk Dashboard → Production) |
| `CLERK_SECRET_KEY` | `sk_live_XXXXXXX` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/lalanuda` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/lalanuda` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/lalanuda` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/lalanuda` |

> Nota: Usar las keys de **Production** (pk_live / sk_live) para el deploy, no las de test.

- [ ] **Step 6.2: Agregar dominio a Clerk**

En Clerk Dashboard → Domains, agregar `scalvia.mx` como dominio de producción.

- [ ] **Step 6.3: Push y deploy**

```bash
git push origin feat/lalanuda-auth
```

Luego abrir PR en GitHub y mergear a `main`, o hacer push directo:

```bash
git checkout main
git merge feat/lalanuda-auth
git push origin main
```

- [ ] **Step 6.4: Verificar en producción**

Abrir https://scalvia.mx/lalanuda y verificar el mismo checklist del Step 5.3 en producción.

---

## Checklist de auto-review

- [x] Clerk instalado solo en `/lalanuda` (layout aislado) — no afecta el resto de scalvia.mx
- [x] Instagram botón visible pero `disabled` — sin acción, sin acción futura hardcodeada
- [x] Guest login maneja estado local (no Clerk) — limpiado cuando Clerk hace sign-in
- [x] `isLoaded` de Clerk manejado con pantalla de carga
- [x] Todos los tipos en `types.ts` usados consistentemente en Header, LoginModal y page.tsx
- [x] Manifest actualizado para evitar conflicto de rutas con `[cliente]/lalanuda`
