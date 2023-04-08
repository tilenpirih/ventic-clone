<template>
  <div>
    <v-virtual-scroll
      ref="scroller"
      class="overflow-x-hidden mr-3"
      :items="shows"
      :item-height="52"
      :bench="2"
      @scroll="scroll()"
    >
      <template #default="{ item }">
        <TableRow v-if="item !== true" :show="item" :style="transparentRow(item.index)" />
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
import browseShows from '@/mixins/browseShows'
import TableRow from '@/views/dashboard/components/layout_components/show/TableRow.vue'
import InfiniteLoading from 'vue-infinite-loading'
import transparentRow from '@/mixins/transparentTableRow'

export default {
  name: 'TableView',
  components: { InfiniteLoading, TableRow },
  mixins: [sleep, browseShows, transparentRow],
  computed: {
    shows() {
      try {
        let shows = []
        if (this.showType === 'trending') {
          shows = this.$store.state.Shows.shows[this.showType][this.timeWindow]
        } else {
          shows = this.$store.state.Shows.shows[this.showType][this.selectedGenre.id]
        }
        shows = shows.results.map((show, index) => {
          show.index = index
          return show
        })
        shows.push(true)
        return shows
      } catch (error) {
        return [true]
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.$store.commit('Shows/SET_INFINITE_LOADING', true)
      await this.sleep(1)
      if (this.$options.name === this.$store.state.Shows.scrollPosition.layout) {
        this.$refs.scroller.$el.scrollTop = this.$store.state.Shows.scrollPosition.position
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
