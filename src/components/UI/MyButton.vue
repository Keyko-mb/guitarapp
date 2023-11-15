<template>
  <div>
    <button class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(136, 90, 53, 0.40);
  background: rgba(136, 90, 53, 0.15);
  padding: 5px;
  font-size: 20px;
  font-weight: 400;
}
</style>