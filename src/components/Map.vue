<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 450px"
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
      <ol-overlay :position="this.currentCenter">
        <template v-slot="">
          <div class="overlay-content">
            <LocationMarkerIcon class="w-7 text-red-700"></LocationMarkerIcon>
          </div>
        </template>
      </ol-overlay>
    </ol-map>
    <div v-show="purpose=='input'" class="flex items-center">
        <button  @click="getCountry" class="py-2 px-6 bg-green-700 text-white rounded">Establecer</button>
        <p class="ml-5 text-red-800">{{this.error}}</p>
         <p v-show="this.error == ''">Deslice para elegir ubicación</p>
    </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";

export default {
  name: "Map",
  props: {
    historicalEvents: Object,
    purpose: String,
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
      error: ''
    };
  },
  methods: {
    centerChanged(center) {
      this.currentCenter = center;
    },
    getCountry() {
      var latitude = this.currentCenter[1];
      var longitude = this.currentCenter[0];
      var ENDPOINT = `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=geraldrf`;
      this.axios.get(ENDPOINT).then((response) => {
        if(response.data.countryName){
            this.$emit('setData', {country: response.data.countryName, coordinates: this.currentCenter});
        }else {
            var error = response.data.status.message;

            if(error == 'no country code found'){
              error = 'Ubique el punto en un pais'
            }else if(error == 'invalid lat/lng'){
              error = 'Latitud/Logitud invalida'
            }
            this.error = error
            this.$refs.view.setCenter([40,40])

            let _this = this
            setTimeout(function(){
                _this.error = ''
            }, 2400)
        }
      });
    },
  },
};
</script>

<style>
</style>