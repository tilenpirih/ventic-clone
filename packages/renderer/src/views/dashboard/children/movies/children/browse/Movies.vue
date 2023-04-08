<template>
  <div class="relative wfull mb-3">
    <OptionsBar class="mr-3" />
    <component :is="layoutType" />
  </div>
</template>

<script>
import OptionsBar from '@/views/dashboard/children/movies/children/browse/components/OptionsBar.vue'
import GridView from '@/views/dashboard/children/movies/children/browse/components/layouts/GridView.vue'
import DetailGridView from '@/views/dashboard/children/movies/children/browse/components/layouts/DetailGridView.vue'
import TableView from '@/views/dashboard/children/movies/children/browse/components/layouts/TableView.vue'
import DetailTableView from '@/views/dashboard/children/movies/children/browse/components/layouts/DetailTableView.vue'

export default {
  components: { OptionsBar, GridView, DetailGridView, TableView, DetailTableView },
  computed: {
    layoutType() {
      return this.$store.state.Movies.layoutType
    },
  },
}
</script>
