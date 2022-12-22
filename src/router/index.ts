import {createRouter, createWebHistory} from 'vue-router';
import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: HomePage},
        {path: '/about', name: 'aboyt', component: AboutPage},

        {path: '/characters', name: 'characters', component: () => import('@/characters/layout/Layout.vue')},

        {path: '/:pathMatch(.*)*', redirect: () => ({name: 'home'})},
    ]
});

export default router;