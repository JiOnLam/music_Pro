<template>
    <div>
        <ul class="topnav">
            <li><router-link to="/">推荐音乐</router-link></li>
            <li><router-link to="/hot">热歌榜</router-link></li>
            <li><router-link to="/search">搜索</router-link></li>
        </ul> 
    </div>
</template>
<script>

</script>
<style lang="less">
.topnav{
    display: flex;
    border-bottom: 1px solid #ddd;
    
}
.topnav li{
    flex: 1;
    line-height: 40px;
    a{ 
        display:inline-block;
        color: #000;
        text-decoration: none;
        &.router-link-exact-active{
            color: red;
            border-bottom: 2px solid red;
        }
    }
    a.router-link-exact-active,
    &:nth-child(2) a.router-link-active{
      color: #dd001b;
      border-bottom:2px solid #dd001b;
    }
}
</style>
