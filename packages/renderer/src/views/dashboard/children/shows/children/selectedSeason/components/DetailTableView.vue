<template>
  <div>
    <v-layout
      v-for="(episode, i) in episodes"
      :key="episode.episode_number"
      align-center
      class="pa-2 pl-6"
      :style="transparentRow(i)"
    >
      <v-img
        v-if="episode.still_path"
        :aspect-ratio="16 / 9"
        class="poster mr-5"
        max-width="199"
        min-width="199"
        :src="`https://image.tmdb.org/t/p/w200/${episode.still_path}`"
      />
      <div class="mr-2">
        <v-layout column>
          <span class="overflow-hidden text-no-wrap ellipsis mr-1">{{ episode.name }}</span>
          <div>
            <span class="text--text body-2 noSelect"> E{{ episode.episode_number }} </span>
            <v-icon v-if="episode.air_date !== ''" small class="text--text mx-n1">
              {{ mdiCircleSmall }}
            </v-icon>
            <span v-if="episode.air_date !== ''" class="text--text body-2 noSelect">
              {{ episode.air_date }}
            </span>
          </div>
          <div class="overview">
            {{ episode.overview }}
          </div>
        </v-layout>
      </div>

      <v-btn icon class="icon ml-auto">
        <v-icon color="grey">{{ mdiPlay }}</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import { mdiCircleSmall, mdiPlay } from '@mdi/js'
import transpraentrTableRow from '@/mixins/transparentTableRow'
import transparentText from '@/mixins/transparentTextColor'

export default {
  mixins: [transpraentrTableRow, transparentText],
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    episodes: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    mdiCircleSmall,
    mdiPlay,
  }),
  methods: {},
}
</script>

<style lang="scss" scoped>
.icon:hover > span > span {
  color: var(--v-text-base) !important;
}
</style>
