/** Formata um timestamp como "hoje", "ontem" ou "há N dias" em português. */
export function formatRelativeDay(timestamp?: number): string {
  if (!timestamp) return "data desconhecida"

  const now = new Date()
  const then = new Date(timestamp)

  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(then)) / (24 * 60 * 60 * 1000),
  )

  if (diffDays <= 0) return "hoje"
  if (diffDays === 1) return "ontem"
  if (diffDays < 7) return `há ${diffDays} dias`
  const weeks = Math.round(diffDays / 7)
  if (weeks === 1) return "há 1 semana"
  return `há ${weeks} semanas`
}
