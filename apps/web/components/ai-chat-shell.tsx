"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  AlertTriangleIcon,
  ArrowUpIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  BrainCircuitIcon,
  Building2Icon,
  CalendarClockIcon,
  CircleCheckIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  Code2Icon,
  FileTextIcon,
  FlaskConicalIcon,
  FolderIcon,
  GaugeIcon,
  Globe2Icon,
  GripVerticalIcon,
  EyeIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LibraryIcon,
  LoaderCircleIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  MicIcon,
  MoonIcon,
  PackageCheckIcon,
  PaintbrushIcon,
  PaletteIcon,
  PanelLeftIcon,
  PaperclipIcon,
  PlusIcon,
  RouteIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldCheckIcon,
  SmileIcon,
  SlidersHorizontalIcon,
  SunIcon,
  TrendingUpIcon,
  UploadIcon,
  Users2Icon,
  WarehouseIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  type LucideIcon,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Kbd } from "@workspace/ui/components/kbd"
import { Progress } from "@workspace/ui/components/progress"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import { ManagerNotifications } from "./manager-notifications"
import { NotificationsView } from "./notifications-view"
import { UsersView } from "./users-view"

type ChatGroup = "Recientes" | "Ayer"
type MessageRole = "user" | "assistant"
type MessageStatus = "thinking" | "typing" | "error"
type WorkspaceView =
  | "dashboard"
  | "chat"
  | "knowledge"
  | "settings"
  | "notifications"
  | "users"
type DashboardBlockId =
  | "metrics"
  | "decision"
  | "flow-network"
  | "capacity-risks"
  | "movements-forecast"
type KnowledgeStatus = "Ready" | "Indexing" | "Review"
type ThemePreference = "light" | "dark" | "system"

type ChatMessage = {
  id: string
  role: MessageRole
  content: string
  at: string
  status?: MessageStatus
}

type Chat = {
  id: string
  title: string
  group: ChatGroup
  category: string
  updatedAt: string
  model: string
  messages: ChatMessage[]
}

type PromptAction = {
  label: string
  icon: LucideIcon
  prompt: string
}

type KnowledgeFolder = {
  id: string
  name: string
  description: string
}

type KnowledgePageSection = {
  heading: string
  body: string
}

type KnowledgeTablePreview = {
  headers: string[]
  rows: string[][]
}

type KnowledgeRenderedPage = {
  title: string
  eyebrow: string
  sections: KnowledgePageSection[]
  table?: KnowledgeTablePreview
  callout?: string
  url?: string
}

type KnowledgeSource = {
  id: string
  name: string
  folderId: string
  type: "PDF" | "Doc" | "CSV" | "URL"
  owner: string
  status: KnowledgeStatus
  updatedAt: string
  size: string
  chunks: number
  coverage: number
  tags: string[]
  summary: string
  preview: string[]
  pages: KnowledgeRenderedPage[]
  recommendedUse: string
}

type KnowledgeUploadDraft = {
  file: File | null
  title: string
  folderId: string
  owner: string
  description: string
  intendedUse: string
  tags: string
}

type KnowledgeFolderDraft = {
  name: string
  description: string
}

const defaultModel = "nvidia/llama-3.3-nemotron-super-49b-v1.5"
const modelOptions = [
  {
    label: "NVIDIA Nemotron Super 49B",
    value: defaultModel,
  },
]
const models = modelOptions.map((option) => option.value)

const initialChats: Chat[] = [
  {
    id: "onboarding-flow-review",
    title: "Revisión del flujo de onboarding",
    group: "Recientes",
    category: "Investigación",
    updatedAt: "10:42 AM",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "onboarding-flow-review-1",
        role: "user",
        content:
          "Revisa el flujo de onboarding e identifica los puntos de fricción.",
        at: "10:36 AM",
      },
      {
        id: "onboarding-flow-review-2",
        role: "assistant",
        content:
          "La principal fricción está en la densidad de decisiones de la primera pantalla. Mueve los pasos secundarios detrás de una divulgación progresiva y enfoca la primera acción en un solo momento de activación exitosa.",
        at: "10:37 AM",
      },
    ],
  },
  {
    id: "activation-metrics-breakdown",
    title: "Desglose de métricas de activación",
    group: "Recientes",
    category: "Analítica",
    updatedAt: "9:18 AM",
    model: "GPT-4.1",
    messages: [
      {
        id: "activation-metrics-breakdown-1",
        role: "user",
        content:
          "Desglosa las métricas de activación para un panel de producto.",
        at: "9:13 AM",
      },
      {
        id: "activation-metrics-breakdown-2",
        role: "assistant",
        content:
          "Mide la activación como un embudo: cuenta creada, primera acción clave completada, integración conectada y visita de retorno exitosa dentro de siete días.",
        at: "9:14 AM",
      },
    ],
  },
  {
    id: "user-pain-points-summary",
    title: "Resumen de dolor de usuarios",
    group: "Recientes",
    category: "Resumen",
    updatedAt: "8:04 AM",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "user-pain-points-summary-1",
        role: "user",
        content:
          "Resume los principales puntos de dolor de usuarios a partir de notas de entrevistas.",
        at: "8:01 AM",
      },
      {
        id: "user-pain-points-summary-2",
        role: "assistant",
        content:
          "Los patrones más fuertes son expectativas de configuración poco claras, baja confianza en los datos importados y demasiados ajustes antes de que los usuarios vean su primer resultado útil.",
        at: "8:02 AM",
      },
    ],
  },
  {
    id: "product-roadmap-audit",
    title: "Auditoría del roadmap de producto",
    group: "Ayer",
    category: "Planificación",
    updatedAt: "Ayer",
    model: "Gemini 1.5 Pro",
    messages: [
      {
        id: "product-roadmap-audit-1",
        role: "user",
        content: "Audita este roadmap e identifica riesgos de secuenciación.",
        at: "Ayer",
      },
      {
        id: "product-roadmap-audit-2",
        role: "assistant",
        content:
          "El roadmap es más sólido cuando el trabajo fundacional de datos va antes de la automatización. Lo riesgoso son las funcionalidades de IA orientadas a clientes planificadas antes de terminar la instrumentación de calidad.",
        at: "Ayer",
      },
    ],
  },
  {
    id: "bug-reports-triage",
    title: "Triage de reportes de errores",
    group: "Ayer",
    category: "Código",
    updatedAt: "Ayer",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "bug-reports-triage-1",
        role: "user",
        content: "Clasifica estos reportes de errores por prioridad.",
        at: "Ayer",
      },
      {
        id: "bug-reports-triage-2",
        role: "assistant",
        content:
          "Prioriza primero bloqueadores de login y desajustes en el estado de pagos, luego regresiones visuales y finalmente problemas de copy y estados vacíos.",
        at: "Ayer",
      },
    ],
  },
  {
    id: "competitive-analysis",
    title: "Análisis competitivo",
    group: "Ayer",
    category: "Investigación",
    updatedAt: "Ayer",
    model: "GPT-4.1",
    messages: [
      {
        id: "competitive-analysis-1",
        role: "user",
        content: "Compara las páginas de onboarding y precios de competidores.",
        at: "Ayer",
      },
      {
        id: "competitive-analysis-2",
        role: "assistant",
        content:
          "Los competidores ganan con promesas de configuración concisas y disparadores de upgrade más claros. La oportunidad está en mostrar el tiempo hasta el valor antes de la comparación de planes.",
        at: "Ayer",
      },
    ],
  },
  {
    id: "feature-prioritization",
    title: "Priorización de funcionalidades",
    group: "Ayer",
    category: "Estrategia",
    updatedAt: "Ayer",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "feature-prioritization-1",
        role: "user",
        content:
          "Prioriza esta lista de funcionalidades para el próximo sprint.",
        at: "Ayer",
      },
      {
        id: "feature-prioritization-2",
        role: "assistant",
        content:
          "Ordena por impacto en usuarios y confianza de implementación: corrige bloqueadores de activación, mejora la revisión de importaciones y después agrega filtros avanzados cuando el flujo principal esté estable.",
        at: "Ayer",
      },
    ],
  },
]

const promptActions: PromptAction[] = [
  {
    label: "Resumen",
    icon: BrainCircuitIcon,
    prompt:
      "Resume este chat en decisiones, preguntas abiertas y próximos pasos.",
  },
  {
    label: "Código",
    icon: Code2Icon,
    prompt:
      "Escribe un componente React limpio para esta idea con props tipadas.",
  },

  {
    label: "Investigación",
    icon: Globe2Icon,
    prompt:
      "Investiga este tema y organiza la respuesta por nivel de confianza.",
  },
]

const sidebarTools: PromptAction[] = [
  {
    label: "Investigación y análisis",
    icon: FlaskConicalIcon,
    prompt:
      "Analiza este tema con un enfoque de investigación: resume evidencias, riesgos, oportunidades y próximos pasos recomendados.",
  },
  {
    label: "Búsqueda web",
    icon: Globe2Icon,
    prompt:
      "Prepara un brief de búsqueda web: plan de consultas, fuentes esperadas y formato de síntesis conciso.",
  },
]

const groupOrder: ChatGroup[] = ["Recientes", "Ayer"]

const defaultDashboardBlockOrder: DashboardBlockId[] = [
  "metrics",
  "decision",
  "flow-network",
  "capacity-risks",
  "movements-forecast",
]

const dashboardMetricCards = [
  {
    label: "Ocupación comercial",
    value: "78.4%",
    detail: "Meta gerencial 82%; brecha concentrada en Logiscity",
    trend: "-2.1 pp",
    status: "attention",
    direction: "up",
    icon: WarehouseIcon,
  },
  {
    label: "M² disponibles",
    value: "18,940",
    detail: "14,200 m² vendibles ahora sin restricción operativa",
    trend: "+6.8%",
    status: "normal",
    direction: "up",
    icon: Building2Icon,
  },
  {
    label: "M² arrendados",
    value: "68,720",
    detail: "Sobre 87,660 m² operativos que cuentan en ocupación",
    trend: "+1.9%",
    status: "normal",
    direction: "up",
    icon: PackageCheckIcon,
  },
  {
    label: "Ingreso mensual contratado",
    value: "S/ 2.74M",
    detail: "Incluye USD 184K convertidos a tipo gerencial",
    trend: "+4.4%",
    status: "normal",
    direction: "up",
    icon: TrendingUpIcon,
  },
  {
    label: "Contratos vigentes",
    value: "46",
    detail: "39 contratos y 7 adendas con última versión marcada",
    trend: "+3",
    status: "normal",
    direction: "up",
    icon: FileTextIcon,
  },
  {
    label: "Vencen 30/60/90 días",
    value: "5 / 9 / 14",
    detail: "S/ 612K mensuales requieren plan de renovación",
    trend: "+2 casos",
    status: "attention",
    direction: "up",
    icon: CalendarClockIcon,
  },
  {
    label: "Alertas críticas",
    value: "6",
    detail: "2 comerciales, 3 de data y 1 contractual",
    trend: "+2",
    status: "critical",
    direction: "up",
    icon: AlertTriangleIcon,
  },
  {
    label: "Riesgo ingresos por vencimiento",
    value: "S/ 428K",
    detail: "Clientes con alta renta y renovación no confirmada",
    trend: "+S/ 76K",
    status: "critical",
    direction: "down",
    icon: ShieldCheckIcon,
  },
] satisfies Array<{
  label: string
  value: string
  detail: string
  trend: string
  status: "normal" | "attention" | "critical"
  direction: "up" | "down"
  icon: LucideIcon
}>

const dashboardDecisionItems = [
  {
    title: "Renovar contrato de Andina Retail antes del comité",
    what: "Vence en 26 días y concentra 8,400 m² en Villa El Salvador con renta mensual alta.",
    impact: "S/ 318K mensuales expuestos; perderlo bajaría la ocupación de la sede a 81%.",
    owner: "Gerencia Comercial",
    deadline: "Viernes 12:00",
    action:
      "Enviar propuesta de renovación con ajuste escalonado y reunión con finanzas del cliente.",
    urgency: "Alta",
  },
  {
    title: "Activar comercialización de nave LUR-A12",
    what: "Propiedad de 4,600 m² disponible en Portada de Lurín sin movimiento comercial hace 18 días.",
    impact: "S/ 119K mensuales potenciales no capturados; afecta meta de m² vendibles del mes.",
    owner: "Jefatura Comercial Sur",
    deadline: "Hoy 17:00",
    action:
      "Publicar ficha comercial, asignar ejecutivo y lanzar oferta a shortlist de 12 prospectos.",
    urgency: "Media",
  },
  {
    title: "Corregir contrato activo sin última versión",
    what: "Adenda de Global Foods figura vigente, pero no existe contrato origen enlazado ni versión final marcada.",
    impact: "S/ 86K mensuales con respaldo documental débil para auditoría y facturación.",
    owner: "Legal + Administración Comercial",
    deadline: "Mañana 10:00",
    action: "Relacionar contrato origen, marcar última versión y validar garantías vigentes.",
    urgency: "Alta",
  },
  {
    title: "Recuperar ocupación objetivo en Logiscity",
    what: "La sede opera en 62% por m² disponibles y registros agrupados con nombre antiguo.",
    impact: "9,800 m² vendibles y S/ 255K mensuales potenciales quedan fuera de priorización.",
    owner: "Gerencia de Operaciones + Data",
    deadline: "72 h",
    action: "Depurar maestro Logiscity, confirmar subestados y pasar inventario limpio a comercial.",
    urgency: "Media",
  },
  {
    title: "Clasificar propiedades no disponibles sin subestado",
    what: "Siete propiedades figuran no disponibles sin indicar reparación, reserva, uso BSF o inactivo.",
    impact: "3,240 m² podrían estar bloqueando venta o inflando capacidad operativa reportada.",
    owner: "Operaciones de Sede",
    deadline: "Hoy 18:00",
    action: "Completar subestado y definir si cuenta para ocupación comercial.",
    urgency: "Media",
  },
] satisfies Array<{
  title: string
  what: string
  impact: string
  owner: string
  deadline: string
  action: string
  urgency: "Alta" | "Media" | "Baja"
}>

