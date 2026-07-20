<script setup></script>

<template>
  <div class="home-intro">
    <div class="container">
      <div class="intro-text">
        <h2 class="heading">O que é a linguagem Égua?</h2>
        <p>
          <strong>Égua</strong> é uma linguagem de programação livre, de código aberto e totalmente em português — palavras-chave, mensagens de erro e documentação, sem depender de termos em inglês. Foi criada para ensinar lógica de programação e os primeiros passos da programação a estudantes e iniciantes no Brasil.
        </p>
        <p>
          Ela roda direto no navegador, então não é preciso instalar nada: abra o
          <a href="https://programar.egua.dev" target="_blank" rel="noreferrer">Programar</a>
          e comece a escrever código na linguagem Égua imediatamente.
        </p>
      </div>

      <div class="paths">
        <a class="path-card" href="/logica/">
          <div class="icon">🌱</div>
          <h3 class="title">Nunca programou?</h3>
          <p class="details">Comece pela introdução à lógica de programação — os conceitos por trás de qualquer linguagem.</p>
          <p class="link-text">Introdução à Lógica de Programação <span class="arrow">→</span></p>
        </a>
        <a class="path-card" href="/egua/">
          <div class="icon">⚡</div>
          <h3 class="title">Já conhece o básico?</h3>
          <p class="details">Vá direto para a introdução à linguagem Égua e escreva seu primeiro programa.</p>
          <p class="link-text">Introdução à Linguagem Égua <span class="arrow">→</span></p>
        </a>
      </div>

      <p class="footnote">
        O projeto é mantido pela comunidade <strong>eguadev</strong> e todo o código-fonte está disponível no
        <a href="https://github.com/eguadev/egua" target="_blank" rel="noreferrer">GitHub</a>
        sob licença MIT. Saiba mais em <a href="/sobre">Sobre a linguagem Égua</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-intro {
  position: relative;
  padding: 64px 24px 0;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 32px;
}

@media (min-width: 640px) {
  .home-intro {
    padding: 64px 48px 0;
  }
}

@media (min-width: 960px) {
  .home-intro {
    padding: 80px 64px 0;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.intro-text {
  max-width: 640px;
}

.heading {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02px;
  line-height: 32px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.intro-text p {
  font-size: 15px;
  line-height: 26px;
  color: var(--vp-c-text-2);
  margin-top: 12px;
}

.intro-text a {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.intro-text a:hover {
  text-decoration: underline;
}

.paths {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 40px;
}

.path-card {
  display: block;
  flex: 1 1 260px;
  padding: 24px;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.path-card:hover {
  border-color: var(--vp-c-brand-1);
}

.path-card .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  font-size: 20px;
}

.path-card .title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.path-card .details {
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.path-card .link-text {
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.path-card .arrow {
  margin-left: 6px;
  transition: transform 0.25s;
}

.path-card:hover .arrow {
  transform: translateX(4px);
}

.footnote {
  margin-top: 40px;
  padding-top: 24px;
  padding-bottom: 48px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  line-height: 22px;
  color: var(--vp-c-text-3);
  text-align: center;
}

.footnote a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.footnote a:hover {
  text-decoration: underline;
}
</style>
