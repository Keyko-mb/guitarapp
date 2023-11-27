<template>
  <div>
    <h1>Панель администратора</h1>

    <div class="songs_edit">
      <h4>Песни</h4>
      <admin-songs-list
          :songs="sortedSongs"
          @remove="removeSong"
          @editClick="showSongEditDialog"
      ></admin-songs-list>
      <my-dialog v-model:show="editSongDialogVisible">
        <admin-edit-song-form @edit="editSong"></admin-edit-song-form>
      </my-dialog>
      <my-button @click="showSongAddDialog">Добавить песню</my-button>
      <my-dialog v-model:show="addSongDialogVisible">
        <admin-add-song-form @add="addSong"></admin-add-song-form>
      </my-dialog>
    </div>

    <div class="authors_edit">
      <h4>Исполнители</h4>
      <admin-authors-list
          :authors="sortedAuthors"
          @remove="removeAuthor"
          @editClick="showAuthorEditDialog"
      ></admin-authors-list>
      <my-dialog v-model:show="editAuthorDialogVisible">
        <admin-edit-author-form @edit="editAuthor"></admin-edit-author-form>
      </my-dialog>
      <my-button @click="showAuthorAddDialog">Добавить автора</my-button>
      <my-dialog v-model:show="addAuthorDialogVisible">
        <admin-add-author-form @add="addAuthor"></admin-add-author-form>
      </my-dialog>
    </div>

    <div class="chords_edit">
      <h4>Аккорды</h4>
      <select class="chordsSelect" v-model="selectedChord">
        <option disabled value="">Cписок</option>
        <option v-for="chord in chords" :key="chord.id">{{chord.name}}</option>
      </select>
      <span>Выбрано: {{ selectedChord }}</span>
    </div>

  </div>
</template>

<script>
import AdminAddSongForm from "@/components/AdminAddSongForm.vue";
import AdminEditSongForm from "@/components/AdminEditSongForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import AdminAuthorsList from "@/components/AdminAuthorsList.vue";
import AdminEditAuthorForm from "@/components/AdminEditAuthorForm.vue";
import AdminAddAuthorForm from "@/components/AdminAddAuthorForm.vue";

export default {
  components: {
    AdminAddAuthorForm,
    AdminEditAuthorForm,
    AdminAuthorsList,
    MyButton,
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
    addSong(song) {
      axios
          .post('http://localhost:8084/api/song', song)
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
          .post('http://localhost:8084/api/author/{id}', author)
          .then((response) => {
            console.log(response)
            this.authors.push(response.data)
          })
      this.addSongDialogVisible = false;
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
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 5px;
}
.authors_edit {
  margin-top: 30px;
}

select {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 150px;
  height: 30px;
}
</style>