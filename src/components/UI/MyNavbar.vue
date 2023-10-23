<template>
  <div class="navbar">
    <img src="/icon.png" >
    <div class="navbar__buttons">
      <button @click="$router.push('/songs')">Песни</button>
      <button style="margin-left: 20px" @click="$router.push('/chords')">Аккорды</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  border-bottom:  1px solid rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  padding: 0 15px;
}

img {
  width: 50px;
  height: 50px;
}

.navbar__buttons {
  margin-left: auto;
}

</style>