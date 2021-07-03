<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <h2 class="mb-6">Zadaci</h2>

        <v-dialog
          v-model="dialog"
          width="500"
          v-for="todo in todos"
          :key="todo.id"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="d-flex justify-space-between align-center px-2 py-1 my-2"
              :class="{ 'is-done': todo.done }"
              :color="todo.color"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ todo.name }}</span>
              <div>
                <v-btn
                  :color="todo.done === false ? 'primary' : 'red'"
                  class="check-list-item"
                  @click.stop="done(todo.id, todo.done)"
                  :class="{ 'is-done-btn': todo.done }"
                  elevation="10"
                >
                  <v-icon v-if="!todo.done">mdi-check</v-icon>
                  <v-icon v-else color="white">mdi-close</v-icon>
                </v-btn>
                <v-btn icon @click.stop="deleteTodo(todo.id)" elevation="10">
                  <v-icon :color="todo.done === false ? 'red' : 'white'"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </div>
            </v-card>
          </template>
          <v-card
            class="mx-auto"
            max-width="500"
            outlined
            :color="todo.color"
            dark
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-toolbar-title> {{ todo.name }} </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="white" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="pointer" @click="editTodo(todo)"
                      >Izmjeni</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      class="pointer"
                      @click="deleteTodo(todo.id)"
                      >Izbriši</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      class="pointer"
                      @click="done(todo.id, todo.done)"
                      >Gotov</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-app-bar>
            <v-card-subtitle>
              Od: {{ todo.start }} <br />Do: {{ todo.end }}
            </v-card-subtitle>
            <v-card-text v-if="!todo.editable">
              Opis:
              {{ todo.description }}
            </v-card-text>
            <v-card-text v-else>
              <v-text-field
                label="Opis zadatka"
                v-model="newDescription"
                :rules="descriptionRules"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="todo.editable"
                color="primary"
                type="submit"
                class="mb-3"
              >
                <span
                  class="white--text"
                  @click="saveEditedTodo(todo, newDescription, todo.id)"
                  >Spremi</span
                >
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red" @click="dialog = false"> Zatvori </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "toDo",
    data() {
      return {
        dialog: false,
        newDescription: "",
        descriptionRules: [
          (v) => !!v || "Dodaj opis",
          (v) => v.length >= 3 || "Opis mora biti duži od 2 znaka",
          (v) =>
            (v.length >= 3 && v.length <= 160) ||
            "Opis mora biti kraći od 161 znaka",
        ],
      };
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
      editTodo(todo) {
        todo.editable = true;
      },
      saveEditedTodo(todo, newDescription, id) {
        this.$store.dispatch("editTodo", { newDescription, id });
        this.newDescription = "";
        todo.editable = false;
        return this.$store.dispatch("loadTodos");
      },
    },
  };
</script>

<style>
  .is-done {
    background-color: var(--v-primary-base) !important;
  }
  .pointer {
    cursor: pointer;
  }
</style>