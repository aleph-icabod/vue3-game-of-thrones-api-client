import {RouterLink} from "vue-router";

export interface RouteLink {
    path: string,
    title: string,
    name: string,
}

export const routeLinks: RouteLink[] = [
    {
        path: '/',
        title: 'Home',
        name: 'home',
    },
    {
        path: '/about',
        title: 'About',
        name: 'about',
    },
    {
        path: '/characters',
        title: 'Characters',
        name: 'characters',
    },
];