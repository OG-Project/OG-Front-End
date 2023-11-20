import {defineStore} from "pinia";


export const useCounterStore = defineStore('fechaPopUP', {
    state: () => {
      return { variavelModal: true }
    },

    actions: {
        abrePopUp(){
            this.variavelModal=true;
        return this.variavelModal;
      },
      fechaPopUp(){
        this.variavelModal=false;
        return this.variavelModal;
      }
    },
  })