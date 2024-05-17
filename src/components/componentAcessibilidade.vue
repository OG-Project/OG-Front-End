<template>
    <div class="w-[75vw] h-[92vh] flex flex-col  ">
        <div>
            <h1 style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);" 
            class="m-[5%] border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                {{ $t('acessibilidade.Acessibilidade') }}
                <!-- {{ configuracao }} -->
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">

                <div style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);" 
                class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span class="">{{ $t('acessibilidade.Alterar Idioma') }}</span>
                        <selectPadrao :lista-select="listaIdiomas"
                            v-model="idioma" @click="alterarIdioma(idioma)"/>
                    </div>
                    
                    <div class="flex justify-between items-center gap-5">
                        <span class="">{{ $t('acessibilidade.Libras') }}</span>
                        <CheckBox :key="isVlibra.valueOf()" tipo="toggle" el-id="checkLibras"
                            :checked="gerarBooleano('checkLibras')" @envia-valor="libras($event)">
                        </CheckBox>
                        <!-- Boolean(1) -->
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="">{{ $t('acessibilidade.Teclado Virtual') }}</span>
                        <CheckBox :key="isTecladoVirtual.valueOf()" tipo="toggle" el-id="checkTecladoVirtual"
                            :checked="gerarBooleano('checkTecladoVirtual')" @envia-valor="tecladoVirtual($event)">
                        </CheckBox>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, ref, onMounted, computed } from 'vue';
import CheckBox from '../components/checkBox.vue'
import { perfilStore } from '../stores/perfilStore';
import selectPadrao from './selectPadrao.vue';
import VueCookies from "vue-cookies";
import { storeToRefs } from 'pinia';
import { conexaoBD } from '../stores/conexaoBD';
import { watch } from 'vue';
import { onUnmounted } from 'vue';
let perfil = perfilStore()
let conexao = conexaoBD()
const { fonteTitulo } = storeToRefs(perfil)
const { fonteCorpo } = storeToRefs(perfil)

watch(() => VueCookies.get('Idioma'), (valorIdioma) => {
    switch (valorIdioma) {
        case 'pt-BR':
            idioma.value = 'Português';
            break;
        case 'en':
            idioma.value = 'English';
            break;
        case 'es':
            idioma.value = 'Español';
            break;
        case 'zh':
            idioma.value = '中国人';
            break;
        case 'jp':
            idioma.value = '日本語';
            break;
        case 'ru':
            idioma.value = 'Русский';
            break;
        default:
            idioma.value = 'Português';
    }
});

const idioma = ref(pegaALinguagemDosCookies())

function pegaALinguagemDosCookies(){
    let valorIdioma = VueCookies.get('Idioma')
    switch (valorIdioma) {
        case 'pt-BR':
            return 'Português';
            break;
        case 'en':
            return  'English';
            break;
        case 'es':
            return  'Español';
            break;
        case 'zh':
            return  '中国人';
            break;
        case 'jp':
            return  '日本語';
            break;
        case 'ru':
            return  'Русский';
            break;
        default:
            return  'Português';
    }
}

let isVlibra = ref(false)
let isTecladoVirtual = ref(false)
let isDigitarVoz = ref(false)
let usuario = ref({})

onUnmounted(() => {
    window.location.reload()
})

const listaIdiomas = ref(['Português', 'English', 'Español', '中国人', '日本語', 'Русский']);

function alterarIdioma(value) {
    switch (value) {
        case 'Português':
            console.log('Português');
            VueCookies.set("Idioma", "pt-BR", 100000000000);
            break;
        case 'English':
            console.log('English');
            VueCookies.set("Idioma", "en", 100000000000);
            break;
        case 'Español':
            VueCookies.set("Idioma", "es", 100000000000);
            break;
        case '中国人':
            VueCookies.set("Idioma", "zh", 100000000000);
            break;
        case '日本語':
            VueCookies.set("Idioma", "jp", 100000000000);
            break;
        case 'Русский':
            VueCookies.set("Idioma", "ru", 100000000000);
            break;
    }// Recarrega a página após alterar o idioma
};

onBeforeMount(async () => {
})
// mexer com cookies
onMounted(async () => {
    usuario.value = await
        conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')), '/usuario')
    // console.log(usuario.value);
    // console.log(usuario.value);
    isVlibra.value = usuario.value.configuracao.isLibras
    isTecladoVirtual.value = usuario.value.configuracao.isTecladoVirtual
    isDigitarVoz.value = usuario.value.configuracao.isDigitarVoz
    // console.log(isDigitarVoz.value);
    // console.log(isDigitarVoz.value);
    // console.log(isVlibra.value);
    // console.log(isVlibra.value);
    // console.log(isTecladoVirtual.value);
    // console.log(isTecladoVirtual.value);
    VueCookies.config('30d')
    VueCookies.set("Idioma", "pt-BR", 100000000000);
    arrumaIndexDaListaDeIdiomas()
})

function arrumaIndexDaListaDeIdiomas(){
    let index = listaIdiomas.value.indexOf(idioma.value)
    listaIdiomas.value.splice(index, 1)
    listaIdiomas.value.unshift(idioma.value)
}

function gerarBooleano(id) {
    console.log(id);
    if (id == 'checkDigitarVoz') {
        return isDigitarVoz.value ? true : false
    } else if (id == 'checkLibras') {
        return isVlibra.value ? true : false
    } else if (id == 'checkTecladoVirtual') {
        return isTecladoVirtual.value ? true : false
    }
}

function digitarVoz(a) {
    perfil.isVoiceMaker = a.valor
    usuario.value.configuracao.isDigitarVoz = a.valor
    conexao.atualizar(usuario.value, '/usuario')
    console.log(a.valor + " digitar")
}
function libras(a) {
    perfil.isVlibras = a.valor
    usuario.value.configuracao.isLibras = a.valor
    conexao.atualizar(usuario.value, '/usuario')

    console.log(a.valor + " libras")
}
function tecladoVirtual(a) {
    perfil.isTecladoVirtual = a.valor
    usuario.value.configuracao.isTecladoVirtual = a.valor
    conexao.atualizar(usuario.value, '/usuario')
    console.log(a.valor + " teclado")
}
</script>

<style scoped></style>