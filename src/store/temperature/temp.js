import axios from 'axios'

export const temp = {
  state: {
    localTemp: '',
    lat: '',
    lon: ''
  },
  getters: {
    currentTemp(state) {
      return state.localTemp
    },
  },
  mutations: {
    setTemp(state, nn) {
      state.localTemp = nn.data
    },
    setPosition(state, pos) {
      state.lat = pos.coords.latitude.toFixed(2);
      state.lon = pos.coords.longitude.toFixed(2);
    }
  },
  actions: {
    async currentPositionWeather({ commit, state }) {
      try {
        const nn = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=38313d7973790bba77d4c08e35bab1d0&units=metric`
        );
        commit("setTemp", nn);
      }
      catch (error) {
        console.log(error)
      }
    },
    async geoLocation({ commit }) {
      try {
        await navigator.geolocation.getCurrentPosition((pos) => {
          commit("setPosition", pos);
          return this.dispatch("currentPositionWeather");
        })
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
