import Vue from 'vue';
import VueRouter from 'vue-router';

import examplePage from './example';
import exampleFormPage from './example-form';

Vue.use(VueRouter);

const router = new VueRouter({
    history: false,
    routes: [
        {
            path: '/example',
            name: 'example',
            component: examplePage
        },
        {
            path: '/example-form',
            name: 'example-form',
            component: exampleFormPage
        },
        {
            path: '/',
            redirect: '/example'
        }
    ]
});

export default router;
