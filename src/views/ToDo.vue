<template>
  <div class="main-background">
    <v-container class="mb-6">
      <v-row>
        <v-col cols="12" md="6">
          <sab-todolist />
        </v-col>
        <v-col cols="12" md="6">
          <sab-addtodo />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import ToDoList from "@/components/todo/ToDoList.vue";
  import AddToDo from "@/components/todo/AddToDo.vue";

  export default {
    name: "toDo",
    data() {
      return {};
    },
    components: {
      "sab-todolist": ToDoList,
      "sab-addtodo": AddToDo,
    },
  };
</script>

<style scoped>
  .main-background {
    background-color: rgba(189, 230, 173, 0.473);
    min-height: 76%;
  }
</style>