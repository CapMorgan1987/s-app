<template>
  <div class="main-background">
    <v-container class="my-6">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="4">
              <sab-todolist />
            </v-col>
            <v-col cols="12" md="8">
              <sab-addtodo />
            </v-col>
          </v-row>
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
    min-height: 76%;
  }
</style>