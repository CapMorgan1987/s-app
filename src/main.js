import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { routes } from './router/routes'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase/app";
import 'firebase/auth'

Vue.config.productionTip = false


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log(user);

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});

