<template>
        <div class="w-[75vw] h-[92vh] flex flex-col  ">
                <div :style="{fontFamily:fonteTitulo}">
                        <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">Informações</h1>
                </div>
                <div :style="{fontFamily:fonteCorpo}" class="flex justify-center w-full  sm:flex-wrap  gap-8">
                        <div class="flex flex-col 2xl:w-max md:w-[493px] sm:w-[493px] gap-y-10">
                                <div class="flex items-center justify-between gap-5 ">
                                        <span class="text-xl">Nome</span>
                                        <Input 
                                        styleInput="input-transparente-claro" 
                                        conteudoInput="Nome" 
                                        :modelValue="nome"
                                        v-model="nome"
                                        tipo="obrigatorio"
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                nome=e
                                        }"
                                        />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">Username</span>
                                        <Input 

                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Username" 
                                        v-model="PerfilStore.username" 
                                        tipo="obrigatorio" 
                                        @updateModelValue="(e)=> {
                                                console.log(e)
                                                PerfilStore.username=e
                                                }"
                                         />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">E-mail</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="E-mail" 
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
                                        <span class="text-xl">Sobrenome</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Sobrenome"
                                        modelValue="" 
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
                                        <span class="text-xl">Data de Nascimento</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Data de Nascimento" 
                                        v-model="PerfilStore.dataDeNascimento" 
                                        tipo="obrigatorio"
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
                        :funcaoClick="alterarEmail" 
                        preset="PadraoRoxo" 
                        texto="Editar E-mail" 
                        tamanhoDaBorda="2px" 
                        tamanhoDaFonte="2.0vh" />
                        <Botao v-else 
                        :funcaoClick="alterarEmail" 
                        preset="PadraoRoxo" 
                        texto="Confirmar Edição" 
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

let editar=ref(false)

function alterarEmail(){
        console.log(nome.value)
        console.log(PerfilStore.dataDeNascimento)
        console.log(PerfilStore.email)
        console.log(PerfilStore.username)
        console.log(PerfilStore.dataDeNascimento)
        // Revisar 

        // editar.value=!editar.value
        // if(editar.value){
        //         PerfilStore.alteraInformacoes(PerfilStore.email)
        // }
        // console.log("altera")
}
onBeforeMount(async ()=>{
        // usuarioCookie DE TESTE, DESCOMENTAR PARA SETAR NO COOKIE

        // VueCookies.set("IdUsuarioCookie",JSON.stringify(2))
        let id=JSON.parse(VueCookies.get("IdUsuarioCookie"))
        console.log(id)
        let usuario = await conexao.buscarUm(1,'/usuario')
        console.log(usuario)
        // erros pelo fato do cookie
        PerfilStore.nome=usuario.nome
        nome.value=PerfilStore.nome
        PerfilStore.sobrenome=usuario.sobrenome
        PerfilStore.email=usuario.email
        PerfilStore.username=usuario.username
        PerfilStore.dataDeNascimento=usuario.dataNascimento
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