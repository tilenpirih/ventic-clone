<template>
  <div>
    <v-layout justify-space-between class="pl-3 title">
      <span class="text--text">Popular movies</span>
      <div class="mr-3">
        <v-btn large icon class="pr-1" @click="scrollLeft()">
          <v-icon large color="text">{{ mdiChevronLeft }}</v-icon>
        </v-btn>
        <v-btn large icon @click="scrollRight()">
          <v-icon large color="text">{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <RecycleScroller
      ref="scroller"
      v-slot="{ item }"
      class="scroller"
      direction="horizontal"
      :items="movies"
      :item-size="cardWidth + 12"
      key-field="id"
      :style="`height:${scrollerHeight}px; ${scrollStyle}`"
      @scroll.native="scroll()"
    >
      <component
        :is="layoutType"
        v-if="item.id !== true"
        :movie="item"
        :card-width="cardWidth"
        class="ma-1"
      />
      <v-card
        v-else
        :width="cardWidth"
        :height="(cardWidth * 3) / 2"
        elevation="0"
        class="transparent ma-1 infiniteLoadingWrapper"
      >
        <infinite-loading
          v-if="showInfiniteLoading"
          spinner="waveDots"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </v-card>
    </RecycleScroller>
  </div>
</template>

<script>
import sleep from '@/mixins/sleep'
import InfiniteLoading from 'vue-infinite-loading'
import Grid from '@/views/dashboard/components/layout_components/movie/GridCard.vue'
import DetailGrid from '@/views/dashboard/components/layout_components/movie/DetailGridCard.vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Grid, DetailGrid, RecycleScroller, InfiniteLoading },
  mixins: [sleep],
  data: () => ({
    showInfiniteLoading: false,
    model: null,
    scrollPosition: 0,
    mdiChevronRight,
    mdiChevronLeft,
  }),
  computed: {
    movies() {
      try {
        const movies = JSON.parse(
          JSON.stringify(this.$store.state.Movies.movies.popular.all.results)
        )
        movies.push({ id: true })
        return movies
      } catch (e) {
        return [{ id: true }]
      }
    },
    cardWidth() {
      return this.$store.state.Settings.Appearance.horizontalCardWidth
    },
    layoutType() {
      return this.$store.state.Home.layoutType
    },
    scrollerHeight() {
      if (this.layoutType === 'Grid') {
        return (this.cardWidth * 3) / 2 + 28
      }
      return (this.cardWidth * 3) / 2 + 76
    },
    scrollStyle() {
      // TODO this uses a lot of resources because it's executed on every scroll.
      // Find a better solution in the future
      if (this.scrollPosition < 4) {
        return `width: calc(100% - ${this.scrollPosition + 8}px);
              margin-left: ${this.scrollPosition + 8}px;`
      }
      if (Math.round(this.scrollPosition) % (this.cardWidth + 12) === 0) {
        return 'width: calc(100% - 8px);margin-left:  8px;'
      }
      return 'margin-left: 12px'
    },
  },
  beforeDestroy() {
    this.$store.commit('Home/SET_POPULAR_MOVIES_SCROLL_POSITION', this.scrollPosition)
  },
  mounted() {
    this.$nextTick(async () => {
      this.showInfiniteLoading = true
      await this.sleep(1)
      this.$refs.scroller.$el.scrollLeft = this.$store.state.Home.popularMoviesScrollPosition
    })
  },
  methods: {
    infiniteHandler($state) {
      this.$store
        .dispatch('Movies/getMovies', {
          selectedGenre: 'all',
          movieType: 'popular',
        })
        .then(() => {
          $state.loaded()
        })
    },
    scrollLeft() {
      const cardWidth = this.cardWidth + 12
      const { scrollLeft } = this.$refs.scroller.$el
      const { clientWidth } = this.$refs.scroller.$el
      this.$refs.scroller.$el.scrollTo({
        left:
          (parseInt(scrollLeft / cardWidth, 10) - parseInt(clientWidth / cardWidth, 10)) *
          cardWidth,
        behavior: 'smooth',
      })
    },
    scrollRight() {
      const cardWidth = this.cardWidth + 12
      const { scrollLeft } = this.$refs.scroller.$el
      const { clientWidth } = this.$refs.scroller.$el
      this.$refs.scroller.$el.scrollTo({
        left: parseInt((scrollLeft + clientWidth) / cardWidth, 10) * cardWidth,
        behavior: 'smooth',
      })
    },
    scroll() {
      this.scrollPosition = this.$refs.scroller.$el.scrollLeft
    },
  },
}
</script>

<style lang="scss" scoped>
.scroller {
  width: calc(100% - 12px);
}
.infiniteLoadingWrapper {
  display: grid;
  align-items: center;
}
</style>
