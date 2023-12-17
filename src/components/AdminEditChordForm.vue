<template>
  <div>
    <form @submit.prevent>
      <h3>Редактирование аккорда/боя</h3>
      <p>Название</p>
      <input v-model="chord.name" class="input" type="text">
      <p>Файл</p>
      <input type="file" ref="files" :value="chord.file" id="input_field" @change="handleFileUpload()"/>
      <my-button @click="editChord">Изменить</my-button>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {MyButton},
  props: {
    chordToEdit: {
      uuid: "",
      id: "",
    }
  },
  data() {
    return {
      chord: {
        name: "",
        image: ""
      }
    }
  },
  mounted() {
    axios
        .get("http://localhost:8084/api/accordId/" + this.chordToEdit.uuid)
        .then((response) => {
          console.log(response.data)
          this.chord = response.data
          let fileName = this.chord.name

          fetch(("data:image/png;base64," + this.chord.image))
              .then(function(res){return res.arrayBuffer();})
              .then(function(buf){return new File([buf], fileName, {type:"image/png"});}
              ).then(function(file){
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('input_field').files = dataTransfer.files;
          })
        })
  },
  methods: {
    editChord() {
      this.$emit('edit', this.chordToEdit.id, this.chord)
    },
    handleFileUpload(){
      this.chord.files = this.$refs.files.files[0];
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
.input {
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 500px;
  height: 25px;
  font-size: 18px;
  padding: 5px;
}
input[type=file]::file-selector-button {
  border: 1px solid rgba(0, 0, 0, 0.20);
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .2s ease-in-out;
  font-size: 14px;
  margin-bottom: 10px;
}
input[type=file]::file-selector-button:hover {
  background: #e0e0e0;
}
</style>