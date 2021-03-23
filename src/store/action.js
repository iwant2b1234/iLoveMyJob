import * as common from '@/utils/common';
import * as router from '@/router/index';

export function getUser(context,callBack){
    var data = {}
     common.getAjax(context.state.groupPath.platform + '/checkUser/status',data).then((res) =>{
      if(!res){
        if(callBack!==undefined){
          callBack('error');
        }
        return
      } 
        if(res.resultCode == '000'||res.resultCode == '001'||res.resultCode == '999' ){
          context.commit('updateUser',res.resultMap);
          if(res.resultMap.testAccount){
            common.Cookie('set', 'isFreeAccount', "1");
          }else{
            common.Cookie("remove", "isFreeAccount");
          }
          if(callBack!==undefined){
            callBack();
          }
        }else if (res.resultCode == '104') {
          setTimeout(() => {
            if(localStorage.getItem('isApp')){
              window.location = `closeToHome`
            }else{
              router.default.push('/idx')
            }
          }, 1200);
        }
    })
}