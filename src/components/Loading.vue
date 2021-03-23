<template>
<div>
    <div class="wrapper" v-if="loadingKeep">
        <div class="mask" />
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <span class="loading">{{languageConfig.common_loading}}</span>
    </div>
</div>
</template>
<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["loadingKeep","languageConfig"])
    },
}
</script>
 <style lang="scss" scoped>

.wrapper{
    width:55px;
    height:30px;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
}
.mask{
     position: absolute;
    background: black;
    left:-10px;
    width:70px;
    top:5px;
    height: 60px;
    border-radius: 5px;
    opacity: 0.8;
}
.circle{
    width:10px;
    height:10px;
    position: absolute;
    border-radius: 50%;
    background-color:#ffcc00;
    left:0%;
    top:20px;
    transform-origin: 50%;
    animation: circle 0.7s alternate infinite ease;
    z-index: 1;
}
.loading{
    position: absolute;
    left: 5%;
    top: 40px;
    font-size: 12px;
    z-index: 1;
    opacity: 0.8;
}

@keyframes circle{
    
   0%{
        top:30px;
        height:5px;
        border-radius: 50px 50px 40px 40px;
        transform: scaleX(1.5);
    }
    20%{
        height:15px;
        border-radius: 50%;
        transform: scaleX(1);
    }
    30%{
        top:20px;
    }
   
}
.circle:nth-child(2){
    left:25%;
    animation-delay: 0.1s;
    background-color:  orange;
 
}
.circle:nth-child(3){
    left:50%;
 
    background-color:#ec0909;
    animation-delay: 0.2s;
}
.circle:nth-child(4){
     left:75%;
    animation-delay: 0.3s;
    background-color: #76D3FF;
}

</style>


