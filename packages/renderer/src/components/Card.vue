<template>
  <v-flex>
    <v-card flat style="background-color: transparent" class="mx-2 mt-2" min-width="135">
      <v-hover v-slot="{ hover }">
        <router-link to="/selectedMedia">
          <div :elevation="hover ? 24 : 6" flat class="text-center">
            <v-img
              :aspect-ratio="2 / 3"
              class="media"
              src="@/assets/posters/wonder_woman_poster.jpg"
              @click="setSelectedMedia()"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#000" opacity="0.65">
                  <v-flex>
                    <v-rating
                      :value="movie.rating"
                      dense
                      color="orange"
                      background-color="orange"
                    />
                  </v-flex>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </div>
        </router-link>
      </v-hover>
      <div>
        <v-tooltip top class="title__block">
          <template #activator="{ on, attrs }">
            <div class="title__text" v-bind="attrs" v-on="on">{{ movie.title }}</div>
          </template>
          <span>{{ movie.title }}</span>
        </v-tooltip>
        <div class="text-no-wrap" style="cursor: default">{{ movie.year }}</div>
      </div>
    </v-card>
  </v-flex>
</template>
<script>
// import SelectedMedia from '@/views/home/Selected'
export default {
  components: {},
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSelectedMedia() {
      this.$store.dispatch('setSelectedMedia', this.movie)
    },
  },
}
</script>
<style lang="scss" scoped>
.media {
  border-radius: 3%;
}

.media:hover {
  box-shadow: 0 0 3pt 2pt #ff5555;
  border-radius: 3%;
  cursor: pointer;
}

// Hacky fix for large title changing card width
.title {
  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
    width: 100%;
    position: absolute;
  }

  &__block {
    display: block !important;
    height: 24px;
  }
}
</style>
