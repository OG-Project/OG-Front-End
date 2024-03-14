<template>
    <div class="flex justify-center flex-wrap">
        <div class="flex  flex-col items-center w-[20%] h-[877px] drop-shadow-md bg-[#FEFBFF]">
            <div class=" flex justify-center w-[329px] h-[329px]">
                <div class="xl:w-[95%] sm:h-[30%] sm:w-[30%] md:w-[70%] md:h-[70%] rounded-full  xl:h-[95%] bg-emerald-400"></div>
            </div>
            <div :class="{ overflowScroll: temMaisDeQuatro(equipes) }" class="scroll w-[80%] h-[45%] ">
                <div class="flex flex-col items-center gap-9">
                    <div v-for="i in equipes"
                        class="shadow-md flex sm:flex-wrap sm:justify-center xl:justify-start py-[5%] gap-4 items-center w-[80%] h-[100%] bg-brancoNeve">
                        <svgEquipe class="ml-6" />
                        <div class="truncate w-[60%] border-b-2 border-roxo pb-1">
                            Nome Equipe
                        </div>
                    </div>


                </div>

            </div>
        </div>
        <div class="w-[75vw] h-[92vh] flex flex-col  ">
            <div class="flex flex-col justify-around">
                <h1 :style="{ fontFamily: fonteTitulo.value }"
                    class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] sm:pt-0 p-4 pr-32 w-max">
                    Nome Usuario
                </h1>
                <div :style="{ fontFamily: fonteCorpo.value }" class="flex sm:flex-wrap justify-center gap-8">
                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex items-center justify-between gap-5 ">
                            <span class="text-xl">Nome</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Nome" v-model="perfil.nome"
                                tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5">
                            <span class="text-xl">Username</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Username"
                                v-model="perfil.username" tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5">
                            <span class="text-xl">E-mail</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="E-mail"
                                v-model="perfil.email" tipo="obrigatorio" />
                        </div>
                    </div>

                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">Sobrenome</span>
                            <Input 
                            styleInput="input-transparente-claro-grande" 
                            conteudoInput="Sobrenome"
                            v-model="perfil.sobrenome" 
                            tipo="obrigatorio"
                             />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">Data de Nascimento</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Data de Nascimento"
                                v-model="perfil.dataDeNascimento" tipo="obrigatorio" />
                        </div>
                    </div>
                </div>
                <div  class=" ">
                    <Carousel
                    v-if="width>958" 
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
                    v-else
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
import { onBeforeMount, onMounted, watch,ref, onUpdated, onBeforeUnmount } from 'vue';
import {useRouter,useRoute} from 'vue-router';
import { useWindowSize } from '@vueuse/core'

const router=useRouter()
const route=useRoute()
const conexao = conexaoBD()
const perfil = perfilStore()
const windowSize=useWindowSize()
const { width, height } = storeToRefs(windowSize)
const { fonteCorpo } = storeToRefs(perfil)
const { fonteTitulo } = storeToRefs(perfil)

let equipes = ['um', 'dois', 'tres', 'quatro', 'cinco']
let projetos =['1','2','3','4','5','6','7','8','9','10']


onMounted(() => {
    // alert(route.params.id)
    console.log(fonteTitulo.value)
    console.log(fonteCorpo.value)

    // alert(height.value)
    // alert(width.value)
});


onUpdated(()=>{
    // alert(height)
    // alert(width)

})

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
}
</style>