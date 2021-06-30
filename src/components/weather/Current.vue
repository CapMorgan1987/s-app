<template>
  <v-col cols="12" md="8">
    <v-row>
      <v-col cols="12" md="6">
        <v-card-text
          ><strong>Datum: {{ date }}</strong>
        </v-card-text>
        <v-card-text
          >Vrijeme:
          {{ info.data.list[0].weather[0].description }}
        </v-card-text>
        <v-card-text
          >Trenutna temperatura: {{ info.data.list[0].main.temp }} ºC
        </v-card-text>
        <v-card-text
          >Osjeća se: {{ info.data.list[0].main.feels_like }} ºC
        </v-card-text>
        <v-card-text
          >Danas najviša temperatura: {{ info.data.list[0].main.temp_max }} ºC
        </v-card-text>
        <v-card-text
          >Danas najniža temperatura: {{ info.data.list[0].main.temp_min }} ºC
        </v-card-text>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-text
          >Vlažnost zraka: {{ info.data.list[0].main.humidity }}%
        </v-card-text>
        <v-card-text
          >Tlak: {{ info.data.list[0].main.pressure }} hPa
        </v-card-text>
        <v-card-text
          >Vjetar: {{ info.data.list[0].wind.speed }} m/s
        </v-card-text>
        <v-card-text
          >Vjetar max: {{ info.data.list[0].wind.gust }} m/s
        </v-card-text>
        <v-card-text>Izlazak sunca: {{ sunrise }} sati </v-card-text>
        <v-card-text>Zalazak sunca: {{ sunset }} sati </v-card-text>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
  //import axios from "axios";

  export default {
    name: "Current",
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
        let day = new Date().getUTCDate();
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