<template>
    <div>
        <alertTela > </alertTela>
        <fundoPopUp largura="77vh" altura="68vh">
            <div class="flex flex-col justify-between  w-[77vh] h-[68vh]">
                <div class="flex pl-12 pt-12">
                    <div style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);" class=" text-[var(--roxo)]">
                        Alterar Senha 
                        <!-- {{ senhaUsuario }} -->
                    </div>    
                </div>
                <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);" class="flex justify-center items-center">
                    <div class="flex flex-col gap-16">
                        <div class="flex justify-between items-center gap-5">
                            <span class="font-semibold">Insira a senha antiga</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Senha Antiga" 
                            v-model="senhaAntiga" 
                            tipo="obrigatorio"
                            
                            @updateModelValue="(e)=> {
                                    senhaAntiga=e
                            }"
                            />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="font-semibold">Insira uma senha nova</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Senha Nova" 
                            v-model="senhaNova" 
                            tipo="password"
                            :isInvalido="isInvalido"
                            textoInvalido="Senha não é igual"
                            @updateModelValue="(e)=> {
                                    senhaNova=e
                            }"
                            />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="font-semibold">Confirme a nova senha</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Confirmar Senha" 
                            v-model="senhaConfirmada" 
                            tipo="password"
                            :isInvalido="isInvalido"
                            textoInvalido="Senha não é igual"
                            @updateModelValue="(e)=> {
                                    senhaConfirmada=e
                            }"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pb-14 pr-14">
                    <Botao 
                    :funcaoClick="alteraSenha" 
                    preset="PadraoVazado" 
                    texto="Confirmar" 
                    tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh"    
                    />
                </div>
            </div>
        </fundoPopUp>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import Botao from './Botao.vue';
import { onMounted,onUpdated ,ref,watch } from 'vue';
import { perfilStore } from '../stores/perfilStore';
import { conexaoBD } from '../stores/conexaoBD';
import  VueCookies  from 'vue-cookies';
import alertTela from './alertTela.vue';
let perfil=perfilStore()
let conexao=conexaoBD()

let isInvalido=ref(false)

let usuario=ref({})
let showAlert=ref(false)
let senhaUsuario=ref('')
let senhaAntiga=ref('')
let senhaNova=ref('')
let senhaConfirmada=ref('')

watch(usuario,(a)=>{
    
})

onUpdated(()=>{
    
})

onMounted(async ()=>{
    usuario.value=await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'),'/usuario')
    senhaUsuario.value=usuario.value.senha 
})


function alteraSenha(){
    if(senhaAntiga.value==senhaUsuario.value && senhaNova.value==senhaConfirmada.value){
        isInvalido.value=false
        usuario.value.senha=senhaNova.value
        alert(usuario.senha)
        conexao.atualizar(usuario.value,'/usuario')
    }else{
        isInvalido.value=true
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

<style scoped>

</style>