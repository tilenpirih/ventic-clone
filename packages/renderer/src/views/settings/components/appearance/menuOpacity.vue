<template>
  <div>
    <div class="text--text hidden-sm-and-up">Change menu opacity</div>
    <v-layout align-center>
      <v-slider v-model="tint" min="0" max="100" step="1" thumb-label hide-details />
      <v-btn icon class="ml-2" @click="tint = 80">
        <v-icon class="setToDefaultIcon" color="text">{{ mdiRestore }}</v-icon>
      </v-btn>
      <div class="text--text ml-3 hidden-xs-only">Change menu opacity</div>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'
import { mdiRestore } from '@mdi/js'
import { percentToHex, hexToPercent } from '@/functions/percentToHex'

export default {
  data: () => ({
    mdiRestore,
  }),
  computed: {
    tint: {
      get() {
        return hexToPercent(this.$store.state.Settings.Appearance.menuOpacity)
      },
      set: _.debounce(function (value) {
        this.$store.commit('Settings/Appearance/SET_MENU_OPACITY', percentToHex(value))
      }, 200),
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
