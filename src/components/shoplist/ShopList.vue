<template>
  <div>
    <v-row>
      <h2 class="mb-4 pl-4">Liste za spežu</h2>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" md="4" v-for="(list, i) in lists" :key="list.id">
        <v-card height="auto" class="mb-6">
          <div class="pt-3">
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title class="pointer" @click="edit(i)"
                    >Edit</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    class="pointer"
                    @click="deleteList(list.id)"
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>

            <v-img
              :src="require('@/assets/' + list.listName + '.png')"
              gradient="to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)"
              height="150px"
              contain
            ></v-img>
          </div>
          <v-card-title>{{ list.listName }}</v-card-title>
          <div
            class="d-flex align-center px-4"
            v-for="(listItem, i) in list.list"
            :key="i"
            :class="{ 'is-done': listItem.done }"
          >
            <v-card-text class="px-0 my-2">
              {{ listItem.item }} - {{ listItem.quantity }}
            </v-card-text>
            <v-btn
              :color="listItem.done === false ? 'primary' : 'red'"
              class="check-list-item"
              @click="done(list.id, i, listItem.done)"
            >
              <v-icon v-if="!listItem.done">mdi-check</v-icon>
              <v-icon v-else color="white">mdi-check</v-icon>
            </v-btn>
            <v-btn
              color="red"
              class="check-list-item"
              @click="deleteItem(list.id, i)"
            >
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </div>
          <div class="px-4" v-if="list.edit === true">
            <v-form @submit.prevent="addToList(list.id)" v-model="valid">
              <v-text-field
                label="proizvod"
                :rules="listItemRules"
                :counter="20"
                v-model="items.item"
              ></v-text-field>
              <v-text-field
                label="kolicina"
                :rules="listQuantityRules"
                :counter="10"
                v-model="items.quantity"
              ></v-text-field>
              <v-btn
                color="primary"
                type="submit"
                class="mb-3"
                :disabled="valid === false"
              >
                <v-icon color="white">mdi-plus</v-icon>
                <span class="white--text">Dodaj proizvod</span>
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/database";

  export default {
    name: "ShopList",
    data() {
      return {
        items: {
          item: "",
          quantity: "",
          done: false,
        },

        valid: false,
        listItemRules: [
          (v) => !!v || "Dodaj proizvod",
          (v) => v.length >= 3 || "Proizvod mora imati min 3 znaka",
          (v) => v.length <= 20 || "Proizovd mora biti kraći od 30 znakova",
        ],
        listQuantityRules: [
          (v) => !!v || "Dodaj količinu",
          (v) => v.length <= 10 || "Količina mora biti manja od 10 znakova",
        ],
      };
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
      deleteItem(id, i) {
        this.$store.dispatch("deleteItem", { id, i });
        return this.$store.dispatch("loadLists");
      },
      deleteList(id) {
        firebase.database().ref("list").child(id).remove();
        this.$store.dispatch("loadLists");
      },
      edit(i) {
        this.lists[i].edit = true;
      },
      addToList(id) {
        let newItem = {
          item: this.items.item,
          quantity: this.items.quantity,
          done: false,
        };
        this.$store.dispatch("updateList", { id, newItem });
        this.items.item = "";
        this.items.quantity = "";
        return this.$store.dispatch("loadLists");
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
  .pointer {
    cursor: pointer;
  }
</style>