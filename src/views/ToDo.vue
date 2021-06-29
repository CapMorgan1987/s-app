<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <sab-todolist />
      </v-col>
      <v-col cols="12" md="6">
        <sab-addtodo />
      </v-col>
    </v-row>
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