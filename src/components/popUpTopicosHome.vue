<template>
    <p>{{console.log("aaa")}}</p>
  <!-- <div
    class="w-full h-full flex justify-center items-center absolute"
    v-if="props.ativo == true"
  >
    <div
      class="blur-background"
      v-if="props.ativo == true"
      @click="ativaPopUp()"
    ></div>
    <div
      id="fundoPopUp"
      class="relative h-[60%] w-[100%] lg:h-[60%] lg:w-[45%] 2xl:h-[80%] 2xl:w-[55%] xl:h-[60%] xl:w-[45%] md:h-[60%] md:w-[55%] sm:h-[60%] sm:w-[80%]"
    >
      <img
        src="../imagem-vetores/botao-x.svg"
        id="botao-sair"
        class="absolute top-1 right-1"
        @click="ativaPopUp()"
      />
    </div>
  </div> -->
</template>
<script setup>
const props = defineProps({
  ativo: Boolean
});

function ativaPopUp(){
    props.ativo = !props.ativo
    console.log(aaaaaa)
}

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
#bgBranco::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f1f1f1;
}

#bgBranco::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
}

#bgBranco::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}
#exploradorDeArquivos::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  height: 6px;
  background-color: #f1f1f1;
}

#exploradorDeArquivos::-webkit-scrollbar {
  height: 8px;
  background-color: #f1f1f1;
}

#exploradorDeArquivos::-webkit-scrollbar-thumb {
  height: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}
#filtroDeSubTarefa {
  font-size: small;
}
option {
  font-size: small;
  border: 1px solid #cbcbcb;
}
</style>
