<template>
  <div
    class="
      mx-auto
      w-10/12
      sm:w-full
      shadow
      flex flex-wrap
      justify-center
      sm:justify-start
      border-2
      rounded-xl
    "
  >
    <div class="w-full sm:w-5/12">
      <img
        class="
          rounded-t-xl
          sm:rounded-none sm:rounded-l-xl
          w-full
          h-full
          shadow
        "
        v-if="historicalEvent.img_url.includes('http')"
        :src="historicalEvent.img_url"
        :alt="`${historicalEvent.name} image`"
      />
      <img
        class="
          rounded-t-xl
          sm:rounded-none sm:rounded-l-xl
          w-full
          h-full
          shadow-lg
        "
        v-else
        :src="`http://localhost:8000/historical-events/get-upload/${historicalEvent.img_url}`"
        :alt="`${historicalEvent.name} image`"
      />
    </div>
    <div
      class="
        mx-auto
        flex flex-col
        justify-between
        w-full
        sm:w-6/12
        text-center
        sm:text-left
      "
    >
      <div>
        <h2 class="my-4 text-xl text-gray-600 font-bold border-b-2">
          {{ historicalEvent.name }}
        </h2>
        <p class="overflow-auto text-gray-700">
          {{ historicalEvent.description }}
        </p>
        <p class="mt-2 text-gray-700">
          {{ historicalEvent.date.split(" ")[0] }}
        </p>
      </div>
      <div class="flex flex-wrap justify-between">
        <div
          class="
            mb-2
            w-full
            flex flex-wrap
            gap-2
            justify-center
            sm:justify-between
          "
        >
          <router-link
            :to="{
              name: 'Details',
              params: {
                id: historicalEvent.id,
                name: historicalEvent.name.replaceAll(' ', '_'),
              },
            }"
            class="
              px-2
              border-2
              flex
              items-center
              rounded
              text-blue-900
              border-blue-900
              hover:text-white hover:bg-blue-900
            "
            >Ver completo</router-link
          >
          <ul class="flex justify-center items-center gap-3">
            <li class="flex items-center">
              <button
                class="hover:text-blue-900"
                @click="giveLike"
              >
                <ThumbUpIcon class="w-8"></ThumbUpIcon>
              </button>
              <span class="px-2 bg-blue-500 text-white rounded">{{
                historicalEvent.popularity
              }}</span>
            </li>
            <li class="flex items-center">
              <router-link
                :to="{
                  name: 'Update',
                  params: {
                    id: historicalEvent.id,
                    name: historicalEvent.name.replaceAll(' ', '_'),
                  },
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
      </div>
    </div>
  </div>
</template>

<script>
import { ThumbUpIcon, PencilAltIcon, TrashIcon } from "@heroicons/vue/outline";
export default {
  name: "HistoricalEvent",
  components: {
    ThumbUpIcon,
    PencilAltIcon,
    TrashIcon,
  },
  props: {
    historicalEvent: Object,
  },
  methods: {
    giveLike() {
        let config = {
            method: "put",
            url: "http://localhost:8000/api/historical-events/like/"+this.historicalEvent.id,
        }
      this.axios(config)
        .then((response) => {
          this.historicalEvent.popularity = response.data;
        })
        .catch((error) => {
            console.log(error)
          if (error.message == "Request failed with status code 429")
            alert("Demasiadas solicitudes, espera un momento.");
        });
    },
    removeEvent() {
        let config = {
            method: "delete",
            url: "http://localhost:8000/api/historical-events/"+this.historicalEvent.id,
        }
        this.axios(config)
        .then((response) => {
          this.$router.push({name:'Home', query: {'r':1}})
        })
        .catch((error) => {
            alert('Ha ocurrido un error, intentelo de nuevo')
        });
    },
  },
};
</script>
