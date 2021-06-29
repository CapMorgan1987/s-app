<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <sab-shoplist />
      </v-col>
      <v-col cols="12" md="6">
        <sab-todolist />
      </v-col>
    </v-row>
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

