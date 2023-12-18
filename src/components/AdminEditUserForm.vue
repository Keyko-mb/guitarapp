<template>
  <div>
    <form @submit.prevent>
      <h3>Редактирование пользователя</h3>
      <p>Имя</p>
      <input v-model="user.username" class="input" type="text">
      <p>Почта</p>
      <input v-model="user.email" class="input" type="text">
      <p>Роль</p>
      <select class="select" v-model="user.role" id="select_role">
        <option value="" selected disabled>Выберите роль</option>
        <option>ROLE_USER</option>
        <option>ROLE_ADMIN</option>
      </select>
      <my-button @click="editUser">Изменить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {MyButton},
  props: {
    userToEdit: {
      uuid: "",
      id: "",
    }
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        role: ""
      }
    }
  },
  emits: ['edit'],
  methods: {
    editUser() {
      this.$emit('edit', this.userToEdit.id, this.user)
    },
  },
  mounted() {
    axios
        .get("http://localhost:8084/api/personId/" + this.userToEdit.uuid)
        .then((response) => {
          this.user = response.data
          console.log(this.user)
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
}
.select {
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 180px;
  height: 35px;
  font-size: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>