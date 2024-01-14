<template>
  <div>
    <div class="authors_edit">
      <my-dialog v-model:show="editAuthorDialogVisible">
        <admin-edit-author-form @edit="editAuthor" :authorToEdit="this.authorToEdit"></admin-edit-author-form>
      </my-dialog>
      <my-dialog v-model:show="addAuthorDialogVisible">
        <admin-add-author-form @add="addAuthor"></admin-add-author-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Список исполнителей</h4>
        <button @click="showAuthorAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <my-error v-if="error" :error="error"></my-error>
      <admin-authors-list
          :authors="sortedAuthors"
          @remove="removeAuthor"
          @editClick="showAuthorEditDialog"
      ></admin-authors-list>
    </div>
  </div>
</template>

<script>
import AdminAddAuthorForm from "@/components/AdminAddAuthorForm.vue";
import AdminEditAuthorForm from "@/components/AdminEditAuthorForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import AdminAuthorsList from "@/components/AdminAuthorsList.vue";
import axios from "axios";
import MyError from "@/components/UI/MyError.vue";

export default {
  components: {MyError, AdminAuthorsList, MyDialog, AdminEditAuthorForm, AdminAddAuthorForm},
  data() {
    return {
      authors: [],
      addAuthorDialogVisible : false,
      editAuthorDialogVisible : false,
      authorToEdit: {},
      error: ""
    }
  },
  mounted() {
    this.loadAuthors();
  },
  computed: {
    sortedAuthors() {
      return [...this.authors].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
  },
  methods: {
    loadAuthors() {
      axios
          .get('http://localhost:8084/api/authors')
          .then((response) => {
            this.authors = response.data
          })
    },
    addAuthor(author) {
      axios
          .post('http://localhost:8084/api/author', author)
          .then((response) => {
            this.authors.push(response.data)
          })
      this.addAuthorDialogVisible = false;
    },
    removeAuthor(id) {
        axios
            .delete("http://localhost:8084/api/author/" + id)
      this.authors = this.authors.filter(p => p.id !== id)
      },
    editAuthor(id, author) {
      axios
          .patch("http://localhost:8084/api/author/" + id, author)
          .then((response) => {
            this.authors = this.authors.filter(p => p.id !== id)
            this.authors.push(response.data)
          })
      this.editAuthorDialogVisible = false;
    },
    showAuthorAddDialog() {
      this.addAuthorDialogVisible = true;
    },
    showAuthorEditDialog(author) {
      this.authorToEdit = author;
      this.editAuthorDialogVisible = true;
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