<template>
  <div class="signUp">
    <form @submit.prevent>
      <p>Логин</p>
      <input v-model="user.username" class="input" type="text" placeholder="login">
      <p>Пароль</p>
      <input v-model="user.password" class="input" type="password" placeholder="password">
      <my-button @click="signUp">Войти</my-button>
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
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    signUp() {
      axios
          .post('http://localhost:8084/api/login', this.user)
          .then((response) => {
            console.log(response)
          })
    },
  }
}
</script>

<style lang="scss" scoped>
.signUp{
  margin-top: 20px;
}
.input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 200px;
  height: 20px;
  padding: 5px;
  margin-bottom: 5px;
}
</style>