// Textos del sitio en inglés (prioridad) y español, tomados del documento de la clienta,
// la ficha técnica y los comentarios sobre cada mate.

export type Lang = 'en' | 'es';
export type T = Record<Lang, string>;

export const CONTACTO = {
  whatsapp: '5491135241987',
  whatsappLabel: '+54 9 11 3524-1987',
  instagram: 'algalope.argentina',
  email: 'trade@algalopeargentina.com',
  web: 'www.algalopeargentina.com',
  ciudad: { en: 'Buenos Aires, Argentina', es: 'Buenos Aires, Argentina' } as T,
};

// Link de la tienda (MercadoLibre / Tienda Nube). Mientras esté vacío, los botones de compra
// abren WhatsApp con el producto ya escrito.
export const TIENDA_URL = '';

export const UI = {
  marquee: {
    en: ['Naturally aged 18+ months', 'No preservatives', 'Gluten free', 'Low dust content', 'Does not cause acidity'],
    es: ['Estacionamiento natural +18 meses', 'Sin conservantes', 'Sin TACC', 'Bajo contenido de polvo', 'No genera acidez'],
  },
  nav: [
    { id: 'inicio', label: { en: 'Home', es: 'Inicio' } },
    { id: 'nosotros', label: { en: 'About', es: 'Nosotros' } },
    { id: 'productos', label: { en: 'Products', es: 'Productos' } },
    { id: 'tienda', label: { en: 'Shop', es: 'Tienda' } },
    { id: 'contacto', label: { en: 'Contact', es: 'Contacto' } },
  ],
  comprar: { en: 'Buy Al Galope', es: 'Comprar Al Galope' } as T,
  comprarProducto: { en: 'Buy', es: 'Comprar' } as T,
  borrador: { en: 'Draft v1', es: 'Borrador v1' } as T,
};

export const HERO = {
  eyebrow: { en: 'Premium Yerba Mate · Misiones, Argentina', es: 'Yerba mate premium · Misiones, Argentina' } as T,
  lineas: {
    en: ['Tradition, natural aging', '& export-grade quality.'],
    es: ['Tradición, estacionamiento natural', 'y calidad de exportación.'],
  },
  bajada: { en: 'For the most demanding palates.', es: 'Para los paladares más exigentes.' } as T,
  secundario: { en: 'Discover our yerba', es: 'Conocé nuestra yerba' } as T,
};

export const PILARES = [
  {
    icono: 'reloj',
    numero: 18,
    prefijo: '+',
    titulo: { en: 'months of natural aging', es: 'meses de estacionamiento natural' },
    texto: {
      en: 'Rested in heated warehouses until it reaches its full, smooth flavor.',
      es: 'Reposa en depósitos calefaccionados hasta alcanzar su sabor pleno y suave.',
    },
  },
  {
    icono: 'llama',
    titulo: { en: 'Wood-fired, natural drying', es: 'Secado natural a leña' },
    texto: {
      en: 'No added chemicals, flavorings or preservatives. Just the native leaf.',
      es: 'Sin químicos, saborizantes ni conservantes. Solo la hoja nativa.',
    },
  },
  {
    icono: 'hoja',
    titulo: { en: 'Low dust, no acidity', es: 'Bajo polvo, sin acidez' },
    texto: {
      en: 'A balanced grind that is gentle on the digestive system.',
      es: 'Una molienda equilibrada, amable con el sistema digestivo.',
    },
  },
];

export const REELS = {
  eyebrow: { en: 'From Misiones to the world', es: 'De Misiones al mundo' } as T,
  titulo: { en: ['Born where the', 'land meets the falls.'], es: ['Nacida donde la tierra', 'se encuentra con las cataratas.'] },
  texto: {
    en: 'Al Galope comes from Misiones, home of the Iguazú Falls and the native yerba mate leaf. Every mate carries a piece of that land.',
    es: 'Al Galope viene de Misiones, tierra de las Cataratas del Iguazú y de la hoja nativa de yerba mate. Cada mate lleva un pedazo de esa tierra.',
  } as T,
  videos: [
    { src: 'cataratas', label: { en: 'Iguazú Falls', es: 'Cataratas del Iguazú' } },
    { src: 'mate-grabado', label: { en: 'Our signature mate', es: 'Nuestro mate' } },
    { src: 'caja-ingles', label: { en: 'Export edition', es: 'Edición exportación' } },
    { src: 'cataratas-2', label: { en: 'Misiones, Argentina', es: 'Misiones, Argentina' } },
  ],
};

