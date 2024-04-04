<template>
    <div class="flex flex-row w-max h-[10%] justify-center items-center">
        <div v-for="nome of listaDeNomesVisiveis" class=" truncate ">
            <div class="border-r-2 flex items-center justify-center w-[10vw]">
                {{ nome.charAt(0).toUpperCase() + nome.slice(1) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
let api = conexaoBD()
let propriedadeVisiveis = ref([])
let listaDeNomesVisiveis = ref([])
const props = defineProps({
    projeto: {}
})
onMounted(() => {
    DefineListaDeNomes()
})

async function DefineListaDeNomes() {
    let projeto2 = await props.projeto
    let visualizacao = await api.procurar("/visualizacaoEmLista/" + projeto2.id)
    propriedadeVisiveis.value = visualizacao.propriedadeVisiveis
    listaDeNomesVisiveis.value.push("nome")
    listaDeNomesVisiveis.value.push("Descrição")
    for(const propriedade of propriedadeVisiveis.value){
        listaDeNomesVisiveis.value.push(propriedade.nome)
    }
    console.log(listaDeNomesVisiveis)
}

</script>

<style lang="scss" ></style>