<template>
  <v-navigation-drawer
    id="drawer"
    floating
    permanent
    class="rounded drawer ml-3 hidden-xs-only"
    disable-resize-watcher
    touchless
    width="0"
    :style="transparentPanel"
  >
    <v-tabs vertical>
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        class="justify-start text-none"
        :to="tab.route"
      >
        <v-icon :style="transparentText" left>
          {{ tab.icon }}
        </v-icon>
        <span :style="transparentText">
          {{ tab.title }}
        </span>
      </v-tab>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiAccount,
  mdiBackspace,
  mdiPalette,
  mdiAccessPointNetwork,
  mdiDatabase,
  mdiSubtitles,
  mdiDiscPlayer,
  mdiHelpCircle,
  mdiCashMultiple,
  mdiTrayArrowDown,
} from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'
import transparentPanel from '@/mixins/transparentPanel'

export default {
  mixins: [transparentText, transparentPanel],
  data: () => ({
    mini: false,
    mdiBackspace,
    tabs: [
      { title: 'Account', icon: mdiAccount, route: '/settings/account' },
      { title: 'Appearance', icon: mdiPalette, route: '/settings/appearance' },
      { title: 'Network', icon: mdiAccessPointNetwork, route: '/settings/network' },
      { title: 'Storage', icon: mdiDatabase, route: '/settings/storage' },
      { title: 'Subtitles', icon: mdiSubtitles, route: '/settings/subtitles' },
      { title: 'Player', icon: mdiDiscPlayer, route: '/settings/player' },
      { title: 'Scraping', icon: mdiHelpCircle, route: '/settings/scraping' },
      { title: 'Support devs', icon: mdiCashMultiple, route: '/settings/supportDevs' },
      { title: 'Updates', icon: mdiTrayArrowDown, route: '/settings/updates' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.drawer {
  min-width: 220px;
  transition-duration: 0.2s, 0.3s;
  transition-property: background-color, min-width;
}
::v-deep div.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px !important;
}
::v-deep div.drawer.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0) !important;
  background-clip: padding-box !important;
  border-radius: 20px !important;
}
::v-deep .v-tabs > .v-tabs-bar {
  $test2: #262626;
  background-color: transparent !important;
}
</style>
