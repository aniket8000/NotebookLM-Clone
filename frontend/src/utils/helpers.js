export function sleep(ms = 200) { return new Promise(r => setTimeout(r, ms)) }
export function uid(prefix = '') { return prefix + Math.random().toString(36).slice(2,9) }
