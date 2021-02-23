<template>
    <div class="searchhot">
        <p class="tit">热门搜索</p>
        <ul>
            <router-link to="/search" tag="li" v-for="(v,k) in searchList" :key="k" @click.native="select(v.first)">{{v.first}}</router-link>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        searchList:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    methods:{
        select(val){
            // console.log(val)
            this.$emit("changeSel",val);
        }
    }
}
</script>
<style lang="less">
.searchhot{
    .tit{
        color: gray;
        text-align: left;
        padding-left: 10px;
        padding-top: 14px;
        font-size: 12px;
        padding-bottom: 4px;
    }
    ul{
    width: 100vw;
    text-align: left;
    li{
        display: inline-block;
        background-color: rgba(248, 245, 244, 0.925);
        line-height: 32px;
        position: relative;
        margin: 4px 26px;
        font-size: 14px;
        &::after{
            content: "";
            display: block;
            width: 32px;
            height: 32px;
            background-color: rgba(248, 245, 244, 0.925);
            position: absolute;
            left: -16px;
            top: 0;
            border-radius: 50%;
            z-index: -1;
        }
        &::before{
            content: "";
            display: block;
            width: 32px;
            height: 32px;
            background-color: rgba(248, 245, 244, 0.925);
            position: absolute;
            right: -16px;
            top: 0;
            border-radius: 50%;
            z-index: -1;
        }
    }
}
}

</style>