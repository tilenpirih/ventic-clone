<template>
  <v-virtual-scroll
    ref="scroller"
    class="overflow-x-hidden mr-3"
    :items="medias"
    :item-height="132"
    :bench="2"
    @scroll="scroll()"
  >
    <template #default="{ item }">
      <MovieDetailTableRow
        v-if="item.media_type === 'movie'"
        :movie="item"
        :style="transparentRow(item.index)"
      />
      <ShowDetailTableRow
        v-if="item.media_type === 'tv'"
        :show="item"
        :style="transparentRow(item.index)"
      />
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
import MovieDetailTableRow from '@/views/dashboard/components/layout_components/movie/DetailTableRow.vue'
import ShowDetailTableRow from '@/views/dashboard/components/layout_components/show/DetailTableRow.vue'
import InfiniteLoading from 'vue-infinite-loading'
import transparentRow from '@/mixins/transparentTableRow'

export default {
  name: 'DetailTableView',
  components: { InfiniteLoading, MovieDetailTableRow, ShowDetailTableRow },
  mixins: [sleep, transparentRow],
  data: () => ({
    mediasPerRow: null,
    scrollPosition: 0,
  }),
  computed: {
    medias() {
      try {
        const medias = this.$store.state.Search.medias.map((media, index) => {
          media.index = index
          return media
        })
        medias.push(true)
        return medias
      } catch (error) {
        return [true]
      }
    },
    infiniteLoadingEnabled() {
      return this.$store.state.Search.infiniteLoadingEnabled
    },
  },
  beforeDestroy() {
    this.$store.commit('Search/SET_SCROLL_POSITION', {
      layout: this.$options.name,
      position: this.scrollPosition,
    })
  },
  mounted() {
    this.$nextTick(async () => {
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
</style>
