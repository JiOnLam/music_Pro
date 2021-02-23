<template>
  <div>
    <ul class="searchMusicList">
      <router-link
        v-for="item in searchMusicList"
        :key="item.id"
        tag="li"
        :to="`/player/${item.id}`"
        @click.native="play(item.id)"
      >
        <div class="left">
          <div>{{ item.name }}</div>
          <span>
            <span class="SQ"></span>{{ item.artists[0].name }}-{{
              item.name
            }}</span
          >
        </div>
        <div class="right">
          <span></span>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    searchMusicList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    play(id) {
      this.$root.playingMusic.isTopNav = false;
      this.$root.playingMusic.musicID = id;
      this.$root.playingMusic.nowList = [];
      for(let i=0;i<=this.searchMusicList.length;i++){
        this.$root.playingMusic.nowList.push(this.searchMusicList[i].id);
      }
    },
  },
};
</script>
<style lang="less">
.searchMusicList {
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
        margin-top: 10px;
      }
    }
  }
}
</style>