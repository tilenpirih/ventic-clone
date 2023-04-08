<template>
  <div>
    <v-layout justify-space-between align-center>
      <span class="title mt-2 mb-1 text--text">Seasons</span>
      <div v-if="showArrows" class="mr-1">
        <v-btn large icon class="pr-1" @click="scrollLeft()">
          <v-icon color="text" large>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
        <v-btn large icon @click="scrollRight()">
          <v-icon color="text" large>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <RecycleScroller
      ref="scroller"
      v-slot="{ item }"
      direction="horizontal"
      :items="seasons"
      :item-size="showCardWidth + 12"
      key-field="id"
      :style="`height: ${(showCardWidth * 3) / 2 + 82}px; ${scrollStyle}`"
      @scroll.native="scroll()"
    >
      <!-- TODO don't apply mr-3 if it's the last card -->
      <v-card
        v-if="item.poster_path !== null"
        :width="showCardWidth"
        :height="(showCardWidth * 3) / 2 + 52"
        class="mr-3 ma-1 mediaCard"
        :style="transparentCard"
      >
        <v-hover>
          <!-- eslint-disable-next-line vue/no-unused-vars-->
          <template #default="{ hover }">
            <v-card flat class="overflow-hidden transparent">
              <v-img
                :aspect-ratio="2 / 3"
                class="poster"
                :src="`https://image.tmdb.org/t/p/w300/${item.poster_path}`"
              />
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  opacity="0.5"
                  absolute
                  color="secondary5"
                  class="pointer"
                  @click.stop="openSeason(item.season_number)"
                >
                  <v-layout column fill-height align-center justify-center class="pa-2">
                    <div class="name title text-center text--text">{{ item.name }}</div>
                    <div class="name subtitle-1 text3--text text-center">
                      {{ item.episode_count }} episodes
                    </div>
                  </v-layout>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <div class="">
          <div class="d-block titleWrapper">
            <div class="titleUnder px-1 pt-1 text--text">{{ item.name }}</div>
          </div>
          <div class="d-block titleWrapper">
            <div class="titleUnder text3--text px-1 pt-1">{{ item.episode_count }} episodes</div>
          </div>
        </div>
      </v-card>
      <v-card
        v-else
        :width="showCardWidth"
        :height="(showCardWidth * 3) / 2 + 52"
        class="mr-3 ma-1 mediaCard"
        :style="transparentCard"
        @click.stop="openSeason(item.season_number)"
      >
        <v-layout column fill-height align-center justify-center>
          <div class="name title text-center text--text">{{ item.name }}</div>
          <div class="name subtitle-1 text3--text text-center">
            {{ item.episode_count }} episodes
          </div>
        </v-layout>
      </v-card>
    </RecycleScroller>
  </div>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { RecycleScroller } from 'vue-virtual-scroller'
import transparentCard from '@/mixins/transparentCard'

export default {
  components: { RecycleScroller },
  mixins: [transparentCard],
  props: {
    id: {
      type: Number,
      required: true,
    },
    seasons: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    scrollerRO: null,
    showArrows: false,
    scrollPosition: null,
    mdiChevronLeft,
    mdiChevronRight,
  }),
  computed: {
    showCardWidth() {
      return this.$store.state.Settings.Appearance.horizontalCardWidth
    },
    scrollStyle() {
      // TODO this uses a lot of resources because it's executed on every scroll.
      // Find a better solution in the future
      if (this.scrollPosition < 4) {
        return `margin-left: ${-4 + this.scrollPosition}px;`
      }
      if (Math.round(this.scrollPosition) % (this.showCardWidth + 12) === 0) {
        return 'margin-left: -4px;'
      }
      return 'margin-left: 0px'
    },
  },
  beforeDestroy() {
    this.scrollerRO.unobserve(this.$refs.scroller.$el)
  },
  mounted() {
    this.$nextTick(async () => {
      this.scrollerRO = new ResizeObserver(() => {
        this.onResize()
      })
      this.scrollerRO.observe(this.$refs.scroller.$el)
    })
  },
  methods: {
    scrollLeft() {
      const cardWidth = this.showCardWidth + 12
      const { scrollLeft } = this.$refs.scroller.$el
      const { clientWidth } = this.$refs.scroller.$el
      this.$refs.scroller.$el.scrollTo({
        left:
          (parseInt(scrollLeft / cardWidth, 10) - parseInt(clientWidth / cardWidth, 10)) *
          cardWidth,
        behavior: 'smooth',
      })
    },
    scrollRight() {
      const cardWidth = this.showCardWidth + 12
      const { scrollLeft } = this.$refs.scroller.$el
      const { clientWidth } = this.$refs.scroller.$el
      this.$refs.scroller.$el.scrollTo({
        left: parseInt((scrollLeft + clientWidth) / cardWidth, 10) * cardWidth,
        behavior: 'smooth',
      })
    },
    onResize() {
      if (this.$refs.scroller.$el.scrollWidth > this.$refs.scroller.$el.offsetWidth) {
        this.showArrows = true
      } else {
        this.showArrows = false
      }
    },
    openSeason(seasonNumber) {
      this.$router.push({ name: 'selectedSeason', params: { id: this.id, seasonNumber } })
    },
    scroll() {
      this.scrollPosition = this.$refs.scroller.$el.scrollLeft
    },
  },
}
</script>

<style lang="scss" scoped>
.name {
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  hyphens: auto;
}
.poster {
  border-radius: 0.25rem;
}
.titleUnder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  width: 100%;
  position: absolute;
  font-size: 14px;
}
.titleWrapper {
  height: 24px;
}
</style>
