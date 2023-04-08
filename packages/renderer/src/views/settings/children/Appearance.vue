<template>
  <div class="mx-3">
    <h2 class="text-center text--text">Appearance</h2>
    <div class="title my-2 text--text">Theme settings</div>
    <ChangeTheme class="mb-3" />
    <SwitchDarkLightTheme class="mt-2 mb-3" />
    <ChangeColors />
    <!-- <v-divider class="mt-5" />
    <div class="title text--text mt-2">Opacity settings</div> -->
    <PanelOpacity class="mt-2" />
    <MenuOpacity />
    <div class="title mt-2 text--text">Background settings</div>
    <ShowBackImg />
    <SelectedMediaBackground />
    <v-btn
      outlined
      color="primary"
      class="text-none mb-4"
      @click="advancedBackSettings = !advancedBackSettings"
    >
      Advanced settings
    </v-btn>
    <v-expand-transition>
      <div v-if="advancedBackSettings">
        <BackBlur />
        <BackTintOpacity />
        <ChangeMainBack />
        <BackTintColor class="mt-2" />
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import ShowBackImg from '@/views/settings/components/appearance/ShowBackImg.vue'
import SelectedMediaBackground from '@/views/settings/components/appearance/SelectedMediaBackground.vue'
import BackBlur from '@/views/settings/components/appearance/BackBlur.vue'
import BackTintOpacity from '@/views/settings/components/appearance/BackTintOpacity.vue'
import BackTintColor from '@/views/settings/components/appearance/BackTintColor.vue'
import ChangeMainBack from '@/views/settings/components/appearance/ChangeMainBack.vue'
import ChangeColors from '@/views/settings/components/appearance/ChangeColors.vue'
import SwitchDarkLightTheme from '@/views/settings/components/appearance/SwitchDarkLightTheme.vue'
import PanelOpacity from '@/views/settings/components/appearance/panelOpacity.vue'
import MenuOpacity from '@/views/settings/components/appearance/menuOpacity.vue'
import ChangeTheme from '@/views/settings/components/appearance/ChangeTheme.vue'

export default {
  components: {
    ShowBackImg,
    BackBlur,
    BackTintOpacity,
    BackTintColor,
    ChangeMainBack,
    ChangeColors,
    SwitchDarkLightTheme,
    PanelOpacity,
    MenuOpacity,
    ChangeTheme,
    SelectedMediaBackground,
  },
  data: () => ({
    advancedBackSettings: false,
  }),
}
</script>

<style lang="scss" scoped></style>
