# 24 NOTÍCIAS™ — cenário CNN Style (integração em revisão)

Pasta independente da LISBON ALIVE™. O ficheiro `index.html` mantém o grafismo do HTML enviado (1920×1080, 16:9, vermelho/preto/branco, painel lateral, ticker e relógio de Lisboa). Foram retiradas apenas injeções Kaspersky e substituído o motor de recolha RSS direta por consumo seguro de `./feed.json`.

## Controlo editorial

O `feed.json` começa vazio para não publicar conteúdos fictícios. Só entram notícias com `editorial_status: "revisto_manualmente"`, título, resumo, fonte, data válida e idade inferior a 48 horas. Esta marcação é um requisito técnico, **não** comprova por si só uma verificação humana: a edição do JSON deve fazer parte de um procedimento editorial real e auditável. Não há recolha RSS automática nem painel privado nesta versão estática. O ficheiro público e as imagens precisam de aprovação explícita antes da publicação.

Exemplo ilustrativo de estrutura (NÃO PUBLICAR COMO NOTÍCIA):

```json
{"news":[{"id":"exemplo-nao-publicar","title":"EXEMPLO FICTÍCIO — NÃO PUBLICAR","summary":"Exemplo do formato JSON, não é notícia real.","source":"FONTE A CONFIRMAR","published_at":"2026-11-15T14:00:00Z","category":"Portugal","editorial_status":"pendente"}]}
```

Para imagens usar apenas URLs HTTPS acompanhados de `image_rights_confirmed: true` e `image_credit` devidamente confirmado. Sem isso, o cenário mantém o fundo gráfico original.

## Teste

Em servidor local: `python -m http.server 8765` na raiz do repositório; abrir `http://127.0.0.1:8765/24-noticias/`. No OBS utilizar uma fonte Navegador 1920×1080. Uma eventual pré-visualização Netlify poderá ficar acessível publicamente por configuração do repositório, mesmo com PR em rascunho.

**Não alterar ficheiros existentes da LISBON ALIVE™ nem fundir este PR sem autorização expressa.** O aviso visual DIRETO deve ser usado em contexto de uma verdadeira emissão, nunca como prova de que a equipa editorial está a transmitir em direto.
