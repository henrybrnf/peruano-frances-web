"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const TOC_SECTIONS = [
  { num: "1", label: "El Equipo de Investigación", href: "#equipo" },
  { num: "2", label: "La Institución — I.E.P. Peruano Francés", href: "#institucion" },
  { num: "3", label: "Business Model Canvas", href: "#canvas" },
  { num: "4", label: "Visita de Campo", href: "#visita" },
  { num: "5", label: "Entrevista a la Institución", href: "#entrevista" },
  { num: "6", label: "Análisis de Stakeholders", href: "#stakeholders" },
  { num: "7", label: "Contexto Organizacional", href: "#factores" },
  { num: "8", label: "Planteamiento del Problema", href: "#problema" },
  { num: "9", label: "Propuesta de Solución", href: "#solucion" },
  { num: "10", label: "Referencias Bibliográficas", href: "#referencias" },
];

const REFERENCIAS = [
  { clave: "PMI, 2017", texto: "Project Management Institute. (2017). Guía de los Fundamentos para la Dirección de Proyectos (Guía del PMBOK®), 6.ª ed. Newton Square, PA: Project Management Institute." },
  { clave: "Osterwalder & Pigneur, 2010", texto: "Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. Hoboken, NJ: John Wiley & Sons." },
  { clave: "Romero & Ventura, 2010", texto: "Romero, C., & Ventura, S. (2010). Educational data mining: A review of the state of the art. IEEE Transactions on Systems, Man, and Cybernetics, Part C, 40(6), 601–618. https://doi.org/10.1109/TSMCC.2010.2053532" },
  { clave: "Márquez-Vera et al., 2013", texto: "Márquez-Vera, C., Morales, C. R., & Soto, S. V. (2013). Predicting school failure and dropout by using data mining techniques. IEEE Revista Iberoamericana de Tecnologías del Aprendizaje, 8(1), 7–14. https://doi.org/10.1109/RITA.2013.2244695" },
  { clave: "UNESCO, 2022", texto: "UNESCO. (2022). Informe de Seguimiento de la Educación en el Mundo 2022: No dejar a nadie atrás. París: Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura." },
  { clave: "MINEDU, 2023", texto: "Ministerio de Educación del Perú — MINEDU. (2023). Estadísticas de la Calidad Educativa (ESCALE). Lima: MINEDU. Recuperado de http://escale.minedu.gob.pe" },
  { clave: "Ley 29733, 2011", texto: "Congreso de la República del Perú. (2011). Ley N° 29733 — Ley de Protección de Datos Personales y su Reglamento (D.S. N° 003-2013-JUS). Lima: El Peruano." },
];

