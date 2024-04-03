<template class="">
    <div class=" flex justify-center flex-wrap">
        <div class="flex  flex-col items-center w-[20%] h-[877px] drop-shadow-md bg-[#FEFBFF]">
            <div class=" flex justify-center w-[329px] h-[329px]">
                <img v-if="foto!=null"
                  :src="'data:' + foto.tipo + ';base64,' + foto.dados" 
                  class="shadow-2xl max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] mr-4 ml-4 rounded-full"
                />
                <div v-else class="xl:w-[95%] sm:h-[30%] sm:w-[30%] md:w-[70%] md:h-[70%] rounded-full  xl:h-[95%] bg-emerald-400"></div>
            </div>
            <div v-if="equipes.value!=null" :class="{ overflowScroll: temMaisDeQuatro(equipes) }" class="scroll w-[80%] h-[45%] py-2 ">
                <div class="flex flex-col items-center gap-9">
                    <div v-for="i in equipes"
                        class="cardEquipe cursor-pointer shadow-md flex sm:flex-wrap sm:justify-center 2xl:justify-start py-[5%] gap-4 items-center w-[80%] h-[100%] bg-brancoNeve">
                        <img v-if="i.equipe.foto!=null"
                        class="w-[2vw] h-[50%] 2xl:ml-6 " 
                        :src="'data:' + i.equipe.foto.tipo + ';base64,' + i.equipe.foto.dados" alt="">
                        <svgEquipe v-else class="2xl:ml-6" />
                        <div class="truncate w-[60%] flex xl:justify-start sm:justify-center border-b-2 border-roxo pb-1">
                            {{ i.equipe.nome }}
                        </div>
                    </div>

                </div>

            </div>
            <div v-else class="scroll w-[80%] h-[45%] py-2 " >
                Sem Equipes
            </div>
        </div>
        <div class="w-[75vw] h-[92vh] flex flex-col  ">
            <div class="flex flex-col justify-around">
                <h1 :style="{ fontFamily: fonteTitulo }"
                    class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] sm:pt-0 p-4 pr-32 w-max">
                    {{perfil.username}}
                </h1>
                <div :style="{ fontFamily: fonteCorpo }" class="flex sm:flex-wrap justify-center gap-8">
                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex items-center justify-between gap-5 ">
                            <span class="text-xl">Nome</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="Nome" 
                            v-model="perfil.nome"
                            :desabilitado="true"
                            tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5">
                            <span class="text-xl">Username</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="Username"
                            v-model="perfil.username" 
                            :desabilitado="true"
                            tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5">
                            <span class="text-xl">E-mail</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="E-mail"
                            v-model="perfil.email" 
                            :desabilitado="true"
                            tipo="obrigatorio" />
                        </div>
                    </div>

                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">Sobrenome</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="Sobrenome"
                            v-model="perfil.sobrenome"
                            :desabilitado="true"
                            tipo="obrigatorio"
                             />
                        </div>
                        <div class="flex  justify-between items-center gap-5">
                            
                            <span class="text-xl">Data de Nascimento</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="Data de Nascimento"
                            v-model="dataNascimento"
                            :modelValue="dataNascimento.value"
                            :desabilitado="true" 
                            tipo="date" />
                        </div>
                    </div>
                </div>
                <div >
                    
                    <Carousel 
                    v-if="width>958 " 
                    :value="projetos" 
                    :numVisible="3" 
                    containerClass="" 
                    contentClass="sm:pt-1 xl:pt-9 " 
                    indicatorsContentClass=" mx-auto *:bg-gray-300 active:*:bg-roxo w-max"
                    :showNavigators="true"
                    :showIndicators="true"
                    verticalViewPortHeight="500px"
                    :numScroll=" 3"
                    :responsiveOptions="projetos">
                        <template #item="slotProps">
                            <!-- {{ slotProps.index }} -->
                            <cardProjetos class="my-4 mx-auto"></cardProjetos>
                            <!-- {{ slotProps.index }} -->
                        </template>
                    </Carousel>

                    <Carousel 
                    v-if="width<958"
                    :value="projetos" 
                    :numVisible="1" 
                    containerClass="" 
                    contentClass="sm:pt-1 xl:pt-9 " 
                    indicatorsContentClass=" mx-auto *:bg-gray-300 active:*:bg-roxo w-max"
                    :showNavigators="true"
                    :showIndicators="true"
                    verticalViewPortHeight="500px"
                    :numScroll="1"
                    :responsiveOptions="projetos">
                        <template #item="slotProps">
                            
                            <!-- {{ slotProps.index }} -->
                            <cardProjetos class="my-4 mx-auto"></cardProjetos>
                            <!-- {{ slotProps.index }} -->
                        </template>
                    </Carousel>
                    <div v-else>
                        oi
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- router.push({ name: 'user', params: { username: 'eduardo' } }) -->

<!-- fazer aparecer o scroll desaparecer com x numeros de equipe e quanto não esta com mouse sobre -->
<script setup>

import svgEquipe from '../assets/svgEquipe.vue';
import Input from '../components/Input.vue';
import cardProjetos from '../components/cardProjetos.vue'
import Carousel from 'primevue/carousel';
import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore';
import { conexaoBD } from '../stores/conexaoBD';
import { onMounted, ref, onUpdated, onBeforeUnmount } from 'vue';
import {useRoute} from 'vue-router';
import { useMouseInElement, useWindowSize } from '@vueuse/core'

const route=useRoute()

const conexao = conexaoBD()

const perfil = perfilStore()
const windowSize=useWindowSize()
const { width, height } = storeToRefs(windowSize)
const { fonteCorpo } = storeToRefs(perfil)
const { fonteTitulo } = storeToRefs(perfil)
let equipes = ref([])
let projetos =ref([])
let dataNascimento=ref('')
let usuario=ref({})

onMounted(async () => {
    
    let id=route.params.id
    console.log(id)
    usuario.value=await conexao.buscarUm(id,'/usuario')
    console.log(usuario)
    projetos.value=usuario.value.projetos
    equipes.value=usuario.value.equipes
    if(projetos.value==undefined){
        projetos.value=[]
    }
    if(equipes.value==undefined){
        equipes.value=[]
    }
    console.log(projetos.value)
    console.log(equipes.value)
    dataNascimento.value = new Date(usuario.value.dataNascimento).toLocaleDateString() 
    dataNascimento.value=dataNascimento.value.split('/').reverse().join('-')
    console.log(dataNascimento.value);
    perfil.nome=usuario.value.nome
    perfil.sobrenome=usuario.value.sobrenome
    perfil.email=usuario.value.email
    perfil.username=usuario.value.username
    perfil.dataDeNascimento=usuario.value.dataNascimento
    projetos.value=usuario.value.projetos
    // alert(height.value)
    // alert(width.value)
});


onUpdated(()=>{
    // alert(height)
    // alert(width)

})

// function verificaProjetos(projetos){
//     if(projetos.length!=0){
//         return true
//     }
//     return false
// }

function temMaisDeQuatro(lista) {
    return lista.length >= 4 ? true : false
}

</script>

<style scoped>
@import url(../assets/main.css);

@layer components {
    .overflowScroll {
        @apply overflow-y-scroll;
    }

    .scroll::-webkit-scrollbar {
        width: 7px;
    }

    .scroll::-webkit-scrollbar-track {
        @apply bg-slate-100
    }

    .scroll::-webkit-scrollbar-thumb {
        @apply bg-[#D9D9D9]
    }
    .p-carousel-indicator{
        @apply border-yellow-300;
    }
    .cardEquipe:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }
    body{
        @apply overflow-y-hidden;
    }
}
</style>