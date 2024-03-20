<template>
    <div class="w-[75vw] h-[92vh] flex flex-col">
        <div>
            <h1 :style="{fontFamily:fonteTitulo}" class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Segurança
            </h1>
        </div>
        <div :style="{fontFamily:fonteCorpo}" class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center sm:flex-wrap gap-8">
                        <div class="text-2xl w-[470px]">
                            Ao alterar a senha, a gente mantém você conectado
                            a este dispositivo, mas é possível que sua conta
                            seja desconectada de outros dispositivos.
                        </div>
                        <Botao 
                        :funcaoClick="abrePopUp" 
                        :parametrosFuncao="['senha']" 
                        preset="PadraoRoxo" 
                        texto="Alterar Senha">
                        </Botao>
                    </div>
                    <div class="flex items-center sm:flex-wrap gap-8">
                        <div class="gap-5">
                            <div class="text-2xl w-[470px]">
                                Seu endereço de e-mail atual é <span class="text-roxo">{{email}}</span>
                            </div>
                            <div v-if="isLogadoGoogle" class="text-2xl w-[470px]">
                                Login com a conta do Google ativado
                                Conta conectada
                                Sua conta está conectada a uma conta do Google. 
                                Alterar o endereço de e-mail aqui vai
                                desconectar a conta do Google.
                            </div>
                        </div>
                        <Botao 
                        :funcaoClick="abrePopUp" 
                        :parametrosFuncao="['email']" 
                        preset="PadraoRoxo" 
                        texto="Alterar E-mail">
                        </Botao>
                    </div>
                    <!-- tudo errado, arrumar -->
                    <!-- <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Alterar E-mail</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Altera E-mail" 
                        v-model="email" 
                        tipo="obrigatorio" />
                    </div> -->
                    <!-- <alteraSenha v-if="PerfilStore.popUpSenha"></alteraSenha>
                   <alterarEmail v-if="PerfilStore.popUpEmail"></alterarEmail>  -->
                </div>
            </div>
        </div>
        <div :style="{fontFamily:fonteCorpo}" class="flex items-center justify-between ml-[10%] mr-[15%] mt-[17%]">
            <span>Deseja deletar sua Conta?</span>
        </div>
        
    </div>
</template>

<script setup>
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import { perfilStore } from '../stores/perfilStore'
import Input from '../components/Input.vue'
import Botao from './Botao.vue';
import VueCookies from "vue-cookies";
import alteraSenha from './alterarSenha.vue'
import { onMounted, ref } from 'vue';
import alterarEmail from './alterarEmail.vue';
import { storeToRefs } from 'pinia';
import { conexaoBD } from '../stores/conexaoBD';
const PerfilStore = perfilStore()
const conexao=conexaoBD()
const {fonteTitulo} = storeToRefs(PerfilStore)
const {fonteCorpo} = storeToRefs(PerfilStore)
const {tamanhoTitulo} = storeToRefs(PerfilStore)
const {tamanhoCorpo} = storeToRefs(PerfilStore)

// FAZER A INTEGRAÇÃO COM BANCO E 
// ATUALIZAR EMAIL E SENHA DO USUARIO DO COOKIE

let funcaoPopUp=funcaoPopUpStore()
let usuario;

let isLogadoGoogle=false;
let popUpSenha=ref(false);
let popUpEmail=ref(false);

let email=ref('');

onMounted(async ()=>{
    usuario= await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'),'/usuario')
    console.log(usuario)
    email.value=usuario.email
})

function abrePopUp(tipo){
console.log(tipo)
if (tipo[0] == 'senha') {
 
    PerfilStore.popUpSenha = true;
    PerfilStore.popUpEmail = false;

} else {
    PerfilStore.popUpEmail = true;
    PerfilStore.popUpSenha = false;
}

funcaoPopUp.abrePopUp()

}


</script>

<style lang="scss" scoped></style>