const logisticsCenterOccupancy = [
  {
    site: "Villa El Salvador",
    totalSqm: "42,500",
    occupiedSqm: "35,740",
    availableSqm: "6,760",
    occupancy: 84,
    contracts: 21,
    monthlyRevenue: "S/ 1.38M",
    state: "Normal",
  },
  {
    site: "Portada de Lurín",
    totalSqm: "31,900",
    occupiedSqm: "24,380",
    availableSqm: "7,520",
    occupancy: 76,
    contracts: 17,
    monthlyRevenue: "S/ 932K",
    state: "Atención",
  },
  {
    site: "Logiscity",
    totalSqm: "13,260",
    occupiedSqm: "8,600",
    availableSqm: "4,660",
    occupancy: 62,
    contracts: 8,
    monthlyRevenue: "S/ 428K",
    state: "Crítico",
  },
]

const contractPipeline = [
  { state: "Borrador", count: 6, value: "S/ 184K", progress: 18 },
  { state: "Aprobación interna", count: 4, value: "S/ 226K", progress: 28 },
  { state: "Firmas cliente", count: 5, value: "S/ 310K", progress: 42 },
  { state: "Firmas BSF", count: 3, value: "S/ 146K", progress: 35 },
  { state: "Vigente", count: 46, value: "S/ 2.74M", progress: 88 },
  { state: "No vigente", count: 8, value: "S/ 0", progress: 10 },
  { state: "Cancelado", count: 2, value: "S/ 0", progress: 4 },
]

const expiringContracts = [
  {
    client: "Andina Retail",
    site: "Villa El Salvador",
    endDate: "04 Jun 2026",
    sqm: "8,400",
    revenue: "S/ 318K",
    autoRenewal: "No",
    risk: "Alto",
    owner: "M. Salazar",
  },
  {
    client: "Global Foods",
    site: "Portada de Lurín",
    endDate: "18 Jun 2026",
    sqm: "3,200",
    revenue: "USD 42K",
    autoRenewal: "Sí",
    risk: "Medio",
    owner: "R. Vargas",
  },
  {
    client: "Textiles Pacífico",
    site: "Logiscity",
    endDate: "29 Jun 2026",
    sqm: "2,100",
    revenue: "S/ 64K",
    autoRenewal: "No",
    risk: "Alto",
    owner: "C. Rivas",
  },
  {
    client: "Farmalog Perú",
    site: "Villa El Salvador",
    endDate: "12 Jul 2026",
    sqm: "1,850",
    revenue: "S/ 58K",
    autoRenewal: "Sí",
    risk: "Bajo",
    owner: "L. Medina",
  },
]

const monthlyRevenueByCenter = [
  { center: "Villa El Salvador", pen: 1380, usd: 58, revenuePerSqm: "S/ 38.6" },
  { center: "Portada de Lurín", pen: 932, usd: 42, revenuePerSqm: "S/ 38.2" },
  { center: "Logiscity", pen: 428, usd: 84, revenuePerSqm: "S/ 49.8" },
]

const revenueChartConfig = {
  pen: {
    label: "PEN (miles)",
    color: "var(--chart-1)",
  },
  usd: {
    label: "USD (miles)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const topClientsByRevenue = [
  { client: "Andina Retail", revenue: "S/ 318K", sqm: "8,400", center: "Villa El Salvador" },
  { client: "Global Foods", revenue: "USD 42K", sqm: "3,200", center: "Portada de Lurín" },
  { client: "Farmalog Perú", revenue: "S/ 158K", sqm: "4,100", center: "Villa El Salvador" },
  { client: "Textiles Pacífico", revenue: "S/ 64K", sqm: "2,100", center: "Logiscity" },
  { client: "Consumo Norte", revenue: "S/ 52K", sqm: "1,740", center: "Portada de Lurín" },
]

const profitabilitySignals = [
  { label: "Descuentos vigentes", value: "S/ 74K", detail: "2.7% de renta mensual", status: "Atención" },
  { label: "Garantías por vencer", value: "8", detail: "S/ 412K por renovar", status: "Crítico" },
  { label: "Distribución PEN/USD", value: "76% / 24%", detail: "USD concentrado en Logiscity", status: "Normal" },
]

const propertyInventorySummary = [
  { label: "Disponible", count: 18, sqm: "18,940" },
  { label: "Arrendado", count: 46, sqm: "68,720" },
  { label: "Reservado", count: 5, sqm: "4,180" },
  { label: "Reparación", count: 4, sqm: "2,240" },
  { label: "Uso BSF", count: 6, sqm: "3,760" },
  { label: "Inactivo", count: 3, sqm: "1,120" },
  { label: "Dividido/subdividido", count: 9, sqm: "7,890" },
]

const propertyAvailabilityRows = [
  { code: "VES-N03", name: "Nave Norte 03", site: "Villa El Salvador", type: "Almacén", sqm: "2,850", state: "Disponible", substate: "Lista comercial", available: "Sí" },
  { code: "LUR-A12", name: "Módulo A12", site: "Portada de Lurín", type: "Nave", sqm: "4,600", state: "Disponible", substate: "Sin movimiento", available: "Sí" },
  { code: "LOG-B07", name: "Bodega 7", site: "Logiscity", type: "Bodega", sqm: "1,920", state: "No disponible", substate: "Sin subestado", available: "No" },
  { code: "VES-P02", name: "Patio 02", site: "Villa El Salvador", type: "Patio", sqm: "1,240", state: "Uso BSF", substate: "Operación interna", available: "No" },
  { code: "LUR-C04", name: "Cámara C04", site: "Portada de Lurín", type: "Frío", sqm: "980", state: "Reparación", substate: "Mantenimiento", available: "No" },
]

const dataQualityAlerts = [
  { issue: "Propiedades sin m²", count: 4, impact: "Ocupación y tarifa por m² incompletas", owner: "Data Master", severity: "Crítico" },
  { issue: "Propiedades sin centro logístico", count: 3, impact: "No aparecen en ranking por sede", owner: "Operaciones", severity: "Alta" },
  { issue: "Propiedades no disponibles sin subestado", count: 7, impact: "Puede esconder m² comercializables", owner: "Jefes de sede", severity: "Alta" },
  { issue: "Contratos vigentes sin fecha de fin", count: 2, impact: "Riesgo de vencimiento no calculable", owner: "Legal", severity: "Crítico" },
  { issue: "Adendas sin contrato origen", count: 3, impact: "Trazabilidad contractual incompleta", owner: "Legal", severity: "Alta" },
  { issue: "Contratos sin última versión marcada", count: 5, impact: "Facturación puede usar versión antigua", owner: "Administración Comercial", severity: "Alta" },
  { issue: "Logiscity agrupado por nombre antiguo", count: 11, impact: "Distorsiona ocupación y revenue por centro", owner: "Data Master", severity: "Crítico" },
]

const knowledgeFolders: KnowledgeFolder[] = [
  {
    id: "all",
    name: "Todos los recursos",
    description: "Todo lo cargado por tus equipos.",
  },
  {
    id: "product",
    name: "Producto",
    description: "Investigación, roadmaps y feedback de clientes.",
  },
  {
    id: "support",
    name: "Soporte",
    description: "Tickets, errores y escalaciones.",
  },
  {
    id: "market",
    name: "Mercado",
    description: "Competidores, precios y posicionamiento.",
  },
]

const defaultKnowledgeUploadDraft: KnowledgeUploadDraft = {
  file: null,
  title: "",
  folderId: "product",
  owner: "Operaciones",
  description: "",
  intendedUse: "",
  tags: "",
}

const defaultKnowledgeFolderDraft: KnowledgeFolderDraft = {
  name: "",
  description: "",
}

const initialKnowledgeSources: KnowledgeSource[] = [
  {
    id: "src-onboarding",
    name: "Síntesis de entrevistas de onboarding.pdf",
    folderId: "product",
    type: "PDF",
    owner: "Investigación",
    status: "Ready",
    updatedAt: "Hoy",
    size: "4.8 MB",
    chunks: 248,
    coverage: 96,
    tags: ["activación", "fricción"],
    summary:
      "Síntesis ejecutiva de entrevistas de onboarding con los puntos de fricción más claros y correcciones de activación recomendadas.",
    preview: [
      "Los usuarios entienden la promesa del producto, pero dudan cuando la configuración exige demasiadas decisiones antes del primer resultado.",
      "El bloqueador más repetido es la incertidumbre sobre la calidad de los datos importados y qué sucede después de conectar una fuente.",
      "Recomendación: mover la configuración avanzada a un paso secundario y mostrar antes un primer estado útil del panel.",
    ],
    pages: [
      {
        title: "Síntesis de entrevistas de onboarding",
        eyebrow: "Resumen ejecutivo - página 1",
        sections: [
          {
            heading: "Observación principal",
            body: "Los usuarios entienden la promesa del producto, pero dudan cuando la configuración pide demasiadas decisiones antes de mostrar el primer resultado útil.",
          },
          {
            heading: "Bloqueador repetido",
            body: "El bloqueador más repetido es la incertidumbre sobre la calidad de los datos importados y lo que ocurre después de conectar una fuente.",
          },
          {
            heading: "Conclusión para managers",
            body: "La activación mejora cuando la primera pantalla confirma propiedad, estado de datos y el siguiente resultado visible con lenguaje claro.",
          },
        ],
        callout:
          "Recomendación: mover la configuración avanzada a un paso secundario y mostrar antes un primer estado útil del panel.",
      },
      {
        title: "Correcciones de activación recomendadas",
        eyebrow: "Notas de acción - página 2",
        sections: [
          {
            heading: "Simplificar configuración",
            body: "Mantén el camino inicial enfocado en una sola fuente conectada, un estado de finalización claro y una acción principal para el usuario.",
          },
          {
            heading: "Generar confianza",
            body: "Muestra qué datos se importaron, de dónde vienen y quién puede aprobar la primera vista antes de que la vea el equipo ampliado.",
          },
          {
            heading: "Decisión de liderazgo",
            body: "Aprueba un despliegue por etapas que comience con menos opciones de configuración y agregue controles avanzados después de la activación.",
          },
        ],
      },
    ],
    recommendedUse:
      "Úsalo para revisiones de onboarding, planificación de activación y discusiones del recorrido del cliente.",
  },
  {
    id: "src-roadmap",
    name: "Auditoría de roadmap Q2.docx",
    folderId: "product",
    type: "Doc",
    owner: "Producto",
    status: "Ready",
    updatedAt: "Ayer",
    size: "1.2 MB",
    chunks: 86,
    coverage: 91,
    tags: ["roadmap", "riesgo"],
    summary:
      "Revisión de roadmap para planificación de liderazgo, con riesgos de secuenciación y notas de dependencias.",
    preview: [
      "El roadmap es más sólido donde el trabajo de calidad de datos va antes de la automatización orientada al cliente.",
      "Dos iniciativas deben retrasarse hasta completar la instrumentación: recomendaciones de IA y plantillas de flujo.",
      "Recomendación: aprobar primero el trabajo de base y luego revisar tiempos de lanzamiento orientados al cliente.",
    ],
    pages: [
      {
        title: "Auditoría de roadmap Q2",
        eyebrow: "Revisión de liderazgo - página 1",
        sections: [
          {
            heading: "Fortaleza de secuencia",
            body: "El roadmap es más sólido donde el trabajo de calidad de datos va antes de la automatización orientada al cliente y mejoras de reporting.",
          },
          {
            heading: "Riesgo de lanzamiento",
            body: "Las recomendaciones de IA y plantillas de flujo dependen de una instrumentación que aún no es lo suficientemente confiable para salida a clientes.",
          },
          {
            heading: "Nota operativa",
            body: "Los managers deben verificar responsables antes de aprobar trabajo que cruza soporte, producto y equipos de datos.",
          },
        ],
        callout:
          "Recomendación: aprobar primero el trabajo de base y luego revisar tiempos de lanzamiento orientados al cliente.",
      },
      {
        title: "Revisión de dependencias",
        eyebrow: "Apéndice de planificación - página 2",
        sections: [
          {
            heading: "Requerido antes del lanzamiento",
            body: "Las verificaciones de calidad de eventos, scoring de confianza de importación y ruteo de escalaciones deben completarse antes del siguiente hito.",
          },
          {
            heading: "Punto de control de decisión",
            body: "Una revisión de mitad de trimestre debe comparar la preparación de instrumentación con los compromisos de lanzamiento y actualizar el roadmap si hace falta.",
          },
        ],
      },
    ],
    recommendedUse:
      "Úsalo para reuniones de roadmap, planificación trimestral y revisión de dependencias.",
  },
  {
    id: "src-support",
    name: "Exportación de triage de errores.csv",
    folderId: "support",
    type: "CSV",
    owner: "Soporte",
    status: "Indexing",
    updatedAt: "hace 2 h",
    size: "980 KB",
    chunks: 134,
    coverage: 64,
    tags: ["errores", "prioridad"],
    summary:
      "Exportación de soporte agrupada por prioridad para que managers separen bloqueadores de tareas de limpieza.",
    preview: [
      "Los problemas críticos se concentran en recuperación de login, desajustes de estado de pagos y fallos de importación.",
      "Los reportes de prioridad media son principalmente regresiones visuales y mensajes de estado vacío poco claros.",
      "Recomendación: revisar el bloque crítico antes de aprobar la siguiente ventana de release.",
    ],
    pages: [
      {
        title: "Exportación de triage de errores",
        eyebrow: "Exportación de soporte - hoja 1",
        sections: [
          {
            heading: "Resumen de prioridad",
            body: "Los problemas críticos se concentran en recuperación de login, desajustes de estado de pagos y fallos de importación.",
          },
        ],
        table: {
          headers: ["Prioridad", "Problema", "Responsable", "Cantidad"],
          rows: [
            [
              "Crítica",
              "Falla recuperación de login tras reset",
              "Soporte",
              "18",
            ],
            ["Crítica", "Desajuste en estado de pagos", "Facturación", "12"],
            [
              "Alta",
              "Importación se detiene en CSV grande",
              "Operaciones de datos",
              "9",
            ],
            ["Media", "Copy de estado vacío poco claro", "Producto", "21"],
            ["Baja", "Regresión visual en ajustes", "Diseño", "14"],
          ],
        },
        callout:
          "Recomendación: revisar el bloque crítico antes de aprobar la siguiente ventana de release.",
      },
    ],
    recommendedUse:
      "Úsalo para sincronizaciones de soporte, preparación de release y revisión de escalaciones.",
  },
  {
    id: "src-pain",
    name: "Resumen de dolor de usuarios.docx",
    folderId: "product",
    type: "Doc",
    owner: "Investigación",
    status: "Review",
    updatedAt: "Lun",
    size: "740 KB",
    chunks: 52,
    coverage: 72,
    tags: ["ux", "feedback"],
    summary:
      "Resumen conciso de puntos de dolor de clientes a partir de entrevistas y notas de feedback.",
    preview: [
      "Los principales puntos de dolor son expectativas de configuración poco claras, baja confianza en datos importados y demasiados ajustes.",
      "Los managers pidieron mayor claridad de responsables, menos verificaciones manuales y visibilidad más rápida de resultados útiles.",
      "Recomendación: validar el resumen con el responsable de investigación antes de usarlo en planificación.",
    ],
    pages: [
      {
        title: "Resumen de dolor de usuarios",
        eyebrow: "Notas de investigación - página 1",
        sections: [
          {
            heading: "Temas principales",
            body: "Los principales puntos de dolor son expectativas de configuración poco claras, baja confianza en datos importados y demasiados ajustes.",
          },
          {
            heading: "Feedback de managers",
            body: "Los managers pidieron mayor claridad de responsables, menos verificaciones manuales y visibilidad más rápida de resultados útiles.",
          },
          {
            heading: "Nota de revisión",
            body: "El responsable de investigación debe confirmar si estos temas son representativos antes de usarlos en planificación de liderazgo.",
          },
        ],
        callout:
          "Recomendación: validar el resumen con el responsable de investigación antes de usarlo en planificación.",
      },
      {
        title: "Áreas de oportunidad",
        eyebrow: "Notas de investigación - página 2",
        sections: [
          {
            heading: "Reducir verificaciones manuales",
            body: "Los equipos necesitan una forma más clara de ver qué cambió, quién aprobó el recurso y qué requiere seguimiento.",
          },
          {
            heading: "Mejorar la primera revisión",
            body: "Debe aparecer un resumen breve, amigable para managers, antes de los ajustes detallados para acelerar decisiones.",
          },
        ],
      },
    ],
    recommendedUse:
      "Úsalo para priorización UX, alineación de equipos y dimensionamiento de oportunidades.",
  },
  {
    id: "src-competitors",
    name: "Snapshot de análisis competitivo.url",
    folderId: "market",
    type: "URL",
    owner: "Crecimiento",
    status: "Ready",
    updatedAt: "Vie",
    size: "18 pages",
    chunks: 119,
    coverage: 88,
    tags: ["precios", "posicionamiento"],
    summary:
      "Snapshot de mercado que compara onboarding de competidores, lenguaje de precios y disparadores de conversión.",
    preview: [
      "Los competidores comunican el tiempo hasta el valor más temprano y mantienen más enfocada la comparación de planes.",
      "Los prompts de upgrade funcionan mejor cuando se conectan a un flujo completado, no a una lista genérica de funcionalidades.",
      "Recomendación: usar estas notas para refinar lenguaje de empaquetado y momentos de conversión de trial.",
    ],
    pages: [
      {
        title: "Snapshot de análisis competitivo",
        eyebrow: "Captura web - página 1",
        url: "https://competitor.example/pricing",
        sections: [
          {
            heading: "Patrón de posicionamiento",
            body: "Los competidores comunican el tiempo hasta el valor más temprano y mantienen más enfocada la comparación de planes.",
          },
          {
            heading: "Disparador de conversión",
            body: "Los prompts de upgrade funcionan mejor cuando se conectan a un flujo completado, no a una lista genérica de funcionalidades.",
          },
          {
            heading: "Nota de empaquetado",
            body: "Las páginas más claras usan menos dimensiones de planes y anclan el valor en la confianza operativa.",
          },
        ],
        callout:
          "Recomendación: usar estas notas para refinar lenguaje de empaquetado y momentos de conversión de trial.",
      },
    ],
    recommendedUse:
      "Úsalo para revisiones GTM, trabajo de posicionamiento y discusiones de precios.",
  },
]

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function formatFileSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) {
    return "0 KB"
  }

  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function getKnowledgeFileType(fileName: string): KnowledgeSource["type"] {
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (extension === "pdf") {
    return "PDF"
  }

  if (extension === "csv" || extension === "xlsx" || extension === "xls") {
    return "CSV"
  }

  return "Doc"
}

function parseKnowledgeTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 6)
}

function makeFolderId(name: string) {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return slug ? `folder-${slug}` : makeId("folder")
}

function makeTime() {
  return new Intl.DateTimeFormat("es", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date())
}

function makeTitle(content: string) {
  const compact = content.replace(/\s+/g, " ").trim()

  if (compact.length <= 42) {
    return compact
  }

  return `${compact.slice(0, 42)}...`
}

function makeDashboardInsightReply(context: string) {
  return `Lectura ejecutiva: ${context} La decisión debe evaluarse por impacto económico, SLA comprometido y responsable directo. Mi recomendación es confirmar el dato fuente, priorizar el bloqueo si afecta ingresos o promesa comercial, y pedir una acción con hora límite y dueño único para evitar que quede como alerta sin cierre.`
}

function getModelLabel(value: string) {
  return modelOptions.find((option) => option.value === value)?.label ?? value
}

function normalizeModel(value: string | undefined) {
  return models.includes(value ?? "") ? (value ?? defaultModel) : defaultModel
}

function normalizeThemePreference(value: string | undefined): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") {
    return value
  }

  return "system"
}

export function AiChatShell() {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [chats, setChats] = React.useState<Chat[]>(initialChats)
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  )
  const [draft, setDraft] = React.useState("")
  const [model, setModel] = React.useState(defaultModel)
  const [mode, setMode] = React.useState("General")
  const [isSending, setIsSending] = React.useState(false)
  const [activeView, setActiveView] = React.useState<WorkspaceView>("chat")
  const [chatQuery, setChatQuery] = React.useState("")
  const [desktopSidebarOpen, setDesktopSidebarOpen] = React.useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)
  const [attachments, setAttachments] = React.useState(0)
  const [notificationCount, setNotificationCount] = React.useState(1)
  const [dashboardBlockOrder, setDashboardBlockOrder] = React.useState<
    DashboardBlockId[]
  >(defaultDashboardBlockOrder)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const draftRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k"
      ) {
        return
      }

      event.preventDefault()
      searchRef.current?.focus()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const selectedChat = React.useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? null,
    [chats, selectedChatId]
  )

  const filteredChats = React.useMemo(() => {
    const query = chatQuery.trim().toLowerCase()

    if (!query) {
      return chats
    }

    return chats.filter((chat) => {
      const messageText = chat.messages
        .map((message) => message.content)
        .join(" ")

      return `${chat.title} ${chat.category} ${messageText}`
        .toLowerCase()
        .includes(query)
    })
  }, [chatQuery, chats])

  function handleToggleSidebar() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setDesktopSidebarOpen((value) => !value)
      return
    }

    setMobileSidebarOpen(true)
  }

  function handleSelectChat(chatId: string) {
    const chat = chats.find((item) => item.id === chatId)
    setActiveView("chat")
    setSelectedChatId(chatId)
    setModel(normalizeModel(chat?.model))
    setMobileSidebarOpen(false)
  }

  function handleNewChat() {
    setActiveView("chat")
    setSelectedChatId(null)
    setDraft("")
    setMode("General")
    setAttachments(0)
    setMobileSidebarOpen(false)
    requestAnimationFrame(() => draftRef.current?.focus())
  }

  function handlePrompt(action: PromptAction) {
    setActiveView("chat")
    setMode(action.label)
    setDraft(action.prompt)
    setMobileSidebarOpen(false)
    requestAnimationFrame(() => draftRef.current?.focus())
  }

  function handleOpenDashboard() {
    setActiveView("dashboard")
    setMobileSidebarOpen(false)
  }

  function handleOpenAI() {
    setActiveView("chat")
    setMobileSidebarOpen(false)
  }

  function handleAskDashboardAI(context: string) {
    const timestamp = makeTime()
    const prompt = `Explícame este dato del dashboard y dime qué decisión debería tomar un gerente: ${context}`
    const chatId = makeId("dashboard-ai")

    setChats((current) => [
      {
        id: chatId,
        title: "Análisis del panel",
        group: "Recientes",
        category: "Panel",
        updatedAt: timestamp,
        model,
        messages: [
          {
            id: makeId("dashboard-ai-user"),
            role: "user",
            content: prompt,
            at: timestamp,
          },
          {
            id: makeId("dashboard-ai-assistant"),
            role: "assistant",
            content: makeDashboardInsightReply(context),
            at: timestamp,
          },
        ],
      },
      ...current,
    ])
    setSelectedChatId(chatId)
    setMode("Investigación")
    setDraft("")
    setActiveView("chat")
    setMobileSidebarOpen(false)
    requestAnimationFrame(() => draftRef.current?.focus())
  }

  function handleMoveDashboardBlock(
    sourceBlockId: DashboardBlockId,
    targetBlockId: DashboardBlockId
  ) {
    if (sourceBlockId === targetBlockId) {
      return
    }

    setDashboardBlockOrder((current) => {
      const next = current.filter((blockId) => blockId !== sourceBlockId)
      const targetIndex = next.indexOf(targetBlockId)

      if (targetIndex < 0) {
        return current
      }

      next.splice(targetIndex, 0, sourceBlockId)
      return next
    })
  }

  function handleOpenKnowledgeBase() {
    setActiveView("knowledge")
    setMobileSidebarOpen(false)
  }

  function handleOpenUsers() {
    setActiveView("users")
    setMobileSidebarOpen(false)
  }

  function handleOpenSettings() {
    setActiveView("settings")
    setMobileSidebarOpen(false)
  }

  function handleAttach() {
    setAttachments((value) => value + 1)
    requestAnimationFrame(() => draftRef.current?.focus())
  }

  function updateAssistantMessage(
    chatId: string,
    messageId: string,
    patch: Pick<ChatMessage, "content"> & {
      at?: string
      status?: MessageStatus
    }
  ) {
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              updatedAt: patch.at ?? chat.updatedAt,
              messages: chat.messages.map((message) =>
                message.id === messageId
                  ? {
                      ...message,
                      ...patch,
                    }
                  : message
              ),
            }
          : chat
      )
    )
  }

  function revealAssistantMessage(
    chatId: string,
    messageId: string,
    fullContent: string,
    doneStatus?: MessageStatus
  ) {
    return new Promise<void>((resolve) => {
      const content = fullContent.trim() || "No recibí contenido de NVIDIA."
      let index = 0
      const chunkSize = Math.max(1, Math.ceil(content.length / 90))

      function step() {
        index = Math.min(content.length, index + chunkSize)
        const isDone = index >= content.length

        updateAssistantMessage(chatId, messageId, {
          at: makeTime(),
          content: content.slice(0, index),
          status: isDone ? doneStatus : "typing",
        })

        if (isDone) {
          resolve()
          return
        }

        window.setTimeout(step, 18)
      }

      window.setTimeout(step, 180)
    })
  }

  async function handleSend() {
    const content = draft.trim()

    if (!content) {
      draftRef.current?.focus()
      return
    }

    if (isSending) {
      return
    }

    const timestamp = makeTime()
    const activeModel = normalizeModel(model)
    const chatId = selectedChatId ?? makeId("chat")
    const userMessage: ChatMessage = {
      id: makeId("user"),
      role: "user",
      content,
      at: timestamp,
    }
    const assistantMessage: ChatMessage = {
      id: makeId("assistant"),
      role: "assistant",
      content: "",
      at: timestamp,
      status: "thinking",
    }
    const messages = [userMessage, assistantMessage]
    const requestMessages = [...(selectedChat?.messages ?? []), userMessage]
      .filter((message): message is ChatMessage => Boolean(message?.content))
      .slice(-12)
      .map((message) => ({
        content: message.content,
        role: message.role,
      }))

    if (selectedChatId) {
      setChats((current) =>
        current.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                group: "Recientes",
                model: activeModel,
                updatedAt: timestamp,
                messages: [...chat.messages, ...messages],
              }
            : chat
        )
      )
    } else {
      setSelectedChatId(chatId)
      setChats((current) => [
        {
          id: chatId,
          title: makeTitle(content),
          group: "Recientes",
          category: mode,
          updatedAt: timestamp,
          model: activeModel,
          messages,
        },
        ...current,
      ])
    }

    setModel(activeModel)
    setDraft("")
    setAttachments(0)
    setIsSending(true)

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          attachments,
          messages: requestMessages,
          mode,
          model: activeModel,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      const payload = (await response.json().catch(() => ({}))) as {
        content?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(
          payload.error ?? "No se pudo obtener respuesta de NVIDIA."
        )
      }

      await revealAssistantMessage(
        chatId,
        assistantMessage.id,
        payload.content ?? ""
      )
    } catch (error) {
      await revealAssistantMessage(
        chatId,
        assistantMessage.id,
        `No pude obtener la respuesta de NVIDIA: ${
          error instanceof Error ? error.message : "error desconocido"
        }`,
        "error"
      )
    } finally {
      setIsSending(false)
      requestAnimationFrame(() => draftRef.current?.focus())
    }
  }

  const activeSection = activeView === "dashboard" ? "dashboard" : "ai"

  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <TopBar
        activeSection={activeSection}
        notificationCount={notificationCount}
        onClearNotifications={() => setNotificationCount(0)}
        onOpenAI={handleOpenAI}
        onOpenDashboard={handleOpenDashboard}
        onToggleSidebar={handleToggleSidebar}
        onToggleTheme={() =>
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
        onOpenNotifications={() => setActiveView("notifications")}
        onOpenUsers={handleOpenUsers}
        theme={resolvedTheme}
      />

      <div
        className="animate-in duration-300 ease-out fade-in-0 zoom-in-95 slide-in-from-bottom-1"
        key={activeSection}
      >
        {activeView === "dashboard" ? (
          <DashboardView
            blockOrder={dashboardBlockOrder}
            onAskAI={handleAskDashboardAI}
            onMoveBlock={handleMoveDashboardBlock}
            onResetLayout={() =>
              setDashboardBlockOrder(defaultDashboardBlockOrder)
            }
          />
        ) : (
          <div className="px-2 pt-2 pb-2 sm:px-2.5 sm:pt-3">
            <Card className="h-[calc(100svh-4.25rem)] rounded-lg py-0 shadow-none ring-border sm:h-[calc(100svh-4.75rem)]">
              <CardContent
                className={cn(
                  "grid h-full min-h-0 p-0 transition-[grid-template-columns] duration-300 ease-out motion-reduce:transition-none",
                  desktopSidebarOpen
                    ? "lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]"
                    : "lg:grid-cols-1"
                )}
              >
                {desktopSidebarOpen ? (
                  <HistoryPanel
                    activeView={activeView}
                    chatQuery={chatQuery}
                    chats={filteredChats}
                    onNewChat={handleNewChat}
                    onOpenKnowledgeBase={handleOpenKnowledgeBase}
                    onOpenSettings={handleOpenSettings}
                    onPrompt={handlePrompt}
                    onSearchChange={setChatQuery}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChatId}
                    searchRef={searchRef}
                  />
                ) : null}
                <ChatWorkspace
                  attachments={attachments}
                  activeView={activeView}
                  chat={selectedChat}
                  draft={draft}
                  mode={mode}
                  model={model}
                  onAttach={handleAttach}
                  onDraftChange={setDraft}
                  onModelChange={setModel}
                  onNewChat={handleNewChat}
                  onPrompt={handlePrompt}
                  onSend={handleSend}
                  isSending={isSending}
                  onThemeChange={setTheme}
                  onToggleVoice={() => setVoiceEnabled((value) => !value)}
                  promptActions={promptActions}
                  textareaRef={draftRef}
                  themePreference={normalizeThemePreference(theme)}
                  voiceEnabled={voiceEnabled}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent
          className="w-[min(82vw,280px)] gap-0 p-0 sm:max-w-[280px]"
          side="left"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Historial de chats</SheetTitle>
            <SheetDescription>
              Busca y selecciona chats de prueba.
            </SheetDescription>
          </SheetHeader>
          <HistoryPanel
            activeView={activeView}
            chatQuery={chatQuery}
            chats={filteredChats}
            mobile
            onNewChat={handleNewChat}
            onOpenKnowledgeBase={handleOpenKnowledgeBase}
            onOpenSettings={handleOpenSettings}
            onPrompt={handlePrompt}
            onSearchChange={setChatQuery}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
            searchRef={searchRef}
          />
        </SheetContent>
      </Sheet>
    </main>
  )
}

