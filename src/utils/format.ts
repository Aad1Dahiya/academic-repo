export function pluralize(count: number, noun: string): string {
  return `${count.toLocaleString()} ${noun}${count === 1 ? '' : 's'}`
}

export function formatCitationCount(count: number): string {
  return pluralize(count, 'citation')
}

export function formatNumber(n: number): string {
  return n.toLocaleString()
}
