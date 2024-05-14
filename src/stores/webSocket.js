import { th } from "date-fns/locale";
import { defineStore } from "pinia";

export const webSocketStore = defineStore('webSocket', {
    state: () => {
        return {
            url: '',
            socket: {},
            ui: Function,
            teste: ''
        }
    },
    actions: {

        criaConexaoWebSocket() {
            this.socket = new WebSocket(this.url)
            this.socket.onopen = function (event) {
                console.log("Conexão aberta");
            }
        },

        enviaMensagemWebSocket(mensagem) {
            console.log("Bateu no enviaMensagemWebSocket");
            this.socket.send(mensagem);
        },

        esperaMensagem(retorno) {
            console.log(retorno)
            this.socket.onmessage = function (event) {
                retorno(event.data);
            }

        }
    }


});
