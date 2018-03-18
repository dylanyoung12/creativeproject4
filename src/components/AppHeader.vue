<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <h1 class="navbar-brand mb-0 h1">My Bookshelf</h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shelf">Library</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
nav {
  margin: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: rgb(126, 182, 217);
  box-shadow: 5px 5px 10px;
}
</style>
