<template>
  <div>
    <div v-if="error" class="alert" role="alert">
      {{error}}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    error: {}
  }
}
</script>

<style lang="scss" scoped>
.alert {
  color: #ff000f;
  font-size: 18px;
}
</style>