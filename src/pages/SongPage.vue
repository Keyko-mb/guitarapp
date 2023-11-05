<template>
  <div class="song">
    <div class="names">
      <h1>{{song.name}}</h1>
      <h4>{{song.author}}</h4>
      <button>Шрифт</button>
      <button>Прокрутка</button>
    </div>
    <div class="chords">
      <p>Аппликатуры аккордов</p>
      <div class="chords__chord" v-for="chord in song.accord" :key="chord.id">
        <p>{{chord.name}}</p>
        <img :src="'data:image/png;base64,' + chord.image">
      </div>
    </div>
    <div class="text">
      <p>{{song.text}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      song: ""
    }
  },

  mounted() {
    axios
        .get('http://localhost:8084/api/songId/1')
        .then((response) => {
          this.song = response.data
          console.log(response)
        })
  }
}
</script>


<style lang="scss" scoped>
.song {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 12% 88%;
}

.text p {
  font-size: 20px;
  font-weight: 400;
  line-height: 155.023%;
  letter-spacing: 8.3px;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  margin-top: 20px;
}

.names {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

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

.names button {
  font-size: 20px;
  font-weight: 400;
}

.chords {
  justify-self: center;
  margin-top: 111px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  font-size: 20px;
  font-weight: 400;
}
</style>