<template>
  <div>
    <div class="chords_edit">
      <my-dialog v-model:show="editChordDialogVisible">
        <admin-edit-chord-form :chordToEdit="this.selectedChord" @edit="editChord"></admin-edit-chord-form>
      </my-dialog>
      <my-dialog v-model:show="addChordDialogVisible">
        <admin-add-chord-form @add="addChords"></admin-add-chord-form>
      </my-dialog>
      <div class="edit_header">
        <h4>Выберите аккорд/бой</h4>
        <button @click="showChordAddDialog"><img src="/add.png" alt="icon" class="btn_add_icon"></button>
      </div>
      <div class="chords_edit_menu">
        <select class="chords_edit_menu__select" v-model="selectedChord">
          <option disabled value="">Выберите</option>
          <option v-for="chord in sortedChords" :value="chord" :key="chord.id">{{chord.name}}</option>
        </select>
        <div class="chords_edit_menu__btn">
          <button @click="removeChord"><img src="/remove.png" alt="icon" class="remove_icon"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminAddChordForm from "@/components/AdminAddChordForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";

export default {
  components: {MyDialog, AdminAddChordForm},
  data() {
    return {
      chords: [],
      addChordDialogVisible : false,
      editChordDialogVisible : false,
      selectedChord: {},
    }
  },
  mounted() {
    this.loadChords();
  },
  computed: {
    sortedChords() {
      return [...this.chords].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    },
  },
  methods: {
    loadChords() {
      axios
          .get('http://localhost:8084/api/accords')
          .then((response) => {
            this.chords = response.data
          })
    },
    addChords(chords) {
      let formData = new FormData();
      for (let i = 0; i < chords.files.length; i++) {
        formData.append('images', chords.files[i]);
      }
      axios
          .post('http://localhost:8084/api/accords', formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.chords.push(response.data[i]);
            }
          })
      this.addChordDialogVisible = false;
    },
    removeChord() {
      axios
          .delete("http://localhost:8084/api/accord/" + this.selectedChord.id)
      this.chords = this.chords.filter(p => p.id !== this.selectedChord.id)
    },
    editChord(id, chord) {
      let formData = new FormData();
      formData.append('image', chord.image);
      formData.append('name', chord.name);
      axios
          .patch("http://localhost:8084/api/accord/" + id, formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
          .then((response) => {
            this.chords = this.chords.filter(p => p.id !== id)
            this.chords.push(response.data)
          })
      this.editChordDialogVisible = false;
    },
    showChordAddDialog() {
      this.addChordDialogVisible = true;
    },
    showChordEditDialog() {
      this.editChordDialogVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
h4 {
  color: #885A35;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 5px;
}
button {
  border: none;
}
.edit_header{
  display: flex;
  gap: 10px;
}
.chords_edit_menu {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}
.chords_edit_menu__select {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  width: 180px;
  height: 35px;
  font-size: 20px;
  margin-right: 10px;
}
.chords_edit_menu__btn button{
  margin-right: 10px;
}
.btn_add_icon, .edit_icon, .remove_icon {
  height: 30px;
  width: 30px;
}
</style>