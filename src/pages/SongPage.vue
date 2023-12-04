<template>
  <div class="song">
    <div class="first">
      <div class="names">
        <h1>{{song.name}}</h1>
        <h4>{{song.author.name}}</h4>
      </div>
      <div class="buttons">
        <div class="buttons__size">
          <button @click="fontSize <= 0.75? fontSize = 0.75: fontSize -= 0.25"><img src="/minus.png" alt="icon" class="icon"></button>
          <p>Размер текста</p>
          <button @click="fontSize >= 2? fontSize = 2: fontSize += 0.25"><img src="/add.png" alt="icon" class="icon"></button>
        </div>
        <div class="buttons__scroll">
          <button @click="this.scrollSpeed+100>=301 ? scrollStop() : scrollDown(100)"><img src="/minus.png" alt="icon" class="icon"></button>
          <p>Прокрутка</p>
          <button @click="scrollDown(-100)"><img src="/add.png" alt="icon" class="icon"></button>
        </div>
      </div>
      <div class="text">
        <p v-html="song.text" :style="{fontSize: fontSize + 'rem'}"></p>
      </div>
    </div>
    <div class="second">
      <div class="chords">
        <my-chords
            :chords="chords"
        ></my-chords>
      </div>
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
      song: {
        uuid: '',
        id: '',
        name: '',
        author: {
          id: '',
          name: ''
        },
        text: ''
      },
      chords: [],
      fontSize: 1.25,
      interval: null,
      scrollSpeed: 301,
    }
  },

  props: {
    uuid: {
      type: String,
      required : true
    }
  },

  mounted() {
    axios
        .get("http://localhost:8084/api/songId/" + this.uuid)
        .then((response) => {
          this.song = response.data
          console.log(this.song.id)
        })
    axios
        .get("http://localhost:8084/api/song/" + this.uuid + "/accords")
        .then((response) => {
          this.chords = response.data
          console.log(response)
        })
  },

  methods: {
    scrollDown(delta) {
      this.scrollSpeed += delta
      this.scrollSpeed = Math.max(this.scrollSpeed, 1)
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        window.scrollBy( { top: 1, left: 0, behavior: 'smooth' } );
      }, this.scrollSpeed);
      console.log(this.scrollSpeed)
    },
    scrollStop() {
      this.scrollSpeed=301
      clearInterval(this.interval);
    }
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
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
}
.buttons {
  font-size: 20px;
  font-weight: 400;
  display: flex;
  gap: 30px;
}
.buttons button {
  border: none;
}
.buttons__size, .buttons__scroll {
  display: flex;
  gap: 5px;
}
.buttons__size p, .buttons__scroll p {
  height:36px;
  line-height:36px;
}
.icon {
  width: 30px;
  height: 30px;
}
.chords {
  width: 550px;
  top: 3em;
  position: sticky;
  margin-top: 30px;
}
</style>