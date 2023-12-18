<template>
  <div class="account">
      <h1 class="account-header">Личный кабинет</h1>
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
import MyButton from "@/components/UI/MyButton.vue";
import SongsList from "@/components/SongsList.vue";
import PersonalInfo from "@/components/PersonalInfo.vue";
import PersonalFavourites from "@/components/PersonalFavourites.vue";

export default {
  components: {SongsList, MyButton},
  data() {
    return {
      tabs: [
        {
          name: "Личные данные",
          component: PersonalInfo
        },
        {
          name: "Избранные песни",
          component: PersonalFavourites
        },
      ],
      currentTab: ""
    }
  },
  mounted() {
    this.currentTab = this.tabs.at(0)
  }
}
</script>

<style lang="scss" scoped>
.account-header {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
}
.account {
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