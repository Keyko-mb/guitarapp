import MainPage from "@/pages/MainPage.vue";
import SongsPage from "@/pages/SongsPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ChordsPage from "@/pages/ChordsPage.vue";
import AuthorsPage from "@/pages/AuthorsPage.vue";
import AccountPage from "@/pages/AccountPage.vue";
import SongPage from "@/pages/SongPage.vue";
import AdminPage from "@/pages/AdminPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/songs',
        component: SongsPage
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
    {
        path: '/song/1',
        component: SongPage
    },
    {
        path: '/admin',
        component: AdminPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;