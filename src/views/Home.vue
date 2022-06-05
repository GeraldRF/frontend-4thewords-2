<template>
  <div class="flex">
    <div class="hidden lg:block w-3/12"></div>
    <div
      class="
        sm:p-4
        lg:p-10
        xl:px-15
        hidden
        lg:flex
        fixed
        lg:flex-col
        w-3/12
        h-full
        bg-gray-50
        shadow-lg
        z-0
      "
    >
      <div class="w-full mb-5 text-xl text-blue-900">
        <h2>Vease tambien:</h2>
      </div>
      <div>
        <ul>
          <li>
            <router-link to="/top-10" class="flex items-start hover:underline">
              <TrendingUpIcon class="w-9 xl:w-6 mr-2"></TrendingUpIcon> Top 10 sucesos
              historicos mas populares
            </router-link>
          </li>
          <li>
            <router-link to="/orden-cronologico" class="flex items-start hover:underline">
              <ClockIcon class="w-9 xl:w-6 mr-2"></ClockIcon> Sucesos historicos
              cronologicamente ordenados
            </router-link>
          </li>
          <li>
            <router-link to="/mapa" class="flex items-start hover:underline">
              <LocationMarkerIcon class="w-9 xl:w-6 mr-2"></LocationMarkerIcon> Mapa
              con todos los sucesos historicos</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="px-5 md:px-20 w-full lg:w-9/12 h-full overflow-auto">
      <div class="w-full my-10 text-xl md:text-2xl xl:text-3xl text-blue-900">
        <h1>Sucesos historicos</h1>
      </div>

      <HistoricalEventList :historicalEvents="this.historicalEvents"></HistoricalEventList>
       
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import HistoricalEventList from "@/components/HistoricalEventList.vue";
import { ThumbUpIcon, PencilAltIcon, TrashIcon } from "@heroicons/vue/solid";
import { TrendingUpIcon, LocationMarkerIcon, ClockIcon } from "@heroicons/vue/outline";

export default {
  name: "Home",
  components: {
    Navbar,
    HistoricalEventList,
    TrendingUpIcon,
    LocationMarkerIcon,
    ClockIcon,
    ThumbUpIcon,
    PencilAltIcon,
    TrashIcon,
  },
  data() {
    return {
      historicalEvents: [],
    };
  },
  mounted() {
    this.axios
      .get("http://localhost:8000/api/historical-events")
      .then((response) => {
        this.historicalEvents = response.data.data;
      });
  },
};
</script>

<style>
</style>