export const HISTORIA = {
  eyebrow: { en: 'Our story', es: 'Nuestra historia' } as T,
  titulo: { en: ['Argentine heritage,', 'a global vision.'], es: ['Herencia argentina,', 'visión global.'] },
  parrafos: {
    en: [
      "Al Galope stems from the fusion of Argentina's productive heritage and a global vision of excellence. As a family-rooted business dedicated to the production and export of yerba mate, we understand that distinction lies in the details.",
      'We combine traditional harvesting methods with rigorous control at every stage of the process—from the native leaf to the final packaging—to deliver a low-acidity product featuring natural aging and a balanced grind. Designed with export-grade quality to transcend borders, Al Galope invites you to discover the true identity of our land in every mate, satisfying the highest standards in the world.',
    ],
    es: [
      'Al Galope surge de la fusión entre la herencia productiva argentina y una visión global de la excelencia. Como empresa familiar dedicada a la producción y exportación de yerba mate, entendemos que la distinción está en los detalles.',
      'Combinamos métodos artesanales de cosecha con un riguroso control en cada etapa del proceso —desde la hoja nativa hasta el empaque final— para ofrecer un producto de baja acidez, estacionamiento natural y molienda equilibrada. Diseñada para trascender fronteras, Al Galope invita a descubrir la verdadera identidad de nuestra tierra en cada mate, satisfaciendo los estándares más altos del mundo.',
    ],
  },
  cita: { en: 'Distinction lies in the details.', es: 'La distinción está en los detalles.' } as T,
  foro: { en: 'Santa Fe Business Forum 2026', es: 'Santa Fe Business Forum 2026' } as T,
  datos: [
    { valor: '100%', label: { en: 'Yerba mate with stems', es: 'Yerba mate con palo' } },
    { valor: '3', label: { en: 'Certifications', es: 'Certificaciones' } },
    { valor: '18+', label: { en: 'Months of aging', es: 'Meses de estacionamiento' } },
  ],
};

export const PROCESO = {
  eyebrow: { en: 'From the native leaf to your mate', es: 'De la hoja nativa a tu mate' } as T,
  titulo: { en: ['Every step,', 'done slowly.'], es: ['Cada paso,', 'sin apuro.'] },
  texto: {
    en: 'The whole process is wood-fired. No shortcuts, no chemicals.',
    es: 'Todo el proceso se hace con fuego a leña. Sin atajos, sin químicos.',
  } as T,
  pasos: [
    {
      titulo: { en: 'Harvest', es: 'Cosecha' },
      texto: { en: 'Traditional harvesting of the native Ilex paraguariensis leaf.', es: 'Cosecha artesanal de la hoja nativa de Ilex paraguariensis.' },
    },
    {
      titulo: { en: 'Zapecado', es: 'Zapecado' },
      texto: { en: "The leaf's first contact with fire seals its natural properties.", es: 'El primer contacto de la hoja con el fuego sella sus propiedades.' },
    },
    {
      titulo: { en: 'Pre-drying', es: 'Presecado' },
      texto: { en: 'The green leaf finishes drying, gently and evenly.', es: 'Se termina de secar la hoja verde, de forma pareja.' },
    },
    {
      titulo: { en: 'Belt drying', es: 'Secado a cintas' },
      texto: {
        en: 'Six hours between 100 °C and 60 °C to dry the stem and balance the moisture of the leaf.',
        es: 'Seis horas entre 100 °C y 60 °C para secar el palo y equilibrar la humedad de la hoja.',
      },
    },
    {
      titulo: { en: 'Canchado', es: 'Canchado' },
      texto: { en: 'The dried leaf is chopped into "yerba canchada".', es: 'La hoja seca se pica y queda como yerba canchada.' },
    },
    {
      titulo: { en: '18+ months of aging', es: '+18 meses de estacionamiento' },
      texto: {
        en: 'Stored in heated warehouses until it reaches the standard we look for.',
        es: 'Se guarda en depósitos calefaccionados hasta llegar al estándar que buscamos.',
      },
    },
    {
      titulo: { en: 'Milling & packing', es: 'Molienda y envasado' },
      texto: { en: 'Blended to our signature grind and packed for the world.', es: 'Se mezcla con nuestra molienda y se envasa para el mundo.' },
    },
  ],
  molienda: {
    titulo: { en: 'Our grind', es: 'Nuestra molienda' } as T,
    partes: [
      { valor: 27, label: { en: 'Stems', es: 'Palo' } },
      { valor: 23, label: { en: 'Coarse leaves', es: 'Hojas gruesas' } },
      { valor: 43, label: { en: 'Fine leaves', es: 'Hojas finas' } },
      { valor: 7, label: { en: 'Leaf powder', es: 'Polvo de hoja' } },
    ],
  },
};

