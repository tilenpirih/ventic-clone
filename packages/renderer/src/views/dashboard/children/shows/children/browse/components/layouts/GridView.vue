<template>
  <v-virtual-scroll
    ref="scroller"
    class="overflow-x-hidden mr-3"
    :style="scrollStyle"
    :items="shows"
    :item-height="itemHeight"
    :bench="2"
    @scroll="scroll()"
  >
    <template #default="{ item }">
      <v-layout v-if="item !== true" class="my-1">
        <v-flex v-for="(show, index) in item" :key="index">
          <GridCard :show="show" />
        </v-flex>
        <v-flex v-for="i in showsPerRow - item.length" :key="showsPerRow + i" class="mr-3"></v-flex>
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
import browseShows from '@/mixins/browseShows'
import GridCard from '@/views/dashboard/components/layout_components/show/GridCard.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'GridView',
  components: { GridCard, InfiniteLoading },
  mixins: [sleep, browseShows],
  data: () => ({
    itemHeight: 0,
    showsPerRow: null,
    prevScrollWidth: 0,
    resizeObserver: null,
  }),
  computed: {
    shows() {
      try {
        let shows = []
        if (this.showType === 'trending') {
          shows = this.$store.state.Shows.shows[this.showType][this.timeWindow]
        } else {
          shows = this.$store.state.Shows.shows[this.showType][this.selectedGenre.id]
        }
        shows = shows.results.reduce((all, one, i) => {
          const ch = Math.floor(i / this.showsPerRow)
          all[ch] = [].concat(all[ch] || [], one)
          return all
        }, [])
        if (this.infiniteLoadingEnabled) {
          shows.push(true)
        }
        return shows
      } catch (error) {
        return [true]
      }
    },
    minCardWidth() {
      return this.$store.state.Settings.Appearance.gridCardWidth
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
      this.$store.commit('Shows/SET_INFINITE_LOADING', true)
      await this.sleep(1)
      if (this.$options.name === this.$store.state.Shows.scrollPosition.layout) {
        this.$refs.scroller.$el.scrollTop = this.$store.state.Shows.scrollPosition.position
      }
    })
  },
  methods: {
    onResize() {
      const container = this.$refs.scroller.$el.children[0].clientWidth
      const numOfShows = parseInt(container / this.minCardWidth, 10)
      this.itemHeight = (((container - 12 - numOfShows * 12) / numOfShows) * 3) / 2 + 12
      this.showsPerRow = numOfShows
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
