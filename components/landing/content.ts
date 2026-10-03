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
    { id: 'tienda', label: { en: 'Shop', es: 'Tienda' }, externo: true },
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
  foro: { en: 'Santa Fe Business Forum 2026', es: 'Santa Fe Business Forum 2026' } as T,
};

export type Spec = { icono: string; label: T; valor: T };
export type Perfil = { label: T; nivel: number; valor: T };

// Atributos "marketineros" de la ficha técnica en inglés (última versión). La composición
// de la molienda y el proceso de producción no se publican: son fórmula y secreto industrial.
const SPECS_YERBA: Spec[] = [
  { icono: 'hoja', label: { en: 'Flavor', es: 'Sabor' }, valor: { en: 'Smooth, balanced and long-lasting', es: 'Suave, equilibrado y duradero' } },
  { icono: 'brillo', label: { en: 'Aroma', es: 'Aroma' }, valor: { en: 'Herbal and roasted, from its natural aging', es: 'Herbal y tostado, por su estacionamiento natural' } },
  { icono: 'reloj', label: { en: 'Aging', es: 'Estacionamiento' }, valor: { en: 'Naturally aged for 18+ months', es: 'Natural, más de 18 meses' } },
  { icono: 'escudo', label: { en: 'Pure', es: 'Pura' }, valor: { en: 'No additives, flavorings or preservatives', es: 'Sin aditivos, saborizantes ni conservantes' } },
  { icono: 'medalla', label: { en: 'Quality', es: 'Calidad' }, valor: { en: 'Premium selection, with stems', es: 'Selección premium, con palo' } },
  { icono: 'pin', label: { en: 'Origin', es: 'Origen' }, valor: { en: 'Misiones, Argentina', es: 'Misiones, Argentina' } },
];

// Perfil de la yerba: niveles de 1 a 5 para mostrar de un vistazo que es de baja acidez.
const PERFIL_YERBA: Perfil[] = [
  { label: { en: 'Acidity', es: 'Acidez' }, nivel: 1, valor: { en: 'Low', es: 'Baja' } },
  { label: { en: 'Dust', es: 'Polvo' }, nivel: 1, valor: { en: 'Low', es: 'Bajo' } },
  { label: { en: 'Smoothness', es: 'Suavidad' }, nivel: 5, valor: { en: 'High', es: 'Alta' } },
  { label: { en: 'Lasting flavor', es: 'Duración del sabor' }, nivel: 5, valor: { en: 'High', es: 'Alta' } },
];

export type Producto = {
  id: string;
  nombre: T;
  detalle?: T;
  descripcion: T;
  imagenes: { src: string; label?: T }[];
  fondo: 'transparente' | 'blanco' | 'foto';
  specs: Spec[];
  perfil?: Perfil[];
  chips?: T[];
};

// Las certificaciones se muestran debajo de la categoría que certifican (el alimento).
export const CATEGORIAS: { id: string; titulo: T; bajada: T; productos: Producto[]; certificada?: boolean }[] = [
  {
    id: 'yerba',
    titulo: { en: 'Yerba Mate', es: 'Yerba Mate' },
    bajada: { en: 'Our premium selection, aged slowly.', es: 'Nuestra selección premium, estacionada sin apuro.' },
    certificada: true,
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
        perfil: PERFIL_YERBA,
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
        imagenes: [{ src: '/landing/caja.png' }],
        fondo: 'transparente',
        specs: SPECS_YERBA.slice(0, 4),
        perfil: PERFIL_YERBA.slice(0, 2),
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

export const CONTACTO_TXT = {
  eyebrow: { en: 'Contact us', es: 'Contacto' } as T,
  titulo: { en: ["Let's share", 'a mate.'], es: ['Compartamos', 'un mate.'] },
  texto: {
    en: 'Importers, distributors and mate lovers: write to us and we will get back to you soon.',
    es: 'Importadores, distribuidores y amantes del mate: escribinos y te respondemos a la brevedad.',
  } as T,
  hecho: { en: 'Made in Argentina', es: 'Hecho en Argentina' } as T,
};
