export function getCanvas() {
    let canvas;
    if (canvas == null) {
      canvas = document.createElement('canvas');
    }

    return canvas;
  }
export function getGl() {
    let gl
    if (gl == null) {
      gl = getCanvas().getContext('experimental-webgl');
    }
    return gl;
  }

export function getScreenWidth() {
    return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);
  }

export function getGlRenderer() {
    const debugInfo = getGl().getExtension('WEBGL_debug_renderer_info');
    const glRenderer = debugInfo == null ? 'unknown' : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return glRenderer;
  }

export function getModels() {
    const devices = {
        "Apple A7 GPU": {
          1136: ["iPhone 5", "iPhone 5s"],
          2048: ["iPad Air", "iPad Mini 2", "iPad Mini 3"]
        },
  
        "Apple A8 GPU": {
          1136: ["iPod touch (6th generation)"],
          1334: ["iPhone 6"],
          2001: ["iPhone 6 Plus"],
          2048: ["iPad Air 2", "iPad Mini 4"]
        },
  
        "Apple A9 GPU": {
          1136: ["iPhone SE"],
          1334: ["iPhone 6s"],
          2001: ["iPhone 6s Plus"],
          2224: ["iPad Pro (9.7-inch)"],
          2732: ["iPad Pro (12.9-inch)"]
        },
  
        "Apple A10 GPU": {
          1334: ["iPhone 7"],
          2001: ["iPhone 7 Plus"]
        }
      };
    let models
    if (models == null) {
      var device = devices[getGlRenderer()];

    if (device == undefined||device == '') {
		models = 'unknown '+getGlRenderer()+' '+getScreenWidth();   
     } else {
        models = device[getScreenWidth()];

        if (models == undefined||models == '') {
          models = 'unknown '+getGlRenderer()+' '+getScreenWidth();
        }
      }
    }

    return models;
  }
  function getiPhoneModel() {
    // Create a canvas element which can be used to retrieve information about the GPU.
    var canvas = document.createElement("canvas");
    if (canvas) {
        var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (context) {
            var info = context.getExtension("WEBGL_debug_renderer_info");
            if (info) {
                var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
            }
        }
    }
      // iPhone X/Xs
    if ((window.screen.height / window.screen.width == 812 / 375) && (window.devicePixelRatio == 3)) {
        switch (renderer) {
            case "Apple A11 GPU":
                return "iPhone X";
            case "Apple A12 GPU":
                return "iPhone XS";
            default:
                return "iPhone X, iPhone XS, iphone 11 Pro";
            }
    }else if(window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896){
        return 'iPhone XS Max, iphone 11 Pro Max'
    // iPhone XR
    }else if ((window.screen.height / window.screen.width == 896 / 414) && (window.devicePixelRatio == 2)) {
      return 'iPhone XR'
    // iPhone 6+/6s+/7+ and 8+
    }else if ((window.screen.height / window.screen.width == 736 / 414) && (window.devicePixelRatio == 3)) {
        switch (renderer) {
            case "Apple A8 GPU":
                return "iPhone 6 Plus";
            case "Apple A9 GPU":
                return "iPhone 6s Plus";
            case "Apple A10 GPU":
                return "iPhone 7 Plus";
            case "Apple A11 GPU":
                return "iPhone 8 Plus";
            default:
                return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus";
        }
    // iPhone 6+/6s+/7+ and 8+ in zoom mode
    } else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 3)) {
        switch(renderer) {
            case "Apple A8 GPU":
                return "iPhone 6 Plus (z)";
            case "Apple A9 GPU":
                return "iPhone 6s Plus (z)";
            case "Apple A10 GPU":
                return "iPhone 7 Plus (z)";
            case "Apple A11 GPU":
                return "iPhone 8 Plus (z)";
            default:
                return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus(z)";
        }
    // iPhone 6/6s/7 and 8
    } else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 2)) {
        switch(renderer) {
            case "Apple A8 GPU":
                return "iPhone 6";
            case "Apple A9 GPU":
                return "iPhone 6s";
            case "Apple A10 GPU":
                return "iPhone 7";
            case "Apple A11 GPU":
                return "iPhone 8";
            default:
                return "iPhone 6, 6s, 7 or 8";
        }
    // iPhone 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
    } else if ((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) {
        switch(renderer) {
            case "PowerVR SGX 543":
                return "iPhone 5 or 5c";
            case "Apple A7 GPU":
                return "iPhone 5s";
            case "Apple A8 GPU":
                return "iPhone 6 (z)";
            case "Apple A9 GPU":
                return "iPhone SE or 6s (z)";
            case "Apple A10 GPU":
                return "iPhone 7 (z)";
            case "Apple A11 GPU":
                return "iPhone 8 (z)";
            default:
                return "iPhone";
        }
    // iPhone 4/4s
    } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 2)) {
        switch(renderer) {
            case "PowerVR SGX 535":
                return "iPhone 4";
            case "PowerVR SGX 543":
                return "iPhone 4s";
            default:
                return "iPhone 4 or 4s";
        }
    // iPhone 1/3G/3GS
    } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 1)) {
        switch(renderer) {
            case "ALP0298C05":
                return "iPhone 3GS";
            case "S5L8900":
                return "iPhone 1, 3G";
            default:
                return "iPhone 1, 3G or 3GS";
        }
    } else if(/iPad/i.test(navigator.userAgent)) {
        return "iPad";
    }else {
        return "Not an iPhone("+window.screen.height +","+window.screen.width  +"," +window.devicePixelRatio+"," +renderer+")" ;
    }
}
  export function getOS(){
    if (/(iPhone|iPad|iPod|iOS|SymbianOS|Windows Phone)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent);  
       return 'iOS'
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent); 
        return "Android"
    } else {
        return "pc"
    }
  }
  export function getDevice(){
    const os = getOS()
    if(os=='iOS'){
        return getiPhoneModel()
	}else if(os=='Android'){
        let userList = navigator.userAgent.split(';')

		for(let i = 0;i<userList.length;i++){
			if (userList[i].indexOf("Build/") > -1) { 
				if(userList[i].indexOf("HUAWEI") > -1){
					if(userList[i].indexOf(')') > -1){
						return userList[i].substring(userList[i].indexOf("Build/")+6,userList[i].indexOf(')'));  //UC browser
					}else{
						return userList[i].substring(userList[i].indexOf("Build/")+6,userList[i].length); 
					}
					
				}
				if(userList[i].substring(0, userList[i].indexOf("Build/")).trim() != ''){
                    return userList[i].substring(0, userList[i].indexOf("Build/")); 
				}
			}
        }
        let userList2 = navigator.userAgent.split('/')
        if(navigator.userAgent.indexOf('Redmi') > -1){
            for(let i = 0;i<userList2.length;i++){
				if (userList2[i].indexOf("Redmi") > -1) { 
					//return userList2[i]
					return userList2[i].substring(userList2[i].indexOf("Redmi"),userList2[i].indexOf(")")); 
				}
			}
        }
		if(navigator.userAgent.indexOf('GIONEE') > -1){
			for(let i = 0;i<userList2.length;i++){
				if (userList2[i].indexOf("GIONEE") > -1) { 
					//return userList2[i]
					return userList2[i].substring(userList2[i].indexOf("GIONEE"),userList2[i].length); 
				}
			}
		}
	}

    return ''
  }
  export function getBrowser(){
    const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	const userList = userAgent.split('/')
    const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
    // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
    const isIE=window.ActiveXObject || "ActiveXObject" in window
    // var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
    const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
    const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("UCBrowser") == -1  && userAgent.indexOf("HUAWEI") == -1; //判断是否Safari浏览器
    const isHUAWEI = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("HUAWEI") > -1; //判断是否HUAWEI浏览器  
    const isVivo = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("VivoBrowser") > -1;
    const isUC = userAgent.indexOf("UCBrowser") > -1 && !isEdge; //判断UC浏览器
    const isUBrowser = userAgent.indexOf("UBrowser") > -1 && !isEdge; //判断UC浏览器(pc)
    const isSogou = userAgent.indexOf("Sogou") > -1  && !isEdge; //判断sogou浏览器
    const isSogou2 = userAgent.indexOf("SE 2.X") > -1 && !isEdge; //判断sogou浏览器
	const isOppo = userAgent.indexOf("OppoBrowser") > -1 && !isEdge; //判断oppo浏览器
	const isBaidu = userAgent.indexOf("Baidu") > -1 && !isEdge; //判断baidu浏览器
	const isMZ = userAgent.indexOf("MZBrowser") > -1 && !isEdge; //判断MZ浏览器
	const isMiui = userAgent.indexOf("MiuiBrowser") > -1 && !isEdge; //判断Miui浏览器 
	const isQQ = userAgent.indexOf("QQBrowser") > -1 && !isEdge; //判断QQ浏览器 
	const isWeChat = userAgent.indexOf("MicroMessenger") > -1 && !isEdge; //判断Wechat浏览器
    const isGIONEE = userList[userList.length-3].indexOf("GIONEE") > -1 && !isEdge; //判断GIONEE浏览器 
    const isSamsung = userAgent.indexOf("SamsungBrowser") > -1 && !isEdge; //判断GIONEE浏览器                             
    const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome浏览器 

    let version = ''
    if (isIE)  
    { 
      const reIE = new RegExp("MSIE (\\d+\\.\\d+);"); 
       reIE.test(userAgent); 
       const fIEVersion = parseFloat(RegExp["$1"]); 
       if(userAgent.indexOf('MSIE 6.0')!=-1){
         return "IE6";
       }else if(fIEVersion == 7) 
         { return "IE7";} 
       else if(fIEVersion == 8) 
         { return "IE8";} 
       else if(fIEVersion == 9) 
         { return "IE9";} 
       else if(fIEVersion == 10) 
         { return "IE10";} 
       else if(userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)){ 
             return "IE11";
         } 
       else
         { return "0"}//IE版本过低
     }//isIE end 
       
     if (isFF) { return "FF";} 
     if (isOpera) { return "Opera";} 
     if (isMiui) {
		version = userList[userList.length-1]
		return "Miui "+version;
	}  
     if (isSafari) { return "Safari";} 
     if (isUC) {
        version = userList[7]&&userList[7].substring(0,userList[7].indexOf('UCBrowser'))
		if(!version){
			version = userList[userList.length-2].substring(0,userList[userList.length-2].indexOf('Mobile'))
        }
        if(!version){
			version = userList[userList.length-4]
        }
		return "UC "+version;
    }
    if (isUBrowser) {
        version = userList[userList.length-2].substring(0,userList[userList.length-2].indexOf('Safari'))
		return "UC "+version;
	}  
	if (isSogou) {
		version = userList[userList.length-1]
		return "Sogou "+version;
    }
    if (isSogou2) {
		return "Sogou";
	}  
	if (isOppo) {
		version = userList[userList.length-1]
		return "Oppo "+version;
	}
	if (isBaidu) {
		version = userList[userList.length-1]
		return "Baidu "+version;
	} 
	if (isMZ) {
		version = userList[userList.length-3]
		return "MZ "+version;
	} 
 
	if (isQQ) {
        version = userList[userList.length-2].substring(0,userList[userList.length-2].indexOf('Mobile'))
        if(!version){
            version = userList[userList.length-1]
        }
		return "QQ "+version;
	}
	if (isWeChat) {
		version = userList[userList.length-3].substring(0,userList[userList.length-3].indexOf('('))
		return "WeChat "+version;
	}
	if (isGIONEE) {
		return "GIONEE"; 
    } 
    if (isSamsung) {
        version = userList[userList.length-3].substring(0,userList[userList.length-3].indexOf('Chrome'))
		return "Samsung " + version; 
    }
    if (isHUAWEI) {
		return "HUAWEI ";
    }        
    if (isVivo) {
		return "VivoBrowser ";
	}        
     if (isChrome) {
      version = userList[3].substring(0,userList[3].indexOf('Safari'))
      if(version == ''){
          for(var i = 0;i<userList.length;i++){
              if(userList[i].indexOf('Mobile Safari') > -1){
                version = userList[i].substring(0,userList[i].indexOf('Mobile Safari'))
                break;
              }
          }
      }
        return "Chrome "+version;
      } 
     if (isEdge) {
        version = userList[userList.length-1]
        return "Edge "+version;
    } 

     return ''

  }
  export function getMobileOS(){
    let v,info;
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if(!v){
        v = navigator.appVersion.substr(navigator.appVersion.indexOf(' OS')+3, navigator.appVersion.indexOf(' like')-(navigator.appVersion.indexOf(' OS')+3))
        return 'iOS ' +  v
      }

        info = 'iOS ' + parseInt(v[1], 10)+'.'+parseInt(v[2], 10)+'.'+parseInt(v[3] || 0, 10)
     
    }else if(/Android/.test(navigator.userAgent)){
		info = navigator.userAgent.split(';')
		for(let i = 0;i<=info.length;i++){
			if(info[i].indexOf('Android')>=0){
				return info[i]&& info[i]
			}
		}
    }else{
     info = navigator.platform
    }
    return info;
  }