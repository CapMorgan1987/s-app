<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Pregled"
          ></v-select>
          <v-spacer></v-spacer>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="Raspon dana"
            class="ma-2"
          ></v-select>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="start"
            :events="todos"
            color="#f1f1f1"
            :type="type"
            :weekdays="weekday"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            locale="hr"
            interval-count="24"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-overflow
          >
            <v-card color="grey lighten-4" width="500px">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon elevation="5" @click="editTodo()">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon color="red" elevation="5">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <p
                  v-if="!selectedEvent.editable"
                  v-html="selectedEvent.description"
                ></p>
                <div class="px-4">
                  <v-text-field
                    v-if="selectedEvent.editable"
                    label="Opis zadatka"
                    v-model="newDescription"
                    :rules="descriptionRules"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="selectedEvent.editable"
                  color="primary"
                  type="submit"
                  class="mb-3"
                >
                  <span
                    class="white--text"
                    @click="saveEditedTodo(newDescription, selectedEvent.id)"
                    >Spremi</span
                  >
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="closeDialog"> Zatvori </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "Calendar",
    data: () => ({
      type: "month",
      types: ["month", "week"],
      weekday: [1, 2, 3, 4, 5, 6, 0],
      start: "",
      weekdays: [
        { text: "Pon - Ned", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Pon - Pet", value: [1, 2, 3, 4, 5] },
      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      descriptionRules: [
        (v) => !!v || "Dodaj opis",
        (v) => v.length >= 3 || "Opis mora biti duži od 2 znaka",
        (v) =>
          (v.length >= 3 && v.length <= 160) ||
          "Opis mora biti kraći od 161 znaka",
      ],
      valid: false,
      newDescription: "",
    }),
    computed: {
      todos() {
        return this.$store.getters.getTodo;
      },
    },
    created() {
      return this.$store.dispatch("loadTodos");
    },
    mounted() {
      this.$refs.calendar.checkChange();
    },
    methods: {
      viewDay({ date }) {
        this.focus = date;
        this.type = "day";
      },
      setToday() {
        this.focus = "";
      },
      prev() {
        this.$refs.calendar.prev();
      },
      next() {
        this.$refs.calendar.next();
      },
      showEvent({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event;
          this.selectedElement = nativeEvent.target;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => (this.selectedOpen = true))
          );
        };

        if (this.selectedOpen) {
          this.selectedOpen = false;
          requestAnimationFrame(() => requestAnimationFrame(() => open()));
        } else {
          open();
        }

        nativeEvent.stopPropagation();
      },
      editTodo() {
        this.selectedEvent.editable = true;
      },
      closeDialog() {
        this.selectedEvent.editable = false;
        this.selectedOpen = false;
      },
      saveEditedTodo(newDescription, id) {
        this.$store.dispatch("editTodo", { newDescription, id });
        this.newDescription = "";
        this.selectedEvent.editable = false;
        return this.$store.dispatch("loadTodos");
      },
    },
  };
</script>