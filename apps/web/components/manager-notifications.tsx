"use client"

import * as React from "react"
import {
  BellIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PackageIcon,
  ServerIcon,
  TrendingDownIcon,
  CheckIcon,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@workspace/ui/lib/utils"

export type NotificationType = "stock" | "report"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  isRead: boolean
  icon: React.ElementType
  iconClassName?: string
}

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "stock",
    title: "Quiebre de stock inminente",
    description: "Cajas de cartón corrugado A4 al 5%.",
    time: "Hace 10 min",
    isRead: false,
    icon: TrendingDownIcon,
    iconClassName: "text-destructive",
  },
  {
    id: "notif-2",
    type: "stock",
    title: "Movimiento inusual de inventario",
    description: "Salida de 500 unidades de Cinta de Embalaje 3M.",
    time: "Hace 45 min",
    isRead: false,
    icon: PackageIcon,
    iconClassName: "text-amber-500",
  },
  {
    id: "notif-3",
    type: "report",
    title: "Reporte de Estado Logístico (PDF)",
    description: "Generado automáticamente para el cierre del día.",
    time: "Hace 2 horas",
    isRead: false,
    icon: FileTextIcon,
    iconClassName: "text-blue-500",
  },
  {
    id: "notif-4",
    type: "report",
    title: "Inventario general (hoja de cálculo)",
    description: "Reporte periódico de niveles de stock actualizados.",
    time: "Ayer",
    isRead: true,
    icon: FileSpreadsheetIcon,
    iconClassName: "text-emerald-500",
  },
]

export function ManagerNotifications({
  onViewAll,
}: {
  onViewAll?: () => void
}) {
  const [notifications, setNotifications] = React.useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  function markAllAsRead() {
    setNotifications((current) => current.map((n) => ({ ...n, isRead: true })))
  }

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Notificaciones"
          className="relative"
          size="icon-sm"
          variant="ghost"
        >
          <BellIcon />
          {unreadCount > 0 ? (
            <Badge
              aria-hidden
              className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center px-1 py-0 text-[10px] leading-none"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[360px] p-0 sm:w-[400px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm leading-none font-semibold tracking-tight">
                Notificaciones
              </h3>
              <p className="text-xs text-muted-foreground">
                Alertas y reportes operativos
              </p>
            </div>
            {unreadCount > 0 ? (
              <Button
                className="h-auto p-0 text-xs"
                onClick={markAllAsRead}
                variant="link"
              >
                <CheckIcon data-icon="inline-start" className="size-3" />
                Marcar leídas
              </Button>
            ) : null}
          </div>

          <Separator />

          <ScrollArea className="max-h-[380px] min-h-[300px]">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 border-b p-4 transition-colors hover:bg-muted/50",
                    !notification.isRead && "bg-muted/20"
                  )}
                  onClick={() => markAsRead(notification.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background",
                      !notification.isRead && "border-primary/20 bg-primary/5"
                    )}
                  >
                    <notification.icon
                      className={cn("size-4", notification.iconClassName)}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm leading-none font-medium",
                          !notification.isRead && "font-semibold"
                        )}
                      >
                        {notification.title}
                      </p>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    {notification.type === "report" && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Button
                          size="xs"
                          variant="secondary"
                          className="h-6 text-[10px]"
                        >
                          Descargar
                        </Button>
                      </div>
                    )}
                  </div>
                  {!notification.isRead && (
                    <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-col gap-2 border-t bg-muted/30 p-2">
            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={onViewAll}
            >
              Ver todo
            </Button>
            <div className="flex items-center justify-center gap-1.5 pb-1 text-[10px] text-muted-foreground">
              <ServerIcon className="size-3" />
              <span>Enviado vía SMTP local (BSF Infra)</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
