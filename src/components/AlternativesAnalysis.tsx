/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  GitFork,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  BookOpen,
  Award,
  ArrowRight,
  Database,
  Cloud,
  Home,
  ShieldAlert,
  Server,
  Layers,
  HelpCircle,
  TrendingDown,
  LineChart,
  UserCheck
} from "lucide-react";
import Cite from "./Cite";

interface ActionItem {
  id: string; // e.g., A1.1a
  tipo: "Tradicional" | "Innovadora Nube" | "Híbrida Local";
  nombre: string;
  descripcion: string;
}

interface MedioIndirecto {
  id: string; // MI1.1
  titulo: string;
  acciones: ActionItem[];
}

interface MedioDirectoItem {
  id: string; // MD1
  titulo: string;
  mediosIndirectos: MedioIndirecto[];
}

export default function AlternativesAnalysis() {
  const [activeTab, setActiveTab] = useState<"explorer" | "matrix" | "evaluation" | "design-thinking">("explorer");
  const [selectedMD, setSelectedMD] = useState<string>("MD1");
  const [expandedDT, setExpandedDT] = useState<string | null>("empatia");

  // Sync active tab with hash changes to fix sidebar navigation buttons
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      let targetTab: "explorer" | "matrix" | "evaluation" | "design-thinking" | null = null;
      if (hash === "#p04-marco" || hash === "#p04-acciones") {
        targetTab = "explorer";
      } else if (hash === "#p04-alternativas") {
        targetTab = "matrix";
      } else if (hash === "#p04-evaluacion") {
        targetTab = "evaluation";
      } else if (hash === "#p04-design-thinking") {
        targetTab = "design-thinking";
      }

      if (targetTab) {
        setActiveTab(targetTab);
        // Force scroll with a small delay for mounting the new DOM content
        setTimeout(() => {
          const el = document.getElementById(hash.replace("#", ""));
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Also handle direct anchor clicks across the app (including sidebar)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash) {
        setTimeout(handleHashChange, 20);
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    
    // Run initially in case of pages loaded on a specific hash
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const goal = "Mejorar la detección temprana del rendimiento académico estudiantil mediante un sistema inteligente basado en Machine Learning.";

  const alternatives = [
    {
      id: "Alt-1",
      num: 1,
      titulo: "Enfoque Tradicional BI (Enfoque BI)",
      enfoque: "Reactivo & Descriptivo",
      infra: "Hojas de cálculo de Microsoft/Google y un almacén de datos PostgreSQL tradicional.",
      descripcion: "Se basa en la consolidación manual bimestral de datos históricos en Power BI o Excel. Permite conocer los promedios pasados, pero carece de modelos predictivos y las alertas se realizan de forma descriptiva o tardía (al final del bimestre).",
      evaluacion: "Consistente pero Insuficiente",
      motivo: "No posee capacidades operativas para actuar como un sistema de alerta temprana. Una solución puramente descriptiva basada en datos acumulativos descubre las bajas calificaciones cuando el alumno ya reprobó, omitiendo el valor predictivo que requiere la solución.",
      tagColor: "bg-red-100 text-red-800 border-red-200",
      icon: <TrendingDown className="w-6 h-6 text-red-600" />
    },
    {
      id: "Alt-2",
      num: 2,
      titulo: "Enfoque Innovador Cloud MLOps (Enfoque Nube)",
      enfoque: "Proactivo & En la Nube",
      infra: "Arquitectura Data Lakehouse (AWS/GCP/Azure) con pipelines serverless continuos y MLOps continuo.",
      descripcion: "Uso de sistemas automatizados en nube con ingestión en tiempo real (streams) de logs LMS y telemetría de interacción, gobernando un entorno robusto de MLOps en la nube que notifica de inmediato mediante notificaciones push móviles.",
      evaluacion: "Consistente y Plenamente Suficiente",
      motivo: "Satisface con nivel de excelencia técnica rigurosa el objetivo central. Sin embargo, su principal limitación es la dependencia económica por los costos mensuales recurrentes de facturación de nube pública (en dólares) y la alta complejidad de gestión de datos externos.",
      tagColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Cloud className="w-6 h-6 text-blue-600" />
    },
    {
      id: "Alt-3",
      num: 3,
      titulo: "Enfoque Híbrido Autohospedado (Enfoque Híbrido)",
      enfoque: "Proactivo, Local & Eficiente",
      infra: "Servidor local centralizado (VPS/WSL2 gestionado vía Dokploy), Next.js interactivo y scripts programados de Python (Scikit-learn) locales.",
      descripcion: "Combina el poder de la Inteligencia Artificial analítica local con la agilidad de una SPA (Next.js/React). El entrenamiento y predicción del modelo se ejecutan localmente por hilos automáticos una vez por semana, eliminando servidores de pago mensual recurrente.",
      evaluacion: "Consistente, Suficiente y Viable (RECOMENDADO / ÓPTIMO)",
      motivo: "Es la alternativa elegida por su alta viabilidad técnica y nulo presupuesto de mantenimiento recurrente para una IEP de VES. Permite control directo y soberanía de los datos académicos y de comportamiento sensibles de los 200 menores (Ley N° 29733) sin exponerlos a servicios en la nube de terceros.",
      tagColor: "bg-emerald-100 text-emerald-850 border-emerald-200 font-extrabold",
      icon: <Server className="w-6 h-6 text-emerald-700" />
    }
  ];

  const MDs: MedioDirectoItem[] = [
    {
      id: "MD1",
      titulo: "Análisis integrado de datos académicos y conductuales de los estudiantes",
      mediosIndirectos: [
        {
          id: "MI1.1",
          titulo: "Integración de información académica en una base de datos única y centralizada",
          acciones: [
            {
              id: "A1.1a",
              tipo: "Tradicional",
              nombre: "Scripts ETL por lotes",
              descripcion: "Diseñar, programar y ejecutar scripts de extracción, transformación y carga (pipelines ETL tradicionales por lotes) para migrar periódicamente la información de Cubicol hacia un almacén de datos PostgreSQL local de forma síncrona."
            },
            {
              id: "A1.1b",
              tipo: "Innovadora Nube",
              nombre: "Data Lakehouse automatizada",
              descripcion: "Implementar un Data Lakehouse en una plataforma de nube pública, permitiendo la ingesta concurrente y unificación de flujos estructurados y no estructurados en tiempo real."
            },
            {
              id: "A1.1c",
              tipo: "Híbrida Local",
              nombre: "VPS con réplicas locales (Recomendada)",
              descripcion: "Configurar un servidor local centralizado (VPS/WSL2 gestionado localmente con Dokploy) que implemente réplicas de lectura automatizadas y contenedores aislados de los sistemas de origen, unificando datos de forma controlada, segura y económica."
            }
          ]
        },
        {
          id: "MI1.2",
          titulo: "Calidad y actualización constante de los datos académicos",
          acciones: [
            {
              id: "A1.2a",
              tipo: "Tradicional",
              nombre: "Auditorías manuales quincenales",
              descripcion: "Establecer un marco regulatorio institucional de auditorías manuales quincenales sobre las tablas de datos, mediante el uso de formularios de rectificación coordinados con secretaría académica."
            },
            {
              id: "A1.2b",
              tipo: "Innovadora Nube",
              nombre: "Pipelines serverless de calidad",
              descripcion: "Desplegar pipelines serverless de calidad de datos en la nube que realicen validaciones sintácticas y descarte de registros nulos o inconsistentes automáticamente en tiempo de ingesta."
            },
            {
              id: "A1.2c",
              tipo: "Híbrida Local",
              nombre: "Cron Jobs nocturnos locales (Recomendada)",
              descripcion: "Programar tareas e hilos del sistema local (Cron jobs) que se ejecuten automáticamente todas las noches para auditar, limpiar, indexar y corregir inconsistencias lógicas en la base de datos centralizada."
            }
          ]
        }
      ]
    },
    {
      id: "MD2",
      titulo: "Automatización del seguimiento y monitoreo del desempeño estudiantil",
      mediosIndirectos: [
        {
          id: "MI2.1",
          titulo: "Disponibilidad de dashboards e indicadores de desempeño",
          acciones: [
            {
              id: "A2.1a",
              tipo: "Tradicional",
              nombre: "Tableros estáticos Power BI",
              descripcion: "Diseñar y publicar de forma estática tableros de control en Power BI comercial licenciado, actualizados bimestralmente mediante cargas manuales de datos consolidados."
            },
            {
              id: "A2.1b",
              tipo: "Innovadora Nube",
              nombre: "Microfrontends nube en LMS",
              descripcion: "Desarrollar una interfaz analítica modular basada en microfrontends e integrada nativamente en el LMS institucional en la nube, con renderizado dinámico."
            },
            {
              id: "A2.1c",
              tipo: "Híbrida Local",
              nombre: "Dashboard autohospedado Next.js (Recomendada)",
              descripcion: "Construir cuadros de mando web analíticos interactivos y dinámicos en Next.js, desplegados localmente sobre la infraestructura autohospedada del colegio con conexión de réplica de datos segura."
            }
          ]
        },
        {
          id: "MI2.2",
          titulo: "Generación de alertas tempranas para docentes y coordinadores",
          acciones: [
            {
              id: "A2.2a",
              tipo: "Tradicional",
              nombre: "Reportes automatizados PDF por email",
              descripcion: "Desarrollar un módulo clásico de reportes encargado de enviar listados estáticos consolidados en formato PDF por correo institucional al cierre estricto de cada bimestral."
            },
            {
              id: "A2.2b",
              tipo: "Innovadora Nube",
              nombre: "Motor predictivo reactivo móvil",
              descripcion: "Implementar un motor de eventos predictivo que dispare notificaciones push push inmediatas y personalizadas a aplicaciones móviles nativas Flutter/Dart cuando el sistema compute riesgo."
            },
            {
              id: "A2.2c",
              tipo: "Híbrida Local",
              nombre: "Sección intranet de alertas críticas (Recomendada)",
              descripcion: "Configurar un módulo web local de alertas críticas dentro del panel docente, complementado con un script de mensajería automatizada que envíe resúmenes diarios programados sin consumo de APIs externas."
            }
          ]
        }
      ]
    },
    {
      id: "MD3",
      titulo: "Fortalecimiento del monitoreo del comportamiento académico estudiantil",
      mediosIndirectos: [
        {
          id: "MI3.1",
          titulo: "Reducción de dependencia de registros manuales",
          acciones: [
            {
              id: "A3.1a",
              tipo: "Tradicional",
              nombre: "Digitalización manual de hojas",
              descripcion: "Digitalizar los partes de asistencia y conducta delegando en los docentes el llenado diario obligatorio en hojas de cálculo compartidas en la nube (Google Sheets / Excel Online)."
            },
            {
              id: "A3.1b",
              tipo: "Innovadora Nube",
              nombre: "Webhooks de telemetría continuos",
              descripcion: "Configurar el consumo inmediato de streams de datos, logs y tiempos de conectividad mediante webhooks y eventos de telemetría nativos de plataformas Cloud LMS."
            },
            {
              id: "A3.1c",
              tipo: "Híbrida Local",
              nombre: "Modelado SQL de extracción local (Recomendada)",
              descripcion: "Implementar tareas de extracción diaria automatizada mediante consultas SQL directas programadas hacia bases de datos locales para capturar inasistencias y entregas."
            }
          ]
        },
        {
          id: "MI3.2",
          titulo: "Optimización del procesamiento y análisis de datos académicos",
          acciones: [
            {
              id: "A3.2a",
              tipo: "Tradicional",
              nombre: "Módulos estadísticos manuales",
              descripcion: "Desarrollar hojas de cálculo y macros para calcular desviaciones estándar, medias móviles y correlaciones de Pearson de manera manual al cierre de cada semestre escolar."
            },
            {
              id: "A3.2b",
              tipo: "Innovadora Nube",
              nombre: "Mantenimiento automatizado MLOps",
              descripcion: "Desplegar un ciclo de vida MLOps completo en la nube (GCP Vertex/AWS Sagemaker) para gobernar redes neuronales y gradient boosting con reentrenamiento continuo automatizado."
            },
            {
              id: "A3.2c",
              tipo: "Híbrida Local",
              nombre: "Scripts locales Scikit-learn (Recomendada)",
              descripcion: "Programar scripts de Python (Scikit-learn) que se ejecuten localmente en el servidor una vez por semana, entrenando y procesando los scores de riesgo predictivo sin intervención externa."
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="animate-fade-in text-slate-805">
      {/* ── SECCIÓN 1: INTRODUCCIÓN Y MARCO METODOLÓGICO ── */}
      <section id="p04-marco" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            04 · Análisis de Alternativas de Solución · Marco Teórico
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Análisis de Alternativas de Solución (Transition Stage)
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8 font-medium">
            El Análisis de Alternativas de Solución constituye de acuerdo can la metodología del marco lógico <Cite r="CEPAL/ILPES, 2005" /> la etapa de transición crítica. Ésta permite pasar de la estructura abstracta de los objetivos del Árbol de Objetivos a la planificación operativa del sistema real. Describe el <strong>CÓMO</strong> de las transformaciones técnicas necesarias para migrar a la situación positiva deseada orientada por el eje rector:
          </p>

          <div className="border border-indigo-150 bg-indigo-50/30 p-6 rounded-2xl max-w-4xl shadow-xxs mb-10">
            <span className="font-mono text-[10px] text-indigo-700 uppercase tracking-widest font-bold block mb-1">
              EJE RECTOR - OBJETIVO CENTRAL
            </span>
            <p className="text-base sm:text-lg font-serif font-black text-slate-900 italic">
              "{goal}"
            </p>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Acciones Clave por Medio Fundamental (Tarea 1)
          </h3>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8">
            Para cada medio fundamental que compone el Árbol de Objetivos, se define la pregunta: <em>¿Qué hacemos conceptualmente para lograr el cambio?</em> A continuación, formule el cruce con los 3 paradigmas tecnológicos considerados:
          </p>

          {/* TAB SYSTEM INNER */}
          <div className="flex border-b border-slate-200 max-w-5xl mb-6">
            <button
              onClick={() => { setActiveTab("explorer"); window.history.pushState(null, "", "#p04-acciones"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "explorer"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Explorador de Medios (Tarea 1)
            </button>
            <button
              onClick={() => { setActiveTab("matrix"); window.history.pushState(null, "", "#p04-alternativas"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "matrix"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Matriz de Alternativas (Tarea 2)
            </button>
            <button
              onClick={() => { setActiveTab("evaluation"); window.history.pushState(null, "", "#p04-evaluacion"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "evaluation"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Juicio Comercial & Evaluación
            </button>
            <button
              onClick={() => { setActiveTab("design-thinking"); window.history.pushState(null, "", "#p04-design-thinking"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "design-thinking"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Portafolio Design Thinking
            </button>
          </div>

          {/* TAB 1: EXPLORER OF MEDIOS */}
          {activeTab === "explorer" && (
            <div id="p04-acciones" className="max-w-5xl space-y-6">
              {/* MD switcher button row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MDs.map((md) => (
                  <button
                    key={md.id}
                    onClick={() => setSelectedMD(md.id)}
                    className={`p-4 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      selectedMD === md.id
                        ? "bg-slate-950 border-slate-950 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-wider font-extrabold pb-1">
                      Componente {md.id}
                    </p>
                    <p className="font-serif font-bold leading-snug">
                      {md.id === "MD1" ? "MD1: Análisis Integrado" : md.id === "MD2" ? "MD2: Automatización Seg." : "MD3: Monitoreo Conducta"}
                    </p>
                  </button>
                ))}
              </div>

              {/* MD details showing MI items */}
              {MDs.filter((md) => md.id === selectedMD).map((md) => (
                <div key={md.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/30">
                  <span className="font-mono text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                    Foco de Cambio: {md.id}
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base mt-2 mb-6">
                    {md.titulo}
                  </h4>

                  <div className="space-y-8">
                    {md.mediosIndirectos.map((mi) => (
                      <div key={mi.id} className="border-l-2 border-slate-300 pl-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded font-black">
                            {mi.id}
                          </span>
                          <h5 className="font-serif font-black text-slate-900 text-xs sm:text-sm">
                            {mi.titulo}
                          </h5>
                        </div>

                        {/* Traditional vs Cloud vs Hybrid cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
                          {mi.acciones.map((acc) => {
                            let itemColor = "border-slate-200 bg-white hover:border-slate-300";
                            let badgeColor = "bg-slate-150 text-slate-700";
                            let iconEl = <Database className="w-4 h-4 text-slate-500" />;

                            if (acc.tipo === "Innovadora Nube") {
                              badgeColor = "bg-blue-105 text-blue-700 border border-blue-200";
                              iconEl = <Cloud className="w-4 h-4 text-blue-500" />;
                            } else if (acc.tipo === "Híbrida Local") {
                              itemColor = "border-emerald-300 bg-emerald-50/20";
                              badgeColor = "bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold";
                              iconEl = <Server className="w-4 h-4 text-emerald-600" />;
                            }

                            return (
                              <div
                                key={acc.id}
                                className={`border p-4 rounded-xl flex flex-col justify-between transition-all shadow-xxs ${itemColor}`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-[9px] text-slate-400 font-bold">{acc.id}</span>
                                    <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${badgeColor} flex items-center gap-1`}>
                                      {iconEl}
                                      {acc.tipo === "Híbrida Local" ? "HÍBRIDO / ÓPTIMO" : acc.tipo.toUpperCase()}
                                    </span>
                                  </div>
                                  <h6 className="font-serif font-black text-slate-900 text-xs mb-1.5 leading-snug">
                                    {acc.nombre}
                                  </h6>
                                  <p className="text-slate-600 text-[11px] leading-relaxed text-justify">
                                    {acc.descripcion}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: ALTERNATIVES MATRIX TABLE */}
          {activeTab === "matrix" && (
            <div id="p04-alternativas" className="max-w-5xl space-y-6">
              {/* Graphic cards blocks (Page 5 summary blocks) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-200 bg-slate-50/30 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4 border shadow-xxs font-mono font-bold">1</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 1</h4>
                  <p className="font-serif text-[10px] text-slate-500 uppercase tracking-widest font-black">ENFOQUE BI TRADICIONAL</p>
                  <p className="text-[11px] text-slate-600 leading-normal text-justify mt-3">
                    Basado en migraciones por lotes manuales (ETL) y reportería bimestral estática en Power BI comercial.
                  </p>
                  <div className="border-t border-slate-150 pt-2.5 mt-2.5 text-[9px] font-mono text-amber-800 font-extrabold uppercase">
                    RESULTADO: Reportes reactivos al final de periodo
                  </div>
                </div>

                <div className="border border-blue-150 bg-blue-50/10 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-blue-105 text-blue-700 flex items-center justify-center mb-4 border border-blue-150 shadow-xxs font-mono font-bold">2</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 2</h4>
                  <p className="font-serif text-[10px] text-blue-600 uppercase tracking-widest font-black">ENFOQUE ML-OPS CLOUD NUBE</p>
                  <p className="text-[11px] text-slate-600 leading-normal text-justify mt-3">
                    Arquitectura automatizada mediante Data Lakehouses en nube pública con MLOps y notificaciones Flutter en tiempo real.
                  </p>
                  <div className="border-t border-slate-150 pt-2.5 mt-2.5 text-[9px] font-mono text-blue-700 font-extrabold uppercase">
                    RESULTADO: IA altamente escalable en la nube
                  </div>
                </div>

                <div className="border border-emerald-250 bg-emerald-50/20 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200 shadow-xxs font-mono font-bold">3</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 3</h4>
                  <p className="font-serif text-[10px] text-emerald-800 uppercase tracking-widest font-black">ENFOQUE HÍBRIDO AUTOHOSPEDADO</p>
                  <p className="text-[11px] text-slate-700 leading-normal text-justify mt-3 font-semibold">
                    Servidores locales administrados vía Dokploy, interfaz Next.js y cómputo predictivo local offline mediante Python/Scikit-learn.
                  </p>
                  <div className="border-t border-emerald-300 pt-2.5 mt-2.5 text-[9px] font-mono text-emerald-800 font-extrabold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    RESULTADO: IA de bajo costo y seguridad de datos local
                  </div>
                </div>
              </div>

              {/* Matrix Table (Page 6 table schema) */}
              <div className="bg-white border rounded-2xl overflow-hidden shadow-xs border-slate-200">
                <div className="p-4 bg-slate-800 border-b">
                  <p className="font-serif font-bold text-white text-xs sm:text-sm">
                    Matriz de Componentes y Proyectos Alternativos
                  </p>
                </div>
                <div className="overflow-x-auto text-[11px] sm:text-xs">
                  <table className="w-full text-justify divide-y divide-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-mono font-bold text-slate-700 text-[10px] uppercase w-1/4">
                          Medio Directo (Comp.)
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-slate-655 text-[10px] uppercase w-1/4">
                          Alt 1: Enfoque Tradicional BI
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-blue-700 text-[10px] uppercase w-1/4">
                          Alt 2: Enfoque Innovador Cloud
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-emerald-800 text-[10px] uppercase w-1/4 bg-emerald-50/40">
                          Alt 3: Enfoque Híbrido Autohospedado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD1: Análisis integrado de datos académicos y conductuales de los estudiantes.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A1.1a:</strong> Scripts programados de migración por lotes hacia BD PostgreSQL.</p>
                          <p><strong>- A1.2a:</strong> Auditorías quincenales manuales con fichas físicas.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1">
                          <p><strong>- A1.1b:</strong> Data Lakehouse robusto en la nube (AWS/GCP/Azure) a tiempo real.</p>
                          <p><strong>- A1.2b:</strong> Pipelines serverless de validación sintáctica de ingesta nula.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A1.1c:</strong> Instancia local (VPS bajo Dokploy) con réplicas de bases de datos de producción.</p>
                          <p><strong>- A1.2c:</strong> Tareas automáticas Cron nocturnas de depuración y limpieza relacional.</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD2: Automatización del seguimiento y monitoreo del desempeño académico.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A2.1a:</strong> Tableros de Power BI comercial estáticos bimestrales.</p>
                          <p><strong>- A2.2a:</strong> Envío masivo periódico de listados de riesgo en PDF por correo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1 font-sans">
                          <p><strong>- A2.1b:</strong> Interfaz analítica web modular insertada directo en el LMS Cloud.</p>
                          <p><strong>- A2.2b:</strong> Disparadores automáticos de alertas mediante notificaciones push en App móvil Flutter.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A2.1c:</strong> Aplicación web local interactiva en Next.js conectada al servidor local analítico.</p>
                          <p><strong>- A2.2c:</strong> Módulo web local de alertas para profesores con reportes automáticos integrados.</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD3: Fortalecimiento del monitoreo del comportamiento escolar.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A3.1a:</strong> Llenado diario de asistencia en hojas de cálculo online.</p>
                          <p><strong>- A3.2a:</strong> Análisis descriptivo estadístico tradicional ejecutado post-ciclo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1">
                          <p><strong>- A3.1b:</strong> Telemetría inmediata conductual mediante eventos y webhooks en LMS.</p>
                          <p><strong>- A3.2b:</strong> Infraestructura robusta de MLOps para entrenamiento y servicio predictivo continuo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A3.1c:</strong> Extracción diaria automatizada desde bases de datos locales.</p>
                          <p><strong>- A3.2c:</strong> Scripts semanales locales en Python (Scikit-learn) para cómputo de modelos ML.</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL EVALUATION */}
          {activeTab === "evaluation" && (
            <div id="p04-evaluacion" className="max-w-5xl space-y-8">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Evaluación de Suficiencia y Consistencia Respecto al Objetivo Central
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed text-justify mb-4">
                El tribunal evaluador y la dirección técnica del proyecto someten a un riguroso análisis a los tres enfoques de ingeniería para validar la consistencia académica, viabilidad y pertinencia en la <strong>IEP Peruano Francés</strong>.
              </p>

              <div className="space-y-6">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className={`border rounded-2xl p-6 transition-all ${
                      alt.num === 3
                        ? "border-emerald-350 bg-emerald-50/20 shadow-xs ring-1 ring-emerald-500/10"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {alt.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                            Proyecto Alternativo N° 0{alt.num}
                          </span>
                          <h4 className="font-serif font-bold text-slate-950 text-base">
                            {alt.titulo}
                          </h4>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-md border ${alt.tagColor} text-center`}>
                        {alt.evaluacion}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm">
                      <div className="space-y-3">
                        <p className="text-slate-700 leading-relaxed text-justify">
                          <strong>Enfoque Estratégico:</strong> {alt.enfoque}
                        </p>
                        <p className="text-slate-700 leading-relaxed text-justify">
                          <strong>Infraestructura TI:</strong> {alt.infra}
                        </p>
                        <p className="text-slate-600 leading-relaxed text-justify">
                          <strong>Descripción Operativa:</strong> {alt.descripcion}
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex flex-col justify-between">
                        <div>
                          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-extrabold mb-1">
                            JUICIO DE VIABILIDAD TÉCNICA Y PRÁCTICA
                          </p>
                          <p className="text-slate-800 text-xs text-justify leading-relaxed font-medium italic">
                            "{alt.motivo}"
                          </p>
                        </div>
                        {alt.num === 3 && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-850 font-semibold p-2.5 rounded-lg text-[11px] mt-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                            <span>Veredicto Académico: Seleccionada como la óptima e ideal para implantación.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MIGRATED DESIGN THINKING UX PORTFOLIO */}
          {activeTab === "design-thinking" && (
            <div id="p04-design-thinking" className="max-w-5xl space-y-10">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                  Metodología Design Thinking — Portafolio de Empatía & co-Diseño UX
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed text-justify font-medium">
                  En sintonía con las mejores prácticas en el desarrollo de software y gestión del alcance del proyecto, implementamos dinámicas ágiles y participativas con docentes y familias para estructurar el problema desde la vivencia del usuario final.
                </p>
              </div>

              {/* Design Thinking Steps Collapsible Menu */}
              <div className="space-y-6">
                {/* 1. EMPATIZAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "empatia" ? null : "empatia")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 1: Empatizar — Mapas de Empatía con Stakeholders
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "empatia" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>
                  
                  {expandedDT === "empatia" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-6">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                        Permitió diseccionar las percepciones silenciosas de los usuarios esenciales: qué piensan, qué dicen, qué sensaciones albergan y qué miedos experimentan frente a la deserción u ocultación del fracaso académico.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Mapa de Empatía Docente */}
                        <div className="bg-white border rounded-2xl p-5 shadow-xxs">
                          <span className="bg-indigo-100 text-indigo-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                            Perfil Docente Tutor
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3 mt-1.5">
                            Visualización: Mapa de Empatía del Docente
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/Mapa de empatia.png"
                              alt="Mapa de Empatía Docente"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-80 object-contain"
                            />
                          </div>
                        </div>

                        {/* Mapa de Empatía Padres */}
                        <div className="bg-white border rounded-2xl p-5 shadow-xxs">
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                            Perfil Familia (Apoderados)
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3 mt-1.5">
                            Visualización: Mapa de Empatía de la Familia
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/Mapa de Empatia Padres.png"
                              alt="Mapa de Empatía Familia"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-80 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. DEFINICIÓN */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "definir" ? null : "definir")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 2: Definición — Fichas de Buyer Persona
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "definir" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "definir" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
                        Modelado del arquetipo de usuario de nuestra solución escolar, permitiendo definir roles precisos que sustenten luego el desarrollo de nuestra especificación tecnológica del SIA-T.
                      </p>

                      <div className="bg-white border rounded-2xl p-5 shadow-xxs flex justify-center">
                        <div className="w-full max-w-xl text-center">
                          <span className="bg-blue-100 text-blue-800 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase mb-2 inline-block">
                            Arquetipo Tutor Escolar
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Ficha de Personas: Luis Ramírez - Docente Tutor Coordinador
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-3 flex justify-center">
                            <img
                              src="/Buyer Persona Principal Docente.png"
                              alt="Luis Ramírez - Buyer Persona Docente"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-[420px] object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. IDEACIÓN */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "idear" ? null : "idear")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 3: Idear — Brainstorming de Afinidad & SCAMPER
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "idear" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "idear" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
                        Dinámicas grupales creativas basadas en mapas de afinidad y diagramación del método SCAMPER para depurar las mejores propuestas y definir los límites del producto final (SIA-T).
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border rounded-2xl p-4 shadow-xxs">
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Diagrama de Afinidad / Brainstorming Cruzado
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/Diagrama de Afinidad.png"
                              alt="Brainstorming de Afinidad"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-72 object-contain"
                            />
                          </div>
                        </div>

                        <div className="bg-white border rounded-2xl p-4 shadow-xxs">
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Matriz Creativa de Estimulación SCAMPER
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/SCAMPER.png"
                              alt="SCAMPER Loop"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-72 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. PROTOTIPAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "prototipar" ? null : "prototipar")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 4: Prototipar — Mockup del Dashboard SIA-T
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "prototipar" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "prototipar" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
                        Mockups y diagramas de bento-grid interactivos orientados a la adopción docente rápida y visualización de semáforos de riesgo del promedio de asistencia escolar por grado.
                      </p>

                      <div className="bg-white border rounded-2xl p-5 shadow-xxs flex justify-center">
                        <div className="w-full max-w-2xl text-center">
                          <span className="bg-[#e8f5f5] text-[#0d7377] text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase mb-2 inline-block">
                            Dashboard UI Mockup
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Maqueta Digital de Interfaz para Monitoreo de Alertas Críticas
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-3 flex justify-center">
                            <img
                              src="/PROTOTIPO.jpeg"
                              alt="Mockup de Interfaz SIA-T"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-96 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. EVALUAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "evaluar" ? null : "evaluar")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 5: Evaluar — Customer Journey & Estrella de Mar
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "evaluar" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "evaluar" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-6">
                      <p className="text-slate-655 text-xs sm:text-sm leading-relaxed text-justify">
                        Evaluación sistémica de la experiencia del docente dentro del flujo habitual y recopilación del feedback interactivo mediante retrospectivas retrospectivas formales.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border rounded-2xl p-4 shadow-xxs">
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Customer Journey Map del Docente Tutor
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/Customer Journey Docente.png"
                              alt="Customer Journey del docente escolar"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-72 object-contain"
                            />
                          </div>
                        </div>

                        <div className="bg-white border rounded-2xl p-4 shadow-xxs">
                          <h5 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3">
                            Taller de Diagnóstico Retrospectivo Estrella de Mar
                          </h5>
                          <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border p-2 flex justify-center">
                            <img
                              src="/ESTRELLA DE MAR.png"
                              alt="Diagrama Estrella de Mar"
                              referrerPolicy="no-referrer"
                              className="w-full max-h-72 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
