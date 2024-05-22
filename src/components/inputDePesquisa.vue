<template>
  <div :style="tamanhoPesquisa">
    <div v-if="temIcon">
      <Input :isInvalido="isInvalido" :textoInvalido="textoInvalido" :largura="props.largura" styleInput="input-transparente-claro" :icon="iconePesquisa" :fontSize="fontSize"
        :conteudoInput="placeHolderPesquisa" v-model="conteudoDaPesquisa" :modelValue="conteudoDaPesquisa " :zerarInput="zeraInput"
        tipo="obrigatorio" @updateModelValue="(e) => {
    conteudoDaPesquisa = e
  }"></Input>
    </div>
    <div v-if="!temIcon" @="$emit('itemSelecionado', conteudoDaPesquisa)">
      <Input  :isInvalido="isInvalido" :textoInvalido="textoInvalido" :largura="props.largura" styleInput="input-transparente-claro" :conteudoInput="placeHolderPesquisa"
        :fontSize="fontSize" v-model="conteudoDaPesquisa" :modelValue="conteudoDaPesquisa" @updateModelValue="(e) => {
    conteudoDaPesquisa = e
  }"></Input>
    </div>

    <div v-if="conteudoDaPesquisa != '' && !itemsIguais && props.tipo != 'NavBar'"
      style="overflow-y: auto; overflow-x: hidden; max-height: 16vh; border-radius: 5px" id="barraDePesquisa">
      <div v-for="itemPesquisado in listaRenderizada" :style="espacoRespostasPesquisa"
        @click="passaValorProInput(itemPesquisado)">
        <div :style="respostaPesquisa">
          <p class="truncate">{{ itemPesquisado }}</p>
        </div>
        <hr />
      </div>
    </div>

    <div v-if="conteudoDaPesquisa != '' && !itemsIguais && props.tipo == 'NavBar'" class="z-[99999999999999999]"
      style="overflow-y: auto; overflow-x: hidden; max-height: 16vh; border-radius: 5px" id="barraDePesquisa">
      <div v-for="itemPesquisado in listaRenderizada" :style="espacoRespostasPesquisa"
        @click="passaValorProInput(itemPesquisado)">
        <div :style="respostaPesquisa">
          <p class="w-[50%] pl-4 truncate">{{ itemPesquisado.nome }}</p>
          <p class="w-[50%] truncate">{{ itemPesquisado.tipo }}</p>
        </div>
        <hr />
      </div>
    </div>
  </div>

</template>
<script setup>
import Input from "./Input.vue";
import { createVNode, ref, watch } from "vue";
import iconePesquisa from "../imagemVetores/iconePesquisa.svg";
import { defineProps, defineEmits } from "vue";
import VueCookies from "vue-cookies";
import router from "@/router";
import { onMounted } from "vue";


let conteudoDaPesquisa = ref("");
defineEmits(['itemSelecionado'])
const props = defineProps({
  listaDaPesquisa: [],
  largura: String,
  modoEscuro: {
    type: String,
    default: "nao",
  },
  temIcon: Boolean,
  placeHolderPesquisa: {
    type: String
  },
  isInvalido :{
    type: Boolean,
    default: false
  },
  textoInvalido: String,
  fontSize: String,
  tipo: String,
  zeraInput:{
    type: Boolean,
    default: false
  }
});

watch(()=> props.zeraInput, () =>{
  zerarInput();
})

function zerarInput(){
  if(props.zeraInput == true){
    conteudoDaPesquisa.value = ''
  }
}

let itemsIguais = ref(false);

let listaRenderizada = ref([]);




function verificaSeSaoIguais() {
  for (const itemPesquisado of listaRenderizada.value) {
    if (conteudoDaPesquisa.value === itemPesquisado) {
      itemsIguais.value = true;
      return;
    } else {
      itemsIguais.value = false;
    }
  }
}

async function passaValorProInput(valor) {
  if (props.tipo == 'NavBar') {
    conteudoDaPesquisa.value = valor.nome;
    switch (valor.tipo) {
      case "Projeto":
        conteudoDaPesquisa.value = "";
        VueCookies.set("IdProjetoAtual", valor.id);
        redireciona("/projeto")
        await new Promise(r => setTimeout(r, 100));
        // window.location.reload();
        conteudoDaPesquisa.value = "";
        break;
      case "Equipe":
        conteudoDaPesquisa.value = "";
        VueCookies.set("equipeSelecionada", valor.id);
        await new Promise(r => setTimeout(r, 100));
        redireciona("/equipe/telaInicial")
        // window.location.reload();
        conteudoDaPesquisa.value = "";
        break;
      case "Usuario":
        conteudoDaPesquisa.value = "";
        redireciona("/perfil/" + valor.id)
        await new Promise(r => setTimeout(r, 100));
        // window.location.reload();
        conteudoDaPesquisa.value = "";
        break;
      case "Tarefa":
        VueCookies.set("IdTarefaCookies", valor.id);
        redireciona("/criaTarefa")
        await new Promise(r => setTimeout(r, 100));
        // window.location.reload();
        conteudoDaPesquisa.value = "";
        break;
    }
  } else {
    conteudoDaPesquisa.value = valor;
  }
}

function redireciona(rota) {
  router.push(rota);
  if (rota == '/criaTarefa') {
    localStorage.removeItem('TarefaNaoFinalizada');
  }
}

watch(() => {
  renderizaLista();
  verificaSeSaoIguais();
});
function renderizaLista() {
  if (props.tipo == 'NavBar') {
    let palavraPesquisada = conteudoDaPesquisa.value.toLowerCase();

    const listaFiltrada = props.listaDaPesquisa.filter((item) => {
      console.log(item);
      const itemLowerCase = item.nome.toLowerCase();
      return [...palavraPesquisada].every((letra) => itemLowerCase.includes(letra));
    });
    listaRenderizada.value = listaFiltrada;
  } else {
    let palavraPesquisada = conteudoDaPesquisa.value.toLowerCase();

    const listaFiltrada = props.listaDaPesquisa.filter((item) => {
      const itemLowerCase = item.toLowerCase();
      return [...palavraPesquisada].every((letra) => itemLowerCase.includes(letra));
    });
    listaRenderizada.value = listaFiltrada;
  }
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
    color: "var(--roxoClaro)",
  };

  espacoRespostasPesquisa.value = {
    width: props.largura,
    backgroundColor: "var(--backgroundItems)",
  };

  //   corLinha.value = {
  //     backgroundColor: "#620BA7",
  //   };

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
  border-top-right-radius: 5px;
  /* 4px */
  border-bottom-right-radius: 5px;
  /* 4px */
}

#barraDePesquisa::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
  border-top-right-radius: 5px;
  /* 4px */
  border-bottom-right-radius: 5px;
  /* 4px */
}

#barraDePesquisa::-webkit-scrollbar-thumb {
  width: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
  border-top-right-radius: 5px;
  /* 4px */
  border-bottom-right-radius: 5px;
  /* 4px */
}
</style>