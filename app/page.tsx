"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const REFERENCIAS = [
  { clave: "PMI, 2017", texto: "Project Management Institute. (2017). Guía de los Fundamentos para la Dirección de Proyectos (Guía del PMBOK®), 6.ª ed. Newton Square, PA: Project Management Institute." },
  { clave: "Osterwalder & Pigneur, 2010", texto: "Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. Hoboken, NJ: John Wiley & Sons." },
  { clave: "Romero & Ventura, 2010", texto: "Romero, C., & Ventura, S. (2010). Educational data mining: A review of the state of the art. IEEE Transactions on Systems, Man, and Cybernetics, Part C, 40(6), 601–618. https://doi.org/10.1109/TSMCC.2010.2053532" },
  { clave: "Márquez-Vera et al., 2013", texto: "Márquez-Vera, C., Morales, C. R., & Soto, S. V. (2013). Predicting school failure and dropout by using data mining techniques. IEEE Revista Iberoamericana de Tecnologías del Aprendizaje, 8(1), 7–14. https://doi.org/10.1109/RITA.2013.2244695" },
  { clave: "UNESCO, 2022", texto: "UNESCO. (2022). Informe de Seguimiento de la Educación en el Mundo 2022: No dejar a nadie atrás. París: Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura." },
  { clave: "MINEDU, 2023", texto: "Ministerio de Educación del Perú — MINEDU. (2023). Estadísticas de la Calidad Educativa (ESCALE). Lima: MINEDU. Recuperado de http://escale.minedu.gob.pe" },
  { clave: "Ley 29733, 2011", texto: "Congreso de la República del Perú. (2011). Ley N° 29733 — Ley de Protección de Datos Personales y su Reglamento (D.S. N° 003-2013-JUS). Lima: El Peruano." },
  { clave: "CEPAL/ILPES, 2005", texto: "Comisión Económica para América Latina y el Caribe — CEPAL/ILPES. (2005). Metodología del Marco Lógico para la planificación, el seguimiento y la evaluación de proyectos y programas. Santiago de Chile: Naciones Unidas." },
];

const CANVAS = {
  socios: ["UNTELS — equipo de desarrollo del sistema", "Cubicol — plataforma educativa existente", "Proveedor WIN — conectividad 1000 Mbps", "Ministerio de Educación — marco normativo"],
  actividades: ["Recolección e integración de datos académicos", "Entrenamiento y actualización de modelos ML", "Generación de alertas tempranas automáticas", "Mantenimiento, soporte y capacitación del personal"],
  recursos: ["Datos históricos: asistencia, notas e incidencias", "Infraestructura TI del colegio (Cubicol, internet)", "Equipo de desarrollo UNTELS", "Personal TI de la institución"],
  propuesta: ["Alerta temprana del bajo rendimiento académico mediante ML", "Alertas automáticas para intervención oportuna", "Dashboard visual para toma de decisiones directivas", "Reducción del bajo rendimiento y mejora de resultados académicos"],
  relacion: ["Capacitación presencial al personal docente y administrativo", "Soporte técnico continuo por el área TI de la institución", "Actualizaciones periódicas del sistema ML", "Comunicación mensual de reportes a dirección"],
  canales: ["Plataforma web responsive (móvil y escritorio)", "Lectura QR para registro de asistencia", "Integración directa con Cubicol", "Notificaciones vía correo y WhatsApp"],
  segmentos: ["Director y docentes de la IE Peruano Francés", "Psicólogo escolar", "Personal administrativo y área TI", "Padres de familia (200 alumnos)"],
  costos: ["Desarrollo del sistema — costo mínimo (equipo universitario)", "Hosting cloud — tier gratuito (Vercel / Supabase)", "Capacitación del personal docente", "Mantenimiento y actualizaciones anuales"],
  ingresos: ["Reducción de deserción → matrícula estable → ingresos sostenidos", "Ahorro en procesos manuales de seguimiento estudiantil", "Potencial licenciamiento a otras IEP del distrito de VES", "Mejora de imagen institucional y competitividad"],
};

const PHOTOS = [
  { src: "/img6.jpeg", caption: "Fachada principal de la I.E.P. Peruano Francés, Villa el Salvador" },
  { src: "/img7.jpeg", caption: "Vista frontal del edificio institucional (3 pisos)" },
  { src: "/img1.jpeg", caption: "Equipo de investigación en la entrada del colegio" },
  { src: "/img2.jpeg", caption: "Visita de campo al colegio — equipo UNTELS" },
  { src: "/img3.jpeg", caption: "Con la directora del colegio en la entrada de la institución" },
  { src: "/img5.jpeg", caption: "Reunión de entrevista con la directora en su oficina" },
  { src: "/img4.jpeg", caption: "Reporte de Incidencia Escolar actual — proceso 100% físico/manual" },
];

