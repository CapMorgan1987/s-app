<template>
  <div class="main-background">
    <v-container class="my-6">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="8">
              <sab-shoplist />
            </v-col>
            <v-col cols="12" md="4">
              <sab-addlist />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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

<style scoped>
  .main-background {
    min-height: 76%;
  }
</style>