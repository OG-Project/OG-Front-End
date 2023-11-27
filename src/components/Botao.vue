<template>
  <!-- Verifica se o botão deve ter um ícone ou não -->
  <div v-if="TemIcon === 'sim'">
    <!-- Configura o estilo do botão com base em diferentes estados (clique, hover, etc.) -->
    <button :class="tamanhoComClass"
      :style="isClick ? clickBotao : isHovered ? hoverBotao : botao"
      @mouseover="hover"
      @mouseout="unhover"
      @click="click"
    >
      <!-- Exibe o texto do botão -->
      <p>{{ Texto }}</p>
      <!-- Exibe um ícone se houver um definido -->
      <img :src="icon" style="height: 67.31%" />
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
  }
});

let TemIcon = props.temIcon;
let Texto = props.texto;
let Preset = props.preset;
let botao;
let hoverBotao;
let clickBotao;
let iconeCor = "invert-0";
let width = "";
let height = "";

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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#CD0000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      backgroundColor: "#E67373",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#389300",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      backgroundColor: "#04b804",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#CD0000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      backgroundColor: "#E67373",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #FFFFFF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #620BA7",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    if (isHovered) {
      iconeCor = "invert";
    } else {
      iconeCor = "invert-0";
    }

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    if (isClick) {
      iconeCor = "invert";
    } else {
      iconeCor = "invert-0";
    }

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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    if (isHovered) {
      iconeCor = "invert";
    } else {
      iconeCor = "invert-0";
    }

    clickBotao = {
      backgroundColor: "#620BA7",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid #ECC3FF",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    if (isClick) {
      iconeCor = "invert";
    } else {
      iconeCor = "invert-0";
    }

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
}

function unhover() {
  isHovered.value = false;
}

let Funcao = props.funcaoClick;

function click() {
  Funcao();
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
    @apply lg:w-[15vw] lg:h-[10vh] xl:w-[10vw] xl:h-[5vh] md:w-[15vw] md:h-[10vh] sm:w-[10vw] sm:h-[10vh] 
  }

  .pequenoId{
    @apply  lg:w-[15vw] lg:h-[10vh] xl:w-[7vw] xl:h-[5vh] md:w-[15vw] md:h-[10vh] sm:w-[10vw] sm:h-[10vh] 
  }

  .grandeId{
    @apply lg:w-[15vw] lg:h-[10vh]  xl:w-[14vw] xl:h-[7vh] md:w-[15vw] md:h-[10vh] sm:w-[10vw] sm:h-[10vh] 
  }

}

</style>