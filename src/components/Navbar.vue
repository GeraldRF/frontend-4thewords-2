<template>
  <div class="w-full h-16">
    <div class="h-16 w-full"></div>
    <nav
      class="
        p-2
        flex
        w-full
        h-16
        items-center
        justify-between
        lg:justify-start
        bg-blue-700
        shadow-lg
        z-10
        fixed
        top-0
      "
    >
      <div class="p-2 md:mr-5 pr-6 text-2xl text-white lg:border-r-2">
        <router-link to="/" class="flex items-center">
          <BookOpenIcon class="w-10"></BookOpenIcon>
          LibroVirtual</router-link
        >
      </div>

      <ul
        class="
          hidden
          w-72
          lg:w-full
          h-screen
          fixed
          top-0
          right-0
          pt-20
          lg:pt-0
          shadow-md
          lg:shadow-none lg:relative lg:mt-0 lg:flex
          flex-col
          lg:flex-row lg:h-auto
          gap-5
          lg:gap-3
          items-center
          text-center
          bg-blue-700
          z-10
        "
        ref="menu"
      >
        <li class="lg:hidden">
          <button
            class="
              flex
              lg:hidden
              absolute
              right-3
              top-3
              z-10
              text-white
              hover:bg-white hover:text-blue-700
              rounded
            "
            ref="closeMenu"
          >
            <XIcon class="w-10"></XIcon>
          </button>
        </li>
        <li class="w-full md:w-auto">
          <router-link
            to="/agregar"
            class="
              p-2
              text-lg text-white
              hover:text-blue-700 hover:bg-white
              rounded
            "
            >Agrega un suceso</router-link
          >
        </li>
        <li class="w-full md:w-auto">
          <router-link
            to="/top-10"
            class="
              p-2
              text-lg text-white
              hover:text-blue-700 hover:bg-white
              rounded
            "
            >Top 10</router-link
          >
        </li>
        <li class="w-full md:w-auto">
          <router-link
            to="/orden-cronologico"
            class="
              p-2
              text-lg text-white
              hover:text-blue-700 hover:bg-white
              rounded
            "
            >Orden cronologico</router-link
          >
        </li>
        <li class="w-full md:w-auto">
          <router-link
            to="/mapa"
            class="
              p-2
              text-lg text-white
              hover:text-blue-700 hover:bg-white
              rounded
            "
            >Mapa de los sucesos</router-link
          >
        </li>
      </ul>

      <div class="flex lg:mr-3">
        <button
          @click="toggleSearchBar"
          class="text-white hover:bg-white hover:text-blue-700 rounded"
        >
          <SearchIcon class="w-9"></SearchIcon>
        </button>
        <div
          ref="searchBar"
          class="p-3 w-full hidden justify-end fixed top-14 right-0 z-10"
        >
          <form
            @submit.prevent="searchEvent"
            class="
              flex
              w-full
              sm:w-6/12
              justify-end
              gap-2
              bg-white
              border-2
              rounded
              shadow-lg
            "
          >
            <input
              ref="inputBar"
              type="text"
              class="p-2 w-11/12 outline-none text-xl"
            />
            <select ref="by">
              <option value="name">Nombre</option>
              <option value="country">Pais</option>
            </select>
            <button
              type="submit"
              class="
                m-1
                p-2
                bg-blue-800
                hover:bg-blue-400
                text-white
                rounded-full
              "
            >
              <SearchIcon class="w-5"></SearchIcon>
            </button>
          </form>
        </div>

        <button
          class="
            flex
            lg:hidden
            text-white
            hover:bg-white hover:text-blue-700
            rounded
          "
          ref="openMenu"
        >
          <MenuIcon class="w-10"></MenuIcon>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import {
  BookOpenIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Navbar",
  components: { BookOpenIcon, MenuIcon, XIcon, SearchIcon },
  mounted() {
    let _this = this;
    this.$refs.openMenu.addEventListener("click", function () {
      let menu = _this.$refs.menu;
      let closeMenu = _this.$refs.closeMenu;
      menu.classList.add("flex");
      menu.classList.remove("hidden");
      menu.classList.add("showMenu");
      closeMenu.addEventListener("click", function () {
        menu.classList.remove("showMenu");
        menu.classList.add("closeMenu");
        setTimeout(function () {
          menu.classList.add("hidden");
          menu.classList.remove("flex");
          menu.classList.remove("closeMenu");
        }, 450);
      });
    });
  },
  methods: {
    toggleSearchBar() {
      let bar = this.$refs.searchBar;
      bar.classList.toggle("hidden");
      bar.classList.toggle("flex");
      this.$refs.inputBar.focus();
    },
    searchEvent() {
      if (this.$refs.inputBar.value != "") {
        this.$router.push({
          name: "Home",
          query: { q: this.$refs.inputBar.value, by: this.$refs.by.value },
        });
        this.toggleSearchBar();
        this.$refs.inputBar.value = "";
      }
    },
  },
};
</script>

<style>
</style>