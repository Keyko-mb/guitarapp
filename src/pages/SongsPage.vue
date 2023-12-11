<template>
  <div>
    <h1>Песни</h1>
    <songs-list :songs="songs"></songs-list>
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

import axios from "axios";
import SongsList from "@/components/SongsList.vue";

export default {
  components: {SongsList},
  data() {
    return {
      songs: [],
      page: 0,
      limit: 2,
      totalPages: 0
    }
  },

  mounted() {
    this.loadSongs();
  },
  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    loadSongs() {
      axios
          .get('http://localhost:8084/api/songs/' + this.page + '/' + this.limit)
          .then((response) => {
            this.songs = response.data.content
            this.songs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            this.totalPages = response.data.totalPages;
          })
    }
  },
  watch: {
    page() {
      this.loadSongs();
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
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