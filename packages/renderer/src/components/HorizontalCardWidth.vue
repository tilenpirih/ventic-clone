<template>
  <v-slider
    v-model="horizontalCardWidth"
    step="10"
    min="130"
    max="250"
    hide-details
    style="max-width: 200px; min-width: 80px"
  />
</template>
<script>
export default {
  computed: {
    horizontalCardWidth: {
      get() {
        return this.$store.state.Settings.Appearance.horizontalCardWidth
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_HORIZONTAL_CARD_WIDTH', value)
      },
    },
  },
}
</script>
