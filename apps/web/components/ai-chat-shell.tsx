"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  ArrowUpIcon,
  BellIcon,
  BrainCircuitIcon,
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
  Globe2Icon,
  EyeIcon,
  LibraryIcon,
  MoreHorizontalIcon,
  MicIcon,
  MoonIcon,
  PaintbrushIcon,
  PaletteIcon,
  PanelLeftIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SmileIcon,
  SunIcon,
  UploadIcon,
  ZoomInIcon,
  ZoomOutIcon,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
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
import { ScrollArea } from "@workspace/ui/components/scroll-area"
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

type ChatGroup = "Recents" | "Yesterday"
type MessageRole = "user" | "assistant"
type WorkspaceView = "chat" | "knowledge"
type KnowledgeStatus = "Ready" | "Indexing" | "Review"

type ChatMessage = {
  id: string
  role: MessageRole
  content: string
  at: string
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

const defaultModel = "Claude 3.5 sonnet"
const models = [defaultModel, "GPT-4.1", "Gemini 1.5 Pro"]

const initialChats: Chat[] = [
  {
    id: "onboarding-flow-review",
    title: "Onboarding flow review",
    group: "Recents",
    category: "Research",
    updatedAt: "10:42 AM",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "onboarding-flow-review-1",
        role: "user",
        content: "Review the onboarding flow and call out friction points.",
        at: "10:36 AM",
      },
      {
        id: "onboarding-flow-review-2",
        role: "assistant",
        content:
          "The main friction is decision density in the first screen. Move secondary setup steps behind progressive disclosure and keep the first action focused on one successful activation moment.",
        at: "10:37 AM",
      },
    ],
  },
  {
    id: "activation-metrics-breakdown",
    title: "Activation metrics breakdown",
    group: "Recents",
    category: "Analytics",
    updatedAt: "9:18 AM",
    model: "GPT-4.1",
    messages: [
      {
        id: "activation-metrics-breakdown-1",
        role: "user",
        content: "Break down activation metrics for a product dashboard.",
        at: "9:13 AM",
      },
      {
        id: "activation-metrics-breakdown-2",
        role: "assistant",
        content:
          "Track activation as a funnel: account created, first key action completed, integration connected, and successful return visit within seven days.",
        at: "9:14 AM",
      },
    ],
  },
  {
    id: "user-pain-points-summary",
    title: "User pain points summary",
    group: "Recents",
    category: "Summary",
    updatedAt: "8:04 AM",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "user-pain-points-summary-1",
        role: "user",
        content: "Summarize the top user pain points from interview notes.",
        at: "8:01 AM",
      },
      {
        id: "user-pain-points-summary-2",
        role: "assistant",
        content:
          "The strongest patterns are unclear setup expectations, low confidence in imported data, and too many settings before users see their first useful result.",
        at: "8:02 AM",
      },
    ],
  },
  {
    id: "product-roadmap-audit",
    title: "Product roadmap audit",
    group: "Yesterday",
    category: "Planning",
    updatedAt: "Yesterday",
    model: "Gemini 1.5 Pro",
    messages: [
      {
        id: "product-roadmap-audit-1",
        role: "user",
        content: "Audit this roadmap and identify sequencing risks.",
        at: "Yesterday",
      },
      {
        id: "product-roadmap-audit-2",
        role: "assistant",
        content:
          "The roadmap is strongest where foundational data work precedes automation. The risky items are customer-facing AI features scheduled before quality instrumentation is finished.",
        at: "Yesterday",
      },
    ],
  },
  {
    id: "bug-reports-triage",
    title: "Bug reports triage",
    group: "Yesterday",
    category: "Code",
    updatedAt: "Yesterday",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "bug-reports-triage-1",
        role: "user",
        content: "Triage these bug reports into priority buckets.",
        at: "Yesterday",
      },
      {
        id: "bug-reports-triage-2",
        role: "assistant",
        content:
          "Prioritize login blockers and payment state mismatches first, then visual regressions, then copy and empty-state issues.",
        at: "Yesterday",
      },
    ],
  },
  {
    id: "competitive-analysis",
    title: "Competitive analysis",
    group: "Yesterday",
    category: "Research",
    updatedAt: "Yesterday",
    model: "GPT-4.1",
    messages: [
      {
        id: "competitive-analysis-1",
        role: "user",
        content: "Compare the onboarding and pricing pages from competitors.",
        at: "Yesterday",
      },
      {
        id: "competitive-analysis-2",
        role: "assistant",
        content:
          "Competitors win on concise setup promises and clearer upgrade triggers. The opportunity is to show time-to-value earlier, before plan comparison.",
        at: "Yesterday",
      },
    ],
  },
  {
    id: "feature-prioritization",
    title: "Feature prioritization",
    group: "Yesterday",
    category: "Strategy",
    updatedAt: "Yesterday",
    model: "Claude 3.5 sonnet",
    messages: [
      {
        id: "feature-prioritization-1",
        role: "user",
        content: "Prioritize this feature list for the next sprint.",
        at: "Yesterday",
      },
      {
        id: "feature-prioritization-2",
        role: "assistant",
        content:
          "Rank by user impact and implementation confidence: fix activation blockers, improve import review, then add advanced filters after the core journey is stable.",
        at: "Yesterday",
      },
    ],
  },
]

