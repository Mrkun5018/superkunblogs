import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../components/Index.vue'
import Detail from "../components/Details.vue"
import Menu from '../components/Menu.vue'
import Editor from "../components/Editor.vue"

const routes: any[] = [
    { path: '/', component: Index },
    { path: '/menu', component: Menu },
    { path: '/details', component: Detail },
    { path: '/editor', component: Editor }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;