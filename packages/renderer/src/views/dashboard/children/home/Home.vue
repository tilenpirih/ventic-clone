<template>
  <div class="relative wfull mb-3">
    <OptionsBar class="mr-3" />
    <div ref="mainWrapper" class="scrollable_content mr-3" :class="{ 'pr-3': scrollPadding }">
      <SlideMoviesGrid class="" />
      <SlideShowsGrid class="mt-4" />
    </div>
  </div>
</template>

<script>
import OptionsBar from '@/views/dashboard/children/home/components/OptionsBar.vue'
import SlideMoviesGrid from '@/views/dashboard/children/home/components/slide_groups/SlideMoviesGrid.vue'
import SlideShowsGrid from '@/views/dashboard/children/home/components/slide_groups/SlideShowsGrid.vue'

export default {
  name: 'Home',
  components: { OptionsBar, SlideMoviesGrid, SlideShowsGrid },
  data: () => ({
    scrollPadding: false,
    resizeObserver: null,
  }),
  computed: {
    miniDrawer() {
      return this.$store.state.Dashboard.miniDrawer
    },
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.mainWrapper)
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.$refs.mainWrapper.scrollHeight > this.$refs.mainWrapper.clientHeight) {
        this.scrollPadding = true
      } else {
        this.scrollPadding = false
      }
    })
    this.resizeObserver.observe(this.$refs.mainWrapper)
  },
}
</script>

<style lang="scss" scoped>
.scrollable_content {
  overflow: auto;
  position: absolute;
  top: 52px;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
