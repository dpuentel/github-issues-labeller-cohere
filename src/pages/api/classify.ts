import type { APIRoute, APIContext } from "astro";
import type {
  ApiClassifyResponse,
  CohereClasifyRequestParams,
} from "../../interfaces/Cohere";

export const post: APIRoute = async function post({ request }: APIContext) {
  const body: CohereClasifyRequestParams = await request.json();

  try {
    const classifieds = await classify(body);
    return { body: JSON.stringify(classifieds) };
  } catch (error) {
    throw new Error("Something went wrong in /api/classify route!");
  }
};

const COHERE_TOKEN: string = import.meta.env.COHERE_TOKEN;
const COHERE_VERSION: string = "2022-12-06";
const COHERE_MODEL: string = "large";

async function classify({ inputs, examples }: CohereClasifyRequestParams) {
  return await fetch("https://api.cohere.ai/classify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${COHERE_TOKEN}`,
      "Content-Type": "application/json",
      "Cohere-Version": COHERE_VERSION,
    },
    body: JSON.stringify({
      model: COHERE_MODEL,
      inputs,
      examples,
    }),
  }).then((res): Promise<ApiClassifyResponse> => res.json());
}
