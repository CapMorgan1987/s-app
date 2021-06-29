<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="addList" v-model="valid">
          <v-select :items="shops" label="Shop" v-model="listName"></v-select>
          <v-text-field
            v-model="items.item"
            :rules="listItemRules"
            :counter="20"
            placeholder="Item name"
          >
          </v-text-field>
          <v-text-field
            v-model="items.quantity"
            :rules="listQuantityRules"
            :counter="10"
            placeholder="Quantity"
          >
          </v-text-field>
          <div v-if="list">
            <v-card
              v-for="item in list"
              :key="item.id"
              class="d-flex justify-space-between align-center px-2 py-1 my-2"
            >
              <span>{{ item.item }} - {{ item.quantity }}</span>
              <v-btn icon @click="deleteItem(item.id)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </div>
          <v-btn color="primary" @click="addItem" :disabled="!valid">
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text">Add item</span>
          </v-btn>
          <v-btn color="primary" type="submit" :disabled="checkList">
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text">Add list</span>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  // import axios from "axios";

  export default {
    name: "AddList",

    data() {
      return {
        shops: ["Lidl", "Kaufland", "Eurospin", "Plodine", "Konzum"],
        listItemRules: [
          (v) => !!v || "Add item",
          (v) => v.length >= 3 || "Must be longer than 2 characters",
          (v) => v.length <= 20 || "Must be shorter than 20 characters",
        ],
        listQuantityRules: [
          (v) => !!v || "Add quantity",
          (v) => v.length <= 10 || "Must be shorter than 10 characters",
        ],
        valid: false,
        listName: "",
        items: {
          item: "",
          quantity: "",
          done: false,
        },
        list: [],
      };
    },
    computed: {
      checkList() {
        return !(this.listName && this.list.length >= 1);
      },
    },
    methods: {
      addItem() {
        let item = this.items.item;
        let quantity = this.items.quantity;
        let done = this.items.done;
        this.list.push({ item, quantity, done });
        console.log(this.list);
        this.items.item = "";
        this.items.quantity = "";
      },
      addList() {
        const listData = {
          listName: this.listName,
          items: this.list,
        };
        this.listName = "";
        this.list = [];
        this.$store.dispatch("createList", listData);
        this.$store.dispatch("loadLists");
      },
      deleteItem(it) {
        this.list.splice(this.list.indexOf(it), 1);
      },
    },
  };
</script>
