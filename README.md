# Site Brasscart Soluções

Site institucional e catálogo da **Brasscart Soluções** (soluções em impressão). Não há checkout nem pagamento: todo pedido de orçamento é feito pelo **WhatsApp**, com a mensagem já montada.

- WhatsApp comercial: +55 11 97335-5559 (`https://wa.me/5511973355559`)
- Instagram: [@brasscartsolucoes](https://www.instagram.com/brasscartsolucoes/)

> **Antes de publicar**, leia [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md). Ele lista os materiais e as confirmações que a Brasscart precisa enviar (logo vetorial, fotos reais, endereço, horário, CNPJ, serviços em rascunho etc.).

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) + React 19 + TypeScript |
| Estilo | Tailwind CSS 4 + componentes shadcn/ui (base `@base-ui/react`) |
| Ícones | Lucide (ícones de WhatsApp e Instagram próprios em `SocialIcons.tsx`) |
| Animações | Motion (`LazyMotion` + `domAnimation`), respeitando "reduzir movimento" |
| Imagens | `next/image`, arquivos WebP locais com placeholder de desfoque |
| Fontes | Manrope (títulos) e Inter (textos) via `next/font` — sem requisições externas |
| Hospedagem | Compatível com Vercel (todas as páginas são pré-renderizadas como estáticas) |

## Como rodar

Requisitos: **Node.js 20.9 ou superior** e npm.

```powershell
npm install
```

```powershell
npm run dev
```

Abra http://localhost:3000.

Outros comandos:

```powershell
npm run build
```

```powershell
npm run start
```

```powershell
npm run lint
```

Para ver o conteúdo ainda não confirmado durante a revisão, crie um `.env.local` com `NEXT_PUBLIC_SHOW_DRAFTS=true` e/ou `NEXT_PUBLIC_SHOW_DEMO_CONTENT=true` e reinicie o servidor.

## Variáveis de ambiente

Copie [`.env.example`](.env.example) para `.env.local`. Todas as variáveis são públicas, ou seja, nenhuma credencial fica no código.

| Variável | Para que serve | Produção |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica, usada em SEO, sitemap, Open Graph e JSON-LD | domínio oficial (ex.: `https://www.brasscart.com.br`) |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (`G-…`). Vazio desativa o GA | ID real, quando houver |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Exibe itens e textos **não confirmados**, com o selo "Rascunho" | `false` |
| `NEXT_PUBLIC_SHOW_DEMO_CONTENT` | Exibe o portfólio de demonstração (imagens ilustrativas) | `false` |

Com qualquer um dos dois últimos ligado, ou em deploys de preview da Vercel, o `robots.txt` bloqueia a indexação.

## Estrutura

```
src/
  app/                    Páginas (App Router), sitemap, robots, manifest, ícones e imagem OG
    produtos/[slug]       Página de cada item do catálogo
    servicos/[slug]       Página de cada categoria de serviço
  components/
    layout/               Header, MobileMenu, NavLinks, SiteSearch, Footer
    sections/             HeroSection, ServicesGrid, ServiceCard, AboutSection, ContactSection, FaqSection…
    catalog/              ProductCard, CatalogBrowser (busca + filtros), ProductDetails
    portfolio/            PortfolioGallery (filtros + lightbox)
    quote/                QuoteForm (formulário de orçamento)
    whatsapp/             WhatsAppButton, FloatingContact (botão flutuante e barra fixa no celular)
    common/ brand/ motion/ seo/ analytics/ ui/
  config/site.ts          Configuração central: contatos, redes, endereço, horário, dados legais, flags
  content/                Conteúdo estruturado: categorias, catálogo, portfólio, FAQ, "sobre", imagens
  lib/                    WhatsApp, orçamento, busca, SEO, analytics e camada de dados (data.ts)
  assets/                 Logo e fotografias (WebP)
docs/                     Pendências de conteúdo e créditos das imagens
```

## Como editar o conteúdo

Todo o conteúdo fica em arquivos TypeScript tipados. Erros de digitação aparecem no `npm run build`.

- **Contatos, endereço, horário, CNPJ:** `src/config/site.ts`. Campos `null` ficam ocultos no site. Ao preencher `address` e `openingHours`, o endereço, o horário e o mapa (`mapEmbedUrl`) aparecem no contato e no rodapé, e o JSON-LD passa a ser `LocalBusiness`.
- **Serviços (categorias):** `src/content/categories.ts`.
- **Produtos e serviços do catálogo:** `src/content/catalog.ts`. Cada item tem nome, categoria, descrição, destaques, especificações, variações, imagem, galeria e palavras-chave de busca.
- **Perguntas frequentes:** `src/content/faq.ts`.
- **Sobre nós:** `src/content/about.ts`. `history` e `structure` estão `null` até a empresa enviar os textos.
- **Portfólio:** `src/content/portfolio.ts`. Fotos reais devem usar `kind: "real"`.
- **Imagens:** salve o WebP em `src/assets/images/`, importe-o em `src/content/images.ts` e, se for de banco de imagens, registre o crédito em `imageCredits`.

### Status editorial

Cada serviço, produto e pergunta tem `status`:

- `"confirmado"`: comprovado em fontes oficiais da Brasscart e exibido publicamente.
- `"rascunho"`: aguarda confirmação. Fica **oculto** no site público e só aparece com `NEXT_PUBLIC_SHOW_DRAFTS=true`, sempre com o selo "Rascunho". Também não entra no sitemap.

Para publicar um item, troque o status para `"confirmado"`. O campo `evidence` registra de onde veio a confirmação e não é enviado ao navegador.

