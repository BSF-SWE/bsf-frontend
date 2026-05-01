"use client"

import * as React from "react"
import {
  ServerIcon,
  DownloadIcon,
  CheckIcon,
  Trash2Icon,
  FilterIcon,
  AlertCircleIcon,
  FileTextIcon,
  PackageIcon,
} from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"
import { type Notification, mockNotifications } from "./manager-notifications"

type FilterTab = "all" | "unread" | "stock" | "report"

export function NotificationsView({
  themePreference,
}: {
  themePreference: "light" | "dark" | "system"
}) {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = React.useState<string>("all")

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const stockCount = notifications.filter((n) => n.type === "stock").length
  const reportCount = notifications.filter((n) => n.type === "report").length

  function markAllAsRead() {
    setNotifications((current) => current.map((n) => ({ ...n, isRead: true })))
  }

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  function clearAll() {
    setNotifications([])
  }

  const filteredNotifications = React.useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead)
      case "stock":
        return notifications.filter((n) => n.type === "stock")
      case "report":
        return notifications.filter((n) => n.type === "report")
      case "all":
      default:
        return notifications
    }
  }, [notifications, activeTab])

  return (
    <section className="flex min-h-0 animate-in flex-col overflow-hidden bg-background duration-300 ease-out fade-in-0">
      <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium sm:text-base">
            Centro de Notificaciones
          </h1>
          <p className="text-xs text-muted-foreground">
            Gestión estructurada de alertas operativas y reportes automatizados.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 ? (
            <Button size="sm" variant="secondary" onClick={markAllAsRead}>
              <CheckIcon data-icon="inline-start" />
              Marcar todas leídas
            </Button>
          ) : null}
          <Button size="sm" variant="outline" onClick={clearAll}>
            <Trash2Icon data-icon="inline-start" />
            Limpiar historial
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-muted/10">
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="border bg-background shadow-sm">
                  <TabsTrigger value="all" className="gap-2">
                    <FilterIcon className="size-3.5" />
                    Todas
                    <Badge
                      variant="secondary"
                      className="ml-1 h-4 px-1.5 py-0 text-[10px]"
                    >
                      {notifications.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="gap-2">
                    <AlertCircleIcon className="size-3.5" />
                    No Leídas
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-4 px-1.5 py-0 text-[10px]"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="stock" className="gap-2">
                    <PackageIcon className="size-3.5" />
                    Inventario
                    <Badge
                      variant="secondary"
                      className="ml-1 h-4 px-1.5 py-0 text-[10px]"
                    >
                      {stockCount}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="report" className="gap-2">
                    <FileTextIcon className="size-3.5" />
                    Reportes
                    <Badge
                      variant="secondary"
                      className="ml-1 h-4 px-1.5 py-0 text-[10px]"
                    >
                      {reportCount}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                  <ServerIcon className="size-3.5" />
                  <span>
                    Conexión SMTP Local:{" "}
                    <strong className="font-medium text-emerald-600">
                      Estable
                    </strong>
                  </span>
                </div>
              </div>
            </Tabs>
          </div>

          <ScrollArea className="min-h-0 flex-1 rounded-xl border bg-background shadow-sm">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                  <CheckIcon className="size-6 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-semibold">Bandeja al día</h3>
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                  No hay notificaciones pendientes en esta categoría. Las
                  alertas operativas aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "group flex flex-col gap-4 p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:p-5",
                      !notification.isRead && "bg-muted/10"
                    )}
                  >
                    {/* Left Column: Icon & Read Indicator */}
                    <div className="flex w-full shrink-0 items-start gap-3 sm:w-[220px]">
                      <div
                        className={cn(
                          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm",
                          !notification.isRead &&
                            "border-primary/20 bg-primary/5"
                        )}
                      >
                        <notification.icon
                          className={cn("size-5", notification.iconClassName)}
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          {notification.type === "stock"
                            ? "Inventario"
                            : "Reporte"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>

                    {/* Middle Column: Content */}
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <span
                            className="flex size-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                            aria-label="No leída"
                          />
                        )}
                        <h3
                          className={cn(
                            "text-sm leading-none font-medium",
                            !notification.isRead &&
                              "font-semibold text-foreground",
                            notification.isRead && "text-foreground/90"
                          )}
                        >
                          {notification.title}
                        </h3>
                      </div>
                      <p className="pr-4 text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>

                    {/* Right Column: Actions & Tags */}
                    <div className="mt-2 flex shrink-0 flex-row items-center justify-between gap-3 sm:mt-0 sm:w-[140px] sm:flex-col sm:items-end sm:justify-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
                          notification.type === "stock"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-blue-200 bg-blue-50 text-blue-700",
                          themePreference === "dark" &&
                            notification.type === "stock"
                            ? "border-amber-900 bg-amber-950/30 text-amber-400"
                            : "",
                          themePreference === "dark" &&
                            notification.type === "report"
                            ? "border-blue-900 bg-blue-950/30 text-blue-400"
                            : ""
                        )}
                      >
                        {notification.type === "stock"
                          ? "Operativa"
                          : "Automatizado"}
                      </Badge>

                      <div className="flex items-center gap-2 opacity-100 transition-opacity group-hover:opacity-100 focus-within:opacity-100 sm:opacity-0">
                        {!notification.isRead ? (
                          <Button
                            size="xs"
                            variant="ghost"
                            className="h-7 text-[11px] font-medium"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckIcon
                              data-icon="inline-start"
                              className="size-3"
                            />
                            Marcar leída
                          </Button>
                        ) : null}
                        {notification.type === "report" ? (
                          <Button
                            size="xs"
                            variant="secondary"
                            className="h-7 px-2.5 text-[11px] shadow-sm"
                          >
                            <DownloadIcon
                              data-icon="inline-start"
                              className="size-3"
                            />
                            Descargar
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}