const promptActions: PromptAction[] = [
  {
    label: "Summary",
    icon: BrainCircuitIcon,
    prompt:
      "Summarize this chat into decisions, open questions, and next steps.",
  },
  {
    label: "Code",
    icon: Code2Icon,
    prompt: "Write a clean React component for this idea with typed props.",
  },
  {
    label: "Design",
    icon: PaletteIcon,
    prompt: "Create three UI directions and recommend the strongest one.",
  },
  {
    label: "Research",
    icon: Globe2Icon,
    prompt: "Research this topic and organize the answer by confidence level.",
  },
]

const sidebarTools: PromptAction[] = [
  {
    label: "Research & Analysis",
    icon: FlaskConicalIcon,
    prompt:
      "Analyze this topic with a research lens: summarize evidence, risks, opportunities, and recommended next steps.",
  },
  {
    label: "Web Search",
    icon: Globe2Icon,
    prompt:
      "Prepare a web search brief: query plan, expected sources, and a concise synthesis format.",
  },
]

const groupOrder: ChatGroup[] = ["Recents", "Yesterday"]

const knowledgeFolders: KnowledgeFolder[] = [
  {
    id: "all",
    name: "All resources",
    description: "Everything uploaded by your teams.",
  },
  {
    id: "product",
    name: "Product",
    description: "Research, roadmaps, customer feedback.",
  },
  {
    id: "support",
    name: "Support",
    description: "Tickets, bug reports, escalations.",
  },
  {
    id: "market",
    name: "Market",
    description: "Competitors, pricing, positioning.",
  },
]

