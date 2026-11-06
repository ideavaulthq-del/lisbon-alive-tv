# LISBON ALIVE™ | TikTok LIVE horizontal 16:9

## Estado
Preparação da emissão para OBS Studio, sem alterar o HTML, CSS, a identidade visual ou a grelha do canal. A transmissão só começa quando o operador a inicia no TikTok LIVE Studio ou no OBS com acesso RTMP autorizado.

## URL da emissão
No alojamento HTTPS publicado (por exemplo, Netlify), abrir:
`https://SEU-DOMINIO/index.html?broadcast=1`

O parâmetro `broadcast=1` já existe no projeto: oculta o painel de edição e mantém a apresentação original em 16:9. **Não usar o endereço do GitHub nem `file://`**: as funções Netlify de notícias precisam do site publicado.

## Configuração OBS Studio
1. Criar cena `LISBON ALIVE | TikTok LIVE 16:9`.
2. Em Definições > Vídeo, definir **Base (Canvas) 1920 × 1080** e **Saída 1920 × 1080**, 30 FPS inicialmente.
3. Adicionar fonte **Navegador**. Colar a URL HTTPS com `?broadcast=1`, definir **1920 × 1080**, e posicionar em (0,0) sem cortes, filtros ou sobreposições.
4. **Desativar** a opção de encerrar a fonte quando não estiver visível; evitar atualizar o navegador ao trocar de cena. Manter a cena ativa durante a emissão.
5. Se a página produzir áudio próprio, marcar **Controlar áudio através do OBS** na fonte Navegador e confirmar no misturador. O projeto pode não ter áudio em todos os programas; não assumir que existe som contínuo.
6. Em Saída > Transmissão, usar H.264, CBR e fotogramas-chave de 2 s; ajustar bitrate às condições de rede e aos limites apresentados pelo TikTok.
7. Selecionar o método de emissão autorizado na conta TikTok: TikTok LIVE Studio (captura da janela/OBS) ou servidor/chave de transmissão quando o TikTok os disponibilizar. **Nunca colocar a chave RTMP no repositório.**
8. Fazer uma transmissão de teste antes de emitir publicamente. Confirmar se a conta aceita o formato horizontal e se a captura mantém 16:9.

## Verificações antes de cada LIVE
- Abrir a URL pública e confirmar que a imagem ocupa o enquadramento 16:9 e que não surgem menus.
- Confirmar a hora de Lisboa, o programa atual e a passagem automática entre blocos.
- Confirmar `/.netlify/functions/news?group=portugal` com JSON válido. Em falha, a emissão deve indicar indisponibilidade, não manchetes inventadas.
- Verificar que os dados de mobilidade/qualidade do ar não são apresentados como câmaras em direto.
- Testar áudio, níveis, sincronização, ligação e direitos de utilização de conteúdos.
- Não anunciar a emissão como reportagem ao vivo ou vídeo em direto de Lisboa: os cenários 2.5D continuam ilustrativos e os RSS não têm validação editorial independente.

## Limites
A grelha automática corre no navegador do computador que emite; GitHub/Netlify não geram, por si, um sinal de vídeo contínuo. Para emissão prolongada é preciso manter OBS/LIVE Studio, computador e internet ligados. O projeto não dispõe de um canal RTMP/HLS próprio. Não está configurado para transmitir sem computador.

## Proteção visual
Esta preparação é **aditiva**: não modifica `index.html`, `viewer.html`, `schedule.json`, estilos, menus ou conteúdos da grelha. Não reintroduzir programas previamente removidos.
