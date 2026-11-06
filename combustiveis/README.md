# PORTUGAL COMBUSTÍVEIS™ 3.0 · LISBON ALIVE™

## Ficheiros
- `index.html`: painel interativo, simulação e gráfico histórico local.
- `tv.html`: emissão TV 16:9 sem menus, três ecrãs com rotação automática a cada 15 segundos, relógio de Lisboa.
- `app.js`: consulta experimental à API DGEG de um único posto, sincronização local entre separadores via BroadcastChannel e armazenamento de histórico local.
- `style.css`: grafismo.

## Executar
Abrir `index.html` e `tv.html` no mesmo navegador. Se o navegador limitar a API, servir a pasta com `python -m http.server 8000` e abrir `http://localhost:8000/`. A API DGEG pode bloquear CORS; neste caso não são apresentados preços como atuais. O acesso ao servidor local não resolve necessariamente o CORS. Para produção, é necessário backend/proxy autorizado e validação do formato da API.

## Limites
Os valores consultados são de um posto de referência, **não** preços médios nacionais. Não há previsões de preço sem fonte verificada. A ligação e a disponibilidade da API não foram verificadas ao vivo. O histórico é local ao navegador, e o relógio é em Europe/Lisbon. A sincronização BroadcastChannel só funciona entre páginas da mesma origem. A integração no LISBON ALIVE™ é feita por URL/iframe ou incorporando o módulo no projeto principal; não modifica o repositório externo.
