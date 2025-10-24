export function shortText(text = '', len = 80) {
  if (!text) return ''
  return text.length > len ? text.slice(0, len) + '...' : text
}
export function prettyDate(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleString()
}
