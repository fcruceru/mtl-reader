import { createApp } from 'vue'
import App from './App.vue'
//import Vue from 'vue'

//import VueRouter from 'vue-router'
// Router
import router from './router'
router.routes = [
    {
        path: '/series',
        name: 'series',
        component: import('./views/SeriesHomepage.vue')
    }
]


createApp(App).use(router).mount('#app')
