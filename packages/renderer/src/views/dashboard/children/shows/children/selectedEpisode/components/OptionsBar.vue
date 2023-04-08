<template>
  <v-layout justify-space-between class="py-3 px-3">
    <v-layout justify-end align-center>
      <v-btn class="ml-2" large icon @click="goBack()">
        <v-icon large color="text">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  data: () => ({ mdiClose }),
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
