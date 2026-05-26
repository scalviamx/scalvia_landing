# Clerk Auth Redirects — Stay on Current Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sign-in and sign-out always redirect back to the current client page, scaling automatically to all future landing pages under `scalvia.mx`.

**Architecture:** A shared `ClerkProviderClient` reads `usePathname()` and passes it as `signInFallbackRedirectUrl`. `Header.tsx` passes `{ redirectUrl: pathname }` to `signOut()`. Each new client page just wraps with `ClerkProviderClient` — zero hardcoded paths.

**Tech Stack:** Next.js App Router, Clerk v7 (`@clerk/nextjs`), `usePathname` from `next/navigation`

---

## File Map

| File | Action | Why |
|---|---|---|
| `src/components/ClerkProviderClient.tsx` | **Create** | Shared client wrapper — reads `usePathname()`, passes to `ClerkProvider` |
| `src/app/lalanuda/layout.tsx` | **Modify** | Use `ClerkProviderClient` instead of hardcoded `ClerkProvider` |
| `src/app/lalanuda/_components/Header.tsx` | **Modify** | `signOut({ redirectUrl: pathname })` via `usePathname()` |

---

### Task 1: Create shared `ClerkProviderClient`

**Files:**
- Create: `src/components/ClerkProviderClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ClerkProvider
      localization={esES}
      signInFallbackRedirectUrl={pathname}
      signUpFallbackRedirectUrl={pathname}
    >
      {children}
    </ClerkProvider>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep ClerkProviderClient
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/ClerkProviderClient.tsx
git commit -m "feat(auth): add shared ClerkProviderClient that redirects to current page"
```

---

### Task 2: Update `lalanuda/layout.tsx` to use `ClerkProviderClient`

**Files:**
- Modify: `src/app/lalanuda/layout.tsx`

- [ ] **Step 1: Replace hardcoded ClerkProvider with shared component**

Replace entire file content:

```tsx
import ClerkProviderClient from "@/components/ClerkProviderClient";

export default function LalanudaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProviderClient>{children}</ClerkProviderClient>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep lalanuda
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/app/lalanuda/layout.tsx
git commit -m "feat(lalanuda): use shared ClerkProviderClient in layout"
```

---

### Task 3: Fix sign-out redirect in `Header.tsx`

**Files:**
- Modify: `src/app/lalanuda/_components/Header.tsx`

- [ ] **Step 1: Add `usePathname` import**

In `Header.tsx`, change the imports block from:

```tsx
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { MenuIcon, XIcon, UserIcon, LogOutIcon } from "./icons";
```

To:

```tsx
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { MenuIcon, XIcon, UserIcon, LogOutIcon } from "./icons";
```

- [ ] **Step 2: Read pathname and pass to signOut**

After the `const { signOut, openSignIn } = useClerk();` line, add:

```tsx
const pathname = usePathname();
```

Then replace the two `signOut()` calls (desktop and mobile) with:

```tsx
signOut({ redirectUrl: pathname })
```

Desktop button (line ~75):
```tsx
<button onClick={() => signOut({ redirectUrl: pathname })} style={{ color: "rgba(28,24,21,0.5)" }}
```

Mobile button (line ~111):
```tsx
<button onClick={() => { signOut({ redirectUrl: pathname }); setMenuOpen(false); }}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep lalanuda
```

Expected: no output.

- [ ] **Step 4: Commit and push**

```bash
git add src/app/lalanuda/_components/Header.tsx
git commit -m "fix(lalanuda): sign-out redirects back to current page via usePathname"
git push origin main
```

---

## Pattern for future landing pages

Every new client page (e.g. `/dulcedelicia`, `/eloissa`) follows this exact pattern:

**1. Layout** — just wrap with `ClerkProviderClient`, no hardcoded paths:
```tsx
// src/app/dulcedelicia/layout.tsx
import ClerkProviderClient from "@/components/ClerkProviderClient";

export default function DulceDeliciaLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProviderClient>{children}</ClerkProviderClient>;
}
```

**2. Header** — copy `lalanuda/_components/Header.tsx` pattern. `usePathname()` + `signOut({ redirectUrl: pathname })` already handle any route automatically.

**3. No extra config needed.** Sign-in and sign-out stay on whatever page the user is on.
