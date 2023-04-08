<template>
  <v-layout align-center class="mx-3 pa-2 pointer" @click.stop="openMovie()">
    <span class="overflow-hidden nowrap noSelect text--text">
      {{ movie.title }}
    </span>
    <v-icon color="text3">{{ mdiCircleSmall }}</v-icon>
    <b class="text3--text noSelect">{{ formatReleaseDate(movie.release_date) }}</b>
    <v-flex>
      <v-layout justify-end align-center class="nowrap">
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
import transparentMenu from '@/mixins/transparentMenu'

export default {
  mixins: [transparentText, transparentMenu],
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
</style>
