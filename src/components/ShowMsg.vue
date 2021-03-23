<template>
    <div class="showMsg lightBox" v-if="showMsg">
        <div class="showMsg__info">
            <div v-html="html"></div>
            <div class="showMsg__btn">
                <button @click="showMsgFun" v-if="otherBtn">
                    {{otherBtn}}
                </button>
                <template v-else>
                    <button @click="showMsgFun">
                        <iconFont name="btn_ok" />
                    </button>
                    <button v-if="showCancel" @click="closeMsgFun">
                        <iconFont name="btn_cancel" />
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$bus.$on('showMsg',(msg, fun, cancel, otherBtn) =>{
        this.html = msg
        this.showMsg = true
        this.fun = fun
        this.showCancel = cancel
        this.otherBtn = otherBtn
      })
    },
    data(){
      return {
        html:'',
        fun:undefined,
        showMsg:false,
        showCancel:false,
        otherBtn:undefined
      }
    },
    methods: {
        showMsgFun(){
            if(this.fun){
                this.fun()
            }
            this.showMsg = false
            this.html = ''
            this.fun = ''
            const body = document.getElementsByTagName('body')[0];
            body.style = "overflow:hidden"
        },
        closeMsgFun(){
          this.showMsg = false
        }
    },
    destroy(){
      this.$bus.$off('showMsg');
    }
}
</script>

<style lang="scss">
.showMsg{
    &__info {
        background: url('/images/bg/popup_bg.png');
        width: 80%;
        max-width: 400px;
        background-size: 100% 100%;
        height: 250px;
        padding: 50px 10px 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        text-align: center;
        div {
            word-break:break-word;
            width: 90%;
            color:$baseFont;
            h2{
                color: $baseFocus;
                font-size: 18px;
                padding-bottom: 10px;
            }
        }
    }
    &__btn {
            width: 90%;
            display: flex;
            align-items:  center;
            text-align: center;
            justify-content: center;
         }
        button {
            width: 50%;
            height: 45px;
            @include btn_popup();
            color:$btnFont;
            margin-left: 5px;
            font-size: 18px;
            i{
                color:$btnFont;
                font-size: 20px;
            }
        }
}
</style>
