<template class="">
    <div class=" flex justify-center flex-wrap">
        <div class="flex flex-col items-center w-[20%] h-[92vh] drop-shadow-md bg-[var(--backgroundItems)]"
            v-if="isVisualizaPerfil == true">
            <div class=" flex justify-center w-[329px] h-[329px]">
                <img :src="Imagem" class="xl:w-[85%]
                    mt-2 
                    sm:h-[30%] 
                    sm:w-[30%] 
                    md:w-[70%] 
                    md:h-[70%] 
                    rounded-full 
                    xl:h-[85%]" />
            </div>
            <div :class="{ overflowScroll: temMaisDeQuatro(equipes) }" class="scroll w-[80%] h-[45%] py-2">
                <div class="flex flex-col items-center gap-9">
                    <p>{{ $t('perfilInfo.equipesDe') }} {{ perfil.username }}</p>
                    <div v-for="i in equipes" v-if="isVisualizaEquipes"
                        class="cardEquipe shadow-md flex sm:flex-wrap sm:justify-center 2xl:justify-start py-[5%] gap-4 items-center w-[80%] h-[100%] bg-[var(--backgroundItemsClaros)]">
                        <img v-if="i.equipe.foto != null" class="w-[2vw] h-[50%] 2xl:ml-6 "
                            :src="'data:' + i.equipe.foto.tipo + ';base64,' + i.equipe.foto.dados" alt="">
                        <svgEquipe v-else class="2xl:ml-6" />
                        <div
                            class="truncate w-[60%] flex xl:justify-start sm:justify-center border-b-2 border-[var(--roxo)] pb-1">
                            {{ i.equipe.nome }}
                        </div>
                    </div>
                    <p class="w-[80%] text-center" v-if="!isVisualizaEquipes">{{
                $t('perfilInfo.asEquipesDoUsuarioSaoPrivadas') }}</p>
                </div>
            </div>
            <!-- <div v-else class="scroll w-[80%] h-[45%] py-2 " >
                Sem Equipes
            </div> -->
        </div>
        <div class="w-[75vw] h-[92vh] flex flex-col">
            <div v-if="isVisualizaPerfil == false" class="flex h-full items-center justify-center">
                <p class="text-4xl">{{ $t('perfilInfo.oUsuarioPossuiOPerfilPrivado') }}</p>
            </div>
            <div class="flex flex-col justify-around" v-if="isVisualizaPerfil == true">
                <div class="flex items-center">
                    <h1 :style="{ fontFamily: fonteTitulo }"
                        class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] sm:pt-0 p-4 pr-32 w-max">
                        {{ perfil.username }}
                    </h1>
                    <div class="flex items-center gap-4">
                        <iconChat @click="iniciarChat()" class="cursor-pointer"></iconChat>
                        <p>{{ $t('perfilInfo.inicieUmChatCom') }} {{ perfil.username }}</p>
                    </div>
                </div>
                <div :style="{ fontFamily: fonteCorpo }" class="flex sm:flex-wrap justify-center gap-8">
                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex items-center justify-between gap-5 ">
                            <span class="text-xl">{{ $t('perfilInfo.nome') }}</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Nome"
                                v-model="perfil.nome" :desabilitado="true" tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5">
                            <span class="text-xl">{{ $t('perfilInfo.username') }}</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Username"
                                v-model="perfil.username" :desabilitado="true" tipo="obrigatorio" />
                        </div>
                        <div class="flex items-center justify-between gap-5" v-show="isVisualizaEmail">
                            <span class="text-xl">{{ $t('perfilInfo.email') }}</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="E-mail"
                                v-model="perfil.email" :desabilitado="true" tipo="obrigatorio" />
                        </div>
                    </div>

                    <div class="flex flex-col xl:w-max sm:w-[493px] gap-y-10">
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl">{{ $t('perfilInfo.sobrenome') }}</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Sobrenome"
                                v-model="perfil.sobrenome" :desabilitado="true" tipo="obrigatorio" />
                        </div>
                        <div class="flex  justify-between items-center gap-5">

                            <span class="text-xl">{{ $t('perfilInfo.dataNascimento') }}</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Data de Nascimento"
                                v-model="dataNascimento" :modelValue="dataNascimento.value" :desabilitado="true"
                                tipo="date" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- <Carousel :value="projetosEquipes" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
                <template #item="projetosEquipe">
                    <div class="border-1 surface-border border-round m-2 p-3">
                        <p>{{ console.log(projetosEquipe) }}</p>
                    </div>
                </template>
</Carousel> -->
        </div>
    </div>
</template>
<!-- router.push({ name: 'user', params: { username: 'eduardo' } }) -->