const CANVAS = {
  socios: [
    "UNTELS — equipo de desarrollo del sistema",
    "Cubicol — plataforma educativa existente",
    "Proveedor WIN — conectividad 1000 Mbps",
    "Ministerio de Educación — marco normativo",
  ],
  actividades: [
    "Recolección e integración de datos académicos",
    "Entrenamiento y actualización de modelos ML",
    "Generación de alertas tempranas automáticas",
    "Mantenimiento, soporte y capacitación del personal",
  ],
  recursos: [
    "Datos históricos: asistencia, notas e incidencias",
    "Infraestructura TI del colegio (Cubicol, internet)",
    "Equipo de desarrollo UNTELS",
    "Personal TI de la institución",
  ],
  propuesta: [
    "Detección temprana del riesgo de deserción mediante ML",
    "Alertas automáticas para intervención oportuna",
    "Dashboard visual para toma de decisiones directivas",
    "Reducción de la deserción y estabilidad de matrícula",
  ],
  relacion: [
    "Capacitación presencial al personal docente y administrativo",
    "Soporte técnico continuo por el área TI de la institución",
    "Actualizaciones periódicas del sistema ML",
    "Comunicación mensual de reportes a dirección",
  ],
  canales: [
    "Plataforma web responsive (móvil y escritorio)",
    "Lectura QR para registro de asistencia",
    "Integración directa con Cubicol",
    "Notificaciones vía correo y WhatsApp",
  ],
  segmentos: [
    "Director y docentes de la IE Peruano Francés",
    "Psicólogo escolar",
    "Personal administrativo y área TI",
    "Padres de familia (200 alumnos)",
  ],
  costos: [
    "Desarrollo del sistema — costo mínimo (equipo universitario)",
    "Hosting cloud — tier gratuito (Vercel / Supabase)",
    "Capacitación del personal docente",
    "Mantenimiento y actualizaciones anuales",
  ],
  ingresos: [
    "Reducción de deserción → matrícula estable → ingresos sostenidos",
    "Ahorro en procesos manuales de seguimiento estudiantil",
    "Potencial licenciamiento a otras IEP del distrito de VES",
    "Mejora de imagen institucional y competitividad",
  ],
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
  {
    zona: "Zona de Gestión Directa",
    color: "border-blue-600 bg-blue-50",
    colorTexto: "text-blue-800",
    colorBadge: "bg-blue-600 text-white",
    descripcion: "Alta influencia y alto interés — decisores clave del proyecto",
    actores: [
      { nombre: "Promotora Directora", icono: "👩‍💼", relacion: "Entrevistada · Comprometida" },
      { nombre: "Área de TI", icono: "💻", relacion: "Entrevistada · Comprometida" },
      { nombre: "Subdirector", icono: "👨‍💼", relacion: "Identificado · Por contactar" },
    ],
  },
  {
    zona: "Zona de Involucramiento Activo",
    color: "border-indigo-500 bg-indigo-50",
    colorTexto: "text-indigo-800",
    colorBadge: "bg-indigo-500 text-white",
    descripcion: "Usuarios directos del sistema — su adopción determina el éxito",
    actores: [
      { nombre: "Docentes y Auxiliares", icono: "👨‍🏫", relacion: "Identificados · Capacitación pendiente" },
      { nombre: "Coordinadores Académicos", icono: "📋", relacion: "Identificados · Por involucrar" },
      { nombre: "Psicólogo Escolar", icono: "🧠", relacion: "Identificado · Por contactar" },
    ],
  },
  {
    zona: "Zona de Seguimiento y Satisfacción",
    color: "border-amber-500 bg-amber-50",
    colorTexto: "text-amber-800",
    colorBadge: "bg-amber-500 text-white",
    descripcion: "Beneficiarios indirectos — deben ser informados y satisfechos",
    actores: [
      { nombre: "Padres de Familia", icono: "👨‍👩‍👧", relacion: "Informados vía Cubicol y WhatsApp" },
      { nombre: "Estudiantes (200)", icono: "🎒", relacion: "Beneficiarios finales del sistema" },
      { nombre: "Personal Administrativo", icono: "📁", relacion: "Informados periódicamente" },
    ],
  },
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

const MODULOS = [
  { letra: "A", nombre: "Recolección de Datos", color: "bg-blue-700", descripcion: "Integra asistencia, notas e incidencias desde Cubicol y nuevos registros digitales." },
  { letra: "B", nombre: "Procesamiento", color: "bg-indigo-700", descripcion: "Limpieza, normalización e integración de datos para el análisis." },
  { letra: "C", nombre: "Analítica ML", color: "bg-purple-700", descripcion: "Modelos de Machine Learning calculan el riesgo de deserción de cada alumno." },
  { letra: "D", nombre: "Alertas Tempranas", color: "bg-red-700", descripcion: "Notificaciones automáticas a docentes y directivos sobre estudiantes en riesgo crítico." },
  { letra: "E", nombre: "Dashboard", color: "bg-emerald-700", descripcion: "Paneles visuales con reportes e indicadores clave para la toma de decisiones." },
];

function Cite({ r }: { r: string }) {
  return (
    <sup className="inline-flex items-center ml-0.5">
      <span
        className="text-blue-600 font-semibold text-[9px] bg-blue-50 border border-blue-200 px-1 py-0.5 rounded cursor-help leading-none"
        title={r}
      >
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

  /* Barra de progreso de lectura */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Sidebar activo + fade-in por sección */
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

      {/* ── BARRA DE PROGRESO ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #0d7377, #1e3a8a)",
        }}
      />

      {/* ── HEADER ACADÉMICO ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-14 flex items-center">
        <div className="w-full flex items-center gap-3 px-4 lg:px-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 text-slate-600 text-lg leading-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir índice"
          >
            ☰
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 bg-white shadow-sm">
            <Image src="/logo.jpeg" alt="Logo IE Peruano Francés" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif-display text-sm font-bold text-slate-900 truncate">Sistema ML — Detección de Riesgo de Deserción Escolar</p>
            <p className="font-mono-label text-[10px] text-slate-400 hidden sm:block">UNTELS · ISR0832 · Formulación y Evaluación de Proyectos TI · 2026</p>
          </div>
          <span className="hidden md:flex items-center gap-1.5 font-mono-label text-[10px] text-slate-400 border border-slate-200 rounded-full px-3 py-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377] animate-pulse" />
            Proyecto Académico
          </span>
        </div>
      </header>

      <div className="flex pt-14">

        {/* ── OVERLAY MOBILE ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR ÍNDICE ── */}
        <aside
          className={`fixed top-14 left-0 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5">
            <p className="chapter-label mb-5">Índice</p>
            <nav className="space-y-0.5">
              {TOC_SECTIONS.map((s) => {
                const isActive = activeSection === s.href.replace("#", "");
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg transition-all group ${
                      isActive
                        ? "bg-[#e8f5f5] text-[#0d7377]"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`font-mono-label flex-shrink-0 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center mt-0.5 transition-all ${
                        isActive
                          ? "bg-[#0d7377] text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span className={`leading-snug text-xs ${isActive ? "font-semibold" : ""}`}>
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="font-mono-label text-[10px] text-slate-400 leading-relaxed">
                Proyecto académico · UNTELS<br />
                Docente: Arqque Pantigozo Antonio<br />
                Lima, Perú · 2026
              </p>
            </div>
          </div>
        </aside>

        {/* ── CONTENIDO PRINCIPAL ── */}
        <main className="flex-1 lg:ml-64 min-w-0">

          {/* ── HERO ── */}
          <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "36px 36px" }} />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
              <div className="font-mono-label inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-white/80 text-[11px] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#0d7377] animate-pulse" />
                UNTELS · Ingeniería de Sistemas · ISR0832 · 2026
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Sistema Inteligente{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}>
                  basado en ML
                </span>
                <br />para la Detección del Riesgo de{" "}
                <span className="text-red-400">Deserción Escolar</span>
              </h1>
              <p className="text-lg text-blue-100 mb-3 max-w-3xl mx-auto leading-relaxed">
                Aplicado al <strong className="text-white">Colegio Particular I.E.P. Peruano Francés</strong>
                <br />Av. Pastor Sevilla · Villa el Salvador · Lima, Perú
              </p>
              <p className="font-mono-label text-blue-300 text-[11px] mb-10">
                Docente: <strong className="text-white not-italic">Arqque Pantigozo Antonio</strong> &nbsp;·&nbsp; Formulación y Evaluación de Proyectos TI
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                {[
                  { stat: "200", label: "Estudiantes" },
                  { stat: "16", label: "Docentes / Auxiliares" },
                  { stat: "25", label: "Años de trayectoria" },
                  { stat: "3", label: "Niveles educativos" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-4 min-w-[110px] text-center">
                    <div className="font-serif-display text-3xl font-bold text-white">{s.stat}</div>
                    <div className="font-mono-label text-blue-200 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#problema"
                  className="bg-white text-blue-800 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                  Explorar el Proyecto ↓
                </a>
                <a href="#visita"
                  className="bg-white/10 border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/20 transition-all text-sm">
                  Ver Evidencias 📷
                </a>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce text-xl">↓</div>
          </section>

          {/* ── ABSTRACT ── */}
          <section className="py-12 bg-white border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Resumen / Abstract</span>
                  <span className="font-mono-label text-slate-400 text-[11px]">Metodología: PMBOK® 6.ª edición <Cite r="PMI, 2017" /></span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  El presente trabajo formula y evalúa un proyecto de tecnología de información orientado a la detección temprana del riesgo de deserción escolar en la Institución Educativa Privada I.E.P. Peruano Francés, ubicada en Villa el Salvador, Lima, Perú. Siguiendo los lineamientos del <strong className="text-slate-800">PMBOK® 6.ª edición</strong><Cite r="PMI, 2017" />, se identificaron los factores ambientales de la empresa, los activos de los procesos de la organización y se realizó un análisis exhaustivo de interesados. El diagnóstico se fundamenta en una entrevista semi-estructurada aplicada en abril de 2026, que evidenció procesos 100&nbsp;% manuales de registro de asistencia e incidencias, y una tasa de acceso del 60&nbsp;% de los padres de familia a la plataforma institucional Cubicol<Cite r="MINEDU, 2023" />. La solución propuesta es un sistema web inteligente basado en técnicas de <strong className="text-slate-800">Machine Learning</strong><Cite r="Romero & Ventura, 2010" /> que procesa variables de asistencia, rendimiento académico e incidencias conductuales para generar alertas tempranas de intervención. El modelo de negocio fue estructurado mediante el <strong className="text-slate-800">Business Model Canvas</strong><Cite r="Osterwalder & Pigneur, 2010" />.
                </p>
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="font-mono-label text-[10px] text-slate-400">Palabras clave:</span>
                  {["Machine Learning", "Deserción escolar", "PMBOK 6", "Gestión de proyectos TI", "Alertas tempranas", "IEP Peruano Francés"].map((k) => (
                    <span key={k} className="bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-xs px-2 py-0.5 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── EQUIPO ── */}
          <section id="equipo" className="fade-section py-20 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center" style={{ color: "#0d7377" }}>Sección 01 · Equipo</span>
                <span className="inline-block bg-white/10 text-white/70 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 mt-2">Investigadores</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-3">1. El Equipo</h2>
                <p className="text-slate-400 text-sm">Escuela Profesional de Ingeniería de Sistemas — UNTELS</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {[
                  { nombre: "Henry Brayan Nuñez Figueroa", codigo: "2014101295", inicial: "H" },
                  { nombre: "Helber Javier Perez Gutierrez", codigo: "2008100137", inicial: "H" },
                  { nombre: "Fernando Medina Ccangri", codigo: "20a3110232", inicial: "F" },
                  { nombre: "Jhostin Jefry Galarza Camarena", codigo: "2123010051", inicial: "J" },
                ].map((m) => (
                  <div key={m.codigo} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:-translate-y-1 transition-all">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e3a8a] flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">
                      {m.inicial}
                    </div>
                    <h3 className="font-serif-display font-bold text-white text-sm leading-tight mb-2">{m.nombre}</h3>
                    <p className="font-mono-label text-slate-400 text-[10px]">Cód. {m.codigo}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-8">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
                  <span>🎓 <strong className="text-white">UNTELS</strong> — Univ. Nacional Tecnológica de Lima Sur</span>
                  <span>📖 Formulación y Evaluación de Proyectos TI — ISR0832</span>
                  <span>👨‍🏫 Docente: <strong className="text-white">Arqque Pantigozo Antonio</strong></span>
                  <span>📅 Lima, Perú — 2026</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── INSTITUCIÓN ── */}
          <section id="institucion" className="fade-section py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 02 · La Institución</span>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">La Organización</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">2. I.E.P. Peruano Francés</h2>

                <p className="text-slate-500 max-w-xl mx-auto text-sm">Datos verificados en visita de campo — Abril 2026</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "🏫", label: "Nombre", value: "I.E.P. Peruano Francés" },
                  { icon: "🔒", label: "Tipo", value: "Institución Educativa Privada" },
                  { icon: "📍", label: "Ubicación", value: "Av. Pastor Sevilla con Av. Juan Velazco Alvarado, VES, Lima" },
                  { icon: "📚", label: "Niveles Educativos", value: "Inicial · Primaria · Secundaria" },
                  { icon: "👨‍👩‍👧", label: "N° de Estudiantes", value: "Aproximadamente 200 alumnos" },
                  { icon: "👨‍🏫", label: "N° de Docentes", value: "Aprox. 16 docentes y auxiliares" },
                  { icon: "📅", label: "Años de Operación", value: "25 años de trayectoria" },
                  { icon: "💻", label: "Sistema Académico", value: "Cubicol — 7 años en uso" },
                  { icon: "🌐", label: "Conectividad", value: "WIN — Fibra Óptica 1000 Mbps" },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-3 items-start">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-mono-label text-[10px] font-semibold text-slate-400 uppercase mb-0.5">{item.label}</p>
                      <p className="text-slate-800 font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl p-6 text-center">
                <p className="font-mono-label text-slate-400 text-[10px] uppercase tracking-widest mb-1">Lema Institucional</p>
                <p className="font-serif-display text-slate-700 font-semibold text-xl italic">&ldquo;Formación en Valores Cristianos — Rumbo a la Universidad&rdquo;</p>
              </div>

              {/* ── ORGANIGRAMA ── */}
              <div className="mt-10 pt-10 border-t border-slate-200">
                <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-1 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Organigrama Estructural
                </h3>
                <p className="text-slate-500 text-sm mb-8">Estructura organizacional oficial de la I.E.P. Peruano Francés</p>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <Image src="/organigrama.jpeg" alt="Organigrama Estructural I.E.P. Peruano Francés" width={800} height={1100} className="w-full h-auto" />
                    <p className="font-mono-label text-[10px] text-center text-slate-400 py-2 bg-slate-50">Documento institucional oficial</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <p className="font-mono-label text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-6">Diagrama de la Estructura</p>
                    <div className="flex flex-col items-center text-[11px] font-semibold select-none">
                      <div className="border-2 border-dashed border-slate-300 text-slate-500 bg-slate-50 rounded-xl px-5 py-2 text-center leading-snug">
                        🏛️ Directora de la UGEL Nº 01
                      </div>
                      <div className="w-px h-4 bg-slate-300" />
                      <div className="bg-blue-800 text-white rounded-xl px-6 py-2.5 text-center shadow-lg">
                        👩‍💼 Promotora Directora
                      </div>
                      <div className="w-px h-4 bg-blue-300" />
                      <div className="grid grid-cols-3 w-full items-center">
                        <div className="flex items-center justify-end">
                          <div className="border border-slate-200 bg-slate-100 text-slate-600 rounded-xl px-2.5 py-2 text-center leading-snug text-[10px]">
                            📁 Personal<br />Administrativo
                          </div>
                          <div className="w-4 h-px bg-slate-300 flex-shrink-0" />
                        </div>
                        <div className="flex justify-center">
                          <div className="bg-blue-600 text-white rounded-xl px-4 py-2.5 text-center shadow-md">
                            👨‍💼 Sub - Director
                          </div>
                        </div>
                        <div />
                      </div>
                      <div className="w-px h-4 bg-blue-300" />
                      <div className="grid grid-cols-3 w-full items-center">
                        <div />
                        <div className="flex justify-center">
                          <div className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 text-center shadow-md">
                            📋 Jefa de Normas
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-px bg-slate-300 flex-shrink-0" />
                          <div className="border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-xl px-2 py-2 text-center leading-snug text-[10px]">
                            🔬 Coordinadores<br />CC. y LL.
                          </div>
                        </div>
                      </div>
                      <div className="w-px h-4 bg-indigo-300" />
                      <div className="flex gap-2 w-full justify-center">
                        {["Inicial", "Primaria", "Secundaria"].map((n) => (
                          <div key={n} className="bg-teal-600 text-white rounded-xl px-3 py-2 text-center shadow-sm text-[10px] flex-1 max-w-[80px]">
                            👨‍🏫<br />Prof. {n}
                          </div>
                        ))}
                      </div>
                      <div className="w-px h-4 bg-teal-300" />
                      <div className="flex gap-3 justify-center">
                        <div className="bg-emerald-600 text-white rounded-xl px-4 py-2.5 text-center shadow-sm">
                          🎒 Alumnos
                        </div>
                        <div className="bg-amber-500 text-white rounded-xl px-4 py-2.5 text-center shadow-sm text-[10px]">
                          👨‍👩‍👧 Padres de<br />Familia
                        </div>
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
                            <span className="text-[9px] text-slate-500">{x.l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CANVAS ── */}
          <section id="canvas" className="fade-section py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 03 · Modelo de Negocio</span>
                <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Caso de Negocio</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">3. Business Model Canvas</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  Modelo de negocio del sistema inteligente de detección de riesgo de deserción escolar para la I.E.P. Peruano Francés<Cite r="Osterwalder & Pigneur, 2010" />.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md text-sm">
                <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  <div className="bg-blue-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-blue-700 uppercase tracking-wider mb-3">🤝 Socios Clave</p>
                    <ul className="space-y-1.5">
                      {CANVAS.socios.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-blue-400 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-1 divide-y divide-slate-200">
                    <div className="bg-indigo-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-indigo-700 uppercase tracking-wider mb-3">⚙️ Actividades Clave</p>
                      <ul className="space-y-1.5">
                        {CANVAS.actividades.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-indigo-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-violet-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-violet-700 uppercase tracking-wider mb-3">🧱 Recursos Clave</p>
                      <ul className="space-y-1.5">
                        {CANVAS.recursos.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-violet-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-rose-600 p-5 text-white">
                    <p className="font-mono-label text-[10px] font-black text-rose-200 uppercase tracking-wider mb-3">💡 Propuesta de Valor</p>
                    <ul className="space-y-2">
                      {CANVAS.propuesta.map((i) => <li key={i} className="text-xs text-white/90 flex gap-1.5"><span className="text-rose-300 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-1 divide-y divide-slate-200">
                    <div className="bg-amber-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-amber-700 uppercase tracking-wider mb-3">🤲 Relación con Clientes</p>
                      <ul className="space-y-1.5">
                        {CANVAS.relacion.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-amber-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-5">
                      <p className="font-mono-label text-[10px] font-black text-orange-700 uppercase tracking-wider mb-3">📡 Canales</p>
                      <ul className="space-y-1.5">
                        {CANVAS.canales.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-orange-400 flex-shrink-0">·</span>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-3">👥 Segmentos de Clientes</p>
                    <ul className="space-y-1.5">
                      {CANVAS.segmentos.map((i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-emerald-400 flex-shrink-0">·</span>{i}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200">
                  <div className="bg-slate-100 p-5">
                    <p className="font-mono-label text-[10px] font-black text-slate-700 uppercase tracking-wider mb-3">💸 Estructura de Costos</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {CANVAS.costos.map((i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start">
                          <span className="text-slate-400 flex-shrink-0">·</span>{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-5">
                    <p className="font-mono-label text-[10px] font-black text-teal-700 uppercase tracking-wider mb-3">💰 Fuentes de Ingresos / Valor</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {CANVAS.ingresos.map((i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-1.5 items-start">
                          <span className="text-teal-400 flex-shrink-0">·</span>{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── VISITA ── */}
          <section id="visita" className="fade-section py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 04 · Trabajo de Campo</span>
                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Evidencia de Campo</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">4. Visita al Colegio</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  El equipo realizó una visita presencial a la I.E.P. Peruano Francés en Abril de 2026. Se recorrieron las instalaciones, se aplicó el instrumento de entrevista y se recopiló evidencia fotográfica y audiovisual.
                </p>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {PHOTOS.map((p, i) => (
                  <div key={i} className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                    onClick={() => setActivePhoto(i)}>
                    <div className="overflow-hidden">
                      <Image src={p.src} alt={p.caption} width={600} height={450} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3 bg-slate-50">
                      <p className="text-xs text-slate-500 leading-snug">{p.caption}</p>
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

          {/* ── ENTREVISTA ── */}
          <section id="entrevista" className="fade-section py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 05 · Entrevista</span>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Recopilación de Datos</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">5. Entrevista a la Institución</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  Instrumento semi-estructurado aplicado a la directora y personal de tecnología del colegio durante la visita de campo.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
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
                        <dd className="text-slate-600">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-4">Bloques del Instrumento</h3>
                  <ol className="space-y-2">
                    {["Datos generales de la institución", "Situación actual sobre deserción escolar", "Problemas identificados en el seguimiento", "Tecnología actual y sistemas en uso", "Necesidades del usuario (dirección/docentes)", "Factibilidad de implementar solución TI", "Preguntas específicas para docentes/tutores", "Preguntas para el director o coordinador"].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-mono-label w-5 h-5 rounded-full bg-[#e8f5f5] text-[#0d7377] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        {b}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-5">Hallazgos Clave — Resumen Ejecutivo</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: "📄", t: "Asistencia 100% manual", d: "Registro físico en cuadernos por docentes y auxiliares, sin trazabilidad digital ni alertas automáticas." },
                    { icon: "📲", t: "Incidencias por WhatsApp", d: "Las incidencias se notifican a los padres por WhatsApp o correo. Sin registro centralizado ni respuesta garantizada." },
                    { icon: "🔴", t: "40% padres no usa la plataforma", d: "El 40% de padres de familia no tiene el hábito de ingresar a Cubicol, limitando la comunicación efectiva con la institución." },
                    { icon: "✅", t: "Apertura al QR", d: "La directora expresó total interés en el QR para control de asistencia y notificación puntual a los padres." },
                    { icon: "🤝", t: "Disposición institucional", d: "La directora ofrece acceso a los datos del colegio para formular y evaluar una solución tecnológica adecuada." },
                    { icon: "💡", t: "Necesidad prioritaria", d: "Control digitalizado de asistencia que permita visualizar el progreso del alumno durante todo el año escolar." },
                  ].map((h) => (
                    <div key={h.t} className="bg-slate-50 rounded-xl p-4">
                      <div className="text-2xl mb-2">{h.icon}</div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{h.t}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{h.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-7 text-white mb-8">
                <h3 className="font-serif-display font-bold text-lg mb-4">Conclusiones de la Entrevista</h3>
                <ul className="space-y-2.5">
                  {[
                    "La institución opera con procesos manuales que generan inconsistencias y dificultan la detección temprana del riesgo de deserción.",
                    "Existe infraestructura tecnológica suficiente (internet 1000 Mbps, Cubicol, personal TI) para soportar una solución digital sin grandes inversiones.",
                    "La directora y el personal de tecnología tienen disposición activa y están abiertos a participar en el proyecto.",
                    "El sistema debe ser simple, accesible desde dispositivos móviles y compatible con la plataforma Cubicol ya instalada.",
                    "Las principales causas de deserción identificadas: factores económicos, cambio de vivienda y traslado a colegios estatales.",
                  ].map((c, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-purple-100">
                      <span className="text-purple-400 flex-shrink-0 font-bold">→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                <h3 className="font-serif-display font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎥</span> Video de la Entrevista
                </h3>
                <p className="font-mono-label text-slate-400 text-[10px] mb-4">Grabación de la sesión de entrevista con la directora de la I.E.P. Peruano Francés — Abril 2026</p>
                <video controls className="w-full rounded-xl shadow border border-slate-100" preload="metadata">
                  <source src="/entrevista.mp4" type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="text-4xl flex-shrink-0">📁</div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-1">Carpeta de Evidencias del Equipo</h3>
                  <p className="text-slate-500 text-sm">Accede a todos los documentos, fotografías, grabaciones y archivos del proyecto en Google Drive.</p>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/1z33A6WEsA_c8dG4UWaxbnaLNTMgPQo2S?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow hover:shadow-lg text-sm"
                >
                  <span>Ver en Google Drive</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* ── STAKEHOLDERS ── */}
          <section id="stakeholders" className="fade-section py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 06 · Interesados</span>
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Gestión de Interesados</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">6. Análisis de Stakeholders</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  Identificación, análisis de poder/interés, expectativas, plan de involucramiento y plan de comunicación de todos los interesados del proyecto<Cite r="PMI, 2017" />.
                </p>
              </div>

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
                          <p className="text-xs text-slate-400">{s.cargo}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">{s.contacto}</td>
                        <td className="px-4 py-3 text-slate-500 text-sm hidden sm:table-cell">{s.rol}</td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(s.interes)}`}>{s.interes}</span></td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(s.poder)}`}>{s.poder}</span></td>
                        <td className="px-4 py-3 text-center hidden md:table-cell"><span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getEst(s.estrategia)}`}>{s.estrategia}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                Mapa de Actores — Design Thinking
              </h3>
              <div className="mb-10">
                <div className="relative flex flex-col items-center gap-4">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-900 text-white text-center shadow-xl border-4 border-white">
                    <span className="text-2xl">🤖</span>
                    <span className="text-[9px] font-bold leading-tight mt-0.5">Sistema<br />ML</span>
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
                            <span className="text-2xl flex-shrink-0">{a.icono}</span>
                            <div>
                              <p className={`font-semibold text-xs ${zona.colorTexto}`}>{a.nombre}</p>
                              <p className="text-slate-500 text-xs leading-tight">{a.relacion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
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

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
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
                    <p className="text-slate-600 text-xs leading-relaxed">{e.a}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
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
                        <td className="px-4 py-3 text-slate-500">{m}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-mono-label bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-[10px] font-semibold px-2 py-0.5 rounded-full">{f}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <span className="font-mono-label w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">6</span>
                Seguimiento y Nivel de Involucramiento
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
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
                    <p className="text-xs text-slate-500 leading-relaxed">{m.accion}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FACTORES + ACTIVOS ── */}
          <section id="factores" className="fade-section py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 07 · Contexto</span>
                <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Contexto Organizacional</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">7. Factores Ambientales de la Empresa</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm">Condicionantes del éxito o fracaso del proyecto — factores no controlables directamente por el equipo<Cite r="PMI, 2017" />.</p>
              </div>
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
                        <p className="text-slate-500 text-xs leading-relaxed">{f.descripcion}</p>
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
                        <p className="text-slate-500 text-xs leading-relaxed">{f.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mb-10">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Recursos</span>
                <h2 className="font-serif-display text-2xl font-bold text-slate-900 mb-2">Activos de los Procesos de la Organización</h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm">Recursos, conocimientos y herramientas que la institución aporta al proyecto<Cite r="PMI, 2017" />.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {ACTIVOS.map((a) => (
                  <div key={a.titulo} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <h4 className="font-serif-display font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100">{a.titulo}</h4>
                    <ul className="space-y-1.5">
                      {a.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-[#0d7377] mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROBLEMA ── */}
          <section id="problema" className="fade-section py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 08 · Problema</span>
                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Planteamiento del Problema</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">8. La Deserción Escolar: Un Problema Urgente</h2>
                <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm">
                  En la IE Peruano Francés, la identificación de alumnos en riesgo de abandono se realiza de manera manual y reactiva, sin herramientas que permitan intervenir a tiempo.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: "📋", titulo: "Registro 100% Manual", desc: "La asistencia se registra en papel por docentes y auxiliares. Las incidencias se reportan por WhatsApp o correo, sin trazabilidad centralizada." },
                  { icon: "⚠️", titulo: "Detección Tardía", desc: "La identificación de alumnos en riesgo depende exclusivamente de la observación individual del docente. No hay sistema de alertas tempranas." },
                  { icon: "📱", titulo: "40% de Padres No Usa la Plataforma", desc: "4 de cada 10 padres no tiene el hábito ni la cultura de ingresar a Cubicol. Las notificaciones por WhatsApp no garantizan respuesta inmediata." },
                ].map((c) => (
                  <div key={c.titulo} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-3">{c.icon}</div>
                    <h3 className="font-serif-display font-bold text-slate-900 mb-2">{c.titulo}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
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
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    Este es el formulario en papel utilizado actualmente por la institución para registrar cada incidencia escolar. Se completa a mano, se archiva de forma física y se notifica por WhatsApp o correo. <strong className="text-red-700">No existe trazabilidad digital, ni historial centralizado, ni alertas automáticas.</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Sin trazabilidad digital", "Sin alertas automáticas", "Sin historial centralizado", "Riesgo de pérdida de información"].map((t) => (
                      <span key={t} className="bg-white border border-red-200 text-red-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl p-8 text-white">
                <h3 className="font-serif-display text-xl font-bold mb-3">Objetivo General del Proyecto</h3>
                <p className="text-blue-100 leading-relaxed">
                  Desarrollar un <strong className="text-white">sistema inteligente basado en Machine Learning</strong> que permita predecir el riesgo de deserción escolar en la IE Peruano Francés, facilitando la identificación temprana de estudiantes en situación de riesgo y mejorando la toma de decisiones de directivos y docentes mediante alertas automáticas y dashboards visuales.
                </p>
              </div>
            </div>
          </section>

          {/* ── SOLUCIÓN ── */}
          <section id="solucion" className="fade-section py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="chapter-label text-center block">Sección 09 · Solución</span>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Propuesta Tecnológica</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">9. Sistema Inteligente ML — Propuesta de Solución</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  El sistema integra los datos del colegio y aplica Machine Learning<Cite r="Romero & Ventura, 2010" /> para detectar patrones de riesgo antes de que ocurra la deserción.
                </p>
              </div>
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
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-serif-display font-bold text-slate-900 mb-4">Funcionalidades Principales</h3>
                  <ul className="space-y-2.5">
                    {["Registro digital de asistencia con lectura de QR desde celular", "Integración con Cubicol para notas e incidencias", "Modelos predictivos ML de riesgo de deserción por alumno", "Alertas tempranas automáticas priorizadas por criticidad", "Dashboard con reportes visuales por aula y grado", "Panel para padres con seguimiento del progreso del alumno"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-[#0d7377] flex-shrink-0 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6">
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
                          <span className="font-mono-label text-slate-400 text-[11px]">{v.nivel}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-1">
                          <div className={`h-full ${v.color} rounded-full transition-all`} style={{ width: `${v.nivel}%` }} />
                        </div>
                        <p className="text-xs text-slate-400">{v.nota}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="font-serif-display font-bold text-slate-900 text-xl mb-4">Análisis de Riesgos <Cite r="PMI, 2017" /></h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Riesgo</th>
                      <th className="px-4 py-3 text-center font-semibold">Impacto</th>
                      <th className="px-4 py-3 text-center font-semibold">Probabilidad</th>
                      <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Mitigación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Resistencia al cambio del personal docente", "Alto", "Medio", "Capacitación y sensibilización previa a la implementación"],
                      ["Baja calidad o falta de datos históricos", "Alto", "Medio", "Validación, limpieza y enriquecimiento de datos inicial"],
                      ["Limitaciones presupuestarias del colegio", "Medio", "Medio", "Uso de tecnología open-source y servicios cloud gratuitos"],
                      ["Problemas de integración con Cubicol", "Medio", "Bajo", "Coordinación directa con el encargado TI de la institución"],
                    ].map(([r, imp, prob, mit], i) => (
                      <tr key={r} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 text-slate-700 text-sm">{r}</td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(imp)}`}>{imp}</span></td>
                        <td className="px-4 py-3 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBadge(prob)}`}>{prob}</span></td>
                        <td className="px-4 py-3 text-slate-500 text-xs hidden sm:table-cell">{mit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── REFERENCIAS ── */}
          <section id="referencias" className="fade-section py-20 bg-white border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="chapter-label text-center block">Sección 10 · Bibliografía</span>
                <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Bibliografía</span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">10. Referencias Bibliográficas</h2>

                <p className="text-slate-500 text-sm max-w-2xl mx-auto">Fuentes académicas y normativas consultadas para la formulación y evaluación de este proyecto. Formato APA 7.ª edición.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
                <ol className="space-y-6">
                  {REFERENCIAS.map((ref, i) => (
                    <li key={ref.clave} className="flex gap-4">
                      <span className="font-mono-label flex-shrink-0 w-7 h-7 rounded-full bg-[#e8f5f5] text-[#0a5c5f] font-bold text-[10px] flex items-center justify-center mt-0.5">{i + 1}</span>
                      <div>
                        <span className="font-mono-label inline-block bg-[#e8f5f5] border border-[#c0e0e0] text-[#0a5c5f] text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">{ref.clave}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{ref.texto}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="bg-black py-5 text-center text-slate-600 text-xs">
            <p className="font-mono-label">© 2026 · Sistema ML Detección de Deserción Escolar · IE Peruano Francés · UNTELS · ISR0832</p>
          </footer>

        </main>
      </div>
    </div>
  );
}
