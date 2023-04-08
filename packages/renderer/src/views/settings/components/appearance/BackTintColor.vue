<template>
  <div>
    Change background tint color
    <v-btn icon class="ml-2" @click="color = '#222222FF'">
      <v-icon class="setToDefaultIcon">{{ mdiRestore }}</v-icon>
    </v-btn>
    <v-color-picker v-model="color" class="mt-2" hide-mode-switch dot-size="25"></v-color-picker>
  </div>
</template>

<script>
import { mdiRestore } from '@mdi/js'

export default {
  data: () => ({
    tintColor: '#222222FF',
    mdiRestore,
  }),
  computed: {
    color: {
      get() {
        return this.$store.state.Settings.Appearance.tintColor
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_BACK_TINT_COLOR', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
