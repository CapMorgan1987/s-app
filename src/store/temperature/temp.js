import axios from 'axios'

export const temp = {
  state: {
    localTemp: {
      temp: '',
      lat: '',
      lon: '',
    },
    city: '',
    error: ''
  },
  getters: {
    currentTemp(state) {
      return state.localTemp.temp
    },
    cityWeather(state) {
      return state.city
    },
    cityError(state) {
      return state.error;
    }
  },
  mutations: {
    setTemp(state, curentLocation) {
      state.localTemp.temp = curentLocation.data
    },
    setPosition(state, pos) {
      state.localTemp.lat = pos.coords.latitude.toFixed(2);
      state.localTemp.lon = pos.coords.longitude.toFixed(2);
    },
    setCity(state, cW) {
      state.city = cW
    },
    showError(state, error) {
      state.error = error
    }
  },
  actions: {
    async currentPositionWeather({ commit, state }) {
      try {
        const curentLocation = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${state.localTemp.lat}&lon=${state.localTemp.lon}&exclude=minutely,alerts&appid=38313d7973790bba77d4c08e35bab1d0&units=metric&lang=hr`
        );
        commit("setTemp", curentLocation);
        //console.log(curentLocation)
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
    },
    async cityWeather({ commit }, city) {
      try {
        const cW = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=38313d7973790bba77d4c08e35bab1d0&units=metric&lang=hr`
        );
        commit("setCity", cW);
      }
      catch (error) {
        commit("showError", error);
        console.log(error)
      }
    },
  }
}
