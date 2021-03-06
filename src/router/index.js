import { createRouter, createWebHistory } from 'vue-router'

//import all component used in routes
import Home from '@/views/Home.vue'
import Create from '@/views/CreateHistoricalEvent.vue'
import Update from '@/views/UpdateHistoricalEvent.vue'
import Details from '@/views/ShowHistoricalEventDetails.vue'
import Top from '@/views/TopHistoricalEvents.vue'
import Chron from '@/views/ChronologicalOrderEvents.vue'
import Map from '@/views/EventsMap.vue'

//init routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/agregar",
    name: "Create",
    component: Create,
  },
  {
    path: "/editar/:id/:name",
    name: "Update",
    component: Update,
  },
  {
    path: "/detalles/:id/:name",
    name: "Details",
    component: Details,
  },
  {
    path: "/top-10",
    name: "Top",
    component: Top,
  },
  {
    path: "/orden-cronologico",
    name: "Chronological",
    component: Chron,
  },
  {
    path: "/mapa",
    name: "Map",
    component: Map,
  },
];

//create routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;