<template>
  <div>
    <v-slider v-model="blur" min="0" max="80" thumb-label label="Change background blur" />
  </div>
</template>

<script>
export default {
  data: () => ({}),
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
::v-deep .v-slider {
  max-width: 200px;
}
</style>
