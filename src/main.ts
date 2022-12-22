import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from "@/router";
import {VueQueryPlugin} from "@tanstack/vue-query";

const app = createApp(App);


VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 120, //2 minutes,
                refetchOnReconnect: 'always',
                retry: false,
            },
        }
    },
});

app.use(router);

app.mount('#app')
