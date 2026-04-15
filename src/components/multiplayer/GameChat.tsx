"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  sendChatMessage,
  subscribeToChat,
  type ChatMessage,
} from "@/lib/multiplayer-chat";

interface Props {
  gameId: string;
  /** Disable the input for spectators — they can still read. */
  readOnly?: boolean;
}

export default function GameChat({ gameId, readOnly = false }: Props) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);
  const prevCountRef = useRef(0);
  const [unread, setUnread] = useState(0);

  // Subscribe to chat messages
  useEffect(() => {
    const unsub = subscribeToChat(gameId, (msgs) => {
      setMessages(msgs);
    });
    return () => unsub();
  }, [gameId]);

  // Auto-scroll on new messages when expanded
  useEffect(() => {
    if (!expanded) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, expanded]);

  // Track unread messages when collapsed
  useEffect(() => {
    if (expanded) {
      prevCountRef.current = messages.length;
      setUnread(0);
      return;
    }
    const diff = messages.length - prevCountRef.current;
    if (diff > 0) setUnread((u) => u + diff);
    prevCountRef.current = messages.length;
  }, [messages.length, expanded]);

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user || !draft.trim() || sending) return;
      setSending(true);
      const text = draft;
      setDraft("");
      try {
        await sendChatMessage(
          gameId,
          {
            uid: user.uid,
            name: user.displayName ?? "Anonymous",
            photoURL: user.photoURL ?? null,
          },
          text,
        );
      } catch {
        // If it failed, put the text back so the user can retry
        setDraft(text);
      } finally {
        setSending(false);
      }
    },
    [user, draft, sending, gameId],
  );

  return (
    <div className="bg-stone-800 border border-stone-700 rounded-xl overflow-hidden flex flex-col">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center justify-between px-4 py-2.5 text-left hover:bg-stone-700/50 transition-colors"
      >
        <span className="text-sm font-medium text-stone-300 flex items-center gap-2">
          💬 Chat
          {!expanded && unread > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-600 text-white rounded-full">
              {unread}
            </span>
          )}
        </span>
        <span className="text-xs text-stone-500">
          {expanded ? "−" : `+`}
        </span>
      </button>

      {expanded && (
        <>
          <div
            ref={listRef}
            className="px-3 pt-1 pb-2 max-h-56 overflow-y-auto space-y-2"
          >
            {messages.length === 0 ? (
              <p className="text-xs text-stone-600 italic text-center py-2">
                No messages yet. Say hi!
              </p>
            ) : (
              messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  message={m}
                  isSelf={m.uid === user?.uid}
                />
              ))
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-stone-700 p-2 flex gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={280}
              disabled={!user || readOnly || sending}
              placeholder={
                !user
                  ? "Sign in to chat"
                  : readOnly
                    ? "Spectators can't chat"
                    : "Say something..."
              }
              className="flex-1 bg-stone-900 border border-stone-700 focus:border-emerald-600 focus:outline-none rounded-lg px-3 py-1.5 text-sm text-stone-200 placeholder:text-stone-600 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!user || readOnly || sending || !draft.trim()}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function ChatBubble({
  message,
  isSelf,
}: {
  message: ChatMessage;
  isSelf: boolean;
}) {
  return (
    <div
      className={`flex items-end gap-2 ${isSelf ? "flex-row-reverse" : "flex-row"}`}
    >
      {message.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={message.photoURL}
          alt=""
          className="w-6 h-6 rounded-full shrink-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-stone-700 shrink-0" />
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-3 py-1.5 text-sm break-words ${
          isSelf
            ? "bg-emerald-700/60 text-white rounded-br-md"
            : "bg-stone-700/80 text-stone-100 rounded-bl-md"
        }`}
      >
        {!isSelf && (
          <p className="text-[10px] text-stone-400 mb-0.5 font-medium">
            {message.name}
          </p>
        )}
        <p className="leading-snug whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
