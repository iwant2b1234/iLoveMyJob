import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
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
