<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10">
        <h2 class="mb-4">Dodaj zadatak</h2>
      </v-col>
      <v-col cols="12" md="12" class="add-todo">
        <v-form @submit.prevent="addTodo" v-model="valid" ref="add">
          <v-row class="d-flex">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                placeholder="Zadatak..."
                :counter="30"
                :rules="todoRules"
                solo
              >
              </v-text-field>
              <v-textarea
                v-model="description"
                placeholder="Opis"
                :counter="160"
                :rules="descriptionRules"
                solo
              >
              </v-textarea>
              <v-select
                :items="todoTypes"
                item-text="type"
                item-value="color"
                v-model="color"
                label="Odaberi vrstu zadatka"
                attach
                solo
              ></v-select>
              <!-- <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="expandColor = !expandColor"
              >
                Odaberi boju
              </v-btn>
              <v-expand-transition>
                <v-color-picker
                  v-show="expandColor"
                  dot-size="25"
                  swatches-max-height="200"
                  hide-inputs
                  v-model="color"
                ></v-color-picker>
              </v-expand-transition> -->
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column">
              <h3 class="text-center">Početak</h3>
              <!-- <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="expandStartDate = !expandStartDate"
              >
                Datum
              </v-btn> -->
              <v-text-field
                label="Datum"
                prepend-icon="mdi-calendar-range"
                readonly
                v-model="start"
                :rules="dateRules"
                @click="expandStartDate = !expandStartDate"
              ></v-text-field>
              <v-expand-transition>
                <v-date-picker
                  v-show="expandStartDate"
                  v-model="start"
                  color="green lighten-1"
                  elevation="15"
                  :rules="dateRules"
                ></v-date-picker>
              </v-expand-transition>
              <!-- <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="expandStartTime = !expandStartTime"
              >
                Vrijeme
              </v-btn> -->
              <v-text-field
                label="Vrijeme"
                prepend-icon="mdi-clock"
                readonly
                v-model="startTime"
                :rules="timeRules"
                @click="expandStartTime = !expandStartTime"
              ></v-text-field>
              <v-expand-transition>
                <v-time-picker
                  v-show="expandStartTime"
                  v-model="startTime"
                  format="24hr"
                  elevation="15"
                  :rules="timeRules"
                ></v-time-picker>
              </v-expand-transition>
              <h3 class="text-center">Kraj</h3>
              <!-- <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="expandEndDate = !expandEndDate"
              >
                Datum
              </v-btn> -->
              <v-text-field
                label="Datum"
                prepend-icon="mdi-calendar-range"
                readonly
                v-model="end"
                :rules="dateRules"
                @click="expandEndDate = !expandEndDate"
              ></v-text-field>
              <v-expand-transition>
                <v-date-picker
                  v-show="expandEndDate"
                  v-model="end"
                  color="green lighten-1"
                  elevation="15"
                  :rules="dateRules"
                ></v-date-picker>
              </v-expand-transition>

              <!-- <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="expandEndTime = !expandEndTime"
              >
                Vrijeme
              </v-btn> -->
              <v-text-field
                label="Vrijeme"
                prepend-icon="mdi-clock"
                readonly
                v-model="endTime"
                :rules="timeRules"
                @click="expandEndTime = !expandEndTime"
              ></v-text-field>
              <v-expand-transition>
                <v-time-picker
                  v-show="expandEndTime"
                  v-model="endTime"
                  format="24hr"
                  elevation="15"
                  :rules="timeRules"
                ></v-time-picker>
              </v-expand-transition>
            </v-col>
          </v-row>
          <v-btn color="primary" type="submit" :disabled="!valid">
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text"> Dodaj zadatak</span>
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
        name: "",
        description: "",
        todoTypes: [
          { type: "Auto", color: "#575757" },
          { type: "Mathias", color: "#2198c7" },
          { type: "Sabina", color: "#fa8072" },
          { type: "Pablo", color: "#000" },
        ],
        color: "",
        start: "",
        expandStartDate: false,
        startTime: "",
        expandStartTime: false,
        end: "",
        expandEndDate: false,
        endTime: "",
        expandEndTime: false,
        //color: "green",
        //expandColor: false,
        todoRules: [
          (v) => !!v || "Dodaj zadatak",
          (v) => v.length >= 3 || "Zadatak mora biti duži od 2 znaka",
          (v) =>
            (v.length >= 3 && v.length <= 30) ||
            "Zadatak mora biti kraći od 31 znaka",
        ],
        descriptionRules: [
          (v) => !!v || "Dodaj opis",
          (v) => v.length >= 3 || "Opis mora biti duži od 2 znaka",
          (v) =>
            (v.length >= 3 && v.length <= 160) ||
            "Opis mora biti kraći od 161 znaka",
        ],
        dateRules: [(v) => !!v || "Odaberi datum"],
        timeRules: [(v) => !!v || "Odaberi vrijeme"],
        valid: false,
      };
    },

    methods: {
      addTodo() {
        const todoData = {
          name: this.name,
          description: this.description,
          start: this.start + " " + this.endTime,
          end: this.end + " " + this.endTime,
          color: this.color,
          done: false,
        };
        this.$refs.add.reset();
        this.name = "";
        this.description = "";
        this.color = "";
        this.start = "";
        this.startTime = "";
        this.end = "";
        this.endTime = "";
        this.$store.dispatch("createTodo", todoData);
        return this.$store.dispatch("loadTodos");
      },
    },
  };
</script>

<style scoped>
  .add-todo {
    border: 2px solid grey;
    border-radius: 15px;
    padding: 20px;
  }
</style>