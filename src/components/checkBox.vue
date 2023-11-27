<template>
  <div>
    <div v-if="props.tipo === 'checkbox'">
      <input id="checkbox" type="checkbox" @click="check('checkbox')" />
    </div>
    <div v-if="props.tipo === 'toggle'">
      <div :style="estiloToggle" id="bordaToggle" @click="check('toggle')">
        <svg style="width: 60px;height: 30px;">
          <circle
            id="toggle"
            :cx="posicaoBola"
            cy="15"
            r="12px"
            :fill="corBolaToggle"
          ></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import mojs from '@mojs/core';

const props = defineProps({
  tipo: {
    type: String,
    default: 'checkbox',
  },
});

let posicaoBola = 14;
let estiloToggle = ref({
  width: '60px',
  height: '30px',
  backgroundColor: '#F3F3F3',
  borderRadius: '20px',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
});
let ativo = false;
let corBolaToggle = ref('#620BA7');

function check(tipo) {
  if (!ativo) {
    ativo = true;
    if (tipo === 'toggle') {
      const animation = new mojs.Html({
        el: '#toggle',
        x: { 0: 30, easing: 'sin.in' },
        onComplete: () => {
          // Função chamada após a animação ser concluída
          estiloToggle.value = {
            width: '60px',
            height: '30px',
            backgroundColor: '#620BA7',
            borderRadius: '20px',
            cursor: 'pointer',
            position: 'relative',
            display: 'inline-block',
          };
          corBolaToggle.value = '#F3F3F3';
        },
      });

      animation.play();
    }
  } else {
    ativo = false;
    if (tipo === 'toggle') {
      const animation = new mojs.Html({
        el: '#toggle',
        x: { 30: 0, easing: 'sin.out' },
        onComplete: () => {
          estiloToggle.value = {
            width: '60px',
            height: '30px',
            backgroundColor: '#F3F3F3',
            borderRadius: '20px',
            cursor: 'pointer',
            position: 'relative',
            display: 'inline-block',
          };
          corBolaToggle.value = '#620BA7';
        },
      });
      animation.play();
    }
  }
}
</script>

<style scoped>
  input[type="checkbox"]{
    accent-color: #620BA7;
    
  }
  #checkbox{
    border-radius: 0px;
    border-color: #620BA7;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
</style>
