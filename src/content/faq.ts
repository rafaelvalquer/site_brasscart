import type { FaqItem } from "@/content/types";

/**
 * Perguntas frequentes. As respostas "confirmado" se baseiam no funcionamento
 * do site e nas informações publicadas pela Brasscart. As marcadas como
 * "rascunho" precisam ser validadas pela empresa antes de ir ao ar.
 */
export const faq: FaqItem[] = [
  {
    question: "Como faço para pedir um orçamento?",
    answer:
      "É simples e não precisa de cadastro: use o formulário de orçamento ou qualquer botão de WhatsApp do site. A mensagem já vai organizada para a nossa equipe, e você só precisa tocar em enviar.",
    status: "confirmado",
  },
  {
    question: "Como envio o arquivo que quero imprimir?",
    answer:
      "Depois de abrir a conversa pelo site, envie o arquivo diretamente no WhatsApp. Se preferir, você também pode ir até a loja.",
    status: "confirmado",
  },
  {
    question: "Os preços aparecem no site?",
    answer:
      "Não. Os valores dependem do serviço, da quantidade e do modelo do equipamento, por isso todos os itens estão como preço sob consulta. Peça seu orçamento pelo WhatsApp.",
    status: "confirmado",
  },
  {
    question: "Vocês trabalham com toners de quais marcas?",
    answer:
      "Trabalhamos com toners originais e compatíveis para HP, Brother, Samsung, Canon e Lexmark. Informe o modelo da sua impressora para confirmarmos a disponibilidade.",
    status: "confirmado",
  },
  {
    question: "Como funciona a locação de impressoras?",
    answer:
      "A locação é feita em planos mensais. Você usa equipamentos de alto desempenho sem se preocupar com manutenção, toner ou suporte técnico. Fale com a equipe para receber uma proposta para a sua empresa.",
    status: "confirmado",
  },
  {
    question: "Vocês fazem manutenção de impressoras?",
    answer:
      "Sim. Fazemos conserto e limpeza completa de impressoras, com peças de reposição originais e compatíveis. Chame no WhatsApp ou leve seu equipamento até a loja.",
    status: "confirmado",
  },
  {
    question: "Qual o horário de atendimento?",
    answer: "[RASCUNHO] Informar o horário de atendimento confirmado pela Brasscart.",
    status: "rascunho",
  },
  {
    question: "Vocês fazem entregas ou atendimento no local?",
    answer: "[RASCUNHO] Confirmar com a Brasscart se há entrega e atendimento técnico no local.",
    status: "rascunho",
  },
];
