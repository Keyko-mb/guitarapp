<template>
  <div>
    <h1>Админ-панелька</h1>
    <admin-songs-list
        :songs="sortedPosts"
        @remove="removeSong"
        @editClick="showEditDialog"
    ></admin-songs-list>
    <my-dialog v-model:show="editDialogVisible">
      <admin-edit-form @edit="editSong"></admin-edit-form>
    </my-dialog>
    <my-button @click="showAddDialog">Добавить песню</my-button>
    <my-dialog v-model:show="addDialogVisible">
      <admin-add-form @add="addSong"></admin-add-form>
    </my-dialog>
  </div>
</template>

<script>
import AdminAddForm from "@/components/AdminAddForm.vue";
import AdminEditForm from "@/components/AdminEditForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton, MyDialog, AdminSongsList, AdminAddForm, AdminEditForm},

  data() {
    return {
      songs: [],
      addDialogVisible : false,
      editDialogVisible : false,
    }
  },
  mounted() {
    this.loadSongs();
  },
  computed: {
    sortedPosts() {
      return [...this.songs].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
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
      this.addDialogVisible = false;
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
    showAddDialog() {
      this.addDialogVisible = true;
    },
    showEditDialog() {
      this.editDialogVisible = true;
    },
  }
}

</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
}

</style>