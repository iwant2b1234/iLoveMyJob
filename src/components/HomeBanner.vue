<template>
    <div :class="['homeBanner',{'enlargeBanner':enlarge||clientWidth<1025}]">
        <icon name='arrowL' @click="arrowL"/>
        <ul :style="ulStyle">
            <li v-for="(item, i) in bannerList" :key="i" :style="liStyle(i,item.id)" @click="getEnlarge(item.id)" :class="[{'enlarge':item.id==enlarge},{'scrollStop':scrollStop&&clientWidth<1025}]" 
            @mousedown="handleMouseDown" @touchstart="handleMouseDown"
            @touchend="handleMouseUp" @touchmove="handleMouseMove">
                <icon name='popclose' class="popclose"/>
                <div :style="divStyle(item.id)">
                </div> 
                <h1>{{item.name}}
                    <router-link :to="`/gameitem${item.id.toLowerCase()}`">{{langConfig.Explore}}</router-link>
                </h1>
            </li>
        </ul>
        <icon name='arrowR' @click="arrowR"/>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:['clientWidth'],
    data(){
        return{
            num:0.1,
            interval:undefined,
            enlarge:'',
            bannerList:[],
            width:'',
            body:'',
            scrollStop:false,
            time:1,
            sec:1,
            down:0,
            up:0,
            move:false,
            right:false,
            left:false
        }
    },
    computed:{
        ...mapState(["gameList","langConfig"]),
        ulStyle(){
            return {transform:`translate3d( ${this.num}px ,0px,0px)`}
        }
    },
    methods:{
        handleMouseDown(event){
            if(!this.scrollStop){
                return
            }
            this.move=true
            this.down=event.changedTouches&&event.changedTouches[0].pageX
        },
        handleMouseMove(){
            this.move=false
        },
        handleMouseUp(event){
            if(!this.scrollStop||this.move){
                return
            }
            let up=event.changedTouches&&event.changedTouches[0].pageX
            if(this.down>up){
                this.arrowR()
            }else{
                this.arrowL()
            }
            this.scroll()
        },
        arrowR(){
            this.time=90
            if(this.scrollStop){
                clearInterval(this.interval) 
                this.interval=setInterval(() => {
                    if(this.num <= -(this.width*2)){
                        let first = this.bannerList.slice(0,1)
                        let bannerList = this.bannerList.slice(1)
                        bannerList[20] = first[0]
                        this.bannerList = bannerList
                        this.num = -this.width
                        clearInterval(this.interval) 
                        return
                    }
                    this.num = this.num - (0.1*this.time)
                }, 1);
            }
        },
        arrowL(){
            this.time=-90
            if(this.scrollStop){
                clearInterval(this.interval) 
                    this.interval=setInterval(() => {
                    if(this.num >=0 ){
                        let bannerListlast = this.bannerList
                        bannerListlast.splice(0,0,this.bannerList[20])
                        this.bannerList = bannerListlast.slice(0,21)
                        this.num = -this.width
                        clearInterval(this.interval) 
                        return
                    }
                    this.num = this.num - (0.1*this.time)
                }, 1);
            }
        },
        getEnlarge(id){
            if(this.scrollStop&&this.clientWidth<1025){
                return
            }
            if(this.enlarge){
                this.enlarge='' 
                this.scroll()
            }else{
                this.enlarge=id
            }
        },
        divStyle(id) {
            return {'background-image':`url(images/idx/banner/${id}.jpg)`}
        },
        liStyle(i,id){
            if(id==this.enlarge){
                return {transform: `matrix(1, 0, 0, 1, ${-(this.width*i)-this.num}, 0)`,width: `100%`,'z-index': 99,left:`${this.width*i}px`,transition: `all .6s linear`}
            }
            return {left:`${this.width*i}px`,width:`${this.width}px`}
        },
        scroll(){
            clearInterval(this.interval) 
            this.interval=setInterval(() => {
                let now=Date.now()
                if(this.enlarge){
                    clearInterval(this.interval) 
                    return
                }
                if(this.num >=0 ||this.right){
                    let bannerListlast = this.bannerList
                    bannerListlast.splice(0,0,this.bannerList[20])
                    this.bannerList = bannerListlast.slice(0,21)
                    this.num = -this.width
                    if(this.clientWidth>1025){
                        this.time = 1
                    }else{
                        this.time = 0
                    }
                }
                if(this.num <= -(this.width*2)||this.left){
                    let first = this.bannerList.slice(0,1)
                    let bannerList = this.bannerList.slice(1)
                    bannerList[20] = first[0]
                    this.bannerList = bannerList
                    this.num = -this.width
                    if(this.clientWidth>1025){
                        this.time = 1
                    }else{
                        this.time = 0
                    }
                }
                if(now-this.sec>=3500&&this.clientWidth<1025){
                    this.time = 50
                    this.sec=Date.now()
                }
                this.num = this.num - (0.1*this.time)
                this.right=false
                this.left=false
            }, 1);
        },
        onresize(){
            if(this.clientWidth<1025){
                this.time = 50
                this.sec=Date.now()
                this.scrollStop=true
                if(this.clientWidth<1025){
                    this.width= this.clientWidth
                }else{
                    this.width= this.clientWidth/2
                }
            }else{
                this.time = 1
                this.width= this.clientWidth/3
                this.scrollStop=false
            }
            this.num = -this.width
            this.scroll()
        }
    },
    beforeDestroy() {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
        clearInterval(this.interval) 
    },
    mounted() {
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        this.bannerList=this.gameList.filter(vo => {return vo.type!=='lot'})
        this.onresize()
    },
}
</script>

