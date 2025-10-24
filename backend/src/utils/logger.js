// src/utils/logger.js
// Minimal logger wrapper so you can swap implementation later
function info(...args) { console.log(...args) }
function warn(...args) { console.warn(...args) }
function error(...args) { console.error(...args) }

module.exports = { info, warn, error }
