<template>
  <v-system-bar height="30" app color="secondary5" class="pr-0">
    <div class="font-weight-bold primary--text font-italic">
      <span class="">VENTIC</span>
      <span class="font-weight-bold text3--text font-italic subtitle"> ALPHA</span>
    </div>
    <v-spacer />
    <v-toolbar-items>
      <v-btn class="clickable minmax" width="30" min-width="30" small icon @click="onMinimize">
        <v-icon small :style="transparentText" class="mr-0">{{ mdiWindowMinimize }}</v-icon>
      </v-btn>
      <v-btn class="clickable minmax" width="30" min-width="30" icon small @click="onMaximize">
        <v-icon small :style="transparentText" class="mr-0">{{ mdiWindowMaximize }}</v-icon>
      </v-btn>
      <v-btn class="clickable" width="30" min-width="30" icon small @click="onClose">
        <v-icon small class="primary--text mr-0">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-system-bar>
</template>

<script>
import { mdiWindowMinimize, mdiWindowMaximize, mdiClose } from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'

export default {
  mixins: [transparentText],
  data: () => ({
    mdiWindowMinimize,
    mdiWindowMaximize,
    mdiClose,
    fab: false,
  }),
  methods: {
    async onMinimize(event) {
      window.api.invoke('window-minimize')
      event.currentTarget.blur()
    },
    async onMaximize(event) {
      event.preventDefault()
      window.api.invoke('window-maximize')
      event.currentTarget.blur()
    },
    async onClose(event) {
      window.api.invoke('window-close')
      event.currentTarget.blur()
    },
  },
}
</script>

<style lang="scss" scoped>
.clickable {
  -webkit-app-region: no-drag;
}
.subtitle {
  font-size: 0.75rem;
}
.minmax:hover > span > span {
  color: var(--v-text-base) !important;
}
.v-system-bar {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
  z-index: 9999;
}
// .v-system-bar {
//   -webkit-user-select: none;
//   -webkit-app-region: drag;
//   z-index: 9999;

//   &_title {
//     font-style: italic;
//     font-weight: 500;
//     letter-spacing: -1px;

//     .sub {
//       font-size: 0.75rem;
//       color: #ff5555;
//     }
//   }
// }
</style>
