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
  padding: 10px 25px 10px 25px;
  font-size: 18px;
  font-weight: 400;
}
button:hover {
  cursor: pointer;
  background: rgba(210, 168, 135, 0.15);
}
</style>