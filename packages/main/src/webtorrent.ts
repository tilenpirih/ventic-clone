import { ipcMain } from 'electron'
// @ts-ignore
const wrtc = require('wrtc')
// @ts-ignore
globalThis.WEBTORRENT_ANNOUCE = [
  ['wss://tracker.btorrent.xyz'],
  ['wss://tracker.openwebtorrent.com'],
]

const WebTorrent = require('webtorrent')

// const torrentId =
//   'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

const webTorrent = new WebTorrent({
  tracker: { wrtc },
})
// eslint-disable-next-line import/prefer-default-export
export async function init() {
  // console.log(`WebTorrent version: ${WebTorrent.VERSION}`)
  // console.log(`WebTorrent RTC support: ${WebTorrent.WEBRTC_SUPPORT}`)
  // console.log(`WebTorrent UTP support: ${WebTorrent.UTP_SUPPORT}`)
  // webTorrent.add(torrentId, (torrent: any) => {
  //   torrent.wires.forEach((wire: any) => {
  //     console.log(wire.type)
  //   })
  //   torrent.on('wire', (wire: any) => {
  //     console.log(wire.type)
  //   })
  // })
}
ipcMain.on('getTorrents', () => {
  console.log(webTorrent.torrents)
  // console.log(webTorrent.downloadSpeed)
  // console.log(webTorrent.progress)
  return 'hello'
})

ipcMain.handle('addTorrentMagnet', (event, torrentId) => {
  console.log('added torrent')
  webTorrent.add(torrentId, (torrent: any) => {
    torrent.wires.forEach((wire: any) => {
      console.log(wire.type)
    })
    torrent.on('ready', () => {
      console.log('ready')
    })
    torrent.on('wire', (wire: any) => {
      console.log(wire.type)
    })
    torrent.on('verify', () => {
      console.log('verify')
    })
    torrent.on('error', (err: any) => {
      console.log(err)
    })
    // torrent.on options

    torrent.on('download', (bytes: number) => {
      console.log(bytes)
    })
    // torrent.on('done', () => {
    //   console.log('done')
    // })
  })
})
