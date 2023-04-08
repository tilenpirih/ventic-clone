<template>
  <div>
    <v-layout class="text--text">
      <v-card
        v-if="show.poster_path"
        class="transparent hidden-sm-and-down mr-5"
        elevation="0"
        min-width="300px"
      >
        <v-img
          :aspect-ratio="2 / 3"
          :src="`https://image.tmdb.org/t/p/w500/${show.poster_path}`"
        ></v-img>
      </v-card>
      <v-flex>
        <h1 style="font-size: 30px" class="mt-5">{{ show.name }}</h1>
        <div
          v-if="show.name !== show.original_name"
          class="text3--text font-weight-bold mt-n1 mb-2"
        >
          {{ show.original_name }}
        </div>

        <div class="my-1 font-weight-bold">
          {{ formatReleaseDate(show.first_air_date) }}
          <v-icon color="text">{{ mdiCircleSmall }}</v-icon>
          <span
            v-for="(genre, index) in show.genres"
            :key="index"
            class="text3--text font-weight-bold"
          >
            {{ genre.name }}<span v-if="index !== show.genres.length - 1">,</span>
          </span>
        </div>
        <v-layout align-center wrap>
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" align-center v-on="on">
                <span class="font-weight-bold">{{ show.vote_average }} / 10</span>
                <v-icon class="ml-2 mt-n1" color="#f5c518">{{ mdiStar }}</v-icon>
              </div>
            </template>
            <span class="text--text">
              Number of votes: <b>{{ show.vote_count }}</b>
            </span>
          </v-tooltip>
        </v-layout>
        <div class="my-1 mb-1">
          <v-tooltip color="secondary" top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" color="text" large icon class="mr-2" v-on="on">
                <v-icon>{{ mdiEye }}</v-icon>
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
        <Overview v-if="show.overview" :overview="show.overview" />
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
    show: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    watchTrailer: false,
    playMenu: false,
    readMore: false,
    showOverviewButton: false,
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

<style lang="scss" scoped>
::v-deep.v-chip::before {
  content: none;
}
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
