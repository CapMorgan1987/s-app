<template>
  <div class="background-color">
    <v-container class="my-6">
      <v-row>
        <v-col cols="12" md="6">
          <sab-shoplist />
        </v-col>
        <v-col cols="12" md="6">
          <sab-todolist />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import ShopList from "@/components/shoplist/ShopList.vue";
  import ToDoList from "@/components/todo/ToDoList.vue";

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      "sab-shoplist": ShopList,
      "sab-todolist": ToDoList,
    },
  };
</script>

<style scoped>
  .background-color {
    background-color: rgba(229, 238, 146, 0.521);
    min-height: 76%;
  }
</style>