<template>
  <div id="app">
    <sidebar-menu></sidebar-menu>
  </div>
</template>

<script>
import SidebarMenu from './components/SidebarMenu'

export default {
  name: 'App',
  components: {
    SidebarMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
