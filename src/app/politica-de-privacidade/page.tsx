import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PageHero } from "@/components/common/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Como a Brasscart Soluções trata os dados pessoais de quem visita o site, em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
});

/** Data da última revisão do texto. Atualize sempre que a política mudar. */
const LAST_UPDATE = "19 de novembro de 2026";

export default function PrivacidadePage() {
  const { legal, whatsapp, instagram } = siteConfig;
  const controller = legal.registeredName
    ? `${legal.registeredName}${legal.cnpj ? `, inscrita no CNPJ sob o nº ${legal.cnpj}` : ""}`
    : legal.companyName;
  const privacyWhatsApp = buildWhatsAppUrl("Olá! Gostaria de falar sobre os meus dados pessoais (LGPD).");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Política de privacidade", path: "/politica-de-privacidade" },
        ])}
      />
      <PageHero
        eyebrow="LGPD"
        title="Política de privacidade"
        description={`Última atualização: ${LAST_UPDATE}.`}
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Política de privacidade" }]}
      />

      <section aria-label="Texto da política" className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl space-y-12 text-[1.02rem] leading-relaxed text-ink/85">
            <Block title="1. Quem somos">
              <p>
                Este site pertence a <strong>{controller}</strong> (“Brasscart”), responsável pelo tratamento dos dados
                pessoais descritos nesta política, nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº
                13.709/2018 — LGPD).
              </p>
            </Block>

            <Block title="2. Quais dados tratamos">
              <p>O site não exige cadastro nem login. Tratamos apenas:</p>
              <ul>
                <li>
                  <strong>Dados que você escreve no formulário de orçamento</strong> — nome, empresa (opcional), item de
                  interesse, quantidade, prazo e observações. Esses dados <strong>não são gravados em servidores do
                  site</strong>: eles são usados somente no seu navegador para montar a mensagem que é aberta no
                  WhatsApp. O envio só acontece quando você confirma a mensagem no aplicativo.
                </li>
                <li>
                  <strong>Dados de navegação</strong> — se você autorizar no aviso de cookies, utilizamos o Google
                  Analytics 4 para medir visitas e cliques (por exemplo, cliques nos botões de orçamento), com IP
                  anonimizado. Sem a sua autorização, nenhuma ferramenta de análise é carregada.
                </li>
                <li>
                  <strong>Registros técnicos</strong> — o provedor de hospedagem pode registrar dados técnicos de acesso
                  (como endereço IP, data e hora) para segurança e funcionamento do serviço.
                </li>
              </ul>
            </Block>

            <Block title="3. Para que usamos os dados">
              <ul>
                <li>Responder às suas solicitações de orçamento e dúvidas;</li>
                <li>Entender quais páginas e serviços são mais procurados e melhorar o site;</li>
                <li>Garantir a segurança e o funcionamento técnico do site.</li>
              </ul>
              <p>
                As bases legais são a execução de procedimentos preliminares a um contrato a seu pedido (art. 7º, V), o
                consentimento (art. 7º, I) para as ferramentas de análise e o legítimo interesse (art. 7º, IX) para
                registros de segurança.
              </p>
            </Block>

            <Block title="4. Compartilhamento">
              <p>Não vendemos dados pessoais. Os dados podem ser tratados pelos seguintes serviços:</p>
              <ul>
                <li>
                  <strong>WhatsApp (Meta)</strong> — quando você inicia uma conversa conosco, a mensagem passa a seguir os
                  termos e a política de privacidade do WhatsApp;
                </li>
                <li>
                  <strong>Google Analytics</strong> — somente se você aceitar os cookies de análise;
                </li>
                <li>
                  <strong>Provedor de hospedagem do site</strong> — para entregar as páginas com segurança.
                </li>
              </ul>
            </Block>

            <Block title="5. Cookies e armazenamento local">
              <p>
                Guardamos no seu navegador apenas a sua escolha sobre os cookies de análise. Se você aceitar, o Google
                Analytics poderá criar cookies próprios (como <code>_ga</code>) para diferenciar visitantes. Você pode
                apagar essas informações a qualquer momento nas configurações do seu navegador — o aviso de cookies
                voltará a ser exibido.
              </p>
            </Block>

            <Block title="6. Por quanto tempo guardamos">
              <p>
                As conversas no WhatsApp são mantidas pelo tempo necessário para o atendimento e para o cumprimento de
                obrigações legais. Os dados de análise seguem o prazo de retenção configurado no Google Analytics.
              </p>
            </Block>

            <Block title="7. Seus direitos">
              <p>Conforme o art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
              <ul>
                <li>confirmação da existência de tratamento e acesso aos seus dados;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>portabilidade e informações sobre compartilhamento;</li>
                <li>revogação do consentimento.</li>
              </ul>
            </Block>

            <Block title="8. Fale conosco sobre privacidade">
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a Brasscart pelo{" "}
                <a href={privacyWhatsApp} target="_blank" rel="noopener noreferrer">
                  WhatsApp {whatsapp.display}
                </a>
                {legal.privacyEmail && (
                  <>
                    {" "}ou pelo e-mail <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>
                  </>
                )}
                . Você também nos encontra no Instagram{" "}
                <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                  {instagram.handle}
                </a>
                .
              </p>
              <p>
                Esta política pode ser atualizada. A data da última revisão está sempre indicada no topo da página.
              </p>
            </Block>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 [&_a]:font-semibold [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-800 [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:text-sm [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
