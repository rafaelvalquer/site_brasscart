import { images } from "@/content/images";
import type { ServiceCategory } from "@/content/types";

/**
 * Categorias de serviços.
 * Fonte das confirmações: perfil oficial @brasscartsolucoes (bio) e legendas
 * das publicações de 28/08/2025 e 17/10/2025. Itens "rascunho" aguardam
 * confirmação da Brasscart e ficam ocultos no site público.
 */
export const categories: ServiceCategory[] = [
  {
    slug: "locacao-de-impressoras",
    title: "Locação de impressoras",
    serviceName: "locação de impressoras",
    summary:
      "Planos mensais com equipamentos de alto desempenho para a sua empresa.",
    description:
      "Alugue impressoras com a Brasscart e reduza custos: você usa equipamentos de alto desempenho sem se preocupar com manutenção, toner ou suporte técnico. A proposta é montada de acordo com a necessidade da sua empresa.",
    highlights: [
      "Planos mensais",
      "Sem preocupação com manutenção, toner ou suporte",
      "Proposta sob medida para a sua empresa",
    ],
    image: {
      src: images.locacaoMultifuncional,
      alt: "Impressora multifuncional moderna sobre bancada de escritório",
    },
    icon: "printer",
    status: "confirmado",
    evidence: "Bio do Instagram ('Locação de Impressoras'), destaque 'Planos mensal' e post de 28/08/2025.",
    order: 1,
  },
  {
    slug: "impressao-e-copias",
    title: "Impressão e cópias",
    serviceName: "impressão e cópias",
    summary:
      "Impressões coloridas e em preto e branco e cópias para o dia a dia.",
    description:
      "Imprima documentos, trabalhos e materiais com praticidade. Fazemos impressões coloridas e em preto e branco e cópias (xerox), com atendimento na loja ou pelo WhatsApp.",
    highlights: [
      "Impressões coloridas e P&B",
      "Cópias (xerox)",
      "Envie seu arquivo pelo WhatsApp",
    ],
    image: {
      src: images.impressaoCopiadora,
      alt: "Pessoa utilizando uma copiadora em um escritório",
    },
    icon: "files",
    status: "confirmado",
    evidence: "Bio do Instagram ('Xerox | Impressão') e post de 17/10/2025.",
    order: 2,
  },
  {
    slug: "digitalizacao-e-encadernacao",
    title: "Digitalização e encadernação",
    serviceName: "digitalização e encadernação",
    summary:
      "Documentos digitalizados com nitidez e encadernação para o seu material.",
    description:
      "Transforme papéis em arquivos digitais com digitalizações nítidas e organize apostilas, trabalhos e documentos com o serviço de encadernação.",
    highlights: [
      "Digitalização com alta qualidade",
      "Encadernação de documentos",
      "Atendimento rápido",
    ],
    image: {
      src: images.digitalizacaoCopiadora,
      alt: "Pessoa posicionando documento no vidro de um scanner",
    },
    icon: "scan",
    status: "confirmado",
    evidence: "Bio do Instagram ('Encadernação') e post de 17/10/2025 ('Digitalizações nítidas').",
    order: 3,
  },
  {
    slug: "toners-tintas-e-cartuchos",
    title: "Toners, tintas e cartuchos",
    serviceName: "toners, tintas e cartuchos",
    summary:
      "Suprimentos originais e compatíveis para as principais marcas.",
    description:
      "Toners originais e compatíveis para HP, Brother, Samsung, Canon e Lexmark, refis de tinta Epson 544 e cartuchos compatíveis com alto rendimento. Consulte a disponibilidade para o seu modelo.",
    highlights: [
      "HP, Brother, Samsung, Canon e Lexmark",
      "Originais e compatíveis",
      "Refis de tinta Epson 544",
    ],
    image: {
      src: images.tonerCartucho,
      alt: "Cartucho de toner para impressora a laser",
    },
    icon: "droplets",
    status: "confirmado",
    evidence: "Bio do Instagram ('Cartuchos') e posts de 28/08/2025 e 17/10/2025.",
    order: 4,
  },
  {
    slug: "manutencao-de-impressoras",
    title: "Manutenção e assistência técnica",
    serviceName: "manutenção de impressoras",
    summary:
      "Conserto, limpeza e peças de reposição para a sua impressora.",
    description:
      "Sua impressora está com problema? Fazemos conserto e limpeza completa, com peças de reposição originais e compatíveis e assistência técnica especializada. Chame no WhatsApp ou leve seu equipamento até a loja.",
    highlights: [
      "Conserto e limpeza completa",
      "Peças de reposição",
      "Assistência técnica especializada",
    ],
    image: {
      src: images.manutencaoReparo,
      alt: "Técnico com luvas fazendo reparo no interior de uma impressora",
    },
    icon: "wrench",
    status: "confirmado",
    evidence: "Post de 17/10/2025 ('Precisando de manutenção em impressora?').",
    order: 5,
  },
  {
    slug: "materiais-de-escritorio",
    title: "Materiais de escritório",
    serviceName: "materiais de escritório",
    summary: "Itens para a rotina do escritório, com atendimento pelo WhatsApp.",
    description:
      "Além dos suprimentos de impressão, a Brasscart trabalha com materiais de escritório. Consulte os itens disponíveis pelo WhatsApp.",
    highlights: [
      "Itens para o dia a dia",
      "Consulta rápida pelo WhatsApp",
      "Atendimento na loja",
    ],
    image: {
      src: images.escritorioMateriais,
      alt: "Materiais de escritório organizados sobre a mesa: calculadora, grampeador e blocos de anotação",
    },
    icon: "paperclip",
    status: "confirmado",
    evidence: "Bio do Instagram ('Cartuchos & Materiais de Escritório'). Itens específicos a confirmar.",
    order: 6,
  },

  // ---------------------------------------------------------------------------
  // RASCUNHOS — não confirmados. Ocultos no site público.
  // ---------------------------------------------------------------------------
  {
    slug: "plotagem-e-grandes-formatos",
    title: "Plotagem e grandes formatos",
    serviceName: "plotagem e impressão em grandes formatos",
    summary: "Plotagem de projetos e impressões em grandes formatos.",
    description:
      "[RASCUNHO] Plotagem de plantas, projetos e impressões em grandes formatos. Confirmar com a Brasscart se o serviço é oferecido, formatos e prazos.",
    highlights: ["Plantas e projetos", "Grandes formatos", "Consultar formatos"],
    image: {
      src: images.plotagemGrandeFormato,
      alt: "Impressora de grande formato imprimindo em rolo de papel",
    },
    icon: "ruler",
    status: "rascunho",
    evidence: "Categoria candidata do briefing. Não encontrada nas publicações oficiais.",
    order: 7,
  },
  {
    slug: "comunicacao-visual",
    title: "Comunicação visual",
    serviceName: "comunicação visual",
    summary: "Adesivos, banners e faixas para divulgar a sua marca.",
    description:
      "[RASCUNHO] Adesivos, banners, faixas e materiais de comunicação visual. Confirmar com a Brasscart se o serviço é oferecido.",
    highlights: ["Banners e faixas", "Adesivos", "Sinalização"],
    image: {
      src: images.comunicacaoVisualBanner,
      alt: "Impressora de grande formato produzindo um banner colorido",
    },
    icon: "megaphone",
    status: "rascunho",
    evidence: "Investigação solicitada no briefing. Não encontrada nas publicações oficiais.",
    order: 8,
  },
  {
    slug: "materiais-graficos-personalizados",
    title: "Materiais gráficos personalizados",
    serviceName: "materiais gráficos personalizados",
    summary: "Cartões de visita, panfletos e materiais com a sua marca.",
    description:
      "[RASCUNHO] Materiais gráficos personalizados, como cartões de visita e panfletos. Confirmar com a Brasscart se o serviço é oferecido.",
    highlights: ["Cartões de visita", "Panfletos", "Materiais personalizados"],
    image: {
      src: images.personalizadosCores,
      alt: "Leque de amostras de cores para impressão gráfica",
    },
    icon: "palette",
    status: "rascunho",
    evidence: "Investigação solicitada no briefing. Não encontrada nas publicações oficiais.",
    order: 9,
  },
];
