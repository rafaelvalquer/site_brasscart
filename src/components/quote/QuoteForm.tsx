"use client";

import { CheckCircle2, Lock, Paperclip } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackQuoteSubmit } from "@/lib/analytics";
import {
  QUOTE_LIMITS,
  sanitizeQuote,
  validateQuote,
  whatsappSubmitter,
  type QuoteErrors,
  type QuoteField,
  type QuoteRequest,
} from "@/lib/quote";
import { cn } from "@/lib/utils";

export interface QuoteOptionGroup {
  label: string;
  options: string[];
}

const OTHER = "Outro (descrevo nas observações)";

const fieldClass =
  "h-12 rounded-xl border-input bg-white px-4 text-base shadow-[inset_0_1px_2px_rgb(6_42_77/0.04)] focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-200/60 md:text-[0.95rem]";

/**
 * Formulário de orçamento: valida os campos obrigatórios e abre o WhatsApp
 * com uma mensagem organizada. Não exige cadastro e não armazena dados.
 */
export function QuoteForm({ groups, defaultItem = "" }: { groups: QuoteOptionGroup[]; defaultItem?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const allOptions = groups.flatMap((g) => g.options);
  const initialItem = allOptions.includes(defaultItem) ? defaultItem : "";

  const fid = (name: QuoteField) => `${id}-${name}`;
  const errorProps = (name: QuoteField) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${fid(name)}-erro` }
      : {};

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const request: QuoteRequest = sanitizeQuote({
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      item: String(data.get("item") ?? ""),
      quantity: String(data.get("quantity") ?? ""),
      details: String(data.get("details") ?? ""),
      deadline: String(data.get("deadline") ?? ""),
    });

    const found = validateQuote(request);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as QuoteField[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const { redirectUrl } = whatsappSubmitter.submit(request);
    trackQuoteSubmit(request.item);
    if (redirectUrl) {
      window.open(redirectUrl, "_blank", "noopener,noreferrer");
      setSentUrl(redirectUrl);
    }
  }

  if (sentUrl) {
    return (
      <div role="status" className="flex flex-col items-center rounded-3xl bg-white p-8 text-center sm:p-12">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-wa/10 text-wa">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Sua mensagem está pronta!</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
          Abrimos o WhatsApp com o seu pedido organizado. É só tocar em <strong>enviar</strong> na conversa. Se tiver um
          arquivo, anexe-o por lá.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "whatsapp", size: "lg" })}
          >
            <WhatsAppIcon className="size-5" />
            Abrir o WhatsApp novamente
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Fazer outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10" aria-describedby={`${id}-ajuda`}>
      <p id={`${id}-ajuda`} className="text-sm text-muted-foreground">
        Campos marcados com <span className="font-semibold text-destructive">*</span> são obrigatórios.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={fid("name")} label="Seu nome" required error={errors.name}>
          <Input
            id={fid("name")}
            name="name"
            autoComplete="name"
            maxLength={QUOTE_LIMITS.name}
            placeholder="Como podemos te chamar?"
            className={fieldClass}
            {...errorProps("name")}
          />
        </Field>

        <Field id={fid("company")} label="Empresa" hint="opcional">
          <Input
            id={fid("company")}
            name="company"
            autoComplete="organization"
            maxLength={QUOTE_LIMITS.company}
            placeholder="Nome da empresa"
            className={fieldClass}
          />
        </Field>

        <Field id={fid("item")} label="Serviço ou produto" required error={errors.item} className="sm:col-span-2">
          <div className="relative">
            <select
              id={fid("item")}
              name="item"
              defaultValue={initialItem}
              className={cn(
                fieldClass,
                "w-full appearance-none border pr-10 outline-none aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15"
              )}
              {...errorProps("item")}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {groups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={OTHER}>{OTHER}</option>
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground">
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>

        <Field id={fid("quantity")} label="Quantidade" hint="quando aplicável">
          <Input
            id={fid("quantity")}
            name="quantity"
            maxLength={QUOTE_LIMITS.quantity}
            placeholder="Ex.: 500 unidades"
            className={fieldClass}
          />
        </Field>

        <Field id={fid("deadline")} label="Prazo desejado" hint="opcional">
          <Input
            id={fid("deadline")}
            name="deadline"
            maxLength={QUOTE_LIMITS.deadline}
            placeholder="Ex.: 5 dias"
            className={fieldClass}
          />
        </Field>

        <Field id={fid("details")} label="Descrição ou observações" required error={errors.details} className="sm:col-span-2">
          <Textarea
            id={fid("details")}
            name="details"
            rows={4}
            maxLength={QUOTE_LIMITS.details}
            placeholder="Conte o que você precisa: tipo de impressão, modelo da impressora, cores, acabamento…"
            className={cn(fieldClass, "h-auto min-h-32 py-3 leading-relaxed")}
            {...errorProps("details")}
          />
        </Field>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface px-4 py-3 text-sm text-muted-foreground">
        <Paperclip className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
        Tem um arquivo ou arte? Envie diretamente na conversa do WhatsApp depois de abrir a mensagem.
      </p>

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "whatsapp", size: "xl" }),
          "mt-7 h-auto min-h-14 w-full py-3 text-center leading-snug whitespace-normal"
        )}
      >
        <WhatsAppIcon className="size-5" />
        Enviar orçamento pelo WhatsApp
      </button>

      <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-muted-foreground">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span>
          Seus dados não ficam armazenados no site: eles vão apenas na mensagem que você envia pelo WhatsApp.{" "}
          <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-brand-700">
            Política de privacidade
          </Link>
        </span>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only">(obrigatório)</span>}
        {hint && <span className="font-normal text-muted-foreground">({hint})</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
