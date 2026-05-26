# LaLanuda — Clerk Direct Sign-In Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove custom LoginModal and use Clerk's built-in modal directly when unauthenticated user tries to book.

**Architecture:** Replace `setShowLogin(true)` calls with `useClerk().openSignIn()`. Remove `guestUser` state and LoginModal entirely. Header simplifies — only Clerk user, no guest path.

**Tech Stack:** Next.js App Router, Clerk (`useClerk`, `useUser`), TypeScript

---

## File Map

| File | Action |
|---|---|
| `src/app/lalanuda/page.tsx` | Remove `showLogin`, `guestUser` state; replace with `openSignIn()` |
| `src/app/lalanuda/_components/Header.tsx` | Remove `guestUser`, `onGuestLogout`, `onLoginClick` props |
| `src/app/lalanuda/_components/LoginModal.tsx` | **Delete** |
| `src/app/lalanuda/_components/types.ts` | Remove `LalanudaUser` interface (unused after deletion) |

---

### Task 1: Delete LoginModal and clean up types

**Files:**
- Delete: `src/app/lalanuda/_components/LoginModal.tsx`
- Modify: `src/app/lalanuda/_components/types.ts`

- [ ] **Step 1: Delete LoginModal file**

```bash
rm src/app/lalanuda/_components/LoginModal.tsx
```

- [ ] **Step 2: Remove LalanudaUser and guest-related types from types.ts**

Replace the entire file with:

```ts
// types.ts — kept for any future shared types
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

- [ ] **Step 3: Verify no other file imports LalanudaUser**

```bash
grep -r "LalanudaUser" src/
```

Expected: only Header.tsx and page.tsx (will be fixed in next tasks).

- [ ] **Step 4: Commit**

```bash
git add src/app/lalanuda/_components/LoginModal.tsx src/app/lalanuda/_components/types.ts
git commit -m "feat(lalanuda): remove custom LoginModal — replacing with Clerk direct"
```

---

### Task 2: Simplify Header — remove guest props

**Files:**
- Modify: `src/app/lalanuda/_components/Header.tsx`

- [ ] **Step 1: Rewrite Header with simplified props**

Replace entire file content:

```tsx
"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import {
  MenuIcon, XIcon, UserIcon, LogOutIcon,
} from "./icons";

interface Props {
  onBook: () => void;
  onHome: () => void;
}

function PawLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="currentColor">
      <ellipse cx="11" cy="13" rx="3.2" ry="4.2"/>
      <ellipse cx="20" cy="9" rx="3.2" ry="4.5"/>
      <ellipse cx="29" cy="13" rx="3.2" ry="4.2"/>
      <ellipse cx="34" cy="22" rx="3" ry="3.5"/>
      <ellipse cx="6" cy="22" rx="3" ry="3.5"/>
      <path d="M13 28 Q20 18 27 28 Q31 33 27 36 Q23.5 38.5 20 36.5 Q16.5 38.5 13 36 Q9 33 13 28 Z"/>
    </svg>
  );
}

