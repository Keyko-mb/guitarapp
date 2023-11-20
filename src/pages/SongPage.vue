<template>
  <div class="song">
    <div class="first">
      <div class="names">
        <h1>{{song.name}}</h1>
        <h4>{{song.author.name}}</h4>
      </div>
      <div class="buttons">
        <div class="buttons__size">
          <my-button @click="fontSize >= 2? fontSize = 2: fontSize += 0.25">+</my-button>
          <p>Размер текста</p>
          <my-button @click="fontSize <= 0.75? fontSize = 0.75: fontSize -= 0.25">-</my-button>
        </div>
        <div class="buttons__scroll">
          <my-button>+</my-button>
          <p>Прокрутка</p>
          <my-button>-</my-button>
        </div>
      </div>
      <div class="text">
        <p v-html="song.text" :style="{fontSize: fontSize + 'rem'}"></p>
      </div>
    </div>
    <div class="second">
      <div class="chords">
        <p>Аппликатуры аккордов</p>
        <my-chords
            :chords="chords"
        ></my-chords>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyButton from "@/components/UI/MyButton.vue";
import MyChords from "@/components/UI/MyChords.vue";

export default {
  components: {MyChords, MyButton},
  data() {
    return {
      song: {
        id: '',
        name: '',
        author: {
          id: '',
          name: ''
        },
        text: ''
      },
      chords: [],
      fontSize: 1.25
    }
  },

  props: {
    id: {
      type: String,
      required : true
    }
  },

  mounted() {
    axios
        .get("http://localhost:8084/api/songId/" + this.id)
        .then((response) => {
          this.song = response.data
          console.log(response)
        })
    axios
        .get("http://localhost:8084/api/song/" + this.id + "/accords")
        .then((response) => {
          this.chords = response.data
          console.log(response)
        })
  }
}
</script>


<style lang="scss" scoped>
.song {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 60px;
}
.first {
  grid-column-start: 1;
  grid-column-end: 2;
}
.second {
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  justify-content: center;
  margin-top: 111px;
}
.text {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2.3px;
  margin-top: 20px;
  white-space: pre;
}
.names h1 {
  font-size: 48px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
}
.names h4 {
  color: #885A35;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
}
.buttons {
  font-size: 20px;
  font-weight: 400;
  display: flex;
  gap: 30px;
}
.buttons__size, .buttons__scroll {
  display: flex;
  gap: 5px;
}
.buttons__size p, .buttons__scroll p {
  height:36px;
  line-height:36px;
}
.chords {
  width: 550px;
}
.chords p {
  font-size: 20px;
  font-weight: 400;
  justify-self: center;
  margin-bottom: 10px;
}
</style>