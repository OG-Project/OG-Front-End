import { th } from "date-fns/locale";
import { defineStore } from "pinia";

export const webSocketStore = defineStore('webSocket', {
    state: () => {
        return {
            url: '',
            socket: {},
            ui:Function,
            teste:''
        }
    },
    actions: {

        criaConexaoWebSocket() {
            this.socket = new WebSocket(this.url)
        },

        enviaMensagemWebSocket(mensagem) {
            this.socket.send(mensagem);
        },

        esperaMensagem(retorno) {
            this.socket.onmessage = function (event) {
                console.log(event.data)
                retorno(event.data);
            }

        }
    }


});
