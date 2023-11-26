<template>
  <div class="main">
    <h1>Какая-нибудь цитата</h1>
    <h4>Сборник аккордов песен, аппликатур и тд.</h4>
    <h3>Поиск среди песен</h3>
    <div class="main_search">
      <input v-model="searchedLine" placeholder="Поиск"/>
      <button @click="$router.push('/search/' + searchedLine)">Найти</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchedLine: ""
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.main {
  text-align: center;
  margin-top: 150px;
}

h1 {
  font-size: 48px;
  font-weight: 500;
  margin: 0;
}

h4 {
  font-size: 24px;
  font-weight: 300;
  margin: 14px 0 0 0;
}

h3 {
  color: #885A35;
  font-size: 32px;
  font-weight: 400;
  margin: 64px 0 20px 0;
}

.main_search button {
  width: 155px;
  height: 72px;
  border-radius: 0 10px 10px 0;
  border: 1px solid rgba(136, 90, 53, 0.40);
  background: rgba(136, 90, 53, 0.15);
  font-size: 24px;
}

.main_search input {
  width: 776px;
  height: 70px;
  border-radius: 10px 0 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  padding-left: 15px;
  background-color: white;
  margin-right: 9px;
  font-size: 24px;
}
</style>