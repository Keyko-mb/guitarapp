<template>
  <div class="list" v-for="author in authors" :key="author.id">
    <admin-author-item @remove="removeAuthor" @editClick="editClick"
                     :author="author"
    ></admin-author-item>
  </div>
</template>

<script>
import AdminAuthorItem from "@/components/AdminAuthorItem.vue";
export default {
  components: {AdminAuthorItem},
  props: {
    authors: {
      type: Array,
      required : true
    }
  },
  methods: {
    removeAuthor(authorId) {
      this.$emit('remove', authorId)
    },
    editClick(author) {
      this.$emit('editClick', author)
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