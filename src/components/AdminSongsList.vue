<template>
  <div class="list" v-for="song in songs" :key="song.id">
    <admin-song-item class="item"
    :song="song"
    ></admin-song-item>
    <my-button @remove="$emit('remove', this.song)">Удалить</my-button>
    <my-button @add="$emit('edit', this.song)">Редактировать</my-button>
  </div>
</template>

<script>
import AdminSongItem from "@/components/AdminSongItem.vue";
import MyButton from "@/components/UI/MyButton.vue";
export default {
  components: {MyButton, AdminSongItem},
  props: {
    songs: {
      type: Array,
      required : true
    }
  },
  methods: {
    removeSong() {
      this.$emit('remove', this.song)
    },
    editSong() {
      this.$emit('edit', this.song)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 5px;
}

.item {
  flex-basis: 60%;
}
</style>