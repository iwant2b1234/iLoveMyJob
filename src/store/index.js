import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
      user:state.user,
    })
})

function initialState () {
  return {
    user:{},//用户状态
  }
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    // isLogin(state) {
    //     return !!state.user.userName
    // },
  },
  mutations: {
    resetState(state) {
        const s = initialState();
        const keep = [
          'user',
        ];
        Object.keys(s).forEach(key => {
          if (!keep.includes(key)) {
            state[key] = s[key];
          }
        });
    },
    updateUser(state, val){
      state.user = val;
    },
    switchLoading(state, boolean) {
      state.loadingKeep = boolean
    },
  },
  actions,
  plugins: [vuexLocal.plugin]
})
