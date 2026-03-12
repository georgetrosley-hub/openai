"use client";

import { useEffect, useState } from "react";
import { ChevronDown, KeyRound, MessageCircle, Moon, Sun, Trash2, X } from "lucide-react";
import { useApiKey } from "@/app/context/api-key-context";
import { cn } from "@/lib/utils";
import { ClaudeSparkle } from "@/components/ui/claude-logo";
import { useTheme } from "@/app/context/theme-context";
import type { Account } from "@/types";

interface StatusBarProps {
  account: Account;
  accounts: Account[];
  onAccountChange: (id: string) => void;
  pipelineTarget: number;
  estimatedArr: number;
  dealStage: string;
  activeAgents: number;
  oversightStatus: "active" | "idle";
  onOpenChat?: () => void;
}

export function StatusBar({
  account,
  accounts,
  onAccountChange,
  pipelineTarget,
  estimatedArr,
  dealStage,
  activeAgents,
  oversightStatus,
  onOpenChat,
}: StatusBarProps) {
  const { theme, setTheme } = useTheme();
  const { apiKey, hasApiKey, isReady, setApiKey, clearApiKey } = useApiKey();
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [draftApiKey, setDraftApiKey] = useState("");

  useEffect(() => {
    if (isApiKeyOpen) {
      setDraftApiKey(apiKey);
    }
  }, [apiKey, isApiKeyOpen]);

  return (
    <>
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-surface-border/35 bg-surface/40 px-6">
        <div className="flex items-center gap-6">
          {/* Account selector */}
          <div className="relative">
            <select
              value={account.id}
              onChange={(e) => onAccountChange(e.target.value)}
              className={cn(
                "appearance-none rounded bg-transparent py-1.5 pr-7 text-[13px] text-text-primary",
                "cursor-pointer border-none focus:outline-none focus:ring-0"
              )}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id} className="bg-surface-elevated text-text-primary">
                  {a.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-[12px]">
            <span className="text-text-muted">
              <span className="tabular-nums text-text-primary">${pipelineTarget.toFixed(2)}M</span>
              {" "}pipeline
            </span>
            <span className="text-text-muted">
              <span className="tabular-nums text-claude-coral/90">${estimatedArr.toFixed(2)}M</span>
              {" "}ARR
            </span>
            <span className="hidden text-text-muted lg:inline">{dealStage}</span>
            <span className="text-text-muted">
              <span className="tabular-nums text-text-secondary">{activeAgents}</span>
              {" "}agents
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsApiKeyOpen(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] transition-colors",
              hasApiKey
                ? "border-claude-coral/25 bg-claude-coral/[0.06] text-claude-coral/90 hover:bg-claude-coral/10"
                : "border-surface-border/50 bg-surface-elevated/30 text-text-secondary hover:text-text-primary"
            )}
          >
            <KeyRound className="h-3 w-3" />
            {isReady && hasApiKey ? "API key saved" : "Add API key"}
          </button>
          <div className="flex items-center rounded-full border border-surface-border/60 bg-surface-elevated/45 p-0.5">
            <button
              type="button"
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] transition-colors",
                theme === "light"
                  ? "bg-surface-muted/90 text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Sun className="h-3 w-3" />
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] transition-colors",
                theme === "dark"
                  ? "bg-surface-muted/90 text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Moon className="h-3 w-3" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-text-secondary hover:bg-surface-muted/30 hover:text-text-primary transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              Ask Claude
            </button>
          )}
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-[11px]">
            {oversightStatus === "active" ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-claude-coral/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-claude-coral/70" />
                </span>
                <span className="text-claude-coral/80">Approval required</span>
              </>
            ) : (
              <>
                <ClaudeSparkle size={10} className="text-text-faint" />
                <span className="text-[11px] text-text-faint">Ready</span>
              </>
            )}
          </div>
        </div>
      </header>

      {isApiKeyOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 px-4 py-24">
          <div className="w-full max-w-md rounded-xl border border-surface-border/50 bg-surface-elevated shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-border/40 px-5 py-4">
              <div>
                <p className="text-[13px] font-medium text-text-primary">Claude API Key</p>
                <p className="mt-1 text-[11px] text-text-muted">
                  Saved locally in this browser and sent only with your requests.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApiKeyOpen(false)}
                className="rounded-md p-1.5 text-text-muted hover:bg-surface-muted/40 hover:text-text-secondary transition-colors"
                aria-label="Close API key dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="space-y-2">
                <label htmlFor="claude-api-key" className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted">
                  API Key
                </label>
                <input
                  id="claude-api-key"
                  type="password"
                  value={draftApiKey}
                  onChange={(e) => setDraftApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full rounded-lg border border-surface-border/50 bg-surface px-3 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted/60 focus:border-claude-coral/30 focus:outline-none"
                />
              </div>

              <div className="rounded-lg bg-surface/60 px-3 py-2 text-[11px] text-text-secondary">
                {hasApiKey
                  ? "A Claude API key is currently saved for this browser."
                  : "No Claude API key is saved yet. Add one here to enable chat and content generation."}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    clearApiKey();
                    setDraftApiKey("");
                  }}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] text-text-muted hover:bg-surface-muted/30 hover:text-text-secondary transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear saved key
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApiKeyOpen(false)}
                    className="rounded-md px-3 py-2 text-[11px] text-text-secondary hover:bg-surface-muted/30 hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey(draftApiKey);
                      setIsApiKeyOpen(false);
                    }}
                    disabled={!draftApiKey.trim()}
                    className={cn(
                      "rounded-md px-3 py-2 text-[11px] font-medium transition-colors",
                      draftApiKey.trim()
                        ? "bg-claude-coral/90 text-white hover:bg-claude-coral"
                        : "bg-surface-muted/50 text-text-muted"
                    )}
                  >
                    Save key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
