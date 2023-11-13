import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import Button from "primevue/button"
import 'primevue/resources/themes/lara-light-teal/theme.css'
import TabMenu from 'primevue/tabmenu';
import Calendar from 'primevue/calendar';
import "primevue/resources/themes/lara-light-purple/theme.css";


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.component('Tabmenu', TabMenu);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.mount('#app')