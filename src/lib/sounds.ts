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

// --- Chess move sounds ---

function playNoise(ctx: AudioContext, startTime: number, duration: number, gain: number) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, startTime);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  // Bandpass filter to shape the noise
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 1;

  source.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function playMove(ctx: AudioContext) {
  // Soft wooden "tap" — filtered noise burst + low thud
  const t = ctx.currentTime;
  playNoise(ctx, t, 0.06, 0.15);
  playTone(ctx, 150, t, 0.05, "sine", 0.08);
}

function playCapture(ctx: AudioContext) {
  // Sharper "thwack" — louder noise + mid tone
  const t = ctx.currentTime;
  playNoise(ctx, t, 0.08, 0.25);
  playTone(ctx, 200, t, 0.06, "triangle", 0.12);
  playTone(ctx, 120, t + 0.02, 0.06, "sine", 0.06);
}

function playCheck(ctx: AudioContext) {
  // Alert ping after the move sound
  const t = ctx.currentTime;
  playNoise(ctx, t, 0.05, 0.15);
  playTone(ctx, 880, t + 0.05, 0.15, "sine", 0.1);
  playTone(ctx, 660, t + 0.12, 0.1, "sine", 0.06);
}

function playCastle(ctx: AudioContext) {
  // Two taps (king + rook moving)
  const t = ctx.currentTime;
  playNoise(ctx, t, 0.05, 0.12);
  playTone(ctx, 160, t, 0.05, "sine", 0.08);
  playNoise(ctx, t + 0.12, 0.05, 0.12);
  playTone(ctx, 180, t + 0.12, 0.05, "sine", 0.08);
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
