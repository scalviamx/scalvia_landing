"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { GoogleIcon, InstagramIcon, UserIcon, XIcon } from "./icons";

interface Props {
  onClose: () => void;
  onGuestLogin: (name: string) => void;
}

export default function LoginModal({ onClose, onGuestLogin }: Props) {
  const [view, setView] = useState<"main" | "guest">("main");
  const [guestName, setGuestName] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-8 shadow-2xl"
        style={{ backgroundColor: "#F5EFE6" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
          style={{ color: "rgba(28,24,21,0.4)" }}
        >
          <XIcon />
        </button>

        {view === "main" ? (
          <>
            <h2
              className="text-3xl mb-1 tracking-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Bienvenido
            </h2>
            <p className="mb-8" style={{ color: "rgba(28,24,21,0.6)" }}>
              Inicia sesión para agendar tu cita.
            </p>

            <div className="flex flex-col gap-3">
              {/* Google — Clerk real */}
              <SignInButton mode="modal" forceRedirectUrl="/lalanuda">
                <button
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full transition-colors"
                  style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#C75D3A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1C1815")
                  }
                >
                  <GoogleIcon />
                  Continuar con Google
                </button>
              </SignInButton>

              {/* Instagram — UI only, sin acción */}
              <button
                disabled
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full border cursor-not-allowed"
                style={{
                  backgroundColor: "white",
                  color: "rgba(28,24,21,0.35)",
                  borderColor: "rgba(28,24,21,0.1)",
                }}
                title="Próximamente"
              >
                <InstagramIcon className="w-4 h-4" />
                Continuar con Instagram
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t"
                    style={{ borderColor: "rgba(28,24,21,0.1)" }}
                  />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span
                    className="px-3"
                    style={{
                      backgroundColor: "#F5EFE6",
                      color: "rgba(28,24,21,0.4)",
                    }}
                  >
                    o
                  </span>
                </div>
              </div>

              <button
                onClick={() => setView("guest")}
                className="w-full flex items-center justify-center gap-2 py-3 transition-colors"
                style={{ color: "rgba(28,24,21,0.6)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(28,24,21,1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(28,24,21,0.6)")
                }
              >
                <UserIcon className="w-4 h-4" />
                Continuar como invitado
              </button>
            </div>

            <p
              className="text-xs mt-6 text-center leading-relaxed"
              style={{ color: "rgba(28,24,21,0.4)" }}
            >
              Al continuar aceptas nuestros términos de servicio y política de
              privacidad.
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => setView("main")}
              className="text-sm mb-6 flex items-center gap-1"
              style={{ color: "rgba(28,24,21,0.4)" }}
            >
              ← Volver
            </button>
            <h2
              className="text-3xl mb-2 tracking-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Como invitado
            </h2>
            <p className="mb-6" style={{ color: "rgba(28,24,21,0.6)" }}>
              ¿Cómo te llamamos?
            </p>
            <input
              autoFocus
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                onGuestLogin(guestName.trim() || "Invitado")
              }
              placeholder="Tu nombre"
              className="w-full rounded-2xl px-5 py-4 mb-4 focus:outline-none"
              style={{
                backgroundColor: "#FFFEFC",
                border: "1px solid rgba(28,24,21,0.1)",
              }}
            />
            <button
              className="w-full py-3.5 rounded-full transition-colors"
              style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}
              onClick={() => onGuestLogin(guestName.trim() || "Invitado")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#C75D3A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1C1815")
              }
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
