<template>
  <div class="bg-opacity-40 z-[100]" style="font-family: var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">
    <button v-if="!aberto" @click="openClose()" class="ml-6 h-[8vh] w-[4vw] flex items-center justify-center">
      <hamburger></hamburger>
    </button>
    <div v-if="aberto" class="sidebar slide-in flex fixed" style="z-index:999999;">
      <div class="transition h-[100vh] w-[15vw] bg-[var(--roxoEscuro)]">
        <div class="flex-col h-full flex justify-between gap-6">
          <div class="ml-4 mt-6">
            <img class="cursor-pointer" src="../imagemVetores/botaoXBranco.svg" @click="openClose()" />
          </div>

          <div class="flex-col h-full flex gap-6 ml-4 mt-10 items-start">
            <!-- home -->
            <div class="flex gap-6 justify-center items-center text-white " @click="redirecionamento('/home')">
              <svg width="44" height="44" viewBox="0 0 41 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.002 1.46676L22.9553 0.352096C22.6896 0.124866 22.3515 0 22.002 0C21.6524 0 21.3143 0.124866 21.0486 0.352096L22.002 1.46676ZM1.46862 19.0667L0.515286 17.9521L0.00195312 18.3921V19.0667H1.46862ZM16.1353 42.5333V44C16.5243 44 16.8973 43.8455 17.1724 43.5704C17.4474 43.2954 17.602 42.9223 17.602 42.5333H16.1353ZM27.8686 42.5333H26.402C26.402 42.9223 26.5565 43.2954 26.8315 43.5704C27.1066 43.8455 27.4796 44 27.8686 44V42.5333ZM42.5353 19.0667H44.002V18.3921L43.4886 17.9521L42.5353 19.0667ZM4.40195 44H16.1353V41.0667H4.40195V44ZM43.4886 17.9521L22.9553 0.352096L21.0486 2.58142L41.582 20.1814L43.4886 17.9521ZM21.0486 0.352096L0.515286 17.9521L2.42195 20.1814L22.9553 2.58142L21.0486 0.352096ZM17.602 42.5333V33.7334H14.6686V42.5333H17.602ZM26.402 33.7334V42.5333H29.3353V33.7334H26.402ZM27.8686 44H39.602V41.0667H27.8686V44ZM44.002 39.6V19.0667H41.0686V39.6H44.002ZM0.00195312 19.0667V39.6H2.93529V19.0667H0.00195312ZM22.002 29.3334C23.1689 29.3334 24.2881 29.7969 25.1132 30.6221C25.9384 31.4473 26.402 32.5664 26.402 33.7334H29.3353C29.3353 31.7884 28.5627 29.9232 27.1874 28.5479C25.8121 27.1727 23.9469 26.4 22.002 26.4V29.3334ZM22.002 26.4C20.057 26.4 18.1918 27.1727 16.8165 28.5479C15.4412 29.9232 14.6686 31.7884 14.6686 33.7334H17.602C17.602 32.5664 18.0655 31.4473 18.8907 30.6221C19.7158 29.7969 20.835 29.3334 22.002 29.3334V26.4ZM39.602 44C40.7689 44 41.8881 43.5364 42.7132 42.7113C43.5384 41.8861 44.002 40.767 44.002 39.6H41.0686C41.0686 39.989 40.9141 40.362 40.639 40.6371C40.364 40.9121 39.9909 41.0667 39.602 41.0667V44ZM4.40195 41.0667C4.01297 41.0667 3.63992 40.9121 3.36486 40.6371C3.08981 40.362 2.93529 39.989 2.93529 39.6H0.00195312C0.00195313 40.767 0.465523 41.8861 1.29068 42.7113C2.11584 43.5364 3.235 44 4.40195 44V41.0667Z"
                  fill="white" />
              </svg>
              <div>{{ $t('barraLateral.home') }}</div>
            </div>

            <!-- equipes -->
            <div id="step-4" class="gap-6 flex justify-center items-center text-white "
              @click="redirecionamento('/equipe')">
              <svg width="44" height="44" viewBox="0 0 41 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.002 3.38462C21.1684 3.38462 20.369 3.74121 19.7796 4.37595C19.1902 5.01068 18.8591 5.87157 18.8591 6.76923C18.8591 7.66689 19.1902 8.52778 19.7796 9.16251C20.369 9.79725 21.1684 10.1538 22.002 10.1538C22.8355 10.1538 23.6349 9.79725 24.2243 9.16251C24.8137 8.52778 25.1448 7.66689 25.1448 6.76923C25.1448 5.87157 24.8137 5.01068 24.2243 4.37595C23.6349 3.74121 22.8355 3.38462 22.002 3.38462ZM15.7162 6.76923C15.7162 4.97392 16.3785 3.25214 17.5573 1.98266C18.7361 0.713184 20.3349 0 22.002 0C23.669 0 25.2678 0.713184 26.4466 1.98266C27.6254 3.25214 28.2877 4.97392 28.2877 6.76923C28.2877 8.56454 27.6254 10.2863 26.4466 11.5558C25.2678 12.8253 23.669 13.5385 22.002 13.5385C20.3349 13.5385 18.7361 12.8253 17.5573 11.5558C16.3785 10.2863 15.7162 8.56454 15.7162 6.76923ZM36.9305 5.07692C36.3054 5.07692 35.7058 5.34437 35.2638 5.82042C34.8217 6.29647 34.5734 6.94214 34.5734 7.61538C34.5734 8.28863 34.8217 8.93429 35.2638 9.41035C35.7058 9.8864 36.3054 10.1538 36.9305 10.1538C37.5557 10.1538 38.1552 9.8864 38.5973 9.41035C39.0393 8.93429 39.2877 8.28863 39.2877 7.61538C39.2877 6.94214 39.0393 6.29647 38.5973 5.82042C38.1552 5.34437 37.5557 5.07692 36.9305 5.07692ZM31.4305 7.61538C31.4305 6.83755 31.5728 6.06734 31.8492 5.34872C32.1256 4.6301 32.5307 3.97714 33.0414 3.42714C33.5522 2.87713 34.1585 2.44084 34.8258 2.14317C35.4931 1.84551 36.2083 1.69231 36.9305 1.69231C37.6528 1.69231 38.368 1.84551 39.0353 2.14317C39.7026 2.44084 40.3089 2.87713 40.8196 3.42714C41.3303 3.97714 41.7355 4.6301 42.0119 5.34872C42.2883 6.06734 42.4305 6.83755 42.4305 7.61538C42.4305 9.18628 41.8511 10.6928 40.8196 11.8036C39.7882 12.9144 38.3892 13.5385 36.9305 13.5385C35.4718 13.5385 34.0729 12.9144 33.0414 11.8036C32.01 10.6928 31.4305 9.18628 31.4305 7.61538ZM4.71624 7.61538C4.71624 6.94214 4.96458 6.29647 5.40663 5.82042C5.84868 5.34437 6.44823 5.07692 7.07338 5.07692C7.69853 5.07692 8.29808 5.34437 8.74013 5.82042C9.18218 6.29647 9.43052 6.94214 9.43052 7.61538C9.43052 8.28863 9.18218 8.93429 8.74013 9.41035C8.29808 9.8864 7.69853 10.1538 7.07338 10.1538C6.44823 10.1538 5.84868 9.8864 5.40663 9.41035C4.96458 8.93429 4.71624 8.28863 4.71624 7.61538ZM7.07338 1.69231C5.61469 1.69231 4.21574 2.31634 3.18429 3.42714C2.15284 4.53793 1.57338 6.04449 1.57338 7.61538C1.57338 9.18628 2.15284 10.6928 3.18429 11.8036C4.21574 12.9144 5.61469 13.5385 7.07338 13.5385C8.53207 13.5385 9.93102 12.9144 10.9625 11.8036C11.9939 10.6928 12.5734 9.18628 12.5734 7.61538C12.5734 6.04449 11.9939 4.53793 10.9625 3.42714C9.93102 2.31634 8.53207 1.69231 7.07338 1.69231ZM10.4535 36.3931C9.74281 36.8976 8.91852 37.1854 8.06815 37.2261C7.21778 37.2667 6.37305 37.0586 5.62363 36.624C4.8742 36.1893 4.24805 35.5442 3.81162 34.7572C3.37518 33.9701 3.14476 33.0705 3.14481 32.1538V21.1538C3.14481 20.9294 3.22759 20.7142 3.37494 20.5555C3.52229 20.3968 3.72214 20.3077 3.93052 20.3077H10.265C10.4083 19.0686 10.8686 17.8968 11.5944 16.9231H3.93052C2.8886 16.9231 1.88936 17.3688 1.15261 18.1622C0.415855 18.9557 0.00195348 20.0318 0.00195348 21.1538V32.1538C0.00154815 33.611 0.35059 35.0436 1.01527 36.3129C1.67995 37.5822 2.63774 38.6451 3.79586 39.3986C4.95399 40.1522 6.27319 40.5709 7.6257 40.6142C8.97821 40.6575 10.3182 40.3239 11.5158 39.6457C11.025 38.619 10.6676 37.5246 10.4535 36.3931ZM32.4881 39.6457C33.6857 40.3239 35.0257 40.6575 36.3782 40.6142C37.7307 40.5709 39.0499 40.1522 40.208 39.3986C41.3662 38.6451 42.324 37.5822 42.9886 36.3129C43.6533 35.0436 44.0024 33.611 44.002 32.1538V21.1538C44.002 20.0318 43.5881 18.9557 42.8513 18.1622C42.1146 17.3688 41.1153 16.9231 40.0734 16.9231H32.4095C33.1347 17.8972 33.5949 19.0688 33.739 20.3077H40.0734C40.2818 20.3077 40.4816 20.3968 40.629 20.5555C40.7763 20.7142 40.8591 20.9294 40.8591 21.1538V32.1538C40.8591 33.0705 40.6287 33.9701 40.1923 34.7572C39.7559 35.5442 39.1297 36.1893 38.3803 36.624C37.6309 37.0586 36.7861 37.2667 35.9358 37.2261C35.0854 37.1854 34.2611 36.8976 33.5504 36.3931C33.3363 37.5246 32.9789 38.619 32.4881 39.6457ZM16.502 16.9231C15.46 16.9231 14.4608 17.3688 13.724 18.1622C12.9873 18.9557 12.5734 20.0318 12.5734 21.1538V33.8462C12.5734 36.5391 13.5667 39.1218 15.3349 41.026C17.1031 42.9302 19.5013 44 22.002 44C24.5026 44 26.9008 42.9302 28.669 41.026C30.4372 39.1218 31.4305 36.5391 31.4305 33.8462V21.1538C31.4305 20.0318 31.0166 18.9557 30.2799 18.1622C29.5431 17.3688 28.5439 16.9231 27.502 16.9231H16.502ZM15.7162 21.1538C15.7162 20.9294 15.799 20.7142 15.9464 20.5555C16.0937 20.3968 16.2936 20.3077 16.502 20.3077H27.502C27.7103 20.3077 27.9102 20.3968 28.0575 20.5555C28.2049 20.7142 28.2877 20.9294 28.2877 21.1538V33.8462C28.2877 35.6415 27.6254 37.3632 26.4466 38.6327C25.2678 39.9022 23.669 40.6154 22.002 40.6154C20.3349 40.6154 18.7361 39.9022 17.5573 38.6327C16.3785 37.3632 15.7162 35.6415 15.7162 33.8462V21.1538Z"
                  fill="white" />
              </svg>
              <div>{{ $t('barraLateral.equipe') }}</div>
            </div>
            <!-- pronetos -->
            <div class="flex gap-6 justify-center items-center text-white " @click="redirecionamento('/projetos')">
              <svg width="44" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.00195 13.7727H46.002M42.0734 39H5.93052C4.8886 39 3.88936 38.557 3.15261 37.7685C2.41585 36.98 2.00195 35.9106 2.00195 34.7955V6.20455C2.00195 5.08943 2.41585 4.01999 3.15261 3.23148C3.88936 2.44298 4.8886 2 5.93052 2H13.384C14.1597 2.00002 14.918 2.2458 15.5634 2.70636L18.2977 4.65727C18.943 5.11783 19.7014 5.36361 20.477 5.36364H42.0734C43.1153 5.36364 44.1146 5.80661 44.8513 6.59512C45.5881 7.38362 46.002 8.45307 46.002 9.56818V34.7955C46.002 35.9106 45.5881 36.98 44.8513 37.7685C44.1146 38.557 43.1153 39 42.0734 39Z"
                  stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div>{{ $t('barraLateral.projetos') }}</div>
            </div>
            <div class="flex gap-6 justify-center items-center text-white " @click="geraTutorial()">
              <tutorial-icon></tutorial-icon>
              <div>{{ $t('barraLateral.tutorial') }}</div>
            </div>
            <div class="flex gap-6 justify-center items-center text-white " @click="redirecionamento('/chat')">
              <iconChat></iconChat>
              <div>{{ $t('chat.chat') }}</div>
            </div>
          </div>
          <div class="w-full flex-col flex gap-6 ml-4 mb-4 justify-end items-start" @click="redirecionamento('/login')">
            <div class="flex gap-6 justify-center items-center text-white ">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M34.2222 38.5H44V33H34.2222V27.5L26.8889 35.75L34.2222 44V38.5ZM19.5556 0C14.1778 0 9.77778 4.95 9.77778 11C9.77778 17.05 14.1778 22 19.5556 22C24.9333 22 29.3333 17.05 29.3333 11C29.3333 4.95 24.9333 0 19.5556 0ZM19.5556 5.5C22.2444 5.5 24.4444 7.975 24.4444 11C24.4444 14.025 22.2444 16.5 19.5556 16.5C16.8667 16.5 14.6667 14.025 14.6667 11C14.6667 7.975 16.8667 5.5 19.5556 5.5ZM19.5556 24.75C12.9556 24.75 0 28.325 0 35.75V44H23.2222C22.4889 42.35 22.2444 40.7 22 38.775H4.64444V35.75C4.64444 34.1 12.2222 29.975 19.5556 29.975C20.7778 29.975 22 30.25 23.2222 30.25C23.9556 28.6 24.6889 26.95 25.9111 25.575C23.4667 25.025 21.2667 24.75 19.5556 24.75Z"
                  fill="white" />
              </svg>
              <div>{{ $t('barraLateral.sair') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="transition h-[100vh] w-[90vw] bg-opacity-50 backdrop-blur" @click="openClose()">
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted } from "vue";
import hamburger from '../imagemVetores/haburguer.vue'
import VueCookies from "vue-cookies";
import { conexaoBD } from '../stores/conexaoBD';
import tutorialIcon from '../assets/tutorialIcon.vue';
import { inject } from 'vue'
import iconChat from '../assets/iconChatBar.vue'


const tour = inject('tour')
const aberto = ref(false);
const banco = conexaoBD()
let usuario = ref({})

function openClose() {
  // if(tour.isActive()){
  //   if(tour.getCurrentStep().id=='step-3'){
  //     tour.next()
  //   }
  // }
  aberto.value = !aberto.value;
}

onMounted(async () => {
  colocaUsuarioId()
})

function colocaUsuarioId() {
  banco.getCookie().then((res) => {
    usuario.value = res;
    VueCookies.set("IdUsuarioCookie", res.id, 100000000000)
    verificaTarefasFeitas();
  })
}

function redirecionamento(local) {
  router.push(local).then(() => {
    openClose();
    if (local == '/login') {
      banco.logOut().then(() => {
        VueCookies.remove('IdUsuarioCookie');
        VueCookies.remove('IdTarefaCookies');
        VueCookies.remove('IdProjetoAtual');
        VueCookies.remove('equipeSelecionada');
        VueCookies.remove('equipeEditada')
        VueCookies.remove("idAuxEquipe")
        VueCookies.remove("idReloadProjeto")
        VueCookies.remove('propriedadeCookie')
        VueCookies.remove("projetoCookie")
        VueCookies.remove('statusCookie')
        VueCookies.remove('JWT')
        window.location.reload();
      });

    }
  });

}

async function geraTutorial() {
  console.log(usuario);
  if(usuario.value.configuracao.isTutorial){
    if(usuario.value.configuracao.ultimoPassoId!='step-1'
      && usuario.value.configuracao.ultimoPassoId!=null){
        router.push(usuario.value.configuracao.rotaDoPasso)
        tour.show(usuario.value.configuracao.ultimoPassoId,true)
        openClose()
    }else{
      // console.log(route.path);
      tour.start()
      openClose()
    }
  } else {
    usuario.value.configuracao.isTutorial = true
    banco.atualizar(usuario.value, '/usuario')
    router.push(usuario.value.configuracao.rotaDoPasso)
    tour.show(usuario.value.configuracao.ultimoPassoId, true)

    openClose()
  }
}

</script>

<style scoped>
@import url(../assets/main.css);

/* Add a new class for slide-in animation */
.slide-in {
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);
}

/* Apply styles to the sidebar container */
.sidebar {
  /* Your existing styles for the sidebar */
}

/* Apply styles to the closed sidebar using the slide-in class */
.slide-in-closed {
  transform: translateX(-100%);
}


/* @apply uses Tailwind CSS to apply styles without using ';' */
@layer components {}

;
</style>
