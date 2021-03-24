<template>
  <div class="draggableTable tableWrap">
    <table>
        <thead>
          <tr>
            <th>{{languageConfig.common_sele}}</th>
            <th>{{languageConfig.common_inTitle}}</th>
            <th>{{languageConfig.common_amtR}}</th>
            <th>{{languageConfig.common_accAmt}}</th>
            <th>{{languageConfig.sys_t78}}</th>
            <th>{{languageConfig.common_status}}</th>
            <th>{{languageConfig.common_optor}}</th>
            <th>{{languageConfig.common_drag}}</th>
            <th>{{languageConfig.common_uptime}}</th>
            <th>{{languageConfig.common_ope}}</th>
          </tr>
        </thead>
        <template>
        <draggable
          v-model="data"
          :element="'tbody'"
          @start="drag = true"
          @end="drag = false"
          @change="updateData"
          draggable=".dra"
        >
          <tr v-for="(item, i) in data" :key="i" :class="[{'dra':setRute(depositType.add)}]">
            <td>
              <input type="checkbox" @click="selectThis(item.depositId)" 
              :value="item.depositId" v-model="checks" :disabled="!setRute(depositType.add)"/>  
            </td>
            <td>{{ item.msgName }}</td>
            <td>{{ item.amountLimitStart||item.rechargeLimitStart }}~{{ item.amountLimitEnd||item.rechargeLimitEnd }}</td>
            <td>{{ item.sumRechargeAmount||0 }}/{{ item.rechargeLimitDay }}</td>
            <td class="rChose">
              <div class="levelItem">
                <label class="checkAll" :for="`chkAll${i}`" v-if="setRute(depositType.add)">
                  <input
                    type="checkbox"
                    :id="`chkAll${i}`"
                    :checked="levels.length==item.userLevel.length"
                    @click="checkAllLevel(item)"
                  />
                  {{languageConfig.common_seleAll}}
                </label>
                <div  >
                  <span v-for="(lev, l) in levels" :key="l" class="checkBocText">
                    <input
                      type="checkbox" 
                      :id="`leveal${i}_${l}`"
                      name="pType"
                      :value="lev.userLevelId"
                      v-model="item.userLevel"
                      :disabled="!setRute(depositType.add)"
                      @change="updateData"/>
                    <label :for="`leveal${i}_${l}`" :disabled="!setRute(depositType.add)">{{ lev.levelName }}</label>
                  </span>
                </div>
              </div>
            </td>
            <td :class="[{'red':item.status!=1}]">
              {{ setStatus(item.status) }}
              <p v-if="item.status==2">{{languageConfig.sys_t79}}</p>
            </td>
            <td>{{ item.optUser }}</td>
            <td><icon name="gesture_drag-up-down" :class="[{'disabled':!setRute(depositType.add)}]"/></td>
            <td>{{common.formatUnixTime(item.updateTime)}}</td>
            <td>
              <a @click="addPopup(item)">{{setRute(depositType.add)?languageConfig.common_edit:languageConfig.common_view}}</a>
              <a :class="[{'red':item.status!=1}]" @click="changeStatus(item)" v-if="setRute(depositType.add)">{{item.status!=1?languageConfig.common_on:languageConfig.common_off }}</a>
              <a @click="delPopup(item.depositId)" v-if="setRute(depositType.add)">{{languageConfig.common_del}}</a>
            </td>
          </tr>
        </draggable>
      </template> 
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
export default {
  props:['dataList','levels','checks','depositType'],
  components: {
    draggable
  },
  data() {
    return {
      popup:false,
      popupData:{},
      data:[],
    }
  },
  computed: {
    ...mapState(["isMaster", "channelSelected", "config",'userName','languageConfig']),
    enableList: {
      get() {
        return this.data;
      },
      set(val) {
        this.$emit("updateData", val);
      }
    }
  },
  methods: {
    setRute(val){
      return this.adminUse.getPermission(val,this.$route.path)
    },
    updateData(){
      this.$emit("updateData", this.data);
    },
    addPopup(item){
      this.$emit("addPopup",item);
    },
    delPopup(id){
      this.$emit("delPopup", id);
    },
    checkAllLevel(item){
      let useLevelList=[]
      if (this.levels.length!=item.userLevel.length) {
        this.levels.forEach(element => {
          useLevelList.push(element.userLevelId)
        });
      }
      item.userLevel=useLevelList
      this.updateData();
    },
    changeStatus(item){
      this.$emit('changeStatus',item)
    },
    setStatus(status){
      return status==1?this.languageConfig.common_setup:this.languageConfig.common_susp
    },
    selectThis(i){
      this.$emit("selectThis", i);
    },
    showPopup(val,item){
      this.popupData=item
      this.popup=!this.popup
    }
  },
  watch: {
    dataList(){
      this.data=this.dataList
    }
  }
};
</script>


