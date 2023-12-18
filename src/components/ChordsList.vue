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
  font-weight: 500;
  letter-spacing: 3px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.chords__chord {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: solid 1px #c5bdb5;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
}
.chords img {
  width: 250px;
}
</style>