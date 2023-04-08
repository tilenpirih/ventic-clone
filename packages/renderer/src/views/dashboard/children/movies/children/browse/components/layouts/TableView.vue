<template>
  <div>
    <v-virtual-scroll
      ref="scroller"
      class="overflow-x-hidden mr-3"
      :items="movies"
      :item-height="52"
      :bench="2"
      @scroll="scroll()"
    >
      <template #default="{ item }">
        <TableRow v-if="item !== true" :movie="item" :style="transparentRow(item.index)" />
        <infinite-loading
          v-if="item === true && infiniteLoadingEnabled"
          spinner="waveDots"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
import sleep from '@/mixins/sleep'
import browseMovies from '@/mixins/browseMovies'
import TableRow from '@/views/dashboard/components/layout_components/movie/TableRow.vue'
import InfiniteLoading from 'vue-infinite-loading'
import transparentRow from '@/mixins/transparentTableRow'

export default {
  name: 'TableView',
  components: { InfiniteLoading, TableRow },
  mixins: [sleep, browseMovies, transparentRow],
  computed: {
    movies() {
      try {
        let movies = []
        if (this.movieType === 'trending') {
          movies = this.$store.state.Movies.movies[this.movieType][this.timeWindow]
        } else {
          movies = this.$store.state.Movies.movies[this.movieType][this.selectedGenre.id]
        }
        movies = movies.results.map((movie, index) => {
          movie.index = index
          return movie
        })
        movies.push(true)
        return movies
      } catch (error) {
        return [true]
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.$store.commit('Movies/SET_INFINITE_LOADING', true)
      await this.sleep(1)
      if (this.$options.name === this.$store.state.Movies.scrollPosition.layout) {
        this.$refs.scroller.$el.scrollTop = this.$store.state.Movies.scrollPosition.position
      }
    })
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
