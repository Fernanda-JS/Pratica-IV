// Ponto de entrada: liga as áreas da aplicação (rotas e formulário).
import { iniciarRouter } from './router.js';
import { iniciarFormulario } from './formulario.js';

iniciarRouter({
    container: document.getElementById('app'),
    // Depois de renderizar cada página, ativa os comportamentos que ela precisa.
    aoRenderizar(caminho) {
        if (caminho === '/contato') {
            iniciarFormulario(document.getElementById('form-contato'));
        }
    }
});
