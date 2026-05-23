"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import LoginModal from "./_components/LoginModal";
import type { LalanudaUser } from "./_components/types";

// ─── Datos ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "s1",
    name: "Baño y secado",
    description: "Limpieza completa con productos premium.",
    duration: "60–90 min",
    price: "$350–$550",
  },
  {
    id: "s2",
    name: "Corte estilizado",
    description: "Corte a tu gusto o por raza.",
    duration: "90–120 min",
    price: "$500–$900",
  },
  {
    id: "s3",
    name: "Spa completo",
    description: "Baño + corte + aromaterapia.",
    duration: "2–3 hrs",
    price: "$800–$1,400",
  },
  {
    id: "s4",
    name: "Uñas y orejas",
    description: "Limpieza de oídos + corte de uñas.",
    duration: "30 min",
    price: "$180",
  },
];

const REVIEWS = [
  {
    id: "r1",
    author: "María Fernanda",
    rating: 5,
    pet: "Lupita, Schnauzer Mini",
    text: "Llevo a Lupita cada mes y siempre sale impecable. El trato es excepcional, se nota que aman lo que hacen.",
  },
  {
    id: "r2",
    author: "Carlos Eduardo",
    rating: 5,
    pet: "Coco, Golden Retriever",
    text: "El mejor lugar al que hemos llevado a Coco. Salió oliendo increíble y feliz. Súper recomendado.",
  },
  {
    id: "r3",
    author: "Renata Ortiz",
    rating: 5,
    pet: "Mochi, Persa",
    text: "Mochi es muy nerviosa con extraños y aquí la tratan con tanta calma que sale relajada. Mil gracias.",
  },
  {
    id: "r4",
    author: "Andrea Solís",
    rating: 5,
    pet: "Pelusa, Maltés",
    text: "Pelusa quedó como muñequita. El corte estilo cachorrito es perfecto. Definitivamente regresamos.",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LalanudaPage() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [guestUser, setGuestUser] = useState<LalanudaUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isSignedIn) setGuestUser(null);
  }, [isSignedIn]);

  const isLoggedIn = isSignedIn || !!guestUser;

  function handleBook() {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    // Fase 2: formulario de agendamiento
    alert("Agendamiento próximamente — Fase 2 🗓️");
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center min-h-screen text-xl"
        style={{
          backgroundColor: "#F5EFE6",
          color: "#8B7355",
          fontFamily: "'Fraunces', serif",
        }}
      >
        Cargando La Lanuda...
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');
        .ll-display {
          font-family: 'Fraunces', serif;
          font-variation-settings: 'opsz' 144;
          letter-spacing: -0.01em;
        }
        @keyframes ll-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ll-animate { animation: ll-fade-up 0.55s ease-out both; }
        ::selection { background: #C75D3A; color: #F5EFE6; }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#F5EFE6",
          color: "#1C1815",
          fontFamily: "'Manrope', system-ui, sans-serif",
        }}
      >
        <Header
          guestUser={guestUser}
          onLoginClick={() => setShowLogin(true)}
          onBook={handleBook}
          onGuestLogout={() => setGuestUser(null)}
        />

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 pt-20 pb-16 ll-animate">
          <p
            className="text-sm font-medium mb-4 tracking-widest uppercase"
            style={{ color: "#C75D3A" }}
          >
            Estética Canina &amp; Felina
          </p>
          <h1 className="ll-display text-5xl sm:text-6xl mb-6 leading-tight">
            Tu mascota merece
            <br />
            lo mejor.
          </h1>
          <p className="text-lg max-w-md mb-10" style={{ color: "rgba(28,24,21,0.6)" }}>
            Cuidado profesional con amor en Monterrey. Cada visita, una
            experiencia que tu peludo va a querer repetir.
          </p>
          <button
            onClick={handleBook}
            className="px-8 py-4 rounded-full text-lg transition-colors"
            style={{ backgroundColor: "#C75D3A", color: "#F5EFE6" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1C1815")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#C75D3A")
            }
          >
            {isLoggedIn
              ? "Agendar cita"
              : "Agendar cita — Inicia sesión"}
          </button>

          {isSignedIn && clerkUser && (
            <p
              className="mt-4 text-sm"
              style={{ color: "rgba(28,24,21,0.5)" }}
            >
              Hola, {clerkUser.firstName || clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0]} 👋
            </p>
          )}
        </section>

        {/* Servicios */}
        <section
          className="max-w-5xl mx-auto px-5 py-16"
          style={{ borderTop: "1px solid rgba(28,24,21,0.08)" }}
        >
          <h2 className="ll-display text-3xl mb-10">Servicios</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#FFFEFC",
                  border: "1px solid rgba(28,24,21,0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{s.name}</h3>
                  <span
                    className="font-medium text-sm"
                    style={{ color: "#C75D3A" }}
                  >
                    {s.price}
                  </span>
                </div>
                <p
                  className="text-sm mb-3"
                  style={{ color: "rgba(28,24,21,0.6)" }}
                >
                  {s.description}
                </p>
                <span
                  className="text-xs"
                  style={{ color: "rgba(28,24,21,0.4)" }}
                >
                  {s.duration}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA intermedio */}
        {!isLoggedIn && (
          <section
            className="max-w-5xl mx-auto px-5 py-12 text-center"
            style={{ borderTop: "1px solid rgba(28,24,21,0.08)" }}
          >
            <h2 className="ll-display text-2xl mb-3">
              ¿Listo para agendar?
            </h2>
            <p
              className="mb-6 text-sm"
              style={{ color: "rgba(28,24,21,0.6)" }}
            >
              Inicia sesión con Google para reservar tu cita en segundos.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 rounded-full text-sm transition-colors"
              style={{ backgroundColor: "#1C1815", color: "#F5EFE6" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#C75D3A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1C1815")
              }
            >
              Continuar con Google
            </button>
          </section>
        )}

        {/* Reseñas */}
        <section
          className="max-w-5xl mx-auto px-5 py-16"
          style={{ borderTop: "1px solid rgba(28,24,21,0.08)" }}
        >
          <h2 className="ll-display text-3xl mb-10">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#FFFEFC",
                  border: "1px solid rgba(28,24,21,0.08)",
                }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="#C75D3A"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-sm mb-4"
                  style={{ color: "rgba(28,24,21,0.8)" }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <div className="font-medium text-sm">{r.author}</div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(28,24,21,0.4)" }}
                  >
                    {r.pet}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="max-w-5xl mx-auto px-5 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm"
          style={{
            borderTop: "1px solid rgba(28,24,21,0.08)",
            color: "rgba(28,24,21,0.5)",
          }}
        >
          <span className="ll-display">La Lanuda</span>
          <span>Monterrey, Nuevo León</span>
          <span>@lalanuda.estudio</span>
        </footer>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onGuestLogin={(name) => {
            setGuestUser({ name, provider: "guest" });
            setShowLogin(false);
          }}
        />
      )}
    </>
  );
}
