<template>
  <div>
    <h1>
      Аккорды
    </h1>
    <my-chords class="chords" :chords="chords"></my-chords>
  </div>
</template>

<script>
import axios from "axios";
import MyChords from "@/components/UI/MyChords.vue";

export default {
  components: {MyChords},
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
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
}
.chords {
  display: flex;
  justify-content: center;
}
</style>