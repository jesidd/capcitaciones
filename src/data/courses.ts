export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  progress: number;
  image: string;
  category: string;
  completed: boolean;
  instructor: string;
  rating: number;
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    description?: string;
  }>;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Seguridad en el Trabajo',
    description: 'Aprende las mejores prácticas de seguridad laboral y prevención de accidentes en el lugar de trabajo. Este curso incluye protocolos de emergencia y uso de equipos de protección.',
    duration: '2 horas',
    students: 156,
    progress: 75,
    image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
    category: 'Seguridad',
    completed: false,
    instructor: 'Ana García',
    rating: 4.8,
    lessons: [
      { id: '1-1', title: 'Introducción a la seguridad laboral', duration: '15 min', completed: true, description: 'Conceptos básicos de seguridad en el trabajo y su importancia.' },
      { id: '1-2', title: 'Identificación de riesgos', duration: '20 min', completed: true, description: 'Aprende a identificar y evaluar riesgos en el ambiente laboral.' },
      { id: '1-3', title: 'Equipos de protección personal', duration: '25 min', completed: true, description: 'Uso correcto de EPP y mantenimiento de equipos de seguridad.' },
      { id: '1-4', title: 'Protocolos de emergencia', duration: '30 min', completed: false, description: 'Procedimientos de evacuación y respuesta ante emergencias.' },
      { id: '1-5', title: 'Evaluación final', duration: '10 min', completed: false, description: 'Evaluación de conocimientos adquiridos en el curso.' },
    ]
  },
  {
    id: '2',
    title: 'Liderazgo Efectivo',
    description: 'Desarrolla habilidades de liderazgo para motivar equipos y alcanzar objetivos. Incluye técnicas de comunicación, gestión de conflictos y toma de decisiones.',
    duration: '3 horas',
    students: 89,
    progress: 0,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    category: 'Liderazgo',
    completed: false,
    instructor: 'Carlos López',
    rating: 4.6,
    lessons: [
      { id: '2-1', title: 'Fundamentos del liderazgo', duration: '25 min', completed: false, description: 'Principios básicos del liderazgo efectivo y características de un buen líder.' },
      { id: '2-2', title: 'Estilos de liderazgo', duration: '30 min', completed: false, description: 'Diferentes enfoques de liderazgo y cuándo aplicar cada uno.' },
      { id: '2-3', title: 'Comunicación efectiva', duration: '35 min', completed: false, description: 'Técnicas de comunicación para líderes y manejo de equipos.' },
      { id: '2-4', title: 'Gestión de conflictos', duration: '40 min', completed: false, description: 'Estrategias para resolver conflictos y mantener un ambiente positivo.' },
      { id: '2-5', title: 'Práctica y evaluación', duration: '20 min', completed: false, description: 'Ejercicios prácticos y evaluación de habilidades de liderazgo.' },
    ]
  },
  {
    id: '3',
    title: 'Atención al Cliente',
    description: 'Mejora tus habilidades de servicio al cliente con técnicas probadas. Aprende a manejar quejas, generar satisfacción y construir relaciones duraderas.',
    duration: '1.5 horas',
    students: 234,
    progress: 100,
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    category: 'Servicio',
    completed: true,
    instructor: 'María Rodríguez',
    rating: 4.9,
    lessons: [
      { id: '3-1', title: 'Principios de atención al cliente', duration: '20 min', completed: true, description: 'Fundamentos del servicio al cliente y expectativas del consumidor.' },
      { id: '3-2', title: 'Comunicación asertiva', duration: '25 min', completed: true, description: 'Técnicas de comunicación efectiva con clientes.' },
      { id: '3-3', title: 'Manejo de quejas', duration: '30 min', completed: true, description: 'Estrategias para resolver quejas y convertir experiencias negativas en positivas.' },
      { id: '3-4', title: 'Fidelización de clientes', duration: '15 min', completed: true, description: 'Métodos para crear lealtad y retener clientes a largo plazo.' },
    ]
  },
  {
    id: '4',
    title: 'Gestión del Tiempo',
    description: 'Optimiza tu productividad personal y profesional. Aprende técnicas de planificación, priorización y organización para maximizar tu eficiencia diaria.',
    duration: '2.5 horas',
    students: 178,
    progress: 40,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'Productividad',
    completed: false,
    instructor: 'Diego Martín',
    rating: 4.7,
    lessons: [
      { id: '4-1', title: 'Análisis del tiempo actual', duration: '20 min', completed: true, description: 'Evaluación de cómo utilizas tu tiempo actualmente.' },
      { id: '4-2', title: 'Técnicas de planificación', duration: '30 min', completed: true, description: 'Métodos efectivos para planificar tu día y semana.' },
      { id: '4-3', title: 'Priorización de tareas', duration: '25 min', completed: false, description: 'Técnicas para identificar y priorizar tareas importantes.' },
      { id: '4-4', title: 'Herramientas digitales', duration: '35 min', completed: false, description: 'Aplicaciones y herramientas para mejorar la productividad.' },
      { id: '4-5', title: 'Hábitos productivos', duration: '20 min', completed: false, description: 'Desarrollo de hábitos que aumenten tu eficiencia diaria.' },
    ]
  },
  {
    id: '5',
    title: 'Trabajo en Equipo',
    description: 'Fortalece la colaboración y sinergia grupal. Desarrolla habilidades para trabajar efectivamente en equipos diversos y alcanzar metas comunes.',
    duration: '2 horas',
    students: 145,
    progress: 0,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    category: 'Colaboración',
    completed: false,
    instructor: 'Laura Fernández',
    rating: 4.5,
    lessons: [
      { id: '5-1', title: 'Dinámicas de equipo', duration: '25 min', completed: false, description: 'Actividades para fortalecer la cohesión del equipo.' },
      { id: '5-2', title: 'Roles y responsabilidades', duration: '20 min', completed: false, description: 'Definición clara de roles y responsabilidades en el equipo.' },
      { id: '5-3', title: 'Comunicación en equipo', duration: '30 min', completed: false, description: 'Mejores prácticas para la comunicación efectiva en equipos.' },
      { id: '5-4', title: 'Resolución de problemas grupales', duration: '25 min', completed: false, description: 'Técnicas colaborativas para resolver problemas en equipo.' },
    ]
  },
  {
    id: '6',
    title: 'Innovación y Creatividad',
    description: 'Desbloquea tu potencial creativo para generar ideas innovadoras. Aprende metodologías de pensamiento creativo y técnicas de innovación empresarial.',
    duration: '3 horas',
    students: 92,
    progress: 20,
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
    category: 'Innovación',
    completed: false,
    instructor: 'Roberto Silva',
    rating: 4.4,
    lessons: [
      { id: '6-1', title: 'Fundamentos de la creatividad', duration: '30 min', completed: true, description: 'Bases teóricas de la creatividad y el pensamiento innovador.' },
      { id: '6-2', title: 'Técnicas de brainstorming', duration: '25 min', completed: false, description: 'Métodos para generar ideas creativas en grupo.' },
      { id: '6-3', title: 'Design thinking', duration: '40 min', completed: false, description: 'Metodología de design thinking para la innovación.' },
      { id: '6-4', title: 'Implementación de ideas', duration: '35 min', completed: false, description: 'Cómo llevar las ideas creativas a la práctica.' },
      { id: '6-5', title: 'Caso práctico', duration: '20 min', completed: false, description: 'Aplicación práctica de técnicas de innovación.' },
    ]
  }
];