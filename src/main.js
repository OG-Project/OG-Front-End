import './assets/main.css'

import { createApp } from 'vue'
import { createPinia,setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import Button from "primevue/button"
import 'primevue/resources/themes/lara-light-teal/theme.css'
import Calendar from 'primevue/calendar';
import "primevue/resources/themes/lara-light-purple/theme.css";
import  draggable  from 'vuedraggable'
import VueDragscroll from "vue-dragscroll";
import  VueColor  from '@ckpack/vue-color';


const app = createApp(App)
export const pinia = createPinia()
setActivePinia(pinia)
app.use(VueColor)
app.use(pinia)
app.use(router)
app.use(PrimeVue);
app.use(draggable)
app.use(VueDragscroll);

app.component('Button', Button);
app.component('Calendar', Calendar);
app.mount('#app')