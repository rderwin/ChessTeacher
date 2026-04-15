import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// --- Types ---------------------------------------------------------------

export interface ChatMessage {
  id: string;
  uid: string;
  name: string;
  photoURL: string | null;
  text: string;
  createdAt: Timestamp | null;
}

interface FirestoreChatDoc {
  uid: string;
  name: string;
  photoURL: string | null;
  text: string;
  createdAt: Timestamp | null;
}

// --- Helpers -------------------------------------------------------------

function messagesCollection(gameId: string) {
  return collection(db, "multiplayerGames", gameId, "messages");
}

/** Enforce a max length and trim whitespace before writing. */
function sanitize(text: string): string {
  return text.trim().slice(0, 280);
}

// --- CRUD ----------------------------------------------------------------

/** Append a chat message to a game. No-op if the text is empty after trimming. */
export async function sendChatMessage(
  gameId: string,
  sender: { uid: string; name: string; photoURL: string | null },
  text: string,
): Promise<void> {
  const clean = sanitize(text);
  if (!clean) return;
  await addDoc(messagesCollection(gameId), {
    uid: sender.uid,
    name: sender.name,
    photoURL: sender.photoURL,
    text: clean,
    createdAt: serverTimestamp(),
  });
}

/**
 * Subscribe to the most recent messages in a game's chat.
 * Returns an unsubscribe function.
 */
export function subscribeToChat(
  gameId: string,
  onUpdate: (messages: ChatMessage[]) => void,
  options: { max?: number } = {},
): () => void {
  const { max = 100 } = options;
  const q = query(
    messagesCollection(gameId),
    orderBy("createdAt", "asc"),
    limit(max),
  );
  return onSnapshot(q, (snap) => {
    const messages: ChatMessage[] = [];
    snap.forEach((d) => {
      const data = d.data() as FirestoreChatDoc;
      messages.push({
        id: d.id,
        uid: data.uid,
        name: data.name,
        photoURL: data.photoURL ?? null,
        text: data.text,
        createdAt: data.createdAt ?? null,
      });
    });
    onUpdate(messages);
  });
}
