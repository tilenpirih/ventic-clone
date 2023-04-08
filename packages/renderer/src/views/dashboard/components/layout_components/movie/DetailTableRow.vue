<template>
  <v-layout class="pa-3 mx-3 pointer" @click.stop="openMovie()">
    <v-img
      :aspect-ratio="2 / 3"
      class="poster mr-2"
      max-width="72"
      min-width="72"
      :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
    />

    <div>
      <v-layout column>
        <div class="title text--text noSelect">{{ movie.title }}</div>
        <div class="text3--text noSelect">
          <b>{{ formatReleaseDate(movie.release_date) }}</b>
        </div>
        <div class="overview text--text noSelect">{{ movie.overview }}</div>
      </v-layout>
    </div>
    <v-flex class="ml-2">
      <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-end fill-height>
        <v-btn icon class="icon">
          <v-icon :style="transparentText">{{ mdiHeart }}</v-icon>
        </v-btn>
        <v-btn icon class="icon">
          <v-icon :style="transparentText">{{ mdiEye }}</v-icon>
        </v-btn>
        <v-btn icon class="icon">
          <v-icon :style="transparentText">{{ mdiDotsVertical }}</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mdiEye, mdiHeart, mdiDotsVertical, mdiCircleSmall } from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'

export default {
  mixins: [transparentText],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mdiEye,
    mdiHeart,
    mdiDotsVertical,
    mdiCircleSmall,
  }),
  methods: {
    formatReleaseDate(date) {
      if (date) {
        return date.substring(0, 4)
      }
      return 'unknown'
    },
    openMovie() {
      this.$router.push({ name: 'selectedMovie', params: { id: this.movie.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon:hover > span > span {
  color: var(--v-text-base) !important;
}
.poster {
  border-radius: 0.25rem;
}
.overview {
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  hyphens: auto;
}
.title {
  // font-size: 20px !important;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
