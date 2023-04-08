<template>
  <v-slider
    v-model="gridCardWidth"
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
    gridCardWidth: {
      get() {
        return this.$store.state.Settings.Appearance.gridCardWidth
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_GRID_CARD_WIDTH', value)
      },
    },
  },
}
</script>
