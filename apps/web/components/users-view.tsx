"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  Clock3Icon,
  MailPlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon,
  Users2Icon,
  XCircleIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"

type UserStatus = "Activo" | "Pendiente" | "Suspendido"

type ManagedUser = {
  id: string
  name: string
  email: string
  role: string
  site: string
  status: UserStatus
  lastAccess: string
  owner: string
}

type InviteDraft = {
  name: string
  email: string
  role: string
  site: string
}

const userRoles = ["Admin", "Analista"]

const userSites = ["Villa El Salvador", "Portada de Lurín", "Logiscity"]

const defaultInviteDraft: InviteDraft = {
  name: "",
  email: "",
  role: "Analista",
  site: "Villa El Salvador",
}

const initialUsers: ManagedUser[] = [
  {
    id: "user-001",
    name: "Claudia Rojas",
    email: "claudia.rojas@bsf.pe",
    role: "Admin",
    site: "Villa El Salvador",
    status: "Activo",
    lastAccess: "Hoy, 09:42",
    owner: "TI Corporativo",
  },
  {
    id: "user-002",
    name: "Jorge Valdivia",
    email: "jorge.valdivia@bsf.pe",
    role: "Analista",
    site: "Portada de Lurín",
    status: "Activo",
    lastAccess: "Hoy, 08:18",
    owner: "Comercial",
  },
  {
    id: "user-003",
    name: "Mariela Paredes",
    email: "mariela.paredes@bsf.pe",
    role: "Analista",
    site: "Logiscity",
    status: "Pendiente",
    lastAccess: "Invitación enviada",
    owner: "Operaciones",
  },
  {
    id: "user-004",
    name: "Renato Huamán",
    email: "renato.huaman@bsf.pe",
    role: "Analista",
    site: "Villa El Salvador",
    status: "Activo",
    lastAccess: "Ayer, 17:05",
    owner: "Legal",
  },
  {
    id: "user-005",
    name: "Patricia Salazar",
    email: "patricia.salazar@bsf.pe",
    role: "Analista",
    site: "Portada de Lurín",
    status: "Suspendido",
    lastAccess: "15 abr. 2026",
    owner: "Finanzas",
  },
]

