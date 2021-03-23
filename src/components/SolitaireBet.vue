<template>
  <div class="SolitaireBet" ref="SolitaireBet">
    <ul>
      <li v-for="(item, key, i) in cardList" :key="i">
        <PokerCard
          v-for="(list, index) in item"
          :key="index"
          :moveThis="moveThis"
          :list="list"
          @setThisCard="setThisCard"
          @setMoveThis="setMoveThis"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import PokerCard from "../components/PokerCard.vue";
export default {
  components: {
    PokerCard,
  },
  data(){
    return{
      backCardList:[],
      allCard:[],
      card:[],
      moveThis:'',
      row:{}
    }
  },
  computed:{
    cardList() {
      let cardList={}
      let cont = 0;
      for (let i = 0; i < 8; i++) {
        // this.row[`card${i}`] = i * 60;
        cardList[`card${i}`] = [];
        for (let index = 0; index < i + 1; index++) {
          let back = index == i;
          let pos = {
            card: this.card[cont],
            x: i * 60,
            y: index * 30,
            back: !back,
            row: i,
            index: index,
            id: `card${i}-${index}`,
          };
          cardList[`card${i}`].push(pos);
          cont = cont + 1;
        }
      }
      return cardList;
    }
  },
  methods:{
    setThisCard(list) {
      // console.log("11111111111", list);
      Object.keys(this.cardList).forEach((key, i) => {
        if(this.cardList[key][i].id==list.id){
          console.log(this.cardList[key][i],key,i,'444444');
          
        }
        for (let index = 0; index < i; index++) {
          if (
            list.x >= this.cardList[key][i].x - 5 &&
            list.x <= this.cardList[key][i].x + 5
          ) {
            console.log(this.cardList[key][i],'77777777');
            let num = this.cardList[key][i].index + this.cardList[key][i].row;
            console.log(num);
            // this.cardList[]
          }
        }
      });
    },
    setMoveThis(id) {
      this.moveThis = id;
    },
    setAllCard() {
      let arr = ["H", "D", "B", "M"];
      let all = [];
      for (let index = 0; index < arr.length; index++) {
        for (let i = 1; i < 14; i++) {
          all.push(`${arr[index]}${i}`);
        }
      }
      this.allCard = this.shuffle(all);
      this.card = this.allCard;
      // this.backCardList = this.allCard.slice(28, 52);
    },
    shuffle(arr) {
      let i, j, temp;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }
  },
  mounted() {
    this.setAllCard();
    // let table = this.$refs.SolitaireBet;
  }
}
</script>

<style scoped lang="scss">
.SolitaireBet {
  width: 95%;
  height: calc(100% - 72px);
  position: relative;
  margin: 10px auto;
}
ul {
  display: flex;
  width: 70%;
  padding: 10px;
  li {
    width: 14%;
  }
}
</style>
