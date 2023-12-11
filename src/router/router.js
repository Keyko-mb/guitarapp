import MainPage from "@/pages/MainPage.vue";
import SongsPage from "@/pages/SongsPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ChordsPage from "@/pages/ChordsPage.vue";
import AuthorsPage from "@/pages/AuthorsPage.vue";
import AccountPage from "@/pages/AccountPage.vue";
import SongPage from "@/pages/SongPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AuthorPage from "@/pages/AuthorPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SearchPage from "@/pages/SearchPage.vue";
import SignUpPage from "@/pages/RegisterPage.vue";
import {auth as $store} from "@/store/auth.module";
import AccessDenied from "@/pages/AccessDenied.vue";
import NotFound from "@/pages/NotFound.vue";

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
        path: "/song/:uuid",
        component: SongPage,
        props: (router) => ({uuid: router.params.uuid})
    },
    {
        path: "/author/:uuid",
        component: AuthorPage,
        props: (router) => ({uuid: router.params.uuid})
    },
    {
        path: "/search/:searchedLine",
        component: SearchPage,
        props: (router) => ({searchedLine: router.params.searchedLine})
    },
    {
        path: '/admin',
        component: AdminPage,
        meta: { role: 'ROLE_ADMIN' }
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: SignUpPage,
    },
    {
        path: '/access-denied',
        component: AccessDenied
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/404'
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
    const privatePages = ['/account', '/admin'];
    const authRequired = privatePages.includes(to.path);
    const initialState = $store.state;
    // console.log(initialState.status.loggedIn ? initialState.user.access_token : "null")

    if (authRequired) {
        if (!initialState.status.loggedIn) {
            next('/login');
        }
        else {
            if (to.path === '/admin') {
                if (!initialState.status.loggedIn) {
                    next('/login');
                }
                else {
                    const requiredRole = to.meta.role;
                    const userRole = initialState.user.person.role
                    if (requiredRole === userRole){
                        next();
                    }
                    else {
                        next('/access-denied');
                    }
                }
            }
            else {
                next();
            }
        }
    }
    else {
        next();
    }
});

export default router;