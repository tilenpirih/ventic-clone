export function percentToHex(p) {
  return Math.round((p / 100) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
}
export function hexToPercent(hex) {
  return Math.round((parseInt(hex, 16) / 255) * 100)
}
