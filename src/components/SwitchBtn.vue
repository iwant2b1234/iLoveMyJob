<template>
  <div class="switch-button-control" @click="toggle">
    <div class="switch-button" :class="[{ enabled: getData }]">
      <div class="button"></div>
      <span class="on swbtn" v-if="getData">{{languageConfig.common_on}}</span>
      <span class="off swbtn" v-else>{{languageConfig.common_off}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  props: ["value", "disabled", "trueValue", "falseValue"],
  data() {
    return {
      swiVal: ""
    };
  },
  computed: {
    ...mapState(["languageConfig"]),
    getData() {
      if (this.value == undefined) {
        return false;
      }
      if(this.trueValue != undefined && this.falseValue != undefined){
          if(this.trueValue == this.value ){
              return true
          }else{
              return false
          }
      }
      if (this.value == "0") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    toggle() {
      if (this.disabled) {
        return;
      }
      let dataVal;
      if (this.value == "1") {
        //关
        dataVal = "0";
      } else {
        //开
        dataVal = "1";
      }
    if(this.trueValue != undefined && this.falseValue != undefined){
        dataVal = this.value==this.falseValue?this.trueValue:this.falseValue
    }
      this.$emit("input", dataVal);
      this.$emit("change");
    }
  },
  
};
</script>

<style lang="scss">
.switch-button-control {
  width: 65px;
  margin: 0 auto;
}
.switch-button {
  height: 20px;
  width: 65px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  border: 1px solid #c7c7c7;

  &.enabled {
    border: 1px solid #349bc3;
    padding-right: 20px;
    .button {
      background: #349bc3;
      transform: translateX(33px);
      margin-left: 1px;
    }
  }
  .button {
    height: 18px;
    width: 30px;
    border-radius: 5px;
    background: #c7c7c7;
    transition: all 0.2s ease-in-out;
    margin-left: -1px;
  }
  span {
    font-size: 12px;
  }
  .on {
    position: absolute;
    top: 0px;
    line-height: 19px;
    left: 5px;
  }
  .off {
    position: absolute;
    top: 0px;
    right: 4px;
    line-height: 19px;
  }
}
</style>
