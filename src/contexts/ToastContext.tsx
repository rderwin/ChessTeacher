"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastKind =
  | "achievement"
  | "levelup"
  | "streak"
  | "info"
  | "success"
  | "error";

export interface ToastPayload {
  id?: string;
  kind: ToastKind;
  title: string;
  description?: string;
  icon?: string;
  durationMs?: number;
}

interface InternalToast extends ToastPayload {
  id: string;
  createdAt: number;
}

interface ToastContextValue {
  show: (t: ToastPayload) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION: Record<ToastKind, number> = {
  achievement: 5000,
  levelup: 4500,
  streak: 3000,
  info: 3000,
  success: 3000,
  error: 4000,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<InternalToast[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback(
    (t: ToastPayload) => {
      const id = t.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const duration = t.durationMs ?? DEFAULT_DURATION[t.kind] ?? 3000;
      const toast: InternalToast = { ...t, id, createdAt: Date.now() };
      setToasts((ts) => [...ts, toast]);
      timers.current[id] = setTimeout(() => {
        dismiss(id);
      }, duration);
    },
    [dismiss],
  );

  // Cleanup all timers on unmount
  useEffect(() => {
    const stored = timers.current;
    return () => {
      Object.values(stored).forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fail safe — return no-ops if provider is missing
    return {
      show: () => {},
      dismiss: () => {},
    };
  }
  return ctx;
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: InternalToast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[100] flex flex-col items-center gap-2 px-4 sm:right-4 sm:top-20 sm:items-end sm:px-0">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

const KIND_STYLES: Record<ToastKind, string> = {
  achievement:
    "from-yellow-900/90 to-amber-950/90 border-yellow-600/50 text-yellow-100",
  levelup:
    "from-purple-900/90 to-fuchsia-950/90 border-purple-500/50 text-purple-100",
  streak:
    "from-orange-900/90 to-red-950/90 border-orange-500/50 text-orange-100",
  info: "from-stone-800/95 to-stone-900/95 border-stone-600/50 text-stone-100",
  success:
    "from-emerald-900/90 to-emerald-950/90 border-emerald-600/50 text-emerald-100",
  error: "from-red-900/90 to-red-950/90 border-red-600/50 text-red-100",
};

const KIND_ICON: Record<ToastKind, string> = {
  achievement: "🏅",
  levelup: "⭐",
  streak: "🔥",
  info: "ℹ️",
  success: "✅",
  error: "⚠️",
};

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: InternalToast;
  onDismiss: () => void;
}) {
  return (
    <button
      onClick={onDismiss}
      className={`pointer-events-auto w-full max-w-sm text-left bg-gradient-to-br ${KIND_STYLES[toast.kind]} backdrop-blur-sm rounded-xl border shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-top-4 fade-in duration-300 hover:scale-[1.02] transition-transform`}
      aria-label="Dismiss notification"
    >
      <span className="text-3xl leading-none shrink-0" aria-hidden>
        {toast.icon ?? KIND_ICON[toast.kind]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-tight">{toast.title}</p>
        {toast.description && (
          <p className="text-xs opacity-80 mt-1 leading-snug">
            {toast.description}
          </p>
        )}
      </div>
    </button>
  );
}
