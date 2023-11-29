<template>
  <div>
    <div class="account">
      <h1>Личный кабинет</h1>
      <my-button @click="$router.push('/admin')">Панель администратора</my-button>
    </div>
    <h3>Имя пользователя</h3>
    <div class="favourites">
      <div class="favourites__header">
        <h4>Избранное</h4>
        <button><img src="/edit.png" alt="icon" class="edit_icon"></button>
      </div>
      <p>список песен</p>
    </div>
    <button @click="logOut" >Выйти</button>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router";
import store from "@/store";

export default {
  components: {MyButton},
  data() {
    return {
      user: null
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      store.dispatch('user', null)
      router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
}
h3 {
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 10px;
}
h4 {
  color: #885A35;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 15px;
}
.favourites__header {
  display: flex;
  gap: 10px;
  height: 38px;
  align-content: center;
}
.favourites__header button {
  border: none;
  background-size: cover;
}
.account {
  margin-bottom: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 56px;
  align-items: center;
}
.edit_icon {
  width: 40px;
  height: 40px;
}
</style>