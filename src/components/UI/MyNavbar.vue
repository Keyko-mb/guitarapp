<template>
  <div class="navbar">
    <button class="navbar_icon" @click="$router.push('/')"><img src="/icon.png" alt="icon" class="navbar_icon_png"></button>
    <div class="navbar_buttons">
      <button @click="$router.push('/songs')">Песни</button>
      <button @click="$router.push('/authors')">Исполнители</button>
      <button @click="$router.push('/chords')">Аккорды</button>
    </div>
    <input v-model="search" placeholder="Поиск"/>
    <button class="navbar_account" @click="$router.push('/account')">Личный кабинет</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
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
}

::placeholder {
  font-size: 20px;
}

</style>