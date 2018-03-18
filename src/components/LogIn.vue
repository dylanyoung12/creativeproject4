<template>
  <div id="login">
    <h2>Log In</h2>
    <br>
    <div class="container">
      <form v-on:submit.prevent="login()">
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input v-model="username" type="text" class="form-control" id="inputUsername" placeholder="Enter username">
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="check">
          <label class="form-check-label" for="exampleCheck1">Remember Me</label>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <br>
    <div class="container">
      <p>Don't have an account?&emsp;<router-link to="/register"><button class="btn">Register</button></router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login: function() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      }).then(response => {
        alert("Welcome, " + response + "!");
        this.$router.push('/shelf');
      }).catch(err => {
        alert(err);
      })
    },
  }
}
</script>

<style scoped>
  .container {
    text-align: left;
  }

  .btn-primary {
    color: black;
    background-color: rgb(126, 182, 217);
    border-color: rgb(126, 182, 217);
  }
</style>
