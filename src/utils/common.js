
// import axios from 'axios'
import * as numeral from 'numeral'
// import * as device from '@/utils/device'
// import * as platform from '@/utils/platform'
// import CryptoJS from 'crypto-js'
import * as store from '../store/index'
// import * as router from '@/router'

export function Cookie(set, a, b, expireDays) {
    let isSuportLocalStorge = store.default.state.localStorageSuport
    if(!isSuportLocalStorge){

        var d = new Date();
        if (set == "set") {
            if (expireDays == undefined) {
                expireDays = 1;
            }
            /*        if (window.location.protocol == 'https:') {
                        secure = ";secure";
                    }*/
            d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        } else if (set == "remove") {
            d.setTime(d.getTime() - 1);
            b = "";
        } else {
            var arr = document.cookie.match(new RegExp("(^| )" + set + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null;
        }

        // var path = location.pathname.split('/')[1]; // 目前根目錄下層的資料夾名稱
        if (expireDays == 0) { //使其瀏覽器關閉及回收COOKIE
        //  document.cookie = a + '=' + escape(b) + '; path=/' + path + '/';
            document.cookie = a + '=' + escape(b) + '; path=/';
        //  document.cookie = a + '=' + escape(b) + ';';
        } else {
        //  document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; path=/' + path + '/';
            document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; path=/';
        //  document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + ';';
        }

        // =========================================================================
        // domain 為 localhost 時在 IE 會失效，故暫時移除
        // =========================================================================
        // if (set.match(/set|remove/)) {
        //     var domain = window.location.host;
        //     if (domain.indexOf(':') > 0) {
        //         domain = domain.substring(0, domain.indexOf(':'));
        //     }
        //     document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; domain=' + domain + '; path=/' + secure;
        // }
        // document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; domain=' + domain + '; path=/' + secure;
    }else{
        if (set == "set") {
           localStorage[a]=b;
           localStorage.setItem(a,b);
        } else if (set == "remove") {
            localStorage.removeItem(a);
        } else {
            return localStorage.getItem(set);
        }
    }

}
/**
 * 清空cookie
 */
// export function removeAllCookie(){
//     var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//     if(keys) {
//         for(var i = keys.length;i>-1; i--){
//             Cookie('remove',keys[i])
//         }
//     }
// }

/** 數字補0
 * @param {number} num
 * @param {number} size
 */
export function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}


// export function getAjax(oldUrl, oldData = {}) {
//     let data = {...oldData};
//     let url = oldUrl;
//     data.env = config.env;
//     // data.channelAccount = config.channel;
//     if(!addChannel(url)){return false}
//     data.channelAccount = addChannel(url)
//     data.sId = Cookie('sid');
    
//     // if(config.channel=='zlcai' ||config.channel=='cjcp888' ){
//     let token = getSelection()
//     if(url.indexOf('language')==-1){
//         data.langType =JSON.parse(Cookie('langType')).langType
//     }
//     if(url.indexOf('loginJson')>0){
//         token = getSpcTio(data.userName,data.password, data.cId)
//     }
//     if(url.indexOf('?')>-1){
//         url=url+'&tio='+token
//     }else{
//         url=url+'?tio='+token
//     }
//     // }
//     Object.keys(data).forEach((item)=>{
//         if(data[item]===''||data[item]===null||data[item]===undefined){
//             delete data[item]
//         }
//     })
//     if(!Cookie('tid')){//待測試
//         data.tId = ''
//     }else{
//         data.tId = Cookie('tid');
//     }


//     data = rda(url, token , data)
//     data = qs.stringify(data)

//     if(url.indexOf('basicSetup/listJson') >= 0){
//         api.defaults.timeout = 7000;
//     }else if(data.indexOf('m=lotInfo&key=LOT_ISSUE_INFO') >= 0){
//         api.defaults.timeout = 10000;
//     }else{
//         api.defaults.timeout = 0;
//     }


//     return api.post(url, data)
//     .then(function(response) {
//         // clearTimeout(tryChatIndex)
//         response = response.data;
//         if (response.resultCode == '1001') {
//             router.default.push('/noService')
//             store.default.commit('updateNoService', response.resultMap.blockIp);
//             return response
//         }

//         if(url.indexOf('checkUser/status')<0
//         &&url.indexOf('checkin/getCheckinInfo')<0
//         &&url.indexOf('/checkUser/withdrawalAmount')<0
//         &&url.indexOf('alive')<0
//         &&data.indexOf('getUserCategoryByLotteryInfo')<0
//         && (response.resultCode =='104' ||  response.resultCode =='999')){

//             Cookie("remove", "tid");
//             Cookie("remove", "sid");
//             Cookie("remove", "isFreeAccount");
//             store.default.commit('emptyUser')
//             if(localStorage.getItem('isApp')){
//                window.location = `closeToLogin`
//             }else{
//                 router.default.push('/acc')
//             }
            
//             platform.showMsg(response.msg)
//         }

//         return response;

//         })
//         .catch(function(error) {
//             if (data&&data.notoast) {
//                 return false
//             }
//             let status = `1000`
//             if(error.response && error.response.status){
//                 status = error.response.status
//             }
//             if(url.indexOf('alive')<0 &&data.indexOf('m=lotInfo&key=LOT_ISSUE_INFO') < 0&&url.indexOf('/content/queryContent') < 0&&url.indexOf('/room/list') < 0){
//                 if(navigator.onLine == false){ //请用此写法，而不是!navigator.onLine(Irene20190109)
//                     platform.showMsg(store.default.state.languageConfig.common_netErr)
//                 }else{
//                     if(status != '1000'){
//                         platform.showMsg(store.default.state.languageConfig.common_netErr)
//                     }
//                     return false
//                 }
//             }else{
//                 return false
//             }

//         });
// }

// export function getImgAjax(url, formData ) {
//     return new Promise(function (resolve, reject) {
//         formData.append('env', config.env);
//         formData.append('tId', Cookie('tid'));
//         formData.append('sId', Cookie('sid'))
//         formData.append("channelAccount", store.default.state.channelAccount);
//         if(url.indexOf('language')==-1){
//             formData.append('langType',JSON.parse(Cookie('langType')).langType)
//         }
//         const token = getSelection()
//         if(url.indexOf('?')>-1){
//             url=url+'&tio='+token
//         }else{
//             url=url+'?tio='+token
//         }
//         const xhr = new XMLHttpRequest()
//         xhr.open("POST",url)
//         xhr.onload = function () {
//             if(xhr.status == 200){
//                 const res = JSON.parse(xhr.responseText);
//                 console.log(res)
//                 resolve(res);
//             }else{
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 })
//             }
//         }
//         xhr.onerror = function () {
//             reject({
//               status: this.status,
//               statusText: xhr.statusText
//             });
//         };
//         xhr.send(formData)
//     })
// }

