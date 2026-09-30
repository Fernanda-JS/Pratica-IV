// STORAGE: tudo que usa localStorage fica aqui.
const CHAVE_CONTATOS = 'conecta-ong:contatos';
const CHAVE_RASCUNHO = 'conecta-ong:rascunho';

function ler(chave, padrao) {
    try {
        return JSON.parse(localStorage.getItem(chave)) ?? padrao;
    } catch {
        return padrao;
    }
}

function gravar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
        // localStorage indisponível (modo privado, cota cheia): segue sem salvar.
    }
}

export function salvarContato(contato) {
    const lista = ler(CHAVE_CONTATOS, []);
    lista.push({ ...contato, data: new Date().toISOString() });
    gravar(CHAVE_CONTATOS, lista);
    return lista.length;
}

export const lerRascunho = () => ler(CHAVE_RASCUNHO, {});
export const salvarRascunho = (dados) => gravar(CHAVE_RASCUNHO, dados);
export const limparRascunho = () => localStorage.removeItem(CHAVE_RASCUNHO);
