<template>
  <div>
    <v-toolbar color="black" height="auto">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          src="https://picsum.photos/1000/400"
          gradient="to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)"
          height="100%"
        ></v-img>
      </template>
      <v-row class="px-1 px-md-8">
        <v-col
          cols="12"
          class="d-flex justify-space-between align-center mt-4 mb-4 mb-md-12"
        >
          <v-app-bar-nav-icon
            color="white"
            @click="drawer = true"
            :disabled="!loggedIn"
          ></v-app-bar-nav-icon>

          <router-link to="login" v-if="!loggedIn">
            <v-btn color="white">
              <v-icon color="black">mdi-account</v-icon>
              Prijava
            </v-btn>
          </router-link>
          <v-btn color="white" v-else @click.prevent="logout">
            <v-icon color="black">mdi-account</v-icon>
            Odjava
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="d-flex justify-end mt-4 mt-md-12 mb-4"
          v-if="user && temp"
        >
          <p class="white--text mb-0">
            Ciao {{ name }}, sada je {{ temp.main.temp }} ºC
          </p>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      top
      temporary
      color="#FAFAFA"
    >
      <v-list nav dense absolute>
        <v-btn @click="drawer = false" color="white" top fixed right fab>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-list-item-group v-model="group" class="mt-4 mt-md-12">
          <router-link to="/">
            <v-list-item color="#616161">
              <v-list-item-title>Početna</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/todo">
            <v-list-item color="#616161">
              <v-list-item-title>Zadaci</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/shop">
            <v-list-item color="#616161">
              <v-list-item-title>Shop Liste</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/weather">
            <v-list-item color="#616161">
              <v-list-item-title>Vrijeme</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import firebase from "firebase";

  export default {
    name: "Header",

    data: () => ({
      drawer: false,
      group: null,
      loggedIn: false,
      user: "",
      name: "",
    }),
    methods: {
      setupFirebase() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if (user.email == "aron.morgan87@gmail.com") {
              this.name = "Aron";
            } else if (user.email == "sabina.skreblin@gmail.com") {
              this.name = "Sabina";
            } else {
              this.name = user.email.split(".")[0].toUpperCase();
            }
            this.loggedIn = true;
            this.user = user;
            // console.log(this.user);
          } else {
            this.loggedIn = false;
            this.user = "";
          }
        });
      },
      logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.dispatch("setUser", null);
            this.$router.push("login");
          });
      },
    },
    computed: {
      temp() {
        return this.$store.getters.currentTemp;
      },
    },
    mounted() {
      this.setupFirebase();
    },
    // created() {
    //   return this.$store.dispatch("loadOpenWeather");
    // },
    watch: {
      group() {
        this.drawer = false;
      },
    },
  };
</script>
<style scoped>
</style>