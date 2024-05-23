<template>
    <div class="w-[75vw] h-[92vh] flex flex-col max-md:items-center  max-md:w-full">
        <div class="flex flex-row w-full items-center">
            <div @click="router.push('/perfil')" v-if="screenWidth < 1024" class="w-[15%] flex items-center   justify-center max-mobileGrande:w-[30%]">
                <flechaMobilePerfil class=""></flechaMobilePerfil>
            </div>
            <h1  style="font-family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);"
                class="m-[5%] border-b-4 border-[#CCC4CF] p-4 pr-32 
                w-max max-sm:w-[80%] mobile:w-[50%]  max-miniMobile:pr-8 max-miniMobile:mb-8 max-mobile:pr-14 max-mobile:mb-6 ">
                {{ $t('privacidade.Privacidade') }}
            </h1>

        </div>
        <div class=" flex ml-32 max-md:ml-0">
            <div class="flex justify-start">
                <div style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                    class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span class="">
                            {{ $t('privacidade.Permitir que visualizem seu email') }}
                        </span>
                        <CheckBox :key="isVisualizaEmail.valueOf()" :checked="gerarBooleano('visualizacaoEmail')"
                            tipo="toggle" el-id="visualizacaoEmail" @envia-valor="visualizacaoEmail($event)" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="">
                            {{ $t('privacidade.Permitir que visualizem suas equipes') }}
                        </span>
                        <CheckBox :key="isVisualizaEquipes.valueOf()" :checked="gerarBooleano('visualizacaoEquipes')"
                            tipo="toggle" el-id="visualizacaoEquipes" @envia-valor="visualizacaoEquipes($event)" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="">
                            {{ $t('privacidade.Permitir que visualizem seu perfil') }}
                        </span>
                        <CheckBox :key="isVisualizaPerfil.valueOf()" :checked="gerarBooleano('visualizacaoPerfil')"
                            tipo="toggle" el-id="visualizacaoPerfil" @envia-valor="visualizacaoPerfil($event)" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import CheckBox from '../components/checkBox.vue'
import VueCookies from 'vue-cookies';
import { perfilStore } from '../stores/perfilStore';
import { conexaoBD } from '../stores/conexaoBD.js';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Usuario } from '../models/usuario';
import flechaMobilePerfil from '../assets/flecha-mobile-perfil.vue'
import { onUpdated } from 'vue';
import router from '../router';

const perfil = perfilStore()
const conexao = conexaoBD()
const { fonteTitulo } = storeToRefs(perfil)
const { fonteCorpo } = storeToRefs(perfil)
let usuario = ref()
let isVisualizaEmail = ref(false)
let isVisualizaEquipes = ref(false)
let isVisualizaPerfil = ref(false)
let isVisualizaProjetos = ref(false)
const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})

onUpdated(()=>{
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    if(screenWidth.value>=1024){
        router.push('/perfil/privacidade')
    }
})

function visualizacaoProjeto(valor) {
    console.log(valor);
    perfil.isVisualizacaoProjeto = valor.valor
    usuario.value.configuracao.isVisualizaProjetos =
        perfil.isVisualizacaoProjeto
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('isVisualizacaoProjeto',JSON.stringify(perfil.isVisualizacaoProjeto))
}

function visualizacaoEquipes(valor) {
    console.log(valor);
    perfil.isVisualizacaoEquipe = valor.valor
    usuario.value.configuracao.isVisualizaEquipes =
        perfil.isVisualizacaoEquipe
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('isVisualizacaoEquipe',JSON.stringify(perfil.isVisualizacaoEquipe))

}

function visualizacaoEmail(valor) {
    console.log(valor);
    perfil.isVisualizacaoEmail = valor.valor
    usuario.value.configuracao.isVisualizaEmail =
        perfil.isVisualizacaoEmail
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('isVisualizacaoEmail',JSON.stringify(perfil.isVisualizacaoEmail))
}

function visualizacaoPerfil(valor) {
    console.log(valor);
    perfil.isVisualizacaoPerfil = valor.valor
    usuario.value.configuracao.isVisualizaPerfil =
        perfil.isVisualizacaoPerfil
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('isVisualizacaoEmail',JSON.stringify(perfil.isVisualizacaoEmail))
}

function gerarBooleano(id) {
    console.log(id);
    if (id == 'visualizacaoPerfil') {
        return isVisualizaPerfil.value
    } else if (id == 'visualizacaoEquipes') {
        return isVisualizaEquipes.value
    } else if (id == 'visualizacaoEmail') {
        return isVisualizaEmail.value
    } else if (id == 'visualizacaoProjeto') {
        return isVisualizaProjetos.value
    }

}
onBeforeMount(async () => {


})

onMounted(async () => {
    usuario.value =
        await conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')), '/usuario')
    console.log(usuario.value.configuracao);
    isVisualizaEmail.value = usuario.value.configuracao.isVisualizaEmail
    isVisualizaEquipes.value = usuario.value.configuracao.isVisualizaEquipes
    isVisualizaPerfil.value = usuario.value.configuracao.isVisualizaPerfil
    isVisualizaProjetos.value = usuario.value.configuracao.isVisualizaProjetos
    console.log(isVisualizaProjetos.value);
    console.log(isVisualizaPerfil.value);
    console.log(isVisualizaEquipes.value);
    console.log(isVisualizaEmail.value);
    VueCookies.config('30d')
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})
</script>

<style scoped></style>