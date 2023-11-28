<template>
  <div>
    <form @submit.prevent>
      <h3>Добавление песни</h3>
      <p>Название</p>
      <input v-model="song.name" class="input" type="text" placeholder="name">
      <p>ID автора</p>
      <input v-model="song.author.id" class="input" type="text" placeholder="author_id">
      <p>Автор</p>
      <input v-model="song.author.name" class="input" type="text" placeholder="author">
      <p>Текст</p>
      <textarea v-model="song.text" class="input" id="text" placeholder="text"></textarea>
      <my-button @click="addSong">Добавить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
  data() {
    return {
      song: {
        name :"",
        author: {
          id: "",
          name: ""
        },
        text: ""
      }
    }
  },
  methods: {
    addSong() {
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

</style>