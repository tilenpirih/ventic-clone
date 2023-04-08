<template>
  <v-app dark>
    <Background />
    <SystemBar />
    <v-main>
      <v-container fluid fill-height class="pa-0">
        <v-layout column>
          <AppBar class="mx-3 mt-3" />
          <router-view />
          <!-- <Player /> -->
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/views/dashboard/components/AppBar.vue'
import Background from '@/components/Background.vue'
import Player from '@/components/player/Player.vue'
import SystemBar from './components/SystemBar.vue'
// const ipc = require('electron').ipcRenderer

export default {
  name: 'App',
  components: { SystemBar, AppBar, Background },
  async mounted() {
    // console.log(window.api.setStorage({ key: 'neki', value: 'neki' }))
    // this.test()
    // console.log(await window.api.getStorage({ key: 'neki', value: 'neki' }))
  },
  methods: {
    async test() {
      const result = await window.api.getStorage('test')
      // console.log(result)
      // console.log(window.api.handle('storage-get', 'win-size'))
      // console.log(result)
      // window.api.handle('storage-set', { test: 'test' })
    },
  },
}
</script>

<style lang="scss">
::v-deep .v-list-item--active::before {
  opacity: 0 !important;
}
// this don't work in scoped
.v-dialog {
  box-shadow: none !important;
}
body > div > .v-overlay {
  backdrop-filter: none !important;
}
body > div > .v-overlay--active > .v-overlay__scrim {
  opacity: 1 !important;
  background-color: rgba(33, 33, 33, 0.64) !important;
  backdrop-filter: blur(6px) !important;
}
</style>
