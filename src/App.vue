<template>
  <div id="app">
    <div class="nav" v-show="this.$root.playingMusic.isTopNav">
      <i></i>
    </div>
    <TopNav v-show="this.$root.playingMusic.isTopNav"></TopNav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TopNav from "./components/TopNav.vue";
export default {
  components: {
    TopNav,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nav{
  width: 100vw;;
  height: 80px;
  background-color: #D43C33;
}

.nav i{
  display: block;
  background: url('./assets/Images/01.png') no-repeat 0 -19px;
	width: 157px;
	height: 34px;
  position: relative;
  top: 23px;
  left: 10px;
}
</style>
