import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson", style: ["normal", "italic"], weight: ["400", "600"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://peruano-frances-web.vercel.app"),
  title: "Sistema ML - Alerta Temprana del Bajo Rendimiento Académico | IE Peruano Francés",
  description:
    "Formulación y evaluación de un sistema inteligente usando Machine Learning para alerta temprana del bajo rendimiento académico en la IE Peruano Francés, Villa el Salvador.",
  openGraph: {
    title: "Sistema ML - Alerta Temprana del Bajo Rendimiento Académico | IE Peruano Francés",
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
      <body className={`${playfair.variable} ${crimson.variable} ${spaceMono.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
