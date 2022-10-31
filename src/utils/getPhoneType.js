import MobileDetect from 'mobile-detect'
// alert("进来了")
var userAgent = navigator.userAgent; //获取userAgent信息  
var md = new MobileDetect(userAgent);
var os = md.os(); //获取系统  
// model:手机型号
var model = "";
if (os == "iOS") { //ios系统的处理  
    model = md.mobile();
    if (model == "iPhone") {
        let iphoneArr = [
            ['428,926,3', "A14", "iPhone 12 Pro Max"],
            ['390,844,3', "A14", "iPhone 12 Pro"],
            ['360,780,3', "A14", "iPhone 12"],
            ['320,568,2', "A13", "iPhone SE（2代）"],
            ['414,896,3', "A13", "iPhone 11 Pro Max"],
            ['375,812,3', "A13", "iPhone 11 Pro"],
            ['414,896,2', "A13", "iPhone 11"],
            ['414,896,3', "A12", "iPhone XS Max"],
            ['375,812,3', "A12", "iPhone XS"],
            ['414,896,2', "A12", "iPhone XR"],
            ['375,812,3', "A11", "iPhone X"],
            ['414,736,3', "A11", "iPhone 8 Plus"],
            ['414,736,3', "A10", "iPhone 7 Plus"],
            ['414,736,3', "A9", "iPhone 6S Plus"],
            ['414,736,3', "A8", "iPhone 6 Plus"],
            ['376,667,2', "A11", "iPhone 8"],
            ['376,667,2', "A10", "iPhone 7"],
            ['376,667,2', "A9", "iPhone 6S"],
            ['376,667,2', "A8", "iPhone 6"],
            ['320,568,2', "A9", "iPhone SE（1代）"],
            ['320,568,2', "A7", "iPhone 5S"],
            ['320,568,2', "A6", "iPhone 5"]
        ]

        // 获取GPU信息
        var canvas = document.createElement('canvas'),
            gl = canvas.getContext('experimental-webgl'),
            debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        let iphoneGPU = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // alert(iphoneGPU)
        let width = window.screen.width;
        let height = window.screen.height;
        let devicePixelRatio = window.devicePixelRatio;
        let baseInfo = width + ',' + height + ',' + devicePixelRatio;
        let flag = false;
        for (let i in iphoneArr) {
            for (let j in iphoneArr[i]) {
                // console.log(iphoneArr[i][0], baseInfo , iphoneGPU,iphoneArr[i][1])
                if (iphoneArr[i][0] == baseInfo && iphoneGPU.indexOf(iphoneArr[i][1]) != -1) {
                    model = iphoneArr[i][2];
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            }
        }
        if (!flag) {
            if ((width == 375 && height == 812) || (width == 414 && height == 896)) {
                model = 'iPhone X(11)'
            } else if (width == 360 && height == 780) {
                model = 'iPhone 12'
            } else if (width == 390 && height == 840) {
                model = 'iPhone 12 Pro'
            } else if (width == 428 && height == 926) {
                model = 'iPhone 12 Pro Max'
            }
        }
        // console.log(model);
    } else {
        model = "iPad"
    }
} else if (os == "AndroidOS") { //Android系统的处理  
    var j, sss = userAgent.split(";");
    for (var i = 0; i < sss.length; i++) {
        if (sss[i].indexOf("Build/") > 0) {
            j = i;
            break;
        }
    }
    if (j > -1) {
        model = sss[j].substring(0, sss[j].indexOf("Build/"));
    }
}



export default model