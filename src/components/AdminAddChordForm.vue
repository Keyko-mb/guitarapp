<template>
  <div>
    <form @submit.prevent>
      <h3>Добавление аккордов и боя</h3>
      <p>Файл</p>
      <input type="file" ref="files" multiple @change="handleFileUpload()"/>
      <my-button @click="addChords">Добавить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
  data() {
    return {
      chords: {
        files: ""
      }
    }
  },
  methods: {
    addChords() {
      this.$emit('add', this.chords)
    },
    handleFileUpload(){
      this.chords.files = this.$refs.files.files;
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
h3 {
  font-size: 30px;
  font-weight: 400;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 5px;
}
input {
  margin-bottom: 10px;
}
input[type=file]::file-selector-button {
  border: 1px solid rgba(0, 0, 0, 0.20);
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .2s ease-in-out;
  font-size: 14px;
}
input[type=file]::file-selector-button:hover {
  background: #e0e0e0;
}
</style>