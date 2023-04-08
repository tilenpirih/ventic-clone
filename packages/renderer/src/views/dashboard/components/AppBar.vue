<template>
  <v-app-bar height="64" :style="transparentPanel" elevation="0" class="rounded pl-2">
    <v-btn v-if="mainRoute === '/dashboard'" large icon @click.stop="openCloseMenu()">
      <v-icon :style="transparentText">{{ mdiMenu }}</v-icon>
    </v-btn>
    <v-btn v-else large icon @click.stop="toDashboard()">
      <v-icon :style="transparentText">{{ mdiHome }}</v-icon>
    </v-btn>
    <v-text-field
      v-if="mainRoute === '/settings'"
      v-model="settingsSearch"
      hide-details
      filled
      dense
      rounded
      clearable
      placeholder="Settings search"
      class="ml-3"
      color="secondary"
    >
      <template #prepend-inner>
        <v-icon :style="transparentText" class="ml-n3 mr-1">{{ mdiMagnify }}</v-icon>
      </template>
    </v-text-field>
    <v-text-field
      v-else
      v-model="search"
      v-debounce:400ms.cancelonempty="searchMedia"
      hide-details
      clearable
      filled
      dense
      rounded
      :placeholder="$t('dashboard.components.appbar.Search')"
      class="ml-3"
    >
      <template #prepend-inner>
        <v-icon :style="transparentText" class="ml-n3 mr-1">{{ mdiMagnify }}</v-icon>
      </template>
    </v-text-field>

    <v-spacer />
    <v-btn large icon class="ml-2" to="/webtorrent">
      <v-icon :style="transparentText">{{ mdiDownload }}</v-icon>
    </v-btn>
    <v-btn large icon class="mx-2">
      <v-icon :style="transparentText"> {{ mdiBell }}</v-icon>
    </v-btn>
    <v-menu
      v-model="accountMenu"
      bottom
      left
      class="mt-3"
      dark
      min-width="200px"
      rounded
      offset-y
      origin="top right"
      transition="slide-y-transition"
    >
      <!--eslint-disable-next-line vue/no-unused-vars-->
      <template #activator="{ on, attrs }">
        <v-btn
          :ripple="false"
          height="48"
          width="80"
          color="transparent"
          elevation="0"
          class="pa-0 mr-n3 accountMenuButton"
          :class="{ accountMenuActivated: accountMenu }"
          @click="accountMenu = true"
        >
          <v-avatar width="44" height="44">
            <img
              src="https://cdn.discordapp.com/avatars/254138818351988737/25c4bfff79201ec6e7419f19785c29b2.webp"
              alt="Profile"
            />
          </v-avatar>
          <v-icon :style="transparentText">
            {{ mdiMenuDown }}
          </v-icon>
        </v-btn>
      </template>
      <v-card :style="transparentMenu">
        <v-list nav class="transparent">
          <v-list-item-group v-model="accountMenu">
            <span class="ml-2" :style="transparentText">Username</span>
            <v-list-item dense class="mt-1">
              <span :style="transparentText">Account</span>
            </v-list-item>
            <v-divider />
            <v-list-item dense class="mt-1" @click="toSettings()">
              <span :style="transparentText">Settings</span>
            </v-list-item>
            <v-list-item dense>
              <span :style="transparentText">Keyboard shortcuts</span>
            </v-list-item>
            <v-list-item dense>
              <span :style="transparentText"> About</span>
            </v-list-item>
            <!-- TODO implement divider color 0.12 opacity -->
            <v-divider />
            <v-list-item dense class="mt-1">
              <span :style="transparentText"> Switch user</span>
            </v-list-item>
            <v-list-item dense>
              <span :style="transparentText"> Sign out</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- <v-btn to="/settings">test</v-btn> -->
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { getDirective } from 'vue-debounce'
import { mdiDownload, mdiMagnify, mdiBell, mdiMenu, mdiMenuDown, mdiHome } from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'
import transparentMenu from '@/mixins/transparentMenu'
import transparentPanel from '@/mixins/transparentPanel'

export default {
  directives: {
    debounce: getDirective(),
  },
  mixins: [transparentText, transparentMenu, transparentPanel],
  data: () => ({
    accountMenu: false,
    settingsSearch: '',
    mdiDownload,
    mdiMagnify,
    mdiBell,
    mdiMenu,
    mdiMenuDown,
    mdiHome,
  }),
  computed: {
    miniDrawer() {
      return this.$store.state.Dashboard.miniDrawer
    },
    appBarStyle() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary}B3 !important`
    },
    mainRoute() {
      return this.$route.matched[0].path
    },
    search: {
      get() {
        return this.$store.state.Search.searchQuery
      },
      set(val) {
        this.$store.commit('Search/SET_SEARCH_QUERY', val)
      },
    },
  },
  methods: {
    openCloseMenu() {
      if (this.$vuetify.breakpoint.xsOnly) {
        this.$store.commit('Dashboard/SET_DIALOG', true)
      } else {
        this.$store.commit('Dashboard/SET_MINI_DRAWER', !this.miniDrawer)
      }
    },
    toDashboard() {
      this.$router.push('/dashboard')
    },
    searchMedia(val) {
      if (this.$route.fullPath !== `/dashboard/search/${val}`) {
        this.$router.push({ name: 'search', params: { query: val } })
      }
    },
    toSettings() {
      this.$router.push('/settings')
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-app-bar {
  max-height: 64px;
}
::v-deep.v-menu__content {
  margin-top: 20px;
}
::v-deep.v-input {
  max-width: 300px;
}
::v-deep.theme--dark.v-list-item--active::before {
  opacity: 0;
}
// hover icons
::v-deep.v-btn--icon:hover > span > span {
  color: var(--v-text-base) !important;
}
// search icon
::v-deep.v-input--is-focused span {
  color: var(--v-text-base) !important;
}

::v-deep.v-btn--active::before {
  opacity: 0 !important;
}
.accountMenuButton:before {
  content: none;
}
.accountMenuButton:hover span {
  color: var(--v-text-base) !important;
}
.accountMenuActivated span {
  transform: rotate(-180deg);
  color: var(--v-primary-base) !important;
}
.accountMenuActivated:hover span {
  color: var(--v-primary-base) !important;
}
</style>
