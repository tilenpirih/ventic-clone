<template>
  <div ref="container">
    <v-layout v-for="(line, rowi) in splittedEpisodes" :key="rowi" class="my-3">
      <v-flex
        v-for="(episode, i) in line"
        :key="episode.episode_number"
        :class="{ 'pr-5': i + 1 !== episodesPerRow || splittedEpisodes.length === rowi }"
      >
        <v-card class="mediaCard" :style="transparentCard">
          <v-hover>
            <!-- eslint-disable-next-line vue/no-unused-vars-->
            <template #default="{ hover }">
              <v-card flat class="transparent">
                <v-img
                  v-if="episode.still_path"
                  :aspect-ratio="16 / 9"
                  class="poster"
                  :src="`https://image.tmdb.org/t/p/w500/${episode.still_path}`"
                />
                <div v-else style="aspect-ratio: 16/9" />
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    opacity="0.5"
                    absolute
                    color="secondary5"
                    class="pointer"
                    @click.stop="openEpisode(episode.season_number, episode.episode_number)"
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
                        <v-layout
                          column
                          justify-center
                          align-center
                          fill-height
                          class="text-center"
                        >
                          <v-btn color="primary" fab outlined @click.stop="playEpisode()">
                            <v-icon large color="primary">{{ mdiPlay }}</v-icon>
                          </v-btn>
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
              <div class="titleUnder px-1 pt-1 text--text">{{ episode.name }}</div>
            </div>
            <div class="titleWrapper">
              <div class="titleUnder text3--text px-1">episode {{ episode.episode_number }}</div>
            </div>
          </div>
          <div></div>
        </v-card>
      </v-flex>
      <v-flex
        v-for="i in episodesPerRow - line.length"
        :key="episodes.length + i"
        :class="{ 'pr-5': i + 1 !== episodesPerRow - line.length }"
      />
    </v-layout>
  </div>
</template>

<script>
import { mdiEye, mdiHeart, mdiDotsVertical, mdiPlay } from '@mdi/js'
import transparentCard from '@/mixins/transparentCard'
import transparentText from '@/mixins/transparentTextColor'

export default {
  mixins: [transparentCard, transparentText],
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
    resizeObserver: null,
    episodesPerRow: null,
    cardWidth: null,
    mdiEye,
    mdiHeart,
    mdiDotsVertical,
    mdiPlay,
  }),
  computed: {
    minCardWidth() {
      return this.$store.state.SelectedMedia.seasonCardWidth
    },
    splittedEpisodes() {
      try {
        return this.episodes.reduce((all, one, i) => {
          const ch = Math.floor(i / this.episodesPerRow)
          all[ch] = [].concat(all[ch] || [], one)
          return all
        }, [])
      } catch (error) {
        return [true]
      }
    },
  },
  watch: {
    minCardWidth() {
      this.onResize()
    },
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.container)
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      this.onResize()
    })
    this.resizeObserver.observe(this.$refs.container)
  },
  methods: {
    onResize() {
      this.episodesPerRow = parseInt(this.$refs.container.clientWidth / this.minCardWidth, 10)
      this.cardWidth = this.$refs.container.clientWidth / this.episodesPerRow
    },
    openEpisode(seasonNumber, episodeNumber) {
      this.$router.push({
        name: 'selectedEpisode',
        params: { id: this.id, seasonNumber, episodeNumber },
      })
    },
    playEpisode() {
      // TODO add button functionality
    },
  },
}
</script>

<style lang="scss" scoped>
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
