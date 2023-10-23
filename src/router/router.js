import MainPage from "@/pages/MainPage.vue";
import SongPage from "@/pages/SongsPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ChordsPage from "@/pages/ChordsPage.vue";
import AuthorsPage from "@/pages/AuthorsPage.vue";
import AccountPage from "@/pages/AccountPage.vue";

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
    {
        path: '/authors',
        component: AuthorsPage
    },
    {
        path: '/account',
        component: AccountPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;