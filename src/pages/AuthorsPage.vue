<template>
  <div>
    <h1>
      Исполнители
    </h1>
    <authors-list :authors="authors"></authors-list>
  </div>
</template>

<script>
import axios from "axios";
import AuthorsList from "@/components/AuthorsList.vue";

export default {
  components: {AuthorsList},
  data() {
    return {
      authors: []
    }
  },

  mounted() {
    axios
        .get('http://localhost:8084/api/authors')
        .then((response) => {
          this.authors = response.data
          this.authors.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
          console.log(response)
        })
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 3px;
}
</style>