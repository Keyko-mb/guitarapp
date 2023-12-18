<template>
  <div>
    <h1>Исполнители</h1>
    <authors-list :authors="authors"></authors-list>
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
import AuthorsList from "@/components/AuthorsList.vue";

export default {
  components: {AuthorsList},
  data() {
    return {
      authors: [],
      page: 0,
      limit: 1,
      totalPages: 0
    }
  },
  mounted() {
    this.loadAuthors();
  },
  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    loadAuthors() {
      axios
          .get('http://localhost:8084/api/authors/' + this.page + '/' + this.limit)
          .then((response) => {
            this.authors = response.data.content
            this.authors.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            this.totalPages = response.data.totalPages;
          })
    }
  },
  watch: {
    page() {
      this.loadAuthors();
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