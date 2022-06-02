<template>
  <div class="w-full">
    <h2 class="text-center mt-10 text-xl">Complete los datos</h2>
    <form
      class="my-20 mx-auto w-11/12 sm:w-10/12 flex flex-wrap justify-around gap-y-10"
      ref="form"
    >
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label for="name" class="text-gray-800">Nombre</label>
        <input
          type="text"
          name="name"
          class="border-b-2 border-blue-300 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label for="date" class="text-gray-800">Fecha del suceso</label>
        <input
          type="date"
          name="date"
          class="border-b-2 border-blue-300 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-11/12 lg:w-5/12">
        <label for="description" class="text-gray-800">Descripción</label>
        <textarea
          name="description"
          class="p-2 shadow-md outline-none text-gray-500 rounded resize-none"
          rows="6"
        ></textarea>
      </div>
      <div class="p-2 shadow-md flex flex-col items-center gap-y-4 w-full md:w-11/12 lg:w-5/12 border-2">
        <div class="w-full flex flex-col ">
          <label for="img" class="text-gray-800">Seleccione una imagen de su equipo</label>
          <input
            type="file"
            name="img"
            class="border-b-2 border-blue-300 outline-none text-gray-500"
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
            class="border-b-2 border-blue-300 outline-none text-gray-500"
          />
        </div>
      </div>
      <div class="w-full mt-14 mb-1 border-b-2"></div>
      <div class="w-full flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 w-full md:w-max bg-blue-700 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateHistoricalEvent",
  mounted() {
    this.$refs.form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  },
};
</script>