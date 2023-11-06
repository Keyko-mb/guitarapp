<template>
  <div>
    <p>
      {{song.name}} - {{song.author.name}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
      song: {
        name :"",
        author_id: "",
        text: ""
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
p {
  margin-top: 5px;
}
</style>