<template>
  <v-navigation-drawer
    :mini-variant="miniDrawer"
    floating
    permanent
    class="rounded drawer ml-3"
    disable-resize-watcher
    touchless
    :class="{ miniDrawer: miniDrawer }"
    width="0"
    :style="transparentPanel"
  >
    <v-tabs vertical :class="{ disableSlider: hideTabSlider }">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        class="justify-start text-none"
        :to="tab.route"
      >
        <v-icon left :style="transparentText">
          {{ tab.icon }}
        </v-icon>
        <span v-if="!miniDrawer" :style="transparentText">
          {{ $t(`dashboard.components.drawer.${tab.title}`) }}
        </span>
      </v-tab>
    </v-tabs>
    <template #append>
      <v-layout v-if="!miniDrawer" justify-center class="pa-3">
        <v-btn color="primary" outlined class="text-none" to="/settings">
          <span>{{ $t('dashboard.components.drawer.WatchTogether') }}</span>
        </v-btn>
      </v-layout>
      <v-btn
        v-else
        block
        class="mb-3"
        elevation="0"
        color="transparent"
        style="justify-content: start"
      >
        <v-icon color="primary">{{ mdiAccountGroup }} </v-icon>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiHomeOutline,
  mdiFilmstrip,
  mdiTelevision,
  mdiHeartOutline,
  mdiHistory,
  mdiAccountGroup,
} from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'
import transparentPanel from '@/mixins/transparentPanel'

export default {
  mixins: [transparentText, transparentPanel],
  data: () => ({
    mini: false,
    mdiAccountGroup,
    tabs: [
      { title: 'Home', icon: mdiHomeOutline, route: '/dashboard/home' },
      { title: 'Movies', icon: mdiFilmstrip, route: '/dashboard/movies' },
      { title: 'TVSeries', icon: mdiTelevision, route: '/dashboard/shows' },
      { title: 'Favourites', icon: mdiHeartOutline, route: '/dashboard/favourites' },
      { title: 'History', icon: mdiHistory, route: '/dashboard/history' },
    ],
  }),
  computed: {
    miniDrawer() {
      return this.$store.state.Dashboard.miniDrawer
    },
    hideTabSlider() {
      if (this.$route.name === 'search') {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer {
  min-width: 220px;
  transition-duration: 0.2s, 0.3s;
  transition-property: background-color, min-width;
}
.miniDrawer {
  min-width: 56px;
  background-color: transparent !important;
  transition-delay: 0.2s, 0s;
  transition-duration: 1s, 0.3s;
  transition-property: background-color, min-width;
}
::v-deep ::-webkit-scrollbar {
  width: 0px !important;
}
::v-deep ::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0) !important;
  background-clip: padding-box !important;
  border-radius: 20px !important;
}
::v-deep .v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
::v-deep
  .disableSlider
  > .v-item-group
  > .v-slide-group__wrapper
  > .v-slide-group__content
  > .v-tabs-slider-wrapper {
  width: 0px !important;
  background-color: green;
}
</style>
