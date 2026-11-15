# 24 NOTÍCIAS™ LIVE 21.2 — Plano de estabilidade 24/7

## Estado real
Os testes automatizados cobrem o ciclo 15 minutos de notícias / 2 minutos de intervalo e três repetições simuladas, incluindo cancelamento de temporizadores antigos. **Isto não equivale a uma transmissão contínua validada durante 24 horas.** As capturas fornecidas pelo operador comprovam uma passagem completa pelo intervalo e regresso às notícias no OBS 33.0.1.

## Configuração recomendada no OBS 33.0.1
- Cena principal: **24 NOTÍCIAS™**; fonte de navegador com o URL público `https://ideavaulthq-del.github.io/lisbon-alive-tv/24-noticias/index.html`.
- Fonte do navegador: **1920 × 1080**. Não adicionar `?intervalo=agora` à cena de produção, porque inicia um intervalo a cada carregamento.
- Se a fonte for usada numa única cena permanente, evitar a opção de **encerrar a fonte quando não estiver visível**, pois pode reiniciar o relógio dos intervalos quando a cena é ocultada.
- Evitar a opção **atualizar o navegador quando a cena se tornar ativa**, pois cada atualização reinicia o ciclo.
- Manter o computador ligado, com ligação de rede estável, e verificar definições de suspensão e reinício do Windows.
- Antes de transmitir, confirmar se áudio de outras fontes (por exemplo, Vídeo VLC) não se sobrepõe indevidamente à emissão.

## Ensaio de longa duração (a realizar pelo operador)
1. Fazer uma gravação local de pelo menos **60 minutos** para observar três ciclos aproximados.
2. Registar a hora de cada entrada e saída do intervalo, com tolerância para latência de carregamento.
3. Confirmar que o conteúdo noticioso continua após cada intervalo e que o contador nunca fica preso em 00:00.
4. Simular uma perda temporária de Internet e verificar recuperação dos conteúdos; **não** usar uma falha de rede real durante transmissão pública.
5. Observar CPU, memória, fotogramas perdidos e erros da fonte de navegador.
6. Fazer um ensaio de 24 horas apenas depois de os testes curtos passarem, com gravação/logs e supervisão.

## Limitações
- GitHub Pages é alojamento estático, não é servidor de transmissão nem garante operação ininterrupta.
- A atualização automática do feed depende de fontes externas e da ligação à Internet.
- Um navegador do OBS pode parar quando o Windows suspende, o OBS encerra ou a fonte é descarregada.
- Os testes de código não substituem um ensaio OBS com observação contínua.
- Não se alteraram a emissão visual, a LISBON ALIVE™ ou serviços Netlify.

## Critérios de aprovação
- [ ] Três ciclos reais observados e registados
- [ ] Sem bloqueios ou sobreposição do intervalo
- [ ] Notícias recuperadas após cada intervalo
- [ ] Sem perda de fotogramas relevante ou erros persistentes
- [ ] Configuração de energia do Windows verificada
- [ ] Ensaio de 24 horas documentado antes de anunciar funcionamento 24/7
