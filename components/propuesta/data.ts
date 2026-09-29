// Valores tomados del presupuesto enviado el 12/05/2026 (ARS).
export const PRECIOS = {
  base: 175_000,
  seccion: 35_000,
  funcionalidad: 35_000,
  pagina: 75_000,
};

// Firma de quien presenta la propuesta.
export const ESTUDIO = {
  nombre: 'Boris Waisten',
  rol: 'Desarrollo web & motion design',
};

export type Plan = {
  id: string;
  nombre: string;
  bajada: string;
  precio: number;
  destacado?: boolean;
  incluye: string[];
  noIncluye?: string[];
};

export const PLANES: Plan[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    bajada: 'Lo que cotizamos. Una landing prolija y con identidad.',
    precio: PRECIOS.base,
    incluye: [
      '5 secciones: Inicio, Nosotros, Productos, Galería y Contacto',
      'Diseño con la identidad de Al Galope (petróleo, plateado, guarda pampa)',
      'Solo en español',
      'Contacto por WhatsApp, Instagram y mail',
      'Transiciones simples',
    ],
    noIncluye: ['Versión en inglés', 'Slider de fotos', 'Animaciones de marca'],
  },
  {
    id: 'animada',
    nombre: 'Animada',
    bajada: 'La que se siente premium. Pensada para el mercado de exportación.',
    precio: PRECIOS.base + PRECIOS.funcionalidad * 3,
    destacado: true,
    incluye: [
      'Todo lo de Esencial',
      'Español + inglés con selector de banderas 🇦🇷 🇺🇸',
      'Galería/slider con las fotos de producto',
      'Animaciones profesionales al hacer scroll',
    ],
    noIncluye: ['Efectos avanzados de marca'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    bajada: 'Una experiencia de marca. Como esta página que estás viendo.',
    precio: PRECIOS.base + PRECIOS.funcionalidad * 4,
    incluye: [
      'Todo lo de Animada',
      'Efectos avanzados: caballos al galope, guarda que se dibuja, parallax',
      'Microinteracciones en productos (hover 3D, detalles)',
      'Ritmo y coreografía de animaciones pensados para la marca',
    ],
  },
];

export type Extra = {
  id: string;
  nombre: string;
  detalle: string;
  precio: number;
  cantidad?: boolean;
};

export const EXTRAS: Extra[] = [
  { id: 'idioma', nombre: 'Versión en inglés', detalle: 'Selector con banderas y todo el contenido traducido.', precio: PRECIOS.funcionalidad },
  { id: 'slider', nombre: 'Galería / slider', detalle: 'Carrusel con las fotos de producto y del campo.', precio: PRECIOS.funcionalidad },
  { id: 'animaciones', nombre: 'Animaciones profesionales', detalle: 'Entradas al hacer scroll, textos que se revelan y transiciones suaves.', precio: PRECIOS.funcionalidad },
  { id: 'efectos', nombre: 'Efectos avanzados de marca', detalle: 'Caballos al galope, guarda que se dibuja, parallax y hover 3D.', precio: PRECIOS.funcionalidad },
  { id: 'formulario', nombre: 'Formulario de contacto', detalle: 'Las consultas llegan directo a tu mail.', precio: PRECIOS.funcionalidad },
  { id: 'seccion', nombre: 'Sección extra', detalle: 'Por ejemplo: Certificaciones o Distribuidores.', precio: PRECIOS.seccion, cantidad: true },
  { id: 'pagina', nombre: 'Página de producto', detalle: 'Una página propia por producto, con ficha completa.', precio: PRECIOS.pagina, cantidad: true },
];

export const PEDIDOS = [
  { texto: 'Logo de Al Galope en el encabezado', entra: true },
  { texto: 'Colores petróleo y plateado + guarda pampa', entra: true },
  { texto: 'Caballos de la caja como elemento visual', entra: true },
  { texto: 'Menú: Inicio, Nosotros, Productos, Contacto', entra: true },
  { texto: 'Textos de Inicio y Nosotros', entra: true },
  { texto: 'Productos: yerba, mates y peluches', entra: true },
  { texto: 'Español e inglés con banderas', entra: false },
  { texto: 'Galería con muchas fotos', entra: false },
  { texto: 'Estilo animado como la referencia', entra: false },
  { texto: 'Tienda online', entra: false },
];

export const PENDIENTES = [
  'Logo en alta calidad (SVG, AI o PDF)',
  'Qué quiere decir "Tienda": ¿vender online o derivar a WhatsApp?',
  'Texto en español de los peluches y de los mates',
  'Aclarar los tamaños del peluche (¿20 cm y 16 cm?)',
  'Qué fotos van en cada sección',
  'Dominio y hosting: ¿ya tenés? ¿quién los contrata?',
];
