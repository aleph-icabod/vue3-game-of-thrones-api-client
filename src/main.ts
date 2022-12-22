import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from "@/router";
import {VueQueryPlugin} from "@tanstack/vue-query";

const app = createApp(App);

app.use(VueQueryPlugin);

app.use(router);

app.mount('#app')
