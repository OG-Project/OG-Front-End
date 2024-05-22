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
            }
        },

        fechaConexaoWebSocket() {
            this.socket.close();
        },

        enviaMensagemWebSocket(mensagem) {
            let socket = new WebSocket(this.url)
            socket.onopen = function (event) {
                socket.send(mensagem);
            }
        },

        esperaMensagem(retorno) {
            this.criaConexaoWebSocket()
            console.log(retorno)
            this.socket.onmessage = (event) => {
                retorno(event.data);
            }
        }
    }


});
