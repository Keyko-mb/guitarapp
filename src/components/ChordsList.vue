<template>
  <div class="chords">
    <div class="chords__chord" v-for="chord in chords" :key="chord.id">
      <p>{{chord.name}}</p>
      <img :src="'data:image/png;base64,' + chord.image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chords: {
      type: Array,
      required : true
    }
  }
}
</script>

<style lang="scss" scoped>
.chords {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 3px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.chords img {
  width: 250px;
}
</style>