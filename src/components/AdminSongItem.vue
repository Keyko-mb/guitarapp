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
// import MyButton from "@/components/UI/MyButton.vue";

export default {
  // components: {MyButton},
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
  methods: {
  }
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