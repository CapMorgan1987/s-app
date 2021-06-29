<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="4">
      <v-card :loading="umag == ''" class="text-center">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <h3 class="py-4">Vrijeme Umag</h3>
        <div v-if="umag">
          <v-card-text>Weather: {{ umag.dataseries[0].weather }}</v-card-text>
          <v-card-text>Min: {{ umag.dataseries[0].temp2m.min }} C</v-card-text>
          <v-card-text>Max: {{ umag.dataseries[0].temp2m.max }} C</v-card-text>
          <v-card-text
            >Wind: {{ umag.dataseries[0].wind10m_max }} m/s</v-card-text
          >
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card :loading="porec == ''" class="text-center">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <h3 class="py-4">Vrijeme Poreč</h3>
        <div v-if="porec">
          <v-card-text>Weather: {{ porec.dataseries[0].weather }}</v-card-text>
          <v-card-text>Min: {{ porec.dataseries[0].temp2m.min }} C</v-card-text>
          <v-card-text>Max: {{ porec.dataseries[0].temp2m.max }} C</v-card-text>
          <v-card-text
            >Wind: {{ porec.dataseries[0].wind10m_max }} m/s</v-card-text
          >
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card :loading="novigrad == ''" class="text-center">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <h3 class="py-4">Vrijeme Novigrad</h3>
        <div v-if="novigrad">
          <v-card-text
            >Weather: {{ novigrad.dataseries[0].weather }}</v-card-text
          >
          <v-card-text
            >Min: {{ novigrad.dataseries[0].temp2m.min }} C</v-card-text
          >
          <v-card-text
            >Max: {{ novigrad.dataseries[0].temp2m.max }} C</v-card-text
          >
          <v-card-text
            >Wind: {{ novigrad.dataseries[0].wind10m_max }} m/s</v-card-text
          >
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  //import axios from "axios";

  export default {
    name: "Temp",
    data() {
      return {};
    },
    computed: {
      novigrad() {
        return this.$store.getters.currentTemp;
      },
    },

    // async mounted() {
    //   try {
    //     let response = await axios.get(
    //       "http://www.7timer.info/bin/api.pl?lon=45.33&lat=13.58&product=civillight&output=json"
    //     );
    //     this.loading = false;
    //     this.data = response.data.dataseries;
    //     console.log(response);
    //   } catch (error) {
    //     this.loading = false;
    //     this.error = error.data;
    //   }
    // },
    // methods: {
    //   async loadTemp() {
    //     try {
    //       let response = await axios.get(
    //         "http://www.7timer.info/bin/api.pl?lon=45.33&lat=13.58&product=civillight&output=json"
    //       );
    //       this.loading = false;
    //       this.data = response.data.dataseries;
    //       console.log(response);
    //     } catch (error) {
    //       this.loading = false;
    //       this.error = error.data;
    //     }
    //   },
    // },
    // mounted() {
    //   this.loadTemp();
    // },
  };
</script>
