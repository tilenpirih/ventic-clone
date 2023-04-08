<template>
  <v-layout>
    <div class="relative wfull mb-3 mx-3">
      <OptionsBar />
      <div ref="wrapper" class="wrapper">
        <div
          v-if="episode !== null && show !== null"
          :class="{ wrapperMargin: $vuetify.breakpoint.smAndUp, 'pr-3': wrapperPadding }"
        >
          <EpisodeInfo :episode="episode" :show="show" />
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'
import EpisodeInfo from '@/views/dashboard/children/shows/children/selectedEpisode/components/EpisodeInfo.vue'
import OptionsBar from '@/views/dashboard/children/shows/children/selectedEpisode/components/OptionsBar.vue'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { EpisodeInfo, OptionsBar },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('Settings/Appearance/SET_MAIN_BACKGROUND')
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
    episodeNumber: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    episode: null,
    show: null,
    mdiClose,
    wrapperPadding: true,
    wrapperRO: null,
  }),
  beforeDestroy() {
    this.wrapperRO.unobserve(this.$refs.wrapper)
  },
  mounted() {
    this.wrapperRO = new ResizeObserver(() => {
      this.onWrapperResize()
    })
    this.wrapperRO.observe(this.$refs.wrapper)
    this.$store
      .dispatch('Shows/getEpisodeDetails', {
        id: this.id,
        seasonNumber: this.seasonNumber,
        episodeNumber: this.episodeNumber,
      })
      .then(({ data }) => {
        this.episode = data
        console.log(this.episode)
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
