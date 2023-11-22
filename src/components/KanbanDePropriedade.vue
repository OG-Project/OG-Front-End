<template>
    <div class="w-full h-full flex flex-col items-center">
        <select v-model="propriedadeAtual" class="w-full h-[5%]">
            <option v-for="tipo of listaDeTipos" :value="tipo.valor">
                {{ tipo.nome }}
            </option>
        </select>

        <div class="divMaior">
            <div v-for="propriedade of nomeDasPropriedades" class="w-full h-full flex justify-center">
                {{ propriedade.nome }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref,watch } from 'vue';
import { propriedades } from '../ObjetosTeste/propriedade.js';

export default {
    setup() {
        const propriedadeAtual = ref(null);
        const nomeDasPropriedades = ref(defineNomeDasPropriedade(propriedadeAtual.value));

        watch(propriedadeAtual, () => {
            nomeDasPropriedades.value = defineNomeDasPropriedade(propriedadeAtual.value);
        });
        const listaDeTipos=[
            {
                nome:"Texto",
                valor:"STRING"
            },
            {
                nome:"Numero",
                valor:"NUMBER"
            },
            {
                nome:"Status",
                valor:"STATUS"
            },
            {
                nome:"Data",
                valor:"DATE"
            },

        ];

        return {
            propriedades,
            propriedadeAtual,
            nomeDasPropriedades,
            listaDeTipos
        };
    },
};

function defineNomeDasPropriedade(propriedadeAtual) {
    const propriedadesFiltradas = [];
    
    propriedades.value.forEach(propriedade => {
        if (propriedade.tipo === propriedadeAtual) {
            if(propriedadesFiltradas.nome==propriedade){
            }else{
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
        @apply 0bg-brancoNeve;
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
