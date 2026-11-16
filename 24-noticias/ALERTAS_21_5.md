# 24 NOTÍCIAS™ LIVE 21.5 — Alertas locais

O painel `monitor.html` permite ativar **alertas locais opcionais** com o botão «Ativar alertas locais». Se o navegador autorizar notificações, pode mostrar avisos do sistema. Caso contrário, apresenta sempre o estado no próprio painel.

## Funcionamento
- A cada 60 segundos, enquanto o monitor estiver aberto e visível, verifica quatro ficheiros públicos: `index.html`, `feed.json`, `intervalo.html` e `products.json`.
- Depois de **duas verificações consecutivas** com pelo menos uma falha, abre um incidente e avisa uma única vez.
- Quando todos os ficheiros voltarem a responder, assinala **RECUPERADO** e pode enviar uma notificação.
- O botão «Desativar alertas» desliga o mecanismo e limpa o estado do incidente.
- Não há envio de emails, SMS, WhatsApp, dados externos ou criação de contas.

## Recuperação segura
Este monitor **não reinicia o OBS nem recarrega automaticamente a emissão**, porque isso poderia interromper a transmissão ou reiniciar o relógio dos intervalos. Quando houver uma falha, verificar a ligação e a fonte do OBS antes de qualquer intervenção.

## Limites
- Não funciona com o navegador fechado, o separador suspenso ou o Windows em suspensão.
- Não mede se o OBS está a transmitir, nem substitui monitorização externa 24/7.
- Notificações dependem de permissões do navegador e do sistema operativo.
- Uma resposta HTTP válida não comprova que as notícias estejam corretas ou atuais.
- Sem alterações ao grafismo da emissão ou à LISBON ALIVE™; sem Netlify e sem despesas.

## Verificação manual
Abrir `https://ideavaulthq-del.github.io/lisbon-alive-tv/24-noticias/monitor.html`, ativar alertas e usar «Verificar agora». Para simular falhas de forma segura, fazer testes numa cópia local, não remover ficheiros públicos de produção.
