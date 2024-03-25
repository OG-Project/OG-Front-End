<template>
    <div class="w-[80%] flex flex-row justify-around">
        <div class="pl-[7%] w-[80%] h-[100%] flex flex-row gap-[0.3%]">
            <button @click="$emit('trocaValor','Kanban')" class="bg-[#CECCCE] px-[1%]">
                Kanban
            </button>
            <button @click="$emit('trocaValor','Lista')" class="bg-[#CECCCE] px-[1%]">
                Lista
            </button>
            <button @click="$emit('trocaValor','TimeLine')" class="bg-[#CECCCE] px-[1%]">
                Linha Do Tempo
            </button>
            <button @click="$emit('trocaValor','Calendario')" class="bg-[#CECCCE] px-[1%]">
                Calendário
            </button>
        </div>
        <div class="w-max bg-[#CECCCE] px-2 flex flex-row justify-center items-center">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.152344 0.328613V10.3198H9.81154V0.328613H0.152344ZM13.0313 0.328613V3.659H25.9102V0.328613H13.0313ZM13.0313 6.98939V10.3198H22.6905V6.98939H13.0313ZM0.152344 13.6502V23.6413H9.81154V13.6502H0.152344ZM13.0313 13.6502V16.9806H25.9102V13.6502H13.0313ZM13.0313 20.3109V23.6413H22.6905V20.3109H13.0313Z"
                    fill="black" />
            </svg>
            <button class="w-[110%]">
                Agrupar Por: status
            </button>
        </div>
    </div>
</template>

<script setup>
let emit = defineEmits("opcao")
</script>

<style lang="scss"></style>