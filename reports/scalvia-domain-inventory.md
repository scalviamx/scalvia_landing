# Inventario de dominios y rutas públicas de Scalvia

Fecha de auditoría: 2026-08-01
Alcance: revisión local read-only del repositorio `scalvia_landing` más checks HTTP ligeros `HEAD`/GET sin modificar código, DNS, infraestructura ni deployments.

## Resumen ejecutivo

- Dominios raíz relacionados encontrados: 5 (`scalvia.mx`, `scalvia.com`, `lalanuda.mx`, `vitelas.mx`, `nutriologapamcastro.com`).
- Subdominios encontrados: 3 (`www.scalvia.mx`, `info.scalvia.mx`, `bot.scalvia.mx`).
- Deployments/previews referenciados: 1 (`scalvia-landing-demo.vercel.app`).
- Rutas públicas/app routes encontradas en el código actual: 26.
- Aplicaciones/micrositios encontrados: 6 (`Scalvia corporativo`, `Vitelas`, `Nutricion Pam Castro`, `Rotunno Interiores`, `La Lanuda legado`, `Typebot Scalvia legado`).
- Referencias rotas o inconsistentes principales:
  - `https://www.scalvia.mx/lalanuda` devuelve 404, pero documentación histórica sigue apuntando a `scalvia.mx/lalanuda`.
  - Los endpoints actuales `/api/lalanuda/*` son usados por `/vitelas`, y `notify` mezcla marca Vitelas con destinatarios `hola@lalanuda.mx`.
  - `https://bot.scalvia.mx` no resolvió DNS durante la auditoría.
  - `https://scalvia-landing-demo.vercel.app` devolvió `DEPLOYMENT_NOT_FOUND`.
  - `scalvia.com` aparece en identidad visual, pero la metadata productiva usa `https://scalvia.mx`.
  - No se encontraron `robots.txt` ni `sitemap.xml` en `public/` ni rutas dedicadas.

## Inventario

