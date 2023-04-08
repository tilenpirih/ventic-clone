// import { screen } from 'electron'
import { ipcMain } from 'electron'
// eslint-disable-next-line import/no-cycle
import { window } from './window'

const Store = require('electron-store')

const storage = new Store()
// TODO error handling and if window is out of bounds
export function getWinSettings() {
  // storage.clear()
  const defaultBounds = { x: 0, y: 0, width: 1280, height: 720 }
  const size = storage.get('win-size')
  if (size) return size
  storage.set('win-size', defaultBounds)
  return defaultBounds
}

export function saveBounds(bounds: any) {
  storage.set('win-size', bounds)
}
ipcMain.handle('setStorage', (event, data) => {
  storage.set(data.key, data.value)
  console.log(storage.get(data.key))
})
// ipcMain.on('getStorage', (event, args) => {
//   console.log('test', args)
//   event.returnValue = 'blabla'
// })
ipcMain.handle('getStorage', async (event, data) => {
  console.log(window)
  window.webContents.send('asynchronous-message', { SAVED: 'File Saved' })
  const result = data
  return result
})
