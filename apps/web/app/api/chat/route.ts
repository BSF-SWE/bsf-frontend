import { NextResponse } from "next/server"

type NvidiaRole = "system" | "user" | "assistant"

type NvidiaChatMessage = {
  role: NvidiaRole
  content: string
}

type IncomingChatMessage = {
  role?: unknown
  content?: unknown
}

const defaultEndpoint = "https://integrate.api.nvidia.com/v1/chat/completions"
const defaultModel = "nvidia/llama-3.3-nemotron-super-49b-v1.5"

function isChatRole(role: unknown): role is Exclude<NvidiaRole, "system"> {
  return role === "user" || role === "assistant"
}

function normalizeMessages(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.flatMap((item): NvidiaChatMessage[] => {
    if (!item || typeof item !== "object") {
      return []
    }

    const message = item as IncomingChatMessage
    const content =
      typeof message.content === "string" ? message.content.trim() : ""

    if (!isChatRole(message.role) || !content) {
      return []
    }

    return [
      {
        content,
        role: message.role,
      },
    ]
  })
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  const apiKey = process.env.NVIDIA_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "NVIDIA_API_KEY no está configurada en el entorno del servidor.",
      },
      { status: 500 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la consulta no es JSON válido." },
      { status: 400 }
    )
  }

  const payload = body && typeof body === "object" ? body : {}
  const record = payload as Record<string, unknown>
  const messages = normalizeMessages(record.messages).slice(-12)
  const mode = normalizeString(record.mode) || "General"
  const attachmentCount =
    typeof record.attachments === "number" ? record.attachments : 0
  const requestedModel = normalizeString(record.model)
  const model = requestedModel || process.env.NVIDIA_MODEL || defaultModel

  if (!messages.some((message) => message.role === "user")) {
    return NextResponse.json(
      { error: "La consulta necesita al menos un mensaje de usuario." },
      { status: 400 }
    )
  }

  const systemMessage: NvidiaChatMessage = {
    role: "system",
    content: [
      "Eres el asistente operativo de BSF Almacenes del Perú.",
      "Responde en español, con criterio ejecutivo, claridad y pasos accionables.",
      `Modo solicitado: ${mode}.`,
      attachmentCount > 0
        ? `El usuario adjuntó ${attachmentCount} archivo${
            attachmentCount === 1 ? "" : "s"
          }, pero esta versión local aún no procesa el contenido real de adjuntos. Sé transparente si son necesarios.`
        : "",
    ]
      .filter(Boolean)
      .join(" "),
  }

  try {
    const response = await fetch(
      process.env.NVIDIA_API_URL ?? defaultEndpoint,
      {
        body: JSON.stringify({
          max_tokens: 900,
          messages: [systemMessage, ...messages],
          model,
          stream: false,
          temperature: 0.4,
          top_p: 0.9,
        }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )

    if (!response.ok) {
      const detail = await response.text()

      return NextResponse.json(
        {
          error: `NVIDIA respondió con estado ${response.status}${
            detail ? `: ${detail.slice(0, 240)}` : ""
          }`,
        },
        { status: response.status }
      )
    }

    const completion = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string
        }
      }>
      model?: string
    }
    const content = completion.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return NextResponse.json(
        { error: "NVIDIA no devolvió contenido para esta consulta." },
        { status: 502 }
      )
    }

    return NextResponse.json({
      content,
      model: completion.model ?? model,
    })
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con NVIDIA." },
      { status: 502 }
    )
  }
}
