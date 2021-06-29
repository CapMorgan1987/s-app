import Vue from 'vue';
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#2E7D32',
        secondary: '#2eff05',
        anchor: '#2eff05',
      },
    },
  },
})


export default vuetify

