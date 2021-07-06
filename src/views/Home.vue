<template>
  <div class="background-color">
    <v-container class="my-6">
      <v-row>
        <v-col cols="12" md="4">
          <sab-todolist />
        </v-col>
        <v-col cols="12" md="8">
          <sab-calendar />
        </v-col>
        <v-col cols="12">
          <sab-shoplist />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import ShopList from "@/components/shoplist/ShopList.vue";
  import ToDoList from "@/components/todo/ToDoList.vue";
  import Calendar from "@/components/Calendar.vue";

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      "sab-shoplist": ShopList,
      "sab-todolist": ToDoList,
      "sab-calendar": Calendar,
    },
  };
</script>

<style scoped>
  .background-color {
    min-height: 76%;
  }
</style>