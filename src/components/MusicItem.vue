<template>
  <div>
    <ul class="newMusicList">
      <router-link
        v-for="item in newMusicList"
        :key="item.id"
        tag="li"
        :to="`/player/${item.id}`"
        @click.native="play(item.id)"
      >
        <div class="left">
          <div>{{ item.name }}</div>
          <span>
            <span class="SQ" v-show="item.song.mMusic.bitrate == 192000"></span
            >{{ item.song.artists[0].name }}-{{ item.name }}</span
          >
        </div>
        <div class="right">
          <span></span>
        </div>
      </router-link>
    </ul>
    <Loading v-if="newMusicList.length <= 0"></Loading>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue";
export default {
  name: "MusicItem",
  props: {
    newMusicList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    Loading,
  },
  methods: {
    play(id) {
      this.$root.playingMusic.nowList = [];
      this.$root.playingMusic.isTopNav = false;
      this.$root.playingMusic.musicID = id;
      for (let i = 0; i < this.newMusicList.length; i++) {
        this.$root.playingMusic.nowList.push(this.newMusicList[i].id);
      }
      // console.log(this.$root.playingMusic.nowList);
    },
  },
};
</script>
<style lang="less">
.newMusicList {
  li {
    display: flex;
    margin-top: 10px;
    padding: 0px 10px;
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
        max-height: 22px;
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
</style>