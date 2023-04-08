<template>
  <v-dialog v-model="dialog">
    <v-layout justify-center @click="dialog = false">
      <v-card flat class="transparent" width="50%" min-width="200">
        <v-list style="width: 100%" nav class="transparent">
          <v-list-item v-for="(tab, index) in tabs" :key="index" router :to="tab.route">
            <v-icon>{{ tab.icon }}</v-icon>
            <span class="ml-2">{{ tab.title }}</span>
          </v-list-item>
        </v-list>
      </v-card>
    </v-layout>
  </v-dialog>
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

export default {
  data: () => ({
    mini: false,
    tabs: [
      { title: 'Home', icon: mdiHomeOutline, route: '/dashboard/home' },
      { title: 'Movies', icon: mdiFilmstrip, route: '/dashboard/movies' },
      { title: 'TV Series', icon: mdiTelevision, route: '/dashboard/shows' },
      {
        title: 'Favourites',
        icon: mdiHeartOutline,
        route: '/dashboard/favourites',
      },
      { title: 'History', icon: mdiHistory, route: '/dashboard/history' },
      { title: 'Watch together', icon: mdiAccountGroup, route: '/settings' },
    ],
  }),
  computed: {
    dialog: {
      get() {
        return this.$store.state.Dashboard.dialog
      },
      set(value) {
        this.$store.commit('Dashboard/SET_DIALOG', value)
      },
    },
  },
  beforeDestroy() {
    this.$store.commit('Dashboard/SET_DIALOG', false)
  },
}
</script>

<style lang="scss" scoped>
// .v-overlay__scrim {
//   opacity: 1 !important;
//   background-color: rgba(33, 33, 33, 0.64) !important;
//   backdrop-filter: blur(5px) !important;
// }
// this for some reason don't work
// ::v-deep.v-list{
//   background: transparent !important;
//   box-shadow: none !important;
// }
::v-deep.v-dialog {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
</style>
