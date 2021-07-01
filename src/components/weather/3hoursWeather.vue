<template>
  <v-col cols="12" md="4">
    <v-card-text><strong>Prognoza za 3 sata</strong></v-card-text>
    <v-card-text
      >Vrijeme:
      {{ info.data.list[0].weather[0].description }}
    </v-card-text>
    <v-card-text
      >Temperatura: {{ info.data.list[1].main.temp }} ºC
    </v-card-text>
    <v-card-text
      >Osjeća se: {{ info.data.list[1].main.feels_like }} ºC
    </v-card-text>
    <v-card-text
      >Vlažnost zraka: {{ info.data.list[1].main.humidity }}%
    </v-card-text>
    <v-card-text>Tlak: {{ info.data.list[1].main.pressure }} hPa </v-card-text>
    <v-card-text>Vidljivost: {{ info.data.list[1].visibility }} m </v-card-text>
    <v-card-text>Vjetar: {{ info.data.list[1].wind.speed }} m/s </v-card-text>
    <v-card-text
      >Vjetar max: {{ info.data.list[1].wind.gust }} m/s
    </v-card-text>
  </v-col>
</template>

<script>
  export default {
    name: "ThreeHours",
    data() {
      return {};
    },

    computed: {
      info() {
        return this.$store.getters.cityWeather;
      },
      sunrise() {
        const sr = this.info.data.city.sunrise;
        let date = new Date(sr * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let sunrise = hours + ":" + minutes.substr(-2);
        //console.log(sunrise);
        return sunrise;
      },
      sunset() {
        const ss = this.info.data.city.sunset;
        let date = new Date(ss * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let sunset = hours + ":" + minutes.substr(-2);
        return sunset;
      },
      date() {
        let year = new Date().getFullYear();
        let month = new Date().toLocaleString("hr", { month: "long" });
        let day = new Date().getDay();
        let hrDate = day + "." + " " + month + " " + year;
        return hrDate;
      },
    },
  };
</script>

<style scooped>
  .v-card__text {
    padding-top: 5px !important;
    padding-bottom: 5px;
  }
</style>