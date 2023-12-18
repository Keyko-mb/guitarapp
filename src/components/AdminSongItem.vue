<template>
  <div class="item">
    <p>
      {{song.name}} - {{song.author.name}}
    </p>
    <button class="item__btn" @click="$emit('editClick', this.song)" ><img src="/edit.png" alt="icon" class="edit_icon"></button>
    <button class="item__btn" @click="$emit('remove', this.song.id)"><img src="/remove.png" alt="icon" class="remove_icon"></button>
  </div>
</template>

<script>

export default {
  props: {
      song: {
        id: "",
        name :"",
        author: {
          id: "",
          name: ""
        },
        text: ""
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