<template>
  <section class="hero is-fullheight is-default is-bold">

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <figure class="image is-1by1" @click="switch_alnum">
              <img :src=coverPath alt="Description">
            </figure>
          </div>
          <div class="column is-6 is-offset-1">
            <h1 class="title is-2">
              {{ this.title }}
            </h1>
            <h2 class="subtitle is-4">
              {{this.artist}}
            </h2>
            <h2 class="subtitle is-4">
              {{ this.album }}
            </h2>
            <br>
            <div class="action-buttons">
              <div class="control is-grouped">
                <a class="button is-medium" @click="play_prev"><i class="gg-play-track-prev"></i></a>
                <a class="button is-medium" @click="resumePause">
                  <i v-if="isPlaying" class="gg-play-pause"></i>
                  <i v-else class="gg-play-button"></i>
                </a>
                <a class="button is-medium" @click="play_next"><i class="gg-play-track-next"></i></a>
              </div>
            </div>
            <br>
            <h1 class="subtitle is-0">Volume</h1>
            <div class="control is-grouped">
              <a class="button is-medium" @click="volumn_increase"><i class="gg-math-plus"></i></a>
              <a class="button is-medium" @click="volumn_decrease"><i class="gg-math-minus"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "MusicCard",
  props:{

  },
  data(){
    return{
      title:"",
      artist:"",
      album:"",
      albumIndex:-1,
      isPlaying:false,
      index: -1,
      coverPath:"",
    }
  },
  methods:{
    async resumePause(){
      var res=null;
      if(this.isPlaying){
        res = await fetch('api/pause');
      }
      else {
        res = await fetch('api/resume');
      }
      const data = await res.json();
      if(data["error_num"]===0){
        this.isPlaying=!this.isPlaying;
      }
    },
    async play_prev(){
      const res=await fetch('api/play_prev', {
        method: "post",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          'index': this.index,
          'album':this.album,
        }),
      });
      const data = await res.json();
      this.index=data['index'];
      this.isPlaying=true;
      this.title=data['title'];
      this.artist=data['artist'];
      this.album=data['album'];
    },
    async play_next(){
      const res=await fetch('api/play_next', {
        method: "post",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          'index': this.index,
          'album':this.album,
        }),
      });
      const data = await res.json();
      console.log(data)
      this.index=data['index'];
      this.isPlaying=true;
      this.title=data['title'];
      this.artist=data['artist'];
      this.album=data['album'];
    },
    async volumn_increase(){
      const res = await fetch('api/volume_increase');
      const data = await res.json();
      console.assert(data["error_num"]===0);
    },
    async volumn_decrease(){
      const res = await fetch('api/volume_decrease');
      const data = await res.json();
      console.assert(data["error_num"]===0);
    },
    async switch_alnum(){
      const res=await fetch('api/switch_album', {
        method: "post",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          'index': this.index,
          'album_index':this.albumIndex
        }),
      });
      const data = await res.json();
      console.log(data)
      this.index=data['index'];
      this.isPlaying=true;
      this.title=data['title'];
      this.artist=data['artist'];
      this.album=data['album'];
      this.albumIndex=data['album_index']
      this.coverPath=require("../assets/"+this.album+".jpg")
    }
  },
  async created() {
    await this.switch_alnum();
  }
}
</script>

<style scoped>
@import "../css/bulma.css";
@import "../css/icon.css";
</style>