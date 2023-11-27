<template>
  <div>
    <select class="select">
      <option v-for="item in items" :key="item.id">{{item.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 150px;
}
</style>