<template>
    <div class="w-[95%] h-full flex flex-col items-center">
        <select v-model="propriedadeAtual" class="w-[95%] h-[5%]">
            <option v-for="tipo of listaDeTipos" :value="tipo.valor">
                {{ tipo.nome }}
            </option>
        </select>

        <div class="divMaior">
            <div v-for="propriedade of projeto.propriedades" class="w-full h-[80%] flex justify-start">
                {{ propriedade.nome }}
                <div v-bind="defineTarefas(propriedade)" v-for="tarefa of listaDeTarefasPorPropriedade">
                    <CardTarefas :tarefa=tarefa altura="2vw" largura="7vw" preset="2"></cardTarefas>
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
let projeto = api.procurar("/projeto?id=1")
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
</script>

<style scoped lang="scss">
@import url(../assets/main.css);

.divMaior {
    @apply bg-brancoNeve;
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 72%;
    align-items: center;
    justify-content: center;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    overflow-y: auto;
    overflow-x: auto;
    position: relative;

}
</style>
