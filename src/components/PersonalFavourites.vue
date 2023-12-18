<template>
  <div class="favourites">
    <h4>Избранное</h4>
    <favourite-songs-list @remove="removeSong" :songs="favourites"></favourite-songs-list>
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
      axios
          .get('http://localhost:8084/api/personFavorites/' + this.currentUser.access_token)
          .then((response) => {
            this.favourites = response.data;
          })
    }
  },
  methods: {
    removeSong(id) {
      axios
          .delete("http://localhost:8084/api/personFavorites/" + this.currentUser.access_token + "/" + id)
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
</style>