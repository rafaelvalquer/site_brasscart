/**
 * Banco de imagens do site.
 *
 * As fotografias abaixo são de bancos de imagens com licença gratuita para uso
 * comercial (Licença Unsplash / Licença Pexels) e são ILUSTRATIVAS: não
 * retratam a loja, a equipe ou trabalhos da Brasscart. Substitua-as por
 * fotografias reais assim que disponíveis (ver docs/PENDENCIAS.md).
 */
import type { StaticImageData } from "next/image";

import heroImpressora from "@/assets/images/hero-impressora.webp";
import locacaoMultifuncional from "@/assets/images/locacao-multifuncional.webp";
import locacaoPainel from "@/assets/images/locacao-painel.webp";
import impressaoCopiadora from "@/assets/images/impressao-copiadora.webp";
import impressaoPainel from "@/assets/images/impressao-painel.webp";
import digitalizacaoCopiadora from "@/assets/images/digitalizacao-copiadora.webp";
import documentosPilha from "@/assets/images/documentos-pilha.webp";
import encadernacaoEspiral from "@/assets/images/encadernacao-espiral.webp";
import encadernacaoCaderno from "@/assets/images/encadernacao-caderno.webp";
import manutencaoReparo from "@/assets/images/manutencao-reparo.webp";
import manutencaoTrocaToner from "@/assets/images/manutencao-troca-toner.webp";
import manutencaoInterna from "@/assets/images/manutencao-interna.webp";
import tonerCartucho from "@/assets/images/toner-cartucho.webp";
import tintasRefil from "@/assets/images/tintas-refil.webp";
import cartuchosJato from "@/assets/images/cartuchos-jato.webp";
import escritorioMateriais from "@/assets/images/escritorio-materiais.webp";
import escritorioOrganizador from "@/assets/images/escritorio-organizador.webp";
import papelPilha from "@/assets/images/papel-pilha.webp";
import plotagemGrandeFormato from "@/assets/images/plotagem-grande-formato.webp";
import comunicacaoVisualBanner from "@/assets/images/comunicacao-visual-banner.webp";
import personalizadosCores from "@/assets/images/personalizados-cores.webp";
import graficaImpressao from "@/assets/images/grafica-impressao.webp";

export const images = {
  heroImpressora,
  locacaoMultifuncional,
  locacaoPainel,
  impressaoCopiadora,
  impressaoPainel,
  digitalizacaoCopiadora,
  documentosPilha,
  encadernacaoEspiral,
  encadernacaoCaderno,
  manutencaoReparo,
  manutencaoTrocaToner,
  manutencaoInterna,
  tonerCartucho,
  tintasRefil,
  cartuchosJato,
  escritorioMateriais,
  escritorioOrganizador,
  papelPilha,
  plotagemGrandeFormato,
  comunicacaoVisualBanner,
  personalizadosCores,
  graficaImpressao,
} satisfies Record<string, StaticImageData>;

export type ImageKey = keyof typeof images;

export interface ImageCredit {
  key: ImageKey;
  author: string;
  source: "Unsplash" | "Pexels";
  url: string;
}

export const imageCredits: ImageCredit[] = [
  { key: "heroImpressora", author: "Jakub Żerdzicki", source: "Unsplash", url: "https://unsplash.com/photos/Da9qsu-0a00" },
  { key: "locacaoMultifuncional", author: "engin akyurt", source: "Unsplash", url: "https://unsplash.com/photos/CGnoRQZGWmw" },
  { key: "locacaoPainel", author: "Jakub Zerdzicki", source: "Pexels", url: "https://www.pexels.com/photo/17235421/" },
  { key: "impressaoCopiadora", author: "Andrea Piacquadio", source: "Pexels", url: "https://www.pexels.com/photo/3791246/" },
  { key: "impressaoPainel", author: "Stanislav Staritsyn", source: "Unsplash", url: "https://unsplash.com/photos/j7cOdWrbKUI" },
  { key: "digitalizacaoCopiadora", author: "Mikhail Nilov", source: "Pexels", url: "https://www.pexels.com/photo/9301887/" },
  { key: "documentosPilha", author: "Tanja Tepavac", source: "Unsplash", url: "https://unsplash.com/photos/81ikZZG7_AA" },
  { key: "encadernacaoEspiral", author: "Dan Bucko", source: "Unsplash", url: "https://unsplash.com/photos/9DXo7yCT6mc" },
  { key: "encadernacaoCaderno", author: "Tonkla Pairoh", source: "Unsplash", url: "https://unsplash.com/photos/57USw1-h50k" },
  { key: "manutencaoReparo", author: "Phi Phạm", source: "Pexels", url: "https://www.pexels.com/photo/12437643/" },
  { key: "manutencaoTrocaToner", author: "Long Nguyen", source: "Pexels", url: "https://www.pexels.com/photo/14098466/" },
  { key: "manutencaoInterna", author: "Jakub Żerdzicki", source: "Unsplash", url: "https://unsplash.com/photos/m1rcaB0tStg" },
  { key: "tonerCartucho", author: "Andrey Matveev", source: "Pexels", url: "https://www.pexels.com/photo/33475146/" },
  { key: "tintasRefil", author: "A J.", source: "Unsplash", url: "https://unsplash.com/photos/eVhc4EojmlY" },
  { key: "cartuchosJato", author: "Jakub Zerdzicki", source: "Pexels", url: "https://www.pexels.com/photo/23534042/" },
  { key: "escritorioMateriais", author: "Volodymyr Hryshchenko", source: "Unsplash", url: "https://unsplash.com/photos/7_bz84zOU7g" },
  { key: "escritorioOrganizador", author: "Tim Gouw", source: "Unsplash", url: "https://unsplash.com/photos/KigTvXqetXA" },
  { key: "papelPilha", author: "Alexander Grey", source: "Unsplash", url: "https://unsplash.com/photos/tn57JI3CewI" },
  { key: "plotagemGrandeFormato", author: "Geri Sakti", source: "Unsplash", url: "https://unsplash.com/photos/g9_KP2fvFII" },
  { key: "comunicacaoVisualBanner", author: "Geri Sakti", source: "Unsplash", url: "https://unsplash.com/photos/CYrYxz-uvE4" },
  { key: "personalizadosCores", author: "Mika Baumeister", source: "Unsplash", url: "https://unsplash.com/photos/PtabTe6iJ_8" },
  { key: "graficaImpressao", author: "Bank Phrom", source: "Unsplash", url: "https://unsplash.com/photos/Tzm3Oyu_6sk" },
];
