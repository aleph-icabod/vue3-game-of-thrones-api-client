import { createRouter, createWebHistory } from 'vue-router';
import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { charactersRoute } from "@/characters/router";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/about', name: 'aboyt', component: AboutPage },
        { path: '/:pathMatch(.*)*', redirect: () => ({ name: 'home' }) },
    ]
});
router.addRoute(charactersRoute);
export default router;
