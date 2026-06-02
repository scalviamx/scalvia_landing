import { BriefcaseBusiness, Hammer, LampDesk, PanelTop, Ruler, Shirt, type LucideIcon } from "lucide-react";

export type Specialty = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const specialties: Record<string, Specialty> = {
  "Cocinas": {
    title: "Cocinas Personalizadas",
    icon: PanelTop,
    description: "Blanco mate, madera, cubiertas claras, acentos negros y herrajes elegidos para el flujo diario."
  },
  "TV Centers": {
    title: "TV Centers",
    icon: LampDesk,
    description: "Paneles, repisas, cajoneras y nichos iluminados para recamaras y salas con presencia limpia."
  },
  "Vestidores y closets": {
    title: "Vestidores y Closets",
    icon: Shirt,
    description: "Repisas LED, zapateras, cajones y modulos interiores que ordenan sin perder calidez."
  },
  "Banos": {
    title: "Banos y Vanities",
    icon: Ruler,
    description: "Muebles flotantes, cubiertas continuas y guardado discreto para espacios de rutina diaria."
  },
  "Comercial e institucional": {
    title: "Comercial e Institucional",
    icon: BriefcaseBusiness,
    description: "Mobiliario para escuelas, oficinas y espacios de servicio con medidas y uso especifico."
  },
  "Diseno conceptual": {
    title: "Carpinteria Especializada",
    icon: Hammer,
    description: "Puertas, paneles, repisas, detalles tecnicos e iluminacion integrada en piezas a medida."
  }
};

export const specialtyOrder = [
  "Cocinas",
  "TV Centers",
  "Vestidores y closets",
  "Banos",
  "Comercial e institucional",
  "Diseno conceptual"
] as const;
