<template>
  <div class="register">
    <form @submit.prevent>
      <p>Логин</p>
      <input v-model="user.username" class="input" type="text" placeholder="username">
      <p>Пароль</p>
      <input v-model="user.password" class="input" type="password" placeholder="password">
      <p>Почта</p>
      <input v-model="user.email" class="input" type="email" placeholder="email">
      <p>Роль (ROLE_USER)</p>
      <input v-model="user.role" class="input" type="text" placeholder="role">
      <my-button @click="register">Зарегистрироваться</my-button>
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
        email: "",
        role: ""
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
.register{
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