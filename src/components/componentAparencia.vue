<template>
    <div id="id" class="w-[75vw] h-[92vh] flex flex-col justify-evenly  ">
        <!-- <Input conteudoInput="oi" direcao="direita" styleInput="input-claro" ></Input> -->
        <div>
            <h1 style="font-family: var(--fonteTitulo); font-size: var(--fonteTituloTamanho);"
                class="m-[5%] text-4xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Aparência
            </h1>
        </div>
        <div style="font-family: var(--fonteCorpo); font-size: var(--fonteCorpoTamanho);"
            class=" sm:flex-wrap sm:justify-center flex-row-reverse items-center flex gap-4">
            <div class=" w-[300px] h-[300px]  relative">
                <div
                    class="hexagon shadow-xl right-[70px] absolute z-[10]  bg-[var(--roxo)] rotate-90 w-[166px] h-[152px]">
                </div>
                <div
                    class="hexagon top-[135px] right-[15px] absolute z-[9] bg-[var(--roxoEscuro)] rotate-90 w-[133px] h-[123px]">
                </div>
                <div
                    class="hexagon top-[150px] right-[150px] absolute z-[8] bg-[var(--brancoNeve)] rotate-90 w-[100px] h-[95px]">
                </div>
            </div>

            <div class=" flex flex-col gap-20">
                <div class="flex gap-4">
                    <div class="w-full flex flex-col gap-4  items-center">
                        <div class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">
                            Titulo
                        </div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao class="w-max" @update:model-value="tamanhoFontTitulo"
                            v-model="fonteTamanhoTituloInicial" :listaSelect="tamanhoTitulos">
                        </selectPadrao>
                        <selectPadrao class="w-max" @update:model-value="fontTituloEscolhida"
                            :opcaoSelecionada="perfil.fonteTitulo" :listaSelect="fontsTitulo">
                        </selectPadrao>
                    </div>
                    <div class="w-full flex flex-col gap-4  items-center">
                        <div class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">
                            Corpo de Texto
                        </div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao class="w-max" @update:model-value="tamanhoFontCorpo" :listaSelect="tamanhoCorpos">
                        </selectPadrao>

                        <selectPadrao class="w-max" @update:model-value="fontCorpoEscolhida"
                            :opcaoSelecionada="styleGet.getPropertyValue('--fonteCorpo')" :listaSelect="fontsCorpo">
                        </selectPadrao>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center gap-3">
                    <div class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">Cores</div>
                    <div class="flex flex-wrap justify-center w-96 gap-5">
                        <div @click="corEscolhida(cores[1])" :style="{ backgroundColor: '#' + cores[1] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[2])" :style="{ backgroundColor: '#' + cores[2] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[3])" :style="{ backgroundColor: '#' + cores[3] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[4])" :style="{ backgroundColor: '#' + cores[4] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[5])" :style="{ backgroundColor: '#' + cores[5] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[6])" :style="{ backgroundColor: '#' + cores[6] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[7])" :style="{ backgroundColor: '#' + cores[7] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[8])" :style="{ backgroundColor: '#' + cores[8] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[9])" :style="{ backgroundColor: '#' + cores[9] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[10])" :style="{ backgroundColor: '#' + cores[10] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[11])" :style="{ backgroundColor: '#' + cores[11] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div @click="corEscolhida(cores[12])" :style="{ backgroundColor: '#' + cores[12] }"
                            class="cores cursor-pointer w-10 h-10">
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center gap-5">
                    <span class="text-[var(--fonteCorpoTamanho)]">Modo Claro</span>
                    <CheckBox 
                    :key="isDark.valueOf()"
                    tipo="toggle" 
                    :checked="gerarBooleano('checkDarkMode')"
                    el-id="checkDarkMode" 
                    @envia-valor="temaDoSite($event)">
                    </CheckBox>
                    <span class="text-[var(--fonteCorpoTamanho)]">Modo Escuro</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import selectPadrao from './selectPadrao.vue';
import convert from 'color-convert';
import Botao from './Botao.vue'
import VueCookies from 'vue-cookies';

