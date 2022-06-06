<template>
  <div class="mx-auto w-10/12">
    <div class="sm:m-3 mt-8 mb-3 w-full border-b-2 flex flex-wrap gap-3 justify-center sm:justify-between items-center">
      <h1 class="sm:m-2 text-3xl text-blue-700 font-bold">{{ this.historicalEvent.name }}</h1>
      <ul class="flex justify-center items-center gap-3">
        <li class="flex items-center">
          <button class="hover:text-blue-900" @click="giveLike">
            <ThumbUpIcon class="w-8"></ThumbUpIcon>
          </button>
          <span class="px-2 bg-blue-500 text-white rounded">{{
            this.historicalEvent.popularity
          }}</span>
        </li>
        <li class="flex items-center">
          <router-link
            :to="{
              name: 'Update',
            }"
            class="hover:text-yellow-400"
          >
            <PencilAltIcon class="w-8"></PencilAltIcon>
          </router-link>
        </li>
        <li class="flex items-center">
          <button class="hover:text-red-700" @click="removeEvent">
            <TrashIcon class="w-8"></TrashIcon>
          </button>
        </li>
      </ul>
    </div>
    <div class="mb-3 sm:m-3 flex flex-wrap sm:flex-nowrap gap-3">
      <div class="w-full sm:w-6/12">
        <img
          class="w-full h-full shadow"
          v-if="this.historicalEvent.img_url.includes('http')"
          :src="this.historicalEvent.img_url"
          :alt="`${this.historicalEvent.name} image`"
        />
        <img
          class="w-full h-full shadow-lg"
          v-else
          :src="`http://localhost:8000/historical-events/get-upload/${this.historicalEvent.img_url}`"
          :alt="`${this.historicalEvent.name} image`"
        />
      </div>
      <div class="w-full sm:w-6/12">
        <div class="mt-4">
          <h2 class="text-gray-900 text-2xl">Descripción</h2>
          <p class="text-gray-500 text-xl">
            {{ this.historicalEvent.description }}
          </p>
        </div>
        <div class="mt-4">
          <h2 class="text-gray-900 text-2xl">Fecha:</h2>
          <p class="text-gray-500 text-xl">
            {{ this.historicalEvent.date.split(" ")[0] }}
          </p>
        </div>
        <div class="mt-4">
          <h2 class="text-gray-900 text-2xl">Pais:</h2>
          <p class="text-gray-500 text-xl">
            {{ this.historicalEvent.country }}
          </p>
        </div>
        <div class="mt-4">
          <h2 class="text-gray-900 text-2xl">Coordenadas:</h2>
          <p class="text-gray-500 text-xl break-words">
            {{ this.historicalEvent.coordinates }}
          </p>
        </div>
      </div>
    </div>
    <div class="sm:m-3 w-full ">
      <h2 class="text-gray-900 text-2xl">Hostoria:</h2>
      <p class="text-justify text-gray-500 text-xl">
        {{ this.historicalEvent.history }}
      </p>
    </div>
  </div>
</template>

<script>
import { ThumbUpIcon, PencilAltIcon, TrashIcon } from "@heroicons/vue/outline";
export default {
  name: "ShowHistoricalEventDetails",
  components: {
    ThumbUpIcon,
    PencilAltIcon,
    TrashIcon,
  },
  data() {
    return {
      historicalEvent: {
        id: "",
        img_url: "",
        name: "",
        description: "",
        date: "",
        history: "",
      },
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
    giveLike() {
      let config = {
        method: "put",
        url:
          "http://localhost:8000/api/historical-events/like/" +
          this.historicalEvent.id,
      };
      this.axios(config)
        .then((response) => {
          this.historicalEvent.popularity = response.data;
        })
        .catch((error) => {
          console.log(error);
          if (error.message == "Request failed with status code 429")
            alert("Demasiadas solicitudes, espera un momento.");
        });
    },
    removeEvent() {
      let config = {
        method: "delete",
        url:
          "http://localhost:8000/api/historical-events/" +
          this.historicalEvent.id,
      };
      this.axios(config)
        .then((response) => {
          if (!this.historicalEvent.img_url.includes("http"))
            this.axios
              .delete(
                "http://localhost:8000/api/historical-events/remove-upload/" +
                  this.historicalEvent.img_url
              )
              .then();

          this.$router.push({ name: "Home", query: { r: "1" } });
        })
        .catch((error) => {
          alert("Ha ocurrido un error, intentelo de nuevo");
        });
    },
  },
};
</script>
