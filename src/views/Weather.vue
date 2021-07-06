<template>
  <div>
    <v-container class="my-6">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="4">
          <v-form @submit.prevent="findCity" v-model="valid" ref="findCity">
            <v-text-field
              v-model="city"
              label="Grad..."
              :rules="cityRules"
              color="light-blue"
            ></v-text-field>
            <v-btn type="submit" color="light-blue" :disabled="!valid" dark
              >Traži...</v-btn
            >
            <v-alert
              border="right"
              colored-border
              type="error"
              elevation="2"
              v-if="errorMsg"
            >
              {{ errorMsg }}
            </v-alert>
          </v-form>
        </v-col>
        <v-col cols="12" v-if="info">
          <v-card color="light-blue" dark>
            <v-card-title>Grad: {{ info.data.city.name }}</v-card-title>
            <v-card-subtitle
              >Država: {{ info.data.city.country }}
            </v-card-subtitle>
            <v-row class="d-flex">
              <sab-info />
              <sab-current />
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex" v-if="info">
        <v-col cols="12">
          <v-card>
            <v-toolbar color="light-blue" dark>
              <v-tabs v-model="tab" center-active>
                <v-tabs-slider color="black"></v-tabs-slider>
                <v-tab active-class="light"> Prognoza za 3 sata </v-tab>
                <v-tab active-class="light"> Prognoza za 12 sati </v-tab>
                <v-tab active-class="light"> Prognoza za 24 sata </v-tab>
              </v-tabs>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <sab-threeHours />
              </v-tab-item>
              <v-tab-item>
                <sab-twelveHours />
              </v-tab-item>
              <v-tab-item>
                <sab-twentyFourHours />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import InfoCity from "@/components/weather/InfoCity.vue";
  import Current from "@/components/weather/Current.vue";
  import ThreeHours from "@/components/weather/3hoursWeather.vue";
  import TwelveHours from "@/components/weather/12hoursWeather.vue";
  import TwentyFourHours from "@/components/weather/24hoursWeather.vue";

  export default {
    name: "Weather",
    data() {
      return {
        city: "",
        errorMsg: "",
        tab: null,
        cityRules: [(v) => !!v || "Upiši grad"],
        valid: false,
      };
    },
    components: {
      "sab-current": Current,
      "sab-info": InfoCity,
      "sab-threeHours": ThreeHours,
      "sab-twelveHours": TwelveHours,
      "sab-twentyFourHours": TwentyFourHours,
    },
    computed: {
      info() {
        return this.$store.getters.cityWeather;
      },
      error() {
        return this.$store.getters.cityError;
      },
    },
    methods: {
      findCity() {
        let city = this.city.toLowerCase();
        this.$store.dispatch("cityWeather", city);
        this.$refs.findCity.reset();
        this.city = "";
        this.errorMsg = "";
      },
    },
    watch: {
      error() {
        this.errorMsg = "Došlo je do pogreške, pokušajte ponovo";
      },
    },
  };
</script>

<style scooped>
  .light {
    background-color: rgba(173, 216, 230, 0.473);
  }
  .main-background {
    min-height: 76%;
  }
</style>