const initialKnowledgeSources: KnowledgeSource[] = [
  {
    id: "src-onboarding",
    name: "Onboarding interview synthesis.pdf",
    folderId: "product",
    type: "PDF",
    owner: "Research",
    status: "Ready",
    updatedAt: "Today",
    size: "4.8 MB",
    chunks: 248,
    coverage: 96,
    tags: ["activation", "friction"],
    summary:
      "Executive synthesis of onboarding interviews with the clearest friction points and recommended activation fixes.",
    preview: [
      "Users understand the product promise, but hesitate when setup asks for too many decisions before the first result.",
      "The most repeated blocker is uncertainty around imported data quality and what happens after connecting a source.",
      "Recommendation: move advanced setup behind a secondary step and show a first useful dashboard state sooner.",
    ],
    pages: [
      {
        title: "Onboarding Interview Synthesis",
        eyebrow: "Executive summary - page 1",
        sections: [
          {
            heading: "Main observation",
            body: "Users understand the product promise, but hesitate when setup asks for too many decisions before the first useful result appears.",
          },
          {
            heading: "Repeated blocker",
            body: "The most repeated blocker is uncertainty around imported data quality and what happens after connecting a source.",
          },
          {
            heading: "Manager takeaway",
            body: "Activation improves when the first screen confirms ownership, data status, and the next visible outcome in plain language.",
          },
        ],
        callout:
          "Recommendation: move advanced setup behind a secondary step and show a first useful dashboard state sooner.",
      },
      {
        title: "Recommended Activation Fixes",
        eyebrow: "Action notes - page 2",
        sections: [
          {
            heading: "Simplify setup",
            body: "Keep the initial path focused on one connected source, one clear completion state, and one primary action for the user.",
          },
          {
            heading: "Build confidence",
            body: "Show which data was imported, where it came from, and who can approve the first view before the broader team sees it.",
          },
          {
            heading: "Leadership decision",
            body: "Approve a staged rollout that starts with fewer configuration choices and adds advanced controls after activation.",
          },
        ],
      },
    ],
    recommendedUse:
      "Use for onboarding reviews, activation planning, and customer journey discussions.",
  },
  {
    id: "src-roadmap",
    name: "Q2 roadmap audit.docx",
    folderId: "product",
    type: "Doc",
    owner: "Product",
    status: "Ready",
    updatedAt: "Yesterday",
    size: "1.2 MB",
    chunks: 86,
    coverage: 91,
    tags: ["roadmap", "risk"],
    summary:
      "Roadmap review for leadership planning, with sequencing risks and dependency notes.",
    preview: [
      "The roadmap is strongest where data quality work comes before customer-facing automation.",
      "Two initiatives should be delayed until instrumentation is complete: AI recommendations and workflow templates.",
      "Recommendation: approve the foundation work first, then revisit customer-facing launch timing.",
    ],
    pages: [
      {
        title: "Q2 Roadmap Audit",
        eyebrow: "Leadership review - page 1",
        sections: [
          {
            heading: "Sequence strength",
            body: "The roadmap is strongest where data quality work comes before customer-facing automation and reporting improvements.",
          },
          {
            heading: "Launch risk",
            body: "AI recommendations and workflow templates depend on instrumentation that is still not reliable enough for customer rollout.",
          },
          {
            heading: "Operational note",
            body: "Managers should verify owner accountability before approving work that crosses support, product, and data teams.",
          },
        ],
        callout:
          "Recommendation: approve the foundation work first, then revisit customer-facing launch timing.",
      },
      {
        title: "Dependency Review",
        eyebrow: "Planning appendix - page 2",
        sections: [
          {
            heading: "Required before launch",
            body: "Event quality checks, import confidence scoring, and escalation routing should be complete before the next feature milestone.",
          },
          {
            heading: "Decision checkpoint",
            body: "A mid-quarter review should compare instrumentation readiness against launch commitments and update the roadmap if needed.",
          },
        ],
      },
    ],
    recommendedUse:
      "Use for roadmap meetings, quarterly planning, and dependency checks.",
  },
  {
    id: "src-support",
    name: "Bug reports triage export.csv",
    folderId: "support",
    type: "CSV",
    owner: "Support",
    status: "Indexing",
    updatedAt: "2h ago",
    size: "980 KB",
    chunks: 134,
    coverage: 64,
    tags: ["bugs", "priority"],
    summary:
      "Support export grouped by priority so managers can separate blockers from cleanup work.",
    preview: [
      "Critical issues are concentrated in login recovery, payment status mismatch, and import failures.",
      "Medium-priority reports are mostly visual regressions and unclear empty-state messages.",
      "Recommendation: review the critical bucket before approving the next release window.",
    ],
    pages: [
      {
        title: "Bug Reports Triage Export",
        eyebrow: "Support export - sheet 1",
        sections: [
          {
            heading: "Priority summary",
            body: "Critical issues are concentrated in login recovery, payment status mismatch, and import failures.",
          },
        ],
        table: {
          headers: ["Priority", "Issue", "Owner", "Count"],
          rows: [
            ["Critical", "Login recovery fails after reset", "Support", "18"],
            ["Critical", "Payment status mismatch", "Billing", "12"],
            ["High", "Import stalls on large CSV", "Data Ops", "9"],
            ["Medium", "Empty-state copy unclear", "Product", "21"],
            ["Low", "Visual regression in settings", "Design", "14"],
          ],
        },
        callout:
          "Recommendation: review the critical bucket before approving the next release window.",
      },
    ],
    recommendedUse:
      "Use for support syncs, release readiness, and escalation review.",
  },
  {
    id: "src-pain",
    name: "User pain points summary.docx",
    folderId: "product",
    type: "Doc",
    owner: "Research",
    status: "Review",
    updatedAt: "Mon",
    size: "740 KB",
    chunks: 52,
    coverage: 72,
    tags: ["ux", "feedback"],
    summary:
      "Concise summary of customer pain points from interviews and feedback notes.",
    preview: [
      "The top pain points are unclear setup expectations, low confidence in imported data, and crowded settings.",
      "Managers asked for clearer ownership, fewer manual checks, and faster visibility into useful outcomes.",
      "Recommendation: validate the summary with the research owner before using it in planning.",
    ],
    pages: [
      {
        title: "User Pain Points Summary",
        eyebrow: "Research notes - page 1",
        sections: [
          {
            heading: "Top themes",
            body: "The top pain points are unclear setup expectations, low confidence in imported data, and crowded settings.",
          },
          {
            heading: "Manager feedback",
            body: "Managers asked for clearer ownership, fewer manual checks, and faster visibility into useful outcomes.",
          },
          {
            heading: "Review note",
            body: "The research owner should confirm whether these themes are representative before leadership planning uses them.",
          },
        ],
        callout:
          "Recommendation: validate the summary with the research owner before using it in planning.",
      },
      {
        title: "Opportunity Areas",
        eyebrow: "Research notes - page 2",
        sections: [
          {
            heading: "Reduce manual checking",
            body: "Teams need a clearer way to see what changed, who approved the resource, and what needs follow-up.",
          },
          {
            heading: "Improve first review",
            body: "A short manager-friendly summary should appear before detailed settings so decisions can happen quickly.",
          },
        ],
      },
    ],
    recommendedUse:
      "Use for UX prioritization, team alignment, and opportunity sizing.",
  },
  {
    id: "src-competitors",
    name: "Competitive analysis snapshot.url",
    folderId: "market",
    type: "URL",
    owner: "Growth",
    status: "Ready",
    updatedAt: "Fri",
    size: "18 pages",
    chunks: 119,
    coverage: 88,
    tags: ["pricing", "positioning"],
    summary:
      "Market snapshot comparing competitor onboarding, pricing language, and conversion triggers.",
    preview: [
      "Competitors communicate time-to-value earlier and keep plan comparison more focused.",
      "Upgrade prompts are strongest when connected to a completed workflow, not a generic feature list.",
      "Recommendation: use these notes to refine packaging language and trial conversion moments.",
    ],
    pages: [
      {
        title: "Competitive Analysis Snapshot",
        eyebrow: "Website capture - page 1",
        url: "https://competitor.example/pricing",
        sections: [
          {
            heading: "Positioning pattern",
            body: "Competitors communicate time-to-value earlier and keep plan comparison more focused.",
          },
          {
            heading: "Conversion trigger",
            body: "Upgrade prompts are strongest when connected to a completed workflow, not a generic feature list.",
          },
          {
            heading: "Packaging note",
            body: "The clearest pages use fewer plan dimensions and anchor value around operational confidence.",
          },
        ],
        callout:
          "Recommendation: use these notes to refine packaging language and trial conversion moments.",
      },
    ],
    recommendedUse:
      "Use for GTM reviews, positioning work, and pricing discussions.",
  },
]

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function makeTime() {
  return new Intl.DateTimeFormat("en", {
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

function makeMockReply(
  content: string,
  model: string,
  mode: string,
  attachments: number
) {
  const attachmentText =
    attachments > 0
      ? ` I also accounted for ${attachments} mock attachment${attachments === 1 ? "" : "s"}.`
      : ""

  if (mode === "Code") {
    return `Using ${model}, I would turn this into a small, typed implementation: define the data model first, keep the UI state local, and make every control update the mock dataset immediately.${attachmentText}`
  }

  if (mode === "Design") {
    return `Using ${model}, the strongest direction is a compact workspace: tighter history rows, clear active state, and a responsive composer that keeps the primary action reachable on mobile.${attachmentText}`
  }

  if (mode === "Research") {
    return `Using ${model}, I would separate confirmed facts, likely assumptions, and follow-up checks. For this mock, the key answer is: ${content}.${attachmentText}`
  }

  if (mode === "Summary") {
    return `Summary from ${model}: the request is to keep the interaction functional, reduce sidebar visual weight, and preserve the AI chat layout across desktop and mobile.${attachmentText}`
  }

  return `Using ${model}, here is a practical response: start with the main intent, keep the answer concise, and turn the next action into something the interface can do immediately.${attachmentText}`
}

export function AiChatShell() {
  const { resolvedTheme, setTheme } = useTheme()
  const [chats, setChats] = React.useState<Chat[]>(initialChats)
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  )
  const [draft, setDraft] = React.useState("")
  const [model, setModel] = React.useState(defaultModel)
  const [mode, setMode] = React.useState("General")
  const [activeView, setActiveView] = React.useState<WorkspaceView>("chat")
  const [chatQuery, setChatQuery] = React.useState("")
  const [desktopSidebarOpen, setDesktopSidebarOpen] = React.useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)
  const [isPro, setIsPro] = React.useState(false)
  const [attachments, setAttachments] = React.useState(0)
  const [notificationCount, setNotificationCount] = React.useState(1)
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
    setModel(chat?.model ?? defaultModel)
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

  function handleOpenKnowledgeBase() {
    setActiveView("knowledge")
    setMobileSidebarOpen(false)
  }

  function handleAttach() {
    setAttachments((value) => value + 1)
    requestAnimationFrame(() => draftRef.current?.focus())
  }

  function handleSend() {
    const content = draft.trim()

    if (!content) {
      draftRef.current?.focus()
      return
    }

    const timestamp = makeTime()
    const reply = makeMockReply(content, model, mode, attachments)
    const messages: ChatMessage[] = [
      {
        id: makeId("user"),
        role: "user",
        content,
        at: timestamp,
      },
      {
        id: makeId("assistant"),
        role: "assistant",
        content: reply,
        at: timestamp,
      },
    ]

    if (selectedChatId) {
      setChats((current) =>
        current.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                group: "Recents",
                model,
                updatedAt: timestamp,
                messages: [...chat.messages, ...messages],
              }
            : chat
        )
      )
    } else {
      const id = makeId("chat")
      setSelectedChatId(id)
      setChats((current) => [
        {
          id,
          title: makeTitle(content),
          group: "Recents",
          category: mode,
          updatedAt: timestamp,
          model,
          messages,
        },
        ...current,
      ])
    }

    setDraft("")
    setAttachments(0)
  }

  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <TopBar
        chatQuery={chatQuery}
        isPro={isPro}
        notificationCount={notificationCount}
        onClearNotifications={() => setNotificationCount(0)}
        onSearchChange={setChatQuery}
        onTogglePro={() => setIsPro((value) => !value)}
        onToggleSidebar={handleToggleSidebar}
        onToggleTheme={() =>
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
        searchRef={searchRef}
        theme={resolvedTheme}
      />

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
                onPrompt={handlePrompt}
                onSearchChange={setChatQuery}
                onSelectChat={handleSelectChat}
                selectedChatId={selectedChatId}
              />
            ) : null}
            <ChatWorkspace
              attachments={attachments}
              activeView={activeView}
              chat={selectedChat}
              draft={draft}
              isPro={isPro}
              mode={mode}
              model={model}
              onAttach={handleAttach}
              onDraftChange={setDraft}
              onModelChange={setModel}
              onNewChat={handleNewChat}
              onPrompt={handlePrompt}
              onSend={handleSend}
              onTogglePro={() => setIsPro((value) => !value)}
              onToggleVoice={() => setVoiceEnabled((value) => !value)}
              promptActions={promptActions}
              textareaRef={draftRef}
              voiceEnabled={voiceEnabled}
            />
          </CardContent>
        </Card>
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent
          className="w-[min(82vw,280px)] gap-0 p-0 sm:max-w-[280px]"
          side="left"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Chat history</SheetTitle>
            <SheetDescription>Search and select mock chats.</SheetDescription>
          </SheetHeader>
          <HistoryPanel
            activeView={activeView}
            chatQuery={chatQuery}
            chats={filteredChats}
            mobile
            onNewChat={handleNewChat}
            onOpenKnowledgeBase={handleOpenKnowledgeBase}
            onPrompt={handlePrompt}
            onSearchChange={setChatQuery}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
        </SheetContent>
      </Sheet>
    </main>
  )
}

