# LISBON ALIVE™ MASTER CONTROL 7.0 | CANAL WEB

## Abrir localmente
- `index.html`: painel editorial e grelha de 48 blocos.
- `viewer.html`: visualização simplificada para espectadores.
- `sexta-em-alerta.html`: simulador educativo fictício.

## Publicar
1. Extrair o ZIP.
2. Carregar **todos os ficheiros da pasta** num alojamento estático HTTPS (por exemplo, Netlify Drop ou GitHub Pages).
3. Abrir `https://SEU-ENDERECO/viewer.html` para visualizar.
4. Abrir `https://SEU-ENDERECO/index.html` para editar a grelha.

## Limites importantes
- O horário é calculado em cada navegador com `Europe/Lisbon`, inclusive mudança de hora.
- Não existe fluxo RTMP/HLS, servidor 24/7, ligação a câmaras, nem publicação de notícias em tempo real.
- As edições feitas no painel são guardadas em localStorage e **não se propagam** a outros espectadores ou dispositivos. Para isso será necessário um backend, autenticação e uma API de programação.
- O ecrã deve continuar aberto para se ver a animação; num site estático, um novo espectador recebe a grelha no horário correto quando abre a página.
- Os cenários de crise são simulações fictícias e não alertas reais.
- O leitor incorpora a página de emissão; em alguns navegadores a reprodução em ecrã inteiro pode depender de permissões.
