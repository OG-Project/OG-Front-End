<template>
    <div >
        <FundoPopUp  :largura="screenWidth < 640 ? '100%' : '30%'" :altura="screenWidth < 640 ? '100%' : '50%'">
            <div class="flex flex-col justify-around items-center w-[60vh] h-[44vh] ">
                <div style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);">
                    <div class="text-[var(--roxo)]">{{ $t('confirmarPopUp.confirmar') }}</div>
                </div>
                <div>
                    <Botao 
                    :funcaoClick="confirmar" 
                    preset="Confirmar" 
                    texto="Confirmar" 
                    tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                    <Botao 
                    :funcaoClick="cancelar" 
                    preset="Sair" 
                    texto="Cancelar" 
                    tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh" />
                </div>
            </div>
        </FundoPopUp>
    </div>
</template>

<script setup>
import Botao from './Botao.vue';
import FundoPopUp from './fundoPopUp.vue';
import VueCookies from "vue-cookies";
import { conexaoBD } from '../stores/conexaoBD';
import router from '../router';

const conexao=conexaoBD()

function confirmar(){
    console.log('delete');
    conexao.deletar(VueCookies.get('IdUsuarioCookie'),'/usuario')
    VueCookies.remove('IdUsuarioCookie');
    VueCookies.remove('IdTarefaCookies');
    VueCookies.remove('IdProjetoAtual');
    VueCookies.remove('JWT');
    VueCookies.remove('equipeSelecionada');
router.push('/login')
}

function cancelar(){

}

</script>

<style>

</style>