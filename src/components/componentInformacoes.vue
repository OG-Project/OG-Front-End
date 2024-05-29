<template>
        <div class="laptop:w-[75vw] miniMobile:w-full miniMobile:h-full laptop:h-[92vh] flex flex-col  ">
                <div style="
                font-family:var(--fonteTitulo);
                font-size: var(--fonteTituloTamanho);">
                <div class="items-center flex">
                        <div @click="router.push('/perfil')" v-if="screenWidth < 1024" class="w-[15%] flex items-center   justify-center max-mobileGrande:w-[30%]">
                                <flecha class=" " />
                        </div>
                        <div class="m-[5%] border-b-4 border-[#CCC4CF] p-4 miniMobile:pr-16 laptop:pr-32 w-max">
                                {{ $t('informacoes.Informações') }}
                        </div>
                </div>
        </div>
        <div style="
                font-family: var(--fonteCorpo); 
                font-size: var(--fonteCorpoTamanho);" 
                class="flex justify-center w-full  miniMobile:flex-wrap  gap-8">
                <div class="flex flex-col 2xl:w-max md:w-[493px] sm:w-[493px] gap-y-10">
                        <div class="flex items-center miniMobile:flex-wrap justify-between gap-5 ">
                                <span class="">{{ $t('informacoes.Nome') }}</span>
                                <Input 
                                styleInput="input-transparente-claro" 
                                :conteudoInput="$t('informacoes.Nome')" 
                                v-model="nome"
                                :desabilitado="!editar.valueOf()"
                                tipo="obrigatorio"
                                @updateModelValue="(e)=> {
                                        console.log(e)
                                        nome=e
                                }"
                                        />
                                </div>
                                <div class="flex items-center miniMobile:flex-wrap justify-between gap-5">
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
                                </div>
                                
                                <div class="flex flex-col 2xl:w-max sm:w-[493px] gap-y-10">
                                        <div class="flex justify-between miniMobile:flex-wrap items-center gap-5">
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
                                <div class="flex justify-between miniMobile:flex-wrap items-center gap-5">
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
                <div v-if="screenWidth>=1024">
                        <div class="flex justify-end mr-[15%] mt-[29%]">
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
                <div v-else >
                        <div class="flex justify-end mr-[15%] mt-[30%]">
                                <Botao v-if="!editar" 
                                :funcaoClick="alterarInformacoes" 
                                tamanhoPadrao="mobilemedio" 
                                preset="PadraoRoxo" 
                                :texto="$t('informacoes.Editar E-mail')" 
                                tamanhoDaBorda="2px" 
                                tamanhoDaFonte="2.0vh" />
                                <Botao v-else 
                                :funcaoClick="alterarInformacoes" 
                                tamanhoPadrao="mobilemedio" 
                                preset="PadraoRoxo" 
                                :texto="$t('informacoes.Confirmar Edição')" 
                                tamanhoDaBorda="2px" 
                                tamanhoDaFonte="2.0vh" />
                        </div>
                </div>
        </div>
        <alertTela v-if="alterado" :key="alterado" cor="#29CD00" :mensagem="t('informacoes.alterado')" />
</template>

<script setup>
import Input from '../components/Input.vue'
import Botao from '../components/Botao.vue'
import VueCookies from "vue-cookies";
import {perfilStore} from '../stores/perfilStore'
import { ref, onMounted, onBeforeMount, onUpdated, watch } from 'vue';
import { storeToRefs } from 'pinia';
import {conexaoBD} from '../stores/conexaoBD.js'
const PerfilStore=perfilStore()
import router from '../router';
import alertTela from './alertTela.vue';
const conexao=conexaoBD()
import flecha from '../assets/flecha-mobile-perfil.vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();
// console.log(conexao
const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})

let nome=ref('')
let usuario=ref({})
let editar=ref(false)
let alterado=ref(false)

async function alterarInformacoes(){
        if(editar.value){
                alterado.value=!alterado.value
                setTimeout(() => {
                        alterado.value=!alterado.value
                }, 5000);
        }
        usuario.value.nome=nome.value
        usuario.value.email=PerfilStore.email
        usuario.value.username=PerfilStore.username
        usuario.value.sobrenome=PerfilStore.sobrenome
        let dataFuso=new Date(PerfilStore.dataDeNascimento)
        console.log(dataFuso);
        usuario.value.dataNascimento=PerfilStore.dataDeNascimento
        console.log(usuario.value);
        console.log(await conexao.atualizar(usuario.value,'/usuario'))
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
        let data=new Date(usuario.value.dataNascimento).toISOString()
        console.log(data);
        data=data.split('T')
        data[0]=data[0].split('/').reverse().join('-')
        PerfilStore.dataDeNascimento=data[0]
})
onMounted(()=>{
        window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
        })
})
onUpdated(()=>{
        window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
        })
        console.log(PerfilStore.el)
        if(screenWidth.value>=1024){
                router.push('/perfil/informacoes')
        }
        console.log('update')        
})
</script>

<style scoped>

</style>