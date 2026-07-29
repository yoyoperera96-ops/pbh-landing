// -----------------------------------------------------------------------------
// Fuente única de contenido para la landing de la Peña Barcelonista de La Habana.
// Todo el texto marcado como "ejemplo" debe ser validado/sustituido por la Junta
// Directiva de la PBH antes de publicar. Ver README para la guía de reemplazo.
// -----------------------------------------------------------------------------

export const siteConfig = {
  name: "Peña Barcelonista de La Habana",
  shortName: "PBH",
  foundedYear: 1996,
  anniversaryYear: 2026,
  anniversaryLabel: "30 Aniversario",
  city: "La Habana, Cuba",
  tagline: "Más que una peña, una familia culé.",
  brandConcept: "Una casa culé, treinta años en el corazón de Cuba.",
  description:
    "La Peña Barcelonista de La Habana (PBH) reúne desde 1996 a los seguidores del FC Barcelona en Cuba. Únete a casi 30 años de pasión, tradición y comunidad blaugrana.",
  email: "info@penabarcelonistalahabana.example.cu",
  whatsapp: "+53 5xxx xxxx",
  address: "La Habana, Cuba",
  social: {
    facebook: "https://facebook.com/penabarcelonistalahabana",
    instagram: "https://instagram.com/pbh_lahabana",
    twitter: "https://x.com/pbh_lahabana",
    youtube: "https://youtube.com/@pbhlahabana",
    tiktok: "https://tiktok.com/@pbh_lahabana",
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
      "Un grupo de aficionados culés se reúne por primera vez en La Habana para ver los partidos del Barça y decide fundar la Peña Barcelonista de La Habana.",
  },
  {
    year: "2001",
    title: "Primeros socios oficiales",
    description:
      "La peña formaliza su membresía y comienza a organizar encuentros regulares para ver los partidos en conjunto en distintas sedes de la ciudad.",
  },
  {
    year: "2009",
    title: "El año del sextete",
    description:
      "La afición cubana al Barça se dispara con la generación del Guardiola. La PBH triplica su número de socios activos.",
  },
  {
    year: "2014",
    title: "Nueva sede social",
    description:
      "La peña estrena una sede fija para sus encuentros, con transmisiones en pantalla grande y actividades para toda la familia culé.",
  },
  {
    year: "2018",
    title: "Alianza con peñas internacionales",
    description:
      "La PBH se conecta con otras peñas barcelonistas de Latinoamérica y España, sumándose a la red global de aficionados del club.",
  },
  {
    year: "2022",
    title: "Renovación digital",
    description:
      "La peña lanza sus redes sociales oficiales y comienza a documentar su historia y actividades para las nuevas generaciones de socios.",
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

export const testimonials: Testimonial[] = [
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
  {
    name: "Alejandro P.",
    memberSince: "Socio desde 2011",
    quote:
      "Casi 30 años de historia se sienten en cada reunión. Ser socio es sentirte parte de algo más grande que un equipo de fútbol.",
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
      "La PBH es una peña de aficionados independiente. Funciona como comunidad de seguidores del club en Cuba, no como entidad oficial del FC Barcelona.",
  },
  {
    question: "¿Cómo recibo el carné de socio?",
    answer:
      "Una vez validada tu inscripción por la Junta Directiva, se coordina contigo la entrega de tu carné oficial de socio de la PBH.",
  },
];

export type GalleryItem = {
  caption: string;
};

// Placeholders de galería: sustituir por fotografías reales de actividades,
// encuentros y socios de la peña (ver README > "Reemplazar assets de marca").
export const gallery: GalleryItem[] = [
  { caption: "Encuentro de socios viendo un Clásico" },
  { caption: "Celebración de un título liguero" },
  { caption: "Actividad familiar de la peña" },
  { caption: "Sede social de la PBH" },
  { caption: "Entrega de carnés a nuevos socios" },
  { caption: "Torneo interno de fútbol 5" },
  { caption: "Aniversario de la fundación" },
  { caption: "Comunidad culé de La Habana" },
];
