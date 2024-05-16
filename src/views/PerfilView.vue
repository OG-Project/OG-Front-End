<template>
    <alterarSenha v-if="popUpSenha"></alterarSenha>
    <alterarEmail v-if="popUpEmail"></alterarEmail>
    <div class="flex justify-center flex-wrap ">
        <div class="flex bg-[var(--backgroundItems)] flex-col sm:justify-center md:justify-around items-center w-[20%] h-[92vh] drop-shadow-md">
            <div class=" flex justify-center items-center w-[329px] h-[329px]">
                <div 
                @click="open()"
                @mouseover="()=> ishover=!ishover"
                @mouseout="()=> ishover=!ishover"
                class="xl:w-[95%] 
                cursor-pointer
                text-center 
                flex 
                justify-center 
                items-center  
                sm:h-[30%] 
                sm:w-[30%] 
                md:w-[70%] 
                md:h-[70%] 
                rounded-full 
                xl:h-[95%]"
               >    
                    <img 
                    :src="Imagem"
                    class="xl:w-[85%] 
                    hover:bg-slate-600 
                    sm:h-[30%] 
                    sm:w-[30%] 
                    md:w-[70%] 
                    md:h-[70%] 
                    rounded-full 
                    xl:h-[85%]"
                    />
                    
                    
                    <div v-if="ishover" 
                    style="font-family: var(--fonteCorpo); font-size: var(--fonteCorpoTamanho);"
                    class="absolute flex bg-gray-400 px-2 py-1 rounded-full items-center text-black">
                        <span class=" text-[var(--fonteCor)] ">Alterar Foto</span>
                        <iconLapisDinamic  class="
                         bg-cover 
                         ml-3 
                         w-6 
                         h-6"  />
                    </div> 
                </div>
                
            </div>
            <div 
            style="font-family: var(--fonteCorpo); font-size: var(--fonteCorpoTamanho);"
            class=" flex flex-col gap-10">
                <div @click="informacao()" class="bg-[var(--roxo)] medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-[var(--clickBorder)] 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{ 'active': identificarRota(route.path, '/perfil/informacoes') }">
                    {{ $t('informacoes.Informações') }}
                </div>
                <div @click="seguranca()" class="bg-[var(--roxo)] medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-[var(--clickBorder)] 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{ 'active': identificarRota(route.path, '/perfil/seguranca') }">
                    {{ $t('seguranca.Segurança') }}
                </div>
                <div @click="acessibilidade()" class="bg-[var(--roxo)] medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-[var(--clickBorder)] 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{ 'active': identificarRota(route.path, '/perfil/acessibilidade') }">
                    {{ $t('acessibilidade.Acessibilidade') }}
                </div>
                <div @click="privacidade()" class="bg-[var(--roxo)] medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-[var(--clickBorder)] 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{ 'active': identificarRota(route.path, '/perfil/privacidade') }">
                    {{ $t('privacidade.Privacidade') }}
                </div>
                <div @click="aparencia()" class="bg-[var(--roxo)] medioId 
                    text-white 
                    justify-center 
                    active:border-2 
                    active:border-[var(--clickBorder)] 
                    flex 
                    items-center
                    cursor-pointer" 
                    :class="{ 'active': identificarRota(route.path, '/perfil/aparencia') }">
                    {{ $t('aparencia.Aparência') }}
                </div>

            </div>
        </div>

        <div>
            <Transition name="slide-fade" mode="out-in">
                <router-view />
            </Transition>
        </div>
    </div>
    <!-- background-color: rgb(98, 11, 167); display: flex; justify-content: center; align-items: center; color: rgb(255, 255, 255); font-size: 2vh; -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore';
import Botao from '../components/Botao.vue'
import router from '../router';
import iconLapisDinamic from '../imagem-vetores/icon-lapisDinamic..vue';

