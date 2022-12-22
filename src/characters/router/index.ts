import type {RouteRecordRaw} from "vue-router";
import Layout from "@/characters/layout/Layout.vue";
import CharacterId from "@/characters/pages/CharacterId.vue";
import CharacterList from "@/characters/pages/CharacterList.vue";
import CharacterSearch from "@/characters/pages/CharacterSearch.vue";

export const charactersRoute: RouteRecordRaw = {
    path: '/characters',
    component: () => import('@/characters/layout/Layout.vue'),
    redirect: '/characters/list',
    children: [
        {path: 'by/id', name: 'character-id', component: CharacterId, props: {title: 'By Id', visible: false}},
        {path: 'list', name: 'character-list', component: CharacterList, props: {title: 'All Characters', visible: true}},
        {path: 'search', name: 'character-search', component: CharacterSearch, props: {title: 'Search', visible: true}},
    ],
}