function TopBar({
  activeSection,
  notificationCount,
  onClearNotifications,
  onOpenAI,
  onOpenDashboard,
  onToggleSidebar,
  onToggleTheme,
  onOpenNotifications,
  onOpenUsers,
  theme,
}: {
  activeSection: "dashboard" | "ai"
  notificationCount: number
  onClearNotifications: () => void
  onOpenAI: () => void
  onOpenDashboard: () => void
  onToggleSidebar: () => void
  onToggleTheme: () => void
  onOpenNotifications: () => void
  onOpenUsers: () => void
  theme?: string
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const ThemeIcon = mounted && theme === "dark" ? SunIcon : MoonIcon
  const showSidebarToggle = activeSection === "ai"

  return (
    <header className="relative flex h-14 items-center border-b bg-background px-3 sm:h-16 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Alternar barra lateral"
              className={cn(
                "shrink-0 transition-[opacity,transform] duration-300 ease-out",
                !showSidebarToggle &&
                  "pointer-events-none -translate-x-1 opacity-0"
              )}
              onClick={onToggleSidebar}
              size="icon-sm"
              tabIndex={showSidebarToggle ? 0 : -1}
              variant="ghost"
            >
              <PanelLeftIcon />
            </Button>
          </TooltipTrigger>
          {showSidebarToggle ? (
            <TooltipContent>Alternar barra lateral</TooltipContent>
          ) : null}
        </Tooltip>
        <Image
          src="/logo-sin-fondo.png"
          alt="BSF Almacenes del Perú"
          width={120}
          height={36}
          priority
          className="h-7 w-auto max-w-[88px] object-contain sm:h-9 sm:max-w-none"
        />
        <TopNavMenu
          activeSection={activeSection}
          onOpenAI={onOpenAI}
          onOpenDashboard={onOpenDashboard}
        />
      </div>

      <div className="ml-auto flex h-full items-center gap-1 sm:gap-1.5">
        <TopIcon icon={Users2Icon} label="Usuarios" onClick={onOpenUsers} />
        <ManagerNotifications onViewAll={onOpenNotifications} />
        <TopIcon icon={ThemeIcon} label="Tema" onClick={onToggleTheme} />

        <Separator orientation="vertical" />
        <Avatar className="size-8 sm:size-9">
          <AvatarFallback className="bg-[radial-gradient(circle_at_35%_28%,#f2b0a2_0_22%,#27355f_23%_100%)] text-[0px]">
            TB
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

function TopNavMenu({
  activeSection,
  onOpenAI,
  onOpenDashboard,
}: {
  activeSection: "dashboard" | "ai"
  onOpenAI: () => void
  onOpenDashboard: () => void
}) {
  return (
    <ToggleGroup
      aria-label="Navegación principal"
      className="rounded-lg border bg-muted/30 p-0.5"
      onValueChange={(value) => {
        if (value === "dashboard") {
          onOpenDashboard()
        }

        if (value === "ai") {
          onOpenAI()
        }
      }}
      size="sm"
      type="single"
      value={activeSection}
      variant="default"
    >
      <ToggleGroupItem value="dashboard">
        <LayoutDashboardIcon data-icon="inline-start" />
        Panel
      </ToggleGroupItem>
      <ToggleGroupItem value="ai">
        <BrainCircuitIcon data-icon="inline-start" />
        IA
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function TopIcon({
  badgeCount,
  icon: Icon,
  label,
  onClick,
}: {
  badgeCount?: number
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={label}
          className="relative"
          onClick={onClick}
          size="icon-sm"
          variant="ghost"
        >
          <Icon />
          {badgeCount ? <Badge aria-hidden className="ai-alert-dot" /> : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function HistoryPanel({
  activeView,
  chatQuery,
  chats,
  mobile,
  onNewChat,
  onOpenKnowledgeBase,
  onOpenSettings,
  onPrompt,
  onSearchChange,
  onSelectChat,
  selectedChatId,
  searchRef,
}: {
  activeView: WorkspaceView
  chatQuery: string
  chats: Chat[]
  mobile?: boolean
  onNewChat: () => void
  onOpenKnowledgeBase: () => void
  onOpenSettings: () => void
  onPrompt: (action: PromptAction) => void
  onSearchChange: (value: string) => void
  onSelectChat: (chatId: string) => void
  selectedChatId: string | null
  searchRef?: React.RefObject<HTMLInputElement | null>
}) {
  const grouped = groupOrder.map((group) => ({
    group,
    chats: chats.filter((chat) => chat.group === group),
  }))
  const visibleCount = chats.length

  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col bg-muted/20 transition-[background-color,transform,opacity] duration-300 ease-out motion-reduce:transition-none",
        mobile
          ? "h-full"
          : "hidden border-r lg:flex lg:animate-in lg:duration-300 lg:fade-in-0 lg:slide-in-from-left-2"
      )}
    >
      <div className="flex flex-col gap-4 px-5 pt-5 pb-5">
        <InputGroup className="h-12 rounded-xl bg-background shadow-sm">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar..."
            value={chatQuery}
            ref={searchRef}
          />
          <InputGroupAddon align="inline-end" className="hidden lg:flex">
            <Kbd>⌘ k</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <Button
          className="h-12 justify-start rounded-xl px-4 text-base font-medium shadow-sm"
          onClick={onNewChat}
          size="lg"
        >
          <PlusIcon data-icon="inline-start" />
          Nuevo chat
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-7 px-4 pb-5">
          <section className="flex flex-col gap-2">
            <SidebarSectionTitle>Herramientas</SidebarSectionTitle>
            <div className="flex flex-col gap-1.5">
              {sidebarTools.map((tool) => (
                <SidebarToolButton
                  key={tool.label}
                  onClick={() => onPrompt(tool)}
                  tool={tool}
                />
              ))}
              <SidebarToolButton
                isActive={activeView === "knowledge"}
                onClick={onOpenKnowledgeBase}
                tool={{
                  label: "Base de conocimiento",
                  icon: LibraryIcon,
                  prompt: "",
                }}
              />
            </div>
          </section>

          {grouped.map(({ group, chats: groupChats }) =>
            groupChats.length ? (
              <section className="flex flex-col gap-2" key={group}>
                <SidebarSectionTitle>{group}</SidebarSectionTitle>
                <div className="flex flex-col gap-1.5">
                  {groupChats.map((chat) => (
                    <ChatHistoryItem
                      chat={chat}
                      isActive={
                        activeView === "chat" && chat.id === selectedChatId
                      }
                      key={chat.id}
                      onSelectChat={onSelectChat}
                    />
                  ))}
                </div>
              </section>
            ) : null
          )}
          {!visibleCount ? (
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              No hay chats de prueba que coincidan con esta búsqueda.
            </div>
          ) : null}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-2 px-4 pt-2 pb-4">
        <Separator />
        <SidebarToolButton
          isActive={activeView === "settings"}
          onClick={onOpenSettings}
          tool={{
            label: "Configuración",
            icon: SlidersHorizontalIcon,
            prompt: "",
          }}
        />
      </div>
    </aside>
  )
}

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-2 text-sm font-medium text-muted-foreground">
      {children}
    </h2>
  )
}

function SidebarToolButton({
  isActive,
  onClick,
  tool,
}: {
  isActive?: boolean
  onClick: () => void
  tool: PromptAction
}) {
  return (
    <Button
      className={cn(
        "h-11 justify-start gap-3 rounded-xl px-2 text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-background hover:text-foreground hover:shadow-sm",
        isActive && "bg-background text-foreground shadow-sm"
      )}
      onClick={onClick}
      variant="ghost"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground group-hover/button:text-foreground">
        <tool.icon />
      </span>
      <span className="truncate">{tool.label}</span>
    </Button>
  )
}

function ChatHistoryItem({
  chat,
  isActive,
  onSelectChat,
}: {
  chat: Chat
  isActive: boolean
  onSelectChat: (chatId: string) => void
}) {
  return (
    <Button
      className={cn(
        "group relative h-10 w-full justify-start truncate rounded-xl px-3 text-sm font-normal text-muted-foreground transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-background hover:text-foreground hover:shadow-sm",
        isActive && "bg-background text-foreground shadow-sm"
      )}
      onClick={() => onSelectChat(chat.id)}
      variant="ghost"
    >
      {isActive ? (
        <span
          aria-hidden
          className="absolute top-1/2 left-1 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"
        />
      ) : null}
      <span className="truncate">{chat.title}</span>
    </Button>
  )
}

function KnowledgeBaseView() {
  const [sources, setSources] = React.useState<KnowledgeSource[]>(
    initialKnowledgeSources
  )
  const [folders, setFolders] = React.useState<KnowledgeFolder[]>(
    knowledgeFolders
  )
  const [selectedFolderId, setSelectedFolderId] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedSourceId, setSelectedSourceId] = React.useState(
    initialKnowledgeSources[0]?.id ?? ""
  )
  const [previewPageIndex, setPreviewPageIndex] = React.useState(0)
  const [previewZoom, setPreviewZoom] = React.useState(100)
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false)
  const [uploadDraft, setUploadDraft] = React.useState<KnowledgeUploadDraft>(
    defaultKnowledgeUploadDraft
  )
  const [folderDialogOpen, setFolderDialogOpen] = React.useState(false)
  const [folderDraft, setFolderDraft] = React.useState<KnowledgeFolderDraft>(
    defaultKnowledgeFolderDraft
  )

  const scopedSources = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return sources.filter((source) => {
      const matchesFolder =
        selectedFolderId === "all" || source.folderId === selectedFolderId
      const matchesStatus =
        statusFilter === "all" || source.status === statusFilter
      const matchesQuery =
        !normalizedQuery ||
        `${source.name} ${source.owner} ${source.tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesFolder && matchesStatus && matchesQuery
    })
  }, [query, selectedFolderId, sources, statusFilter])

  const selectedSource =
    sources.find((source) => source.id === selectedSourceId) ?? sources[0]
  const selectedPages = selectedSource?.pages ?? []
  const currentPageIndex = selectedPages.length
    ? Math.min(previewPageIndex, selectedPages.length - 1)
    : 0
  const selectedPage = selectedPages[currentPageIndex]
  const readyCount = sources.filter(
    (source) => source.status === "Ready"
  ).length
  const reviewCount = sources.filter(
    (source) => source.status === "Review"
  ).length
  const processingCount = sources.filter(
    (source) => source.status === "Indexing"
  ).length
  const latestSource = sources[0]?.updatedAt ?? "-"

  function getVisibleFolderName(folderId: string) {
    return folders.find((folder) => folder.id === folderId)?.name ?? folderId
  }

  React.useEffect(() => {
    setPreviewPageIndex(0)
    setPreviewZoom(100)
  }, [selectedSourceId])

  function handleUploadDialogOpenChange(open: boolean) {
    setUploadDialogOpen(open)

    if (!open) {
      setUploadDraft(defaultKnowledgeUploadDraft)
    }
  }

  function updateUploadDraft<T extends keyof KnowledgeUploadDraft>(
    field: T,
    value: KnowledgeUploadDraft[T]
  ) {
    setUploadDraft((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleFolderDialogOpenChange(open: boolean) {
    setFolderDialogOpen(open)

    if (!open) {
      setFolderDraft(defaultKnowledgeFolderDraft)
    }
  }

  function handleCreateFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = folderDraft.name.trim()

    if (!name) {
      return
    }

    const baseId = makeFolderId(name)
    const exists = folders.some((folder) => folder.id === baseId)
    const folder: KnowledgeFolder = {
      id: exists ? makeId(baseId) : baseId,
      name,
      description:
        folderDraft.description.trim() || "Recursos agrupados por el equipo.",
    }

    setFolders((current) => [...current, folder])
    setSelectedFolderId(folder.id)
    setFolderDialogOpen(false)
    setFolderDraft(defaultKnowledgeFolderDraft)
  }

  function handleAddSource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!uploadDraft.file) {
      return
    }

    const fileName = uploadDraft.file.name
    const title = uploadDraft.title.trim() || fileName
    const tags = parseKnowledgeTags(uploadDraft.tags)
    const description =
      uploadDraft.description.trim() ||
      "Recurso cargado para enriquecer la base de conocimiento operativa."
    const intendedUse =
      uploadDraft.intendedUse.trim() ||
      "Responder consultas internas con contexto confiable del archivo cargado."
    const source: KnowledgeSource = {
      id: makeId("source"),
      name: title,
      folderId: uploadDraft.folderId,
      type: getKnowledgeFileType(fileName),
      owner: uploadDraft.owner.trim() || "Operaciones",
      status: "Indexing",
      updatedAt: "Ahora mismo",
      size: formatFileSize(uploadDraft.file.size),
      chunks: 0,
      coverage: 32,
      tags: tags.length ? tags : ["importación", "contexto"],
      summary: description,
      preview: [
        description,
        `Preguntas o decisiones que debe apoyar: ${intendedUse}`,
        `Conceptos clave: ${(tags.length ? tags : ["importación", "contexto"]).join(", ")}`,
      ],
      pages: [
        {
          title,
          eyebrow: "Vista previa de carga - metadata inicial",
          sections: [
            {
              heading: "Descripción del recurso",
              body: description,
            },
            {
              heading: "Preguntas que debería responder",
              body: intendedUse,
            },
            {
              heading: "Conceptos clave",
              body: (tags.length ? tags : ["importación", "contexto"]).join(
                ", "
              ),
            },
          ],
          callout:
            "Carga local de demo. Este contexto ayuda al asistente a recuperar mejor la información cuando el recurso sea consultado.",
        },
      ],
      recommendedUse: intendedUse,
    }

    setSources((current) => [source, ...current])
    setSelectedFolderId("all")
    setStatusFilter("all")
    setSelectedSourceId(source.id)
    setUploadDialogOpen(false)
    setUploadDraft(defaultKnowledgeUploadDraft)
  }

  function handleReindex(sourceId: string) {
    setSources((current) =>
      current.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              status: "Indexing",
              updatedAt: "Ahora mismo",
              coverage: Math.min(source.coverage, 58),
            }
          : source
      )
    )
    setSelectedSourceId(sourceId)
  }

  function handleMarkReady(sourceId: string) {
    setSources((current) =>
      current.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              status: "Ready",
              updatedAt: "Ahora mismo",
              coverage: 98,
              chunks: source.chunks || 144,
            }
          : source
      )
    )
    setSelectedSourceId(sourceId)
  }

  return (
    <section className="flex min-h-0 flex-col overflow-hidden bg-background">
      <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium sm:text-base">
            Base de conocimiento
          </h1>
          <p className="text-xs text-muted-foreground">
            Recursos del equipo cargados para managers y contexto del asistente
          </p>
        </div>
        <Dialog
          onOpenChange={handleUploadDialogOpenChange}
          open={uploadDialogOpen}
        >
          <DialogTrigger asChild>
            <Button size="sm">
              <UploadIcon data-icon="inline-start" />
              Subir recurso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[calc(100vh-2rem)] max-w-[760px] overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-[760px]">
            <form
              className="flex max-h-[calc(100vh-2rem)] min-h-0 flex-col"
              onSubmit={handleAddSource}
            >
              <DialogHeader className="shrink-0 border-b bg-muted/30 px-6 py-4">
                <div className="flex items-start gap-3 pr-8">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
                    <UploadIcon />
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <DialogTitle>Subir recurso</DialogTitle>
                    <DialogDescription>
                      Agregá el archivo y el contexto clave para encontrarlo
                      rápido.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="min-h-0 flex-1">
                <div className="flex flex-col gap-3 px-6 py-3">
                  <FieldSet>
                    <FieldLegend>Archivo y datos básicos</FieldLegend>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="knowledge-upload-file">
                          Archivo
                        </FieldLabel>
                        <Input
                          accept=".pdf,.doc,.docx,.csv,.xlsx,.xls,.txt,.md"
                          id="knowledge-upload-file"
                          onChange={(event) =>
                            updateUploadDraft(
                              "file",
                              event.target.files?.[0] ?? null
                            )
                          }
                          type="file"
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="knowledge-upload-title">
                          Título visible
                        </FieldLabel>
                        <Input
                          id="knowledge-upload-title"
                          onChange={(event) =>
                            updateUploadDraft("title", event.target.value)
                          }
                          placeholder="Ej. Manual de procedimientos Lurín Sur"
                          value={uploadDraft.title}
                        />
                      </Field>

                      <FieldGroup className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel>Área</FieldLabel>
                          <Select
                            onValueChange={(value) =>
                              updateUploadDraft("folderId", value)
                            }
                            value={uploadDraft.folderId}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccioná un área" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {folders
                                  .filter((folder) => folder.id !== "all")
                                  .map((folder) => (
                                    <SelectItem
                                      key={folder.id}
                                      value={folder.id}
                                    >
                                      {folder.name}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="knowledge-upload-owner">
                            Responsable
                          </FieldLabel>
                          <Input
                            id="knowledge-upload-owner"
                            onChange={(event) =>
                              updateUploadDraft("owner", event.target.value)
                            }
                            placeholder="Operaciones, Legal, Comercial..."
                            value={uploadDraft.owner}
                          />
                        </Field>
                      </FieldGroup>

                      <Field>
                        <FieldLabel htmlFor="knowledge-upload-description">
                          ¿Qué contiene este recurso?
                        </FieldLabel>
                        <Textarea
                          className="min-h-16 resize-none"
                          id="knowledge-upload-description"
                          onChange={(event) =>
                            updateUploadDraft(
                              "description",
                              event.target.value
                            )
                          }
                          placeholder="Ej. Procedimientos de despacho, responsables por sede, excepciones y criterios para escalar incidencias."
                          value={uploadDraft.description}
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>

                  <Separator />

                  <FieldSet>
                    <FieldLegend>Contexto para el asistente</FieldLegend>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="knowledge-upload-intended-use">
                          ¿Qué debería poder responder?
                        </FieldLabel>
                        <Textarea
                          className="min-h-16 resize-none"
                          id="knowledge-upload-intended-use"
                          onChange={(event) =>
                            updateUploadDraft(
                              "intendedUse",
                              event.target.value
                            )
                          }
                          placeholder="Ej. Quién aprueba una excepción, qué sede aplica, cuáles son los pasos del proceso y cuándo escalar."
                          value={uploadDraft.intendedUse}
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="knowledge-upload-tags">
                          Palabras clave
                        </FieldLabel>
                        <Input
                          id="knowledge-upload-tags"
                          onChange={(event) =>
                            updateUploadDraft("tags", event.target.value)
                          }
                          placeholder="despacho, Lurín, SLA, inventario"
                          value={uploadDraft.tags}
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </div>
              </ScrollArea>

              <DialogFooter className="mx-0 mb-0 shrink-0 rounded-b-2xl px-6 py-3">
                <Button
                  onClick={() => handleUploadDialogOpenChange(false)}
                  type="button"
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button disabled={!uploadDraft.file} type="submit">
                  <UploadIcon data-icon="inline-start" />
                  Crear recurso
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-5 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <KnowledgeMetric
              label="Recursos disponibles"
              value={`${readyCount}/${sources.length}`}
              detail="Listos para que tu equipo los use"
            />
            <KnowledgeMetric
              label="Requiere revisión"
              value={`${reviewCount}`}
              detail="En espera de aprobación de manager"
            />
            <KnowledgeMetric
              label="Procesando"
              value={`${processingCount}`}
              detail={`Última carga: ${latestSource}`}
            />
          </div>

          <div className="grid min-h-[560px] gap-4 xl:grid-cols-[240px_minmax(0,1fr)_390px] 2xl:grid-cols-[260px_minmax(0,1fr)_430px]">
            <div className="flex min-h-0 flex-col gap-3 rounded-xl border bg-muted/20 p-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-medium">Áreas</h2>
                <Dialog
                  onOpenChange={handleFolderDialogOpenChange}
                  open={folderDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      aria-label="Crear carpeta"
                      className="rounded-full"
                      size="icon-sm"
                      variant="outline"
                    >
                      <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl sm:max-w-[420px]">
                    <form className="flex flex-col gap-4" onSubmit={handleCreateFolder}>
                      <DialogHeader>
                        <DialogTitle>Nueva carpeta</DialogTitle>
                        <DialogDescription>
                          Crea un espacio para ordenar recursos por equipo,
                          sede o proceso.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="knowledge-folder-name">
                            Nombre
                          </FieldLabel>
                          <Input
                            id="knowledge-folder-name"
                            onChange={(event) =>
                              setFolderDraft((current) => ({
                                ...current,
                                name: event.target.value,
                              }))
                            }
                            placeholder="Ej. Operaciones Lurín"
                            value={folderDraft.name}
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="knowledge-folder-description">
                            Descripción breve
                          </FieldLabel>
                          <Input
                            id="knowledge-folder-description"
                            onChange={(event) =>
                              setFolderDraft((current) => ({
                                ...current,
                                description: event.target.value,
                              }))
                            }
                            placeholder="Ej. Procedimientos y recursos de sede"
                            value={folderDraft.description}
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter className="mx-0 mb-0 px-0 pb-0">
                        <Button
                          onClick={() => handleFolderDialogOpenChange(false)}
                          type="button"
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                        <Button disabled={!folderDraft.name.trim()} type="submit">
                          <PlusIcon data-icon="inline-start" />
                          Crear carpeta
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col gap-1.5">
                {folders.map((folder) => {
                  const count =
                    folder.id === "all"
                      ? sources.length
                      : sources.filter(
                          (source) => source.folderId === folder.id
                        ).length

                  return (
                    <Button
                      className={cn(
                        "h-auto justify-start gap-3 rounded-xl px-2 py-2 text-left",
                        selectedFolderId === folder.id &&
                          "bg-background shadow-sm"
                      )}
                      key={folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      variant="ghost"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background">
                        <FolderIcon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {folder.name}
                        </span>
                        <span className="block truncate text-xs font-normal text-muted-foreground">
                          {folder.description}
                        </span>
                      </span>
                      <Badge
                        className="h-5 px-1.5 text-[10px]"
                        variant="outline"
                      >
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-3 rounded-xl border bg-background p-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <InputGroup className="h-9 rounded-lg bg-background">
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar recursos, áreas, responsables..."
                    value={query}
                  />
                </InputGroup>
                <Tabs
                  className="lg:ml-auto"
                  onValueChange={setStatusFilter}
                  value={statusFilter}
                >
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="Ready">Disponible</TabsTrigger>
                    <TabsTrigger value="Indexing">Procesando</TabsTrigger>
                    <TabsTrigger value="Review">Revisión</TabsTrigger>
                  </TabsList>
                  <TabsContent className="sr-only" value={statusFilter} />
                </Tabs>
              </div>

              <div className="min-h-0 overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fuente</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Área
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Actualizado
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Responsable
                      </TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scopedSources.map((source) => (
                      <TableRow
                        className="cursor-pointer transition-colors"
                        data-state={
                          source.id === selectedSourceId
                            ? "selected"
                            : undefined
                        }
                        key={source.id}
                        onClick={() => setSelectedSourceId(source.id)}
                      >
                        <TableCell className="whitespace-normal">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                              {source.type === "URL" ? (
                                <Globe2Icon />
                              ) : (
                                <FileTextIcon />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">
                                {source.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {source.type} - {source.size} -{" "}
                                {source.updatedAt}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getVisibleFolderName(source.folderId)}
                        </TableCell>
                        <TableCell>
                          <KnowledgeStatusBadge status={source.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {source.updatedAt}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {source.owner}
                        </TableCell>
                        <TableCell onClick={(event) => event.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-label={`Acciones para ${source.name}`}
                                size="icon-sm"
                                variant="ghost"
                              >
                                <MoreHorizontalIcon />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => handleReindex(source.id)}
                                >
                                  Actualizar recurso
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleMarkReady(source.id)}
                                >
                                  Aprobar para uso
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!scopedSources.length ? (
                      <TableRow>
                        <TableCell
                          className="h-24 text-center text-muted-foreground"
                          colSpan={6}
                        >
                          Ningún recurso coincide con este filtro.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-3 rounded-xl border bg-muted/20 p-3 transition-all duration-300 ease-out">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <EyeIcon />
                  <h2 className="text-sm font-medium">Vista previa</h2>
                </div>
                {selectedSource ? (
                  <KnowledgeStatusBadge status={selectedSource.status} />
                ) : null}
              </div>
              {selectedSource ? (
                <div
                  className="flex animate-in flex-col gap-4 duration-300 fade-in-0 slide-in-from-right-2"
                  key={selectedSource.id}
                >
                  <div className="rounded-xl border bg-background p-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                        <FileTextIcon />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {selectedSource.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedSource.owner} - {selectedSource.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedPage ? (
                    <RenderedDocumentPreview
                      key={`${selectedSource.id}-${currentPageIndex}`}
                      onNextPage={() =>
                        setPreviewPageIndex((value) =>
                          Math.min(value + 1, selectedPages.length - 1)
                        )
                      }
                      onPreviousPage={() =>
                        setPreviewPageIndex((value) => Math.max(value - 1, 0))
                      }
                      onZoomIn={() =>
                        setPreviewZoom((value) => Math.min(value + 10, 140))
                      }
                      onZoomOut={() =>
                        setPreviewZoom((value) => Math.max(value - 10, 80))
                      }
                      page={selectedPage}
                      pageCount={selectedPages.length}
                      pageIndex={currentPageIndex}
                      source={selectedSource}
                      zoom={previewZoom}
                    />
                  ) : null}
                  <div className="grid gap-3 text-sm">
                    <KnowledgeDetail label="Área">
                      {getVisibleFolderName(selectedSource.folderId)}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Archivo">
                      {selectedSource.type} - {selectedSource.size}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Última actualización">
                      {selectedSource.updatedAt}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Uso recomendado">
                      <span className="text-muted-foreground">
                        {selectedSource.recommendedUse}
                      </span>
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Etiquetas">
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSource.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </KnowledgeDetail>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleReindex(selectedSource.id)}
                      variant="outline"
                    >
                      <ClockIcon data-icon="inline-start" />
                      Actualizar
                    </Button>
                    <Button onClick={() => handleMarkReady(selectedSource.id)}>
                      <CircleCheckIcon data-icon="inline-start" />
                      Aprobar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Selecciona un recurso para inspeccionar sus detalles.
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </section>
  )
}

function RenderedDocumentPreview({
  onNextPage,
  onPreviousPage,
  onZoomIn,
  onZoomOut,
  page,
  pageCount,
  pageIndex,
  source,
  zoom,
}: {
  onNextPage: () => void
  onPreviousPage: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  page: KnowledgeRenderedPage
  pageCount: number
  pageIndex: number
  source: KnowledgeSource
  zoom: number
}) {
  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex >= pageCount - 1

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="flex flex-col gap-3 border-b p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              Vista renderizada
            </p>
            <p className="line-clamp-2 text-sm font-medium">{source.summary}</p>
          </div>
          <Badge className="shrink-0" variant="outline">
            {source.type}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              aria-label="Página anterior"
              disabled={isFirstPage}
              onClick={onPreviousPage}
              size="icon-sm"
              variant="outline"
            >
              <ChevronLeftIcon />
            </Button>
            <Badge className="h-8 rounded-md px-2.5" variant="secondary">
              Página {pageIndex + 1}/{pageCount}
            </Badge>
            <Button
              aria-label="Página siguiente"
              disabled={isLastPage}
              onClick={onNextPage}
              size="icon-sm"
              variant="outline"
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <Separator className="hidden h-6 sm:block" orientation="vertical" />
          <div className="ml-auto flex items-center gap-1">
            <Button
              aria-label="Alejar"
              disabled={zoom <= 80}
              onClick={onZoomOut}
              size="icon-sm"
              variant="outline"
            >
              <ZoomOutIcon />
            </Button>
            <Badge className="h-8 min-w-14 rounded-md px-2.5" variant="outline">
              {zoom}%
            </Badge>
            <Button
              aria-label="Acercar"
              disabled={zoom >= 140}
              onClick={onZoomIn}
              size="icon-sm"
              variant="outline"
            >
              <ZoomInIcon />
            </Button>
            <Separator className="mx-1 h-6" orientation="vertical" />
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      aria-label="Ampliar documento"
                      size="icon-sm"
                      variant="secondary"
                    >
                      <MaximizeIcon />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Ampliar documento</TooltipContent>
              </Tooltip>
              <DialogContent className="flex h-[min(92vh,860px)] w-[min(92vw,1040px)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden bg-background/95 p-0 backdrop-blur-sm sm:max-w-[min(92vw,1040px)]">
                <DialogHeader className="border-b p-4 sm:p-6">
                  <DialogTitle>{source.name}</DialogTitle>
                  <DialogDescription>
                    {source.owner} - {source.type} - Actualizado:{" "}
                    {source.updatedAt}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 bg-muted/10 p-4 sm:p-6">
                  <div className="flex min-h-[680px] items-start justify-center">
                    <div
                      className="origin-top animate-in transition-transform duration-300 ease-out fade-in-0 zoom-in-95"
                      style={{ transform: `scale(${(zoom + 35) / 100})` }}
                    >
                      <RenderedPreviewSurface
                        display="expanded"
                        page={page}
                        pageIndex={pageIndex}
                        source={source}
                      />
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="bg-muted/20 p-3">
        <ScrollArea className="h-[380px] rounded-lg border bg-muted/30 sm:h-[420px] xl:h-[360px] 2xl:h-[460px]">
          <div className="flex min-h-[380px] items-start justify-center p-4 sm:min-h-[420px] xl:min-h-[360px] 2xl:min-h-[460px]">
            <div
              className="origin-top animate-in transition-transform duration-300 ease-out fade-in-0 zoom-in-95"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <RenderedPreviewSurface
                page={page}
                pageIndex={pageIndex}
                source={source}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function RenderedPreviewSurface({
  display = "preview",
  page,
  pageIndex,
  source,
}: {
  display?: "preview" | "expanded"
  page: KnowledgeRenderedPage
  pageIndex: number
  source: KnowledgeSource
}) {
  if (source.type === "CSV") {
    return (
      <SpreadsheetPreviewPage display={display} page={page} source={source} />
    )
  }

  if (source.type === "URL") {
    return <WebsitePreviewPage page={page} source={source} />
  }

  return (
    <article className="w-[250px] rounded-md border bg-background p-5 shadow-sm sm:w-[300px]">
      <div className="flex items-center justify-between gap-3 border-b pb-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-muted-foreground uppercase">
            {page.eyebrow}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base leading-tight font-medium">
            {page.title}
          </h3>
        </div>
        <Badge className="shrink-0" variant="outline">
          {source.type}
        </Badge>
      </div>
      <div className="flex flex-col gap-4 py-4">
        {page.sections.map((section) => (
          <section className="flex flex-col gap-1.5" key={section.heading}>
            <h4 className="text-xs font-medium">{section.heading}</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
      {page.callout ? (
        <div className="rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed">
          {page.callout}
        </div>
      ) : null}
      <div className="mt-5 flex items-center justify-between border-t pt-3 text-[10px] text-muted-foreground">
        <span>{source.owner}</span>
        <span>Página {pageIndex + 1}</span>
      </div>
    </article>
  )
}

function SpreadsheetPreviewPage({
  display = "preview",
  page,
  source,
}: {
  display?: "preview" | "expanded"
  page: KnowledgeRenderedPage
  source: KnowledgeSource
}) {
  const isExpanded = display === "expanded"

  return (
    <article
      className={cn(
        "overflow-hidden rounded-md border bg-background shadow-sm",
        isExpanded ? "w-[min(78vw,760px)]" : "w-[280px] sm:w-[360px]"
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b bg-muted/30 p-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-muted-foreground uppercase">
            {page.eyebrow}
          </p>
          <h3 className="truncate text-sm font-medium">{page.title}</h3>
        </div>
        <Badge variant="outline">{source.type}</Badge>
      </div>
      <div className="p-3">
        {page.sections.map((section) => (
          <div className="flex flex-col gap-1.5 pb-3" key={section.heading}>
            <h4 className="text-xs font-medium">{section.heading}</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
        {page.table ? (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {page.table.headers.map((header) => (
                    <TableHead className="h-8 text-[10px]" key={header}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {page.table.rows.map((row) => (
                  <TableRow key={row.join("-")}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        className="py-2 text-[10px]"
                        key={`${cell}-${cellIndex}`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
        {page.callout ? (
          <div className="mt-3 rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed">
            {page.callout}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function WebsitePreviewPage({
  page,
  source,
}: {
  page: KnowledgeRenderedPage
  source: KnowledgeSource
}) {
  return (
    <article className="w-[280px] overflow-hidden rounded-md border bg-background shadow-sm sm:w-[360px]">
      <div className="border-b bg-muted/30 p-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-1 rounded-md border bg-background px-2 py-1 text-[10px] text-muted-foreground">
            <Globe2Icon />
            <span className="truncate">{page.url ?? source.name}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-medium text-muted-foreground uppercase">
              {page.eyebrow}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base leading-tight font-medium">
              {page.title}
            </h3>
          </div>
          <Badge className="shrink-0" variant="outline">
            {source.type}
          </Badge>
        </div>
        <div className="grid gap-2">
          <div className="h-3 w-4/5 rounded-full bg-muted" />
          <div className="h-3 w-3/5 rounded-full bg-muted" />
          <div className="h-20 rounded-lg border bg-muted/30" />
        </div>
        <div className="flex flex-col gap-3">
          {page.sections.map((section) => (
            <section className="rounded-lg border p-3" key={section.heading}>
              <h4 className="text-xs font-medium">{section.heading}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
        {page.callout ? (
          <div className="rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed">
            {page.callout}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function KnowledgeMetric({
  detail,
  label,
  value,
}: {
  detail: string
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-medium">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  )
}

function KnowledgeStatusBadge({ status }: { status: KnowledgeStatus }) {
  if (status === "Ready") {
    return <Badge variant="secondary">Disponible</Badge>
  }

  if (status === "Indexing") {
    return <Badge variant="outline">Procesando</Badge>
  }

  return <Badge variant="destructive">Requiere revisión</Badge>
}

function KnowledgeDetail({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="grid gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function ChatSettingsView({
  model,
  onModelChange,
  onThemeChange,
  themePreference,
}: {
  model: string
  onModelChange: (value: string) => void
  onThemeChange: (value: ThemePreference) => void
  themePreference: ThemePreference
}) {
  const [assistantTone, setAssistantTone] = React.useState("Equilibrado")
  const [responseDepth, setResponseDepth] = React.useState("Conciso")
  const [memoryMode, setMemoryMode] = React.useState("Solo sesión")
  const [customInstruction, setCustomInstruction] = React.useState(
    "Prioriza respuestas concisas con acciones claras."
  )

  return (
    <section className="flex min-h-0 animate-in flex-col overflow-hidden bg-background duration-300 ease-out fade-in-0">
      <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium sm:text-base">
            Configuración del chat IA
          </h1>
          <p className="text-xs text-muted-foreground">
            Configura apariencia y personalización del asistente.
          </p>
        </div>
        <Badge variant="outline">Preferencias</Badge>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 sm:p-5">
          <Tabs defaultValue="appearance" className="flex flex-col gap-4">
            <TabsList className="w-full justify-start rounded-xl bg-muted/50">
              <TabsTrigger value="appearance">Apariencia</TabsTrigger>
              <TabsTrigger value="personalization">Personalización</TabsTrigger>
              <TabsTrigger value="assistant">Asistente</TabsTrigger>
            </TabsList>

            <TabsContent
              className="mt-0 animate-in duration-300 ease-out fade-in-0 slide-in-from-bottom-1"
              value="appearance"
            >
              <Card
                className="transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm"
                size="sm"
              >
                <CardHeader>
                  <CardTitle>Tema</CardTitle>
                  <CardDescription>
                    Elige cómo se ve el chat IA en tu espacio de trabajo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">Modo de color</p>
                        <p className="text-xs text-muted-foreground">
                          Preferencia actual: {themePreference}
                        </p>
                      </div>
                      <Select
                        onValueChange={(value) =>
                          onThemeChange(normalizeThemePreference(value))
                        }
                        value={themePreference}
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Seleccionar tema" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            <SelectItem value="system">Sistema</SelectItem>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Oscuro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground">
                      Las transiciones suaves siguen activas para paneles y
                      mensajes.
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    <CircleCheckIcon data-icon="inline-start" />
                    Guardado automático
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent
              className="mt-0 animate-in duration-300 ease-out fade-in-0 slide-in-from-bottom-1"
              value="personalization"
            >
              <Card
                className="transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm"
                size="sm"
              >
                <CardHeader>
                  <CardTitle>Estilo personal</CardTitle>
                  <CardDescription>
                    Ajusta el tono y estilo de salida de las respuestas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          Tono del asistente
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cercano, directo o estructurado.
                        </p>
                      </div>
                      <Select
                        onValueChange={setAssistantTone}
                        value={assistantTone}
                      >
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Seleccionar tono" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            <SelectItem value="Equilibrado">
                              Equilibrado
                            </SelectItem>
                            <SelectItem value="Amigable">Amigable</SelectItem>
                            <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          Nivel de profundidad
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Controla qué tan detallada debe ser cada respuesta.
                        </p>
                      </div>
                      <Select
                        onValueChange={setResponseDepth}
                        value={responseDepth}
                      >
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            <SelectItem value="Conciso">Conciso</SelectItem>
                            <SelectItem value="Equilibrado">
                              Equilibrado
                            </SelectItem>
                            <SelectItem value="A fondo">A fondo</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <InputGroup className="h-auto rounded-lg bg-background">
                      <InputGroupTextarea
                        className="min-h-[96px]"
                        onChange={(event) =>
                          setCustomInstruction(event.target.value.slice(0, 240))
                        }
                        placeholder="Agrega una instrucción para guiar futuras respuestas..."
                        value={customInstruction}
                      />
                      <InputGroupAddon
                        align="block-end"
                        className="justify-end px-3 pb-3"
                      >
                        <InputGroupText className="text-xs text-muted-foreground">
                          {customInstruction.length}/240
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    <CircleCheckIcon data-icon="inline-start" />
                    Preferencias actualizadas
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent
              className="mt-0 animate-in duration-300 ease-out fade-in-0 slide-in-from-bottom-1"
              value="assistant"
            >
              <Card
                className="transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm"
                size="sm"
              >
                <CardHeader>
                  <CardTitle>Comportamiento de IA</CardTitle>
                  <CardDescription>
                    Controla el modelo y el comportamiento de memoria.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          Modelo por defecto
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Este modelo se usa en chats nuevos.
                        </p>
                      </div>
                      <Select onValueChange={onModelChange} value={model}>
                        <SelectTrigger className="w-full sm:w-52">
                          <SelectValue placeholder="Seleccionar modelo" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            {models.map((item) => (
                              <SelectItem key={item} value={item}>
                                {getModelLabel(item)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">Modo de memoria</p>
                        <p className="text-xs text-muted-foreground">
                          Decide cuánto contexto conserva el asistente.
                        </p>
                      </div>
                      <Select onValueChange={setMemoryMode} value={memoryMode}>
                        <SelectTrigger className="w-full sm:w-52">
                          <SelectValue placeholder="Seleccionar modo" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            <SelectItem value="Solo sesión">
                              Solo sesión
                            </SelectItem>
                            <SelectItem value="Últimos 7 días">
                              Últimos 7 días
                            </SelectItem>
                            <SelectItem value="Solo chats fijados">
                              Solo chats fijados
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </section>
  )
}

function ChatWorkspace({
  attachments,
  activeView,
  chat,
  draft,
  isSending,
  mode,
  model,
  onAttach,
  onDraftChange,
  onModelChange,
  onNewChat,
  onPrompt,
  onSend,
  onThemeChange,
  onToggleVoice,
  promptActions,
  textareaRef,
  themePreference,
  voiceEnabled,
}: {
  attachments: number
  activeView: WorkspaceView
  chat: Chat | null
  draft: string
  isSending: boolean
  mode: string
  model: string
  onAttach: () => void
  onDraftChange: (value: string) => void
  onModelChange: (value: string) => void
  onNewChat: () => void
  onPrompt: (action: PromptAction) => void
  onSend: () => void
  onThemeChange: (value: ThemePreference) => void
  onToggleVoice: () => void
  promptActions: PromptAction[]
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  themePreference: ThemePreference
  voiceEnabled: boolean
}) {
  const [transcript, setTranscript] = React.useState("")

  React.useEffect(() => {
    if (!voiceEnabled) {
      setTranscript("")
      return
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setTranscript("Tu navegador no soporta reconocimiento de voz.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "es-PE"

    recognition.onresult = (event: any) => {
      let currentTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript
      }
      setTranscript(currentTranscript)
    }

    recognition.onerror = (event: any) => {
      if (event.error === "aborted") {
        return
      }

      console.error("Error en reconocimiento de voz:", event.error)
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setTranscript(
          "Por favor, permite el acceso al micrófono o revisa los permisos del navegador."
        )
      } else {
        setTranscript(`Error en el dictado: ${event.error}`)
      }
    }

    try {
      recognition.start()
    } catch (error) {
      console.error(error)
    }

    return () => {
      recognition.stop()
    }
  }, [voiceEnabled])

  function handleStopVoice() {
    if (transcript) {
      onDraftChange(draft ? `${draft} ${transcript}` : transcript)
    }
    onToggleVoice()
  }

  if (activeView === "settings") {
    return (
      <ChatSettingsView
        model={model}
        onModelChange={onModelChange}
        onThemeChange={onThemeChange}
        themePreference={themePreference}
      />
    )
  }

  if (activeView === "knowledge") {
    return <KnowledgeBaseView />
  }

  if (activeView === "notifications") {
    return <NotificationsView themePreference={themePreference} />
  }

  if (activeView === "users") {
    return <UsersView />
  }

  if (chat) {
    return (
      <section className="relative flex min-h-0 animate-in flex-col overflow-hidden bg-background duration-300 ease-out fade-in-0">
        <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium sm:text-base">
              {chat.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {chat.category} - {getModelLabel(chat.model)}
            </p>
          </div>
          <Button onClick={onNewChat} size="sm" variant="outline">
            <PlusIcon data-icon="inline-start" />
            Nuevo
          </Button>
        </div>
        <ScrollArea
          className={cn(
            "min-h-0 flex-1 transition-all duration-700 ease-in-out",
            voiceEnabled && "pointer-events-none opacity-10 blur-sm"
          )}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-5 sm:px-6">
            {chat.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>

        {/* Voice Overlay for Active Chat */}
        <div
          className={cn(
            "absolute inset-0 top-[3.25rem] z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out sm:top-14",
            voiceEnabled
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          )}
        >
          <div
            className={cn(
              "ai-orb transition-all duration-700 ease-in-out",
              voiceEnabled
                ? "scale-[1.5] cursor-pointer shadow-[0_0_80px_rgba(227,0,15,0.3)]"
                : "scale-50"
            )}
            aria-hidden
            onClick={voiceEnabled ? handleStopVoice : undefined}
          />
          <div className="mt-24 flex flex-col items-center px-6 text-center">
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-foreground sm:text-2xl">
              {transcript.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="mr-1 inline-block animate-in duration-500 ease-out fade-in"
                >
                  {word}
                </span>
              ))}
              <span className="ml-1 animate-pulse text-primary">|</span>
            </p>
            <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-sm">
              Escuchando... Haz clic en la esfera para terminar
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto w-full max-w-3xl px-4 pt-2 pb-4 transition-all duration-700 ease-in-out sm:px-6",
            voiceEnabled
              ? "pointer-events-none translate-y-12 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          <ChatComposer
            attachments={attachments}
            draft={draft}
            isSending={isSending}
            mode={mode}
            model={model}
            onAttach={onAttach}
            onDraftChange={onDraftChange}
            onModelChange={onModelChange}
            onSend={onSend}
            onToggleVoice={onToggleVoice}
            textareaRef={textareaRef}
            voiceEnabled={voiceEnabled}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-0 animate-in overflow-hidden bg-background duration-300 ease-out fade-in-0">
      <div
        className={cn(
          "mx-auto flex h-full w-full max-w-[880px] flex-col items-center px-4 transition-all duration-700 ease-in-out",
          voiceEnabled ? "pt-[25vh]" : "pt-14 sm:pt-20 lg:pt-28"
        )}
      >
        <div
          className={cn(
            "ai-orb transition-all duration-700 ease-in-out",
            voiceEnabled
              ? "scale-[1.8] cursor-pointer shadow-[0_0_80px_rgba(227,0,15,0.4)]"
              : "scale-100"
          )}
          aria-hidden
          onClick={voiceEnabled ? handleStopVoice : undefined}
        />

        {/* Voice Captions Overlay */}
        <div
          className={cn(
            "absolute top-[60%] flex flex-col items-center px-6 text-center transition-all duration-700 ease-in-out",
            voiceEnabled
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0"
          )}
        >
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-foreground sm:text-2xl">
            {transcript.split(" ").map((word, index) => (
              <span
                key={index}
                className="mr-1 inline-block animate-in duration-500 ease-out fade-in"
              >
                {word}
              </span>
            ))}
            <span className="ml-1 animate-pulse text-primary">|</span>
          </p>
          <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-sm">
            Escuchando... Haz clic en la esfera para terminar
          </p>
        </div>

        {/* Standard UI */}
        <div
          className={cn(
            "flex w-full flex-col items-center transition-all duration-700 ease-in-out",
            voiceEnabled
              ? "pointer-events-none translate-y-12 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          <h1 className="mt-10 text-center text-[28px] leading-[1.2] font-medium tracking-[0] text-foreground sm:mt-12 sm:text-[34px] xl:text-[38px]">
            <span>Buenos días, Toby</span>
            <br />
            <span>
              ¿Cómo puedo{" "}
              <span className="ai-gradient-text">ayudarte hoy?</span>
            </span>
          </h1>
          <ChatComposer
            attachments={attachments}
            className="mt-8 sm:mt-10"
            draft={draft}
            isSending={isSending}
            mode={mode}
            model={model}
            onAttach={onAttach}
            onDraftChange={onDraftChange}
            onModelChange={onModelChange}
            onSend={onSend}
            onToggleVoice={onToggleVoice}
            textareaRef={textareaRef}
            voiceEnabled={voiceEnabled}
          />
          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
            {promptActions.map((action) => (
              <Button
                className="h-8 rounded-full bg-background px-3 shadow-sm transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow"
                key={action.label}
                onClick={() => onPrompt(action)}
                size="sm"
                variant="outline"
              >
                <action.icon data-icon="inline-start" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardView({
  blockOrder,
  onAskAI,
  onMoveBlock,
  onResetLayout,
}: {
  blockOrder: DashboardBlockId[]
  onAskAI: (context: string) => void
  onMoveBlock: (
    sourceBlockId: DashboardBlockId,
    targetBlockId: DashboardBlockId
  ) => void
  onResetLayout: () => void
}) {
  const [layoutEditMode, setLayoutEditMode] = React.useState(false)
  const [draggingBlockId, setDraggingBlockId] =
    React.useState<DashboardBlockId | null>(null)
  const [overBlockId, setOverBlockId] = React.useState<DashboardBlockId | null>(
    null
  )

  function getBlockOrder(blockId: DashboardBlockId) {
    return blockOrder.indexOf(blockId) + 1
  }

  function handleDragStart(
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) {
    if (!layoutEditMode) {
      return
    }

    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", blockId)
    setDraggingBlockId(blockId)
  }

  function handleDragOver(
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) {
    if (!layoutEditMode) {
      return
    }

    event.preventDefault()
    setOverBlockId(blockId)
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) {
    if (!layoutEditMode) {
      return
    }

    event.preventDefault()
    const sourceBlockId = event.dataTransfer.getData(
      "text/plain"
    ) as DashboardBlockId
    onMoveBlock(sourceBlockId, blockId)
    setDraggingBlockId(null)
    setOverBlockId(null)
  }

  function handleDragEnd() {
    setDraggingBlockId(null)
    setOverBlockId(null)
  }

  return (
    <section
      aria-label="Panel operativo"
      className="h-[calc(100svh-3.5rem)] overflow-hidden bg-background sm:h-[calc(100svh-4rem)]"
    >
      <ScrollArea className="h-full">
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-4 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    <Building2Icon data-icon="inline-start" />
                    BSF Almacenes del Perú
                  </Badge>
                  <Badge variant="outline">
                    <CalendarClockIcon data-icon="inline-start" />
                    Actualizado hace 4 min
                  </Badge>
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl leading-tight font-medium tracking-[0] sm:text-3xl">
                    Panel ejecutivo operacional-comercial
                  </h1>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Ocupación por sede, m² vendibles, ingresos asegurados,
                    contratos en riesgo y calidad de datos para decidir sin ruido.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
              <Select defaultValue="may-2026">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="may-2026">Mayo 2026</SelectItem>
                    <SelectItem value="jun-2026">Junio 2026</SelectItem>
                    <SelectItem value="q2-2026">Q2 2026</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="all-centers">
                <SelectTrigger className="h-8 w-[170px]">
                  <SelectValue placeholder="Centro logístico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-centers">Todas las sedes</SelectItem>
                    <SelectItem value="ves">Villa El Salvador</SelectItem>
                    <SelectItem value="lurin">Portada de Lurín</SelectItem>
                    <SelectItem value="logiscity">Logiscity</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="all-property-types">
                <SelectTrigger className="h-8 w-[160px]">
                  <SelectValue placeholder="Tipo propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-property-types">Todo tipo</SelectItem>
                    <SelectItem value="warehouse">Almacén</SelectItem>
                    <SelectItem value="yard">Patio</SelectItem>
                    <SelectItem value="cold">Frío</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="active-contracts">
                <SelectTrigger className="h-8 w-[170px]">
                  <SelectValue placeholder="Estado contractual" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active-contracts">Vigente</SelectItem>
                    <SelectItem value="all-contracts">Todos</SelectItem>
                    <SelectItem value="signatures">En firmas</SelectItem>
                    <SelectItem value="expired">No vigente</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="all-currencies">
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-currencies">PEN + USD</SelectItem>
                    <SelectItem value="pen">PEN</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <FileTextIcon data-icon="inline-start" />
                Exportar
              </Button>
              {layoutEditMode ? (
                <Button onClick={onResetLayout} size="sm" variant="outline">
                  <RotateCcwIcon data-icon="inline-start" />
                  Restaurar
                </Button>
              ) : null}
              <Button
                onClick={() => setLayoutEditMode((value) => !value)}
                size="sm"
                variant={layoutEditMode ? "default" : "secondary"}
              >
                <LayoutGridIcon data-icon="inline-start" />
                {layoutEditMode ? "Listo" : "Reordenar"}
              </Button>
            </div>
          </div>

          {layoutEditMode ? (
            <div className="pointer-events-none absolute inset-x-2 top-32 bottom-2 rounded-xl bg-background/45 backdrop-blur-[1px]" />
          ) : null}

          <DashboardReorderBlock
            blockId="metrics"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="KPIs"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("metrics")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardMetricCards.map((metric) => (
                <DashboardMetricCard
                  key={metric.label}
                  metric={metric}
                  onAskAI={onAskAI}
                />
              ))}
            </div>
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="decision"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Decisión"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("decision")}
            overBlockId={overBlockId}
          >
            <DashboardDecisionLayer onAskAI={onAskAI} />
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="flow-network"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Ocupación y contratos"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("flow-network")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
              <DashboardOccupancyByCenter onAskAI={onAskAI} />
              <DashboardContractsPanel onAskAI={onAskAI} />
            </div>
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="capacity-risks"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Ingresos e inventario"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("capacity-risks")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
              <DashboardRevenuePanel />
              <DashboardPropertiesPanel onAskAI={onAskAI} />
            </div>
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="movements-forecast"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Calidad de datos"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("movements-forecast")}
            overBlockId={overBlockId}
          >
            <DashboardDataQualityPanel onAskAI={onAskAI} />
          </DashboardReorderBlock>
        </div>
      </ScrollArea>
    </section>
  )
}

function DashboardReorderBlock({
  blockId,
  children,
  draggingBlockId,
  editMode,
  label,
  onDragEnd,
  onDragOver,
  onDragStart,
  onDrop,
  order,
  overBlockId,
}: {
  blockId: DashboardBlockId
  children: React.ReactNode
  draggingBlockId: DashboardBlockId | null
  editMode: boolean
  label: string
  onDragEnd: () => void
  onDragOver: (
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) => void
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) => void
  onDrop: (
    event: React.DragEvent<HTMLDivElement>,
    blockId: DashboardBlockId
  ) => void
  order: number
  overBlockId: DashboardBlockId | null
}) {
  const isDragging = draggingBlockId === blockId
  const isDropTarget = overBlockId === blockId && draggingBlockId !== blockId

  return (
    <div
      aria-label={label}
      className={cn(
        "relative transition-[background-color,box-shadow,opacity,transform] duration-300 ease-out",
        editMode &&
          "cursor-grab rounded-xl bg-background/80 p-1 shadow-xl ring-1 ring-border backdrop-blur-sm active:cursor-grabbing",
        isDragging && "scale-[0.985] opacity-45",
        isDropTarget && "translate-y-1 bg-muted/40 ring-primary/40"
      )}
      draggable={editMode}
      onDragEnd={onDragEnd}
      onDragOver={(event) => onDragOver(event, blockId)}
      onDragStart={(event) => onDragStart(event, blockId)}
      onDrop={(event) => onDrop(event, blockId)}
      style={{ order }}
    >
      {editMode ? (
        <div className="absolute -top-3 left-3 flex items-center gap-1.5">
          <Button
            aria-label={`Mover ${label}`}
            className="h-6 rounded-full px-2 text-[11px] shadow-sm"
            size="xs"
            variant="secondary"
          >
            <GripVerticalIcon data-icon="inline-start" />
            {label}
          </Button>
        </div>
      ) : null}
      {children}
    </div>
  )
}

function DashboardAskAIButton({
  className,
  context,
  onAskAI,
}: {
  className?: string
  context: string
  onAskAI: (context: string) => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label="Explicar con IA"
          className={cn(
            "h-6 gap-1 rounded-full px-2 text-[11px] opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/data:opacity-100 hover:scale-[1.03] focus-visible:opacity-100",
            className
          )}
          onClick={(event) => {
            event.stopPropagation()
            onAskAI(context)
          }}
          size="xs"
          variant="secondary"
        >
          <BrainCircuitIcon data-icon="inline-start" />
          IA
        </Button>
      </TooltipTrigger>
      <TooltipContent>Explicar este dato con IA</TooltipContent>
    </Tooltip>
  )
}

function DashboardDecisionLayer({
  onAskAI,
}: {
  onAskAI: (context: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="border-b p-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheckIcon />
              Capa de decisión
            </CardTitle>
            <CardDescription>
              Qué pasa, cuánto importa, quién actúa y antes de cuándo.
            </CardDescription>
          </div>
          <Badge variant="secondary">Prioridad gerencial</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 xl:grid-cols-3">
        {dashboardDecisionItems.map((decision) => {
          const aiContext = `Decisión: ${decision.title}. Qué pasa: ${decision.what} Cuánto importa: ${decision.impact} Quién actúa: ${decision.owner}. Antes de cuándo: ${decision.deadline}. Acción recomendada: ${decision.action}`

          return (
            <div
              className="group/data flex flex-col gap-3 rounded-lg border bg-background p-3 transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted/20 hover:shadow-sm"
              key={decision.title}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{decision.title}</p>
                    <Badge
                      variant={
                        decision.urgency === "Alta" ? "destructive" : "outline"
                      }
                    >
                      {decision.urgency}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Acción: {decision.action}
                  </p>
                </div>
                <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <DashboardDecisionField
                  label="Qué pasa"
                  value={decision.what}
                />
                <DashboardDecisionField
                  label="Cuánto importa"
                  value={decision.impact}
                />
                <DashboardDecisionField
                  label="Quién actúa"
                  value={decision.owner}
                />
                <DashboardDecisionField
                  label="Antes de cuándo"
                  value={decision.deadline}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function DashboardDecisionField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg bg-muted/30 p-3">
      <p className="text-[11px] font-medium text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed">{value}</p>
    </div>
  )
}

function DashboardMetricCard({
  onAskAI,
  metric,
}: {
  onAskAI: (context: string) => void
  metric: (typeof dashboardMetricCards)[number]
}) {
  const TrendIcon =
    metric.direction === "up" ? ArrowUpRightIcon : ArrowDownRightIcon
  const aiContext = `${metric.label}: ${metric.value}. ${metric.detail}. Variación ${metric.trend}.`
  const statusVariant =
    metric.status === "critical"
      ? "destructive"
      : metric.status === "attention"
        ? "outline"
        : "secondary"

  return (
    <Card
      className={cn(
        "group/data overflow-hidden transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm",
        metric.status === "critical" && "border-destructive/30",
        metric.status === "attention" && "border-muted-foreground/30"
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
            <metric.icon />
          </span>
          <div className="flex items-center gap-1.5">
            <Badge
              variant={statusVariant}
            >
              <TrendIcon data-icon="inline-start" />
              {metric.trend}
            </Badge>
            <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-1 text-2xl font-medium tracking-[0]">
            {metric.value}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {metric.detail}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardOccupancyByCenter({
  onAskAI,
}: {
  onAskAI: (context: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <GaugeIcon />
          Ocupación por centro logístico
        </CardTitle>
        <CardDescription>
          Total, arrendado, disponible, contratos e ingreso mensual estimado.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-4">
        {logisticsCenterOccupancy.map((site) => {
          const aiContext = `Centro ${site.site}: ocupación ${site.occupancy}%, total ${site.totalSqm} m², ocupado ${site.occupiedSqm} m², disponible ${site.availableSqm} m², contratos activos ${site.contracts}, ingreso mensual ${site.monthlyRevenue}, estado ${site.state}.`

          return (
            <div
              className="group/data flex flex-col gap-3 rounded-lg border bg-background p-3 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-muted/20 hover:shadow-sm"
              key={site.site}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{site.site}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPinIcon />
                    {site.totalSqm} m² operativos
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant={
                      site.state === "Crítico"
                        ? "destructive"
                        : site.state === "Atención"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {site.state}
                  </Badge>
                  <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
                </div>
              </div>
              <Progress value={site.occupancy} />
              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
                <DashboardMiniStat label="Ocupación" value={`${site.occupancy}%`} />
                <DashboardMiniStat label="Ocupado" value={site.occupiedSqm} />
                <DashboardMiniStat label="Disponible" value={site.availableSqm} />
                <DashboardMiniStat label="Contratos" value={`${site.contracts}`} />
                <DashboardMiniStat label="Ingreso" value={site.monthlyRevenue} />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function DashboardMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/25 p-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="truncate text-xs font-medium">{value}</p>
    </div>
  )
}

function DashboardContractsPanel({
  onAskAI,
}: {
  onAskAI: (context: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <RouteIcon />
          Contratos y vencimientos
        </CardTitle>
        <CardDescription>
          Pipeline contractual y clientes que requieren renovación prioritaria.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {contractPipeline.map((item) => (
            <div className="rounded-lg border bg-background p-3" key={item.state}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium">{item.state}</p>
                  <p className="text-[11px] text-muted-foreground">{item.value}</p>
                </div>
                <Badge variant="outline">{item.count}</Badge>
              </div>
              <Progress className="mt-3" value={item.progress} />
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Sede</TableHead>
                <TableHead>Fecha fin</TableHead>
                <TableHead>M²</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead>Renov.</TableHead>
                <TableHead>Riesgo</TableHead>
                <TableHead>Responsable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiringContracts.map((contract) => {
                const aiContext = `Contrato por vencer: ${contract.client}, sede ${contract.site}, fecha fin ${contract.endDate}, ${contract.sqm} m², ingreso mensual ${contract.revenue}, renovación automática ${contract.autoRenewal}, riesgo ${contract.risk}, responsable ${contract.owner}.`

                return (
                  <TableRow className="group/data" key={contract.client}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{contract.client}</span>
                        <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
                      </div>
                    </TableCell>
                    <TableCell>{contract.site}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>{contract.sqm}</TableCell>
                    <TableCell>{contract.revenue}</TableCell>
                    <TableCell>{contract.autoRenewal}</TableCell>
                    <TableCell>
                      <Badge variant={contract.risk === "Alto" ? "destructive" : contract.risk === "Medio" ? "outline" : "secondary"}>
                        {contract.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>{contract.owner}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardRevenuePanel() {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUpIcon />
          Ingresos y rentabilidad
        </CardTitle>
        <CardDescription>
          Ingreso mensual por sede, renta por m², descuentos, garantías y moneda.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <ChartContainer className="aspect-auto h-[240px] w-full" config={revenueChartConfig}>
          <BarChart accessibilityLayer data={monthlyRevenueByCenter} margin={{ left: 0, right: 12, top: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="center" tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} width={38} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="pen" fill="var(--color-pen)" radius={5} />
            <Bar dataKey="usd" fill="var(--color-usd)" radius={5} />
          </BarChart>
        </ChartContainer>
        <div className="grid gap-2 sm:grid-cols-3">
          {profitabilitySignals.map((signal) => (
            <div className="rounded-lg border bg-background p-3" key={signal.label}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium">{signal.label}</p>
                <Badge variant={signal.status === "Crítico" ? "destructive" : signal.status === "Atención" ? "outline" : "secondary"}>
                  {signal.status}
                </Badge>
              </div>
              <p className="mt-2 text-lg font-medium">{signal.value}</p>
              <p className="text-xs text-muted-foreground">{signal.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente top</TableHead>
                <TableHead>Sede</TableHead>
                <TableHead>M²</TableHead>
                <TableHead className="text-right">Ingreso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClientsByRevenue.map((client) => (
                <TableRow key={client.client}>
                  <TableCell className="font-medium">{client.client}</TableCell>
                  <TableCell>{client.center}</TableCell>
                  <TableCell>{client.sqm}</TableCell>
                  <TableCell className="text-right font-medium">{client.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardPropertiesPanel({
  onAskAI,
}: {
  onAskAI: (context: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="border-b p-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <WarehouseIcon />
          Propiedades y disponibilidad
        </CardTitle>
        <CardDescription>
          Inventario comercial por estado, subestado, m² y disponibilidad real.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {propertyInventorySummary.map((item) => (
            <div className="rounded-lg border bg-background p-3" key={item.label}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium">{item.label}</p>
                <Badge variant="outline">{item.count}</Badge>
              </div>
              <p className="mt-2 text-lg font-medium">{item.sqm} m²</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Sede</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>M²</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Subestado</TableHead>
                <TableHead>Disponible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertyAvailabilityRows.map((property) => {
                const aiContext = `Propiedad ${property.code} ${property.name}, sede ${property.site}, tipo ${property.type}, ${property.sqm} m², estado ${property.state}, subestado ${property.substate}, disponible para comercialización ${property.available}.`

                return (
                  <TableRow className="group/data" key={property.code}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{property.code}</span>
                        <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
                      </div>
                    </TableCell>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.site}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>{property.sqm}</TableCell>
                    <TableCell>
                      <Badge variant={property.state === "Disponible" ? "secondary" : "outline"}>
                        {property.state}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.substate}</TableCell>
                    <TableCell>
                      <Badge variant={property.available === "Sí" ? "secondary" : "outline"}>
                        {property.available}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardDataQualityPanel({
  onAskAI,
}: {
  onAskAI: (context: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangleIcon />
            Calidad y consistencia de datos
          </CardTitle>
          <CardDescription>
            Problemas que pueden afectar ocupación, m² vendibles, revenue y riesgos contractuales.
          </CardDescription>
        </div>
        <Badge variant="destructive">6 críticos / altos</Badge>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 lg:grid-cols-2 xl:grid-cols-3">
        {dataQualityAlerts.map((alert) => {
          const aiContext = `Calidad de datos: ${alert.issue}. Casos ${alert.count}. Impacto: ${alert.impact}. Responsable: ${alert.owner}. Severidad ${alert.severity}.`

          return (
            <div
              className="group/data flex flex-col gap-3 rounded-lg border bg-background p-3 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-muted/20 hover:shadow-sm"
              key={alert.issue}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{alert.issue}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {alert.impact}
                  </p>
                </div>
                <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={alert.severity === "Crítico" ? "destructive" : "outline"}>
                  {alert.severity}
                </Badge>
                <Badge variant="secondary">{alert.count} registros</Badge>
                <span className="text-xs text-muted-foreground">{alert.owner}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
      <CardFooter className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Prioridad: limpiar maestro de propiedades, enlazar adendas con contrato origen y marcar última versión antes de exportar el comité comercial.
        </p>
      </CardFooter>
    </Card>
  )
}

function renderInlineMarkdown(content: string) {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let key = 0

  while (cursor < content.length) {
    const start = content.indexOf("**", cursor)

    if (start === -1) {
      nodes.push(content.slice(cursor))
      break
    }

    const end = content.indexOf("**", start + 2)

    if (end === -1) {
      nodes.push(content.slice(cursor))
      break
    }

    if (start > cursor) {
      nodes.push(content.slice(cursor, start))
    }

    nodes.push(
      <strong className="font-semibold" key={`strong-${key}`}>
        {content.slice(start + 2, end)}
      </strong>
    )
    key += 1
    cursor = end + 2
  }

  return nodes
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  const isThinking = message.status === "thinking"
  const isTyping = message.status === "typing"
  const hasError = message.status === "error"

  return (
    <div
      className={cn(
        "flex animate-in gap-3 duration-300 ease-out fade-in-0 slide-in-from-bottom-1",
        isUser && "justify-end"
      )}
    >
      {!isUser ? (
        <Avatar className="mt-0.5 size-7">
          <AvatarFallback className="bg-muted text-[11px]">IA</AvatarFallback>
        </Avatar>
      ) : null}
      <div
        className={cn(
          "max-w-[min(78%,42rem)] rounded-lg px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border bg-background shadow-sm",
          hasError && "border-destructive/50 text-destructive"
        )}
      >
        {isThinking ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <BrainCircuitIcon className="animate-pulse" />
            <span>Obteniendo respuesta</span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="size-1 [animation:bounce_1.1s_infinite] rounded-full bg-current opacity-40" />
              <span className="size-1 [animation:bounce_1.1s_infinite] rounded-full bg-current opacity-60 [animation-delay:120ms]" />
              <span className="size-1 [animation:bounce_1.1s_infinite] rounded-full bg-current opacity-80 [animation-delay:240ms]" />
            </span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">
            {renderInlineMarkdown(message.content)}
            {isTyping ? (
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-current" />
            ) : null}
          </p>
        )}
        <span
          className={cn(
            "mt-1 block text-[10px]",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground",
            hasError && "text-destructive/80"
          )}
        >
          {message.at}
        </span>
      </div>
    </div>
  )
}

function ChatComposer({
  attachments,
  className,
  draft,
  isSending,
  mode,
  model,
  onAttach,
  onDraftChange,
  onModelChange,
  onSend,
  onToggleVoice,
  textareaRef,
  voiceEnabled,
}: {
  attachments: number
  className?: string
  draft: string
  isSending: boolean
  mode: string
  model: string
  onAttach: () => void
  onDraftChange: (value: string) => void
  onModelChange: (value: string) => void
  onSend: () => void
  onToggleVoice: () => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  voiceEnabled: boolean
}) {
  return (
    <InputGroup
      className={cn(
        "ai-composer h-auto w-full border-0 bg-background transition-shadow duration-300 ease-out",
        className
      )}
    >
      <InputGroupAddon align="block-start" className="h-8 px-4 py-0 sm:px-5">
        <InputGroupText className="min-w-0 gap-2 text-xs text-foreground">
          <span className="truncate">Razonamiento empresarial inteligente</span>

          {isSending ? (
            <Badge
              className="ml-auto hidden h-5 gap-1 text-[10px] sm:inline-flex"
              variant="secondary"
            >
              <LoaderCircleIcon
                aria-hidden
                className="animate-spin"
                data-icon="inline-start"
              />
              Pensando
            </Badge>
          ) : mode !== "General" ? (
            <Badge
              className="ml-auto hidden h-5 text-[10px] sm:inline-flex"
              variant="outline"
            >
              {mode}
            </Badge>
          ) : null}
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        aria-label="Pregúntame lo que necesites"
        className="min-h-[74px] px-4 pt-4 pb-0 text-[15px] transition-colors duration-200 ease-out sm:px-5"
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault()
            onSend()
          }
        }}
        disabled={isSending}
        placeholder="Pregúntame lo que necesites..."
        ref={textareaRef}
        value={draft}
      />
      <InputGroupAddon
        align="block-end"
        className="flex-wrap gap-2 px-4 pt-0 pb-4 sm:h-12 sm:flex-nowrap sm:px-5"
      >
        <InputGroupButton
          aria-label="Adjuntar archivo"
          disabled={isSending}
          onClick={onAttach}
          size="icon-sm"
          variant="ghost"
        >
          <PaperclipIcon />
        </InputGroupButton>
        {attachments ? (
          <Badge className="h-6 text-[10px]" variant="outline">
            {attachments} archivo{attachments === 1 ? "" : "s"}
          </Badge>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-9 min-w-0 rounded-full px-2 transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px sm:px-3"
              disabled={isSending}
              size="sm"
              variant="outline"
            >
              <Globe2Icon data-icon="inline-start" />
              <span className="hidden max-w-36 truncate sm:inline">
                {getModelLabel(model)}
              </span>
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top">
            <DropdownMenuGroup>
              {models.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => onModelChange(item)}
                >
                  {getModelLabel(item)}
                  {item === model ? <CheckIcon className="ml-auto" /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupText className="ml-auto gap-2">
          <Button
            aria-label="Entrada de voz"
            className={cn(
              "rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px",
              voiceEnabled && "bg-muted"
            )}
            onClick={onToggleVoice}
            disabled={isSending}
            size="icon-sm"
            variant="outline"
          >
            <MicIcon />
          </Button>
          <Button
            aria-label="Enviar mensaje"
            className="ai-send-button rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out enabled:hover:-translate-y-px enabled:hover:shadow-sm"
            disabled={!draft.trim() || isSending}
            onClick={onSend}
            size="icon-sm"
          >
            {isSending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
