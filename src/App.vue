<template>
  <div class="app">
    <div class="app_content">
      <my-navbar></my-navbar>
      <router-view></router-view>
    </div>
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
  font-family: 'Raleway', sans-serif;
  background-color: #F9F9F9;
  margin: 0;
}

.app{
  margin-left: auto;
  margin-right: auto;
  width: 1440px;
  height: 1024px;
}

.app_content {
  margin-left: 117px;
  margin-right: 117px;
}
</style>