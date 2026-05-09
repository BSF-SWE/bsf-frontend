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
  TruckIcon,
  UploadIcon,
  WarehouseIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  type LucideIcon,
} from "lucide-react"
import {
  Area,
  AreaChart,
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
import { cn } from "@workspace/ui/lib/utils"
import { ManagerNotifications } from "./manager-notifications"
import { NotificationsView } from "./notifications-view"

type ChatGroup = "Recientes" | "Ayer"
type MessageRole = "user" | "assistant"
type MessageStatus = "thinking" | "typing" | "error"
type WorkspaceView =
  | "dashboard"
  | "chat"
  | "knowledge"
  | "settings"
  | "notifications"
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
    label: "Ocupación promedio",
    value: "87%",
    detail: "14 sedes sobre meta operativa",
    trend: "+4.2%",
    direction: "up",
    icon: WarehouseIcon,
  },
  {
    label: "SLA de despacho",
    value: "96.4%",
    detail: "18,420 pedidos sin retraso",
    trend: "+1.8%",
    direction: "up",
    icon: PackageCheckIcon,
  },
  {
    label: "Ingresos logísticos",
    value: "S/ 2.84M",
    detail: "Facturación estimada del mes",
    trend: "+12.6%",
    direction: "up",
    icon: TrendingUpIcon,
  },
  {
    label: "Incidencias críticas",
    value: "7",
    detail: "3 requieren decisión hoy",
    trend: "-18%",
    direction: "down",
    icon: AlertTriangleIcon,
  },
] satisfies Array<{
  label: string
  value: string
  detail: string
  trend: string
  direction: "up" | "down"
  icon: LucideIcon
}>

const dashboardDecisionItems = [
  {
    title: "Descomprimir muelles de Ate",
    what: "La ventana 14:00-17:00 supera la capacidad asignada y empuja backlog a despacho nocturno.",
    impact: "S/ 214K en órdenes observadas y riesgo de -0.9 pp en SLA diario.",
    owner: "Subgerencia Operaciones",
    deadline: "Hoy 13:30",
    action:
      "Reasignar 2 muelles desde Lurín y adelantar recepción de Retail Norte.",
    urgency: "Alta",
  },
  {
    title: "Conciliar inventario de alta rotación",
    what: "El WMS no coincide con conteo físico en SKU críticos para Farma Andina.",
    impact: "S/ 92K retenidos y riesgo de quiebre en 3 rutas de última milla.",
    owner: "Control de inventario",
    deadline: "Hoy 16:00",
    action:
      "Bloquear liberación parcial hasta cerrar diferencia y aprobar sustitutos.",
    urgency: "Media",
  },
  {
    title: "Blindar rutas norte",
    what: "Transportistas reportan variación de ETA por ventanas de entrega comprimidas.",
    impact: "18 entregas con penalidad potencial y S/ 48K expuestos.",
    owner: "Jefatura Transporte",
    deadline: "Mañana 09:00",
    action: "Activar backup carrier y mover 6 entregas de baja prioridad.",
    urgency: "Media",
  },
] satisfies Array<{
  title: string
  what: string
  impact: string
  owner: string
  deadline: string
  action: string
  urgency: "Alta" | "Media"
}>

const dashboardFlowData = [
  { day: "Lun", ingreso: 1280, salida: 1190, backlog: 82, sla: 95.2 },
  { day: "Mar", ingreso: 1420, salida: 1360, backlog: 74, sla: 96.1 },
  { day: "Mié", ingreso: 1515, salida: 1488, backlog: 61, sla: 96.8 },
  { day: "Jue", ingreso: 1390, salida: 1452, backlog: 54, sla: 97.1 },
  { day: "Vie", ingreso: 1660, salida: 1588, backlog: 69, sla: 96.4 },
  { day: "Sáb", ingreso: 1184, salida: 1098, backlog: 72, sla: 95.9 },
]

