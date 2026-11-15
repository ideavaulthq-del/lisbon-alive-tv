# 24 NOTÍCIAS™ LIVE 21.3 — Monitor técnico

Abrir o painel: `https://ideavaulthq-del.github.io/lisbon-alive-tv/24-noticias/monitor.html`.

## O que verifica
- `index.html`: resposta HTTP e presença do controlador de intervalos.
- `feed.json`: resposta HTTP, JSON válido e contagem de entradas na estrutura `news`.
- `intervalo.html`: resposta HTTP e presença do sinal de regresso.
- `products.json`: resposta HTTP, JSON válido e contagem de produtos.

O painel consulta os ficheiros a cada 60 segundos **enquanto estiver aberto e visível**, mantém até 20 verificações em memória e permite copiar o último diagnóstico. Um feed vazio pode ser tecnicamente acessível; não significa que haja notícias para mostrar.

## Limites importantes
- O monitor **não** tem acesso ao OBS, não mede FPS, não deteta se a transmissão está em direto, nem garante funcionamento 24/7.
- Não envia notificações nem executa verificações com a página fechada.
- Uma falha num ficheiro pode ser temporária ou estar relacionada com a ligação do próprio operador.
- Não são necessárias chaves, contas, serviços externos ou custos.
- O HTML/CSS da emissão e a LISBON ALIVE™ permanecem inalterados. Não houve operações Netlify.

## Próximo passo no OBS
Abrir a emissão normalmente no OBS e o monitor numa janela separada. Se houver falha, copiar o diagnóstico e comparar com a imagem no OBS. Para monitorização externa real ou alertas persistentes será necessária uma solução de execução contínua, sujeita a aprovação separada.
