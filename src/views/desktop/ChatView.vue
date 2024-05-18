<template>
    <div class="w-full h-[92%] flex">
        <div class="w-[20%] h-full">
            <div class="bg-[var(--roxoEscuro)] w-full h-[20%] flex justify-center items-end pb-[1%]">
                <button class="text-white w-[50%] h-full flex flex-col justify-end items-center" @click="trocaLista(1)">
                    <p>Pessoal</p>
                    <div v-if="opcao2 == 1" class="w-[50%] h-[3%] bg-[var(--backgroundItemsClaros)]">
                    </div>
                </button>
                <button class="text-white w-[50%] h-full  flex flex-col justify-end items-center"
                    @click="trocaLista(2)">
                    <p>Equipes</p>
                    <div v-if="opcao2 == 2" class="w-[50%] h-[3%] bg-[var(--backgroundItemsClaros)]">

                    </div>
                </button>
            </div>
            <div class="w-full h-[80%] bg-[var(--backgroundItems)] overflow-auto">
                <div v-for="equipe of listaDeConversas" class="h-[15%] flex justify-center items-center"
                    @click="mudaRota(equipe)">
                    <div v-if="equipe.isSelecionado == true" class="w-[3%] h-full bg-[var(--roxo)]">
                    </div>
                    <div class="w-[35%] h-[full] flex items-center justify-center" v-if="equipe.equipe.foto != null">
                        <img class="imgDePerfil"
                            :src="'data:' + equipe.equipe.foto.tipo + ';base64,' + equipe.equipe.foto.dados" alt="">
                    </div>
                    <div class="flex flex-col w-[65%] items-start justify-end gap-[10px]">
                        <div v-if="opcao2 == '1'">
                            {{ equipe.equipe.username }}
                        </div>
                        <div v-if="opcao2 == '2'">
                            {{ equipe.equipe.nome }}
                        </div>
                        <div class="w-[75%] border-4 border-[var(--backgroundItemsClaros)]">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-full w-full flex flex-col justify-end">
            <div>
                <div v-for="mensagem of chat.mensagens" class=" w-full flex justify-end">
                    {{ console.log(mensagem) }}
                    <div v-if="mensagem.criador.id!=usuarioLogado.id" class="w-full pl-[30px] flex flex-col items-start">
                        <div class="text-[70%]">
                            {{ mensagem.criador.username }}
                        </div>
                        <div class="max-w-[45%] p-[1.5%] bg-[var(--backgroundItemsClaros)] rounded-t-3xl rounded-r-3xl">
                            <div>
                                {{ mensagem.mensagem }}
                            </div>
                        </div>
                    </div>
                    <div v-if="mensagem.criador.id==usuarioLogado.id" class="w-full flex pr-[30px] justify-end ">
                        <div class="max-w-[45%] p-[2%] bg-[var(--roxoEscuro)] rounded-t-3xl rounded-l-3xl">
                            {{ mensagem.mensagem }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[10%] w-full flex items-end">
                <div class="h-[80%] w-full flex justify-center">
                    <div class="w-[95%] h-[90%] bg-[var(--backgroundItemsClaros)] flex justify-center">
                        <input type="text" class="w-[95%] h-full bg-[var(--backgroundItemsClaros)]"
                            v-model="corpoDaMensagem" placeholder="Digite Uma Mensagem">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { conexaoBD } from '../../stores/conexaoBD';
import { onMounted, ref } from 'vue';
import router from '@/router';
import VueCookies from 'vue-cookies';

let api = conexaoBD();
let listaDeConversas = ref([]);
let opcao2 = ref("2");
let usuarioLogadoId = ref(VueCookies.get('IdUsuarioCookie'));
let usuarioLogado = ref({});
let corpoDaMensagem = ref("");
let listaDeMensagens = ref([]);
let chat = ref({});

onMounted(async () => {
    usuarioLogado.value = await api.buscarUm(usuarioLogadoId.value, '/usuario')
    trocaLista(1)
})

async function trocaLista(opcao) {
    listaDeConversas.value = [];
    if (opcao == 2) {
        usuarioLogado.value.equipes.forEach(equipeUsuario => {
            listaDeConversas.value.push({
                isSelecionado: ref(false),
                equipe: equipeUsuario.equipe
            });
        });
        opcao2.value = "2";
    } else {
        listaDeConversas.value = [{ equipe: await api.buscarUm(1, '/usuario') }];
        opcao2.value = "1";
    }
}

async function DefineListaDeMensagens() {
    chat.value = await api.buscarUm(window.location.href.charAt(window.location.href.length - 1), '/chat/equipe')
}

function mudaRota(equipe) {
    router.push('/chat/' + equipe.equipe.id).then(() => {
        console.log(equipe);
        console.log(window.location.href.charAt(window.location.href.length - 1))
        listaDeConversas.value.forEach(equipe => {
            var ultimoCaracter = window.location.href.charAt(window.location.href.length - 1);
            if (ultimoCaracter == equipe.equipe.id) {
                equipe.isSelecionado = true;
            } else {
                equipe.isSelecionado = false;
            }
        });
    });
    DefineListaDeMensagens()
}

</script>

<style scoped>
.imgDePerfil {
    @apply rounded-full flex 2xl:w-[55px] 2xl:h-[55px] xl:w-[50px] xl:h-[50px] lg:w-[45px] lg:h-[45px] md:w-[40px] md:h-[40px];
}

input:focus {
    outline: 0;
}
</style>