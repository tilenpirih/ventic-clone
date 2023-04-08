<template>
  <v-layout>
    <div class="relative wfull mb-3 mx-3">
      <OptionsBar />
      <div ref="wrapper" class="wrapper">
        <div
          v-if="season !== null && show !== null"
          :class="{ wrapperMargin: $vuetify.breakpoint.smAndUp, 'pr-3': wrapperOverflow }"
        >
          <SeasonInfo :season="season" :show="show" />
          <component :is="seasonLayoutType" :id="id" :episodes="season.episodes" class="mt-3" />
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'
import SeasonInfo from '@/views/dashboard/children/shows/children/selectedSeason/components/SeasonInfo.vue'
import OptionsBar from '@/views/dashboard/children/shows/children/selectedSeason/components/OptionsBar.vue'
import CardView from '@/views/dashboard/children/shows/children/selectedSeason/components/CardView.vue'
import TableView from '@/views/dashboard/children/shows/children/selectedSeason/components/TableView.vue'
import DetailTableView from '@/views/dashboard/children/shows/children/selectedSeason/components/DetailTableView.vue'
import Cast from '@/views/dashboard/components/seleceted_media/Cast.vue'

export default {
  components: { SeasonInfo, OptionsBar, Cast, CardView, TableView, DetailTableView },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'selectedEpisode') {
      this.$store.commit('Settings/Appearance/SET_MAIN_BACKGROUND')
    }
    next()
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    seasonNumber: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    season: null,
    show: null,
    mdiClose,
    wrapperOverflow: true,
    wrapperRO: null,
  }),
  computed: {
    seasonLayoutType() {
      return this.$store.state.SelectedMedia.seasonLayoutType
    },
  },
  beforeDestroy() {
    this.wrapperRO.unobserve(this.$refs.wrapper)
  },
  mounted() {
    this.wrapperRO = new ResizeObserver(() => {
      this.onWrapperResize()
    })
    this.wrapperRO.observe(this.$refs.wrapper)
    this.$store
      .dispatch('Shows/getSeasonDetails', { id: this.id, seasonNumber: this.seasonNumber })
      .then(({ data }) => {
        this.season = data
      })
    this.$store.dispatch('Shows/getShowDetails', this.id).then(({ data }) => {
      this.$store.commit(
        'Settings/Appearance/SET_BACKGROUND',
        `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
      )
      this.show = data
    })
  },
  methods: {
    onWrapperResize() {
      if (this.$refs.wrapper.scrollHeight > this.$refs.wrapper.clientHeight) {
        this.wrapperOverflow = true
      } else {
        this.wrapperOverflow = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: auto;
  position: absolute;
  height: auto;
  top: 76px;
  left: 0;
  bottom: 0;
  right: 0;
}
.wrapperMargin {
  padding-left: 64px;
}
</style>
