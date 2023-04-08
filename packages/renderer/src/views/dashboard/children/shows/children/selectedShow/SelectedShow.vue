<template>
  <v-layout>
    <div class="relative wfull mb-3 mx-3">
      <OptionsBar />
      <div ref="wrapper" class="wrapper">
        <div
          v-if="show !== null"
          :class="{ wrapperMargin: $vuetify.breakpoint.smAndUp, 'pr-3': wrapperPadding }"
        >
          <ShowInfo :show="show" class="mb-3" />
          <component :is="showLayoutType" :id="show.id" :seasons="show.seasons" />
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'
import OptionsBar from '@/views/dashboard/children/shows/children/selectedShow/components/OptionsBar.vue'
import ShowInfo from '@/views/dashboard/children/shows/children/selectedShow/components/ShowInfo.vue'
import CardView from '@/views/dashboard/children/shows/children/selectedShow/components/CardView.vue'
import TableView from '@/views/dashboard/children/shows/children/selectedShow/components/TableView.vue'
import DetailTableView from '@/views/dashboard/children/shows/children/selectedShow/components/DetailTableView.vue'

export default {
  components: { ShowInfo, OptionsBar, CardView, TableView, DetailTableView },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'selectedSeason' && to.name !== 'selectedEpisode') {
      this.$store.commit('Settings/Appearance/SET_MAIN_BACKGROUND')
    }
    next()
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    show: null,
    mdiClose,
    wrapperPadding: true,
    wrapperRO: null,
  }),
  computed: {
    showLayoutType() {
      return this.$store.state.SelectedMedia.showLayoutType
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
        this.wrapperPadding = true
      } else {
        this.wrapperPadding = false
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
