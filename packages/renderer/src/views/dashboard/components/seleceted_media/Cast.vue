<template>
  <div>
    <v-layout justify-space-between align-center>
      <span class="title text--text">Cast</span>
      <div>
        <v-btn large icon @click="scrollLeft()">
          <v-icon large color="text">{{ mdiChevronLeft }}</v-icon>
        </v-btn>
        <v-btn large icon @click="scrollRight()">
          <v-icon large color="text">{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <RecycleScroller
      ref="scroller"
      v-slot="{ item }"
      direction="horizontal"
      :items="cast"
      :item-size="avatarWidth + 12"
      key-field="id"
      :style="`height: ${(avatarWidth * 3) / 2 + 82}px; ${scrollStyle}`"
      @scroll.native="scroll()"
    >
      <v-card
        v-if="item.profile_path !== null"
        :width="avatarWidth"
        :height="(avatarWidth * 3) / 2 + 52"
        class="mr-3 ma-1 mediaCard"
        :style="transparentCard"
      >
        <v-hover>
          <!-- eslint-disable-next-line vue/no-unused-vars-->
          <template #default="{ hover }">
            <v-card flat class="overflow-hidden">
              <v-img
                :aspect-ratio="2 / 3"
                class="poster"
                :src="`https://image.tmdb.org/t/p/w300/${item.profile_path}`"
              />
              <v-fade-transition>
                <v-overlay v-if="hover" opacity="0.5" absolute color="secondary5">
                  <v-layout column fill-height align-center justify-center class="pa-2">
                    <div class="name title text-center text--text">{{ item.name }}</div>
                    <div class="name subtitle-1 text3--text text-center">{{ item.character }}</div>
                  </v-layout>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <div>
          <div class="d-block titleWrapper">
            <span class="titleUnder px-1 pt-1 text--text">{{ item.name }}</span>
          </div>
          <div class="d-block titleWrapper">
            <span class="titleUnder text3--text px-1 pt-1">{{ item.character }}</span>
          </div>
        </div>
      </v-card>
      <v-card
        v-else
        :width="avatarWidth"
        :height="(avatarWidth * 3) / 2 + 52"
        class="mr-3 ma-1 mediaCard"
      >
        <v-layout column fill-height align-center justify-center>
          <div class="name title text-center text--text">{{ item.name }}</div>
          <div class="name subtitle-1 text3--text text-center">{{ item.character }}</div>
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
    cast: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    scrollPosition: null,
    mdiChevronLeft,
    mdiChevronRight,
  }),
  computed: {
    avatarWidth() {
      return this.$store.state.Settings.Appearance.horizontalCardWidth
    },
    scrollStyle() {
      // TODO this uses a lot of resources because it's executed on every scroll.
      // Find a better solution in the future
      if (this.scrollPosition < 4) {
        return `margin-left: ${-4 + this.scrollPosition}px;`
      }
      if (Math.round(this.scrollPosition) % (this.avatarWidth + 12) === 0) {
        return 'margin-left: -4px;'
      }
      return 'margin-left: 0px'
    },
  },
  methods: {
    scrollLeft() {
      const cardWidth = this.avatarWidth + 12
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
      const cardWidth = this.avatarWidth + 12
      const { scrollLeft } = this.$refs.scroller.$el
      const { clientWidth } = this.$refs.scroller.$el
      this.$refs.scroller.$el.scrollTo({
        left: parseInt((scrollLeft + clientWidth) / cardWidth, 10) * cardWidth,
        behavior: 'smooth',
      })
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
