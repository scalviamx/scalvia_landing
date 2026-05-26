"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MenuIcon, XIcon, UserIcon, LogOutIcon } from "./icons";

interface Props {
  onBook: () => void;
  onHome: () => void;
  /** Usuario actual. null = no autenticado. En Demo se pasa un user ficticio. */
  user?: { name?: string; email?: string; avatarUrl?: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}


export default function Header({ onBook, onHome, user = null, onLogin, onLogout }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSignedIn = !!user;
  const displayName = user?.name ?? null;
  const avatarUrl = user?.avatarUrl ?? null;

  function handleLogin() {
    onLogin?.();
    setMenuOpen(false);
  }

  function handleLogout() {
    onLogout?.();
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md" style={{ backgroundColor: "rgba(237,232,255,0.85)", borderBottom: "1px solid rgba(30,10,69,0.1)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-24 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center group">
          <Image src="/vitelas_logo.png" alt="Vitelas Grooming" width={300} height={184} className="h-20 w-auto object-contain" priority />
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#1E0A45" }}>
          <button onClick={onHome} className="hover:text-[#7C3AED] transition-colors">Inicio</button>
          <a href="#galeria" className="hover:text-[#7C3AED] transition-colors">Galería</a>
          <a href="#resenias" className="hover:text-[#7C3AED] transition-colors">Reseñas</a>
          <a href="#contacto" className="hover:text-[#7C3AED] transition-colors">Contacto</a>
          <button onClick={onBook}
            className="px-5 py-2 rounded-full text-sm transition-colors"
            style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
            Agendar cita
          </button>
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName || ""} width={28} height={28} className="rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: "rgba(124,107,173,0.2)", color: "#7B6BAD" }}>
                  {displayName?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <span className="text-sm" style={{ color: "rgba(30,10,69,0.7)" }}>{displayName}</span>
              <button onClick={handleLogout} style={{ color: "rgba(30,10,69,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1E0A45")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(30,10,69,0.5)")}>
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="flex items-center gap-1.5"
              style={{ color: "rgba(30,10,69,0.7)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1E0A45")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(30,10,69,0.7)")}>
              <UserIcon className="w-4 h-4" /><span>Ingresar</span>
            </button>
          )}
        </nav>

        <button className="md:hidden p-2 -mr-2" style={{ color: "#1E0A45" }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-1"
          style={{ backgroundColor: "#EDE8FF", borderColor: "rgba(30,10,69,0.08)" }}>
          <button onClick={() => { onHome(); setMenuOpen(false); }} className="text-left py-2">Inicio</button>
          <a href="#galeria" onClick={() => setMenuOpen(false)} className="py-2">Galería</a>
          <a href="#resenias" onClick={() => setMenuOpen(false)} className="py-2">Reseñas</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)} className="py-2">Contacto</a>
          <button onClick={() => { onBook(); setMenuOpen(false); }}
            className="mt-2 px-5 py-3 rounded-full text-sm text-center"
            style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}>
            Agendar cita
          </button>
          {isSignedIn ? (
            <>
              <span className="text-sm mt-2 py-1" style={{ color: "rgba(30,10,69,0.6)" }}>{displayName}</span>
              <button onClick={handleLogout}
                className="text-left text-sm flex items-center gap-1.5 py-1"
                style={{ color: "rgba(30,10,69,0.5)" }}>
                <LogOutIcon className="w-4 h-4" /> Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={handleLogin}
              className="text-left text-sm flex items-center gap-1.5 mt-2 py-1"
              style={{ color: "rgba(30,10,69,0.7)" }}>
              <UserIcon className="w-4 h-4" /> Ingresar
            </button>
          )}
        </div>
      )}
    </header>
  );
}
