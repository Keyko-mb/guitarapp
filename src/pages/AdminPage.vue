<template>
  <div>
    <h2>Админ-панелька</h2>
    <my-button @click="showDialog">Добавить песню</my-button>
    <my-dialog v-model:show="dialogVisible">
      <admin-song-form @add="addSong"></admin-song-form>
    </my-dialog>
    <admin-songs-list :songs="songs" ></admin-songs-list>
    <!-- @remove="removeSong" -->
    <!-- @edit="editSong" -->
  </div>
</template>

<script>
import AdminSongForm from "@/components/AdminSongForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton, MyDialog, AdminSongsList, AdminSongForm},

  data() {
    return {
      songs: [],
      dialogVisible : false,
    }
  },
  mounted() {
    axios
        .get('http://localhost:8084/api/songs')
        .then((response) => {
          this.songs = response.data
          this.songs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
          console.log(response)
        })
  },
  methods: {
    addSong(song) {
      axios
          .post('http://localhost:8084/api/song', song)
          .then((response) => {
            console.log(response)
          })
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    }

    // removeSong(song) {
    //   axios
    //       .delete()
    // },

    // editSong(song) {
    //   axios
    //       .put()
    // },
  }
}

</script>

<style lang="scss" scoped>

h2 {
  margin-top: 20px;
  margin-bottom: 5px;
}

</style>