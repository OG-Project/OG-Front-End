<template>
    <div class="gap-[10%] flex flex-row w-max">
        <div>
            {{ "Nome" }}
        </div>
        <div>
            {{ "Descrição" }}
        </div>
        <div v-for="propriedade in visualizacao2.propriedadeVisiveis">
            <div>
                {{ console.log(propriedade) }}
                {{ propriedade.nome.charAt(0).toUpperCase() + propriedade.nome.slice(1)  }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
let api = conexaoBD()
let projeto = api.procurar("/projeto/59")
let visualizacao = ""
let visualizacao2 = ""
onMounted(() => {
    teste()
})

async function teste() {
    let projeto2 = await projeto
    visualizacao = api.procurar("/visualizacaoEmLista/" + await projeto2.id)
    visualizacao2 = await visualizacao
    console.log(visualizacao2)
}

</script>

<style lang="scss" ></style>