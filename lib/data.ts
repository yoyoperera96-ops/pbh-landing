// -----------------------------------------------------------------------------
// Fuente única de contenido para la landing de la Peña Barcelonista de La Habana.
// Datos históricos (fundación, registro legal, sede, directiva) verificados en
// penyabarcelonistahavana.wordpress.com (páginas "La Penya", "Junta Directiva" y
// "Contáctenos") y en las redes oficiales de la Peña, julio 2026. El resto del
// texto (beneficios, FAQ, eventos) es contenido editorial y debe ser validado
// por la Junta Directiva antes de publicar. Ver README para la guía de reemplazo.
// -----------------------------------------------------------------------------

export const siteConfig = {
  name: "Peña Barcelonista de La Habana",
  shortName: "PBH",
  officialNumber: "Peña Oficial FCB #1063",
  foundedYear: 1996,
  registeredDate: "5 de febrero de 2001",
  anniversaryYear: 2026,
  anniversaryLabel: "30 Aniversario",
  city: "La Habana, Cuba",
  founder: "Artur Cabré",
  tagline: "Más que una peña, una familia culé.",
  brandConcept: "Una casa culé, treinta años en el corazón de Cuba.",
  description:
    "La Peña Barcelonista de La Habana (PBH), Peña Oficial #1063 del FC Barcelona, reúne desde 1996 a los seguidores del club en Cuba. Únete a casi 30 años de pasión, tradición y comunidad blaugrana.",
  email: "p.barcelonista.lahabana@gmail.com",
  phone: "+53 7 863 7589",
  address:
    "Sociedad de Beneficencia de Naturales de Cataluña, Calle Consulado #68 e/ Genios y Refugio, Centro Habana, CP 10200, La Habana, Cuba",
  social: {
    facebook: "https://www.facebook.com/PenyaBarcelonistaLaHabanaCuba/",
    instagram: "https://www.instagram.com/penyabhavana/",
    website: "https://penyabarcelonistahavana.wordpress.com/",
  },
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "1996",
    title: "Fundación de la Peña",
    description:
      "Artur Cabré, empresario catalán, funda la Peña Barcelonista de La Habana junto a un grupo de empresarios y aficionados azulgranas residentes en la ciudad.",
  },
  {
    year: "2001",
    title: "Registro oficial",
    description:
      "El 5 de febrero la Peña se registra legalmente con el nombre de \"Peña Barcelonista de La Habana\", con sede en la histórica Sociedad de Beneficencia de Naturales de Cataluña (fundada en 1840).",
  },
  {
    year: "2013",
    title: "Título de Liga celebrado en La Habana",
    description:
      "La directiva de la Peña viaja al Camp Nou para el Trofeo Gamper y se reúne con Joan Laporta, mientras los socios celebran en Cuba el título de Liga 2012-13.",
  },
  {
    year: "2015",
    title: "El escudo de la Peña llega al Camp Nou",
    description:
      "Bajo la presidencia de Pep Gaya, se instala el escudo de la Peña Barcelonista de La Habana en el Camp Nou, un reconocimiento a su trayectoria.",
  },
  {
    year: "2020s",
    title: "Reactivación digital",
    description:
      "La Peña reactiva su presencia en redes sociales para captar nuevas generaciones de socios dentro y fuera de Cuba.",
  },
  {
    year: "2026",
    title: "30 Aniversario",
    description:
      "La PBH celebra tres décadas de barcelonismo en Cuba con un logotipo conmemorativo, nueva imagen institucional y esta plataforma digital.",
  },
];

export type BrandValue = {
  n: string;
  title: string;
};

// Los 6 valores de marca del Manual de Identidad Visual PBH (sección 03 — ADN de la marca).
export const brandValues: BrandValue[] = [
  { n: "01", title: "Pasión" },
  { n: "02", title: "Pertenencia" },
  { n: "03", title: "Tradición" },
  { n: "04", title: "Comunidad" },
  { n: "05", title: "Elegancia" },
  { n: "06", title: "Profesionalismo" },
];

export type Benefit = {
  title: string;
  description: string;
  icon: "shield" | "users" | "calendar" | "star" | "ticket" | "handshake";
};

export const benefits: Benefit[] = [
  {
    title: "Comunidad culé",
    description:
      "Forma parte de una familia de socios que comparte tu misma pasión por el FC Barcelona, dentro y fuera de la cancha.",
    icon: "users",
  },
  {
    title: "Encuentros para ver los partidos",
    description:
      "Acceso a las transmisiones grupales de Liga, Champions y clásicos en la sede de la peña, con el ambiente de un estadio.",
    icon: "shield",
  },
  {
    title: "Eventos y actividades exclusivas",
    description:
      "Celebraciones, torneos internos, aniversarios y actividades familiares reservadas para socios de la PBH.",
    icon: "calendar",
  },
  {
    title: "Carné oficial de socio",
    description:
      "Identificación oficial como miembro de la Peña Barcelonista de La Habana, con beneficios y reconocimiento dentro de la comunidad.",
    icon: "ticket",
  },
  {
    title: "Historia y pertenencia",
    description:
      "Sé parte de casi 30 años de historia del barcelonismo cubano y ayuda a construir los próximos 30.",
    icon: "star",
  },
  {
    title: "Red de contactos culé",
    description:
      "Conecta con otros socios, peñas hermanas y la comunidad blaugrana internacional.",
    icon: "handshake",
  },
];

