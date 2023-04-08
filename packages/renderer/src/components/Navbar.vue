<template>
  <div>
    <v-app-bar dense elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-tabs>
        <v-tab>
          <v-icon class="mr-1">mdi-filmstrip</v-icon>
          movies
        </v-tab>
        <v-tab>
          <v-icon class="mr-1">mdi-television</v-icon>
          tv shows
        </v-tab>
      </v-tabs>

      <v-select
        v-model="selectedGenre"
        hide-details
        solo
        dense
        class="ml-2"
        style="width: 200px"
        :items="genres"
        label="Genre"
      />
      <v-spacer />
      <v-icon class="ml-3" v-bind="attrs" v-on="on"> mdi-heart </v-icon>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-icon class="mx-3" v-bind="attrs" v-on="on"> mdi-download </v-icon>
        </template>
        <Downloaded />
      </v-menu>
      <v-avatar size="35">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </v-app-bar>
    <!--
    <v-navigation-drawer
      permanent
      expand-on-hover
      fixed
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="page in pages"
            :key="page.title"
            dense
            router
            :to="page.route"
          >
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>{{ page.title }}</span>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>-->
  </div>
</template>
<script>
import Downloaded from '@/components/Downloaded.vue'

export default {
  components: { Downloaded },
  data: () => ({
    drawer: false,
    pages: [{ title: 'home', icon: 'mdi-home' }],
    selectedGenre: 'All',
    genres: [
      'All',
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Film-Noir',
      'History',
      'Horror',
      'Music',
      'Musical',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Short',
      'Sport',
      'Thriller',
      'War',
      'Western',
    ],
  }),
  computed: {},
}
</script>
<style scoped lang="scss">
.v-text-field__details {
  visibility: hidden;
}
</style>
