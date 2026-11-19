# Pendências antes da publicação

Lista do que a **Brasscart** precisa enviar ou confirmar antes de o site ir ao ar no domínio oficial. Tudo o que está aqui foi deixado **oculto ou identificado** no site, nunca inventado.

Legenda: 🔴 bloqueia a publicação · 🟡 recomendado · ⚪ opcional

## 1. Marca

| | Item | Situação atual | Onde trocar |
| --- | --- | --- | --- |
| 🔴 | **Logotipo oficial em vetor (SVG)**, e se possível também a versão para fundo escuro | O site usa o logotipo original **recortado de uma arte oficial do Instagram** (PNG, 967 × 289 px), sem redesenho. Funciona, mas perde nitidez em telas grandes | `src/assets/brand/`, `public/brand/` e o import em `src/components/brand/BrandLogo.tsx` |
| 🔴 | **Revisar a grafia do slogan no logotipo** | O logotipo original traz "Soluções em impress**â**o", com acento circunflexo, quando o correto é "impress**ã**o". O site reproduz o arquivo como está. Recomendamos corrigir na arte-mestre e enviar a versão revisada | mesmo local acima |
| 🟡 | Manual de marca ou códigos de cor oficiais | A paleta foi extraída do próprio logotipo: azul `#0070b8`, azul-marinho `#014d8b` e grafite `#303836`, com amarelo `#f0c810` como apoio | `src/app/globals.css` |
| 🟡 | Ícone do app/favicon próprio | Gerado a partir do símbolo do logotipo | `src/app/icon.png`, `src/app/apple-icon.png`, `public/icons/` |

## 2. Contato e dados da empresa

| | Item | Situação atual | Onde preencher |
| --- | --- | --- | --- |
| 🔴 | **Confirmar o WhatsApp comercial** | O site usa **+55 11 97335-5559**, como informado no briefing. As publicações do Instagram citam outros números, **(15) 99668-6651** e o fixo **(15) 3248-3273**. Confirmar qual deve receber os orçamentos | `siteConfig.whatsapp` em `src/config/site.ts` |
| 🔴 | **Endereço da loja ou das unidades**, com link ou incorporação do Google Maps | Oculto (`address: null`). As publicações citam "unidades BrassCart" em Ibiúna, São Roque e Mairinque, mas sem endereço | `siteConfig.address` |
| 🔴 | **Horário de atendimento** | Oculto (`openingHours: null`) | `siteConfig.openingHours` |
| 🟡 | **Região atendida** | "Ibiúna, São Roque e Mairinque – SP" aparece no Instagram, mas está oculta até a confirmação | `siteConfig.serviceArea.confirmed = true` |
| 🟡 | Razão social e CNPJ | Ocultos. Aparecem no rodapé e na política de privacidade quando preenchidos | `siteConfig.legal` |
| 🟡 | E-mail para assuntos de privacidade (LGPD) | Hoje a política direciona para o WhatsApp | `siteConfig.legal.privacyEmail` |
| ⚪ | Outras redes (Facebook, Google Meu Negócio, LinkedIn) | Somente o Instagram está publicado | `siteConfig` e `sameAs` em `src/lib/seo.ts` |

## 3. Serviços e produtos não confirmados (rascunhos)

Estes itens existem no código com `status: "rascunho"` e **não aparecem no site público**. Basta confirmar quais a Brasscart realmente oferece e trocar o status para `"confirmado"`, ou apagar os que não se aplicam.

**Categorias** (`src/content/categories.ts`):

- Plotagem e grandes formatos
- Comunicação visual
- Materiais gráficos personalizados

**Itens do catálogo** (`src/content/catalog.ts`):

- Recarga de cartuchos
- Plotagem de projetos
- Banners e faixas
- Adesivos personalizados
- Cartões de visita e panfletos

Também vale confirmar os **itens já publicados**. Eles foram tirados da bio e das legendas oficiais do Instagram, mas os textos descritivos são nossos:

- Locação de impressoras
- Impressão colorida e P&B
- Cópias
- Digitalização
- Encadernação
- Toners (HP, Brother, Samsung, Canon, Lexmark — originais e compatíveis)
- Refil Epson 544
- Cartuchos compatíveis
- Conserto e limpeza
- Peças de reposição
- Materiais de escritório

Para cada item, enviar se possível:

- Especificações reais: modelos de impressora para locação, tamanhos de papel, tipos de encadernação, gramaturas.
- Fotos reais.

## 4. Fotografias e portfólio

| | Item | Situação atual |
| --- | --- | --- |
| 🔴 | **Fotos reais de trabalhos executados** para o portfólio | Não há portfólio real. A página mostra um convite para o Instagram. Existe uma galeria de demonstração com imagens de banco, sempre marcadas como "ilustrativas", que só aparece com `NEXT_PUBLIC_SHOW_DEMO_CONTENT=true` |
| 🟡 | Fotos da loja, fachada, equipe e equipamentos | Hoje todas as fotos são de bancos de imagens livres (Unsplash/Pexels), identificadas como ilustrativas e creditadas em `/creditos` |
| 🟡 | Fotos dos produtos vendidos (toners, refis, cartuchos) | Imagens genéricas ilustrativas |

Formato ideal: JPG ou PNG em alta resolução (mínimo de 1600 px no lado maior), sem marca-d'água, com autorização de uso. Nós convertemos para WebP.

## 5. Conteúdo institucional

| | Item | Situação atual | Onde |
| --- | --- | --- | --- |
| 🟡 | História da empresa (como começou, ano de fundação) | Bloco oculto. Nenhum ano ou número foi inventado | `about.history`, `siteConfig.foundedYear` |
| 🟡 | Estrutura (loja, equipamentos, equipe técnica) | Bloco oculto | `about.structure` |
| ⚪ | Depoimentos de clientes **reais**, com autorização | Não há depoimentos no site | — |
| ⚪ | Números (clientes atendidos, anos de mercado), certificações e parcerias | Não exibidos | — |

## 6. Perguntas frequentes em rascunho

Estas perguntas estão em `src/content/faq.ts`, ocultas até a confirmação:

- "Qual o horário de atendimento?" — depende do horário oficial.
- "Vocês fazem entregas ou atendimento no local?" — confirmar se há entrega, retirada ou visita técnica, e a área.

## 7. Configuração técnica

| | Item | Onde |
| --- | --- | --- |
| 🔴 | **Domínio oficial** (ex.: `brasscart.com.br`) | `NEXT_PUBLIC_SITE_URL` na Vercel |
| 🟡 | **ID do Google Analytics 4** (`G-XXXXXXXXXX`) | `NEXT_PUBLIC_GA_ID` na Vercel |
| 🟡 | Acesso ao Google Search Console, para enviar o sitemap | — |
| ⚪ | Revisão jurídica da política de privacidade | `src/app/politica-de-privacidade/page.tsx` |

## Checklist final de publicação

- [ ] Logotipo vetorial aplicado e grafia do slogan revisada
- [ ] WhatsApp oficial confirmado
- [ ] Endereço, horário e mapa preenchidos (ou decisão de não exibir)
- [ ] Rascunhos revisados: confirmados ou removidos
- [ ] `NEXT_PUBLIC_SHOW_DRAFTS` e `NEXT_PUBLIC_SHOW_DEMO_CONTENT` desligados em produção
- [ ] `NEXT_PUBLIC_SITE_URL` com o domínio final
- [ ] Teste de todos os botões de WhatsApp no celular
- [ ] Sitemap enviado ao Google Search Console
