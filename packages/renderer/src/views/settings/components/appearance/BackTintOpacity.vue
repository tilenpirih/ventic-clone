<template>
  <div>
    <div class="text--text hidden-sm-and-up">Change background tint opacity</div>
    <v-layout align-center>
      <v-slider v-model="tint" min="0" max="1" step="0.1" thumb-label hide-details />
      <v-btn icon class="ml-2" @click="tint = 0.6">
        <v-icon class="setToDefaultIcon">{{ mdiRestore }}</v-icon>
      </v-btn>
      <div class="text--text ml-3 hidden-xs-only">Change background tint opacity</div>
    </v-layout>
  </div>
</template>

<script>
import { mdiRestore } from '@mdi/js'

export default {
  data: () => ({
    mdiRestore,
  }),
  computed: {
    tint: {
      get() {
        return this.$store.state.Settings.Appearance.backTintOpacity
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_BACK_TINT_OPACITY', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-input {
  max-width: 200px;
  min-width: 200px;
}
</style>
