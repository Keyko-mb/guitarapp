<template>
  <div class="info">
    <div class="userinfo">
      <div>
        <h4>Имя пользователя</h4>
        <h4>Почта</h4>
      </div>
      <div>
        <p>{{user.person.username}}</p>
        <p>{{user.person.email}}</p>
      </div>
    </div>
    <div class="btns">
      <my-button v-if="this.user.person.role === 'ROLE_ADMIN'" @click="$router.push('/admin')">Панель администратора</my-button>
      <button class="exit-btn" @click="logOut" >Выйти из аккаунта</button>
    </div>
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
        person: {
          uuid: "",
          email: "",
          role: "",
          username: ""
        },
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout').then(
          () => {
            router.push('/login');
          }
      )
    }
  },
  mounted() {
    if (!this.currentUser) {
      router.push('/login');
    } else {
      console.log(this.currentUser)
      this.user = this.currentUser;
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
}
.userinfo {
  display: flex;
  gap: 20px;
  height: 90px;
  align-items: center;
}
.btns {
  display: flex;
  flex-direction: column;
  width: 265px;
  height: 90px;
  justify-content: center;
}
.btns button {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(136, 90, 53, 0.40);
  background: rgba(136, 90, 53, 0.15);
  padding: 10px 25px 10px 25px;
  font-size: 18px;
  font-weight: 400;
}
.btns button:hover {
  cursor: pointer;
  background: rgba(210, 168, 135, 0.15);
}
h4 {
  font-size: 20px;
  font-weight: 400;
  padding: 5px;
  color: #885A35;
}
p {
  font-size: 20px;
  font-weight: 400;
  padding: 5px;
}
.exit-btn {
  margin-top: 10px;
}
</style>