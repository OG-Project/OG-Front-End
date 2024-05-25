<template>
    <div class=" bg-[var(--backgroundItemsClaros)]  h-full flex flex-col mobile:w-full miniMobile:w-full">
        <div v-if="comentariosProjetoFront.length != 0" class="w-full h-[70%] overflow-y-auto ">
            <div class="w-[100%]  mt-4 min-h-[15%] flex flex-col border-b-[1px] border-[var(--roxo)]"
                v-for="comentario of comentariosProjetoFront">
                <div class="h-max w-full flex flex-row">
                    <div class="flex items-center h-full">
                        <img v-if="usuarioCookies != verificacao"
                        @click="router.push(`/perfil/${comentario.autor.id}`)"
                            class="shadow-2xl h-[60px] min-w-[60px]  mr-4 ml-4 rounded-full" :src="'data:' +
                    comentario.autor.foto.tipo +
                    ';base64,' +
                    comentario.autor.foto.dados
                     " />
                    </div>
                    <div class="w-full pb-2 pr-2 flex justify-end max-w-full">
                        <div class="w-full flex pt-2">
                            <p class="pr-2"> {{ comentario.autor.username }}</p> {{$t('comentario.comentou')}} <p
                                class="text-[var(--roxoClaro)] pl-2 break-all w-[100%] "> {{ comentario.conteudo }}</p>
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
        <div v-else class="w-full h-[70%] ">
            <div class="w-full h-full flex flex-col justify-center items-center ">
                <iconMensagem class=" w-[60%] h-[50%]"></iconMensagem>
                <p class="w-[70%] h-max">{{$t('comentario.naoComentarios')}}</p>
            </div>
        </div>
        <div class="w-[100%]  mt-4  shadow-lg min-h-[30%] max-h-[30%] flex flex-col justify-end">
            <div class=" w-full flex flex-row justify-around">
                <img v-if="usuarioCookies != verificacao" @click="router.push(`/perfil/${comentario.autor.id}`)"
                    class="shadow-2xl h-[60px] w-[60px] mt-4 mr-4 ml-4 rounded-full" :src="'data:' +
            usuarioCookies.foto.tipo +
            ';base64,' +
            usuarioCookies.foto.dados
            " />
                <div class="w-full pb-2 pr-2 pl-2 flex justify-end items-end">
                    <TextAreaPadrao width="20vw" height="8vh" class="pt-6 pb-4" :placeholder="$t('comentario.comente')"
                        tamanho-da-fonte="1rem" resize="vertical" v-model="comentarioSendoEnviado" v-if="screenWidth >= 700"></TextAreaPadrao>
                        <TextAreaPadrao width="70vw" height="8vh" class="pt-6 pb-4" :placeholder="$t('comentario.comente')"
                        tamanho-da-fonte="1rem" resize="vertical" v-model="comentarioSendoEnviado" v-else></TextAreaPadrao>
                </div>
            </div>
            <div class=" w-full pb-2 pr-2 flex justify-end">
                <Botao :texto="$t('comentario.comentar')" preset="PadraoRoxo" tamanhoPadrao="pequeno" :funcaoClick="enviaComentario"
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
import iconMensagem from "../assets/iconMensagem.vue";
import router from "../router";
import { criaHistoricoStore } from "../stores/criaHistorico";
const criaHistorico = criaHistoricoStore();
const conexao = conexaoBD();
const editaProjeto = editaProjetoStore();
const idUsuarioCookie = VueCookies.get("IdUsuarioCookie")
const IdProjetoAtual = VueCookies.get("IdProjetoAtual")
let usuarioCookies = ref();
let comentarioSendoEnviado = ref("");
let verificacao = ref()
let comentariosProjetoBack = ref([]);
let comentariosProjetoFront = ref([]);
let projeto;
onMounted(() => {
    buscaUsuario()
    parametrosProjeto();
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    
})

const screenWidth = ref(window.innerWidth);

async function buscaUsuario() {
    usuarioCookies.value = await conexao.buscarUm(idUsuarioCookie, "/usuario")
}
async function parametrosProjeto() {
    projeto = await conexao.buscarUm(IdProjetoAtual, "/projeto")
    comentariosProjetoFront.value =  projeto.comentarios
    
}
function enviaComentario(comentario) {
    comentariosProjetoBack.value.push({
        autor: comentario[1],
        conteudo: comentario[0]
    }); 
    comentariosProjetoFront.value.push({
        autor: comentario[1],
        conteudo: comentario[0],
        data: new Date()
    });
    VueCookies.set("idAuxEquipe");
    editaProjeto.editaProjeto(projeto.id, projeto.nome, projeto.descricao, projeto.projetoEquipes, projeto.propriedades
        ,projeto.statusList, projeto.responsaveis, projeto.dataFinal
        ,projeto.tempoAtuacao, projeto.categoria, projeto.indexLista, comentariosProjetoFront.value, projeto.tarefas)
         // passar todos os dados do projeto 
         criaHistorico.criaHistoricoProjeto("Comentou no projeto", projeto, usuarioCookies.value);
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