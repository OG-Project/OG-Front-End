<template>
    <div class="w-[75vw] h-[92vh] flex flex-col  ">
        <div>
            <h1 style="font-family:var(--fonteTitulo);" class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Privacidade
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div style="font-family:var(--fonteCorpo);" class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span 
                        class="text-xl">
                        Permitir que visualizem seus projetos
                        </span>
                        <CheckBox 
                        :checked="gerarBooleano(usuario.value.configuracao.isVisualizacaoProjeto)" 
                        tipo="toggle" 
                        el-id="visualizacaoProjeto" 
                        @envia-valor="visualizacaoProjeto($event)" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span 
                        class="text-xl">
                        Permitir que visualizem seu email
                        </span>
                        <CheckBox 
                        :checked="gerarBooleano(usuario.value.configuracao.isVisualizacaoEmail)" 
                        tipo="toggle" 
                        el-id="visualizacaoEmail" 
                        @envia-valor="visualizacaoEmail($event)" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span 
                        class="text-xl">
                        Permitir que visualizem suas equipes
                        </span>
                        <CheckBox 
                        :checked="gerarBooleano(usuario.value.configuracao.isVisualizacaoEquipe)" 
                        tipo="toggle" 
                        el-id="visualizacaoEquipes" 
                        @envia-valor="visualizacaoEquipes($event)" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span 
                        class="text-xl">
                        Permitir que visualizem seu perfil
                        </span>
                        <CheckBox 
                        :checked="gerarBooleano(usuario.value.configuracao.isVisualizacaoPerfil)" 
                        tipo="toggle" 
                        el-id="visualizacaoPerfil" 
                        @envia-valor="visualizacaoPerfil($event)" />
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
import { onBeforeMount, onMounted,ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Usuario } from '../models/usuario';
const perfil = perfilStore()
const conexao=conexaoBD()
const {fonteTitulo} = storeToRefs(perfil)
const {fonteCorpo} = storeToRefs(perfil)
let usuario=ref()
let isVisualizacaoEmail
let isVisualizacaoEquipe
let isVisualizacaoPerfil
let isVisualizacaoProjeto

function visualizacaoProjeto(valor){    
    perfil.isVisualizacaoProjeto=valor.valor
    usuario.value.configuracao.isVisualizacaoProjeto=
    perfil.isVisualizacaoProjeto
    conexao.atualizar(usuario.value,'/usuario')
    VueCookies.set('isVisualizacaoProjeto',JSON.stringify(perfil.isVisualizacaoProjeto))
}
function visualizacaoEquipes(valor){
    perfil.isVisualizacaoEquipe=valor.valor
    usuario.value.configuracao.isVisualizacaoEquipe=
    perfil.isVisualizacaoEquipe
    conexao.atualizar(usuario.value,'/usuario')
    VueCookies.set('isVisualizacaoEquipe',JSON.stringify(perfil.isVisualizacaoEquipe))

}
function visualizacaoEmail(valor){
    perfil.isVisualizacaoEmail=valor.valor
    usuario.value.configuracao.isVisualizacaoEmail=
    perfil.isVisualizacaoEmail
    conexao.atualizar(usuario.value,'/usuario')
    VueCookies.set('isVisualizacaoEmail',JSON.stringify(perfil.isVisualizacaoEmail))
}
function visualizacaoPerfil(valor){
    perfil.isVisualizacaoPerfil=valor.valor
    usuario.value.configuracao.isVisualizacaoPerfil=
    perfil.isVisualizacaoPerfil
    conexao.atualizar(usuario.value,'/usuario')
    VueCookies.set('isVisualizacaoEmail',JSON.stringify(perfil.isVisualizacaoEmail))
}

function gerarBooleano(boolean){
    if(boolean=="true"){
        console.log('foi booleano '+ boolean)
        return 1
    }else if(boolean=="false"){
        console.log('foi booleano '+ boolean)
        return 0
    }
}
onBeforeMount(async()=>{
    

})
onMounted(async()=>{
    usuario.value=
        await conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')),'/usuario')
        
    VueCookies.config('30d')
})
</script>

<style scoped>

</style>