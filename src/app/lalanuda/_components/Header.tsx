"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import {
  MenuIcon, XIcon, UserIcon, LogOutIcon, ArrowRightIcon,
} from "./icons";
import type { LalanudaUser } from "./types";

interface Props {
  guestUser: LalanudaUser | null;
  onLoginClick: () => void;
  onBook: () => void;
  onGuestLogout: () => void;
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

export default function Header({ guestUser, onLoginClick, onBook, onGuestLogout, onHome }: Props) {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = isSignedIn || !!guestUser;
  const displayName = isSignedIn
    ? (user?.firstName || user?.emailAddresses[0]?.emailAddress?.split("@")[0] || "Usuario")
    : guestUser?.name || null;
  const avatarUrl = isSignedIn ? user?.imageUrl : null;

  function handleLogout() {
    if (isSignedIn) signOut();
    else onGuestLogout();
    setMenuOpen(false);
  }

  const navLink = "hover:text-terracotta transition-colors text-sm";

  return (
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-ink/10">
      <style>{`
        .text-terracotta { color: #C75D3A; }
        .bg-cream\\/85 { background-color: rgba(245,239,230,0.85); }
        .border-ink\\/10 { border-color: rgba(28,24,21,0.10); }
      `}</style>
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
          <button onClick={onHome} className={navLink}>Inicio</button>
          <a href="#galeria" className={navLink}>Galería</a>
          <a href="#resenias" className={navLink}>Reseñas</a>
          <a href="#contacto" className={navLink}>Contacto</a>

          <button
            onClick={onBook}
            className="px-5 py-2 rounded-full text-sm transition-colors"
            style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C75D3A")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1C1815")}
          >
            Agendar cita
          </button>

          {isLoggedIn ? (
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
              <button onClick={handleLogout} className="flex items-center gap-1" style={{ color: "rgba(28,24,21,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1C1815")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,24,21,0.5)")}>
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="flex items-center gap-1.5" style={{ color: "rgba(28,24,21,0.7)" }}
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
          {isLoggedIn ? (
            <>
              <span className="text-sm mt-2 py-1" style={{ color: "rgba(28,24,21,0.6)" }}>{displayName}</span>
              <button onClick={handleLogout} className="text-left text-sm flex items-center gap-1.5 py-1" style={{ color: "rgba(28,24,21,0.5)" }}>
                <LogOutIcon className="w-4 h-4" /> Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={() => { onLoginClick(); setMenuOpen(false); }}
              className="text-left text-sm flex items-center gap-1.5 mt-2 py-1" style={{ color: "rgba(28,24,21,0.7)" }}>
              <UserIcon className="w-4 h-4" /> Ingresar
            </button>
          )}
        </div>
      )}
    </header>
  );
}
