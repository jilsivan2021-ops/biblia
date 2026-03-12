export interface BiblePage {
  type: "cover" | "chapter" | "backCover";
  title?: string;
  text?: string;
  image?: number;
}

const API_KEY = "lP371jN_TLA-zpsmZyVXP";

/* proxy para evitar CORS */
const BASE_URL = "https://corsproxy.io/?https://rest.api.bible/v1";

export const coverPage: BiblePage = {
  type: "cover",
  image: require("../assets/bible/capa.jpg"),
};

export const backCoverPage: BiblePage = {
  type: "backCover",
  image: require("../assets/bible/contracapa.jpg"),
};

export async function getChapter(
  bibleId: string,
  chapterId: string
): Promise<BiblePage> {

  const res = await fetch(
    `${BASE_URL}/bibles/${bibleId}/chapters/${chapterId}`,
    {
      headers: {
        "api-key": API_KEY
      }
    }
  );

  const json = await res.json();

  const cleanText = json.data.content
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    type: "chapter",
    title: json.data.reference,
    text: cleanText
  };
}