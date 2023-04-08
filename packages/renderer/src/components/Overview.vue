<template>
  <div>
    <div class="wrapper relative" :style="openWrapper">
      <div ref="hiddenOverview" class="hiddenOverview noSelect">
        {{ overview }}
      </div>
      <div class="overview text--text" :class="{ closedOverview: closedOverview }">
        {{ overview }}
      </div>
    </div>
    <v-btn
      v-if="showOverviewButton"
      :ripple="false"
      height="32"
      color="transparent"
      elevation="0"
      class="pa-0 mr-2 overviewButton font-weight-bold text-none text--text"
      @click="openClose()"
    >
      <span v-if="readMore">Read less</span>
      <span v-else>Read more</span>
      <v-icon :class="{ menuActivated: readMore }">
        {{ mdiMenuDown }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'

const delay = ms => new Promise(res => setTimeout(res, ms))
export default {
  props: {
    overview: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    readMore: false,
    showOverviewButton: true,
    closedOverview: true,
    resizeObserver: null,
    prevHeight: 0,
    boxHeight: 0,
    mdiMenuDown,
  }),
  computed: {
    openWrapper() {
      if (this.readMore) {
        return `height: ${this.boxHeight}px;`
      }
      return null
    },
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.hiddenOverview)
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.$refs.hiddenOverview.clientHeight !== this.prevHeight) {
        this.prevHeight = this.$refs.hiddenOverview.clientHeight
        this.boxHeight = this.prevHeight
        if (this.prevHeight <= 72) {
          this.showOverviewButton = false
        } else {
          this.showOverviewButton = true
        }
      }
    })
    this.resizeObserver.observe(this.$refs.hiddenOverview)
  },

  methods: {
    async openClose() {
      if (this.readMore) {
        this.readMore = !this.readMore
        await delay(300)
        this.closedOverview = true
      } else {
        this.closedOverview = false
        this.readMore = !this.readMore
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.overview {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  hyphens: auto;
}
.closedOverview {
  -webkit-line-clamp: 3;
}
.hiddenOverview {
  position: absolute;
  visibility: hidden;
}
.overviewButton:before {
  background-color: transparent !important;
}
.menuActivated {
  transform: rotate(-180deg);
  color: var(--v-primary-base) !important;
}
.wrapper {
  height: 72px;
  transition: 0.5s;
  overflow: hidden;
  transition: height 0.5s;
}
</style>