//随機生成長度len的隨機字串(預設隨機字串集是大小寫英數字)
export function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

/**
 *
 * @param {*} num 數字
 * @param {*} size 需要位數
 * @param {*} zeroIn 是否0也顯示
 * ex setNum(123456.123456,5) //0不顯示
 * ex setNum(123456.123456,5,1) //0顯示
 */
export function setNum(num, size, zeroIn) {

    function cleanZeor(val) { //砍字串遞回
        let nem = val.split('');
        if (nem[nem.length - 1] == '0') {
            val = val.substr(0, val.length - 1)
            val = cleanZeor(val);
        }
        return val
    }
    if(!num&&num!==0){
        num=''
    }
    let setNum = num.toString().split('.');
    let setFlour = '';
    for (let i = 0; i < size; i++) {
        setFlour = setFlour + "0";
    }
    if (setNum[1] != undefined) {
        setNum[1] = setNum[1] + setFlour;
    } else {
        setNum[1] = setFlour;
    }
    if (size!==undefined) {
        setNum[1] = setNum[1].substring(0, size);
        if (zeroIn) {
            return setNum.join(".");
        } else {
            let newSet = cleanZeor(setNum[1]); //去除尾數0
            if (newSet != '') {
                setNum[1] = newSet;
            } else {
                setNum = [setNum[0]]
            }
            return setNum.join(".");
        }
    } else {
        return num.toString();
    }
}
//增加千分位
export function setNumLocal(num) {
    let setNum = num.toString().split('.');
    // setNum[0] = parseInt(setNum[0]).toLocaleString();
    setNum[0]=numeral(setNum[0]).format('0,0')
    let temp = setNum.join('.')
    if(num < 0 && setNum[0] == 0)
        return '-' + temp
    else
        return temp
}


