<template>
  <!-- Verifica se o botão deve ter um ícone ou não -->
  <div v-if="TemIcon === 'sim'">
    <!-- Configura o estilo do botão com base em diferentes estados (clique, hover, etc.) -->
    <button
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
    <button
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
import { ref } from "vue";

// Define variáveis reativas para controlar os estados de hover e clique
const isHovered = ref(false);
const isClick = ref(false);

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
  temIcon: String,
  corBordaClick: String,
  tamanhoDaBorda: String,
  preset: String,
  funcaoClick: Function,
});

let TemIcon = props.temIcon;
let Texto = props.texto;
let Preset = props.preset;
let botao;
let hoverBotao;
let clickBotao;
let iconeCor = "invert-0";

switch (Preset) {
  case "Deletar":
    Texto = "Deletar";
    TemIcon = "nao";
    botao = {
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
      backgroundColor: "#620BA7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      width: props.width,
      height: props.height,
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#620BA7",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    hoverBotao = {
      width: props.width,
      height: props.height,
      backgroundColor: "#8E00FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };

    clickBotao = {
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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
      width: props.width,
      height: props.height,
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

function click() {
  props.funcaoClick();
  console.log('aaa')
  isClick.value = true;
  // Define um atraso de 2 segundos (2000 milissegundos) para reverter isClick
  setTimeout(() => {
    isClick.value = false;
  }, 75);
}
</script>
