<template>
  <div
    class="w-full h-full flex justify-center items-center absolute"
    v-if="funcaoPopUp.variavelModal == true"
  >
    <div
      class="blur-background"
      v-if="funcaoPopUp.variavelModal == true"
      @click="funcaoPopUp.fechaPopUp()"
    ></div>
    <div
      id="fundoPopUp"
      class="relative h-[60%] w-[100%] lg:h-[60%] lg:w-[45%] 2xl:h-[80%] 2xl:w-[55%] xl:h-[60%] xl:w-[45%] md:h-[60%] md:w-[55%] sm:h-[60%] sm:w-[80%]"
    >
      <img
        src="../imagem-vetores/botao-x.svg"
        id="botao-sair"
        class="absolute top-1 right-1"
        @click="funcaoPopUp.fechaPopUp()"
      />
      <div id="bgBranco" class="flex flex-col min-h-[96%] overflow-auto">
        <div class="flex flex-row justify-center items-center pl-4 mt-4 h-[10%] w-[100%]">
          <Input
            width="100"
            height="80"
            styleInput="input-transparente-claro-grande"
          ></Input>
        </div>
        <div class="flex flex-col pl-4 mt-4 h-[30%] w-[90%] flex justify-center">
          <div class="w-[20%] h-[100%]">
            <Botao
              class="justify-self-end"
              preset="PadraoVazadoIcon"
              texto="Anexo"
              tamanhoDaBorda="2px"
              tamanhoPadrao="pequeno"
              :icon="iconAnexo"
              inverterCorIcon="sim"
            ></Botao>
          </div>
          <div class="w-[80%] h-[100%]">
            <TextAreaPadrao width="60%" height="100%"></TextAreaPadrao>
          </div>
        </div>
        <div class="flex flex-col mt-4 h-[7%] w-[30%]">
          <button>+ Nova</button>
        </div>
        <!-- Fazer um v-for de propriedades -->
        <div class="flex flex-col h-[7%] w-[100%] items-end pr-4 mt-4">
          <Botao
            preset="PadraoRoxo"
            texto="Concluido"
            tamanhoPadrao="personalizado"
            height="100%"
            width="5vw"
          >
          </Botao>
        </div>
      </div>
      <div id="bordaCinza"></div>
    </div>
  </div>
</template>
<script setup>
import Input from "./Input.vue";
import Botao from "./Botao.vue";
import CheckBox from "./checkBox.vue";
import iconAnexo from "../imagem-vetores/anexoIcon.svg";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import TextAreaPadrao from "./textAreaPadrao.vue";
const funcaoPopUp = funcaoPopUpStore();
const props = defineProps({
  listaSelect: [],
  styleSelect: String,
});
</script>
<style scoped>
#fundoPopUp {
  background-color: #36213e;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bgBranco {
  height: 96%;
  width: 69%;
  background-color: #ffffff;
}

#bordaCinza {
  height: 96%;
  width: 28%;
  background-color: #c4c4c4;
  clip-path: polygon(60% 0, 0 0, 0 100%, 58% 100%, 100% 82%, 100% 18%);
}

#botao-sair {
  width: 4%;
  height: 4%;
}
.blur-background {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute;
}
</style>
