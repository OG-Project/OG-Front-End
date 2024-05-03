<template>
  <fundoPopUp largura="" altura="95vh">
    <div class="h-[80vh] w-[45vw] flex flex-col items-center z-[9999]">
      <h1 class="text-4xl">{{ props.nomeDoTopico }}</h1>
      <div class="w-[80%] h-[80%] flex flex-col gap-12 mt-6">
        <div v-for="projeto of listaDeProjetos" class="w-[100%] border-2 border-[var(--backgroundPuro)] h-[12%] bg-[var(--backgroundItems)] flex items-center justify-around"
          style="box-shadow: -2px 6px 13px 7px rgba(0, 0, 0, 0.18)">
          <div class="m-4 flex w-[70%] justify-between" style="border-bottom: 2px solid var(--roxo)"
            @click="redireciona('/projeto/kanban', projeto.id)">
            <p>{{ projeto.nome }}</p>
            <p v-if="projeto.responsaveis[0]">{{ projeto.responsaveis[0].responsavel.username }}</p>
            <p v-if="!projeto.responsaveis[0]">{{ $t('home.naoPossuiResponsavel') }}</p>
          </div>
        </div>
      </div>
    </div>
  </fundoPopUp>
</template>
<script setup>
import fundoPopUp from "./fundoPopUp.vue";
import { conexaoBD } from "../stores/conexaoBD.js"
import { onMounted, ref } from "vue";
import VueCookies from "vue-cookies";
import router from "../router";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";

const funcaoPopUp = funcaoPopUpStore();
const banco = conexaoBD();

let listaDeProjetos = ref([])

onMounted(() => {
  pegaListaDeProjetosDia();
});

function redireciona(rota, id) {
  VueCookies.set("IdProjetoAtual", id);
  router.push(rota).then(() => {
        window.location.reload()
    });
  funcaoPopUp.fechaPopUp();
}

async function pegaListaDeProjetosDia() {
    try {
        const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
        let dataAtual;
        let dia = new Date().getDate();
        let mes = new Date().getMonth();
        let ano = new Date().getFullYear();
        dataAtual = `${ano}-${'0' + (mes + 1)}-${dia}`;

        for (const equipe of equipeUsuario.equipes) {
            const projetosDaEquipe = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos");

            for (const projeto of projetosDaEquipe) {
                if (projeto.dataFinal) {

                    console.log(projeto.dataFinal);
                    console.log(dataAtual);

                    // Comparando apenas dia, mês e ano das datas
                    if (projeto.dataFinal == dataAtual) {
                        listaDeProjetos.value.push(projeto);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Erro ao buscar projetos do dia:", error);
    }
}

const props = defineProps({
  nomeDoTopico: String
});
</script>
<style scoped>
#fundoPopUp {
  background-color: var(--roxoEscuro);
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
