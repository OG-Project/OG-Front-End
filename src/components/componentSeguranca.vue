<template>
    <div class="w-[75vw] h-[92vh] flex flex-col">
        <div class="flex flex-row w-full items-center ">
            <div @click="router.push('/perfil')" v-if="screenWidth < 1024" class="w-[15%] flex items-center   justify-center max-mobileGrande:w-[30%]">
                <flechaMobilePerfil class=" "></flechaMobilePerfil>
            </div>
            <h1 v-if="screenWidth <= 740"
            style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanhoMobile);"
                class="m-[5%] border-b-4 border-[#CCC4CF] p-2 w-max">
                {{ $t('seguranca.Segurança') }}
            </h1>
            <h1 v-else style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);"
                class="m-[5%] border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                {{ $t('seguranca.Segurança') }}
            </h1>
        </div>
        <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
            class="pl-32 items-center max-sm:pl-12 max-mobileGrande:pl-8">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10 ">
                    <div class="flex justify-between lg:flex-row gap-8  max-md:flex-col">
                        <div class="text-2xl w-[60%] ">
                            <span class="text-[var(--roxo)]">*</span>{{ $t('seguranca.senhaCaracteres') }}<br>
                            <span class="text-[var(--roxo)]">*</span>{{ $t('seguranca.senhaConteudo') }}<br>
                            <span class="text-[var(--roxo)]">*</span>{{ $t('seguranca.senhaPalavrasComuns') }}
                            <!-- Ao alterar a senha, a gente mantém você conectado
                            a este dispositivo, mas é possível que sua conta
                            seja desconectada de outros dispositivos. -->
                        </div>
                        <div v-if="!isLogadoGoogle" >
                            <Botao v-if="screenWidth >= 640" :funcaoClick="abrePopUp" :parametrosFuncao="['senha']"
                                preset="PadraoRoxo" :texto="$t('seguranca.alterarSenha')">
                            </Botao>
                            <Botao v-else :funcaoClick="abrePopUp" :parametrosFuncao="['senha']" preset="PadraoRoxo"
                                tamanhoPadrao="mobilemedio" :texto="$t('seguranca.alterarSenha')">
                            </Botao>
                        </div>
                    </div>
                    <div class="flex justify-between items-start lg:flex-row gap-8 max-md:flex-col">
                        <div class="gap-5">
                            <div class="text-2xl min-w-[60%] w-full flex flex-col">
                                <div> {{ $t('seguranca.seuEmailAtual') }}</div>
                                <div class="text-[var(--roxo)] w-full max-tablet:w-[70%]  break-words">
                                    {{ email }}
                                </div>
                            </div>
                            <div v-if="isLogadoGoogle" class="text-2xl w-[470px]">
                                Login com a conta do Google ativado
                                Conta conectada
                                Sua conta está conectada a uma conta do Google.
                                Alterar o endereço de e-mail aqui vai
                                desconectar a conta do Google.
                            </div>
                        </div>
                        <div v-if="!isLogadoGoogle" class="w-[45%] flex md:justify-end">
                            <Botao v-if="screenWidth >= 640" :funcaoClick="abrePopUp" :parametrosFuncao="['email']"
                                preset="PadraoRoxo" :texto="$t('seguranca.alterarEmail')">
                            </Botao>
                            <Botao v-else :funcaoClick="abrePopUp" :parametrosFuncao="['email']" preset="PadraoRoxo"
                                tamanhoPadrao="mobilemedio" :texto="$t('seguranca.alterarEmail')">
                            </Botao>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div style="font-Family:var(--fonteCorpo)" class="flex items-center justify-between ml-[10%] mr-[15%] mt-[17%]">
            <span @click="abrePopUp(['deletar'])">{{ $t('seguranca.deletarConta') }}</span>
        </div>

    </div>
    <alertTela v-if="alteradoSenha" :key="alteradoSenha"  mensagem="Senha Alterada" cor="#29CD00" ></alertTela>
    <alertTela v-if="alteradoEmail" :key="alteradoEmail"  mensagem="Email Alterado" cor="#29CD00" ></alertTela>
    <alterarSenha v-if="popUpSenha && screenWidth <= 1024" ></alterarSenha>
    <alterarEmail v-if="popUpEmail  && screenWidth <= 1024"></alterarEmail>
    <ConfirmaPopUp v-if="popUpDeletar  && screenWidth <= 1024"></ConfirmaPopUp>
    
</template>

<script setup>
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import { perfilStore } from '../stores/perfilStore'
import Input from '../components/Input.vue'
import Botao from './Botao.vue';
import VueCookies from "vue-cookies";
import { onMounted, ref, watch } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
import flechaMobilePerfil from '../assets/flecha-mobile-perfil.vue';
import ConfirmaPopUp from '../components/ConfirmaPopUp.vue'
import alterarEmail from '../components/alterarEmail.vue';
import alterarSenha from '../components/alterarSenha.vue';
import alertTela from './alertTela.vue';

import { storeToRefs } from 'pinia';
import router from '../router';
const PerfilStore = perfilStore()
const conexao = conexaoBD()
const { popUpSenha, popUpEmail,popUpDeletar,alteradoEmail,alteradoSenha } = storeToRefs(PerfilStore)
import { useI18n } from 'vue-i18n';
import { onUpdated } from 'vue';
const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})

watch(() => alteradoSenha, () => {
        setTimeout(() => {
            alteradoSenha=!alteradoSenha
                }, 5000);
})
watch(() => alteradoEmail, () => {
        setTimeout(() => {
            alteradoEmail=!alteradoEmail
                }, 5000);
})

let funcaoPopUp = funcaoPopUpStore()
let usuario=ref({});
let isLogadoGoogle =ref(false);
let email = ref('');

onMounted(async () => {
    usuario.value = await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'), '/usuario')
    console.log(usuario.value)
    email.value = usuario.value.email
    isLogadoGoogle.value=usuario.value.isGoogleLogado
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})
onUpdated(()=>{
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    if(screenWidth.value>=1024){
        router.push('/perfil/seguranca')
    }
})

function abrePopUp(tipo) {
    console.log(tipo)
    if (tipo[0] == 'senha') {

        PerfilStore.popUpSenha = true;
        PerfilStore.popUpEmail = false;
        PerfilStore.popUpDeletar = false;

    } else if (tipo[0] == 'email') {
        PerfilStore.popUpEmail = true;
        PerfilStore.popUpSenha = false;
        PerfilStore.popUpDeletar = false;
    } else if (tipo[0] == 'deletar') {
        PerfilStore.popUpDeletar = true;
        PerfilStore.popUpEmail = false;
        PerfilStore.popUpSenha = false;

    }

    funcaoPopUp.abrePopUp()

}


</script>

<style lang="scss" scoped></style>