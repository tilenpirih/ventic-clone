<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(season, i) in seasons" :key="i" :style="transparentPanel">
        <v-expansion-panel-header @click="getEpisodes(id, season.season_number)">
          <div>
            <span class="underlineHover text--text" @click.stop="openSeason(season.season_number)">
              {{ season.season_number }} season
            </span>
            <v-icon small class="text--text">
              {{ mdiCircleSmall }}
            </v-icon>
            <span class="text3--text">{{ season.episode_count }} episodes</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="px-6 pb-2">{{ season.overview }}</div>
          <div v-if="episodes[season.season_number]">
            <v-layout
              v-for="episode in episodes[season.season_number].episodes"
              :key="episode.episode_number"
              align-center
              class="pa-2 pl-6 pointer episode"
              @click.stop="openEpisode(season.season_number, episode.episode_number)"
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
                <v-layout column class="text--text">
                  <span class="overflow-hidden text-no-wrap ellipsis mr-1">{{ episode.name }}</span>
                  <div>
                    <span class="text3--text body-2 noSelect"> E{{ episode.episode_number }} </span>
                    <v-icon v-if="episode.air_date !== ''" color="text3" small class="mx-n1">
                      {{ mdiCircleSmall }}
                    </v-icon>
                    <span v-if="episode.air_date !== ''" class="text3--text body-2 noSelect">
                      {{ episode.air_date }}
                    </span>
                  </div>
                  <div class="overview">
                    {{ episode.overview }}
                  </div>
                </v-layout>
              </div>

              <v-btn icon color="text" class="icon ml-auto">
                <v-icon color="text3">{{ mdiPlay }}</v-icon>
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
