import type { AccountUpdate, ExecutionItem } from "@/types";

/**
 * Builds an automated "Plans for this week" string from last week's notes,
 * recent account updates, and where execution items need to progress.
 */
export function getPlansForThisWeek(
  accountUpdates: AccountUpdate[],
  executionItems: ExecutionItem[]
): string {
  const recentUpdates = accountUpdates.slice(0, 4);
  const toAdvance = executionItems.filter(
    (i) => i.status === "in_progress" || i.status === "ready" || i.status === "blocked"
  );
  const lines: string[] = [];

  if (recentUpdates.length > 0) {
    lines.push("From last week's notes and updates:");
    recentUpdates.forEach((u) => {
      const note = u.note.trim();
      if (note && note !== "—") lines.push(`• ${u.title}: ${note.slice(0, 120)}${note.length > 120 ? "…" : ""}`);
      else lines.push(`• ${u.title} (${u.createdAt})`);
    });
  }

  if (toAdvance.length > 0) {
    if (lines.length) lines.push("");
    lines.push("Where things need to progress:");
    toAdvance.slice(0, 5).forEach((i) => {
      const status = i.status === "blocked" ? " [blocked]" : "";
      lines.push(`• ${i.title} · ${i.owner} · ${i.dueLabel}${status}`);
    });
  }

  if (lines.length === 0) {
    return "No recent notes or updates yet. Add an account update or move items forward in the Deal Plan to see suggested plans here.";
  }

  return lines.join("\n");
}
