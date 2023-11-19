<template>
  <div class="author">
    <h1 class="names">{{author.name}}</h1>
    <h4 class="names">Список песен</h4>
    <div class="songs">
      <songs-list :songs="songs"></songs-list>
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
      author: {
        id: '',
        name: '',
      },
      songs: []
    }
  },
  props: {
    id: {
      type: String,
      required : true
    }
  },
  mounted() {
    axios
        .get("http://localhost:8084/api/authorById/" + this.id)
        .then((response) => {
          this.author = response.data
          console.log(response)
        })
    axios
        .get("http://localhost:8084/api/authorSongs/" + this.id)
        .then((response) => {
          this.songs = response.data
          console.log(response)
        })
  }
}
</script>


<style lang="scss" scoped>
.names h1 {
  font-size: 48px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 5px;
}
.names h4 {
  color: #885A35;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
}
</style>