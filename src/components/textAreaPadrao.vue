
<template>
  <form>
    <textarea :placeholder="props.placeholder" :style="estilo" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"></textarea>
  </form>
</template>

<script setup>
import { defineProps, ref } from 'vue';
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
        color : ""
    }

const estilo = ref({});

const estiloBranco = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: '#000000',
  backgroundColor: '#D7D7D7',
  borderBottom: 'solid 4px #620BA7',
  resize: props.resize
};

const estiloPreto = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: '#FFFFFF',
  backgroundColor: '#777777',
  borderBottom: 'solid 4px #620BA7',
  resize: props.resize
};

const estiloTransparente = {
  width: props.width,
  height: props.height,
  fontSize: props.tamanhoDaFonte,
  color: '#000000',
  borderBottom: 'solid 4px #620BA7',
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
    hoverPadrao.color="#D7D7D7";
    break;
  default:
    estilo.value = estiloBranco;
    break;
}
</script>

<style lang="scss" scoped>

textarea:hover{
    background-color: v-bind('hoverPadrao.color');
}

</style>