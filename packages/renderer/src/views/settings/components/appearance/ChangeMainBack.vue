<template>
  <div>
    <v-text-field v-model="mainBackImg" label="Change main background image" />
  </div>
</template>

<script>
export default {
  computed: {
    mainBackImg: {
      get() {
        return this.$store.state.Settings.Appearance.mainBackgroundImg
      },
      set(value) {
        this.$store.commit('Settings/Appearance/CHANGE_MAIN_BACK_IMG', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
