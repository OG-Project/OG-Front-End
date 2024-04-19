<template>
    <div class="w-[100%] border-2 mt-4 mb-4 shadow-lg min-h-[15vh] pr-4 z-10 bg-brancoNeve">
        <!-- <img v-if="usuarioCookies.foto.tipo != null" class="shadow-2xl h-[60px] w-[60px] mt-4 mr-4 ml-4 rounded-full"
            :src="'data:' +
            usuarioCookies.foto.tipo +
            ';base64,' +
            usuarioCookies.foto.dados
            " /> -->
        <div class="pb-2 flex  items-end">
            <div class=" pl-4 pt-4 w-full flex justify-start">
                <TextAreaPadrao width="15vw" height="10vh"  placeholder="comentario"
                tamanho-da-fonte="1rem" resize="vertical" v-model="comentarioSendoEnviado"></TextAreaPadrao>
            </div>
            <div class="w-full flex justify-end pb-2">
                <Botao texto="Enviar" preset="PadraoRoxo" tamanhoPadrao="pequeno" :funcaoClick="enviaComentario"
                :parametrosFuncao="[comentarioSendoEnviado, usuarioCookies]"></Botao>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Botao from './Botao.vue';
import TextAreaPadrao from './textAreaPadrao.vue';
import { editaProjetoStore } from '../stores/editaProjeto';
import VueCookies from "vue-cookies";
import { conexaoBD } from '../stores/conexaoBD';
let comentarioSendoEnviado = ref("")
let comentarios = ref([])
let idProjeto = VueCookies.get("IdProjetoAtual")
let editaProjeto = editaProjetoStore();
let conexao = conexaoBD();
onMounted(() => {
    autenticaUsuarioCookies();
})

let usuarioId = VueCookies.get("IdUsuarioCookie");

let usuarioCookies = ref();

async function autenticaUsuarioCookies() {
    usuarioCookies.value = await autenticarUsuario(usuarioId);
}

async function autenticarUsuario(id) {
    let usuarios = banco.procurar("/usuario");
    let listaUsuarios = await usuarios;
    return listaUsuarios.find((usuario) => usuario.id == id);
}

function enviaComentario(comentarioRecebido) {
    let comentario = {
        autor: comentarioRecebido[1],
        conteudo: comentarioRecebido[0]
    }
    comentarios.value.push(comentario);
    let projeto = conexao.buscarUm(idProjeto, "/projeto")

    editaProjeto.editaProjeto((projeto.id, projeto.nome, projeto.descrica, projeto.projetoEquipes, 
    projeto.propriedade, projeto.status, projeto.responsaveis, projeto.dataFinal, projeto.tempoAtuacao, projeto.indexLista, comentarios.value));

    comentarioSendoEnviado.value = "";
    abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}
</script>

<style lang="scss"></style>