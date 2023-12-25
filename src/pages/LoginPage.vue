<template>
  <div class="login">
    <form @submit.prevent>
      <h1>Вход</h1>
      <my-error v-if="error" :error="error"></my-error>
      <input v-model="user.username" class="input" type="text" placeholder="Имя пользователя">
      <br>
      <input v-model="user.password" class="input" type="password" placeholder="Пароль">
      <div class="login-btns">
        <my-button class="login-btns-btn" @click="login">Войти</my-button>
        <my-button class="login-btns-btn" @click="$router.push('/register')">Зарегистрироваться</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router";
import MyError from "@/components/UI/MyError.vue";

export default {
  components: {MyError, MyButton},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      error: ""
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      router.push('/');
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.user).then(
          (response) => {
            if (response.status !== 200) {
              this.error = "Неверный логин/пароль!"
            }
            else router.go(-1);
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  margin-top: 10%;
}
.login h1{
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 20px;
}
.input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 330px;
  height: 40px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 18px;
}
.login-btns {
  display: flex;
  gap: 10px;
}
</style>