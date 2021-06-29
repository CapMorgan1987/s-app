<template>
  <v-app>
    <sab-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Header from "@/components/Header.vue";

  export default {
    name: "App",

    data: () => ({
      //
    }),
    components: {
      "sab-header": Header,
    },
    created() {
      return this.$store.dispatch("geoLocation");
    },
  };
</script>

<style>
  .v-application a {
    text-decoration: none;
  }
</style>
