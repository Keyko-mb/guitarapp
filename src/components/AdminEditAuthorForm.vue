<template>
  <div>
    <form @submit.prevent>
      <h3>Редактирование автора</h3>
      <p>Имя</p>
      <input v-model="author.name" class="input" type="text">
      <my-button @click="editAuthor">Изменить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {MyButton},
  props: {
    authorToEdit: {
      uuid: "",
      id: ""
    },
  },
  data() {
    return {
      author: {
        name: ""
      }
    }
  },
  emits: ['edit'],
  methods: {
    editAuthor() {
      this.$emit('edit', this.authorToEdit.id, this.author)
    },
  },
  mounted() {
    axios
        .get("http://localhost:8084/api/authorId/" + this.authorToEdit.uuid)
        .then((response) => {
          this.author = response.data
        })
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
h3 {
  font-size: 30px;
  font-weight: 400;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 5px;
}
.input {
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 500px;
  height: 25px;
  font-size: 18px;
  padding: 5px;
  margin-bottom: 10px;
}
</style>