<template>
  <div class="py-3 w-full flex flex-col gap-2 overflow-auto">
    <h2 v-show="historicalEvents.length == 0">No hay historias disponibles</h2>
    <HistoricalEvent
      v-for="hEvent in historicalEvents"
      :key="hEvent.id"
      :historicalEvent="hEvent"
      :id="hEvent.id"
    ></HistoricalEvent>
  </div>
</template>

<script>
import HistoricalEvent from "./HistoricalEvent.vue";
export default {
  name: "HistoricalEventList",
  components: { HistoricalEvent },
  props: {
    historicalEvents: Array,
  },
};
</script>