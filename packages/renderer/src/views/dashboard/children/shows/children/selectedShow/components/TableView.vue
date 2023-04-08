<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(season, i) in seasons" :key="i" :style="transparentPanel">
        <v-expansion-panel-header @click.stop="getEpisodes(id, season.season_number)">
          <div>
            <span class="underlineHover text--text" @click.stop="openSeason(season.season_number)">
              {{ season.season_number }} season
            </span>
            <v-icon small color="text3">
              {{ mdiCircleSmall }}
            </v-icon>
            <span class="text3--text">{{ season.episode_count }} episodes</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="episodes[season.season_number]">
            <v-layout
              v-for="episode in episodes[season.season_number].episodes"
              :key="episode.episode_number"
              align-center
              class="pa-2 pl-6 pointer episode"
              @click.stop="openEpisode(season.season_number, episode.episode_number)"
            >
              <span class="overflow-hidden text-no-wrap ellipsis mr-1 text--text">
                {{ episode.name }}
              </span>
              <v-icon small color="text3">{{ mdiCircleSmall }}</v-icon>
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
          <v-layout v-else justify-center class="pb-3">
            <v-progress-circular indeterminate color="text" />
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Vue from 'vue'
import { mdiCircleSmall, mdiPlay } from '@mdi/js'
import transparentText from '@/mixins/transparentTextColor'
import transparentPanel from '@/mixins/transparentPanel'

export default {
  mixins: [transparentText, transparentPanel],
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
    episodes: {},
    mdiCircleSmall,
    mdiPlay,
  }),
  methods: {
    getEpisodes(id, seasonNumber) {
      if (this.episodes[seasonNumber] === undefined) {
        this.$store.dispatch('Shows/getSeasonDetails', { id, seasonNumber }).then(({ data }) => {
          Vue.set(this.episodes, seasonNumber, data)
        })
      }
    },
    openEpisode(seasonNumber, episodeNumber) {
      this.$router.push({
        name: 'selectedEpisode',
        params: { id: this.id, seasonNumber, episodeNumber },
      })
    },
    openSeason(seasonNumber) {
      this.$router.push({ name: 'selectedSeason', params: { id: this.id, seasonNumber } })
    },
  },
}
</script>

<style lang="scss" scoped>
// .v-expansion-panel {
//   backdrop-filter: blur(4px);
// }
::v-deep .v-expansion-panel-content__wrap {
  padding: 0px !important;
}
.episode:hover {
  background-color: var(--v-secondary6-base);
}
.ellipsis {
  text-overflow: ellipsis;
}
.v-btn--icon:hover > span > span {
  color: var(--v-text-base) !important;
}
.underlineHover:hover {
  text-decoration: underline;
}
::v-deep .v-expansion-panel-header__icon > span {
  color: var(--v-text-base) !important;
}
</style>
