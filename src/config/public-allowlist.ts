export const SITE_ORIGIN = "https://www.scalvia.mx";

export type PublicRoute = {
  path: string;
  label: string;
  kind: "corporate" | "legal" | "microsite";
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export type PublicApi = {
  path: string;
  methods: string[];
  purpose: string;
  requiredBy: string[];
  migrationNote?: string;
};

export type HiddenRoute = {
  path: string;
  reason: string;
  handling: "404" | "noindex" | "not_in_sitemap" | "legacy_reference_only";
};

export const publicRoutes = [
  { path: "/", label: "Scalvia home", kind: "corporate", changeFrequency: "weekly", priority: 1 },
  { path: "/problema", label: "El problema", kind: "corporate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/soluciones", label: "Soluciones", kind: "corporate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/proceso", label: "Proceso", kind: "corporate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/marketing", label: "Marketing", kind: "corporate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resultados", label: "Resultados", kind: "corporate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacto", label: "Contacto", kind: "corporate", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacidad", label: "Politica de Privacidad", kind: "legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terminos", label: "Terminos y Condiciones", kind: "legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", label: "Politica de Cookies", kind: "legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/vitelas", label: "Vitelas", kind: "microsite", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rotunno-interiores", label: "Rotunno Interiores", kind: "microsite", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nutricionpamcastro", label: "Nutricion Pam Castro", kind: "microsite", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nutricionpamcastro/tienda", label: "Nutricion Pam Castro tienda", kind: "microsite", changeFrequency: "monthly", priority: 0.6 },
  { path: "/nutricionpamcastro/carrito", label: "Nutricion Pam Castro carrito", kind: "microsite", changeFrequency: "monthly", priority: 0.4 },
  { path: "/nutricionpamcastro/consultas", label: "Nutricion Pam Castro consultas", kind: "microsite", changeFrequency: "monthly", priority: 0.6 },
  { path: "/nutricionpamcastro/mi-historia", label: "Nutricion Pam Castro mi historia", kind: "microsite", changeFrequency: "monthly", priority: 0.5 },
  { path: "/nutricionpamcastro/testimonios", label: "Nutricion Pam Castro testimonios", kind: "microsite", changeFrequency: "monthly", priority: 0.5 },
  { path: "/nutricionpamcastro/mi-canal", label: "Nutricion Pam Castro mi canal", kind: "microsite", changeFrequency: "monthly", priority: 0.5 },
  { path: "/nutricionpamcastro/aviso-de-privacidad", label: "Nutricion Pam Castro aviso de privacidad", kind: "legal", changeFrequency: "yearly", priority: 0.3 },
] satisfies PublicRoute[];

export const publicApis = [
  {
    path: "/api/contact/challenge",
    methods: ["GET"],
    purpose: "Issue anti-abuse challenge data for the Scalvia contact form.",
    requiredBy: ["Scalvia contact form"],
  },
  {
    path: "/api/contact",
    methods: ["POST"],
    purpose: "Submit Scalvia contact leads with Turnstile and email handling.",
    requiredBy: ["Scalvia contact form"],
  },
  {
    path: "/api/lalanuda/availability",
    methods: ["GET"],
    purpose: "Return appointment availability currently consumed by Vitelas.",
    requiredBy: ["Vitelas booking flow"],
    migrationNote: "Rename to /api/vitelas/availability in a later compatibility phase.",
  },
  {
    path: "/api/lalanuda/notify",
    methods: ["POST"],
    purpose: "Create Vitelas booking notifications and integration records.",
    requiredBy: ["Vitelas booking flow"],
    migrationNote: "Rename to /api/vitelas/notify in a later compatibility phase.",
  },
] satisfies PublicApi[];

export const publicDomains = [
  "https://scalvia.mx",
  "https://www.scalvia.mx",
  "https://ops.scalvia.mx",
  "https://chat.scalvia.mx",
  "https://nutriologapamcastro.com",
  "https://challenges.cloudflare.com",
  "https://calendar.google.com",
] as const;

export const hiddenRoutes = [
  {
    path: "/lalanuda",
    reason: "Legacy client landing; current public requirement is to keep it hidden/404.",
    handling: "404",
  },
  {
    path: "/otunno-interiores",
    reason: "Misspelled legacy Rotunno route; canonical route is /rotunno-interiores.",
    handling: "404",
  },
  {
    path: "/api/lalanuda/debug",
    reason: "Debug endpoint can exercise Notion and Calendar integrations.",
    handling: "noindex",
  },
  {
    path: "/[cliente]",
    reason: "Dynamic client route must expose only slugs present in src/clientes/manifest.ts.",
    handling: "not_in_sitemap",
  },
  {
    path: "bot.scalvia.mx",
    reason: "Legacy Typebot host did not resolve during the prior audit.",
    handling: "legacy_reference_only",
  },
  {
    path: "scalvia-landing-demo.vercel.app",
    reason: "Legacy Vercel preview returned DEPLOYMENT_NOT_FOUND during the prior audit.",
    handling: "legacy_reference_only",
  },
] satisfies HiddenRoute[];

export function absoluteUrl(path: string) {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}
