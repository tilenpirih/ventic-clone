<template>
  <div>
    <v-layout
      v-for="(episode, i) in episodes"
      :key="episode.episode_number"
      align-center
      class="pa-2 pl-6 pointer"
      :style="transparentRow(i)"
      @click.stop="openEpisode(episode.season_number, episode.episode_number)"
    >
      <span class="overflow-hidden text-no-wrap ellipsis mr-1 text--text">
        {{ episode.name }}
      </span>

      <v-icon small class="text3--text">{{ mdiCircleSmall }}</v-icon>
      <span class="text3--text body-2 noSelect"> E{{ episode.episode_number }} </span>
      <v-icon v-if="episode.air_date !== ''" small class="text3--text">
        {{ mdiCircleSmall }}
      </v-icon>
      <span v-if="episode.air_date !== ''" class="text3--text body-2 noSelect">
        {{ episode.air_date }}
      </span>

      <v-btn icon class="icon ml-auto">
        <v-icon :style="transparentText">{{ mdiPlay }}</v-icon>
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
  methods: {
    openEpisode(seasonNumber, episodeNumber) {
      this.$router.push({
        name: 'selectedEpisode',
        params: { id: this.id, seasonNumber, episodeNumber },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.icon:hover > span > span {
  color: var(--v-text-base) !important;
}
</style>
