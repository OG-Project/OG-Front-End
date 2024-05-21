<template>
    <fundoPopUp class="w-full h-full" :largura="screenWidth < 640 ? '100%' : '40%'" :altura="screenWidth < 640 ? '100%' : '50%'">
        <div class="flex flex-col justify-around px-[2vw] miniMobile:w-full miniMobile:h-full tablet:w-[40vw] tablet:h-[50vh]">
            <div class="flex max-md:pl-0 ">
                <div v-if="screenWidth >= 768" style="font-Family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);" class=" text-[var(--roxo)]">
                    Alterar E-mail
                </div>
            </div>
            <div style="font-Family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);" class="flex justify-center items-center">
                <div class="flex flex-col gap-16">
                    <div class="flex justify-between items-center gap-5 max-sm:flex-col">
                        <span class="w-full flex justify-start ">Novo E-mail :</span>
                        <Input 
                        styleInput="input-transparente-claro-grande" 
                        conteudoInput="Novo E-mail" 
                        v-model="emailNovo"
                        tipo="obrigatorio"
                        :isInvalido="isEmailInvalido"
                        textoInvalido='Deve conter "@" e "."'
                        @updateModelValue="(e)=> {
                                    emailNovo=e
                        }"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-center " v-if="screenWidth < 640">
                <Botao 
                :funcaoClick="alteraEmail" 
                preset="PadraoVazado" 
                texto="Confirmar" 
                tamanhoDaBorda="2px"
                tamanhoDaFonte="2.0vh" tamanhoPadrao="mobilemedio" />
            </div>
            <div class="flex justify-end " v-else>
                <Botao 
                :funcaoClick="alteraEmail" 
                preset="PadraoVazado" 
                texto="Confirmar" 
                tamanhoDaBorda="2px"
                tamanhoDaFonte="2.0vh"  />
            </div>
            
        </div>
    </fundoPopUp>
</template>

<script setup>
import { ref,onMounted, watch} from 'vue';
import { perfilStore } from '../stores/perfilStore';
import Botao from './Botao.vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import { conexaoBD } from '../stores/conexaoBD';
import  VueCookies  from 'vue-cookies';
const screenWidth = ref(window.innerWidth)
const conexao=conexaoBD()
const perfil=perfilStore()

let isEmailInvalido=ref(false)
let usuario=ref({})
let emailNovo=ref('')


watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})

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