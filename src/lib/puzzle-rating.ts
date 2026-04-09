const INITIAL_RATING = 800;
const K_FACTOR_EARLY = 40;
const K_FACTOR_STANDARD = 20;
const EARLY_GAME_THRESHOLD = 50;

/**
 * Calculate expected score using the Elo formula.
 */
function expectedScore(playerRating: number, puzzleRating: number): number {
  return 1 / (1 + Math.pow(10, (puzzleRating - playerRating) / 400));
}

/**
 * Determine actual score:
 *  - 1.0 if solved on first attempt
 *  - 0.5 if solved with retries
 *  - 0.0 if gave up / not solved
 */
function actualScore(solved: boolean, attempts: number): number {
  if (!solved) return 0;
  return attempts <= 1 ? 1.0 : 0.5;
}

export interface RatingResult {
  newRating: number;
  ratingDelta: number;
}

/**
 * Calculate a new rating after a puzzle attempt.
 */
export function calculateNewRating(
  playerRating: number,
  puzzleRating: number,
  solved: boolean,
  attempts: number,
  totalGames: number,
): RatingResult {
  const k = totalGames < EARLY_GAME_THRESHOLD ? K_FACTOR_EARLY : K_FACTOR_STANDARD;
  const expected = expectedScore(playerRating, puzzleRating);
  const actual = actualScore(solved, attempts);
  const delta = Math.round(k * (actual - expected));
  const newRating = Math.max(100, playerRating + delta);

  return {
    newRating,
    ratingDelta: newRating - playerRating,
  };
}

export { INITIAL_RATING };
