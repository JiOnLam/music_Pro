<template>
  <div>
    <div class="serach">
      <i></i>
      <input
        type="text"
        placeholder="请输入歌手、歌曲、专辑"
        v-model="keywords"
        @focus="keywordsChange()"
      /><i v-show="keywords != ''" @click="clear"></i>
    </div>
    <Suggest :suggests="suggests" :keywords="keywords" />
    <Loading v-if="searching"></Loading>
    <Searchhot v-if="isSearchOK" :searchList="searchList" @changeSel="Sel"></Searchhot>
  </div>
</template>
<script>
import Suggest from "../components/Suggest";
import Loading from "../components/Loading";
import Searchhot from "../components/Searchhot";
export default {
  data() {
    return {
      keywords: "",
      suggests: [],
      searching: false,
      searchList: [],
      isSearchOK: true,
    };
  },
  methods: {
    Sel(val){
        this.isSearchOK=false;
        this.keywords = val;
    },
    clear() {
      this.keywords = "";
      this.$root.playingMusic.isResult = false;
      this.isSearchOK = true;
    },
    keywordsChange() {
      this.$root.playingMusic.isResult = false;
      this.$root.playingMusic.isSearch = true;
      this.isSearchOK = false;
    },
  },
  components: {
    Suggest,
    Loading,
    Searchhot,
  },
  watch: {
    keywords(val) {
      this.suggests = [];
      this.searching = true;
      this.$http
        .get("/search/suggest?keywords=" + val)
        .then((data) => {
          if (data.data.code == 200 && data.data.result.order) {
            let result = data.data.result;
            // console.log(result);
            let re = result.order.reduce((prev, v) => {
              if (v != "playlists") {
                return prev.concat(result[v]);
              }
              return prev;
            }, []);

            this.suggests = re;
            // console.log(this.suggests);
            this.searching = false;
            if (this.keywords == "") {
              this.suggests = [];
            }
          }
        })
        .finally(() => {
          this.searching = false;
          if (val == "") {
            this.suggests = [];
            this.isSearchOK = true;
          }
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http.get("/search/hot").then((data) => {
        vm.searchList = data.data.result.hots;
        // console.log(vm.searchList)
      });
    });
  },
};
</script>
<style lang="less">
.serach {
  display: flex;
  margin: 10px;
  padding: 0px 10px;
  background: #ebecec;
  border-radius: 20px;
  position: relative;
  input {
    border: none;
    outline: none;
    flex: 1;
    background-color: transparent;
    line-height: 24px;
    padding-left: 4px;
  }
  i {
    display: inline-block;
    width: 13px;
    height: 13px;
    &:first-of-type {
      position: relative;
      top: 6px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    }
    &:last-of-type {
      margin-top: 6px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
    }
  }
}
</style>