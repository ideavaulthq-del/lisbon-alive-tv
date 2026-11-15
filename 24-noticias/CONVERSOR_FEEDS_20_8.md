# 24N SHOP™ LIVE 20.8 — Conversor de feeds autorizados

A página `24-noticias/conversor-feeds.html` permite transformar um **CSV autorizado** de fornecedor num `products.json` compatível com a Central Editorial.

## Procedimento

1. Obter legitimamente um CSV de um fornecedor, após confirmar licença e condições de utilização em vídeo/televisão online.
2. Abrir `conversor-feeds.html` num navegador e escolher o ficheiro (até 1 MB, 500 produtos).
3. Confirmar o separador e mapear as colunas de origem para `name`, `description`, `category`, `price`, `store`, `image_url`, `link` e `emoji`.
4. Pré-visualizar até 30 linhas; linhas com nome/descrição em falta, URLs não HTTPS ou duplicados são ignoradas.
5. Exportar `products.json`. **Todos os produtos são rascunhos**, `approved:false`, `reviewed_at:""`.
6. Rever na `central.html`, confirmar imagens, direitos, preços, disponibilidade e URL; só então aprovar e publicar o catálogo no GitHub.

**Atenção:** importar o JSON na Central substitui a lista local. Guardar uma cópia do catálogo antes de importar. O conversor não funde catálogos existentes.

## Segurança e limites

- Não há ligação à Awin nem a APIs comerciais. O conversor funciona localmente, sem enviar o CSV a um servidor.
- Não inserir tokens de afiliados, URLs de feeds privados ou credenciais em páginas públicas.
- Não há garantia de que um campo de preço no feed esteja atualizado ou represente uma oferta elegível.
- A autorização de utilização em OBS, vídeos, gravações e publicidade depende dos contratos com o fornecedor e anunciantes.
- O grafismo noticioso e a LISBON ALIVE™ permanecem intocados; nenhuma operação no Netlify.

## Exemplo de cabeçalho CSV

```csv
product_name,description,merchant_name,search_price,aw_deep_link,aw_image_url
```

Este cabeçalho é apenas um exemplo de mapeamento de colunas e não representa uma integração Awin ativa.
