<template>
    <div class="h-[70vh] w-[30vw] bg-[var(--backgroundItems)] border-[var(--backgroundItems)] border-2 flex flex-col items-center"
        @mouseleave="emit('fecharPopUp')">
        <button class="w-full h-[3%] flex justify-end mr-[2%] mt-[2%]" @click="emit('fecharPopUp')">
            <SvgIconX></SvgIconX>
        </button>
        <div class="w-[35%] h-[7%] border-b-2 border-[var(--roxo)] flex justify-center mb-[10%]">
            Notificações
        </div>
        <div class="w-full h-full gap-5 overflow-y-scroll overflow-x-hidden flex flex-col items-center">
            <div v-for="notificacao of notificacoes" class="border-[var(--roxo)] border-b-2 w-[90%] h-max flex"
                @mouseenter="startTimer(notificacao)" @mouseleave="clearTimer(notificacao)">
                <div class="w-[10%] h-full flex justify-center items-center">
                    <img @click="router.push('/perfil/'+ notificacao.notificacao.criador.id)"  v-if="notificacao.notificacao.criador.foto != null" class=" flex justify-start w-[40px] h-[40px] rounded-full mr-5 2xl:mt-1 xl:mt-2 lg:mt-2 md:mt-2  cursor-pointer" :src="`data:${notificacao.notificacao.criador.foto.tipo};base64,${notificacao.notificacao.criador.foto.dados}`">
                    <userTodoPreto v-else class="flex justify-start w-[40px] h-[40px] rounded-full mr-5 2xl:mt-1 xl:mt-2 lg:mt-2 md:mt-2"></userTodoPreto>
                </div>
                <div :style="notificacao.estilo">
                    <div class="w-[80%]">
                        <div v-if="!notificacao.hover2Segundos" class="pr-1 truncate">
                            {{ notificacao.notificacao.criador.username }}
                            {{ notificacao.notificacao.mensagem }}
                        </div>
                        <div v-else class="pr-1 w-[120%]">
                            {{ notificacao.notificacao.criador.username }}
                            {{ notificacao.notificacao.mensagem }}
                        </div>
                        <button v-if="notificacao.notificacao.projeto != null"
                            @click="trocarRota(notificacao.notificacao.projeto.id, '/projeto', 'IdProjetoAtual')">
                            <p class="text-roxo truncate">
                                {{ notificacao.notificacao.projeto.nome }}
                            </p>
                        </button>
                        <button v-if="notificacao.notificacao.equipe != null"
                            @click="trocarRota(notificacao.notificacao.equipe.id, '/equipe/telaInicial', 'equipeSelecionada')">
                            <p class="text-roxo truncate ">
                                {{ notificacao.notificacao.equipe.nome }}
                            </p>
                        </button>
                        <button v-if="notificacao.notificacao.tarefa != null"
                            @click="trocarRota(notificacao.notificacao.tarefa.id, '/criaTarefa', 'IdTarefaCookies')">
                            <p class="text-roxo truncate ">
                                {{ notificacao.notificacao.tarefa.nome }}
                            </p>
                        </button>
                        <div v-if="notificacao.notificacao.conviteParaEquipe != null || notificacao.notificacao.conviteParaProjeto != null"
                            class="flex flex-row ">
                            <div class="truncate  flex flex-row">
                                <button v-if="notificacao.notificacao.conviteParaEquipe != null" class="">
                                    <div v-if="notificacao.notificacao.conviteParaEquipe.equipe != null"
                                        class="">
                                        <p class="truncate ">
                                            {{ notificacao.notificacao.conviteParaEquipe.equipe.nome }}
                                        </p>
                                    </div>
                                </button>
                                <button v-if="notificacao.notificacao.conviteParaProjeto != null" class="">
                                    <div v-if="notificacao.notificacao.conviteParaProjeto.projeto != null"
                                        class="">
                                        <p class="truncate ">
                                            {{ notificacao.notificacao.conviteParaProjeto.projeto.nome }}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="w-[25%] flex flex-row" @mouseenter="clearTimer()">
                        <div class="flex flex-row justify-end w-full gap-1"
                            v-if="notificacao.notificacao.conviteParaEquipe != null || notificacao.notificacao.conviteParaProjeto != null">
                            <button class="text-white w-[50%] h-[100%] bg-red-600"
                                @click="removerUsuarioALista(notificacao.notificacao)">
                                X
                            </button>
                            <button class="text-white w-[50%] h-[100%] bg-green-600"
                                @click="adicionaUsuarioALista(notificacao.notificacao)">
                                ✔
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-[10%] h-full flex justify-center items-center"
                    @click="removerUsuarioALista(notificacao.notificacao)">
                    <Vector></Vector>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router'
import VueCookies from 'vue-cookies';
import { onMounted, ref } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
import { tryOnBeforeUnmount } from '@vueuse/core';
import Pessoa from '../assets/Pessoa.vue';
import Vector from '../assets/Vector.vue';
import SvgIconX from '../assets/svgIconX.vue';
import { set } from 'date-fns';

