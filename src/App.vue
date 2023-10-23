<template>
  <div class="app">
    <my-navbar></my-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavbar from "@/components/UI/MyNavbar.vue";

export default {
  components: {
    MyNavbar
  }

}
</script>

<style lang="scss">
* {
  padding: 0;
  background: #F9F9F9;
}

.app{
  margin-right: 117px;
  margin-left: 117px;
}
</style>