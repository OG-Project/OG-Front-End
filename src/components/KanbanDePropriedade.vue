<template>
    <div class="w-[95%] h-full flex flex-col items-center">
        <select v-model="propriedadeAtual" class="w-[95%] h-[5%]">
            <option v-for="tipo of listaDeTipos" :value="tipo.valor">
                {{ tipo.nome }}
            </option>
        </select>

        <div class="divMaior">
            <div v-for="propriedade of nomeDasPropriedades" class="w-full h-[80%] flex justify-start">
                {{ propriedade.nome }}
                <div v-bind="defineTarefas(propriedade)" v-for="tarefa of listaDeTarefasPorPropriedade">
                    <CardTarefas :tarefa=tarefa altura="2vw" largura="7vw" preset="2"></cardTarefas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { propriedades } from '../ObjetosTeste/propriedade.js';
import { tarefas } from '../ObjetosTeste/tarefa.js';
import CardTarefas from './cardTarefas.vue';

export default {
    setup() {
        const propriedadeAtual = ref(null);
        const nomeDasPropriedades = ref(defineNomeDasPropriedade(propriedadeAtual.value));
        watch(propriedadeAtual, () => {
            nomeDasPropriedades.value = defineNomeDasPropriedade(propriedadeAtual.value);
        });
        const listaDeTipos = [
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
        ];
        let listaDeTarefasPorPropriedade = ref([])
        return {
            propriedades,
            propriedadeAtual,
            nomeDasPropriedades,
            listaDeTipos,
            listaDeTarefasPorPropriedade
        };
    },
    components: { CardTarefas, CardTarefas }
};
function defineTarefas(propriedade) {
    let listaDeTarefas;
    tarefas.value.forEach(tarefa => {
        if(tarefa.propriedades.includes(propriedade)){
            listaDeTarefas.push(tarefa)
        }
    });
    listaDeTarefasPorPropriedade =  listaDeTarefas;

}

function defineNomeDasPropriedade(propriedadeAtual) {
    const propriedadesFiltradas = [];

    propriedades.value.forEach(propriedade => {
        if (propriedade.tipo === propriedadeAtual) {
            if (propriedadesFiltradas.nome == propriedade) {
            } else {
                propriedadesFiltradas.push(propriedade);
            }
        }
    });

    return propriedadesFiltradas;
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
