import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nutrióloga Pam Castro - Nutrición Autoinmune Personalizada",
  description:
    "Especialista en nutrición clínica para condiciones autoinmunes. Harvard Medical School. Consultas online personalizadas.",
  openGraph: {
    title: "Nutrióloga Pam Castro",
    description: "Nutrición autoinmune personalizada. Consultas online.",
    locale: "es_MX",
    type: "website",
  },
};

export default function NutricionPamCastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${lora.variable} ${raleway.variable} min-h-dvh bg-[#FAFAF7] text-[#1C1C1A] antialiased`}
      style={{ fontFamily: "var(--font-raleway), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
