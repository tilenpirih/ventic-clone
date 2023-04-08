<template>
  <v-layout>
    <div class="relative wfull mb-3 mx-3">
      <OptionsBar />
      <div ref="wrapper" class="wrapper">
        <div
          v-if="movie !== null"
          :class="{ wrapperMargin: $vuetify.breakpoint.smAndUp, 'pr-3': wrapperPadding }"
        >
          <MovieInfo :movie="movie" />
          <Cast :cast="movie.credits.cast" class="mt-5" />
          <SimilarMovies :movies="movie.similar.results" class="mt-5" />
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'
import MovieInfo from '@/views/dashboard/children/movies/children/selectedMovie/components/MovieInfo.vue'
import OptionsBar from '@/views/dashboard/children/movies/children/selectedMovie/components/OptionsBar.vue'
import Cast from '@/views/dashboard/components/seleceted_media/Cast.vue'
import SimilarMovies from '@/views/dashboard/components/seleceted_media/SimilarMovies.vue'
// import ChooseTorrent from '@/components/ChooseTorrent.vue'

export default {
  components: { MovieInfo, OptionsBar, Cast, SimilarMovies },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('Settings/Appearance/SET_MAIN_BACKGROUND')
    next()
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    movie: null,
    mdiClose,
    wrapperPadding: true,
    wrapperRO: null,
  }),
  // computed: {
  //   torrentSelection() {
  //     return this.$store.state.SelectedMedia.torrentSelection
  //   },
  // },
  beforeDestroy() {
    this.wrapperRO.unobserve(this.$refs.wrapper)
  },
  mounted() {
    this.wrapperRO = new ResizeObserver(() => {
      this.onWrapperResize()
    })
    this.wrapperRO.observe(this.$refs.wrapper)
    this.$store.dispatch('Movies/getMovieDetails', this.id).then(({ data }) => {
      this.$store.commit(
        'Settings/Appearance/SET_BACKGROUND',
        `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
      )
      this.movie = data
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
