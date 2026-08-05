// Lightweight stand-in for the trigram similarity that pg_trgm will
// perform server-side. Good enough to demonstrate "did you mean" UX
// for near-miss queries typed by a user.

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[a.length][b.length]
}

// Returns a known term close enough to `query` to plausibly be a typo,
// or null if the query is already a reasonable match / too different.
export function suggestCorrection(query: string, knownTerms: string[]): string | null {
  let best: { term: string; distance: number } | null = null
  for (const term of knownTerms) {
    const distance = levenshtein(query, term)
    const threshold = Math.max(1, Math.floor(term.length * 0.3))
    if (distance > 0 && distance <= threshold) {
      if (!best || distance < best.distance) best = { term, distance }
    }
  }
  return best?.term ?? null
}
