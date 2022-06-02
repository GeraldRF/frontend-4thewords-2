<template>
  <nav>
    <div>
      <router-link to="/">Libro Virtual</router-link>
    </div>
    <ul>
      <li>
        <router-link to="/" class="p-2 text-red-600 bg-gray-300 rounded">Home</router-link>
      </li>
      <li>
        <router-link to="/agregar">Agrega un suceso</router-link> |
      </li>
      <li>
        <router-link to="/top-10-sucesos-mas-populares">Top 10</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
</style>