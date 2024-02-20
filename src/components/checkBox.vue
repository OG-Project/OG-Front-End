<template>
  <div>
    <div v-if="props.tipo === 'checkbox'" class="flex items-center">
      <input
        id="checkbox"
        type="checkbox"
        :checked="props.modelValue"
        @click="check('checkbox'), $emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div v-if="props.tipo === 'toggle'">
      <div
        :style="estiloToggle"
        id="bordaToggle"
        @click="check('toggle'), $emit('update:modelValue', $event.target.value)"
      >
        <svg :style="estiloSVG">
          <circle
            id="toggle"
            :cx="posicaoBola"
            :cy="posicaoEixoY"
            :r="raioDaBola"
            :fill="corBolaToggle"
          ></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import mojs from "@mojs/core";
import { defineProps, onMounted } from "vue";

defineEmits(["update:modelValue"]);

const props = defineProps({
  tipo: {
    type: String,
    default: "checkbox",
  },
  tamanho: {
    type: String,
    default: "medio",
  },
  modelValue: {
      type: Boolean, // Adjust type if necessary
      default: false,
    },
});

let posicaoBola = ref(14);
let ativo = ref(props.modelValue);
let corBolaToggle = ref("#620BA7");
let estiloSVG = ref({
  width: "60px",
  height: "30px",
});
let raioDaBola = ref("12px");
let maximoMovimentoBola = ref(30);
let posicaoEixoY = ref(15);

let estiloBolaInicio = ref({
  width: "60px",
  height: "30px",
  backgroundColor: "#F3F3F3",
  borderRadius: "20px",
  cursor: "pointer",
  position: "relative",
  display: "inline-block",
});

let estiloBolaFinal = ref({
  width: "60px",
  height: "30px",
  backgroundColor: "#620BA7",
  borderRadius: "20px",
  cursor: "pointer",
  position: "relative",
  display: "inline-block",
});

switch (props.tamanho) {
  case "pequeno":
    estiloBolaInicio.value = {
      width: "45px",
      height: "22px",
      backgroundColor: "#F3F3F3",
      borderRadius: "20px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloBolaFinal.value = {
      width: "45px",
      height: "22px",
      backgroundColor: "#620BA7",
      borderRadius: "20px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloSVG.value = {
      width: "45px",
      height: "22px",
    };
    raioDaBola.value = "9px";
    maximoMovimentoBola.value = 20;
    posicaoEixoY.value = 11;
    posicaoBola.value = 12;
    break;
  case "medio":
    estiloBolaInicio.value = {
      width: "60px",
      height: "30px",
      backgroundColor: "#F3F3F3",
      borderRadius: "20px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloBolaFinal.value = {
      width: "60px",
      height: "30px",
      backgroundColor: "#620BA7",
      borderRadius: "20px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloSVG.value = {
      width: "60px",
      height: "30px",
    };
    raioDaBola.value = "12px";
    maximoMovimentoBola.value = 30;
    posicaoEixoY.value = 15;
    posicaoBola.value = 15;
    break;
  case "grande":
    estiloBolaInicio.value = {
      width: "90px",
      height: "45px",
      backgroundColor: "#F3F3F3",
      borderRadius: "30px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloBolaFinal.value = {
      width: "90px",
      height: "45px",
      backgroundColor: "#620BA7",
      borderRadius: "30px",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
    };
    estiloSVG.value = {
      width: "90px",
      height: "45px",
    };
    raioDaBola.value = "20px";
    maximoMovimentoBola.value = 40;
    posicaoEixoY.value = 23;
    posicaoBola.value = 25;
    break;
}

let estiloToggle = ref(estiloBolaInicio.value);

function check(tipo) {
  console.log(ativo)
  console.log(ativo.value)
  if (ativo.value === false) {
    ativo.value = true;
    console.log(ativo.value);
    if (tipo === "toggle") {
      const animation = new mojs.Html({
        el: "#toggle",
        x: { 0: maximoMovimentoBola.value, easing: "sin.in" },
        onComplete: () => {
          estiloToggle.value = estiloBolaFinal.value;
          corBolaToggle.value = "#F3F3F3";
        },
      });

      animation.play();
    }
  } else {
    ativo.value = false;
    console.log(ativo.value);
    if (tipo === "toggle") {
      const animation = new mojs.Html({
        el: "#toggle",
        x: { [maximoMovimentoBola.value]: 0, easing: "sin.out" },
        onComplete: () => {
          estiloToggle.value = estiloBolaInicio.value;
          corBolaToggle.value = "#620BA7";
        },
      });
      animation.play();
    }
  }
}
function valorJaPassado(){
  if(props.modelValue === false){
    if (tipo === "toggle") {
      const animation = new mojs.Html({
        el: "#toggle",
        x: { [maximoMovimentoBola.value]: 0, easing: "sin.out" },
        onComplete: () => {
          estiloToggle.value = estiloBolaInicio.value;
          corBolaToggle.value = "#620BA7";
        },
      });
      animation.play();
    }
  }
  else{
    const animation = new mojs.Html({
        el: "#toggle",
        x: { 0: maximoMovimentoBola.value, easing: "sin.in" },
        onComplete: () => {
          estiloToggle.value = estiloBolaFinal.value;
          corBolaToggle.value = "#F3F3F3";
        },
      });

      animation.play();
  }
}
</script>

<style scoped>
input[type="checkbox"] {
  accent-color: #620ba7;
}
#checkbox {
  border-radius: 0px;
  border-color: #620ba7;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
