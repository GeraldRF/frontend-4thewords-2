<template>
  <Form @submited="submitData"></Form>
</template>

<script>
import Form from "@/components/Form.vue"

export default {
  name: "CreateHistoricalEvent",
  components: { Form },
  methods:{
    submitData(data){
        console.log(data);
    }
  }
};
</script>