<template>
    <div class="flex justify-center">
        <div class="flex  flex-col items-center w-[443px] h-[877px] drop-shadow-md bg-[#FEFBFF]">
            <div class="w-[329px] rounded-full h-[329px] mt-10 mb-16 bg-emerald-400"></div>
            <div :class="{ overflowScroll: temMaisDeQuatro(equipes) }" class="scroll w-[362px] h-[496px] ">
                <div class="flex flex-col items-center gap-9">
                    <div v-for="i in equipes"
                        class="shadow-md flex justify-start gap-4 items-center w-[290px] h-[80px] bg-brancoNeve">
                        <svgEquipe class="ml-6" />
                        <div class="w-[170px] border-b-2 border-roxo pb-1">
                            Nome Equipe
                        </div>
                    </div>


                </div>

            </div>
        </div>
        <div class="w-[1400px] h-[877px] ">
            <div>
                <h1 :style="{ fontFamily: fonteTitulo }"
                    class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                    Nome Usuario
                </h1>
                <div :style="{ fontFamily: fonteCorpo }" class="flex justify-center gap-8">
                    <div class="flex flex-col gap-y-10">
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

                    <div class="flex flex-col gap-y-10">
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">Sobrenome</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Sobrenome"
                                v-model="perfil.sobrenome" tipo="obrigatorio" />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">Data de Nascimento</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Data de Nascimento"
                                v-model="perfil.dataDeNascimento" tipo="obrigatorio" />
                        </div>

                    </div>
                </div>
                <div class="">
                    <Carousel :value="projetos" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
                        <template #item="slotProps">
                            <cardProjetos></cardProjetos>
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
const perfil = perfilStore()
const { fonteCorpo } = storeToRefs(perfil)
const { fonteTitulo } = storeToRefs(perfil)
let equipes = ['um', 'dois', 'tres', 'quatro', 'cinco']
let projetos =['1','2','3','4','5','6','7','8','9','10']
function temMaisDeQuatro(lista) {
    return lista.length > 4 ? true : false
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
}
</style>