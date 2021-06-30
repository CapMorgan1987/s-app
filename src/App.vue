<template>
  <v-app>
    <sab-header />
    <router-view />
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
  };
</script>

<style>
  .v-application a {
    text-decoration: none;
  }
</style>