let usuarioId = VueCookies.get('IdUsuarioCookie');
let api = conexaoBD();
let notificacoes = ref([]);
let emit = defineEmits(['fecharPopUp','temNotificacao'])
let estilo = ref({})
let timeoutId = null;

onMounted(async () => {
    defineNotificacoes()

})

async function defineNotificacoes() {
    notificacoes.value = await api.buscarUmaNotificacao(usuarioId, '/notificacao/buscar')
    console.log(notificacoes.value)
    let lista = []
    for (const notificacaoAux of notificacoes.value) {
        let notificacao = ref({
            hover2Segundos: false,
            estilo: {},
            notificacao: notificacaoAux
        })
        mudarEstilo(notificacao.value)
        lista.push(notificacao.value)
    }
    notificacoes.value = lista
}

function mudarEstilo(notificacao) {
    if (notificacao.hover2Segundos == true) {
        notificacao.estilo = {
            width: '80%',
            minWidth: '0px',
            flexDirection: 'col',
            textAlign: 'left',
            justifyContent: 'start'
        }
        return;
    }
    notificacao.estilo = {
        width: '80%',
        minWidth: '0px',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        justifyContent: 'start'
    }

}

function montaNotificacao(notificacao) {
    let notificacaoAux = ""
    notificacaoAux = notificacao.criador.username + " " + notificacao.mensagem
    if (notificacao.projeto != null) {
        notificacaoAux += " " + notificacao.projeto.nome
    }
    if (notificacao.equipe != null) {
        notificacaoAux += " " + notificacao.equipe.nome
    }
    if (notificacao.tarefa != null) {
        notificacaoAux += " " + notificacao.tarefa.nome
    }
    if (notificacao.conviteParaEquipe != null) {
        notificacaoAux += " " + notificacao.conviteParaEquipe.equipe.nome
    }
    if (notificacao.conviteParaProjeto != null) {
        notificacaoAux += " " + notificacao.conviteParaProjeto.projeto.nome
    }
}

function startTimer(objeto) {
    timeoutId = setTimeout(() => {
        objeto.hover2Segundos = true;
        mudarEstilo(objeto)
    }, 1000);
}

function clearTimer(objeto) {
    clearTimeout(timeoutId);
    objeto.hover2Segundos = false;
    mudarEstilo(objeto)

}

async function adicionaUsuarioALista(notificacao) {
    let usuario = await api.buscarUm(usuarioId, "/usuario")
    console.log(usuario);
    if (notificacao.conviteParaEquipe != null) {
        api.adicionarUsuarios(usuarioId, notificacao.conviteParaEquipe.equipe.id, retornaPermissao(usuario, notificacao.conviteParaEquipe.permissoes), '/usuario/add')
        notificacao.conviteParaEquipe.usuarioAceito.map((usuarioAceito) => {
            if (usuarioAceito.usuario.id == usuarioId) {
                usuarioAceito.aceito = true
                console.log(notificacao)
                let index = notificacao.receptores.indexOf(usuarioAceito.usuario)
                notificacao.receptores.splice(index, 1)
                api.atualizar(notificacao, '/notificacao')
            }
        })
    }
    if (notificacao.conviteParaProjeto != null) {
        api.adicionarEquipe(notificacao.conviteParaProjeto.idEquipe, notificacao.conviteParaProjeto.projeto.id, '/projeto/add')
        notificacao.conviteParaProjeto.usuarioAceito.map((usuarioAceito) => {
            if (usuarioAceito.usuario.id == usuarioId) {
                console.log(notificacao)
                usuarioAceito.aceito = true
                let index = notificacao.receptores.indexOf(usuarioAceito.usuario)
                notificacao.receptores.splice(index, 1)
                api.atualizar(notificacao, '/notificacao')
            }
        })
    }
    api.atualizar(notificacao, '/notificacao').then(() => {
        defineNotificacoes()
    })

}
function removerUsuarioALista(notificacao) {
    api.deletarEquipe(notificacao.id, '/notificacao').then((response) => {
        defineNotificacoes()
    })
}

function retornaPermissao(usuario, permissoes) {
    for (const permissao of permissoes) {
        if (usuario.id == permissao.usuarioId) {
            return permissao.permissao
        }
    }
}

function trocarRota(idProjeto, rota, propriedadeCookie) {
    VueCookies.set(propriedadeCookie, idProjeto)
    router.push(rota).then(() => {
        window.location.reload()
    });
    emit('fecharPopUp')
}

</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-button {
    display: none;
}

::-webkit-scrollbar-track {
    height: 100vw;
    background-color: #D7D3DB;
}

::-webkit-scrollbar-thumb {
    background-color: #c7b8cc;
}

::-webkit-scrollbar-corner {
    background-color: #D7D3DB;
}
</style>
