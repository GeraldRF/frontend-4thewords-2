<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      :style="`height:${this.height}`"
    >
      <ol-view
        ref="view"
        :center="center"
        :projection="projection"
        @centerChanged="centerChanged"
      />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-overlay
        v-show="this.purpose == 'input'"
        :position="this.currentCenter"
      >
        <template v-slot="">
          <div class="overlay-content">
            <LocationMarkerIcon class="w-7 text-red-700"></LocationMarkerIcon>
          </div>
        </template>
      </ol-overlay>
      <div v-show="purpose == 'showAllData'">
        <ol-overlay v-for="he in historicalEvents" :position="he.coordinates.split(',')" :key="he">
          <template v-slot="">
            <div class="overlay-content">
              <LocationMarkerIcon class="w-7 text-red-700"></LocationMarkerIcon>
            </div>
          </template>
        </ol-overlay>
      </div>
    </ol-map>
    <div v-show="purpose == 'input'" class="flex items-center">
      <button
        type="button"
        @click="getCountry"
        class="my-2 ml-2 py-2 px-5 bg-green-700 hover:bg-green-600 text-white rounded"
      >
        Establecer
      </button>
      <p
        :class="{
          'ml-5': true,
          'text-red-800': this.msg.code == 2,
          'text-green-900': this.msg.code == 1,
        }"
      >
        {{ this.msg.message }}
      </p>
      <p v-show="this.msg.message == ''">Deslice para elegir ubicación</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";

export default {
  name: "Map",
  props: {
    historicalEvents: Array,
    purpose: String,
    height: String,
    },
  components: { LocationMarkerIcon },
  setup() {
    const center = ref([40, 40]);
    const projection = ref("EPSG:4326");

    return {
      center,
      projection,
    };
  },
  data() {
    return {
      currentCenter: this.center,
      msg: { code: 0, message: "" },
    };
  },
  methods: {
    centerChanged(center) {
      this.currentCenter = center;
    },
    getCountry() {
      this.msg = { code: 0, message: "Obteniendo datos, espere." };

      var latitude = this.currentCenter[1];
      var longitude = this.currentCenter[0];
      var ENDPOINT = `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=geraldrf`;
      this.axios
        .get(ENDPOINT)
        .then((response) => {
          if (response.data.countryName) {
            this.$emit("setData", {
              country: response.data.countryName,
              coordinates: this.currentCenter,
            });
            this.msg.message = `Selección correcta: ${response.data.countryName}`;
            this.msg.code = 1;
          } else {
            var error = response.data.status.message;

            let time = 0;
            if (error == "no country code found") {
              error = "Ubique el punto en un pais";
              time = 2400;
            } else if (error == "invalid lat/lng") {
              error =
                "Latitud/Logitud invalida | Se ha colocado de nuevo en el centro del mapa";
              this.$refs.view.setCenter([40, 40]);
              time = 5000;
            }
            this.msg.code = 2;
            this.msg.message = error;

            let _this = this;
            setTimeout(function () {
              _this.msg.message = "";
            }, time);
          }
        })
        .catch((error) => {
          if(error.code === 'ERR_NETWORK'){
            this.msg = {code: 2, message: 'Error de red, intentelo de nuevo.'}
          }
        });
    },
  },
};
</script>

<style>
</style>