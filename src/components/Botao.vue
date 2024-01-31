<template>
  <!-- Verifica se o botão deve ter um ícone ou não -->
  <div v-if="TemIcon === 'sim'">
  <button :class="tamanhoComClass"
    :style="isClick ? clickBotao : isHovered ? hoverBotao : botao"
    @mouseover="hover"
    @mouseout="unhover"
    @click="click"
  >
    <p>{{ Texto }}</p>
    <img :src="icon" 
      @mouseover="hover"
      @mouseout="unhover"
      :style="estiloIcone"/>
  </button>
</div>
  <div v-if="TemIcon === 'nao'">

    <button :class="tamanhoComClass"
      :style="isClick ? clickBotao : isHovered ? hoverBotao : botao"
      @mouseover="hover"
      @mouseout="unhover"
      @click="click"
    >
      <p>{{ Texto }}</p>
    </button>
  </div>
</template>

<script setup>
import { de } from "date-fns/locale";
import { ref, onMounted, defineProps } from "vue";

// Define variáveis reativas para controlar os estados de hover e clique
const isHovered = ref(false);
const isClick = ref(false);

const tamanhoComClass = ref("medioId");

// Define as propriedades que o componente espera receber
const props = defineProps({
  texto: String,
  cor: String,
  corHover: String,
  icon: String,
  width: String,
  height: String,
  corDoTexto: String,
  tamanhoDaFonte: String,
  ladoDoIcon: String,
  corBordaHover: String,
  corBorda: String,
  temIcon: {
    tamanhoPadrao: {
      type: String,
      default: 'nao'

    }
  },
  corBordaClick: String,
  tamanhoDaBorda: String,
  preset: String,
  funcaoClick: Function,
  tamanhoPadrao: {

    type: String,
    default: 'medio'
  },
  sombreado: {
    type: String,
    default: 'nao'
  },
  parametrosFuncao:{
    type: [],
    default: null
  },
  inverterCorIcon: {
    type: String,
    default: "nao"
  },
});


let corInvertidaIcon = ref('invert(0%)');
let TemIcon = props.temIcon;
let Texto = props.texto;
let Preset = props.preset;
let botao;
let hoverBotao;
let clickBotao;
let width = "";
let height = "";

let estiloIcone = {
  width: "15%",
  filter: corInvertidaIcon.value,
};

  switch (props.tamanhoPadrao) {
  
    case 'medio':
      tamanhoComClass.value = "medioId"
      break;
    case 'pequeno':
      tamanhoComClass.value = "pequenoId"
      break;
    case 'grande':
      tamanhoComClass.value = "grandeId"
      break;
    case 'personalizado':
      height = props.height;
      width = props.width;
      tamanhoComClass.value = "personalizadoId"
    break;
  }

let sombras = ""

switch (props.sombreado) {
  case 'nao':
    sombras = ''
    break;
  case 'sim':
    sombras = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'

}

switch (Preset) {
  case "Deletar":
    Texto = "Deletar";
    TemIcon = "nao";
    botao = {
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #CD0000",
      color: "#CD0000",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#CD0000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#E67373",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    break;
  case "Confirmar":
    Texto = "Confirmar";
    TemIcon = "nao";
    botao = {
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #389300",
      color: "#389300",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#389300",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#04b804",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;
  case "Sair":
    Texto = "Sair";
    TemIcon = "nao";
    botao = {
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #CD0000",
      color: "#CD0000",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#CD0000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#E67373",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoVazado":
    Texto = props.texto;
    TemIcon = "nao";
    botao = {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #620BA7",
      color: "#620BA7",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #620BA7",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    break;

  case "PadraoRoxo":
    Texto = props.texto;
    TemIcon = "nao";
    botao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoBranco":
    Texto = props.texto;
    TemIcon = "nao";
    botao = {
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#620BA7",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoRoxoIcon":
    Texto = props.texto;
    TemIcon = "sim";
    botao = {
      backgroundColor: "#620BA7",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      border: props.tamanhoDaBorda + " solid #620BA7",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      color: "#FFFFFF",
      border: props.tamanhoDaBorda + " solid #8E00FF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
      
    };

    clickBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoBrancoIcon":
    Texto = props.texto;
    TemIcon = "sim";
    botao = {
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#620BA7",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #8E00FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoVazadoIcon":
    Texto = props.texto;
    TemIcon = "sim";
    botao = {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #620BA7",
      color: "#620BA7",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #620BA7",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    break;

  default:
    botao = {
      backgroundColor: props.cor,
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-around",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid " + props.corBorda,
      color: props.corDoTexto,
      fontSize: props.tamanhoDaFonte,
    };

    hoverBotao = {
      backgroundColor: props.corHover,
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-around",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid " + props.corBordaHover,
      color: props.cor,
      fontSize: props.tamanhoDaFonte,
    };

    clickBotao = {
      backgroundColor: props.corHover,
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-around",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid " + props.corBordaClick,
      color: props.cor,
      fontSize: props.tamanhoDaFonte,
    };
    break;
}

function hover() {
  isHovered.value = true;

  switch(props.inverterCorIcon) {
    case 'sim':
      corInvertidaIcon.value = "invert(100%)";
      break;
    case 'nao':
      corInvertidaIcon.value = "invert(0%)";
      break;
    default:
      corInvertidaIcon.value = "invert(0%)";
      break;
  }
}

function unhover() {
  isHovered.value = false;

  switch(props.inverterCorIcon) {
    case 'sim':
      corInvertidaIcon.value = "invert(0%)";
      break;
    case 'nao':
      corInvertidaIcon.value = "invert(0%)";
      break;
    default:
      corInvertidaIcon.value = "invert(0%)";
      break;
  }
}

function click() {
  props.funcaoClick(props.parametrosFuncao);
  isClick.value = true;
  // Define um atraso de 2 segundos (2000 milissegundos) para reverter isClick
  setTimeout(() => {
    isClick.value = false;
  }, 75);
}
</script>

<style>
@import url(../assets/main.css);

@layer components{

  .medioId{
    @apply 2xl:w-[10vw] 2xl:h-[5h] lg:w-[15vw] lg:h-[5vh] xl:w-[14vw] xl:h-[5h] md:w-[18vw] md:h-[5vh] sm:w-[20vw] sm:h-[5vh] 
  }

  .pequenoId{
    @apply 2xl:w-[5vw] 2xl:h-[4vh]  lg:w-[8vw] lg:h-[4vh] xl:w-[7vw] xl:h-[4vh] md:w-[10vw] md:h-[4vh] sm:w-[12vw] sm:h-[4vh] sm:text-sm h-[4vh] w-[15vw] text-sm
  }

  .grandeId{
    @apply 2xl:w-[12vw] 2xl:h-[5h] lg:w-[20vw] lg:h-[5vh] xl:w-[16vw] xl:h-[5h] md:w-[23vw] md:h-[5vh] sm:w-[25vw] sm:h-[5vh] 
  }

}

</style>

