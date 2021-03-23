<template>
  <div
    :class="[`card`, setClass, color]"
    :style="style"
    @mousedown="handleMouseDown($event)"
    @touchstart="handleMouseDown($event)"
    @touchmove="handleMouseMove($event)"
    @touchend="handleMouseUp"
  >
    <!-- <p v-if="list.back">
      <icon name="dog" />
    </p>
    <template v-else> -->
      <p>
        <span :class="{ ten: setNum == 10 }">{{ setNum }}</span>
        <icon :name="type" />
      </p>
      <icon :name="type" />
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  props:['list','moveThis'],
  data(){
    return{
      showPop:false,
      moveFlag:false,
      setThisFlag:false,
      x:0,
      y:0,
      offsetX:0,
      offsetY:0
    }
  },
  computed:{
    style() {
      if (this.moveFlag && !this.list.back)
        return {
          top: `${this.y}px`,
          left: `${this.x}px`,
          "z-index": 9,
        };
      return {
        // transform: `translate(${this.list.y}px, ${this.list.x}px)`
        top: `${this.list.y}px`,
        left: `${this.list.x}px`,
      };
    },
    setClass() {
      return `PokerCard`
      // return this.list.back ? "pokerback" : `PokerCard`;
    },
    setNum() {
      // if (this.list.back) return;
      let v = Number(this.list.card && this.list.card.slice(1, 3));
      if (v < 11) {
        return v;
      } else {
        if (v == 11) return "J";
        if (v == 12) return "Q";
        if (v == 13) return "K";
      }
      return ''
    },
    type() {
      return this.list.card && this.list.card[0];
    },
    color() {
      if (this.type == "H" || this.type == "D") return "red";
      else return "bk";
    }
  },
  methods:{
    handleMouseUp() {
      this.moveFlag = false;
      this.setThisFlag = false;
      if (this.moveThis == this.list.id) {
        // console.log(this.x, this.y, "-------------");
        let data = {
          num: this.setNum,
          type: this.type,
          color: this.color,
          ...this.list,
        };
        data.x = this.x;
        data.y = this.y;
        this.setThisCard(data);
      }
    },
    handleMouseDown(e) {
      this.moveFlag = true;
      this.offsetX = e.clientX;
      this.offsetY = e.clientY;
      // console.log(this.offsetX,this.offsetY);
      
    },
    setThisCard(data) {
      // @Emit("setThisCard")
      return data;
    },
    setMoveThis(id) {
      // @Emit("setMoveThis")
      this.setThisFlag = true;
      return id;
    },
    handleMouseMove(e) {
      if (!this.moveFlag) return;
      if (!this.setThisFlag) this.setMoveThis(this.list.id);
      e.preventDefault();
      let x = e.pageX - this.offsetY + 25 * this.list.index;
      let y = e.pageY - this.offsetX + 63 * this.list.row;
        // console.log(x, y, "-------------",e.pageX,e.pageY);
      if (x <= 0) {
        this.x = 0;
      } else {
        this.x = x;
      }
      if (y <= 0) {
        this.y = 0;
      } else {
        this.y = y;
      }
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.x = this.list.x;
    this.y = this.list.y;
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }
}
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  background: #fff;
  width: 50px;
  box-shadow: 2px -1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  text-align: center;
  height: 63px;
}
.pokerback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  p {
    border-radius: 5px;
    width: 88%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 88%;
    background: linear-gradient(130deg, #10c7e7 50%, #0db3dd 50%);
    color: #fff;
  }
}
.PokerCard {
  cursor: grab;
  padding: 8px 5px 10px;
  font-size: 25px;
  i {
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 50%
      );
    }
  }
  &.red {
    color: #d81313;
  }
  p {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    i {
      font-size: 18px;
    }
    span {
      font-family: sans-serif;
      font-weight: 900;
      width: 16px;
      text-align: center;
      &.ten {
        letter-spacing: -3.5px;
        margin-left: -5px;
      }
    }
  }
}
</style>
