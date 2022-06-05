<template>
  <div>
    <Map purpose="showAllData" :historicalEvents="this.historicalEvents" height="90vh"></Map>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";

export default {
  name: "EventsMap",
  components: {
   Map
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