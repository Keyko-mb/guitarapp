<template>
  <div>
    <h1>Аккорды и бой</h1>
    <my-chords class="chords" :chords="chords"></my-chords>
    <div class="page_wrapper">
      <div class="page" v-for="pageNumber in totalPages"
           :key="pageNumber"
           :class="{'current-page': (page + 1) === pageNumber}"
           @click="changePage(pageNumber-1)"
      >{{pageNumber}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyChords from "@/components/ChordsList.vue";

export default {
  components: {MyChords},
  data() {
    return {
      chords: [],
      page: 0,
      limit: 4,
      totalPages: 0
    }
  },
  mounted() {
    this.loadChords();
  },
  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    loadChords() {
      axios
          .get('http://localhost:8084/api/accords/' + this.page + '/' + this.limit)
          .then((response) => {
            this.chords = response.data.content
            this.chords.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            this.totalPages = response.data.totalPages;
          })
    }
  },
  watch: {
    page() {
      this.loadChords();
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
}
.chords {
  display: flex;
  justify-content: center;
}
.page_wrapper {
  display: flex;
  margin-top: 5px;
}
.page {
  padding: 5px;
  font-size: 20px;

}
.current-page {
  color: #885A35;
}
.page:hover {
  cursor: pointer;
}
</style>