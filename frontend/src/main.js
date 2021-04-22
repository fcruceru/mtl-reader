import { createApp } from 'vue'
import App from './App.vue'
import { createWebHashHistory, createRouter } from "vue-router"

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
        component: () => import('./views/Series.vue')
    },
    {
        path: '/series/:name',
        name: 'ChapterList',
        component: () => import('./views/ChapterList.vue')
    },
    {
        path: '/series/:name/:index',
        name: 'Reader',
        component: () => import('./views/Reader.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')