### Preços

O catálogo não exibe preços. Todos os itens mostram **"Preço sob consulta"** (`price: { kind: "consulta" }`).

## WhatsApp

Funções em `src/lib/whatsapp.ts`. A mensagem vai sempre no parâmetro `text`, codificada com `encodeURIComponent`.

| Contexto | Mensagem |
| --- | --- |
| Produto | "Olá! Visitei o site da Brasscart e gostaria de solicitar um orçamento para [NOME DO PRODUTO]." As variações escolhidas na página do produto entram entre parênteses. |
| Serviço | "Olá! Gostaria de mais informações sobre o serviço de [NOME DO SERVIÇO]." |
| Geral / orçamento | Mensagens padrão de contato e de orçamento |

### Formulário de orçamento

Fica em `src/components/quote/QuoteForm.tsx`, com a lógica em `src/lib/quote.ts`.

- Os campos são nome, empresa (opcional), serviço ou produto, quantidade, observações e prazo (opcional).
- Os dados são validados e higienizados no navegador e viram uma mensagem organizada, que abre no WhatsApp.
- Nada é gravado em servidor e não é preciso ter conta.
- O link `/contato?item=<slug>#orcamento` já abre o formulário com o item selecionado.

**Anexos (futuro):** o tipo `QuoteRequest` já tem o campo `attachments`, e a interface `QuoteSubmitter` permite trocar o envio. Para receber arquivos, crie um `QuoteSubmitter` que faça upload (por exemplo para o Supabase Storage) e inclua os links na mensagem. O WhatsApp não aceita anexos por link `wa.me`, por isso nenhum upload é simulado hoje.

## Analytics (GA4)

O Analytics é carregado **somente** quando `NEXT_PUBLIC_GA_ID` está definido **e** o visitante aceita o aviso de cookies (LGPD). A escolha fica em `localStorage` (`brasscart-consent`).

Eventos enviados:

| Evento | Quando |
| --- | --- |
| `whatsapp_click` + `generate_lead` (`method: whatsapp`) | Clique em qualquer botão de WhatsApp. Envia `location` (posição do botão) e `item` |
| `quote_submit` + `generate_lead` (`method: quote_form`) | Envio do formulário de orçamento |
| `search` | Buscas no catálogo e na busca do cabeçalho |

No GA4, marque `generate_lead` como **evento-chave** para medir os pedidos de orçamento.

## SEO e acessibilidade

- **SEO:** metadados e canonical por página, Open Graph (`opengraph-image.jpg`), `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, e JSON-LD de organização, site, breadcrumbs, serviços, produtos e FAQ.
- **Acessibilidade:** HTML semântico, link "Pular para o conteúdo", navegação completa por teclado (menu, busca com `Ctrl+K` ou `/`, lightbox com setas), foco visível, textos alternativos, `aria-*` nos filtros e no formulário, contraste AA e animações desligadas para quem prefere menos movimento.
- **Segurança:** cabeçalhos `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` e `Permissions-Policy` em `next.config.ts`. Não há credenciais no código.

## Publicar na Vercel

1. Envie o projeto para um repositório no GitHub, GitLab ou Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. O preset **Next.js** é detectado sozinho e não precisa de configuração extra de build.
3. Em **Settings → Environment Variables**, cadastre `NEXT_PUBLIC_SITE_URL` (domínio final) e, se houver, `NEXT_PUBLIC_GA_ID`. Deixe `NEXT_PUBLIC_SHOW_DRAFTS` e `NEXT_PUBLIC_SHOW_DEMO_CONTENT` vazios ou `false` em **Production**. Em **Preview**, você pode ligá-los para revisar o conteúdo.
4. Faça o deploy e conecte o domínio em **Settings → Domains**.
5. Depois do deploy, envie `https://SEU-DOMINIO/sitemap.xml` no Google Search Console.

## Publicar no Netlify

O projeto já inclui o [`netlify.toml`](netlify.toml). O Netlify detecta o Next.js e aplica o adaptador oficial automaticamente, com rotas, otimização de imagens e cabeçalhos.

1. Em [app.netlify.com](https://app.netlify.com), clique em **Add new site → Import an existing project** e escolha o repositório no GitHub. Cada `git push` na branch principal gera um novo deploy.
2. Em **Site configuration → Environment variables**, cadastre as mesmas variáveis da tabela acima. Sem `NEXT_PUBLIC_SITE_URL`, o site usa a URL do Netlify (`*.netlify.app`) automaticamente.
3. Para usar o domínio próprio, configure-o em **Domain management** e atualize `NEXT_PUBLIC_SITE_URL`.

Deploy previews do Netlify não são indexados: o `robots.txt` bloqueia buscadores fora do contexto de produção.

Pela linha de comando, use o comando abaixo. Ele exige `netlify login` antes:

```powershell
npx netlify-cli deploy --build --prod
```

## Próximos passos (painel administrativo)

`src/lib/data.ts` concentra o acesso ao conteúdo (`getCategories`, `getCatalog`, `getCatalogItem`, `getPortfolio`, `getFaq`…). Para migrar para um painel com **Supabase**:

1. Crie as tabelas espelhando os tipos de `src/content/types.ts`: categorias, itens, variações, imagens, portfólio e FAQ, com a coluna `status`.
2. Reimplemente as funções de `data.ts` consultando o Supabase. Use `"use cache"` e `cacheTag`, e revalide ao salvar no painel.
3. Envie as imagens para o Supabase Storage e libere o domínio em `images.remotePatterns` no `next.config.ts`.

Os componentes não precisam mudar.
