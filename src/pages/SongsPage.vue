<template>
  <div>
    <h1>Песни</h1>
    <songs-list :songs="songs"></songs-list>
  </div>
</template>

<script>

import axios from "axios";
import SongsList from "@/components/SongsList.vue";

export default {
  components: {SongsList},
  data() {
    return {
      songs: []
    }
  },

  mounted() {
    axios
        .get('http://localhost:8084/api/songs')
        .then((response) => {
          this.songs = response.data
          this.songs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
          console.log(response)
        })
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
</style>