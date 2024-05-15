<template>
    <div class="w-[75vw] h-[92vh] flex flex-col">
        <div>
            <h1 style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);" class="m-[5%] border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Segurança
            </h1>
        </div>
        <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);" class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center sm:flex-wrap gap-8">
                        <div class=" w-[470px]">
                            <span class="text-[var(--roxo)]">*</span> Senha com 8 ou mais caracteres.<br>
                            <span class="text-[var(--roxo)]">*</span> Senha contento letras, números e caracteres especiais. <br>
                            <span class="text-[var(--roxo)]">*</span> Não utilize palavras comuns.
                           
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
                            <div class=" w-[470px]">
                                Seu endereço de e-mail atual é <span class="text-[var(--roxo)]">{{email}}</span>
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
         
                </div>
            </div>
        </div>
        <div @click="abrePopUp(['deletar'])" class="flex items-center justify-between ml-[10%] mr-[15%] mt-[17%]"
            style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho)">
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
import { onMounted, ref } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
const PerfilStore = perfilStore()
const conexao=conexaoBD()


let funcaoPopUp=funcaoPopUpStore()
let usuario;

let isLogadoGoogle=false;


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
    PerfilStore.popUpDeletar = false;

} else if(tipo[0]=='email'){
    PerfilStore.popUpEmail = true;
    PerfilStore.popUpSenha = false;
    PerfilStore.popUpDeletar = false;
}else if(tipo[0]=='deletar'){
    PerfilStore.popUpDeletar = true;
    PerfilStore.popUpEmail = false;
    PerfilStore.popUpSenha = false;

}

funcaoPopUp.abrePopUp()

}


</script>

<style lang="scss" scoped></style>