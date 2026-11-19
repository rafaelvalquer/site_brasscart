/**
 * Busca "inteligente" para o catálogo: ignora acentos e maiúsculas, aceita
 * sinônimos comuns (ex.: "xerox" → cópias, "aluguel" → locação), tolera
 * pequenos erros de digitação (ex.: "tonner", "encadernasao") e ordena os
 * resultados por relevância.
 */

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SYNONYMS: Record<string, string[]> = {
  xerox: ["copia", "copias"],
  xerocar: ["copia", "copias"],
  copia: ["xerox", "copias"],
  aluguel: ["locacao", "alugar"],
  alugar: ["locacao", "aluguel"],
  locacao: ["aluguel", "alugar"],
  conserto: ["manutencao", "assistencia", "reparo"],
  consertar: ["manutencao", "conserto"],
  reparo: ["manutencao", "conserto"],
  arrumar: ["manutencao", "conserto"],
  assistencia: ["manutencao", "conserto"],
  tinta: ["refil", "cartucho", "tintas"],
  refil: ["tinta"],
  toner: ["toners", "laser"],
  cartucho: ["cartuchos", "tinta", "toner"],
  scanner: ["digitalizacao", "digitalizar"],
  escanear: ["digitalizacao"],
  digitalizar: ["digitalizacao"],
  espiral: ["encadernacao"],
  encadernar: ["encadernacao"],
  apostila: ["encadernacao", "impressao"],
  imprimir: ["impressao"],
  colorida: ["colorido", "cor"],
  pb: ["preto", "branco"],
  papelaria: ["materiais", "escritorio"],
  plotter: ["plotagem", "grandes", "formatos"],
};

function expandTokens(query: string): string[][] {
  return normalize(query)
    .split(" ")
    .filter((t) => t.length > 1)
    .map((token) => [token, ...(SYNONYMS[token] ?? [])]);
}

/** Distância de edição (Levenshtein) com limite, para tolerar erros de digitação. */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

/** Quantos erros aceitar conforme o tamanho do termo. */
const allowedTypos = (token: string) => (token.length >= 8 ? 2 : token.length >= 4 ? 1 : 0);

function fuzzyWordMatch(token: string, words: string[]): boolean {
  const max = allowedTypos(token);
  if (max === 0) return false;
  return words.some(
    (word) =>
      word.length >= 3 &&
      (editDistance(token, word, max) <= max ||
        // prefixo da palavra (ex.: "encadernasao" × "encadernacao")
        (word.length > token.length && editDistance(token, word.slice(0, token.length), max) <= max))
  );
}

export interface SearchField {
  value: string;
  weight: number;
}

/**
 * Pontua um registro. Cada termo da busca precisa casar com pelo menos um
 * campo (pelo termo, por um sinônimo ou por aproximação); caso contrário a
 * pontuação é 0.
 */
export function scoreRecord(query: string, fields: SearchField[]): number {
  const groups = expandTokens(query);
  if (groups.length === 0) return 1;
  const normalized = fields.map((f) => {
    const text = normalize(f.value);
    return { text, words: text.split(" "), weight: f.weight };
  });

  let total = 0;
  for (const variants of groups) {
    const [primary] = variants;
    let best = 0;
    for (const field of normalized) {
      for (const variant of variants) {
        const synonymFactor = variant === primary ? 1 : 0.7;
        // Início de palavra: melhor sinal de relevância.
        if (field.words.some((w) => w.startsWith(variant))) {
          best = Math.max(best, field.weight * 1.5 * synonymFactor);
        } else if (variant === primary && variant.length >= 4 && field.text.includes(variant)) {
          // Trecho no meio de uma palavra (ex.: "laser" em "multilaser").
          best = Math.max(best, field.weight * 0.6);
        }
      }
      if (best === 0 && fuzzyWordMatch(primary, field.words)) {
        best = Math.max(best, field.weight * 0.5);
      }
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}