import alterarEmail from '../components/alterarEmail.vue';
import alterarSenha from '../components/alterarSenha.vue';
import { onBeforeMount, onMounted, ref , computed, onUnmounted } from 'vue';
import {useRoute} from 'vue-router';
import  VueCookies  from 'vue-cookies';
import { conexaoBD } from '../stores/conexaoBD';
import { useFileDialog } from '@vueuse/core'

const perfil = perfilStore()
const { popUpSenha, popUpEmail } = storeToRefs(perfil)
const route = useRoute()
const conexao = conexaoBD()
const { files, open, reset, onChange } = useFileDialog({
    accept:'image/*'
})

const imagemSelecionada = ref(null);

onChange((files)=>{
    console.log('files');
    console.log(files);
    const file = files[0];

    // Extrair o nome do arquivo
    const fileName = file.name;

    // Extrair o tipo do arquivo
    const fileType = file.type;

    // Criar um blob do arquivo
    const fileBlob = new Blob([file]);

    // Agora você pode usar o fileName, fileType e fileBlob conforme necessário
    console.log('Nome do arquivo:', fileName);
    console.log('Tipo do arquivo:', fileType);
    console.log('Blob do arquivo:', fileBlob);
    // Armazena o arquivo na variável reativa
    imagemSelecionada.value = file;
    enviarFotoParaBackend()
})


let Imagem=computed(()=>{
    if(foto.value!=null && imagemSelecionada.value==null){
        console.log(foto.value);
        return 'data:' +foto.value.tipo + ';base64,' + foto.value.dados
    }else if(foto.value!=null && imagemSelecionada.value!=null){
        const reader=new FileReader()
        imagemBlob.value=new Blob([imagemSelecionada.value],{type:imagemSelecionada.value.type})
        reader.readAsDataURL(imagemBlob.value)
        reader.onload = function(event) {
            // event.target.result contém a string Base64 do Blob
            const base64String = event.target.result;
           return (base64String); // Exibe a string Base64 no console
        };
        console.log(reader.result)
        
        return reader.result
    }
})
let isSeguActive = ref(false)

let usuario=ref({})
const foto=ref(null)
const imagemBlob=ref(null)
let ishover=ref(false) 

async function enviarFotoParaBackend() {
    try {
        if (!imagemSelecionada.value) {
            // Verifica se uma imagem foi selecionada
            console.error('Nenhuma imagem selecionada.');
            return;
        }
        foto.value=imagemSelecionada.value
        console.log(foto.value);
        await conexao.cadastrarFotoUsuario(usuario.value.id, imagemSelecionada.value);
        console.log('Foto enviada com sucesso para o backend.');
    } catch (error) {
        console.error('Erro ao enviar a foto para o backend:', error);
    }
}

onMounted(async () => {
    usuario.value= await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'),'/usuario')
    console.log(route.path)
    console.log(usuario.value)
    foto.value=await usuario.value.foto
    
    // if(foto.value==undefined){
    //     foto.value=usuario.value.foto
    // }
    console.log(foto.value);
})

function informacao() {

    router.push({ name: 'Informacoes' })
    // router.push('/perfil/informacoes')

    // window.location.href = "//localhost:5173/perfil/informacoes"
}
function acessibilidade() {
    // router.refresh()
    router.push({ name: 'Acessibilidade' })
    // router.push('/perfil/acessibilidade')


}
function seguranca() {
    router.push({ name: 'Seguranca' })

    isSeguActive.value = !isSeguActive.value

}
function privacidade() {
    router.push({ name: 'Privacidade' })

}
function aparencia() {
    router.push({ name: 'Aparencia' })

}

function identificarRota(rotaAtual, rota) {
    if (rotaAtual == rota) {
        return true
    }

    return false
}



</script>

<style scoped>
.medioId {
    @apply 2xl:w-[10vw] 2xl:h-[5h] lg:w-[15vw] lg:h-[5vh] xl:w-[14vw] xl:h-[5h] md:w-[18vw] md:h-[5vh] sm:w-[20vw] sm:h-[5vh]
}

.active {
     @apply bg-[var(--roxoAtencao)] ;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>