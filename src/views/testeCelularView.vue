<template>
    <div class='w-full h-[94.5vh]'>
        <div class=' flex justify-between items-center'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="purple" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <Input width="100" />
            <div>
                tarefa
            </div>
        </div>
        
        <div class='h-full flex flex-col justify-evenly items-center'>
                <div class='font-SourceSans w-72 text-3xl flex justify-start border-b-2 border-purple-400'>
                    Segurança
                </div>
            <div class='font-Poppins flex w-full justify-around items-center'>
                <label class='text-left'>Alterar<br>Usuario</label>
                <Input conteudoInput="email" />
            </div>
            <div class='font-Poppins flex w-full justify-around items-center'>
                <label class='text-left'>Alterar<br>E-mail</label>
                <Input conteudoInput="email" />
            </div>
            <div class='font-Poppins flex w-full justify-around items-center'>
                <label class='text-left'>Alterar<br>Senha</label>
                <Input conteudoInput="email" />
            </div>
            <div class='font-Poppins flex w-full justify-around items-center'>
                <label class='text-left'>Confirmar<br>Senha</label>
                <Input conteudoInput="email" ></Input>
            </div>
            <Botao tamanhoDaBorda="" tamanhoPadrao="pequeno" preset='PadraoRoxo' texto='Salvar Alterações' />
            <cardProjetos 
            name="oii" 
            descricao="sdfdfkjdlsfkja sd hfkasdjhfkja sdhadj kfjd klsajdl ksaj çdl ska jds lak djk kljçslkdasd skaldlkçj  sakljsd lkjsdlçkajds LKÇJLK KJLSDFÇL LKJ LKJLKJ LKJÇL" 
            feito=100
            reponsavel="lsdkjfkjhkljh"
            tipo="UUSDKF"
            comeco='12/09/2023'
            final="31//08/2045"
            ></cardProjetos>
        </div>
    </div>
</template>

<script setup>
import Input  from "../components/Input.vue";
import Botao  from "../components/Botao.vue";
import cardProjetos  from "../components/cardProjetos.vue";
</script>

<style scoped>

</style>