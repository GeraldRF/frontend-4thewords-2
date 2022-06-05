<template>
  <Form :historicalEvent="this.historicalEvent" @submited="submitData"></Form>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "UpdateHistoricalEvent",
  components: { Form },
  
  data() {
    return {
      historicalEvent: {},
    };
  },
  mounted() {
    this.axios
      .get(
        "http://localhost:8000/api/historical-events/" + this.$route.params.id
      )
      .then((response) => {
        this.historicalEvent = response.data.data;
      })
      .catch((error) => {
        alert("Ha ocurrido un error, recargue la pagina.");
      });
  },
  methods: {
    submitData(dataSubmited) {
      this.axios
        .put(
          `http://localhost:8000/api/historical-events/${this.historicalEvent.id}`,
          dataSubmited
        )
        .then((response) => {
          this.$router.push({ name: "Home", query: { u: '1' } });
        })
        .catch((error) => {
          alert("Ha ocurrido un error");
        });
    },
  },
};
</script>
