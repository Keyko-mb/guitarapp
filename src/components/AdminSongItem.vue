<template>
  <div class="item">
    <p>
      {{song.name}} - {{song.author.name}}
    </p>
    <my-button class="item__btn" @click="$emit('editClick')" >Редактировать</my-button>
    <my-button class="item__btn" @click="$emit('remove', this.song)">Удалить</my-button>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
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
  width: 60%;
  margin-bottom: 10px;
  flex-grow: 3;
}
.item__btn {
  margin-left: 10px;
}
</style>