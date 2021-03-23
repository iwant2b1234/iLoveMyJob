<template>
  <div class="Solitaire">
    <div class="info">
      <!-- <Header /> -->
      <SolitaireBet />
    </div>
  </div>
</template>

<script lang="ts">
// import Header from "../components/Header.vue";
import SolitaireBet from "../components/SolitaireBet.vue";
export default {
  components: {
    // Header,
    SolitaireBet,
  },
}
</script>

<style scoped lang="scss">
.Solitaire {
  width: 100%;
  height: 100vh;
  background: linear-gradient(50deg, #2d8879 15%, #048b75 50%, #2d7e77 70%);
  position: relative;
  .info {
    width: 90%;
    max-width: 800px;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 600px;
    border-radius: 10px;
    border: 5px solid #ffffff;
    overflow: hidden;
    background: #06bd34;
  }
}
</style>
