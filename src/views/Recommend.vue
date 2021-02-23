<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link
        v-for="(rem) in recommendMusicList"
        :key="rem.id"
        tag="li"
        :to="`/songlist/${rem.id}`"
      >
        <div>
          <img :src="rem.picUrl" />
          <span>{{ rem.playCount | formatNum }}</span>
        </div>
        <p>{{ rem.name }}</p>
      </router-link>
    </ul>
    <Loading v-if="recommendMusicList.length <= 0"></Loading>
    <Title>最新音乐</Title>
    <MusicItem :newMusicList="newMusicList"></MusicItem>
    <div class="btm">
      <img src="../assets/Images/06.png" />
      <div class="btm_con">
        <span class="logo_btm"></span>
        <div class="logo_btn">打开APP,发现更多好音乐></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "../components/Title";
import MusicItem from "../components/MusicItem";
import Loading from "../components/Loading.vue";
export default {
  name: "Recommend",
  components: {
    Title,
    MusicItem,
    Loading,
    
  },
  data() {
    return {
      recommendMusicList: [],
      newMusicList: [],
      listID:0
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http
        .get("/personalized?limit=6")
        .then((data) => {
          vm.recommendMusicList = data.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
      vm.$http
        .get("/personalized/newsong?limit=20")
        .then((data) => {
          vm.newMusicList = data.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  filters: {
    formatNum(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    play() {
      this.$root.playingMusic.isTopNav = false;
    }
  },
};
</script>
<style lang="less">
ul.recommendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 15px;
  li {
    width: 33%;
    div {
      position: relative;
      span {
        position: absolute;
        right: 2px;
        top: 2px;
        color: white;
        font-size: 12px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 13px;
      line-height: 1.2;
      min-height: 30px;
      overflow: hidden;
      text-align: left;
    }
  }
}
.btm {
  position: relative;
  img {
    width: 100%;
    vertical-align: middle;
  }
  .btm_con {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .logo_btm {
      display: block;
      margin: 0 auto;
      width: 230px;
      height: 44px;
      background: url("../assets/Images/07.png") no-repeat;
    }
    .logo_btn {
      width: 250px;
      line-height: 38px;
      border: 1px solid red;
      border-radius: 38px;
      margin: 0 auto;
      color: red;
      margin-top: 5px;
    }
  }
}
</style>