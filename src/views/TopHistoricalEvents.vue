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
        <h2>Indice:</h2>
      </div>
      <div>
        <ul class="text-gray-600">
          <li v-for="hEvent in this.historicalEvents" :key="hEvent.id">
           <a :href="`#${hEvent.id}`" class="hover:underline">{{historicalEvents.indexOf(hEvent)+1}}. {{hEvent.name}}</a>
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
        <h1 class="">TOP 10 - Sucesos historicos</h1>
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
  </div>
</template>

<script>
import HistoricalEventList from "@/components/HistoricalEventList.vue";
import { PlusIcon } from "@heroicons/vue/outline";

export default {
  name: "TopHistoricalEvents",
   components: {
    HistoricalEventList,
    PlusIcon,
  },
  data() {
    return {
      historicalEvents: [],
    };
  },
  mounted() {
    let events = [];

    this.axios
      .get("http://localhost:8000/api/historical-events")
      .then((response) => {
        events = response.data.data;
        events.sort(this.SortByPopularity);

        if (events.length > 10) {
          events.splice(10, events.length-10)
        }

        this.historicalEvents = events;
      });
  },
  methods: {
    SortByPopularity(x, y) {
      if (x.popularity < y.popularity) {
        return 1;
      }
      if (x.popularity > y.popularity) {
        return -1;
      }
      return 0;
    },
  },
};
</script>
