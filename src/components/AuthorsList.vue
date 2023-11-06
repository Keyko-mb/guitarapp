<template>
  <div>
    <p v-for="author in authors" :key="author.id">{{author.name}}</p>
  </div>
</template>

<script>

export default {
  props: {
    authors: {
      type: Array,
      required : true
    }
  },
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 3px;
}
</style>