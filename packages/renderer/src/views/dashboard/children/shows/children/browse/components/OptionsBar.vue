<template>
  <v-layout justify-space-between class="pa-3 pb-2">
    <div>
      <v-layout align-center>
        <v-menu
          v-model="showTypeMenu"
          bottom
          right
          class="mr-2"
          dark
          min-width="250px"
          rounded
          offset-y
          origin="top left"
          transition="slide-y-transition"
        >
          <!--eslint-disable-next-line vue/no-unused-vars-->
          <template #activator="{ on, attrs }">
            <v-btn
              :ripple="false"
              height="32"
              color="transparent"
              elevation="0"
              class="pa-0 mr-2 menuButton text-none"
              @click="showTypeMenu = true"
            >
              <span class="text--text">{{ showTypes[selectedType].text }}</span>
              <v-icon style="color: var(--v-text-base)" :class="{ menuActivated: showTypeMenu }">
                {{ mdiMenuDown }}
              </v-icon>
            </v-btn>
          </template>
          <v-card :style="transparentMenu">
            <v-list nav class="pa-3" color="transparent">
              <v-list-item-group v-model="selectedType" mandatory>
                <v-list-item
                  v-for="(type, index) in showTypes"
                  :key="index"
                  dense
                  @click="changeShowType(type.value)"
                >
                  <span :style="transparentText">{{ type.text }}</span>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu
          v-if="genres !== null && showType !== 'trending'"
          v-model="genreMenu"
          bottom
          right
          class="mr-2"
          dark
          min-width="250px"
          max-height="400"
          rounded
          offset-y
          origin="top left"
          transition="slide-y-transition"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars-->
          <template #activator="{ on, attrs }">
            <v-btn
              :ripple="false"
              height="32"
              color="transparent"
              elevation="0"
              class="pa-0 mr-2 menuButton text-none"
              @click="genreMenu = true"
            >
              <span class="text--text">{{ genres[selectedGenreIndex].name }}</span>
              <v-icon style="color: var(--v-text-base)" :class="{ menuActivated: genreMenu }">
                {{ mdiMenuDown }}
              </v-icon>
            </v-btn>
          </template>
          <v-card class="menuCardHeight" :style="transparentMenu">
            <v-list nav class="pa-3" color="transparent">
              <v-list-item-group v-model="selectedGenreIndex" mandatory>
                <v-list-item
                  v-for="(genre, index) in genres"
                  :key="index"
                  dense
                  @click="changeGenre(genre)"
                >
                  <span :style="transparentText">{{ genre.name }}</span>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu
          v-if="showType === 'trending'"
          v-model="timeWindowMenu"
          bottom
          right
          class="mr-2"
          dark
          min-width="250px"
          max-height="400"
          rounded
          offset-y
          origin="top left"
          transition="slide-y-transition"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars-->
          <template #activator="{ on, attrs }">
            <v-btn
              :ripple="false"
              height="32"
              color="transparent"
              elevation="0"
              class="pa-0 mr-2 menuButton text-none"
              @click="timeWindowMenu = true"
            >
              <span class="text--text">{{ timeWindows[selectedTimeWindow].name }}</span>
              <v-icon style="color: var(--v-text-base)" :class="{ menuActivated: timeWindowMenu }">
                {{ mdiMenuDown }}
              </v-icon>
            </v-btn>
          </template>
          <v-card :style="transparentMenu">
            <v-list nav class="pa-3" color="transparent">
              <v-list-item-group v-model="selectedTimeWindow" mandatory>
                <v-list-item
                  v-for="(time, index) in timeWindows"
                  :key="index"
                  dense
                  @click="changeTimeWindow(time)"
                >
                  <span :style="transparentText">{{ time.name }}</span>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </v-layout>
    </div>
    <v-layout justify-end align-center>
      <Slider v-if="selectedLayout < 2" class="mr-3" />
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
        <!--eslint-disable-next-line vue/no-unused-vars-->
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
  </v-layout>
</template>

<script>
import { mdiMenuDown, mdiFormatListBulletedSquare } from '@mdi/js'
import transparentMenu from '@/mixins/transparentMenu'
import transparentText from '@/mixins/transparentTextColor'
import Slider from '@/components/ChangeGridCardWidth.vue'

export default {
  components: { Slider },
  mixins: [transparentMenu, transparentText],
  data: () => ({
    layoutMenu: false,
    showTypeMenu: false,
    genreMenu: false,
    timeWindowMenu: false,
    selectedLayout: 0,
    selectedType: 0,
    selectedGenreIndex: 0,
    selectedTimeWindow: 0,
    layouts: [
      { name: 'Grid view', componentName: 'GridView', icon: '$grid' },
      { name: 'Detail grid view', componentName: 'DetailGridView', icon: '$detailGrid' },
      { name: 'Table view', componentName: 'TableView', icon: '$table' },
      {
        name: 'Detail Table view',
        componentName: 'DetailTableView',
        icon: mdiFormatListBulletedSquare,
      },
    ],
    showTypes: [
      { text: 'Popular', value: 'popular' },
      { text: 'Trending', value: 'trending' },
      { text: 'Top rated', value: 'top_rated' },
      // { text: 'Upcomig', value: 'upcoming' },
    ],
    timeWindows: [
      { name: 'Day', value: 'day' },
      { name: 'Week', value: 'week' },
    ],
    mdiMenuDown,
  }),
  computed: {
    minCardWidth: {
      get() {
        return this.$store.state.Shows.minCardWidth
      },
      set(value) {
        this.$store.commit('Shows/SET_MIN_CARD_WIDTH', value)
      },
    },
    layoutType() {
      return this.$store.state.Shows.layoutType
    },
    showType() {
      return this.$store.state.Shows.showType
    },
    timeWindow() {
      return this.$store.state.Shows.timeWindow
    },
    genres() {
      return this.$store.state.Shows.genres
    },
    selectedGenre() {
      return this.$store.state.Shows.selectedGenre
    },
  },
  created() {},
  async mounted() {
    this.selectedLayout = this.layouts.findIndex(layout => layout.componentName === this.layoutType)
    this.selectedType = this.showTypes.findIndex(type => type.value === this.showType)
    this.selectedTimeWindow = this.timeWindows.findIndex(time => time.value === this.timeWindow)
    if (!this.genres) {
      await this.$store.dispatch('Shows/getGenres')
    }
    this.selectedGenreIndex = await this.genres.findIndex(
      genre => genre.id === this.selectedGenre.id
    )
  },
  methods: {
    changeLayoutType(layout) {
      this.$store.commit('Shows/SET_LAYOUT_TYPE', layout)
    },
    changeShowType(type) {
      this.$store.commit('Shows/SET_SHOW_TYPE', type)
    },
    changeGenre(genre) {
      this.$store.commit('Shows/SET_GENRE', genre)
    },
    changeTimeWindow(timeWindow) {
      this.$store.commit('Shows/SET_TIME_WINDOW', timeWindow.value)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-menu__content {
  background-color: transparent !important;
  backdrop-filter: blur(4px);
}
.menuActivated {
  transform: rotate(-180deg);
  color: var(--v-primary-base) !important;
}
.menuButton:before {
  content: none;
}
::v-deep.v-list--dense {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 16px;
}
::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 20px;
}
</style>
