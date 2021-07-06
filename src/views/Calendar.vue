<template>
  <div class="background-color">
    <v-container class="my-6">
      <sab-calendar />
    </v-container>
  </div>
</template>

<script>
  import Calendar from "@/components/Calendar.vue";

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      "sab-calendar": Calendar,
    },
  };
</script>

<style scoped>
  .background-color {
    min-height: 76%;
  }
</style>