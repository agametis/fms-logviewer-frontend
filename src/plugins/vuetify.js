import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loadee
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Translation provided by Vuetify (typescript)
import de from 'vuetify/es5/locale/de'

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { de },
    current: 'en', // en is always available, de must be loaded separately
  },
})
