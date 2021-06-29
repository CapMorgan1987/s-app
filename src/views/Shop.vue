<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <sab-shoplist />
      </v-col>
      <v-col cols="12" md="6">
        <sab-addlist />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import ShopList from "@/components/shoplist/ShopList.vue";
  import AddList from "@/components/shoplist/AddList.vue";

  export default {
    name: "toDo",
    data() {
      return {};
    },
    components: {
      "sab-shoplist": ShopList,
      "sab-addlist": AddList,
    },
  };
</script>