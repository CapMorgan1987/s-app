<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <v-card v-for="list in lists" height="auto" :key="list.id" class="mb-6">
          <v-img
            :src="require('@/assets/' + list.listName + '.png')"
            gradient="to bottom, rgba(255,255,255, 0.3), rgba(0, 0, 0, 0.9)"
            height="150px"
            contain
          ></v-img>
          <v-btn
            color="error"
            small
            absolute
            class="close-btn-card"
            @click="deleteList(list.id)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-card-title>{{ list.listName }}</v-card-title>
          <div
            class="d-flex align-center"
            v-for="(listItem, i) in list.list"
            :key="i"
            :class="{ 'is-done': listItem.done }"
          >
            <v-card-text>
              {{ listItem.item }} - {{ listItem.quantity }}
            </v-card-text>
            <v-btn
              :color="listItem.done === false ? 'primary' : 'red'"
              class="check-list-item"
              @click="done(list.id, i, listItem.done)"
            >
              <v-icon v-if="!listItem.done">mdi-check</v-icon>
              <v-icon v-else color="white">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import firebase from "firebase/app";

  export default {
    name: "ShopList",
    data() {
      return {};
    },
    computed: {
      lists() {
        return this.$store.getters.getList;
      },
      logoImg(logo) {
        return require("@/assets/" + logo + ".jpg");
      },
    },
    created() {
      return this.$store.dispatch("loadLists");
    },
    methods: {
      done(id, i, done) {
        this.$store.dispatch("changeListDone", { id, i, done });
        return this.$store.dispatch("loadLists");
      },
      deleteList(l) {
        firebase.database().ref("list").child(l).remove();
        this.$store.dispatch("loadLists");
      },
    },
  };
</script>

<style>
  .close-btn-card {
    top: 0 !important;
    right: 0 !important;
    height: 25px !important;
    min-width: 25px !important;
    padding: 5px !important;
    border-radius: 50%;
  }
  .close-btn-card .v-icon.v-icon,
  .delete-list-item .v-icon.v-icon,
  .check-list-item .v-icon.v-icon,
  .uncheck-list-item .v-icon.v-icon {
    font-size: 14px;
  }
  .delete-list-item,
  .check-list-item {
    height: 20px !important;
    min-width: 20px !important;
    padding: 0 !important;
    margin-right: 5px;
  }
  .uncheck-list-item {
    background-color: red !important;
  }
  .is-done {
    background-color: green;
    color: white !important;
  }
</style>