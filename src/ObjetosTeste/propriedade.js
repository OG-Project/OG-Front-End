import { ref } from "vue"

export const propriedades = ref(
    [

        {
            id: 1,
            nome: "Nome",
            valor: "Lavar Junin",
            tipo: "STRING"
        },

        {
            id: 2,
            nome: "Status",
            valor: "Concluído",
            tipo: "STATUS"
        },
        {
            id: 3,
            nome: "Data de Entrega",
            valor: "10-11-2023",
            tipo: "DATE"
        },
        {
            id: 4,
            nome: "Data de Termino",
            valor: "01-12-2023",
            tipo: "DATE"
        },
    ]
);