<template>
  <component :is="selectedComponent" />
</template>

<script>
import { mdiAccount } from '@mdi/js'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: { Navbar },
  data: () => ({
    svgPath: mdiAccount,
    selectedComponent: 'Media',
  }),
}
</script>
<style></style>