<!-- fazer aparecer o scroll desaparecer com x numeros de equipe e quanto não esta com mouse sobre -->
<script setup>
import iconChat from '../assets/iconChat.vue'
import svgEquipe from '../assets/svgEquipe.vue';
import Input from '../components/Input.vue';
import cardProjetos from '../components/cardProjetos.vue'
import Carousel from 'primevue/carousel';
import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore';
import { conexaoBD } from '../stores/conexaoBD';
import { onMounted, computed, ref, onUpdated, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useMouseInElement, useWindowSize } from '@vueuse/core'
import router from '../router';
import VueCookies from 'vue-cookies'
import AlertTela from '../components/alertTela.vue';


const route = useRoute()

const conexao = conexaoBD()

const perfil = perfilStore()
const windowSize = useWindowSize()
const { width, height } = storeToRefs(windowSize)
const { fonteCorpo } = storeToRefs(perfil)
const { fonteTitulo } = storeToRefs(perfil)
let equipes = ref([])
let projetos = ref([])
let dataNascimento = ref('')
let usuario = ref({})
let foto = ref(null)
let isVisualizaPerfil = ref(true)
let isVisualizaEmail = ref(true)
let isVisualizaEquipes = ref(true)
let isVisualizaProjetos = ref(true)
let projetosEquipes = ref([])


onMounted(async () => {

    let id = route.params.id
    console.log(id)
    usuario.value = await conexao.buscarUm(id, '/usuario')
    console.log(usuario)
    equipes.value = usuario.value.equipes
    if (projetos.value == undefined) {
        projetos.value = []
    }
    if (equipes.value == undefined) {
        equipes.value = []
    }

    console.log(equipes.value);
    equipes.value.forEach(async element => {
        projetosEquipes.value.push(await conexao.buscarProjetosEquipe('/projeto/buscarProjetos', element.equipe.id))
    });
    console.log(projetosEquipes.value)

    console.log(projetos.value)
    console.log(equipes.value)
    dataNascimento.value = new Date(usuario.value.dataNascimento).toLocaleDateString()
    dataNascimento.value = dataNascimento.value.split('/').reverse().join('-')
    console.log(dataNascimento.value);
    perfil.nome = usuario.value.nome
    perfil.sobrenome = usuario.value.sobrenome
    perfil.email = usuario.value.email
    perfil.username = usuario.value.username
    perfil.dataDeNascimento = usuario.value.dataNascimento
    projetos.value = usuario.value.projetos
    foto.value = usuario.value.foto
    isVisualizaPerfil.value = usuario.value.configuracao.isVisualizaPerfil
    isVisualizaEmail.value = usuario.value.configuracao.isVisualizaEmail
    isVisualizaEquipes.value = usuario.value.configuracao.isVisualizaEquipes
    isVisualizaProjetos.value = usuario.value.configuracao.isVisualizaProjetos
    console.log(isVisualizaPerfil.value);
    console.log(isVisualizaEmail.value);
    console.log(isVisualizaEquipes.value);
    console.log(isVisualizaProjetos.value);
    // alert(height.value)
    // alert(width.value)
});

async function iniciarChat() {
    chat = {}
    conexao.buscarUm(VueCookies.get("IdUsuarioCookie"), '/chat/pessoal/' + usuario.value.id).then((response) => {
        chat = response
        if (chat == {}) {
            conexao.buscarUm(VueCookies.get("IdUsuarioCookie"), '/usuario').then((response) => {
                let chat = {
                    usuarios: [{
                        id: usuario.value.id
                    }, {
                        id: response.id
                    }]
                }
                console.log(chat.usuarios)
                conexao.cadastrar(chat, '/chat/pessoal').then((response) => {
                    console.log(response)
                    localStorage.setItem('opcao', 1)
                    router.push('/chat/' + usuario.value.id)
                })
            })
        } else {
            console.log("entrou")
            router.push('/chat/' + usuario.value.id)
        }
    })
}

function verificaTemEquipe(equipes) {
    if (equipes.length != 0) {
        return true
    }
    return false
}

async function iniciarChat() {
    chat = {}
    conexao.buscarUm(VueCookies.get("IdUsuarioCookie"), '/chat/pessoal/' + usuario.value.id).then((response) => {
        chat = response
        if (chat == {}) {
            conexao.buscarUm(VueCookies.get("IdUsuarioCookie"), '/usuario').then((response) => {
                let chat = {
                    usuarios: [{
                        id: usuario.value.id
                    }, {
                        id: response.id
                    }]
                }
                console.log(chat.usuarios)
                conexao.cadastrar(chat, '/chat/pessoal').then((response) => {
                    console.log(response)
                    localStorage.setItem('opcao', 1)
                    router.push('/chat/' + usuario.value.id)
                })
            })
        }else{
            console.log("entrou")
            router.push('/chat/' + usuario.value.id)
        }
    })
}

let Imagem = computed(() => {
    if (foto.value != null) {
        console.log(foto.value);
        return 'data:' + foto.value.tipo + ';base64,' + foto.value.dados
    }
    return
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

    .p-carousel-indicator {
        @apply border-yellow-300;
    }

    body {
        @apply overflow-y-hidden;
    }
}
</style>