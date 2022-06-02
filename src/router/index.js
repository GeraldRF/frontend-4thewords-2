import { createRouter, createWebHistory } from "vue-router";

//import all component used in routes
import Home from "@/views/Home.vue";

//init routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

//create routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;