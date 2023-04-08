<template>
  <v-layout justify-space-between class="pa-3 pb-2">
    <v-layout justify-end align-center>
      <v-slider
        v-model="cardWidth"
        step="10"
        min="130"
        max="250"
        hide-details
        style="max-width: 200px; min-width: 80px"
      >
      </v-slider>
      <v-btn class="ml-3" fab icon @click="goBack()">
        <v-icon large color="white">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  data: () => ({
    mdiClose,
  }),
  computed: {
    cardWidth: {
      get() {
        return this.$store.state.SelectedMedia.cardWidth
      },
      set(value) {
        this.$store.commit('SelectedMedia/SET_CARD_WIDTH', value)
      },
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
