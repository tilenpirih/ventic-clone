<template>
  <v-layout align-center>
    <v-switch v-model="darkTheme" hide-details class="mt-0" />
    <span class="ml-3 text--text">Dark theme</span>
  </v-layout>
</template>

<script>
export default {
  computed: {
    darkTheme: {
      get() {
        return this.$vuetify.theme.dark
      },
      set(value) {
        this.$vuetify.theme.dark = value
      },
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-input-switch {
  width: 238px;
}
</style>
