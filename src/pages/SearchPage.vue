<template>
  <div>
    <h1>Результаты поиска по запросу: "{{searchedLine}}"</h1>
    <h4>Найденные песни:</h4>
    <songs-list :songs="songs">
    </songs-list>
    <h4>Найденные исполнители:</h4>
    <authors-list :authors="authors">
    </authors-list>
  </div>
</template>

<script>
import SongsList from "@/components/SongsList.vue";
import AuthorsList from "@/components/AuthorsList.vue";
import axios from "axios";

export default {
  components: {AuthorsList, SongsList},
  data() {
    return {
      authors: [],
      songs: []
    }
  },
  props: {
    searchedLine: {
      type: String,
      required : true
    }
  },

  mounted() {
    {
      axios
          .get('http://localhost:8084/api/search/' + this.searchedLine)
          .then((response) => {
            console.log(response)
            this.songs = response.data.songs
            this.authors = response.data.authors
          })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
}
h4 {
  color: #885A35;
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
}
</style>