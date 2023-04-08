export default {
  data: () => ({
    scrollPosition: 0,
  }),
  computed: {
    selectedGenre() {
      return this.$store.state.Shows.selectedGenre
    },
    showType() {
      return this.$store.state.Shows.showType
    },
    infiniteLoadingEnabled() {
      return this.$store.state.Shows.infiniteLoadingEnabled
    },
    timeWindow() {
      return this.$store.state.Shows.timeWindow
    },
  },
  watch: {
    timeWindow() {
      this.$refs.scroller.$el.scrollTop = 0
    },
    showType() {
      this.$refs.scroller.$el.scrollTop = 0
    },
    selectedGenre() {
      this.$refs.scroller.$el.scrollTop = 0
    },
  },
  beforeDestroy() {
    this.$store.commit('Shows/SET_SCROLL_POSITION', {
      layout: this.$options.name,
      position: this.scrollPosition,
    })
  },
  methods: {
    infiniteHandler($state) {
      if (this.showType === 'trending') {
        this.$store
          .dispatch('Shows/getShows', {
            timeWindow: this.timeWindow,
            showType: this.showType,
          })
          .then(() => {
            $state.loaded()
          })
          .catch(() => {
            $state.complete()
          })
      } else {
        this.$store
          .dispatch('Shows/getShows', {
            selectedGenre: this.selectedGenre.id,
            showType: this.showType,
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
