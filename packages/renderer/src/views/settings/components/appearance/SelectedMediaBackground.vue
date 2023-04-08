<template>
  <v-switch v-model="backImg" class="mt-1">
    <template #label>
      <div class="ml-2 text3--text">
        Enable / disable background change when visiting movie/show
      </div>
    </template>
  </v-switch>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    backImg: {
      get() {
        return this.$store.state.Settings.Appearance.selectedMediaBackground
      },
      set(value) {
        this.$store.commit('Settings/Appearance/SET_SELECTED_MEDIA_BACKGROUND', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
