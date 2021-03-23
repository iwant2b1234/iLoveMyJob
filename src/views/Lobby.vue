<template>
  <div class="lobby">
    <div class="background"></div>
    <div class="gameInfo">
      <Game :gameList="gameList" />
    </div>
  </div>
</template>

<script lang="ts">
import Game from "../components/Game.vue";
export default {
  components: {
    Game,
  },
  data(){
    return{
      gameList:[
      { icon: "Basket-Ball", ch: "投籃遊戲", en: "Basketball",link:'/Basketball' },
      { icon: "jingziqi", ch: "井字遊戲", en: "OOXX",link:'/OOXX' },
      { icon: "huaban", ch: "響應滾動圖", en: "ScrollBanner",link:'/Banner' },
      { icon: "chatroom", ch: "聊天室", en: "Chatroom",link:'/Chatroom' },
      { icon: "fishing", ch: "天才釣手", en: "Fishing",link:'/Fishing' },
      { icon: "Solitaire", ch: "新接龍", en: "Freecell",link:'/Solitaire' },
      ]
    }
  },
}

</script>

<style scoped lang="scss">
.lobby {
  position: relative;
  width: 100%;
  height: 100vh;
  .gameInfo {
    width: 90%;
    max-width: 900px;
    margin: auto;
    padding: 50px 0;
    position: relative;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 60%;
    transform: skewY(30deg);
    transform-origin: 100%;
    background: linear-gradient(-150deg, #222222 15%, #373737 60%, #3c4859 70%);
  }
}
</style>
