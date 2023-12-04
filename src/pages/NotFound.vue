<template>
  <div class="error">
    <h1 class="error-name">Ошибка 404</h1>
    <p class="error-message">Страница не найдена</p>
    <router-link to="/">Вернуться на главную страницу</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.error {
  margin: 30px 0 0 20px;
}
.error-name {
  font-size: 48px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
}
.error-message {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
}
</style>