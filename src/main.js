import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import axios from 'vue';
import vueAxios from 'vue-axios';

import App from './App.vue'
import FeatureList from './components/FeatureList';
import CommentList from './components/CommentList';
import FormComment from './components/FormComment'


const routes = [
    {
        path: '/', 
        name: 'featureList',
        component: FeatureList
    },
    {
        path: '/comments/:id',
        name: 'commentList',
        component: CommentList
    },
    {
        path: '/newcomment/:id',
        name: 'formComment',
        component: FormComment
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .use(vueAxios,axios)
    .mount('#app')
