export const MANIFEST_SCHEMA_VERSION = '1.0.0'

export const WORKFLOW = {
  changes: ['Propuesto', 'Aprobado', 'Implementado'],
  suggestions: ['Propuesta', 'En revision', 'Descartada', 'Implementada'],
}

export const VIEWPORTS = [
  { key: 'desktop', width: 1440, height: 2200 },
  { key: 'tablet', width: 834, height: 2200 },
  { key: 'mobile', width: 390, height: 2200 },
]

export const ROUTES = [
  {
    route_key: 'home',
    path: '/',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['#inicio'] },
      { section_key: 'logos_band', selectors: ['[aria-label="Industrias que servimos"]'] },
      { section_key: 'problema', selectors: ['#problema'] },
      { section_key: 'soluciones', selectors: ['#soluciones'] },
      { section_key: 'proceso', selectors: ['#proceso'] },
      { section_key: 'resultados', selectors: ['#resultados'] },
      { section_key: 'marketing', selectors: ['#marketing'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'problema',
    path: '/problema',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'problem_stat', selectors: ['main > section:nth-of-type(2)'] },
      { section_key: 'problem_cards', selectors: ['main > section:nth-of-type(3)'] },
      { section_key: 'problem_cta', selectors: ['main > section:nth-of-type(4)'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'soluciones',
    path: '/soluciones',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'pilares_cards', selectors: ['main > section:nth-of-type(2)'] },
      { section_key: 'soluciones_cta', selectors: ['main > section:nth-of-type(3)'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'proceso',
    path: '/proceso',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'steps', selectors: ['main > section:nth-of-type(2)'] },
      { section_key: 'proceso_cta', selectors: ['main > section:nth-of-type(3)'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'marketing',
    path: '/marketing',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'services', selectors: ['main > section:nth-of-type(2)'] },
      { section_key: 'marketing_cta', selectors: ['main > section:nth-of-type(3)'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'contacto',
    path: '/contacto',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'sofia_cta', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'contacto_form', selectors: ['main > section:nth-of-type(2)', '#contacto'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
  {
    route_key: 'resultados',
    path: '/resultados',
    sections: [
      { section_key: 'nav', selectors: ['nav'] },
      { section_key: 'hero', selectors: ['main > section:nth-of-type(1)'] },
      { section_key: 'metricas', selectors: ['main > section:nth-of-type(2)'] },
      { section_key: 'pilares', selectors: ['main > section:nth-of-type(3)'] },
      { section_key: 'resultados_cta', selectors: ['main > section:nth-of-type(4)'] },
      { section_key: 'footer', selectors: ['footer[aria-label="Pie de página"]', 'footer'] },
      { section_key: 'wa_fab', selectors: ['a[aria-label="Contactar por WhatsApp"]'] },
    ],
  },
]
