<template>
  <v-card :width="cardWidth" :height="cardHeight" :style="transparentCard" class="mr-3 mediaCard">
    <v-hover>
      <!-- eslint-disable-next-line vue/no-unused-vars-->
      <template #default="{ hover }">
        <v-card flat class="overflow-hidden transparent">
          <v-img
            v-if="show.poster_path"
            :aspect-ratio="2 / 3"
            class="poster"
            :src="`https://image.tmdb.org/t/p/w300/${show.poster_path}`"
          />
          <v-img v-else :aspect-ratio="2 / 3" :src="require('@/assets/empty.png')" />
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              opacity="0.5"
              absolute
              color="secondary5"
              class="pointer"
              @click.stop="openShow()"
            >
              <v-layout column fill-height>
                <div>
                  <v-layout justify-space-between>
                    <v-btn icon class="icon" :ripple="false">
                      <v-icon :style="transparentText">{{ mdiHeart }}</v-icon>
                    </v-btn>
                    <v-btn icon class="icon" :ripple="false">
                      <v-icon :style="transparentText">{{ mdiEye }}</v-icon>
                    </v-btn>
                  </v-layout>
                </div>
                <v-flex>
                  <v-layout column justify-center align-center fill-height class="text-center">
                    <div class="title noSelect px-2 text--text">{{ show.name }}</div>
                  </v-layout>
                </v-flex>
                <div>
                  <v-layout justify-end>
                    <v-btn icon class="icon" :ripple="false">
                      <v-icon :style="transparentText">{{ mdiDotsVertical }}</v-icon>
                    </v-btn>
                  </v-layout>
                </div>
              </v-layout>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <div>
      <div class="d-block titleWrapper">
        <div class="titleUnder px-1 pt-1 pointer noSelect text--text" @click.stop="openShow()">
          {{ show.name }}
        </div>
      </div>
      <div class="d-block titleWrapper">
        <div class="titleUnder text-no-wrap text3--text px-1" style="cursor: default">
          <!--TODO replace/add also number_of_seasons in the future -->
          {{ formatReleaseDate(show.first_air_date) }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mdiEye, mdiHeart, mdiDotsVertical } from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'
import transparentCard from '@/mixins/transparentCard'

export default {
  mixins: [transparentText, transparentCard],
  props: {
    show: {
      type: Object,
      required: true,
    },
    cardWidth: {
      type: Number,
      required: false,
      default: null,
    },
    cardHeight: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data: () => ({
    mdiEye,
    mdiHeart,
    mdiDotsVertical,
  }),
  methods: {
    formatReleaseDate(date) {
      if (date) {
        return date.substring(0, 4)
      }
      return 'unknown'
    },
    openShow() {
      this.$router.push({ name: 'selectedShow', params: { id: this.show.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 25px;
  font-size: 20px !important;
}
.icon:before {
  background-color: transparent !important;
}
.icon:hover > span > span {
  color: var(--v-text-base) !important;
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
