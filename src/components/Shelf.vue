<template>
  <div id="shelf">
    <h2>Search the Library</h2>
    <form v-on:submit.prevent="searchBooks">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search by author, title, or ISBN" v-model="search">
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <br>
    <ul class="list-group" id="results">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in searchResults">
        <span>{{ item.title }}<br/> -- {{ item.author }}</span>
        <button type="button" class="btn" v-on:click="addToList(item)">Add</button>
      </li>
    </ul>
    <br><hr><br>
    <h3>Manage Your Bookshelf</h3>
    <div class="container controls">
      <button class="btn" v-on:click="showAll()">Show All</button>
      <button class="btn" v-on:click="showActive()">Show Active</button>
      <button class="btn" v-on:click="showRead()">Show Read</button>
      <button class="btn" v-on:click="removeRead()">Remove Read</button>
    </div>
    <br>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in filteredBooks" draggable="true" v-on:dragstart="dragItem(item,$event)" v-on:dragover.prevent v-on:drop="dropItem(item)">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-auto">
              <input type="checkbox" v-model="item.read" v-on:click="readBook(item)"/>
            </div>
            <div class="col">
              <span v-bind:class="{ read: item.read }">{{ item.title }}<br/> -- {{ item.author }}</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn remove" v-on:click="remove(item)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Shelf',
  data () {
    return {
      search: '',
      searchResults: [],
      show: 'all',
      drag: {},
    }
  },
  computed: {
    bookshelf: function() {
      return this.$store.getters.items;
    },
    activeBooks: function() {
      return this.bookshelf.filter(function(item) {
        return !item.read;
      });
    },
    filteredBooks: function() {
      if (this.show === 'active') {
        return this.bookshelf.filter(function(item) {
          return !item.read;
        });
      }
      if (this.show === 'completed') {
        return this.bookshelf.filter(function(item) {
          return item.read;
        });
      }
      return this.bookshelf;
    },
  },
  created: function() {
    this.getItems();
  },
  methods: {
    getItems: function() {
      this.$store.dispatch('getItems');
    },
    searchBooks: function() {
      let self = this;
      var input = this.search;
      input = input.replace(/ /g, '+');
      console.log(input);
      var myurl = 'https://www.googleapis.com/books/v1/volumes?q=' + input;
      $.ajax({
        url : myurl,
        success : function(json) {
          console.log(json);
          self.searchResults = [];
          $("#results").children().removeClass("disabled");
          //console.log(this.bookshelf);
          json.items.forEach(function(book) {
            //console.log(book.volumeInfo.title);
            let item = {title: book.volumeInfo.title, author: book.volumeInfo.authors[0], read: false};
            self.searchResults.push(item);
          });
          // Disable books already on shelf
          if (self.bookshelf !== undefined) {
            let titles = self.bookshelf.map(item => {return item.title; });
            console.log(titles);
            titles.forEach(item => {
              let index = (self.searchResults.map(result => result.title)).indexOf(item);
              console.log(index);
              if (index > -1) $("#results").children().eq(index).addClass("disabled");
            })
          }
        },
        error : function() {
          console.log('error');
        }
      });
    },
    addToList: function(item) {
      //console.log(item);
      if (!this.bookshelf.includes(item)) {
        item.read = false;
        this.$store.dispatch('addItem', item);
        //console.log($("#results").children());
        var index = this.searchResults.indexOf(item);
        $("#results").children().eq(index).addClass("disabled");
      }
    },
    readBook: function(item) {
      //console.log(item);
      this.$store.dispatch('updateItem', {
        id: item.id,
        title: item.title,
        read: !item.read,
        orderChange: false,
      });
    },
    remove: function(item) {
      this.$store.dispatch('deleteItem', {
        id: item.id
      });
      let index = (this.searchResults.map(b => { return b.title; })).indexOf(item.title);
      if (index > -1) $("#results").children().eq(index).removeClass("disabled");
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showRead: function() {
      this.show = 'completed';
    },
    removeRead: function() {
      this.bookshelf.forEach(item => {
        if (item.read) this.remove(item);
      });
    },
    dragItem: function(item, event) {
      this.drag = item;
      event.dataTransfer.setData('title', '');
    },
    dropItem: function(item) {
      this.$store.dispatch('updateItem', {
        id: this.drag.id,
        title: this.drag.title,
        author: this.drag.author,
        read: this.drag.read,
        orderChange: true,
        orderTarget: item.id
      });
    },
  },
}
</script>

<style scoped>
li {
  min-height: 4.5em;
  text-align: left;
}

button {
  margin: 5px;
}

.btn-primary {
  color: black;
  background-color: rgb(126, 182, 217);
  border-color: rgb(126, 182, 217);
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
}

.disabled button {
  display: none;
}

.read {
  text-decoration: line-through;
}

.remove {
  display: none;
}

li:hover .remove {
  display: block;
}
</style>
