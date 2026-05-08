import type { Metadata } from "next";
import { Inter, Lora, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", style: ["normal", "italic"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://peruano-frances-web.vercel.app"),
  title: "Sistema ML - Detección de Riesgo de Deserción Escolar | IE Peruano Francés",
  description:
    "Formulación y evaluación de un sistema inteligente basado en ML para la detección del riesgo de deserción escolar en la IE Peruano Francés, Villa el Salvador.",
  openGraph: {
    title: "Sistema ML - Deserción Escolar | IE Peruano Francés",
    description: "Proyecto universitario UNTELS - ISR0832",
    type: "website",
    images: [{ url: "/logo.jpeg", width: 1080, height: 1080, alt: "Logo IE Peruano Francés" }],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className={`${inter.variable} ${lora.variable} ${spaceMono.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
