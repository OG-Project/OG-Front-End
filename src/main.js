import './assets/main.css'

import { createApp } from 'vue'
import { createPinia,setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import Button from "primevue/button"
import 'primevue/resources/themes/lara-light-teal/theme.css'
import Calendar from 'primevue/calendar';
import "primevue/resources/themes/lara-light-purple/theme.css";
import Chines from './locales/ch.json';
import Portugues from './locales/pt-br.json';
import Ingles from './locales/en.json';
import Espanhol from './locales/es.json';
import Japones from './locales/jp.json';
import Russo from './locales/ru.json';
import draggable from "vuedraggable";
import VueDragscroll from "vue-dragscroll";
import  VueColor  from '@ckpack/vue-color';
import VueDatePicker from '@vuepic/vue-datepicker';
import VueSocketIO from 'vue-socket.io'
import '@vuepic/vue-datepicker/dist/main.css'

const i18n = createI18n({
    legacy: false,
    locale: 'jp',
    fallbackLocale: 'pt-BR',
    messages: {
        'pt-BR': Portugues,
        'en': Ingles,
        'es': Espanhol,
        'zh': Chines,
        'jp': Japones,
        'ru': Russo
    }
});


const app = createApp(App)
export const pinia = createPinia()
setActivePinia(pinia)
app.use(VueColor)
app.use(pinia)
app.use(router)
app.use(PrimeVue);
app.use(draggable)
app.use(VueDragscroll);
app.use(i18n);
app.component('VueDatePicker', VueDatePicker);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.mount('#app')