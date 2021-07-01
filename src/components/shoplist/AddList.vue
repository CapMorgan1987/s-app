<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="addList" v-model="valid">
          <v-select
            :items="shops"
            label="Trgovina"
            v-model="listName"
            solo
          ></v-select>
          <v-text-field
            v-model="items.item"
            :rules="listItemRules"
            :counter="20"
            placeholder="Proizvod"
            solo
          >
          </v-text-field>
          <v-text-field
            v-model="items.quantity"
            :rules="listQuantityRules"
            :counter="10"
            placeholder="Količina"
            solo
          >
          </v-text-field>
          <v-btn
            color="rgba(91, 230, 64, 0.685)"
            @click="addItem"
            :disabled="!valid"
          >
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text">Dodaj proizvod</span>
          </v-btn>
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
          <v-btn
            v-if="list != ''"
            color="primary"
            type="submit"
            :disabled="checkList"
          >
            <v-icon color="white">mdi-plus</v-icon>
            <span class="white--text">Dodaj listu</span>
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
          (v) => !!v || "Dodaj proizvod",
          (v) => v.length >= 3 || "Proizvod mora imati min 3 znaka",
          (v) => v.length <= 20 || "Proizovd mora biti kraći od 30 znakova",
        ],
        listQuantityRules: [
          (v) => !!v || "Dodaj količinu",
          (v) => v.length <= 10 || "Količina mora biti manja od 10 znakova",
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
        this.items.item = "";
        this.items.quantity = "";
      },
      addList() {
        const listData = {
          listName: this.listName,
          items: this.list,
          edit: false,
        };
        this.$store.dispatch("createList", listData);
        this.$store.dispatch("loadLists");
        this.listName = "";
        this.list = [];
      },
      deleteItem(it) {
        this.list.splice(this.list.indexOf(it), 1);
      },
    },
  };
</script>

<style scoped>
  .color {
    color: rgba(91, 230, 64, 0.685);
  }
</style>