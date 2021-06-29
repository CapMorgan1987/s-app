<template>
  <v-row class="d-flex justify-center py-12">
    <v-col cols="12" md="4">
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" label="E-mail"></v-text-field>
        <v-text-field
          v-model="password"
          append-icon="mdi-eye-off"
          label="Password"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn type="submit"> Login </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
  // import firebase from "firebase/app";
  import { auth } from "../firebase";

  export default {
    name: "Login",

    data: () => ({
      auth,
      email: "",
      password: "",
      show: false,
    }),

    methods: {
      // async login() {
      //   try {
      //     await auth
      //       .signInWithEmailAndPassword(this.email, this.password)
      //       .then((userCredential) => {
      //         const { email, uid } = userCredential.user;
      //         this.$store.dispatch("setUser", { email, uid });
      //         this.$router.push("/");
      //       });
      //     console.log(auth);
      //   } catch (error) {
      //     alert(error.message);
      //   }
      // },
      login() {
        try {
          auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              const { email, uid } = userCredential.user;
              this.$store.dispatch("setUser", { email, uid });
              this.$router.push("/");
            });
          console.log(auth);
        } catch (error) {
          alert(error.message);
        }
      },
    },
  };
</script>
