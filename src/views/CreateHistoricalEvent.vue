<template>
  <Form @submited="submitData"></Form>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "CreateHistoricalEvent",
  components: { Form },
  methods: {
    submitData(dataSubmited) {
      var formData = new FormData();
      formData.append("img_url", dataSubmited.img_url);
      formData.append("name", dataSubmited.name);
      formData.append("description", dataSubmited.description);
      formData.append("history", dataSubmited.history);
      formData.append("date", dataSubmited.date);
      formData.append("popularity", 0);
      formData.append("country", dataSubmited.country);
      formData.append("coordinates", dataSubmited.coordinates);
      var config = {
        method: "post",
        url: "http://localhost:8000/api/historical-events",
        data: formData,
      };

      this.axios(config)
        .then((response) => {
          this.$router.push({name:'Home', query: {c:'1'}})
        })
        .catch((error) => {
          alert('Ha ocurrido un error')
        });
    },
  },
};
</script>