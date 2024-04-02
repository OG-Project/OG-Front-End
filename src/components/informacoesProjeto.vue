<template>
    <div class="w-[20vw] max-h-max h-[96vh] flex flex-col border-2 gap-8 border-black border-b-0 overflow-y: auto">
        <div class="h-[6%] pt-8 flex items-end justify-center">
            <h1 class="text-3xl font-semibold">Informações</h1>
        </div>
        <div class="pt-8 gap-4 min-h-[8%] w-[100%] flex flex-col justify-evenly">
            <div class="flex pl-8 gap-2">
                <div class="w-[60%] justify-start flex-row">
                    <p>Nome do projeto:</p>
                </div>
                <div class="w-[40%] justify-end flex-row">
                    <p class="w-[100%] text-[#620BA7]">{{ nomeProjeto }}</p>
                </div>
            </div>
            <div class="flex pl-8">
                <div class="w-[60%] justify-start flex-row">
                    <p>Data Inicial:</p>
                </div>
                <div class="w-[40%] justify-end flex-row">
                    <p class="text-[#620BA7]">{{ DataInicialProjeto }}</p>
                </div>
            </div>
        </div>
        <div class="h-[4%] flex items-center justify-center p-8">
            <h1 class="text-xl font-semibold">Status</h1>
        </div>
        <div class="h-[4%] flex items-center justify-center">
            <div class="flex flex-col items-center justify-center h-[80%] w-[100%] gap-3" v-if="temLista(listaStatus)">
                <div v-for="status of listaStatus">
                    <p  :style="styleStatus(status)">
                        {{ status.nome }}
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-center h-[80%] w-[100%]" v-if="!temLista(listaStatus)">
                    <p>
                        ----------
                    </p>
            </div>
        </div>
        <div class="h-[4%] flex items-center justify-center p-8">
            <h1 class="text-xl font-semibold">Propriedades</h1>
        </div>
        <div class="h-[35%] flex flex-col items-center justify-center p-8" v-if="!temLista(listaPropriedades)">
            <img :src="NotePad" class="h-[200px] w-[200px]" />
            <p class="text-center">Esta tarefa não possui nenhuma propriedade</p>
        </div>
        <div class="h-[10%] flex flex-col pl-4" v-if="temLista(listaPropriedades)">
            <div v-for="propriedade of listaPropriedades" class="flex pl-8 gap-2">
                <p>Nome Propriedade:</p>
                <p class="text-center">{{ propriedade.nome }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NotePad from '../imagem-vetores/NotePad.svg'
const props = defineProps({
    nomeProjeto: String,
    DataInicialProjeto: String,
    listaPropriedades: [],
    listaStatus: []
})

onMounted(() => {

})

function temLista(lista) {
    if (lista.length != 0) {
        return true
    }
    return false;
}



function styleStatus(statusRecebido) {
    const style = {
        height: '100%',
        width: '100%',
        display: 'flex',
        padding:'0.5vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: corBackgroundStatus(statusRecebido)
    }
    console.log(style.backgroundColor)
    return style;
}

function corBackgroundStatus(statusRecebido) {
    let cor=""
    props.listaStatus.forEach((status) => {
        if (status.nome == statusRecebido.nome && status.cor==statusRecebido.cor) {
            cor= "#"+status.cor;
        }
    })
    return cor;
}

</script>

<style lang="scss" scoped></style>