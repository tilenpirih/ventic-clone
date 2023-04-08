<template>
  <div>
    <v-layout>
      <v-card
        v-if="season.poster_path"
        class="transparent hidden-sm-and-down mr-5"
        elevation="0"
        min-width="300px"
      >
        <v-img
          :aspect-ratio="2 / 3"
          :src="`https://image.tmdb.org/t/p/w500/${season.poster_path}`"
        ></v-img>
      </v-card>
      <v-flex>
        <h1 class="mt-5 text--text">{{ show.name }}</h1>
        <div class="text3--text font-weight-bold mt-n1 mb-2">Season {{ season.season_number }}</div>
        <div class="my-1 mb-1">
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" large icon class="mr-2" v-on="on">
                <v-icon color="text">{{ mdiEye }}</v-icon>
              </v-btn>
            </template>
            <span class="text--text"> Mark as watched </span>
          </v-tooltip>
        </div>
        <Overview v-if="season.overview" :overview="season.overview" />
      </v-flex>
    </v-layout>
    <v-dialog v-model="watchTrailer" width="800" content-class="overlay">
      <LazyYoutube
        ref="trailer"
        :src="`https://www.youtube.com/watch?v=${showTrailer}`"
        max-width="500"
        thumbnail-quality="maxres"
      />
    </v-dialog>
  </div>
</template>

<script>
import Overview from '@/components/Overview.vue'
import { mdiEye, mdiHeart, mdiDotsVertical, mdiPlay, mdiStar, mdiCircleSmall } from '@mdi/js'
import { LazyYoutube } from 'vue-lazytube'

export default {
  components: { LazyYoutube, Overview },
  props: {
    season: {
      type: Object,
      required: true,
    },
    show: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    watchTrailer: false,
    playMenu: false,
    mdiEye,
    mdiHeart,
    mdiDotsVertical,
    mdiPlay,
    mdiStar,
    mdiCircleSmall,
  }),
  computed: {
    pgCardStyle() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary}B3`
    },
    certification() {
      // TODO pick certification depending on user language
      // eslint-disable-next-line camelcase, prettier/prettier
      return this.movie?.release_dates.results.find(item => item.iso_3166_1 === 'US')
        ?.release_dates[0].certification
    },
    showTrailer() {
      return this.show?.videos.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )?.key
    },
    movieRuntime() {
      const minutes = this.movie.runtime
      if (minutes) {
        if (minutes < 90) {
          return `${minutes} min`
        }
        return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
      }
      return null
    },
  },
  watch: {
    watchTrailer(value) {
      if (!value) {
        this.$refs.trailer.pauseVideo()
      }
    },
  },
  methods: {
    formatReleaseDate(date) {
      if (date === '') {
        return 'unknown'
      }
      return date.substring(0, 4)
    },
    onResize() {
      if (this.$refs.fakeOverview.clientHeight > 72) {
        this.showOverviewButton = true
      } else {
        this.showOverviewButton = false
      }
    },
  },
}
</script>
