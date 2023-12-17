<template>
  <div>
    <form @submit.prevent>
      <h3>Добавление автора</h3>
      <p>Имя</p>
      <input v-model="author.name" class="input" type="text">
      <my-button @click="addAuthor">Добавить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
  data() {
    return {
      author: {
        name: ""
      }
    }
  },
  methods: {
    addAuthor() {
      this.$emit('add', this.author)
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
  margin-bottom: 10px;
}
</style>