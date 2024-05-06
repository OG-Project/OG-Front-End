    <template>
        <fundoPopUp  largura="" altura="95vh">
            <div class="divGeral">
                <div class=" grid-template flex w-full">
                        <h1 class="titulo mt-5 flex font-semibold xl:text-3xl md:text-2xl absolute sm:text-xs color-[#000]">Equipe</h1>
                </div>
                <div class=" grid-template  flex w-full mt-[1vh]  p-5">
                    <div class="relative">
                        <input type="file" @change="handleFileUpload" class=" h-16 opacity-0 w-full absolute">
                        <div class="rounded-full bg-[#D7D7D7] flex items-center justify-center 2xl:w-[70px] 2xl:h-[70px] xl:w-[70px] xl:h-[70px] lg:w-[65px] lg:h-[65px] md:w-[60px] md:h-[60px]">
                            <img class="imagem" :class="{ 'imagem-arredondada': imagemSelecionadaUrl }" :src="imagemExibicao" alt="Imagem Selecionada" > 
                        </div>
                    </div>
                    <Input :class="{ 'computedClasses': someCondition }"  styleInput="input-transparente-claro" :largura="larguraInput()"  conteudoInput="Nome da Equipe" v-model="nome" @updateModelValue="(e)=> {nome=e}" ></Input> 
                </div>
                    <div class=" grid-template  flex w-full">
                        <Input :class="{ 'computedClasses': someCondition }" @updateModelValue="(e)=> {usuarioConvidado=e}" icon="../src/imagem-vetores/adicionarPessoa.svg" styleInput="input-transparente-claro" :largura="larguraInputConvidado()"   conteudoInput="Adicionar Membro" v-model="usuarioConvidado"></Input>
                </div>
                <div v-if="screenWidth >= 620" class="grid-template flex w-full mt-[1vh]">
                    <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                </div>
                <div v-else class="grid-template flex w-full mt-[1vh]">
                    <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="mobilegrande" texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                </div>
                <div class=" grid-template flex w-full mt-[1vh]">
                    <textAreaPadrao class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)" v-model="descricao" @updateModelValue="(e)=> {descricao=e}" ></textAreaPadrao>
                </div> 
                <div class="convidados-div flex justify-center xl:mt-[2vh] lg:mt-[4vh] md:mt-[4vh]">
                    <ListaConvidados :margin-right="marginRightConvidado()" texto="Convites" mostrar-select="true" class="listaConvidados" altura="40vh" :listaConvidados="membrosEquipe" ></ListaConvidados>
                </div>
                <div v-if="screenWidth >= 620" class="botao flex justify-end xl:mt-[8vh] md:mt-[10vh] xl:mx-[3vw] lg:mx-[5vw] md:mx-[5vw]">
                        <Botao  preset="PadraoRoxo" tamanhoPadrao="medio" texto="Criar Equipe" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe">
                        </Botao>
                </div>
                <div v-else class="mt-10 ml-2" >
                    <Botao preset="PadraoRoxo" tamanhoPadrao="mobilegrande" texto="Criar Equipe" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe">
                    </Botao>
                </div> 
                
            </div>  

        </fundoPopUp>
    <div v-if="mensagem != ''"  class="alert">
        <alertTela   :mensagem="mensagem" :cor="mensagemCor" :key="mensagem" @acabou-o-tempo="limparMensagemErro"></alertTela>
    </div>
    
    </template>
    <script setup>
    import { ref, computed, onMounted} from 'vue';
    import fundoPopUp from './fundoPopUp.vue';
    import Input from './Input.vue';
    import textAreaPadrao from './textAreaPadrao.vue';
    import Botao from './Botao.vue';
    import ListaConvidados from './ListaConvidados.vue';
    import { conexaoBD } from '../stores/conexaoBD';
    import { criaEquipeStore } from "../stores/criarEquipe";
    import VueCookies from "vue-cookies";
    import alertTela from './alertTela.vue';


    const banco = conexaoBD();
    let nome = ref('');
    let descricao = ref('');
    let usuarioConvidado = ref('');
    let usuarioLogado = VueCookies.get("IdUsuarioCookie")
    let membrosEquipe = ref([]);
    let conexaoWeb = webSocketStore()
    const screenWidth = window.innerWidth;
    let usuarios = banco.procurar("/usuario");
    import { webSocketStore } from '../stores/webSocket.js'
    
    function limparMensagemErro() {
    mensagem.value = "";
    }
    let mensagem = ref("");
    let mensagemCor = ref("");
    
    onMounted(()=>{
    conexaoWeb.url= "ws://localhost:8082/og/webSocket/usuario/" +usuarioLogado;
    conexaoWeb.criaConexaoWebSocket()
})

    function marginRightConvidado() {
        if(screenWidth <= 620){
            return '7vw'
        }
        if (screenWidth <= 768) {
            return '1vw';
        } else if (screenWidth > 768 && screenWidth <= 1024) {
            return '4vw';
        } else if (screenWidth > 1024 && screenWidth < 1920) {
            return '5vw';
        } else if (screenWidth > 1920 && screenWidth < 2560) {
            return '4vw';
        } else if (screenWidth == 1920) {
            return '2vw';
        }
        else if (screenWidth >= 2560) {
            return '1.5vw';
        }
    }

    const imagemSelecionada = ref(null);

    // Função para lidar com o upload de arquivos
    function handleFileUpload(event) {
    const file = event.target.files[0];

    // Extrair o nome do arquivo
    const fileName = file.name;

    // Extrair o tipo do arquivo
    const fileType = file.type;

    // Criar um blob do arquivo
    const fileBlob = new Blob([file]);

    // Agora você pode usar o fileName, fileType e fileBlob conforme necessário
    console.log('Nome do arquivo:', fileName);
    console.log('Tipo do arquivo:', fileType);
    console.log('Blob do arquivo:', fileBlob);
    // Armazena o arquivo na variável reativa
    imagemSelecionada.value = file;
    }

    // Computed property para retornar a URL da imagem selecionada
    const imagemSelecionadaUrl = computed(() => {
    // Se não houver imagem selecionada, retorna null
    if (!imagemSelecionada.value) return null;

    // Cria uma URL temporária para a imagem selecionada
    return URL.createObjectURL(imagemSelecionada.value);
    });

    // URL da imagem padrão
    const imagemPadraoUrl = '../src/imagem-vetores/imagemEquipePadrao.svg';

    // Computed property para determinar qual URL de imagem exibir
    const imagemExibicao = computed(() => {
    // Se houver uma imagem selecionada, retorna sua URL
    if (imagemSelecionadaUrl.value) {
    return imagemSelecionadaUrl.value;
    } else {
    // Caso contrário, retorna a URL da imagem padrão
    return imagemPadraoUrl;
    }
    });


    const equipeCadastrada={
    nome:"",
    descricao:""
    }

    console.log(usuarioLogado)
    function larguraInput(){
    const screenWidth = window.innerWidth;
    if(screenWidth <= 620){
            return '48'
        }
        if (screenWidth <= 768) {
            return '23';
        } if (screenWidth > 768 && screenWidth <= 1024) {
            return '24';
        }if (screenWidth > 1024 && screenWidth <= 1440) {
            return '26';
        }if(screenWidth > 1440 && screenWidth < 1920){
            return '10';
        }
        else {
            return '11';
        }
    };

    function larguraInputConvidado(){
    const screenWidth = window.innerWidth;
        if(screenWidth <= 620){
            return '70'
        }
        if (screenWidth <= 768) {
            return '34';
        } if (screenWidth > 768 && screenWidth <= 1024) {
            return '33';
        } if (screenWidth > 1024 && screenWidth <= 1440) {
            return '33';
        } if(screenWidth > 1440 && screenWidth < 1920){
            return '10';
        }else {
            return '16';
        }
    }

    // const webSocket = webSocketStore();
    // webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
    // await webSocket.enviaMensagemWebSocket(JSON.stringify(teste))

    async function listaUsuarios() {
    let listaUsuarios = await usuarios;
    listaUsuarios.forEach((usuario) => {
    if (usuarioConvidado.value === usuario.username || usuarioConvidado.value === usuario.email) {
        if (!membrosEquipe.value.some((membro) => membro.username === usuario.username || membro.email === usuario.email)) {
            membrosEquipe.value.push(usuario);
        } else {
            mensagem.value = ""
            mensagemCor.value = ""
            mensagem.value = "membro já pertence à equipe.";
            mensagemCor.value = "#CD0000"
        }
    }
    });
    }

    async function adicionarMembro() {
    await listaUsuarios();
    }

    async function cadastrarEquipe() { 
    limparMensagemErro();
    const cria = criaEquipeStore();

    if (!nome.value.trim()) {
    mensagem.value = ""
    mensagemCor.value = ""
    mensagem.value = "É obrigatório o nome da equipe";
    mensagemCor.value = "#CD0000"
    return;
    }

        equipeCadastrada.nome = nome.value;
        equipeCadastrada.descricao = descricao.value;
        mensagem.value = "";
        
        let equipe;
        cria.criaEquipe(equipeCadastrada).then(response =>{
        equipe = response.data;
        colocaMembrosEquipe(equipe);
        enviaParaWebSocket(equipe, membrosEquipe.value);
        window.location.reload();
        });
        
    };

    async function colocaMembrosEquipe(equipe){
        const ids = membrosEquipe.value.map(m => {
            return Number(m.id);
        });
        await enviarFotoParaBackend(equipe);
        adicionaUsuarioLogado(ids, equipe)
    }

    async function adicionaUsuarioLogado(ids, equipe) {
    // Adicione automaticamente o usuário logado à equipe
    const usuarioLogadoId = Number(usuarioLogado);
    banco.adicionarUsuarios(ids, equipe.id, "/usuario/add");
    
    banco.adicionarCriador(usuarioLogadoId,equipe.id)
}

    async function enviaParaWebSocket(equipe,membrosConvidados) {
        let equipeAux = {
            id: equipe.id,
            nome: equipe.nome,
            descricao: equipe.descricao,
            membros: membrosConvidados
        }
        let teste = {
            equipes: [{ equipe: equipeAux }],
            notificao: {
                mensagem: "Te Convidou para a Equipe",
                conviteParaEquipe: {
                    equipe: equipe
                }
            }
        }
        console.log(teste)
        console.log(equipeAux)
        
        const webSocket = webSocketStore();
        webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
        await webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
    }


    async function enviarFotoParaBackend(equipe) {
    try {
    if (!imagemSelecionada.value) {
        // Verifica se uma imagem foi selecionada
        return;
    }

    const equipeId = equipe.id;
    await banco.cadastrarFoto(equipeId, imagemSelecionada.value);
    mensagemError.value = 'Foto enviada com sucesso para o backend.';
    } catch (error) {
        mensagemError.value = 'Erro ao enviar a foto para o backend:';
    }
    }



    </script>
    <style scoped>
    @import url(../assets/main.css);

    @layer components {

    .imagem-arredondada {
    border-radius: 50%;
    }

    .imagem {
        @apply xl:h-[6vh] xl:w-[3vw] mt-1 ml-1;
    }

    .mensagem-error {
        @apply flex justify-center text-red-600 mt-10;
    }
    .botao{
        @apply w-[80%] h-[100%] gap-4  items-center; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    .convidados-div{
        @apply h-full;
    }

    .grid-template{ 
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    #convites-bg {
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .alert{
      @apply absolute flex items-start justify-start 2xl:mt-[-25vh] 2xl:ml-[77vw] xl:ml-[75vw] xl:mt-[-20vh]
        lg:ml-[68vw] lg:mt-[-15vh] md:ml-[60vw] md:mt-[-15vh]  z-[9999];
    }

    .listaConvidados{
        @apply w-full h-full 2xl:w-[100%] 2xl:h-[20%] xl:w-[60%] xl:h-[30%] lg:w-[50%] lg:h-[20%];
    }
    .divGeral{
        @apply w-full flex justify-center p-5 flex-col;
    }

    @media(min-width: 2560px){
        .divGeral{
        @apply w-[55vw];
        }
        .imagem{
            @apply h-[6vh] w-[3vw];
        }

    }

    @media(min-width: 1024px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[40vw];
        }

    }

    @media (max-width: 1024px) {
        .imagem{
            @apply lg:h-[5vh] lg:w-[5vw] md:h-[4vh] md:w-[4vh];
        }
    }

    @media(min-width: 768px){
        .divGeral{
            @apply md:w-[55VW];
        }
        .listaConvidados{
            @apply w-[40vw];
        }
        .botao{
            @apply md:mt-[5%];  
        }
    }

    @media(min-width: 1280px){
        .divGeral{
            @apply w-[25VW];
        }
        .listaConvidados{
            @apply w-[20vw];
        }
    }

    @media(min-width: 1280px ) and ( max-width: 1440px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[35vw];           
        }
        .imagem{
            @apply h-[5vh] w-[4vw];
        }
    }

    @media(max-width: 320px) {
        .titulo{
            @apply text-4xl mb-2; 
        }
        .botao{
            @apply flex justify-end mt-10
        }
        .convidados-div {
            @apply h-full mt-10;
        }
        .imagem{
            @apply w-[60px] h-[60px]
        }
        
    }

    @media(max-width: 375px) {
        .titulo{
            @apply text-4xl mb-2; 
        }
        .botao{
            @apply flex justify-end mt-10
        }
        .convidados-div {
            @apply h-full mt-10;
        }
        .imagem{
            @apply w-[60px] h-[60px]
        }
        .alert{
            @apply mt-[-60vw] text-sm;
        }
    }

    @media(min-width: 425px) and (max-width: 620px){
        .titulo{
            @apply text-4xl mb-8; 
        }
        .botao{
            @apply flex justify-end mt-10
        }
        .convidados-div {
            @apply h-full mt-10;
        }
        .imagem{
            @apply w-[60px] h-[60px]
        }
        .alert{
            @apply mt-[-50vw]
        }
    }
    }
    </style>