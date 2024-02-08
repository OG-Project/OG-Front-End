<template>
    <div class="flex justify-center">
        <div class="flex  flex-col items-center w-[443px] h-[877px] drop-shadow-md bg-[#FEFBFF]">
            <div class="w-[329px] rounded-full h-[329px] mt-10 mb-16 bg-emerald-400" ></div>
            <div class=" flex flex-col gap-10">    
                <Botao preset="PadraoRoxo" texto="Perfil" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh">
                </Botao>
                <routerLink to="{name: informacoes}" >oi</routerLink>
                <Botao preset="PadraoRoxo" texto="Segurança" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh" />
                <Botao preset="PadraoRoxo" texto="Acessibilidade" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh" />
                <Botao preset="PadraoRoxo" texto="Privacidade" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh" />
                <Botao preset="PadraoRoxo" texto="Aparência" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh" />
            </div>
        </div>

        <div>
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Botao from '../components/Botao.vue'
</script>

<style scoped>

</style>