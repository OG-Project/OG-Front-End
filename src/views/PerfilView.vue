<template>
    <alterarSenha v-if="popUpSenha"></alterarSenha>
    <alterarEmail v-if="popUpEmail"></alterarEmail>
    <div class="flex justify-center flex-wrap ">
        <div class="flex  flex-col sm:justify-center md:justify-around items-center w-[20%] h-[92vh] drop-shadow-md bg-[#FEFBFF]">
            <div class=" flex justify-center w-[329px] h-[329px]">
                <img v-if="foto!=null"
                  :src="
                    'data:' + foto.tipo + ';base64,' + foto.dados
                  " 
                  class="shadow-2xl max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] mr-4 ml-4 rounded-full"
                />
                <div v-else class="xl:w-[95%] sm:h-[30%] sm:w-[30%] md:w-[70%] md:h-[70%] rounded-full  xl:h-[95%] bg-emerald-400"></div>
            </div>
            <div class=" flex flex-col gap-10">
                <div @click="informacao()"
                    class="bg-roxo medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-clickBorder 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{'active':identificarRota(route.path,'/perfil/informacoes')}">
                    Informações
                </div>
                <div @click="seguranca()"
                    class="bg-roxo medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-clickBorder 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{'active':identificarRota(route.path,'/perfil/seguranca')}">
                    Segurança
                </div>
                <div @click="acessibilidade()"
                    class="bg-roxo medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-clickBorder 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{'active':identificarRota(route.path,'/perfil/acessibilidade')}">
                    Acessibilidade
                </div>
                <div @click="privacidade()"
                    class="bg-roxo medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-clickBorder 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{'active':identificarRota(route.path,'/perfil/privacidade')}">
                    Privacidade
                </div>
                <div @click="aparencia()"
                    class="bg-roxo medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-clickBorder 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{'active':identificarRota(route.path,'/perfil/aparencia')}">
                    Aparência
                </div>
                
            </div>
        </div>

        <div>
            <Transition name="slide-fade" mode="out-in">
                <router-view />
            </Transition>
        </div>
    </div>
    <!-- background-color: rgb(98, 11, 167); display: flex; justify-content: center; align-items: center; color: rgb(255, 255, 255); font-size: 2vh; -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore';
import Botao from '../components/Botao.vue'
import router from '../router';

import alterarEmail from '../components/alterarEmail.vue';
import alterarSenha from '../components/alterarSenha.vue';
import { onMounted, ref } from 'vue';
import {useRoute} from 'vue-router';
import { VueCookies } from 'vue-cookies';
import { conexaoBD } from '../stores/conexaoBD';
const route=useRoute()
const conexao=conexaoBD()
// import { funcaoPopUpStore } from '../stores/funcaoPopUp';
// let funcaoPopUp=funcaoPopUpStore()
let isSeguActive=ref(false)
const perfil = perfilStore()
const { popUpSenha, popUpEmail } = storeToRefs(perfil)
let usuario
let foto

onMounted(async ()=>{
    console.log(route.path)
    usuario= await conexao.buscarUm(VueCookies.get('IdUsuarioCookies'),'/usuario')
    console.log(usuario)
    foto=usuario.foto
})

function informacao() {

    router.push({ name: 'Informacoes' })
    // router.push('/perfil/informacoes')

    // window.location.href = "//localhost:5173/perfil/informacoes"
}
function acessibilidade() {
    // router.refresh()
    router.push({ name: 'Acessibilidade' })
    // router.push('/perfil/acessibilidade')


}
function seguranca() {
    router.push({ name: 'Seguranca' })

    isSeguActive.value=!isSeguActive.value

}
function privacidade() {
    router.push({ name: 'Privacidade' })

}
function aparencia() {
    router.push({ name: 'Aparencia' })

}

function identificarRota(rotaAtual,rota){
    if(rotaAtual==rota){
        return true
    }
    
    return false
}

    

</script>

<style scoped>
.medioId{
    @apply 2xl:w-[10vw] 2xl:h-[5h] lg:w-[15vw] lg:h-[5vh] xl:w-[14vw] xl:h-[5h] md:w-[18vw] md:h-[5vh] sm:w-[20vw] sm:h-[5vh] 
  }
.active{
    @apply bg-roxoAtencao !important;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}</style>