/**
 * 精确乘法
 */
export function times(num1, num2) {
    const num1Changed = Number(num1.toString().replace('.', ''));
    const num2Changed = Number(num2.toString().replace('.', ''));
    const baseNum = digitLength(num1) + digitLength(num2);
    return num1Changed * num2Changed / Math.pow(10, baseNum);
}

/**
 * 精确加法
 */
export function plus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 精确减法
 */
export function minus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 精确除法
 */
export function divide(num1, num2) {
    const num1Changed = Number(num1.toString().replace('.', ''));
    const num2Changed = Number(num2.toString().replace('.', ''));
    return times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)));
}


export function digitLength(num) {
    // Get digit length of e
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
    return len > 0 ? len : 0;
}

// //註冊
// export function initRegister() {
//     var data = {
//         columnType: memberConfig,
//     }
//     return getAjax(this.$store.state.groupPath.platformM + 'loginJson/simple', data)
//         .then(function(response) {
//             console.log(response);

//         })

// }
export function getUserClient(){
    return Cookie('device') == 'app' ? 'APP' : 'Mobile/PC'
}


//正式LOGIN
// export function formalLogin(userName, password, captcha, cid, apiUrl) {

//     let data = {
//         userName: userName,
//         password: password,
//         captcha: captcha,
//         cId: cid,
//         deviceType:device.getDevice()?device.getDevice().substr(0,64):'',
//         mobileOs:device.getMobileOS()?device.getMobileOS().substr(0,32):'',
//         userBrowser:device.getBrowser()?device.getBrowser().substr(0,32):'',
//         deviceInfo:navigator.userAgent.substr(0,495) + "/@V:"+version,
//         userClient:getUserClient()?getUserClient().substr(0,32):'',
//         loginUrl:window.location.origin
//     }

//     Cookie('remove', 'tid');
//     Cookie('remove', 'sid');
//     Cookie("remove", "isFreeAccount");
//     return getAjax(apiUrl + '/loginJson/complex', data).then(function(response) {

//             if (response.resultCode === '000' || response.resultCode === '021') {
//                 console.log(response.resultMap.token, response.resultMap.sId, 'response')
//                 Cookie('set', 'tid', response.resultMap.token);
//                 Cookie('set', 'sid', response.resultMap.sId);
//                 Cookie('set', 'userName', response.resultMap.userName,30);
//                 Cookie("remove", "talkIn");
//                 platform.preloadEgretRes()
//             }
//             return response
//         })
//         .catch(() => {
//             // console.log(error);
//         });
// }

export function setTimeFormate() {

    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }
    Date.prototype.addSeconds = function(s) {
        this.setTime(this.getTime() + (s * 1000));
        return this;
    }
}


//转换时间格式---------------------
export function transDate(date1) {
    let newTimeStamp=date1+store.default.state.timeResetNum
    var date = new Date(newTimeStamp);
    // var date = new Date(date1);
    var dd = "";
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var Sec = date.getSeconds();
    if (Sec < 10) {
        Sec = "0" + Sec;
    }
    dd =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        min +
        ":" +
        Sec; //+":"+date.getSeconds();
    return dd;
}


/**
 * 計算 dfMenu 的 ID
 * @param {*} data
 * @param {*} key
 */
export function  findKey (data,key) {
        if(!data){
            return false;
        }
        return data.findIndex( obj =>{
            if(obj.lower){
                const fndIndexResult = findKey(obj.lower,key)
                return fndIndexResult === -1 ? false : true
            }
            return obj.id === key
        })
}
/**
 * 計算 dfMenu 的 ID
 * @param {*} data
 * @param {*} key
 */
