<template>
  <div class="edit_form">
    <form @submit.prevent>
      <h3>Редактирование аккорда</h3>
      <p>Название</p>
      <input v-model="chord.name" class="input" type="text" placeholder="name">
      <my-button @click="editChord">Изменить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
  data() {
    return {
      chord: {
        id: "",
        name: "",
        img: ""
      }
    }
  },
  methods: {
    editChord() {
      this.$emit('edit', this.chord)
    },
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
h3 {
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 400;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px;
}
.input {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 500px;
  height: 40px;
  padding: 5px;
  margin-bottom: 5px;
}
.input#text {
  height: 250px;
  margin-bottom: 10px;
}

</style>