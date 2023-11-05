<template>
  <div>
    <admin-song-form></admin-song-form>
    <admin-songs-list songs="songs"></admin-songs-list>
  </div>
</template>

<script>
import AdminSongForm from "@/components/AdminSongForm.vue";
import AdminSongsList from "@/components/AdminSongsList.vue";

export default {
  components: {AdminSongsList, AdminSongForm},

  data() {
    return {
      songs: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>