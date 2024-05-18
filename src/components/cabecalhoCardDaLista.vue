<template>
    <div class="flex flex-row w-max h-[10%] justify-center items-center">
        <div v-for="nome of listaDeNomesVisiveis" class=" truncate ">
            <div class="border-r-2 flex items-center justify-center w-[185px]">
                {{ nome.charAt(0).toUpperCase() + nome.slice(1) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
let api = conexaoBD()
let listaDeNomesVisiveis = ref([])
let projeto2 = {}
let visualizacao = {}
const props = defineProps({
    projeto: {},
    listaDePropriedadesVisiveis: ref([]),
})
onMounted(async () => {
    defineListaDeNomes()
})

watch(() => props.listaDePropriedadesVisiveis, async () => {
    defineListaDeNomes()
})

async function defineListaDeNomes() {
    listaDeNomesVisiveis.value = []
    listaDeNomesVisiveis.value.push("nome")
    listaDeNomesVisiveis.value.push("Descrição")
    for (const propriedade of props.listaDePropriedadesVisiveis) {
        listaDeNomesVisiveis.value.push(propriedade.nome)
    }
}

</script>

<style lang="scss"></style>