<template>
  <nav
    class="
      p-2
      flex
      w-full
      h-15
      items-center
      justify-between
      md:justify-start
      bg-blue-700
    "
  >
    <div class="p-2 md:mr-5 pr-6 text-3xl text-white md:border-r-2">
      <router-link to="/" class="flex items-center">
        <BookOpenIcon class="w-10"></BookOpenIcon>
        LibroVirtual</router-link
      >
    </div>

    <button class="flex md:hidden" ref="openMenu">
      <MenuIcon class="w-10 text-white"></MenuIcon>
    </button>

    <ul
      class="
        hidden
        w-72
        md:w-full
        h-screen
        fixed
        top-0
        right-0
        pt-20
        md:pt-0
        shadow-md
        md:shadow-none md:relative md:mt-0 md:flex
        flex-col
        md:flex-row md:h-auto
        gap-5
        md:gap-3
        items-center
        text-center
        bg-blue-700
      "
      ref="menu"
    >
      <li class="md:hidden">
        <button
          class="flex md:hidden absolute right-3 top-3 z-10"
          ref="closeMenu"
        >
          <XIcon class="w-10 text-white"></XIcon>
        </button>
      </li>
      <li class="w-full md:w-auto">
        <router-link
          to="/"
          class="
            p-2
            text-2xl
            w-full
            text-white
            hover:text-blue-700 hover:bg-white
            rounded
          "
          >Inicio</router-link
        >
      </li>
      <li class="w-full md:w-auto">
        <router-link
          to="/agregar"
          class="
            p-2
            text-2xl
            text-white
            hover:text-blue-700 hover:bg-white
            rounded
          "
          >Agrega un suceso</router-link
        >
      </li>
      <li class="w-full md:w-auto">
        <router-link
          to="/top-10-sucesos-mas-populares"
          class="
            p-2
            text-2xl
            text-white
            hover:text-blue-700 hover:bg-white
            rounded
          "
          >Top 10</router-link
        >
      </li>
      <li class="w-full md:w-auto">
        <router-link
          to="/sucesos-en-orden-cronologico"
          class="
            p-2
            text-2xl
            text-white
            hover:text-blue-700 hover:bg-white
            rounded
          "
          >Orden cronologico</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { BookOpenIcon, MenuIcon, XIcon } from "@heroicons/vue/solid";

export default {
  name: "Navbar",
  components: { BookOpenIcon, MenuIcon, XIcon },
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
};
</script>

<style>
</style>