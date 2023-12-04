<template>
  <div class="list">
    <router-link class="link" :to="'/song/' + song.uuid" v-for="song in songs" :key="song.id">
      {{song.name}} - {{song.author.name}}
    </router-link>
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

.link {
  text-decoration: none;
  color: black;
}

.link:hover {
  color: #885A35;
}
</style>