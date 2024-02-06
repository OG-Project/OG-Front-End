<template>
    <div class="w-[95%] h-full flex flex-col items-center">
        <select v-model="propriedadeAtual" class="w-[95%] h-[5%]">
            <option v-for="tipo of listaDeTipos" :value="tipo.valor">
                {{ tipo.nome }}
            </option>
        </select>

        <div class="divMaior">
            <div class="w-[89%] h-[40%] flex flex-row gap-[7%]">
                <div v-for="propriedade of lista" class="w-[20%]">


                    <div class="listaDeTarefasPorPropriedade">
                        <div
                            class="w-[80%] p-[1%] flex bg-white justify-center font-Poppins font-medium text-[1vw] rounded-md">
                            <div class="w-[90%] flex justify-center">
                                {{ propriedade.nome }}
                            </div>
                            <div class="w-[10%]">
                                <img src="../assets/image 3.png">
                            </div>
                        </div>
                        <div v-if="propriedadeAtual != 'STATUS'">
                            <div v-for="tarefa of projeto.tarefas " class="w-[80%] pt-[2vh]">
                                <div v-for="propriedadeTarefa of tarefa.valorPropriedadeTarefas">
                                    <div v-if="propriedadeTarefa.propriedade.id == propriedade.id">
                                        <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="propriedadeAtual == 'STATUS'">

                            <div v-for="tarefa of projeto.tarefas " class="w-[80%] pt-[2vh]">
                                <div v-if="tarefa.status != null && tarefa.status.id == propriedade.id">
                                    <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-start w-[80%] pb-[2vh] pt-[2vh]">
                            <p>+ Nova</p>
                        </div>
                    </div>
                </div>
                <div class="novaPropriedade">
                    <h1>+Nova</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CardTarefas from './cardTarefas.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from "vue-cookies"

let api = conexaoBD()
let projetoApi = api.procurar("/projeto?id=1")
let projeto = projetoObjeto()
let listaDeTarefas = [];
let lista = ref([]);
cookies()
defineListaDeTarefas()

const propriedadeAtual = ref("STATUS");
const listaDeTipos = ref([
    {
        nome: "Texto",
        valor: "TEXTO"
    },
    {
        nome: "Numero",
        valor: "NUMERO"
    },
    {
        nome: "Status",
        valor: "STATUS"
    },
    {
        nome: "Data",
        valor: "DATA"
    },
])

watch(propriedadeAtual, async () => {
    await defineListaDeTarefas()
})

async function definePropriedades() {
    return ref((await api.api).data)
}
async function cookies() {
    let usuario = await api.procurar("/usuario/id?id=2")
    $cookies.set("usuarioCookie", usuario, 1000000000)
}
async function projetoObjeto() {

    const resultado = await projetoApi;
    return projeto = resultado[0]
}
async function defineListaDeTarefas() {
    listaDeTarefas = []
    let projetoTeste = (await (projeto))
    if (propriedadeAtual.value == "STATUS") {
        projetoTeste.statusList.forEach(status => {
            listaDeTarefas.push(status)
        });
    } else {
        projetoTeste.propriedades.forEach(propriedade => {
            if (propriedade.tipo == propriedadeAtual.value) {
                listaDeTarefas.push(propriedade)
            }
        });
    }
    lista.value = listaDeTarefas
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

.listaDeTarefasPorPropriedade {
    @apply w-full h-max flex items-center flex-col bg-[#B6BFE9] pt-[5px];
    box-shadow: 0px 5px 7px rgb(99, 99, 99);

}
</style>
