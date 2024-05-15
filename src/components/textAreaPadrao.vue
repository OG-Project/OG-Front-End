
<template>
  <form>
    <textarea :placeholder="props.placeholder" :style="estilo" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"></textarea>
  </form>
</template>

<script setup>
import { get } from '@vueuse/core';
import { onMounted } from 'vue';
import { defineProps, ref } from 'vue';
import VueCookies from 'vue-cookies';
import { conexaoBD } from '../stores/conexaoBD';
defineEmits(['update:modelValue'])
const props = defineProps({
  placeholder: {
    type: String,
    default: "Digite aqui sua mensagem"
  },
  modelValue: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: "80vw" // Usando 80% da largura da viewport
  },
  height: {
    type: String,
    default: "20vh" // Usando 20% da altura da viewport
  },
  tamanhoDaFonte: {
    type: String,
    default: "2vw" // Usando 2% da largura da viewport para o tamanho da fonte
  },
  preset: {
    type: String,
    default: "branco"
  },
  resize: {
    type: String,
    default: "both"
  },
  modelValue:String
});

const hoverPadrao = {
        color : "var(--backgroundItemsClaros)"
    }

const estilo = ref({});
let usuario=  ref()
let configuracao = ref()
const conexao = conexaoBD();
onMounted(() =>{
  buscaConfiguracao()
})

async function buscaConfiguracao(){
  let root = document.documentElement.style
  usuario.value =
    await conexao.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')
  configuracao.value = usuario.value.configuracao
  root.setProperty('--hueRoxo', configuracao.value.hueCor)
  root.setProperty('--hueRoxoClaro', configuracao.value.hueCor)
  root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho+"vh")
  root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho+"vh")
}

const estiloBranco = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: 'var(--fonteCor)',
  backgroundColor: 'var(--backgroundItems)',
  resize: props.resize
};

const estiloPreto = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: '#FFFFFF',
  backgroundColor: 'var(--backgroundItems)',
  resize: props.resize
};

const estiloTransparente = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: 'var(--fonteCor)',
  resize: props.resize
};

switch (props.preset) {
  case 'branco':
    estilo.value = estiloBranco;
    break;
  case 'preto':
    estilo.value = estiloPreto;
    break;
  case 'transparente':
    estilo.value= estiloTransparente;
    hoverPadrao.color="var(--backgroundItems)";
    break;
  default:
    estilo.value = estiloBranco;
    break;
}


</script>

<style lang="scss">

textarea:hover{
    background-color: v-bind('hoverPadrao.color');
}

textarea{
  border-bottom: solid 4px var(--roxo);
  background-color: var(--backgroundPuro);
}
</style>