<!--  -->
<template>
  <div class="tab_bar" v-if="show">
    <router-link to="/home" class="item">
      <img
        v-if="nowRoute == '/home'"
        src="https://ml.ksf.com.cn/img/image/tabBar/1_active.png"
        alt=""
      />
      <img v-else src="https://ml.ksf.com.cn/img/image/tabBar/1.png" alt="" />
    </router-link>
    <router-link to="/shop" class="item">
      <img
        v-if="nowRoute == '/shop'"
        src="https://ml.ksf.com.cn/img/image/tabBar/2_active.png"
        alt=""
      />
      <img v-else src="https://ml.ksf.com.cn/img/image/tabBar/2.png" alt="" />
    </router-link>
    <router-link to="/my" class="item">
      <img
        v-if="nowRoute == '/my'"
        src="https://ml.ksf.com.cn/img/image/tabBar/3_active.png"
        alt=""
      />
      <img v-else src="https://ml.ksf.com.cn/img/image/tabBar/3.png" alt="" />
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowRoute: "",
      show: true,
    };
  },
  watch: {
    $route(newRoute, oldToute) {
      this.nowRoute = newRoute.path;
      if(newRoute.path == "/login" || newRoute.path == "/nocode"){
        this.show = false;
      }else{
        this.show = true;
      }
  
      if (newRoute.path == "/home") {
        //点击“首页”按钮
        this.$mai.memberEvent.log("maievent-page-operate", {
          pageContent: "我的页面",
          action: "点击tab",
          content: "首页",
        });
        this.$get("/button/counts", {
          button: "首页",
        }).then((res) => {});
        // return false;
      } else if (newRoute.path == "/home") {
        //点击“茉莉商城”按钮
        this.$mai.memberEvent.log("maievent-page-operate", {
          pageContent: "我的页面",
          action: "点击tab",
          content: "茉莉商城",
        });
        this.$get("/button/counts", {
          button: "茉莉商城",
        }).then((res) => {});
        // return false;
      } else if (newRoute.path == "/my") {
        //点击“我的”按钮
        this.$mai.memberEvent.log("maievent-page-operate", {
          pageContent: "我的页面",
          action: "点击tab",
          content: "我的",
        });
        this.$get("/button/counts", {
          button: "我的",
        }).then((res) => {});
        // return false;
      }
    },
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.tab_bar {
  width: 750px;
  height: 100px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  display: flex;
  height: calc(100px + constant(safe-area-inset-bottom)); //兼容 IOS<11.2
  height: calc(100px + env(safe-area-inset-bottom)); //兼容 IOS>11.2
  padding-bottom: constant(safe-area-inset-bottom); //兼容 IOS<11.2
  padding-bottom: env(safe-area-inset-bottom); //兼容 IOS>11.2
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 70px;
    }
  }
}
</style>