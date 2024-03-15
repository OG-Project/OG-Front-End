<template>
    <div class="w-full h-full">
        <div class="flex items-center justify-center w-full h-[8%]">
            <p class="text-4xl">Lista De Tarefas</p>
        </div>
        <div class="flex items-center relative justify-center w-full h-[40%]">
            <div id="poligono" class="h-[110%] w-[26%] left-10 absolute overflow-visible" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"></div>
            <div class="bg-[#FBFBFB] w-[80%] h-[100%] flex items-center justify-end" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                <div class="overflow-y-auto h-[80%] w-[75%]">
                    <div class="flex gap-24">
                        <p>Nome da Tarefa</p>
                        <p>Líder</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>


</script>
<style>
    #poligono{
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        background-color: #36213E;

    }
</style>