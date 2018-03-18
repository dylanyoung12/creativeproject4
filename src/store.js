import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
axios.defaults.baseURL = 'http://dylanyoung.site:3030';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    user: '',
  },
  getters: {
    items: state => state.items,
  },
  mutations: {
    setItems (state, items) {
      state.items = items;
    },
  },
  actions: {
    register(context, account) {
      console.log("registering account");
      return axios.post("/api/register", account).then(response => {
        context.user = account.username;
        context.dispatch('getItems');
        return context.user;
      }).catch(err => {
        console.log(err);
        throw new Error("Username already taken");
      });
    },
    login(context, account) {
      console.log("logging in");
      return axios.put("/api/login", account).then(response => {
        context.user = account.username;
        context.dispatch('getItems');
        return context.user;
      }).catch(err => {
        console.log(err);
        throw new Error("Account not found");
      });
    },
    getItems(context) {
      console.log("getting/updating items");
      axios.get("/api/items").then(response => {
        context.commit('setItems', response.data);
        return true;
      }).catch(err => {
      });
    },
    addItem(context, item) {
      axios.post("/api/items", item).then(response => {
        return context.dispatch('getItems');
      }).catch(err => {
      });
    },
    updateItem(context, item) {
      axios.put("/api/items/" + item.id, item).then(response => {
        return context.dispatch('getItems');
      }).catch(err => {
      });
    },
    deleteItem(context, item) {
      axios.delete("/api/items/" + item.id).then(response => {
        return context.dispatch('getItems');
      }).catch(err => {
      });
    }
  }
});
