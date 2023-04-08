export default {
  data: () => ({
    scrollPosition: 0,
  }),
  computed: {
    selectedGenre() {
      return this.$store.state.Movies.selectedGenre
    },
    movieType() {
      return this.$store.state.Movies.movieType
    },
    infiniteLoadingEnabled() {
      return this.$store.state.Movies.infiniteLoadingEnabled
    },
    timeWindow() {
      return this.$store.state.Movies.timeWindow
    },
  },
  watch: {
    timeWindow() {
      this.$refs.scroller.$el.scrollTop = 0
    },
    movieType() {
      this.$refs.scroller.$el.scrollTop = 0
    },
    selectedGenre() {
      this.$refs.scroller.$el.scrollTop = 0
    },
  },
  beforeDestroy() {
    this.$store.commit('Movies/SET_SCROLL_POSITION', {
      layout: this.$options.name,
      position: this.scrollPosition,
    })
  },
  methods: {
    infiniteHandler($state) {
      if (this.movieType === 'trending') {
        this.$store
          .dispatch('Movies/getMovies', {
            timeWindow: this.timeWindow,
            movieType: this.movieType,
          })
          .then(() => {
            $state.loaded()
          })
          .catch(() => {
            $state.complete()
          })
      } else {
        this.$store
          .dispatch('Movies/getMovies', {
            selectedGenre: this.selectedGenre.id,
            movieType: this.movieType,
          })
          .then(() => {
            $state.loaded()
          })
          .catch(() => {
            $state.complete()
          })
      }
    },
    scroll() {
      this.scrollPosition = this.$refs.scroller.$el.scrollTop
    },
  },
}