function TopBar({
  chatQuery,
  isPro,
  notificationCount,
  onClearNotifications,
  onSearchChange,
  onTogglePro,
  onToggleSidebar,
  onToggleTheme,
  searchRef,
  theme,
}: {
  chatQuery: string
  isPro: boolean
  notificationCount: number
  onClearNotifications: () => void
  onSearchChange: (value: string) => void
  onTogglePro: () => void
  onToggleSidebar: () => void
  onToggleTheme: () => void
  searchRef: React.RefObject<HTMLInputElement | null>
  theme?: string
}) {
  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon

  return (
    <header className="flex h-[3.25rem] items-center border-b bg-background px-3 sm:h-14 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              size="icon-sm"
              variant="ghost"
            >
              <PanelLeftIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>
        <Separator className="hidden h-6 sm:block" orientation="vertical" />
        <InputGroup className="h-9 w-[min(370px,48vw)] rounded-md bg-background shadow-sm max-[520px]:hidden">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            ref={searchRef}
            value={chatQuery}
          />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘ k</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
        <Button
          className="ai-pro-link hidden sm:inline-flex"
          onClick={onTogglePro}
          size="sm"
          variant="ghost"
        >
          {isPro ? "Pro Active" : "Get Pro"}
        </Button>
        <TopIcon
          badgeCount={notificationCount}
          icon={BellIcon}
          label="Notifications"
          onClick={onClearNotifications}
        />
        <TopIcon icon={ThemeIcon} label="Theme" onClick={onToggleTheme} />
        <TopIcon icon={PaintbrushIcon} label="Style" />
        <TopIcon icon={SmileIcon} label="Reactions" />
        <Separator
          className="mx-1 hidden h-6 sm:block"
          orientation="vertical"
        />
        <Avatar className="size-8 sm:size-9" size="lg">
          <AvatarFallback className="bg-[radial-gradient(circle_at_35%_28%,#f2b0a2_0_22%,#27355f_23%_100%)] text-[0px]">
            TB
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
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
  onPrompt,
  onSearchChange,
  onSelectChat,
  selectedChatId,
}: {
  activeView: WorkspaceView
  chatQuery: string
  chats: Chat[]
  mobile?: boolean
  onNewChat: () => void
  onOpenKnowledgeBase: () => void
  onPrompt: (action: PromptAction) => void
  onSearchChange: (value: string) => void
  onSelectChat: (chatId: string) => void
  selectedChatId: string | null
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
          : "hidden border-r lg:flex lg:animate-in lg:fade-in-0 lg:slide-in-from-left-2 lg:duration-300"
      )}
    >
      <div className="flex flex-col gap-4 px-5 pt-5 pb-5">
        <InputGroup className="h-12 rounded-xl bg-background shadow-sm">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            value={chatQuery}
          />
        </InputGroup>
        <Button
          className="h-12 justify-start rounded-xl px-4 text-base font-medium shadow-sm"
          onClick={onNewChat}
          size="lg"
        >
          <PlusIcon data-icon="inline-start" />
          New chat
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-7 px-4 pb-5">
          <section className="flex flex-col gap-2">
            <SidebarSectionTitle>Tools</SidebarSectionTitle>
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
                  label: "Knowledge Base",
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
              No mock chats match this search.
            </div>
          ) : null}
        </div>
      </ScrollArea>
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
      name: "New customer feedback import.pdf",
      folderId: "product",
      type: "PDF",
      owner: "Research",
      status: "Indexing",
      updatedAt: "Just now",
      size: "2.1 MB",
      chunks: 0,
      coverage: 24,
      tags: ["feedback", "import"],
      summary:
        "Newly uploaded customer feedback package. It is still processing before the team can rely on it.",
      preview: [
        "Initial upload detected customer comments, account notes, and tagged product requests.",
        "The file is still being prepared, so managers should wait before using it for decisions.",
        "Recommendation: refresh after processing, then approve once the owner confirms the summary.",
      ],
      pages: [
        {
          title: "New Customer Feedback Import",
          eyebrow: "Upload preview - page 1",
          sections: [
            {
              heading: "Detected content",
              body: "Initial upload detected customer comments, account notes, and tagged product requests.",
            },
            {
              heading: "Current state",
              body: "The file is still being prepared, so managers should wait before using it for decisions.",
            },
            {
              heading: "Next step",
              body: "Refresh after processing, then approve once the owner confirms the summary and intended use.",
            },
          ],
          callout:
            "This is a mock upload. The render will become available immediately in this local demo.",
        },
      ],
      recommendedUse:
        "Use after review for customer feedback planning and opportunity discovery.",
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
              updatedAt: "Just now",
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
              updatedAt: "Just now",
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
            Knowledge Base
          </h1>
          <p className="text-xs text-muted-foreground">
            Team resources uploaded for managers and assistant context
          </p>
        </div>
        <Button onClick={handleAddSource} size="sm">
          <UploadIcon data-icon="inline-start" />
          Upload resource
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-5 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <KnowledgeMetric
              label="Available resources"
              value={`${readyCount}/${sources.length}`}
              detail="Ready for your team to use"
            />
            <KnowledgeMetric
              label="Needs review"
              value={`${reviewCount}`}
              detail="Waiting for manager approval"
            />
            <KnowledgeMetric
              label="Processing"
              value={`${processingCount}`}
              detail={`Latest upload: ${latestSource}`}
            />
          </div>

          <div className="grid min-h-[560px] gap-4 xl:grid-cols-[240px_minmax(0,1fr)_390px] 2xl:grid-cols-[260px_minmax(0,1fr)_430px]">
            <div className="flex min-h-0 flex-col gap-3 rounded-xl border bg-muted/20 p-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-medium">Areas</h2>
                <Badge className="h-5 text-[10px]" variant="outline">
                  Shared
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
                    placeholder="Search resources, areas, owners..."
                    value={query}
                  />
                </InputGroup>
                <Tabs
                  className="lg:ml-auto"
                  onValueChange={setStatusFilter}
                  value={statusFilter}
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Ready">Available</TabsTrigger>
                    <TabsTrigger value="Indexing">Processing</TabsTrigger>
                    <TabsTrigger value="Review">Review</TabsTrigger>
                  </TabsList>
                  <TabsContent className="sr-only" value={statusFilter} />
                </Tabs>
              </div>

              <div className="min-h-0 overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Area
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Updated
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Owner
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
                                aria-label={`Actions for ${source.name}`}
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
                                  Refresh resource
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleMarkReady(source.id)}
                                >
                                  Approve for use
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
                          No resources match this filter.
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
                  <h2 className="text-sm font-medium">Preview</h2>
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
                    <KnowledgeDetail label="Area">
                      {getFolderName(selectedSource.folderId)}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="File">
                      {selectedSource.type} - {selectedSource.size}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Last updated">
                      {selectedSource.updatedAt}
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Recommended use">
                      <span className="text-muted-foreground">
                        {selectedSource.recommendedUse}
                      </span>
                    </KnowledgeDetail>
                    <KnowledgeDetail label="Tags">
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
                      Refresh
                    </Button>
                    <Button onClick={() => handleMarkReady(selectedSource.id)}>
                      <CircleCheckIcon data-icon="inline-start" />
                      Approve
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a resource to inspect details.
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
              Rendered preview
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
              aria-label="Previous page"
              disabled={isFirstPage}
              onClick={onPreviousPage}
              size="icon-sm"
              variant="outline"
            >
              <ChevronLeftIcon />
            </Button>
            <Badge className="h-8 rounded-md px-2.5" variant="secondary">
              Page {pageIndex + 1}/{pageCount}
            </Badge>
            <Button
              aria-label="Next page"
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
              aria-label="Zoom out"
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
              aria-label="Zoom in"
              disabled={zoom >= 140}
              onClick={onZoomIn}
              size="icon-sm"
              variant="outline"
            >
              <ZoomInIcon />
            </Button>
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
  page,
  pageIndex,
  source,
}: {
  page: KnowledgeRenderedPage
  pageIndex: number
  source: KnowledgeSource
}) {
  if (source.type === "CSV") {
    return <SpreadsheetPreviewPage page={page} source={source} />
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
        <span>Page {pageIndex + 1}</span>
      </div>
    </article>
  )
}

