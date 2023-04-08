<template>
  <div class="relative wfull mb-3">
    <OptionsBar class="mr-3" />
    <component :is="layoutType" :key="query" />
  </div>
</template>

<script>
import OptionsBar from '@/views/dashboard/children/search/components/OptionsBar.vue'
import GridView from '@/views/dashboard/children/search/components/layouts/GridView.vue'
import DetailGridView from '@/views/dashboard/children/search/components/layouts/DetailGridView.vue'
import TableView from '@/views/dashboard/children/search/components/layouts/TableView.vue'
import DetailTableView from '@/views/dashboard/children/search/components/layouts/DetailTableView.vue'

export default {
  components: { OptionsBar, GridView, DetailGridView, TableView, DetailTableView },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  computed: {
    layoutType() {
      return this.$store.state.Search.layoutType
    },
  },
  created() {
    this.$store.commit('Search/SET_QUERY', this.query)
    this.$store.commit('Search/SET_SEARCH_QUERY', this.query)
  },
}
</script>
