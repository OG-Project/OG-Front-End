<template>
    <div>
        <fundoPopUp :largura="screenWidth < 640 ? '100%' : '40%'" :altura="screenWidth < 640 ? '100%' : '60%'" >

            <div class="flex flex-col justify-between  w-full h-full gap-9">
                <div class="max-md:pl-0 max-md:pt-0 flex ">
                    <div v-if="screenWidth >= 768"
                        style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);"
                        class=" text-[var(--roxo)]">
                        Alterar Senha
                        <!-- {{ senhaUsuario }} -->
                    </div>
                    
                    
                </div>
                <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                    class="flex max-md:flex-col justify-center items-center">
                    <div class="flex flex-col gap-16 ">
                       
                        <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                            <span class="">Insira uma senha nova</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Senha Nova"
                                v-model="senhaNova" tipo="password" :isInvalido="isInvalido"
                                textoInvalido="Senha não é igual" @updateModelValue="(e) => {
                                        senhaNova = e
                                    }" />
                        </div>
                        <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                            <span class="">Confirme a nova senha</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Confirmar Senha"
                                v-model="senhaConfirmada" tipo="password" :isInvalido="isInvalido"
                                textoInvalido="Senha não é igual" @updateModelValue="(e) => {
                                        senhaConfirmada = e
                                    }" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end " v-if="screenWidth < 640">
                    <Botao :funcaoClick="alteraSenha" preset="PadraoVazado" texto="Confirmar" tamanhoDaBorda="2px"
                        tamanhoDaFonte="2.0vh" tamanhoPadrao="mobilemedio" />
                </div>
                <div class="flex justify-end " v-else>
                    <Botao :funcaoClick="alteraSenha" preset="PadraoVazado" texto="Confirmar" tamanhoDaBorda="2px"
                        tamanhoDaFonte="2.0vh" />
                </div>
            </div>
        </fundoPopUp>
            <!-- <alertTela v-if="alterado" :key="alterado" mensagem="Senha Alterada" :cor="'#8E00FF'"></alertTela> -->
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import Botao from './Botao.vue';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { perfilStore } from '../stores/perfilStore';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from 'vue-cookies';
import alertTela from './alertTela.vue';
let perfil = perfilStore()
let conexao = conexaoBD()

let isInvalido = ref(false)
let usuario = ref({})
let senhaUsuario = ref('')
let senhaNova = ref('')
let senhaConfirmada = ref('')
let alterado=ref(false)
const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})

onUpdated(() => {

})


window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
})
onMounted(async () => {
    usuario.value = await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'), '/usuario')
    senhaUsuario.value = usuario.value.senha

})


function alteraSenha() {
    if (senhaNova.value == senhaConfirmada.value) {
        isInvalido.value = false
        // usuario.value.senha = senhaNova.value
        let a={
            senhaNova:senhaNova.value
        }
        conexao.trocaSenha(usuario.value.id,a)
        perfil.alteradoSenha=!perfil.alteradoSenha
        perfil.popUpSenha=!perfil.popUpSenha
    } else {
        isInvalido.value = true
    }

    // if(senhaAntiga.value!=usuario.senha){
    //     // alert('vamo que hj é sexta')
    // }
    // if(senhaNova.value!=senhaConfirmada.value){
    //     isInvalido.value=true
    // }else{
    //     usuario.senha=senhaNova.value
    //     alert(usuario.senha)
    //     isInvalido.value=false
    //     // conexao.atulizar(usuario,'/usuario')
    // }
}

</script>

<style scoped></style>