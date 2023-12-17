<template>
  <div>
    <form @submit.prevent>
      <h3>Добавление песни</h3>
      <p>Название</p>
      <input v-model="song.name" class="input" type="text">
      <p>Автор</p>
      <select class="select" v-model="song.author" id="select_author">
        <option value="" selected disabled>Выберите автора</option>
        <option v-for="author in sortedAuthors" :value="author" :key="author.id">{{author.name}}</option>
      </select>
      <p>Аккорды и бой</p>
      <div class="checkboxes">
        <div v-for="chord in sortedChords" :key="chord.id">
          <input type="checkbox" :value="chord" :id="chord.id" v-model="song.accords">
          <label :for="chord.id">{{chord.name}}</label>
        </div>
      </div>
      <p>Текст</p>
      <textarea v-model="song.text" class="input" id="text"></textarea>
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
        text: "",
        author: {
          id: "",
          name: ""
        },
        accords: [],
      },
      authors: [],
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
      console.log(this.song)
      this.$emit('add', this.song)
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
  font-size: 30px;
  font-weight: 400;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 5px;
}
.input {
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 500px;
  height: 25px;
  font-size: 18px;
  padding: 5px;
}
.input#text {
  height: 250px;
  margin-bottom: 10px;
}
.select {
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 180px;
  height: 35px;
  font-size: 18px;
  margin-right: 10px;
}
.checkboxes {
  height: 140px;
  width: 170px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.20);
  border-radius: 6px 6px 6px 6px;
  overflow-y: auto;
  padding: 5px;
}
.checkboxes div,label{
  background: #fff;
  padding: 2px;
}
::-webkit-scrollbar {
  width: 11px;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 5px;
}
::-webkit-scrollbar-track {
   background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c5c5c5;
}
::-webkit-scrollbar-thumb:hover {
  background: #8a8a8a;
}
</style>