export default{
    //function 裡的this是要檢核的數值
  'equal':function(equalVal){
      return this == equalVal || !this || !equalVal
  },
  'maxNum':function(max){
    if(this.length == 0 || max=='')
      return true
    
    let num=Number(this)
    let NumMax=Number(max)
    return NumMax>=num
  },
  'minNum':function(min){
    if(this.length == 0 || min=='')
      return true
    
    let num=Number(this)
    let NumMin=Number(min)
    return NumMin<=num
  },
  'between':function (min,max) {
    if(this.length == 0 || max=='' ||min=='')
      return true
    let num=Number(this)
    let NumMax=Number(max)
    let NumMin=Number(min)
    return num<=NumMax && num>=NumMin
  },
  'accountId':function(){
    if(!this){
      return true
    }
    return /^[A-Za-z0-9]{1,50}$/.test(this.trim())    
  },
  'passwordFree':function(){
    if(!this){
      return true
    }
      return /^[a-zA-Z0-9]{4,12}$/.test(this.trim())
  },
  'passwordName':function(username){
      return this != username || !this || !username
  },
  'passwordRule':function(){
      if(!this){
          return true
      }
      const str = this.replace(/\d/g, function($0,pos){return parseInt($0)-pos;}); //顺增
      const str1 = this.replace(/\d/g, function($0,pos){return parseInt($0)+pos;}); //顺减
      return !/^(\d)\1{5}/.test(str.trim()) && !/^(\d)\1{5}/.test(str1.trim())&& !/^(\d)\1{5}/.test(this.trim())
  },
  'wechat':function(){
    if(!this){
      return true
    }
  return /^[a-zA-Z0-9]{6,20}$/.test(this.trim())
  },
  'password2':function(){
    if(!this){
      return true
    }
  return /^[0-9]{6}$/.test(this.trim())
  },
  'qq':function(){
    if(!this){
      return true
    }
  return /^[1-9][0-9]{4,14}$/.test(this.trim())
  },
  'airpayCard':function(){
    if(!this){
      return true
    }
  return /^[-A-Za-z0-9~!@#$%^&*()_+|<>,.?\/:;'\[\]{}\"]{11,50}$/.test(this.trim())
  
  },
  'bankCard':function(){
    if(!this){
      return true
    }
  return /^[0-9]{1,20}$/.test(this.trim())
  },
  'nameCn':function(){
    if(!this){
      return true
    }
  return !this.match(/[^\u3447-\uFA29\·]/ig)
  },
  'chartRoomName':function(){
    if(!this){
      return true
    }
  return !this.match(/[^\u3447-\uFA29a-zA-Z0-9\·]/ig)
  },
  'realName':function(){
    if(!this){
      return true
    }
  return !this.match(/[^\u3447-\uFA29A-Za-z\·]/ig)
  },
  'bankAdd':function(){
    if(!this){
      return true
    }
  return !this.match(/[^\u3447-\uFA29]/ig)
  },
  'acceptRules':function(){
    if(!this){
      return true
    }
  return this != undefined
  },
  'loginId':function(){
    if(!this){
      return true
    }
  if (!(/^[A-Za-z0-9]+$/.test(this))) {
    return false;
  }else {
    return true;
  }
  },
  'login_id':function(){
    if(!this){
      return true
    }
  if (!(/^[A-Za-z0-9]+$/.test(this))) {
    return false;
  }else {
    return true;
      }   
  },
  'checkfundPassword':function(fundPassword) {
    if(!this) {
      return true;
    } else {
      return this != document.getElementById(fundPassword).value
    }
  },
  'notifyName':function(){
    return /^[\u3447-\uFA29A-Za-z0-9]{0,30}$/.test(this.trim())
  },
  'notifyOrder':function(){
    if(!this){
      return true
    }
    return /^[0-9]{1,3}$/.test(this.trim()) && this > 0
  },
  'forbiddenReason':function () {
    if(!this){
      return true
    }
    return !this.match(/[^\u3447-\uFA29a-zA-Z0-9\·]/ig)
  },
  'checkUserName':function (val){
    if(val==undefined){return true}
    return Boolean(val)
  },
  'nameCnLength':function (){
      return this.length<16
    },
  'date_format':function () {
    if(!this){
      return true
    }
      let d = new Date(this)
      let v = d.Format('yyyy-MM-dd')
      let nowYear=new Date().getFullYear()
      return this == v &&d.getFullYear()>=1000&&d.getFullYear()<=nowYear
  },
  required: function () {
    try {
      return this.length > 0
    } catch (error) {
      return false
    }
  },
  account: function () {
    if (!this) return true
    return /^[a-zA-Z0-9]{6,10}$/.test(this.trim())
  },
  password: function () {
    if (!this) return true
    return /^[a-zA-Z0-9]{6,12}$/.test(this.trim())
  },
  invitationCode: function () {
    if (!this) return true
    return /^[0-9]{8}$/.test(this.trim())
  },
  passwordSameAccount: function (account) {
    if (!this) return true
    return this != account
  },
  passwordTooSimple: function () {
    if (!this) return true
    const same = /^(\d)\1+$/.test(this.trim())
    const increase = this.replace(/\d/g, (num, pos) => parseInt(num) - pos)
    const increaseNum = /^(\d)\1+$/.test(increase.trim())
    const decrease = this.replace(/\d/g, (num, pos) => parseInt(num) + pos)
    const decreaseNum = /^(\d)\1+$/.test(decrease.trim())
    return same || increaseNum || decreaseNum ? false : true
  },
  confirmed: function (password) {
    if (!this) return true
    return this == password
  },
  birthday: function () {
    if (!this) return true

    const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(this.trim())
    if (regex) {
      const nowDate = new Date().getTime()
      const inputDate = new Date(this).getTime()
      const diff = (nowDate - inputDate) / (1000 * 60 * 60 * 24 * 365.25)
      return diff > 18
    }
  },
  email: function () {
    if (!this) return true
    // return /^[a-zA-Z0-9]{1}[a-zA-Z0-9_.]{1,63}@[a-zA-Z0-9-]{2,63}([.][a-zA-Z0-9-]{2,63})+$/.test(this.trim())
    return /^[a-zA-Z0-9]{1}[a-zA-Z0-9_.]{0,63}@[a-zA-Z0-9-]{1,}([.][a-zA-Z0-9-]{1,})+$/.test(this.trim())
  },
  mobile: function () {
    if (!this) return true
    return /^[0-9]{10}$/.test(this.trim())
  },
  checkName: function () {
    if (!this) return true
    return /^.{1,30}$/.test(this.trim())
  },
  bankUserName: function () {
    if (!this) return true
    return /^[-A-Za-z ·-]{2,20}$/.test(this.trim())
  },
  financePassword: function () {
    if (!this) return true
    return /^[0-9]{6}$/.test(this.trim())
  },
  financeSameAccount: function (account) {
    if (!this) return true
    return this != account
  },
  financeSamePassword: function (password) {
    if (!this) return true
    return this != password
  },
  telegram: function () {
    if (!this) return true
    return /^[_a-zA-Z0-9]{5,32}$/.test(this.trim())
  },
  ifscCode: function() {
    if (!this) {
      return true;
    }
    let check = /^([a-zA-Z0-9]{4})+([0]{1})+([0-9]{6})+$/.test(this.trim())
      return check
  },

  addressName:function(){
    if(!this){return true;}
    return /^.{1,100}$/.test(this.trim())
  },
  bankAddress:function(){
    if(!this){return true;}
    return /^.{1,200}$/.test(this.trim())
  },
  bankAccount:function(){
    if(!this){return true;}
    return /^[a-zA-Z0-9]{1,20}$/.test(this.trim())
  },
  checkState:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  bankState:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  checkCity:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  bankCity:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  bankProvince:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  checkCountry:function (){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim()) 
  },
  checkZip:function (){
    if(!this){
      return true
    }
    return /^[0-9]{6}$/.test(this.trim()) 
  },
  checkRebate: function (rebate) {
    if (!this) return true
    const regex = /^[0-9]+(.[0-9]{1})?$/.test(this.trim())
    const check = this <= Number(rebate)
    return regex && check
  },
  checktxId:function(){
    if(!this){
      return true
    }
    return /^[A-Za-z0-9]{1,100}$/.test(this.trim())
  },
  checkBankName:function(){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim())
  },
  checkAccountName:function(){
    if(!this){
      return true
    }
    return /^.{1,50}$/.test(this.trim())
  },
  amountLimit() {
    if (!this) return true
    return /^[1-9][0-9]{0,8}?$/.test(this);
  },
  UPIID(){
    if (!this) return true
    return /^([0-9]{10}|[a-zA-Z ]{1,})@[0-9a-zA-Z]{1,}$/.test(this);
  },
  USDTAddress(){
    if (!this) return true
    return /^[a-zA-Z0-9]{1,100}$/.test(this.trim()) 
  },
  smsCode(){
    if (!this) return true
    return /^[a-zA-Z0-9]{1,10}$/.test(this.trim())
  }
}