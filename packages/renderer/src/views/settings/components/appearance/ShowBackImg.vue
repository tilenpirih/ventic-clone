<template>
  <v-switch v-model="backImg" class="mt-1">
    <template #label>
      <div class="ml-2 text3--text">Enable / disable background image</div>
    </template>
  </v-switch>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    backImg: {
      get() {
        return this.$store.state.Settings.Appearance.backImg
      },
      set(value) {
        this.$store.commit('Settings/Appearance/ENAB_DISAB_BACK_IMG', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
