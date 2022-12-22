import {createRouter, createWebHistory} from 'vue-router';

import {charactersRoute} from "@/characters/router";
import HomePage from "@/shared/pages/HomePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: HomePage},
        {path: '/:pathMatch(.*)*', redirect: () => ({name: 'home'})},
    ]
});

router.addRoute(charactersRoute);
export default router;
