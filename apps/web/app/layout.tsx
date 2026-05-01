import { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: "BSF Almacenes del Perú - AI Operativo",
    template: "%s | BSF Almacenes",
  },
  description:
    "Plataforma operativa y de notificaciones asistida por inteligencia artificial para gerencia de almacenes y logística en BSF Almacenes del Perú.",
  icons: {
    icon: "/logo-sin-fondo.png",
    apple: "/logo-sin-fondo.png",
  },
  keywords: [
    "BSF",
    "Almacenes del Perú",
    "Logística",
    "Operaciones",
    "AI",
    "Gestión",
  ],
  authors: [{ name: "BSF Almacenes del Perú" }],
  creator: "BSF",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    title: "BSF Almacenes del Perú - AI Operativo",
    description:
      "Plataforma operativa para gerencia de almacenes y logística en BSF Almacenes del Perú.",
    siteName: "BSF AI Operativo",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
