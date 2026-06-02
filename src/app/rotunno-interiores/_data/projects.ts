export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  cover: string;
  images: string[];
  materials: string[];
};

const tvWalnut =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85";
const kitchenWarm =
  "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1400&q=85";
const closetWarm =
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85";
const bathroomWarm =
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=85";
const commercialWood =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85";
const kitchenContrast =
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85";
const kitchenRender =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85";
const lightWood =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85";
const darkWood =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85";

export const projects: Project[] = [
  {
    id: "centro-tv-nogal-led",
    title: "Centro de TV en Nogal",
    category: "TV Centers",
    location: "Recamara",
    description:
      "Mueble de TV para recamara con veta nogal, repisas laterales, cajoneras inferiores e iluminacion LED calida para dar profundidad al muro.",
    cover: tvWalnut,
    images: [tvWalnut, darkWood, lightWood],
    materials: ["Nogal", "LED calido", "Jaladeras negras"]
  },
  {
    id: "tv-center-madera-clara",
    title: "TV Center Madera Clara",
    category: "TV Centers",
    location: "Recamara principal",
    description:
      "Panel de TV en madera clara con nicho iluminado, almacenamiento inferior y lineas limpias para una recamara sobria y funcional.",
    cover: lightWood,
    images: [lightWood, tvWalnut],
    materials: ["Madera clara", "Luz indirecta", "Panel a medida"]
  },
  {
    id: "cocina-blanco-madera",
    title: "Cocina Blanco y Madera",
    category: "Cocinas",
    location: "Residencial",
    description:
      "Cocina terminada con superiores blancos, textura de madera en la parte baja, cubierta clara y herrajes pensados para uso diario.",
    cover: kitchenWarm,
    images: [kitchenWarm, kitchenContrast, kitchenRender],
    materials: ["Blanco mate", "Madera natural", "Cubierta clara"]
  },
  {
    id: "cocina-contraste-marmol",
    title: "Cocina de Alto Contraste",
    category: "Cocinas",
    location: "Monterrey, N.L.",
    description:
      "Cocina con gabinetes superiores oscuros, base de madera, cubierta y respaldo tipo marmol para equilibrar tonos frios con calidez natural.",
    cover: kitchenContrast,
    images: [kitchenContrast, kitchenWarm],
    materials: ["Negro brillante", "Madera natural", "Marmol claro"]
  },
  {
    id: "remodelacion-cocina-oscura",
    title: "Remodelacion de Cocina",
    category: "Cocinas",
    location: "Residencial",
    description:
      "Proyecto de remodelacion con madera oscura, barra con cubierta negra, alacenas funcionales y una solucion integral para renovar el espacio.",
    cover: darkWood,
    images: [darkWood, kitchenContrast],
    materials: ["Madera oscura", "Cubierta negra", "Almacenamiento"]
  },
  {
    id: "vestidor-peninsula",
    title: "Vestidor Proyecto Peninsula",
    category: "Vestidores y closets",
    location: "Recamara principal",
    description:
      "Vestidor principal en tono chardonnay con tiras LED calidas, zapatera iluminada, espejos ahumados y puerta de vidrio oscuro.",
    cover: closetWarm,
    images: [closetWarm, lightWood],
    materials: ["Chardonnay", "LED calido", "Vidrio oscuro"]
  },
  {
    id: "vestidor-nogal",
    title: "Vestidor en Nogal",
    category: "Vestidores y closets",
    location: "Monterrey, N.L.",
    description:
      "Vestidor funcional con veta continua, cajoneras, repisas y luz calida para resaltar textura sin perder orden visual.",
    cover: darkWood,
    images: [darkWood, closetWarm],
    materials: ["Nogal", "Cajoneras", "Luz interior"]
  },
  {
    id: "closet-led-madera-clara",
    title: "Closet con Repisas LED",
    category: "Vestidores y closets",
    location: "Residencial",
    description:
      "Closet abierto en madera clara con repisas iluminadas, sistema de apertura discreto y una estetica minimalista para uso diario.",
    cover: lightWood,
    images: [lightWood, closetWarm],
    materials: ["Madera clara", "Repisas LED", "Apertura discreta"]
  },
  {
    id: "vanity-bano-cajones",
    title: "Vanity de Bano Flotante",
    category: "Banos",
    location: "Residencial",
    description:
      "Mueble de bano con cajones flotantes, tono madera claro, cubierta continua y solucion de guardado que mantiene el espacio limpio.",
    cover: bathroomWarm,
    images: [bathroomWarm, lightWood],
    materials: ["Madera clara", "Cajones flotantes", "Cubierta continua"]
  },
  {
    id: "biblioteca-infantil-modular",
    title: "Biblioteca Infantil Modular",
    category: "Comercial e institucional",
    location: "San Pedro Garza Garcia",
    description:
      "Estanteria modular para espacio infantil con geometria tipo panal, mesas a medida y madera clara para un ambiente calido y activo.",
    cover: commercialWood,
    images: [commercialWood, lightWood],
    materials: ["Madera clara", "Modulos panal", "Mobiliario infantil"]
  },
  {
    id: "cocina-conceptual-encino",
    title: "Cocina Conceptual Encino",
    category: "Diseno conceptual",
    location: "Propuesta residencial",
    description:
      "Diseno de cocina con blanco mate, encino, acentos negros e iluminacion lineal. Referencia conceptual para definir materiales y distribucion.",
    cover: kitchenRender,
    images: [kitchenRender, kitchenWarm],
    materials: ["Encino", "Blanco mate", "Acentos negros"]
  }
];

export const categories = [
  "Cocinas",
  "TV Centers",
  "Vestidores y closets",
  "Banos",
  "Comercial e institucional",
  "Diseno conceptual"
] as const;
