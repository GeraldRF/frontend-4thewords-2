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
        md:text-xl
      "
      ref="form"
    >
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label
          for="name"
          ref="lblName"
          :class="{
            'text-gray-800': true,
            'text-red-500': this.name.length > 100,
          }"
          >Nombre ( {{ this.name.length }}/100)</label
        >
        <input
          type="text"
          name="name"
          v-model="this.name"
          class="border-b-2 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-5/12">
        <label for="date" ref="lblDate" class="text-gray-800"
          >Fecha del suceso</label
        >
        <input
          type="date"
          name="date"
          v-model="this.date"
          class="border-b-2 outline-none text-gray-500"
        />
      </div>
      <div class="flex flex-col gap-1 w-full md:w-11/12 lg:w-5/12">
        <div class="flex flex-col gap-1 w-full">
          <label
            for="description"
            ref="lblDescription"
            :class="{
              'text-gray-800': true,
              'text-red-500': this.description.length > 150,
            }"
            >Descripción breve ({{ this.description.length }}/150)</label
          >
          <textarea
            name="description"
            class="
              p-2
              shadow-md
              border-2
              outline-none
              text-gray-500
              rounded
              resize-none
            "
            v-model="this.description"
            rows="1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="description" ref="lblHistory" class="text-gray-800"
            >Historia</label
          >
          <textarea
            name="history"
            class="
              p-2
              shadow-md
              border-2
              outline-none
              text-gray-500
              rounded
              resize-none
            "
            v-model="this.history"
            rows="4"
          ></textarea>
        </div>
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
        ref="imageSelector"
      >
        <div class="w-full flex flex-col">
          <div v-if="this.historicalEvent" class="mx-auto w-full sm:w-5/12">
            <img
              class="rounded-xl w-full h-full shadow"
              v-if="img_url.includes('http')"
              :src="img_url"
              :alt="`${name} image`"
            />
            <img
              class="rounded-xl w-full h-full shadow-lg"
              v-else
              :src="`http://localhost:8000/historical-events/get-upload/${local_img_url}`"
              :alt="`${name} image`"
            />
          </div>

          <label for="img" class="text-gray-800 mb-2"
            >Seleccione una imagen relativa al suceso</label
          >
          <input
            type="file"
            name="img"
            ref="image"
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
            v-model="this.img_url"
            class="border-b-2 outline-none text-gray-500"
          />
        </div>
      </div>
      <div class="w-full md:w-11/12 border-2 rounded shadow">
        <div
          class="
            flex flex-wrap
            justify-between
            md:justify-start md:gap-x-5
            gap-y-2
          "
        >
          <div>
            <label for="country" ref="lblCountry">Pais: </label>
            <input
              type="text"
              name="country"
              class="pl-2 bg-gray-100 rounded"
              v-model="this.country"
              disabled
            />
          </div>
          <div>
            <label for="coordinates" ref="lblCoordinates">Coordenadas: </label>
            <input
              type="text"
              name="coordinates"
              class="pl-2 bg-gray-100 rounded"
              v-model="this.coordinates"
              disabled
            />
          </div>
        </div>
        <Map purpose="input" @setData="setMapData" height="450px"></Map>
      </div>
      <div class="w-full mt-2 mb-1 border-b-2"></div>
      <div
        class="w-full flex flex-wrap justify-center md:justify-end items-center"
      >
        <p class="mr-3 text-red-700">
          {{ this.msg }}
        </p>
        <button
          type="submit"
          class="
            px-6
            py-3
            w-full
            md:w-max md:mr-3
            text-xl
            bg-blue-700
            hover:bg-blue-500
            text-white
            rounded
          "
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
  name: "Form",
  components: { Map },
  props: {
    historicalEvent: Object,
  },
  data() {
    return {
      name: "",
      date: "",
      description: "",
      history: "",
      img_url: "",
      country: "",
      coordinates: "",
      msg: "",
      local_img_url: "",
    };
  },
  watch: {
    historicalEvent: function () {
      this.name = this.historicalEvent.name;
      this.date = this.historicalEvent.date.split(" ")[0];
      this.description = this.historicalEvent.description;
      this.history = this.historicalEvent.history;
      if (this.historicalEvent.img_url.includes("http"))
        this.img_url = this.historicalEvent.img_url;
      else this.local_img_url = this.historicalEvent.img_url;
      this.country = this.historicalEvent.country;
      this.coordinates = this.historicalEvent.coordinates.split(",");
    },
  },
  mounted() {
    this.$refs.form.addEventListener("submit", (e) => {
      e.preventDefault();

      let validated = true;

      if (this.name == "" || this.name.length > 100) {
        if (this.name.length > 100)
          alert(
            "La cantidad de caracteres maxima permitida en el nombre son 100, usted tiene " +
              this.name.length
          );
        this.$refs.lblName.classList.add("required");
        validated = false;
      }
      if (this.date == "") {
        this.$refs.lblDate.classList.add("required");
        validated = false;
      }
      if (this.description == "" || this.description.length > 150) {
        if (this.description.length > 150)
          alert(
            "La cantidad de caracteres maxima permitida en la descripcion son 150, usted tiene " +
              this.description.length
          );
        this.$refs.lblDescription.classList.add("required");
        validated = false;
      }
      if (this.history == "") {
        this.$refs.lblHistory.classList.add("required");
        validated = false;
      }
      if (this.country == "") {
        this.$refs.lblCountry.classList.add("required");
        this.$refs.lblCoordinates.classList.add("required");
        validated = false;
      }
      if (
        this.img_url == "" &&
        this.$refs.image.value == "" &&
        this.local_img_url == ""
      ) {
        this.$refs.imageSelector.classList.add("border-red-700");
        validated = false;
      } else {
        if (this.$refs.image.value != "") {

          if(this.local_img_url != ""){
            this.axios.delete('http://localhost:8000/api/historical-events/remove-upload/'+this.local_img_url).then();
          }

          let data = new FormData();
          data.append("image", this.$refs.image.files[0]);
          var config = {
            method: "post",
            url: "http://localhost:8000/api/historical-events/upload",
            data: data,
          };

          this.axios(config)
            .then((response) => {
              if (response.data.url) {
                this.img_url = response.data.url;
                if (validated) {
                  this.$emit("submited", {
                    name: this.name,
                    date: this.date,
                    description: this.description,
                    history: this.history,
                    img_url: this.img_url,
                    country: this.country,
                    coordinates: `${this.coordinates[0]},${this.coordinates[1]}`,
                  });
                }
              } else
                alert("A ocurrido un error durante la subida de la imagen");
            })
            .catch((error) => {
              validated = false;
              alert("A ocurrido un error durante la subida de la imagen");
            });
        } else if (this.img_url != "") {
          let url = this.img_url;
          if (
            !(
              (url.includes("http://") || url.includes("https://")) &&
              (url.includes(".jpg", url.length - 4) ||
                url.includes(".png", url.length - 4) ||
                url.includes(".jpeg", url.length - 5))
            )
          ) {
            validated = false;
            alert(
              "Formato de URL incorreto, esta seguro que es una imagen de internet?"
            );
          } else {
            if (validated) {
              this.$emit("submited", {
                name: this.name,
                date: this.date,
                description: this.description,
                history: this.history,
                img_url: this.img_url,
                country: this.country,
                coordinates: `${this.coordinates[0]},${this.coordinates[1]}`,
              });
            }
          }
        } else {
          if (validated) {
            if (this.img_url == "") this.img_url = this.local_img_url;
            this.$emit("submited", {
              name: this.name,
              date: this.date,
              description: this.description,
              history: this.history,
              img_url: this.img_url,
              country: this.country,
              coordinates: `${this.coordinates[0]},${this.coordinates[1]}`,
            });
          }
        }
      }
      if (!validated) {
        this.msg = "Error: Vefique los datos";
      }
    });
  },
  methods: {
    setMapData(data) {
      this.country = data.country;
      this.coordinates = data.coordinates;
    },
  },
};
</script>