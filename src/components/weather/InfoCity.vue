<template>
  <v-col cols="12" md="4">
    <v-card-text><strong>Informacije o gradu</strong></v-card-text>
    <v-card-text>Koordinate: </v-card-text>
    <v-card-text> Lat: {{ info.data.city.coord.lat }} </v-card-text>
    <v-card-text> Lon:{{ info.data.city.coord.lon }} </v-card-text>
    <v-card-text
      >Stanovništvo: {{ info.data.city.population }} stanovnika</v-card-text
    >
  </v-col>
</template>

<script>
  export default {
    name: "InfoCity",
    computed: {
      info() {
        return this.$store.getters.cityWeather;
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