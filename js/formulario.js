// FORMULÁRIO: validação com feedback, rascunho automático e envio.
import { salvarContato, lerRascunho, salvarRascunho, limparRascunho } from './storage.js';

// Cada regra devolve true (válido) ou a mensagem de erro.
const regras = {
    nome: (v) => v.trim().length >= 3 || 'Informe seu nome (mínimo de 3 letras).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Informe um e-mail válido, como nome@exemplo.com.',
    mensagem: (v) => v.trim().length >= 10 || 'Escreva uma mensagem com pelo menos 10 caracteres.'
};

function validarCampo(campo) {
    const resultado = regras[campo.name](campo.value);
    const valido = resultado === true;
    const bloco = campo.closest('.campo');

    bloco.dataset.estado = valido ? 'sucesso' : 'erro';
    campo.setAttribute('aria-invalid', String(!valido));
    bloco.querySelector('.campo-mensagem').textContent = valido ? 'Campo preenchido corretamente.' : resultado;
    return valido;
}

function lerDados(form) {
    return Object.fromEntries(new FormData(form));
}

export function iniciarFormulario(form) {
    const campos = [...form.querySelectorAll('input, textarea')];
    const aviso = form.querySelector('#aviso-envio');

    // Restaura o que a pessoa tinha digitado e não enviou.
    const rascunho = lerRascunho();
    campos.forEach((campo) => { campo.value = rascunho[campo.name] ?? ''; });

    campos.forEach((campo) => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            aviso.hidden = true;
            if (campo.closest('.campo').dataset.estado) validarCampo(campo); // revalida ao corrigir
            salvarRascunho(lerDados(form));
        });
    });

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const resultados = campos.map(validarCampo); // valida todos para mostrar todos os erros
        if (resultados.includes(false)) {
            campos[resultados.indexOf(false)].focus();
            return;
        }

        const dados = lerDados(form);
        const total = salvarContato(dados);
        limparRascunho();
        form.reset();
        campos.forEach((campo) => {
            delete campo.closest('.campo').dataset.estado;
            campo.removeAttribute('aria-invalid');
            campo.closest('.campo').querySelector('.campo-mensagem').textContent = '';
        });

        aviso.textContent = `Obrigado, ${dados.nome.trim()}! Sua mensagem foi registrada (envio nº ${total} neste navegador).`;
        aviso.hidden = false;
    });
}