export type Spec = { icono: string; label: T; valor: T };

const SPECS_YERBA: Spec[] = [
  { icono: 'hoja', label: { en: 'Ingredients', es: 'Ingredientes' }, valor: { en: '100% yerba mate with stems, Ilex paraguariensis leaves', es: '100% yerba mate con palo, hojas de Ilex paraguariensis' } },
  { icono: 'medalla', label: { en: 'Quality', es: 'Calidad' }, valor: { en: 'Premium selection', es: 'Selección premium' } },
  { icono: 'reloj', label: { en: 'Aging', es: 'Estacionamiento' }, valor: { en: 'Naturally aged for 18+ months', es: 'Natural, más de 18 meses' } },
  { icono: 'llama', label: { en: 'Drying', es: 'Secado' }, valor: { en: 'Natural, without added chemicals', es: 'Natural, sin agregado de químicos' } },
  { icono: 'brillo', label: { en: 'Characteristics', es: 'Atributos' }, valor: { en: 'Low dust · Does not cause acidity', es: 'Bajo polvo · No genera acidez' } },
  { icono: 'escudo', label: { en: 'Additives', es: 'Aditivos' }, valor: { en: 'No flavorings or preservatives', es: 'Sin aditivos ni conservantes' } },
  { icono: 'pin', label: { en: 'Origin', es: 'Origen' }, valor: { en: 'Misiones, Argentina', es: 'Misiones, Argentina' } },
];

export type Producto = {
  id: string;
  nombre: T;
  detalle?: T;
  descripcion: T;
  imagenes: { src: string; label?: T }[];
  fondo: 'transparente' | 'blanco' | 'foto';
  specs: Spec[];
  chips?: T[];
};

