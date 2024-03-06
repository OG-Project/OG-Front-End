<template>
    <alterarSenha v-if="popUpSenha"></alterarSenha>
    <alterarEmail v-if="popUpEmail"></alterarEmail>
    <div class="flex justify-center">
        <div class="flex  flex-col items-center w-[443px] h-[877px] drop-shadow-md bg-[#FEFBFF]">
            <div class="w-[329px] rounded-full h-[329px] mt-10 mb-16 bg-emerald-400"></div>
            <div class=" flex flex-col gap-10">
                <Botao :funcaoClick="informacao" preset="PadraoRoxo" texto="Informações" tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                <Botao :funcaoClick="seguranca" preset="PadraoRoxo" texto="Segurança" tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                <Botao :funcaoClick="acessibilidade" preset="PadraoRoxo" texto="Acessibilidade" tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                <Botao :funcaoClick="privacidade" preset="PadraoRoxo" texto="Privacidade" tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                <Botao :funcaoClick="aparencia" preset="PadraoRoxo" texto="Aparência" tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
            </div>
        </div>

        <div>
            <Transition name="slide-fade" mode="out-in">
                <router-view />
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore';
import Botao from '../components/Botao.vue'
import router from '../router';
import alterarEmail from '../components/alterarEmail.vue';
import alterarSenha from '../components/alterarSenha.vue';
// import { funcaoPopUpStore } from '../stores/funcaoPopUp';
// let funcaoPopUp=funcaoPopUpStore()

const perfil = perfilStore()
const { popUpSenha, popUpEmail } = storeToRefs(perfil)

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

}
function privacidade() {
    router.push({ name: 'Privacidade' })

}
function aparencia() {
    router.push({ name: 'Aparencia' })

}
</script>

<style scoped>
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