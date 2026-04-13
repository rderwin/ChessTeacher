export type SoundEffect =
  | "correct"
  | "wrong"
  | "complete"
  | "streak"
  | "achievement"
  | "levelup"
  | "move"
  | "capture"
  | "check"
  | "castle"
  | "gameover";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.15,
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  g.gain.setValueAtTime(gain, startTime);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playCorrect(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 880, t, 0.12, "sine", 0.12);
  playTone(ctx, 1100, t + 0.06, 0.12, "sine", 0.1);
}

function playWrong(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 200, t, 0.25, "sawtooth", 0.08);
  playTone(ctx, 180, t + 0.08, 0.2, "sawtooth", 0.06);
}

function playComplete(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 523, t, 0.15, "sine", 0.12);
  playTone(ctx, 659, t + 0.12, 0.15, "sine", 0.12);
  playTone(ctx, 784, t + 0.24, 0.25, "sine", 0.14);
}

function playStreak(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 660, t, 0.1, "sine", 0.12);
  playTone(ctx, 880, t + 0.08, 0.15, "sine", 0.14);
}

function playAchievement(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Triumphant chord: C-E-G-C
  playTone(ctx, 523, t, 0.4, "sine", 0.1);
  playTone(ctx, 659, t, 0.4, "sine", 0.1);
  playTone(ctx, 784, t, 0.4, "sine", 0.1);
  playTone(ctx, 1047, t + 0.15, 0.35, "sine", 0.12);
}

function playLevelUp(ctx: AudioContext) {
  const t = ctx.currentTime;
  const notes = [523, 587, 659, 784, 880, 1047];
  notes.forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.07, 0.12, "sine", 0.1);
  });
}

// --- Chess move sounds (chess.com style) ---

/** Short filtered noise burst for wooden piece sounds */
function playNoise(
  ctx: AudioContext, startTime: number, duration: number, gain: number,
  freq = 1200, q = 2
) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, startTime);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;

  source.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function playMove(ctx: AudioContext) {
  // Chess.com-style wooden "thock" — sharp attack, quick decay
  const t = ctx.currentTime;
  // High-freq noise click for the "snap"
  playNoise(ctx, t, 0.03, 0.3, 2000, 3);
  // Lower body for the "wood" character
  playNoise(ctx, t, 0.06, 0.15, 600, 1.5);
  // Very short low thump
  playTone(ctx, 200, t, 0.03, "sine", 0.1);
}

function playCapture(ctx: AudioContext) {
  // Snappier, louder — two-part sound (grab + place)
  const t = ctx.currentTime;
  // Initial snap (picking up piece)
  playNoise(ctx, t, 0.02, 0.2, 2500, 4);
  // Main thwack (capturing)
  playNoise(ctx, t + 0.02, 0.05, 0.35, 1500, 2);
  playNoise(ctx, t + 0.02, 0.08, 0.2, 500, 1);
  // Low impact
  playTone(ctx, 180, t + 0.02, 0.04, "sine", 0.12);
}

function playCheck(ctx: AudioContext) {
  // Move sound + metallic ring
  const t = ctx.currentTime;
  playNoise(ctx, t, 0.03, 0.25, 2000, 3);
  playNoise(ctx, t, 0.05, 0.12, 600, 1.5);
  // Metallic "ting" — higher pitched, sustains slightly
  playTone(ctx, 1200, t + 0.04, 0.12, "sine", 0.08);
  playTone(ctx, 1800, t + 0.04, 0.08, "sine", 0.04);
}

function playCastle(ctx: AudioContext) {
  // Two quick thuds in succession (king slides, rook slides)
  const t = ctx.currentTime;
  // First piece (king)
  playNoise(ctx, t, 0.03, 0.25, 1800, 3);
  playNoise(ctx, t, 0.05, 0.12, 600, 1.5);
  playTone(ctx, 200, t, 0.03, "sine", 0.08);
  // Second piece (rook) — slightly different pitch
  playNoise(ctx, t + 0.1, 0.03, 0.2, 1600, 3);
  playNoise(ctx, t + 0.1, 0.05, 0.1, 700, 1.5);
  playTone(ctx, 220, t + 0.1, 0.03, "sine", 0.07);
}

function playGameover(ctx: AudioContext) {
  // Low descending tone
  const t = ctx.currentTime;
  playTone(ctx, 300, t, 0.3, "sine", 0.1);
  playTone(ctx, 220, t + 0.15, 0.3, "sine", 0.08);
  playTone(ctx, 150, t + 0.3, 0.4, "sine", 0.06);
}

const SOUND_MAP: Record<SoundEffect, (ctx: AudioContext) => void> = {
  correct: playCorrect,
  wrong: playWrong,
  complete: playComplete,
  streak: playStreak,
  achievement: playAchievement,
  levelup: playLevelUp,
  move: playMove,
  capture: playCapture,
  check: playCheck,
  castle: playCastle,
  gameover: playGameover,
};

/** Determine the right chess sound for a move SAN */
export function getMoveSound(san: string): SoundEffect {
  if (san === "O-O" || san === "O-O-O") return "castle";
  if (san.includes("+") || san.includes("#")) return "check";
  if (san.includes("x")) return "capture";
  return "move";
}

export function playSound(effect: SoundEffect, enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  SOUND_MAP[effect](ctx);
}