function SpreadsheetPreviewPage({
  page,
  source,
}: {
  page: KnowledgeRenderedPage
  source: KnowledgeSource
}) {
  return (
    <article className="w-[280px] overflow-hidden rounded-md border bg-background shadow-sm sm:w-[360px]">
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
          <div className="overflow-hidden rounded-lg border">
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
    return <Badge variant="secondary">Available</Badge>
  }

  if (status === "Indexing") {
    return <Badge variant="outline">Processing</Badge>
  }

  return <Badge variant="destructive">Needs review</Badge>
}

function getFolderName(folderId: string) {
  return (
    knowledgeFolders.find((folder) => folder.id === folderId)?.name ??
    "Unassigned"
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

function ChatWorkspace({
  attachments,
  activeView,
  chat,
  draft,
  isPro,
  mode,
  model,
  onAttach,
  onDraftChange,
  onModelChange,
  onNewChat,
  onPrompt,
  onSend,
  onTogglePro,
  onToggleVoice,
  promptActions,
  textareaRef,
  voiceEnabled,
}: {
  attachments: number
  activeView: WorkspaceView
  chat: Chat | null
  draft: string
  isPro: boolean
  mode: string
  model: string
  onAttach: () => void
  onDraftChange: (value: string) => void
  onModelChange: (value: string) => void
  onNewChat: () => void
  onPrompt: (action: PromptAction) => void
  onSend: () => void
  onTogglePro: () => void
  onToggleVoice: () => void
  promptActions: PromptAction[]
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  voiceEnabled: boolean
}) {
  if (activeView === "knowledge") {
    return <KnowledgeBaseView />
  }

  if (chat) {
    return (
      <section className="flex min-h-0 animate-in flex-col overflow-hidden bg-background duration-300 fade-in-0 ease-out">
        <div className="flex h-[3.25rem] shrink-0 items-center justify-between gap-3 border-b px-4 sm:h-14 sm:px-5">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium sm:text-base">
              {chat.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {chat.category} - {chat.model}
            </p>
          </div>
          <Button onClick={onNewChat} size="sm" variant="outline">
            <PlusIcon data-icon="inline-start" />
            New
          </Button>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-5 sm:px-6">
            {chat.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
        <div className="mx-auto w-full max-w-3xl px-4 pt-2 pb-4 sm:px-6">
          <ChatComposer
            attachments={attachments}
            draft={draft}
            isPro={isPro}
            mode={mode}
            model={model}
            onAttach={onAttach}
            onDraftChange={onDraftChange}
            onModelChange={onModelChange}
            onSend={onSend}
            onTogglePro={onTogglePro}
            onToggleVoice={onToggleVoice}
            textareaRef={textareaRef}
            voiceEnabled={voiceEnabled}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-0 animate-in overflow-hidden bg-background duration-300 fade-in-0 ease-out">
      <div className="mx-auto flex h-full w-full max-w-[880px] flex-col items-center px-4 pt-14 sm:px-5 sm:pt-20 lg:pt-28">
        <div className="ai-orb" aria-hidden />
        <h1 className="mt-10 text-center text-[28px] leading-[1.2] font-medium tracking-[0] text-foreground sm:mt-12 sm:text-[34px] xl:text-[38px]">
          <span>Good Morning, Toby</span>
          <br />
          <span>
            How Can I{" "}
            <span className="ai-gradient-text">Assist You Today?</span>
          </span>
        </h1>
        <ChatComposer
          attachments={attachments}
          className="mt-8 sm:mt-10"
          draft={draft}
          isPro={isPro}
          mode={mode}
          model={model}
          onAttach={onAttach}
          onDraftChange={onDraftChange}
          onModelChange={onModelChange}
          onSend={onSend}
          onTogglePro={onTogglePro}
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
    </section>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex animate-in gap-3 duration-300 fade-in-0 slide-in-from-bottom-1 ease-out",
        isUser && "justify-end"
      )}
    >
      {!isUser ? (
        <Avatar className="mt-0.5 size-7">
          <AvatarFallback className="bg-muted text-[11px]">AI</AvatarFallback>
        </Avatar>
      ) : null}
      <div
        className={cn(
          "max-w-[min(78%,42rem)] rounded-lg px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border bg-background shadow-sm"
        )}
      >
        <p>{message.content}</p>
        <span
          className={cn(
            "mt-1 block text-[10px]",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
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
  isPro,
  mode,
  model,
  onAttach,
  onDraftChange,
  onModelChange,
  onSend,
  onTogglePro,
  onToggleVoice,
  textareaRef,
  voiceEnabled,
}: {
  attachments: number
  className?: string
  draft: string
  isPro: boolean
  mode: string
  model: string
  onAttach: () => void
  onDraftChange: (value: string) => void
  onModelChange: (value: string) => void
  onSend: () => void
  onTogglePro: () => void
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
          <span className="truncate">
            {isPro ? "Pro mock plan enabled" : "Use our faster AI on Pro Plan"}
          </span>
          <span aria-hidden>-</span>
          <Button
            className="h-auto shrink-0 p-0 text-xs"
            onClick={onTogglePro}
            size="xs"
            variant="link"
          >
            {isPro ? "Manage" : "Upgrade"}
          </Button>
          {mode !== "General" ? (
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
        aria-label="Ask me anything"
        className="min-h-[74px] px-4 pt-4 pb-0 text-[15px] transition-colors duration-200 ease-out sm:px-5"
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault()
            onSend()
          }
        }}
        placeholder="Ask me anything..."
        ref={textareaRef}
        value={draft}
      />
      <InputGroupAddon
        align="block-end"
        className="flex-wrap gap-2 px-4 pt-0 pb-4 sm:h-12 sm:flex-nowrap sm:px-5"
      >
        <InputGroupButton
          aria-label="Attach file"
          onClick={onAttach}
          size="icon-sm"
          variant="ghost"
        >
          <PaperclipIcon />
        </InputGroupButton>
        {attachments ? (
          <Badge className="h-6 text-[10px]" variant="outline">
            {attachments} file{attachments === 1 ? "" : "s"}
          </Badge>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-9 min-w-0 rounded-full px-2 transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px sm:px-3"
              size="sm"
              variant="outline"
            >
              <Globe2Icon data-icon="inline-start" />
              <span className="hidden max-w-36 truncate sm:inline">
                {model}
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
                  {item}
                  {item === model ? <CheckIcon className="ml-auto" /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupText className="ml-auto gap-2">
          <Button
            aria-label="Voice input"
            className={cn(
              "rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px",
              voiceEnabled && "bg-muted"
            )}
            onClick={onToggleVoice}
            size="icon-sm"
            variant="outline"
          >
            <MicIcon />
          </Button>
          <Button
            aria-label="Send message"
            className="ai-send-button rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out enabled:hover:-translate-y-px enabled:hover:shadow-sm"
            disabled={!draft.trim()}
            onClick={onSend}
            size="icon-sm"
          >
            <ArrowUpIcon />
          </Button>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
