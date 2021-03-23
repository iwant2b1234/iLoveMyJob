import * as common from '@/utils/common'
import * as store from '../store/index'
import Vue from 'vue'

const config = require(`@/configs/basic/${process.env.VUE_APP_BASIC_TYPE}.js`).defaultConfig


export function showMsg(html, fun, cancel = false, otherBtn) {
    const body = document.getElementsByTagName('body')[0];
    body.style = "overflow:hidden"
    Vue.prototype.$bus.$emit("showMsg", html, fun, cancel, otherBtn);
}

export function showToast(msg){
    if (msg) {
        Vue.prototype.$bus.$emit("toast", msg);
    }
}

//測試聊天室速度
export function getchatUrl( val) {
    if(!store.default.state.testChatFast || store.default.state.groupPath.chatList.length==0){
        return
    }
    let defaultData=store.default.state.groupPath.defaultTalk[0];

    store.default.commit('updateTalkUrl',defaultData)
    if (!val) {
        store.default.commit('updateTestChatFast',false)
        setTimeout(() => {
            store.default.commit('updateTestChatFast',true)
        }, 180000);
    }

    try {
        if (common.Cookie('chatTestArray') &&common.Cookie('chatTestTime') &&new Number( common.Cookie('chatTestTime'))>0) {
            let usTime=new Number( common.Cookie('chatTestTime'));
            let nowTime=new Date().getTime()
            if (nowTime-usTime<3600*1000) {
                let useTimeArray=[]
                checkServe(JSON.parse(common.Cookie('chatTestArray')),0,useTimeArray)
                return
            }
        }
    } catch (error) {
        console.log(error);
    }
    let data={
        notoast:true//辨識用
    }
    common.getAjax(store.default.state.groupPath.chatList + '/direct',data).then((result)=>{
        //  result =[{"domain":"google.com"},{"domain":"456ee"},{"domain":"a.com"}]

            if(!result){
                return;
            }
            let useTimeArray=[]
            checkServe(result,0,useTimeArray);
            common.Cookie('set','chatTestArray',JSON.stringify(result));
            common.Cookie('set','chatTestTime',new Date().getTime());
            // result.forEach(element => {
            //     // checkServe(element.domain)
            //     console.log(element);

            // });

    })
}

function checkServe(dataArray,index,timeArray){

    let data={
        notoast:true//辨識用
    }
    let sendUrl=dataArray[index].domain
    let chatStr = '/chatroom';
    if(config.env=='DEV'){
        chatStr = '/dev-chatroom'
    }
    if(process.env.VUE_APP_BASIC_TYPE == 'vip1'){
        chatStr = '/Y2hhdHJvb21WSVAx'
    }

    if(process.env.VUE_APP_BASIC_TYPE == 'vip3'){
        chatStr = '/cc784fcbdb7cc95'
    }
    sendUrl=sendUrl+chatStr
    //等待測試位址
    let testUre='/test/TestT'
    let startTime=new Date().getTime()
    common.getAjax(sendUrl+testUre ,data).then((result)=>{
        if(result){
            let endTime=new Date().getTime()
            let sendData={
                useTime:endTime-startTime,
                domaim:sendUrl
            }
            timeArray.push(sendData)
        }
        if(dataArray[index+1]==undefined){
            let useTime=undefined;
            let useDomain=undefined
            timeArray.forEach(element => {
                if(useTime==undefined || (useTime>element.useTime && element.domaim)){
                    useTime=element.useTime
                    useDomain=element.domaim
                }
            });
            if(useDomain!=undefined){
                try {
                    let defaulData=common.Cookie('talkUse')
                if (defaulData.indexOf(useDomain)>-1) {
                        return
                    }
                    let ssl=0;
                    if (window.location.protocol=='https:') {
                        ssl=1
                    }
                    let sendData={
                        domain:useDomain,
                        user_name :store.default.state.channel,
                        account :store.default.state.user.userName,
                        notoast:true,
                        ssl:ssl
                    }
                    common.getAjax(store.default.state.groupPath.chatList + '/directlog_add',sendData).then(()=>{

                    })
                } catch (error) {
                    console.log(error);
                }

                store.default.commit('updateTalkUrl',useDomain)
                common.Cookie('set','talkUse',useDomain)
            }
        }else{
            setTimeout(() => {
                checkServe(dataArray,index+1,timeArray)
            }, 1000);
        }
    });
  }
