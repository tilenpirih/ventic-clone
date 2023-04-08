import { contextBridge } from 'electron'

/**
 * Typesafe wrapper for `electron.contextBridge.exposeInMainWorld`.
 * Guarantees that all exposed APIs will comply with contracts.
 * @param key Key to inject the API onto window with. The API will be accessible on window[apiKey].
 * @param api Your API
 *
 * @see https://www.electronjs.org/docs/latest/api/context-bridge#contextbridgeexposeinmainworldapikey-api
 */
// eslint-disable-next-line import/prefer-default-export
export function exposeInMainWorld<T extends keyof Exposed & string>(key: T, api: Exposed[T]) {
  return contextBridge.exposeInMainWorld(key, api)
}
