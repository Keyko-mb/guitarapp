<template>
  <div class="list" v-for="song in songs" :key="song.id">
    <admin-song-item @remove="removeSong" @editClick="editClick"
    :song="song"
    ></admin-song-item>
  </div>
</template>

<script>
import AdminSongItem from "@/components/AdminSongItem.vue";
export default {
  components: {AdminSongItem},
  props: {
    songs: {
      type: Array,
      required : true
    }
  },
  methods: {
    removeSong(songId) {
      this.$emit('remove', songId)
    },
    editClick(song) {
      this.$emit('editClick', song)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 3px;
}

</style>