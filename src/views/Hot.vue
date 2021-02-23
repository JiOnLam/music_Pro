<template>
  <div>
    <div class="top">
      <img src="../assets/Images/08.jpg" alt="" />
      <div class="top_pic">
        <span class="rgb"></span>
        <span class="DataU">更新日期:{{ updataDate | formatDate }}</span>
      </div>
    </div>
    <ul class="hotMusicList">
      <router-link
        v-for="(hm, k) in hotMusicList"
        :key="k"
        tag="li"
        :to="`/player/${hm.data.songs[0].id}`"
        @click.native="play(hm.data.songs[0].id)"
      >
        <div class="nums" :style="{ color: k <= 2 ? 'red' : '' }">
          {{ (k + 1) | formatNum }}
        </div>
        <div class="left">
          <div>{{ hm.data.songs[0].name }}</div>
          <span>
            <span class="SQ" v-show="hm.data.songs[0].m.br==192000"></span>{{ hm.data.songs[0].ar[0].name }}-{{
              hm.data.songs[0].name
            }}</span
          >
        </div>
        <div class="right">
          <span></span>
        </div>
      </router-link>
    </ul>
    <Loading v-if="hotMusicList.length <= 0"></Loading>
    <div class="more">
      <router-link :to="`/hot/${num + 1}`" v-if="hotMusicList.length < 200"
        >查看更多</router-link
      >
      <p v-if="hotMusicList.length == 200">无更多音乐</p>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading";
export default {
  name: "Hot",
  data() {
    return {
      updataDate: new Date(),
      hotMusicList: [],
      num: 0,
      hotMusic:[]
    };
  },
  components: {
    Loading,
  },
  methods: {
    loadMusic(vm) {
      let musicids = [];
      vm.num++;
      if (vm.num >= 10) {
        vm.num = 10;
      }
      vm.$http
        .get("/top/list?idx=1")
        .then((data) => {
          vm.updataDate = data.data.playlist.updateTime;
          this.hotMusic.push(data.data.playlist.trackIds);
          musicids = data.data.playlist.trackIds.slice(
            20 * (vm.num - 1),
            20 * vm.num
          );
        })
        .then(() => {
          for (let v of musicids) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              vm.hotMusicList.push(data);
            });
          }
        });
    },
    play(id){
      this.$root.playingMusic.nowList = [];
      this.$root.playingMusic.isTopNav = false;
      this.$root.playingMusic.musicID = id;
      for(let i=0;i<this.hotMusic[0].length;i++){
        this.$root.playingMusic.nowList.push(this.hotMusic[0][i].id)
      }
    }
  },
  filters: {
    formatDate(value) {
      let d = new Date(value);
      let m = d.getMonth() + 1;
      let day = d.getDate();
      m = m > 9 ? m : "0" + m;
      day = day > 9 ? day : "0" + day;
      return m + "月" + day + "日";
    },
    formatNum(val) {
      return val > 9 ? val : "0" + val;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.path == "/hot") {
      next("/hot/1");
    }
    next((vm) => {
      vm.hotMusicList = [];
      vm.loadMusic(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.loadMusic(this);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.num = 0;
    next();
  },
};
</script>
<style lang="less">
.top {
  position: relative;
  .top_pic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: bold;
    justify-content: center;
    padding-left: 10px;
    .rgb {
      background: url("../assets/Images/05.png") no-repeat -24px -30px;
      background-size: 166px 97px;
      width: 142px;
      height: 67px;
    }
    .DataU {
      text-align: left;
      margin-top: 10px;
      color: white;
    }
  }
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
.more {
  display: block;
  line-height: 80px;
  a {
    color: #000;
  }
}
</style>