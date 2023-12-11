<template>
  <div>
    <div class="account">
      <h1 class="account-header">Личный кабинет</h1>
      <my-button v-if="this.user.person.role === 'ROLE_ADMIN'" @click="$router.push('/admin')">Панель администратора</my-button>
    </div>
    <h4 class="account-name">{{user.person.username}}</h4>
    <div class="favourites">
      <div class="favourites-header">
        <h5>Избранное</h5>
        <button><img src="/edit.png" alt="icon" class="edit_icon"></button>
      </div>
      <songs-list :songs="favourites"></songs-list>
    </div>
    <my-button class="exit-btn" @click="logOut" >Выйти</my-button>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router";
import axios from "axios";
import SongsList from "@/components/SongsList.vue";

export default {
  components: {SongsList, MyButton},
  data() {
    return {
      user: {
        person: {
          uuid: "",
          email: "",
          role: "",
          username: ""
        },
        access_token: "",
        refresh_token: ""
      },
      favourites: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      router.push('/login');
    }
    else {
      this.user = this.currentUser;
      axios
          .get('http://localhost:8084/api/personFavorites/' + this.currentUser.access_token)
          .then((response) => {
            this.favourites = response.data;
          })
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
}
</script>

<style lang="scss" scoped>
.account-header {
  font-size: 48px;
  font-weight: 500;
}
.account {
  margin-bottom: 15px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 56px;
  align-items: center;
}
.account-name {
  font-size: 36px;
  font-weight: 400;
}
.favourites-header {
  display: flex;
  gap: 10px;
  height: 30px;
  align-content: center;
  margin-top: 10px;
}
.favourites-header h5 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #885A35;
}
.favourites-header button {
  border: none;
  background-size: cover;
}
.edit_icon {
  width: 30px;
  height: 30px;
}
.exit-btn {
  margin-top: 10px;
}
</style>