export function preloadEgretRes(index=0,finishedList=[]) {
    let egretRes = [
        '/g/resource/assets/loading.png',
        '/g/resource/assets/loading_coin.png',
        '/g/resource/assets/loadingpage_bg.png',
        '/g/resource/assets/main.png',
        '/g/resource/assets/main_bg.png'
    ]
    let loadingRes = new Image()
    if (finishedList.length !== egretRes.length) {
        loadingRes.onload = () => {
            index=index+1
            preloadEgretRes(index,finishedList)
        }
        finishedList.push(egretRes[index])
        loadingRes.src = egretRes[index]
    }
}
// 轉換型別
export function changeNumber(orderGame, orderNumber) {
    var ChangOrder = orderGame.substring(orderGame.indexOf('_') + 1, orderGame.length);
    var SSCGame = [];

    let gametype =orderGame.split("_")[1]
    switch (gametype) {
        case 'P10':
            switch (ChangOrder) {
                    case "P10_A01":{
                        return orderNumber;
                    }
                    default:
                        return orderNumber;
            }


        case 'SSC':
            switch (ChangOrder) {
                case "SSC_C01":{
                    let content = orderNumber;
                    content = content.replace(/1/g, store.default.state.lotLanguageConfig.sscBall_t1);
                    content = content.replace(/2/g, store.default.state.lotLanguageConfig.sscBall_t2);
                    content = content.replace(/3/g, store.default.state.lotLanguageConfig.sscBall_t3);
                    content = content.replace(/4/g, store.default.state.lotLanguageConfig.sscBall_t4);
                    return content;
                }
                default:
                    return orderNumber;

            }

        case 'K3':
            switch (ChangOrder) {
                case "K3_B01":{
                    let orderNm = orderNumber.split("|");
                    for (let i = 0; i < orderNm.length; i++) {
                        if (orderNm[i] == "19") {
                            SSCGame.push(store.default.state.lotLanguageConfig.k3Ball_t1)
                        } else if (orderNm[i] == "20") {
                            SSCGame.push(store.default.state.lotLanguageConfig.k3Ball_t2)
                        } else if (orderNm[i] == "21") {
                            SSCGame.push(store.default.state.lotLanguageConfig.k3Ball_t3)
                        } else if (orderNm[i] == "22") {
                            SSCGame.push(store.default.state.lotLanguageConfig.k3Ball_t4)
                        } else if (orderNm[i] == "00") {
                            SSCGame.push("0");
                        } else if (orderNm[i] == "01") {
                            SSCGame.push("1");
                        } else if (orderNm[i] == "02") {
                            SSCGame.push("2");
                        } else if (orderNm[i] == "03") {
                            SSCGame.push("3");
                        } else if (orderNm[i] == "04") {
                            SSCGame.push("4");
                        } else if (orderNm[i] == "05") {
                            SSCGame.push("5");
                        } else if (orderNm[i] == "06") {
                            SSCGame.push("6");
                        } else if (orderNm[i] == "07") {
                            SSCGame.push("7");
                        } else if (orderNm[i] == "08") {
                            SSCGame.push("8");
                        } else if (orderNm[i] == "09") {
                            SSCGame.push("9");
                        } else {
                            SSCGame.push(orderNm[i])
                        }
                    }
                    return SSCGame.join("|");
                }
                default:
                return orderNumber;
            }

        case '11C5':
            switch (ChangOrder) {
                case "11C5_FTA":{
                    for (let i = 0; i < orderNumber.split("|").length; i++) {
                        if (orderNumber.split("|")[i] == "1") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t1)
                        } else if (orderNumber.split("|")[i] == "2") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t2)
                        } else if (orderNumber.split("|")[i] == "3") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t3)
                        } else if (orderNumber.split("|")[i] == "4") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t4)
                        } else if (orderNumber.split("|")[i] == "5") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t5)
                        } else if (orderNumber.split("|")[i] == "6") {
                            SSCGame.push(store.default.state.lotLanguageConfig.n11C5Ball_t6)
                        } else {
                            SSCGame.push(orderNumber.split("|")[i])
                        }
                    }
                    return SSCGame.join("|");
                }

                default:
                return orderNumber;
            }
        default:
            return orderNumber;

    }

}
export function cleanUserData() {
    store.default.commit("emptyUser");
    common.Cookie("remove", "tid");
    common.Cookie("remove", "sid");
    common.Cookie("remove", "isFreeAccount");
}
//訊號

export function displayNetQ(dTime){
    if ((dTime) < 300) {
        return [true,true,true,true]
    } else if ((dTime) < 500) {
        return [true,true,true,false]
    } else if ((dTime) < 1000) {
        return [true,true,false,false]
    } else {
        return [true,false,false,false]
    }
}
