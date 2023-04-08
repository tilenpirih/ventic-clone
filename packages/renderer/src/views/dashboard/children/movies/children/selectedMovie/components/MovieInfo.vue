<template>
  <div>
    <v-layout class="text--text">
      <v-card
        v-if="movie.poster_path"
        class="transparent hidden-sm-and-down mr-5"
        elevation="0"
        min-width="300px"
      >
        <v-img
          :aspect-ratio="2 / 3"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        ></v-img>
      </v-card>
      <v-flex>
        <h1 class="mt-5">{{ movie.title }}</h1>
        <div
          v-if="movie.title !== movie.original_title"
          class="text3--text font-weight-bold mt-n1 mb-2"
        >
          {{ movie.original_title }}
        </div>

        <div class="my-1 font-weight-bold">
          <span>{{ formatReleaseDate(movie.release_date) }}</span>
          <v-icon color="text">{{ mdiCircleSmall }}</v-icon>
          <span
            v-for="(genre, index) in movie.genres"
            :key="index"
            class="text3--text font-weight-bold"
          >
            {{ genre.name }}<span v-if="index !== movie.genres.length - 1">,</span>
          </span>
        </div>
        <v-layout align-center wrap>
          <span class="mr-5">{{ movieRuntime }}</span>
          <v-chip
            v-if="certification"
            class="mr-5 font-weight-bold text--text"
            label
            :style="pgCardStyle"
          >
            {{ certification }}
          </v-chip>
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" align-center v-on="on">
                <span class="font-weight-bold">{{ movie.vote_average }} / 10</span>
                <v-icon class="ml-2 mt-n1" color="#f5c518">{{ mdiStar }}</v-icon>
              </div>
            </template>
            <span class="text--text">
              Number of votes: <b>{{ movie.vote_count }}</b>
            </span>
          </v-tooltip>
        </v-layout>
        <div class="my-1 mb-1">
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" large icon class="mr-2" v-on="on">
                <v-icon color="text">{{ mdiEye }}</v-icon>
              </v-btn>
            </template>
            <span class="text--text"> Mark as watched </span>
          </v-tooltip>
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" large icon v-on="on">
                <v-icon color="text">{{ mdiHeart }}</v-icon>
              </v-btn>
            </template>
            <span class="text--text"> Add to favourites </span>
          </v-tooltip>
        </div>
        <Overview v-if="movie.overview" :overview="movie.overview" />
        <div class="mt-5 relative">
          <v-btn
            class="text-none pl-2 pr-0 rounded-r-0"
            large
            elevation="0"
            color="primary"
            @click="torrentSelection = true"
          >
            <v-icon class="mr-2" color="text">{{ mdiPlay }}</v-icon>
            <span class="pr-2 text--text">Play now</span>
          </v-btn>
          <!-- TODO fix menu go outside screen -->
          <v-menu
            v-model="dropdown"
            class="mt-3"
            dark
            nudge-right="12"
            min-width="200"
            max-width="300"
            offset-x
            rounded
            transition="slide-x-transition"
            attach
          >
            <template #activator="{}">
              <v-btn
                class="rounded-l-0 px-4 mr-5"
                color="primary"
                width="10"
                min-width="0"
                elevation="0"
                large
                @click.stop="dropdown = !dropdown"
              >
                <v-icon color="text" :class="{ menuActivated: dropdown }">
                  {{ mdiMenuDown }}
                </v-icon>
              </v-btn>
            </template>
            <v-card :style="transparentMenu">
              <v-list nav class="transparent">
                <v-list-item dense @click="torrentSelection = !torrentSelection">
                  Choose torrent
                </v-list-item>
                <v-list-item dense> Upload torrent </v-list-item>
                <v-divider />
                <div class="px-2 text--text">
                  <div class="my-2">Selected torrent:</div>
                  <div class="body-2">
                    Resolution: <span class="text3--text">{{ torrentInfo.resolution }}p</span>
                  </div>
                  <div class="body-2">
                    Type: <span class="text3--text">{{ torrentInfo.type }}</span>
                  </div>
                  <div class="body-2 text3--text mt-1">
                    {{ torrentInfo.name }}
                  </div>
                </div>
              </v-list>
            </v-card>
          </v-menu>

          <v-btn
            v-if="movieTrailer"
            class="text-none mr-3"
            outlined
            large
            color="primary"
            @click.stop="watchTrailer = !watchTrailer"
          >
            Watch trailer
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-dialog v-model="torrentSelection">
      <ChooseTorrent />
    </v-dialog>
    <v-dialog v-model="watchTrailer" width="800" content-class="overlay">
      <LazyYoutube
        ref="trailer"
        :src="`https://www.youtube.com/watch?v=${movieTrailer}`"
        max-width="500"
        thumbnail-quality="maxres"
      />
    </v-dialog>
  </div>
</template>

<script>
import Overview from '@/components/Overview.vue'
import ChooseTorrent from '@/components/ChooseTorrent.vue'
import {
  mdiEye,
  mdiHeart,
  mdiDotsVertical,
  mdiPlay,
  mdiStar,
  mdiCircleSmall,
  mdiMenuDown,
} from '@mdi/js'
import { LazyYoutube } from 'vue-lazytube'
import transparentMenu from '@/mixins/transparentMenu'

export default {
  components: { LazyYoutube, Overview, ChooseTorrent },
  mixins: [transparentMenu],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    watchTrailer: false,
    playMenu: false,
    dropdown: false,
    torrentInfo: {
      resolution: 1080,
      type: 'WEBRip',
      name: 'The.Good.Doctor.S05E16.The.Shaun.Show.1080p.AMZN.WEBRip.DDP5.1.x264-NTb[rartv]',
    },
    mdiEye,
    mdiHeart,
    mdiDotsVertical,
    mdiPlay,
    mdiStar,
    mdiCircleSmall,
    mdiMenuDown,
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
    movieTrailer() {
      return this.movie?.videos.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )?.key
    },
    torrentSelection: {
      get() {
        return this.$store.state.SelectedMedia.torrentSelection
      },
      set(value) {
        this.$store.commit('SelectedMedia/SET_TORRENT_SELECTION', value)
      },
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
  },
}
</script>

<style lang="scss" scoped>
::v-deep.v-chip::before {
  content: none;
}
.overviewButton:before {
  background-color: transparent !important;
}
.menuActivated {
  transform: rotate(-180deg);
}
</style>
