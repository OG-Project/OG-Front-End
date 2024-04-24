<template>
    <div class="w-full h-full flex flex-col bg-brancoNeve">
        <div class="w-[100%] border-2 mt-4 mb-4 shadow-lg min-h-[5vh] flex flex-col">
            <div class=" w-full flex flex-row">
                <img v-if="usuarioCookies != verificacao"
                    class="shadow-2xl h-[60px] w-[60px] mt-4 mr-4 ml-4 rounded-full" :src="'data:' +
                    usuarioCookies.foto.tipo +
                    ';base64,' +
                    usuarioCookies.foto.dados
                    " />
                <div class="w-full pb-2 pr-2 flex justify-end items-end">
                    <TextAreaPadrao width="23vw" height="8vh" class="pt-6 pb-4" placeholder="Comentario no projeto"
                        tamanho-da-fonte="1rem" resize="vertical" v-model="comentarioSendoEnviado"></TextAreaPadrao>
                </div>
            </div>
            <div class=" w-full pb-2 pr-2 flex justify-end">
                <Botao texto="Enviar" preset="PadraoRoxo" tamanhoPadrao="pequeno" :funcaoClick="enviaComentario"
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
let usuarioCookies = ref();
let verificacao = ref()
let comentariosProjeto =[];
onMounted(() => {
    buscaUsuario()
})

async function buscaUsuario() {
    usuarioCookies.value = await conexao.buscarUm(idUsuarioCookie, "/usuario")
}
function enviaComentario(comentario) {
  comentariosProjeto.push({
    autor: comentario[1],
    conteudo: comentario[0]
  });
  editaProjeto.editaProjeto() // passar todos os dados do projeto 
}
</script>

<style lang="scss" scoped></style>