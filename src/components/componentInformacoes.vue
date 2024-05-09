<template>
        <div class="w-[75vw] h-[92vh] flex flex-col  ">
                <div style="
                font-family:var(--fonteTitulo);
                font-size: var(--fonteTituloTamanho);">
                        <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">{{ $t('informacoes.Informações') }}</h1>
                </div>
                <div style="
                font-family: var(--fonteCorpo); 
                font-size: var(--fonteCorpoTamanho);" 
                class="flex justify-center w-full  sm:flex-wrap  gap-8">
                        <div class="flex flex-col 2xl:w-max md:w-[493px] sm:w-[493px] gap-y-10">
                                <div class="flex items-center justify-between gap-5 ">
                                        <span class="">{{ $t('informacoes.Nome') }}</span>
                                        <Input 
                                        styleInput="input-transparente-claro" 
                                        :conteudoInput="$t('informacoes.Nome')" 
                                        v-model="nome"
                                        :desabilitado="!editar.valueOf()"
                                        tipo="obrigatorio"
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                nome.value=e
                                        }"
                                        />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="">{{ $t('informacoes.Username') }}</span>
                                        <Input 

                                        styleInput="input-transparente-claro-grande" 
                                        :conteudoInput="$t('informacoes.Username')"
                                        :desabilitado="!editar.valueOf()" 
                                        v-model="PerfilStore.username" 
                                        tipo="obrigatorio" 
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                PerfilStore.username=e
                                                }"
                                         />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">{{ $t('informacoes.E-mail') }}</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        :conteudoInput="$t('informacoes.E-mail')"
                                        :desabilitado="!editar.valueOf()" 
                                        v-model="PerfilStore.email" 
                                        tipo="obrigatorio"
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                PerfilStore.email=e
                                                }"
                                        />
                                </div>
                        </div>
                        
                        <div class="flex flex-col 2xl:w-max sm:w-[493px] gap-y-10">
                                <div class="flex justify-between items-center gap-5">
                                        <span class="">{{ $t('informacoes.Sobrenome') }}</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        :conteudoInput="$t('informacoes.Sobrenome')"
                                        :desabilitado="!editar.valueOf()"
                                        v-model="PerfilStore.sobrenome" 
                                        tipo="obrigatorio"
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                PerfilStore.sobrenome=e
                                        }"
                                        />
                                </div>
                                <!-- @updateModelValue -->
                                <div class="flex justify-between items-center gap-5">
                                        <span class="">{{ $t('informacoes.Data de Nascimento') }}</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        :conteudoInput="$t('informacoes.Data de Nascimento')" 
                                        v-model="PerfilStore.dataDeNascimento" 
                                        tipo="date"
                                        :desabilitado="!editar.valueOf()"
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                PerfilStore.dataDeNascimento=e
                                        }"
                                        />
                                </div>
                                
                        </div>
                </div>
                <!-- conferir se de fato vamos usar isso de alteração -->
                <div class="flex justify-end mr-[15%] mt-[23%]">
                        <Botao v-if="!editar" 
                        :funcaoClick="alterarInformacoes" 
                        preset="PadraoRoxo" 
                        :texto="$t('informacoes.Editar E-mail')" 
                        tamanhoDaBorda="2px" 
                        tamanhoDaFonte="2.0vh" />
                        <Botao v-else 
                        :funcaoClick="alterarInformacoes" 
                        preset="PadraoRoxo" 
                        :texto="$t('informacoes.Confirmar Edição')" 
                        tamanhoDaBorda="2px" 
                        tamanhoDaFonte="2.0vh" />
                </div>
        </div>
</template>

<script setup>
import Input from '../components/Input.vue'
import Botao from '../components/Botao.vue'
import VueCookies from "vue-cookies";
import {perfilStore} from '../stores/perfilStore'
import { ref, onMounted, onBeforeMount, onUpdated, watch } from 'vue';
import { Usuario } from '../models/usuario';
import { storeToRefs } from 'pinia';
import {conexaoBD} from '../stores/conexaoBD.js'
const PerfilStore=perfilStore()
const {fonteTitulo} = storeToRefs(PerfilStore)
const {fonteCorpo} = storeToRefs(PerfilStore)
const conexao=conexaoBD()
// console.log(conexao

let nome=ref('')
let usuario=ref({})
let editar=ref(false)

function alterarInformacoes(){
        console.log(nome.value)
        console.log(PerfilStore.email)
        console.log(PerfilStore.username)
        console.log(PerfilStore.sobrenome)
        console.log(PerfilStore.dataDeNascimento)
        usuario.value.email=PerfilStore.email
        usuario.value.username=PerfilStore.username
        usuario.value.sobrenome=PerfilStore.sobrenome
        usuario.value.dataNascimento=PerfilStore.dataDeNascimento
        editar.value=!editar.value

}
onBeforeMount(async ()=>{
        // usuarioCookie DE TESTE, DESCOMENTAR PARA SETAR NO COOKIE

        // VueCookies.set("IdUsuarioCookie",JSON.stringify(6),"30d")
        let id=JSON.parse(VueCookies.get("IdUsuarioCookie"))
        console.log(id)
        usuario.value = await conexao.buscarUm(id,'/usuario')
        console.log(usuario)
        // erros pelo fato do cookie
        PerfilStore.nome=usuario.value.nome
        nome.value=PerfilStore.nome
        PerfilStore.sobrenome=usuario.value.sobrenome
        console.log('oi')
        
        PerfilStore.email=usuario.value.email
        PerfilStore.username=usuario.value.username
        let data=new Date(usuario.value.dataNascimento).toLocaleDateString()
        data=data.split('/').reverse().join('-')
        PerfilStore.dataDeNascimento=data
})
onMounted(()=>{

})
onUpdated(()=>{
        console.log(PerfilStore.el)
        console.log('update')        
})
</script>

<style scoped>

</style>