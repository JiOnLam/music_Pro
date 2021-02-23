<template>
  <div class="content">
    <div class="top">
      <div @click="back">
        <img src="../assets/Images/09.png" class="back" />
      </div>
      <i
        class="topbg"
        :style="`background-image:url(${songData.coverImgUrl})`"
      ></i>
      <div class="con1">
        <div class="con2">
          <div class="con1_pic">
            <img :src="`${songData.coverImgUrl}`" alt="" />
          </div>
          <div class="con1_con">
            <h2>{{ songData.name }}</h2>
            <div class="anchor">
              <a href="#">
                <img :src="`${avatarUrl}`" /><span>{{ nickname }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <h3>歌曲列表</h3>
      <ul class="hotMusicList">
        <router-link
          :to="`/player/${v.songs[0].id}`"
          tag="li"
          v-for="(v, k) in songList"
          :key="k"
          @click.native="play(v.songs[0].id)"
        >
          <div class="nums">
            {{ (k + 1) | formatNum }}
          </div>
          <div class="left">
            <div>{{ v.songs[0].name }}</div>
            <span>
              <span class="SQ" v-show="br == 192000"></span
              >{{ v.songs[0].al.name }}</span
            >
          </div>
          <div class="right">
            <span></span>
          </div>
        </router-link>
      </ul>
      <div class="more">查看更多歌曲，请下载客户端</div>
    </div>
    <div class="commment">
      <h3>最新评论(10)</h3>
      <ul>
        <router-link
          to="//"
          tag="div"
          v-for="(v, k) in comment"
          :key="k"
          class="div"
        >
          <div class="pic">
            <div><img :src="v.user.avatarUrl" alt="" /></div>
          </div>
          <div class="con_r">
            <div class="ss">
              <div class="uname">{{ v.user.nickname }}</div>
              <div class="uTime">{{ v.time | formatDate }}</div>
            </div>
            <div class="con1">{{ v.content }}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  filters: {
    formatNum(val) {
      return val > 9 ? val : "0" + val;
    },
    formatDate(val) {
      let d = new Date(val);
      let m = d.getMinutes();
      return m + "分钟前";
    },
  },
  data() {
    return {
      songData: [],
      avatarUrl: "",
      nickname: "",
      songList: [],
      br: "",
      comment: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.songList = [];
      let trackIds = [];
      vm.$http
        .get("playlist/detail?id=" + to.params.listID)
        .then((data) => {
          vm.songData = data.data.playlist;
          vm.avatarUrl = vm.songData.creator.avatarUrl;
          vm.nickname = vm.songData.creator.nickname;
          trackIds = data.data.playlist.trackIds.slice(0, 10);
        })
        .then(() => {
          for (let v of trackIds) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              vm.songList.push(data.data);
              vm.br = data.data.songs[0].m.br;
            });
          }
        });

      vm.$http.get("/comment/playlist?id=" + to.params.listID).then((data) => {
        vm.comment = data.data.comments.slice(0, 10);
      });
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    play(id) {
      this.$root.playingMusic.musicID = id;
      this.$root.playingMusic.isTopNav = false;
      this.$root.playingMusic.nowList = [];
      for(let i=0;i<this.songList.length;i++){
        this.$root.playingMusic.nowList.push(this.songList[i].privileges[0].id)
      }
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.content {
  width: 100vw;
  .commment {
    width: 100%;
    h3 {
      padding: 4px 10px;
      text-align: left;
      color: #666;
      background-color: #eeeff0;
    }
    ul {
      width: 100vw;
      .div {
        width: 100vw;
        padding-top: 10px;
        text-align: left;
        display: flex;
        flex-direction: row;
        .pic {
          width: 55px;
          height: 35px;
          div {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: red;
            margin: 0 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .con_r {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          padding: 0;
          .ss {
            display: flex;
            flex-direction: column;
            padding: 0;
            margin-bottom: 10px;
            .uname {
              font-size: 18px;
              color: gray;
            }
            .uTime {
              padding: 0;
              font-size: 14px;
            }
          }
          .con1 {
            font-size: 20px;
          }
        }
      }
    }
  }
  .list {
    width: 100vw;
    position: relative;
    .more {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 194px;
      font-size: 16px;
      color: gray;
      line-height: 270px;
      background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 97.3%, 0.7),
        #f8f8f8 60%
      );
    }
    h3 {
      padding: 4px 10px;
      text-align: left;
      color: #666;
      background-color: #eeeff0;
    }
    .hotMusicList {
      li {
        display: flex;
        margin-top: 10px;
        padding: 0px 10px;
        .active {
          color: red;
        }
        div.nums {
          line-height: 50px;
          width: 40px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        div.left {
          flex: 1;
          text-align: left;
          border-bottom: 1px solid #ddd;
          div {
            font-size: 17px;
            color: black;
            max-height: 20px;
            overflow: hidden;
          }
          span {
            display: block;
            font-size: 12px;
            color: #888;
            padding: 5px 0px;
            max-height: 21px;
            overflow: hidden;
            .SQ {
              display: inline-block;
              background: url("../assets/Images/05.png") no-repeat 0px 2px;
              background-size: 166px 97px;
              width: 15px;
              height: 5px;
            }
          }
        }
        div.right {
          border-bottom: 1px solid #ddd;
          padding-top: 8px;
          span {
            display: inline-block;
            width: 22px;
            height: 22px;
            background-image: url(../assets/Images/05.png);
            background-position: -24px 0px;
            background-size: 166px 97px;
          }
        }
      }
    }
  }
  .top {
    width: 100vw;
    height: 210px;
    position: relative;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px 15px;
    .back {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .topbg {
      display: block;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50%;
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
    }
    .con1 {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .con2 {
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: space-between;
        .con1_pic {
          width: 120px;
          height: 120px;
          box-sizing: border-box;
          margin-right: 20px;
        }
        .con1_con {
          color: #fefefe;
          text-align: left;
          font-size: 17px;
          flex: 1;
          height: 120px;
          box-sizing: border-box;
          h2 {
            font-size: 17px;
            height: 44px;
            overflow: hidden;
          }
          .anchor {
            width: 100%;
            padding-top: 20px;
            a {
              display: inline-block;
              color: gainsboro;
              text-shadow: 1px 1px 4px black;
              text-decoration: none;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              span {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                vertical-align: bottom;
                padding-left: 8px;
                color: silver;
                text-shadow: 1px 1px 4px black;
              }
            }
          }
        }
      }
    }
  }
}
</style>
