<script setup>
import { RouterLink, RouterView } from "vue-router";
import { funcaoPopUpStore } from "./stores/funcaoPopUp";
import VueCookies from "vue-cookies";
import KeyBoard from './components/Keyboard.vue'
import svgIconMove from './assets/svgIconMove.vue'
import svgIconX from './assets/svgIconX.vue'
import Navbar from '@/components/Navbar.vue';
import { ref, watch, onMounted, onUpdated } from 'vue';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
import { useDraggable } from '@vueuse/core'
import { webSocketStore } from './stores/webSocket.js'
import { criaNotificacao } from './stores/criaNotificacao.js';
import { conexaoBD } from "./stores/conexaoBD";
import { useRoute } from 'vue-router';
import TelaLoad from "./components/TelaLoad.vue";

const route = useRoute()

import tabBar from "./components/tabBar.vue";
import NavBarMobile from "./components/NavBarMobile.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const banco = conexaoBD();
const criaNotificacaoStore = criaNotificacao();
const webSocket = webSocketStore();
const usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"

const perfil = perfilStore()
const { isVlibras } = storeToRefs(perfil);

const el = ref(perfil.el)



const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1300, y: 70 },
})
// let ativado='';
let url = window.location.href;
let usuario = ref()
let configuracao = ref()

onMounted(async () => {
  usuario.value =
    await banco.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')


  let root = document.documentElement.style
  configuracao.value = usuario.value.configuracao
  console.log(configuracao.value);
  perfil.isVlibras = configuracao.value.isLibras
  perfil.isTecladoVirtual = configuracao.value.isTecladoVirtual
  perfil.isVoiceMaker = configuracao.value.isDigitarVoz
  root.setProperty('--hueRoxo', configuracao.value.hueCor)
  root.setProperty('--hueRoxoClaro', configuracao.value.hueCor)

  root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho + 'vh')
  root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho + 'vh')
  console.log(configuracao.value.isDark);
  if (configuracao.value.isDark) {
    root.setProperty('--backgroundPuro', '#0F0F0F')
    root.setProperty('--backgroundItems', '#222222')
    root.setProperty('--fonteCor', '#ffffff')
    root.setProperty('--backgroundItemsClaros', '#363636')
  }

})
onBeforeUpdate(async () => {
  usuario.value =
    await banco.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')
  console.log(usuario.value);
})


onUpdated(() => {
  if (route.path != '/login') {
    console.log(usuario.value.configuracao.isTutorial);
    console.log(usuario.value.configuracao.rotaDoPasso);
    if (usuario.value.configuracao.isTutorial) {
      if (usuario.value.configuracao.ultimoPassoId != 'step-1'
        && usuario.value.configuracao.ultimoPassoId != null) {
        console.log(tour.getById(usuario.value.configuracao.ultimoPassoId));
        router.push(usuario.value.configuracao.rotaDoPasso)
        tour.show(usuario.value.configuracao.ultimoPassoId, true)
      } else {
        console.log(route.path);
        tour.start()
      }
    }

  }
})

function press(b) {
  let valorElemento = perfil.el.value
  let valor = b
  if (b == '{bksp}') {
    perfil.el.value = valorElemento.substring(0, valorElemento.length - 1)
  } else if (b == '{space}') {
    perfil.el.value += ' '
    perfil.el.dispatchEvent(new Event('input'))
  } else if (b != '{enter}' & b != '{shift}' & b != '{lock}' & b != '{tab}') {
    perfil.el.value += valor
    perfil.el.dispatchEvent(new Event('input'))
  }

}
webSocket.esperaMensagem((mensagem) => {
  console.log("a")
  teste(JSON.parse(mensagem))
});

function teste(mensagem) {
  criaNotificacaoStore.mandarNotificacao(mensagem);
}

function change(a) {
}
function close() {
  perfil.isTecladoAtivado = !perfil.isTecladoAtivado
}

function VerificaPrazoDoProjeto() {
  banco.procurar("/projeto").then((projetos) => {
    let dataAtual = new Date();
    let dias = 0;
    for (let i = 0; i < projetos.length; i++) {
      let dataProjeto = new Date(projetos[i].dataFinal);
      let diferenca = dataProjeto.getTime() - dataAtual.getTime();
      dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
      if (dias < 7 && projetos[i].dataFinal != null && projetos[i].dataFinal > dataAtual) {
        enviaParaWebSocket(projetos[i], dias)
      }
    }
  });
}

function enviaParaWebSocket(projetoAux, dias) {
  let teste = {
    equipes: [
      {
        equipe: {
          membros: [
            {
              id: usuarioLogadoId
            }
          ]
        }
      }
    ],
    notificao: {
      mensagem: "Restam " + dias + " Para o fim do projeto",
      projeto: projetoAux
    }
  }

  webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
}

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})

var estaNoLogin = ref(true)

watch(() => route.path, () => {
  if (route.path == '/login') {
    estaNoLogin.value = true
  }
  else if (route.path == '/landingPage') {
    estaNoLogin.value = true
  }
  else {
    estaNoLogin.value = false
  }
});
import { inject } from 'vue'
import router from "./router";
import { onBeforeUpdate } from "vue";
const tour = inject('tour')

