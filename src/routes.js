import Login from './components/Login.vue';
import Album from './components/Album.vue';


export const routes = [
    { path: '', name: 'Login', component: Login, titulo: 'Login', menu: true},
    { path: '/album', name: 'Album', component: Album, titulo: 'Album', menu: true},
];