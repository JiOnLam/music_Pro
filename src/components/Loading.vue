<template>
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<style lang="less">
.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
    div{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        i{
            display: inline-block;
            width: 6px;
            height: 30px;
            background-color: red;
            transform-origin: center bottom;
            animation: loading 0.5s linear 0s infinite alternate-reverse;
            &:first-of-type{
                animation-delay: -0.2s;
            }
            &:last-of-type{
                animation-delay: -0.4s;
            }
        }
    }
    @keyframes loading {
        from{
            transform: scale(0.2);
        }
        to{
            transform: scale(1);
        }
    }
}
</style>
<script>
export default {
    name:"Loading"
}
</script>
