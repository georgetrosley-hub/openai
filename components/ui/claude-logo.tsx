"use client";

import { cn } from "@/lib/utils";

interface ClaudeSparkleProps {
  className?: string;
  size?: number;
}

export function ClaudeSparkle({ className, size = 20 }: ClaudeSparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-claude-coral", className)}
    >
      <path
        d="M12 1C12.5 5.5 13 8 14.5 9.5C16 11 18.5 11.5 23 12C18.5 12.5 16 13 14.5 14.5C13 16 12.5 18.5 12 23C11.5 18.5 11 16 9.5 14.5C8 13 5.5 12.5 1 12C5.5 11.5 8 11 9.5 9.5C11 8 11.5 5.5 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface AnthropicWordmarkProps {
  className?: string;
}

export function AnthropicWordmark({ className }: AnthropicWordmarkProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ClaudeSparkle size={16} />
      <span className="text-[13px] font-semibold tracking-tight text-text-primary">
        claude
      </span>
    </div>
  );
}
