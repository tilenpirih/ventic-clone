<template>
  <div>
    <v-layout justify-space-between class="title">
      <span class="text--text">Similar movies</span>
      <div>
        <v-btn large icon @click="scrollLeft()">
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
      direction="horizontal"
      :items="movies"
      :item-size="cardWidth + 12"
      key-field="id"
      :style="`height:${scrollerHeight}px; ${scrollStyle}`"
      @scroll.native="scroll()"
    >
      <component :is="layoutType" :movie="item" :card-width="cardWidth" class="ma-1" />
    </RecycleScroller>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Grid from '@/views/dashboard/components/layout_components/movie/GridCard.vue'
import DetailGrid from '@/views/dashboard/components/layout_components/movie/DetailGridCard.vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Grid, DetailGrid, RecycleScroller, InfiniteLoading },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    scrollPosition: null,
    mdiChevronRight,
    mdiChevronLeft,
  }),
  computed: {
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
        return `margin-left: ${-4 + this.scrollPosition}px;`
      }
      if (Math.round(this.scrollPosition) % (this.cardWidth + 12) === 0) {
        return 'margin-left: -4px;'
      }
      return 'margin-left: 0px'
    },
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

<style lang="scss" scoped></style>
