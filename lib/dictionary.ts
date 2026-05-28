export type WordMeaning = {
  word: string;
  phonetic?: string;
  partOfSpeech?: string;
  definition: string;
  example?: string;
  synonyms: string[];
  source: "dictionary_api" | "wiktionary";
};

const CACHE_KEY_PREFIX = "ww-meaning:";
const NOT_FOUND_SENTINEL = "__NOT_FOUND__";

function getCached(word: string): WordMeaning | null | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY_PREFIX + word);
    if (raw === null) return undefined;
    if (raw === NOT_FOUND_SENTINEL) return null;
    return JSON.parse(raw) as WordMeaning;
  } catch {
    return undefined;
  }
}

function setCached(word: string, value: WordMeaning | null) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      CACHE_KEY_PREFIX + word,
      value === null ? NOT_FOUND_SENTINEL : JSON.stringify(value)
    );
  } catch {
    // ignore quota errors
  }
}

async function fetchFromDictionaryApi(word: string): Promise<WordMeaning | null> {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
    { signal: AbortSignal.timeout(6000) }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const entry = data[0];
  const meanings = (entry?.meanings ?? []) as Array<{
    partOfSpeech?: string;
    definitions?: Array<{ definition?: string; example?: string }>;
    synonyms?: string[];
  }>;
  if (meanings.length === 0) return null;
  const first = meanings[0];
  const defs = first.definitions ?? [];
  if (defs.length === 0) return null;

  let phonetic: string | undefined = entry?.phonetic;
  const phonetics = (entry?.phonetics ?? []) as Array<{ text?: string }>;
  for (const ph of phonetics) {
    if (ph.text && ph.text.length > 0) {
      phonetic = ph.text;
      break;
    }
  }

  const synonyms: string[] = [];
  for (const m of meanings) {
    if (m.synonyms) synonyms.push(...m.synonyms);
    if (synonyms.length >= 5) break;
  }

  return {
    word,
    phonetic,
    partOfSpeech: first.partOfSpeech,
    definition: defs[0].definition ?? "",
    example: defs[0].example,
    synonyms: synonyms.slice(0, 5),
    source: "dictionary_api",
  };
}

async function fetchFromWiktionary(word: string): Promise<WordMeaning | null> {
  const res = await fetch(
    `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`,
    { headers: { accept: "application/json" }, signal: AbortSignal.timeout(6000) }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const enList = (data?.en ?? []) as Array<{
    partOfSpeech?: string;
    definitions?: Array<{ definition?: string }>;
  }>;
  if (enList.length === 0) return null;
  const entry = enList[0];
  const defs = entry.definitions ?? [];
  if (defs.length === 0) return null;
  const rawDef = defs[0].definition ?? "";
  const cleanDef = rawDef.replace(/<[^>]*>/g, "").trim();
  if (!cleanDef) return null;
  return {
    word,
    partOfSpeech: entry.partOfSpeech,
    definition: cleanDef,
    synonyms: [],
    source: "wiktionary",
  };
}

// Coalesce simultaneous lookups for the same word
const inFlight = new Map<string, Promise<WordMeaning | null>>();

export async function getMeaning(word: string): Promise<WordMeaning | null> {
  const key = word.toLowerCase();
  const cached = getCached(key);
  if (cached !== undefined) return cached;

  const existing = inFlight.get(key);
  if (existing) return existing;

  const p = (async () => {
    try {
      const primary = await fetchFromDictionaryApi(key);
      if (primary !== null) {
        setCached(key, primary);
        return primary;
      }
      const fallback = await fetchFromWiktionary(key);
      setCached(key, fallback);
      return fallback;
    } catch {
      // Network error — don't cache; allow retry later
      return null;
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, p);
  return p;
}
