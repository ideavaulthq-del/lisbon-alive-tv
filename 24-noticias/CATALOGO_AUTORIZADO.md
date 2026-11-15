# 24N SHOP™ — Importação de catálogo autorizado (LIVE 20.5)

A Central Editorial em `central.html` aceita agora **CSV de um fornecedor que autorizou a utilização dos dados**. Não existe recolha automática de websites, scraping, ligação a APIs comerciais, nem publicação automática.

## CSV suportado

Codificação UTF-8; separador **vírgula**; primeira linha com os nomes das colunas. Campos com vírgulas devem estar entre aspas duplas. Colunas obrigatórias: `name`, `description`. Colunas opcionais: `category`, `price`, `store`, `image_url`, `link`, `emoji`.

Exemplo ilustrativo, **sem produtos ou preços reais**:

```csv
name,category,description,price,store,image_url,link,emoji
Produto de demonstração,Tecnologia,Descrição a confirmar,,Loja autorizada,,,📱
```

Todos os produtos importados ficam em **RASCUNHO** (`approved: false`) e sem data de revisão. É obrigatório confirmar manualmente a licença de imagens, descrição, preço, disponibilidade, loja, URL HTTPS e data da revisão antes de aprovar. Os produtos repetidos por nome e loja são ignorados.

Depois da revisão, exportar `products.json` e atualizar manualmente o ficheiro correspondente no GitHub. **A Central não é uma aplicação autenticada nem envia dados ao GitHub**. Não inserir credenciais, chaves de API ou tokens em ficheiros estáticos.

## Limitações

- O editor não confirma preços nem disponibilidade em tempo real.
- Não se presume autorização para republicar imagens, marcas ou dados só porque aparecem num site.
- A emissão só aceita produtos aprovados com revisão recente, conforme a LIVE 20.4.
- Não houve alterações à LISBON ALIVE™ nem operações no Netlify.
