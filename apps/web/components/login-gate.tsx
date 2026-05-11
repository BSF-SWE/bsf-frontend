"use client"

import * as React from "react"
import Image from "next/image"
import {
  MapPinIcon,
  MoonIcon,
  RouteIcon,
  ShieldCheckIcon,
  SunIcon,
  WarehouseIcon,
} from "lucide-react"

import { AiChatShell } from "@/components/ai-chat-shell"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@workspace/ui/lib/utils"

const LOGIN_STORAGE_KEY = "bsf:keycloak-mock-authenticated"
type RightPanelTheme = "light" | "dark"

const operationalPins = [
  { label: "Villa El Salvador", position: "left-[16%] top-[24%]" },
  { label: "Lurín", position: "left-[64%] top-[30%]" },
  { label: "Lurín Sur", position: "left-[58%] top-[68%]" },
]

export function LoginGate() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [rightPanelTheme, setRightPanelTheme] =
    React.useState<RightPanelTheme>("light")
  const isRightPanelDarkMode = rightPanelTheme === "dark"

  React.useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(LOGIN_STORAGE_KEY) === "true")
  }, [])

  function handleKeycloakContinue() {
    sessionStorage.setItem(LOGIN_STORAGE_KEY, "true")
    setIsAuthenticated(true)
  }

  function handleThemeToggle() {
    setRightPanelTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    )
  }

  if (isAuthenticated) {
    return <AiChatShell />
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-zinc-950 text-zinc-50 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_22%,var(--ai-chat-pro),transparent_24%),radial-gradient(circle_at_72%_70%,rgb(255_255_255_/_0.18),transparent_28%)] opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0_46%,rgb(255_255_255_/_0.08)_46%_47%,transparent_47%_100%),linear-gradient(25deg,transparent_0_58%,rgb(255_255_255_/_0.08)_58%_59%,transparent_59%_100%)]" />
          <div className="absolute inset-10 rounded-[2rem] border border-white/10" />
          <div className="absolute left-16 right-16 top-1/2 h-px -rotate-6 bg-white/20" />
          <div className="absolute bottom-24 left-24 right-24 h-px rotate-12 bg-white/15" />
          <div className="absolute left-1/2 top-28 h-[68%] w-px rotate-[18deg] bg-white/15" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
            <div className="flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.28em] text-zinc-50/70 uppercase backdrop-blur">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <WarehouseIcon className="size-5" />
              </span>
              Red operativa BSF
            </div>

            <div className="relative min-h-[460px] px-2 py-4">
              {operationalPins.map((pin) => (
                <div
                  key={pin.label}
                  className={`absolute ${pin.position} flex items-center gap-3`}
                >
                  <span className="relative flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur">
                    <span className="absolute size-16 rounded-full border border-[var(--ai-chat-pro)]/35" />
                    <MapPinIcon className="size-5 text-[var(--ai-chat-pro)]" />
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-zinc-50/75 uppercase backdrop-blur">
                    {pin.label}
                  </span>
                </div>
              ))}

              <div className="absolute -bottom-16 left-2 max-w-[330px] rounded-[1.75rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md xl:p-6">
                <RouteIcon className="mb-5 size-8 text-[var(--ai-chat-pro)]" />
                <p className="text-2xl leading-tight font-semibold tracking-tight xl:text-3xl">
                  Inteligencia para anticipar, coordinar y ejecutar.
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-50/65">
                  Trazabilidad de flota, depósitos y alertas críticas en una
                  sola superficie de decisión.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-1 text-xs tracking-[0.22em] text-zinc-50/45 uppercase">
              <span>BSF Control Tower</span>
              <span>Operaciones 24/7</span>
            </div>
          </div>
        </section>

        <section
          className={cn(
            "relative flex min-h-screen flex-col bg-background text-foreground",
            isRightPanelDarkMode && "dark"
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={
              isRightPanelDarkMode
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            className="absolute right-5 top-5 rounded-full border border-border bg-muted/40 sm:right-6 sm:top-6"
            onClick={handleThemeToggle}
          >
            {isRightPanelDarkMode ? (
              <SunIcon data-icon="inline-start" />
            ) : (
              <MoonIcon data-icon="inline-start" />
            )}
          </Button>

          <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
            <Card className="w-full max-w-[464px] gap-0 border-border/70 bg-card/95 py-0 shadow-none ring-border/70">
              <CardHeader className="items-center gap-6 px-6 pt-12 pb-8 text-center sm:px-10">
                <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-[0.68rem] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                  <ShieldCheckIcon className="size-3.5" />
                  Plataforma de inteligencia operativa
                </div>
                <div className="flex w-full justify-center">
                  <div className="flex h-36 w-full max-w-[320px] items-center justify-center rounded-sm bg-muted/30 px-8 py-6">
                    <Image
                      src="/logo-sin-fondo.png"
                      alt="BSF"
                      width={300}
                      height={128}
                      priority
                      className="mx-auto h-auto w-full max-w-[260px] object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-3xl font-semibold tracking-[0.18em] uppercase sm:text-4xl">
                    Bienvenido
                  </CardTitle>
                  <CardDescription className="mx-auto max-w-sm leading-6">
                    Accede al entorno de inteligencia operativa con tu identidad
                    corporativa.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-10 sm:px-10">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-12 w-full justify-center border-border text-sm font-semibold tracking-[0.16em] uppercase"
                  onClick={handleKeycloakContinue}
                >
                  <span
                    data-icon="inline-start"
                    className="inline-flex size-4 items-center justify-center"
                    aria-hidden
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="2" y="2" width="9" height="9" rx="1" fill="#F25022" />
                      <rect x="13" y="2" width="9" height="9" rx="1" fill="#7FBA00" />
                      <rect x="2" y="13" width="9" height="9" rx="1" fill="#00A4EF" />
                      <rect x="13" y="13" width="9" height="9" rx="1" fill="#FFB900" />
                    </svg>
                  </span>
                  Continúa con Microsoft
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 border-border bg-muted/30 px-6 py-5 sm:px-10">
                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Acceso exclusivo para equipos autorizados de BSF.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                  <a className="transition-colors hover:text-foreground" href="#">
                    Privacidad
                  </a>
                  <Separator orientation="vertical" className="h-3" />
                  <a className="transition-colors hover:text-foreground" href="#">
                    Términos
                  </a>
                  <Separator orientation="vertical" className="h-3" />
                  <a className="transition-colors hover:text-foreground" href="#">
                    Soporte
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
