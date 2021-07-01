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
            label="type"
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="weekdays"
            class="ma-2"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :events="todos"
            color="primary"
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
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.description"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
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
      value: "",
      weekdays: [
        { text: "Pon - Ned", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Pon - Pet", value: [1, 2, 3, 4, 5] },
      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
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
    },
  };
</script>