<template>
    <div></div>
</template>
<script setup>
import { inject } from 'vue'
import { conexaoBD } from '../stores/conexaoBD'
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { ref } from 'vue';
import VueCookies from "vue-cookies";
import { onBeforeMount } from 'vue';
import router from '../router';

let usuario=ref({})
    // us
onMounted(async ()=>{
    const tour = inject('tour')
    const banco = conexaoBD()
    const { t } = useI18n();
    console.log("aqio");
    usuario.value = await banco.buscarUm(
        JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')

    console.log(usuario.value);

    tour.addSteps([
        {
            id: 'step-1',
            title: t('tutorial.bemVindo'),
            text: t('tutorial.mostraAtividades'),
            attachTo: {
                element: '#step-1',
                on: 'top'
            },
            buttons: [
                {
                    classes: 'button',
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/home'
                        tour.next()
                        banco.atualizar(usuario.value, '/usuario')
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                }
            ]

        },
        {
            id: 'step-2',
            title: t('tutorial.dashboard'),
            text: t('tutorial.informacoes'),
            attachTo: {
                element: '#step-2',
                on: 'top'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/home'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-3',
            title: t('tutorial.menu'),
            text: t('tutorial.clique'),
            attachTo: {
                element: '#step-3',
                on: 'right-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/home'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-4',
            title: t('tutorial.partes'),
            text: t('tutorial.equipe'),
            attachTo: {
                element: '#step-4',
                on: 'right-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)

                        usuario.value.configuracao.rotaDoPasso = '/equipe'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-5',
            title: t('tutorial.crieEquipe'),
            text: t('tutorial.cliqueECrie'),
            attachTo: {
                element: '#step-5',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/equipe'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-6',
            text: t('tutorial.preencha'),
            attachTo: {
                element: '#step-6',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/equipe'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-7',
            text: t('tutorial.crieAEquipe'),
            attachTo: {
                element: '#step-7',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/equipe'
                        banco.atualizar(usuario.value, '/usuario')
                        // router.push
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-8',
            text: t('tutorial.entreEquipe'),
            attachTo: {
                element: '#step-8',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/equipe'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-9',
            text: t('tutorial.projetosEquipe'),
            attachTo: {
                element: '#step-9',
                on: 'center'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/equipe/telaInicial'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-10',
            text: t('tutorial.crieProjeto'),
            attachTo: {
                element: '#step-10',
                on: 'left'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/criaprojeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                        // router.push('/criaprojeto')
                        // window.location.reload()

                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-11',
            text: t('tutorial.preencha'),
            attachTo: {
                element: '#step-11',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/criaProjeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-12',
            text: t('tutorial.crieUmProjeto'),
            attachTo: {
                element: '#step-12',
                on: 'right'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/criaProjeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-13',
            text: t('tutorial.gerenciar'),
            attachTo: {
                element: '#step-13',
                on: 'center'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/projeto/lista'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-14',
            text: t('tutorial.crieTarefa'),
            attachTo: {
                element: '#step-14',
                on: 'left-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/projeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-15',
            text: t('tutorial.preenchaTarefa'),
            attachTo: {
                element: '#step-15',
                on: 'top-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/criaTarefa'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-16',
            text: t('tutorial.completar'),
            attachTo: {
                element: '#step-16',
                on: 'top-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/projeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-17',
            text: t('tutorial.formas'),
            attachTo: {
                element: '#step-17',
                on: 'top-end'
            },
            buttons: [
                {
                    text: t('tutorial.proximo'),
                    action: () => {
                        let splitId = tour.getCurrentStep().id.split('-')
                        splitId[1] = '' + (Number.parseInt(splitId[1]) + 1)
                        let proximoId = splitId.join('-')
                        usuario.value.configuracao.ultimoPassoId = (proximoId)
                        usuario.value.configuracao.rotaDoPasso = '/projeto'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.next()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.pular'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        },
        {
            id: 'step-18',
            text: t('tutorial.funcionalidades'),
            attachTo: {
                element: '#step-18',
                on: 'top-end'
            },
            buttons: [
                {
                    text: t('tutorial.finalizar'),
                    action: () => {
                        usuario.value.configuracao.isTutorial = false
                        usuario.value.configuracao.ultimoPassoId = 'step-1'
                        usuario.value.configuracao.rotaDoPasso = '/home'
                        banco.atualizar(usuario.value, '/usuario')
                        tour.complete()
                    }
                },
                {
                    secondary: true,
                    text: t('tutorial.voltar'),
                    action: tour.back
                }
            ]
        }
    ])
})

</script>
