import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'hash',
  routes:[
    {
      path: '/Solitaire',
      name: 'Solitaire',
      component: () => import('../views/Solitaire.vue'),
    },
    {
      path: '/',
      name: 'Lobby',
      component: () => import('../views/Lobby.vue'),
    }
  ]
})
router.beforeEach((to, from, next) => {
  // const path = to.path
  next()
})

export default router
