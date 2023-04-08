<template>
  <v-layout justify-space-between class="py-3 px-3">
    <v-layout justify-end align-center>
      <v-slider
        v-if="selectedLayout === 0"
        v-model="seasonCardWidth"
        step="10"
        min="250"
        max="400"
        hide-details
        class="mr-3"
        style="max-width: 200px; min-width: 80px"
      >
      </v-slider>
      <v-menu
        v-model="layoutMenu"
        bottom
        left
        dark
        min-width="250px"
        rounded
        offset-y
        origin="top right"
        transition="slide-y-transition"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template #activator="{ on, attrs }">
          <v-btn
            :ripple="false"
            height="32"
            width="60"
            color="transparent"
            elevation="0"
            class="pa-0 mr-n3 menuButton"
            @click="layoutMenu = true"
          >
            <v-icon color="text"> {{ layouts[selectedLayout].icon }} </v-icon>
            <v-icon :class="{ menuActivated: layoutMenu }" style="color: var(--v-text-base)">
              {{ mdiMenuDown }}
            </v-icon>
          </v-btn>
        </template>
        <v-card :style="transparentMenu">
          <v-list nav class="pa-3" color="transparent">
            <v-list-item-group v-model="selectedLayout" mandatory>
              <v-list-item
                v-for="(layout, index) in layouts"
                :key="index"
                dense
                @click="changeLayoutType(layout.componentName)"
              >
                <v-icon class="mr-2" :style="transparentText">{{ layout.icon }}</v-icon>
                <span :style="transparentText">{{ layout.name }}</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn class="ml-2" large icon @click="goBack()">
        <v-icon large color="text">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import { mdiClose, mdiMenuDown, mdiFormatListBulletedSquare } from '@mdi/js'
import transparentMenu from '@/mixins/transparentMenu'
import transparentText from '@/mixins/transparentTextColor'

export default {
  mixins: [transparentMenu, transparentText],
  data: () => ({
    mdiClose,
    mdiMenuDown,
    layoutMenu: false,
    selectedLayout: 0,
    layouts: [
      { name: 'Card view', componentName: 'CardView', icon: '$grid' },
      { name: 'Table view', componentName: 'TableView', icon: '$table' },
      {
        name: 'Detail Table view',
        componentName: 'DetailTableView',
        icon: mdiFormatListBulletedSquare,
      },
    ],
  }),
  computed: {
    seasonCardWidth: {
      get() {
        return this.$store.state.SelectedMedia.seasonCardWidth
      },
      set(value) {
        this.$store.commit('SelectedMedia/SET_SEASON_CARD_WIDTH', value)
      },
    },
    seasonLayoutType() {
      return this.$store.state.SelectedMedia.seasonLayoutType
    },
  },
  mounted() {
    this.selectedLayout = this.layouts.findIndex(
      layout => layout.componentName === this.seasonLayoutType
    )
  },

  methods: {
    changeLayoutType(layout) {
      this.$store.commit('SelectedMedia/SET_SEASON_LAYOUT_TYPE', layout)
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-menu__content {
  background-color: rgba(33, 33, 33, 0.85) !important;
  backdrop-filter: blur(4px);
}
.menuActivated {
  transform: rotate(-180deg);
  color: var(--v-primary-base) !important;
}
.menuButton:before {
  background-color: transparent !important;
}
::v-deep.v-list--dense {
  background-color: transparent;
}
::v-deep.menuable__content__active {
  background-color: rgba(33, 33, 33, 0.85) !important;
  backdrop-filter: blur(4px);
}
</style>
