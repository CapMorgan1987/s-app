<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <h3 class="text-center">Add To Do</h3>
      </v-col>
      <v-col cols="12" md="6">
        <v-form @submit.prevent="addTodo" v-model="valid">
          <v-text-field
            v-model="todo"
            placeholder="To do...."
            :counter="30"
            :rules="todoRules"
          >
          </v-text-field>
          <v-btn color="primary" type="submit" :disabled="!valid">
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text"> Add to list</span>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "AddToDo",

    data() {
      return {
        todo: "",
        todoRules: [
          (v) => !!v || "Add to do",
          (v) => v.length >= 3 || "Must be longer than 2 characters",
          (v) =>
            (v.length >= 3 && v.length <= 30) ||
            "Must be shorter than 30 characters",
        ],
        valid: false,
      };
    },

    methods: {
      addTodo() {
        const todoData = {
          todo: this.todo,
          done: false,
        };
        this.todo = "";
        this.$store.dispatch("createTodo", todoData);
        console.log(this.$store.state.loadedTodos);
        return this.$store.dispatch("loadTodos");
      },
      // onSubmit() {
      //   let todo = this.todo;
      //   let done = this.done;
      //   this.todo = "";
      //   axios
      //     .post("/todo.json", { todo, done })
      //     .then((res) => {
      //       console.log(res);
      //       this.valid = false;
      //     })
      //     .catch((error) => console.log(error));
      // },
    },
  };
</script>