const dashboardFlowConfig = {
  ingreso: {
    label: "Ingresos",
    color: "var(--chart-2)",
  },
  salida: {
    label: "Salidas",
    color: "var(--chart-1)",
  },
  backlog: {
    label: "Pendientes",
    color: "var(--chart-4)",
  },
  sla: {
    label: "SLA",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const warehouseCapacityData = [
  { site: "Callao", ocupacion: 92, muelles: 84 },
  { site: "Lurín", ocupacion: 88, muelles: 77 },
  { site: "Ate", ocupacion: 83, muelles: 71 },
  { site: "Arequipa", ocupacion: 79, muelles: 69 },
  { site: "Trujillo", ocupacion: 74, muelles: 62 },
]

const warehouseCapacityConfig = {
  ocupacion: {
    label: "Ocupación",
    color: "var(--chart-1)",
  },
  muelles: {
    label: "Muelles",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const warehouseNetwork = [
  {
    site: "Callao",
    region: "Lima",
    occupancy: 92,
    sla: "97.8%",
    orders: "6,248",
    state: "Normal",
  },
  {
    site: "Lurín",
    region: "Lima Sur",
    occupancy: 88,
    sla: "96.9%",
    orders: "4,906",
    state: "Normal",
  },
  {
    site: "Ate",
    region: "Lima Este",
    occupancy: 83,
    sla: "94.7%",
    orders: "3,184",
    state: "Atención",
  },
  {
    site: "Arequipa",
    region: "Sur",
    occupancy: 79,
    sla: "96.1%",
    orders: "2,102",
    state: "Normal",
  },
]

const dashboardRisks = [
  {
    title: "Congestión en muelles de Ate",
    detail: "Ventana de recepción 14:00-17:00 supera la capacidad asignada.",
    owner: "Operaciones",
    severity: "Alta",
    eta: "Hoy",
  },
  {
    title: "Inventario pendiente de conciliación",
    detail: "SKU de alta rotación con diferencia entre WMS y conteo físico.",
    owner: "Control",
    severity: "Media",
    eta: "Mañana",
  },
  {
    title: "Rutas norte con variación de ETA",
    detail:
      "Transportistas reportan demora por ventanas de entrega comprimidas.",
    owner: "Transporte",
    severity: "Media",
    eta: "48 h",
  },
]

const criticalMovements = [
  {
    order: "BSF-48192",
    client: "Retail Norte",
    site: "Callao",
    status: "En despacho",
    eta: "13:40",
    value: "S/ 184K",
  },
  {
    order: "BSF-48175",
    client: "Agroexport Sur",
    site: "Arequipa",
    status: "Recepción",
    eta: "15:10",
    value: "S/ 126K",
  },
  {
    order: "BSF-48166",
    client: "Farma Andina",
    site: "Lurín",
    status: "Picking",
    eta: "16:25",
    value: "S/ 92K",
  },
  {
    order: "BSF-48141",
    client: "Consumo Masivo",
    site: "Ate",
    status: "Observado",
    eta: "18:00",
    value: "S/ 214K",
  },
]

const forecastWindows = [
  { label: "0-12 h", value: "4,820", detail: "pedidos", load: 72 },
  { label: "12-24 h", value: "6,140", detail: "pedidos", load: 84 },
  { label: "24-36 h", value: "5,390", detail: "pedidos", load: 76 },
  { label: "36-48 h", value: "4,210", detail: "pedidos", load: 61 },
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
  const [selectedFolderId, setSelectedFolderId] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedSourceId, setSelectedSourceId] = React.useState(
    initialKnowledgeSources[0]?.id ?? ""
  )
  const [previewPageIndex, setPreviewPageIndex] = React.useState(0)
  const [previewZoom, setPreviewZoom] = React.useState(100)

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

  React.useEffect(() => {
    setPreviewPageIndex(0)
    setPreviewZoom(100)
  }, [selectedSourceId])

  function handleAddSource() {
    const source: KnowledgeSource = {
      id: makeId("source"),
      name: "Nueva importación de feedback de clientes.pdf",
      folderId: "product",
      type: "PDF",
      owner: "Investigación",
      status: "Indexing",
      updatedAt: "Ahora mismo",
      size: "2.1 MB",
      chunks: 0,
      coverage: 24,
      tags: ["feedback", "importación"],
      summary:
        "Paquete de feedback de clientes recién cargado. Aún está procesándose antes de que el equipo pueda usarlo con confianza.",
      preview: [
        "La carga inicial detectó comentarios de clientes, notas de cuentas y solicitudes de producto etiquetadas.",
        "El archivo aún se está preparando, por lo que los managers deben esperar antes de usarlo para decisiones.",
        "Recomendación: actualizar después del procesamiento y aprobar cuando el responsable confirme el resumen.",
      ],
      pages: [
        {
          title: "Nueva importación de feedback de clientes",
          eyebrow: "Vista previa de carga - página 1",
          sections: [
            {
              heading: "Contenido detectado",
              body: "La carga inicial detectó comentarios de clientes, notas de cuentas y solicitudes de producto etiquetadas.",
            },
            {
              heading: "Estado actual",
              body: "El archivo aún se está preparando, por lo que los managers deben esperar antes de usarlo para decisiones.",
            },
            {
              heading: "Siguiente paso",
              body: "Actualizar después del procesamiento y aprobar cuando el responsable confirme el resumen y su uso previsto.",
            },
          ],
          callout:
            "Esta es una carga de prueba. La vista renderizada estará disponible de inmediato en esta demo local.",
        },
      ],
      recommendedUse:
        "Úsalo después de la revisión para planificación de feedback de clientes y detección de oportunidades.",
    }

    setSources((current) => [source, ...current])
    setSelectedFolderId("all")
    setStatusFilter("all")
    setSelectedSourceId(source.id)
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
        <Button onClick={handleAddSource} size="sm">
          <UploadIcon data-icon="inline-start" />
          Subir recurso
        </Button>
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
                <Badge className="h-5 text-[10px]" variant="outline">
                  Compartido
                </Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                {knowledgeFolders.map((folder) => {
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
                          {getFolderName(source.folderId)}
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
                      {getFolderName(selectedSource.folderId)}
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

function getFolderName(folderId: string) {
  return (
    knowledgeFolders.find((folder) => folder.id === folderId)?.name ??
    "Sin asignar"
  )
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
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  <Building2Icon data-icon="inline-start" />
                  Operación nacional
                </Badge>
                <Badge variant="outline">
                  <CalendarClockIcon data-icon="inline-start" />
                  Actualizado hace 4 min
                </Badge>
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl leading-tight font-medium tracking-[0] sm:text-3xl">
                  Panel operativo
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Vista ejecutiva de ocupación, despacho, capacidad y riesgo en
                  la red de almacenes.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="today">
                <SelectTrigger className="h-8 w-[160px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="week">Últimos 7 días</SelectItem>
                    <SelectItem value="month">Mes actual</SelectItem>
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
            label="Flujo y red"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("flow-network")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.95fr)]">
              <Card className="overflow-hidden py-0">
                <Tabs className="gap-0" defaultValue="volumen">
                  <CardHeader className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <RouteIcon />
                        Flujo operativo semanal
                      </CardTitle>
                      <CardDescription>
                        Ingresos, salidas y presión de backlog por día.
                      </CardDescription>
                    </div>
                    <TabsList>
                      <TabsTrigger value="volumen">Volumen</TabsTrigger>
                      <TabsTrigger value="sla">SLA</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent className="p-4">
                    <TabsContent className="mt-0" value="volumen">
                      <ChartContainer
                        className="aspect-auto h-[285px] w-full"
                        config={dashboardFlowConfig}
                      >
                        <AreaChart
                          accessibilityLayer
                          data={dashboardFlowData}
                          margin={{ left: 0, right: 12, top: 10 }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            axisLine={false}
                            dataKey="day"
                            tickLine={false}
                            tickMargin={8}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            width={38}
                          />
                          <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                          />
                          <Area
                            dataKey="ingreso"
                            fill="var(--color-ingreso)"
                            fillOpacity={0.16}
                            stroke="var(--color-ingreso)"
                            strokeWidth={2}
                            type="natural"
                          />
                          <Area
                            dataKey="salida"
                            fill="var(--color-salida)"
                            fillOpacity={0.1}
                            stroke="var(--color-salida)"
                            strokeWidth={2}
                            type="natural"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </TabsContent>
                    <TabsContent className="mt-0" value="sla">
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                        <ChartContainer
                          className="aspect-auto h-[285px] w-full"
                          config={dashboardFlowConfig}
                        >
                          <AreaChart
                            accessibilityLayer
                            data={dashboardFlowData}
                            margin={{ left: 0, right: 12, top: 10 }}
                          >
                            <CartesianGrid vertical={false} />
                            <XAxis
                              axisLine={false}
                              dataKey="day"
                              tickLine={false}
                              tickMargin={8}
                            />
                            <YAxis
                              axisLine={false}
                              domain={[90, 100]}
                              tickLine={false}
                              tickMargin={8}
                              width={34}
                            />
                            <ChartTooltip
                              content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                              dataKey="sla"
                              fill="var(--color-sla)"
                              fillOpacity={0.18}
                              stroke="var(--color-sla)"
                              strokeWidth={2}
                              type="natural"
                            />
                          </AreaChart>
                        </ChartContainer>
                        <div className="flex flex-col justify-center gap-3 rounded-lg border bg-muted/20 p-4">
                          <div>
                            <p className="text-sm font-medium">Objetivo SLA</p>
                            <p className="text-xs text-muted-foreground">
                              Meta mensual contratada
                            </p>
                          </div>
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-medium">96.4%</span>
                            <Badge variant="secondary">+1.8%</Badge>
                          </div>
                          <Progress value={96} />
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            El SLA se sostiene por encima de la meta, pero Ate
                            concentra las excepciones del día.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>

              <Card className="overflow-hidden py-0">
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheckIcon />
                    Salud de red
                  </CardTitle>
                  <CardDescription>
                    Sedes activas, ocupación y pedidos del día.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-4">
                  {warehouseNetwork.map((site) => (
                    <DashboardNetworkRow
                      key={site.site}
                      onAskAI={onAskAI}
                      site={site}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="capacity-risks"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Capacidad y riesgos"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("capacity-risks")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.05fr)]">
              <Card className="overflow-hidden py-0">
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <GaugeIcon />
                    Capacidad por sede
                  </CardTitle>
                  <CardDescription>
                    Ocupación de almacén y utilización de muelles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    className="aspect-auto h-[300px] w-full"
                    config={warehouseCapacityConfig}
                  >
                    <BarChart
                      accessibilityLayer
                      data={warehouseCapacityData}
                      layout="vertical"
                      margin={{ left: 10, right: 14, top: 8 }}
                    >
                      <CartesianGrid horizontal={false} />
                      <XAxis
                        axisLine={false}
                        domain={[0, 100]}
                        hide
                        tickLine={false}
                        type="number"
                      />
                      <YAxis
                        axisLine={false}
                        dataKey="site"
                        tickLine={false}
                        tickMargin={8}
                        type="category"
                        width={72}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Bar
                        dataKey="ocupacion"
                        fill="var(--color-ocupacion)"
                        radius={5}
                      />
                      <Bar
                        dataKey="muelles"
                        fill="var(--color-muelles)"
                        radius={5}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="overflow-hidden py-0">
                <CardHeader className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangleIcon />
                      Riesgos priorizados
                    </CardTitle>
                    <CardDescription>
                      Bloqueos operativos con dueño y ventana de decisión.
                    </CardDescription>
                  </div>
                  <Badge variant="destructive">3 activos</Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 p-4">
                  {dashboardRisks.map((risk) => (
                    <DashboardRiskItem
                      key={risk.title}
                      onAskAI={onAskAI}
                      risk={risk}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </DashboardReorderBlock>

          <DashboardReorderBlock
            blockId="movements-forecast"
            draggingBlockId={draggingBlockId}
            editMode={layoutEditMode}
            label="Movimientos y forecast"
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            order={getBlockOrder("movements-forecast")}
            overBlockId={overBlockId}
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
              <Card className="overflow-hidden py-0">
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TruckIcon />
                    Movimientos críticos
                  </CardTitle>
                  <CardDescription>
                    Órdenes que impactan facturación, SLA o promesa comercial.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Orden</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Sede</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {criticalMovements.map((movement) => {
                        const aiContext = `Movimiento crítico ${movement.order}: cliente ${movement.client}, sede ${movement.site}, estado ${movement.status}, ETA ${movement.eta}, valor ${movement.value}.`

                        return (
                          <TableRow className="group/data" key={movement.order}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <span>{movement.order}</span>
                                <DashboardAskAIButton
                                  context={aiContext}
                                  onAskAI={onAskAI}
                                />
                              </div>
                            </TableCell>
                            <TableCell>{movement.client}</TableCell>
                            <TableCell>{movement.site}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  movement.status === "Observado"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {movement.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{movement.eta}</TableCell>
                            <TableCell className="text-right font-medium">
                              {movement.value}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="overflow-hidden py-0">
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ClockIcon />
                    Pronóstico 48 h
                  </CardTitle>
                  <CardDescription>
                    Carga esperada por ventana operativa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 p-4">
                  {forecastWindows.map((window) => (
                    <DashboardForecastItem key={window.label} window={window} />
                  ))}
                </CardContent>
              </Card>
            </div>
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

  return (
    <Card className="group/data overflow-hidden transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
            <metric.icon />
          </span>
          <div className="flex items-center gap-1.5">
            <Badge
              variant={metric.direction === "up" ? "secondary" : "outline"}
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

function DashboardNetworkRow({
  onAskAI,
  site,
}: {
  onAskAI: (context: string) => void
  site: (typeof warehouseNetwork)[number]
}) {
  const aiContext = `Sede ${site.site}, región ${site.region}: ocupación ${site.occupancy}%, SLA ${site.sla}, ${site.orders} pedidos, estado ${site.state}.`

  return (
    <div className="group/data flex flex-col gap-2 rounded-lg border bg-background p-3 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-muted/20 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{site.site}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPinIcon />
            {site.region}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant={site.state === "Normal" ? "secondary" : "outline"}>
            {site.state}
          </Badge>
          <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
        </div>
      </div>
      <Progress value={site.occupancy} />
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Ocupación</p>
          <p className="font-medium">{site.occupancy}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">SLA</p>
          <p className="font-medium">{site.sla}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Pedidos</p>
          <p className="font-medium">{site.orders}</p>
        </div>
      </div>
    </div>
  )
}

function DashboardRiskItem({
  onAskAI,
  risk,
}: {
  onAskAI: (context: string) => void
  risk: (typeof dashboardRisks)[number]
}) {
  const aiContext = `Riesgo: ${risk.title}. ${risk.detail} Responsable: ${risk.owner}. Severidad ${risk.severity}. Deadline ${risk.eta}.`

  return (
    <div className="group/data grid gap-3 rounded-lg border bg-background p-3 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-muted/20 hover:shadow-sm sm:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">{risk.title}</p>
          <Badge variant={risk.severity === "Alta" ? "destructive" : "outline"}>
            {risk.severity}
          </Badge>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {risk.detail}
        </p>
      </div>
      <div className="flex min-w-28 items-start justify-between gap-2 text-xs text-muted-foreground sm:justify-end sm:text-right">
        <div className="flex flex-col gap-1">
          <span>{risk.owner}</span>
          <span className="font-medium text-foreground">{risk.eta}</span>
        </div>
        <DashboardAskAIButton context={aiContext} onAskAI={onAskAI} />
      </div>
    </div>
  )
}

function DashboardForecastItem({
  window,
}: {
  window: (typeof forecastWindows)[number]
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-background p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">{window.label}</p>
          <p className="text-xs text-muted-foreground">{window.detail}</p>
        </div>
        <p className="text-lg font-medium">{window.value}</p>
      </div>
      <Progress value={window.load} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Carga proyectada</span>
        <span>{window.load}%</span>
      </div>
    </div>
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
