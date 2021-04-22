import { createApp } from 'vue'
import App from './App.vue'
import {createWebHashHistory, createRouter} from "vue-router"

// Router
//import router from './router'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/series',
        name: 'Series',
        component: () => import('./views/SeriesHomepage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')