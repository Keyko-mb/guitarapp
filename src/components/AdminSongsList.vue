<template>
  <div>
    <p v-for="song in songs" :key="song.id">
      {{song.name}} - {{song.author.name}}
    </p>
    <button>Удалить</button>
    <button>Редактировать</button>
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
p {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 3px;
}
</style>