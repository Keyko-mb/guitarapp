<template>
  <div class="item">
    <p>
      {{user.username}} ({{user.email}})
    </p>
    <button class="item__btn" @click="$emit('editClick', this.user)" ><img src="/edit.png" alt="icon" class="edit_icon"></button>
    <button class="item__btn" @click="$emit('remove', this.user.id)"><img src="/remove.png" alt="icon" class="remove_icon"></button>
  </div>
</template>

<script>

export default {
  props: {
    user: {
      id: "",
      username : "",
      email: "",
      role: ""
    }
  },
  emits: ['editClick', 'remove'],
}
</script>

<style lang="scss" scoped>
p {
  margin-top: 5px;
  flex-grow: 2;
}
.item {
  display: flex;
  justify-content: space-between;
  width: 45%;
  margin-bottom: 10px;
  flex-grow: 3;
}
.item__btn {
  margin-left: 10px;
  border: none;
}
.edit_icon, .remove_icon {
  width: 30px;
  height: 30px;
}
</style>