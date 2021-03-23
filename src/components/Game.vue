<template>
<ul class="game">
  <li v-for="(item, i) in gameList" :key="i">
    <router-link :to="item.link">
      <icon :name="item.icon" />
      <p>
        {{ item.ch }}
        <span>{{ item.en }}</span>
      </p>
    </router-link>
  </li>
</ul>
</template>

<script>
export default {
  props:['gameList']
}
</script>

<style scoped lang="scss">
.game {
  li{
    border: 1px solid #fff;
    background: #fff;
    box-shadow: inset 0 4px 7px 1px #ffffff,
    inset 0 -5px 20px rgba(173, 186, 204, 0.25), 0 2px 6px rgba(0, 21, 64, 0.14),
    0 10px 20px rgba(0, 21, 64, 0.05);
    border-radius: 50px;
    width: 200px;
    margin: auto;
    padding: 15px 0;
    transition: all 0.3s;
    text-align: center;
    cursor: pointer;
    margin: 5% auto;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      transition-timing-function: ease-in-out;
      animation: floating 1s infinite;
      @keyframes floating {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    }
  }
  i {
    color: #25b3ae;
    font-size: 35px;
  }
  p {
    padding-left: 10px;
    color: #7c7c7c;
    font-size: 18px;
    letter-spacing: 0.05em;
    width: 105px;
    span {
      padding-top: 5px;
      color: #acacac;
      display: block;
      font-size: 12px;
    }
  }
}
</style>
