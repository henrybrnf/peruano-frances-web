import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema ML - Detección de Riesgo de Deserción Escolar | IE Peruano Francés",
  description:
    "Formulación y evaluación de un sistema inteligente basado en ML para la detección del riesgo de deserción escolar en la IE Peruano Francés, Villa el Salvador.",
  openGraph: {
    title: "Sistema ML - Deserción Escolar | IE Peruano Francés",
    description: "Proyecto universitario UNTELS - ISR0832",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
