<template>
    <div class="gap-[10%] flex flex-row w-max">
        <div>
            {{ "Nome" }}
        </div>
        <div>
            {{ "Descrição" }}
        </div>
        <div v-for="propriedade of propriedadeVisiveis">
            <div>
                {{ propriedade.nome.charAt(0).toUpperCase() + propriedade.nome.slice(1)  }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
let api = conexaoBD()
let propriedadeVisiveis = ref([])
const props = defineProps({
    projeto: Projeto,
    visualizacao: {}
})
onMounted(() => {
    teste()
})

async function teste() {

    propriedadeVisiveis.value = props.visualizacao.propriedadeVisiveis
    console.log(propriedadeVisiveis)
}

</script>

<style lang="scss" ></style>