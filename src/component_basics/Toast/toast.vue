<template>
    <transition name="demo">
        <div class="toast" v-show="theToast">
            {{msg}}
        </div>
    </transition>
</template>
 
<script>
    export default {
        data() {
            return {
                theToast: false,
                msg: ""
            };
        }
    };
</script>
 
<style lang="less" scoped>
    .toast {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        padding: 2vw 4vw;
        min-width: 20vw;
        max-width: 60vw;
        // font-size: 4vw;
        font-size: 28px;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 2vw;
        z-index: 99999;
    }
     
    .demo-enter-active,
    .demo-leave-active {
        transition: 0.3s ease-out;
    }
     
    .demo-enter {
        opacity: 0;
        transform: translateX(-50%) scale(0.8);
    }
     
    .demo-leave-to {
        opacity: 0;
        transform: translateX(-50%) scale(0.8);
    }
</style>