<style lang="scss">
@import "@/scss/rwd.scss";
.homeBanner{
    width: 100%;
    overflow: hidden;
    position: relative;
  
    height: 100vh;
    &.enlargeBanner i:not(.popclose){
        display: none;
    }
    i{
        position:absolute;
        z-index: 8;
        font-size: 30px;
        cursor: pointer;
        color: #fff;
        top: 50%;
        opacity: .7;
        transition:opacity .75s cubic-bezier(.19,1,.22,1),transform .75s cubic-bezier(.19,1,.22,1);
        &:first-child{
            left:1%;
        }
        &:last-child{
            right: 1%;
        }
        &:hover{
            transform:scale3d(1.5,1.5,1.5);
            text-shadow:0 0 15px rgba($color: #000000, $alpha: .8);
            opacity: 1;
        }
    }
    ul{
        width: 100%;
        position: relative;
        height: 100vh;
        li{ 
            position: absolute;
            height: 100%; 
            overflow: hidden;
            transform: scaleX(1);
            &::before{
                position: absolute;
                content: '';
                background:linear-gradient(to bottom, rgba(0, 0, 0, 0) 0,rgba(0, 0, 0, .55));
                position: absolute;
                width:100%;
                height: 30%;
                bottom: 0;
                z-index: 9;
            }
            &.scrollStop, &.enlarge{
                h1{
                    
                    text-shadow:0 0 15px rgba($color: #000000, $alpha: .8);
                    width: 80%;
                    bottom: 20%;
                    text-align: right;
                    right: 0;
                    left: 0;
                    a{
                        text-shadow:none;
                        box-shadow:0 0 15px rgba($color: #000000, $alpha: .5);
                        display: block;
                        background: #fff;
                        color: #000;
                        line-height: 40px;
                        font-size: 15px;
                        border: 1px solid #fff;
                        width: 95px;
                        margin: auto;
                        text-align: center;
                        transition: all .3s linear;
                        margin-top: 20px;
                        &:hover{
                            background: #000;
                            transition: all .3s linear;
                            color: #fff;
                        }
                    }
                }
            }
            &.scrollStop{
                &::after{
                    background: rgba($color: #000000, $alpha: 0);
                }
                h1{
                    text-align: center;
                    width: 100%;
                    bottom: 18%;
                }
            }
            .popclose{
                display: none;
            }
            &.enlarge{
                &::after{
                    background: rgba($color: #000000, $alpha: 0);
                }
                .popclose{
                    display: block;
                    background: rgba($color: #fff, $alpha: 1);
                    color: #000;
                    position: absolute;
                    font-size: 25px;
                    left: 86%;
                    width: 50px;
                    line-height: 48px;
                    text-align: center;
                    border-radius: 50px;
                    top:14%;
                    z-index: 9;
                    cursor: pointer;
                    opacity: 1;
                    &:hover{
                        background: rgba($color: #000, $alpha: 1);
                        color: #fff;
                    }
                }
                h1 a{
                    position: absolute;
                    right: 0;
                }
            }
            div{
                position: absolute; 
                width:100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                transform:scaleX(1);
                transition:opacity .75s cubic-bezier(.19,1,.22,1),transform .75s cubic-bezier(.19,1,.22,1);
            }
            @include  gameItemPicUp-width(){
                &:hover:not(.enlarge){
                    div{
                        transform:scale3d(1.05,1.05,1.05);
                    }
                    &::after{
                        background: rgba($color: #000000, $alpha: 0);
                        transition: all .6s linear;
                    }
                    h1{
                        text-shadow:0 0 20px rgba($color: #000000, $alpha: .8);
                    }
                }
            }
            &::after{
                content: '';
                background: rgba($color: #000000, $alpha: .3);
                position: absolute;
                width:100%;
                height: 100%;
            }
            h1{
                color: #fff;
                font-size: 6.5em;
                line-height: 90px;
                position: absolute;
                bottom: 15%;
                left: 10%;
                width: 65%;
                height: 120px;
                margin: auto;
                z-index: 9;
                text-transform: uppercase;
                font-family:'DINCondensed';
                a{
                    display: none;
                }
            }
        }
    }
    
}
</style>