export function UsersView() {
  const [users, setUsers] = React.useState<ManagedUser[]>(initialUsers)
  const [query, setQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [siteFilter, setSiteFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [inviteDraft, setInviteDraft] =
    React.useState<InviteDraft>(defaultInviteDraft)

  const filteredUsers = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return users.filter((user) => {
      const matchesQuery =
        !normalizedQuery ||
        `${user.name} ${user.email} ${user.role} ${user.site}`
          .toLowerCase()
          .includes(normalizedQuery)
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesSite = siteFilter === "all" || user.site === siteFilter
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter

      return matchesQuery && matchesRole && matchesSite && matchesStatus
    })
  }, [query, roleFilter, siteFilter, statusFilter, users])

  const activeCount = users.filter((user) => user.status === "Activo").length
  const pendingCount = users.filter(
    (user) => user.status === "Pendiente"
  ).length
  const suspendedCount = users.filter(
    (user) => user.status === "Suspendido"
  ).length

  function updateInviteDraft<T extends keyof InviteDraft>(
    field: T,
    value: InviteDraft[T]
  ) {
    setInviteDraft((current) => ({ ...current, [field]: value }))
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open)

    if (!open) {
      setInviteDraft(defaultInviteDraft)
    }
  }

  function handleInviteUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = inviteDraft.name.trim()
    const email = inviteDraft.email.trim()

    if (!name || !email) {
      return
    }

    const user: ManagedUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: inviteDraft.role,
      site: inviteDraft.site,
      status: "Pendiente",
      lastAccess: "Invitación enviada",
      owner: "TI Corporativo",
    }

    setUsers((current) => [user, ...current])
    setDialogOpen(false)
    setInviteDraft(defaultInviteDraft)
  }

  return (
    <section className="flex min-h-0 animate-in flex-col overflow-hidden bg-background duration-300 ease-out fade-in-0">
      <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium sm:text-base">
            Gestión de usuarios
          </h1>
          <p className="text-xs text-muted-foreground">
            Administra accesos, roles y sedes habilitadas para el equipo BSF.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm">
              <MailPlusIcon data-icon="inline-start" />
              Invitar usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl sm:max-w-[500px]">
            <form className="flex flex-col gap-5" onSubmit={handleInviteUser}>
              <DialogHeader>
                <DialogTitle>Invitar usuario</DialogTitle>
                <DialogDescription>
                  Registra un acceso inicial con rol, sede y correo corporativo.
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="user-name">Nombre completo</FieldLabel>
                  <Input
                    id="user-name"
                    onChange={(event) =>
                      updateInviteDraft("name", event.target.value)
                    }
                    placeholder="Ej. Ana Mendoza"
                    value={inviteDraft.name}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="user-email">Correo corporativo</FieldLabel>
                  <Input
                    id="user-email"
                    onChange={(event) =>
                      updateInviteDraft("email", event.target.value)
                    }
                    placeholder="ana.mendoza@bsf.pe"
                    type="email"
                    value={inviteDraft.email}
                  />
                  <FieldDescription>
                    Se enviará una invitación para activar el acceso.
                  </FieldDescription>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Rol</FieldLabel>
                    <Select
                      onValueChange={(value) => updateInviteDraft("role", value)}
                      value={inviteDraft.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {userRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Sede</FieldLabel>
                    <Select
                      onValueChange={(value) => updateInviteDraft("site", value)}
                      value={inviteDraft.site}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sede" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {userSites.map((site) => (
                            <SelectItem key={site} value={site}>
                              {site}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>

              <DialogFooter>
                <Button
                  onClick={() => handleDialogOpenChange(false)}
                  type="button"
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button disabled={!inviteDraft.name.trim() || !inviteDraft.email.trim()}>
                  <MailPlusIcon data-icon="inline-start" />
                  Enviar invitación
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-muted/10">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-4">
            <UsersSummaryCard
              description="Usuarios registrados"
              icon={Users2Icon}
              label="Total usuarios"
              value={`${users.length}`}
            />
            <UsersSummaryCard
              description="Con acceso vigente"
              icon={UserRoundCheckIcon}
              label="Activos"
              value={`${activeCount}`}
            />
            <UsersSummaryCard
              description="Esperando activación"
              icon={Clock3Icon}
              label="Pendientes"
              value={`${pendingCount}`}
            />
            <UsersSummaryCard
              description="Acceso detenido"
              icon={XCircleIcon}
              label="Suspendidos"
              value={`${suspendedCount}`}
            />
          </div>

          <Card className="overflow-hidden py-0 shadow-sm">
            <CardHeader className="border-b p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheckIcon />
                    Directorio y permisos
                  </CardTitle>
                  <CardDescription>
                    Filtra usuarios por rol, sede y estado para revisar accesos.
                  </CardDescription>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex h-9 items-center gap-2 rounded-md border bg-background px-3 shadow-sm">
                    <SearchIcon className="shrink-0" />
                    <Input
                      className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Buscar usuario"
                      value={query}
                    />
                  </div>

                  <Select onValueChange={setRoleFilter} value={roleFilter}>
                    <SelectTrigger className="h-9 w-full sm:w-[170px]">
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Todos los roles</SelectItem>
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={setSiteFilter} value={siteFilter}>
                    <SelectTrigger className="h-9 w-full sm:w-[170px]">
                      <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Todas las sedes</SelectItem>
                        {userSites.map((site) => (
                          <SelectItem key={site} value={site}>
                            {site}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className="h-9 w-full sm:w-[150px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Suspendido">Suspendido</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100svh-22rem)] min-h-[360px]">
                <div className="min-w-[900px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Sede</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Último acceso</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-9">
                                <AvatarFallback>
                                  {getUserInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {user.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.site}</TableCell>
                          <TableCell>
                            <UserStatusBadge status={user.status} />
                          </TableCell>
                          <TableCell>{user.lastAccess}</TableCell>
                          <TableCell>{user.owner}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline">
                                Editar
                              </Button>
                              <Button size="sm" variant="ghost">
                                Revisar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 px-4 py-16 text-center">
                      <Users2Icon />
                      <p className="text-sm font-medium">
                        No hay usuarios con esos filtros
                      </p>
                      <p className="max-w-sm text-xs text-muted-foreground">
                        Ajusta la búsqueda o limpia los filtros para ver más
                        resultados.
                      </p>
                    </div>
                  ) : null}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/30">
                  <CheckCircle2Icon />
                </span>
                <div>
                  <p className="text-sm font-medium">Control de accesos</p>
                  <p className="text-xs text-muted-foreground">
                    Revisa usuarios pendientes y suspensiones antes del cierre
                    semanal.
                  </p>
                </div>
              </div>
              <Separator className="sm:hidden" />
              <Badge variant="secondary">Actualizado hace 5 min</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UsersSummaryCard({
  description,
  icon: Icon,
  label,
  value,
}: {
  description: string
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <Card className="overflow-hidden py-0 shadow-sm">
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-medium tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/30">
          <Icon />
        </span>
      </CardContent>
    </Card>
  )
}

function UserStatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge
      variant={
        status === "Activo"
          ? "secondary"
          : status === "Pendiente"
            ? "outline"
            : "destructive"
      }
      className={cn("gap-1.5")}
    >
      {status === "Activo" ? <CheckCircle2Icon data-icon="inline-start" /> : null}
      {status === "Pendiente" ? <Clock3Icon data-icon="inline-start" /> : null}
      {status === "Suspendido" ? <XCircleIcon data-icon="inline-start" /> : null}
      {status}
    </Badge>
  )
}

function getUserInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}
