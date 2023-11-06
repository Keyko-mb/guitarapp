<template>
  <div>
    <form @submit.prevent>
      <h4>Добавление песни</h4>
      <input v-model="song.name" class="input" type="text" placeholder="name">
      <input v-model="song.author_id" class="input" type="text" placeholder="author">
      <input v-model="song.text" class="input" type="text" placeholder="text">
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
        author_id: "",
        text: ""
      }
    }
  },
  methods: {
    addSong() {
      this.$emit('add', this.song)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  width: 20%;
}

h4 {
  margin-bottom: 5px;
}

input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 300px;
  height: 40px;
  padding: 5px;
  margin-bottom: 5px;
}

</style>