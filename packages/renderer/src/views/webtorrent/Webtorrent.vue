<template>
  <div>
    <h1>webtorrent</h1>
    <div class="mt-2">
      <v-btn @click="getTorrents()">get torrents</v-btn>
    </div>
    <v-layout class="mt-2" align-center>
      <v-btn class="mr-3" @click="addTorrentMagnet()">addTorrent by Magnet</v-btn>
      <v-text-field v-model="magnetLink"></v-text-field>
    </v-layout>
    <div class="mt-2">
      <v-btn @click="test()">test</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    // eslint-disable-next-line max-len
    // magnet:?xt=urn:btih:20bd39df1418e70e98acc23729c0624bd8dad031&dn=Antlers.2021.1080p.BluRay.x265-RARBG&tr=http%3a%2f%2ftracker.trackerfix.com%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2770%2fannounce&tr=udp%3a%2f%2f9.rarbg.to%3a2760%2fannounce&tr=udp%3a%2f%2ftracker.tallpenguin.org%3a15770%2fannounce&tr=udp%3a%2f%2ftracker.thinelephant.org%3a12790%2fannounce
    magnetLink:
      'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
  }),
  mounted() {
    // window.api.receiveFromD(data => {
    //   console.log(`Received ${data} from main process`)
    // })
  },
  methods: {
    async getTorrents() {
      console.log('get torrents')
      console.log(await window.api.getTorrents())
    },
    addTorrentMagnet() {
      window.api.addTorrentMagnet(this.magnetLink)
    },
    test() {
      window.api.getStorage('async ping')
    },
  },
}
</script>

<style lang="scss" scoped></style>
