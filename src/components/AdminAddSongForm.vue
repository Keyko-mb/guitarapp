<template>
  <div>
    <form @submit.prevent>
      <h3>Добавление песни</h3>
      <p>Название</p>
      <input v-model="song.name" class="input" type="text" placeholder="name">
      <p>Автор</p>
      <select class="select" v-model="selected_author">
        <option selected disabled value="">status</option>
        <option v-for="author in sortedAuthors" :value="author" :key="author.id">{{author.name}}</option>
      </select>
      <p>Аккорд</p>
      <div v-for="chord in sortedChords" :key="chord.id">
        <input type="checkbox" :value="chord" :id="chord.id" v-model="selected_chords">
        <label :for="chord.id">{{chord.name}}</label>
      </div>
      <p>Текст</p>
      <textarea v-model="song.text" class="input" id="text" placeholder="text"></textarea>
      <my-button @click="addSong">Добавить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {MyButton},
  data() {
    return {
      song: {
        name: "",
        text: ""
      },
      selected_author: "",
      authors: [],
      selected_chords: [],
      chords: [],
    }
  },
  mounted() {
    axios
        .get('http://localhost:8084/api/authors')
        .then((response) => {
          this.authors = response.data
        })
    axios
        .get('http://localhost:8084/api/accords')
        .then((response) => {
          this.chords = response.data
        })
  },
  computed: {
    sortedAuthors() {
      return [...this.authors].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
    sortedChords() {
      return [...this.chords].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
  },
  methods: {
    addSong() {
      this.$emit('add', this.song, this.selected_author, this.selected_chords)
    },
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
h3 {
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 400;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px;
}
.input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 500px;
  height: 40px;
  padding: 5px;
  margin-bottom: 5px;
}
.input#text {
  height: 250px;
  margin-bottom: 10px;
}
.select {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 180px;
  height: 35px;
  font-size: 20px;
  margin-right: 10px;
}
</style>