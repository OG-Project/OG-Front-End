<template>
    <svg width="49" height="35" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.00390625" y1="3.26172" x2="49.0039" y2="3.26172" stroke="var(--roxo)" stroke-width="5" />
        <line x1="0.00390625" y1="17.7041" x2="49.0039" y2="17.7041" stroke="var(--roxo)" stroke-width="5" />
        <line x1="0.00390625" y1="32.1455" x2="49.0039" y2="32.1455" stroke="var(--roxo)" stroke-width="5" />
    </svg>
</template>
<script>
import { onMounted, ref } from 'vue';
let configuracao = ref();
let usuario = ref();
onMounted(() => {
    buscaConfiguracaoesPadrao();
})
async function buscaConfiguracaoesPadrao() {
    let root = document.documentElement.style
    usuario.value =
        await conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')), '/usuario')
    configuracao.value = usuario.value.configuracao
    root.setProperty('--hueRoxo', configuracao.value.hueCor)
    root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
    root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
    root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho + "vh")
    root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho + "vh")

}
</script>
