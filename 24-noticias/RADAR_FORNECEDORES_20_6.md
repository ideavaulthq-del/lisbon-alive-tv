# 24N SHOP™ LIVE 20.6 — Radar de fornecedores (15-11-2026)

## Objetivo
Encontrar um fornecedor legítimo de dados de produtos para os intervalos da 24 NOTÍCIAS™, mantendo o catálogo sujeito a revisão editorial e sem alterar o grafismo da emissão.

## Fontes oficiais consultadas
1. **Awin** — feed de produtos para publishers com nome, descrição, preço, imagens e deep links. A interface Create-a-Feed permite descarregar CSV; o acesso depende da conta e das permissões dos programas.
   - https://help.awin.com/developers/docs/product-feed-publisher-guide-intro
   - https://success.awin.com/s/article/How-can-I-access-a-Product-Feed?language=en_US
   - https://help.awin.com/developers/docs/downloading-a-list-of-your-product-feeds
2. **Tradedoubler** — Products API para publishers com conta e ligação aos anunciantes.
   - https://dev.tradedoubler.com/products/publisher/
3. **Adtraction** — product feeds disponibilizados em XML.
   - https://help.adtraction.com/en/articles/13398866-product-feeds-via-adtraction

## Recomendação
**Awin como primeiro candidato a avaliar**, porque a Central 24N SHOP já aceita CSV. Não está confirmada a elegibilidade de uma emissão televisiva online, a autorização de utilização de imagens/vídeos no formato broadcast, nem as condições financeiras, fiscais e contratuais aplicáveis ao operador português. Essas condições devem ser verificadas antes de qualquer adesão.

## Checklist antes da primeira integração
- [ ] Confirmar se a conta pode ser aberta como particular residente em Portugal e eventuais custos
- [ ] Confirmar se o canal 24 NOTÍCIAS™ pode ser declarado como meio de promoção
- [ ] Confirmar autorização para exibir imagens, nomes, marcas, preços e ligações durante intervalos em vídeo/OBS
- [ ] Confirmar requisitos de identificação de publicidade e divulgação de afiliação
- [ ] Confirmar regras de atualização de preços e disponibilidade e prazos de remoção
- [ ] Confirmar condições de comissão, pagamento, tributação e cancelamento
- [ ] Obter um feed permitido e mapear as colunas ao CSV da Central
- [ ] Importar inicialmente como rascunho e rever cada produto antes da emissão

## Estado
**Pesquisa documental apenas.** Não foi criada conta, aceite contrato, contactada empresa, obtida chave/API ou importado qualquer produto real. Não existem anúncios comerciais reais aprovados no catálogo por efeito desta missão.

A Central continua a exigir atualização manual de `24-noticias/products.json` no GitHub. Nunca guardar tokens, chaves de feed ou credenciais num repositório público ou no HTML estático.
