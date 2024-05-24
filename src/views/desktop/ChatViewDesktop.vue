<template>
    <div class="w-full h-[92vh] flex">
        <div class="w-[20%] h-full">
            <div class="bg-[var(--roxoEscuro)] w-full h-[20%] flex justify-center items-end pb-[1%]">
                <button class="text-white w-[50%] h-full flex flex-col justify-end items-center" @click="trocaLista(1), router.push('/chat').then(() => {
                    DefineListaDeMensagens()
                });">
                    <p>Pessoal</p>
                    <div v-if="opcao2 == 1" class="w-[50%] h-[3%] bg-[var(--backgroundItemsClaros)]">
                    </div>
                </button>
                <button class="text-white w-[50%] h-full  flex flex-col justify-end items-center" @click="trocaLista(2), router.push('/chat').then(() => {
                    DefineListaDeMensagens()
                });">
                    <p>Equipes</p>
                    <div v-if="opcao2 == 2" class="w-[50%] h-[3%] bg-[var(--backgroundItems)]">

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
                    <div v-else class="w-[35%] h-[full] flex items-center justify-center">
                        <img class="imgDePerfil" src="../../imagemVetores/imagemEquipe.svg" alt="">
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
        <div class="h-full w-full flex flex-col justify-end ">

            <div class="scrollable rotate-180">
                <div class="rotate-180">
                    <div v-for="mensagem of chat.mensagens" class=" w-full flex justify-end">
                        <div class="pl-[2.5%]" v-if="mensagem.criador.id != usuarioLogado.id">
                            <img class="imgDePerfil"
                            :src="'data:' + mensagem.criador.foto.tipo + ';base64,' + mensagem.criador.foto.dados" alt="">
                        </div>
                        <div v-if="mensagem.criador.id != usuarioLogado.id"
                            class="w-full pl-[0.5%] pt-[1%] flex flex-col items-start">
                            <div class="text-[100%]">
                                {{ mensagem.criador.username }}
                            </div>
                            <div
                                class="max-w-[45%] min-w-[5%] p-[1.5%] bg-[var(--backgroundItemsClaros)] rounded-b-3xl rounded-r-3xl break-words flex">
                                <div>
                                    {{ mensagem.mensagem }}
                                </div>
                            </div>
                        </div>
                        <div v-if="mensagem.criador.id == usuarioLogado.id"
                            class="w-full flex pr-[2.5%] pt-[2%] justify-end ">
                            <div
                                class="max-w-[45%] p-[1.5%] bg-[var(--roxoEscuro)] rounded-b-3xl rounded-l-3xl text-white break-words">
                                {{ mensagem.mensagem }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[10%] w-full flex items-end">
                <div class="h-[80%] w-full flex justify-center">
                    <div class="w-[95%] h-[90%] bg-[var(--backgroundItemsClaros)] flex justify-center">
                        <input type="text" class="w-[95%] h-full bg-[var(--backgroundItemsClaros)]"
                            v-model="corpoDaMensagem" placeholder="Digite Uma Mensagem"
                            @keypress.enter="mandaMensagem()">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { conexaoBD } from '../../stores/conexaoBD';
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import VueCookies from 'vue-cookies';
import { set } from 'date-fns';
import { webSocketStore } from '../../stores/webSocket';

const scrollableElement = ref(null);
let api = conexaoBD();
let listaDeConversas = ref([]);
let opcao2 = ref(localStorage.getItem('opcao'));
let usuarioLogadoId = ref(VueCookies.get('IdUsuarioCookie'));
let usuarioLogado = ref({});
let corpoDaMensagem = ref("");
let listaDeMensagens = ref([]);
let chat = ref({});
let webSocket = webSocketStore();

webSocket.url = "ws://localhost:8082/og/webSocket/chat/1"

onMounted(async () => {
    usuarioLogado.value = await api.buscarUm(usuarioLogadoId.value, '/usuario')
    if (localStorage.getItem('opcao') != null) {
        trocaLista(localStorage.getItem('opcao'))
        setTimeout(() => {
            defineSeEstaSelecionado()
            DefineListaDeMensagens()
        }, 10);
    }
})

try {
    webSocket.esperaMensagem((retorno) => {
        console.log(JSON.parse(retorno));
        webSocket.criaConexaoWebSocket()
        chat.value.mensagens.push(JSON.parse(retorno))

    })
} catch (e) {
}


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
        localStorage.setItem('opcao', '2')
    } else {
        await api.procurar('/chat').then((response) => {
            response.forEach(chat => {
                chat.usuarios.forEach(usuario => {
                    if (usuario.id != usuarioLogado.value.id) {
                        listaDeConversas.value.push({
                            isSelecionado: ref(false),
                            equipe: usuario
                        })
                    }
                });
            });
        });
        opcao2.value = "1";
        localStorage.setItem('opcao', '1')
    }
}

async function DefineListaDeMensagens() {
    let chatResponse = ref({})
    if (opcao2.value == "2") {
        chat.value = await api.buscarUm(window.location.href.charAt(window.location.href.length - 1), '/chat/equipe').then((response) => {
            chatResponse.value = response
        })
    } else if (opcao2.value == "1") {
        chat.value = await api.buscarUm(window.location.href.charAt(window.location.href.length - 1), '/chat/pessoal/' + VueCookies.get("IdUsuarioCookie")).then((response) => {
            chatResponse.value = response
        })
    }
    chat.value = chatResponse.value
    defineSeEstaSelecionado()
}

function mudaRota(equipe) {
    router.push('/chat/' + equipe.equipe.id).then(() => {
        defineSeEstaSelecionado()
    });
    setTimeout(() => {
        DefineListaDeMensagens()
    }, 10);
}

function defineSeEstaSelecionado() {
    listaDeConversas.value.forEach(equipe => {
        var ultimoCaracter = window.location.href.charAt(window.location.href.length - 1);
        if (ultimoCaracter == equipe.equipe.id) {
            equipe.isSelecionado = true;
        } else {
            equipe.isSelecionado = false;
        }
    });
}

async function mandaMensagem() {
    let mensagem = {
        criador:usuarioLogado.value,
        mensagem: corpoDaMensagem.value,
    }
    await api.cadastrar(mensagem, '/mensagem/' + chat.value.id).then((response) => {
        webSocket.enviaMensagemWebSocket(JSON.stringify(response.data))
    })
    corpoDaMensagem.value = "";


}

</script>

<style scoped>
.imgDePerfil {
    @apply rounded-full flex 2xl:w-[55px] 2xl:h-[55px] xl:w-[50px] xl:h-[50px] lg:w-[45px] lg:h-[45px] md:w-[40px] md:h-[40px];
}

input:focus {
    outline: 0;
}

.scrollable {
    overflow-y: scroll;
    scroll-behavior: initial;

    /* para adicionar uma barra de rolagem vertical */
    scrollbar-color: "var(--backgroundItemsClaros)";
    /* oculta a barra de rolagem padrão do Firefox */
    height: 80vh;

}

.scrollable::-webkit-scrollbar {
    width: 0;
    /* largura zero para ocultar a barra de rolagem */
}

/* Estilos para WebKit (Chrome, Safari, Opera) */
.scrollable::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* cor transparente para ocultar o polegar da barra de rolagem */
}

/* Estilo para as extremidades da barra de rolagem */
.scrollable::-webkit-scrollbar-corner {
    background: transparent;
    /* cor transparente para ocultar a borda entre as barras de rolagem */
}

/* Estilo para adicionar bordas arredondadas nas extremidades */
.scrollable {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>