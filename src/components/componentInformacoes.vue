<template>
        <div class="w-[1400px] h-[877px] flex flex-col  ">
                <div>
                        <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">Informações</h1>
                </div>
                <div class="flex justify-center gap-8">
                        <div class="flex flex-col gap-y-10">
                                <div class="flex items-center justify-between gap-5 ">
                                        <span class="text-xl">Nome</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Nome" 
                                        v-model="PerfilStore.nome" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">Username</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Username" 
                                        v-model="PerfilStore.username" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">E-mail</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="E-mail" 
                                        v-model="PerfilStore.email" 
                                        tipo="obrigatorio" />
                                </div>
                                
                               
                        </div>
                        
                        <div class="flex flex-col gap-y-10">
                                <div class="flex justify-between items-center gap-5">
                                        <span class="text-xl">Sobrenome</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Sobrenome" 
                                        v-model="PerfilStore.sobrenome" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex justify-between items-center gap-5">
                                        <span class="text-xl">Data de Nascimento</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Data de Nascimento" 
                                        v-model="PerfilStore.dataDeNascimento" 
                                        tipo="obrigatorio" />
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
// import VueCookies from "vue-cookies";
import {perfilStore} from '../stores/perfilStore'
import { ref, onMounted } from 'vue';
// let usuario= VueCookies.get("usuarioCookie")
const PerfilStore=perfilStore()

PerfilStore.nome
let editar=ref(false)

function alterarEmail(){
        editar.value=!editar.value
        if(editar.value){
                PerfilStore.alteraInformacoes(PerfilStore.email)
        }
        console.log("altera")
}
onMounted(()=>{
        // erros pelo fato do cookie
// PerfilStore.nome=usuario.nome
// PerfilStore.sobrenome=usuario.sobrenome
// PerfilStore.email=usuario.email
// PerfilStore.username=usuario.username
// PerfilStore.dataDeNascimento=usuario.dataDeNascimento

})
</script>

<style scoped>

</style>