export const CATEGORIAS: { id: string; titulo: T; bajada: T; productos: Producto[] }[] = [
  {
    id: 'yerba',
    titulo: { en: 'Yerba Mate', es: 'Yerba Mate' },
    bajada: { en: 'Our premium selection, aged slowly.', es: 'Nuestra selección premium, estacionada sin apuro.' },
    productos: [
      {
        id: 'yerba-500',
        nombre: { en: 'Premium Yerba Mate', es: 'Yerba Mate Premium' },
        detalle: { en: '500 g', es: '500 g' },
        descripcion: {
          en: 'Premium yerba mate with stems, naturally aged for 18 months and produced without added chemicals. It offers an authentic, smooth and long-lasting flavor, preserving the pure tradition of Argentine mate.',
          es: 'Yerba mate elaborada con palo, de selección premium, con bajo contenido de polvo. No genera acidez y es amable con el sistema digestivo. Se distingue por su sabor auténtico, noble y duradero.',
        },
        imagenes: [{ src: '/landing/caja.png' }],
        fondo: 'transparente',
        specs: SPECS_YERBA,
        chips: [
          { en: 'Gluten free', es: 'Sin TACC' },
          { en: 'FDA', es: 'FDA' },
          { en: 'Halal', es: 'Halal' },
        ],
      },
      {
        id: 'yerba-250',
        nombre: { en: 'Premium Yerba Mate', es: 'Yerba Mate Premium' },
        detalle: { en: '250 g', es: '250 g' },
        descripcion: {
          en: 'The same premium selection in a smaller size. Perfect to try Al Galope for the first time, or to take on the road.',
          es: 'La misma selección premium en un tamaño más chico. Ideal para probar Al Galope por primera vez o para llevar de viaje.',
        },
        imagenes: [{ src: '/landing/caja-mano.webp' }],
        fondo: 'foto',
        specs: SPECS_YERBA.slice(0, 4),
        chips: [
          { en: 'Gluten free', es: 'Sin TACC' },
          { en: 'FDA', es: 'FDA' },
          { en: 'Halal', es: 'Halal' },
        ],
      },
    ],
  },
  {
    id: 'accesorios',
    titulo: { en: 'Mates & accessories', es: 'Mates y accesorios' },
    bajada: { en: 'Handcrafted mates and our famous plush.', es: 'Mates artesanales y nuestro famoso peluche.' },
    productos: [
      {
        id: 'mate-imperial',
        nombre: { en: 'Imperial Mate', es: 'Mate Imperial' },
        detalle: { en: '+ imperial straw', es: '+ bombilla imperial' },
        descripcion: {
          en: 'Hand-chiseled, with an alpaca silver rim and decorative engravings. Includes a chiseled alpaca straw.',
          es: 'Cincelado a mano, con viñeta de alpaca y grabados decorativos. Incluye bombilla cincelada de alpaca.',
        },
        imagenes: [{ src: '/landing/mate-imperial.jpg' }],
        fondo: 'blanco',
        specs: [
          { icono: 'material', label: { en: 'Material', es: 'Material' }, valor: { en: 'Leather', es: 'Cuero' } },
          { icono: 'medalla', label: { en: 'Style', es: 'Estilo' }, valor: { en: 'Imperial', es: 'Imperial' } },
          { icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: 'Large', es: 'Grande' } },
          { icono: 'brillo', label: { en: 'Includes', es: 'Incluye' }, valor: { en: 'Chiseled alpaca straw', es: 'Bombilla cincelada de alpaca' } },
        ],
      },
      {
        id: 'mate-pampa',
        nombre: { en: 'Pampa Edition Mate', es: 'Mate Edición Pampa' },
        detalle: { en: '+ imperial straw', es: '+ bombilla imperial' },
        descripcion: {
          en: 'Hand-chiseled, with an alpaca top rim decorated with beads and an alpaca base.',
          es: 'Cincelado a mano, con viñeta superior de alpaca decorada con bolitas y base también de alpaca.',
        },
        imagenes: [{ src: '/landing/mate-pampa.jpg' }],
        fondo: 'blanco',
        specs: [
          { icono: 'material', label: { en: 'Material', es: 'Material' }, valor: { en: 'Leather', es: 'Cuero' } },
          { icono: 'medalla', label: { en: 'Style', es: 'Estilo' }, valor: { en: 'Imperial', es: 'Imperial' } },
          { icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: 'Large', es: 'Grande' } },
          { icono: 'brillo', label: { en: 'Includes', es: 'Incluye' }, valor: { en: 'Chiseled alpaca straw', es: 'Bombilla cincelada de alpaca' } },
        ],
      },
      {
        id: 'mate-clasico',
        nombre: { en: 'Classic Edition Mate', es: 'Mate Edición Clásica' },
        detalle: { en: '+ classic straw', es: '+ bombilla clásica' },
        descripcion: {
          en: 'Premium stainless steel rim with a well-defined decorative design.',
          es: 'Viñeta de acero inoxidable premium con un diseño decorativo bien definido.',
        },
        imagenes: [{ src: '/landing/mate-clasico.jpg' }],
        fondo: 'blanco',
        specs: [
          { icono: 'material', label: { en: 'Material', es: 'Material' }, valor: { en: 'Leather', es: 'Cuero' } },
          { icono: 'medalla', label: { en: 'Style', es: 'Estilo' }, valor: { en: 'Imperial', es: 'Imperial' } },
          { icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: 'Large', es: 'Grande' } },
        ],
      },
      {
        id: 'mate-algarrobo',
        nombre: { en: 'Carob Wood Edition Mate', es: 'Mate Edición Algarrobo' },
        detalle: { en: '+ classic straw', es: '+ bombilla clásica' },
        descripcion: {
          en: 'Polished carob (algarrobo) wood with a first-quality stainless steel rim.',
          es: 'Madera de algarrobo pulida, con viñeta de acero inoxidable de primera calidad.',
        },
        imagenes: [
          { src: '/landing/mate-algarrobo-claro.jpg', label: { en: 'Light brown', es: 'Marrón claro' } },
          { src: '/landing/mate-algarrobo-oscuro.jpg', label: { en: 'Dark brown', es: 'Marrón oscuro' } },
        ],
        fondo: 'blanco',
        specs: [
          { icono: 'material', label: { en: 'Material', es: 'Material' }, valor: { en: 'Carob tree wood', es: 'Madera de algarrobo' } },
          { icono: 'medalla', label: { en: 'Style', es: 'Estilo' }, valor: { en: 'Imperial', es: 'Imperial' } },
          { icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: 'Medium', es: 'Mediano' } },
        ],
      },
      {
        id: 'mate-vidrio',
        nombre: { en: 'Glass Mate', es: 'Mate de Vidrio' },
        descripcion: {
          en: 'A clean, classic glass mate to see your yerba at its best. Straw not included for now.',
          es: 'Un mate de vidrio clásico para ver tu yerba en su mejor versión. Por el momento, sin bombilla.',
        },
        imagenes: [{ src: '/landing/mate-vidrio.webp' }],
        fondo: 'foto',
        specs: [
          { icono: 'material', label: { en: 'Material', es: 'Material' }, valor: { en: 'Glass', es: 'Vidrio' } },
          { icono: 'medalla', label: { en: 'Style', es: 'Estilo' }, valor: { en: 'Classic', es: 'Clásico' } },
          { icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: 'Small', es: 'Pequeño' } },
        ],
      },
      {
        id: 'peluche-20',
        nombre: { en: 'Mate Plush', es: 'Peluche Mate' },
        detalle: { en: '20 cm', es: '20 cm' },
        descripcion: {
          en: 'A fun and adorable plush inspired by the traditional Argentine mate. Its soft and charming design makes it a perfect companion for playing, decorating, or gifting.',
          es: 'Un peluche divertido y adorable inspirado en el mate argentino tradicional. Su diseño suave lo hace ideal para jugar, decorar o regalar.',
        },
        imagenes: [{ src: '/landing/peluche-20.png' }],
        fondo: 'transparente',
        specs: [{ icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: '20 cm', es: '20 cm' } }],
        chips: [{ en: 'Best seller', es: 'El más vendido' }],
      },
      {
        id: 'peluche-16',
        nombre: { en: 'Mate Plush', es: 'Peluche Mate' },
        detalle: { en: '16 cm', es: '16 cm' },
        descripcion: {
          en: 'The little one of the family. Same charm, perfect size for a gift.',
          es: 'El más chico de la familia. El mismo encanto, en el tamaño justo para regalar.',
        },
        imagenes: [{ src: '/landing/peluche-16.png' }],
        fondo: 'transparente',
        specs: [{ icono: 'regla', label: { en: 'Size', es: 'Tamaño' }, valor: { en: '16 cm', es: '16 cm' } }],
      },
    ],
  },
];

