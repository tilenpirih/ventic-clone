import { ipcRenderer, IpcRenderer } from 'electron'
import { exposeInMainWorld } from '@/exposeInMainWorld'

function invoke(channel: string, data: any) {
  ipcRenderer.invoke(channel, data)
}

// function handle(channel: string, callable: Function, event: string, data: any): IpcRenderer {
//   return ipcRenderer.on(channel, callable(event, data))
// }

function handle(channel: string, callable: Function, event: string, data: any): IpcRenderer {
  return ipcRenderer.on(channel, callable(event, data))
}

function setStorage(data: any) {
  ipcRenderer.invoke('setStorage', data)
}

function getStorage(data: any) {
  ipcRenderer.invoke('getStorage', data).then(result => {
    console.log(result)
    return result
  })
}
async function getTorrents() {
  return ipcRenderer.invoke('getTorrents')
}
function addTorrentMagnet(data: any) {
  ipcRenderer.invoke('addTorrentMagnet', data)
}
function test(data: any) {
  console.log('blabla', data)
  // ipcRenderer.on('test', (event, arg) => {
  //   console.log(arg)
  // })
  // ipcRenderer.invoke('test', data)
  return `${data} pa še neki tekst`
}
// function sendSync(channel: string, data: any) {
//   return ipcRenderer.sendSync(channel, data)
// }

// eslint-disable-next-line import/prefer-default-export
export const api = {
  invoke,
  handle,
  setStorage,
  getStorage,
  getTorrents,
  addTorrentMagnet,
  test,
} as const

exposeInMainWorld('api', api)
