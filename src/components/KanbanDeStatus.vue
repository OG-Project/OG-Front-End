<template>
    <div class="w-[89%] h-[40%] flex flex-row gap-[7%]">
        <div v-for="propriedade of lista" class="w-[20%]">
            <div :style="propriedade.style">

                <div class="w-[80%] p-[1%] flex bg-white justify-center font-Poppins font-medium text-[1vw] rounded-md">
                    <div class="w-[90%] flex justify-center">
                        {{ propriedade.propriedade.nome }}
                    </div>
                    <div class="w-[10%]">
                        <img src="../assets/image 3.png">
                    </div>
                </div>
                <draggable class="min-h-[15px] min-w-full flex flex-col items-center justify-center"
                    v-model="propriedade.tarefas" :animation="300" group="tarefa" @start="drag = true" @end="drag = false"
                    item-key="tarefa.indice">
                    <template #item="{ element: tarefa }">
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="w-[80%] pt-[2vh]" v-if="tarefa != null">
                                <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                            </div>
                        </div>
                    </template>
                </draggable>
                <div class="flex justify-start w-[80%] pb-[2vh] pt-[2vh]">
                    <p>+ Nova</p>
                </div>
            </div>
        </div>
        <div class="novaPropriedade">
            <h1>+Nova</h1>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CardTarefas from './cardTarefas.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from "vue-cookies"
import draggable from "vuedraggable";
import sortBy from 'sort-by'

let api = conexaoBD()
let projetoApi = api.procurar("/projeto/3")
let lista = ref([]);
let listaStyle = ''
const propriedadeAtual = ref("STATUS");


onMounted(() => {
    console.log(projetoApi)
    cookies()
    defineListaDePropriedades()
})

watch(propriedadeAtual, async () => {
    await defineListaDePropriedades()
})

async function cookies() {
    let usuario = await api.procurar("/usuario/2")
    $cookies.set("usuarioCookie", usuario, 1000000000)
}

async function defineListaDePropriedades() {
    let listaDePropriedades = []
    let projetoTeste = (await (projetoApi))
    if (propriedadeAtual.value == "STATUS") {
        console.log(projetoTeste)
        for (const status of projetoTeste.statusList) {
            let listaDeTarefas = []
            for (const tarefa of projetoTeste.tarefas) {
                if (tarefa.status != null && status.id == tarefa.status.id) {
                    listaDeTarefas.push(tarefa)
                }
            }
            let tarefa2 = {
                propriedade: status,
                tarefas: listaDeTarefas,
                style: listaStyle = {
                    width: "100%",
                    height: "max-content",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: ("#"+status.cor),
                    paddingTop: "5px",
                    boxShadow: " 0px 5px 7px rgb(99, 99, 99)"
                }
            }
            tarefa2.tarefas.sort(sortBy('nome'))
            console.log(tarefa2.tarefas)
            listaDePropriedades.push(tarefa2)

        };
    }
    lista.value = []
    lista.value = listaDePropriedades
    listaDePropriedades = null;
}
function verificaListaVaziaBoolean(tarefas) {
    if (tarefas, length == 0) {
        listaVaziaBoolean = true
    }
}
</script>

<style scoped lang="scss">
@import url(../assets/main.css);

.divMaior {
    @apply bg-brancoNeve;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 72%;
    align-items: center;
    justify-content: center;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    overflow-y: scroll;
    overflow-x: auto;
    position: relative;
    box-shadow: "0px 2px rgb(189, 189, 189)";
}

.novaPropriedade {
    @apply w-[20%] h-[50%] flex-col bg-[#A79DB0] pt-[5px] flex justify-center items-center text-[2vw];
    box-shadow: 0px 5px 7px rgb(99, 99, 99);

}
</style>
