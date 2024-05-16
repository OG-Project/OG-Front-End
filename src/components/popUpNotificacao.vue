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
                    <Pessoa></Pessoa>
                </div>
                <div :style="notificacao.estilo">
                    <div class="pr-1">
                        {{ notificacao.notificacao.criador.username }}
                        {{ notificacao.notificacao.mensagem }}
                    </div>
                    <button v-if="notificacao.notificacao.projeto != null"
                        @click="trocarRota(notificacao.notificacao.projeto.id, '/projeto', 'IdProjetoAtual')">
                        <p class="text-roxo truncate min-w-0">
                            {{ notificacao.notificacao.projeto.nome }}
                        </p>
                    </button>
                    <button v-if="notificacao.notificacao.equipe != null"
                        @click="trocarRota(notificacao.notificacao.equipe.id, '/equipe/telaInicial', 'equipeSelecionada')">
                        <p class="text-roxo truncate min-w-0">
                            {{ notificacao.notificacao.equipe.nome }}
                        </p>
                    </button>
                    <button v-if="notificacao.notificacao.tarefa != null"
                        @click="trocarRota(notificacao.notificacao.tarefa.id, '/criaTarefa', 'IdTarefaCookies')">
                        <p class="text-roxo truncate min-w-0">
                            {{ notificacao.notificacao.tarefa.nome }}
                        </p>
                    </button>
                    <div v-if="notificacao.notificacao.conviteParaEquipe != null || notificacao.notificacao.conviteParaProjeto != null"
                        @click="trocarRota(notificacao.notificacao.projeto.id)" class="flex flex-row min-w-0">
                        <div class="truncate min-w-0 flex flex-row">
                            <button v-if="notificacao.notificacao.conviteParaEquipe != null" class="min-w-0">
                                <div v-if="notificacao.notificacao.conviteParaEquipe.equipe != null" class="min-w-0">
                                    <p class="truncate min-w-0">
                                        {{ notificacao.notificacao.conviteParaEquipe.equipe.nome }}
                                    </p>
                                </div>
                            </button>
                            <button v-if="notificacao.notificacao.conviteParaProjeto != null" class="min-w-0">
                                <div v-if="notificacao.notificacao.conviteParaProjeto.projeto != null" class="w-full">
                                    <p class="truncate min-w-0">
                                        {{ notificacao.notificacao.conviteParaProjeto.projeto.nome }}

                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="w-[25%] flex flex-row" @mouseenter="clearTimer()">
                        <div class="flex flex-row justify-end w-full gap-1"
                            v-if="notificacao.notificacao.conviteParaEquipe != null || notificacao.notificacao.conviteParaProjeto != null">
                            <button class="text-white w-[50%] h-[100%] bg-red-600" @click="removerUsuarioALista(notificacao.notificacao)">
                                X
                            </button>
                            <button class="text-white w-[50%] h-[100%] bg-green-600" @click="adicionaUsuarioALista(notificacao.notificacao)">
                                ✔
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-[10%] h-full flex justify-center items-center" @click="removerUsuarioALista(notificacao.notificacao)">
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
let emit = defineEmits(['fecharPopUp'])
let estilo = ref({})
let timeoutId = null;

onMounted(async () => {
    defineNotificacoes()

})

async function defineNotificacoes() {
    notificacoes.value = await api.buscarUm(usuarioId, '/notificacao/buscar')
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
    let usuario = await api.buscarUm(usuarioId,"/usuario")
    console.log(usuario);
    if (notificacao.conviteParaEquipe != null) {
        api.adicionarUsuarios(usuarioId, notificacao.conviteParaEquipe.equipe.id,retornaPermissao(usuario,notificacao.conviteParaEquipe.permissoes),'/usuario/add')
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
    api.deletarEquipe(notificacao.id, '/notificacao').then(() => {
        defineNotificacoes()
    })
}

function retornaPermissao(usuario,permissoes) {
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