import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore'
import CheckBox from './checkBox.vue';
import { conexaoBD } from '../stores/conexaoBD';
const perfil = perfilStore()
const conexao = conexaoBD()
const { hue } = storeToRefs(perfil)
const { fonteCorpo } = storeToRefs(perfil)
const { tamanhoCorpo } = storeToRefs(perfil)
const { tamanhoTitulo } = storeToRefs(perfil)
let usuario = ref()
let fonteTamanhoTituloInicial = ref("")
// let configuracaoa={
//     fonteCorpo:'Poppins',
//     fonteCorpoTamanho:2,
//     fonteTitulo:'Source Sans 3' ,
//     fonteTituloTamanho: 6,
//     hueCor: 273,
//     idioma:'Portugues',
//     isVisualizaProjetos:true,
//     isVisualizaEmail:true,
//     isVisualizaEquipes:true,
//     isVisualizaPerfil:true,
//     isDigitarVoz:false ,
//     isTecladoVirtual: false,
//     isLibras: false
// }
const cores = ref({
    1: '0277f5',
    2: 'f52f02',
    3: 'FF7A01',
    4: 'F5B102',
    5: 'F1F200',
    6: '02f5e9',
    7: '01F300',
    8: 'F30000',
    9: '05BD4F',
    10: '0302F6',
    11: 'f502e5',
    12: '620BA7'
})
let tamanhos = ref([])

let fontsCorpo = ref([])
let fontsTitulo = ref([])
let root = document.documentElement
let styleGet = getComputedStyle(root)
let primeiroListaFonte = ref("")
let cor = ref('#80A4ED')
let configuracao = ref();
let tamanhoCorpos = ref([])
let tamanhoTitulos = ref([])
let isDark=ref(false)


tamanhoTitulos.value = ['Pequeno', 'Normal', 'Grande']
tamanhoCorpos.value = ['Pequeno', 'Normal', 'Grande']
fontsCorpo.value = ['Poppins', 'Source Sans 3', 'Cormorant Garamond', 'Merriweather', 'Proza Libre', 'Quattrocento Sans', 'Quattrocento', 'work Sans']
fontsTitulo.value = ['Poppins', 'Source Sans 3', 'Cormorant Garamond', 'Merriweather', 'Proza Libre', 'Quattrocento Sans', 'Quattrocento', 'work Sans'];
function gerarBooleano(id){
    if(id=='checkDarkMode'){
        return isDark.value
    }
}
function temaDoSite(e) {
    if(!isDark.value){
        root.style.setProperty('--backgroundPuro','#0F0F0F')
        root.style.setProperty('--backgroundItems','#222222')
        root.style.setProperty('--fonteCor','#ffffff')
        isDark.value=!isDark.value
        usuario.value.configuracao.isDark=isDark.value
        conexao.atualizar(usuario.value,'/usuario')
    }else if(isDark.value){
        root.style.setProperty('--backgroundPuro','#ffffff')
        root.style.setProperty('--backgroundItems','#f8f8f8')
        root.style.setProperty('--fonteCor','#000000')
        isDark.value=!isDark.value
        usuario.value.configuracao.isDark=isDark.value
        conexao.atualizar(usuario.value,'/usuario')
    }
    console.log(e);
}