export type Testimonial = {
  name: string;
  memberSince: string;
  quote: string;
};

// El testimonio de Ernesto es real, tomado de un comentario público en la web
// oficial de la Peña (2013). Los otros dos son ejemplo — sustituir por citas
// reales de socios actuales antes de publicar.
export const testimonials: Testimonial[] = [
  {
    name: "Ernesto V.",
    memberSince: "Socio de la Peña",
    quote:
      "También soy miembro de la Peña desde hace unos años. Quería aprovechar y saludarlos a través de esta página. Visca Barça, señores.",
  },
  {
    name: "Carlos M.",
    memberSince: "Socio desde 2005",
    quote:
      "La Peña es mi segunda casa cada fin de semana. Ver un Clásico rodeado de gente que siente los colores igual que tú no tiene precio.",
  },
  {
    name: "Yanet R.",
    memberSince: "Socia desde 2016",
    quote:
      "Entré por el fútbol y me quedé por la familia que encontré. La PBH te recibe con los brazos abiertos desde el primer día.",
  },
];

export type EventItem = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export const events: EventItem[] = [
  {
    title: "Viewing party: Clásico Barça - Real Madrid",
    date: "Por confirmar",
    location: "Sede PBH, La Habana",
    description:
      "Transmisión en pantalla grande del Clásico con toda la afición de la peña. Entrada libre para socios.",
  },
  {
    title: "Celebración 30 Aniversario PBH",
    date: "2026 · Fecha por confirmar",
    location: "Sede PBH, La Habana",
    description:
      "Gran fiesta conmemorativa por los 30 años de la Peña Barcelonista de La Habana, con invitados especiales e historia de la peña.",
  },
  {
    title: "Torneo interno de fútbol 5",
    date: "Por confirmar",
    location: "Instalación deportiva, La Habana",
    description:
      "Actividad deportiva entre socios de la peña, abierta a familiares y amigos.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "¿Quién puede unirse a la Peña Barcelonista de La Habana?",
    answer:
      "Cualquier persona residente en Cuba (o cubana en el exterior) que sea aficionada al FC Barcelona y quiera vivir su pasión en comunidad puede solicitar su membresía.",
  },
  {
    question: "¿Tiene algún costo ser socio?",
    answer:
      "La membresía puede requerir una cuota simbólica para sostener las actividades de la peña. Al enviar tu inscripción, el equipo directivo se pondrá en contacto contigo con los detalles vigentes.",
  },
  {
    question: "¿Dónde se reúne la peña para ver los partidos?",
    answer:
      "En la sede social de la PBH en La Habana. La dirección exacta y el calendario de encuentros se comparten a los socios inscritos.",
  },
  {
    question: "¿Puedo unirme si no vivo en La Habana?",
    answer:
      "Sí. Muchos socios participan de forma remota en la comunidad digital de la peña y se suman presencialmente cuando visitan la ciudad.",
  },
  {
    question: "¿La Peña tiene relación oficial con el FC Barcelona?",
    answer:
      "Sí. La PBH es la Peña Oficial #1063 del FC Barcelona, reconocida por la Confederación Mundial de Peñas del club, y cada socio recibe su carné oficial de peñista.",
  },
  {
    question: "¿Cómo recibo el carné de socio?",
    answer:
      "Una vez validada tu inscripción por la Junta Directiva, se coordina contigo la entrega de tu carné oficial de socio de la PBH.",
  },
];

export type GalleryItem = {
  image: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  { image: "/images/galeria/galeria-01.jpg", caption: "Celebración de un título con la afición" },
  { image: "/images/galeria/galeria-02.jpg", caption: "Abrazo entre socios tras la victoria" },
  { image: "/images/galeria/galeria-03.jpg", caption: "La bandera de la Peña en cada celebración" },
  { image: "/images/galeria/galeria-04.jpg", caption: "Recibimiento a los jugadores" },
  { image: "/images/galeria/galeria-05.jpg", caption: "Familias culés de varias generaciones" },
  { image: "/images/galeria/galeria-06.jpg", caption: "Trofeo conquistado por el equipo de la peña" },
  { image: "/images/galeria/galeria-07.jpg", caption: "Selfie de celebración entre socios" },
];
