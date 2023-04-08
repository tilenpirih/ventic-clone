import Vue from 'vue'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'

import english from '../locales/en.json'
import slovenian from '../locales/sl.json'

Vue.use(VueI18Next)

i18next.init({
  fallbackLng: 'en',
  lng: 'en',
  debug: true,
  resources: {},
})

i18next.addResourceBundle('en', 'translation', english)
i18next.addResourceBundle('sl', 'translation', slovenian)

const i18n = new VueI18Next(i18next)

export default i18n
