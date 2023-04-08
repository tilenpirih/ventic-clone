<template>
  <div class="text--text">
    <v-menu
      v-model="primaryMenu"
      class="mt-3"
      dark
      nudge-right="12"
      min-width="200"
      max-width="300"
      offset-x
      rounded
      transition="slide-x-transition"
      :close-on-content-click="false"
      attach
    >
      <template #activator="{}">
        <v-btn
          color="primary"
          width="80"
          min-width="0"
          elevation="0"
          :ripple="false"
          @click.stop="primaryMenu = !primaryMenu"
        />
        Primary color
      </template>
      <v-color-picker v-model="primary" mode="hexa" dot-size="25"></v-color-picker>
    </v-menu>
    <div class="mt-2">
      <v-menu
        v-model="secondaryMenu"
        class="mt-3"
        dark
        nudge-right="12"
        min-width="200"
        max-width="300"
        offset-x
        rounded
        transition="slide-x-transition"
        :close-on-content-click="false"
        attach
      >
        <template #activator="{}">
          <v-btn
            :ripple="false"
            color="secondary"
            width="80"
            min-width="0"
            elevation="0"
            @click.stop="secondaryMenu = !secondaryMenu"
          />
          Secondary color
        </template>
        <v-color-picker v-model="secondary" mode="hexa" dot-size="25"></v-color-picker>
      </v-menu>
    </div>
    <!-- TODO add ability to customize text color-->
    <div class="mt-2">
      <v-menu
        v-model="textMenu"
        class="mt-3"
        dark
        nudge-right="12"
        min-width="200"
        max-width="300"
        offset-x
        rounded
        transition="slide-x-transition"
        :close-on-content-click="false"
        attach
      >
        <template #activator="{}">
          <v-btn
            :ripple="false"
            color="text"
            width="80"
            min-width="0"
            elevation="0"
            @click.stop="textMenu = !textMenu"
          />
          Text color
        </template>
        <v-color-picker v-model="text" mode="hexa" dot-size="25"></v-color-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-bitwise */
import _ from 'lodash'
import genColorVariants from '@/functions/genColorVariations'

export default {
  data: () => ({
    primary: '#222222',
    secondary: '#222222',
    text: '#222222',
    primaryMenu: false,
    secondaryMenu: false,
    textMenu: false,
  }),
  // TODO watched is called on mounted which is not needed
  watch: {
    primary: _.debounce(function () {
      const vuetifyThemes = this.$vuetify.theme.themes
      vuetifyThemes.dark.primary = this.primary
      vuetifyThemes.light.primary = this.primary
      const array = genColorVariants(this.primary)
      array.forEach((item, index) => {
        vuetifyThemes.dark[`primary${index + 1}`] = item
        vuetifyThemes.light[`primary${10 - index}`] = item
      })
    }, 200),
    secondary: _.debounce(function () {
      const vuetifyThemes = this.$vuetify.theme.themes
      vuetifyThemes.dark.secondary = this.secondary
      vuetifyThemes.light.secondary = this.secondary
      const array = genColorVariants(this.secondary)
      array.forEach((item, index) => {
        vuetifyThemes.dark[`secondary${index + 1}`] = item
        vuetifyThemes.light[`secondary${10 - index}`] = item
      })
    }, 200),
    text: _.debounce(function () {
      const vuetifyThemes = this.$vuetify.theme.themes
      vuetifyThemes.dark.text = this.text
      vuetifyThemes.light.text = this.text
      const array = genColorVariants(this.text)
      array.forEach((item, index) => {
        if (index < 5) {
          vuetifyThemes.dark[`text${5 - index}`] = item
        } else {
          vuetifyThemes.light[`text${index - 4}`] = item
        }
      })
    }, 200),
  },
  created() {
    this.primary = this.$vuetify.theme.themes.dark.primary
    this.secondary = this.$vuetify.theme.themes.dark.secondary
    this.text = this.$vuetify.theme.themes.dark.text
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-btn::before {
  content: none;
}
</style>
