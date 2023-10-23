import MainPage from "@/pages/MainPage.vue";
import SongPage from "@/pages/SongsPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ChordsPage from "@/pages/ChordsPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/songs',
        component: SongPage
    },
    {
        path: '/chords',
        component: ChordsPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;