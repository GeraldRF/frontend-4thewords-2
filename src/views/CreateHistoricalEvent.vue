<template>
  <div class="w-full">
    <form
      class="
        my-20
        mx-auto
        w-11/12
        sm:w-10/12
        flex flex-wrap
        justify-around
        gap-y-10
        md:text-2xl
      "
      ref="form"
    >
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label for="name" class="text-gray-800">Nombre</label>
        <input
          type="text"
          name="name"
          class="border-b-2 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label for="date" class="text-gray-800">Fecha del suceso</label>
        <input
          type="date"
          name="date"
          class="border-b-2 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-11/12 lg:w-5/12">
        <label for="description" class="text-gray-800">Descripción</label>
        <textarea
          name="description"
          class="p-2 shadow-md border-2 outline-none text-gray-500 rounded resize-none"
          rows="6"
        ></textarea>
      </div>
      <div
        class="
          p-2
          shadow-md
          flex flex-col
          items-center
          gap-y-4
          w-full
          md:w-11/12
          lg:w-5/12
          border-2
        "
      >
        <div class="w-full flex flex-col">
          <label for="img" class="text-gray-800 mb-2"
            >Seleccione una imagen relativa al suceso</label
          >
          <input
            type="file"
            name="img"
            class="border-b-2 outline-none text-gray-500"
          />
        </div>
        <p>Ó</p>
        <div class="w-full flex flex-col">
          <label for="img_url" class="text-gray-800"
            >Pegue una url externa</label
          >
          <input
            type="text"
            name="img_url"
            class="border-b-2 outline-none text-gray-500"
          />
        </div>
      </div>
      <div class="w-full md:w-11/12 border-2 rounded shadow">
        <div class="flex flex-wrap justify-between md:justify-start md:gap-x-5 gap-y-2">
          <div>
            <label for="country">Pais: </label>
            <input type="text" name="country" class="pl-2 bg-gray-100 rounded" v-model="this.country" disabled />
          </div>
          <div>
            <label for="coordinates">Coordenadas: </label>
            <input type="text" name="coordinates" class="pl-2 bg-gray-100 rounded" v-model="this.coordinates" disabled />
          </div>
        </div>
        <Map purpose="input" @setData="setMapData"></Map>
      </div>
      <div class="w-full mt-2 mb-1 border-b-2"></div>
      <div class="w-full flex justify-end">
        <button
          type="submit"
          class="px-10 py-3 w-full md:w-max md:mr-3 text-xl bg-blue-700 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";

export default {
  name: "CreateHistoricalEvent",
  components: { Map },
  data() {
    return {
      country: '',
      coordinates: ''
    }
  },
  mounted() {
    this.$refs.form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  },
  methods:{
    setMapData(data){
        this.country = data.country;
        this.coordinates = data.coordinates;
    }
  }
};
</script>