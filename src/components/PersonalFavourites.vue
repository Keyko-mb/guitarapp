<template>
  <div class="favourites">
    <h4>Избранное</h4>
    <favourite-songs-list @remove="removeSong" :songs="favourites"></favourite-songs-list>
    <div class="page_wrapper">
      <div class="page" v-for="pageNumber in totalPages"
           :key="pageNumber"
           :class="{'current-page': (page + 1) === pageNumber}"
           @click="changePage(pageNumber-1)"
      >{{pageNumber}}</div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import axios from "axios";
import FavouriteSongsList from "@/components/FavouriteSongsList.vue";

export default {
  components: {FavouriteSongsList},
  data() {
    return {
      favourites: [],
      page: 0,
      limit: 2,
      totalPages: 0
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      router.push('/login');
    }
    else {
      this.user = this.currentUser;
      this.loadFavorites();
    }
  },
  watch: {
    page() {
      this.loadFavorites();
    }
  },
  methods: {
    loadFavorites() {
      axios
          .get('http://localhost:8084/api/personFavorites/' + this.user.person.uuid + '/' + this.page + '/' + this.limit)
          .then((response) => {
            this.favourites = response.data.content
            this.favourites.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            this.totalPages = response.data.totalPages;
          })
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    removeSong(id) {
      axios
          .delete("http://localhost:8084/api/personFavorites/" + this.user.user.person.uuid + "/" + id)
      this.favourites = this.favourites.filter(p => p.id !== id)
    },
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 22px;
  font-weight: 400;
  color: #885A35;
  margin-bottom: 5px;
}
.page_wrapper {
  display: flex;
  margin-top: 5px;
}
.page {
  padding: 5px;
  font-size: 20px;

}
.current-page {
  color: #885A35;
}
.page:hover {
  cursor: pointer;
}
</style>