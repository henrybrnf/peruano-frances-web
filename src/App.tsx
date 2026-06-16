/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Portada from "./components/Portada";
import Abstract from "./components/Abstract";
import ChapterIntro from "./components/ChapterIntro";
import Introduccion from "./components/Introduccion";
import StakeholderAnalysis from "./components/StakeholderAnalysis";
import ProblemaAnalysis from "./components/ProblemaAnalysis";
import ObjetivoAnalysis from "./components/ObjetivoAnalysis";
import ReferenciasBiblio from "./components/ReferenciasBiblio";
import { TOC_SECTIONS } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking active sections & applying fade effects
  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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

  const handleStartProject = () => {
    const el = document.getElementById("problema");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 relative antialiased">
      {/* Real-time scroll indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 transition-all duration-100 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #0d7377, #1e3a8a)",
        }}
      />

      {/* Header bar */}
      <Header onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="flex pt-14">
        {/* Navigation Sidebar Drawer */}
        <Sidebar
          activeSection={activeSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Core Layout Content */}
        <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-200">
          
          {/* Main Cover Section */}
          <Portada onStartClick={handleStartProject} />

          {/* Research Summary Abstract */}
          <Abstract />

          {/* CHAPTER 00 — INTRODUCCIÓN */}
          <ChapterIntro
            num="00"
            title="Introducción al Diagnóstico"
            subtitle="Análisis de motivación académica, perfil del IEP Peruano Francés, organigrama estratégico y propuesta de valor del sistema inteligente."
            subheading="Capítulo 00 · Introducción"
          />
          <Introduccion />

          {/* CHAPTER 01 — ANÁLISIS DE STAKEHOLDERS */}
          <ChapterIntro
            id="inicio"
            num="01"
            title="Análisis de Stakeholders"
            subtitle="Identificación y priorización de interesados institucionales utilizando las matrices de poder e interés recomendadas por el PMBOK 6."
            subheading="Capítulo 01 · Proceso de Inicio"
            inputs={[
              "Caso de negocio (Business Model Canvas)",
              "Factores ambientales de la empresa",
              "Activos de los procesos de la organización",
              "Planificación del proyecto escolar",
            ]}
            tools={[
              "Lluvia de ideas",
              "Entrevista semi-estructurada",
              "Análisis de interesados (Poder e Interés)",
              "Juicio de expertos escolares",
            ]}
            outputs={[
              "Registro de interesados de la IEP",
              "Estrategia de comunicación y plan de involucramiento",
              "Sintonización de expectativas iniciales",
            ]}
          />
          <StakeholderAnalysis />

          {/* CHAPTER 02 — ANÁLISIS DEL PROBLEMA */}
          <ChapterIntro
            num="02"
            title="Análisis del Problema"
            subtitle="Evaluación lógica de la brecha mediante la recopilación de datos primarios en encuestas y el desarrollo de talleres adaptativos con design thinking."
            subheading="Capítulo 02 · Diagnóstico Crítico"
            inputs={[
              "Percepciones docentes",
              "Fórmulas físicas de reportes escolares",
              "Registros tradicionales de auxilio",
            ]}
            tools={[
              "Marco Lógico (Árbol de problemas)",
              "Encuestas diagnósticas digitales (Forms)",
              "Design Thinking (Empatizar, Definir, Idear, Prototipar, Evaluar)",
            ]}
            outputs={[
              "Enunciado formal del problema central",
              "Foco y específico de causas deterministas",
              "Métricas cuantitativas del cuello de botella",
            ]}
          />
          <ProblemaAnalysis />

          {/* CHAPTER 03 — ANÁLISIS DEL OBJETIVO */}
          <ChapterIntro
            num="03"
            title="Análisis del Objetivo"
            subtitle="Inversión lógica para formular las metas instrumentales preventivas, estructurar el árbol de medios y fines, y validar con el criterio SMART."
            subheading="Capítulo 03 · Metas y Cierre"
            inputs={[
              "Enunciado del problema de riesgo",
              "Árbol de problemas causa-efecto",
              "Análisis de factibilidad técnica",
            ]}
            tools={[
              "Árbol de objetivos instrumentales (Marco Lógico)",
              "Cribado y sintonización de metas SMART",
              "Mapeo de objetivos específicos",
            ]}
            outputs={[
              "Objetivo SMART oficial centralizado",
              "Objetivos específicos funcionales (Medios directos)",
              "Impacto y fin último del software de tutoría",
            ]}
          />
          <ObjetivoAnalysis />

          {/* SYSTEM BIBLIOGRAPHY */}
          <ReferenciasBiblio />

          {/* Persistent global footer */}
          <footer className="bg-slate-900 py-8 text-center text-slate-400 text-xs border-t border-slate-800">
            <p className="font-mono">
              © 2026 · Sistema ML Alerta Temprana del Bajo Rendimiento Académico · IEP Peruano Francés · UNTELS · ISR0832
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
