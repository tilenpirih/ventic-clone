<template>
  <v-layout justify-end align-center class="pa-3 pb-2">
    <Slider class="mr-3" />
    <v-menu
      v-model="layoutMenu"
      bottom
      left
      class="mr-2"
      dark
      min-width="250px"
      rounded
      offset-y
      origin="top right"
      transition="slide-y-transition"
    >
      <!-- eslint-disable-next-line vue/no-unused-vars-->
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
  </v-layout>
</template>

<script>
import { mdiMenuDown, mdiTable, mdiTableBorder } from '@mdi/js'
import transparentMenu from '@/mixins/transparentMenu'
import transparentText from '@/mixins/transparentTextColor'
import Slider from '@/components/HorizontalCardWidth.vue'

export default {
  components: { Slider },
  mixins: [transparentMenu, transparentText],
  data: () => ({
    layoutMenu: false,
    selectedLayout: 0,
    layouts: [
      { name: 'Grid view', componentName: 'Grid', icon: '$grid' },
      { name: 'Detail grid view', componentName: 'DetailGrid', icon: '$detailGrid' },
    ],
    mdiMenuDown,
    mdiTable,
    mdiTableBorder,
  }),
  computed: {
    layoutType() {
      return this.$store.state.Home.layoutType
    },
  },
  created() {
    this.selectedLayout = this.layouts.findIndex(layout => layout.componentName === this.layoutType)
  },

  methods: {
    changeLayoutType(layout) {
      this.$store.commit('Home/SET_LAYOUT_TYPE', layout)
    },
  },
}
</script>
<style lang="scss" scoped>
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
</style>
