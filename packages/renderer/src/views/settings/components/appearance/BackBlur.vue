<template>
  <div>
    <div class="text--text hidden-sm-and-up">Change background blur</div>
    <v-layout align-center>
      <v-slider v-model="blur" min="0" max="80" thumb-label hide-details />
      <v-btn icon class="ml-2" @click="blur = 20">
        <v-icon class="setToDefaultIcon">{{ mdiRestore }}</v-icon>
      </v-btn>
      <div class="text--text ml-3 hidden-xs-only">Change background blur</div>
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
    blur: {
      get() {
        return this.$store.state.Settings.Appearance.backgroundBlur
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_BACK_BLUR', value)
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
