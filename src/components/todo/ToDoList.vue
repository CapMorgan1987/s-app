<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <h2 class="mb-4">Zadaci</h2>
        <v-card
          v-for="todo in todos"
          :key="todo.id"
          class="d-flex justify-space-between align-center px-2 py-1 my-2"
          :class="{ 'is-done': todo.done }"
        >
          <span>{{ todo.name }}</span>
          <div>
            <v-btn
              :color="todo.done === false ? 'primary' : 'red'"
              class="check-list-item"
              @click="done(todo.id, todo.done)"
              :class="{ 'is-done-btn': todo.done }"
            >
              <v-icon v-if="!todo.done">mdi-check</v-icon>
              <v-icon v-else color="white">mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="deleteTodo(todo.id)">
              <v-icon :color="todo.done === false ? 'red' : 'white'"
                >mdi-delete</v-icon
              >
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "toDo",
    data() {
      return {};
    },
    computed: {
      todos() {
        return this.$store.getters.getTodo;
      },
    },
    created() {
      return this.$store.dispatch("loadTodos");
    },
    methods: {
      deleteTodo(id) {
        this.$store.dispatch("deleteTodo", id);
        return this.$store.dispatch("loadTodos");
      },
      done(id, done) {
        this.$store.dispatch("changeDone", { id, done });
        return this.$store.dispatch("loadTodos");
      },
    },
  };
</script>

<style>
  .is-done {
    background-color: var(--v-primary-base) !important;
  }
</style>