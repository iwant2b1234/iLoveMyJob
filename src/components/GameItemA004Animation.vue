<template>
   <div class="gameItemBanner__img">
            <img class="aniTemBg" src="/images/gameItem/A004/A004_bannerbg.png" />
             <img class="aniItem3" src="/images/gameItem/A004/A004_banneritem3.png" />
             <img class="aniItem2" src="/images/gameItem/A004/A004_banneritem2.png" />
            <img class="aniItem1" src="/images/gameItem/A004/A004_banneritem1.png" />
             <img class="aniItem4" src="/images/gameItem/A004/A004_banneritem4.png" />
          </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
       ...mapState(["langConfig"]),
      selectedItem(){
          return this.langList[this.selectedIndex]
      }
  },
  data() {
    return {}
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/anicss.scss";
@include keyframesBgAni;
@include keyframesUpDown;
//animation動畫寫在這兒
.aniTemBg{
       width: 100%;
       @include bgAni
}
//標題
.aniItem1{
  position:absolute;
  bottom: 0;
  left: 0;
  margin-left:15%;
  width: 75%;
  opacity: 0;
  $animations: (
        bgPop 0.5s 1.5s forwards,
        upDown 5s 1.9s infinite alternate-reverse,
      );
  @include multiple_animations($animations);
}
//魚
.aniItem2{
  position:absolute;
  left: 50%;
  bottom: 36%;
    width: 22%;
    transform-origin: top left;
   opacity: 0;
   $animations: (
        bgPop 0.5s 1s forwards,
        fish 3s 1.5s infinite linear alternate-reverse,
      );
  @include multiple_animations($animations);
}
//釣魚手
.aniItem3{
  position:absolute;
  left: 25%;
  bottom: 24%;
  width: 45%;
  opacity: 0;

   $animations: (
        bgPop 0.5s 1s,
        upDown 3s 1.5s infinite linear alternate-reverse ,
      );
  @include multiple_animations($animations);

}
//陽光
.aniItem4{
  position:absolute;
  left: 50%;
  top: 10%;
  opacity: 0;
  transform-origin: top left;
  transform:rotate(130deg)scale(0);
  $animations: (
        sunlight 10s 4s infinite linear ,
      );
  @include multiple_animations($animations);
}

@keyframes sunlight{
       0%{
              opacity: 1;
              transform:rotate(130deg)scale(0);
       }
        40%{
              opacity: 0.5;
              transform:rotate(-15deg)scale(2);
       }
        50%{
              opacity: 0;
              transform:rotate(-40deg)scale(2.1);
       }
        100%{
              opacity: 0;
              transform:scale(2);
       }
     
}
@keyframes fish{
       0%{
         opacity: 1;
              transform:translateY(0) ;
       }
      50%{
          
              opacity: 1;
              transform:rotate(-15deg)translateY(5px);
         
       }
      100%{
           opacity: 1;
              transform:translateY(0);
         
       }
}

</style>
