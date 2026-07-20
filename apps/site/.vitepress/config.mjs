import { defineConfig } from 'vitepress'

const siteUrl = 'https://egua.dev'

// Converte o relativePath do VitePress (ex: "egua/variaveis.md") na URL
// limpa final (ex: "/egua/variaveis"), respeitando cleanUrls e páginas index.
function toCleanPath(relativePath) {
  let path = relativePath.replace(/\.md$/, '')
  if (path === 'index') return '/'
  if (path.endsWith('/index')) return `/${path.slice(0, -'index'.length)}`
  return `/${path}`
}

export default defineConfig({
  lang: 'pt-BR',
  title: 'Linguagem Égua',
  description: 'Programação em Português, Simples e Moderna',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'Linguagem Égua',
          alternateName: 'Égua',
          url: `${siteUrl}/`,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/egua.png` },
          sameAs: ['https://github.com/eguadev', 'https://github.com/eguadev/egua']
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: 'Linguagem Égua',
          description: 'Programação em Português, Simples e Moderna',
          inLanguage: 'pt-BR',
          publisher: { '@id': `${siteUrl}/#organization` }
        }
      ]
    })]
  ],
  appearance: false,
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: siteUrl
  },

  transformHead({ pageData }) {
    const path = toCleanPath(pageData.relativePath)
    const url = `${siteUrl}${path}`
    const title = pageData.title
      ? `${pageData.title} | Linguagem Égua`
      : 'Linguagem Égua'
    const description = pageData.frontmatter.description || pageData.description

    const head = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Linguagem Égua' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: `${siteUrl}/egua.png` }],
      ['meta', { property: 'og:locale', content: 'pt_BR' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: `${siteUrl}/egua.png` }]
    ]

    const isEguaDoc = path.startsWith('/egua/') && path !== '/egua/'
    const isLogicaDoc = path.startsWith('/logica/') && path !== '/logica/'
    if (isEguaDoc || isLogicaDoc) {
      const section = isEguaDoc
        ? { name: 'Linguagem Égua', path: '/egua/' }
        : { name: 'Lógica de Programação', path: '/logica/' }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: section.name, item: `${siteUrl}${section.path}` },
          { '@type': 'ListItem', position: 3, name: pageData.title, item: url }
        ]
      })])
    }

    return head
  },

  themeConfig: {
    logo: { src: '/egua.png', alt: 'Linguagem Égua' },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Pesquisar',
                buttonAriaLabel: 'Pesquisar',
              },
              modal: {
                displayDetails: 'Mostrar detalhes',
                resetButtonTitle: 'Apagar busca',
                backButtonTitle: 'Voltar',
                noResultsText: 'Sem resultados para',
                footer: {
                  selectText: 'Selecionar',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'Navegar',
                  navigateUpKeyAriaLabel: 'Seta para cima',
                  navigateDownKeyAriaLabel: 'Seta para baixo',
                  closeText: 'Sair',
                  closeKeyAriaLabel: 'Esc'
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
      { text: 'Lógica', link: '/logica/' },
      { text: 'Aprender', link: '/egua/' },
      { text: 'Programar', link: 'https://programar.egua.dev' },
      { text: 'Sobre', link: '/sobre' },
    ],

    editLink: {
      pattern: 'https://github.com/eguadev/egua/edit/main/apps/site/:path',
      text: 'Editar esta página no GitHub'
    },

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
