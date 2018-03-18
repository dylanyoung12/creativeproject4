<template>
  <div id="app">
    <app-header></app-header>
    <img src="../static/images/Library-icon.png">
    <br><br>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style>
body {
  background-color: rgb(217, 188, 146);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px;
  margin-top: 50px;
}

img {
  max-width: 20%;
}
</style>
