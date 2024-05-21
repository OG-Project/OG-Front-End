<template>
    <div>
        <fundoPopUp :largura="screenWidth < 640 ? '100%' : '40%'" :altura="screenWidth < 640 ? '100%' : '60%'" >

            <div class="flex flex-col justify-between  w-full h-full gap-9">
                <div class="max-md:pl-0 max-md:pt-0 flex pl-12 pt-12">
                    <div v-if="screenWidth >= 768"
                        style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);"
                        class=" text-[var(--roxo)]">
                        Alterar Senha
                        <!-- {{ senhaUsuario }} -->
                    </div>
                    <div v-else style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanhoMobile);"
                        class=" flex text-[var(--roxo)]">
                        Alterar Senha
                        <!-- {{ senhaUsuario }} -->
                    </div>
                </div>
                <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                    class="flex max-md:flex-col justify-center items-center">
                    <div class="flex flex-col gap-16 ">
                        <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                            <span class="font-semibold">Insira a senha antiga</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Senha Antiga"
                                v-model="senhaAntiga" tipo="obrigatorio" @updateModelValue="(e) => {
                                                                senhaAntiga = e
                                                            }" />
                        </div>
                        <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                            <span class="font-semibold">Insira uma senha nova</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Senha Nova"
                                v-model="senhaNova" tipo="password" :isInvalido="isInvalido"
                                textoInvalido="Senha não é igual" @updateModelValue="(e) => {
                                        senhaNova = e
                                    }" />
                        </div>
                        <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                            <span class="font-semibold">Confirme a nova senha</span>
                            <Input styleInput="input-transparente-claro-grande" conteudoInput="Confirmar Senha"
                                v-model="senhaConfirmada" tipo="password" :isInvalido="isInvalido"
                                textoInvalido="Senha não é igual" @updateModelValue="(e) => {
                                                                        senhaConfirmada = e
                                                                    }" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-center " v-if="screenWidth < 640">
                    <Botao :funcaoClick="alteraSenha" preset="PadraoVazado" texto="Confirmar" tamanhoDaBorda="2px"
                        tamanhoDaFonte="2.0vh" tamanhoPadrao="mobilemedio" />
                </div>
                <div class="flex justify-center " v-else>
                    <Botao :funcaoClick="alteraSenha" preset="PadraoVazado" texto="Confirmar" tamanhoDaBorda="2px"
                        tamanhoDaFonte="2.0vh" />
                </div>
            </div>
        </fundoPopUp>
        <div class="w-[40%] h-[10%]">
            <alertTela v-if="mensagemAlert != ''" :mensagem="mensagemAlert" :cor="'#CD0000'"
                @acabou-o-tempo="limpaMensagemError"></alertTela>
        </div>
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
let mensagemAlert = ref('')
let usuario = ref({})
let showAlert = ref(false)
let senhaUsuario = ref('')
let senhaAntiga = ref('')
let senhaNova = ref('')
let senhaConfirmada = ref('')
const screenWidth = ref(window.innerWidth)

watch(usuario, (a) => {

})

watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})

onUpdated(() => {

})


function limpaMensagemError() {
    mensagemAlert.value = ''
}
window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
})
onMounted(async () => {
    usuario.value = await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'), '/usuario')
    senhaUsuario.value = usuario.value.senha

    mensagemAlert.value = '';
})


function alteraSenha() {
    if (senhaAntiga.value == senhaUsuario.value && senhaNova.value == senhaConfirmada.value) {
        isInvalido.value = false
        usuario.value.senha = senhaNova.value
        alert(usuario.senha)
        conexao.atualizar(usuario.value, '/usuario')
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