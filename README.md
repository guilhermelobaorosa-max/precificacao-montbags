# Precificação MONTBAGS

Calculadora de precificação de bolsas de crochê para as artesãs do treinamento MONTBAGS.

**App:** [index.html](index.html) — arquivo único, sem instalação, sem servidor. Funciona offline depois de aberto.

## O que ela calcula

| Entra | Sai |
|---|---|
| Fios (preço e peso do novelo, gramas usados) | Preço de venda sugerido |
| Aviamentos, embalagem e frete rateado | Custo total (preço mínimo) |
| Horas trabalhadas (cronômetro embutido) | Lucro em R$ e em % |
| Custos fixos do mês ÷ peças por mês | Ganho real por hora |
| Margem de lucro | Preço para revendedora |
| Taxa da venda (Pix, cartão, Shopee, Mercado Livre) | Quanto a comissão consome |

A taxa da venda entra por **markup divisor** — o preço sobe o suficiente para a comissão não sair do lucro da artesã.

## Abas

- **Calcular** — a precificação da peça, com cronômetro que sobrevive ao fechar o app
- **Clientes** — nome, WhatsApp e data da última compra, com alerta de quem passou de 90 dias
- **Meu negócio** — custos fixos mensais e valor da hora, preenchidos uma vez só

## Dados

Tudo fica no `localStorage` do aparelho da artesã. Nada é enviado para servidor nenhum.
A aba **Meu negócio** exporta as clientes em CSV para backup.

## App no celular (PWA)

Instalável na tela de início, com ícone próprio, tela cheia e funcionamento offline.

- `manifest.webmanifest` — nome, ícones, cor da marca, modo `standalone`
- `sw.js` — service worker: rede primeiro para a página (garante atualização),
  cache como reserva (garante o offline)
- Ícones gerados a partir do símbolo da marca sobre `#023535`

**Ao publicar uma nova versão, suba o número em `VERSAO` dentro de `sw.js`.**
Sem isso, aparelhos que já instalaram continuam abrindo a versão antiga do cache.

## Publicação

Hospedado no GitHub Pages a partir da branch `main`, pasta raiz.

    git add -A && git commit -m "..." && git push

O Pages reconstrói sozinho em cerca de 30 segundos.
