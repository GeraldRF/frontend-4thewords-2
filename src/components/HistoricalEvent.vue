<template>
  <div class="w-full shadow">
    <h2>
      {{ historicalEvent.name }}
    </h2>
  </div>
</template>

<script>
export default {
    name:'HistoricalEvent',
    props: {
        historicalEvent: Object
    }
};
</script>
