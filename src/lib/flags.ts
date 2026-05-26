import { flag } from "flags/next";

/**
 * DEMO_MODE=true  → integraciones reales desactivadas (Resend, Google Calendar, Notion)
 *                   útil para demos estéticas con clientes sin disparar emails/eventos
 * DEMO_MODE=false → producción normal, todas las integraciones activas
 *
 * Setear en Vercel: Settings > Environment Variables > DEMO_MODE
 */
export const demoMode = flag<boolean>({
  key: "demo-mode",
  defaultValue: false,
  decide() {
    return process.env.DEMO_MODE === "true";
  },
});
