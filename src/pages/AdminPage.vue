<template>
  <div>
    <h1>Панель администратора</h1>

    <div class="songs_edit">
      <my-dialog v-model:show="editSongDialogVisible">
        <admin-edit-song-form @edit="editSong"></admin-edit-song-form>
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
        <admin-edit-author-form @edit="editAuthor"></admin-edit-author-form>
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
        <admin-edit-chord-form @edit="editChord"></admin-edit-chord-form>
      </my-dialog>
      <my-dialog v-model:show="addChordDialogVisible">
        <admin-add-chord-form @add="addChord"></admin-add-chord-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Аккорды и бой</h4>
        <button @click="showChordAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <div class="chords_edit_menu">
        <select class="chords_edit_menu__select" v-model="selectedChord">
          <option disabled value="">Выберите</option>
          <option v-for="chord in sortedChords" :key="chord.id">{{chord.name}}</option>
        </select>
        <div class="chords_edit_menu__btn">
          <button @click="showChordEditDialog" ><img src="/edit.png" alt="icon" class="edit_icon"></button>
          <button @click="removeChord"><img src="/remove.png" alt="icon" class="remove_icon"></button>
        </div>
      </div>
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

export default {
  components: {
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
      addSongDialogVisible : false,
      editSongDialogVisible : false,
      addAuthorDialogVisible : false,
      editAuthorDialogVisible : false,
      addChordDialogVisible : false,
      editChordDialogVisible : false,
      selectedChord: ''
    }
  },
  mounted() {
    this.loadSongs();
    this.loadAuthors();
    this.loadChords();
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
    }
  },
  methods: {
    loadSongs() {
      axios
          .get('http://localhost:8084/api/songs')
          .then((response) => {
            this.songs = response.data
            console.log(response)
          })
    },
    addSong(song, author, accords) {
      axios
          .post('http://localhost:8084/api/song', song, author, accords)
          .then((response) => {
            console.log(response)
            this.songs.push(response.data)
          })
      this.addSongDialogVisible = false;
    },
    removeSong(song) {
      axios
          .delete("http://localhost:8084/api/song/" + song.id)
      this.songs = this.songs.filter(p => p.id !== song.id)
    },
    editSong(song) {
      axios
          .patch("http://localhost:8084/api/song/" + song.id, song)
      this.songs = this.songs.filter(p => p.id !== song.id)
      this.songs.push(song)
    },

    loadAuthors() {
      axios
          .get('http://localhost:8084/api/authors')
          .then((response) => {
            this.authors = response.data
            console.log(response)
          })
    },
    addAuthor(author) {
      axios
          .post('http://localhost:8084/api/author', author)
          .then((response) => {
            console.log(response)
            this.authors.push(response.data)
          })
      this.addAuthorDialogVisible = false;
    },
    removeAuthor(author) {
      axios
          .delete("http://localhost:8084/api/author/" + author.id)
      this.authors = this.authors.filter(p => p.id !== author.id)
    },
    editAuthor(author) {
      axios
          .patch("http://localhost:8084/api/author/" + author.id, author)
      this.authors = this.authors.filter(p => p.id !== author.id)
      this.authors.push(author)
    },

    loadChords() {
      axios
          .get('http://localhost:8084/api/accords')
          .then((response) => {
            this.chords = response.data
            console.log(response)
          })
    },
    addChord() {
      axios
          .post('http://localhost:8084/api/chord' + "не готово")
          .then((response) => {
            console.log(response)
            this.chords.push(response.data)
          })
      this.addChordDialogVisible = false;
    },
    removeChord() {
      axios
          .delete("http://localhost:8084/api/chord/" + "не готово")
      // this.chords = this.chords.filter(p => p.id !== this.selectedChord.id)
    },
    editChord() {
      axios
          .patch("http://localhost:8084/api/chord/" + "не готово" )
      // this.chords = this.chords.filter(p => p.id !== this.selectedChord.id)
      // this.chords.push(this.selectedChord)
    },
    showSongAddDialog() {
      this.addSongDialogVisible = true;
    },
    showSongEditDialog() {
      this.editSongDialogVisible = true;
    },
    showAuthorAddDialog() {
      this.addAuthorDialogVisible = true;
    },
    showAuthorEditDialog() {
      this.editAuthorDialogVisible = true;
    },
    showChordAddDialog() {
      this.addChordDialogVisible = true;
    },
    showChordEditDialog() {
      this.editChordDialogVisible = true;
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
.authors_edit, .chords_edit {
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