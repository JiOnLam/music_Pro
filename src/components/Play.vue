<template>
  <div class="content">
    <div class="back" @click="back"><img src="../assets/Images/09.png" /></div>
    <div
      class="pic1"
      :style="{ transform: isPlaying ? '' : 'rotate(-20deg)' }"
    ></div>
    <div class="bgImg"><img :src="`${picUrl}`" alt="" /></div>
    <audio
      ref="player"
      :src="`https://music.163.com/song/media/outer/url?id=${this.$root.playingMusic.musicID}.mp3`"
      autoplay
      @timeupdate="updataTime"
    ></audio>
    <div class="details">
      <div class="box">
        <div class="boxbg" ref="boxbg">
          <img src="../assets/Images/10.png" alt="" />
          <div class="boxPic"><img :src="`${picUrl}`" /></div>
        </div>
      </div>
      <div class="tit">
        <h2>{{ musicName }}</h2>
        <p>
          作者:<span>{{ ar }}</span>
        </p>
      </div>
      <div class="geci">歌词数据获取不到。。。</div>
    </div>
    <div class="big_desk">
      <div class="small_desk" :style="`width:${percentage}`"></div>
    </div>
    <div class="desk">
      <ul>
        <li><i @click="prev"></i></li>
        <li>
          <i
            @click="togglePlay"
            :style="{
              'background-position': isPlaying ? '-2px -166px' : '-2px -205px',
            }"
          ></i>
        </li>
        <li><i @click="next"></i></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      song: [],
      picUrl: "",
      lrcArr: [],
      musicName: "null",
      ar: "null",
      isPlaying: true,
      percentage:"0%"
    };
  },
  methods: {
    updataTime() {
      this.isPlaying=true;
      this.$refs.boxbg.style.animationPlayState = "running";
      let now = this.$refs.player.currentTime/this.$refs.player.duration;
      this.percentage = now*100+"%";

      let nowMusicIndex = this.$root.playingMusic.nowList.indexOf(this.$root.playingMusic.musicID);
      let nextMusicIndex = nowMusicIndex+1;
      let nextMusicID = this.$root.playingMusic.nowList[nextMusicIndex];
      // console.log(this.$refs.player.currentTime)
      // console.log(this.$refs.player.duration)
      if(this.$refs.player.currentTime>=this.$refs.player.duration){
        this.percentage = "0%";
        this.$refs.boxbg.style.animationPlayState = "paused";
        this.$root.playingMusic.musicID = nextMusicID; 
        this.isPlaying = false;
      }
    },
    prev() {
      let prevMusicIndex =
        this.$root.playingMusic.nowList.indexOf(
          this.$root.playingMusic.musicID
        ) - 1;
      if (prevMusicIndex < 0) {
        prevMusicIndex = this.$root.playingMusic.nowList.length - 1;
      }
      this.$root.playingMusic.musicID = this.$root.playingMusic.nowList[
        prevMusicIndex
      ];
    },
    next() {
      let nextMusicIndex =
        this.$root.playingMusic.nowList.indexOf(
          this.$root.playingMusic.musicID
        ) + 1;
      if (nextMusicIndex >= this.$root.playingMusic.nowList.length) {
        nextMusicIndex = 0;
      }
      this.$root.playingMusic.musicID = this.$root.playingMusic.nowList[
        nextMusicIndex
      ];
    },
    togglePlay() {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.player.pause();
        this.$refs.boxbg.style.animationPlayState = "paused";
        
      } else {
        this.isPlaying = true;
        this.$refs.player.play();
        this.$refs.boxbg.style.animationPlayState = "running";
        
      }
    },
    back() {
      this.$root.playingMusic.isTopNav = true;
      this.$router.back();
    },
    getDetail(musicId) {
      this.$http.get("/song/detail?ids=" + musicId).then((data) => {
        this.song = data.data.songs;
        this.picUrl = this.song[0].al.picUrl;
        // console.log(this.picUrl)
        this.musicName = this.song[0].name;
        this.ar = this.song[0].ar[0].name;
      });

      this.$http.defaults.baseURL = "http://music/kele8.cn";
      this.$http
        .get("/lyric?id=" + musicId)
        .then((lrcdata) => {
          console.log(lrcdata);
          let lrc = lrcdata.data.lrc.lyric;
          let lrcArr = lrc.split(/\n/);
          let reg = /\[(\d+):(\d+\.\d+)\](.+)/;
          this.lrcArr = lrcArr.map((lc) => {
            reg.test(lc);
            return {
              time: parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
              lyric: RegExp.$3,
            };
          });
          console.log(this.lrcArr);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";
    },
  },
  created() {
    this.getDetail(this.$root.playingMusic.musicID);
    this.isPlaying = true;
  },
  beforeUpdate() {
    this.getDetail(this.$root.playingMusic.musicID);
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  .big_desk {
    width: 100vw;
    height: 1px;
    background: gray;
    position: fixed;
    bottom: 80px;
    .small_desk {
      // width: 10%;
      height: 1px;
      background: white;
      position: relative;
      &:after {
        content: "";
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50px;
        position: absolute;
        right: 0;
        top: -5px;
        box-shadow: 1px 1px 10px white;
      }
    }
  }
  .pic1 {
    width: 100px;
    height: 130px;
    background: url(../assets/Images/11.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -30px;
    z-index: 99;

    transform-origin: 0 0;
    transition: all 1s;
  }

  .desk {
    width: 240px;
    position: fixed;
    height: 60px;
    bottom: 10px;
    left: 50%;
    margin-left: -120px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      color: white;
      li {
        flex: 1;
        height: 100%;
        line-height: 72px;
        i {
          display: inline-block;
          width: 24px;
          height: 25px;
        }
        &:nth-child(1) {
          i {
            background: url("../assets/Images/02.png") no-repeat -2px -131px;
          }
        }
        &:nth-child(2) {
          line-height: 78px;
          i {
            background: url("../assets/Images/02.png") no-repeat;
            width: 32px;
            height: 33px;
          }
        }
        &:nth-child(3) {
          i {
            background: url("../assets/Images/02.png") no-repeat -82px -131px;
          }
        }
      }
    }
  }

  .details {
    width: 100%;
    position: relative;
    top: 0px;
    color: gainsboro;
    .geci {
      width: 60vw;
      height: 20vh;
      border: 1px solid white;
      margin: 0 auto;
      margin-top: 20px;
      text-shadow: 1px 1px 4px black;
      color: white;
    }

    .tit {
      margin-top: 10px;
      text-shadow: 1px 1px 4px black;
      h2 {
        font-size: 20px;
        margin-bottom: 10px;
        color: white;
      }
      p {
        font-size: 12px;
        span {
          padding-left: 4px;
        }
      }
    }
    .box {
      width: 60vw;
      height: 60vw;
      max-width: 342px;
      max-height: 342px;
      margin: 0 auto;
      margin-top: 80px;
      position: relative;
      .boxbg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        animation: xz 5s linear infinite;
        img {
          width: 100%;
          height: 100%;
        }
        .boxPic {
          width: 60%;
          height: 60%;
          margin: 0 auto;
          background: white;
          position: absolute;
          top: 20%;
          left: 20%;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
      filter: blur(100px);
    }
  }

  .back {
    position: fixed;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    z-index: 99;
    img {
      width: 100%;
      height: 100%;
    }
  }
  audio {
    width: 100vw;
    height: 50px;
    position: fixed;
    left: 0vw;
    bottom: 0;
  }
}

@keyframes xz {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>