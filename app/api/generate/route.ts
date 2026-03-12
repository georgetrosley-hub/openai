import { NextRequest } from "next/server";
import { buildAccountContext } from "@/lib/prompts/base";
import { CONTENT_PROMPTS } from "@/lib/prompts/content";
import {
  createAnthropicClient,
  getAnthropicErrorMessage,
  getAnthropicErrorStatus,
} from "@/lib/server/anthropic";

export async function POST(req: NextRequest) {
  try {
    const anthropic = createAnthropicClient(req);
    const { type, account, competitors, context } = await req.json();

    const contentPrompt = CONTENT_PROMPTS[type] ?? CONTENT_PROMPTS.strategy_assessment;
    const accountContext = buildAccountContext(account, competitors);

    const userMessage = context
      ? `${accountContext}\n\n## Additional Context\n${context}`
      : accountContext;

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: contentPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return new Response(
      JSON.stringify({ error: getAnthropicErrorMessage(error) }),
      {
        status: getAnthropicErrorStatus(error),
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
