// ROUTER: navegação de página única (SPA) usando o hash da URL.
// Exemplos: #/  #/sobre  #/projetos  #/projetos/educacao  #/contato
import { paginas, templateNaoEncontrada } from './templates.js';

export function iniciarRouter({ container, aoRenderizar }) {
    function navegar() {
        const partes = (location.hash.replace(/^#/, '') || '/').split('/');
        const caminho = '/' + (partes[1] || '');
        const ancora = partes[2];

        const pagina = paginas[caminho];
        container.innerHTML = (pagina ? pagina.template : templateNaoEncontrada)();
        document.title = `${pagina ? pagina.titulo : 'Não encontrada'} | Conecta ONG`;

        marcarMenuAtivo(caminho);

        // Rola até o projeto pedido (#/projetos/educacao) ou volta ao topo.
        const alvo = ancora && document.getElementById(`projeto-${ancora}`);
        if (alvo) {
            alvo.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
        container.focus({ preventScroll: true });

        aoRenderizar?.(caminho);
    }

    window.addEventListener('hashchange', navegar);
    navegar();
}

function marcarMenuAtivo(caminho) {
    document.querySelectorAll('[data-rota]').forEach((link) => {
        if (link.dataset.rota === caminho) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}
