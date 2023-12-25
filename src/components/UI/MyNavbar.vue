<template>
  <div class="navbar">
    <button class="navbar_icon" @click="$router.push('/')"><img src="/icon.png" alt="icon" class="navbar_icon_png"></button>
    <div class="navbar_buttons">
      <button @click="$router.push('/songs')">Песни</button>
      <button @click="$router.push('/authors')">Исполнители</button>
      <button @click="$router.push('/chords')">Аккорды</button>
    </div>
    <input v-model="searchedLine" @keyup.enter="$router.push('/search/' + searchedLine)" placeholder="Поиск"/>
    <button v-if="currentUser.status.loggedIn" class="navbar_account" @click="$router.push('/account')">Личный кабинет</button>
    <button v-else class="navbar_account" @click="$router.push('/login')">Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchedLine: ""
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth;
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 80px;
  width: 1206px;
  display: flex;
  border-bottom: solid 1px rgba(0, 0, 0, 0.28);
  align-items: center;
}

.navbar_icon {
  border: 0;
  margin-right: 55px;
}

.navbar_icon_png {
  width: 60px;
  height: 60px;
}

.navbar_buttons button {
  margin: 0 40px 0 0;
  border: 0;
  font-size: 20px;
}

button:hover {
  cursor: pointer;
  color: #885A35;
}

.navbar_account {
  margin-left: 51px;
  border: 0;
  font-size: 20px;
}

input {
  width: 456px;
  height: 45px;
  border: solid 1px rgba(0, 0, 0, 0.20);
  border-radius: 10px;
  padding-left: 15px;
  background-color: white;
  margin-left: 26px;
  box-sizing: border-box;
  font-size: 14px;
}

::placeholder {
  font-size: 14px;
}

</style>