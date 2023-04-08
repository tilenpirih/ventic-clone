/* eslint-disable no-bitwise */
/* Formule for generating colors is from vuetify https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/services/theme/utils.ts#L119 */

const delta = 0.20689655172413793
const cielabForwardTransform = t => (t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29)
const cielabReverseTransform = t => (t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29))
const srgbForwardMatrix = [
  [3.2406, -1.5372, -0.4986],
  [-0.9689, 1.8758, 0.0415],
  [0.0557, -0.204, 1.057],
]
const srgbForwardTransform = C => (C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055)
const srgbReverseMatrix = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505],
]
const srgbReverseTransform = C => (C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4)

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function fromXYZ(xyz) {
  const rgb = Array(3)
  const transform2 = srgbForwardTransform
  const matrix = srgbForwardMatrix
  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(
      clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255
    )
  }

  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0)
}

function toXYZ(rgb) {
  const xyz = [0, 0, 0]
  const transform2 = srgbReverseTransform
  const matrix = srgbReverseMatrix
  const r = transform2(((rgb >> 16) & 255) / 255)
  const g = transform2(((rgb >> 8) & 255) / 255)
  const b = transform2(((rgb >> 0) & 255) / 255)
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b
  }
  return xyz
}
function intToHex(color) {
  let hexColor = color.toString(16)
  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor
  return `#${hexColor}`
}
function fromXYZ2(xyz) {
  const transform2 = cielabForwardTransform
  const transformedY = transform2(xyz[1])
  return [
    116 * transformedY - 16,
    500 * (transform2(xyz[0] / 0.95047) - transformedY),
    200 * (transformedY - transform2(xyz[2] / 1.08883)),
  ]
}

function toXYZ2(lab) {
  const transform2 = cielabReverseTransform
  const Ln = (lab[0] + 16) / 116
  return [
    transform2(Ln + lab[1] / 500) * 0.95047,
    transform2(Ln),
    transform2(Ln - lab[2] / 200) * 1.08883,
  ]
}
function lighten(value, amount) {
  const lab = fromXYZ2(toXYZ(value))
  lab[0] += amount * 10
  return fromXYZ(toXYZ2(lab))
}

function darken(value, amount) {
  const lab = fromXYZ2(toXYZ(value))
  lab[0] -= amount * 10
  return fromXYZ(toXYZ2(lab))
}
export default function genVariations(value) {
  value = parseInt(value.substring(1), 16)
  const values = []
  for (let i = 5; i > 0; --i) {
    values.push(intToHex(darken(value, i)).toUpperCase())
  }
  for (let i = 1; i <= 5; ++i) {
    values.push(intToHex(lighten(value, i)).toUpperCase())
  }
  return values
}
