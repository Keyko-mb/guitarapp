<template>
  <div class="login">
    <form @submit.prevent>
      <p>Почта</p>
      <input v-model="user.username" class="input" type="text" placeholder="email">
      <p>Пароль</p>
      <input v-model="user.password" class="input" type="password" placeholder="password">
      <my-button class="enter-btn" @click="login">Войти</my-button>
      <router-link to="/register">Зарегистрироваться</router-link>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router";

export default {
  components: {MyButton},
  data() {
    return {
      user: {
        username: "",
        password: "",
      }
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
          () => {
            router.go(-1);
          }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
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
.enter-btn {
  margin-bottom: 5px;
}
</style>