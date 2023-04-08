<template>
  <div>
    <v-layout>
      <v-card
        v-if="episode.still_path"
        class="transparent hidden-sm-and-down mr-5"
        elevation="0"
        min-width="300px"
      >
        <v-img
          :aspect-ratio="16 / 9"
          :src="`https://image.tmdb.org/t/p/w500/${episode.still_path}`"
        ></v-img>
      </v-card>
      <v-flex class="text--text">
        <h2>{{ show.name }}</h2>
        <div class="font-weight-bold mb-2">Season {{ episode.season_number }}</div>
        <div class="font-weight-bold mb-2">
          Episode {{ episode.episode_number }}
          <v-icon class="text3--text mx-n2">{{ mdiCircleSmall }}</v-icon>
          {{ episode.name }}
        </div>
        <div class="my-5">
          <v-btn
            v-if="showTrailer"
            class="text-none mr-5"
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
    <Overview v-if="episode.overview" :overview="episode.overview" class="mt-2" />
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
    episode: {
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
      return this.episode?.videos.results.find(
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

<style lang="scss" scoped>
.box {
  max-height: 72px;
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0, 1, 0, 1);
}
.box.open {
  max-height: 100rem;
  transition: max-height 0.6s cubic-bezier(0.9, 0, 0.8, 0.2);
}
@keyframes open {
  from {
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
  to {
    line-clamp: initial;
    -webkit-line-clamp: initial;
  }
}

@keyframes close {
  from {
    line-clamp: initial;
    -webkit-line-clamp: initial;
  }
  to {
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
}
.text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  animation: close 0.6s linear 0.1s forwards;
}
.open .text {
  animation: open 0.1s linear 0s forwards;
}
.hiddenOverview {
  z-index: -1;
  position: absolute;
  color: red;
}
.menuActivated {
  transform: rotate(-180deg);
  color: var(--v-primary-base) !important;
}
.overviewButton:before {
  background-color: transparent !important;
}
</style>
