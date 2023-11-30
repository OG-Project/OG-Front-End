<template>
    <div class="w-[95%] h-full flex flex-col items-center">
        <select v-model="propriedadeAtual" class="w-[95%] h-[5%]">
            <option v-for="tipo of listaDeTipos" :value="tipo.valor">
                {{ tipo.nome }}
            </option>
        </select>

        <div class="divMaior">
            <div class="w-[89%] ">
                <div v-for="propriedade of projeto.propriedades"
                    class="w-[25%] h-max flex items-center flex-col bg-[#B6BFE9] pt-[5px]">
                    <div class="w-[80%] p-[1%] flex justify-center bg-white font-Poppins font-medium text-[1vw] ">
                        {{ propriedade.nome }}
                    </div>
                    <div v-for="tarefa of projeto.tarefas " class="w-[80%] pt-[2vh]">
                        <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                    </div>
                    <div class="flex justify-start w-[80%] pb-[2vh] pt-[2vh]">
                        <p>+ Nova</p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CardTarefas from './cardTarefas.vue';
import { conexaoBD } from '../stores/conexaoBD';

let api = conexaoBD()
let projetoApi = api.procurar("/projeto?id=1")
let projeto = projetoObjeto()
console.log(projeto)

const propriedadeAtual = ref(null);

const listaDeTipos = ref([
    {
        nome: "Texto",
        valor: "STRING"
    },
    {
        nome: "Numero",
        valor: "NUMBER"
    },
    {
        nome: "Status",
        valor: "STATUS"
    },
    {
        nome: "Data",
        valor: "DATE"
    },
])
let listaDeTarefasPorPropriedade = ref()


async function definePropriedades() {
    return ref((await api.api).data)
}
async function projetoObjeto() {

    const resultado = await projetoApi;
    return projeto = resultado[0]
}
</script>

<style scoped lang="scss">
@import url(../assets/main.css);

.divMaior {
    @apply bg-brancoNeve;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 72%;
    align-items: center;
    justify-content: center;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    overflow-y: auto;
    overflow-x: auto;
    position: relative;
    box-shadow: "0px 2px rgb(189, 189, 189)";

}
</style>
