import { exposeInMainWorld } from './exposeInMainWorld'

// Export for types in contracts.d.ts
// eslint-disable-next-line import/prefer-default-export, prefer-destructuring
export const versions = process.versions

exposeInMainWorld('versions', versions)
