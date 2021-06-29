import Home from "../views/Home.vue";
import ToDo from "../views/ToDo.vue";
import Shop from "../views/Shop.vue";
import Login from "../views/Login.vue";
import Weather from "../views/Weather.vue";

export const routes = [
  {
    path: "/", component: Home, meta: {
      requiresAuth: true
    }
  },
  {
    path: "/todo", component: ToDo, meta: {
      requiresAuth: true
    }
  },
  {
    path: "/shop", component: Shop, meta: {
      requiresAuth: true
    }
  },
  {
    path: "/weather", component: Weather, meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login", component: Login
  }
];
