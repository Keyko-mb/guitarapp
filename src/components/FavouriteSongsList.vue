<template>
  <div class="list">
    <div class="list_item" v-for="song in songs" :key="song.id">
      <router-link class="list_item_link" :to="'/song/' + song.uuid">{{song.name}} - {{song.author.name}}</router-link>
      <button class="list_item_btn" @click="$emit('remove', song.id)"><img src="/remove.png" alt="icon" class="remove_icon"></button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    songs: {
      type: Array,
      required : true
    }
  },
  emits: ['remove']
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2.3px;
  line-height: 30px;
}
.list_item_link {
  text-decoration: none;
  color: black;
  flex-grow: 2;
}
.link:hover {
  color: #885A35;
}
.list_item {
  display: flex;
  justify-content: space-between;
  width: 40%;
  flex-grow: 3;
}
.list_item_btn {
  border: none;
}
.remove_icon {
  width: 25px;
  height: 25px;
}
</style>