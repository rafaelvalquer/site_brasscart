/**
 * Conteúdo institucional.
 *
 * Somente informações confirmadas em fontes oficiais da Brasscart. Blocos com
 * `null` estão pendentes e não aparecem no site público.
 */
export const about = {
  intro:
    "A Brasscart é uma empresa de soluções em impressão. Atendemos pessoas e empresas com locação de impressoras, impressões e cópias, digitalização, encadernação, suprimentos e assistência técnica — com atendimento próximo, na loja ou pelo WhatsApp.",

  /** PENDENTE — história e trajetória a serem fornecidas pela Brasscart. */
  history: null as null | string[],

  /** PENDENTE — descrição da estrutura e dos equipamentos. */
  structure: null as null | string[],

  /**
   * Diferenciais declarados pela própria Brasscart em suas publicações
   * oficiais (bio e legendas do Instagram).
   */
  differentials: [
    {
      title: "Atendimento rápido pelo WhatsApp",
      text: "Peça seu orçamento ou tire dúvidas em uma conversa direta com a equipe.",
      icon: "message",
    },
    {
      title: "Na loja ou à distância",
      text: "Venha até a loja ou resolva tudo pelo WhatsApp, como for melhor para você.",
      icon: "store",
    },
    {
      title: "Originais e compatíveis",
      text: "Toners, tintas e peças originais e compatíveis para as principais marcas.",
      icon: "badge",
    },
    {
      title: "Assistência técnica especializada",
      text: "Conserto, limpeza e peças de reposição para manter sua impressora funcionando.",
      icon: "wrench",
    },
  ] as const,
};
