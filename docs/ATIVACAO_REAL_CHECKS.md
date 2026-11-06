# LISBON ALIVE™ | Ativação restante para TikTok LIVE

## 1. Diagnóstico das notícias
Depois de publicar esta ramificação num ambiente de pré-visualização Netlify, abrir:
`https://SEU-DOMINIO/.netlify/functions/health`
Resposta `status: ok`: as três fontes RSS devolveram pelo menos um título recente. `degraded`: uma ou mais fontes não devolveram dados; consultar o campo `checks`. Isto não confirma veracidade editorial.

## 2. Verificar o sinal de emissão
Abrir `https://SEU-DOMINIO/index.html?broadcast=1` em janela de navegador.
Confirmar visual 16:9 sem menus e horário de Lisboa.
Manter a fonte visível no TikTok LIVE Studio. Não iniciar duas transmissões concorrentes pelo OBS e TikTok.

## 3. Verificar programação
Aguardar uma passagem de meia hora (por exemplo 17:29 → 17:30) e confirmar a mudança de bloco.
O ficheiro `schedule.json` publicado é lido no modo de emissão a cada 60 segundos. Alterações no editor local não atualizam automaticamente o ficheiro publicado.

## 4. Verificar dados
- Carris Metropolitana: a contagem deve indicar hora de consulta e nunca ser apresentada como atrasos ou imagens em direto.
- Open-Meteo Air Quality: dados modelados; não são sensores locais em direto.
- Notícias: RSS agregado automaticamente, sem validação editorial independente.
- Outros programas: continuam com cenários 2.5D ilustrativos. Não os anunciar como imagens reais de câmaras.

## 5. Antes de carregar Iniciar LIVE
- Confirmar que a conta permite emitir horizontal 16:9.
- Confirmar que a imagem aparece na pré-visualização e não tem cortes.
- Verificar estabilidade, CPU, FPS e ligação à Internet.
- Rever direitos de imagens, textos e áudio.
- Confirmar microfone/câmara desligados.
- Som fica pendente por decisão do operador.
- Iniciar LIVE manualmente apenas depois do teste.

## Limites
Esta ramificação **não inicia** a LIVE, não muda o layout, não publica no ramo `main`, nem cria áudio fictício. O teste end-to-end depende do endereço Netlify publicado e do TikTok LIVE Studio no computador.
