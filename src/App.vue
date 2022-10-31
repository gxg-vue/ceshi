<template>
  <div id="app">
    <transition :name="direction">
      <router-view class="page" />
    </transition>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";

import mobile from "./utils/getPhoneType.js";
localStorage.mobile = mobile;
console.log("手机型号：", localStorage.mobile);

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    // 动态设置过渡样式
    direction: function () {
      return "fade";
    },
  },
  watch: {
    $route(to, from) {},
  },
  components: {},
  created() {
    // this.wxInit();
  },
  mounted() {},
  methods: {
    wxInit() {
      let that = this;
      this.$get("/share/wechat/share", {
        url: location.href,
      }).then((res) => {
        console.log("wx：", wx);
        wx.config({
          debug: false,
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "chooseImage",
            "previewImage",
            "getLocation",
            "scanQRCode",
            "updateAppMessageShareData",
            "onMenuShareAppMessage",
            "updateTimelineShareData",
            "onMenuShareTimeline",
            "onMenuShareQQ",
            "onMenuShareQZone",
            "wx-open-launch-weapp",
          ], // 必填，需要使用的JS接口列表
          openTagList: ["wx-open-launch-weapp"], //跳转微信小程序
        });
        wx.ready(function () {
          console.log("分享");
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: "一罐BUFF增益唤醒王者潜力", // 分享标题
            desc: "一罐BUFF增益唤醒王者潜力", // 分享描述
            link: "https://gz.qcutc.com/FXPY", // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: "https://gz.qcutc.com/wximgs/share.jpg", // 分享图标
            success: function () {
              // 设置成功
            },
          });
          wx.updateTimelineShareData({
            title: "一罐BUFF增益唤醒王者潜力", // 分享标题
            link: "https://gz.qcutc.com/FXPY", // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: "https://gz.qcutc.com/wximgs/share.jpg", // 分享图标
            success: function () {
              // 设置成功
            },
          });
        });
      });
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @colorFont;
  font-size: @fontSizeH3;
  user-select: none;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }
  body {
    overflow: hidden;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .page {
    transition: all 0.5s ease-in-out;
    width: 750px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .page-go-enter-active {
    transform: translate3d(100%, 0, 0);
  }
  .page-go-enter-to {
    transform: translate3d(0, 0, 0);
  }
  .page-go-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .page-go-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .page-back-enter-active {
    transform: translate3d(-100%, 0, 0);
  }
  .page-back-enter-to {
    transform: translate3d(0, 0, 0);
  }
  .page-back-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .page-back-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  img {
    vertical-align: bottom;
    // pointer-events: none;/* 禁止长按图片保存 */
  }
}
</style>
