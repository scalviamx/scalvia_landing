"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/nutricionpamcastro", label: "Inicio" },
  { href: "/nutricionpamcastro/mi-historia", label: "Mi Historia" },
  { href: "/nutricionpamcastro/consultas", label: "Consultas" },
  { href: "/nutricionpamcastro/testimonios", label: "Testimonios" },
  { href: "/nutricionpamcastro/mi-canal", label: "Mi Canal" },
];

const WA_LINK = "https://wa.me/message/I6Z4V2NBJQ7QO1";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E4DED4]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/nutricionpamcastro" className="flex flex-col leading-tight">
          <span
            className="text-[#3D6B4F] font-semibold text-base tracking-wide"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Pam Castro
          </span>
          <span
            className="text-[#6B6B60] text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Nutrióloga Clínica
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-[#1C1C1A] hover:text-[#3D6B4F] transition-colors duration-200 font-medium"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#3D6B4F] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#527A5F] transition-colors duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.842L.057 23.43a.5.5 0 0 0 .514.57l5.783-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-4.98-1.36l-.357-.212-3.435.9.916-3.347-.232-.374A9.785 9.785 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          Agendar cita
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#1C1C1A] cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FAFAF7] border-t border-[#E4DED4] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#1C1C1A] hover:text-[#3D6B4F] font-medium transition-colors"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#3D6B4F] text-white font-semibold px-5 py-3 rounded-full hover:bg-[#527A5F] transition-colors mt-2"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Agendar cita por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
