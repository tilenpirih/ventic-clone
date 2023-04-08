import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { join } from 'path'
import { URL } from 'url'

import trayIcon from '../assets/tray/tray_icon.png'
import { getWinSettings, saveBounds } from './storage'

let tray: Tray

async function createWindow() {
  const icon = nativeImage.createFromDataURL(trayIcon)
  const bounds = getWinSettings()
  const browserWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: 0,
    y: 0,
    center: true,
    frame: false,
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
    icon,
  })

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([{ type: 'separator' }, { role: 'quit' }])
  tray.setToolTip('Ventic')
  tray.setContextMenu(contextMenu)
  tray
    .on('double-click', () => {
      browserWindow.show()
    })
    .on('click', () => {
      browserWindow.show()
    })

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show()
    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools()
    }
  })

  browserWindow.on('close', () => {
    saveBounds(browserWindow.getContentBounds())
  })
  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', `file://${__dirname}`).toString()
  await browserWindow.loadURL(pageUrl)
  return browserWindow
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
// eslint-disable-next-line import/no-mutable-exports
let window = null
// eslint-disable-next-line import/prefer-default-export
export async function restoreOrCreateWindow() {
  window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined) {
    window = await createWindow()
  }

  if (window.isMinimized()) {
    window.restore()
  }

  window.focus()
}
export { window }
