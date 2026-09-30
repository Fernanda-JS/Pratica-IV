// TEMPLATES: funções que recebem dados e devolvem HTML.
// Componentes pequenos (card, projeto, campo) são reaproveitados nas páginas.
import { pilares, projetos, camposContato } from './dados.js';

/* ---------- Componentes reutilizáveis ---------- */
const templateCard = ({ icone, titulo, descricao }) => `
    <article class="card">
        <div class="icone" aria-hidden="true">${icone}</div>
        <h3>${titulo}</h3>
        <p>${descricao}</p>
    </article>`;

const templateProjeto = ({ id, classe, rotulo, titulo, descricao }) => `
    <article class="projeto" id="projeto-${id}">
        <div class="projeto-imagem ${classe}">${rotulo}</div>
        <div class="projeto-conteudo">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <a href="#/contato" class="link">Quero ajudar →</a>
        </div>
    </article>`;

const templateTituloSecao = (tag, titulo, texto) => `
    <div class="titulo-secao">
        <span class="tag">${tag}</span>
        <h2>${titulo}</h2>
        <p>${texto}</p>
    </div>`;

const templateCampo = ({ id, rotulo, tipo, placeholder }) => {
    const controle = tipo === 'textarea'
        ? `<textarea id="${id}" name="${id}" rows="5" placeholder="${placeholder}" required aria-describedby="${id}-msg"></textarea>`
        : `<input type="${tipo}" id="${id}" name="${id}" placeholder="${placeholder}" required aria-describedby="${id}-msg">`;

    return `
        <div class="campo">
            <label for="${id}">${rotulo}</label>
            ${controle}
            <span class="campo-mensagem" id="${id}-msg" aria-live="polite"></span>
        </div>`;
};

/* ---------- Páginas ---------- */
const templateInicio = () => `
    <section class="hero">
        <div class="container hero-conteudo">
            <div class="hero-texto">
                <span class="tag">Organização do terceiro setor</span>
                <h1>Juntos podemos transformar vidas</h1>
                <p>Conectamos pessoas, projetos e organizações para construir uma sociedade mais justa, solidária e sustentável.</p>
                <div class="hero-botoes">
                    <a href="#/projetos" class="botao botao-principal">Conheça nossos projetos</a>
                    <a href="#/contato" class="botao botao-secundario">Seja voluntário</a>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container cta-conteudo">
            <div>
                <span class="tag tag-clara">Faça a diferença</span>
                <h2>Quer fazer parte dessa transformação?</h2>
                <p>Seu tempo e seus conhecimentos podem ajudar a transformar a realidade de muitas pessoas.</p>
            </div>
            <a href="#/contato" class="botao botao-claro">Quero ser voluntário</a>
        </div>
    </section>`;

const templateSobre = () => `
    <section class="secao">
        <div class="container">
            ${templateTituloSecao('Quem somos', 'Nossa missão', 'A Conecta ONG trabalha para aproximar pessoas interessadas em contribuir com iniciativas sociais.')}
            <div class="cards">${pilares.map(templateCard).join('')}</div>
        </div>
    </section>`;

const templateProjetos = () => `
    <section class="secao secao-destaque">
        <div class="container">
            ${templateTituloSecao('Nossos projetos', 'Faça parte da transformação', 'Conheça algumas das iniciativas realizadas pela nossa organização.')}
            <div class="projetos">${projetos.map(templateProjeto).join('')}</div>
        </div>
    </section>`;

const templateContato = () => `
    <section class="secao">
        <div class="container contato">
            ${templateTituloSecao('Contato', 'Entre em contato', 'Quer conhecer melhor nosso trabalho? Envie uma mensagem.')}
            <form class="formulario" id="form-contato" novalidate>
                ${camposContato.map(templateCampo).join('')}
                <button type="submit" class="botao botao-principal">Enviar mensagem</button>
                <p class="aviso-sucesso" id="aviso-envio" role="status" hidden></p>
            </form>
        </div>
    </section>`;

export const templateNaoEncontrada = () => `
    <section class="secao">
        <div class="container">
            ${templateTituloSecao('Erro 404', 'Página não encontrada', 'O endereço acessado não existe. Volte para a página inicial.')}
            <a href="#/" class="botao botao-principal">Voltar ao início</a>
        </div>
    </section>`;

/* ---------- Tabela de rotas: caminho -> título + template ---------- */
export const paginas = {
    '/': { titulo: 'Início', template: templateInicio },
    '/sobre': { titulo: 'Sobre', template: templateSobre },
    '/projetos': { titulo: 'Projetos', template: templateProjetos },
    '/contato': { titulo: 'Contato', template: templateContato }
};