export default function Header({ onBook, onHome }: Props) {
  const { user, isSignedIn } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = isSignedIn
    ? (user?.firstName || user?.emailAddresses[0]?.emailAddress?.split("@")[0] || "Usuario")
    : null;
  const avatarUrl = isSignedIn ? user?.imageUrl : null;

  function handleLogin() {
    openSignIn({ afterSignInUrl: "/lalanuda" });
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={onHome} className="flex items-center gap-2.5 group" style={{ color: "#1C1815" }}>
          <span className="group-hover:text-[#C75D3A] transition-colors"><PawLogo /></span>
          <div className="text-left leading-none">
            <div style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 144", fontSize: "1.2rem", letterSpacing: "-0.01em" }}>La Lanuda</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(28,24,21,0.55)", textTransform: "uppercase", marginTop: "2px" }}>Estética Canina &amp; Felina</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#1C1815" }}>
          <button onClick={onHome} className="hover:text-[#C75D3A] transition-colors">Inicio</button>
          <a href="#galeria" className="hover:text-[#C75D3A] transition-colors">Galería</a>
          <a href="#resenias" className="hover:text-[#C75D3A] transition-colors">Reseñas</a>
          <a href="#contacto" className="hover:text-[#C75D3A] transition-colors">Contacto</a>

          <button onClick={onBook}
            className="px-5 py-2 rounded-full text-sm transition-colors"
            style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C75D3A")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1C1815")}>
            Agendar cita
          </button>

          {isSignedIn ? (
            <div className="flex items-center gap-2">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={displayName || ""} width={28} height={28} className="rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: "rgba(139,115,85,0.2)", color: "#8B7355" }}>
                  {displayName?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <span className="text-sm" style={{ color: "rgba(28,24,21,0.7)" }}>{displayName}</span>
              <button onClick={() => signOut()} className="flex items-center gap-1"
                style={{ color: "rgba(28,24,21,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1C1815")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,24,21,0.5)")}>
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleLogin}
              className="flex items-center gap-1.5"
              style={{ color: "rgba(28,24,21,0.7)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1C1815")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,24,21,0.7)")}>
              <UserIcon className="w-4 h-4" />
              <span>Ingresar</span>
            </button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 -mr-2" style={{ color: "#1C1815" }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-1"
          style={{ backgroundColor: "#F5EFE6", borderColor: "rgba(28,24,21,0.08)" }}>
          <button onClick={() => { onHome(); setMenuOpen(false); }} className="text-left py-2">Inicio</button>
          <a href="#galeria" onClick={() => setMenuOpen(false)} className="py-2">Galería</a>
          <a href="#resenias" onClick={() => setMenuOpen(false)} className="py-2">Reseñas</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)} className="py-2">Contacto</a>
          <button onClick={() => { onBook(); setMenuOpen(false); }}
            className="mt-2 px-5 py-3 rounded-full text-sm text-center transition-colors"
            style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}>
            Agendar cita
          </button>
          {isSignedIn ? (
            <>
              <span className="text-sm mt-2 py-1" style={{ color: "rgba(28,24,21,0.6)" }}>{displayName}</span>
              <button onClick={() => { signOut(); setMenuOpen(false); }}
                className="text-left text-sm flex items-center gap-1.5 py-1"
                style={{ color: "rgba(28,24,21,0.5)" }}>
                <LogOutIcon className="w-4 h-4" /> Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={handleLogin}
              className="text-left text-sm flex items-center gap-1.5 mt-2 py-1"
              style={{ color: "rgba(28,24,21,0.7)" }}>
              <UserIcon className="w-4 h-4" /> Ingresar
            </button>
          )}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep Header
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/app/lalanuda/_components/Header.tsx
git commit -m "feat(lalanuda): simplify Header — remove guest props, use Clerk directly"
```

---

### Task 3: Update page.tsx — wire Clerk openSignIn, remove all guest/modal state

**Files:**
- Modify: `src/app/lalanuda/page.tsx`

- [ ] **Step 1: Remove guest/modal imports and state**

At the top of `page.tsx`, remove:
- Import of `LoginModal`
- Import of `LalanudaUser` from types
- The `guestUser` state
- The `showLogin` state

Replace the imports block (top of file, after `"use client"`) with:

```tsx
import { useState, useEffect, useMemo } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Header from "./_components/Header";
import {
  ArrowRightIcon, ArrowLeftIcon, ClockIcon, MapPinIcon, PhoneIcon,
  SparklesIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon,
  QuoteIcon, DogIcon, CatIcon, CheckIcon, CreditCardIcon, MessageCircleIcon,
  MailIcon, FacebookIcon, LoaderIcon, CalendarIcon, LockIcon,
  BanknoteIcon, StoreIcon, InstagramIcon, XIcon,
} from "./_components/icons";
```

- [ ] **Step 2: Rewrite the main export component**

Replace the `export default function LalanudaPage()` block with:

```tsx
export default function LalanudaPage() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [view, setView] = useState<"home" | "booking" | "review">("home");

  useEffect(() => { seedDemoBookings(); }, []);

  const currentUser = isSignedIn && clerkUser
    ? {
        name: clerkUser.firstName || clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] || "Usuario",
        email: clerkUser.emailAddresses[0]?.emailAddress,
      }
    : null;

  function startBooking() {
    if (!isSignedIn) {
      openSignIn({ afterSignInUrl: "/lalanuda" });
      return;
    }
    setView("booking");
  }

  function goReview() {
    if (!isSignedIn) {
      openSignIn({ afterSignInUrl: "/lalanuda" });
      return;
    }
    setView("review");
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl"
        style={{ backgroundColor: "#F5EFE6", color: "#8B7355", fontFamily: "'Fraunces', serif" }}>
        Cargando La Lanuda...
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@300;400;500;600;700&display=swap');
        .ll-display { font-family: 'Fraunces', serif; font-variation-settings: 'opsz' 144, 'SOFT' 50; letter-spacing: -0.01em; }
        @keyframes ll-fade-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .ll-animate { animation: ll-fade-up 0.55s ease-out both; }
        ::selection { background:#C75D3A; color:#F5EFE6; }
        ::-webkit-scrollbar { width:10px; height:10px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(28,24,21,0.18); border-radius:999px; }
        ::-webkit-scrollbar-thumb:hover { background:rgba(28,24,21,0.32); }
      `}</style>

      <div className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#F5EFE6", color: "#1C1815", fontFamily: "'Manrope', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
        <Header onBook={startBooking} onHome={() => setView("home")} />
        <div className="flex-1">
          {view === "home"    && <HomePage onBook={startBooking} onLeaveReview={goReview} />}
          {view === "booking" && <BookingFlow user={currentUser} onDone={() => setView("home")} onCancel={() => setView("home")} />}
          {view === "review"  && <ReviewSubmit user={currentUser} onDone={() => setView("home")} />}
        </div>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify TypeScript — zero errors in lalanuda files**

```bash
npx tsc --noEmit 2>&1 | grep lalanuda
```

Expected: no output.

- [ ] **Step 4: Commit and push**

```bash
git add src/app/lalanuda/page.tsx
git commit -m "feat(lalanuda): replace custom modal with Clerk openSignIn() — remove guest flow"
git push origin main
```
