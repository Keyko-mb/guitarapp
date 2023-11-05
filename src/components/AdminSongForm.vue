<template>
  <div>
    <form @submit.prevent>
      <h4>Добавление песни</h4>
      <input v-model="song.name" class="input" type="text" placeholder="name">
      <input v-model="song.author" class="input" type="text" placeholder="author">
      <input v-model="song.text" class="input" type="text" placeholder="text">
      <button class="btn">Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song: {
        name :"",
        author: "",
        text: ""
      }
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

</style>