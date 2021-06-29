<template>
  <div>
    <v-row>
      <v-col cols="12">
        <sab-temp />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Temp from "@/components/Temp.vue";

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      "sab-temp": Temp,
    },
  };
</script>

