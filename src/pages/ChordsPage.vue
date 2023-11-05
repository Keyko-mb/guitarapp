<template>
  <div>
    <h1>
      Аккорды
    </h1>
    <div v-for="chord in chords" :key="chord.id">
      <p>{{chord.name}}</p>
      <img :src="'data:image/png;base64,' + chord.image">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      chords: []
    }
  },
  mounted() {
    axios
        .get('http://localhost:8084/api/accords')
        .then((response) => {
          this.chords = response.data
          console.log(response)
        })
  },
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 3px;
}
</style>