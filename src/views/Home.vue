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
        <ul class="text-gray-600">
          <li>
            <router-link to="/top-10" class="flex items-start hover:underline">
              <TrendingUpIcon class="w-9 xl:w-6 mr-2"></TrendingUpIcon> Top 10
              sucesos historicos mas populares
            </router-link>
          </li>
          <li>
            <router-link
              to="/orden-cronologico"
              class="flex items-start hover:underline"
            >
              <ClockIcon class="w-9 xl:w-6 mr-2"></ClockIcon> Sucesos historicos
              cronologicamente ordenados
            </router-link>
          </li>
          <li>
            <router-link to="/mapa" class="flex items-start hover:underline">
              <LocationMarkerIcon class="w-9 xl:w-6 mr-2"></LocationMarkerIcon>
              Mapa con todos los sucesos historicos</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="px-5 md:px-20 w-full lg:w-9/12 h-full">
      <div
        class="
          w-full
          pb-2
          mt-7
          mb-5
          flex
          justify-between
          items-center
          text-2xl
          md:text-2xl
          xl:text-3xl
          text-blue-900
          border-b-2
        "
      >
        <h1 class="">Sucesos historicos</h1>
        <router-link
          to="/agregar"
          class="p-1 bg-blue-700 hover:bg-blue-500 text-white rounded-full"
          ><PlusIcon class="w-7"></PlusIcon
        ></router-link>
      </div>

      <HistoricalEventList
        :historicalEvents="this.historicalEvents"
      ></HistoricalEventList>
    </div>

    <div
      ref="notification"
      class="fixed bottom-2 left-3 w-11/12 h-16 sm:w-3/12 text-gray-200"
    >
      <p
        v-show="this.$route.query.r == '1'"
        class="
          px-3
          w-full
          h-full
          flex
          justify-between
          items-center
          bg-green-700
          rounded-lg
        "
      >
        Se ha eliminado correctamente
        <button @click="closePop">
          <XCircleIcon class="w-8"></XCircleIcon>
        </button>
      </p>
      <p
        v-show="this.$route.query.u == '1'"
        class="
          px-3
          w-full
          h-full
          flex
          justify-between
          items-center
          bg-green-700
          rounded-lg
        "
      >
        Se ha actualizado correctamente
        <button @click="closePop">
          <XCircleIcon class="w-8"></XCircleIcon>
        </button>
      </p>
      <p
        v-show="this.$route.query.c == '1'"
        class="
          px-3
          w-full
          h-full
          flex
          justify-between
          items-center
          bg-green-700
          rounded-lg
        "
      >
        Se ha creado correctamente
        <button @click="closePop">
          <XCircleIcon class="w-8"></XCircleIcon>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import HistoricalEventList from "@/components/HistoricalEventList.vue";
import {
  TrendingUpIcon,
  LocationMarkerIcon,
  ClockIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";

export default {
  name: "Home",
  components: {
    HistoricalEventList,
    TrendingUpIcon,
    LocationMarkerIcon,
    ClockIcon,
    PlusIcon,
    XCircleIcon,
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
        if (this.$route.query.q) {
          let q = this.$route.query.q;
          let by = this.$route.query.by;
          if (by == 'name') {
            this.historicalEvents = response.data.data.filter((he) =>
              he.name.toLowerCase().includes(q)
            );
          } else {
            this.historicalEvents = response.data.data.filter((he) =>
              he.country.toLowerCase().includes(q)
            );
          }
        } else {
          this.historicalEvents = response.data.data;
        }
      });
  },
  methods: {
    closePop(action) {
      this.$refs.notification.classList.add("hidden");
      this.$router.replace({
        route: this.$router.currentRoute,
        query: { undefined },
      });
    },
  },
};
</script>

<style>
</style>