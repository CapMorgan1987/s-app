<template>
  <v-app>
    <sab-header />
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
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
  .slide-fade-enter-active {
    transition: all 0.3s ease-in;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-to {
    transform: translateX(1000px);
    opacity: 0;
  }
  .slide-fade-enter {
    transform: translateX(-200px);
    opacity: 0;
  }
</style>
