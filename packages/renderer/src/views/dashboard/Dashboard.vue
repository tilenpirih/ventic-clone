<template>
  <v-layout>
    <div class="my-3">
      <Drawer v-if="$vuetify.breakpoint.smAndUp" />
    </div>
    <Dialog v-if="$vuetify.breakpoint.xsOnly" />
    <router-view :key="$route.path" />
  </v-layout>
</template>

<script>
import Drawer from '@/views/dashboard/components/Drawer.vue'
import Dialog from '@/views/dashboard/components/Dialog.vue'

export default {
  name: 'Dashboard',
  components: { Drawer, Dialog },
}
</script>
