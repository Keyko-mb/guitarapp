<template>
  <div class="song">
    <div class="first">
      <div class="names">
        <div class="header">
          <h1>{{song.name}}</h1>
          <button v-if="currentUser.status.loggedIn && !isFavourite" class="btn_favourite" @click="addToFavourite"><img src="/like.png" alt="icon" class="btn_favourite_icon"></button>
          <button v-if="currentUser.status.loggedIn && isFavourite" class="btn_favourite" @click="deleteFromFavourite"><img src="/liked.png" alt="icon" class="btn_favourite_icon"></button>
        </div>
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
import {auth as $store} from "@/store/auth.module";

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
      isFavourite: false,
    }
  },
  props: {
    uuid: {
      type: String,
      required : true
    }
  },
  computed: {
    currentUser() {
      return $store.state;
    },
  },
  mounted() {
    this.loadSong();
  },
  methods: {
    loadSong() {
        axios
            .get("http://localhost:8084/api/songId/" + this.uuid)
            .then((response) => {
              this.song = response.data
              if (this.currentUser.user !== null) {
                axios
                    .get('http://localhost:8084/api/personFavorite/' + this.currentUser.user.person.uuid + "/" + this.song.id)
                    .then((response) => {
                      if (response.data) {
                        this.isFavourite = true;
                      }
                    })
              }
            })
        axios
            .get("http://localhost:8084/api/song/" + this.uuid + "/accords")
            .then((response) => {
              this.chords = response.data
            })
    },
    scrollDown(delta) {
      this.scrollSpeed += delta
      this.scrollSpeed = Math.max(this.scrollSpeed, 1)
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        window.scrollBy( { top: 1, left: 0, behavior: 'smooth' } );
      }, this.scrollSpeed);
    },
    scrollStop() {
      this.scrollSpeed=301
      clearInterval(this.interval);
    },
    addToFavourite() {
      axios
          .post("http://localhost:8084/api/personFavorites/" + this.currentUser.user.person.uuid + "/" + this.song.id)
      this.isFavourite = true
    },
    deleteFromFavourite() {
      axios
          .delete("http://localhost:8084/api/personFavorites/" + this.currentUser.user.person.uuid + "/" + this.song.id)
      this.isFavourite = false
    },
  }
}
</script>


<style lang="scss" scoped>
.song {
  display: grid;
  grid-template-columns: 75% 25%;
  padding-bottom: 60px;
}
.loading {
  margin: 30px 0 0 20px;
}
.loading-message {
  margin-top: 10px;
  margin-bottom: 5px;
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
.header{
  display: flex;
  gap: 10px;
  align-items: center;
}
.btn_favourite_icon {
  height: 31px;
  width: 31px;
  margin-top: 15px;
  opacity: 85%;
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
  width: 262px;
  top: 3em;
  position: sticky;
  margin-top: 30px;
}
button {
  border: none;
}
</style>