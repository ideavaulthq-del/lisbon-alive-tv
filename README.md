# LISBON ALIVE™ | WORLD EDITION 8.1 · GitHub Edition

Esta versão acrescenta ao repositório a grelha pública partilhável (`schedule.json`). Mantém o MASTER CONTROL, a página de espectadores, o SEXTA EM ALERTA™ e as definições existentes.

## Ficheiros

- `index.html`: painel editorial e modo de exibição `?broadcast=1`.
- `viewer.html`: página pública do canal com a exibição incorporada.
- `schedule.json`: programação pública com 48 blocos de 30 minutos, calculados pelo fuso `Europe/Lisbon`.
- `sexta-em-alerta.html`: simulador educativo.
- `netlify.toml` e `_headers`: configuração de publicação estática.

## Publicação

1. Integre o pull request no ramo `main` após revisão e testes.
2. No Netlify, importe o repositório GitHub `ideavaulthq-del/lisbon-alive-tv`. O diretório de publicação é a raiz `.` e não requer comando de build.
3. Confirme o endereço de produção fornecido pelo Netlify. O endereço público do canal é `/viewer.html`.
4. No painel `/index.html`, edite os blocos horários, prima **Exportar schedule.json para publicar**, e coloque o ficheiro gerado na raiz do repositório, através de um commit; o Netlify precisa de efetuar novo deploy.
5. O visualizador consulta `schedule.json` no carregamento e de 60 em 60 segundos enquanto estiver aberto. A atualização só acontece depois de novo deploy estar disponível.

## Segurança e limitações

- **Não existe autenticação editorial.** `index.html` é uma página pública e alterações feitas nessa página ficam apenas no navegador. A publicação efetiva requer acesso de escrita ao GitHub/Netlify. Não inclua chaves ou tokens no código do cliente.
- Não se trata de vídeo em direto, HLS/RTMP ou notícias geradas/verificadas em tempo real. São conteúdos de demonstração visualizados segundo um relógio; não anuncie como notícias em direto.
- O navegador e o relógio do espectador têm de funcionar corretamente; relógios errados afetam a programação.
- O SEXTA EM ALERTA™ entra às sextas-feiras, das 21h30 às 22h00, hora de Lisboa, como simulação claramente fictícia. Pode ser necessário abrir o simulador separadamente para tomar decisões.
- A edição dos textos de programas em `localStorage` não é partilhada. `schedule.json` partilha apenas os índices dos programas e não altera os textos editoriais.
- Os cabeçalhos de segurança existentes são preservados; qualquer incorporação de fontes externas exigirá revisão adicional.

## Versão 9.5

Removidos os módulos COMANDANTE ERNESTO™, CYBER ALERT PORTUGAL™ e COMBUSTÍVEIS. A grelha `schedule.json`, o visual original e os restantes programas permanecem inalterados.
