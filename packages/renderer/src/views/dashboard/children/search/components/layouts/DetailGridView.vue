<template>
  <v-virtual-scroll
    ref="scroller"
    class="mr-3"
    :items="medias"
    :item-height="itemHeight"
    :bench="2"
    :style="scrollStyle"
    @scroll="scroll()"
  >
    <template #default="{ item }">
      <v-layout v-if="item !== true" class="my-1">
        <v-flex v-for="(media, index) in item" :key="index">
          <MovieDetailGridCard v-if="media.media_type === 'movie'" :movie="media" />
          <ShowDetailGridCard v-if="media.media_type === 'tv'" :show="media" />
        </v-flex>
        <v-flex
          v-for="i in mediasPerRow - item.length"
          :key="mediasPerRow + i"
          class="mr-3"
        ></v-flex>
      </v-layout>
      <infinite-loading
        v-if="item === true && infiniteLoadingEnabled"
        spinner="waveDots"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </template>
  </v-virtual-scroll>
</template>

<script>
import sleep from '@/mixins/sleep'
import MovieDetailGridCard from '@/views/dashboard/components/layout_components/movie/DetailGridCard.vue'
import ShowDetailGridCard from '@/views/dashboard/components/layout_components/show/DetailGridCard.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'DetailedGridView',
  components: { MovieDetailGridCard, ShowDetailGridCard, InfiniteLoading },
  mixins: [sleep],
  data: () => ({
    itemHeight: 0,
    mediasPerRow: null,
    prevScrollWidth: 0,
    resizeObserver: null,
    scrollPosition: 0,
  }),
  computed: {
    medias() {
      try {
        const medias = this.$store.state.Search.medias.reduce((all, one, i) => {
          const ch = Math.floor(i / this.mediasPerRow)
          all[ch] = [].concat(all[ch] || [], one)
          return all
        }, [])
        if (this.infiniteLoadingEnabled) {
          medias.push(true)
        }
        return medias
      } catch (error) {
        return [true]
      }
    },
    minCardWidth() {
      return this.$store.state.Settings.Appearance.gridCardWidth
    },
    infiniteLoadingEnabled() {
      return this.$store.state.Search.infiniteLoadingEnabled
    },
    savedScrollPosition() {
      return this.$store.state.Search.scrollPosition
    },
    scrollStyle() {
      if (this.scrollPosition < 4) {
        return `top: calc(52px - ${this.scrollPosition}px);
          margin-top: ${this.scrollPosition}px;`
      }
      return 'margin-top: 4px'
    },
  },
  watch: {
    minCardWidth() {
      this.onResize()
    },
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.scroller.$el.children[0])
    this.$store.commit('Search/SET_SCROLL_POSITION', {
      layout: this.$options.name,
      position: this.scrollPosition,
    })
  },
  mounted() {
    this.$nextTick(async () => {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.prevScrollWidth !== this.$refs.scroller.$el.children[0].clientWidth) {
          this.onResize()
          this.prevScrollWidth = this.$refs.scroller.$el.children[0].clientWidth
        }
      })
      this.resizeObserver.observe(this.$refs.scroller.$el.children[0])
      this.$store.commit('Search/SET_INFINITE_LOADING', true)
      await this.sleep(1)
      if (this.$options.name === this.$store.state.Search.scrollPosition.layout) {
        this.$refs.scroller.$el.scrollTop = this.$store.state.Search.scrollPosition.position
      }
    })
  },
  methods: {
    infiniteHandler($state) {
      this.$store.dispatch('Search/getSearchedMedia').then(() => {
        $state.loaded()
      })
    },
    onResize() {
      const container = this.$refs.scroller.$el.children[0].clientWidth
      const numOfMedias = parseInt(container / this.minCardWidth, 10)
      this.itemHeight = (((container - 12 - numOfMedias * 12) / numOfMedias) * 3) / 2 + 60
      this.mediasPerRow = numOfMedias
    },
    scroll() {
      this.scrollPosition = this.$refs.scroller.$el.scrollTop
    },
  },
}
</script>

<style lang="scss" scoped>
.v-virtual-scroll {
  overflow: auto;
  position: absolute;
  height: auto;
  top: 52px;
  left: 0;
  bottom: 0;
  right: 0;
}
::v-deep .v-virtual-scroll__item {
  padding-left: 12px;
}
</style>
