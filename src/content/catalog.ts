import { images } from "@/content/images";
import type { CatalogItem } from "@/content/types";

const consulta = { kind: "consulta" } as const;

/**
 * Catálogo de produtos e serviços.
 *
 * Regras editoriais:
 *  - Nada de preços ou disponibilidade inventados: sempre "Preço sob consulta".
 *  - Marcas citadas (HP, Brother etc.) indicam compatibilidade; a Brasscart
 *    não fabrica esses produtos.
 *  - Itens "rascunho" ficam ocultos até a confirmação da empresa.
 */
export const catalog: CatalogItem[] = [
  // ---------------------------------------------------------------- Locação
  {
    slug: "locacao-de-impressoras-para-empresas",
    name: "Locação de impressoras para empresas",
    type: "servico",
    category: "locacao-de-impressoras",
    summary:
      "Impressoras de alto desempenho em planos mensais, sem dor de cabeça com manutenção.",
    description:
      "Com a locação, sua empresa tem impressoras modernas funcionando sem se preocupar com manutenção, toner ou suporte técnico. Conte para a gente o volume de impressão e o tipo de uso e receba uma proposta adequada à sua rotina.",
    features: [
      "Planos mensais",
      "Sem preocupação com manutenção, toner ou suporte técnico",
      "Equipamentos de alto desempenho",
      "Proposta conforme a necessidade da empresa",
    ],
    specs: [
      { label: "Modalidade", value: "Planos mensais" },
      { label: "Indicado para", value: "Empresas e escritórios" },
      { label: "Valores", value: "Sob consulta, conforme proposta" },
    ],
    image: {
      src: images.locacaoMultifuncional,
      alt: "Impressora multifuncional moderna em ambiente de escritório",
    },
    gallery: [
      { src: images.locacaoPainel, alt: "Painel touchscreen de uma impressora multifuncional" },
      { src: images.manutencaoTrocaToner, alt: "Técnico substituindo o toner de uma impressora" },
    ],
    price: consulta,
    keywords: ["aluguel", "alugar", "locacao", "multifuncional", "outsourcing", "empresa", "plano mensal"],
    featured: true,
    status: "confirmado",
    evidence: "Bio, destaque 'Planos mensal' e post de 28/08/2025.",
  },

  // ---------------------------------------------------------- Impressão
  {
    slug: "impressao-colorida",
    name: "Impressão colorida",
    type: "servico",
    category: "impressao-e-copias",
    summary: "Impressões coloridas de documentos, trabalhos e materiais do dia a dia.",
    description:
      "Envie seu arquivo pelo WhatsApp ou venha até a loja e imprima seus documentos em cores. Informe a quantidade e o tipo de material para receber o orçamento.",
    features: [
      "Documentos, trabalhos e materiais diversos",
      "Arquivo enviado pelo WhatsApp",
      "Atendimento na loja ou pelo WhatsApp",
    ],
    image: {
      src: images.impressaoPainel,
      alt: "Mão acionando o painel de uma impressora para iniciar uma impressão",
    },
    gallery: [
      { src: images.cartuchosJato, alt: "Cartuchos de tinta coloridos instalados em uma impressora" },
    ],
    price: consulta,
    keywords: ["imprimir", "impressao", "colorida", "cor", "documento", "trabalho escolar"],
    featured: true,
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Impressões coloridas e PB').",
  },
  {
    slug: "impressao-preto-e-branco",
    name: "Impressão preto e branco",
    type: "servico",
    category: "impressao-e-copias",
    summary: "Impressões em preto e branco para documentos e materiais de rotina.",
    description:
      "Ideal para documentos, contratos, apostilas e materiais de estudo. Envie o arquivo pelo WhatsApp e combine a retirada.",
    features: [
      "Documentos e apostilas",
      "Arquivo enviado pelo WhatsApp",
      "Atendimento na loja ou pelo WhatsApp",
    ],
    image: {
      src: images.papelPilha,
      alt: "Pilha de folhas de papel impressas",
    },
    price: consulta,
    keywords: ["imprimir", "impressao", "preto", "branco", "pb", "documento", "apostila"],
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Impressões coloridas e PB').",
  },
  {
    slug: "copias-xerox",
    name: "Cópias (xerox)",
    type: "servico",
    category: "impressao-e-copias",
    summary: "Cópias rápidas de documentos com qualidade.",
    description:
      "Precisa de cópias de documentos? Traga seus originais até a loja ou fale com a equipe pelo WhatsApp para combinar quantidades.",
    features: ["Cópias de documentos", "Coloridas ou em preto e branco", "Atendimento rápido"],
    image: {
      src: images.impressaoCopiadora,
      alt: "Pessoa fazendo cópias em uma copiadora",
    },
    price: consulta,
    keywords: ["xerox", "copia", "copias", "documento", "fotocopia"],
    status: "confirmado",
    evidence: "Bio do Instagram ('Xerox') e post de 17/10/2025 ('Cópias e encadernações').",
  },

  // -------------------------------------------- Digitalização e encadernação
  {
    slug: "digitalizacao-de-documentos",
    name: "Digitalização de documentos",
    type: "servico",
    category: "digitalizacao-e-encadernacao",
    summary: "Seus documentos em arquivo digital, com nitidez e organização.",
    description:
      "Digitalizamos documentos com alta qualidade para você guardar, enviar ou arquivar com segurança. Informe a quantidade de páginas e o formato desejado.",
    features: ["Digitalizações nítidas", "Documentos avulsos ou em lote", "Envio do arquivo digital"],
    image: {
      src: images.digitalizacaoCopiadora,
      alt: "Pessoa posicionando um documento no scanner de uma multifuncional",
    },
    gallery: [{ src: images.documentosPilha, alt: "Pilha de documentos com marcadores coloridos" }],
    price: consulta,
    keywords: ["digitalizar", "digitalizacao", "scanner", "escanear", "pdf", "arquivo"],
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Digitalizações nítidas').",
  },
  {
    slug: "encadernacao",
    name: "Encadernação",
    type: "servico",
    category: "digitalizacao-e-encadernacao",
    summary: "Acabamento para apostilas, trabalhos e documentos.",
    description:
      "Deixe seus materiais organizados e com boa apresentação. Consulte pelo WhatsApp as opções de encadernação disponíveis para o seu material.",
    features: ["Apostilas, trabalhos e documentos", "Pode ser combinada com a impressão", "Consulte as opções disponíveis"],
    image: {
      src: images.encadernacaoEspiral,
      alt: "Detalhe de encadernação em espiral",
    },
    gallery: [{ src: images.encadernacaoCaderno, alt: "Material encadernado em espiral aberto sobre a mesa" }],
    price: consulta,
    keywords: ["encadernar", "encadernacao", "espiral", "apostila", "tcc", "trabalho"],
    featured: true,
    status: "confirmado",
    evidence: "Bio do Instagram ('Encadernação') e post de 17/10/2025.",
  },

  // -------------------------------------------------------- Suprimentos
  {
    slug: "toners-para-impressoras-laser",
    name: "Toners para impressoras laser",
    type: "produto",
    category: "toners-tintas-e-cartuchos",
    summary: "Toners originais e compatíveis para HP, Brother, Samsung, Canon e Lexmark.",
    description:
      "Trabalhamos com toners originais e compatíveis das principais marcas do mercado. Informe a marca e o modelo da sua impressora para confirmarmos a disponibilidade.",
    features: [
      "Originais e compatíveis",
      "Rendimento profissional",
      "Para as principais marcas do mercado",
    ],
    specs: [
      { label: "Marcas atendidas", value: "HP, Brother, Samsung, Canon e Lexmark" },
      { label: "Linhas", value: "Originais e compatíveis" },
      { label: "Disponibilidade", value: "Consulte para o seu modelo" },
    ],
    variants: [
      { label: "Marca", options: ["HP", "Brother", "Samsung", "Canon", "Lexmark"] },
      { label: "Linha", options: ["Original", "Compatível"] },
    ],
    image: {
      src: images.tonerCartucho,
      alt: "Cartucho de toner para impressora a laser",
    },
    gallery: [{ src: images.manutencaoTrocaToner, alt: "Substituição de toner em impressora laser" }],
    price: consulta,
    keywords: ["toner", "laser", "hp", "brother", "samsung", "canon", "lexmark", "compativel", "original"],
    featured: true,
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Precisando de toner? Temos todas as marcas!').",
  },
  {
    slug: "refil-de-tinta-epson-544",
    name: "Refil de tinta Epson 544",
    type: "produto",
    category: "toners-tintas-e-cartuchos",
    summary: "Refis Epson 544 originais e compatíveis nas quatro cores.",
    description:
      "Reabasteça sua impressora tanque de tinta com refis Epson 544 originais ou compatíveis, nas cores preto, ciano, magenta e amarelo.",
    features: ["Preto, ciano, magenta e amarelo", "Originais e compatíveis", "Qualidade e rendimento"],
    specs: [
      { label: "Modelo", value: "Epson 544" },
      { label: "Cores", value: "Preto, ciano, magenta e amarelo" },
      { label: "Linhas", value: "Originais e compatíveis" },
    ],
    variants: [
      { label: "Cor", options: ["Preto", "Ciano", "Magenta", "Amarelo"] },
      { label: "Linha", options: ["Original", "Compatível"] },
    ],
    image: {
      src: images.tintasRefil,
      alt: "Frascos de tinta nas cores ciano, magenta, amarelo e preto",
    },
    price: consulta,
    keywords: ["tinta", "refil", "epson", "544", "ecotank", "tanque", "ciano", "magenta", "amarelo", "preto"],
    featured: true,
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('refis Epson 544 originais e compatíveis').",
  },
  {
    slug: "cartuchos-compativeis-jato-de-tinta",
    name: "Cartuchos compatíveis",
    type: "produto",
    category: "toners-tintas-e-cartuchos",
    summary: "Cartuchos compatíveis com alto rendimento para imprimir pagando menos.",
    description:
      "Economize sem abrir mão da qualidade com cartuchos compatíveis de alto rendimento. Informe o modelo da sua impressora para consultar a disponibilidade.",
    features: ["Alto rendimento", "Economia na impressão", "Consulte o modelo da sua impressora"],
    image: {
      src: images.cartuchosJato,
      alt: "Cartuchos de tinta coloridos instalados no carro de impressão",
    },
    price: consulta,
    keywords: ["cartucho", "cartuchos", "jato de tinta", "compativel", "tinta"],
    status: "confirmado",
    evidence: "Post de 28/08/2025 ('cartuchos e toners compatíveis com alto rendimento').",
  },
  {
    slug: "recarga-de-cartuchos",
    name: "Recarga de cartuchos",
    type: "servico",
    category: "toners-tintas-e-cartuchos",
    summary: "Recarga de cartuchos de jato de tinta.",
    description:
      "[RASCUNHO] Serviço citado em publicação antiga (2022). Confirmar com a Brasscart se continua sendo oferecido.",
    features: ["Cartuchos de jato de tinta", "Consultar modelos"],
    image: {
      src: images.cartuchosJato,
      alt: "Cartuchos de tinta em impressora",
    },
    price: consulta,
    keywords: ["recarga", "recarregar", "cartucho"],
    status: "rascunho",
    evidence: "Post de 09/03/2022 ('Fazemos recargas de cartuchos'). Reconfirmar.",
  },

  // -------------------------------------------------------- Manutenção
  {
    slug: "conserto-e-limpeza-de-impressoras",
    name: "Conserto e limpeza de impressoras",
    type: "servico",
    category: "manutencao-de-impressoras",
    summary: "Diagnóstico, conserto e limpeza completa com assistência técnica especializada.",
    description:
      "Sua impressora está com problema? A Brasscart resolve: conserto e limpeza completa com assistência técnica especializada. Chame no WhatsApp ou traga sua impressora até a loja.",
    features: [
      "Conserto e limpeza completa",
      "Assistência técnica especializada",
      "Atendimento pelo WhatsApp ou na loja",
    ],
    image: {
      src: images.manutencaoReparo,
      alt: "Técnico com luvas fazendo reparo em impressora",
    },
    gallery: [
      { src: images.manutencaoInterna, alt: "Interior de impressora aberta para manutenção" },
      { src: images.manutencaoTrocaToner, alt: "Técnico substituindo peça de impressora" },
    ],
    price: consulta,
    keywords: ["conserto", "manutencao", "reparo", "limpeza", "assistencia tecnica", "impressora parada"],
    featured: true,
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Conserto e limpeza completa de impressoras').",
  },
  {
    slug: "pecas-de-reposicao",
    name: "Peças de reposição",
    type: "produto",
    category: "manutencao-de-impressoras",
    summary: "Peças originais e compatíveis de qualidade para impressoras.",
    description:
      "Peças de reposição originais e compatíveis para recuperar o funcionamento da sua impressora. Informe a marca e o modelo para consulta.",
    features: ["Originais e compatíveis", "Instalação com a assistência técnica", "Consulte o seu modelo"],
    image: {
      src: images.manutencaoInterna,
      alt: "Componentes internos de uma impressora",
    },
    price: consulta,
    keywords: ["peca", "pecas", "reposicao", "manutencao", "conserto"],
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Peças de reposição originais e compatíveis').",
  },

  // ------------------------------------------------- Materiais de escritório
  {
    slug: "materiais-de-escritorio",
    name: "Materiais de escritório",
    type: "produto",
    category: "materiais-de-escritorio",
    summary: "Itens para a rotina do escritório. Consulte a disponibilidade.",
    description:
      "Precisa de materiais para o escritório? Envie sua lista pelo WhatsApp e a equipe da Brasscart informa os itens disponíveis.",
    features: ["Itens para o dia a dia", "Envie sua lista pelo WhatsApp", "Atendimento na loja"],
    image: {
      src: images.escritorioOrganizador,
      alt: "Organizador com canetas, marcadores e papéis coloridos",
    },
    gallery: [{ src: images.escritorioMateriais, alt: "Materiais de escritório sobre a mesa" }],
    price: consulta,
    keywords: ["papelaria", "materiais", "escritorio", "caneta", "papel"],
    status: "confirmado",
    evidence: "Bio do Instagram ('Materiais de Escritório'). Itens específicos a confirmar.",
  },

  // ---------------------------------------------------------- Rascunhos
  {
    slug: "plotagem-de-projetos",
    name: "Plotagem de projetos",
    type: "servico",
    category: "plotagem-e-grandes-formatos",
    summary: "Plotagem de plantas e projetos em grandes formatos.",
    description: "[RASCUNHO] Confirmar com a Brasscart se o serviço é oferecido, formatos e prazos.",
    features: ["Plantas e projetos", "Grandes formatos"],
    image: { src: images.plotagemGrandeFormato, alt: "Impressora de grande formato em operação" },
    price: consulta,
    keywords: ["plotagem", "plotter", "planta", "projeto", "a0", "a1"],
    status: "rascunho",
    evidence: "Categoria candidata do briefing.",
  },
  {
    slug: "banners-e-faixas",
    name: "Banners e faixas",
    type: "servico",
    category: "comunicacao-visual",
    summary: "Banners e faixas para eventos, lojas e promoções.",
    description: "[RASCUNHO] Confirmar com a Brasscart se o serviço é oferecido.",
    features: ["Banners", "Faixas"],
    image: { src: images.comunicacaoVisualBanner, alt: "Banner sendo impresso em impressora de grande formato" },
    price: consulta,
    keywords: ["banner", "faixa", "comunicacao visual", "lona"],
    status: "rascunho",
    evidence: "Investigação solicitada no briefing.",
  },
  {
    slug: "adesivos-personalizados",
    name: "Adesivos personalizados",
    type: "produto",
    category: "comunicacao-visual",
    summary: "Adesivos com a sua marca.",
    description: "[RASCUNHO] Confirmar com a Brasscart se o produto é oferecido.",
    features: ["Adesivos personalizados"],
    image: { src: images.personalizadosCores, alt: "Amostras de cores para impressão" },
    price: consulta,
    keywords: ["adesivo", "etiqueta", "personalizado"],
    status: "rascunho",
    evidence: "Investigação solicitada no briefing.",
  },
  {
    slug: "cartoes-de-visita-e-panfletos",
    name: "Cartões de visita e panfletos",
    type: "produto",
    category: "materiais-graficos-personalizados",
    summary: "Materiais gráficos com a identidade da sua empresa.",
    description: "[RASCUNHO] Confirmar com a Brasscart se o produto é oferecido.",
    features: ["Cartões de visita", "Panfletos"],
    image: { src: images.graficaImpressao, alt: "Impressão gráfica em máquina rotativa" },
    price: consulta,
    keywords: ["cartao de visita", "panfleto", "flyer", "folheto", "grafica"],
    status: "rascunho",
    evidence: "Investigação solicitada no briefing.",
  },
];
