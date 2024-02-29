<template>
    <div class=" w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 class="font-sourceSans m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Aparência
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <div :style="{backgroundColor:'#'+cores[1]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[2]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[3]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[4]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[5]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[6]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[7]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[8]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[9]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[10]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[11]}" class="w-20 h-20"></div>
                    <div :style="{backgroundColor:'#'+cores[12]}" class="w-20 h-20"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import selectPadrao from './selectPadrao.vue';
import convert from 'color-convert';
import { perfilStore } from '../stores/perfilStore'

const perfil = perfilStore()
const cores = ref({
    1: 'FA0808',
    2: 'ED5806',
    3: 'FF7A01',
    4: 'F5B102',
    5: 'F1F200',
    6: 'C6DF29',
    7: '01F300',
    8: 'F30000',
    9: '05BD4F',
    10: '0302F6',
    11: '3C029E',
    12: '7802EB'
})




let cor = ref('#80A4ED')
const styleCor = ref({
    backgroundColor: cor,
    color: contraste(cor),
    fontFamily: 'Poppi'
})

function contraste(cor) {
    const r = parseInt(String(cor).substr(1, 2), 16)
    const g = parseInt(String(cor).substr(3, 2), 16)
    const b = parseInt(String(cor).substr(5, 2), 16)
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
}

onMounted(() => {
    console.log(convert.hsl.hex([314, 82, 56]))

})
// teria que atribuir as cores com hsl,
// pegar a cor do color pick em hex
// e

// criar um molde sem functions ativadas 
// e apenas mude variaveis auxuliares que
// trocam exemplares , ao confirmar mudar 
// as variaveis da store e mudar o site inteiro


function mudarcor() {
    //  alert(cor.value)
    styleCor.value.color = contraste(cor.value)
    //  alert(contraste(cor.value))
    console.log(convert.hex.hsl(cor.value)[0])
}


</script>

<style scoped></style>