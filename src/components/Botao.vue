<template>
  <!-- Verifica se o botão deve ter um ícone ou não -->
  <div v-if="TemIcon === 'sim'">
    <button :class="tamanhoComClass" :style="isClick ? clickBotao : isHovered ? hoverBotao : botao" @mouseover="hover"
      @mouseout="unhover" @click="click">
      <p>{{ Texto }}</p>
      <img :src="icon" @mouseover="hover" @mouseout="unhover" :style="estiloIcone" />
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
import { ref, onMounted, defineProps, watch, computed, onUpdated } from "vue";
import { perfilStore } from "../stores/perfilStore";
let perfil=perfilStore()
import { storeToRefs } from 'pinia';
const {hue} =storeToRefs(perfil)
const isHovered = ref(false);
const isClick = ref(false);
// 

const tamanhoComClass = ref("medioId");

const screenWidth = ref(window.innerWidth)

onMounted(()=>{
  if(screenWidth < 640){
    props.tamanhoDaFonte.value='0.5vh'
  }
})

watch(hue,(newValue) => {
  hue.value=newValue
  
})
onUpdated(()=>{

})

const props = defineProps({
  roxo:String,
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
  parametrosFuncao: {
    type: [],
    default: null
  },
  inverterCorIcon: {
    type: String,
    default: "nao"
  },
});

// let root=document.documentElement.style

let corInvertidaIcon = ref('invert(0%)');
let TemIcon = props.temIcon;
let Texto = props.texto;
let Preset = props.preset;
let botao;
let hoverBotao;
let clickBotao;

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
case 'mobilegrande':
  tamanhoComClass.value = "mobileGrandeId"
  break;
case 'mobilemedio':
  tamanhoComClass.value = "mobileMedioId"
  break;
case 'mobilepequeno':
  tamanhoComClass.value = "mobilePequenoId"
  break;
case 'mobilepadrao':
  tamanhoComClass.value = "mobilePadraoId"
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
      border: props.tamanhoDaBorda + " solid #CD0000",
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
      border: props.tamanhoDaBorda + " solid var(--roxo)",
      color: props.roxo,
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxo)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--roxo)",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: props.roxo,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    break;

  case "PadraoRoxo":
    Texto = props.texto;
    TemIcon = "nao";
    botao = {
      backgroundColor: 'var(--roxo)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
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
      color: props.roxo,
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: props.roxo,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };
    break;

  case "PadraoRoxoIcon":
    Texto = props.texto;
    TemIcon = "sim";
    botao = {
      backgroundColor: props.roxo,
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      border: props.tamanhoDaBorda + " solid var(--roxo)",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      color: "#FFFFFF",
      border: props.tamanhoDaBorda + " solid var(--roxoAtencao)",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,

    };

    clickBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
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
      color: props.roxo,
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxoAtencao)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--roxoAtencao)",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "var(--roxo)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
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
      border: props.tamanhoDaBorda + " solid var(--roxo)",
      color: props.roxo,
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    hoverBotao = {
      backgroundColor: "var(--roxo)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--roxo)",
      color: "#FFFFFF",
      fontSize: props.tamanhoDaFonte,
      boxShadow: sombras,
    };

    clickBotao = {
      backgroundColor: "var(--roxo)",
      display: "flex",
      flexDirection: props.ladoDoIcon,
      justifyContent: "space-evenly",
      alignItems: "center",
      border: props.tamanhoDaBorda + " solid var(--clickBorder)",
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

  switch (props.inverterCorIcon) {
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

  switch (props.inverterCorIcon) {
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

<style lang="scss">

.medioId {
  @apply 2xl:w-[10vw] 2xl:h-[5h] lg:w-[15vw] lg:h-[5vh] xl:w-[14vw] xl:h-[5h] md:w-[18vw] md:h-[5vh] sm:w-[20vw] sm:h-[5vh]
}

.pequenoId {
  @apply 2xl:w-[5vw] 2xl:h-[4vh] lg:w-[8vw] lg:h-[4vh] xl:w-[7vw] xl:h-[4vh] md:w-[10vw] md:h-[4vh] sm:w-[12vw] sm:h-[4vh] sm:text-sm h-[4vh] w-[15vw] text-sm
}

.grandeId {
  @apply 2xl:w-[12vw] 2xl:h-[5h] lg:w-[20vw] lg:h-[5vh] xl:w-[16vw] xl:h-[5h] md:w-[23vw] md:h-[5vh] sm:w-[25vw] sm:h-[5vh]
}

.mobileGrandeId{
  @apply w-[80vw] h-[5vh]
}
.mobileMedioId{
  @apply w-[42vw] h-[5vh]
}
.mobilePadraoId{
  @apply w-[48vw] h-[5vh]
}
.mobilePequenoId{
  @apply w-[20vw] 2xl:h-[5vh] xl:h-[8vh]
}
</style>