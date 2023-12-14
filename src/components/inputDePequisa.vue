<template>
  <div :style="tamanhoPesquisa">
    <Input
      :largura="props.largura"
      styleInput="input-transparente-escuro"
      :icon="iconePesquisa"
      conteudoInput="Pesquisa"
      v-model="conteudoDaPesquisa"
    ></Input>
    <div
      v-if="conteudoDaPesquisa != '' && !itemsIguais"
      style="overflow-y: auto; overflow-x: hidden; max-height: 16vh; border-radius: 5px"
      id="barraDePesquisa"
    >
      <div
        v-for="itemPesquisado in listaRenderizada"
        :style="espacoRespostasPesquisa"
        @click="passaValorProInput(itemPesquisado)"
      >
        <div :style="respostaPesquisa">
          <p>{{ itemPesquisado }}</p>
        </div>
        <hr/>
      </div>
    </div>
  </div>
</template>
<script setup>
import Input from "../components/Input.vue";
import { ref, watch } from "vue";
import iconePesquisa from "../imagem-vetores/iconePesquisa.svg";

let conteudoDaPesquisa = ref("");

const props = defineProps({
  listaDaPesquisa: [],
  largura: String,
  modoEscuro: {
    type: String,
    default: "nao",
  },
});

let itemsIguais = ref(false);

let listaRenderizada = ref([]);

function verificaSeSaoIguais() {
  for (const itemPesquisado of listaRenderizada.value) {
    if (conteudoDaPesquisa.value === itemPesquisado) {
      itemsIguais.value = true;
      console.log(itemsIguais.value);
      return;
    } else {
      itemsIguais.value = false;
    }
  }
}

function passaValorProInput(valor) {
  conteudoDaPesquisa.value = valor;
}
watch(() => {
  renderizaLista();
  verificaSeSaoIguais();
});
function renderizaLista() {
  let palavraPesquisada = conteudoDaPesquisa.value.toLowerCase();

  const listaFiltrada = props.listaDaPesquisa.filter((item) => {
    const itemLowerCase = item.toLowerCase();
    return [...palavraPesquisada].every((letra) => itemLowerCase.includes(letra));
  });
  listaRenderizada.value = listaFiltrada;
}

const respostaPesquisa = ref({});

const espacoRespostasPesquisa = ref({});

const corLinha = ref({});

const tamanhoPesquisa = {
  width: props.largura,
};

if (props.modoEscuro === "nao") {
  respostaPesquisa.value = {
    width: props.largura,
    backgroundColor: "transparent",
    height: "4vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: "4rem",
    rowGap: "8rem",
    cursor: "pointer",
    color: "#620BA7",
  };

  espacoRespostasPesquisa.value = {
    width: props.largura,
    backgroundColor: "#FEFBFF",
  };

//   corLinha.value = {
//     backgroundColor: "#620BA7",
//   };
} else if (props.modoEscuro == "sim") {
  respostaPesquisa.value = {
    width: props.largura,
    backgroundColor: "transparent",
    height: "4vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: "4rem",
    rowGap: "8rem",
    cursor: "pointer",
    color: "#FEFBFF",
  };
  espacoRespostasPesquisa.value = {
    width: props.largura,
    backgroundColor: "#620BA7",
  };
//   corLinha.value = {
//     width: props.largura,
//     backgroundColor: "#36213E",
//   };
}
</script>
<style scoped>
#barraDePesquisa::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  width: 6px;
  background-color: #f1f1f1;
  border-top-right-radius: 5px; /* 4px */
  border-bottom-right-radius: 5px; /* 4px */
}

#barraDePesquisa::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
  border-top-right-radius: 5px; /* 4px */
  border-bottom-right-radius: 5px; /* 4px */
}

#barraDePesquisa::-webkit-scrollbar-thumb {
  width: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
  border-top-right-radius: 5px; /* 4px */
  border-bottom-right-radius: 5px; /* 4px */
}
</style>
