<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import VueCookies from "vue-cookies";
import Navbar from '@/components/Navbar.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
const perfil=perfilStore()
const {isVlibras}=storeToRefs(perfil);
let url= window.location.href;

const route = useRoute();
// let ativado='';
// watch(ativado,async (newValue,oldValue)=>{
//   ativado.value=newValue
//   console.log(ativado)
//   console.log(newValue)
//   console.log(oldValue)
  
// })
// onMounted(()=>{
// ativado=ref(VueCookies.get('isVlibras'))
// })
var estaNoLogin = ref(true)
watch(() => route.path, (newPath, oldPath) => {
  if(route.path == '/login'){
    estaNoLogin.value = true
  }else{
    estaNoLogin.value = false
  }
});

</script>

<template>
    <Navbar v-show="!estaNoLogin" />
    <RouterView />
    <div v-show="isVlibras || VueCookies.get('isVlibras') === 'true'">
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>


