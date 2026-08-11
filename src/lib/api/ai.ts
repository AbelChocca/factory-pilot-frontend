import { AIChatRequest, AIStreamEvent } from "@/src/types/ai";

function parseSSEEvent(rawEvent: string): AIStreamEvent | null {
  let eventType: string | undefined;
  let data: string | undefined;

  for (const line of rawEvent.split(/\r?\n/)) {
    if (line.startsWith("event:")) {
      eventType = line.slice(6).trim();
    }

    if (line.startsWith("data:")) {
      data = line.slice(5).trim();
    }
  }

  if (!eventType || !data) {
    return null;
  }

  const parsed = JSON.parse(data) as AIStreamEvent;

  if (parsed.type !== eventType) {
    throw new Error(
      `Invalid AI stream event: expected "${eventType}", received "${parsed.type}".`,
    );
  }

  return parsed;
}

export async function streamAIChat(
  request: AIChatRequest,
  onEvent: (event: AIStreamEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal,
    },
  );

  if (!response.ok) {
    let message = "Failed to connect to FactoryPilot.";

    try {
      const data = await response.json();

      if (typeof data.detail === "string") {
        message = data.detail;
      }
    } catch {
      // Ignore parsing errors.
    }

    throw new Error(message);
  }

  if (!response.body) {
    throw new Error("FactoryPilot did not return a response stream.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, {
        stream: true,
      });

      const chunks = buffer.split(/\r?\n\r?\n/);

      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        if (!chunk.trim()) {
          continue;
        }

        const event = parseSSEEvent(chunk);

        if (event) {
          onEvent(event);
        }
      }
    }

    buffer += decoder.decode();

    if (buffer.trim()) {
      const event = parseSSEEvent(buffer);

      if (event) {
        onEvent(event);
      }
    }
  } finally {
    reader.releaseLock();
  }
}
