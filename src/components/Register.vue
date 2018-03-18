<template>
  <div id="register">
    <h2>Register</h2>
    <br>
    <div class="container">
      <form v-on:submit.prevent="register()">
        <div class="form-group">
          <label for="inputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input v-model="username" type="text" class="form-control" id="inputUsername" placeholder="Enter username">
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      username: '',
      password: '',
    }
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', {
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
