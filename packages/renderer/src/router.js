import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/dashboard/Dashboard.vue'
import Home from '@/views/dashboard/children/home/Home.vue'
import MoviesPrefix from '@/views/dashboard/children/movies/Prefix.vue'
import BrowseMovies from '@/views/dashboard/children/movies/children/browse/Movies.vue'
import SelectedMovie from '@/views/dashboard/children/movies/children/selectedMovie/SelectedMovie.vue'
import ShowsPrefix from '@/views/dashboard/children/shows/Prefix.vue'
import BrowseShows from '@/views/dashboard/children/shows/children/browse/Shows.vue'
import SelectedShow from '@/views/dashboard/children/shows/children/selectedShow/SelectedShow.vue'
import SelectedSeason from '@/views/dashboard/children/shows/children/selectedSeason/SelectedSeason.vue'
import SelectedEpisode from '@/views/dashboard/children/shows/children/selectedEpisode/SelectedEpisode.vue'
import Favourites from '@/views/dashboard/children/Favourites.vue'
import History from '@/views/dashboard/children/History.vue'
import Search from '@/views/dashboard/children/search/Search.vue'

import Settings from '@/views/settings/Settings.vue'
import Account from '@/views/settings/children/Account.vue'
import Appearance from '@/views/settings/children/Appearance.vue'
import Network from '@/views/settings/children/Network.vue'
import Player from '@/views/settings/children/Player.vue'
import Scraping from '@/views/settings/children/Scraping.vue'
import Storage from '@/views/settings/children/Storage.vue'
import Subtitles from '@/views/settings/children/Subtitles.vue'
import SupportDevs from '@/views/settings/children/SupportDevs.vue'
import Updates from '@/views/settings/children/Updates.vue'

import WebTorrent from '@/views/webtorrent/Webtorrent.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      redirect: '/dashboard/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'search/:query',
          name: 'search',
          component: Search,
          props: true,
        },
        {
          path: 'movies',
          name: 'movies',
          component: MoviesPrefix,
          redirect: '/dashboard/movies/browse',
          children: [
            {
              path: 'browse',
              name: 'browseMovies',
              component: BrowseMovies,
            },
            {
              path: 'selectedMovie/:id',
              name: 'selectedMovie',
              component: SelectedMovie,
              props: true,
            },
          ],
        },
        {
          path: 'shows',
          name: 'shows',
          component: ShowsPrefix,
          redirect: '/dashboard/shows/browse',
          children: [
            {
              path: 'browse',
              name: 'browseShows',
              component: BrowseShows,
            },
            {
              path: 'selectedShow/:id',
              name: 'selectedShow',
              component: SelectedShow,
              props: true,
            },
            {
              path: 'selectedSeason/:id/:seasonNumber',
              name: 'selectedSeason',
              component: SelectedSeason,
              props: true,
            },
            {
              path: 'selectedEpisode/:id/:seasonNumber/:episodeNumber',
              name: 'selectedEpisode',
              component: SelectedEpisode,
              props: true,
            },
          ],
        },
        {
          path: 'favourites',
          name: 'favourites',
          component: Favourites,
        },
        {
          path: 'history',
          name: 'history',
          component: History,
        },
      ],
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      redirect: '/settings/account',
      children: [
        {
          path: 'account',
          name: 'account',
          component: Account,
        },
        {
          path: 'appearance',
          name: 'appearance',
          component: Appearance,
        },
        {
          path: 'network',
          name: 'network',
          component: Network,
        },
        {
          path: 'storage',
          name: 'storage',
          component: Storage,
        },
        {
          path: 'subtitles',
          name: 'subtitles',
          component: Subtitles,
        },
        {
          path: 'player',
          name: 'player',
          component: Player,
        },
        {
          path: 'scraping',
          name: 'scraping',
          component: Scraping,
        },
        {
          path: 'supportDevs',
          name: 'supportDevs',
          component: SupportDevs,
        },
        {
          path: 'updates',
          name: 'updates',
          component: Updates,
        },
      ],
    },
    {
      path: '/webtorrent',
      name: 'webtorrent',
      component: WebTorrent,
    },
  ],
})
// router.replace('/dashboard/movies/selectedMovie/634649')
// router.replace('/dashboard/shows')
// router.replace('/dashboard/shows/selectedEpisode/60574/3/1')
// router.replace('/settings/appearance')
// router.replace('/dashboard/movies')
// router.replace('/dashboard/search/arca')
// router.replace('/testPlayer')
router.replace('/dashboard')
export default router
