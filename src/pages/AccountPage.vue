<template>
  <div>
    <h1>
      Личный кабинет
    </h1>
    <my-button @click="$router.push('/admin')">Панель администратора</my-button>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton}

}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>