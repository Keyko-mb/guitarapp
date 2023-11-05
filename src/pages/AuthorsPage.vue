<template>
  <div>
    <h1>
      Исполнители
    </h1>
    <p v-for="author in authors" :key="author.id">{{author.name}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
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