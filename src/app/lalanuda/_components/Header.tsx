"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { MenuIcon, XIcon, CalendarIcon } from "./icons";
import type { LalanudaUser } from "./types";

interface Props {
  guestUser: LalanudaUser | null;
  onLoginClick: () => void;
  onBook: () => void;
  onGuestLogout: () => void;
}

export default function Header({
  guestUser,
  onLoginClick,
  onBook,
  onGuestLogout,
}: Props) {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = isSignedIn
    ? user.firstName ||
      user.emailAddresses[0]?.emailAddress?.split("@")[0] ||
      "Usuario"
    : guestUser?.name || null;

  const avatarUrl = isSignedIn ? user.imageUrl : null;
  const isLoggedIn = isSignedIn || !!guestUser;

  function handleLogout() {
    if (isSignedIn) {
      signOut();
    } else {
      onGuestLogout();
    }
    setMenuOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(245,239,230,0.9)",
        borderBottom: "1px solid rgba(28,24,21,0.08)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          className="text-lg tracking-tight"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'opsz' 144",
            color: "#1C1815",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          La Lanuda
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5">
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
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(139,115,85,0.2)",
                      color: "#8B7355",
                    }}
                  >
                    {displayName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-sm" style={{ color: "rgba(28,24,21,0.7)" }}>
                  {displayName}
                </span>
              </div>

              <button
                onClick={onBook}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors"
                style={{ backgroundColor: "#C75D3A", color: "#F5EFE6" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1C1815")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#C75D3A")
                }
              >
                <CalendarIcon className="w-4 h-4" />
                Agendar cita
              </button>

              <button
                onClick={handleLogout}
                className="text-sm transition-colors"
                style={{ color: "rgba(28,24,21,0.5)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(28,24,21,1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(28,24,21,0.5)")
                }
              >
                Salir
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-sm transition-colors"
              style={{ color: "rgba(28,24,21,0.7)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(28,24,21,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(28,24,21,0.7)")
              }
            >
              Iniciar sesión
            </button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="sm:hidden"
          style={{ color: "#1C1815" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden px-5 py-4 flex flex-col gap-3"
          style={{
            backgroundColor: "#F5EFE6",
            borderTop: "1px solid rgba(28,24,21,0.08)",
          }}
        >
          {isLoggedIn ? (
            <>
              <span className="text-sm" style={{ color: "rgba(28,24,21,0.6)" }}>
                {displayName}
              </span>
              <button
                onClick={() => {
                  onBook();
                  setMenuOpen(false);
                }}
                className="text-left text-sm font-medium"
                style={{ color: "#C75D3A" }}
              >
                Agendar cita
              </button>
              <button
                onClick={handleLogout}
                className="text-left text-sm"
                style={{ color: "rgba(28,24,21,0.5)" }}
              >
                Salir
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setMenuOpen(false);
              }}
              className="text-left text-sm"
              style={{ color: "rgba(28,24,21,0.7)" }}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}
