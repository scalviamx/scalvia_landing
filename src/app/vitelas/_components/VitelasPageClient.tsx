"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Header from "./Header";
import {
  ArrowRightIcon, ArrowLeftIcon, ClockIcon, MapPinIcon, PhoneIcon,
  SparklesIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon,
  QuoteIcon, DogIcon, CatIcon, CheckIcon, CreditCardIcon, MessageCircleIcon,
  MailIcon, FacebookIcon, LoaderIcon, CalendarIcon, LockIcon,
  BanknoteIcon, StoreIcon, InstagramIcon, XIcon,
} from "./icons";

// ─── Datos ────────────────────────────────────────────────────────────────────

const company = {
  name: "Vitelas",
  tagline: "Estética canina & felina",
  description: "Un estudio boutique donde cada visita es un ritual. Llevamos quince años cuidando el pelaje, la piel y la calma de las mascotas que nos visitan.",
  founded: 2009,
  city: "Monterrey, MX",
  address: "Calle Hidalgo 412, Centro · Monterrey",
  phone: "+52 81 2036 7228",
  whatsapp: "528120367228",
  email: "hola@vitelas.mx",
  platformAdminEmail: "hola@vitelas.mx",
  salonStaffWhatsapp: "528120367228",
  hours: [{ day: "Todos los días", time: "10:00 – 18:00" }],
  social: { instagram: "@vitelas.estudio", facebook: "Vitelas Estudio" },
  businessHours: {
    0: { open: "10:00", close: "18:00" }, 1: { open: "10:00", close: "18:00" },
    2: { open: "10:00", close: "18:00" }, 3: { open: "10:00", close: "18:00" },
    4: { open: "10:00", close: "18:00" }, 5: { open: "10:00", close: "18:00" },
    6: { open: "10:00", close: "18:00" },
  } as Record<number, { open: string; close: string }>,
  gallery: [
    { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80", caption: "Sala de espera" },
    { url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80", caption: "Sesión de baño" },
    { url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80", caption: "Corte y secado" },
    { url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80", caption: "Felinos también" },
    { url: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80", caption: "Resultado final" },
    { url: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=900&q=80", caption: "Spa para gatos" },
  ],
  heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1000&q=85",
};

const services = {
  perro: [
    { id: "bath",   name: "Baño completo",       description: "Champú premium, acondicionador y secado profesional.", basePrice: 280, duration: 60 },
    { id: "cut",    name: "Corte de pelo",       description: "Tijera y/o máquina según la raza.",                    basePrice: 380, duration: 75 },
    { id: "nails",  name: "Corte de uñas",       description: "Recorte y limado seguro.",                             basePrice: 80,  duration: 15 },
    { id: "ears",   name: "Limpieza de oídos",   description: "Solución antiséptica y secado.",                       basePrice: 60,  duration: 10 },
    { id: "teeth",  name: "Cepillado dental",    description: "Pasta enzimática apta para mascotas.",                 basePrice: 90,  duration: 15 },
    { id: "glands", name: "Glándulas anales",    description: "Drenado externo.",                                     basePrice: 70,  duration: 10 },
    { id: "spa",    name: "Spa de aromaterapia", description: "Mascarilla, masaje y perfume natural.",                basePrice: 180, duration: 30 },
    { id: "dye",    name: "Tinte creativo",      description: "Tinte temporal hipoalergénico.",                       basePrice: 220, duration: 45 },
  ],
  gato: [
    { id: "bath",  name: "Baño completo",      description: "Champú felino especial, secado a baja temperatura.", basePrice: 320, duration: 60 },
    { id: "cut",   name: "Corte higiénico",    description: "Corte estilo león o sanitario.",                     basePrice: 420, duration: 60 },
    { id: "nails", name: "Corte de uñas",      description: "Sin estrés, en duo.",                                basePrice: 90,  duration: 15 },
    { id: "ears",  name: "Limpieza de oídos",  description: "Suave y rápida.",                                    basePrice: 70,  duration: 10 },
    { id: "brush", name: "Cepillado profundo", description: "Para razas de pelo largo.",                          basePrice: 140, duration: 25 },
    { id: "spa",   name: "Ritual antiestrés",  description: "Feromonas, oscuridad y silencio.",                   basePrice: 160, duration: 30 },
  ],
} as Record<string, { id: string; name: string; description: string; basePrice: number; duration: number }[]>;

const sizeOptions = {
  perro: [
    { id: "toy",    label: "Toy",     range: "menos de 5 kg", multiplier: 1.0 },
    { id: "small",  label: "Pequeño", range: "5 – 10 kg",     multiplier: 1.2 },
    { id: "medium", label: "Mediano", range: "10 – 20 kg",    multiplier: 1.5 },
    { id: "large",  label: "Grande",  range: "20 – 35 kg",    multiplier: 1.9 },
    { id: "giant",  label: "Gigante", range: "más de 35 kg",  multiplier: 2.3 },
  ],
  gato: [
    { id: "small",  label: "Pequeño", range: "menos de 4 kg", multiplier: 1.0 },
    { id: "medium", label: "Mediano", range: "4 – 6 kg",      multiplier: 1.15 },
    { id: "large",  label: "Grande",  range: "más de 6 kg",   multiplier: 1.3 },
  ],
} as Record<string, { id: string; label: string; range: string; multiplier: number }[]>;

const breeds = {
  perro: ["Chihuahua","Pomerania","Yorkshire Terrier","Maltés","Poodle Toy","Bichón Frisé","Shih Tzu","Schnauzer Mini","Beagle","Cocker Spaniel","French Bulldog","Pug","Poodle Standard","Border Collie","Husky Siberiano","Labrador","Golden Retriever","Pastor Alemán","Bóxer","Rottweiler","Doberman","Gran Danés","San Bernardo","Mestizo","Otra"],
  gato: ["Persa","Maine Coon","Siamés","Bengalí","Ragdoll","Británico de Pelo Corto","Sphynx","Angora","Scottish Fold","Doméstico Pelo Corto","Doméstico Pelo Largo","Mestizo","Otra"],
} as Record<string, string[]>;

const PAYMENT_METHODS = [
  { id: "online",       title: "Tarjeta en línea",    desc: "Paga ahora con tarjeta de crédito o débito.",  status: "pagado",    Icon: CreditCardIcon },
  { id: "card_on_site", title: "Tarjeta en el lugar", desc: "Pagas con tarjeta cuando llegues al estudio.", status: "pendiente", Icon: StoreIcon },
  { id: "cash_on_site", title: "Efectivo en el lugar",desc: "Pagas en efectivo cuando llegues al estudio.", status: "pendiente", Icon: BanknoteIcon },
];

const reviews = [
  { id: "r1", author: "María Fernanda", rating: 5, pet: "Lupita, Schnauzer Mini",  text: "Llevo a Lupita cada mes y siempre sale impecable. El trato es excepcional, se nota que aman lo que hacen." },
  { id: "r2", author: "Carlos Eduardo", rating: 5, pet: "Coco, Golden Retriever",  text: "El mejor lugar al que hemos llevado a Coco. Salió oliendo increíble y feliz. Súper recomendado." },
  { id: "r3", author: "Laura Beltrán",  rating: 4, pet: "Toby, Beagle",            text: "Buen servicio aunque la espera fue un poco larga." },
  { id: "r4", author: "Renata Ortiz",   rating: 5, pet: "Mochi, Persa",            text: "Mochi es muy nerviosa con extraños y aquí la tratan con tanta calma que sale relajada. Mil gracias." },
  { id: "r5", author: "Daniel Pérez",   rating: 3, pet: "Rex, Husky",              text: "Estuvo bien pero esperaba algo más." },
  { id: "r6", author: "Andrea Solís",   rating: 5, pet: "Pelusa, Maltés",          text: "Pelusa quedó como muñequita. El corte estilo cachorrito es perfecto. Definitivamente regresamos." },
  { id: "r7", author: "Iván Castillo",  rating: 5, pet: "Bruno, Bulldog Francés",  text: "Excelente atención y precios justos. Bruno entra contento, eso lo dice todo." },
  { id: "r8", author: "Paulina Vega",   rating: 5, pet: "Nala, Bengalí",           text: "La forma en que manejan a los gatos es admirable. Cero estrés para Nala, y eso no tiene precio." },
  { id: "r9", author: "Roberto Aguilar",rating: 5, pet: "Simón, Poodle",           text: "Tres años yendo a La Lanuda. Nunca hemos tenido una mala experiencia. Cuidan los detalles." },
];

// ─── Booking utils ────────────────────────────────────────────────────────────

const SLOT_INTERVAL_MIN = 30;
const MIN_ADVANCE_MIN = 24 * 60;
const BOOKINGS_KEY = "ll_bookings_v1";
const DAY_NAMES = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const MONTH_NAMES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function pad2(n: number) { return n.toString().padStart(2, "0"); }
function toISODate(d: Date) { return d.getFullYear() + "-" + pad2(d.getMonth()+1) + "-" + pad2(d.getDate()); }
function fromISODate(s: string) { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); }
function sameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function minToHHMM(m: number) { return pad2(Math.floor(m/60)) + ":" + pad2(m%60); }
function parseHHMM(s: string) { const [h, m] = s.split(":").map(Number); return h*60 + (m||0); }
function formatMXN(n: number) { return new Intl.NumberFormat("es-MX", { style:"currency", currency:"MXN", maximumFractionDigits:0 }).format(n); }

function formatDayLabel(d: Date) {
  const today = new Date(); today.setHours(0,0,0,0);
  if (sameDay(d, today)) return "Hoy";
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  if (sameDay(d, tomorrow)) return "Mañana";
  return DAY_NAMES[d.getDay()];
}
function formatLongDate(isoStr: string) {
  const d = fromISODate(isoStr);
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}`;
}

function priceForService(petType: string, sizeId: string | null, serviceId: string) {
  const size = sizeOptions[petType]?.find(s => s.id === sizeId);
  const svc = services[petType]?.find(s => s.id === serviceId);
  if (!size || !svc) return svc?.basePrice || 0;
  return Math.round(svc.basePrice * size.multiplier);
}
function calculateTotal(petType: string | null, sizeId: string | null, ids: string[]) {
  if (!petType || !sizeId) return 0;
  return ids.reduce((t, id) => t + priceForService(petType, sizeId, id), 0);
}
function totalDuration(petType: string | null, ids: string[]) {
  if (!petType) return 0;
  return ids.reduce((t, id) => {
    const svc = services[petType]?.find(s => s.id === id);
    return t + (svc?.duration || 0);
  }, 0);
}

function generateSlots(date: Date, durationMin: number) {
  if (!durationMin) return [];
  const hours = company.businessHours[date.getDay()];
  if (!hours) return [];
  const openMin = parseHHMM(hours.open);
  const closeMin = parseHHMM(hours.close);
  const lastStart = closeMin - durationMin;
  if (lastStart < openMin) return [];
  const now = new Date();
  const slots: number[] = [];
  for (let m = openMin; m <= lastStart; m += SLOT_INTERVAL_MIN) {
    const slotDate = new Date(date);
    slotDate.setHours(Math.floor(m/60), m%60, 0, 0);
    if ((slotDate.getTime() - now.getTime()) / 60000 < MIN_ADVANCE_MIN) continue;
    slots.push(m);
  }
  return slots;
}

type StoredBooking = { id?: string; date: string; startMin: number; durationMin: number; demo?: boolean };

function isSlotAvailable(dateStr: string, startMin: number, durationMin: number, bookings: StoredBooking[]) {
  const endMin = startMin + durationMin;
  return !bookings.some(b => {
    if (b.date !== dateStr) return false;
    const bEnd = b.startMin + b.durationMin;
    return startMin < bEnd && endMin > b.startMin;
  });
}

function loadBookings(): StoredBooking[] {
  try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"); } catch { return []; }
}
function saveBookingToStorage(booking: StoredBooking) {
  const all = loadBookings(); all.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
}
function seedDemoBookings() {
  const today = toISODate(new Date());
  const existing = loadBookings();
  const future = existing.filter(b => b.date >= today);
  if (future.length > 0) {
    if (future.length !== existing.length) localStorage.setItem(BOOKINGS_KEY, JSON.stringify(future));
    return;
  }
  const businessDays: Date[] = [];
  const d = new Date(); d.setHours(0,0,0,0);
  for (let i = 1; businessDays.length < 5 && i < 21; i++) {
    const nd = new Date(d); nd.setDate(d.getDate() + i);
    if (company.businessHours[nd.getDay()]) businessDays.push(nd);
  }
  const demoSlots = [
    { startMin: 10*60, durationMin: 90 }, { startMin: 15*60+30, durationMin: 60 },
    { startMin: 11*60+30, durationMin: 75 }, { startMin: 9*60, durationMin: 120 },
    { startMin: 13*60, durationMin: 45 },
  ];
  const seeds = businessDays.map((bd, i) => ({ id: "demo_" + i, date: toISODate(bd), ...demoSlots[i], demo: true }));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(seeds));
}

// ─── Notifications ────────────────────────────────────────────────────────────

type BookingNotifData = {
  petName?: string; petType?: string; breed?: string; sizeLabel?: string; sizeRange?: string;
  date?: string; paymentMethod?: string; notes?: string; bookingId?: string;
  items: { name: string; price: number; duration: number }[];
  total: number;
};

function buildNotifications(booking: BookingNotifData, user: { name?: string; email?: string } | null) {
  const payment = PAYMENT_METHODS.find(p => p.id === booking.paymentMethod);
  const paymentLine = payment ? `${payment.title} (${payment.status})` : "No especificado";
  const fields = [
    ["Cliente",        `${user?.name || "Invitado"}${user?.email ? " (" + user.email + ")" : ""}`],
    ["Mascota",        `${booking.petName || "—"} · ${booking.petType === "perro" ? "Perro" : "Gato"} · ${booking.breed}`],
    ["Tamaño",         `${booking.sizeLabel} (${booking.sizeRange})`],
    ["Fecha",          booking.date || "Por confirmar"],
    ["Método de pago", paymentLine],
    ["Notas",          booking.notes || "—"],
  ];
  const waLines = [`*Nueva cita — ${company.name}*`, ``, ...fields.map(([k, v]) => `*${k}:* ${v}`), ``, `*Servicios:*`, ...booking.items.map(it => `• ${it.name} — $${it.price}`), ``, `*Total: $${booking.total} MXN*`];
  const waUrl = `https://wa.me/${company.salonStaffWhatsapp}?text=${encodeURIComponent(waLines.join("\n"))}`;
  const emailLines = [`Nueva cita agendada en ${company.name}.`, ``, `Este registro corresponde a un servicio facturable.`, ``, "— DETALLES —", ``, ...fields.map(([k, v]) => `${k}: ${v}`), ``, "Servicios:", ...booking.items.map(it => `  • ${it.name} — $${it.price} (${it.duration} min)`), ``, `Total: $${booking.total} MXN`, ``, `ID: ${booking.bookingId || "N/A"}`, `Generado: ${new Date().toLocaleString("es-MX")}`];
  const subject = `[Facturable] Cita ${booking.bookingId || ""} · ${company.name} — ${booking.petName || "Mascota"}`;
  const mailtoUrl = `mailto:${company.platformAdminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailLines.join("\n"))}`;
  return { waUrl, mailtoUrl };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

type Booking = {
  petType: string | null; petName: string; breed: string; sizeId: string | null;
  selectedServiceIds: string[]; slot: { date: string; startMin: number } | null;
  notes: string; paymentMethod: string | null;
};

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3" style={{ color: "rgba(30,10,69,0.75)" }}>
      <span style={{ color: "#7C3AED" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function ReviewsSection({ onLeaveReview }: { onLeaveReview: () => void }) {
  const fiveStarReviews = useMemo(() => reviews.filter(r => r.rating === 5), []);
  const [page, setPage] = useState(0);
  const VISIBLE = 5;
  const totalPages = Math.max(1, Math.ceil(fiveStarReviews.length / VISIBLE));
  const visible = fiveStarReviews.slice(page * VISIBLE, page * VISIBLE + VISIBLE);
  return (
    <section id="resenias" style={{ backgroundColor: "#F7F4FF", borderTop: "1px solid rgba(30,10,69,0.1)", borderBottom: "1px solid rgba(30,10,69,0.1)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="text-xs uppercase mb-3" style={{ letterSpacing: "0.25em", color: "#7B6BAD" }}>Lo que dicen</div>
            <h2 className="ll-display text-4xl md:text-6xl tracking-tight max-w-2xl">Voces de la manada.</h2>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => (p - 1 + totalPages) % totalPages)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(30,10,69,0.2)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1E0A45"; e.currentTarget.style.color = "#EDE8FF"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = ""; }}>
                <ChevronLeftIcon className="w-4 h-4"/>
              </button>
              <span className="text-sm px-2" style={{ color: "rgba(30,10,69,0.6)" }}>{page+1} / {totalPages}</span>
              <button onClick={() => setPage(p => (p + 1) % totalPages)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(30,10,69,0.2)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1E0A45"; e.currentTarget.style.color = "#EDE8FF"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = ""; }}>
                <ChevronRightIcon className="w-4 h-4"/>
              </button>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((r, i) => (
            <article key={r.id} className={`rounded-2xl p-7 ${i===0 ? "lg:col-span-2 lg:row-span-2 lg:p-10" : ""}`}
              style={{ backgroundColor: "#EDE8FF", border: "1px solid rgba(30,10,69,0.05)" }}>
              <QuoteIcon className={`mb-4 ${i===0 ? "w-10 h-10" : "w-6 h-6"}`} style={{ color: "#7C3AED" } as React.CSSProperties}/>
              <p className={`ll-display leading-tight mb-6 ${i===0 ? "text-3xl md:text-4xl" : "text-xl"}`}>&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between mt-8 pt-5" style={{ borderTop: "1px solid rgba(30,10,69,0.1)" }}>
                <div>
                  <div className="font-medium">{r.author}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(30,10,69,0.55)" }}>{r.pet}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,idx) => <StarIcon key={idx} className="w-3.5 h-3.5" style={{ fill: "#7C3AED", color: "#7C3AED" } as React.CSSProperties}/>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <div className="text-sm max-w-md" style={{ color: "rgba(30,10,69,0.6)" }}>Mostramos únicamente las reseñas de 5 estrellas verificadas tras un servicio completado.</div>
          <button onClick={onLeaveReview} className="text-sm transition-colors" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.color = "")}>
            ¿Tuviste un servicio reciente? Déjanos tu reseña →
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePage({ onBook, onLeaveReview }: { onBook: () => void; onLeaveReview: () => void }) {
  const age = new Date().getFullYear() - company.founded;
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-24 pb-16 md:pb-28">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
            <div className="md:col-span-7 ll-animate">
              <div className="text-xs uppercase mb-6" style={{ letterSpacing: "0.25em", color: "#7B6BAD" }}>Desde {company.founded} · {company.city}</div>
              <h1 className="ll-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
                Cuidado <em className="not-italic font-light" style={{ color: "#7C3AED" }}>tranquilo</em>
                <br className="hidden sm:block"/> para mascotas <span className="italic font-light">queridas</span>.
              </h1>
              <p className="mt-8 text-lg md:text-xl max-w-xl leading-relaxed" style={{ color: "rgba(30,10,69,0.7)" }}>{company.description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button onClick={onBook} className="group inline-flex items-center gap-2 px-7 py-4 rounded-full transition-colors"
                  style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
                  Agendar cita <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                </button>
                <a href="#galeria" className="px-7 py-4 rounded-full transition-colors" style={{ border: "1px solid rgba(30,10,69,0.2)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#1E0A45")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(30,10,69,0.2)")}>
                  Ver el estudio
                </a>
              </div>
            </div>
            <div className="md:col-span-5 relative ll-animate" style={{ animationDelay: "0.15s" }}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden" style={{ backgroundColor: "rgba(124,107,173,0.1)" }}>
                <img src={company.heroImage} alt="Mascota recibiendo cuidado" className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,10,69,0.3), transparent)" }}/>
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-10 rounded-full w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
                style={{ backgroundColor: "#EDE8FF", border: "1px solid rgba(30,10,69,0.1)" }}>
                <div className="text-center ll-display leading-tight">
                  <div className="text-2xl md:text-3xl">{age}</div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(30,10,69,0.6)" }}>años</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section style={{ borderTop: "1px solid rgba(30,10,69,0.1)", borderBottom: "1px solid rgba(30,10,69,0.1)", backgroundColor: "#F7F4FF" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 grid sm:grid-cols-3 gap-4 text-sm">
          <InfoChip icon={<MapPinIcon className="w-4 h-4"/>} label={company.address}/>
          <InfoChip icon={<ClockIcon className="w-4 h-4"/>} label="Todos los días · 10 a 18h"/>
          <InfoChip icon={<PhoneIcon className="w-4 h-4"/>} label={company.phone}/>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="text-xs uppercase mb-3" style={{ letterSpacing: "0.25em", color: "#7B6BAD" }}>El estudio</div>
            <h2 className="ll-display text-4xl md:text-6xl tracking-tight max-w-2xl">Un ritual hecho para tu mascota.</h2>
          </div>
          <div className="text-sm max-w-xs" style={{ color: "rgba(30,10,69,0.6)" }}>Productos veterinarios premium y técnicas que respetan el bienestar animal.</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {company.gallery.map((img, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-2xl ${i % 5 === 0 ? "aspect-[3/4] md:row-span-2 md:aspect-auto" : "aspect-square"}`}
              style={{ backgroundColor: "rgba(124,107,173,0.05)" }}>
              <img src={img.url} alt={img.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, rgba(30,10,69,0.4), transparent)" }}/>
              <figcaption className="absolute bottom-3 left-3 right-3 text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#EDE8FF", letterSpacing: "0.1em" }}>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ReviewsSection onLeaveReview={onLeaveReview}/>

      {/* CTA */}
      <section id="contacto" className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}>
          <div className="absolute top-6 right-6 opacity-15"><SparklesIcon className="w-32 h-32"/></div>
          <div className="relative max-w-2xl">
            <div className="text-xs uppercase mb-4" style={{ letterSpacing: "0.25em", color: "rgba(237,232,255,0.6)" }}>Reservas</div>
            <h2 className="ll-display text-4xl md:text-6xl leading-tight tracking-tight">Reserva en menos de un minuto.</h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(237,232,255,0.8)" }}>Selecciona el tipo de mascota, los servicios y paga en línea. Recibimos la confirmación de inmediato.</p>
            <button onClick={onBook} className="group mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full transition-colors"
              style={{ backgroundColor: "#EDE8FF", color: "#1E0A45" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#7C3AED"; e.currentTarget.style.color = "#EDE8FF"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#EDE8FF"; e.currentTarget.style.color = "#1E0A45"; }}>
              Comenzar <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Booking steps ────────────────────────────────────────────────────────────

function PetTypeStep({ booking, patch }: { booking: Booking; patch: (u: Partial<Booking>) => void }) {
  return (
    <div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-3">¿A quién atenderemos hoy?</h2>
      <p className="mb-10" style={{ color: "rgba(30,10,69,0.65)" }}>Cuéntanos del invitado especial.</p>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[{ id: "perro", Icon: DogIcon, label: "Perro" }, { id: "gato", Icon: CatIcon, label: "Gato" }].map(({ id, Icon, label }) => (
          <button key={id} onClick={() => patch({ petType: id, breed: "", sizeId: null, selectedServiceIds: [] })}
            className="aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 transition-all"
            style={{
              border: `2px solid ${booking.petType === id ? "#1E0A45" : "rgba(30,10,69,0.15)"}`,
              backgroundColor: booking.petType === id ? "#1E0A45" : "#F7F4FF",
              color: booking.petType === id ? "#EDE8FF" : "#1E0A45",
              transform: booking.petType === id ? "scale(0.98)" : "scale(1)",
            }}>
            <Icon className="w-14 h-14" strokeWidth={1.4}/>
            <span className="ll-display text-2xl">{label}</span>
          </button>
        ))}
      </div>
      {booking.petType && (
        <div className="ll-animate">
          <label className="block text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Nombre de tu mascota</label>
          <input value={booking.petName} onChange={e => patch({ petName: e.target.value })} placeholder="Ej. Lupita"
            className="w-full rounded-2xl px-5 py-4 focus:outline-none"
            style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}
            onFocus={e => (e.target.style.borderColor = "#1E0A45")} onBlur={e => (e.target.style.borderColor = "rgba(30,10,69,0.1)")}/>
        </div>
      )}
    </div>
  );
}

function BreedSizeStep({ booking, patch }: { booking: Booking; patch: (u: Partial<Booking>) => void }) {
  const petBreeds = breeds[booking.petType!] || [];
  const sizes = sizeOptions[booking.petType!] || [];
  return (
    <div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-3">Cuéntanos de {booking.petName || "tu mascota"}.</h2>
      <p className="mb-10" style={{ color: "rgba(30,10,69,0.65)" }}>La raza y el tamaño nos ayudan a estimar tiempo y precio.</p>
      <div className="mb-10">
        <label className="block text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Raza</label>
        <div className="relative">
          <select value={booking.breed} onChange={e => patch({ breed: e.target.value })}
            className="w-full rounded-2xl px-5 py-4 pr-12 focus:outline-none appearance-none cursor-pointer"
            style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}>
            <option value="">Selecciona una raza</option>
            {petBreeds.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(30,10,69,0.4)" }}/>
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase mb-3" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Tamaño / peso</label>
        <div className="space-y-2">
          {sizes.map(s => (
            <button key={s.id} onClick={() => patch({ sizeId: s.id })}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all text-left"
              style={{
                border: `2px solid ${booking.sizeId === s.id ? "#1E0A45" : "rgba(30,10,69,0.15)"}`,
                backgroundColor: booking.sizeId === s.id ? "#1E0A45" : "#F7F4FF",
                color: booking.sizeId === s.id ? "#EDE8FF" : "#1E0A45",
              }}>
              <div>
                <div className="font-medium">{s.label}</div>
                <div className="text-xs mt-0.5" style={{ color: booking.sizeId === s.id ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.55)" }}>{s.range}</div>
              </div>
              <div className="text-xs" style={{ color: booking.sizeId === s.id ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.45)" }}>×{s.multiplier.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesStep({ booking, patch }: { booking: Booking; patch: (u: Partial<Booking>) => void }) {
  const available = services[booking.petType!] || [];
  const selected = new Set(booking.selectedServiceIds);
  function toggle(id: string) {
    if (selected.has(id)) patch({ selectedServiceIds: booking.selectedServiceIds.filter(x => x !== id) });
    else patch({ selectedServiceIds: [...booking.selectedServiceIds, id] });
  }
  return (
    <div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-3">Elige los servicios.</h2>
      <p className="mb-10" style={{ color: "rgba(30,10,69,0.65)" }}>Puedes seleccionar más de uno. Los precios se ajustan al tamaño.</p>
      <div className="space-y-3">
        {available.map(svc => {
          const price = priceForService(booking.petType!, booking.sizeId, svc.id);
          const isSel = selected.has(svc.id);
          return (
            <button key={svc.id} onClick={() => toggle(svc.id)}
              className="w-full text-left px-5 py-4 md:p-5 rounded-2xl flex items-start gap-4 transition-all"
              style={{ border: `2px solid ${isSel ? "#1E0A45" : "rgba(30,10,69,0.15)"}`, backgroundColor: isSel ? "#1E0A45" : "#F7F4FF", color: isSel ? "#EDE8FF" : "#1E0A45" }}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors"
                style={{ borderColor: isSel ? "#EDE8FF" : "rgba(30,10,69,0.3)", backgroundColor: isSel ? "#EDE8FF" : "transparent", color: isSel ? "#1E0A45" : "transparent" }}>
                {isSel && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3}/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{svc.name}</div>
                  <div className="ll-display text-lg shrink-0">{formatMXN(price)}</div>
                </div>
                <div className="text-sm mt-1" style={{ color: isSel ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.6)" }}>{svc.description}</div>
                <div className="text-xs mt-1" style={{ color: isSel ? "rgba(237,232,255,0.55)" : "rgba(30,10,69,0.45)" }}>≈ {svc.duration} min</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateTimePicker({ durationMin, value, onChange, bookings }: {
  durationMin: number; value: { date: string; startMin: number } | null;
  onChange: (v: { date: string; startMin: number } | null) => void;
  bookings: StoredBooking[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? fromISODate(value.date) : null);
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date(); today.setHours(0,0,0,0);
    for (let i = 0; i < 30; i++) { const d = new Date(today); d.setDate(today.getDate() + i); arr.push(d); }
    return arr;
  }, []);
  const slots = useMemo(() => selectedDate && durationMin ? generateSlots(selectedDate, durationMin) : [], [selectedDate, durationMin]);
  const [busyBlocks, setBusyBlocks] = useState<{ startMin: number; endMin: number }[]>([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)

  useEffect(() => {
    if (!selectedDate) return
    const dateStr = toISODate(selectedDate)
    setLoadingAvailability(true)
    fetch(`/api/lalanuda/availability?date=${dateStr}`)
      .then(r => r.json())
      .then(data => {
        if (data.busy) setBusyBlocks(data.busy)
      })
      .catch(err => console.warn('[DateTimePicker] availability fetch error:', err))
      .finally(() => setLoadingAvailability(false))
  }, [selectedDate])

  useEffect(() => {
    if (!value || !durationMin) return;
    const d = fromISODate(value.date);
    const validSlots = generateSlots(d, durationMin);
    if (!validSlots.includes(value.startMin) || !isSlotAvailable(value.date, value.startMin, durationMin, bookings)) onChange(null);
  }, [durationMin]);

  if (!durationMin) return (
    <div className="rounded-2xl p-5 text-sm text-center italic" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)", color: "rgba(30,10,69,0.55)" }}>
      Selecciona al menos un servicio para ver los horarios disponibles.
    </div>
  );

  return (
    <div>
      <div className="text-[10px] uppercase mb-3" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Fecha</div>
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 md:mx-0 md:px-0" style={{ scrollSnapType: "x mandatory" }}>
        {days.map(d => {
          const dateStr = toISODate(d);
          const isOpen = !!company.businessHours[d.getDay()];
          const isSelected = selectedDate && sameDay(d, selectedDate);
          const daySlots = isOpen ? generateSlots(d, durationMin) : [];
          const hasAvailability = daySlots.some(s => isSlotAvailable(dateStr, s, durationMin, bookings));
          const disabled = !isOpen || !hasAvailability;
          return (
            <button key={dateStr} type="button" disabled={disabled} onClick={() => setSelectedDate(d)}
              className="shrink-0 w-[72px] py-3 rounded-2xl text-center transition-all"
              style={{
                scrollSnapAlign: "start",
                border: `2px solid ${isSelected ? "#1E0A45" : "rgba(30,10,69,0.1)"}`,
                backgroundColor: isSelected ? "#1E0A45" : "#F7F4FF",
                color: isSelected ? "#EDE8FF" : "#1E0A45",
                opacity: disabled ? 0.3 : 1, cursor: disabled ? "not-allowed" : "pointer",
              }}>
              <div className="text-[10px] uppercase mb-1" style={{ letterSpacing: "0.1em", color: isSelected ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.55)" }}>{formatDayLabel(d)}</div>
              <div className="ll-display text-2xl leading-none">{d.getDate()}</div>
              <div className="text-[10px] uppercase mt-1" style={{ letterSpacing: "0.1em", color: isSelected ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.45)" }}>{MONTH_NAMES[d.getMonth()]}</div>
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-8 ll-animate">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-[10px] uppercase" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Hora</div>
            <div className="text-[10px] uppercase" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.45)" }}>~{durationMin} min de servicio</div>
          </div>
          {loadingAvailability ? (
            <div className="rounded-2xl p-5 text-sm text-center italic" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)", color: "rgba(30,10,69,0.55)" }}>
              Verificando disponibilidad…
            </div>
          ) : slots.length === 0 ? (
            <div className="rounded-2xl p-5 text-sm text-center italic" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)", color: "rgba(30,10,69,0.55)" }}>No hay horarios disponibles ese día.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {slots.map(startMin => {
                const dateStr = toISODate(selectedDate);
                const available = isSlotAvailable(dateStr, startMin, durationMin, bookings) &&
                  !busyBlocks.some(b => startMin < b.endMin && (startMin + durationMin) > b.startMin);
                const isSel = value && value.date === dateStr && value.startMin === startMin;
                return (
                  <button key={startMin} type="button" disabled={!available} onClick={() => onChange({ date: dateStr, startMin })}
                    className="py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                    style={{
                      border: `2px solid ${isSel ? "#1E0A45" : available ? "rgba(30,10,69,0.1)" : "rgba(30,10,69,0.05)"}`,
                      backgroundColor: isSel ? "#1E0A45" : available ? "#F7F4FF" : "rgba(30,10,69,0.05)",
                      color: isSel ? "#EDE8FF" : available ? "#1E0A45" : "rgba(30,10,69,0.3)",
                      cursor: !available ? "not-allowed" : "pointer",
                    }}>
                    {!available && <LockIcon className="w-3 h-3"/>}
                    {minToHHMM(startMin)}
                  </button>
                );
              })}
            </div>
          )}
          {slots.length > 0 && (
            <div className="text-[11px] mt-3 flex items-center gap-1.5" style={{ color: "rgba(30,10,69,0.45)" }}>
              <LockIcon className="w-3 h-3"/> Las horas con candado ya están reservadas.
            </div>
          )}
        </div>
      )}
      {value && (
        <div className="mt-6 rounded-2xl p-4 text-sm flex items-start gap-3 ll-animate" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}>
          <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#7C3AED" } as React.CSSProperties}/>
          <div>
            <div className="font-medium">{formatLongDate(value.date)} a las {minToHHMM(value.startMin)}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(237,232,255,0.65)" }}>Termina aprox. {minToHHMM(value.startMin + durationMin)} · {durationMin} min</div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryStep({ booking, patch, user, onConfirmed }: {
  booking: Booking; patch: (u: Partial<Booking>) => void;
  user: { name?: string; email?: string } | null; onConfirmed: () => void;
}) {
  const [stage, setStage] = useState<"review"|"paying"|"paid"|"confirmed">("review");
  const [existingBookings, setExistingBookings] = useState(loadBookings);
  const size = sizeOptions[booking.petType!]?.find(s => s.id === booking.sizeId);
  const items = booking.selectedServiceIds.map(id => {
    const svc = services[booking.petType!].find(s => s.id === id)!;
    return { id, name: svc.name, price: priceForService(booking.petType!, booking.sizeId, id), duration: svc.duration };
  });
  const total = items.reduce((t, it) => t + it.price, 0);
  const durationMin = totalDuration(booking.petType, booking.selectedServiceIds);
  const dateLabel = booking.slot ? `${formatLongDate(booking.slot.date)} · ${minToHHMM(booking.slot.startMin)} – ${minToHHMM(booking.slot.startMin + durationMin)}` : "";
  const selectedPayment = PAYMENT_METHODS.find(p => p.id === booking.paymentMethod);

  function handlePay() { setStage("paying"); setTimeout(() => setStage("paid"), 1200); }
  async function handleConfirm() {
    const bookingId = "b_" + Date.now();
    saveBookingToStorage({
      id: bookingId,
      date: booking.slot!.date,
      startMin: booking.slot!.startMin,
      durationMin,
    });
    setExistingBookings(loadBookings());

    const selectedPayment = PAYMENT_METHODS.find(p => p.id === booking.paymentMethod);
    const paymentLabel = selectedPayment
      ? `${selectedPayment.title} (${selectedPayment.status})`
      : "No especificado";

    // Email vía API — no bloquea, no redirige
    fetch("/api/lalanuda/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        clientName: user?.name || "Invitado",
        clientEmail: user?.email || "",
        petName: booking.petName,
        petType: booking.petType === "perro" ? "Perro" : "Gato",
        breed: booking.breed,
        sizeLabel: size?.label ?? "",
        sizeRange: size?.range ?? "",
        items,
        total,
        dateLabel,
        slotDate: booking.slot!.date,
        slotStartMin: booking.slot!.startMin,
        durationMin,
        paymentMethod: paymentLabel,
        notes: booking.notes,
      }),
    }).catch(err => console.error("[lalanuda] notify error:", err));

    // WhatsApp al salón — nueva pestaña, no redirige
    const notif = buildNotifications(
      {
        petName: booking.petName,
        petType: booking.petType ?? undefined,
        breed: booking.breed,
        notes: booking.notes,
        paymentMethod: booking.paymentMethod ?? undefined,
        bookingId,
        date: dateLabel,
        sizeLabel: size?.label,
        sizeRange: size?.range,
        items,
        total,
      },
      user
    );
    window.open(notif.waUrl, "_blank");

    setStage("confirmed");
  }

  if (stage === "confirmed") return (
    <div className="text-center py-12 ll-animate">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}>
        <CheckIcon className="w-10 h-10" strokeWidth={2.4}/>
      </div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-4">¡Cita agendada!</h2>
      <div className="rounded-2xl p-5 max-w-md mx-auto mb-8 text-left" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}>
        <div className="text-[10px] uppercase mb-2" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>Tu cita</div>
        <div className="ll-display text-xl leading-tight">{dateLabel}</div>
        <div className="text-sm mt-1" style={{ color: "rgba(30,10,69,0.6)" }}>{booking.petName} · {items.length} {items.length === 1 ? "servicio" : "servicios"} · {formatMXN(total)}</div>
      </div>
      <button onClick={onConfirmed} className="px-7 py-3.5 rounded-full transition-colors" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
        Volver al inicio
      </button>
    </div>
  );

  return (
    <div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-3">Revisa tu cita.</h2>
      <p className="mb-10" style={{ color: "rgba(30,10,69,0.65)" }}>Elige cuándo quieres venir, cómo pagas, y confirmamos.</p>
      <div className="rounded-3xl p-6 md:p-8 space-y-5" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}>
        {[["Mascota", `${booking.petName} · ${booking.petType === "perro" ? "Perro" : "Gato"} · ${booking.breed}`], ["Tamaño", `${size?.label} (${size?.range})`]].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 items-baseline">
            <span className="text-[10px] uppercase shrink-0 pt-1" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>{k}</span>
            <span className="text-right">{v}</span>
          </div>
        ))}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-[10px] uppercase" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>Servicios</span>
            <span className="text-[10px] uppercase" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>~{durationMin} min</span>
          </div>
          <div className="space-y-2">
            {items.map(it => (
              <div key={it.id} className="flex justify-between gap-3 pb-2" style={{ borderBottom: "1px solid rgba(30,10,69,0.1)" }}>
                <span>{it.name} <span className="text-xs ml-1" style={{ color: "rgba(30,10,69,0.45)" }}>{it.duration} min</span></span>
                <span>{formatMXN(it.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-baseline pt-4" style={{ borderTop: "1px solid rgba(30,10,69,0.15)" }}>
          <span className="text-xs uppercase" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>Total</span>
          <span className="ll-display text-4xl">{formatMXN(total)}</span>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
          <h3 className="ll-display text-2xl tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" style={{ color: "#7C3AED" } as React.CSSProperties}/> Fecha y hora
          </h3>
          <span className="text-xs" style={{ color: "rgba(30,10,69,0.55)" }}>Reservas con 24h de anticipación</span>
        </div>
        <DateTimePicker durationMin={durationMin} value={booking.slot} onChange={slot => patch({ slot })} bookings={existingBookings}/>
      </div>
      <div className="mt-8">
        <label className="block text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Notas para el estilista (opcional)</label>
        <textarea rows={3} value={booking.notes} onChange={e => patch({ notes: e.target.value })}
          placeholder="Ej. Es nervioso con la secadora, prefiere música tranquila..."
          className="w-full rounded-2xl px-5 py-4 focus:outline-none resize-none"
          style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}
          onFocus={e => (e.target.style.borderColor = "#1E0A45")} onBlur={e => (e.target.style.borderColor = "rgba(30,10,69,0.1)")}/>
      </div>
      <div className="mt-10">
        <h3 className="ll-display text-2xl tracking-tight flex items-center gap-2 mb-5">
          <CreditCardIcon className="w-5 h-5" style={{ color: "#7C3AED" } as React.CSSProperties}/> Método de pago
        </h3>
        <div className="space-y-2">
          {PAYMENT_METHODS.map(pm => {
            const PmIcon = pm.Icon;
            const isSel = booking.paymentMethod === pm.id;
            const locked = stage !== "review";
            return (
              <button key={pm.id} type="button" disabled={locked} onClick={() => patch({ paymentMethod: pm.id })}
                className="w-full text-left px-5 py-4 rounded-2xl flex items-start gap-4 transition-all"
                style={{ border: `2px solid ${isSel ? "#1E0A45" : "rgba(30,10,69,0.1)"}`, backgroundColor: isSel ? "#1E0A45" : "#F7F4FF", color: isSel ? "#EDE8FF" : "#1E0A45", opacity: locked ? 0.6 : 1, cursor: locked ? "not-allowed" : "pointer" }}>
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0"
                  style={{ borderColor: isSel ? "#EDE8FF" : "rgba(30,10,69,0.3)", backgroundColor: isSel ? "#EDE8FF" : "transparent", color: isSel ? "#1E0A45" : "transparent" }}>
                  {isSel && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3}/>}
                </div>
                <PmIcon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: isSel ? "#EDE8FF" : "#7C3AED" } as React.CSSProperties}/>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{pm.title}</div>
                  <div className="text-sm mt-0.5" style={{ color: isSel ? "rgba(237,232,255,0.7)" : "rgba(30,10,69,0.6)" }}>{pm.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {stage === "review" && (() => {
        if (!booking.slot || !booking.paymentMethod) return (
          <button disabled className="mt-10 w-full py-4 rounded-full inline-flex items-center justify-center gap-2" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF", opacity: 0.3, cursor: "not-allowed" }}>
            {!booking.slot ? "Selecciona fecha y hora" : "Selecciona método de pago"}
          </button>
        );
        if (booking.paymentMethod === "online") return (
          <button onClick={handlePay} className="mt-10 w-full py-4 rounded-full inline-flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
            <CreditCardIcon className="w-4 h-4"/> Pagar {formatMXN(total)} en línea
          </button>
        );
        return (
          <button onClick={handleConfirm} className="mt-10 w-full py-4 rounded-full inline-flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
            <CheckIcon className="w-4 h-4"/> Confirmar cita · {booking.paymentMethod === "cash_on_site" ? "Pagar en efectivo al llegar" : "Pagar con tarjeta al llegar"}
          </button>
        );
      })()}
      {stage === "paying" && (
        <button disabled className="mt-10 w-full py-4 rounded-full inline-flex items-center justify-center gap-2" style={{ backgroundColor: "rgba(30,10,69,0.6)", color: "#EDE8FF", cursor: "wait" }}>
          <span className="inline-block animate-spin"><LoaderIcon className="w-4 h-4"/></span> Procesando pago...
        </button>
      )}
      {stage === "paid" && (
        <div className="mt-10 space-y-4 ll-animate">
          <div className="rounded-2xl p-5 flex items-start gap-3" style={{ backgroundColor: "rgba(30,10,69,0.05)" }}>
            <CheckIcon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#7C3AED" } as React.CSSProperties}/>
            <div className="text-sm">
              <div className="font-medium">Pago recibido (simulado)</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(30,10,69,0.6)" }}>En producción esto se valida con el webhook de MercadoPago / Stripe.</div>
            </div>
          </div>
          <button onClick={handleConfirm} className="w-full py-4 rounded-full inline-flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
            <MessageCircleIcon className="w-4 h-4"/> Confirmar y notificar al equipo
          </button>
          <p className="text-xs text-center max-w-sm mx-auto" style={{ color: "rgba(30,10,69,0.5)" }}>Se abrirá WhatsApp (para el salón) y tu cliente de correo (para el administrador).</p>
        </div>
      )}
    </div>
  );
}

function BookingFlow({ user, onDone, onCancel }: { user: { name?: string; email?: string } | null; onDone: () => void; onCancel: () => void }) {
  const STEPS = [{ id: "pet", label: "Mascota" }, { id: "breed", label: "Raza y tamaño" }, { id: "services", label: "Servicios" }, { id: "summary", label: "Resumen" }];
  const [stepIdx, setStepIdx] = useState(0);
  const [booking, setBooking] = useState<Booking>({ petType: null, petName: "", breed: "", sizeId: null, selectedServiceIds: [], slot: null, notes: "", paymentMethod: null });
  const total = calculateTotal(booking.petType, booking.sizeId, booking.selectedServiceIds);
  const duration = totalDuration(booking.petType, booking.selectedServiceIds);
  function patch(u: Partial<Booking>) { setBooking(b => ({ ...b, ...u })); }
  function back() { if (stepIdx === 0) onCancel(); else setStepIdx(i => i - 1); }
  const canAdvance = stepIdx === 0 ? !!booking.petType && !!booking.petName.trim()
    : stepIdx === 1 ? !!booking.breed && !!booking.sizeId
    : stepIdx === 2 ? booking.selectedServiceIds.length > 0 : true;
  const isLast = stepIdx === STEPS.length - 1;
  return (
    <main className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12 pb-32">
      <div className="flex items-center gap-2 mb-8">
        <button onClick={back} className="p-2 -ml-2 rounded-full transition-colors" onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(30,10,69,0.05)")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}>
          <ArrowLeftIcon className="w-5 h-5"/>
        </button>
        <button onClick={onCancel} className="ml-auto p-2 -mr-2 rounded-full transition-colors" onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(30,10,69,0.05)")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}>
          <XIcon className="w-5 h-5"/>
        </button>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        {STEPS.map((s, i) => <div key={s.id} className="h-1 flex-1 rounded-full transition-colors duration-500" style={{ backgroundColor: i <= stepIdx ? "#1E0A45" : "rgba(30,10,69,0.15)" }}/>)}
      </div>
      <div className="text-xs uppercase mb-10" style={{ letterSpacing: "0.25em", color: "#7B6BAD" }}>Paso {stepIdx + 1} de {STEPS.length} · {STEPS[stepIdx].label}</div>
      <div className="ll-animate" key={stepIdx}>
        {stepIdx === 0 && <PetTypeStep booking={booking} patch={patch}/>}
        {stepIdx === 1 && <BreedSizeStep booking={booking} patch={patch}/>}
        {stepIdx === 2 && <ServicesStep booking={booking} patch={patch}/>}
        {stepIdx === 3 && <SummaryStep booking={booking} patch={patch} user={user} onConfirmed={onDone}/>}
      </div>
      {!isLast && (
        <div className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md" style={{ backgroundColor: "rgba(237,232,255,0.95)", borderTop: "1px solid rgba(30,10,69,0.1)" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase" style={{ letterSpacing: "0.1em", color: "rgba(30,10,69,0.55)" }}>Total estimado{duration > 0 ? ` · ~${duration} min` : ""}</div>
              <div className="ll-display text-2xl">{formatMXN(total)}</div>
            </div>
            <button disabled={!canAdvance} onClick={() => setStepIdx(i => i + 1)}
              className="px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors"
              style={{ backgroundColor: "#1E0A45", color: "#EDE8FF", opacity: canAdvance ? 1 : 0.3, cursor: canAdvance ? "pointer" : "not-allowed" }}
              onMouseEnter={e => canAdvance && (e.currentTarget.style.backgroundColor = "#7C3AED")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
              Siguiente <ArrowRightIcon className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function ReviewSubmit({ user, onDone }: { user: { name?: string } | null; onDone: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [petName, setPetName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    const isFive = rating === 5;
    return (
      <main className="max-w-2xl mx-auto px-5 md:px-8 py-20 text-center ll-animate">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}><CheckIcon className="w-10 h-10" strokeWidth={2.4}/></div>
        <h2 className="ll-display text-4xl tracking-tight mb-4">¡Gracias por tu opinión!</h2>
        <p className="mb-10 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(30,10,69,0.65)" }}>
          {isFive ? "Tu reseña aparecerá pronto en nuestro muro público una vez verificada." : "Tus comentarios llegan directamente al equipo para mejorar. Lo apreciamos enormemente."}
        </p>
        <button onClick={onDone} className="px-7 py-3.5 rounded-full transition-colors" style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7C3AED")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
          Volver al inicio
        </button>
      </main>
    );
  }
  return (
    <main className="max-w-2xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="text-xs uppercase mb-3" style={{ letterSpacing: "0.25em", color: "#7B6BAD" }}>Tu opinión</div>
      <h2 className="ll-display text-4xl md:text-5xl tracking-tight mb-4">¿Cómo estuvo tu visita?</h2>
      <p className="mb-12 leading-relaxed" style={{ color: "rgba(30,10,69,0.65)" }}>Las reseñas de 5 estrellas se muestran en nuestro muro público. Las demás llegan privadas al equipo.</p>
      <div className="mb-10">
        <label className="block text-xs uppercase mb-4" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Calificación</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n => (
            <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} className="p-1">
              <StarIcon className={`w-10 h-10 transition-all ${n <= (hover || rating) ? "scale-110" : ""}`}
                style={{ fill: n <= (hover || rating) ? "#7C3AED" : "transparent", color: n <= (hover || rating) ? "#7C3AED" : "rgba(30,10,69,0.2)" } as React.CSSProperties}/>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Nombre de tu mascota</label>
        <input value={petName} onChange={e => setPetName(e.target.value)} placeholder="Ej. Bruno, French Bulldog"
          className="w-full rounded-2xl px-5 py-4 focus:outline-none" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}
          onFocus={e => (e.target.style.borderColor = "#1E0A45")} onBlur={e => (e.target.style.borderColor = "rgba(30,10,69,0.1)")}/>
      </div>
      <div className="mb-10">
        <label className="block text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "#7B6BAD" }}>Comentario</label>
        <textarea rows={5} value={text} onChange={e => setText(e.target.value)} placeholder="Cuéntanos cómo fue la experiencia..."
          className="w-full rounded-2xl px-5 py-4 focus:outline-none resize-none" style={{ backgroundColor: "#F7F4FF", border: "1px solid rgba(30,10,69,0.1)" }}
          onFocus={e => (e.target.style.borderColor = "#1E0A45")} onBlur={e => (e.target.style.borderColor = "rgba(30,10,69,0.1)")}/>
      </div>
      <button onClick={() => setSubmitted(true)} disabled={!rating || !text.trim()}
        className="px-7 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
        style={{ backgroundColor: "#1E0A45", color: "#EDE8FF", opacity: (!rating || !text.trim()) ? 0.3 : 1, cursor: (!rating || !text.trim()) ? "not-allowed" : "pointer" }}
        onMouseEnter={e => (rating && text.trim()) && (e.currentTarget.style.backgroundColor = "#7C3AED")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1E0A45")}>
        Enviar reseña
      </button>
    </main>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1E0A45", color: "#EDE8FF" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="ll-display text-4xl tracking-tight mb-3">{company.name}</div>
          <div className="text-sm mb-6" style={{ color: "rgba(237,232,255,0.6)" }}>{company.tagline}</div>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(237,232,255,0.7)" }}>{company.description}</p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <div className="text-xs uppercase mb-4" style={{ letterSpacing: "0.1em", color: "rgba(237,232,255,0.5)" }}>Visítanos</div>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(237,232,255,0.85)" }}>
            <li className="flex items-start gap-2"><MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#7C3AED" } as React.CSSProperties}/><span>{company.address}</span></li>
            {company.hours.map(h => <li key={h.day} className="flex justify-between gap-2"><span>{h.day}</span><span style={{ color: "rgba(237,232,255,0.55)" }}>{h.time}</span></li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase mb-4" style={{ letterSpacing: "0.1em", color: "rgba(237,232,255,0.5)" }}>Contacto</div>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(237,232,255,0.85)" }}>
            <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 shrink-0" style={{ color: "#7C3AED" } as React.CSSProperties}/><span>{company.phone}</span></li>
            <li className="flex items-center gap-2"><MailIcon className="w-4 h-4 shrink-0" style={{ color: "#7C3AED" } as React.CSSProperties}/><span>{company.email}</span></li>
            <li className="flex items-center gap-2"><InstagramIcon className="w-4 h-4 shrink-0" style={{ color: "#7C3AED" } as React.CSSProperties}/><span>{company.social.instagram}</span></li>
            <li className="flex items-center gap-2"><FacebookIcon className="w-4 h-4 shrink-0" style={{ color: "#7C3AED" } as React.CSSProperties}/><span>{company.social.facebook}</span></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(237,232,255,0.1)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-wrap justify-between gap-3 text-xs" style={{ color: "rgba(237,232,255,0.5)" }}>
          <span>© {new Date().getFullYear()} {company.name}. Hecho con cariño.</span>
          <span>Estética &amp; cuidado profesional</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Shared page shell ────────────────────────────────────────────────────────

const PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@300;400;500;600;700&display=swap');
  .ll-display { font-family: 'Fraunces', serif; font-variation-settings: 'opsz' 144, 'SOFT' 50; letter-spacing: -0.01em; }
  @keyframes ll-fade-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .ll-animate { animation: ll-fade-up 0.55s ease-out both; }
  ::selection { background:#7C3AED; color:#F7F4FF; }
  ::-webkit-scrollbar { width:10px; height:10px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(30,10,69,0.18); border-radius:999px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(30,10,69,0.32); }
`;

function PageShell({ view, onBook, onHome, onLeaveReview, user, onDone, onCancel }: {
  view: "home" | "booking" | "review";
  onBook: () => void;
  onHome: () => void;
  onLeaveReview: () => void;
  user: { name?: string; email?: string } | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EDE8FF", color: "#1E0A45", fontFamily: "'Manrope', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
        <Header onBook={onBook} onHome={onHome} />
        <div className="flex-1">
          {view === "home"    && <HomePage onBook={onBook} onLeaveReview={onLeaveReview}/>}
          {view === "booking" && <BookingFlow user={user} onDone={onDone} onCancel={onCancel}/>}
          {view === "review"  && <ReviewSubmit user={user} onDone={onDone}/>}
        </div>
        {view === "home" && <Footer/>}
      </div>
    </>
  );
}

// ─── Demo page (sin Clerk) ────────────────────────────────────────────────────

function VitelasPageDemo() {
  const [view, setView] = useState<"home" | "booking" | "review">("home");
  useEffect(() => { seedDemoBookings(); }, []);
  const demoUser = { name: "Demo", email: "demo@vitelas.mx" };
  return (
    <PageShell
      view={view}
      onBook={() => setView("booking")}
      onHome={() => setView("home")}
      onLeaveReview={() => setView("review")}
      user={demoUser}
      onDone={() => setView("home")}
      onCancel={() => setView("home")}
    />
  );
}

// ─── Main page (con Clerk) ────────────────────────────────────────────────────

function VitelasPageWithClerk() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [view, setView] = useState<"home"|"booking"|"review">("home");

  useEffect(() => { seedDemoBookings(); }, []);

  const currentUser = isSignedIn && clerkUser
    ? { name: clerkUser.firstName || clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] || "Usuario", email: clerkUser.emailAddresses[0]?.emailAddress }
    : null;

  function startBooking() {
    if (!isSignedIn) { openSignIn(); return; }
    setView("booking");
  }
  function goReview() {
    if (!isSignedIn) { openSignIn(); return; }
    setView("review");
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl" style={{ backgroundColor: "#EDE8FF", color: "#7B6BAD", fontFamily: "'Fraunces', serif" }}>
        Cargando Vitelas...
      </div>
    );
  }

  return (
    <PageShell
      view={view}
      onBook={startBooking}
      onHome={() => setView("home")}
      onLeaveReview={goReview}
      user={currentUser}
      onDone={() => setView("home")}
      onCancel={() => setView("home")}
    />
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export default DEMO_MODE ? VitelasPageDemo : VitelasPageWithClerk;
