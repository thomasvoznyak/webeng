import { extractBears } from './extractBearData.ts';
import { baseUrl, params } from './vars.ts';

export const getBearData = async (): Promise<void> => {
  const url = `${baseUrl}?${new URLSearchParams(params as Record<string, string>).toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const wikitext: string = data.parse.wikitext['*'];
    await extractBears(wikitext); // No need to handle promises here
  } catch (error) {
    console.error('An error occurred trying to fetch bear data:', error);
  }
};
