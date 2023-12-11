<template>
  <div class="register">
    <form @submit.prevent>
      <h1>Регистрация</h1>
      <input v-model="user.username" class="input" type="text" placeholder="Имя пользователя">
      <br>
      <input v-model="user.password" class="input" type="password" placeholder="Пароль">
      <br>
      <input v-model="user.email" class="input" type="email" placeholder="Почта">
      <button class="register-btn" @click="register">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import router from "@/router/router";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      router.push("/");
    }
  },
  methods: {
    register() {
      console.log("page" + this.user)
      this.$store.dispatch('auth/register', this.user).then(
          () => {
            router.push('/login');
          }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  margin-top:10%;
}
.register h1 {
  font-size: 48px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 20px;
}
.input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 335px;
  height: 40px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 18px;
}
.register-btn {
  display: flex;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(136, 90, 53, 0.40);
  background: rgba(136, 90, 53, 0.15);
  padding: 10px 25px 10px 25px;
  width: 345px;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
}
</style>