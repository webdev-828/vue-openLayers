import Vue from 'vue'
import Router from 'vue-router'
import OpenLayers from '@/components/OpenLayers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OpenLayers',
      component: OpenLayers
    }
  ]
})
