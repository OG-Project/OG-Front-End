<template>
    <div class="w-full h-full flex flex-col overflow-y-auto">
        <div v-if="comentariosProjeto != []" class="w-full h-full">
            <div class="w-[100%]  mt-4 min-h-[5vh] flex flex-col border-b-[1px] border-roxo "
                v-for="comentario of comentariosProjeto">
                <div class=" w-full flex flex-row">
                    <div class="flex items-center h-full">
                        <img v-if="usuarioCookies != verificacao"
                            class="shadow-2xl h-[60px] min-w-[60px]  mr-4 ml-4 rounded-full" :src="'data:' +
                             comentario.autor.foto.tipo +
                                 ';base64,' +
                                comentario.autor.foto.dados
                        " />
                    </div>
                    <div class="w-full pb-2 pr-2 flex justify-end max-w-full">
                        <div class="w-full flex pt-2">
                            <p class="pr-2"> {{ comentario.autor.username }}</p> comentou: <p
                                class="text-roxo pl-2 break-all w-[100%]"> {{ comentario.conteudo }}</p>
                        </div>
                    </div>
                    <div class="w-[20%] flex items-start">
                        <div class="text-[0.60rem]">
                            {{ formatarData(comentario.data) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[100%]  mt-4  shadow-lg min-h-[55%] max-h-[100%] flex flex-col justify-end">
            <div class=" w-full flex flex-row">
                <img v-if="usuarioCookies != verificacao"
                    class="shadow-2xl h-[60px] w-[60px] mt-4 mr-4 ml-4 rounded-full" :src="'data:' +
            usuarioCookies.foto.tipo +
            ';base64,' +
            usuarioCookies.foto.dados
            " />
                <div class="w-full pb-2 pr-2 flex justify-end items-end">
                    <TextAreaPadrao width="23vw" height="8vh" class="pt-6 pb-4" placeholder="Comente no projeto"
                        tamanho-da-fonte="1rem" resize="vertical" v-model="comentarioSendoEnviado"></TextAreaPadrao>
                </div>
            </div>
            <div class=" w-full pb-2 pr-2 flex justify-end">
                <Botao texto="Comentar" preset="PadraoRoxo" tamanhoPadrao="pequeno" :funcaoClick="enviaComentario"
                    :parametrosFuncao="[comentarioSendoEnviado, usuarioCookies]"></Botao>
            </div>
        </div>

    </div>
</template>

<script setup>
import VueCookies from "vue-cookies";
import Botao from "../components/Botao.vue";
import TextAreaPadrao from "../components/textAreaPadrao.vue";
import { onMounted, ref, watch } from "vue";
import { conexaoBD } from "../stores/conexaoBD";
import { editaProjetoStore } from "../stores/editaProjeto";
const conexao = conexaoBD();
const editaProjeto = editaProjetoStore();
const idUsuarioCookie = VueCookies.get("IdUsuarioCookie")
const IdProjetoAtual = VueCookies.get("IdProjetoAtual")
let usuarioCookies = ref();
let comentarioSendoEnviado = ref("");
let verificacao = ref()
let comentariosProjeto = ref([]);
let projeto;
onMounted(() => {
    buscaUsuario()
    parametrosProjeto();
})

async function buscaUsuario() {
    usuarioCookies.value = await conexao.buscarUm(idUsuarioCookie, "/usuario")
}
async function parametrosProjeto() {
    projeto = await conexao.buscarUm(IdProjetoAtual, "/projeto")
    comentariosProjeto.value = projeto.comentarios
    console.log(comentariosProjeto.value)
}
function enviaComentario(comentario) {
    comentariosProjeto.value.push({
        autor: comentario[1],
        conteudo: comentario[0]
    });
    console.log(projeto)
    editaProjeto.editaProjeto(projeto.id, projeto.nome, projeto.descricao, projeto.projetoEquipes, projeto.tarefas,projeto.propriedades
        , projeto.statusList, projeto.responsaveis, projeto.dataFinal
        , projeto.tempoAtuacao, projeto.categoria,projeto.indexLista, comentariosProjeto.value) // passar todos os dados do projeto 
}
function formatarData(data) {
    let dataFormatada = new Date(data)
    let hora = dataFormatada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    let dataHoje = dataFormatada.toLocaleDateString('pt-BR');
    dataHoje = dataHoje.split("/2024")
    return dataHoje[0] + ' ' + hora
}
</script>

<style lang="scss" scoped></style>