function corEscolhida(a) {
    // parte de conversão de cores e matiz apenas realizar a conversão total de tudo
    console.log('cor ' + a)
    cor.value = "#" + a
    let matizCor = convert.hex.hsl(cor.value)
    console.log('cor escolhida ' + matizCor)
    root.style.setProperty('--hueRoxo', matizCor[0])
    perfil.hue = matizCor[0]
    usuario.value.configuracao.hueCor = matizCor[0] + ''
    console.log(usuario.value.configuracao.hueCor);
    conexao.atualizar(usuario.value, '/usuario')
    try {
        console.log(conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')), '/usuario'));
    } catch (error) {
        console.log(error);
    }
    // VueCookies.set('matizCor',JSON.stringify(matizCor[0],'30d'))
    console.log(matizCor[0])

}
function fontCorpoEscolhida(f) {
    perfil.fonteCorpo = f
    console.log(f)
    root.style.setProperty('--fonteCorpo', f)
    usuario.value.configuracao.fonteCorpo = perfil.fonteCorpo
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('fonteCorpo',JSON.stringify(perfil.fonteCorpo))
}
function fontTituloEscolhida(f) {
    perfil.fonteTitulo = f
    root.style.setProperty('--fonteTitulo', f)
    usuario.value.configuracao.fonteTitulo = perfil.fonteTitulo
    conexao.atualizar(usuario.value, '/usuario')
    // VueCookies.set('fonteTitulo',JSON.stringify(perfil.fonteTitulo))
}
function tamanhoFontTitulo(tamanho) {
    if (tamanho == 'Pequeno') {
        perfil.tamanhoTitulo = 5
    }
    else if (tamanho == 'Normal') {
        perfil.tamanhoTitulo = 6
    }
    else if (tamanho == 'Grande') {
        perfil.tamanhoTitulo = 7
    }
    // VueCookies.set('fonteTituloTamanho',JSON.stringify(perfil.tamanhoTitulo))
    root.style.setProperty('--fonteTituloTamanho', perfil.tamanhoTitulo + "vh")
    usuario.value.configuracao.fonteTituloTamanho = perfil.tamanhoTitulo
    conexao.atualizar(usuario.value, '/usuario')

}
function tamanhoFontCorpo(tamanho) {
    if (tamanho == 'Pequeno') {
        perfil.tamanhoCorpo = 1.5
    }
    else if (tamanho == 'Normal') {
        perfil.tamanhoCorpo = 2
    }
    else if (tamanho == 'Grande') {
        perfil.tamanhoCorpo = 2.5
    }
    // VueCookies.set('fonteCorpoTamanho',JSON.stringify(perfil.tamanhoCorpo))
    root.style.setProperty('--fonteCorpoTamanho', perfil.tamanhoCorpo + "vh")
    usuario.value.configuracao.fonteCorpoTamanho = perfil.tamanhoCorpo
    conexao.atualizar(usuario.value, '/usuario')
}


function contraste(cor) {
    const r = parseInt(String(cor).substr(1, 2), 16)
    const g = parseInt(String(cor).substr(3, 2), 16)
    const b = parseInt(String(cor).substr(5, 2), 16)
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
}

function defineSelect(configuracao) {

    if (configuracao.fonteTituloTamanho == "7") {
        tamanhoTitulos.value.splice(0, 0, tamanhoTitulos.value.splice(2, 1)[0]);
    }
    if (configuracao.fonteTituloTamanho == "6") {
        tamanhoTitulos.value.splice(0, 0, tamanhoTitulos.value.splice(1, 1)[0]);
    }
    if (configuracao.fonteCorpoTamanho == "7") {
        tamanhoCorpos.value.splice(0, 0, tamanhoCorpos.value.splice(2, 1)[0]);
    }
    if (configuracao.fonteCorpoTamanho == "6") {
        tamanhoCorpos.value.splice(0, 0, tamanhoCorpos.value.splice(1, 1)[0]);
    }
    fontFamily(fontsCorpo.value, configuracao.fonteCorpo)
    fontFamily(fontsTitulo.value, configuracao.fonteTitulo)
}

function fontFamily(lista, comparacao) {
    for (const i in lista) {
        if (lista[i] == comparacao) {
            lista.splice(0, 0, lista.splice(i, 1)[0]);
        }
    }
    return lista;
}
async function buscaConfiguracaoesPadrao() {
    let root = document.documentElement.style
    usuario.value =
        await conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')), '/usuario')
    configuracao.value = usuario.value.configuracao
    // root.setProperty('--hueRoxo', configuracao.value.hueCor)
    // root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
    // root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
    // root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho + "vh")
    // root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho + "vh")
    defineSelect(usuario.value.configuracao)
}

onBeforeMount(async () => {
    console.log()
    perfil.fonteCorpo = await JSON.parse(VueCookies.get('fonteCorpo'))
    perfil.fonteTitulo = await JSON.parse(VueCookies.get('fonteTitulo'))
    usuario.value =
        await conexao.buscarUm(JSON.parse
            (VueCookies.get('IdUsuarioCookie')), '/usuario')
    isDark.value=usuario.value.configuracao.isDark
})

onMounted(() => {
    console.log('fonts ' + perfil.fonteCorpo + ' ' + perfil.fonteTitulo)
    console.log(convert.hex.hsl(cor.value)[0])
    buscaConfiguracaoesPadrao()
})
onUpdated(() => {
    console.log('update')
    console.log(styleGet.getPropertyValue('--roxo'));
})
</script>

<style scoped>
.cores:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

.hexagon {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

}
</style>