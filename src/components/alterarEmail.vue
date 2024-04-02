<template>
    <fundoPopUp largura="77vh" altura="54vh">
        <div class="flex flex-col justify-between w-[740px] h-[515px]">
            <div class="flex pl-12 pt-12">
                <div class="text-3xl text-roxo">
                    Alterar E-mail
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="flex flex-col gap-16">
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl font-semibold">Novo E-mail</span>
                        <Input 
                        styleInput="input-transparente-claro-grande" 
                        conteudoInput="Novo E-mail" 
                        v-model="emailNovo"
                        tipo="obrigatorio"
                        :isInvalido="isEmailInvalido"
                        textoInvalido='Deve conter "@" e "."'
                        @updateModelValue="(e)=> {
                                    console.log(e)
                                    emailNovo=e
                        }"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end pb-14 pr-14">
                <Botao 
                :funcaoClick="alteraEmail" 
                preset="PadraoVazado" 
                texto="Confirmar" 
                tamanhoDaBorda="2px"
                tamanhoDaFonte="2.0vh" />
            </div>
        </div>
    </fundoPopUp>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { perfilStore } from '../stores/perfilStore';
import Botao from './Botao.vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import { conexaoBD } from '../stores/conexaoBD';
import  VueCookies  from 'vue-cookies';

const conexao=conexaoBD()
const perfil=perfilStore()

let isEmailInvalido=ref(false)
let usuario=ref({})
let emailNovo=ref('')
onMounted(async ()=>{
    usuario.value=await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'),'/usuario')
})
function alteraEmail(){
    if(emailNovo.value.includes('@')){
        // alert('tem @')
        emailNovo.value=emailNovo.value.split('@')
        if(emailNovo.value[1].includes('.')){
            // alert('.')
            emailNovo.value=emailNovo.value[0].concat('@'+emailNovo.value[1])
            console.log(emailNovo.value);
            usuario.value.email=emailNovo.value
            conexao.atualizar(usuario.value,'/usuario')
            isEmailInvalido.value=false
        }
    }else{
        isEmailInvalido.value=true
    }
}
</script>

<style scoped></style>