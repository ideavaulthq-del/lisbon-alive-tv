# 24 NOTÍCIAS™ LIVE 21.1 — Ensaio visual no OBS Studio

## Estado

**Procedimento de ensaio publicado; execução visual no OBS ainda não realizada.** Este repositório não controla o OBS do operador. Não declarar o ensaio aprovado sem observação real do vídeo e do áudio.

## Preparação no Windows 11 / OBS

1. No OBS Studio, criar uma cena de teste denominada **24N — ENSAIO**. Não substituir a cena de emissão sem validar.
2. Adicionar uma **Fonte do navegador** com **1920 × 1080**.
3. Utilizar o endereço HTTPS **efetivamente publicado** de `24-noticias/index.html` (por exemplo, o URL da instalação do próprio operador). O endereço do ficheiro no GitHub não é uma página de emissão. Se utilizar GitHub Pages, confirmar primeiro que o Pages está ativo e que o URL abre no navegador.
4. Confirmar que o navegador do OBS permite carregar `feed.json`, `products.json` e `intervalo.html` a partir da mesma origem. Não usar um URL `file://` para este ensaio de integração.
5. Manter **1920 × 1080** no OBS e observar se a emissão ocupa o ecrã sem barras indesejadas ou recortes.

## Teste rápido do intervalo

1. Duplicar a fonte de navegador para uma segunda cena de teste, se necessário, e acrescentar `?intervalo=agora` ao URL da emissão. Esta opção inicia o intervalo após cerca de **1,2 segundos**.
2. Confirmar que o intervalo ocupa o ecrã inteiro, preservando a identidade visual vermelha/preta/branca.
3. Confirmar o identificador **PUBLICIDADE** e, com catálogo vazio, a mensagem **DEMONSTRAÇÃO VISUAL • SEM OFERTA COMERCIAL**. Não devem surgir preços reais inventados.
4. Observar o bumper inicial, a rotação aproximada de **8 segundos** entre produtos de demonstração, o contador e o bumper final.
5. Aguardar cerca de **2 minutos** e confirmar o regresso às notícias. Verificar que não fica um iframe opaco sobre a emissão.

## Teste da emissão contínua

1. Voltar à cena normal sem `?intervalo=agora`.
2. Confirmar notícias e rodapé a funcionar durante **15 minutos**.
3. Confirmar que o intervalo automático começa e termina após cerca de **2 minutos**, seguido de notícias.
4. Repetir pelo menos mais um ciclo para verificar estabilidade.
5. Observar legibilidade dos títulos longos, ausência de cintilação nas transições, consumo de CPU/GPU e comportamento ao perder ligação à rede.

## Comandos do operador

- **I**: iniciar intervalo imediatamente, se a página da fonte de navegador tiver foco de teclado.
- **Escape**: terminar o intervalo, também dependente do foco.
- **`?intervalo=agora`**: ensaio de arranque rápido, sem exigir foco de teclado.
- **Consola da página**: `window.N24AutoBreak.start()`, `window.N24AutoBreak.finish()`, `window.N24AutoBreak.active` (apenas quando o operador dispõe de acesso à consola desse contexto).

**Nota:** as teclas I e Escape não são atalhos globais do OBS. Uma fonte de navegador normalmente não recebe as teclas enquanto o operador trabalha noutras janelas. Não depender delas para controlo de produção sem um mecanismo próprio de hotkeys do OBS.

## Critérios de aceitação

- [ ] Notícias legíveis e sem alterações visuais face à versão anterior
- [ ] Intervalo entra em ecrã inteiro sem saltos ou barras
- [ ] Aviso PUBLICIDADE sempre visível durante a publicidade
- [ ] Catálogo vazio mostra apenas demonstração identificada
- [ ] Transição de saída devolve a emissão às notícias
- [ ] Novo ciclo começa depois do período normal
- [ ] Sem erros críticos na consola do navegador do OBS
- [ ] Testado em resolução 1920 × 1080 e com ligação de rede real
- [ ] Registado resultado e data do ensaio pelo operador

## Segurança editorial

O catálogo `24-noticias/products.json` permanece vazio até existirem produtos aprovados e direitos comerciais verificados. Não introduzir tokens de afiliados no código estático.

## Limites desta missão

Foram publicados apenas instruções e critérios de aceitação. **Não houve acesso remoto ao OBS, captura de vídeo, execução visual nem confirmação de funcionamento em produção.** Não houve operações Netlify e não foram alterados HTML/CSS da emissão ou ficheiros da LISBON ALIVE™.