| URL | Tipo | Dónde fue encontrada | Estado | Plataforma | Recomendación |
|---|---|---|---|---|---|
| `https://scalvia.mx` | dominio | `src/app/layout.tsx:21`, `src/app/privacidad/page.tsx:111`, `src/app/terminos/page.tsx:20`, `src/app/cookies/page.tsx:20` | activo; HTTP 307 a `https://www.scalvia.mx/` | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx` | subdominio | derivado de redirect HTTP desde `scalvia.mx`; `src/lib/contactSecurity.ts:180-183` contempla variante `www` | activo; HTTP 200 | Vercel + Cloudflare | mantener |
| `info.scalvia.mx` | subdominio/email sender | `src/app/api/contact/route.ts:92`, `src/app/api/lalanuda/notify/route.ts:265`, `docs/superpowers/plans/2026-05-24-lalanuda-booking-notifications.md:422` | desconocido como web; usado para email | Resend/DNS desconocido | revisar SPF/DKIM/DMARC y mantener si está verificado |
| `https://bot.scalvia.mx` | subdominio/app legacy | `index.html:1649-1657` dentro de bloque Typebot desactivado | roto; DNS no resuelve | Typebot/Cloudflare desconocido | ocultar o eliminar referencia si ya no existe |
| `scalvia.com` | dominio legacy/branding | `scalvia_brand_identity.html:312` | desconocido; no aparece como dominio productivo de Next | desconocida | revisar propiedad; si no se usa, marcar legado |
| `https://scalvia-landing-demo.vercel.app` | deployment preview | `docs/superpowers/plans/2026-05-23-client-landings-infrastructure.md:231` | legado; HTTP 404 `DEPLOYMENT_NOT_FOUND` | Vercel | ocultar o remover de documentación |
| `https://www.scalvia.mx/` | ruta | `src/app/page.tsx` | activo; HTTP 200 | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/problema` | ruta | `src/app/problema/page.tsx:1`, `src/components/sections/Nav.tsx:20` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/soluciones` | ruta | `src/app/soluciones/page.tsx:1`, `src/components/sections/Nav.tsx:21` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/proceso` | ruta | `src/app/proceso/page.tsx:1`, `src/components/sections/Nav.tsx:22` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/marketing` | ruta | `src/app/marketing/page.tsx:1`, `src/components/sections/Nav.tsx:23` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/resultados` | ruta | `src/app/resultados/page.tsx:1`, `src/components/sections/Nav.tsx:24` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/contacto` | ruta | `src/app/contacto/page.tsx:1`, `src/components/sections/Nav.tsx:89-94`, `src/components/sections/Nav.tsx:145-151` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/privacidad` | ruta legal | `src/app/privacidad/page.tsx:1`, `src/components/sections/Footer.tsx:15` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/terminos` | ruta legal | `src/app/terminos/page.tsx:1`, `src/components/sections/Footer.tsx:16` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/cookies` | ruta legal | `src/app/cookies/page.tsx:1`, `src/components/sections/Footer.tsx:17` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/vitelas` | micrositio/app | `src/app/vitelas/page.tsx:1`, `src/app/vitelas/layout.tsx:1`, `src/middleware.ts:10` | activo; HTTP 200 | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/rotunno-interiores` | micrositio/app | `src/app/rotunno-interiores/page.tsx:1`, `src/app/rotunno-interiores/layout.tsx:1`, `docs/superpowers/specs/2026-06-02-rotunno-interiores-integration-design.md:4` | activo; HTTP 200 | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/otunno-interiores` | ruta legacy eliminada | `docs/superpowers/specs/2026-06-02-rotunno-interiores-integration-design.md:87`, `docs/superpowers/plans/2026-06-02-rotunno-interiores-integration.md:512` | legado; documentada como 404 esperada | Vercel + Cloudflare | mantener oculto; no restaurar salvo requerimiento |
| `https://www.scalvia.mx/lalanuda` | micrositio legacy | `src/clientes/lalanuda/index.html`, `src/clientes/manifest.ts:9`, `docs/superpowers/plans/2026-05-23-client-landings-infrastructure.md:5`, `docs/superpowers/plans/2026-05-23-lalanuda-auth-clerk.md:765` | roto/legado; HTTP 404 | Vercel + Cloudflare | revisar; actualizar docs o restaurar ruta si sigue siendo requerida |
| `https://www.scalvia.mx/[cliente]` | ruta dinámica | `src/app/[cliente]/page.tsx:1`, `src/clientes/manifest.ts:8-11` | inactiva/desconocida; manifest vacío | Vercel + Cloudflare | revisar; mantener solo si habrá landings dinámicas |
| `https://www.scalvia.mx/nutricionpamcastro` | micrositio/app | `src/app/nutricionpamcastro/page.tsx:1`, `src/app/nutricionpamcastro/layout.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/tienda` | ruta micrositio | `src/app/nutricionpamcastro/tienda/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/carrito` | ruta micrositio | `src/app/nutricionpamcastro/carrito/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/consultas` | ruta micrositio | `src/app/nutricionpamcastro/consultas/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/mi-historia` | ruta micrositio | `src/app/nutricionpamcastro/mi-historia/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/testimonios` | ruta micrositio | `src/app/nutricionpamcastro/testimonios/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/mi-canal` | ruta micrositio | `src/app/nutricionpamcastro/mi-canal/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/nutricionpamcastro/aviso-de-privacidad` | ruta legal micrositio | `src/app/nutricionpamcastro/aviso-de-privacidad/page.tsx:1` | activo por App Router | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/api/contact/challenge` | API pública GET | `src/app/api/contact/challenge/route.ts:6-11`, `src/components/sections/Contacto.tsx:86-89` | activo por código; no-store | Vercel Serverless | mantener |
| `https://www.scalvia.mx/api/contact` | API pública POST | `src/app/api/contact/route.ts:22`, `src/components/sections/Contacto.tsx:151-156` | activo por código; POST formulario | Vercel Serverless + Resend + Cloudflare Turnstile | mantener |
| `https://www.scalvia.mx/api/lalanuda/availability?date=YYYY-MM-DD` | API pública GET | `src/app/api/lalanuda/availability/route.ts:7-21`, `src/app/vitelas/_components/VitelasPageClient.tsx:539-549` | activo por código; naming inconsistente | Vercel Serverless + Google Calendar | revisar nombre si Vitelas reemplazó La Lanuda |
| `https://www.scalvia.mx/api/lalanuda/notify` | API pública POST | `src/app/api/lalanuda/notify/route.ts:90-275`, `src/app/vitelas/_components/VitelasPageClient.tsx:680-700` | activo por código; naming/marca inconsistente | Vercel Serverless + Resend + Notion + Google Calendar | revisar y renombrar/migrar si procede |
| `https://www.scalvia.mx/api/lalanuda/debug?secret=...` | API debug pública protegida por secreto | `src/app/api/lalanuda/debug/route.ts:7-10`, `docs/superpowers/plans/2026-05-25-lalanuda-notify-fix.md:109` | activo por código; protegido por query secret | Vercel Serverless + Notion + Google Calendar | ocultar de docs públicas; revisar exposición |
| `https://www.scalvia.mx/favicon.png` | asset público | `src/app/layout.tsx:36-37`, `favicon.png` en raíz | activo por asset | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/vitelas_logo.png` | asset público | `public/vitelas_logo.png` | activo por asset | Vercel + Cloudflare | mantener |
| `https://www.scalvia.mx/vitelas_logo_black.png` | asset público | `public/vitelas_logo_black.png`, `src/app/api/lalanuda/notify/route.ts:131` | activo por asset | Vercel + Cloudflare | mantener |
| `https://instagram.com/scalviamx` | URL externa Scalvia | `src/components/sections/Footer.tsx:23`, `index.html:1603`, `index.html:1612` | desconocido | Instagram | mantener si cuenta oficial |
| `https://facebook.com/scalviamx` | URL externa Scalvia | `src/components/sections/Footer.tsx:34`, `index.html:1619` | desconocido | Facebook | mantener si cuenta oficial |
| `https://tiktok.com/@scalviamx` | URL externa Scalvia | `src/components/sections/Footer.tsx:49`, `index.html:1624` | desconocido | TikTok | mantener si cuenta oficial |
| `https://wa.me/528131119893?...` | URL externa Scalvia | `src/components/WaFab.tsx:8`, `index.html:1635-1637` | desconocido | WhatsApp | mantener si número vigente |
| `lalanuda.mx` | dominio/email cliente legacy | `src/clientes/lalanuda/index.html:122`, `src/app/api/lalanuda/notify/route.ts:234`, docs de La Lanuda | legado/inconsistente | email/DNS desconocido | revisar si sigue operando |
| `vitelas.mx` | dominio/email cliente | `src/app/vitelas/_components/VitelasPageClient.tsx:25-26`, `src/app/api/lalanuda/notify/route.ts:213`, `src/app/api/lalanuda/notify/route.ts:267` | activo como identidad/email; web no validada | DNS/email desconocido | mantener; revisar dominio web si existe |
| `https://wa.me/528120367228?...` | URL externa Vitelas | `src/app/vitelas/_components/VitelasPageClient.tsx:24`, `src/app/vitelas/_components/VitelasPageClient.tsx:232` | desconocido | WhatsApp | mantener si número vigente |
| `https://wa.me/528112345678?...` | URL externa Rotunno | `src/app/rotunno-interiores/page.tsx:20` | desconocido; parece placeholder | WhatsApp | revisar antes de publicar/traficar |
| `https://www.instagram.com/rotunnointeriores` | URL externa Rotunno | `src/app/rotunno-interiores/page.tsx:253` | desconocido | Instagram | mantener si cuenta oficial |
| `https://nutriologapamcastro.com` | dominio cliente externo | `src/app/nutricionpamcastro/_lib/shop.ts:24-52`, `src/app/nutricionpamcastro/_lib/shop.ts:109`, `docs/pamcastro/scalvia-cart-handoff.php:4` | activo; HTTP 200 | WordPress/Bluehost | mantener |
| `https://nutriologapamcastro.com/wp-admin/admin-post.php?action=scalvia_cart_handoff...` | webhook/handoff externo | `src/app/nutricionpamcastro/_lib/shop.ts:97-110`, `docs/pamcastro/scalvia-cart-handoff.php:12-15` | activo por integración; no se ejecutó POST/redirect | WordPress/WooCommerce | mantener; revisar firma/validación |
| `https://nutriologapamcastro.com/product/cita-inicial-o-reingreso/` | URL producto externo | `src/app/nutricionpamcastro/_lib/shop.ts:25` | desconocido | WordPress/WooCommerce | mantener |
| `https://nutriologapamcastro.com/product/consulta-inicial-online/` | URL producto externo | `src/app/nutricionpamcastro/_lib/shop.ts:34` | desconocido | WordPress/WooCommerce | mantener |
| `https://nutriologapamcastro.com/product/paquete-3-consultas-seguimiento-online/` | URL producto externo | `src/app/nutricionpamcastro/_lib/shop.ts:43` | desconocido | WordPress/WooCommerce | mantener |
| `https://nutriologapamcastro.com/product/paquete-5-consultas-seguimiento-online/` | URL producto externo | `src/app/nutricionpamcastro/_lib/shop.ts:52` | desconocido | WordPress/WooCommerce | mantener |
| `https://www.instagram.com/nutricionpamcastro/` | URL externa Nutricion Pam Castro | `src/app/nutricionpamcastro/_components/Footer.tsx:68` | desconocido | Instagram | mantener |
| `https://www.facebook.com/nutricionpamcastro/` | URL externa Nutricion Pam Castro | `src/app/nutricionpamcastro/_components/Footer.tsx:78` | desconocido | Facebook | mantener |
| `https://www.tiktok.com/@nutriologapamcastro` | URL externa Nutricion Pam Castro | `src/app/nutricionpamcastro/_components/Footer.tsx:88` | desconocido | TikTok | mantener |
| `https://www.youtube.com/@nutriologapamcastro` | URL externa Nutricion Pam Castro | `src/app/nutricionpamcastro/mi-canal/page.tsx:5` | desconocido | YouTube | mantener |
| `https://www.youtube.com/feeds/videos.xml?channel_id=...` | feed externo | `src/app/nutricionpamcastro/mi-canal/page.tsx:16-17` | desconocido | YouTube | mantener |
| `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit` | script externo seguridad | `src/components/sections/Contacto.tsx:16`, `vercel.json:17` | activo por configuración | Cloudflare Turnstile | mantener |
| `https://challenges.cloudflare.com/turnstile/v0/siteverify` | API externa seguridad | `src/lib/contactSecurity.ts:254` | activo por configuración | Cloudflare Turnstile | mantener |
| `https://calendar.google.com/calendar/render?...` | URL externa calendario | `src/app/api/lalanuda/notify/route.ts:72-88` | activo por construcción de email | Google Calendar | mantener |
| `http://localhost:3000`, `http://localhost:3002`, `http://127.0.0.1:3000`, `http://127.0.0.1:4173`, `http://localhost:3333/callback` | rutas locales/dev | `scripts/design-export/capture.mjs:11`, `scripts/test-api-availability.mjs:26`, `package.json:10`, `scripts/get-google-refresh-token.mjs:12` | desarrollo local | local | mantener fuera de docs públicas |

## Configuración y archivos revisados

- `vercel.json`: headers globales; sin rewrites/redirects configurados.
- `next.config.ts`: remote image domains `img.clerk.com` e `images.unsplash.com`.
- `src/middleware.ts`: matcher limitado a `/vitelas(.*)`.
- `src/app/**/page.tsx`, `src/app/**/layout.tsx`, `src/app/api/**/route.ts`.
- `src/components/sections/Nav.tsx`, `src/components/sections/Footer.tsx`, formularios/contacto.
- `src/clientes/manifest.ts` y `src/clientes/lalanuda/index.html`.
- `docs/superpowers/**`, `docs/pamcastro/**`, `scripts/**`, `index.html`, `index-v2.html`, `scalvia_brand_identity.html`.
- `.env.local` fue inspeccionado solo para dominios visibles; no se copiaron secretos.

## Notas de QA

- No se hicieron commits, push, deployments, migraciones ni cambios de configuración.
- No se ejecutaron endpoints `POST`.
- El endpoint debug `/api/lalanuda/debug` puede crear registros/eventos si se llama con `secret`; no se invocó con secreto.
- La ausencia de `robots.txt` y `sitemap.xml` puede ser intencional, pero debe revisarse si se requiere SEO/indexación controlada.
