<template>
  <div class="list" v-for="user in users" :key="user.id">
    <admin-user-item @remove="removeUser" @editClick="editClick"
                     :user="user"
    ></admin-user-item>
  </div>
</template>

<script>
import AdminUserItem from "@/components/AdminUserItem.vue";
export default {
  components: {AdminUserItem},
  props: {
    users: {
      type: Array,
      required : true
    }
  },
  emits: ['editClick', 'remove'],
  methods: {
    removeUser(userId) {
      this.$emit('remove', userId)
    },
    editClick(user) {
      this.$emit('editClick', user)
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