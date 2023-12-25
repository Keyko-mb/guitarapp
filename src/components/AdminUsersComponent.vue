<template>
  <div>
    <div class="users_edit">
      <my-dialog v-model:show="editUserDialogVisible">
        <admin-edit-user-form @edit="editUser" :userToEdit="this.userToEdit"></admin-edit-user-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Список пользователей</h4>
      </div>
      <admin-users-list
          :users="sortedUsers"
          @remove="removeUser"
          @editClick="showUserEditDialog"
      ></admin-users-list>
    </div>
  </div>
</template>

<script>
import AdminEditUserForm from "@/components/AdminEditUserForm.vue";
import AdminUsersList from "@/components/AdminUsersList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";

export default {
  components: {MyDialog, AdminUsersList, AdminEditUserForm},
  data() {
    return {
      users: [],
      editUserDialogVisible : false,
      userToEdit: {}
    }
  },
  mounted() {
    this.loadUsers();
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a,b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1)
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    loadUsers() {
      axios
          .get('http://localhost:8084/api/person')
          .then((response) => {
            this.users = response.data
            this.users = this.users.filter(p => p.id !== this.currentUser.person.id)
          })
    },
    removeUser(id) {
      axios
          .delete("http://localhost:8084/api/person/" + id)
      this.users = this.users.filter(p => p.id !== id)
    },
    editUser(id, user) {
      axios
          .patch("http://localhost:8084/api/person/" + id, user)
          .then((response) => {
            this.users = this.users.filter(p => p.id !== id)
            this.users.push(response.data)
          })
      this.editUserDialogVisible = false;
    },
    showUserEditDialog(user) {
      this.userToEdit = user;
      this.editUserDialogVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
h4 {
  color: #885A35;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 5px;
}
button {
  border: none;
}
.edit_header{
  display: flex;
  gap: 10px;
}
.btn_add_icon, .edit_icon, .remove_icon {
  height: 30px;
  width: 30px;
}
</style>