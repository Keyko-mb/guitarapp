<template>
  <div>
    <h1>Панель администратора</h1>
    <div id="dynamic-component-demo" class="demo">
      <button
          v-for="tab in tabs"
          :key="tab.name"
          :class="['tab-button', { active: currentTab.name === tab.name }]"
          @click="currentTab = tab">
        {{ tab.name }}
      </button>
      <component :is="currentTab.component" class="tab"></component>
    </div>
  </div>
</template>

<script>

import AdminSongsComponent from "@/components/AdminSongsComponent.vue";
import AdminChordsComponent from "@/components/AdminChordsComponent.vue";
import AdminAuthorsComponent from "@/components/AdminAuthorsComponent.vue";
import AdminUsersComponent from "@/components/AdminUsersComponent.vue";

export default {
  data() {
    return {
      tabs: [
        {
          name: "Песни",
          component: AdminSongsComponent
        },
        {
          name: "Исполнители",
          component: AdminAuthorsComponent
        },
        {
          name: "Аккорды и бой",
          component: AdminChordsComponent
        },
        {
          name: "Пользователи",
          component: AdminUsersComponent
        }
      ],
      currentTab: ""
    }
  },
  mounted() {
    this.currentTab = this.tabs.at(0)
  },
}

</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
}
.tab-button {
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
.tab-button:hover {
  background: #e6dfdb;
}
.tab-button.active {
  background: #e6dfdb;
}
.tab {
  border: 1px solid #ccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
}
</style>