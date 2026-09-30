# Conecta ONG

Site de uma organização não governamental fictícia, criado para divulgar projetos sociais e captar voluntários. É uma **Single Page Application (SPA)** feita com HTML5, CSS3 e JavaScript puro (Vanilla JS), sem frameworks nem bibliotecas externas. Projeto acadêmico.

## Funcionalidades

- **Navegação sem recarregar a página:** o conteúdo do `<main>` é trocado por JavaScript conforme a rota.
- **Templates dinâmicos:** cards, projetos e campos do formulário são gerados a partir de dados em JavaScript.
- **Menu com dropdown:** o item "Projetos" abre um submenu com mouse (`:hover`) e com teclado (`:focus-within`).
- **Formulário de contato com validação:** feedback visual de erro e sucesso, em tempo real e no envio.
- **Persistência com `localStorage`:** rascunho do formulário e histórico de mensagens enviadas.
- **Layout responsivo:** adapta-se de celulares a telas grandes.

## Como executar

Não precisa de instalação nem de servidor. Abra o arquivo `html/index.html` no navegador (duplo clique ou pela IDE).

## Estrutura de pastas

```
conecta-ong/
├── html/
│   └── index.html            Página única (cabeçalho, <main id="app"> e rodapé)
├── css/
│   └── style.css             Estilos, variáveis e regras responsivas
├── js/
│   ├── main.js               Ponto de entrada: liga rotas e formulário
│   └── modules/
│       ├── dados.js          Conteúdo: pilares, projetos e campos do formulário
│       ├── storage.js        Acesso ao localStorage
│       ├── templates.js      Funções que geram o HTML e tabela de páginas
│       ├── router.js         Navegação por hash e renderização
│       └── formulario.js     Validação, feedback visual e envio
└── imagens/                  Reservada para imagens (ainda vazia)
```

## Páginas (rotas)

| Rota | Conteúdo |
|---|---|
| `#/` | Início: apresentação e chamada para voluntariado |
| `#/sobre` | Missão da ONG em três cards |
| `#/projetos` | Três projetos: Educação, Meio ambiente e Comunidade |
| `#/projetos/educacao`, `#/projetos/ambiente`, `#/projetos/comunidade` | Página de projetos, rolando até o projeto escolhido |
| `#/contato` | Formulário de contato |
| Qualquer outra | Página "não encontrada" (404) |

## Como funciona

### Navegação (SPA)

O `router.js` escuta o evento `hashchange`. Quando o endereço muda (por exemplo, de `#/` para `#/sobre`), ele lê a rota, busca o template correspondente e escreve o HTML em `<main id="app">`. Também atualiza o título da aba, marca o item ativo do menu (`aria-current="page"`) e leva o foco ao conteúdo principal. Como usa o hash da URL, os botões Voltar e Avançar do navegador funcionam sem configuração.

### Templates

As funções de `templates.js` recebem objetos de `dados.js` e devolvem HTML com Template Literals. As listas são geradas com `map()` e `join('')`, então adicionar um projeto exige apenas incluir um objeto em `dados.js`.

### Formulário de contato

| Campo | Regra |
|---|---|
| Nome | Mínimo de 3 caracteres |
| E-mail | Formato válido, verificado por expressão regular |
| Mensagem | Mínimo de 10 caracteres |

- A validação ocorre ao sair do campo (`blur`), enquanto se digita depois do primeiro teste (`input`) e ao enviar (`submit`, com `preventDefault()`).
- O estado de cada campo fica no atributo `data-estado` (`erro` ou `sucesso`), que o CSS transforma em cores. A mensagem de apoio é escrita no campo com `textContent`.
- Se houver erro no envio, o foco vai para o primeiro campo inválido.

### Armazenamento local

| Chave | Conteúdo |
|---|---|
| `conecta-ong:rascunho` | Texto digitado e ainda não enviado; restaurado ao voltar ao formulário |
| `conecta-ong:contatos` | Lista das mensagens enviadas (nome, e-mail, mensagem e data) |

Os dados são convertidos com `JSON.stringify` ao gravar e com `JSON.parse` ao ler. As mensagens ficam apenas no navegador de quem enviou; a aplicação não tem servidor.

### Organização do código

Os arquivos JavaScript são scripts comuns carregados em ordem no `index.html`, o que permite abrir o projeto direto do arquivo. Cada um fica dentro de uma função autoexecutável e publica só o necessário no objeto `Conecta` (por exemplo, `Conecta.router`). A ordem de carregamento é: `dados`, `storage`, `templates`, `router`, `formulario` e `main`.

## Design system

As decisões visuais ficam em variáveis CSS no `:root`, em cinco grupos:

- **Cores:** azul da marca em três tons (`--cor-primaria`, `-escura`, `-clara`), neutros (`--cor-branco`, `--cor-fundo`, `--cor-cinza`, `--cor-texto`) e amarelo de destaque.
- **Feedback do formulário:** verde (`--cor-sucesso`) e vermelho (`--cor-erro`), cada um com versão clara para fundos.
- **Tipografia:** cinco tamanhos, de `--fonte-xs` a `--fonte-xl`.
- **Espaçamentos:** escala de `--espaco-1` a `--espaco-7`.
- **Layout:** `--raio` (bordas) e `--largura-maxima` (container).

## Responsividade

| Largura da tela | Cards e projetos | Observações |
|---|---|---|
| Até 600px | 1 coluna | Cabeçalho e menu empilhados; dropdown oculto; botões do início empilhados |
| 601px a 1024px | 2 colunas | Cabeçalho em linha; faixa de voluntariado empilhada até 768px |
| Acima de 1025px | 3 colunas | Container de até 1200px (1400px acima de 1441px) |

O CSS detalha cada faixa em comentários acima das regras `@media`.

## Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) e `lang="pt-BR"`.
- Menu com item da página atual indicado por `aria-current`.
- Dropdown acessível por teclado.
- Campos com `label`, `aria-invalid` e mensagens anunciadas por `aria-live`.
- Foco visível em links, botões e campos.

## Limitações

- Não há servidor: as mensagens enviadas ficam só no `localStorage` do navegador.
- O menu não tem botão hambúrguer; em telas pequenas os itens são empilhados e o dropdown fica oculto.
- A pasta `imagens/` ainda não tem arquivos.