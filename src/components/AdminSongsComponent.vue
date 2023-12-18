<template>
  <div>
    <div class="songs_edit">
      <my-dialog v-model:show="editSongDialogVisible">
        <admin-edit-song-form @edit="editSong" :songToEdit="this.songToEdit"></admin-edit-song-form>
      </my-dialog>
      <my-dialog v-model:show="addSongDialogVisible">
        <admin-add-song-form @add="addSong"></admin-add-song-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Список песен</h4>
        <button class="btn_add" @click="showSongAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <admin-songs-list
          :songs="sortedSongs"
          @remove="removeSong"
          @editClick="showSongEditDialog"
      ></admin-songs-list>
    </div>
  </div>
</template>

<script>
import AdminAddSongForm from "@/components/AdminAddSongForm.vue";
import AdminEditSongForm from "@/components/AdminEditSongForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";

export default {
  components: {MyDialog, AdminSongsList, AdminEditSongForm, AdminAddSongForm},
  data() {
    return {
      songs: [],
      addSongDialogVisible : false,
      editSongDialogVisible : false,
      songToEdit: {},
    }
  },
  mounted() {
    this.loadSongs();
  },
  computed: {
    sortedSongs() {
      return [...this.songs].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
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
    showSongAddDialog() {
      this.addSongDialogVisible = true;
    },
    showSongEditDialog(song) {
      this.songToEdit = song;
      this.editSongDialogVisible = true;
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