const STAKEHOLDERS = [
  { nombre: "Promotora Directora", cargo: "Promotora Directora — Directora General", contacto: "Oficina de Dirección — IE Peruano Francés", rol: "Toma de decisiones estratégicas", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Comprometida", estadoColor: "emerald" },
  { nombre: "Subdirector", cargo: "Subdirector Académico", contacto: "Oficina de Dirección — reuniones académicas", rol: "Supervisión académica", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Identificado", estadoColor: "blue" },
  { nombre: "Área de TI", cargo: "Encargado de Tecnología y Gestora Cubicol", contacto: "Laboratorio de cómputo — IE Peruano Francés", rol: "Implementación y soporte técnico", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Comprometida", estadoColor: "emerald" },
  { nombre: "Docentes", cargo: "Docentes y Auxiliares (16 personas)", contacto: "Aulas y plataforma digital interna Cubicol", rol: "Uso del sistema y seguimiento estudiantil", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificados", estadoColor: "blue" },
  { nombre: "Jefa de Normas y Coordinadores", cargo: "Jefa de Normas — Coordinadores de CC. y LL.", contacto: "Oficina académica — IE Peruano Francés", rol: "Gestión académica y coordinación curricular", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificados", estadoColor: "blue" },
  { nombre: "Psicólogo Escolar", cargo: "Psicólogo de la institución", contacto: "Área de psicología — IE Peruano Francés", rol: "Apoyo en casos de riesgo detectados", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificado", estadoColor: "blue" },
  { nombre: "Padres de Familia", cargo: "Apoderados de los 200 alumnos", contacto: "WhatsApp institucional / Plataforma Cubicol", rol: "Seguimiento del desempeño de sus hijos", interes: "Alto", poder: "Bajo", estrategia: "Mantener satisfechos", estado: "Informados", estadoColor: "amber" },
  { nombre: "Estudiantes", cargo: "Alumnos de Inicial, Primaria y Secundaria", contacto: "Aulas — Plataforma educativa Cubicol", rol: "Beneficiarios directos del sistema", interes: "Alto", poder: "Bajo", estrategia: "Monitorear", estado: "Monitoreados", estadoColor: "slate" },
  { nombre: "Personal Administrativo", cargo: "Área administrativa del colegio", contacto: "Oficina administrativa — IE Peruano Francés", rol: "Gestión de datos institucionales", interes: "Medio", poder: "Bajo", estrategia: "Mantener informados", estado: "Informados", estadoColor: "slate" },
];

const MAPA_ACTORES = [
  { zona: "Zona de Gestión Directa", color: "border-blue-600 bg-blue-50", colorTexto: "text-blue-800", colorBadge: "bg-blue-600 text-white", descripcion: "Alta influencia y alto interés — decisores clave del proyecto", actores: [{ nombre: "Promotora Directora", relacion: "Entrevistada · Comprometida" }, { nombre: "Área de TI", relacion: "Entrevistada · Comprometida" }, { nombre: "Subdirector", relacion: "Identificado · Por contactar" }] },
  { zona: "Zona de Involucramiento Activo", color: "border-indigo-500 bg-indigo-50", colorTexto: "text-indigo-800", colorBadge: "bg-indigo-500 text-white", descripcion: "Usuarios directos del sistema — su adopción determina el éxito", actores: [{ nombre: "Docentes y Auxiliares", relacion: "Identificados · Capacitación pendiente" }, { nombre: "Coordinadores Académicos", relacion: "Identificados · Por involucrar" }, { nombre: "Psicólogo Escolar", relacion: "Identificado · Por contactar" }] },
  { zona: "Zona de Seguimiento y Satisfacción", color: "border-amber-500 bg-amber-50", colorTexto: "text-amber-800", colorBadge: "bg-amber-500 text-white", descripcion: "Beneficiarios indirectos — deben ser informados y satisfechos", actores: [{ nombre: "Padres de Familia", relacion: "Informados vía Cubicol y WhatsApp" }, { nombre: "Estudiantes (200)", relacion: "Beneficiarios finales del sistema" }, { nombre: "Personal Administrativo", relacion: "Informados periódicamente" }] },
];

const MONITOREO = [
  { nombre: "Promotora Directora", estado: "Comprometida", nivel: 90, accion: "Entrevista realizada en Abril 2026. Ofrece acceso a datos institucionales. Próximo paso: presentación formal de la propuesta.", color: "bg-emerald-500" },
  { nombre: "Encargada de Cubicol / TI", estado: "Comprometida", nivel: 85, accion: "Entrevistada junto con la directora. Receptiva a integración técnica. Próximo paso: análisis de API de Cubicol.", color: "bg-emerald-500" },
  { nombre: "Subdirector", estado: "Identificado", nivel: 40, accion: "Identificado en la estructura organizacional. Pendiente de contacto formal para presentarle el proyecto.", color: "bg-blue-500" },
  { nombre: "Docentes y Auxiliares", estado: "Identificados", nivel: 35, accion: "Identificados como usuarios primarios. Pendiente taller de sensibilización sobre el sistema y sus beneficios.", color: "bg-blue-500" },
  { nombre: "Psicólogo Escolar", estado: "Identificado", nivel: 30, accion: "Identificado como actor clave para validar alertas críticas. Pendiente de reunión específica sobre casos de riesgo.", color: "bg-blue-500" },
  { nombre: "Coordinadores Académicos", estado: "Identificados", nivel: 30, accion: "Identificados por nivel (inicial, primaria, secundaria). Pendiente de sesión de trabajo con el sistema de reportes.", color: "bg-blue-500" },
  { nombre: "Padres de Familia", estado: "Informados", nivel: 20, accion: "Identificados como destinatarios de alertas. Se comunicará a través de Cubicol y WhatsApp institucional.", color: "bg-amber-500" },
  { nombre: "Estudiantes", estado: "Monitoreados", nivel: 15, accion: "Beneficiarios finales. El sistema los monitoreará de forma automática sin requerir su participación activa.", color: "bg-slate-400" },
];

const FACTORES_INTERNOS = [
  { factor: "Cultura Organizacional", descripcion: "Valores de responsabilidad, disciplina, trabajo en equipo e innovación que favorecen la adopción de nuevas tecnologías." },
  { factor: "Estructura Organizacional", descripcion: "Jerarquía clara: Directora, Subdirector, Coordinadores, Docentes, Psicólogo Escolar, Administrativos y Área TI." },
  { factor: "Infraestructura Tecnológica", descripcion: "Internet WIN 1000 Mbps (fibra óptica), plataforma Cubicol activa, base de datos institucional, 1 técnico de laboratorio." },
  { factor: "Experiencia en Proyectos TI", descripcion: "7 años usando Cubicol; implementaron matrícula digital y plataformas virtuales. Demuestran madurez tecnológica favorable." },
  { factor: "Recursos Humanos", descripcion: "16 docentes/auxiliares, psicólogo, técnico de TI y gestora de Cubicol. Capital humano disponible para el proyecto." },
  { factor: "Procesos Actuales", descripcion: "Asistencia física por cuadernos. Incidencias notificadas por WhatsApp/correo. Sin trazabilidad centralizada ni alertas automáticas." },
];

const FACTORES_EXTERNOS = [
  { factor: "Regulaciones y Normas", descripcion: "Cumplimiento obligatorio: Ministerio de Educación, Ley General de Educación y Ley N° 29733 de Protección de Datos Personales." },
  { factor: "Proveedores Tecnológicos", descripcion: "Dependencia de WIN (internet), Cubicol (plataforma educativa) y equipos informáticos. Condicionan disponibilidad del servicio." },
  { factor: "Condiciones Económicas", descripcion: "Presupuesto limitado como colegio privado pequeño. Requiere soluciones de bajo costo con tecnología open-source y cloud." },
  { factor: "Competencia Educativa", descripcion: "Otras instituciones en VES incorporan tecnología, generando presión para innovar y mantener la matrícula competitiva." },
  { factor: "Avances Tecnológicos", descripcion: "IA y analítica de datos ofrecen oportunidad real para mejorar gestión educativa con herramientas accesibles y escalables." },
];

const ACTIVOS = [
  { titulo: "Sistemas Existentes", items: ["Plataforma Cubicol (notas, matrícula)", "Base de datos institucional", "Control de asistencia", "Plataforma virtual educativa"] },
  { titulo: "Documentación", items: ["Registro de estudiantes", "Historial académico", "Reportes de asistencia", "Formatos de incidencias físicos", "Manuales de procedimientos"] },
  { titulo: "Experiencia Previa", items: ["7 años operando Cubicol", "Matrícula digital implementada", "Plataformas virtuales gestionadas", "Capacidad organizacional TI"] },
  { titulo: "Capital Humano", items: ["1 técnico de laboratorio TI", "1 gestora de Cubicol", "Directora con apertura TI", "Docentes capacitados"] },
];

const MAPA_EMPATIA = [
  {
    usuario: "Directora",
    cargo: "Promotora Directora — Decisora estratégica",
    color: "border-blue-500",
    colorBg: "bg-blue-50",
    colorLabel: "bg-blue-600",
    piensa: [
      "Quiere que la matrícula sea estable y creciente.",
      "Preocupada por alumnos que reprueban sin que nadie lo detecte a tiempo.",
      "Confía en la tecnología: 7 años usando Cubicol.",
    ],
    ve: [
      "Reportes académicos llegando tarde o incompletos.",
      "Docentes haciendo seguimiento en cuadernos físicos.",
      "Padres que no pueden acceder a Cubicol (40%).",
    ],
    dice: [
      "\"Necesitamos un sistema que nos ayude a tomar decisiones.\"",
      "Le interesa el QR para asistencia (confirmado en entrevista).",
      "Ofrece acceso a datos institucionales para el proyecto.",
    ],
    frustraciones: [
      "No tiene visión global del rendimiento en tiempo real.",
      "Las intervenciones llegan cuando el problema ya es grave.",
      "Comunicación con padres limitada a WhatsApp/correo.",
    ],
    motivaciones: [
      "Mejorar indicadores académicos institucionales.",
      "Posicionar la IE como referente tecnológico en VES.",
      "Estabilizar y hacer crecer la matrícula.",
    ],
  },
  {
    usuario: "Docente",
    cargo: "Docente/Auxiliar — Usuario primario del sistema",
    color: "border-indigo-500",
    colorBg: "bg-indigo-50",
    colorLabel: "bg-indigo-600",
    piensa: [
      "Quiere ayudar a sus alumnos pero le falta tiempo.",
      "Siente que detecta los problemas tarde (P7: 100% lo reconoce).",
      "Está dispuesto a adoptar tecnología si no aumenta su carga (P10: 83.3%).",
    ],
    ve: [
      "25+ alumnos por aula con información dispersa en varios sistemas.",
      "Asistencia registrada en papel sin trazabilidad digital.",
      "Incidencias reportadas por WhatsApp sin historial consolidado.",
    ],
    dice: [
      "Necesita control de notas y asistencia continuo (P11).",
      "Los factores del bajo rendimiento son múltiples (P5).",
      "Considera útil o muy útil tener alertas tempranas (P9: 100%).",
    ],
    frustraciones: [
      "Seguimiento manual consume tiempo sin generar alertas.",
      "Información académica dispersa en Cubicol, papel y WhatsApp.",
      "Sin indicadores en tiempo real para actuar oportunamente.",
    ],
    motivaciones: [
      "Intervenir a tiempo antes de que el alumno repruebe.",
      "Tener una herramienta que centralice la información académica.",
      "Mejorar el rendimiento de sus estudiantes con menos esfuerzo manual.",
    ],
  },
  /* {
    usuario: "Área TI",
    cargo: "Encargado Lab + Gestora Cubicol — Implementadores",
    color: "border-emerald-500",
    colorBg: "bg-emerald-50",
    colorLabel: "bg-emerald-600",
    piensa: [
      "Receptiva a integración técnica con la nueva plataforma.",
      "Conoce las limitaciones actuales de Cubicol.",
      "Comprometida con el proyecto desde la entrevista inicial.",
    ],
    ve: [
      "Cubicol subutilizado: almacena datos pero no genera análisis.",
      "1 solo modem WiFi sin repetidores — conectividad limitada.",
      "Sistema de asistencia aún 100% manual en papel.",
    ],
    dice: [
      "Próximo paso: análisis de API de Cubicol para integración.",
      "Dispuesta a dar soporte técnico continuo al sistema.",
      "Conoce la infraestructura real: internet WIN 1000 Mbps.",
    ],
    frustraciones: [
      "1 solo encargado TI para todo el colegio.",
      "Cubicol no se integra con otras herramientas fácilmente.",
      "Sin capacidad para generar analítica sobre los datos existentes.",
    ],
    motivaciones: [
      "Integrar el nuevo sistema con Cubicol sin migrar datos.",
      "Automatizar procesos manuales repetitivos.",
      "Ser el soporte técnico de una solución innovadora.",
    ],
  }, */
];

const HMW = [
  {
    pregunta: "¿Cómo podríamos centralizar asistencia, notas e incidencias sin aumentar la carga del docente?",
    insight: "83.3% de docentes hace seguimiento diario pero de forma manual (P2). 66.7% necesita datos integrados (P6).",
    vinculo: "Módulo A — Recolección automatizada desde Cubicol + QR",
  },
  {
    pregunta: "¿Cómo podríamos alertar al docente antes de que el alumno ya esté en situación crítica?",
    insight: "100% reconoce que los problemas se detectan tardíamente (P7: Algunas veces o Frecuentemente).",
    vinculo: "Módulo D — Alertas tempranas automáticas por nivel de riesgo",
  },
  {
    pregunta: "¿Cómo podríamos darle a la directora visibilidad del riesgo académico en tiempo real?",
    insight: "Directora carece de reportes consolidados. Necesita base para decisiones estratégicas (entrevista).",
    vinculo: "Módulo E — Dashboard con indicadores por aula y grado",
  },
  {
    pregunta: "¿Cómo podríamos mantener informados a los padres que no pueden acceder a Cubicol?",
    insight: "40% de padres no puede ingresar a Cubicol (entrevista con directora).",
    vinculo: "Notificaciones vía WhatsApp/correo — canales ya utilizados por la institución",
  },
];

const ENCUESTA_PREGUNTAS = [
  {
    num: 1, img: "/pregunta1.png",
    texto: "¿Cuántos años de experiencia tiene como docente?",
    tipo: "nominal",
    filas: [
      { opcion: "Más de 7 años", n: 3, pct: 50 },
      { opcion: "4 a 7 años",    n: 1, pct: 16.7 },
      { opcion: "1 a 3 años",    n: 1, pct: 16.7 },
      { opcion: "Menos de 1 año",n: 1, pct: 16.7 },
    ],
    hallazgo: "Equipo docente mayoritariamente experimentado (50% con más de 7 años).",
    color: "blue",
  },
  {
    num: 2, img: "/pregunta2.png",
    texto: "¿Con qué frecuencia realiza seguimiento al rendimiento académico de sus estudiantes?",
    tipo: "nominal",
    filas: [
      { opcion: "Diariamente",  n: 5, pct: 83.3 },
      { opcion: "Mensualmente", n: 1, pct: 16.7 },
    ],
    hallazgo: "83.3% realiza seguimiento diario, pero de forma manual e individualizada.",
    color: "indigo",
  },
  {
    num: 3, img: "/pregunta3.png",
    texto: "¿Considera que actualmente la institución cuenta con herramientas suficientes para detectar estudiantes con bajo rendimiento académico?",
    tipo: "nominal",
    filas: [
      { opcion: "Sí",           n: 3, pct: 50.0 },
      { opcion: "No",           n: 2, pct: 33.3 },
      { opcion: "Parcialmente", n: 1, pct: 16.7 },
    ],
    hallazgo: "50% reconoce carencia o insuficiencia de herramientas (No + Parcialmente).",
    color: "amber",
  },
  {
    num: 4, img: "/pregunta4.png",
    texto: "¿Qué tan difícil considera identificar oportunamente a estudiantes con problemas académicos?",
    tipo: "likert",
    filas: [
      { opcion: "Regular", n: 5, pct: 83.3 },
      { opcion: "Fácil",   n: 1, pct: 16.7 },
      { opcion: "Difícil", n: 0, pct: 0 },
    ],
    hallazgo: "83.3% califica la identificación oportuna de complejidad moderada.",
    color: "orange",
  },
  {
    num: 5, img: "/pregunta5.png",
    texto: "¿Cuáles son los principales factores que afectan el rendimiento académico de los estudiantes?",
    tipo: "nominal",
    filas: [
      { opcion: "Uso excesivo de redes sociales",  n: 2, pct: 33.3 },
      { opcion: "Bajo hábito de estudio",           n: 1, pct: 16.7 },
      { opcion: "Bajo acompañamiento familiar",     n: 1, pct: 16.7 },
      { opcion: "Problemas familiares",             n: 1, pct: 16.7 },
      { opcion: "Todas las anteriores",             n: 1, pct: 16.7 },
    ],
    hallazgo: "Factores múltiples y combinados — justifica un sistema multivariable.",
    color: "red",
  },
  {
    num: 6, img: "/pregunta6.png",
    texto: "¿Qué información considera más importante para detectar estudiantes con bajo rendimiento académico?",
    tipo: "nominal",
    filas: [
      { opcion: "Todas las anteriores", n: 4, pct: 66.7 },
      { opcion: "Entrega de tareas",    n: 1, pct: 16.7 },
      { opcion: "Conducta",             n: 1, pct: 16.7 },
    ],
    hallazgo: "66.7% necesita datos integrados — valida el diseño multivariable del sistema.",
    color: "purple",
  },
  {
    num: 7, img: "/pregunta7.png",
    texto: "¿Considera que los problemas académicos suelen detectarse tardíamente?",
    tipo: "likert",
    filas: [
      { opcion: "Algunas veces",  n: 4, pct: 66.7 },
      { opcion: "Frecuentemente", n: 2, pct: 33.3 },
      { opcion: "Raramente",      n: 0, pct: 0 },
    ],
    hallazgo: "100% reconoce detección tardía — valida directamente el problema central.",
    color: "red",
  },
  {
    num: 8, img: "/pregunta8.png",
    texto: "¿Cree que un sistema inteligente basado en Machine Learning ayudaría a mejorar el seguimiento académico?",
    tipo: "likert",
    filas: [
      { opcion: "Totalmente de acuerdo", n: 3, pct: 50.0 },
      { opcion: "De acuerdo",            n: 2, pct: 33.3 },
      { opcion: "Neutral",               n: 1, pct: 16.7 },
      { opcion: "En desacuerdo",         n: 0, pct: 0 },
    ],
    hallazgo: "83.3% favorable a la solución ML (De acuerdo + Totalmente de acuerdo).",
    color: "emerald",
  },
  {
    num: 9, img: "/pregunta9.png",
    texto: "¿Qué tan útil considera la implementación de alertas tempranas para identificar estudiantes en riesgo académico?",
    tipo: "likert",
    filas: [
      { opcion: "Muy útil",   n: 4, pct: 66.7 },
      { opcion: "Útil",       n: 2, pct: 33.3 },
      { opcion: "Poco útil",  n: 0, pct: 0 },
    ],
    hallazgo: "100% considera útiles las alertas tempranas — validación total de la funcionalidad core.",
    color: "emerald",
  },
  {
    num: 10, img: "/pregunta10.png",
    texto: "¿Estaría dispuesto(a) a utilizar una plataforma tecnológica que ayude a monitorear el rendimiento académico estudiantil?",
    tipo: "nominal",
    filas: [
      { opcion: "Sí",      n: 5, pct: 83.3 },
      { opcion: "Tal vez", n: 1, pct: 16.7 },
      { opcion: "No",      n: 0, pct: 0 },
    ],
    hallazgo: "0% de rechazo — alta disposición tecnológica del equipo docente.",
    color: "teal",
  },
];

const ENCUESTA_P11 = [
  "Control digital de notas y asistencia de forma continua.",
  "Mayor apoyo y comunicación con las familias.",
  "Fomento de hábitos de estudio desde el hogar.",
  "Tutorías personalizadas por alumno.",
  "Uso de datos y tecnología para monitoreo académico.",
  "Estrategias dinámicas que motiven el aprendizaje.",
];

const MODULOS = [
  { letra: "A", nombre: "Recolección de Datos", color: "bg-blue-700", descripcion: "Integra asistencia, notas e incidencias desde Cubicol y nuevos registros digitales." },
  { letra: "B", nombre: "Procesamiento", color: "bg-indigo-700", descripcion: "Limpieza, normalización e integración de datos para el análisis." },
  { letra: "C", nombre: "Analítica ML", color: "bg-purple-700", descripcion: "Modelos de Machine Learning calculan el nivel de riesgo de bajo rendimiento académico de cada alumno." },
  { letra: "D", nombre: "Alertas Tempranas", color: "bg-red-700", descripcion: "Notificaciones automáticas a docentes y directivos sobre estudiantes en riesgo crítico." },
  { letra: "E", nombre: "Dashboard", color: "bg-emerald-700", descripcion: "Paneles visuales con reportes e indicadores clave para la toma de decisiones." },
];

type TocSection = { label: string; href: string };
type TocGroup  = { label: string; color: string; sections: TocSection[] };
type TocChapter = { num: string; label: string; sections?: TocSection[]; groups?: TocGroup[] };

const TOC_CHAPTERS: TocChapter[] = [
  {
    num: "00",
    label: "Introducción",
    sections: [
      { label: "Motivación del proyecto", href: "#problema" },
      { label: "Sobre la institución", href: "#institucion" },
      { label: "Propuesta de valor", href: "#solucion" },
      { label: "La institución en campo", href: "#visita" },
      { label: "Equipo de investigación", href: "#equipo" },
    ],
  },
  {
    num: "01",
    label: "Análisis de Stakeholders",
    groups: [
      {
        label: "Entradas",
        color: "text-blue-600",
        sections: [
          { label: "Caso de negocio", href: "#canvas" },
          { label: "Factores ambientales", href: "#factores" },
        ],
      },
      {
        label: "Herramientas y Técnicas",
        color: "text-amber-600",
        sections: [
          { label: "Entrevista semi-estructurada", href: "#entrevista" },
          { label: "Mapa de Actores", href: "#mapa-actores" },
          { label: "Matriz de Poder e Interés", href: "#matriz-poder" },
          { label: "Análisis de Expectativas", href: "#expectativas" },
        ],
      },
      {
        label: "Salidas",
        color: "text-emerald-600",
        sections: [
          { label: "Registro de interesados", href: "#stakeholders" },
          { label: "Plan de Comunicación", href: "#comunicacion" },
          { label: "Seguimiento de Interesados", href: "#seguimiento" },
        ],
      },
    ],
  },
  {
    num: "02",
    label: "Análisis del Problema",
    groups: [
      { label: "Entradas", color: "text-blue-600", sections: [{ label: "Descripción de la problemática", href: "#p02-entradas" }] },
      { label: "Herramientas y Técnicas", color: "text-amber-600", sections: [
        { label: "Marco Lógico", href: "#p02-herramientas" },
        { label: "Encuesta Docente", href: "#p02-herramientas" },
        { label: "Design Thinking", href: "#p02-design-thinking" },
      ] },
      { label: "Evidencias", color: "text-purple-600", sections: [
        { label: "Respuestas de Docentes", href: "#p02-evidencias" },
        { label: "Resultados por Pregunta", href: "#p02-resultados" },
      ] },
      { label: "Salidas", color: "text-emerald-600", sections: [{ label: "Problema Central", href: "#p02-salidas" }] },
    ],
  },
  {
    num: "03",
    label: "Análisis del Objetivo",
    groups: [
      { label: "Entradas", color: "text-blue-600", sections: [{ label: "Problema Central", href: "#p03-entradas" }] },
      { label: "Herramientas y Técnicas", color: "text-amber-600", sections: [
        { label: "Árbol de Objetivos", href: "#p03-herramientas" },
        { label: "Análisis SMART", href: "#p03-smart" },
      ] },
      { label: "Salidas", color: "text-emerald-600", sections: [{ label: "Objetivo Central SMART", href: "#p03-salidas" }] },
    ],
  },
  {
    num: "",
    label: "Referencias Bibliográficas",
    sections: [{ label: "Referencias Bibliográficas", href: "#referencias" }],
  },
];

const TOC_SECTIONS: TocSection[] = TOC_CHAPTERS.flatMap((ch) =>
  ch.groups ? ch.groups.flatMap((g) => g.sections) : (ch.sections ?? [])
);

function Cite({ r }: { r: string }) {
  return (
    <sup className="inline-flex items-center ml-0.5">
      <span className="text-blue-600 font-semibold text-[9px] bg-blue-50 border border-blue-200 px-1 py-0.5 rounded cursor-help leading-none" title={r}>
        [{r}]
      </span>
    </sup>
  );
}

function getBadge(nivel: string) {
  if (nivel === "Alto") return "bg-red-100 text-red-700 border border-red-200";
  if (nivel === "Medio") return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  return "bg-green-100 text-green-700 border border-green-200";
}

function getEst(est: string) {
  if (est === "Gestionar de cerca") return "bg-blue-600 text-white";
  if (est === "Mantener involucrados") return "bg-indigo-500 text-white";
  if (est === "Mantener satisfechos") return "bg-amber-500 text-white";
  return "bg-slate-400 text-white";
}

export default function Home() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openChapters, setOpenChapters] = useState<Set<string>>(
    () => new Set(TOC_CHAPTERS.map((ch) => ch.num || ch.label))
  );
  const toggleChapter = (key: string) =>
    setOpenChapters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(TOC_CHAPTERS.flatMap((ch) => (ch.groups ?? []).map((g) => `${ch.num}-${g.label}`)))
  );
  const toggleGroup = (key: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    TOC_SECTIONS.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        activeObserver.observe(el);
        fadeObserver.observe(el);
      }
    });
    return () => {
      activeObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* Barra de progreso */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: "linear-gradient(90deg, #0d7377, #1e3a8a)" }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-14 flex items-center">
        <div className="w-full flex items-center gap-3 px-4 lg:px-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 text-slate-800 text-lg leading-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir índice"
          >
            ☰
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 bg-white shadow-sm">
            <Image src="/logo.jpeg" alt="Logo IE Peruano Francés" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif-display text-sm font-bold text-slate-900 truncate">Sistema ML — Alerta Temprana del Bajo Rendimiento Académico</p>
            <p className="font-mono-label text-[10px] text-slate-800 hidden sm:block">UNTELS · ISR0832 · Formulación y Evaluación de Proyectos TI · 2026</p>
          </div>
          <span className="hidden md:flex items-center gap-1.5 font-mono-label text-[10px] text-slate-800 border border-slate-200 rounded-full px-3 py-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377] animate-pulse" />
            Proyecto Académico
          </span>
        </div>
      </header>

      <div className="flex pt-14">

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-14 left-0 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5">
            <p className="chapter-label mb-5">Índice</p>
            <nav className="space-y-1">
              {TOC_CHAPTERS.map((ch) => {
                const chKey = ch.num || ch.label;
                const isChOpen = openChapters.has(chKey);
                const allSections = ch.groups
                  ? ch.groups.flatMap((g) => g.sections)
                  : (ch.sections ?? []);
                const hasActive = allSections.some(
                  (s) => activeSection === s.href.replace("#", "")
                );
                return (
                  <div key={chKey}>
                    <button
                      onClick={() => toggleChapter(chKey)}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all hover:bg-slate-50 ${hasActive ? "text-[#0d7377]" : "text-slate-700"}`}
                    >
                      {ch.num && (
                        <span className={`font-mono-label text-[9px] rounded px-1.5 py-0.5 font-bold flex-shrink-0 ${hasActive ? "bg-[#e8f5f5] text-[#0d7377]" : "bg-slate-100 text-slate-600"}`}>
                          {ch.num}
                        </span>
                      )}
                      <span className="font-mono-label text-[11px] uppercase tracking-wider leading-tight flex-1 text-left font-bold">
                        {ch.label}
                      </span>
                      <span className="text-[10px] flex-shrink-0 opacity-50">
                        {isChOpen ? "▲" : "▼"}
                      </span>
                    </button>

                    {isChOpen && ch.sections && (
                      <div className="space-y-0.5 pl-2 pb-1">
                        {ch.sections.map((s) => {
                          const isActive = activeSection === s.href.replace("#", "");
                          return (
                            <a key={s.href} href={s.href} onClick={() => setSidebarOpen(false)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${isActive ? "bg-[#e8f5f5] text-[#0d7377] font-semibold" : "text-slate-700 hover:text-slate-800 hover:bg-slate-50"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-[#0d7377]" : "bg-slate-200"}`} />
                              {s.label}
                            </a>
                          );
                        })}
                      </div>
                    )}

                    {isChOpen && ch.groups && (
                      <div className="pl-2 pb-1 space-y-0.5">
                        {ch.groups.map((group) => {
                          const gKey = `${ch.num}-${group.label}`;
                          const isGOpen = openGroups.has(gKey);
                          const gHasActive = group.sections.some(
                            (s) => activeSection === s.href.replace("#", "")
                          );
                          return (
                            <div key={gKey}>
                              <button
                                onClick={() => toggleGroup(gKey)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all"
                              >
                                <span className={`font-mono-label text-[9px] uppercase tracking-wider font-bold flex-1 text-left ${gHasActive ? group.color : "text-slate-500"}`}>
                                  {group.label}
                                </span>
                                <span className="text-[9px] opacity-40">{isGOpen ? "▲" : "▼"}</span>
                              </button>
                              {isGOpen && (
                                <div className="space-y-0.5 pl-2">
                                  {group.sections.map((s) => {
                                    const isActive = activeSection === s.href.replace("#", "");
                                    return (
                                      <a key={s.href} href={s.href} onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${isActive ? "bg-[#e8f5f5] text-[#0d7377] font-semibold" : "text-slate-700 hover:text-slate-800 hover:bg-slate-50"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-[#0d7377]" : "bg-slate-200"}`} />
                                        {s.label}
                                      </a>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="font-mono-label text-[11px] text-slate-700 leading-relaxed">
                Proyecto académico · UNTELS<br />
                Docente: Arqque Pantigozo Antonio<br />
                Lima, Perú · 2026
              </p>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 lg:ml-64 min-w-0">

          {/* Portada */}
          <section className="bg-white border-b border-slate-200 min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="px-10 lg:px-20 text-center w-full py-6">

              <div className="inline-flex items-center gap-2 font-mono-label text-[11px] text-slate-700 border border-slate-200 rounded-full px-4 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377]" />
                UNTELS · Escuela de Ingeniería de Sistemas · ISR0832 · 2026
              </div>

              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm">
                  <Image src="/logo.jpeg" alt="Logo IE Peruano Francés" width={56} height={56} className="w-full h-full object-contain" />
                </div>
              </div>

              <p className="font-mono-label text-[11px] text-[#0d7377] uppercase tracking-widest mb-2">
                Proyecto de Formulación y Evaluación TI
              </p>

              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-3">
                Sistema Inteligente usando Machine Learning<br />
                <span className="text-[#0d7377]">para Alerta Temprana del Bajo Rendimiento Académico</span>
              </h1>

              <p className="text-slate-800 text-base mb-0.5">
                Aplicado al <strong>Colegio Particular I.E.P. Peruano Francés</strong>
              </p>
              <p className="font-mono-label text-slate-800 text-[11px] mb-4">
                Av. Pastor Sevilla · Villa el Salvador · Lima, Perú
              </p>

              <div className="w-12 h-px bg-slate-300 mx-auto mb-4" />

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 mb-2 text-sm text-slate-700">
                {["Henry B. Nuñez Figueroa", "Helber J. Perez Gutierrez", "Fernando Medina Ccangri", "Jhostin J. Galarza Camarena"].map((nombre) => (
                  <span key={nombre} className="font-medium">{nombre}</span>
                ))}
              </div>

              <p className="font-mono-label text-slate-800 text-[11px] mb-4">
                Docente: <span className="font-semibold">Arqque Pantigozo Antonio</span>
                &nbsp;·&nbsp; Formulación y Evaluación de Proyectos TI &nbsp;·&nbsp; Lima, 2026
              </p>

              <div className="inline-flex items-center gap-2 bg-[#e8f5f5] border border-[#c0e0e0] rounded-full px-4 py-1.5 mb-4">
                <span className="font-mono-label text-[#0a5c5f] text-[11px] font-semibold">Metodología: PMBOK® 6.ª edición</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { stat: "200", label: "Estudiantes" },
                  { stat: "16", label: "Docentes / Auxiliares" },
                  { stat: "25", label: "Años de trayectoria" },
                  { stat: "3", label: "Niveles educativos" },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
                    <div className="font-serif-display text-2xl font-bold text-slate-800">{s.stat}</div>
                    <div className="font-mono-label text-slate-700 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              <a href="#problema"
                className="inline-flex items-center gap-2 bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold px-7 py-2.5 rounded-xl transition-all shadow text-sm">
                Ver proyecto ↓
              </a>

            </div>
          </section>

          {/* Abstract */}
          <section className="py-12 bg-white border-b border-slate-100">
            <div className="px-8 lg:px-12">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Resumen / Abstract</span>
                  <span className="font-mono-label text-slate-800 text-[11px]">Metodología: PMBOK® 6.ª edición <Cite r="PMI, 2017" /></span>
                </div>
                <p className="text-slate-800 leading-relaxed text-sm">
                  El presente trabajo formula y evalúa un proyecto de tecnología de información orientado a la detección temprana del riesgo de deserción escolar en la Institución Educativa Privada I.E.P. Peruano Francés, ubicada en Villa el Salvador, Lima, Perú. Siguiendo los lineamientos del <strong className="text-slate-800">PMBOK® 6.ª edición</strong><Cite r="PMI, 2017" />, se identificaron los factores ambientales de la empresa, los activos de los procesos de la organización y se realizó un análisis exhaustivo de interesados. El diagnóstico se fundamenta en una entrevista semi-estructurada aplicada en abril de 2026, que evidenció procesos 100&nbsp;% manuales de registro de asistencia e incidencias, y una tasa de acceso del 60&nbsp;% de los padres de familia a la plataforma institucional Cubicol<Cite r="MINEDU, 2023" />. La solución propuesta es un sistema web inteligente basado en técnicas de <strong className="text-slate-800">Machine Learning</strong><Cite r="Romero & Ventura, 2010" /> que procesa variables de asistencia, rendimiento académico e incidencias conductuales para generar alertas tempranas de intervención. El modelo de negocio fue estructurado mediante el <strong className="text-slate-800">Business Model Canvas</strong><Cite r="Osterwalder & Pigneur, 2010" />.
                </p>
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="font-mono-label text-[10px] text-slate-800">Palabras clave:</span>
                  {["Machine Learning", "Bajo rendimiento académico", "PMBOK 6", "Gestión de proyectos TI", "Alertas tempranas", "IEP Peruano Francés"].map((k) => (
                    <span key={k} className="bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-xs px-2 py-0.5 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Capítulo 00 — Introducción ── */}
          <div className="py-8 px-8 lg:px-12 bg-slate-50 border-y border-slate-200">
            <div className="flex items-start gap-4">
              <span className="font-mono-label text-[11px] bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold flex-shrink-0 mt-0.5">00</span>
              <div>
                <p className="chapter-label mb-0.5">Capítulo 00</p>
                <h2 className="font-serif-display text-2xl font-bold text-slate-900 leading-tight">Introducción</h2>
                <p className="text-slate-600 text-sm mt-1">Contexto del problema, la institución, propuesta de valor y equipo de investigación</p>
              </div>
            </div>
          </div>

          {/* ── PROBLEMA ── */}
          <section id="problema" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">00 · Introducción · Motivación del Proyecto</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">El Bajo Rendimiento Académico: Un Problema Urgente</h2>
              <p className="text-slate-700 text-sm mb-8">En la IE Peruano Francés, la identificación de alumnos con bajo rendimiento académico se realiza de manera manual y reactiva, sin herramientas que permitan intervenir a tiempo.</p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { num: "1", titulo: "Registro 100% Manual", desc: "La asistencia se registra en papel por docentes y auxiliares. Las incidencias se reportan por WhatsApp o correo, sin trazabilidad centralizada." },
                  { num: "2", titulo: "Detección Tardía", desc: "La identificación de alumnos en riesgo depende exclusivamente de la observación individual del docente. No hay sistema de alertas tempranas." },
                  { num: "3", titulo: "40% de Padres No Usa la Plataforma", desc: "4 de cada 10 padres no tiene el hábito ni la cultura de ingresar a Cubicol. Las notificaciones por WhatsApp no garantizan respuesta inmediata." },
                ].map((c) => (
                  <div key={c.titulo} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="font-mono-label w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-bold flex items-center justify-center mb-3">{c.num}</div>
                    <h3 className="font-serif-display font-bold text-slate-900 mb-2">{c.titulo}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center bg-red-50 border border-red-100 rounded-2xl p-6 mb-10">
                <div className="flex-shrink-0 w-full sm:w-48 rounded-xl overflow-hidden border border-red-100 shadow-sm">
                  <Image src="/reporte_incidencia.jpeg" alt="Reporte de Incidencia Escolar — formulario físico IE Peruano Francés" width={400} height={560} className="w-full h-auto" />
                </div>
                <div>
                  <span className="inline-block bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">Evidencia — Proceso Actual</span>
                  <h4 className="font-serif-display font-bold text-slate-900 text-base mb-2">Reporte de Incidencia Escolar — 100% Físico y Manual</h4>
                  <p className="text-slate-800 text-sm leading-relaxed mb-3">
                    Este es el formulario en papel utilizado actualmente por la institución para registrar cada incidencia escolar. Se completa a mano, se archiva de forma física y se notifica por WhatsApp o correo. <strong className="text-red-700">No existe trazabilidad digital, ni historial centralizado, ni alertas automáticas.</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Sin trazabilidad digital", "Sin alertas automáticas", "Sin historial centralizado", "Riesgo de pérdida de información"].map((t) => (
                      <span key={t} className="bg-white border border-red-200 text-red-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl p-8 text-white">
                <h3 className="font-serif-display text-xl font-bold mb-3">Objetivo General del Proyecto</h3>
                <p className="text-blue-100 leading-relaxed">
                  Formular y evaluar un <strong className="text-white">sistema inteligente usando Machine Learning</strong> que genere alertas tempranas del bajo rendimiento académico en la IE Peruano Francés, facilitando la identificación oportuna de estudiantes en riesgo y mejorando la toma de decisiones de directivos y docentes mediante alertas automáticas y dashboards visuales.
                </p>
              </div>
            </div>
          </section>

          {/* ── INSTITUCIÓN ── */}
          <section id="institucion" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">00 · Introducción · La Institución</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">I.E.P. Peruano Francés</h2>
              <p className="text-slate-700 text-sm mb-8">Datos verificados en visita de campo — Abril 2026</p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-5 py-3 text-left font-mono-label text-[11px] uppercase tracking-wider text-slate-900 w-1/3">Campo</th>
                      <th className="px-5 py-3 text-left font-mono-label text-[11px] uppercase tracking-wider text-slate-900">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Nombre", "I.E.P. Peruano Francés"],
                      ["Tipo", "Institución Educativa Privada"],
                      ["Ubicación", "Av. Pastor Sevilla con Av. Juan Velasco Alvarado, Villa el Salvador, Lima"],
                      ["Niveles educativos", "Inicial · Primaria · Secundaria"],
                      ["N.° de estudiantes", "Aproximadamente 200 alumnos"],
                      ["N.° de docentes", "Aproximadamente 16 docentes y auxiliares"],
                      ["Años de operación", "25 años de trayectoria"],
                      ["Sistema académico", "Cubicol — 7 años en uso"],
                      ["Conectividad", "WIN — Fibra Óptica 1000 Mbps"],
                    ].map(([campo, desc], i) => (
                      <tr key={campo} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-5 py-3 font-semibold text-slate-900">{campo}</td>
                        <td className="px-5 py-3 text-slate-800">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <blockquote className="border-l-4 border-[#0d7377] pl-5 py-2 mb-10">
                <p className="font-serif-display text-slate-800 text-lg italic">&ldquo;Formación en Valores Cristianos — Rumbo a la Universidad&rdquo;</p>
                <footer className="font-mono-label text-[11px] text-slate-700 mt-1">Lema institucional — I.E.P. Peruano Francés</footer>
              </blockquote>

              <div className="pt-8 border-t border-slate-200">
                <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-1">Organigrama Estructural</h3>
                <p className="text-slate-700 text-sm mb-6">Figura 1. Estructura organizacional oficial de la I.E.P. Peruano Francés</p>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <Image src="/organigrama.jpeg" alt="Organigrama Estructural I.E.P. Peruano Francés" width={800} height={1100} className="w-full h-auto" loading="eager" />
                    <p className="font-mono-label text-[10px] text-center text-slate-700 py-2 bg-slate-50">Fuente: Documento institucional oficial</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-6 bg-white">
                    <p className="font-mono-label text-[10px] font-bold text-slate-700 uppercase tracking-widest text-center mb-5">Diagrama de la Estructura</p>
                    <div className="flex flex-col items-center text-[11px] font-semibold select-none">
                      <div className="border-2 border-dashed border-slate-300 text-slate-700 bg-slate-50 rounded-lg px-5 py-2 text-center leading-snug">
                        Directora de la UGEL N.° 01
                      </div>
                      <div className="w-px h-4 bg-slate-300" />
                      <div className="bg-blue-800 text-white rounded-lg px-6 py-2.5 text-center">
                        Promotora Directora
                      </div>
                      <div className="w-px h-4 bg-blue-300" />
                      <div className="grid grid-cols-3 w-full items-center">
                        <div className="flex items-center justify-end">
                          <div className="border border-slate-200 bg-slate-100 text-slate-800 rounded-lg px-2.5 py-2 text-center leading-snug text-[10px]">
                            Personal<br />Administrativo
                          </div>
                          <div className="w-4 h-px bg-slate-300 flex-shrink-0" />
                        </div>
                        <div className="flex justify-center">
                          <div className="bg-blue-600 text-white rounded-lg px-4 py-2.5 text-center">Sub-Director</div>
                        </div>
                        <div />
                      </div>
                      <div className="w-px h-4 bg-blue-300" />
                      <div className="grid grid-cols-3 w-full items-center">
                        <div />
                        <div className="flex justify-center">
                          <div className="bg-indigo-600 text-white rounded-lg px-4 py-2.5 text-center">Jefa de Normas</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-px bg-slate-300 flex-shrink-0" />
                          <div className="border border-indigo-200 bg-indigo-50 text-indigo-800 rounded-lg px-2 py-2 text-center leading-snug text-[10px]">
                            Coordinadores<br />CC. y LL.
                          </div>
                        </div>
                      </div>
                      <div className="w-px h-4 bg-indigo-300" />
                      <div className="flex gap-2 w-full justify-center">
                        {["Inicial", "Primaria", "Secundaria"].map((n) => (
                          <div key={n} className="bg-teal-600 text-white rounded-lg px-3 py-2 text-center text-[10px] flex-1 max-w-[80px]">
                            Prof. {n}
                          </div>
                        ))}
                      </div>
                      <div className="w-px h-4 bg-teal-300" />
                      <div className="flex gap-3 justify-center">
                        <div className="bg-emerald-600 text-white rounded-lg px-4 py-2.5 text-center">Alumnos</div>
                        <div className="bg-amber-500 text-white rounded-lg px-4 py-2.5 text-center text-[10px]">Padres de<br />Familia</div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-100 w-full flex flex-wrap gap-2 justify-center">
                        {[
                          { c: "bg-blue-800", l: "Alta Dirección" },
                          { c: "bg-blue-600", l: "Dirección Académica" },
                          { c: "bg-indigo-600", l: "Gestión Académica" },
                          { c: "bg-teal-600", l: "Cuerpo Docente" },
                          { c: "bg-emerald-600", l: "Comunidad Educativa" },
                        ].map((x) => (
                          <div key={x.l} className="flex items-center gap-1">
                            <div className={`w-2.5 h-2.5 rounded-full ${x.c}`} />
                            <span className="text-[10px] text-slate-700">{x.l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── PROPUESTA DE VALOR / SOLUCIÓN ── */}
          <section id="solucion" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">00 · Introducción · Propuesta de Valor</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Propuesta de Valor del Sistema</h2>
              <p className="text-slate-700 text-sm mb-8">
                El sistema integra los datos del colegio y aplica Machine Learning<Cite r="Romero & Ventura, 2010" /> para detectar patrones de bajo rendimiento académico y generar alertas tempranas antes de que el problema se agrave.
              </p>

              <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-4">Módulos del Sistema</h3>
              <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                {MODULOS.map((m) => (
                  <div key={m.letra} className={`${m.color} rounded-2xl p-5 text-white hover:-translate-y-1 hover:shadow-lg transition-all`}>
                    <div className="font-mono-label w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-base mb-3">{m.letra}</div>
                    <h3 className="font-serif-display font-bold text-sm mb-2 leading-tight">{m.nombre}</h3>
                    <p className="text-white/80 text-xs leading-relaxed">{m.descripcion}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-4">Funcionalidades Principales</h3>
                  <ul className="space-y-2.5">
                    {["Registro digital de asistencia con lectura de QR desde celular", "Integración con Cubicol para notas e incidencias", "Modelos predictivos ML de bajo rendimiento académico por alumno", "Alertas tempranas automáticas priorizadas por nivel de riesgo", "Dashboard con reportes visuales por aula y grado", "Panel para padres con seguimiento del progreso del alumno"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-800">
                        <span className="text-[#0d7377] flex-shrink-0 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-5">Viabilidad del Proyecto</h3>
                  <div className="space-y-4">
                    {[
                      { tipo: "Viabilidad Técnica", nivel: 90, color: "bg-emerald-500", nota: "Infraestructura y personal disponibles" },
                      { tipo: "Viabilidad Económica", nivel: 78, color: "bg-blue-500", nota: "Bajo costo con tecnología open-source" },
                      { tipo: "Viabilidad Operativa", nivel: 85, color: "bg-purple-500", nota: "Integra sin cambiar flujos actuales" },
                    ].map((v) => (
                      <div key={v.tipo}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold text-slate-700">{v.tipo}</span>
                          <span className="font-mono-label text-slate-800 text-[11px]">{v.nivel}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-1">
                          <div className={`h-full ${v.color} rounded-full transition-all`} style={{ width: `${v.nivel}%` }} />
                        </div>
                        <p className="text-xs text-slate-800">{v.nota}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#e8f5f5] border border-[#c0e0e0] rounded-2xl p-6">
                <h3 className="font-serif-display font-bold text-[#0a5c5f] text-lg mb-2">Resultado Esperado</h3>
                <p className="text-[#0a5c5f] text-sm leading-relaxed">
                  Reducir el bajo rendimiento académico en la I.E.P. Peruano Francés mediante alertas tempranas e intervención oportuna, mejorando los resultados estudiantiles y la toma de decisiones directivas con información centralizada y automatizada.
                </p>
              </div>
            </div>
          </section>

          {/* ── VISITA DE CAMPO ── */}
          <section id="visita" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">00 · Introducción · La Institución en Campo</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">La Institución en Campo</h2>
              <p className="text-slate-700 text-sm mb-8">
                El equipo realizó una visita presencial a la I.E.P. Peruano Francés en Abril de 2026. Se recorrieron las instalaciones, se aplicó el instrumento de entrevista y se recopiló evidencia fotográfica y audiovisual.
              </p>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {PHOTOS.map((p, i) => (
                  <div key={i} className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all"
                    onClick={() => setActivePhoto(i)}>
                    <div className="overflow-hidden">
                      <Image src={p.src} alt={p.caption} width={600} height={450} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-xs text-slate-700 leading-snug">{p.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lightbox */}
          {activePhoto !== null && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActivePhoto(null)}>
              <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                <Image src={PHOTOS[activePhoto].src} alt={PHOTOS[activePhoto].caption} width={1200} height={900} className="w-full h-auto rounded-xl shadow-2xl" />
                <p className="text-white/70 text-center text-sm mt-3">{PHOTOS[activePhoto].caption}</p>
                <button onClick={() => setActivePhoto(null)}
                  className="absolute -top-4 -right-4 bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-lg hover:bg-slate-100">✕</button>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setActivePhoto((activePhoto - 1 + PHOTOS.length) % PHOTOS.length)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-all">← Anterior</button>
                  <span className="text-white/50 text-sm self-center">{activePhoto + 1} / {PHOTOS.length}</span>
                  <button onClick={() => setActivePhoto((activePhoto + 1) % PHOTOS.length)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-all">Siguiente →</button>
                </div>
              </div>
            </div>
          )}

          {/* ── EQUIPO ── */}
          <section id="equipo" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">00 · Introducción · Equipo de Investigación</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Equipo de Investigación</h2>
              <p className="text-slate-700 text-sm mb-8">Escuela Profesional de Ingeniería de Sistemas — Universidad Nacional Tecnológica de Lima Sur (UNTELS)</p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono-label text-[11px] uppercase tracking-wider">#</th>
                      <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono-label text-[11px] uppercase tracking-wider">Apellidos y Nombres</th>
                      <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono-label text-[11px] uppercase tracking-wider">Código</th>
                      <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono-label text-[11px] uppercase tracking-wider hidden sm:table-cell">Institución</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nombre: "Nuñez Figueroa, Henry Brayan", codigo: "2014101295" },
                      { nombre: "Perez Gutierrez, Helber Javier", codigo: "2008100137" },
                      { nombre: "Medina Ccangri, Fernando", codigo: "20a3110232" },
                      { nombre: "Galarza Camarena, Jhostin Jefry", codigo: "2123010051" },
                    ].map((m, i) => (
                      <tr key={m.codigo} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-5 py-3 font-mono-label text-slate-700 text-[11px]">{i + 1}</td>
                        <td className="px-5 py-3 font-semibold text-slate-900">{m.nombre}</td>
                        <td className="px-5 py-3 font-mono-label text-slate-700 text-[11px]">{m.codigo}</td>
                        <td className="px-5 py-3 text-slate-700 hidden sm:table-cell">UNTELS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-4">
                <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {[
                    { dt: "Docente", dd: "Mg. Arqque Pantigozo Antonio" },
                    { dt: "Asignatura", dd: "Formulación y Evaluación de Proyectos TI" },
                    { dt: "Código de curso", dd: "ISR0832" },
                    { dt: "Año académico", dd: "Lima, Perú — 2026" },
                  ].map(({ dt, dd }) => (
                    <div key={dt}>
                      <dt className="font-mono-label text-[10px] text-[#0d7377] uppercase tracking-wider mb-0.5">{dt}</dt>
                      <dd className="font-semibold text-slate-900">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* ── Capítulo 01 — Proceso de Inicio (ITT) ── */}
          <section id="inicio" className="py-12 px-8 lg:px-12 bg-[#0d1f3c] text-white border-b border-slate-700">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono-label text-[11px] bg-[#1a3a5c] text-slate-300 px-2.5 py-1 rounded-lg font-bold flex-shrink-0 mt-0.5">01</span>
              <div>
                <p className="chapter-label text-[#4ec8cc] mb-0.5">Capítulo 01 · PMBOK® 6.ª ed. · Grupo de Proceso: Inicio</p>
                <h2 className="font-serif-display text-2xl font-bold text-white leading-tight">Análisis de Stakeholders</h2>
                <p className="text-slate-400 text-sm mt-1 font-mono-label text-[11px]">Proceso 13.1 — Identificar a los Interesados del Proyecto</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-900/40 border border-blue-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-blue-300 uppercase tracking-wider mb-3">Entradas</p>
                <ol className="space-y-2">
                  {[
                    "Caso de negocio",
                    "Factores ambientales de la empresa",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-blue-100">
                      <span className="font-mono-label text-blue-400 flex-shrink-0 font-bold">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-amber-900/30 border border-amber-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-amber-300 uppercase tracking-wider mb-3">Herramientas y Técnicas</p>
                <ol className="space-y-2">
                  {[
                    "Tormenta de ideas",
                    "Instrumento de recolección de datos",
                    "Entrevista semi-estructurada",
                    "Análisis de datos — Matriz poder/interés",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-amber-100">
                      <span className="font-mono-label text-amber-400 flex-shrink-0 font-bold">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-emerald-300 uppercase tracking-wider mb-3">Salidas</p>
                <ol className="space-y-2">
                  {["Registro de interesados"].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-emerald-100">
                      <span className="font-mono-label text-emerald-400 flex-shrink-0 font-bold">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ── CANVAS — Entrada 1 ── */}
          <section id="canvas" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">01 · Análisis de Stakeholders · Entrada</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-1">Caso de Negocio</h2>
              <p className="text-slate-600 text-sm font-mono-label mb-2">Business Model Canvas</p>
              <p className="text-slate-700 text-sm mb-8">
                Modelo de negocio del sistema inteligente de alerta temprana del bajo rendimiento académico para la I.E.P. Peruano Francés<Cite r="Osterwalder & Pigneur, 2010" />.
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md text-sm">
                <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  <div className="bg-blue-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-blue-700 uppercase tracking-wider mb-3">Socios Clave</p>
                    <ul className="space-y-1.5">
                      {CANVAS.socios.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-blue-400 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-1 divide-y divide-slate-200">
                    <div className="bg-indigo-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-indigo-700 uppercase tracking-wider mb-3">Actividades Clave</p>
                      <ul className="space-y-1.5">
                        {CANVAS.actividades.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-indigo-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-violet-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-violet-700 uppercase tracking-wider mb-3">Recursos Clave</p>
                      <ul className="space-y-1.5">
                        {CANVAS.recursos.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-violet-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-rose-600 p-5 text-white">
                    <p className="font-mono-label text-[10px] font-black text-rose-200 uppercase tracking-wider mb-3">Propuesta de Valor</p>
                    <ul className="space-y-2">
                      {CANVAS.propuesta.map((i) => <li key={i} className="text-xs text-white/90 flex gap-1.5"><span className="text-rose-300 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-1 divide-y divide-slate-200">
                    <div className="bg-amber-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-amber-700 uppercase tracking-wider mb-3">Relación con Clientes</p>
                      <ul className="space-y-1.5">
                        {CANVAS.relacion.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-amber-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-orange-700 uppercase tracking-wider mb-3">Canales</p>
                      <ul className="space-y-1.5">
                        {CANVAS.canales.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-orange-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-3">Segmentos de Clientes</p>
                    <ul className="space-y-1.5">
                      {CANVAS.segmentos.map((i) => <li key={i} className="text-xs text-slate-800 flex gap-1.5"><span className="text-emerald-400 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200">
                  <div className="bg-slate-100 p-5">
                    <p className="font-mono-label text-[10px] font-black text-slate-700 uppercase tracking-wider mb-3">Estructura de Costos</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {CANVAS.costos.map((i) => (
                        <li key={i} className="text-xs text-slate-800 flex gap-1.5 items-start">
                          <span className="text-slate-500 flex-shrink-0">·</span>{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-teal-700 uppercase tracking-wider mb-3">Fuentes de Ingresos / Valor</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {CANVAS.ingresos.map((i) => (
                        <li key={i} className="text-xs text-slate-800 flex gap-1.5 items-start">
                          <span className="text-teal-400 flex-shrink-0">·</span>{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FACTORES — Entrada 2 ── */}
          <section id="factores" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">01 · Análisis de Stakeholders · Entrada</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Factores Ambientales de la Empresa</h2>
              <p className="text-slate-700 text-sm mb-8">Condicionantes del éxito o fracaso del proyecto — factores no controlables directamente por el equipo<Cite r="PMI, 2017" />.</p>

              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                <div>
                  <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <span className="font-mono-label w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">I</span>
                    Factores Internos
                  </h3>
                  <div className="space-y-3">
                    {FACTORES_INTERNOS.map((f) => (
                      <div key={f.factor} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-semibold text-teal-800 text-sm mb-1">{f.factor}</h4>
                        <p className="text-slate-700 text-xs leading-relaxed">{f.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <span className="font-mono-label w-6 h-6 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">E</span>
                    Factores Externos
                  </h3>
                  <div className="space-y-3">
                    {FACTORES_EXTERNOS.map((f) => (
                      <div key={f.factor} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-semibold text-orange-800 text-sm mb-1">{f.factor}</h4>
                        <p className="text-slate-700 text-xs leading-relaxed">{f.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-10">
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">Activos de los Procesos de la Organización</h3>
                <p className="text-slate-700 text-sm mb-6">Recursos, conocimientos y herramientas que la institución aporta al proyecto<Cite r="PMI, 2017" />.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {ACTIVOS.map((a) => (
                    <div key={a.titulo} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <h4 className="font-serif-display font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100">{a.titulo}</h4>
                      <ul className="space-y-1.5">
                        {a.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-xs text-slate-800">
                            <span className="text-[#0d7377] mt-0.5 flex-shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ENTREVISTA — Herramienta 3 ── */}
          <section id="entrevista" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">01 · Análisis de Stakeholders · Herramienta y Técnica</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Entrevista a la Institución</h2>
              <p className="text-slate-700 text-sm mb-8">
                Instrumento semi-estructurado aplicado a la directora y personal de tecnología del colegio durante la visita de campo.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-4">Ficha de la Entrevista</h3>
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Entrevistados", "Directora y encargada de plataforma Cubicol"],
                      ["Fecha", "Abril de 2026"],
                      ["Lugar", "Oficina de dirección — I.E.P. Peruano Francés"],
                      ["Modalidad", "Presencial — entrevista semi-estructurada"],
                      ["Bloques", "8 bloques temáticos / 12 preguntas"],
                      ["Registro", "Video, audio y fotografías"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="font-mono-label font-semibold text-[#0d7377] min-w-[90px] flex-shrink-0 text-[11px] self-center">{k}</dt>
                        <dd className="text-slate-800">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-4">Bloques del Instrumento</h3>
                  <ol className="space-y-2">
                    {["Datos generales de la institución", "Situación actual sobre deserción escolar", "Problemas identificados en el seguimiento", "Tecnología actual y sistemas en uso", "Necesidades del usuario (dirección/docentes)", "Factibilidad de implementar solución TI", "Preguntas específicas para docentes/tutores", "Preguntas para el director o coordinador"].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-800">
                        <span className="font-mono-label w-5 h-5 rounded-full bg-[#e8f5f5] text-[#0d7377] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        {b}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-6">
                <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-5">Hallazgos Clave — Resumen Ejecutivo</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { num: "1", t: "Asistencia 100% manual", d: "Registro físico en cuadernos por docentes y auxiliares, sin trazabilidad digital ni alertas automáticas." },
                    { num: "2", t: "Incidencias por WhatsApp", d: "Las incidencias se notifican a los padres por WhatsApp o correo. Sin registro centralizado ni respuesta garantizada." },
                    { num: "3", t: "40% padres no usa la plataforma", d: "El 40% de padres de familia no tiene el hábito de ingresar a Cubicol, limitando la comunicación efectiva con la institución." },
                    { num: "4", t: "Apertura al QR", d: "La directora expresó total interés en el QR para control de asistencia y notificación puntual a los padres." },
                    { num: "5", t: "Disposición institucional", d: "La directora ofrece acceso a los datos del colegio para formular y evaluar una solución tecnológica adecuada." },
                    { num: "6", t: "Necesidad prioritaria", d: "Control digitalizado de asistencia que permita visualizar el progreso del alumno durante todo el año escolar." },
                  ].map((h) => (
                    <div key={h.t} className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="font-mono-label w-7 h-7 rounded-full bg-[#e8f5f5] text-[#0a5c5f] text-[11px] font-bold flex items-center justify-center mb-2">{h.num}</div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{h.t}</h4>
                      <p className="text-slate-700 text-xs leading-relaxed">{h.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl p-7 text-white mb-8">
                <h3 className="font-serif-display font-bold text-lg mb-4">Conclusiones de la Entrevista</h3>
                <ul className="space-y-2.5">
                  {[
                    "La institución opera con procesos manuales que generan inconsistencias y dificultan la detección temprana del riesgo de deserción.",
                    "Existe infraestructura tecnológica suficiente (internet 1000 Mbps, Cubicol, personal TI) para soportar una solución digital sin grandes inversiones.",
                    "La directora y el personal de tecnología tienen disposición activa y están abiertos a participar en el proyecto.",
                    "El sistema debe ser simple, accesible desde dispositivos móviles y compatible con la plataforma Cubicol ya instalada.",
                    "Las principales causas de deserción identificadas: factores económicos, cambio de vivienda y traslado a colegios estatales.",
                  ].map((c, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                      <span className="text-[#4ec8cc] flex-shrink-0 font-bold">→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-6">
                <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-2">Video de la Entrevista</h3>
                <p className="font-mono-label text-slate-800 text-[10px] mb-4">Grabación de la sesión de entrevista con la directora de la I.E.P. Peruano Francés — Abril 2026</p>
                <video controls className="w-full max-w-lg mx-auto block rounded-xl shadow border border-slate-100" preload="metadata">
                  <source src="/entrevista.mp4" type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-1">Carpeta de Evidencias del Equipo</h3>
                  <p className="text-slate-700 text-sm">Accede a todos los documentos, fotografías, grabaciones y archivos del proyecto en Google Drive.</p>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/1z33A6WEsA_c8dG4UWaxbnaLNTMgPQo2S?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow hover:shadow-lg text-sm"
                >
                  Ver en Google Drive ↗
                </a>
              </div>
            </div>
          </section>

          {/* ── STAKEHOLDERS — Herramienta 4 + Salida 1 ── */}
          <section id="stakeholders" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">01 · Análisis de Stakeholders · Salida</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Registro de Interesados</h2>
              <p className="text-slate-700 text-sm mb-8">
                Identificación, análisis de poder/interés, expectativas, plan de involucramiento y plan de comunicación de todos los interesados del proyecto<Cite r="PMI, 2017" />.
              </p>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                Registro de Stakeholders
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Stakeholder / Cargo</th>
                      <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Contacto / Ubicación</th>
                      <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Rol</th>
                      <th className="px-4 py-3 text-center font-semibold">Interés</th>
                      <th className="px-4 py-3 text-center font-semibold">Poder</th>
                      <th className="px-4 py-3 text-center font-semibold hidden md:table-cell">Estrategia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAKEHOLDERS.map((s, i) => (
                      <tr key={s.nombre} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800 text-sm">{s.nombre}</p>
                          <p className="text-xs text-slate-700">{s.cargo}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-700 text-xs hidden lg:table-cell">{s.contacto}</td>
                        <td className="px-4 py-3 text-slate-700 text-sm hidden sm:table-cell">{s.rol}</td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(s.interes)}`}>{s.interes}</span></td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(s.poder)}`}>{s.poder}</span></td>
                        <td className="px-4 py-3 text-center hidden md:table-cell"><span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getEst(s.estrategia)}`}>{s.estrategia}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 id="mapa-actores" className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                Mapa de Actores
              </h3>

              <div className="mb-10">
                <div className="relative flex flex-col items-center gap-4">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-900 text-white text-center shadow-xl border-4 border-white">
                    <span className="font-serif-display text-lg font-black leading-none">ML</span>
                    <span className="font-mono-label text-[9px] font-bold leading-tight mt-0.5">Sistema<br />Inteligente</span>
                  </div>
                  {MAPA_ACTORES.map((zona) => (
                    <div key={zona.zona} className={`w-full border-2 rounded-2xl p-5 ${zona.color}`}>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${zona.colorBadge}`}>{zona.zona}</span>
                        <span className={`text-xs ${zona.colorTexto} opacity-70`}>{zona.descripcion}</span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {zona.actores.map((a) => (
                          <div key={a.nombre} className="bg-white/70 rounded-xl p-3 flex gap-3 items-center">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${zona.colorBadge}`}>
                              {a.nombre.charAt(0)}
                            </span>
                            <div>
                              <p className={`font-semibold text-xs ${zona.colorTexto}`}>{a.nombre}</p>
                              <p className="text-slate-700 text-xs leading-tight">{a.relacion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 id="matriz-poder" className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                Matriz de Poder e Interés
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { zona: "Alto Poder · Alto Interés", bg: "bg-blue-700", est: "GESTIONAR DE CERCA", actores: ["Promotora Directora", "Subdirector", "Área de TI"] },
                  { zona: "Alto Poder · Medio Interés", bg: "bg-indigo-600", est: "MANTENER INVOLUCRADOS", actores: ["Docentes", "Jefa de Normas y Coordinadores", "Psicólogo Escolar"] },
                  { zona: "Bajo Poder · Alto Interés", bg: "bg-amber-600", est: "MANTENER SATISFECHOS", actores: ["Padres de Familia", "Estudiantes"] },
                  { zona: "Bajo Poder · Bajo Interés", bg: "bg-slate-500", est: "MANTENER INFORMADOS", actores: ["Personal Administrativo"] },
                ].map((z) => (
                  <div key={z.zona} className={`${z.bg} rounded-2xl p-5 text-white`}>
                    <p className="font-mono-label text-[10px] font-semibold opacity-70 mb-1 uppercase tracking-wider">{z.zona}</p>
                    <p className="font-black text-sm mb-3">{z.est}</p>
                    <div className="flex flex-wrap gap-2">
                      {z.actores.map((a) => <span key={a} className="bg-white/20 text-xs px-3 py-1 rounded-full">{a}</span>)}
                    </div>
                  </div>
                ))}
              </div>

              <h3 id="expectativas" className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">4</span>
                Análisis de Expectativas
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {[
                  { q: "Promotora Directora", a: "Mejorar la toma de decisiones estratégicas y reducir la deserción escolar para mantener una matrícula estable." },
                  { q: "Docentes", a: "Herramientas que faciliten el seguimiento de estudiantes sin incrementar su carga de trabajo diaria." },
                  { q: "Psicólogo Escolar", a: "Identificar temprana y confiablemente a los estudiantes en riesgo para intervenir con efectividad." },
                  { q: "Padres de Familia", a: "Recibir información oportuna y comprensible sobre el desempeño y asistencia de sus hijos." },
                  { q: "Estudiantes", a: "Recibir acompañamiento personalizado antes de llegar a una situación de abandono escolar." },
                  { q: "Área de TI", a: "Implementar una solución funcional, compatible con Cubicol y sostenible a largo plazo con recursos propios." },
                ].map((e) => (
                  <div key={e.q} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="font-serif-display font-bold text-amber-800 text-sm mb-1.5">{e.q}</p>
                    <p className="text-slate-800 text-xs leading-relaxed">{e.a}</p>
                  </div>
                ))}
              </div>

              <h3 id="comunicacion" className="font-serif-display font-bold text-slate-900 text-xl mb-4 mt-10 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">5</span>
                Plan de Comunicación
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Stakeholder</th>
                      <th className="px-4 py-3 text-left font-semibold">Medio de Comunicación</th>
                      <th className="px-4 py-3 text-center font-semibold">Frecuencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Promotora Directora", "Reuniones formales presenciales", "Semanal"],
                      ["Docentes", "Reuniones / Plataforma digital interna", "Semanal"],
                      ["Área de TI", "Reuniones técnicas y reportes", "Semanal"],
                      ["Padres de Familia", "Comunicados / Plataforma Cubicol", "Semanal"],
                      ["Estudiantes", "Plataforma educativa", "Continua"],
                    ].map(([s, m, f], i) => (
                      <tr key={s} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{s}</td>
                        <td className="px-4 py-3 text-slate-700">{m}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-mono-label bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-[10px] font-semibold px-2 py-0.5 rounded-full">{f}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 id="seguimiento" className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">6</span>
                Seguimiento y Nivel de Involucramiento
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {MONITOREO.map((m) => (
                  <div key={m.nombre} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{m.nombre}</p>
                        <span className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${m.color}`}>{m.estado}</span>
                      </div>
                      <span className="font-mono-label text-2xl font-black text-slate-700">{m.nivel}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                      <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: `${m.nivel}%` }} />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{m.accion}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ── Capítulo 02 — Análisis del Problema (ITT) ── */}
          <section className="py-12 px-8 lg:px-12 bg-[#0d1f3c] text-white border-b border-slate-700">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono-label text-[11px] bg-[#1a3a5c] text-slate-300 px-2.5 py-1 rounded-lg font-bold flex-shrink-0 mt-0.5">02</span>
              <div>
                <p className="chapter-label text-[#4ec8cc] mb-0.5">Capítulo 02 · PMBOK® 6.ª edición</p>
                <h2 className="font-serif-display text-2xl font-bold text-white leading-tight">Análisis del Problema</h2>
                <p className="text-slate-400 text-sm mt-1 font-mono-label text-[11px]">Marco Lógico — Árbol de Problemas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-900/40 border border-blue-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-blue-300 uppercase tracking-wider mb-3">Entradas</p>
                <p className="text-blue-200 text-xs">Situación actual de la IE Peruano Francés (entrevista con directora + documento de avance del proyecto)</p>
              </div>
              <div className="bg-amber-900/30 border border-amber-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-amber-300 uppercase tracking-wider mb-3">Herramientas y Técnicas</p>
                <p className="text-amber-200 text-xs">Marco Lógico (Árbol de Problemas) + Encuesta Docente (Google Forms, 11 ítems) + Design Thinking (Empatizar + Definir: mapas de empatía + POV + HMW)</p>
              </div>
              <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-emerald-300 uppercase tracking-wider mb-3">Salidas</p>
                <p className="text-emerald-200 text-xs">Enunciado del Problema Central y árbol de causas–efectos validado por la institución</p>
              </div>
            </div>
          </section>

          <section id="p02-entradas" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Entrada</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-6">Descripción de la Problemática</h2>
              <div className="prose prose-sm max-w-3xl space-y-4 text-slate-700">
                <p>
                  En muchas instituciones educativas de América Latina, el seguimiento del rendimiento académico se realiza de manera manual o mediante sistemas que únicamente almacenan notas y asistencias sin generar análisis predictivos<Cite r="UNESCO, 2022" />. Esta situación dificulta identificar oportunamente a estudiantes que presentan bajo desempeño académico, limitando la capacidad de intervención oportuna de docentes y directivos<Cite r="Romero & Ventura, 2010" />.
                </p>
                <p>
                  En la IE Peruano Francés, institución con 200 estudiantes en niveles inicial, primaria y secundaria, los registros académicos se gestionan a través de la plataforma Cubicol y de procesos manuales en papel. Sin embargo, <strong>no se cuenta con una herramienta inteligente</strong> que permita analizar de manera integrada variables como:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Asistencia (actualmente registrada en papel)</li>
                  <li>Calificaciones y evolución del desempeño académico</li>
                  <li>Participación en clase</li>
                  <li>Incidencias conductuales (reportadas vía WhatsApp/correo)</li>
                  <li>Cumplimiento de tareas</li>
                </ul>
                <p>
                  Debido a ello, las intervenciones por parte de docentes y directivos suelen realizarse <strong>cuando el problema académico ya se encuentra avanzado</strong>, afectando el aprendizaje, la motivación y el desempeño general de los estudiantes. La dispersión de información en distintos sistemas dificulta el monitoreo personalizado y continuo de cada alumno, provocando retrasos críticos en la toma de decisiones pedagógicas<Cite r="Márquez-Vera et al., 2013" />.
                </p>
                <p className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <strong>Necesidad identificada:</strong> Formular un sistema inteligente basado en Machine Learning que permita analizar patrones académicos multivariable y generar alertas tempranas sobre estudiantes con riesgo de bajo rendimiento en la IE Peruano Francés<Cite r="Márquez-Vera et al., 2013" />.
                </p>
              </div>
            </div>
          </section>

          <section id="p02-herramientas" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Herramienta y Técnica</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-6">Análisis del Problema (Marco Lógico + Encuesta Docente)</h2>
              <p className="text-slate-600 mb-8 max-w-3xl">
                Para identificar la problemática central de la institución, se aplicaron dos metodologías complementarias:
              </p>
              
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">1. Metodología del Marco Lógico</h3>
                <p className="text-slate-600 mb-6 max-w-3xl">
                  De acuerdo con la metodología del Marco Lógico, el análisis del problema permite identificar la situación negativa principal, sus causas y sus efectos, estableciendo relaciones de causa–efecto que justifican el desarrollo del proyecto<Cite r="CEPAL/ILPES, 2005" />. A partir de este análisis estructurado, aplicado con base en los procesos de inicio del PMBOK® 6.ª edición<Cite r="PMI, 2017" />, se identificaron las causas raíz del problema central:
                </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="border border-slate-300 rounded-lg p-6 bg-white">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">→</span> Causas Directas
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Falta de herramientas de análisis predictivo académico</li>
                    <li>• Seguimiento manual del desempeño estudiantil</li>
                    <li>• Información académica dispersa en diferentes sistemas</li>
                    <li>• Ausencia de alertas tempranas automatizadas</li>
                  </ul>
                </div>
                <div className="border border-slate-300 rounded-lg p-6 bg-white">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">→</span> Causas Indirectas
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Limitado uso de tecnologías de inteligencia artificial</li>
                    <li>• Procesos tradicionales de monitoreo académico</li>
                    <li>• Escasa integración de bases de datos institucionales</li>
                    <li>• Falta de indicadores académicos en tiempo real</li>
                  </ul>
                </div>
                <div className="border border-red-300 rounded-lg p-6 bg-red-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">↓</span> Efectos Directos
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Intervenciones tardías por parte de docentes</li>
                    <li>• Bajo desempeño académico sostenido</li>
                    <li>• Dificultad en la toma de decisiones pedagógicas</li>
                  </ul>
                </div>
                <div className="border border-red-300 rounded-lg p-6 bg-red-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">↓</span> Efectos Indirectos
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Desmotivación estudiantil</li>
                    <li>• Incremento de estudiantes desaprobados</li>
                    <li>• Disminución del rendimiento institucional</li>
                    <li>• Riesgo de abandono escolar a largo plazo</li>
                  </ul>
                </div>
              </div>
              </div>
              
              <hr className="my-10 border-slate-300" />
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">2. Encuesta Docente sobre Seguimiento Académico (Google Forms)</h3>
                <p className="text-slate-600 mb-6 max-w-3xl">
                  Se desarrolló una encuesta digital mediante Google Forms dirigida a los 16 docentes y auxiliares de la IE Peruano Francés para validar la percepción institucional sobre el seguimiento académico estudiantil. Esta técnica de recolección de datos primarios es consistente con la literatura sobre detección temprana del bajo rendimiento<Cite r="Márquez-Vera et al., 2013" />. La encuesta incluye 11 preguntas estructuradas que exploran:
                </p>
                <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Temas Evaluados:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Experiencia y práctica docente</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Frecuencia de seguimiento académico</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Disponibilidad de herramientas actuales</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Dificultad en detección temprana</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Factores que afectan rendimiento</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Información relevante para detectar riesgo</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Oportunidad de detección de problemas</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Aceptación de sistemas de IA/ML</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Utilidad de alertas tempranas</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Disposición de uso de plataforma</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Mejoras necesarias en seguimiento</li>
                  </ul>
                </div>
                <p className="text-slate-600 text-sm mb-6">
                  <strong>Objetivo:</strong> Recopilar evidencia cualitativa que valide la necesidad del sistema inteligente, identifique barreras actuales en el seguimiento académico y mida la receptividad docente hacia soluciones tecnológicas innovadoras basadas en Machine Learning.
                </p>
                <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">¿Deseas participar en la encuesta?</p>
                    <p className="text-xs text-slate-600 mt-1">Accede al formulario de Google Forms</p>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/1LN6uAT6pnceHI7a77IrxZnJov6myUH3BFOSWjrWxHdU/viewform?chromeless=1&edit_requested=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                  >
                    Responder Encuesta →
                  </a>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-slate-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Visualización: Árbol de Problemas</h3>
                <p className="text-slate-600 mb-6 max-w-3xl">
                  La siguiente imagen representa el árbol de problemas construido mediante el análisis del Marco Lógico. Muestra de manera visual las relaciones causa-efecto entre el problema central, sus causas raíz y los efectos generados, facilitando la comprensión integral de la situación negativa identificada en la institución.
                </p>
                <div className="relative w-full h-auto rounded-lg overflow-hidden border border-slate-300 shadow-md">
                  <Image
                    src="/arbol-problemas.png"
                    alt="Árbol de Problemas - Análisis de causas y efectos"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Design Thinking ── */}
          <section id="p02-design-thinking" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Herramienta 3</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-2">Design Thinking — Empatizar y Definir</h2>
              <p className="text-slate-600 mb-10 max-w-3xl text-sm">
                Complementando el Marco Lógico, se aplicó Design Thinking como enfoque centrado en el usuario para comprender en profundidad las necesidades reales de los actores clave e identificar el problema desde su perspectiva. Las fases de <strong>Empatizar</strong> y <strong>Definir</strong> son las que corresponden al análisis del problema.
              </p>

              {/* Fase 1: Empatizar */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#0d1f3c] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                  <div>
                    <p className="font-mono-label text-[10px] text-slate-500 uppercase tracking-wider">Fase 1 — Design Thinking</p>
                    <h3 className="font-serif-display text-xl font-bold text-slate-900">Empatizar</h3>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-8 max-w-3xl">
                  A partir de la entrevista con la Directora y el Área TI, y de los resultados de la encuesta docente, se construyeron los mapas de empatía para los tres usuarios primarios del sistema.
                </p>

                <div className="space-y-6">
                  {MAPA_EMPATIA.map((u) => (
                    <div key={u.usuario} className={`border-l-4 ${u.color} rounded-r-2xl overflow-hidden shadow-sm`}>
                      <div className={`${u.colorBg} px-6 py-4 border-b border-slate-200 flex items-center gap-3`}>
                        <span className={`${u.colorLabel} text-white font-bold text-xs px-3 py-1 rounded-full`}>{u.usuario}</span>
                        <p className="text-slate-600 text-sm">{u.cargo}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white">
                        {[
                          { label: "Piensa y Siente", items: u.piensa,       icon: "💭" },
                          { label: "Ve",              items: u.ve,            icon: "👁" },
                          { label: "Dice y Hace",     items: u.dice,          icon: "💬" },
                          { label: "Frustraciones",   items: u.frustraciones, icon: "⚡" },
                          { label: "Motivaciones",    items: u.motivaciones,  icon: "🎯" },
                        ].map((bloque) => (
                          <div key={bloque.label} className="p-4">
                            <p className="font-mono-label text-[10px] text-slate-500 uppercase tracking-wider mb-2">{bloque.icon} {bloque.label}</p>
                            <ul className="space-y-1.5">
                              {bloque.items.map((it, i) => (
                                <li key={i} className="text-xs text-slate-700 leading-snug flex items-start gap-1.5">
                                  <span className="text-slate-400 flex-shrink-0 mt-0.5">·</span>
                                  {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fase 2: Definir */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#0d1f3c] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                  <div>
                    <p className="font-mono-label text-[10px] text-slate-500 uppercase tracking-wider">Fase 2 — Design Thinking</p>
                    <h3 className="font-serif-display text-xl font-bold text-slate-900">Definir</h3>
                  </div>
                </div>

                {/* POV */}
                <div className="bg-[#0d1f3c] rounded-2xl p-8 mb-8 max-w-3xl">
                  <p className="font-mono-label text-[10px] text-[#4ec8cc] uppercase tracking-wider mb-3">Enunciado POV — Point of View</p>
                  <p className="text-white text-lg font-serif-display leading-relaxed">
                    "El docente de la IE Peruano Francés{" "}
                    <span className="text-[#4ec8cc]">necesita</span> detectar tempranamente el bajo rendimiento académico de sus alumnos,{" "}
                    <span className="text-[#4ec8cc]">porque</span> el seguimiento actual es manual, disperso y reactivo, lo que retrasa las intervenciones pedagógicas hasta que el problema ya es grave."
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-4 text-xs text-slate-400">
                    <div><span className="text-[#4ec8cc] font-bold block mb-0.5">USUARIO</span>Docente de la IE Peruano Francés</div>
                    <div><span className="text-[#4ec8cc] font-bold block mb-0.5">NECESIDAD</span>Detectar bajo rendimiento a tiempo</div>
                    <div><span className="text-[#4ec8cc] font-bold block mb-0.5">INSIGHT</span>El proceso manual retrasa la acción</div>
                  </div>
                </div>

                {/* HMW */}
                <p className="font-mono-label text-[10px] text-slate-500 uppercase tracking-wider mb-4">¿Cómo Podríamos…? — How Might We</p>
                <div className="space-y-4 max-w-4xl">
                  {HMW.map((h, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-4">
                        <span className="font-mono-label text-[11px] bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded font-bold flex-shrink-0">HMW {i + 1}</span>
                        <div className="flex-1">
                          <p className="text-slate-900 font-semibold text-sm mb-2">{h.pregunta}</p>
                          <p className="text-slate-500 text-xs mb-3">
                            <span className="font-semibold text-slate-600">Insight:</span> {h.insight}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono-label text-slate-400">→</span>
                            <span className="text-xs text-[#0d7377] font-medium bg-[#e8f5f5] border border-[#c0e0e0] px-2 py-0.5 rounded">{h.vinculo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="p02-evidencias" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Evidencia</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-6">Evidencias: Respuestas de Docentes</h2>
              <p className="text-slate-600 mb-8 max-w-3xl">
                Las siguientes fotografías muestran ejemplos reales de las respuestas obtenidas en la encuesta de Google Forms aplicada a los docentes de la IE Peruano Francés. Estas respuestas validan la necesidad identificada y demuestran la receptividad del equipo docente hacia soluciones de detección temprana basadas en análisis de datos e inteligencia artificial.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { num: 1, title: "Primer docente" },
                  { num: 2, title: "Segundo docente" },
                  { num: 3, title: "Tercer docente" },
                  { num: 4, title: "Cuarto docente" },
                  { num: 5, title: "Quinto docente" },
                  { num: 6, title: "Sexto docente" },
                ].map((encuesta) => (
                  <div key={encuesta.num} className="border border-slate-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-slate-100 p-3 border-b border-slate-300">
                      <h4 className="font-semibold text-slate-900 text-sm">{encuesta.title}</h4>
                    </div>
                    <div className="relative w-full h-64 bg-slate-50">
                      <Image
                        src={`/Encuesta${encuesta.num}.jpg`}
                        alt={`Respuesta de encuesta - ${encuesta.title}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-3 bg-white border-t border-slate-300">
                      <p className="text-xs text-slate-600 font-mono">Encuesta{encuesta.num}.jpg</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mt-6">
                <p className="text-sm text-slate-700">
                  <strong>Interpretación:</strong> Las respuestas documentadas evidencian que los docentes reconocen la dificultad actual en detectar tempranamente problemas académicos, validan la necesidad de herramientas más eficientes de monitoreo, y expresan disposición a utilizar sistemas tecnológicos innovadores. Esto refuerza la justificación del proyecto.
                </p>
              </div>
            </div>
          </section>

          {/* ── Resultados encuesta ── */}
          <section id="p02-resultados" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Resultados del Instrumento</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-2">Resultados de la Encuesta Docente</h2>
              <p className="text-slate-600 mb-2 max-w-3xl text-sm">
                Análisis descriptivo de las 6 respuestas recibidas. Instrumento: Google Forms, 11 preguntas, aplicado a docentes y auxiliares de la IE Peruano Francés<Cite r="Márquez-Vera et al., 2013" />.
              </p>

              {/* Ficha técnica */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mb-10">
                {[
                  { label: "Respuestas",        val: "6",      sub: "de 16 docentes/auxiliares" },
                  { label: "Tasa de respuesta",  val: "37.5%",  sub: "muestra indicativa" },
                  { label: "Preguntas",          val: "11",     sub: "10 cerradas + 1 abierta" },
                  { label: "Valores nulos",      val: "0",      sub: "instrumento completo" },
                ].map((f) => (
                  <div key={f.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-[#0d7377]">{f.val}</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{f.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{f.sub}</p>
                  </div>
                ))}
              </div>

              {/* Preguntas 1–10 */}
              <div className="space-y-10">
                {ENCUESTA_PREGUNTAS.map((p) => (
                  <div key={p.num} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-800 px-6 py-3 flex items-center gap-3">
                      <span className="font-mono-label text-[11px] bg-slate-600 text-slate-200 px-2 py-0.5 rounded font-bold">P{p.num}</span>
                      <p className="text-white text-sm font-medium leading-snug">{p.texto}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      {/* Gráfico */}
                      <div className="p-4 flex items-center justify-center bg-white">
                        <div className="relative w-full" style={{ maxWidth: 480 }}>
                          <Image
                            src={p.img}
                            alt={`Resultados P${p.num}`}
                            width={480}
                            height={300}
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      </div>
                      {/* Tabla + hallazgo */}
                      <div className="p-5 flex flex-col justify-between">
                        <table className="w-full text-sm mb-4">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="text-left text-xs text-slate-500 font-mono-label pb-2">Opción</th>
                              <th className="text-center text-xs text-slate-500 font-mono-label pb-2">n</th>
                              <th className="text-right text-xs text-slate-500 font-mono-label pb-2">%</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {p.filas.map((f) => (
                              <tr key={f.opcion}>
                                <td className="py-1.5 text-slate-700 text-xs">{f.opcion}</td>
                                <td className="py-1.5 text-center text-slate-700 text-xs font-mono">{f.n}</td>
                                <td className="py-1.5 text-right text-slate-700 text-xs font-mono">{f.pct}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-emerald-800">Hallazgo clave</p>
                          <p className="text-xs text-slate-700 mt-0.5">{p.hallazgo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* P11 abierta */}
              <div className="mt-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-800 px-6 py-3 flex items-center gap-3">
                  <span className="font-mono-label text-[11px] bg-slate-600 text-slate-200 px-2 py-0.5 rounded font-bold">P11</span>
                  <p className="text-white text-sm font-medium">¿Qué mejoras considera necesarias para fortalecer el seguimiento académico de los estudiantes?</p>
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-500 mb-4 font-mono-label uppercase tracking-wider">Pregunta abierta — respuestas textuales codificadas</p>
                  <ul className="space-y-2">
                    {ENCUESTA_P11.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="font-mono-label text-[10px] bg-[#e8f5f5] text-[#0d7377] px-1.5 py-0.5 rounded font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-slate-700"><strong>Síntesis:</strong> Los docentes demandan control digital integrado de notas y asistencia, tutorías personalizadas y uso de datos para monitoreo — convergente con los módulos planificados del sistema.</p>
                  </div>
                </div>
              </div>

              {/* Hallazgos clave resumen */}
              <div className="mt-10 bg-slate-800 rounded-2xl p-6 text-white">
                <h3 className="font-serif-display text-lg font-bold mb-4">Hallazgos Clave — Validación del Instrumento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { pct: "100%", desc: "reconoce detección tardía de problemas (P7)", color: "bg-red-500" },
                    { pct: "83.3%", desc: "acepta la solución ML (P8)", color: "bg-emerald-500" },
                    { pct: "100%", desc: "valora las alertas tempranas como útiles o muy útiles (P9)", color: "bg-emerald-500" },
                    { pct: "83.3%", desc: "usaría la plataforma tecnológica (P10)", color: "bg-blue-500" },
                    { pct: "50%",   desc: "reconoce herramientas insuficientes (P3)", color: "bg-amber-500" },
                    { pct: "66.7%", desc: "necesita datos integrados multivariable (P6)", color: "bg-purple-500" },
                  ].map((h) => (
                    <div key={h.desc} className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                      <span className={`${h.color} text-white font-bold text-sm px-2 py-1 rounded flex-shrink-0`}>{h.pct}</span>
                      <p className="text-slate-200 text-sm">{h.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-4">
                  Nota: N=6 (37.5% de tasa de respuesta sobre 16 docentes/auxiliares). Resultados indicativos — no estadísticamente representativos dado el tamaño muestral.
                </p>
              </div>
            </div>
          </section>

          <section id="p02-salidas" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">02 · Análisis del Problema · Salida</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-8">Problema Central Identificado</h2>
              <div className="max-w-3xl">
                <div className="border-l-4 border-red-600 bg-red-50 p-6 rounded-r-lg mb-10">
                  <h3 className="text-sm font-mono-label text-red-700 uppercase tracking-wider mb-2">Problema Central</h3>
                  <p className="text-2xl font-serif-display text-slate-900 leading-tight">
                    "Deficiente detección temprana del bajo rendimiento académico estudiantil."
                  </p>
                </div>
                <div className="bg-slate-100 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Efecto Final del Problema</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Afectación de la calidad educativa institucional</strong> — La falta de detección temprana genera una cascada de efectos negativos que impacta directamente en el rendimiento académico sostenido, la motivación estudiantil y la calidad educativa de la IE Peruano Francés.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 border-t border-slate-200 pt-3">
                    <li>↓ Bajo rendimiento académico sostenido sin intervención oportuna</li>
                    <li>↓ Desmotivación y desvinculación progresiva del estudiante</li>
                    <li>↓ Incremento de estudiantes desaprobados al cierre de año escolar</li>
                    <li>↓ Deterioro de indicadores de calidad educativa institucional<Cite r="MINEDU, 2023" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── Capítulo 03 — Análisis del Objetivo (ITT) ── */}
          <section className="py-12 px-8 lg:px-12 bg-[#0d1f3c] text-white border-b border-slate-700">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono-label text-[11px] bg-[#1a3a5c] text-slate-300 px-2.5 py-1 rounded-lg font-bold flex-shrink-0 mt-0.5">03</span>
              <div>
                <p className="chapter-label text-[#4ec8cc] mb-0.5">Capítulo 03 · PMBOK® 6.ª edición</p>
                <h2 className="font-serif-display text-2xl font-bold text-white leading-tight">Análisis del Objetivo</h2>
                <p className="text-slate-400 text-sm mt-1 font-mono-label text-[11px]">Árbol de Objetivos — Marco Lógico</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-900/40 border border-blue-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-blue-300 uppercase tracking-wider mb-3">Entradas</p>
                <p className="text-blue-200 text-xs">Problema Central identificado en Cap. 02: "Deficiente detección temprana del bajo rendimiento académico estudiantil"</p>
              </div>
              <div className="bg-amber-900/30 border border-amber-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-amber-300 uppercase tracking-wider mb-3">Herramientas y Técnicas</p>
                <p className="text-amber-200 text-xs">Árbol de Objetivos: inversión positiva del árbol de problemas — causas → medios, efectos → fines, problema → objetivo central</p>
              </div>
              <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl p-5">
                <p className="font-mono-label text-[10px] text-emerald-300 uppercase tracking-wider mb-3">Salidas</p>
                <p className="text-emerald-200 text-xs">Objetivo Central del Proyecto y estructura de medios–fines que orienta el diseño del sistema inteligente</p>
              </div>
            </div>
          </section>

          <section id="p03-entradas" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">03 · Análisis del Objetivo · Entrada</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-6">Entrada: Problema Central</h2>
              <div className="prose prose-sm max-w-3xl space-y-4 text-slate-700">
                <p>
                  El análisis del objetivo parte de la situación negativa identificada en el Cap. 02. Siguiendo la metodología del Marco Lógico<Cite r="CEPAL/ILPES, 2005" />, cada elemento negativo del árbol de problemas se convierte en su correspondiente positivo: las causas se transforman en medios, los efectos en fines, y el problema central en el objetivo central del proyecto.
                </p>
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 my-6">
                  <p className="font-semibold text-slate-900 mb-2">Problema Central (entrada):</p>
                  <p className="text-slate-700">
                    "Deficiente detección temprana del bajo rendimiento académico estudiantil."
                  </p>
                </div>
                <p>
                  Este enunciado negativo se invierte para formular el objetivo central positivo que orienta el diseño del sistema inteligente. La aplicación de Machine Learning como medio técnico tiene respaldo empírico en la literatura sobre detección temprana del bajo rendimiento académico<Cite r="Márquez-Vera et al., 2013" /><Cite r="Romero & Ventura, 2010" />.
                </p>
              </div>
            </div>
          </section>

          <section id="p03-herramientas" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">03 · Análisis del Objetivo · Herramienta y Técnica</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-6">Árbol de Objetivos</h2>
              <p className="text-slate-600 mb-8 max-w-3xl">
                El árbol de objetivos transforma el problema central en un objetivo positivo y articula los medios para alcanzarlo y los fines que se obtendrán al lograrlo<Cite r="CEPAL/ILPES, 2005" />. Cada nivel negativo del árbol de problemas se convierte en su equivalente positivo: causas → medios, problema → objetivo, efectos → fines.
              </p>

              <h3 className="text-base font-semibold text-slate-700 uppercase tracking-wider mb-4 font-mono-label text-[11px]">Medios — ¿Cómo se alcanza el objetivo?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-10">
                <div className="border border-emerald-300 rounded-lg p-6 bg-emerald-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">✓</span> Medios Directos
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Análisis integrado de datos académicos (asistencia, notas, incidencias)</li>
                    <li>• Automatización del seguimiento estudiantil mediante sistema digital</li>
                    <li>• Implementación de modelos predictivos de Machine Learning<Cite r="Romero & Ventura, 2010" /></li>
                    <li>• Generación de alertas tempranas automáticas<Cite r="Márquez-Vera et al., 2013" /></li>
                  </ul>
                </div>
                <div className="border border-emerald-300 rounded-lg p-6 bg-emerald-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">✓</span> Medios Indirectos
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Integración de bases de datos institucionales (Cubicol + registros físicos)</li>
                    <li>• Uso de indicadores académicos en tiempo real</li>
                    <li>• Dashboards visuales para toma de decisiones directivas</li>
                    <li>• Capacitación docente en uso del sistema inteligente</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-700 uppercase tracking-wider mb-4 font-mono-label text-[11px]">Fines — ¿Qué se logra al alcanzar el objetivo?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="border border-blue-300 rounded-lg p-6 bg-blue-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">↑</span> Fines Directos
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Intervenciones pedagógicas oportunas por docentes y directivos</li>
                    <li>• Mejora del rendimiento académico de estudiantes en riesgo</li>
                    <li>• Reducción de estudiantes desaprobados al cierre del año escolar</li>
                  </ul>
                </div>
                <div className="border border-blue-300 rounded-lg p-6 bg-blue-50">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">↑</span> Fin Último
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Mejora sostenida de la calidad educativa institucional</li>
                    <li>• Fortalecimiento de la gestión académica basada en datos</li>
                    <li>• Modelo replicable para otras IEP del distrito de Villa El Salvador<Cite r="MINEDU, 2023" /></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-slate-400">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Visualización: Árbol de Objetivos</h3>
                <p className="text-slate-600 mb-6 max-w-3xl">
                  La siguiente imagen representa el árbol de objetivos construido al invertir positivamente el árbol de problemas. Visualiza cómo los medios directos e indirectos convergen hacia el objetivo central del proyecto, mostrando la estructura lógica de cómo se alcanzarán los resultados deseados mediante el sistema de detección temprana basado en Machine Learning.
                </p>
                <div className="relative w-full h-auto rounded-lg overflow-hidden border border-slate-300 shadow-md">
                  <Image
                    src="/arbol-objetivos.png"
                    alt="Árbol de Objetivos - Estructura de medios y objetivo central"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── SMART — Herramienta ── */}
          <section id="p03-smart" className="fade-section py-14 bg-slate-50 border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">03 · Análisis del Objetivo · Herramienta y Técnica</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-2">Análisis SMART del Objetivo</h2>
              <p className="text-slate-600 text-sm mb-8 max-w-3xl">
                Se aplicó la metodología SMART<Cite r="PMI, 2017" /> para verificar y reforzar la calidad del objetivo derivado del Marco Lógico<Cite r="CEPAL/ILPES, 2005" />. Cada criterio se evalúa contra el objetivo inicial y se documenta la mejora aplicada.
              </p>
              <div className="space-y-3 max-w-4xl">
                {[
                  {
                    letra: "S", nombre: "Específico", estado: "corregido",
                    cumple: ["Nombra la institución: IE Peruano Francés", "Define la herramienta: Machine Learning", "Especifica variables monitoreadas: asistencia, notas e incidencias", "Nombra beneficiarios directos: docentes y directivos"],
                    mejora: "Se agregaron variables monitoreadas y beneficiarios directos — ausentes en la formulación inicial del Marco Lógico.",
                  },
                  {
                    letra: "M", nombre: "Medible", estado: "corregido",
                    cumple: ["Meta cuantitativa: reducir en al menos 30% la detección tardía", "Universo definido: 200 alumnos de la institución", "Indicador basado en P7 de la encuesta (100% reconoce detección tardía actualmente)"],
                    mejora: "Se incorporó la meta del 30% como indicador de éxito medible — el objetivo original solo decía 'mejorar'.",
                  },
                  {
                    letra: "A", nombre: "Alcanzable", estado: "cumple",
                    cumple: ["Infraestructura existente: Cubicol + internet WIN 1000 Mbps", "Datos históricos disponibles en Cubicol (7 años de uso)", "Equipo técnico disponible: UNTELS + Área TI de la institución", "Receptividad docente confirmada: 83.3% acepta ML (encuesta P8)"],
                    mejora: null,
                  },
                  {
                    letra: "R", nombre: "Relevante", estado: "cumple",
                    cumple: ["Directamente vinculado al problema central (Marco Lógico)", "Validado: 100% de docentes reconoce detección tardía (encuesta P7)", "Alineado con la necesidad estratégica de la directora (entrevista)", "Respaldado por literatura académica sobre ML educativo"],
                    mejora: null,
                  },
                  {
                    letra: "T", nombre: "Temporal", estado: "corregido",
                    cumple: ["Plazo definido: año escolar 2026", "Acota el horizonte de implementación y evaluación del sistema"],
                    mejora: "Se agregó el plazo 'año escolar 2026' — ausente en la formulación original del árbol de objetivos.",
                  },
                ].map((c) => (
                  <div key={c.letra} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center gap-4 px-5 py-3 border-b border-slate-100">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                        c.estado === "cumple" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
                      }`}>{c.letra}</span>
                      <p className="font-semibold text-slate-900 text-sm flex-1">{c.nombre}</p>
                      <span className={`font-mono-label text-[10px] px-2 py-1 rounded-full font-bold ${
                        c.estado === "cumple" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {c.estado === "cumple" ? "✓ Cumple" : "✓ Corregido"}
                      </span>
                    </div>
                    <div className="px-5 py-3">
                      <ul className="space-y-1 mb-2">
                        {c.cumple.map((item, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>{item}
                          </li>
                        ))}
                      </ul>
                      {c.mejora && (
                        <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-1.5 mt-2">
                          <strong>Mejora aplicada:</strong> {c.mejora}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Salida: Objetivo SMART ── */}
          <section id="p03-salidas" className="fade-section py-14 bg-white border-b border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">03 · Análisis del Objetivo · Salida</span>
              <h2 className="font-serif-display text-3xl font-bold text-slate-900 mb-8">Objetivo Central del Proyecto</h2>
              <div className="max-w-3xl">
                <div className="border-l-4 border-emerald-600 bg-emerald-50 p-6 rounded-r-lg mb-6">
                  <h3 className="text-sm font-mono-label text-emerald-700 uppercase tracking-wider mb-2">Objetivo General — Formulación SMART</h3>
                  <p className="text-2xl font-serif-display text-slate-900 leading-tight">
                    "Reducir en al menos un <strong>30%</strong> la detección tardía del bajo rendimiento académico estudiantil en la <strong>IE Peruano Francés</strong>, mediante un sistema inteligente basado en Machine Learning que integre <strong>asistencia, notas e incidencias</strong> de los <strong>200 alumnos</strong>, proveyendo alertas automáticas a docentes y directivos, <strong>durante el año escolar 2026</strong>."
                  </p>
                </div>
                <div className="bg-slate-100 rounded-lg p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Fines del Objetivo</h3>
                  <ul className="text-sm text-slate-700 space-y-1.5">
                    <li>↑ Intervenciones pedagógicas más oportunas</li>
                    <li>↑ Reducción de estudiantes desaprobados al cierre del año escolar</li>
                    <li>↑ Mejora sostenida de la calidad educativa institucional<Cite r="MINEDU, 2023" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── REFERENCIAS ── */}
          <section id="referencias" className="fade-section py-14 bg-white border-t border-slate-200">
            <div className="px-8 lg:px-12">
              <span className="chapter-label block mb-2">Bibliografía</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Referencias Bibliográficas</h2>
              <p className="text-slate-700 text-sm mb-8 max-w-2xl">Fuentes académicas y normativas consultadas para la formulación y evaluación de este proyecto. Formato APA 7.ª edición.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
                <ol className="space-y-6">
                  {REFERENCIAS.map((ref, i) => (
                    <li key={ref.clave} className="flex gap-4">
                      <span className="font-mono-label flex-shrink-0 w-7 h-7 rounded-full bg-[#e8f5f5] text-[#0a5c5f] font-bold text-[10px] flex items-center justify-center mt-0.5">{i + 1}</span>
                      <div>
                        <span className="font-mono-label inline-block bg-[#e8f5f5] border border-[#c0e0e0] text-[#0a5c5f] text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">{ref.clave}</span>
                        <p className="text-slate-800 text-sm leading-relaxed">{ref.texto}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 py-5 text-center text-slate-400 text-xs">
            <p className="font-mono-label">© 2026 · Sistema ML Alerta Temprana del Bajo Rendimiento Académico · IE Peruano Francés · UNTELS · ISR0832</p>
          </footer>

        </main>
      </div>
    </div>
  );
}
