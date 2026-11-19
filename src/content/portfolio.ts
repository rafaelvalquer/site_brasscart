import { images } from "@/content/images";
import type { PortfolioItem } from "@/content/types";

/**
 * Portfólio.
 *
 * Ainda não há fotografias reais de trabalhos executados pela Brasscart.
 * Os itens abaixo são ILUSTRATIVOS (kind: "ilustrativo") e só aparecem com
 * NEXT_PUBLIC_SHOW_DEMO_CONTENT=true, sempre identificados como tal.
 *
 * Para publicar trabalhos reais: adicione as fotos em src/assets/portfolio/,
 * crie itens com kind: "real" e descreva o trabalho realizado.
 */
export const portfolio: PortfolioItem[] = [
  {
    id: "demo-impressao-colorida",
    title: "Impressões coloridas",
    category: "Impressão",
    description: "Exemplo ilustrativo de impressão colorida de materiais.",
    image: { src: images.graficaImpressao, alt: "Impressão colorida em andamento (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-encadernacao",
    title: "Encadernação de apostila",
    category: "Acabamento",
    description: "Exemplo ilustrativo de material encadernado em espiral.",
    image: { src: images.encadernacaoCaderno, alt: "Material encadernado em espiral (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-documentos",
    title: "Organização de documentos",
    category: "Digitalização",
    description: "Exemplo ilustrativo de documentos preparados para digitalização.",
    image: { src: images.documentosPilha, alt: "Documentos com marcadores coloridos (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-locacao",
    title: "Multifuncional para escritório",
    category: "Locação",
    description: "Exemplo ilustrativo de equipamento instalado em escritório.",
    image: { src: images.locacaoMultifuncional, alt: "Impressora multifuncional em escritório (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-manutencao",
    title: "Manutenção preventiva",
    category: "Manutenção",
    description: "Exemplo ilustrativo de manutenção em impressora.",
    image: { src: images.manutencaoInterna, alt: "Impressora aberta para manutenção (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-suprimentos",
    title: "Refis de tinta",
    category: "Suprimentos",
    description: "Exemplo ilustrativo de suprimentos para impressoras tanque de tinta.",
    image: { src: images.tintasRefil, alt: "Frascos de tinta CMYK (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-impressao-pb",
    title: "Impressão de documentos",
    category: "Impressão",
    description: "Exemplo ilustrativo de lote de documentos impressos.",
    image: { src: images.papelPilha, alt: "Pilha de folhas impressas (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
  {
    id: "demo-copias",
    title: "Cópias e digitalização",
    category: "Digitalização",
    description: "Exemplo ilustrativo de uso de copiadora.",
    image: { src: images.impressaoCopiadora, alt: "Pessoa utilizando copiadora (imagem ilustrativa)" },
    kind: "ilustrativo",
  },
];