export function  findKeyFor (data,key) {
    for (let index = 0; index < data.length; index++) {
        if( data[index].lower!=undefined){
            for (let index2 = 0; index2 < data[index].lower.length; index2++) {
                data[index].lower[index2].lower;
                if(data[index].lower[index2].lower!=undefined){
                    for (let index3 = 0; index3 < data[index].lower[index2].lower.length; index3++) {
                        for (let index4 = 0; index4 < data[index].lower[index2].lower[index3].lower.length; index4++) {
                            if(key==data[index].lower[index2].lower[index3].lower[index4].id){
                                let defualData={
                                    bigChance:index,
                                    gameName:data[index].name+'_'+data[index].lower[index2].lower[index3].name,
                                    gameIndex:[index,index2,index3]
                                }
                                return defualData
                            }
                        }
                    }
                }
            }
        }
    }
}
//从 arr阵列中，取出size为一组的组合方式
export function groupSplit(arr, size) {
    var r = []; //result

    function _(t, a, n) { //tempArr, arr, num
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return r;
}
//將陣列中的值補0取兩位
export function format2Digit(arr) {
    var fArr = [];
    arr.forEach( function( value,i) {
        fArr[i] = ("0" + value).slice(-2);
    });
    return fArr;
}
//sort用
export function sortNumber(a,b)
{
    return a - b
}

export function formatStr2Digit(value) {
    return ("0" + value).slice(-2);
}

export function comb(mStr, mLen, n) {
    var vResult = "",
        vNum = 0,
        vVal = "";
    pCombination("", mStr);

    function pCombination(mLeft, mRight) {
        if (mLeft.length >= mLen) {
            vNum++;
            vResult += mLeft + "|";
        } else {
            for (var i = 0; i < mRight.length; i++) {
                pCombination(mLeft + mRight.substr(i, 1), mRight.substr(i + 1, mRight.length));
            }
        }
    }

    if (n > 0) {
        vVal = vNum * n;
    } else {
        vVal = vResult;
    }
    return vVal;
}

//陣列擷取
/**
 *
 * @param {*} old 原陣列
 * @param {*} star 開頭
 * @param {*} end 結尾
 */
export function cutArray(old, star, end) {
    var newArray = [];
    for (var i = star; i <= end; i++) {
        if(old[i]!=undefined){
            newArray.push(old[i])
        }
    }
    return newArray;
}
/**
 *
 * @param {*} oldArray 原陣列
 * @param {*} size 幾個一組
 */
export function newCutArray(oldArray, size) {
    var newArray = [];
    var j = 1;
    for (var i = 0; i < oldArray.length; i++) {
        j++
        if (i == 0 || j == size) {
            newArray.push(cutArray(oldArray, i, i + (size - 1)));
            j = 0;
        }
    }
    return newArray;
}


//取得min到max之间的随机整数
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//取得长度为len的随机字符(a-z,0-9)(故意随机不出现m)
export function getRandomChars(len=6){
    const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','n','o','p','q','r','s','t','u','v','w','x','y','z'];
   // debugger
    var res = '';
    for(var i = 0; i < len ; i++ ) {
        var id = getRandomInt(0,chars.length-1);
        res = res + chars[id];
    }
    return res;
}
export function evil(str){
    var fn = Function
    return new fn('return ' + str)();
}

export function checkCss(val){//盼剁是否有此css
    try {
        // alert('checkCss')
        var oDiv = document.createElement('div');
        // alert(oDiv.style)
        for(var prop in oDiv.style){
            if(val==prop){
                // alert('true')
                return true
            }
        }
        // alert('false')

        return false

    } catch (error) {

        // alert('false')
        return false

    }
    // if(CSS.supports('animation-name','marqee')){
    //     alert('true')
    //     return true
    // }else{
    //     alert('false')

    //     return false
    // }
}

export function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
export function sortObjByKey(Obj) {
    let tempObj = {}
    Object.keys(Obj).sort().forEach(function(key) {
        tempObj[key] = Obj[key];
    });
    return tempObj
}
export function getDomainTypeIdx(urlArr, domainType){
    let comIdx = urlArr.indexOf(domainType)
    if(comIdx<0){
        urlArr.forEach((item,i)=>{
            if(item.indexOf(`${domainType}:`)>=0){
                comIdx = i
            }
        })
    }
    return comIdx
}


//判斷數值顏色
export function setColor(val){
    if(val>=0){
        return 'won'
    }else{
        return 'lost'
    }
}
