<template>
  <div>
    <h1>Панель администратора</h1>

    <div class="songs_edit">
      <my-dialog v-model:show="editSongDialogVisible">
        <admin-edit-song-form @edit="editSong" :songToEdit="this.songToEdit"></admin-edit-song-form>
      </my-dialog>
      <my-dialog v-model:show="addSongDialogVisible">
        <admin-add-song-form @add="addSong"></admin-add-song-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Песни</h4>
        <button class="btn_add" @click="showSongAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <admin-songs-list
          :songs="sortedSongs"
          @remove="removeSong"
          @editClick="showSongEditDialog"
      ></admin-songs-list>
    </div>

    <div class="authors_edit">
      <my-dialog v-model:show="editAuthorDialogVisible">
        <admin-edit-author-form @edit="editAuthor" :authorToEdit="this.authorToEdit"></admin-edit-author-form>
      </my-dialog>
      <my-dialog v-model:show="addAuthorDialogVisible">
        <admin-add-author-form @add="addAuthor"></admin-add-author-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Исполнители</h4>
        <button @click="showAuthorAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <admin-authors-list
          :authors="sortedAuthors"
          @remove="removeAuthor"
          @editClick="showAuthorEditDialog"
      ></admin-authors-list>
    </div>

    <div class="chords_edit">
      <my-dialog v-model:show="editChordDialogVisible">
        <admin-edit-chord-form :chordToEdit="this.selectedChord" @edit="editChord"></admin-edit-chord-form>
      </my-dialog>
      <my-dialog v-model:show="addChordDialogVisible">
        <admin-add-chord-form @add="addChords"></admin-add-chord-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Аккорды и бой</h4>
        <button @click="showChordAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <div class="chords_edit_menu">
        <select class="chords_edit_menu__select" v-model="selectedChord">
          <option disabled value="">Выберите</option>
          <option v-for="chord in sortedChords" :value="chord" :key="chord.id">{{chord.name}}</option>
        </select>
        <div class="chords_edit_menu__btn">
          <button @click="showChordEditDialog" ><img src="/edit.png" alt="icon" class="edit_icon"></button>
          <button @click="removeChord"><img src="/remove.png" alt="icon" class="remove_icon"></button>
        </div>
      </div>
    </div>

    <div class="users_edit">
      <my-dialog v-model:show="editUserDialogVisible">
        <admin-edit-user-form @edit="editUser" :userToEdit="this.userToEdit"></admin-edit-user-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Пользователи</h4>
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
import AdminAddSongForm from "@/components/AdminAddSongForm.vue";
import AdminEditSongForm from "@/components/AdminEditSongForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog.vue";
import AdminAuthorsList from "@/components/AdminAuthorsList.vue";
import AdminEditAuthorForm from "@/components/AdminEditAuthorForm.vue";
import AdminAddAuthorForm from "@/components/AdminAddAuthorForm.vue";
import AdminEditChordForm from "@/components/AdminEditChordForm.vue";
import AdminAddChordForm from "@/components/AdminAddChordForm.vue";
import AdminUsersList from "@/components/AdminUsersList.vue";
import AdminEditUserForm from "@/components/AdminEditUserForm.vue";

export default {
  components: {
    AdminEditUserForm,
    AdminUsersList,
    AdminAddChordForm,
    AdminEditChordForm,
    AdminAddAuthorForm,
    AdminEditAuthorForm,
    AdminAuthorsList,
    MyDialog,
    AdminSongsList,
    AdminAddSongForm,
    AdminEditSongForm},

  data() {
    return {
      songs: [],
      authors: [],
      chords: [],
      users: [],
      addSongDialogVisible : false,
      editSongDialogVisible : false,
      addAuthorDialogVisible : false,
      editAuthorDialogVisible : false,
      addChordDialogVisible : false,
      editChordDialogVisible : false,
      editUserDialogVisible : false,
      selectedChord: {},
      songToEdit: {},
      authorToEdit: {},
      userToEdit: {}
    }
  },
  mounted() {
    this.loadSongs();
    this.loadAuthors();
    this.loadChords();
    this.loadUsers();
  },
  computed: {
    sortedSongs() {
      return [...this.songs].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
    sortedAuthors() {
      return [...this.authors].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
    sortedChords() {
      return [...this.chords].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
    sortedUsers() {
      return [...this.users].sort((a,b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1)
    }
  },
  methods: {
    loadSongs() {
      axios
          .get('http://localhost:8084/api/songs')
          .then((response) => {
            this.songs = response.data
          })
    },
    addSong(song) {
      axios
          .post('http://localhost:8084/api/song', song)
          .then((response) => {
            this.songs.push(response.data)
          })
      this.addSongDialogVisible = false;
    },
    removeSong(id) {
      axios
          .delete("http://localhost:8084/api/song/" + id)
      this.songs = this.songs.filter(p => p.id !== id)
    },
    editSong(id, song) {
      axios
          .patch("http://localhost:8084/api/song/" + id, song)
          .then((response) => {
            this.songs = this.songs.filter(p => p.id !== id)
            this.songs.push(response.data)
          })
      this.editSongDialogVisible = false;
    },

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

    loadChords() {
      axios
          .get('http://localhost:8084/api/accords')
          .then((response) => {
            this.chords = response.data
          })
    },
    addChords(chords) {
      let formData = new FormData();
      for (let i = 0; i < chords.files.length; i++) {
        formData.append('images', chords.files[i]);
      }
      axios
          .post('http://localhost:8084/api/accords', formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.chords.push(response.data[i]);
            }
          })
      this.addChordDialogVisible = false;
    },
    removeChord() {
      axios
          .delete("http://localhost:8084/api/accord/" + this.selectedChord.id)
      this.chords = this.chords.filter(p => p.id !== this.selectedChord.id)
    },
    editChord(id, chord) {
      let formData = new FormData();
      formData.append('image', chord.image);
      formData.append('name', chord.name);
      axios
          .patch("http://localhost:8084/api/accord/" + id, formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
          .then((response) => {
            this.chords = this.chords.filter(p => p.id !== id)
            this.chords.push(response.data)
          })
      this.editChordDialogVisible = false;
    },

    loadUsers() {
      axios
          .get('http://localhost:8084/api/person')
          .then((response) => {
            this.users = response.data
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
    showSongAddDialog() {
      this.addSongDialogVisible = true;
    },
    showSongEditDialog(song) {
      this.songToEdit = song;
      this.editSongDialogVisible = true;
    },
    showAuthorAddDialog() {
      this.addAuthorDialogVisible = true;
    },
    showAuthorEditDialog(author) {
      this.authorToEdit = author;
      this.editAuthorDialogVisible = true;
    },
    showChordAddDialog() {
      this.addChordDialogVisible = true;
    },
    showChordEditDialog() {
      this.editChordDialogVisible = true;
    },
    showUserEditDialog(user) {
      this.userToEdit = user;
      this.editUserDialogVisible = true;
    },
  }
}

</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
}
h4 {
  color: #885A35;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 5px;
}
button {
  border: none;
}
.authors_edit, .chords_edit, .users_edit {
  margin-top: 30px;
}
.edit_header{
  display: flex;
  gap: 10px;
}
.chords_edit_menu {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}
.chords_edit_menu__select {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 180px;
  height: 35px;
  font-size: 20px;
  margin-right: 10px;
}
.chords_edit_menu__btn button{
  margin-right: 10px;
}
.btn_add_icon, .edit_icon, .remove_icon {
  height: 30px;
  width: 30px;
}
</style>