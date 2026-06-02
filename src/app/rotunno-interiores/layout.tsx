import type { Metadata } from "next";
import "./rotunno.css";

export const metadata: Metadata = {
  title: "Rotunno Interiores | Carpinteria y mobiliario a medida",
  description:
    "Cocinas, closets, TV centers y carpinteria personalizada en Monterrey con madera, luz LED y mobiliario a medida.",
  openGraph: {
    title: "Rotunno Interiores",
    description:
      "Portafolio de cocinas, closets, TV centers y carpinteria personalizada en Monterrey.",
    type: "website",
    locale: "es_MX",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RotunnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
