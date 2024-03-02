<template>
    <div class="w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Privacidade
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem seus projetos</span>
                        <CheckBox :checked="gerarBooleano(VueCookies.get('isVisualizacaoProjeto'))" tipo="toggle" el-id="visualizacaoProjeto" @envia-valor="visualizacaoProjeto($event)"></CheckBox>                           
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem seu email</span>
                        <CheckBox :checked="gerarBooleano(VueCookies.get('isVisualizacaoEmail'))" tipo="toggle" el-id="visualizacaoEmail" @envia-valor="visualizacaoEmail($event)"></CheckBox>
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem suas Equipes</span>
                        <CheckBox :checked="gerarBooleano(VueCookies.get('isVisualizacaoEquipe'))" tipo="toggle" el-id="visualizacaoEquipes" @envia-valor="visualizacaoEquipes($event)"></CheckBox>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import CheckBox from '../components/checkBox.vue'
import VueCookies from 'vue-cookies';
import { perfilStore } from '../stores/perfilStore';
import { onMounted } from 'vue';
const perfil = perfilStore()
function visualizacaoProjeto(valor){    
    perfil.isVisualizacaoProjeto=valor.valor
    VueCookies.set('isVisualizacaoProjeto',JSON.stringify(perfil.isVisualizacaoProjeto))
}
function visualizacaoEquipes(valor){
    perfil.isVisualizacaoEquipe=valor.valor
    VueCookies.set('isVisualizacaoEquipe',JSON.stringify(perfil.isVisualizacaoEquipe))

}
function visualizacaoEmail(valor){
    perfil.isVisualizacaoEmail=valor.valor
    VueCookies.set('isVisualizacaoEmail',JSON.stringify(perfil.isVisualizacaoEmail))
}


function gerarBooleano(boolean){
    if(boolean=="true"){
        console.log('foi booleano '+ boolean)
        return 1
    }else if(boolean=="false"){
        console.log('foi booleano '+ boolean)
        return 0
    }
}
onMounted(()=>{
    VueCookies.config('30d')
})
</script>

<style scoped>

</style>