export const CERTIFICACIONES = {
  eyebrow: { en: 'Certified quality', es: 'Calidad certificada' } as T,
  titulo: { en: 'Ready for the world.', es: 'Lista para el mundo.' } as T,
  items: [
    { src: '/landing/cert-sin-tacc.png', label: { en: 'Gluten free', es: 'Sin TACC' } },
    { src: '/landing/cert-fda.png', label: { en: 'FDA', es: 'FDA' } },
    { src: '/landing/cert-halal.png', label: { en: 'Halal certified', es: 'Certificación Halal' } },
  ],
};

export const TIENDA = {
  eyebrow: { en: 'Shop', es: 'Tienda' } as T,
  titulo: { en: ['Buy your', 'Al Galope products.'], es: ['Comprá tus', 'productos Al Galope.'] },
  texto: {
    en: 'Our online store is on its way. In the meantime, order directly with us and we will take care of everything.',
    es: 'Nuestra tienda online está en camino. Mientras tanto, pedí directo con nosotros y nos ocupamos de todo.',
  } as T,
};

export const CONTACTO_TXT = {
  eyebrow: { en: 'Contact us', es: 'Contacto' } as T,
  titulo: { en: ["Let's share", 'a mate.'], es: ['Compartamos', 'un mate.'] },
  texto: {
    en: 'Importers, distributors and mate lovers: write to us and we will get back to you soon.',
    es: 'Importadores, distribuidores y amantes del mate: escribinos y te respondemos a la brevedad.',
  } as T,
  hecho: { en: 'Made in Argentina', es: 'Hecho en Argentina' } as T,
};
