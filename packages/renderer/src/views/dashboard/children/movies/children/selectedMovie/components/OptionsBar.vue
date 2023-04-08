<template>
  <v-layout justify-space-between class="pa-3 pb-2">
    <v-layout justify-end align-center>
      <Slider class="mr-3" />
      <v-btn class="ml-2" large icon @click="goBack()">
        <v-icon large color="text">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'
import Slider from '@/components/HorizontalCardWidth.vue'

export default {
  components: { Slider },
  data: () => ({
    mdiClose,
  }),
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
