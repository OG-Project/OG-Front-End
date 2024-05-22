
<template>
    <svg width="200" height="201" viewBox="0 0 200 201" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.5127 0.0771484L198.885 54.1728L153.893 190.069L4.34313e-05 145.578L49.5127 0.0771484Z" fill="#D9D9D9"/>
        <rect x="41.6262" y="18.9463" width="158.309" height="154.206" fill="#E8E8E8"/>
        <ellipse cx="120.465" cy="26.7542" rx="15.7678" ry="16.2664" fill="var(--roxo)"/>
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