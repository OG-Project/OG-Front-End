<template>
    <div class="scrollBarInfo">
        <div class="h-[6%] pt-8 flex items-end justify-center">
            <h1 class="text-3xl font-semibold">{{$t('criaProjeto.informacoes')}}</h1>
        </div>
        <div class="  h-auto mt-4 mb-4 gap-4 w-[100%] flex flex-col justify-evenly ">
            <div class="flex pl-8 gap-2 " v-if="!mudaAlinhamentoNomeProjeto">
                <div class="w-[60%] justify-start flex-row">
                    <p>{{$t('criaTarefa.project_name')}}:</p>
                </div>
                <div class="w-[40%] justify-end flex-row ">
                    <p class="w-[100%] text-[var(--roxoAtencao)] break-all">{{ nomeProjeto }}</p>
                </div>
            </div>
            <div class="flex flex-col pl-8 gap-2 " v-else>
                <div class="w-[60%] justify-start flex-row">
                    <p>{{$t('criaTarefa.project_name')}}:</p>
                </div>
                <div class="w-full justify-end flex-row ">
                    <p class="w-[100%] text-[var(--roxoAtencao)] break-all">{{ nomeProjeto }}</p>
                </div>
            </div>
            <div class="flex pl-8 mt-4 pb-2">
                <div class="w-[60%] justify-start flex-row">
                    <p>{{$t('criaProjeto.dataInicial')}}:</p>
                </div>
                <div class="w-[40%] justify-end flex-row">
                    <p class="text-[var(--roxoAtencao)]">{{ DataInicialProjeto }}</p>
                </div>
            </div>
            <div class="flex pl-8">
                <div class="w-[60%] justify-start flex-row">
                    <p>{{$t('criaProjeto.dataFinal')}}:</p>
                </div>
                <div class="w-[40%] justify-end flex-row">
                    <p class="text-[var(--roxoAtencao)]">{{ DataFinalProjeto }}</p>
                </div>
            </div>
        </div>
        <div class="h-[4%] flex items-center justify-center p-2">
            <h1 class="text-xl font-semibold">{{$t('criaTarefa.status')}}</h1>
        </div>
        <div class="h-max flex items-center justify-center">
            <div class="flex flex-col items-center justify-center h-[80%] w-[80%] gap-3" v-if="temLista(listaStatus)">
                <div v-for="status of listaStatus">
                    <p :style="styleStatus(status)">
                        {{ status.nome }}
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-center h-[80%] w-[100%]" v-if="!temLista(listaStatus)">
                <p>
                    -----------
                </p>
            </div>
        </div>
        <div class="h-[4%] flex items-center justify-center p-6">
            <h1 class="text-xl font-semibold">{{$t('criaTarefa.properties')}}</h1>
        </div>
        <div class="h-[35%] flex flex-col items-center justify-center p-8" v-if="!temLista(listaPropriedades)">
            <NotePad></NotePad>
            <p class="text-center">{{$t('criaTarefa.this_taks_has_no_properties')}}</p>
        </div>
        <div class="h-[35%] flex flex-col pl-4 gap-8" v-if="temLista(listaPropriedades)">
            <div v-for="propriedade of listaPropriedades" class="flex pl-8 gap-2 h-max">
                <p>{{$t('criaTarefa.property_name')}}:</p>
                <p class="text-center ">{{ propriedade.nome }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NotePad from '../imagemVetores/NotePad.vue'

const props = defineProps({
    nomeProjeto: String,
    DataInicialProjeto: String,
    DataFinalProjeto: String,
    listaPropriedades: [],
    listaStatus: []
})


onMounted(() => {


})




function temLista(lista) {
    if (lista.length != 0 && lista != null && lista != undefined) {
        return true
    }
    return false;
}

function styleStatus(statusRecebido) {
    const style = {
        height: '100%',
        width: '8vw',
        display: 'flex',
        padding: '0.6vh',
        alignItems: 'center',
        justifyContent: 'center',
        wordBreak: "break-all",
        backgroundColor: corBackgroundStatus(statusRecebido),
        color: verificaCorFonte(statusRecebido)
    }
    return style;
}

function corBackgroundStatus(statusRecebido) {
    let cor = ""
    props.listaStatus.forEach((status) => {
        if (status.nome == statusRecebido.nome && status.cor == statusRecebido.cor) {
            cor = "#" + status.cor;
        }
    })
    return cor;
}

function verificaCorFonte(statusRecebido) {
    let cor = ""
    props.listaStatus.forEach((status) => {
        if (status.nome == statusRecebido.nome && status.cor == statusRecebido.cor) {
            cor = "#" + contraste(statusRecebido.cor)

        }
    })
    return cor;
}

function contraste(cor) {
    const r = parseInt(String(cor).substr(1, 2), 16)
    const g = parseInt(String(cor).substr(3, 2), 16)
    const b = parseInt(String(cor).substr(5, 2), 16)
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 145 ? '000' : 'ffff'
}
</script>

<style lang="scss">
.scrollBarInfo::-webkit-scrollbar {
    width: 0.7vw;
    height: 40px;
}

.scrollBarInfo::-webkit-scrollbar-thumb {
    @apply bg-[var(--backgroundItems)];
    border-radius: 10px;
    height: 10px;
}

.scrollBarInfo::-webkit-scrollbar-thumb:hover {
    @apply bg-[var(--backgroundItemsClaros)];
    border-radius: 10px;
    height: 10px;

}

.scrollBarInfo::-webkit-scrollbar-track {
    @apply bg-[var(--backgroundPuro)]
}

.scrollBarInfo::-webkit-scrollbar-button {
    display: none;
}

.scrollBarInfo {
    overflow: hidden;
    transition: overflow-y ;
    @apply overflow-y-auto max-h-max h-[87vh] flex flex-col border-2 gap-8 shadow-xl border-[var(--backgroundItemsClaros)] border-b-0;
}
</style>