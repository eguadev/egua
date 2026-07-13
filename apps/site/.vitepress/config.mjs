import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'pt-BR',
  title: 'Linguagem Égua',
  description: 'Programação em Português, Simples e Moderna',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  appearance: false,
  cleanUrls: true,

  themeConfig: {
    logo: '/egua.png',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Pesquisar',
                buttonAriaLabel: 'teste1',
              },
              modal: {
                displayDetails: 'Mostrar detalhes',
                resetButtonTitle: 'Apagar busca',
                backButtonTitle: 'teste3',
                noResultsText: 'Sem resultados para',
                footer: {
                  selectText: 'Selecionar',
                  selectKeyAriaLabel: 'teste4',
                  navigateText: 'Navegar',
                  navigateUpKeyAriaLabel: 'teste5',
                  navigateDownKeyAriaLabel: 'teste6',
                  closeText: 'Sair',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eguadev'}
    ],

    nav: [
      { text: 'Início', link: '/' },
      { text: 'Aprender', link: '/egua/' },
      { text: 'Programar', link: 'https://programar.egua.dev' },
    ],

    sidebar: [
      {
        text: 'Aprender Lógica',
        items: [
          { text: 'Introdução', link: '/logica/' },
          { text: 'Glossário', link: '/logica/glossario' }
        ]
      },
      {
        text: 'Aprender Linguagem Égua',
        items: [
          { text: 'Introdução', link: '/egua/' },
          { text: 'Variáveis', link: '/egua/variaveis' },
          { text: 'Tipos de Dados', link: '/egua/tipos-dados' },
          { text: 'Operadores', link: '/egua/operadores' },
          { text: 'Fluxo de Controle', link: '/egua/fluxo-controle' },
          { text: 'Funções', link: '/egua/funcao' },
          { text: 'Funções Integradas', link: '/egua/funcoes-integradas' },
          { text: 'Bibliotecas', link: '/egua/bibliotecas' },
          { text: 'Classes', link: '/egua/classes' }
        ]
      }
    ],

    outline: {
      label: 'Nesta página'
    },

    returnToTopLabel: 'Voltar ao Topo',

    docFooter: {
      prev: 'Página Anterior',
      next: 'Próxima Página'
    },

    footer: {
      message: 'Feito com Açaí em Belém do Pará',
      copyright: `Direitos reservados © 2020-${new Date().getFullYear()}`
    },

    notFound: {
      title: 'PÁGINA NÃO ENCONTRADA',
      quote:
        'A página que você está procurando não existe ou foi removida.',
      linkLabel: 'ir para a página inicial',
      linkText: 'Voltar ao início'
    }
  }
})
