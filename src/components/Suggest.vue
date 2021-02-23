<template>
  <div>
    <ul class="suggests" v-if="this.$root.playingMusic.isSearch">
      <li class="sousuo" v-if="keywords != ''">搜索“{{ keywords }}”</li>
      <li v-for="s in suggests" :key="s.id" @click="searchResult(s.name)">
        <i></i><span>{{ s.name }}</span>
      </li>
    </ul>
    <SearchResult :searchMusicList="searchMusicList" v-if="this.$root.playingMusic.isResult"></SearchResult>
  </div>
</template>
<script>
import SearchResult from "../components/SearchResult";
export default {
  props: {
    suggests: {
      type: Array,
      default: function () {
        return [];
      },
    },
    keywords: String,
  },
  components: {
    SearchResult,
  },
  data() {
    return {
      searchMusicList: []
    };
  },
  filters: {
    filtType(val) {
      if (typeof val.artists != "undefined") {
        return "歌曲:";
      } else if (typeof val.artists != "undefined") {
        return "专辑:";
      } else {
        return "歌手:";
      }
    },
  },
  methods: {
    searchResult(val) {
      this.$root.playingMusic.isResult=true;
      this.$root.playingMusic.isSearch=false;
      this.searchMusicList=[];
      this.$http.get("/search?keywords=" + val).then((data) => {
        if (data.data.code == 200) {
          this.searchMusicList = data.data.result.songs;
          // console.log(this.searchMusicList)
        }
      });
    },
  },
};
</script>
<style lang="less">
.suggests {
  border-top: 1px solid #ddd;
  padding-left: 10px;
  li.sousuo {
    border-bottom: 1px solid #ddd;
    color: #507daf;
    font-size: 12px;
  }
  li {
    padding-left: 10px;
    height: 45px;
    display: flex;
    align-items: center;
    i {
      width: 15px;
      height: 15px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
    }
    span {
      display: inline-block;
      flex: 1;
      padding-left: 10px;
      max-height: 45px;
      overflow: hidden;
      font-size: 15px;
      line-height: 45px;
      color: #333;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>