tour.addSteps([
  {
    id: 'step-1',
    title: t('tutorial.bemVindo'),
    text: t('tutorial.mostraAtividades'),
    attachTo: {
      element: '#step-1',
      on: 'top'
    },
    buttons: [
      {
        classes: 'button',
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/home'
          tour.next()
          banco.atualizar(usuario.value, '/usuario')
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      }
    ]

  },
  {
    id: 'step-2',
    title: t('tutorial.dashboard'),
    text: t('tutorial.informacoes'),
    attachTo: {
      element: '#step-2',
      on: 'top'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/home'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-3',
    title: t('tutorial.menu'),
    text: t('tutorial.clique'),
    attachTo: {
      element: '#step-3',
      on: 'right-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/home'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-4',
    title: t('tutorial.partes'),
    text: t('tutorial.equipe'),
    attachTo: {
      element: '#step-4',
      on: 'right-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)

          usuario.value.configuracao.rotaDoPasso = '/equipe'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-5',
    title: t('tutorial.crieEquipe'),
    text: t('tutorial.cliqueECrie'),
    attachTo: {
      element: '#step-5',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/equipe'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-6',
    text: t('tutorial.preencha'),
    attachTo: {
      element: '#step-6',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/equipe'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-7',
    text: t('tutorial.crieAEquipe'),
    attachTo: {
      element: '#step-7',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/equipe'
          banco.atualizar(usuario.value, '/usuario')
          // router.push
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-8',
    text: t('tutorial.entreEquipe'),
    attachTo: {
      element: '#step-8',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/equipe'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-9',
    text: t('tutorial.projetosEquipe'),
    attachTo: {
      element: '#step-9',
      on: 'center'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/equipe/telaInicial'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-10',
    text: t('tutorial.crieProjeto'),
    attachTo: {
      element: '#step-10',
      on: 'left'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/criaprojeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-11',
    text: t('tutorial.preencha'),
    attachTo: {
      element: '#step-11',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/criaProjeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-12',
    text: t('tutorial.crieUmProjeto'),
    attachTo: {
      element: '#step-12',
      on: 'right'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/criaProjeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-13',
    text: t('tutorial.gerenciar'),
    attachTo: {
      element: '#step-13',
      on: 'center'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/projeto/lista'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-14',
    text: t('tutorial.crieTarefa'),
    attachTo: {
      element: '#step-14',
      on: 'left-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/projeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-15',
    text: t('tutorial.preenchaTarefa'),
    attachTo: {
      element: '#step-15',
      on: 'top-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/criaTarefa'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-16',
    text: t('tutorial.completar'),
    attachTo: {
      element: '#step-16',
      on: 'top-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/projeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-17',
    text: t('tutorial.formas'),
    attachTo: {
      element: '#step-17',
      on: 'top-end'
    },
    buttons: [
      {
        text: t('tutorial.proximo'),
        action: () => {
          let splitId = tour.getCurrentStep().id.split('-')
          splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
          let proximoId = splitId.join('-')
          usuario.value.configuracao.ultimoPassoId = (proximoId)
          usuario.value.configuracao.rotaDoPasso = '/projeto'
          banco.atualizar(usuario.value, '/usuario')
          tour.next()
        }
      },
      {
        secondary: true,
        text: t('tutorial.pular'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  },
  {
    id: 'step-18',
    text: t('tutorial.funcionalidades'),
    attachTo: {
      element: '#step-18',
      on: 'top-end'
    },
    buttons: [
      {
        text: t('tutorial.finalizar'),
        action: () => {
          usuario.value.configuracao.isTutorial = false
          usuario.value.configuracao.ultimoPassoId = 'step-1'
          usuario.value.configuracao.rotaDoPasso = '/home'
          banco.atualizar(usuario.value, '/usuario')
          tour.complete()
        }
      },
      {
        secondary: true,
        text: t('tutorial.voltar'),
        action: tour.back
      }
    ]
  }
])

</script>

<template>
  <div v-show="isVlibras == true">
    <div vw class="enabled">
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  </div>
  <div class=" bg-[var(--backgroundPuro)] text-[var(--fonteCor)] min-h-screen  overflow-hidden">

    <Navbar v-if="!estaNoLogin && screenWidth >= 1024" />
    <tabBar v-if="!estaNoLogin && screenWidth < 1024" />
    <NavBarMobile v-if="!estaNoLogin && screenWidth < 1024" />
    <RouterView/>
  </div>
  <!-- Atraves do x e y você gerencia e utiliza do drag and drop -->
  <div ref="el" :style="style" style="position: fixed"
    class="bg-[#ececec] top-16 left-[67.8vw] absolute z-[99999] w-max " v-if="perfil.isTecladoAtivado">
    <div class=" flex flex-col items-center">
      <div class="flex w-full justify-between px-4 ">
        <svgIconMove class="w-[1vw] h-[3vh]" />
        <svgIconX @click="close" class="w-[1vw] h-[3vh]"></svgIconX>
      </div>
      <KeyBoard @onChange="change" @onKeyPress="press"></KeyBoard>
    </div>
  </div>

  <TelaLoad></TelaLoad>
</template>
<style scoped></style>