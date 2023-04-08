<template>
  <v-layout justify-center>
    <div class="my-3">
      <Drawer />
    </div>
    <div class="relative wfull my-3 mr-3">
      <div class="wrapper">
        <v-layout justify-center>
          <v-flex xs12 sm12 md10 lg8 xl6>
            <router-view />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- <v-layout wrap justify-center class="mt-3 wrapper">
      <v-flex xs12 sm12 md10 lg8 xl6>
        <router-view />
        </v-flex>
    </v-layout> -->
  </v-layout>
</template>

<script>
import Drawer from '@/views/settings/components/Drawer.vue'

export default {
  name: 'Dashboard',
  components: { Drawer },
}
</script>
<style scoped lang="scss">
.wrapper {
  overflow: auto;
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
