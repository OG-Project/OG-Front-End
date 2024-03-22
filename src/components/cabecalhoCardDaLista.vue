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
                {{ console.log(propriedade) }}
                {{ propriedade.nome.charAt(0).toUpperCase() + propriedade.nome.slice(1)  }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
let api = conexaoBD()
let projeto = api.procurar("/projeto/2")
let propriedadeVisiveis = ref([])
onMounted(() => {
    teste()
})

async function teste() {
    let projeto2 = await projeto
    let visualizacao = api.procurar("/visualizacaoEmLista/" + await projeto2.id)
    let visualizacao2 = await visualizacao
    propriedadeVisiveis.value = visualizacao2.propriedadeVisiveis
    console.log(propriedadeVisiveis)
}

</script>

<style lang="scss" ></style>